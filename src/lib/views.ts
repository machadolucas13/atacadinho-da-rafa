import { adminDb } from "@/lib/firebase-admin";

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
  try {
    const snap = await adminDb.collection(viewsCollection).doc(safeSlug).get();
    const data = snap.data();
    if (typeof data?.views === "number") {
      return data.views;
    }
  } catch (error) {
    console.error("Erro ao buscar visualizações:", error);
  }
  return getItemViews(safeSlug);
}

export async function incrementItemViews(slug: string | undefined | null): Promise<number> {
  const safeSlug = slug || "fallback";
  try {
    const docRef = adminDb.collection(viewsCollection).doc(safeSlug);
    const snap = await docRef.get();
    const current = snap.exists ? (snap.data()?.views || 0) : 0;
    const next = current + 1;

    await docRef.set({ slug: safeSlug, views: next, updatedAt: new Date() }, { merge: true });
    return next;
  } catch (error) {
    console.error("Erro ao incrementar visualizações:", error);
    return getItemViews(safeSlug);
  }
}
