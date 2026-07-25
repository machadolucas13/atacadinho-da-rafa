"use server";

import { cookies } from "next/headers";
import { signSession } from "@/server/admin-session";

const SESSION_COOKIE = "admin_session";

export async function loginWithSecret(secret: string) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET;

  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return { error: "Segredo inválido" };
  }

  const session = signSession(ADMIN_SECRET);

  cookies().set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return { ok: true };
}

export async function logoutAdmin() {
  cookies().delete(SESSION_COOKIE);
  return { ok: true };
}
