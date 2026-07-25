import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP ${response.status}` },
        { status: response.status }
      );
    }

    const html = await response.text();

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
    const priceAmountMatch = html.match(/<meta[^>]*property="product:price:amount"[^>]*content="([^"]+)"/i);
    const originalPriceMatch = html.match(/<meta[^>]*property="product:original-price:amount"[^>]*content="([^"]+)"/i);

    const titulo = ogTitleMatch?.[1]?.trim() || titleMatch?.[1]?.trim() || "";
    const imagem = ogImageMatch?.[1]?.trim() || "";
    const preco = priceAmountMatch?.[1] ? parseFloat(priceAmountMatch[1].replace(/[^\d.,]/g, "").replace(",", ".")) : 0;
    const precoOriginal = originalPriceMatch?.[1] ? parseFloat(originalPriceMatch[1].replace(/[^\d.,]/g, "").replace(",", ".")) : 0;

    return NextResponse.json({
      titulo,
      imagem,
      preco: preco > 0 ? preco : 0,
      precoOriginal: precoOriginal > 0 ? precoOriginal : 0,
    });
  } catch (error) {
    console.error("Erro ao extrair dados do produto:", error);
    return NextResponse.json(
      { error: "Erro ao processar URL" },
      { status: 500 }
    );
  }
}
