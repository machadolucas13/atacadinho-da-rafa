import { Artigo } from "@/types";
import { artigos } from "@/data/mock-data";

export async function getArtigos(): Promise<Artigo[]> {
  return artigos;
}

export async function getArtigoBySlug(slug: string): Promise<Artigo | undefined> {
  return artigos.find((a) => a.slug === slug);
}

export async function getArtigosDestaque(): Promise<Artigo[]> {
  return artigos.filter((a) => a.destaque);
}
