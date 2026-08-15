import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getQuote, updateQuoteStatus } from "@/lib/quotes";
import { sendQuoteReply } from "@/lib/mailer";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { packageName, price, message } = body;

  if (!price) return NextResponse.json({ error: "price is required" }, { status: 400 });

  const quote = getQuote(id);
  if (!quote) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Update status to quoted
  updateQuoteStatus(id, "quoted");

  // Store reply in DB
  getDb().prepare(`
    UPDATE quotes SET recommendedPackage = ?, estimatedPrice = ?, message = ? WHERE id = ?
  `).run(packageName ?? quote.recommendedPackage, price, message ?? "", id);

  // Email customer
  if (quote.email) {
    await sendQuoteReply({
      name: quote.name,
      email: quote.email,
      ref: quote.ref,
      package: packageName ?? quote.recommendedPackage ?? "Custom Package",
      price,
      message: message ?? "",
    });
  }

  return NextResponse.json({ ok: true });
}
