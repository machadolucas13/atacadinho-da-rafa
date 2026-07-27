import { NextResponse } from "next/server";
import { incrementItemViews, getItemViewsAsync } from "@/lib/increment-views";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug obrigatório" }, { status: 400 });
    }
    const views = await getItemViewsAsync(slug);
    return NextResponse.json({ views });
  } catch (error) {
    console.error("[views] Erro ao buscar visualizações:", error);
    return NextResponse.json({ error: "Erro ao buscar visualizações" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
    }

    console.log(`[views] increment request for slug: ${slug}`);
    const views = await incrementItemViews(slug);
    console.log(`[views] incremented ${slug} => ${views}`);
    return NextResponse.json({ ok: true, views });
  } catch (error) {
    console.error("[views] Erro ao registrar visualização:", error);
    return NextResponse.json({ error: "Erro ao registrar visualização" }, { status: 500 });
  }
}
