import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProducts, createProduct } from "@/lib/products";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getProducts());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, price, category, description, imageUrl, inStock, featured } = body;

  if (!name || !price || !category) {
    return NextResponse.json({ error: "name, price and category are required" }, { status: 400 });
  }

  const product = createProduct({
    name,
    price,
    category,
    description: description ?? "",
    imageUrl: imageUrl ?? "",
    inStock: inStock !== false,
    featured: featured === true,
  });

  return NextResponse.json(product, { status: 201 });
}
