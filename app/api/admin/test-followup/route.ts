import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, name } = await req.json();
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  const db = getDb();

  // Upsert visitor
  const visitorId = randomUUID();
  db.prepare(`
    INSERT INTO visitors (id, name, email, createdAt)
    VALUES (?, ?, ?, datetime('now', '-26 hours'))
  `).run(visitorId, name ?? "Test User", email);

  // Seed 2 cart events backdated 25h ago (within the 24-72h window)
  const products = [
    { id: "test-prod-1", name: "iPhone 15 Pro Max", price: "R 23,999", category: "Smartphones" },
    { id: "test-prod-2", name: "Samsung 65\" QLED TV", price: "R 18,499", category: "TVs" },
  ];

  for (const p of products) {
    db.prepare(`
      INSERT INTO cart_events (id, visitorId, productId, productName, price, category, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now', '-25 hours'))
    `).run(randomUUID(), visitorId, p.id, p.name, p.price, p.category);
  }

  return NextResponse.json({ ok: true, visitorId, products: products.length });
}
