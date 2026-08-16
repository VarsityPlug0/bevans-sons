import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  const { visitorId, name, phone, email } = await req.json();
  if (!visitorId) return NextResponse.json({ error: "visitorId required" }, { status: 400 });

  const db = getDb();
  const now = new Date().toISOString();

  // Return existing open session for this visitor
  const existing = db.prepare(
    "SELECT id FROM chat_sessions WHERE visitorId = ? AND status = 'open' ORDER BY createdAt DESC LIMIT 1"
  ).get(visitorId) as { id: string } | undefined;

  if (existing) {
    // Update name/phone if provided
    if (name || phone || email) {
      db.prepare("UPDATE chat_sessions SET name=COALESCE(?,name), phone=COALESCE(?,phone), email=COALESCE(?,email) WHERE id=?")
        .run(name || null, phone || null, email || null, existing.id);
    }
    return NextResponse.json({ sessionId: existing.id });
  }

  const id = randomBytes(8).toString("hex");
  db.prepare(`
    INSERT INTO chat_sessions (id, visitorId, name, phone, email, status, unreadAdmin, lastMessageAt, createdAt)
    VALUES (?, ?, ?, ?, ?, 'open', 0, ?, ?)
  `).run(id, visitorId, name || null, phone || null, email || null, now, now);

  return NextResponse.json({ sessionId: id });
}
