import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { unstable_cache } from "next/cache";
import { Cupom } from "@/types";

export async function getCupons(): Promise<Cupom[]> {
  return unstable_cache(
    async () => {
      try {
        const q = query(collection(db, "cupons"), where("ativo", "==", true), orderBy("ultimaAtualizacao", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Cupom));
      } catch (error) {
        console.error("Erro ao buscar cupons:", error);
        return [];
      }
    },
    ["cupons"],
    { revalidate: 60, tags: ["cupons"] }
  )();
}

export async function getCupomById(id: string): Promise<Cupom | undefined> {
  try {
    const cupons = await getCupons();
    return cupons.find((c) => c.id === id);
  } catch (error) {
    console.error("Erro ao buscar cupom:", error);
    return undefined;
  }
}
