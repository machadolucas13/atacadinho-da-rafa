import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snap = await adminDb.collection("visualizacoes").get();
    const views: Record<string, number> = {};
    snap.forEach((doc) => {
      const data = doc.data();
      if (typeof data?.views === "number") {
        views[doc.id] = data.views;
      }
    });
    const total = Object.values(views).reduce((a, b) => a + b, 0);
    return NextResponse.json({
      total,
      count: Object.keys(views).length,
      views,
    });
  } catch (error) {
    console.error("[views/all] error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
