module.exports=[85148,(e,r,t)=>{r.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},22734,(e,r,t)=>{r.exports=e.x("fs",()=>require("fs"))},70406,(e,r,t)=>{r.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,r,t)=>{r.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,r,t)=>{r.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,r,t)=>{r.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,r,t)=>{r.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,r,t)=>{r.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,r,t)=>{r.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,r,t)=>{r.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,r,t)=>{r.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,r,t)=>{r.exports=e.x("path",()=>require("path"))},72507,e=>{"use strict";let r={name:"Bevans Sons",tagline:"Premium Clothing. Crafted for the Bold.",domain:"https://bevans-sons.onrender.com",whatsapp:"27724816274",phone:"0724816274",email:"MkhabeleEnterprise@gmail.com",currency:"ZAR",currencySymbol:"R",locale:"en-ZA",social:{instagram:process.env.NEXT_PUBLIC_INSTAGRAM??"",facebook:process.env.NEXT_PUBLIC_FACEBOOK??"",tiktok:process.env.NEXT_PUBLIC_TIKTOK??""},shipping:{freeThreshold:1500,standardDays:"3-5 business days",expressDays:"1-2 business days"}};e.s(["BRAND",0,r,"getAdminEmails",0,function(){return[process.env.ADMIN_EMAIL??"",process.env.ADMIN_EMAIL_2??""].filter(Boolean).join(", ")},"getBankConfig",0,function(){return{bank:process.env.BANK_NAME??"",accountHolder:process.env.BANK_ACCOUNT_HOLDER??"",accountType:process.env.BANK_ACCOUNT_TYPE??"Business Account",accountNumber:process.env.BANK_ACCOUNT_NUMBER??"",branchCode:process.env.BANK_BRANCH_CODE??""}},"parsePrice",0,function(e){return null==e?0:"number"==typeof e?e:parseFloat(String(e).replace(/[^0-9.]/g,""))||0}])},62294,e=>{"use strict";var r=e.i(85148),t=e.i(14747),T=e.i(22734);let a=process.env.DATA_DIR??t.default.join(process.cwd(),"data"),n=t.default.join(a,"bevans.db"),E=null;function s(){var e;let t;return E||((0,T.existsSync)(a)||(0,T.mkdirSync)(a,{recursive:!0}),(E=new r.default(n)).pragma("journal_mode = WAL"),E.pragma("foreign_keys = ON"),(e=E).exec(`
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
  `),(t=r=>{try{e.exec(r)}catch{}})("ALTER TABLE orders ADD COLUMN bank_id TEXT"),t("ALTER TABLE orders ADD COLUMN tracking_number TEXT"),t("ALTER TABLE installment_applications ADD COLUMN product_imageUrl TEXT"),function(e){let r=r=>!!e.prepare("SELECT name FROM migrations WHERE name = ?").get(r),t=r=>e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run(r),T=r=>{try{e.exec(r)}catch{}};if(r("add_bevans_product_columns_v1")||(T("ALTER TABLE products ADD COLUMN slug TEXT NOT NULL DEFAULT ''"),T("ALTER TABLE products ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex'"),T("ALTER TABLE products ADD COLUMN material TEXT NOT NULL DEFAULT ''"),T("ALTER TABLE products ADD COLUMN fit TEXT NOT NULL DEFAULT ''"),T("ALTER TABLE products ADD COLUMN newArrival INTEGER NOT NULL DEFAULT 0"),t("add_bevans_product_columns_v1")),r("create_product_variants_v1")||(e.exec(`
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
    `),t("create_product_variants_v1")),r("create_product_images_v1")||(e.exec(`
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
    `),t("create_product_images_v1")),!r("drop_solar_quotes_v1"))if(e.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='quotes'").get()){let r=e.prepare("SELECT COUNT(*) as c FROM quotes").get().c;r>0?console.warn(`[bevans] quotes table has ${r} row(s) — skipping drop. Manual review needed.`):(e.exec("DROP TABLE IF EXISTS quotes"),t("drop_solar_quotes_v1"))}else t("drop_solar_quotes_v1");if(r("seed_bevans_products_v1")||t("seed_bevans_products_v1"),!r("create_categories_v1")){e.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id        TEXT PRIMARY KEY,
        name      TEXT UNIQUE NOT NULL,
        gender    TEXT NOT NULL DEFAULT 'Unisex',
        position  INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );
    `);let r=new Date().toISOString(),T=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),a=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,t,n,E]of a)T.run(e,t,n,E,r)})(),t("create_categories_v1")}}(E)),E}e.s(["exportProductsJson",0,function(e){try{let r=(e??s()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,T.existsSync)(a)||(0,T.mkdirSync)(a,{recursive:!0}),(0,T.writeFileSync)(t.default.join(a,"products-backup.json"),JSON.stringify(r,null,2))}catch{}},"getDb",0,s])},28746,67357,e=>{"use strict";var r=e.i(62294);function t(e){return{...e,stock:Number(e.stock),price_override:null!=e.price_override?Number(e.price_override):null}}function T(e){return(0,r.getDb)().prepare("SELECT * FROM product_variants WHERE product_id = ? ORDER BY colour, size").all(e).map(t)}function a(e){return{...e,inStock:1===e.inStock,featured:1===e.featured,newArrival:1===e.newArrival,gender:e.gender??null,material:e.material??null,fit:e.fit??null,slug:e.slug??e.id}}function n(){return(0,r.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(a)}function E(e){let t=(0,r.getDb)().prepare("SELECT * FROM products WHERE id = ? OR slug = ?").get(e,e);return t?a(t):void 0}e.s(["getVariant",0,function(e){let T=(0,r.getDb)().prepare("SELECT * FROM product_variants WHERE id = ?").get(e);return T?t(T):null},"getVariantsByProduct",0,T],67357),e.s(["createProduct",0,function(e){var t;let T,a=(0,r.getDb)(),n=new Date().toISOString(),s=`${Date.now()}`,i=e.slug||(t=e.name,T=t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),`${T}-${s.slice(-6)}`);return a.prepare(`
    INSERT INTO products (id, name, slug, price, originalPrice, category, gender, description, imageUrl, material, fit, newArrival, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @slug, @price, @originalPrice, @category, @gender, @description, @imageUrl, @material, @fit, @newArrival, @inStock, @featured, @createdAt, @updatedAt)
  `).run({id:s,name:e.name,slug:i,price:e.price,originalPrice:e.originalPrice??"",category:e.category,gender:e.gender??null,description:e.description,imageUrl:e.imageUrl,material:e.material??null,fit:e.fit??null,newArrival:+!!e.newArrival,inStock:+!!e.inStock,featured:+!!e.featured,createdAt:n,updatedAt:n}),E(s)},"deleteProduct",0,function(e){return(0,r.getDb)().prepare("DELETE FROM products WHERE id = ?").run(e).changes>0},"getCartEvents",0,function(){return(0,r.getDb)().prepare(`
    SELECT c.*, v.name AS visitorName, v.phone AS visitorPhone, v.email AS visitorEmail
    FROM cart_events c
    LEFT JOIN visitors v ON c.visitorId = v.id
    ORDER BY c.createdAt DESC
    LIMIT 200
  `).all()},"getFeaturedProducts",0,function(e=8){return(0,r.getDb)().prepare("SELECT * FROM products WHERE featured = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e).map(a)},"getLeads",0,function(){return(0,r.getDb)().prepare("SELECT * FROM leads ORDER BY createdAt DESC").all()},"getNewArrivals",0,function(e=8){return(0,r.getDb)().prepare("SELECT * FROM products WHERE newArrival = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e).map(a)},"getProduct",0,E,"getProductWithVariants",0,function(e){let r=E(e);if(r)return{...r,variants:T(r.id)}},"getProducts",0,n,"getProductsByCategory",0,function(e,t=24){return(0,r.getDb)().prepare("SELECT * FROM products WHERE category = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e,t).map(a)},"getProductsByGender",0,function(e,t=24){return(0,r.getDb)().prepare("SELECT * FROM products WHERE gender = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e,t).map(a)},"getProductsWithVariants",0,function(){return n().map(e=>({...e,variants:T(e.id)}))},"getRelated",0,function(e,t,T=4){return(0,r.getDb)().prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(t,e,T).map(a)},"getSaleProducts",0,function(e=24){return(0,r.getDb)().prepare("SELECT * FROM products WHERE inStock = 1 AND originalPrice IS NOT NULL AND originalPrice != '' ORDER BY createdAt DESC LIMIT ?").all(e).map(a)},"saveLead",0,function(e){let t=(0,r.getDb)(),T=`${Date.now()}`;t.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (@id, @name, @email, @phone, @message, @productInterest, @createdAt)
  `).run({id:T,...e,createdAt:new Date().toISOString()})},"updateProduct",0,function(e,t){if(!E(e))return null;let T=new Date().toISOString();return(0,r.getDb)().prepare(`
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
  `).run({id:e,updatedAt:T,name:t.name??null,slug:t.slug??null,price:t.price??null,originalPrice:t.originalPrice??null,category:t.category??null,gender:t.gender??null,description:t.description??null,imageUrl:t.imageUrl??null,material:t.material??null,fit:t.fit??null,newArrival:void 0!==t.newArrival?+!!t.newArrival:null,inStock:void 0!==t.inStock?+!!t.inStock:null,featured:void 0!==t.featured?+!!t.featured:null}),E(e)}],28746)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__083jwc0._.js.map