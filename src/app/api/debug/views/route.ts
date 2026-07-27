import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const { collection, getDocs, doc, getDoc } = await import("firebase/firestore");
    const colRef = collection(db, "visualizacoes");
    const snap = await getDocs(colRef);
    const docs: Record<string, unknown> = {};
    snap.forEach((d) => {
      docs[d.id] = d.data();
    });
    const sample = snap.docs[0] ? await getDoc(doc(db, "visualizacoes", snap.docs[0].id)) : null;

    return NextResponse.json({
      total: snap.size,
      docs,
      sampleId: sample?.id || null,
      sampleData: sample?.data() || null,
    });
  } catch (error) {
    console.error("[debug/views] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
