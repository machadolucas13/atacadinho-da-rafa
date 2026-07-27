import { NextResponse } from "next/server";
import { getCategoriasUncached } from "@/lib/categorias";

export async function GET() {
  const categorias = await getCategoriasUncached();
  return NextResponse.json({ categorias }, { headers: { "Cache-Control": "no-store" } });
}
