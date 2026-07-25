import { NextResponse } from "next/server";
import { getCupons } from "@/lib/cupons";

export async function GET() {
  const cupons = await getCupons();
  return NextResponse.json({ cupons });
}
