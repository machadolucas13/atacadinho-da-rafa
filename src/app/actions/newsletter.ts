"use server";

import { cookies } from "next/headers";
import { signSession, verifySession } from "@/server/admin-session";
import { adminDb } from "@/server/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function inscreverNewsletter(formData: FormData) {
  const email = formData.get("email")?.toString().trim() || "";
  const prefs = formData.get("prefs")?.toString().trim() || "Todos os achados";
  if (!email || !email.includes("@")) {
    return { error: "Email inválido" };
  }

  try {
    await adminDb.collection("newsletter").add({
      email,
      prefs,
      dataCriacao: FieldValue.serverTimestamp(),
      ativo: true,
    });
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao se inscrever. Tente novamente." };
  }
}

export async function buscarInscritosNewsletter() {
  const session = cookies().get("admin_session")?.value;
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET || !verifySession(ADMIN_SECRET, session)) {
    return { error: "Não autorizado" };
  }

  try {
    const snapshot = await adminDb.collection("newsletter").orderBy("dataCriacao", "desc").get();
    const inscritos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { ok: true, inscritos };
  } catch (error) {
    return { error: "Erro ao buscar inscritos" };
  }
}

export async function excluirInscritoNewsletter(id: string) {
  const session = cookies().get("admin_session")?.value;
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET || !verifySession(ADMIN_SECRET, session)) {
    return { error: "Não autorizado" };
  }

  try {
    await adminDb.collection("newsletter").doc(id).delete();
    return { ok: true };
  } catch (error) {
    return { error: "Erro ao excluir inscrito" };
  }
}
