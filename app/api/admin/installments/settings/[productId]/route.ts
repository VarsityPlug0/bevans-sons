import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSettings, upsertSettings, listAllSettings } from "@/lib/installments";

export async function GET(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { productId } = await params;
  if (productId === "all") {
    return NextResponse.json(listAllSettings());
  }
  const s = getSettings(productId);
  return NextResponse.json(s ?? null);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { productId } = await params;
  const body = await req.json();
  const { min_deposit_pct, eligible_terms, monthly_rate, admin_fee, active } = body;

  if (!Array.isArray(eligible_terms) || eligible_terms.length === 0) {
    return NextResponse.json({ error: "eligible_terms must be a non-empty array" }, { status: 400 });
  }

  const settings = upsertSettings({
    product_id: productId,
    min_deposit_pct: Number(min_deposit_pct ?? 10),
    eligible_terms: eligible_terms.map(Number),
    monthly_rate: Number(monthly_rate ?? 0),
    admin_fee: Number(admin_fee ?? 0),
    active: active !== false,
  });

  return NextResponse.json(settings);
}
