import { getDb } from "./db";

export interface ProductVariant {
  id: string;
  product_id: string;
  colour: string;
  size: string;
  sku: string;
  stock: number;
  price_override: number | null;
  createdAt: string;
  updatedAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toVariant(row: any): ProductVariant {
  return { ...row, stock: Number(row.stock), price_override: row.price_override != null ? Number(row.price_override) : null };
}

export function getVariant(id: string): ProductVariant | null {
  const row = getDb().prepare("SELECT * FROM product_variants WHERE id = ?").get(id);
  return row ? toVariant(row) : null;
}

export function getVariantsByProduct(productId: string): ProductVariant[] {
  return getDb()
    .prepare("SELECT * FROM product_variants WHERE product_id = ? ORDER BY colour, size")
    .all(productId)
    .map(toVariant);
}

export function getVariantBySku(sku: string): ProductVariant | null {
  const row = getDb().prepare("SELECT * FROM product_variants WHERE sku = ?").get(sku);
  return row ? toVariant(row) : null;
}

export function createVariant(data: {
  product_id: string;
  colour: string;
  size: string;
  sku: string;
  stock: number;
  price_override?: number | null;
}): ProductVariant {
  const db = getDb();
  const now = new Date().toISOString();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  db.prepare(`
    INSERT INTO product_variants (id, product_id, colour, size, sku, stock, price_override, createdAt, updatedAt)
    VALUES (@id, @product_id, @colour, @size, @sku, @stock, @price_override, @now, @now)
  `).run({
    id,
    product_id: data.product_id,
    colour: data.colour,
    size: data.size,
    sku: data.sku,
    stock: data.stock,
    price_override: data.price_override ?? null,
    now,
  });
  return getVariant(id)!;
}

export function updateVariant(id: string, data: Partial<Pick<ProductVariant, "colour" | "size" | "sku" | "stock" | "price_override">>): ProductVariant | null {
  const db = getDb();
  const sets: string[] = [];
  const params: Record<string, unknown> = { id, now: new Date().toISOString() };

  if (data.colour !== undefined)         { sets.push("colour = @colour");               params.colour = data.colour; }
  if (data.size !== undefined)           { sets.push("size = @size");                   params.size = data.size; }
  if (data.sku !== undefined)            { sets.push("sku = @sku");                     params.sku = data.sku; }
  if (data.stock !== undefined)          { sets.push("stock = @stock");                 params.stock = data.stock; }
  if (data.price_override !== undefined) { sets.push("price_override = @price_override"); params.price_override = data.price_override; }

  if (!sets.length) return getVariant(id);
  sets.push("updatedAt = @now");

  db.prepare(`UPDATE product_variants SET ${sets.join(", ")} WHERE id = @id`).run(params);
  return getVariant(id);
}

export function deleteVariant(id: string): boolean {
  return getDb().prepare("DELETE FROM product_variants WHERE id = ?").run(id).changes > 0;
}

export function deleteVariantsByProduct(productId: string): number {
  return getDb().prepare("DELETE FROM product_variants WHERE product_id = ?").run(productId).changes;
}
