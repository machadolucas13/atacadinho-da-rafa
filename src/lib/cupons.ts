import { unstable_cache } from "next/cache";
import { Cupom } from "@/types";

export async function getCupons(): Promise<Cupom[]> {
  if (typeof window === "undefined" && process.env.NEXT_PHASE === "phase-production-build") {
    return [];
  }

  try {
    const module = await import("@/components/layout/CuponsSection");
    const all = (module as any).TODOS_CUPONS as Cupom[];

    const now = Date.now();
    return all
      .filter((c) => {
        if (!c.validade) return true;
        return new Date(c.validade).getTime() >= now;
      })
      .map((c) => ({
        ...c,
        atualizadoEm: c.atualizadoEm || new Date().toISOString(),
      }));
  } catch (error) {
    console.error("Erro ao carregar cupons locais:", error);
    return [];
  }
}

export async function getCupomById(id: string): Promise<Cupom | undefined> {
  try {
    const all = await getCupons();
    return all.find((c) => c.id === id);
  } catch (error) {
    console.error("Erro ao buscar cupom:", error);
    return undefined;
  }
}
