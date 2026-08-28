import { getDb } from "./db";

export interface StockCheckResult {
  variantId: string;
  sku: string;
  available: number;
  requested: number;
  ok: boolean;
}

/** Check stock for a single variant without modifying it. */
export function checkStock(variantId: string, qty: number): StockCheckResult {
  const row = getDb()
    .prepare("SELECT id, sku, stock FROM product_variants WHERE id = ?")
    .get(variantId) as { id: string; sku: string; stock: number } | undefined;

  if (!row) return { variantId, sku: "", available: 0, requested: qty, ok: false };
  return { variantId, sku: row.sku, available: Number(row.stock), requested: qty, ok: Number(row.stock) >= qty };
}

export interface CartLine {
  variantId: string;
  qty: number;
}

/** Check all cart lines — returns per-line results and overall ok flag. */
export function checkCartStock(lines: CartLine[]): { results: StockCheckResult[]; ok: boolean } {
  const results = lines.map(l => checkStock(l.variantId, l.qty));
  return { results, ok: results.every(r => r.ok) };
}

/** Low-stock threshold (units). */
const LOW_STOCK_THRESHOLD = 5;

export interface LowStockItem {
  variantId: string;
  productId: string;
  productName: string;
  colour: string;
  size: string;
  sku: string;
  stock: number;
}

/** Return all variants at or below the low-stock threshold. */
export function getLowStockVariants(threshold = LOW_STOCK_THRESHOLD): LowStockItem[] {
  return getDb().prepare(`
    SELECT
      pv.id AS variantId,
      pv.product_id AS productId,
      p.name AS productName,
      pv.colour,
      pv.size,
      pv.sku,
      pv.stock
    FROM product_variants pv
    JOIN products p ON p.id = pv.product_id
    WHERE pv.stock <= ?
    ORDER BY pv.stock ASC, p.name ASC
  `).all(threshold) as LowStockItem[];
}

export interface DeductResult {
  ok: boolean;
  /** Variant IDs that had insufficient stock (empty when ok=true). */
  insufficient: string[];
}

/**
 * Atomically deduct stock for all lines in a single SQLite transaction.
 * Rolls back entirely if any variant has insufficient stock.
 */
export function deductStock(lines: CartLine[]): DeductResult {
  const db = getDb();

  const insufficient: string[] = [];

  const deduct = db.transaction((items: CartLine[]) => {
    for (const { variantId, qty } of items) {
      const row = db
        .prepare("SELECT stock FROM product_variants WHERE id = ?")
        .get(variantId) as { stock: number } | undefined;

      if (!row || Number(row.stock) < qty) {
        insufficient.push(variantId);
      }
    }

    if (insufficient.length > 0) {
      throw new Error("INSUFFICIENT_STOCK");
    }

    for (const { variantId, qty } of items) {
      db.prepare("UPDATE product_variants SET stock = stock - ?, updatedAt = ? WHERE id = ?")
        .run(qty, new Date().toISOString(), variantId);
    }
  });

  try {
    deduct(lines);
    return { ok: true, insufficient: [] };
  } catch {
    return { ok: false, insufficient };
  }
}

/**
 * Restore stock (e.g. on order cancellation / rejection).
 */
export function restoreStock(lines: CartLine[]): void {
  const db = getDb();
  const now = new Date().toISOString();
  const restore = db.transaction((items: CartLine[]) => {
    for (const { variantId, qty } of items) {
      db.prepare("UPDATE product_variants SET stock = stock + ?, updatedAt = ? WHERE id = ?")
        .run(qty, now, variantId);
    }
  });
  restore(lines);
}
