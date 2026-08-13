import { NextRequest, NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/orders";
import { isAuthenticated } from "@/lib/auth";
import { getProduct } from "@/lib/products";
import nodemailer from "nodemailer";

const BANK = {
  bank: "TymeBank",
  accountHolder: "Daisy & Co.",
  accountType: "Business",
  accountNumber: "51072673949",
  branchCode: "678910",
};

const transporter = process.env.MAIL_USER && process.env.MAIL_PASS
  ? nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    })
  : null;

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

  // Validate each item against actual product prices — never trust client totals
  const validatedItems: { id: string; name: string; price: string; qty: number; imageUrl: string }[] = [];
  let computedTotal = 0;

  for (const item of items) {
    const product = getProduct(String(item.id ?? ""));
    if (!product) return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
    const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));
    computedTotal += parsePrice(product.price) * qty;
    validatedItems.push({ id: product.id, name: product.name, price: product.price, qty, imageUrl: product.imageUrl });
  }

  const order = createOrder({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), address: (address ?? "").toString().slice(0, 500).trim(), items: validatedItems, total: computedTotal });

  // Notify admin
  if (transporter) {
    const itemLines = order.items.map(i => `${i.name} × ${i.qty} — R ${Number(i.price).toLocaleString()}`).join("\n");
    transporter.sendMail({
      from: process.env.MAIL_USER,
      to: "info@daisyandco.co.za",
      subject: `New Order ${order.ref} — R${order.total.toLocaleString()} — ${name}`,
      text: `New order received.\n\nRef: ${order.ref}\nCustomer: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n${itemLines}\n\nTotal: R${order.total.toLocaleString()}\n\nBank: ${BANK.bank} | ${BANK.accountHolder} | ${BANK.accountNumber}`,
    }).catch(console.error);
  }

  return NextResponse.json({ ok: true, ref: order.ref, id: order.id, bank: BANK });
}
