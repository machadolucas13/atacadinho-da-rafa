import { Categoria } from "@/types";
import { categorias } from "@/data/categorias";

export async function getCategorias(): Promise<Categoria[]> {
  return categorias;
}

export async function getCategoriaBySlug(slug: string): Promise<Categoria | undefined> {
  return categorias.find((c) => c.slug === slug);
}
