import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { uploadImage, isConfigured } from "@/lib/cloudinary";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { file: base64, mimeType, filename } = body;

  if (!base64 || !mimeType || !filename) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.includes(mimeType)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP or GIF allowed" }, { status: 400 });
  }

  const buffer = Buffer.from(base64, "base64");
  if (buffer.length > MAX_SIZE) {
    return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 });
  }

  if (isConfigured()) {
    const url = await uploadImage(buffer, filename);
    return NextResponse.json({ url });
  }

  // Local fallback
  const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
  if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });
  const ext = (filename as string).split(".").pop() ?? "jpg";
  const savedFilename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  writeFileSync(path.join(UPLOAD_DIR, savedFilename), buffer);
  return NextResponse.json({ url: `/uploads/${savedFilename}` });
}
