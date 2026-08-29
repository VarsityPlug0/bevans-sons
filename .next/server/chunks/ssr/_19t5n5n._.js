module.exports=[33539,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/app/admin/dashboard/emails/EmailComposer.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/app/admin/dashboard/emails/EmailComposer.tsx","default")},72841,a=>{"use strict";var b=a.i(33539);a.n(b)},77504,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/app/admin/dashboard/emails/FollowUpRunner.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/app/admin/dashboard/emails/FollowUpRunner.tsx","default")},29606,a=>{"use strict";var b=a.i(77504);a.n(b)},50850,a=>{"use strict";var b=a.i(7997),c=a.i(66879),d=a.i(71369),e=a.i(19419),f=a.i(72841),g=a.i(29606);let h={cart_abandon_1d:"Cart Abandon",delivery_followup:"Delivery Follow-up",reengagement_30d:"Re-engagement"};a.s(["default",0,function(){let a=(0,d.listOrders)(),i=new Set(a.map(a=>a.email.toLowerCase())).size,j=new Set(a.filter(a=>"pending"===a.status||"proof_submitted"===a.status).map(a=>a.email.toLowerCase())).size,k=(0,e.getProducts)().map(a=>({id:a.id,name:a.name,price:a.price,imageUrl:a.imageUrl??"",category:a.category})),l=(0,c.getDb)(),m=l.prepare("SELECT * FROM email_campaigns ORDER BY createdAt DESC LIMIT 20").all(),n=l.prepare(`
    SELECT type, COUNT(*) as total,
           SUM(opened) as opens, SUM(clicked) as clicks
    FROM email_sends
    WHERE createdAt > datetime('now', '-30 days')
    GROUP BY type
  `).all(),o=l.prepare(`
    SELECT * FROM email_sends ORDER BY createdAt DESC LIMIT 30
  `).all(),p=n.reduce((a,b)=>a+b.total,0),q=n.reduce((a,b)=>a+b.opens,0),r=n.reduce((a,b)=>a+b.clicks,0),s=p>0?Math.round(q/p*100):0,t=p>0?Math.round(r/p*100):0;return(0,b.jsxs)("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10",children:[(0,b.jsxs)("div",{className:"mb-7",children:[(0,b.jsx)("h1",{className:"text-xl font-bold text-white",children:"Email Centre"}),(0,b.jsx)("p",{className:"text-gray-500 text-sm mt-0.5",children:"Campaigns, automated follow-ups, and email analytics."})]}),(0,b.jsxs)("div",{className:"mb-10",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,b.jsx)("h2",{className:"text-sm font-semibold text-gray-400 uppercase tracking-widest",children:"Automated Follow-ups"}),(0,b.jsx)(g.default,{})]}),(0,b.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5",children:[{label:"Sent (30d)",value:p,color:"text-white"},{label:"Open Rate",value:`${s}%`,color:s>=30?"text-green-400":"text-gray-400"},{label:"Click Rate",value:`${t}%`,color:t>=10?"text-green-400":"text-gray-400"},{label:"Sequences",value:3,color:"text-[#D4AF37]"}].map(a=>(0,b.jsxs)("div",{className:"bg-[#111111] border border-[#1F1F1F] rounded-xl p-4 text-center",children:[(0,b.jsx)("p",{className:`text-xl font-bold mb-0.5 ${a.color}`,children:a.value}),(0,b.jsx)("p",{className:"text-gray-600 text-xs",children:a.label})]},a.label))}),(0,b.jsx)("div",{className:"grid sm:grid-cols-3 gap-3 mb-5",children:[{type:"cart_abandon_1d",icon:"🛒",desc:"24h after cart add, no order placed",color:"#f59e0b"},{type:"delivery_followup",icon:"⭐",desc:"3 days after order marked delivered",color:"#10b981"},{type:"reengagement_30d",icon:"💌",desc:"30 days since last paid order",color:"#D4AF37"}].map(a=>{let c=n.find(b=>b.type===a.type);return(0,b.jsxs)("div",{className:"bg-[#111111] border border-[#1F1F1F] rounded-xl p-4",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,b.jsx)("span",{className:"text-lg",children:a.icon}),(0,b.jsx)("p",{className:"text-white text-sm font-semibold",children:h[a.type]}),(0,b.jsx)("span",{className:"ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full text-green-400 bg-green-400/10 border border-green-400/20",children:"Active"})]}),(0,b.jsx)("p",{className:"text-gray-500 text-xs mb-3",children:a.desc}),c?(0,b.jsxs)("div",{className:"flex gap-4 text-xs",children:[(0,b.jsxs)("span",{className:"text-gray-400",children:[c.total," sent"]}),(0,b.jsxs)("span",{className:"text-blue-400",children:[c.opens," opens"]}),(0,b.jsxs)("span",{className:"text-[#D4AF37]",children:[c.clicks," clicks"]})]}):(0,b.jsx)("p",{className:"text-gray-600 text-xs",children:"No sends yet"})]},a.type)})}),o.length>0&&(0,b.jsxs)("div",{className:"bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden",children:[(0,b.jsx)("div",{className:"px-5 py-3 border-b border-[#1F1F1F]",children:(0,b.jsx)("p",{className:"text-xs text-gray-500 uppercase tracking-wider font-medium",children:"Recent Automated Sends"})}),(0,b.jsx)("div",{className:"divide-y divide-[#1A1A1A]",children:o.map(a=>(0,b.jsxs)("div",{className:"flex items-center gap-3 px-5 py-3",children:[(0,b.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,b.jsx)("p",{className:"text-white text-xs font-medium truncate",children:a.email}),(0,b.jsx)("p",{className:"text-gray-500 text-[10px]",children:h[a.type]??a.type})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2 shrink-0",children:[a.opened?(0,b.jsx)("span",{className:"text-[10px] px-2 py-0.5 rounded-full text-blue-400 bg-blue-400/10",children:"Opened"}):null,a.clicked?(0,b.jsx)("span",{className:"text-[10px] px-2 py-0.5 rounded-full text-green-400 bg-green-400/10",children:"Clicked"}):null,a.opened||a.clicked?null:(0,b.jsx)("span",{className:"text-[10px] px-2 py-0.5 rounded-full text-gray-500 bg-white/5",children:"Sent"}),(0,b.jsx)("p",{className:"text-gray-600 text-[10px] w-20 text-right",children:new Date(a.createdAt).toLocaleDateString("en-ZA",{day:"numeric",month:"short"})})]})]},a.id))})]})]}),(0,b.jsxs)("div",{className:"mb-7",children:[(0,b.jsx)("h2",{className:"text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4",children:"Send Campaign"}),(0,b.jsx)(f.default,{customerCount:i,pendingCount:j,products:k})]}),m.length>0&&(0,b.jsxs)("div",{className:"mt-6",children:[(0,b.jsx)("h2",{className:"text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4",children:"Campaign History"}),(0,b.jsxs)("div",{className:"bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden",children:[(0,b.jsx)("div",{className:"grid grid-cols-[1fr_120px_90px_130px] gap-3 px-5 py-3 border-b border-[#1F1F1F]",children:["Subject","Recipients","Sent","Date"].map(a=>(0,b.jsx)("p",{className:"text-[11px] text-gray-500 uppercase tracking-wider font-medium",children:a},a))}),m.map(a=>(0,b.jsxs)("div",{className:"grid grid-cols-[1fr_120px_90px_130px] gap-3 items-center px-5 py-3.5 border-b border-[#1A1A1A] last:border-0",children:[(0,b.jsx)("p",{className:"text-white text-sm truncate",children:a.subject}),(0,b.jsx)("p",{className:"text-gray-400 text-sm capitalize",children:a.recipients}),(0,b.jsx)("p",{className:"text-[#D4AF37] font-bold text-sm",children:a.sent_to}),(0,b.jsx)("p",{className:"text-gray-500 text-xs",children:new Date(a.createdAt).toLocaleDateString("en-ZA",{day:"numeric",month:"short",year:"numeric"})})]},a.id))]})]})]})},"dynamic",0,"force-dynamic"])},16136,function(a){a.n(a.i(50850))},66879,a=>{"use strict";var b=a.i(85148),c=a.i(14747),d=a.i(22734);let e=process.env.DATA_DIR??c.default.join(process.cwd(),"data"),f=c.default.join(e,"bevans.db"),g=null;a.s(["getDb",0,function(){var a;let c;return g||((0,d.existsSync)(e)||(0,d.mkdirSync)(e,{recursive:!0}),(g=new b.default(f)).pragma("journal_mode = WAL"),g.pragma("foreign_keys = ON"),(a=g).exec(`
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
    `);let b=new Date().toISOString(),d=a.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),e=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];a.transaction(()=>{for(let[a,c,f,g]of e)d.run(a,c,f,g,b)})(),c("create_categories_v1")}}(g)),g}])},71369,a=>{"use strict";var b=a.i(66879);function c(a){return{...a,items:JSON.parse(a.items)}}a.i(54799),a.s(["listOrders",0,function(){return(0,b.getDb)().prepare("SELECT * FROM orders ORDER BY createdAt DESC").all().map(c)}])},19419,a=>{"use strict";var b=a.i(66879);function c(a){return{...a,inStock:1===a.inStock,featured:1===a.featured,newArrival:1===a.newArrival,gender:a.gender??null,material:a.material??null,fit:a.fit??null,slug:a.slug??a.id}}a.s(["getCartEvents",0,function(){return(0,b.getDb)().prepare(`
    SELECT c.*, v.name AS visitorName, v.phone AS visitorPhone, v.email AS visitorEmail
    FROM cart_events c
    LEFT JOIN visitors v ON c.visitorId = v.id
    ORDER BY c.createdAt DESC
    LIMIT 200
  `).all()},"getFeaturedProducts",0,function(a=8){return(0,b.getDb)().prepare("SELECT * FROM products WHERE featured = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(a).map(c)},"getLeads",0,function(){return(0,b.getDb)().prepare("SELECT * FROM leads ORDER BY createdAt DESC").all()},"getNewArrivals",0,function(a=8){return(0,b.getDb)().prepare("SELECT * FROM products WHERE newArrival = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(a).map(c)},"getProduct",0,function(a){let d=(0,b.getDb)().prepare("SELECT * FROM products WHERE id = ? OR slug = ?").get(a,a);return d?c(d):void 0},"getProducts",0,function(){return(0,b.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(c)},"getProductsByCategory",0,function(a,d=24){return(0,b.getDb)().prepare("SELECT * FROM products WHERE category = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(a,d).map(c)},"getRelated",0,function(a,d,e=4){return(0,b.getDb)().prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(d,a,e).map(c)},"getSaleProducts",0,function(a=24){return(0,b.getDb)().prepare("SELECT * FROM products WHERE inStock = 1 AND originalPrice IS NOT NULL AND originalPrice != '' ORDER BY createdAt DESC LIMIT ?").all(a).map(c)}],19419)}];

//# sourceMappingURL=_19t5n5n._.js.map