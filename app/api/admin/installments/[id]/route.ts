import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updateApplicationStatus, getApplication } from "@/lib/installments";
import {
  sendInstallmentApproval,
  sendInstallmentReviewing,
  sendInstallmentAwaitingPayment,
  sendInstallmentActive,
  sendInstallmentCompleted,
  sendInstallmentDeclined,
} from "@/lib/mailer";

const VALID_STATUSES = ["new", "reviewing", "approved", "awaiting_payment", "active", "completed", "declined"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { status, admin_notes } = await req.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const app = getApplication(id);
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

  updateApplicationStatus(id, status, admin_notes);

  const emailData = {
    name: app.name,
    email: app.email,
    ref: app.ref,
    product_name: app.product_name,
    product_price: app.product_price,
    deposit: app.deposit,
    monthly_payment: app.monthly_payment,
    term_months: app.term_months,
    total_repayable: app.total_repayable,
    phone: app.phone,
    admin_notes: admin_notes ?? app.admin_notes,
  };

  const emailMap: Record<string, () => Promise<void>> = {
    reviewing:        () => sendInstallmentReviewing(emailData),
    approved:         () => sendInstallmentApproval(emailData),
    awaiting_payment: () => sendInstallmentAwaitingPayment(emailData),
    active:           () => sendInstallmentActive(emailData),
    completed:        () => sendInstallmentCompleted(emailData),
    declined:         () => sendInstallmentDeclined(emailData),
  };

  if (emailMap[status]) {
    emailMap[status]().catch(console.error);
  }

  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { action } = await req.json();

  if (action !== "resend_invoice") {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  const app = getApplication(id);
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await sendInstallmentApproval({
    name: app.name,
    email: app.email,
    ref: app.ref,
    product_name: app.product_name,
    product_price: app.product_price,
    deposit: app.deposit,
    monthly_payment: app.monthly_payment,
    term_months: app.term_months,
    total_repayable: app.total_repayable,
    phone: app.phone,
  });

  return NextResponse.json({ ok: true });
}
