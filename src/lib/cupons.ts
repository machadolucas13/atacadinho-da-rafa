import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { unstable_cache } from "next/cache";
import { Cupom } from "@/types";

export async function getCupons(): Promise<Cupom[]> {
  if (typeof window === "undefined" && process.env.NEXT_PHASE === "phase-production-build") {
    return [];
  }
  try {
    const q = query(collection(db, "cupons"), where("ativo", "==", true), orderBy("ultimaAtualizacao", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Cupom));
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
    return [];
  }
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
