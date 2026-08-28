import { getDb } from "./db";
import { getVariantsByProduct, type ProductVariant } from "./variants";
export { CATEGORIES } from "./categories";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  originalPrice: string;
  category: string;
  gender: string | null;
  description: string;
  imageUrl: string;
  material: string | null;
  fit: string | null;
  newArrival: boolean;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any): Product {
  return {
    ...row,
    inStock: row.inStock === 1,
    featured: row.featured === 1,
    newArrival: row.newArrival === 1,
    gender: row.gender ?? null,
    material: row.material ?? null,
    fit: row.fit ?? null,
    slug: row.slug ?? row.id,
  };
}

export function getProducts(): Product[] {
  return getDb()
    .prepare("SELECT * FROM products ORDER BY createdAt DESC")
    .all()
    .map(toProduct);
}

export function getProductsWithVariants(): ProductWithVariants[] {
  const products = getProducts();
  return products.map(p => ({ ...p, variants: getVariantsByProduct(p.id) }));
}

export function getProduct(id: string): Product | undefined {
  const row = getDb()
    .prepare("SELECT * FROM products WHERE id = ? OR slug = ?")
    .get(id, id);
  return row ? toProduct(row) : undefined;
}

export function getProductWithVariants(id: string): ProductWithVariants | undefined {
  const p = getProduct(id);
  if (!p) return undefined;
  return { ...p, variants: getVariantsByProduct(p.id) };
}

export function getFeaturedProducts(limit = 8): Product[] {
  return getDb()
    .prepare("SELECT * FROM products WHERE featured = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?")
    .all(limit)
    .map(toProduct);
}

export function getNewArrivals(limit = 8): Product[] {
  return getDb()
    .prepare("SELECT * FROM products WHERE newArrival = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?")
    .all(limit)
    .map(toProduct);
}

export function getProductsByGender(gender: string, limit = 24): Product[] {
  return getDb()
    .prepare("SELECT * FROM products WHERE gender = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?")
    .all(gender, limit)
    .map(toProduct);
}

export function getProductsByCategory(category: string, limit = 24): Product[] {
  return getDb()
    .prepare("SELECT * FROM products WHERE category = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?")
    .all(category, limit)
    .map(toProduct);
}

// Backward-compat: returns sale products (products with originalPrice set)
export function getSaleProducts(limit = 24): Product[] {
  return getDb()
    .prepare("SELECT * FROM products WHERE inStock = 1 AND originalPrice IS NOT NULL AND originalPrice != '' ORDER BY createdAt DESC LIMIT ?")
    .all(limit)
    .map(toProduct);
}

export function getRelated(id: string, category: string, limit = 4): Product[] {
  return getDb()
    .prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?")
    .all(category, id, limit)
    .map(toProduct);
}

function buildSlug(name: string, id: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base}-${id.slice(-6)}`;
}

export function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const db = getDb();
  const now = new Date().toISOString();
  const id = `${Date.now()}`;
  const slug = data.slug || buildSlug(data.name, id);
  db.prepare(`
    INSERT INTO products (id, name, slug, price, originalPrice, category, gender, description, imageUrl, material, fit, newArrival, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @slug, @price, @originalPrice, @category, @gender, @description, @imageUrl, @material, @fit, @newArrival, @inStock, @featured, @createdAt, @updatedAt)
  `).run({
    id,
    name: data.name,
    slug,
    price: data.price,
    originalPrice: data.originalPrice ?? "",
    category: data.category,
    gender: data.gender ?? null,
    description: data.description,
    imageUrl: data.imageUrl,
    material: data.material ?? null,
    fit: data.fit ?? null,
    newArrival: data.newArrival ? 1 : 0,
    inStock: data.inStock ? 1 : 0,
    featured: data.featured ? 1 : 0,
    createdAt: now,
    updatedAt: now,
  });
  return getProduct(id)!;
}

export function updateProduct(id: string, data: Partial<Omit<Product, "id" | "createdAt">>): Product | null {
  if (!getProduct(id)) return null;
  const now = new Date().toISOString();
  getDb().prepare(`
    UPDATE products SET
      name         = COALESCE(@name, name),
      slug         = COALESCE(@slug, slug),
      price        = COALESCE(@price, price),
      originalPrice= COALESCE(@originalPrice, originalPrice),
      category     = COALESCE(@category, category),
      gender       = COALESCE(@gender, gender),
      description  = COALESCE(@description, description),
      imageUrl     = COALESCE(@imageUrl, imageUrl),
      material     = COALESCE(@material, material),
      fit          = COALESCE(@fit, fit),
      newArrival   = COALESCE(@newArrival, newArrival),
      inStock      = COALESCE(@inStock, inStock),
      featured     = COALESCE(@featured, featured),
      updatedAt    = @updatedAt
    WHERE id = @id
  `).run({
    id,
    updatedAt: now,
    name: data.name ?? null,
    slug: data.slug ?? null,
    price: data.price ?? null,
    originalPrice: data.originalPrice ?? null,
    category: data.category ?? null,
    gender: data.gender ?? null,
    description: data.description ?? null,
    imageUrl: data.imageUrl ?? null,
    material: data.material ?? null,
    fit: data.fit ?? null,
    newArrival: data.newArrival !== undefined ? (data.newArrival ? 1 : 0) : null,
    inStock: data.inStock !== undefined ? (data.inStock ? 1 : 0) : null,
    featured: data.featured !== undefined ? (data.featured ? 1 : 0) : null,
  });
  return getProduct(id)!;
}

export function deleteProduct(id: string): boolean {
  return getDb().prepare("DELETE FROM products WHERE id = ?").run(id).changes > 0;
}

export function saveLead(data: {
  name?: string; email?: string; phone?: string; message?: string; productInterest?: string;
}) {
  const db = getDb();
  const id = `${Date.now()}`;
  db.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (@id, @name, @email, @phone, @message, @productInterest, @createdAt)
  `).run({ id, ...data, createdAt: new Date().toISOString() });
}

export function getLeads() {
  return getDb().prepare("SELECT * FROM leads ORDER BY createdAt DESC").all();
}

export function getCartEvents() {
  return getDb().prepare(`
    SELECT c.*, v.name AS visitorName, v.phone AS visitorPhone, v.email AS visitorEmail
    FROM cart_events c
    LEFT JOIN visitors v ON c.visitorId = v.id
    ORDER BY c.createdAt DESC
    LIMIT 200
  `).all();
}
