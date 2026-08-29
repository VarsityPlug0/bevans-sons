module.exports=[85148,(a,b,c)=>{b.exports=a.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},22734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},85313,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/app/admin/dashboard/images/ImageManager.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/app/admin/dashboard/images/ImageManager.tsx","default")},8775,a=>{"use strict";var b=a.i(85313);a.n(b)},32355,a=>{"use strict";var b=a.i(7997),c=a.i(66879);let d=[{key:"home.hero",url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&auto=format&fit=crop",label:"Hero Image",section:"Homepage"},{key:"home.hero_2",url:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85&auto=format&fit=crop",label:"Hero Image 2",section:"Homepage"},{key:"home.men_banner",url:"https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=85&auto=format&fit=crop",label:"Men's Section Banner",section:"Homepage"},{key:"home.women_banner",url:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85&auto=format&fit=crop",label:"Women's Section Banner",section:"Homepage"},{key:"home.cta_bg",url:"https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=85&auto=format&fit=crop",label:"CTA Background",section:"Homepage"},{key:"home.editorial_1",url:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85&auto=format&fit=crop",label:"Editorial Image 1",section:"Homepage"},{key:"home.editorial_2",url:"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=85&auto=format&fit=crop",label:"Editorial Image 2",section:"Homepage"},{key:"home.brand_story",url:"https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=85&auto=format&fit=crop",label:"Brand Story Image",section:"Homepage"},{key:"men.hero",url:"https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1400&q=85&auto=format&fit=crop",label:"Men's Hero",section:"Men"},{key:"men.tshirts",url:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85&auto=format&fit=crop",label:"Men's T-Shirts",section:"Men"},{key:"men.hoodies",url:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85&auto=format&fit=crop",label:"Men's Hoodies",section:"Men"},{key:"men.jackets",url:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=85&auto=format&fit=crop",label:"Men's Jackets",section:"Men"},{key:"women.hero",url:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=85&auto=format&fit=crop",label:"Women's Hero",section:"Women"},{key:"women.tops",url:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=85&auto=format&fit=crop",label:"Women's Tops",section:"Women"},{key:"women.dresses",url:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=85&auto=format&fit=crop",label:"Women's Dresses",section:"Women"},{key:"women.hoodies",url:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=85&auto=format&fit=crop",label:"Women's Hoodies",section:"Women"},{key:"col.hero",url:"https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=85&auto=format&fit=crop",label:"Collections Hero",section:"Collections"},{key:"col.streetwear",url:"https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700&q=85&auto=format&fit=crop",label:"Streetwear Collection",section:"Collections"},{key:"col.essentials",url:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85&auto=format&fit=crop",label:"Essentials Collection",section:"Collections"},{key:"about.hero",url:"https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=85&auto=format&fit=crop",label:"About Hero",section:"About"},{key:"about.studio",url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop",label:"Studio / Workshop",section:"About"}];var e=a.i(8775);a.s(["default",0,function(){let a,f,g=(f=(a=(0,c.getDb)()).prepare(`
    INSERT OR IGNORE INTO site_images (key, url, label, section)
    VALUES (@key, @url, @label, @section)
  `),a.transaction(a=>{for(let b of a)f.run(b)})(d),(0,c.getDb)().prepare("SELECT * FROM site_images ORDER BY section, key").all());return(0,b.jsx)("div",{className:"min-h-screen bg-[#0A0A0A] p-6",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,b.jsxs)("div",{className:"mb-8",children:[(0,b.jsx)("h1",{className:"text-2xl font-bold text-white",children:"Site Images"}),(0,b.jsxs)("p",{className:"text-gray-500 text-sm mt-1",children:[g.length," images across all pages — upload a file or paste a URL to update any image instantly."]})]}),(0,b.jsx)(e.default,{images:g})]})})},"dynamic",0,"force-dynamic"],32355)},60644,function(a){a.n(a.i(32355))},26758,a=>{a.v("/_next/static/media/favicon.2vob68tjqpejf.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},38872,a=>{"use strict";let b={src:a.i(26758).default,width:256,height:256};a.s(["default",0,b])},66879,a=>{"use strict";var b=a.i(85148),c=a.i(14747),d=a.i(22734);let e=process.env.DATA_DIR??c.default.join(process.cwd(),"data"),f=c.default.join(e,"bevans.db"),g=null;a.s(["getDb",0,function(){var a;let c;return g||((0,d.existsSync)(e)||(0,d.mkdirSync)(e,{recursive:!0}),(g=new b.default(f)).pragma("journal_mode = WAL"),g.pragma("foreign_keys = ON"),(a=g).exec(`
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
    `);let b=new Date().toISOString(),d=a.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),e=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];a.transaction(()=>{for(let[a,c,f,g]of e)d.run(a,c,f,g,b)})(),c("create_categories_v1")}}(g)),g}])},62322,a=>{"use strict";var b=a.i(12948),c=a.i(67436),d=a.i(94331);a.i(70408);let e=(0,b.instrumentModuleGetter)(()=>a.r(38872)),f=(0,b.instrumentModuleGetter)(()=>a.r(70864)),g=(0,b.instrumentModuleGetter)(()=>a.r(43619)),h=(0,b.instrumentModuleGetter)(()=>a.r(13718)),i=(0,b.instrumentModuleGetter)(()=>a.r(18198)),j=(0,b.instrumentModuleGetter)(()=>a.r(62212)),k=(0,b.instrumentModuleGetter)(()=>a.r(83106)),l=["",{children:["admin",{children:["dashboard",{children:["images",{children:["__PAGE__",{},{metadata:{},page:[(0,b.instrumentModuleGetter)(()=>a.r(60644)),"[project]/app/admin/dashboard/images/page.tsx"]},[]]},{metadata:{}},[]]},{metadata:{},layout:[k,"[project]/app/admin/dashboard/layout.tsx"]},[]]},{metadata:{}},[]]},{metadata:{icon:[async()=>{let a=(0,d.interopDefault)(await e());return[{url:`/favicon.ico?${a.src.split("/").splice(-1)[0]}`,sizes:`${a.width}x${a.height}`,type:"image/x-icon"}]}]},layout:[f,"[project]/app/layout.tsx"],"not-found":[g,"[project]/node_modules/next/dist/client/components/builtin/not-found.js"],forbidden:[h,"[project]/node_modules/next/dist/client/components/builtin/forbidden.js"],unauthorized:[i,"[project]/node_modules/next/dist/client/components/builtin/unauthorized.js"],"global-error":[j,"[project]/node_modules/next/dist/client/components/builtin/global-error.js"]},[]],m=a.r.bind(a),n=a.l.bind(a),o=(0,c.createAppPageEntrypoint)({tree:l,page:"/admin/dashboard/images/page",pathname:"/admin/dashboard/images",require:m,loadChunk:n,interopDefault:d.interopDefault}),p=o.__next_app__,q=o.routeModule,r=o.handler;a.s(["__next_app__",0,p,"handler",0,r,"routeModule",0,q],89047),a.i(89047);var s=a.i(22922);a.s(["ClientPageRoot",()=>s.ClientPageRoot,"ClientSegmentRoot",()=>s.ClientSegmentRoot,"Fragment",()=>s.Fragment,"HTTPAccessFallbackBoundary",()=>s.HTTPAccessFallbackBoundary,"InstantValidation",()=>s.InstantValidation,"LayoutRouter",()=>s.LayoutRouter,"LoadingBoundaryProvider",()=>s.LoadingBoundaryProvider,"Postpone",()=>s.Postpone,"RenderFromTemplateContext",()=>s.RenderFromTemplateContext,"RootLayoutBoundary",()=>s.RootLayoutBoundary,"SegmentViewNode",()=>s.SegmentViewNode,"SegmentViewStateNode",()=>s.SegmentViewStateNode,"__next_app__",0,p,"captureOwnerStack",()=>s.captureOwnerStack,"collectPrefetchHints",()=>s.collectPrefetchHints,"collectSegmentData",()=>s.collectSegmentData,"createElement",()=>s.createElement,"createMetadataComponents",()=>s.createMetadataComponents,"createPrerenderParamsForClientSegment",()=>s.createPrerenderParamsForClientSegment,"createPrerenderSearchParamsForClientPage",()=>s.createPrerenderSearchParamsForClientPage,"createServerParamsForServerSegment",()=>s.createServerParamsForServerSegment,"createServerSearchParamsForServerPage",()=>s.createServerSearchParamsForServerPage,"createTemporaryReferenceSet",()=>s.createTemporaryReferenceSet,"decodeAction",()=>s.decodeAction,"decodeFormState",()=>s.decodeFormState,"decodeReply",()=>s.decodeReply,"handler",0,r,"isEmptyHTMLPrelude",()=>s.isEmptyHTMLPrelude,"patchFetch",()=>s.patchFetch,"preconnect",()=>s.preconnect,"preloadFont",()=>s.preloadFont,"preloadStyle",()=>s.preloadStyle,"prerender",()=>s.prerender,"prerenderToNodeStream",()=>s.prerenderToNodeStream,"renderToPipeableStream",()=>s.renderToPipeableStream,"renderToReadableStream",()=>s.renderToReadableStream,"routeModule",0,q,"serverHooks",()=>s.serverHooks,"taintObjectReference",()=>s.taintObjectReference],62322)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1y8dl0m._.js.map