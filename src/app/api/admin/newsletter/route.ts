import { NextResponse } from "next/server";
import { buscarInscritosNewsletter } from "@/app/actions/newsletter";

export async function GET() {
  const result = await buscarInscritosNewsletter();
  if ((result as any).error) {
    return NextResponse.json({ error: (result as any).error }, { status: 401 });
  }
  return NextResponse.json({ ok: true, inscritos: (result as any).inscritos || [] });
}
