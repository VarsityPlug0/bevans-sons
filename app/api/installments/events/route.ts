import { NextRequest, NextResponse } from "next/server";
import { trackEvent, type InstallmentEvent } from "@/lib/installments";

const VALID_EVENTS: InstallmentEvent[] = [
  "eligibility_clicked", "step1_complete", "step2_complete",
  "application_submitted", "whatsapp_clicked", "term_changed", "abandoned",
];

export async function POST(req: NextRequest) {
  const { event, product_id, ref, term_months, metadata } = await req.json();
  if (!VALID_EVENTS.includes(event)) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }
  trackEvent({ event, product_id, ref, term_months, metadata });
  return NextResponse.json({ ok: true });
}
