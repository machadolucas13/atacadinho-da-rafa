import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface ProductItem {
  id: string;
  name: string;
  keyword: string;
  platform: string;
  url: string;
  price: number;
  currency: string;
  originalPrice?: number;
  discountPercentage?: number;
  soldCount?: number;
  likedCount?: number;
  totalResults?: number;
  rating?: number;
  reviewCount?: number;
  image?: string;
  freeShipping?: boolean;
  trendType: "crescendo" | "desejadas" | "populares" | "search";
}

interface MultiTrendsResponse {
  ok: boolean;
  items: ProductItem[];
  platforms: string[];
  updatedAt: string;
}

async function fetchMLSearch(keyword: string): Promise<ProductItem[]> {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(keyword)}&limit=5`;
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];

    const data = await response.json();
    const results = data.results || [];

    return results.map((item: any) => ({
      id: item.id,
      name: item.title,
      keyword,
      platform: "ml",
      url: item.permalink,
      price: item.price,
      currency: item.currency_id,
      originalPrice: item.original_price || undefined,
      discountPercentage: item.discount_percentage || undefined,
      soldCount: item.sold_quantity || undefined,
      image: item.thumbnail,
      freeShipping: item.shipping?.free_shipping || false,
      trendType: "search" as const,
    }));
  } catch (e) {
    console.error(`ML search error for "${keyword}":`, e);
    return [];
  }
}

async function fetchGeckoAPISearch(
  keyword: string,
  platform: string
): Promise<ProductItem[]> {
  const apiKey = process.env.GECKO_API_KEY;
  if (!apiKey) return [];

  const targetMap: Record<string, string> = {
    shopee: "shopee.com.br",
    amazon: "amazon.com.br",
    magalu: "magazineluiza.com.br",
    temu: "temu.com",
    aliexpress: "aliexpress.com",
  };

  const target = targetMap[platform];
  if (!target) return [];

  try {
    const response = await fetch("https://api.geckoapi.com.br/v1/extract", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword,
        target,
        type: "plp",
      }),
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      console.error(
        `GeckoAPI error for ${platform}: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data = await response.json();
    const items = data.data?.items || [];

    return items.slice(0, 5).map((item: any, index: number) => {
      const price = item.priceMin || item.price || 0;
      const regularPrice = item.regularPrice || item.regularPriceMin;
      const discount =
        regularPrice && price > 0
          ? Math.round(((regularPrice - price) / regularPrice) * 100)
          : item.discountPercentage;

      return {
        id: `${platform}-${item.sku || item.itemId || index}`,
        name: item.name || keyword,
        keyword,
        platform,
        url: item.url,
        price,
        currency: item.currency || "BRL",
        originalPrice: regularPrice || undefined,
        discountPercentage: discount || undefined,
        soldCount: item.soldCount || undefined,
        likedCount: item.likedCount || undefined,
        totalResults: data.data?.totalResults || undefined,
        rating: item.aggregateRating?.rating || undefined,
        reviewCount: item.aggregateRating?.reviewCount || undefined,
        image: item.thumbnail?.url || item.thumbnail || undefined,
        freeShipping: item.freeShipping || false,
        trendType: "search" as const,
      };
    });
  } catch (e) {
    console.error(`GeckoAPI error for ${platform}:`, e);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platformsParam = searchParams.get("platforms") || "ml";
    const limit = parseInt(searchParams.get("limit") || "20");
    const categoryId = searchParams.get("category");

    const platforms = platformsParam
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    const mlEnabled = platforms.includes("ml");
    const otherPlatforms = platforms.filter((p) => p !== "ml");

    const items: ProductItem[] = [];
    const usedPlatforms = new Set<string>();
    let updatedAt = new Date().toISOString();

    if (otherPlatforms.length > 0 && process.env.GECKO_API_KEY) {
      const fallbackKeywords = [
        "ofertas",
        "produtos baratos",
        "melhores produtos",
        "shopee",
        "amazon",
        "magalu",
      ];

      const geckoResults = await Promise.allSettled(
        otherPlatforms.flatMap((platform) =>
          fallbackKeywords.map((keyword) => fetchGeckoAPISearch(keyword, platform))
        )
      );

      geckoResults.forEach((result) => {
        if (result.status === "fulfilled") {
          result.value.forEach((item) => {
            usedPlatforms.add(item.platform);
            items.push(item);
          });
        }
      });
    }

    if (mlEnabled) {
      const mlUrl = categoryId
        ? `https://api.mercadolibre.com/trends/MLB/${categoryId}`
        : `https://api.mercadolibre.com/trends/MLB`;

      try {
        const mlResponse = await fetch(mlUrl, {
          headers: { Accept: "application/json" },
          next: { revalidate: 14400 },
        });

        if (mlResponse.ok) {
          const mlData = await mlResponse.json();
          const trends = mlData.trends || mlData || [];

          const fastestGrowing = trends.slice(0, 10);
          const mostWanted = trends.slice(10, 30);

          const topTrends = [
            ...fastestGrowing.map((t: any) => ({ ...t, trendType: "crescendo" as const })),
            ...mostWanted.map((t: any) => ({ ...t, trendType: "desejadas" as const })),
          ].slice(0, limit);

          const searchResults = await Promise.allSettled(
            topTrends.map((trend) => fetchMLSearch(trend.keyword))
          );

          searchResults.forEach((result, index) => {
            if (result.status === "fulfilled") {
              const trend = topTrends[index];
              const trendType = trend.trendType;

              result.value.forEach((item, i) => {
                items.push({
                  ...item,
                  trendType: i === 0 ? trendType : "search",
                });
              });
            }
          });

          usedPlatforms.add("ml");
        } else {
          console.warn(`ML API blocked or unavailable: ${mlResponse.status}`);
        }
      } catch (error) {
        console.warn("ML trends fetch failed:", error);
      }
    }

    if (items.length === 0 && otherPlatforms.length > 0 && process.env.GECKO_API_KEY) {
      const trendingKeywords = ["iphone", "tenis", "fone bluetooth", "camiseta", "sapato"];
      const geckoResults = await Promise.allSettled(
        otherPlatforms.flatMap((platform) =>
          trendingKeywords.map((keyword) => fetchGeckoAPISearch(keyword, platform))
        )
      );

      geckoResults.forEach((result) => {
        if (result.status === "fulfilled") {
          result.value.forEach((item) => {
            usedPlatforms.add(item.platform);
            items.push(item);
          });
        }
      });
    }

    const seen = new Set<string>();
    const uniqueItems = items.filter((item) => {
      const key = `${item.platform}-${item.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    uniqueItems.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));

    return NextResponse.json<MultiTrendsResponse>({
      ok: items.length > 0,
      items: uniqueItems.slice(0, limit * 3),
      platforms: [...usedPlatforms],
      updatedAt,
    });
  } catch (error) {
    console.error("Error fetching multi-trends:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Erro ao buscar trends. Tente novamente.",
        items: [],
        platforms: [],
      },
      { status: 500 }
    );
  }
}
