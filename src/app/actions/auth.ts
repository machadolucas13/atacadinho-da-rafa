"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession } from "@/server/admin-session";

const SESSION_COOKIE = "admin_session";

export async function loginWithSecret(secret: string) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return JsonError("Segredo inválido");
  }

  const session = signSession(ADMIN_SECRET);
  const response = NextResponse.json({ ok: true });
  const isProduction = process.env.NODE_ENV === "production";
  (response as any).cookies?.set?.({
    name: SESSION_COOKIE,
    value: session,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "lax" : "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export async function logoutAdmin() {
  const response = NextResponse.json({ ok: true });
  (response as any).cookies?.delete?.(SESSION_COOKIE);
  return response;
}

function JsonError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}
