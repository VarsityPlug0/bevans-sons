import { NextRequest, NextResponse } from "next/server";
import { getSettings } from "@/lib/installments";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const settings = getSettings(productId);
  if (!settings) return NextResponse.json({ enabled: false });
  return NextResponse.json({ enabled: true, settings });
}
