import Database from "better-sqlite3";
import path from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "bevans.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  initSchema(_db);
  runMigrations(_db);
  return _db;
}

export function exportProductsJson(db?: Database.Database): void {
  try {
    const d = db ?? getDb();
    const products = d.prepare("SELECT * FROM products ORDER BY category, name").all();
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(path.join(DATA_DIR, "products-backup.json"), JSON.stringify(products, null, 2));
  } catch { /* non-fatal */ }
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id            TEXT PRIMARY KEY,
      name          TEXT NOT NULL,
      price         TEXT NOT NULL,
      originalPrice TEXT NOT NULL DEFAULT '',
      category      TEXT NOT NULL,
      description   TEXT NOT NULL DEFAULT '',
      imageUrl      TEXT NOT NULL DEFAULT '',
      inStock       INTEGER NOT NULL DEFAULT 1,
      featured      INTEGER NOT NULL DEFAULT 0,
      createdAt     TEXT NOT NULL,
      updatedAt     TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS leads (
      id              TEXT PRIMARY KEY,
      name            TEXT,
      email           TEXT,
      phone           TEXT,
      message         TEXT,
      productInterest TEXT,
      createdAt       TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id             TEXT PRIMARY KEY,
      ref            TEXT UNIQUE NOT NULL,
      name           TEXT NOT NULL,
      email          TEXT NOT NULL,
      phone          TEXT NOT NULL,
      address        TEXT NOT NULL DEFAULT '',
      items          TEXT NOT NULL DEFAULT '[]',
      total          REAL NOT NULL DEFAULT 0,
      status         TEXT NOT NULL DEFAULT 'pending',
      payment_method TEXT NOT NULL DEFAULT 'eft',
      proof_url      TEXT,
      eft_reference  TEXT,
      notes          TEXT,
      bank_id        TEXT,
      tracking_number TEXT,
      createdAt      TEXT NOT NULL,
      updatedAt      TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS site_images (
      key     TEXT PRIMARY KEY,
      url     TEXT NOT NULL,
      label   TEXT NOT NULL,
      section TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS visitors (
      id          TEXT PRIMARY KEY,
      name        TEXT,
      phone       TEXT,
      email       TEXT,
      createdAt   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cart_events (
      id          TEXT PRIMARY KEY,
      visitorId   TEXT,
      productId   TEXT NOT NULL,
      productName TEXT NOT NULL,
      price       TEXT NOT NULL,
      category    TEXT NOT NULL,
      createdAt   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chat_sessions (
      id            TEXT PRIMARY KEY,
      visitorId     TEXT,
      name          TEXT,
      phone         TEXT,
      email         TEXT,
      status        TEXT NOT NULL DEFAULT 'open',
      unreadAdmin   INTEGER NOT NULL DEFAULT 0,
      lastMessageAt TEXT NOT NULL,
      createdAt     TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id        TEXT PRIMARY KEY,
      sessionId TEXT NOT NULL,
      sender    TEXT NOT NULL,
      body      TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS installment_settings (
      id               TEXT PRIMARY KEY,
      product_id       TEXT UNIQUE NOT NULL,
      min_deposit_pct  REAL NOT NULL DEFAULT 10,
      eligible_terms   TEXT NOT NULL DEFAULT '[6,12,18,24]',
      monthly_rate     REAL NOT NULL DEFAULT 0,
      admin_fee        REAL NOT NULL DEFAULT 0,
      active           INTEGER NOT NULL DEFAULT 1,
      createdAt        TEXT NOT NULL,
      updatedAt        TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS installment_applications (
      id               TEXT PRIMARY KEY,
      ref              TEXT UNIQUE NOT NULL,
      product_id       TEXT NOT NULL,
      product_name     TEXT NOT NULL,
      product_price    REAL NOT NULL,
      term_months      INTEGER NOT NULL,
      monthly_payment  REAL NOT NULL,
      deposit          REAL NOT NULL,
      total_repayable  REAL NOT NULL,
      name             TEXT NOT NULL,
      phone            TEXT NOT NULL,
      email            TEXT NOT NULL,
      id_number        TEXT NOT NULL,
      address          TEXT NOT NULL,
      status           TEXT NOT NULL DEFAULT 'new',
      whatsapp_clicked INTEGER NOT NULL DEFAULT 0,
      admin_notes      TEXT,
      createdAt        TEXT NOT NULL,
      updatedAt        TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS installment_events (
      id          TEXT PRIMARY KEY,
      event       TEXT NOT NULL,
      product_id  TEXT,
      ref         TEXT,
      term_months INTEGER,
      metadata    TEXT,
      createdAt   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS email_campaigns (
      id          TEXT PRIMARY KEY,
      subject     TEXT NOT NULL,
      heading     TEXT NOT NULL,
      body        TEXT NOT NULL,
      cta_text    TEXT,
      cta_url     TEXT,
      recipients  TEXT NOT NULL DEFAULT 'all',
      sent_to     INTEGER NOT NULL DEFAULT 0,
      status      TEXT NOT NULL DEFAULT 'sent',
      createdAt   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS email_sends (
      id         TEXT PRIMARY KEY,
      email      TEXT NOT NULL,
      type       TEXT NOT NULL,
      ref        TEXT,
      subject    TEXT,
      opened     INTEGER NOT NULL DEFAULT 0,
      clicked    INTEGER NOT NULL DEFAULT 0,
      opened_at  TEXT,
      clicked_at TEXT,
      createdAt  TEXT NOT NULL
    );
  `);

  // Backward-compat column migrations (existing installs)
  const safeMigrate = (sql: string) => { try { db.exec(sql); } catch { /* already exists */ } };
  safeMigrate("ALTER TABLE orders ADD COLUMN bank_id TEXT");
  safeMigrate("ALTER TABLE orders ADD COLUMN tracking_number TEXT");
  safeMigrate("ALTER TABLE installment_applications ADD COLUMN product_imageUrl TEXT");
}

function runMigrations(db: Database.Database) {
  const applied = (name: string) =>
    !!db.prepare("SELECT name FROM migrations WHERE name = ?").get(name);
  const mark = (name: string) =>
    db.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run(name);
  const safeMigrate = (sql: string) => { try { db.exec(sql); } catch { /* column/index exists */ } };

  // ── M1: Bevans product columns ──────────────────────────────────────────
  if (!applied("add_bevans_product_columns_v1")) {
    safeMigrate("ALTER TABLE products ADD COLUMN slug TEXT NOT NULL DEFAULT ''");
    safeMigrate("ALTER TABLE products ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex'");
    safeMigrate("ALTER TABLE products ADD COLUMN material TEXT NOT NULL DEFAULT ''");
    safeMigrate("ALTER TABLE products ADD COLUMN fit TEXT NOT NULL DEFAULT ''");
    safeMigrate("ALTER TABLE products ADD COLUMN newArrival INTEGER NOT NULL DEFAULT 0");
    mark("add_bevans_product_columns_v1");
  }

  // ── M2: Product variants ─────────────────────────────────────────────────
  if (!applied("create_product_variants_v1")) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS product_variants (
        id             TEXT PRIMARY KEY,
        product_id     TEXT NOT NULL,
        colour         TEXT NOT NULL DEFAULT '',
        size           TEXT NOT NULL DEFAULT '',
        sku            TEXT UNIQUE NOT NULL,
        stock          INTEGER NOT NULL DEFAULT 0,
        price_override TEXT,
        createdAt      TEXT NOT NULL,
        updatedAt      TEXT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
      CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);
      CREATE INDEX IF NOT EXISTS idx_variants_sku ON product_variants(sku);
    `);
    mark("create_product_variants_v1");
  }

  // ── M3: Product images gallery ───────────────────────────────────────────
  if (!applied("create_product_images_v1")) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS product_images (
        id         TEXT PRIMARY KEY,
        product_id TEXT NOT NULL,
        url        TEXT NOT NULL,
        alt        TEXT NOT NULL DEFAULT '',
        position   INTEGER NOT NULL DEFAULT 0,
        createdAt  TEXT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
      CREATE INDEX IF NOT EXISTS idx_images_product ON product_images(product_id);
    `);
    mark("create_product_images_v1");
  }

  // ── M4: Drop solar quotes table ──────────────────────────────────────────
  if (!applied("drop_solar_quotes_v1")) {
    const hasQuotes = db.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='quotes'"
    ).get();
    if (hasQuotes) {
      const count = (db.prepare("SELECT COUNT(*) as c FROM quotes").get() as { c: number }).c;
      if (count > 0) {
        console.warn(`[bevans] quotes table has ${count} row(s) — skipping drop. Manual review needed.`);
      } else {
        db.exec("DROP TABLE IF EXISTS quotes");
        mark("drop_solar_quotes_v1");
      }
    } else {
      mark("drop_solar_quotes_v1");
    }
  }

  // ── M5: Seed Bevans Sons products (disabled — add products via admin) ────
  if (!applied("seed_bevans_products_v1")) {
    mark("seed_bevans_products_v1");
  }

  // ── M6: Categories table ─────────────────────────────────────────────────
  if (!applied("create_categories_v1")) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id        TEXT PRIMARY KEY,
        name      TEXT UNIQUE NOT NULL,
        gender    TEXT NOT NULL DEFAULT 'Unisex',
        position  INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );
    `);
    const now = new Date().toISOString();
    const insertCat = db.prepare(
      "INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"
    );
    const defaults: [string, string, string, number][] = [
      ["mens-tshirts",   "Men's T-Shirts",    "Men",         0],
      ["mens-hoodies",   "Men's Hoodies",     "Men",         1],
      ["mens-shirts",    "Men's Shirts",      "Men",         2],
      ["mens-jackets",   "Men's Jackets",     "Men",         3],
      ["mens-pants",     "Men's Pants",       "Men",         4],
      ["mens-shorts",    "Men's Shorts",      "Men",         5],
      ["womens-tops",    "Women's Tops",      "Women",       0],
      ["womens-dresses", "Women's Dresses",   "Women",       1],
      ["womens-hoodies", "Women's Hoodies",   "Women",       2],
      ["womens-jackets", "Women's Jackets",   "Women",       3],
      ["womens-pants",   "Women's Pants",     "Women",       4],
      ["womens-shorts",  "Women's Shorts",    "Women",       5],
      ["unisex-tshirts", "Unisex T-Shirts",   "Unisex",      0],
      ["unisex-hoodies", "Unisex Hoodies",    "Unisex",      1],
      ["streetwear",     "Streetwear",        "Unisex",      2],
      ["caps",           "Caps",              "Accessories", 0],
      ["bags",           "Bags",              "Accessories", 1],
      ["sneakers",       "Sneakers",          "Accessories", 2],
      ["accessories",    "Accessories",       "Accessories", 3],
    ];
    const seedTx = db.transaction(() => {
      for (const [id, name, gender, position] of defaults) {
        insertCat.run(id, name, gender, position, now);
      }
    });
    seedTx();
    mark("create_categories_v1");
  }
}
