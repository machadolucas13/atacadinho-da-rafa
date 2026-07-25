import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc, serverTimestamp } from "firebase/firestore";
import { unstable_cache } from "next/cache";

const viewsCollection = "visualizacoes";

export function getItemViews(slug: string | undefined | null): number {
  const safeSlug = slug || "fallback";
  let hash = 0;
  for (let i = 0; i < safeSlug.length; i++) {
    hash = ((hash << 5) - hash) + safeSlug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 8000) + 1500;
}

export async function getItemViewsAsync(slug: string | undefined | null): Promise<number> {
  const safeSlug = slug || "fallback";
  if (typeof window === "undefined" && process.env.NEXT_PHASE === "phase-production-build") {
    return getItemViews(safeSlug);
  }
  return unstable_cache(
    async () => {
      try {
        const ref = doc(db, viewsCollection, safeSlug);
        const snap = await getDocs(collection(db, viewsCollection));
        const docData = snap.docs.find((d) => d.id === safeSlug);
        if (docData) {
          const data = docData.data();
          if (data?.views) {
            return data.views;
          }
        }
      } catch (error) {
        console.error("Erro ao buscar visualizações:", error);
      }

      return getItemViews(safeSlug);
    },
    ["item-views", safeSlug],
    { revalidate: 60, tags: ["views"] }
  )();
}

export async function incrementItemViews(slug: string | undefined | null): Promise<number> {
  if (typeof window === "undefined" && process.env.NEXT_PHASE === "phase-production-build") {
    return getItemViews(slug || "fallback");
  }
  const safeSlug = slug || "fallback";
  const ref = doc(db, viewsCollection, safeSlug);

  try {
    const snap = await getDocs(collection(db, viewsCollection));
    const existing = snap.docs.find((d) => d.id === safeSlug);
    const existingData = existing?.data();
    const current = existingData?.views || 0;
    const next = current + 1;

    await setDoc(
      ref,
      {
        slug: safeSlug,
        views: next,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return next;
  } catch (error) {
    console.error("Erro ao incrementar visualizações:", error);
    return getItemViews(safeSlug);
  }
}
