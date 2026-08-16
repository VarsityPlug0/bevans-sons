import { NextRequest, NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/orders";
import { isAuthenticated } from "@/lib/auth";
import { getProduct } from "@/lib/products";
import { sendMail } from "@/lib/mailer";

const BANK = {
  bank: "FNB / RMB",
  accountHolder: "Daisy Gadgets Co.",
  accountType: "Business",
  accountNumber: "63211629332",
  branchCode: "250655",
  payshap: "+27848961782@FNB",
};

export async function GET() {
  const ok = await isAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(listOrders());
}

function parsePrice(p: unknown): number {
  return parseFloat(String(p ?? "0").replace(/[^0-9.]/g, "")) || 0;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, address, items } = body;

  if (!name || !email || !phone || !Array.isArray(items) || !items.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (typeof name !== "string" || name.length > 200) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  if (typeof email !== "string" || email.length > 200 || !email.includes("@")) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  if (typeof phone !== "string" || phone.length > 30) return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  if (items.length > 50) return NextResponse.json({ error: "Too many items" }, { status: 400 });

  // Duplicate guard: same phone + same first item within 3 minutes
  const { getDb } = await import("@/lib/db");
  const db = getDb();
  const threeMinAgo = new Date(Date.now() - 3 * 60 * 1000).toISOString();
  const firstItemId = String(items[0]?.id ?? "");
  const dup = db.prepare(`
    SELECT o.id FROM orders o
    WHERE o.phone = ? AND o.createdAt > ? AND json_extract(o.items, '$[0].id') = ?
    LIMIT 1
  `).get(phone.trim(), threeMinAgo, firstItemId);
  if (dup) {
    return NextResponse.json({ ok: true, ref: "DUPLICATE", duplicate: true }, { status: 200 });
  }

  const validatedItems: { id: string; name: string; price: string; qty: number; imageUrl: string }[] = [];
  let computedTotal = 0;

  for (const item of items) {
    const product = getProduct(String(item.id ?? ""));
    if (!product) return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
    const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));
    computedTotal += parsePrice(product.price) * qty;
    validatedItems.push({ id: product.id, name: product.name, price: product.price, qty, imageUrl: product.imageUrl });
  }

  const order = createOrder({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    address: (address ?? "").toString().slice(0, 500).trim(),
    items: validatedItems,
    total: computedTotal,
  });

  // Email admin — new order alert
  const itemLines = order.items.map(i => `${i.name} × ${i.qty} — R ${parsePrice(i.price).toLocaleString()}`).join("\n");
  sendMail({
    to: "daisygadgetsco@gmail.com, moneybman0@gmail.com",
    subject: `New Order ${order.ref} — R${order.total.toLocaleString()} — ${name}`,
    html: `<pre style="font-family:monospace;font-size:13px">New order received.\n\nRef: ${order.ref}\nCustomer: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || "—"}\n\nItems:\n${itemLines}\n\nTotal: R${order.total.toLocaleString()}\n\nBank: ${BANK.bank} | ${BANK.accountHolder} | Acc: ${BANK.accountNumber} | Branch: ${BANK.branchCode} | PayShap: ${BANK.payshap}</pre>`,
  });

  return NextResponse.json({ ok: true, ref: order.ref, id: order.id, bank: BANK });
}
