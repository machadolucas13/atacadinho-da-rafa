import { NextResponse } from "next/server";
import { incrementItemViews } from "@/lib/views";

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

export async function GET() {
  return NextResponse.json({ ok: true, message: "Use POST para registrar visualização." });
}

