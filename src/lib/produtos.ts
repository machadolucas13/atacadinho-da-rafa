import { Produto } from "@/types";

export type { Produto } from "@/types";

export async function getProdutos(): Promise<Produto[]> {
  return produtos;
}

export async function getProdutoBySlug(slug: string): Promise<Produto | undefined> {
  return produtos.find((p) => p.slug === slug);
}

export async function getProdutosDestaque(): Promise<Produto[]> {
  return produtos.filter((p) => p.destaque);
}

export async function getProdutosVirais(): Promise<Produto[]> {
  return produtos.filter((p) => p.viral);
}
