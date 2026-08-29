module.exports=[99904,e=>{"use strict";var s=e.i(85148),t=e.i(14747),i=e.i(22734);let o=process.env.DATA_DIR??t.default.join(process.cwd(),"data"),r=t.default.join(o,"bevans.db"),T=null;function a(){var e;let t;return T||((0,i.existsSync)(o)||(0,i.mkdirSync)(o,{recursive:!0}),(T=new s.default(r)).pragma("journal_mode = WAL"),T.pragma("foreign_keys = ON"),(e=T).exec(`
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
  `),(t=s=>{try{e.exec(s)}catch{}})("ALTER TABLE orders ADD COLUMN bank_id TEXT"),t("ALTER TABLE orders ADD COLUMN tracking_number TEXT"),t("ALTER TABLE installment_applications ADD COLUMN product_imageUrl TEXT"),function(e){var s;let t,i,o,r,T=s=>!!e.prepare("SELECT name FROM migrations WHERE name = ?").get(s),a=s=>e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run(s),c=s=>{try{e.exec(s)}catch{}};if(T("add_bevans_product_columns_v1")||(c("ALTER TABLE products ADD COLUMN slug TEXT NOT NULL DEFAULT ''"),c("ALTER TABLE products ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex'"),c("ALTER TABLE products ADD COLUMN material TEXT NOT NULL DEFAULT ''"),c("ALTER TABLE products ADD COLUMN fit TEXT NOT NULL DEFAULT ''"),c("ALTER TABLE products ADD COLUMN newArrival INTEGER NOT NULL DEFAULT 0"),a("add_bevans_product_columns_v1")),T("create_product_variants_v1")||(e.exec(`
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
    `),a("create_product_variants_v1")),T("create_product_images_v1")||(e.exec(`
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
    `),a("create_product_images_v1")),!T("drop_solar_quotes_v1"))if(e.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='quotes'").get()){let s=e.prepare("SELECT COUNT(*) as c FROM quotes").get().c;s>0?console.warn(`[bevans] quotes table has ${s} row(s) — skipping drop. Manual review needed.`):(e.exec("DROP TABLE IF EXISTS quotes"),a("drop_solar_quotes_v1"))}else a("drop_solar_quotes_v1");T("seed_bevans_products_v1")||(0===e.prepare("SELECT COUNT(*) as c FROM products").get().c&&(s=e,t=new Date().toISOString(),i=s.prepare(`
    INSERT OR IGNORE INTO products
      (id, name, slug, price, originalPrice, category, gender, material, fit,
       description, imageUrl, inStock, featured, newArrival, createdAt, updatedAt)
    VALUES
      (@id, @name, @slug, @price, @originalPrice, @category, @gender, @material, @fit,
       @description, @imageUrl, @inStock, @featured, @newArrival, @createdAt, @updatedAt)
  `),o=s.prepare(`
    INSERT OR IGNORE INTO product_variants
      (id, product_id, colour, size, sku, stock, createdAt, updatedAt)
    VALUES
      (@id, @product_id, @colour, @size, @sku, @stock, @createdAt, @updatedAt)
  `),r=[{id:"bs-hoodie-001",name:"Bevans Signature Hoodie",slug:"bevans-signature-hoodie",price:"899.00",originalPrice:"",category:"Men's Hoodies",gender:"Men",material:"400gsm Cotton Fleece",fit:"Oversized",description:"Our flagship heavyweight hoodie. Drop-shoulder silhouette, kangaroo pocket, ribbed cuffs and hem. Built to last, crafted for style.",imageUrl:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&h=1000&fit=crop&q=85",inStock:1,featured:1,newArrival:1,variants:[{colour:"Black",sizes:[{size:"S",sku:"BSH-BLK-S",stock:10},{size:"M",sku:"BSH-BLK-M",stock:15},{size:"L",sku:"BSH-BLK-L",stock:8},{size:"XL",sku:"BSH-BLK-XL",stock:5}]},{colour:"Charcoal",sizes:[{size:"S",sku:"BSH-CHR-S",stock:7},{size:"M",sku:"BSH-CHR-M",stock:12},{size:"L",sku:"BSH-CHR-L",stock:9},{size:"XL",sku:"BSH-CHR-XL",stock:4}]},{colour:"Cream",sizes:[{size:"S",sku:"BSH-CRM-S",stock:6},{size:"M",sku:"BSH-CRM-M",stock:8},{size:"L",sku:"BSH-CRM-L",stock:5},{size:"XL",sku:"BSH-CRM-XL",stock:2}]}]},{id:"bs-hoodie-002",name:"Bevans Essential Hoodie",slug:"bevans-essential-hoodie",price:"649.00",originalPrice:"799.00",category:"Unisex Hoodies",gender:"Unisex",material:"320gsm Cotton-Polyester Blend",fit:"Regular",description:"The everyday essential. Midweight fleece, classic fit, embroidered logo. Perfect for any occasion, any season.",imageUrl:"https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&h=1000&fit=crop&q=85",inStock:1,featured:1,newArrival:0,variants:[{colour:"Black",sizes:[{size:"XS",sku:"BEH-BLK-XS",stock:5},{size:"S",sku:"BEH-BLK-S",stock:12},{size:"M",sku:"BEH-BLK-M",stock:18},{size:"L",sku:"BEH-BLK-L",stock:14},{size:"XL",sku:"BEH-BLK-XL",stock:7},{size:"XXL",sku:"BEH-BLK-XXL",stock:3}]},{colour:"Slate Grey",sizes:[{size:"S",sku:"BEH-SLT-S",stock:8},{size:"M",sku:"BEH-SLT-M",stock:14},{size:"L",sku:"BEH-SLT-L",stock:10},{size:"XL",sku:"BEH-SLT-XL",stock:5}]},{colour:"Olive",sizes:[{size:"S",sku:"BEH-OLV-S",stock:6},{size:"M",sku:"BEH-OLV-M",stock:9},{size:"L",sku:"BEH-OLV-L",stock:7}]}]},{id:"bs-tee-001",name:"Bevans Signature Tee",slug:"bevans-signature-tee",price:"399.00",originalPrice:"",category:"Men's T-Shirts",gender:"Men",material:"200gsm Combed Cotton",fit:"Relaxed",description:"Heavyweight premium tee with a relaxed boxy fit. Triple-stitched seams, reinforced collar. Made to outlast trends.",imageUrl:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop&q=85",inStock:1,featured:1,newArrival:1,variants:[{colour:"White",sizes:[{size:"S",sku:"BST-WHT-S",stock:20},{size:"M",sku:"BST-WHT-M",stock:25},{size:"L",sku:"BST-WHT-L",stock:20},{size:"XL",sku:"BST-WHT-XL",stock:12},{size:"XXL",sku:"BST-WHT-XXL",stock:6}]},{colour:"Black",sizes:[{size:"S",sku:"BST-BLK-S",stock:18},{size:"M",sku:"BST-BLK-M",stock:22},{size:"L",sku:"BST-BLK-L",stock:18},{size:"XL",sku:"BST-BLK-XL",stock:10}]},{colour:"Stone",sizes:[{size:"S",sku:"BST-STN-S",stock:10},{size:"M",sku:"BST-STN-M",stock:14},{size:"L",sku:"BST-STN-L",stock:11},{size:"XL",sku:"BST-STN-XL",stock:5}]}]},{id:"bs-tee-002",name:"Bevans Essential Tee",slug:"bevans-essential-tee",price:"299.00",originalPrice:"",category:"Unisex T-Shirts",gender:"Unisex",material:"180gsm Combed Cotton",fit:"Regular",description:"The clean essential. Minimal branding, superior cotton, everyday comfort. Available in versatile neutrals.",imageUrl:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop&q=85",inStock:1,featured:0,newArrival:0,variants:[{colour:"White",sizes:[{size:"XS",sku:"BET-WHT-XS",stock:15},{size:"S",sku:"BET-WHT-S",stock:20},{size:"M",sku:"BET-WHT-M",stock:25},{size:"L",sku:"BET-WHT-L",stock:20},{size:"XL",sku:"BET-WHT-XL",stock:10}]},{colour:"Black",sizes:[{size:"XS",sku:"BET-BLK-XS",stock:12},{size:"S",sku:"BET-BLK-S",stock:18},{size:"M",sku:"BET-BLK-M",stock:22},{size:"L",sku:"BET-BLK-L",stock:17},{size:"XL",sku:"BET-BLK-XL",stock:8}]},{colour:"Beige",sizes:[{size:"S",sku:"BET-BGE-S",stock:10},{size:"M",sku:"BET-BGE-M",stock:15},{size:"L",sku:"BET-BGE-L",stock:12}]}]},{id:"bs-tee-003",name:"Bevans Oversized Tee",slug:"bevans-oversized-tee",price:"349.00",originalPrice:"",category:"Men's T-Shirts",gender:"Men",material:"220gsm Heavy Cotton",fit:"Oversized",description:"Drop-shoulder, extended length, boxy silhouette. The go-to for an effortless streetwear look.",imageUrl:"https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=1000&fit=crop&q=85",inStock:1,featured:0,newArrival:1,variants:[{colour:"Black",sizes:[{size:"S",sku:"BOT-BLK-S",stock:12},{size:"M",sku:"BOT-BLK-M",stock:16},{size:"L",sku:"BOT-BLK-L",stock:12},{size:"XL",sku:"BOT-BLK-XL",stock:6}]},{colour:"White",sizes:[{size:"S",sku:"BOT-WHT-S",stock:10},{size:"M",sku:"BOT-WHT-M",stock:14},{size:"L",sku:"BOT-WHT-L",stock:10},{size:"XL",sku:"BOT-WHT-XL",stock:5}]},{colour:"Washed Grey",sizes:[{size:"S",sku:"BOT-WGR-S",stock:8},{size:"M",sku:"BOT-WGR-M",stock:11},{size:"L",sku:"BOT-WGR-L",stock:8}]}]},{id:"bs-jacket-001",name:"Bevans Street Jacket",slug:"bevans-street-jacket",price:"1299.00",originalPrice:"1599.00",category:"Men's Jackets",gender:"Men",material:"Nylon Shell, Mesh Lining",fit:"Relaxed",description:"Lightweight technical jacket with a premium feel. Zip chest pocket, adjustable hem, water-resistant shell. From the street to anywhere.",imageUrl:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=85",inStock:1,featured:1,newArrival:0,variants:[{colour:"Black",sizes:[{size:"S",sku:"BSJ-BLK-S",stock:5},{size:"M",sku:"BSJ-BLK-M",stock:8},{size:"L",sku:"BSJ-BLK-L",stock:6},{size:"XL",sku:"BSJ-BLK-XL",stock:3}]},{colour:"Olive",sizes:[{size:"S",sku:"BSJ-OLV-S",stock:4},{size:"M",sku:"BSJ-OLV-M",stock:7},{size:"L",sku:"BSJ-OLV-L",stock:5},{size:"XL",sku:"BSJ-OLV-XL",stock:2}]}]},{id:"bs-pants-001",name:"Bevans Relaxed Cargo Pants",slug:"bevans-relaxed-cargo-pants",price:"799.00",originalPrice:"",category:"Men's Pants",gender:"Men",material:"100% Cotton Twill",fit:"Relaxed",description:"Utility-inspired cargo pants with a modern relaxed fit. Six-pocket design, adjustable ankle cuffs, straight leg.",imageUrl:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop&q=85",inStock:1,featured:0,newArrival:1,variants:[{colour:"Black",sizes:[{size:"S",sku:"BCP-BLK-S",stock:6},{size:"M",sku:"BCP-BLK-M",stock:10},{size:"L",sku:"BCP-BLK-L",stock:8},{size:"XL",sku:"BCP-BLK-XL",stock:4}]},{colour:"Khaki",sizes:[{size:"S",sku:"BCP-KHK-S",stock:5},{size:"M",sku:"BCP-KHK-M",stock:9},{size:"L",sku:"BCP-KHK-L",stock:7},{size:"XL",sku:"BCP-KHK-XL",stock:3}]},{colour:"Olive",sizes:[{size:"S",sku:"BCP-OLV-S",stock:4},{size:"M",sku:"BCP-OLV-M",stock:7},{size:"L",sku:"BCP-OLV-L",stock:5}]}]},{id:"bs-cap-001",name:"Bevans Classic Cap",slug:"bevans-classic-cap",price:"299.00",originalPrice:"",category:"Caps",gender:"Unisex",material:"100% Cotton Twill",fit:"One Size",description:"Clean 6-panel structured cap with embroidered Bevans Sons logo. Adjustable strap, curved brim.",imageUrl:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=1000&fit=crop&q=85",inStock:1,featured:0,newArrival:0,variants:[{colour:"Black",sizes:[{size:"One Size",sku:"BCC-BLK-OS",stock:20}]},{colour:"White",sizes:[{size:"One Size",sku:"BCC-WHT-OS",stock:15}]},{colour:"Tan",sizes:[{size:"One Size",sku:"BCC-TAN-OS",stock:12}]}]},{id:"bs-dress-001",name:"Bevans Linen Midi Dress",slug:"bevans-linen-midi-dress",price:"699.00",originalPrice:"899.00",category:"Women's Dresses",gender:"Women",material:"55% Linen, 45% Viscose",fit:"Relaxed",description:"Effortlessly elegant. Midi length, wide-leg silhouette, side pockets, V-neckline. A wardrobe staple.",imageUrl:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop&q=85",inStock:1,featured:1,newArrival:1,variants:[{colour:"Ecru",sizes:[{size:"XS",sku:"BLD-ECR-XS",stock:5},{size:"S",sku:"BLD-ECR-S",stock:9},{size:"M",sku:"BLD-ECR-M",stock:12},{size:"L",sku:"BLD-ECR-L",stock:8},{size:"XL",sku:"BLD-ECR-XL",stock:4}]},{colour:"Black",sizes:[{size:"XS",sku:"BLD-BLK-XS",stock:4},{size:"S",sku:"BLD-BLK-S",stock:8},{size:"M",sku:"BLD-BLK-M",stock:10},{size:"L",sku:"BLD-BLK-L",stock:7},{size:"XL",sku:"BLD-BLK-XL",stock:3}]}]},{id:"bs-top-001",name:"Bevans Ribbed Tank",slug:"bevans-ribbed-tank",price:"249.00",originalPrice:"",category:"Women's Tops",gender:"Women",material:"95% Cotton, 5% Elastane",fit:"Slim",description:"Fine ribbed knit tank with a clean, minimal aesthetic. Pairs perfectly with high-waisted bottoms.",imageUrl:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop&q=85",inStock:1,featured:0,newArrival:1,variants:[{colour:"White",sizes:[{size:"XS",sku:"BRT-WHT-XS",stock:15},{size:"S",sku:"BRT-WHT-S",stock:18},{size:"M",sku:"BRT-WHT-M",stock:20},{size:"L",sku:"BRT-WHT-L",stock:14}]},{colour:"Black",sizes:[{size:"XS",sku:"BRT-BLK-XS",stock:12},{size:"S",sku:"BRT-BLK-S",stock:16},{size:"M",sku:"BRT-BLK-M",stock:18},{size:"L",sku:"BRT-BLK-L",stock:12}]},{colour:"Chocolate",sizes:[{size:"XS",sku:"BRT-CHC-XS",stock:8},{size:"S",sku:"BRT-CHC-S",stock:11},{size:"M",sku:"BRT-CHC-M",stock:13},{size:"L",sku:"BRT-CHC-L",stock:9}]}]},{id:"bs-shirt-001",name:"Bevans Oversized Oxford Shirt",slug:"bevans-oversized-oxford-shirt",price:"549.00",originalPrice:"",category:"Men's Shirts",gender:"Men",material:"100% Cotton Oxford Weave",fit:"Oversized",description:"A versatile oversized shirt in premium Oxford cloth. Button-down collar, chest pocket, clean drape. Wear it open or buttoned.",imageUrl:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop&q=85",inStock:1,featured:0,newArrival:0,variants:[{colour:"White",sizes:[{size:"S",sku:"BOS-WHT-S",stock:8},{size:"M",sku:"BOS-WHT-M",stock:12},{size:"L",sku:"BOS-WHT-L",stock:10},{size:"XL",sku:"BOS-WHT-XL",stock:5}]},{colour:"Blue",sizes:[{size:"S",sku:"BOS-BLU-S",stock:6},{size:"M",sku:"BOS-BLU-M",stock:10},{size:"L",sku:"BOS-BLU-L",stock:8},{size:"XL",sku:"BOS-BLU-XL",stock:4}]}]},{id:"bs-hoodie-003",name:"Bevans Women's Cropped Hoodie",slug:"bevans-womens-cropped-hoodie",price:"599.00",originalPrice:"",category:"Women's Hoodies",gender:"Women",material:"360gsm French Terry",fit:"Cropped",description:"Premium cropped hoodie with a clean, feminine silhouette. Soft brushed interior, kangaroo pocket.",imageUrl:"https://images.unsplash.com/photo-1485518882345-15568b007407?w=800&h=1000&fit=crop&q=85",inStock:1,featured:0,newArrival:1,variants:[{colour:"Pink",sizes:[{size:"XS",sku:"BWH-PNK-XS",stock:8},{size:"S",sku:"BWH-PNK-S",stock:12},{size:"M",sku:"BWH-PNK-M",stock:14},{size:"L",sku:"BWH-PNK-L",stock:9}]},{colour:"Black",sizes:[{size:"XS",sku:"BWH-BLK-XS",stock:7},{size:"S",sku:"BWH-BLK-S",stock:10},{size:"M",sku:"BWH-BLK-M",stock:12},{size:"L",sku:"BWH-BLK-L",stock:8}]},{colour:"Lavender",sizes:[{size:"XS",sku:"BWH-LAV-XS",stock:0},{size:"S",sku:"BWH-LAV-S",stock:0},{size:"M",sku:"BWH-LAV-M",stock:5},{size:"L",sku:"BWH-LAV-L",stock:3}]}]}],s.transaction(()=>{for(let e of r)for(let s of(i.run({id:e.id,name:e.name,slug:e.slug,price:e.price,originalPrice:e.originalPrice,category:e.category,gender:e.gender,material:e.material,fit:e.fit,description:e.description,imageUrl:e.imageUrl,inStock:e.inStock,featured:e.featured,newArrival:e.newArrival,createdAt:t,updatedAt:t}),e.variants))for(let i of s.sizes){let r=`${e.id}-${s.colour.toLowerCase().replace(/\s+/g,"-")}-${i.size.toLowerCase()}`;o.run({id:r,product_id:e.id,colour:s.colour,size:i.size,sku:i.sku,stock:i.stock,createdAt:t,updatedAt:t})}})()),a("seed_bevans_products_v1"))}(T)),T}e.s(["getDb",0,a,"syncProductsFromJson",0,function(){let e=t.default.join(o,"products.json");if((0,i.existsSync)(e))try{let s=a(),t=JSON.parse((0,i.readFileSync)(e,"utf8")),o=s.prepare(`
      INSERT OR IGNORE INTO products
        (id, name, slug, price, originalPrice, category, gender, material, fit,
         description, imageUrl, inStock, featured, newArrival, createdAt, updatedAt)
      VALUES
        (@id, @name, @slug, @price, @originalPrice, @category, @gender, @material, @fit,
         @description, @imageUrl, @inStock, @featured, @newArrival, @createdAt, @updatedAt)
    `),r=new Date().toISOString();s.transaction(()=>{for(let e of t)o.run({id:e.id,name:e.name??"",slug:e.slug??e.id,price:e.price??"",originalPrice:e.originalPrice??"",category:e.category??"",gender:e.gender??"Unisex",material:e.material??"",fit:e.fit??"",description:e.description??"",imageUrl:e.imageUrl??"",inStock:+!!e.inStock,featured:+!!e.featured,newArrival:+!!e.newArrival,createdAt:e.createdAt??r,updatedAt:e.updatedAt??r})})(),console.log(`[bevans] synced ${t.length} products from products.json`)}catch(e){console.error("[bevans] failed to sync products.json:",e)}}])}];

//# sourceMappingURL=lib_db_ts_0tfvek2._.js.map