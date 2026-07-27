import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const viewsCollection = "visualizacoes";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug || "teste-debug";
    const safeSlug = String(slug);

    const docRef = adminDb.collection(viewsCollection).doc(safeSlug);
    const snap = await docRef.get();
    const current = snap.exists ? (snap.data()?.views || 0) : 0;
    const next = current + 1;

    console.log(`[debug/increment] ${safeSlug}: ${current} -> ${next}`);

    const result = await docRef.set(
      { slug: safeSlug, views: next, updatedAt: new Date() },
      { merge: true }
    );

    console.log("[debug/increment] write result:", result);

    const verifySnap = await docRef.get();
    const verifyData = verifySnap.data();

    return NextResponse.json({
      ok: true,
      slug: safeSlug,
      previous: current,
      next,
      verified: verifyData,
      exists: verifySnap.exists,
    });
  } catch (error) {
    console.error("[debug/increment] error:", error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug") || "teste-debug";

    const snap = await adminDb.collection(viewsCollection).doc(slug).get();
    const data = snap.data();

    return NextResponse.json({
      slug,
      exists: snap.exists,
      data: data || null,
    });
  } catch (error) {
    console.error("[debug/increment] GET error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
