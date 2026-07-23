import { NextResponse } from "next/server";
import { getCategorias } from "@/lib/categorias";

export async function GET() {
  const categorias = await getCategorias();
  return NextResponse.json({ categorias });
}
