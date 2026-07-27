import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function GET() {
  const result: Record<string, unknown> = {
    project: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || null,
    hasClientEmail: Boolean(process.env.FIREBASE_CLIENT_EMAIL),
    hasPrivateKey: Boolean(process.env.FIREBASE_PRIVATE_KEY),
    hasServiceAccountJson: Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_JSON),
    nodeEnv: process.env.NODE_ENV,
  };
  try {
    const snap = await adminDb.collection("visualizacoes").limit(1).get();
    result.canRead = true;
    result.sampleCount = snap.size;
  } catch (e) {
    result.canRead = false;
    result.readError = String(e);
  }
  try {
    const ref = adminDb.collection("visualizacoes").doc("__probe__");
    await ref.set({ slug: "__probe__", views: 0, updatedAt: new Date() }, { merge: true });
    result.canWrite = true;
  } catch (e) {
    result.canWrite = false;
    result.writeError = String(e);
  }
  return NextResponse.json(result);
}
