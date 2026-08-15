import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { visitorId, name, phone, email } = body;

  if (!visitorId || (!phone && !email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const db = getDb();
  const now = new Date().toISOString();

  // Upsert visitor
  db.prepare(`
    INSERT INTO visitors (id, name, phone, email, createdAt)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name  = excluded.name,
      phone = excluded.phone,
      email = excluded.email
  `).run(
    String(visitorId).slice(0, 64),
    String(name ?? "").slice(0, 200),
    String(phone ?? "").slice(0, 50),
    String(email ?? "").slice(0, 200),
    now,
  );

  // Also save to leads for admin visibility
  db.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    visitorId,
    String(name ?? "").slice(0, 200),
    String(email ?? "").slice(0, 200),
    String(phone ?? "").slice(0, 50),
    "Lead captured via site popup",
    "General",
    now,
  );

  return NextResponse.json({ ok: true });
}
