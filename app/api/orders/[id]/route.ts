import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/lib/orders";
import { isAuthenticated } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await isAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const order = getOrder(id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}

const VALID_STATUSES = new Set(["pending", "proof_submitted", "approved", "rejected", "shipped", "delivered"]);

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await isAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const update: Parameters<typeof updateOrder>[1] = {};
  if (body.status !== undefined) {
    if (!VALID_STATUSES.has(body.status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    update.status = body.status;
  }
  if (body.notes !== undefined) update.notes = String(body.notes).slice(0, 2000);
  if (body.proof_url !== undefined) update.proof_url = String(body.proof_url).slice(0, 1000);
  if (body.eft_reference !== undefined) update.eft_reference = String(body.eft_reference).slice(0, 200);

  const order = updateOrder(id, update);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}
