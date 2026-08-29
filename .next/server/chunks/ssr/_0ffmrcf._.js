module.exports=[66879,a=>{"use strict";var b=a.i(85148),c=a.i(14747),d=a.i(22734);let e=process.env.DATA_DIR??c.default.join(process.cwd(),"data"),f=c.default.join(e,"bevans.db"),g=null;a.s(["getDb",0,function(){var a;let c;return g||((0,d.existsSync)(e)||(0,d.mkdirSync)(e,{recursive:!0}),(g=new b.default(f)).pragma("journal_mode = WAL"),g.pragma("foreign_keys = ON"),(a=g).exec(`
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
  `),(c=b=>{try{a.exec(b)}catch{}})("ALTER TABLE orders ADD COLUMN bank_id TEXT"),c("ALTER TABLE orders ADD COLUMN tracking_number TEXT"),c("ALTER TABLE installment_applications ADD COLUMN product_imageUrl TEXT"),function(a){let b=b=>!!a.prepare("SELECT name FROM migrations WHERE name = ?").get(b),c=b=>a.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run(b),d=b=>{try{a.exec(b)}catch{}};if(b("add_bevans_product_columns_v1")||(d("ALTER TABLE products ADD COLUMN slug TEXT NOT NULL DEFAULT ''"),d("ALTER TABLE products ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex'"),d("ALTER TABLE products ADD COLUMN material TEXT NOT NULL DEFAULT ''"),d("ALTER TABLE products ADD COLUMN fit TEXT NOT NULL DEFAULT ''"),d("ALTER TABLE products ADD COLUMN newArrival INTEGER NOT NULL DEFAULT 0"),c("add_bevans_product_columns_v1")),b("create_product_variants_v1")||(a.exec(`
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
    `),c("create_product_variants_v1")),b("create_product_images_v1")||(a.exec(`
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
    `),c("create_product_images_v1")),!b("drop_solar_quotes_v1"))if(a.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='quotes'").get()){let b=a.prepare("SELECT COUNT(*) as c FROM quotes").get().c;b>0?console.warn(`[bevans] quotes table has ${b} row(s) — skipping drop. Manual review needed.`):(a.exec("DROP TABLE IF EXISTS quotes"),c("drop_solar_quotes_v1"))}else c("drop_solar_quotes_v1");if(b("seed_bevans_products_v1")||c("seed_bevans_products_v1"),!b("create_categories_v1")){a.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id        TEXT PRIMARY KEY,
        name      TEXT UNIQUE NOT NULL,
        gender    TEXT NOT NULL DEFAULT 'Unisex',
        position  INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );
    `);let b=new Date().toISOString(),d=a.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),e=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];a.transaction(()=>{for(let[a,c,f,g]of e)d.run(a,c,f,g,b)})(),c("create_categories_v1")}}(g)),g}])},92062,a=>{"use strict";var b=a.i(66879);a.i(54799),a.s(["getSettings",0,function(a){let c=(0,b.getDb)().prepare("SELECT * FROM installment_settings WHERE product_id = ? AND active = 1").get(a);return c?{...c,eligible_terms:JSON.parse(c.eligible_terms),active:1===c.active}:null},"listApplications",0,function(){return(0,b.getDb)().prepare("SELECT * FROM installment_applications ORDER BY createdAt DESC").all()}])},19419,a=>{"use strict";var b=a.i(66879);function c(a){return{...a,inStock:1===a.inStock,featured:1===a.featured,newArrival:1===a.newArrival,gender:a.gender??null,material:a.material??null,fit:a.fit??null,slug:a.slug??a.id}}a.s(["getCartEvents",0,function(){return(0,b.getDb)().prepare(`
    SELECT c.*, v.name AS visitorName, v.phone AS visitorPhone, v.email AS visitorEmail
    FROM cart_events c
    LEFT JOIN visitors v ON c.visitorId = v.id
    ORDER BY c.createdAt DESC
    LIMIT 200
  `).all()},"getFeaturedProducts",0,function(a=8){return(0,b.getDb)().prepare("SELECT * FROM products WHERE featured = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(a).map(c)},"getLeads",0,function(){return(0,b.getDb)().prepare("SELECT * FROM leads ORDER BY createdAt DESC").all()},"getNewArrivals",0,function(a=8){return(0,b.getDb)().prepare("SELECT * FROM products WHERE newArrival = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(a).map(c)},"getProduct",0,function(a){let d=(0,b.getDb)().prepare("SELECT * FROM products WHERE id = ? OR slug = ?").get(a,a);return d?c(d):void 0},"getProducts",0,function(){return(0,b.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(c)},"getProductsByCategory",0,function(a,d=24){return(0,b.getDb)().prepare("SELECT * FROM products WHERE category = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(a,d).map(c)},"getRelated",0,function(a,d,e=4){return(0,b.getDb)().prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(d,a,e).map(c)},"getSaleProducts",0,function(a=24){return(0,b.getDb)().prepare("SELECT * FROM products WHERE inStock = 1 AND originalPrice IS NOT NULL AND originalPrice != '' ORDER BY createdAt DESC LIMIT ?").all(a).map(c)}],19419)},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)}];

//# sourceMappingURL=_0ffmrcf._.js.map