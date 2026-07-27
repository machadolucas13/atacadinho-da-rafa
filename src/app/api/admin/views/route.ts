import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snap = await adminDb.collection("visualizacoes").get();
    const views: Record<string, number> = {};
    snap.forEach((doc) => {
      const data = doc.data();
      if (data?.slug && typeof data.views === "number") {
        views[data.slug] = data.views;
      }
    });
    return NextResponse.json({ views });
  } catch (error) {
    console.error("[admin/views] error:", error);
    return NextResponse.json({ views: {} });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug;
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ views: {} });
    }

    const docRef = adminDb.collection("visualizacoes").doc(slug);
    const snap = await docRef.get();
    const current = snap.exists ? (snap.data()?.views || 0) : 0;
    const next = current + 1;

    await docRef.set({ slug, views: next, updatedAt: new Date() }, { merge: true });
    return NextResponse.json({ views: { [slug]: next } });
  } catch (error) {
    console.error("[admin/views] increment error:", error);
    return NextResponse.json({ views: {} });
  }
}
