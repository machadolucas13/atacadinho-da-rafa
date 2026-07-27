import { NextResponse } from "next/server";
import { getPastas } from "@/lib/pastas";

export async function GET() {
  const pastas = await getPastas();
  return NextResponse.json({ pastas });
}

