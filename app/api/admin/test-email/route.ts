import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { sendTrackingUpdate, sendStatusUpdate, TRACKING_TEMPLATES } from "@/lib/mailer";

export const runtime = "nodejs";

const DUMMY = {
  name:            "Test Customer",
  ref:             "DC-TEST01",
  tracking_number: "DGC-20260817-0001",
  items:           [{ name: "Smart Tech Product", price: "799", qty: 1, imageUrl: "" }],
  total:           799,
};

export async function POST(req: NextRequest) {
  const ok = await isAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { templateId, email } = body as { templateId: string; email: string };

  if (!email || !templateId) {
    return NextResponse.json({ error: "templateId and email required" }, { status: 400 });
  }

  // Status-triggered emails (shipped / delivered)
  if (templateId === "shipped" || templateId === "delivered") {
    await sendStatusUpdate({
      name:            DUMMY.name,
      email,
      ref:             DUMMY.ref,
      status:          templateId,
      tracking_number: templateId === "shipped" ? DUMMY.tracking_number : null,
    });
    return NextResponse.json({ ok: true });
  }

  // Manual tracking templates
  if (!TRACKING_TEMPLATES[templateId]) {
    return NextResponse.json({ error: "Invalid template" }, { status: 400 });
  }

  await sendTrackingUpdate({
    name:            DUMMY.name,
    email,
    ref:             DUMMY.ref,
    templateId,
    message:         TRACKING_TEMPLATES[templateId].defaultMessage,
    tracking_number: DUMMY.tracking_number,
  });

  return NextResponse.json({ ok: true });
}
