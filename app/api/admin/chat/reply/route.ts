import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { sessionId, body, status } = await req.json();
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

  const db = getDb();
  const now = new Date().toISOString();

  if (body?.trim()) {
    const id = randomBytes(8).toString("hex");
    db.prepare("INSERT INTO chat_messages (id, sessionId, sender, body, createdAt) VALUES (?,?,?,?,?)")
      .run(id, sessionId, "admin", body.trim().slice(0, 2000), now);
    db.prepare("UPDATE chat_sessions SET lastMessageAt=?, unreadAdmin=0 WHERE id=?").run(now, sessionId);
  }

  if (status) {
    db.prepare("UPDATE chat_sessions SET status=? WHERE id=?").run(status, sessionId);
  }

  return NextResponse.json({ ok: true });
}
