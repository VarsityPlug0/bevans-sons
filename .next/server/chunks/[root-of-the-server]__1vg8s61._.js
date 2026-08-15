module.exports=[85148,(e,t,i)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,i)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,i)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,i)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,i)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,i)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,i)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,i)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,i)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,i)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,i)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,i)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},84423,(e,t,i)=>{t.exports=e.x("nodemailer-9c35dd349a8aaa9f",()=>require("nodemailer-9c35dd349a8aaa9f"))},14747,(e,t,i)=>{t.exports=e.x("path",()=>require("path"))},62294,e=>{"use strict";var t=e.i(85148),i=e.i(14747),r=e.i(22734);let o=process.env.DATA_DIR??i.default.join(process.cwd(),"data"),a=i.default.join(o,"daisy.db"),n=[i.default.join(o,"products-backup.json"),i.default.join(process.cwd(),"data","products.json")],s=null;function p(){return s||((0,r.existsSync)(o)||(0,r.mkdirSync)(o,{recursive:!0}),(s=new t.default(a)).pragma("journal_mode = WAL"),s.pragma("foreign_keys = ON"),s.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      price       TEXT NOT NULL,
      category    TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      imageUrl    TEXT NOT NULL DEFAULT '',
      inStock     INTEGER NOT NULL DEFAULT 1,
      featured    INTEGER NOT NULL DEFAULT 0,
      createdAt   TEXT NOT NULL,
      updatedAt   TEXT NOT NULL
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

    CREATE TABLE IF NOT EXISTS quotes (
      id                TEXT PRIMARY KEY,
      ref               TEXT UNIQUE NOT NULL,
      name              TEXT NOT NULL DEFAULT '',
      phone             TEXT NOT NULL DEFAULT '',
      email             TEXT NOT NULL DEFAULT '',
      province          TEXT NOT NULL DEFAULT '',
      propertyType      TEXT NOT NULL DEFAULT '',
      monthlyBill       TEXT NOT NULL DEFAULT '',
      mainGoal          TEXT NOT NULL DEFAULT '',
      appliances        TEXT NOT NULL DEFAULT '[]',
      budget            TEXT NOT NULL DEFAULT '',
      recommendedPackage TEXT NOT NULL DEFAULT '',
      estimatedPrice    TEXT NOT NULL DEFAULT '',
      message           TEXT NOT NULL DEFAULT '',
      status            TEXT NOT NULL DEFAULT 'new',
      source            TEXT NOT NULL DEFAULT 'contact',
      createdAt         TEXT NOT NULL
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

    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY
    );
  `),function(e){if(!e.prepare("SELECT name FROM migrations WHERE name = ?").get("json_import_gadgets_v1")){for(let t of n)if((0,r.existsSync)(t))try{let i=JSON.parse((0,r.readFileSync)(t,"utf-8"));if(Array.isArray(i)&&i.length>0){e.prepare("DELETE FROM products").run();let t=e.prepare(`
          INSERT OR REPLACE INTO products
            (id, name, price, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
          VALUES
            (@id, @name, @price, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
        `);e.transaction(e=>{for(let i of e)t.run({...i,inStock:+!!i.inStock,featured:+!!i.featured})})(i);break}}catch{}e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run("json_import_gadgets_v1")}}(s),function(e){if(e.prepare("SELECT name FROM migrations WHERE name = ?").get("seed_products_v1"))return;if(e.prepare("SELECT COUNT(*) as c FROM products").get().c>0)return e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run("seed_products_v1");let t=new Date().toISOString(),i=e.prepare(`
    INSERT OR IGNORE INTO products (id, name, price, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @price, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
  `);e.transaction(e=>{for(let r of e)i.run({...r,createdAt:t,updatedAt:t})})([{id:"sm-001",name:"iPhone 15 Pro Max 256GB",price:"R22,999",category:"Smartphones",featured:1,inStock:1,description:"Titanium design, A17 Pro chip, 48MP camera system, USB-C, Action button. Available in Natural, Black, White & Blue Titanium.",imageUrl:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop"},{id:"sm-002",name:"iPhone 15 128GB",price:"R16,999",category:"Smartphones",featured:1,inStock:1,description:"Dynamic Island, 48MP main camera, USB-C, A16 Bionic chip. Available in Pink, Yellow, Green, Blue & Black.",imageUrl:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"},{id:"sm-003",name:"Samsung Galaxy S24 Ultra 256GB",price:"R19,999",category:"Smartphones",featured:1,inStock:1,description:'Built-in S Pen, 200MP camera, Snapdragon 8 Gen 3, 6.8" QHD+ display, 5000mAh battery.',imageUrl:"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop"},{id:"sm-004",name:"Samsung Galaxy A54 5G 128GB",price:"R7,499",category:"Smartphones",featured:0,inStock:1,description:"50MP OIS camera, 5000mAh battery, Super AMOLED display, IP67 water resistant.",imageUrl:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop"},{id:"sm-005",name:"Samsung Galaxy S23 FE 256GB",price:"R9,999",category:"Smartphones",featured:0,inStock:1,description:"50MP triple camera, Snapdragon 8 Gen 1, 4500mAh, AMOLED 120Hz display.",imageUrl:"https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop"},{id:"tv-001",name:'Samsung 65" QLED 4K Smart TV',price:"R14,999",category:"TVs",featured:1,inStock:1,description:"Quantum Dot technology, Tizen OS, 120Hz, HDR10+, Dolby Atmos, 4 HDMI ports.",imageUrl:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&h=600&fit=crop"},{id:"tv-002",name:'Hisense 55" 4K UHD Smart TV',price:"R6,999",category:"TVs",featured:0,inStock:1,description:"4K UHD, VIDAA Smart OS, Dolby Vision, DTS Virtual:X, HDR10, 3 HDMI.",imageUrl:"https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&h=600&fit=crop"},{id:"tv-003",name:'LG 75" OLED C3 4K Smart TV',price:"R34,999",category:"TVs",featured:1,inStock:1,description:"Evo OLED panel, α9 Gen6 AI processor, Dolby Vision IQ, Dolby Atmos, Game Mode Pro, webOS 23.",imageUrl:"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=600&fit=crop"},{id:"tv-004",name:'Samsung 43" Crystal UHD Smart TV',price:"R5,499",category:"TVs",featured:0,inStock:1,description:"Crystal Processor 4K, PurColor, HDR, Tizen OS, Built-in Wi-Fi.",imageUrl:"https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&h=600&fit=crop"},{id:"gc-001",name:"PlayStation 5 Console",price:"R12,999",category:"Gaming Consoles",featured:1,inStock:1,description:"825GB SSD, 4K gaming, 120fps, DualSense controller, 3D Audio, Ultra HD Blu-ray.",imageUrl:"https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=600&fit=crop"},{id:"gc-002",name:"PlayStation 5 Slim",price:"R10,999",category:"Gaming Consoles",featured:0,inStock:1,description:"Slimmer, lighter PS5 with 1TB SSD, detachable disc drive, DualSense controller.",imageUrl:"https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop"},{id:"gc-003",name:"Xbox Series X 1TB",price:"R11,999",category:"Gaming Consoles",featured:0,inStock:1,description:"1TB NVMe SSD, 4K 120fps, Quick Resume, Ray Tracing, Xbox Game Pass ready.",imageUrl:"https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=600&h=600&fit=crop"},{id:"gc-004",name:"Nintendo Switch OLED",price:"R6,499",category:"Gaming Consoles",featured:0,inStock:1,description:'7" OLED screen, 64GB storage, enhanced audio, wide adjustable stand, dock with LAN port.',imageUrl:"https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=600&fit=crop"},{id:"gp-001",name:"RTX 4070 Gaming PC Bundle",price:"R22,999",category:"Gaming PCs",featured:1,inStock:1,description:"Intel Core i7-13700K, RTX 4070 12GB, 32GB DDR5 RAM, 1TB NVMe SSD, 240mm AIO cooler.",imageUrl:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&h=600&fit=crop"},{id:"gp-002",name:"AMD Ryzen 9 Gaming Rig",price:"R28,999",category:"Gaming PCs",featured:1,inStock:1,description:"Ryzen 9 7900X, RX 7900 XT 20GB, 32GB DDR5, 2TB NVMe SSD, Full-tower RGB case.",imageUrl:"https://images.unsplash.com/photo-1593640408182-31c228cba4fc?w=600&h=600&fit=crop"},{id:"gp-003",name:"Intel i5 Starter Gaming PC",price:"R13,999",category:"Gaming PCs",featured:0,inStock:1,description:"Intel Core i5-12400F, RTX 3060 12GB, 16GB DDR4, 512GB SSD. Perfect entry-level gaming rig.",imageUrl:"https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&h=600&fit=crop"},{id:"lb-001",name:'MacBook Pro M3 14"',price:"R32,999",category:"Laptops & MacBooks",featured:1,inStock:1,description:"Apple M3 chip, 8GB RAM, 512GB SSD, Liquid Retina display, 22-hour battery, MagSafe 3.",imageUrl:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop"},{id:"lb-002",name:'MacBook Air M2 13"',price:"R22,999",category:"Laptops & MacBooks",featured:1,inStock:1,description:"Apple M2 chip, 8GB RAM, 256GB SSD, Liquid Retina display, 18-hour battery, fanless design.",imageUrl:"https://images.unsplash.com/photo-1611186871525-4767a56e0f54?w=600&h=600&fit=crop"},{id:"lb-003",name:"Dell XPS 15 Intel i7",price:"R23,999",category:"Laptops & MacBooks",featured:0,inStock:1,description:'Intel Core i7-13700H, 16GB DDR5, 512GB SSD, RTX 4050, 15.6" OLED 3.5K display.',imageUrl:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop"},{id:"lb-004",name:'HP Pavilion Gaming 15" Laptop',price:"R14,499",category:"Laptops & MacBooks",featured:0,inStock:1,description:"AMD Ryzen 7 7745H, RTX 4060 8GB, 16GB DDR5, 512GB SSD, 144Hz FHD display.",imageUrl:"https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop"},{id:"lb-005",name:"Lenovo ThinkPad X1 Carbon",price:"R19,999",category:"Laptops & MacBooks",featured:0,inStock:1,description:'Intel Core i7-1365U, 16GB LPDDR5, 512GB SSD, 14" IPS 2.8K OLED, 57Wh battery.',imageUrl:"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop"},{id:"tw-001",name:'iPad Pro M2 12.9" 256GB',price:"R21,999",category:"Tablets & Watches",featured:1,inStock:1,description:"Apple M2 chip, Liquid Retina XDR display, Wi-Fi 6E, 12MP + 10MP cameras, Face ID.",imageUrl:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop"},{id:"tw-002",name:"Apple Watch Series 9 45mm",price:"R8,999",category:"Tablets & Watches",featured:0,inStock:1,description:"S9 SiP chip, Double Tap gesture, Always-On Retina display, crash detection, GPS.",imageUrl:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"},{id:"tw-003",name:"Samsung Galaxy Tab S9 256GB",price:"R13,499",category:"Tablets & Watches",featured:0,inStock:1,description:'Snapdragon 8 Gen 2, 11" Dynamic AMOLED 2X, S Pen included, IP68, 8400mAh.',imageUrl:"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop"},{id:"tw-004",name:"Apple Watch Ultra 2 49mm",price:"R13,999",category:"Tablets & Watches",featured:0,inStock:1,description:"Titanium case, 3000 nits display, dual-frequency GPS, 60-hour battery, Action button.",imageUrl:"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop"},{id:"ha-001",name:"Samsung 15kg Top Loader Washing Machine",price:"R7,499",category:"Home Appliances",featured:1,inStock:1,description:"Digital Inverter Motor, Eco Tub Clean, child lock, 15 wash programs, 5-year motor warranty.",imageUrl:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=600&fit=crop"},{id:"ha-002",name:"LG 600L Double Door Fridge",price:"R12,999",category:"Home Appliances",featured:1,inStock:1,description:"Linear Inverter Compressor, Door-in-Door, Multi Air Flow, Smart Diagnosis, A++ energy rating.",imageUrl:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=600&fit=crop"},{id:"ha-003",name:"Hisense 7kg Front Loader Washer",price:"R5,499",category:"Home Appliances",featured:0,inStock:1,description:"Inverter motor, 1200 RPM spin, 15 wash programs, anti-vibration design, delay start.",imageUrl:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop"},{id:"ha-004",name:"Bosch 60cm Built-In Dishwasher",price:"R8,999",category:"Home Appliances",featured:0,inStock:1,description:"14 place settings, EcoSilence motor, 6 programs, AutoDry, A++ energy class.",imageUrl:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=600&fit=crop"},{id:"ka-001",name:"De'Longhi Magnifica Evo Espresso Machine",price:"R5,999",category:"Kitchen Appliances",featured:1,inStock:1,description:"Bean-to-cup, 15-bar pressure, LatteCrema System, 250g bean hopper, My Menu display.",imageUrl:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop"},{id:"ka-002",name:"Samsung 28L Convection Microwave",price:"R2,999",category:"Kitchen Appliances",featured:0,inStock:1,description:"900W, Slim Fry technology, Ceramic enamel interior, 28L capacity, slim design.",imageUrl:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop"},{id:"ka-003",name:"Smeg Retro Kettle + Toaster Set",price:"R2,499",category:"Kitchen Appliances",featured:0,inStock:1,description:"1.7L stainless steel kettle, 2-slice toaster, iconic retro design. Available in multiple colours.",imageUrl:"https://images.unsplash.com/photo-1525904097878-94fb15835963?w=600&h=600&fit=crop"},{id:"ka-004",name:"Nutribullet Pro 900W",price:"R1,299",category:"Kitchen Appliances",featured:0,inStock:1,description:"900W motor, 2x 900ml cups, stainless steel blades, BPA-free, dishwasher-safe cups.",imageUrl:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop"},{id:"sp-001",name:"5kVA Inverter + 200Ah Lithium Battery Bundle",price:"R18,999",category:"Solar & Power Solutions",featured:1,inStock:1,description:"Pure sine wave inverter, 200Ah LiFePO4 battery, WiFi monitoring, 4000W load capacity. Ideal for load shedding.",imageUrl:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=600&fit=crop"},{id:"sp-002",name:"10kVA Solar System (8 Panels + Inverter)",price:"R49,999",category:"Solar & Power Solutions",featured:1,inStock:1,description:"8x 550W solar panels, 10kVA hybrid inverter, 2x 200Ah lithium batteries. Full installation package available.",imageUrl:"https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=600&fit=crop"},{id:"sp-003",name:"3kVA Load Shedding Inverter Kit",price:"R9,999",category:"Solar & Power Solutions",featured:0,inStock:1,description:"3kVA pure sine wave inverter + 100Ah AGM battery. Powers lights, TV, DSTV, router & small appliances.",imageUrl:"https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=600&fit=crop"},{id:"sp-004",name:"200W Portable Folding Solar Panel",price:"R2,999",category:"Solar & Power Solutions",featured:0,inStock:1,description:"Monocrystalline cells, 200W peak output, USB-A/USB-C, MC4 connector, IP67 waterproof.",imageUrl:"https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&h=600&fit=crop"},{id:"er-001",name:"Kids Mercedes AMG Electric Ride-On 24V",price:"R5,999",category:"Electric Ride-On Cars",featured:1,inStock:1,description:"Licensed Mercedes AMG, 24V dual motor, leather seat, rubber tyres, parental remote control, MP3/Bluetooth.",imageUrl:"https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=600&h=600&fit=crop"},{id:"er-002",name:"BMW X5 Electric Ride-On 12V",price:"R3,999",category:"Electric Ride-On Cars",featured:0,inStock:1,description:"Licensed BMW X5, 12V battery, 2 speeds, LED lights, music player, remote control.",imageUrl:"https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?w=600&h=600&fit=crop"},{id:"er-003",name:"Lamborghini Electric Kids Car 12V",price:"R4,499",category:"Electric Ride-On Cars",featured:0,inStock:1,description:"Licensed Lamborghini, 12V motor, doors open, horn, LED headlights, remote control, up to 5km/h.",imageUrl:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=600&fit=crop"},{id:"fu-001",name:"L-Shape Corner Sofa Set",price:"R8,999",category:"Furniture",featured:1,inStock:1,description:"Premium fabric upholstery, solid wood frame, reversible chaise lounge. Seats 5–6 people. Multiple colours.",imageUrl:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop"},{id:"fu-002",name:"King Size Bed Frame + Headboard",price:"R5,999",category:"Furniture",featured:0,inStock:1,description:"Solid wood slat base, padded headboard, centre support legs. Fits standard 183x200cm mattress.",imageUrl:"https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&h=600&fit=crop"},{id:"fu-003",name:"Electric Height-Adjustable Standing Desk",price:"R6,499",category:"Furniture",featured:0,inStock:1,description:"Dual motor electric lift, 140x70cm desktop, 4 memory presets, cable management, 80kg capacity.",imageUrl:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop"},{id:"fu-004",name:"Recliner Lounge Chair",price:"R4,499",category:"Furniture",featured:0,inStock:1,description:"PU leather, 360° swivel, 135° recline, padded armrests. Available in Black, Brown & Grey.",imageUrl:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop"},{id:"oe-001",name:"HP Color LaserJet Pro MFP",price:"R5,499",category:"Office Equipment",featured:0,inStock:1,description:"Print, scan, copy & fax. 22ppm colour, Wi-Fi + LAN, auto duplex, 250-sheet tray.",imageUrl:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&h=600&fit=crop"},{id:"oe-002",name:"Canon PIXMA MegaTank All-in-One",price:"R1,999",category:"Office Equipment",featured:0,inStock:1,description:"Ink tank system (no cartridges), print/scan/copy, Wi-Fi, up to 6,000 black pages per fill.",imageUrl:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop"},{id:"oe-003",name:"Ergonomic Mesh Office Chair",price:"R3,499",category:"Office Equipment",featured:0,inStock:1,description:"Lumbar support, adjustable armrests, headrest, seat height & tilt. Max 120kg. 360° casters.",imageUrl:"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=600&fit=crop"}]),e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run("seed_products_v1")}(s),d(s)),s}function d(e){try{let t=(e??p()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,r.existsSync)(o)||(0,r.mkdirSync)(o,{recursive:!0}),(0,r.writeFileSync)(i.default.join(o,"products-backup.json"),JSON.stringify(t,null,2))}catch{}}e.s(["exportProductsJson",0,d,"getDb",0,p])},67010,e=>{"use strict";var t=e.i(84423),i=e.i(14747),r=e.i(22734);let o=i.default.join(process.cwd(),"public","logo.jpg"),a="logo@daisygadgets",n="#D4AF37",s="#f5d76e",p="#0A0A0A",d="#161616",c="#1F1F1F",l="#6b7280",g="27848961782",m="https://daisygadgetsco.co.za";async function h(e){let i,n,s=(i=process.env.MAIL_USER,n=process.env.MAIL_PASS,i&&n?t.default.createTransport({service:"gmail",auth:{user:i,pass:n}}):null);if(!s)return void console.error("mailer: env vars missing");try{let t=[];(0,r.existsSync)(o)&&t.push({filename:"logo.jpg",path:o,cid:a}),await s.sendMail({from:`"Daisy Gadgets Co." <${process.env.MAIL_USER}>`,to:e.to,subject:e.subject,html:e.html,attachments:t})}catch(e){console.error("mailer send error:",e)}}function f(e,t=""){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Daisy Gadgets Co.</title>
</head>
<body style="margin:0;padding:0;background:${p};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${p};padding:28px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid ${c}">

        <!-- Gold shimmer top bar -->
        <tr><td style="background:linear-gradient(90deg,${p},${n},${s},${n},${p});height:3px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Header -->
        <tr>
          <td style="background:${p};padding:24px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="cid:${a}" alt="Daisy Gadgets Co." height="44" style="height:44px;width:auto;display:block;border:0" />
                </td>
                <td align="right">
                  <a href="${m}" style="color:${l};font-size:12px;text-decoration:none">daisygadgetsco.co.za</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${t}

        <!-- Body -->
        <tr>
          <td style="background:#111111;padding:36px 36px 32px;border-top:1px solid ${c}">
            ${e}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${p};padding:24px 36px;border-top:1px solid ${c}">
            <p style="margin:0 0 8px;color:${l};font-size:12px;text-align:center">
              Questions? &nbsp;
              <a href="https://wa.me/${g}" style="color:${n};text-decoration:none;font-weight:600">WhatsApp +27 84 896 1782</a>
              &nbsp;\xb7&nbsp;
              <a href="${m}" style="color:${n};text-decoration:none;font-weight:600">daisygadgetsco.co.za</a>
            </p>
            <p style="margin:0;color:#333;font-size:11px;text-align:center">
              \xa9 ${new Date().getFullYear()} Daisy Gadgets Co. \xb7 All rights reserved.
            </p>
          </td>
        </tr>

        <!-- Bottom gold bar -->
        <tr><td style="background:linear-gradient(90deg,${p},${n},${s},${n},${p});height:2px;font-size:0;line-height:0">&nbsp;</td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`}function u(e){return`<p style="margin:0 0 3px;color:${l};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em">${e}</p>`}function y(){return`<div style="height:1px;background:${c};margin:24px 0"></div>`}function x(e,t,i=n,r=p){return`<a href="${t}" style="display:inline-block;background:${i};color:${r};font-weight:800;text-decoration:none;padding:13px 26px;border-radius:10px;font-size:14px;letter-spacing:0.02em">${e}</a>`}function b(e,t){return`<tr>
    <td style="padding:8px 0;color:${l};font-size:13px;width:150px;vertical-align:top;border-bottom:1px solid ${c}">${e}</td>
    <td style="padding:8px 0;color:#e5e7eb;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid ${c}">${t}</td>
  </tr>`}async function T(e){let t=e.items.map(e=>{let t=(parseFloat(String(e.price).replace(/[^0-9.]/g,""))*e.qty).toLocaleString("en-ZA"),i=e.imageUrl?`<img src="${e.imageUrl.startsWith("http")?e.imageUrl:m+e.imageUrl}" alt="${e.name}" width="56" height="56" style="width:56px;height:56px;object-fit:cover;border-radius:8px;display:block;border:1px solid ${c}" />`:`<div style="width:56px;height:56px;background:${d};border:1px solid ${c};border-radius:8px"></div>`;return`
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${c};width:68px;vertical-align:middle">${i}</td>
      <td style="padding:12px 12px;border-bottom:1px solid ${c};vertical-align:middle">
        <p style="margin:0 0 4px;color:#e5e7eb;font-size:14px;font-weight:600">${e.name}</p>
        <p style="margin:0;color:${l};font-size:12px">Qty: ${e.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${c};text-align:right;vertical-align:middle">
        <span style="color:${n};font-size:14px;font-weight:700">R ${t}</span>
      </td>
    </tr>`}).join(""),i=f(`
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:48px;line-height:1;margin-bottom:12px">🎊</div>
      <h1 style="margin:0 0 8px;color:#f9fafb;font-size:26px;font-weight:900">Thank you for your purchase!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${e.name.split(" ")[0]}, your payment has been verified and your order is confirmed.</p>
    </div>

    <!-- Ref pill -->
    <div style="background:${d};border:1px solid ${n}44;border-radius:10px;padding:14px 20px;margin-bottom:28px;display:flex;align-items:center">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="color:${l};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Order Reference</td>
        <td style="text-align:right;color:${n};font-size:18px;font-weight:900;letter-spacing:0.08em;font-family:monospace">${e.ref}</td>
      </tr></table>
    </div>

    <!-- Items -->
    <p style="margin:0 0 12px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Order Summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px">
      ${t}
    </table>

    <!-- Totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 28px">
      <tr>
        <td style="padding:6px 0;color:${l};font-size:13px">Subtotal</td>
        <td style="padding:6px 0;text-align:right;color:#d1d5db;font-size:13px">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:${l};font-size:13px">Shipping</td>
        <td style="padding:6px 0;text-align:right;color:#22c55e;font-size:13px;font-weight:700">Free</td>
      </tr>
      <tr>
        <td style="padding:10px 0 0;color:#e5e7eb;font-size:16px;font-weight:800;border-top:1px solid ${c}">Total</td>
        <td style="padding:10px 0 0;text-align:right;color:${n};font-size:20px;font-weight:900;border-top:1px solid ${c}">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${y()}

    <!-- Customer info grid -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Customer Information</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
      <tr>
        <td width="50%" style="padding:0 8px 0 0;vertical-align:top">
          <div style="background:${d};border:1px solid ${c};border-radius:10px;padding:16px 18px;margin-bottom:12px">
            <p style="margin:0 0 6px;color:${l};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Address</p>
            <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${e.name}<br>${e.address||"—"}</p>
          </div>
          <div style="background:${d};border:1px solid ${c};border-radius:10px;padding:16px 18px">
            <p style="margin:0 0 6px;color:${l};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Billing Address</p>
            <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${e.name}<br>${e.address||"—"}</p>
          </div>
        </td>
        <td width="50%" style="padding:0 0 0 8px;vertical-align:top">
          <div style="background:${d};border:1px solid ${c};border-radius:10px;padding:16px 18px;margin-bottom:12px">
            <p style="margin:0 0 6px;color:${l};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Method</p>
            <p style="margin:0;color:#d1d5db;font-size:13px">📦 Standard Delivery<br><span style="color:${l};font-size:12px">2–5 business days</span></p>
          </div>
          <div style="background:${d};border:1px solid ${c};border-radius:10px;padding:16px 18px">
            <p style="margin:0 0 6px;color:${l};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Payment Method</p>
            <p style="margin:0;color:#d1d5db;font-size:13px">🏦 EFT Bank Transfer<br><span style="color:#22c55e;font-size:12px;font-weight:700">✔ Payment Verified</span></p>
          </div>
        </td>
      </tr>
    </table>

    <div style="text-align:center">
      ${x("💬 Chat on WhatsApp",`https://wa.me/${g}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff")}
    </div>
  `);await h({to:e.email,subject:`Order Confirmed ✨ — ${e.ref} | Daisy Gadgets Co.`,html:i})}async function S(e){let t=f(`
    ${u("Payment Received")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">✅ We got your proof!</h1>
    <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.6">
      Hi ${e.name.split(" ")[0]}, we received your proof of payment for order <strong style="color:${n}">${e.ref}</strong>.
    </p>

    <div style="background:${d};border:1px solid #22c55e44;border-left:3px solid #22c55e;border-radius:0 12px 12px 0;padding:18px 20px;margin-bottom:28px">
      <p style="margin:0;color:#86efac;font-size:14px;line-height:1.7">
        Your proof is under review. We will verify and confirm your order within <strong>24 hours</strong>. You will receive another email as soon as it is approved.
      </p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Need help or want to check in?</p>
    ${x("Chat on WhatsApp",`https://wa.me/${g}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff")}
  `);await h({to:e.email,subject:`Payment Proof Received — ${e.ref} | Daisy Gadgets Co.`,html:t})}async function $(e){let t=e.items.map(e=>{let t=(parseFloat(String(e.price).replace(/[^0-9.]/g,""))*e.qty).toLocaleString("en-ZA");return`<tr>
      <td style="padding:8px 0;color:#d1d5db;font-size:13px;border-bottom:1px solid ${c}">${e.name} \xd7 ${e.qty}</td>
      <td style="padding:8px 0;text-align:right;color:${n};font-size:13px;font-weight:700;border-bottom:1px solid ${c}">R ${t}</td>
    </tr>`}).join(""),i=e.reason?`<div style="background:${d};border-left:3px solid #ef4444;border-radius:0 10px 10px 0;padding:14px 18px;margin:20px 0">
        <p style="margin:0 0 4px;color:#ef4444;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Reason from our team</p>
        <p style="margin:0;color:#fca5a5;font-size:14px;line-height:1.6">${e.reason}</p>
       </div>`:"",r=f(`
    <div style="text-align:center;margin-bottom:24px">
      <div style="font-size:44px;line-height:1;margin-bottom:12px">🔔</div>
      <div style="display:inline-block;background:#ef444422;color:#ef4444;border:1px solid #ef444455;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.05em;margin-bottom:12px">Action Required</div>
      <h1 style="margin:0 0 8px;color:#f9fafb;font-size:24px;font-weight:900">Payment could not be verified</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${e.name.split(" ")[0]}, we were unable to verify your proof of payment for order <strong style="color:${n}">${e.ref}</strong>.</p>
    </div>

    ${i}

    <p style="margin:0 0 14px;color:#9ca3af;font-size:14px;line-height:1.7">
      Don&apos;t worry — this happens sometimes. Please make a new payment using the details below and re-upload a clear screenshot or photo of your confirmation.
    </p>

    ${y()}

    <!-- Bank details -->
    <p style="margin:0 0 12px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Payment Details (EFT)</p>
    <div style="background:${d};border:1px solid ${c};border-radius:12px;padding:4px 20px;margin-bottom:24px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${b("Bank","FNB / RMB")}
        ${b("Account Holder","Daisy Gadgets Co.")}
        ${b("Account Type","Business Current")}
        ${b("Account Number",`<span style="font-family:monospace;font-size:15px;color:${n};letter-spacing:0.06em">63211629332</span>`)}
        ${b("Branch Code","250655")}
        ${b("PayShap","+27848961782@FNB")}
        ${b("Reference",`<strong style="color:${n};font-size:15px;font-family:monospace">${e.ref}</strong>`)}
        ${b("Amount",`<strong style="color:${n};font-size:15px">R ${e.total.toLocaleString("en-ZA")}</strong>`)}
      </table>
    </div>

    <!-- Order summary -->
    <p style="margin:0 0 12px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Your Order</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
      ${t}
      <tr>
        <td style="padding:10px 0 0;color:#e5e7eb;font-size:14px;font-weight:700">Total Due</td>
        <td style="padding:10px 0 0;text-align:right;color:${n};font-size:18px;font-weight:900">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${y()}

    <p style="margin:0 0 20px;color:#9ca3af;font-size:14px">Once you have made the payment, upload your new proof of payment below — or send it directly on WhatsApp.</p>
    <div>
      ${x("📤 Upload New Proof",`${m}/checkout`,n,p)}
      &nbsp;&nbsp;
      ${x("💬 Send via WhatsApp",`https://wa.me/${g}?text=Hi%2C%20re-sending%20proof%20for%20order%20${e.ref}`,"#25D366","#fff")}
    </div>
  `);await h({to:e.email,subject:`⚠️ Action Required — ${e.ref} | Daisy Gadgets Co.`,html:r})}let E={approved:{pill:["Payment Approved","#22c55e"],icon:"🎊",title:"Your payment is confirmed!",body:"Great news — your payment has been verified and your order is now being packed and prepared for dispatch. We will notify you as soon as it ships.",cta:["💬 Chat on WhatsApp",`https://wa.me/${g}`]},shipped:{pill:["Shipped","#3b82f6"],icon:"📦",title:"Your order is on its way!",body:"Your order has been handed over to the courier and is heading your way. Delivery typically takes 2–5 business days within South Africa.",cta:["💬 Track via WhatsApp",`https://wa.me/${g}`]},delivered:{pill:["Delivered",n],icon:"🎁",title:"Your order has been delivered!",body:"We hope you love your new purchase! If you have any issues at all, please reach out immediately and we will make it right.",cta:["⭐ Leave a Review",`${m}/reviews`]}};async function w(e){let t=E[e.status];if(!t)return;let i=e.notes?`<div style="background:${d};border-left:3px solid ${n};border-radius:0 10px 10px 0;padding:14px 18px;margin:20px 0">
        <p style="margin:0 0 4px;color:${l};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Note from our team</p>
        <p style="margin:0;color:#d1d5db;font-size:14px;font-style:italic;line-height:1.6">"${e.notes}"</p>
       </div>`:"",r={approved:`Payment Approved — ${e.ref} | Daisy Gadgets Co.`,rejected:`Action Required — ${e.ref} | Daisy Gadgets Co.`,shipped:`Your Order Has Shipped — ${e.ref} | Daisy Gadgets Co.`,delivered:`Order Delivered — ${e.ref} | Daisy Gadgets Co.`},o=f(`
    <div style="margin-bottom:16px">${function(e,t){return`<span style="display:inline-block;background:${t}22;color:${t};border:1px solid ${t}55;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.05em">${e}</span>`}(...t.pill)}</div>
    <div style="font-size:36px;margin-bottom:12px;line-height:1">${t.icon}</div>
    <h1 style="margin:0 0 6px;color:#f9fafb;font-size:26px;font-weight:900">${t.title}</h1>
    <p style="margin:0 0 4px;color:${l};font-size:13px">Order: <strong style="color:${n}">${e.ref}</strong></p>
    ${y()}
    <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7">Hi ${e.name.split(" ")[0]}, ${t.body}</p>
    ${i}
    ${t.cta?`<div style="margin-top:24px">${x(t.cta[0],t.cta[1])}&nbsp;&nbsp;${x("WhatsApp Us",`https://wa.me/${g}?text=Hi%2C%20re%20order%20${e.ref}`,"#25D366","#fff")}</div>`:""}
  `);await h({to:e.email,subject:r[e.status]??`Order Update — ${e.ref}`,html:o})}async function L(e){let t=f(`
    ${u("Your Quote is Ready")}
    <h1 style="margin:6px 0 6px;color:#f9fafb;font-size:28px;font-weight:900">Hi ${e.name.split(" ")[0]}, here is your quote</h1>
    <p style="margin:0 0 28px;color:${l};font-size:13px">Reference: <strong style="color:#e5e7eb">${e.ref}</strong></p>

    <!-- Package card -->
    <div style="background:${d};border:1px solid ${n}44;border-radius:14px;padding:28px;margin-bottom:24px;text-align:center">
      ${u("Recommended Package")}
      <p style="margin:8px 0 20px;color:#f9fafb;font-size:22px;font-weight:900">${e.package}</p>
      <div style="height:1px;background:${c};margin:0 0 20px"></div>
      ${u("Estimated Price")}
      <p style="margin:8px 0 0;color:${n};font-size:34px;font-weight:900;letter-spacing:0.02em">${e.price}</p>
    </div>

    ${e.message?`
    <p style="margin:0 0 10px;color:#e5e7eb;font-size:15px;font-weight:700">Message from our team</p>
    <div style="background:${d};border:1px solid ${c};border-left:3px solid ${n};border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:28px">
      <p style="margin:0;color:#d1d5db;font-size:14px;line-height:1.8">${e.message.replace(/\n/g,"<br>")}</p>
    </div>`:""}

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Ready to proceed or have questions?</p>
    ${x("Accept Quote",`https://wa.me/${g}?text=Hi%2C%20I%20accept%20quote%20${e.ref}`,n,p)}
    &nbsp;&nbsp;
    ${x("Ask a Question",`https://wa.me/${g}?text=Hi%2C%20question%20about%20quote%20${e.ref}`,"#25D366","#fff")}
  `);await h({to:e.email,subject:`Your Quote — ${e.ref} | Daisy Gadgets Co.`,html:t})}async function A(e){let t=f(`
    ${u("Welcome to the family")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">
      ✨ You are in${e.name?`, ${e.name.split(" ")[0]}`:""}!
    </h1>
    <p style="margin:0 0 28px;color:#9ca3af;font-size:15px;line-height:1.6">Thank you for joining the Daisy Gadgets Co. family. Here is your exclusive first-order discount code:</p>

    <!-- Code card -->
    <div style="background:${p};border:1px solid ${n}55;border-radius:14px;padding:32px;text-align:center;margin-bottom:28px">
      ${u("Your Exclusive Discount Code")}
      <p style="margin:12px 0;color:${n};font-size:40px;font-weight:900;letter-spacing:0.15em;font-family:monospace">DAISY25</p>
      <div style="height:1px;background:${c};margin:16px 0"></div>
      <p style="margin:0;color:${l};font-size:13px;line-height:1.6">💎 25% off your first order — mention this code on WhatsApp<br>when placing your order. Valid for all products.</p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Browse our full range of gadgets, appliances, solar solutions and more:</p>
    ${x("🛍️ Shop Now",`${m}/shop`)}
    &nbsp;&nbsp;
    ${x("💬 Claim via WhatsApp",`https://wa.me/${g}?text=Hi%2C%20I%20have%20the%20discount%20code%20DAISY25`,"#25D366","#fff")}
  `);await h({to:e.email,subject:"✨ Your 25% Discount Code — Daisy Gadgets Co.",html:t})}e.s(["sendMail",0,h,"sendOrderConfirmation",0,T,"sendProofAcknowledgement",0,S,"sendQuoteReply",0,L,"sendRejectionEmail",0,$,"sendStatusUpdate",0,w,"sendWelcomeEmail",0,A])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1vg8s61._.js.map