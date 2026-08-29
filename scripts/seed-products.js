/**
 * Startup seed script — runs before `next start` on Render.
 * Imports all products from data/products.json into the SQLite DB.
 * Uses INSERT OR IGNORE so existing admin-edited rows are never overwritten.
 */

const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "bevans.db");
const JSON_PATH = path.join(DATA_DIR, "products.json");

if (!fs.existsSync(JSON_PATH)) {
  console.log("[seed] products.json not found, skipping.");
  process.exit(0);
}

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Ensure products table exists (minimal schema — getDb() will run full migrations later)
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    slug          TEXT NOT NULL DEFAULT '',
    price         TEXT NOT NULL,
    originalPrice TEXT NOT NULL DEFAULT '',
    category      TEXT NOT NULL,
    gender        TEXT NOT NULL DEFAULT 'Unisex',
    material      TEXT NOT NULL DEFAULT '',
    fit           TEXT NOT NULL DEFAULT '',
    description   TEXT NOT NULL DEFAULT '',
    imageUrl      TEXT NOT NULL DEFAULT '',
    inStock       INTEGER NOT NULL DEFAULT 1,
    featured      INTEGER NOT NULL DEFAULT 0,
    newArrival    INTEGER NOT NULL DEFAULT 0,
    createdAt     TEXT NOT NULL,
    updatedAt     TEXT NOT NULL
  );
`);

const rows = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
const now = new Date().toISOString();

const insert = db.prepare(`
  INSERT OR IGNORE INTO products
    (id, name, slug, price, originalPrice, category, gender, material, fit,
     description, imageUrl, inStock, featured, newArrival, createdAt, updatedAt)
  VALUES
    (@id, @name, @slug, @price, @originalPrice, @category, @gender, @material, @fit,
     @description, @imageUrl, @inStock, @featured, @newArrival, @createdAt, @updatedAt)
`);

const tx = db.transaction(() => {
  for (const p of rows) {
    insert.run({
      id:            p.id,
      name:          p.name ?? "",
      slug:          p.slug ?? p.id,
      price:         p.price ?? "",
      originalPrice: p.originalPrice ?? "",
      category:      p.category ?? "",
      gender:        p.gender ?? "Unisex",
      material:      p.material ?? "",
      fit:           p.fit ?? "",
      description:   p.description ?? "",
      imageUrl:      p.imageUrl ?? "",
      inStock:       p.inStock ? 1 : 0,
      featured:      p.featured ? 1 : 0,
      newArrival:    p.newArrival ? 1 : 0,
      createdAt:     p.createdAt ?? now,
      updatedAt:     p.updatedAt ?? now,
    });
  }
});

tx();
db.close();
console.log(`[seed] synced ${rows.length} products from products.json`);
