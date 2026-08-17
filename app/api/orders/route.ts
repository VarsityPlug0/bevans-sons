import { NextRequest, NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/orders";
import { isAuthenticated } from "@/lib/auth";
import { getProduct } from "@/lib/products";
import { sendMail } from "@/lib/mailer";
import { getRotatingBank, getBankById } from "@/lib/bankDetails";

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

  // Apply 25% bulk discount for orders >= R10,000 (same logic as checkout UI)
  const bulkDiscount = computedTotal >= 10000 ? computedTotal * 0.25 : 0;
  const finalTotal = Math.round(computedTotal - bulkDiscount);

  // Reuse the same bank for returning customers (matched by email or phone)
  const returning = db.prepare(
    "SELECT bank_id FROM orders WHERE (email = ? OR phone = ?) AND bank_id IS NOT NULL LIMIT 1"
  ).get(email.trim().toLowerCase(), phone.trim()) as { bank_id: string } | undefined;

  const bank = returning?.bank_id
    ? getBankById(returning.bank_id)
    : getRotatingBank((db.prepare("SELECT COUNT(*) as c FROM orders").get() as { c: number }).c);

  const order = createOrder({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    address: (address ?? "").toString().slice(0, 500).trim(),
    items: validatedItems,
    total: finalTotal,
    bank_id: bank.id,
  });

  // Email admin — new order alert
  const itemLines = order.items.map(i => `${i.name} × ${i.qty} — R ${parsePrice(i.price).toLocaleString()}`).join("\n");
  const payshapLine = bank.payshap ? `\nPayShap: ${bank.payshap}` : "";
  const discountLine = bulkDiscount > 0 ? `\nSubtotal: R${computedTotal.toLocaleString()}\nBulk Discount (25%): -R${Math.round(bulkDiscount).toLocaleString()}` : "";
  sendMail({
    to: "daisygadgetsco@gmail.com, moneybman0@gmail.com",
    subject: `New Order ${order.ref} — R${finalTotal.toLocaleString()} — ${name}`,
    html: `<pre style="font-family:monospace;font-size:13px">New order received.\n\nRef: ${order.ref}\nCustomer: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || "—"}\n\nItems:\n${itemLines}${discountLine}\n\nTotal to collect: R${finalTotal.toLocaleString()}\n\nBank: ${bank.bank} | ${bank.accountHolder} | Acc: ${bank.accountNumber} | Branch: ${bank.branchCode}${payshapLine}</pre>`,
  });

  return NextResponse.json({ ok: true, ref: order.ref, id: order.id, bank });
}
