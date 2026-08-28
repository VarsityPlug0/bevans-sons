import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { signSession, COOKIE_NAME, MAX_AGE } from "@/lib/auth";
import { rateLimit, resetLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed, remaining } = rateLimit(`login:${ip}`);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD ?? "bevans2024";

  // Timing-safe password comparison
  const match = password?.length === expected.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(expected));

  if (!match) {
    return NextResponse.json(
      { error: `Incorrect password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.` },
      { status: 401 }
    );
  }

  resetLimit(`login:${ip}`);

  const token = signSession("admin");
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}
