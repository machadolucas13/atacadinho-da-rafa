import { NextResponse } from "next/server";
import { getArtigos } from "@/lib/artigos";
import { getPins } from "@/lib/pins";
import { getProdutos } from "@/lib/produtos";

export async function GET() {
  const [artigos, pins, produtos] = await Promise.all([
    getArtigos("pt"),
    getPins("pt"),
    getProdutos(),
  ]);

  const items = [
    ...artigos.map((a) => ({ slug: a.slug, tipo: "artigo" as const, titulo: a.titulo })),
    ...pins.map((p) => ({ slug: p.slug, tipo: "pin" as const, titulo: p.titulo })),
    ...produtos.map((p) => ({ slug: p.slug, tipo: "produto" as const, titulo: p.nome })),
  ];

  return NextResponse.json({ items });
}
