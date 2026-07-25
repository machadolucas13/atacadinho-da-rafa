import { NextResponse } from "next/server";
import { incrementItemViews } from "@/lib/views";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
    }

    const views = await incrementItemViews(slug);
    return NextResponse.json({ ok: true, views });
  } catch (error) {
    console.error("Erro ao registrar visualização:", error);
    return NextResponse.json({ error: "Erro ao registrar visualização" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Use POST para registrar visualização." });
}
