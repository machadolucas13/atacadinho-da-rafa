import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { unstable_cache } from "next/cache";
import { Pasta } from "@/types";

export async function getPastas(): Promise<Pasta[]> {
  return unstable_cache(
    async () => {
      try {
        const snapshot = await getDocs(collection(db, "pastas"));
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Pasta));
      } catch (error) {
        console.error("Erro ao buscar pastas:", error);
        return [];
      }
    },
    ["pastas"],
    { revalidate: 60, tags: ["pastas"] }
  )();
}

export async function getPastaBySlug(slug: string): Promise<Pasta | undefined> {
  try {
    const pastas = await getPastas();
    return pastas.find((p) => p.slug === slug);
  } catch (error) {
    console.error("Erro ao buscar pasta:", error);
    return undefined;
  }
}

