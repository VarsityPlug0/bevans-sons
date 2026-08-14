import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, type, message } = body;

  if (!name || !phone || !message) {
    return NextResponse.json({ error: "Name, phone and message are required" }, { status: 400 });
  }

  const db = getDb();
  const id = randomBytes(8).toString("hex");
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, String(name).slice(0, 200), String(email ?? "").slice(0, 200), String(phone).slice(0, 50), String(message).slice(0, 2000), String(type ?? "General Enquiry").slice(0, 100), now);

  return NextResponse.json({ ok: true });
}
