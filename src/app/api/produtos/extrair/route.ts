import { NextResponse } from "next/server";

function toAbsolute(input: string | undefined | null, base: string): string {
  if (!input) return "";
  if (/^https?:\/\//i.test(input)) return input;
  if (input.startsWith("//")) return "https:" + input;
  if (input.startsWith("/")) return new URL(input, base).href;
  return new URL(input, base).href;
}

function parsePrice(input: string | undefined | null): number {
  if (!input) return 0;
  const cleaned = input.replace(/[^\d.,]/g, "").replace(/,/g, ".");
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function detectMarketplace(url: string): string {
  const host = new URL(url).host.toLowerCase();
  if (host.includes("shopee")) return "shopee";
  if (host.includes("amazon")) return "amazon";
  if (host.includes("mercadolivre") || host.includes("meli")) return "mercadolivre";
  if (host.includes("shein")) return "shein";
  if (host.includes("aliexpress")) return "aliexpress";
  return "generic";
}

function extractFromJsonLd(html: string): { titulo?: string; imagem?: string; preco?: number; precoOriginal?: number } {
  const match = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) return {};
  try {
    const data = JSON.parse(match[1].trim());
    const list = Array.isArray(data) ? data : [data];
    for (const item of list) {
      if (item["@type"] === "Product" || item.type === "Product") {
        const offers = item.offers || item.Offers;
        const price = offers?.price || offers?.Price;
        const image = item.image || item.Image;
        const title = item.name || item.Name;
        return {
          titulo: title,
          imagem: Array.isArray(image) ? image[0] : image,
          preco: price ? parsePrice(String(price)) : 0,
        };
      }
    }
  } catch {
    // ignore json parse errors
  }
  return {};
}

function extractFromMeta(html: string, base: string) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const ogTitle = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i)?.[1];
  const ogImage = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i)?.[1];
  const ogDescription = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i)?.[1];
  const priceAmount = html.match(/<meta[^>]*property="product:price:amount"[^>]*content="([^"]+)"/i)?.[1];
  const originalPrice = html.match(/<meta[^>]*property="product:original-price:amount"[^>]*content="([^"]+)"/i)?.[1];
  const productTitle = html.match(/<meta[^>]*property="product:title"[^>]*content="([^"]+)"/i)?.[1];

  const titulo = productTitle || ogTitle || titleMatch?.[1]?.trim() || "";
  const imagem = toAbsolute(ogImage, base);
  const preco = priceAmount ? parsePrice(priceAmount) : 0;
  const precoOriginal = originalPrice ? parsePrice(originalPrice) : 0;

  return {
    titulo,
    imagem,
    preco,
    precoOriginal,
    descricao: ogDescription || titulo,
  };
}

function extractPriceFromText(html: string): { preco?: number; precoOriginal?: number } {
  const priceRegex = /(?:R\$\s*)?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/g;
  const prices: number[] = [];
  let match;
  while ((match = priceRegex.exec(html)) !== null) {
    prices.push(parsePrice(match[0]));
  }

  const unique = Array.from(new Set(prices)).sort((a, b) => b - a);
  const preco = unique[0] || 0;
  const precoOriginal = unique[1] || 0;

  return { preco, precoOriginal };
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    }

    let baseUrl = url;
    try {
      baseUrl = new URL(url).href;
    } catch {
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    }

    const response = await fetch(baseUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP ${response.status}` },
        { status: response.status }
      );
    }

    const html = await response.text();
    const jsonLd = extractFromJsonLd(html);
    const meta = extractFromMeta(html, baseUrl);
    const textPrices = extractPriceFromText(html);
    const marketplace = detectMarketplace(baseUrl);

    const titulo = jsonLd.titulo || meta.titulo;
    const imagem = jsonLd.imagem || meta.imagem;
    const preco = jsonLd.preco || meta.preco || textPrices.preco || 0;
    const precoOriginal = meta.precoOriginal || textPrices.precoOriginal || 0;

    return NextResponse.json({
      titulo,
      imagem,
      descricao: meta.descricao || titulo,
      preco: preco > 0 ? preco : 0,
      precoOriginal: precoOriginal > 0 ? precoOriginal : 0,
      marketplace,
    });
  } catch (error) {
    console.error("Erro ao extrair dados do produto:", error);
    return NextResponse.json(
      { error: "Erro ao processar URL" },
      { status: 500 }
    );
  }
}
