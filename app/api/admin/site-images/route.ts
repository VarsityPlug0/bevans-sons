import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllSiteImages, upsertSiteImage } from "@/lib/siteImages";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getAllSiteImages());
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { key, url } = await req.json();
  if (!key || typeof key !== "string") return NextResponse.json({ error: "key required" }, { status: 400 });
  if (!url || typeof url !== "string" || url.length > 2000) return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  upsertSiteImage(key, url);
  return NextResponse.json({ ok: true });
}
