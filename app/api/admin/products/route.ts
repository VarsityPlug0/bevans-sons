import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProducts, createProduct } from "@/lib/products";
import { exportProductsJson } from "@/lib/db";

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
  const { name, price, originalPrice, category, description, imageUrl, inStock, featured, gender, material, fit, newArrival, slug } = body;

  if (!name || !price || !category) {
    return NextResponse.json({ error: "name, price and category are required" }, { status: 400 });
  }

  const product = createProduct({
    name,
    slug: slug ?? "",
    price,
    originalPrice: originalPrice ?? "",
    category,
    description: description ?? "",
    imageUrl: imageUrl ?? "",
    inStock: inStock !== false,
    featured: featured === true,
    gender: gender ?? null,
    material: material ?? null,
    fit: fit ?? null,
    newArrival: newArrival === true,
  });

  exportProductsJson();
  return NextResponse.json(product, { status: 201 });
}
