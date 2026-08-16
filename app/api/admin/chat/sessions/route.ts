import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const sessions = db.prepare(`
    SELECT s.*,
      (SELECT body FROM chat_messages WHERE sessionId=s.id ORDER BY createdAt DESC LIMIT 1) as lastMessage,
      (SELECT COUNT(*) FROM chat_messages WHERE sessionId=s.id) as messageCount
    FROM chat_sessions s
    ORDER BY s.lastMessageAt DESC
    LIMIT 100
  `).all();

  return NextResponse.json(sessions);
}
