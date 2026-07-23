import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { unstable_cache } from "next/cache";
import { Produto } from "@/types";

export async function getProdutos(): Promise<Produto[]> {
  return unstable_cache(
    async () => {
      try {
        const snapshot = await getDocs(collection(db, "produtos"));
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Produto));
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
      }
    },
    ["produtos"],
    { revalidate: 60, tags: ["produtos"] }
  )();
}

export async function getProdutoBySlug(slug: string): Promise<Produto | undefined> {
  try {
    const produtos = await getProdutos();
    return produtos.find((p) => p.slug === slug);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return undefined;
  }
}
