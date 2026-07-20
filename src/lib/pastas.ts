import { Pasta } from "@/types";
import { pastas } from "@/data/mock-data";

export async function getPastas(): Promise<Pasta[]> {
  return pastas;
}

export async function getPastaBySlug(slug: string): Promise<Pasta | undefined> {
  return pastas.find((p) => p.slug === slug);
}

export async function getPastasDestaque(): Promise<Pasta[]> {
  return pastas.filter((p) => p.destaque);
}
