import { NextResponse } from "next/server";
import { getProdutos } from "@/lib/produtos";

export async function GET() {
  const produtos = await getProdutos();
  return NextResponse.json({ produtos });
}

