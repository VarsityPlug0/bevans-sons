import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref")?.trim();
  if (!ref) return NextResponse.json({ error: "Ref required" }, { status: 400 });

  const order = getOrder(ref);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // Return only public-safe fields
  return NextResponse.json({
    ref: order.ref,
    status: order.status,
    name: order.name,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    items: order.items,
    total: order.total,
  });
}
