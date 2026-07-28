import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");
    const forceRefresh = searchParams.get("refresh") === "true";

    const mlUrl = categoryId
      ? `https://api.mercadolibre.com/trends/MLB/${categoryId}`
      : `https://api.mercadolibre.com/trends/MLB`;

    const response = await fetch(mlUrl, {
      headers: {
        Accept: "application/json",
      },
      next: forceRefresh ? { revalidate: 0 } : { revalidate: 14400 },
    });

    if (!response.ok) {
      throw new Error(`ML API responded with ${response.status}`);
    }

    const data = await response.json();

    const trends = data.trends || data || [];

    const fastestGrowing = trends.slice(0, 10);
    const mostWanted = trends.slice(10, 30);
    const mostPopular = trends.slice(30, 50);

    return NextResponse.json({
      ok: true,
      total: trends.length,
      fastestGrowing,
      mostWanted,
      mostPopular,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching ML trends:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Erro ao buscar trends. Tente novamente.",
        fastestGrowing: [],
        mostWanted: [],
        mostPopular: [],
      },
      { status: 500 }
    );
  }
}
