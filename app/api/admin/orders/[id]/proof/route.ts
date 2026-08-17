import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getOrder, updateOrder } from "@/lib/orders";
import { uploadImage, isConfigured } from "@/lib/cloudinary";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await isAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const order = getOrder(id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const { file: base64, mimeType, filename } = body;

  if (!base64 || !mimeType || !filename)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const buffer = Buffer.from(base64, "base64");
  if (buffer.length > 8 * 1024 * 1024)
    return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];
  if (!allowed.includes(mimeType))
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });

  let url: string;
  if (isConfigured()) {
    url = await uploadImage(buffer, `proof-${order.ref}-${filename}`);
  } else {
    const dir = path.join(process.cwd(), "public", "uploads", "proofs");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const ext = filename.split(".").pop() ?? "jpg";
    const name = `proof-${order.ref}-${Date.now()}.${ext}`;
    writeFileSync(path.join(dir, name), buffer);
    url = `/uploads/proofs/${name}`;
  }

  const updated = updateOrder(id, { proof_url: url });
  return NextResponse.json(updated);
}
