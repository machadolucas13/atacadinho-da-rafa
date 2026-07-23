import crypto from "crypto";

export function signSession(secret: string): string {
  const timestamp = Date.now().toString();
  const hmac = crypto.createHmac("sha256", secret).update(timestamp).digest("hex");
  return `${timestamp}.${hmac}`;
}

export function verifySession(secret: string, session: string | undefined): boolean {
  if (!session) return false;
  const parts = session.split(".");
  if (parts.length !== 2) return false;
  const [timestamp, hmac] = parts;
  const expected = crypto.createHmac("sha256", secret).update(timestamp).digest("hex");
  if (expected !== hmac) return false;
  const age = Date.now() - Number(timestamp);
  return age < 24 * 60 * 60 * 1000;
}
