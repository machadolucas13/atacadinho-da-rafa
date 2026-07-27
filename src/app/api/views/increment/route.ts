import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const viewsCollection = "visualizacoes";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug obrigatório" }, { status: 400 });
    }
    const snap = await adminDb.collection(viewsCollection).doc(slug).get();
    const data = snap.data();
    const views = typeof data?.views === "number" ? data.views : 0;
    return NextResponse.json({ views });
  } catch (error) {
    console.error("[views] Erro ao buscar visualizações:", error);
    return NextResponse.json({ error: "Erro ao buscar visualizações" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
    }

    const docRef = adminDb.collection(viewsCollection).doc(slug);
    const snap = await docRef.get();
    const current = snap.exists ? (snap.data()?.views || 0) : 0;
    const next = current + 1;

    await docRef.set({ slug, views: next, updatedAt: new Date() }, { merge: true });

    console.log(`[views] incremented ${slug} => ${next}`);
    return NextResponse.json({ ok: true, views: next });
  } catch (error) {
    console.error("[views] Erro ao registrar visualização:", error);
    return NextResponse.json({ error: "Erro ao registrar visualização" }, { status: 500 });
  }
}
