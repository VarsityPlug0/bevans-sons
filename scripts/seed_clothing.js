const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "daisy.db");
const db = new Database(dbPath);

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
`);

const clothingItems = [
  {
    id: "cl-001",
    name: "Heavyweight Signature Oversized Hoodie",
    price: "R899",
    originalPrice: "R1,299",
    category: "Hoodies & Streetwear",
    description: "Coming Soon. Crafted from 420 GSM heavy french terry cotton with dropped shoulders, kangaroo pocket, and relaxed boxy cut. Pre-order / enquiry available.",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 1,
  },
  {
    id: "cl-002",
    name: "Daisy Acid-Wash Vintage Graphic Hoodie",
    price: "R950",
    originalPrice: "R1,350",
    category: "Hoodies & Streetwear",
    description: "Coming Soon. Custom acid-wash treatment with distressed vintage finish and high-density screen print.",
    imageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-003",
    name: "Minimalist Heavyweight Crewneck Sweatshirt",
    price: "R749",
    originalPrice: "R1,099",
    category: "Hoodies & Streetwear",
    description: "Coming Soon. Classic crewneck in 380 GSM brushed fleece with clean minimal branding.",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-004",
    name: "Urban Cargo Tactical Sweatpants",
    price: "R799",
    originalPrice: "R1,150",
    category: "Hoodies & Streetwear",
    description: "Coming Soon. Relaxed-fit cargo joggers with deep utility pockets, adjustable drawstrings and tapered ankle cuffs.",
    imageUrl: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-005",
    name: "Vintage Washed Denim Trucker Jacket",
    price: "R1,299",
    originalPrice: "R1,799",
    category: "Men's Wear",
    description: "Coming Soon. Heavyweight 14oz rigid cotton denim with stonewash distressing and brass hardware.",
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 1,
  },
  {
    id: "cl-006",
    name: "Premium Leather Bomber Jacket",
    price: "R2,499",
    originalPrice: "R3,499",
    category: "Men's Wear",
    description: "Coming Soon. Genuine supple grain leather with satin lining, heavy-duty YKK zip, and ribbed trim.",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 1,
  },
  {
    id: "cl-007",
    name: "Heavyweight Boxy Fit Essential Tee",
    price: "R399",
    originalPrice: "R550",
    category: "Men's Wear",
    description: "Coming Soon. 240 GSM organic combed cotton, thick 1-inch collar ribbing, pre-shrunk fabric.",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-008",
    name: "Slim Tapered Stretch Denim Jeans",
    price: "R899",
    originalPrice: "R1,250",
    category: "Men's Wear",
    description: "Coming Soon. Premium stretch denim offering all-day comfort with classic 5-pocket styling.",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-009",
    name: "Oversized Chunky Knit Cardigan",
    price: "R799",
    originalPrice: "R1,199",
    category: "Women's Fashion",
    description: "Coming Soon. Soft wool-blend knit with drop-shoulder silhouette and cozy ribbed cuffs.",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 1,
  },
  {
    id: "cl-010",
    name: "Seamless Ribbed Athleisure Activewear Set",
    price: "R899",
    originalPrice: "R1,299",
    category: "Women's Fashion",
    description: "Coming Soon. Two-piece crop top and high-waisted leggings set in moisture-wicking compressive fabric.",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-011",
    name: "Tailored Oversized Blazer & Trouser Set",
    price: "R1,699",
    originalPrice: "R2,399",
    category: "Women's Fashion",
    description: "Coming Soon. Modern power suit with structured shoulders and wide-leg high-rise pleated pants.",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-012",
    name: "Retro High-Top Streetwear Sneakers",
    price: "R1,899",
    originalPrice: "R2,599",
    category: "Sneakers & Shoes",
    description: "Coming Soon. Full-grain leather upper with padded collar and durable rubber traction outsole.",
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 1,
  },
  {
    id: "cl-013",
    name: "Runner Pro Cushion Air Trainers",
    price: "R1,499",
    originalPrice: "R2,099",
    category: "Sneakers & Shoes",
    description: "Coming Soon. Breathable engineered mesh upper with responsive air cushion foam midsole.",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-014",
    name: "Low-Profile Suede Skate Sneakers",
    price: "R1,299",
    originalPrice: "R1,799",
    category: "Sneakers & Shoes",
    description: "Coming Soon. Durable suede leather upper with vulcanized rubber sole and padded tongue.",
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-015",
    name: "Daisy Signature 3D Embroidered Snapback Cap",
    price: "R399",
    originalPrice: "R550",
    category: "Caps & Accessories",
    description: "Coming Soon. 6-panel structured crown with wool-blend twill, gold 3D embroidery, flat visor.",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 1,
  },
  {
    id: "cl-016",
    name: "Chunky Ribbed Wool Winter Beanie",
    price: "R299",
    originalPrice: "R420",
    category: "Caps & Accessories",
    description: "Coming Soon. Warm merino wool blend with wide folded cuff and woven Daisy label.",
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
  {
    id: "cl-017",
    name: "Urban Tactical Crossbody Bag",
    price: "R599",
    originalPrice: "R850",
    category: "Caps & Accessories",
    description: "Coming Soon. Waterproof Cordura nylon with multiple zip compartments and quick-release strap.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=85",
    inStock: 1,
    featured: 0,
  },
];

const now = new Date().toISOString();

const insert = db.prepare(`
  INSERT OR REPLACE INTO products (id, name, price, originalPrice, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
  VALUES (@id, @name, @price, @originalPrice, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
`);

const tx = db.transaction((items) => {
  for (const item of items) {
    insert.run({ ...item, createdAt: now, updatedAt: now });
  }
});

tx(clothingItems);

// Export to products-backup.json
const products = db.prepare("SELECT * FROM products ORDER BY category, name").all();
const mapped = products.map((p) => ({
  ...p,
  inStock: p.inStock === 1,
  featured: p.featured === 1,
}));

fs.writeFileSync(path.join(dataDir, "products-backup.json"), JSON.stringify(mapped, null, 2));

console.log(`Successfully seeded ${clothingItems.length} clothing items into SQLite database & updated backup!`);