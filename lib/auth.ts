import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const DEV_SECRET = "bevans-sons-dev-secret-change-me";

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    console.error("[bevans] ADMIN_SECRET env var is not set in production!");
  }
  return secret ?? DEV_SECRET;
}

const COOKIE_NAME = "bevans_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export function signSession(userId: string): string {
  const secret = getSecret();
  const payload = `${userId}:${Date.now()}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}:${sig}`;
}

export function verifySession(token: string): boolean {
  const secret = getSecret();
  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const [userId, tsStr, sig] = parts;

  const ts = parseInt(tsStr, 10);
  if (isNaN(ts) || Date.now() - ts > MAX_AGE * 1000) return false;

  const payload = `${userId}:${tsStr}`;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");

  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const store = await cookies();
    const c = store.get(COOKIE_NAME);
    return !!c?.value && verifySession(c.value);
  } catch {
    return false;
  }
}

export { COOKIE_NAME, MAX_AGE };
