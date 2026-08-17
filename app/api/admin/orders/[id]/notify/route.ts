import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getOrder } from "@/lib/orders";
import { sendTrackingUpdate, TRACKING_TEMPLATES } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await isAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const order = getOrder(id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const { templateId, message } = body as { templateId: string; message?: string };

  if (!templateId || !TRACKING_TEMPLATES[templateId]) {
    return NextResponse.json({ error: "Invalid template" }, { status: 400 });
  }

  await sendTrackingUpdate({
    name:            order.name,
    email:           order.email,
    ref:             order.ref,
    templateId,
    message:         message ?? TRACKING_TEMPLATES[templateId].defaultMessage,
    tracking_number: order.tracking_number,
  });

  return NextResponse.json({ ok: true });
}
