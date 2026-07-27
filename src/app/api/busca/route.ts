import { NextResponse } from "next/server";
import { getProdutos } from "@/lib/produtos";
import { getArtigos } from "@/lib/artigos";
import { getPastas } from "@/lib/pastas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  const [produtos, artigos, pastas] = await Promise.all([
    getProdutos(),
    getArtigos(),
    getPastas(),
  ]);

  const lowerQuery = query.toLowerCase();

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(lowerQuery) ||
      p.descricao?.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );

  const artigosFiltrados = artigos.filter(
    (a) =>
      a.titulo.toLowerCase().includes(lowerQuery) ||
      a.descricao?.toLowerCase().includes(lowerQuery) ||
      a.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );

  const pastasFiltradas = pastas.filter(
    (p) =>
      p.nome.toLowerCase().includes(lowerQuery) ||
      p.descricao?.toLowerCase().includes(lowerQuery)
  );

  return NextResponse.json({
    produtos: produtosFiltrados,
    artigos: artigosFiltrados,
    pastas: pastasFiltradas,
  });
}

