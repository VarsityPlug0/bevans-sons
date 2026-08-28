import { NextRequest, NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/orders";
import { isAuthenticated } from "@/lib/auth";
import { getProduct } from "@/lib/products";
import { getVariant } from "@/lib/variants";
import { deductStock } from "@/lib/inventory";
import { sendMail, sendAdminOrderNotification } from "@/lib/mailer";
import { getDefaultBank } from "@/lib/bankDetails";
import { getAdminEmails, parsePrice as parsePriceFn } from "@/lib/config";

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
  const firstItemId = String(items[0]?.variantId ?? items[0]?.id ?? "");
  const dup = db.prepare(`
    SELECT o.id FROM orders o
    WHERE o.phone = ? AND o.createdAt > ? AND json_extract(o.items, '$[0].id') = ?
    LIMIT 1
  `).get(phone.trim(), threeMinAgo, firstItemId);
  if (dup) {
    return NextResponse.json({ ok: true, ref: "DUPLICATE", duplicate: true }, { status: 200 });
  }

  const validatedItems: {
    id: string; variantId?: string; name: string; price: number;
    qty: number; imageUrl: string; size?: string; colour?: string; sku?: string;
  }[] = [];
  let computedTotal = 0;

  for (const item of items) {
    const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1));

    if (item.variantId) {
      // Variant-based item — price from variant (or product fallback)
      const variant = getVariant(String(item.variantId));
      if (!variant) return NextResponse.json({ error: `Variant not found: ${item.variantId}` }, { status: 400 });

      const product = getProduct(variant.product_id);
      if (!product) return NextResponse.json({ error: `Product not found` }, { status: 400 });

      const priceNum = variant.price_override != null
        ? variant.price_override
        : parsePriceFn(product.price);

      if (variant.stock < qty) {
        return NextResponse.json({ error: `Insufficient stock for ${product.name} (${variant.colour} · ${variant.size})` }, { status: 400 });
      }

      computedTotal += priceNum * qty;
      validatedItems.push({
        id: product.id,
        variantId: variant.id,
        name: product.name,
        price: priceNum,
        qty,
        imageUrl: product.imageUrl,
        size: variant.size,
        colour: variant.colour,
        sku: variant.sku,
      });
    } else {
      // Legacy item without variant
      const product = getProduct(String(item.id ?? ""));
      if (!product) return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
      const priceNum = parsePriceFn(product.price);
      computedTotal += priceNum * qty;
      validatedItems.push({ id: product.id, name: product.name, price: priceNum, qty, imageUrl: product.imageUrl });
    }
  }

  const finalTotal = Math.round(computedTotal);

  // Atomically deduct stock for variant items
  const variantLines = validatedItems
    .filter((i) => i.variantId)
    .map((i) => ({ variantId: i.variantId!, qty: i.qty }));

  if (variantLines.length > 0) {
    const { ok: stockOk, insufficient } = deductStock(variantLines);
    if (!stockOk) {
      return NextResponse.json({ error: "Some items are out of stock", insufficient }, { status: 409 });
    }
  }

  const bank = getDefaultBank();

  const order = createOrder({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    address: (address ?? "").toString().slice(0, 500).trim(),
    items: validatedItems,
    total: finalTotal,
    bank_id: bank.id,
  });

  // Notify admin
  const adminEmail = getAdminEmails();
  if (adminEmail) {
    sendAdminOrderNotification({
      name: order.name,
      email: order.email,
      ref: order.ref,
      items: order.items.map(i => ({ ...i, price: String(i.price) })),
      total: order.total,
      address: order.address,
      phone: order.phone,
    }).catch(() => {});

    const itemLines = order.items.map(i => `${i.name}${i.size ? ` (${i.colour} · ${i.size})` : ""} × ${i.qty} — R ${i.price.toLocaleString()}`).join("\n");
    sendMail({
      to: adminEmail,
      subject: `New Order ${order.ref} — R${finalTotal.toLocaleString()} — ${name}`,
      html: `<pre style="font-family:monospace;font-size:13px">New order received.\n\nRef: ${order.ref}\nCustomer: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || "—"}\n\nItems:\n${itemLines}\n\nTotal: R${finalTotal.toLocaleString()}\n\nBank: ${bank.bank} | ${bank.accountHolder} | Acc: ${bank.accountNumber} | Branch: ${bank.branchCode}</pre>`,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, ref: order.ref, id: order.id, bank, total: finalTotal });
}
