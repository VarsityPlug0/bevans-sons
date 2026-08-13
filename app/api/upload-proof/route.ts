import { NextRequest, NextResponse } from "next/server";
import { uploadImage, isConfigured } from "@/lib/cloudinary";
import { updateOrder } from "@/lib/orders";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
  const body = await req.json();
  const { file: base64, mimeType, filename, orderId, ref } = body;

  if (!base64 || !mimeType || !filename) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const MAX = 8 * 1024 * 1024;
  const buffer = Buffer.from(base64, "base64");
  if (buffer.length > MAX) {
    return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];
  if (!allowed.includes(mimeType)) {
    return NextResponse.json({ error: "Invalid file type. Upload JPG, PNG, WEBP or PDF." }, { status: 400 });
  }

  let url: string;

  if (isConfigured()) {
    url = await uploadImage(buffer, `proof-${ref ?? orderId ?? "order"}-${filename}`);
  } else {
    const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "proofs");
    if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });
    const ext = filename.split(".").pop() ?? "jpg";
    const savedFilename = `proof-${ref ?? orderId ?? "order"}-${Date.now()}.${ext}`;
    writeFileSync(path.join(UPLOAD_DIR, savedFilename), buffer);
    url = `/uploads/proofs/${savedFilename}`;
  }

  if (orderId || ref) {
    updateOrder(orderId ?? ref!, { proof_url: url, status: "proof_submitted" });
  }

  return NextResponse.json({ ok: true, url });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error("upload-proof error:", msg, err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
