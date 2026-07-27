import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snap = await adminDb.collection("visualizacoes").get();
    const docs: Record<string, unknown> = {};
    snap.forEach((d) => {
      docs[d.id] = d.data();
    });
    const sampleId = snap.docs[0]?.id || null;
    const sampleData = sampleId ? (await adminDb.collection("visualizacoes").doc(sampleId).get()).data() : null;

    return NextResponse.json({
      total: snap.size,
      docs,
      sampleId,
      sampleData,
    });
  } catch (error) {
    console.error("[debug/views] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
