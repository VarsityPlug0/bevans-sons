import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProducts } from "@/lib/products";
import { upsertSettings } from "@/lib/installments";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = getProducts();
  let enabled = 0;
  let skipped = 0;

  for (const p of products) {
    const price = parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0;
    if (price < 5000) { skipped++; continue; }

    upsertSettings({
      product_id: p.id,
      min_deposit_pct: 10,
      eligible_terms: [6, 12, 18, 24],
      monthly_rate: 0,
      admin_fee: 0,
      active: true,
    });
    enabled++;
  }

  return NextResponse.json({ ok: true, enabled, skipped });
}
