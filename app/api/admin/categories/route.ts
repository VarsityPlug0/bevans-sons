import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getDb } from "@/lib/db";

export interface DbCategory {
  id: string;
  name: string;
  gender: string;
  position: number;
  createdAt: string;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM categories ORDER BY gender, position, name")
    .all() as DbCategory[];
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name, gender } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  const db = getDb();
  const id = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const maxPos = (db
    .prepare("SELECT MAX(position) as m FROM categories WHERE gender = ?")
    .get(gender ?? "Unisex") as { m: number | null }).m ?? -1;
  try {
    db.prepare(
      "INSERT INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"
    ).run(id, name.trim(), gender ?? "Unisex", maxPos + 1, new Date().toISOString());
  } catch {
    return NextResponse.json({ error: "Category already exists" }, { status: 409 });
  }
  return NextResponse.json({ id, name: name.trim(), gender: gender ?? "Unisex" }, { status: 201 });
}
