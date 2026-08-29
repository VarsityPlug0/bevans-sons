module.exports=[85148,(e,t,T)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,T)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,T)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,T)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,T)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,T)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,T)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,T)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,T)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,T)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,T)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,T)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},84423,(e,t,T)=>{t.exports=e.x("nodemailer-9c35dd349a8aaa9f",()=>require("nodemailer-9c35dd349a8aaa9f"))},14747,(e,t,T)=>{t.exports=e.x("path",()=>require("path"))},72507,e=>{"use strict";let t={name:"Bevans Sons",tagline:"Premium Clothing. Crafted for the Bold.",domain:"https://bevans-sons.onrender.com",whatsapp:"27724816274",phone:"0724816274",email:"MkhabeleEnterprise@gmail.com",currency:"ZAR",currencySymbol:"R",locale:"en-ZA",social:{instagram:process.env.NEXT_PUBLIC_INSTAGRAM??"",facebook:process.env.NEXT_PUBLIC_FACEBOOK??"",tiktok:process.env.NEXT_PUBLIC_TIKTOK??""},shipping:{freeThreshold:1500,standardDays:"3-5 business days",expressDays:"1-2 business days"}};e.s(["BRAND",0,t,"getAdminEmails",0,function(){return[process.env.ADMIN_EMAIL??"",process.env.ADMIN_EMAIL_2??""].filter(Boolean).join(", ")},"getBankConfig",0,function(){return{bank:process.env.BANK_NAME??"",accountHolder:process.env.BANK_ACCOUNT_HOLDER??"",accountType:process.env.BANK_ACCOUNT_TYPE??"Business Account",accountNumber:process.env.BANK_ACCOUNT_NUMBER??"",branchCode:process.env.BANK_BRANCH_CODE??""}},"parsePrice",0,function(e){return null==e?0:"number"==typeof e?e:parseFloat(String(e).replace(/[^0-9.]/g,""))||0}])},62294,e=>{"use strict";var t=e.i(85148),T=e.i(14747),r=e.i(22734);let s=process.env.DATA_DIR??T.default.join(process.cwd(),"data"),n=T.default.join(s,"bevans.db"),a=null;function E(){var e;let T;return a||((0,r.existsSync)(s)||(0,r.mkdirSync)(s,{recursive:!0}),(a=new t.default(n)).pragma("journal_mode = WAL"),a.pragma("foreign_keys = ON"),(e=a).exec(`
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
  `),(T=t=>{try{e.exec(t)}catch{}})("ALTER TABLE orders ADD COLUMN bank_id TEXT"),T("ALTER TABLE orders ADD COLUMN tracking_number TEXT"),T("ALTER TABLE installment_applications ADD COLUMN product_imageUrl TEXT"),function(e){let t=t=>!!e.prepare("SELECT name FROM migrations WHERE name = ?").get(t),T=t=>e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run(t),r=t=>{try{e.exec(t)}catch{}};if(t("add_bevans_product_columns_v1")||(r("ALTER TABLE products ADD COLUMN slug TEXT NOT NULL DEFAULT ''"),r("ALTER TABLE products ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex'"),r("ALTER TABLE products ADD COLUMN material TEXT NOT NULL DEFAULT ''"),r("ALTER TABLE products ADD COLUMN fit TEXT NOT NULL DEFAULT ''"),r("ALTER TABLE products ADD COLUMN newArrival INTEGER NOT NULL DEFAULT 0"),T("add_bevans_product_columns_v1")),t("create_product_variants_v1")||(e.exec(`
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
    `),T("create_product_variants_v1")),t("create_product_images_v1")||(e.exec(`
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
    `),T("create_product_images_v1")),!t("drop_solar_quotes_v1"))if(e.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='quotes'").get()){let t=e.prepare("SELECT COUNT(*) as c FROM quotes").get().c;t>0?console.warn(`[bevans] quotes table has ${t} row(s) — skipping drop. Manual review needed.`):(e.exec("DROP TABLE IF EXISTS quotes"),T("drop_solar_quotes_v1"))}else T("drop_solar_quotes_v1");if(t("seed_bevans_products_v1")||T("seed_bevans_products_v1"),!t("create_categories_v1")){e.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id        TEXT PRIMARY KEY,
        name      TEXT UNIQUE NOT NULL,
        gender    TEXT NOT NULL DEFAULT 'Unisex',
        position  INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );
    `);let t=new Date().toISOString(),r=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),s=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,T,n,a]of s)r.run(e,T,n,a,t)})(),T("create_categories_v1")}}(a)),a}e.s(["exportProductsJson",0,function(e){try{let t=(e??E()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,r.existsSync)(s)||(0,r.mkdirSync)(s,{recursive:!0}),(0,r.writeFileSync)(T.default.join(s,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,E])},39258,e=>{"use strict";var t=e.i(62294),T=e.i(54799);function r(e){return{...e,eligible_terms:JSON.parse(e.eligible_terms),active:1===e.active}}function s(e){let T=(0,t.getDb)().prepare("SELECT * FROM installment_settings WHERE product_id = ? AND active = 1").get(e);return T?r(T):null}function n(e){return(0,t.getDb)().prepare("SELECT * FROM installment_applications WHERE id = ? OR ref = ?").get(e,e)||null}e.s(["calcMonthly",0,function(e,t,T,r,s){let n=e-t+s;if(0===r){let e=Math.ceil(n/T*100)/100;return{monthly:e,total:t+e*T,interest:0}}let a=Math.ceil(n*r*Math.pow(1+r,T)/(Math.pow(1+r,T)-1)*100)/100,E=a*T,i=Math.round((E-n)*100)/100;return{monthly:a,total:t+E,interest:i}},"createApplication",0,function(e){let r=(0,t.getDb)(),s=new Date().toISOString(),a=(0,T.randomBytes)(8).toString("hex"),E="IA-"+(0,T.randomBytes)(3).toString("hex").toUpperCase();return r.prepare(`
    INSERT INTO installment_applications
      (id, ref, product_id, product_name, product_price, product_imageUrl, term_months, monthly_payment,
       deposit, total_repayable, name, phone, email, id_number, address,
       status, whatsapp_clicked, createdAt, updatedAt)
    VALUES
      (@id, @ref, @product_id, @product_name, @product_price, @product_imageUrl, @term_months, @monthly_payment,
       @deposit, @total_repayable, @name, @phone, @email, @id_number, @address,
       'new', 0, @now, @now)
  `).run({id:a,ref:E,...e,product_imageUrl:e.product_imageUrl??null,now:s}),n(a)},"getApplication",0,n,"getEventStats",0,function(){return Object.fromEntries((0,t.getDb)().prepare("SELECT event, COUNT(*) as count FROM installment_events GROUP BY event").all().map(e=>[e.event,e.count]))},"getSettings",0,s,"listAllSettings",0,function(){return(0,t.getDb)().prepare("SELECT * FROM installment_settings ORDER BY createdAt DESC").all().map(r)},"listApplications",0,function(){return(0,t.getDb)().prepare("SELECT * FROM installment_applications ORDER BY createdAt DESC").all()},"trackEvent",0,function(e){let r=(0,t.getDb)(),s=(0,T.randomBytes)(8).toString("hex");r.prepare(`
    INSERT INTO installment_events (id, event, product_id, ref, term_months, metadata, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(s,e.event,e.product_id??null,e.ref??null,e.term_months??null,e.metadata?JSON.stringify(e.metadata):null,new Date().toISOString())},"updateApplicationStatus",0,function(e,T,r){let s=(0,t.getDb)(),n=new Date().toISOString();s.prepare("UPDATE installment_applications SET status = ?, admin_notes = COALESCE(?, admin_notes), updatedAt = ? WHERE id = ?").run(T,r??null,n,e)},"upsertSettings",0,function(e){let r=(0,t.getDb)(),n=new Date().toISOString();if(r.prepare("SELECT id FROM installment_settings WHERE product_id = ?").get(e.product_id))r.prepare(`
      UPDATE installment_settings
      SET min_deposit_pct = ?, eligible_terms = ?, monthly_rate = ?, admin_fee = ?, active = ?, updatedAt = ?
      WHERE product_id = ?
    `).run(e.min_deposit_pct,JSON.stringify(e.eligible_terms),e.monthly_rate,e.admin_fee,+!!e.active,n,e.product_id);else{let t=(0,T.randomBytes)(8).toString("hex");r.prepare(`
      INSERT INTO installment_settings
        (id, product_id, min_deposit_pct, eligible_terms, monthly_rate, admin_fee, active, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(t,e.product_id,e.min_deposit_pct,JSON.stringify(e.eligible_terms),e.monthly_rate,e.admin_fee,+!!e.active,n,n)}return s(e.product_id)}])},850,e=>{e.v(t=>Promise.all(["server/chunks/lib_products_ts_0xwiadm._.js"].map(t=>e.l(t))).then(()=>t(9791)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__03-ebbu._.js.map