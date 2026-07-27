import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug || "teste-minimo";
    const safeSlug = String(slug);

    const docRef = adminDb.collection("visualizacoes").doc(safeSlug);
    const snap = await docRef.get();
    const current = snap.exists ? (snap.data()?.views || 0) : 0;
    const next = current + 1;

    await docRef.set({ slug: safeSlug, views: next, updatedAt: new Date() }, { merge: true });

    return NextResponse.json({ ok: true, slug: safeSlug, previous: current, next });
  } catch (error) {
    console.error("[debug/minimal-increment] error:", error);
    return NextResponse.json(
      { ok: false, step: "write", error: String(error) },
      { status: 500 }
    );
  }
}
