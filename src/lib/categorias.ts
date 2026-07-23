import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { unstable_cache } from "next/cache";
import { Categoria } from "@/types";

export async function getCategorias(): Promise<Categoria[]> {
  return unstable_cache(
    async () => {
      try {
        const snapshot = await getDocs(collection(db, "categorias"));
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Categoria));
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        return [];
      }
    },
    ["categorias"],
    { revalidate: 60, tags: ["categorias"] }
  )();
}

export async function getCategoriaBySlug(slug: string): Promise<Categoria | undefined> {
  try {
    const categorias = await getCategorias();
    return categorias.find((c) => c.slug === slug);
  } catch (error) {
    console.error("Erro ao buscar categoria:", error);
    return undefined;
  }
}
