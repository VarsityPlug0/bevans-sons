import { getDb } from "./db";
export { CATEGORIES } from "./categories";

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any): Product {
  return { ...row, inStock: row.inStock === 1, featured: row.featured === 1 };
}

export function getProducts(): Product[] {
  return getDb()
    .prepare("SELECT * FROM products ORDER BY createdAt DESC")
    .all()
    .map(toProduct);
}

export function getProduct(id: string): Product | undefined {
  const row = getDb().prepare("SELECT * FROM products WHERE id = ?").get(id);
  return row ? toProduct(row) : undefined;
}

export function getRelated(id: string, category: string, limit = 4): Product[] {
  return getDb()
    .prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?")
    .all(category, id, limit)
    .map(toProduct);
}

export function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const db = getDb();
  const now = new Date().toISOString();
  const id = `${Date.now()}`;
  db.prepare(`
    INSERT INTO products (id, name, price, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @price, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
  `).run({ id, ...data, inStock: data.inStock ? 1 : 0, featured: data.featured ? 1 : 0, createdAt: now, updatedAt: now });
  return getProduct(id)!;
}

export function updateProduct(id: string, data: Partial<Omit<Product, "id" | "createdAt">>): Product | null {
  if (!getProduct(id)) return null;
  const now = new Date().toISOString();
  getDb().prepare(`
    UPDATE products SET
      name = COALESCE(@name, name),
      price = COALESCE(@price, price),
      category = COALESCE(@category, category),
      description = COALESCE(@description, description),
      imageUrl = COALESCE(@imageUrl, imageUrl),
      inStock = COALESCE(@inStock, inStock),
      featured = COALESCE(@featured, featured),
      updatedAt = @updatedAt
    WHERE id = @id
  `).run({
    id,
    updatedAt: now,
    name: data.name ?? null,
    price: data.price ?? null,
    category: data.category ?? null,
    description: data.description ?? null,
    imageUrl: data.imageUrl ?? null,
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
