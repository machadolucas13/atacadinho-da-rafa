import { NextResponse } from "next/server";
import { getArtigos } from "@/lib/artigos";

export async function GET() {
  const artigos = await getArtigos();
  return NextResponse.json({ artigos });
}

