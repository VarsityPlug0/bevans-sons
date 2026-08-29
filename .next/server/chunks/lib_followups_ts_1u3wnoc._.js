module.exports=[94689,e=>{"use strict";var t=e.i(54799),T=e.i(85148),r=e.i(14747),a=e.i(22734);let s=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),o=r.default.join(s,"bevans.db"),n=null;var i=e.i(84423);let E={name:"Bevans Sons",tagline:"Premium Clothing. Crafted for the Bold.",domain:"https://bevans-sons.onrender.com",whatsapp:"27724816274",phone:"0724816274",email:"MkhabeleEnterprise@gmail.com",currency:"ZAR",currencySymbol:"R",locale:"en-ZA",social:{instagram:process.env.NEXT_PUBLIC_INSTAGRAM??"",facebook:process.env.NEXT_PUBLIC_FACEBOOK??"",tiktok:process.env.NEXT_PUBLIC_TIKTOK??""},shipping:{freeThreshold:1500,standardDays:"3-5 business days",expressDays:"1-2 business days"}},d=r.default.join(process.cwd(),"public","logo.jpg"),L="logo@bevanssons",l="#FFFFFF",c="#0A0A0A",N="#1F1F1F",p="#6b7280",m=E.whatsapp,A=E.domain,U=E.name;async function O(e){let t=process.env.RESEND_API_KEY?i.default.createTransport({host:"smtp.resend.com",port:587,secure:!1,auth:{user:"resend",pass:process.env.RESEND_API_KEY}}):process.env.MAIL_USER&&process.env.MAIL_PASS?i.default.createTransport({service:"gmail",auth:{user:process.env.MAIL_USER,pass:process.env.MAIL_PASS}}):null;if(!t)return void console.error("mailer: env vars missing");try{let T,r=e.attachments??[];(0,a.existsSync)(d)&&r.unshift({filename:"logo.jpg",path:d,cid:L}),await t.sendMail({from:(T=new URL(A).hostname,process.env.RESEND_API_KEY?`"${U}" <noreply@${T}>`:`"${U}" <${process.env.MAIL_USER??`noreply@${T}`}>`),to:e.to,subject:e.subject,html:e.html,attachments:r})}catch(e){console.error("mailer send error:",e)}}async function u(e){var t;let T=e.orderItems?.length?'<p style="margin:0 0 12px;color:#e5e7eb;font-size:14px;font-weight:700">Your Items</p>'+e.orderItems.map(e=>`<div style="background:#161616;border:1px solid ${N};border-radius:10px;padding:12px 16px;margin-bottom:8px;display:flex;align-items:center">
          <p style="margin:0;color:#e5e7eb;font-size:14px;font-weight:600">${e.name} <span style="color:${p};font-weight:400">\xd7 ${e.qty}</span></p>
        </div>`).join(""):"",r=e.trackingId?`<img src="${A}/api/track/${e.trackingId}" width="1" height="1" style="display:none" alt="" />`:"",a=(t=`
    <h1 style="margin:0 0 8px;color:#f9fafb;font-size:24px;font-weight:900">${e.heading}</h1>
    <div style="height:1px;background:${N};margin:24px 0"></div>
    ${e.body.split("\n\n").map(e=>`<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${e}</p>`).join("")}
    ${T}
    <div style="margin-top:24px">${function(e,t,T=l,r=c){return`<a href="${t}" style="display:inline-block;background:${T};color:${r};font-weight:800;text-decoration:none;padding:13px 26px;border-radius:10px;font-size:14px;letter-spacing:0.02em">${e}</a>`}(e.ctaText,e.ctaUrl,l,c)}</div>
    ${r}
  `,`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${U}</title>
</head>
<body style="margin:0;padding:0;background:${c};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${c};padding:28px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid ${N}">

        <!-- Top border -->
        <tr><td style="background:${l};height:2px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Header -->
        <tr>
          <td style="background:${c};padding:24px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="cid:${L}" alt="${U}" height="44" style="height:44px;width:auto;display:block;border:0" />
                </td>
                <td align="right">
                  <a href="${A}" style="color:${p};font-size:12px;text-decoration:none">${new URL(A).hostname}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#111111;padding:36px 36px 32px;border-top:1px solid ${N}">
            ${t}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${c};padding:24px 36px;border-top:1px solid ${N}">
            <p style="margin:0 0 8px;color:${p};font-size:12px;text-align:center">
              Questions? &nbsp;
              ${m?`<a href="https://wa.me/${m}" style="color:${l};text-decoration:none;font-weight:600">WhatsApp</a> &nbsp;\xb7&nbsp;`:""}
              <a href="${A}" style="color:${l};text-decoration:none;font-weight:600">${new URL(A).hostname}</a>
            </p>
            <p style="margin:0;color:#333;font-size:11px;text-align:center">
              \xa9 ${new Date().getFullYear()} ${U}. All rights reserved.
            </p>
          </td>
        </tr>

        <!-- Bottom border -->
        <tr><td style="background:${l};height:1px;font-size:0;line-height:0">&nbsp;</td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`);await O({to:e.to,subject:e.subject,html:a})}let X=E.domain;function R(e,t,T,r){if(r)return!!e.prepare("SELECT id FROM email_sends WHERE LOWER(email) = ? AND type = ? AND ref = ?").get(t.toLowerCase(),T,r);let a=new Date(Date.now()-3024e6).toISOString();return!!e.prepare("SELECT id FROM email_sends WHERE LOWER(email) = ? AND type = ? AND createdAt > ?").get(t.toLowerCase(),T,a)}function g(e,t){e.prepare(`
    INSERT OR IGNORE INTO email_sends (id, email, type, ref, subject, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(t.id,t.email.toLowerCase(),t.type,t.ref??null,t.subject,new Date().toISOString())}async function I(){var e;let r,i=(n||((0,a.existsSync)(s)||(0,a.mkdirSync)(s,{recursive:!0}),(n=new T.default(o)).pragma("journal_mode = WAL"),n.pragma("foreign_keys = ON"),(e=n).exec(`
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
  `),(r=t=>{try{e.exec(t)}catch{}})("ALTER TABLE orders ADD COLUMN bank_id TEXT"),r("ALTER TABLE orders ADD COLUMN tracking_number TEXT"),r("ALTER TABLE installment_applications ADD COLUMN product_imageUrl TEXT"),function(e){let t=t=>!!e.prepare("SELECT name FROM migrations WHERE name = ?").get(t),T=t=>e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run(t),r=t=>{try{e.exec(t)}catch{}};if(t("add_bevans_product_columns_v1")||(r("ALTER TABLE products ADD COLUMN slug TEXT NOT NULL DEFAULT ''"),r("ALTER TABLE products ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex'"),r("ALTER TABLE products ADD COLUMN material TEXT NOT NULL DEFAULT ''"),r("ALTER TABLE products ADD COLUMN fit TEXT NOT NULL DEFAULT ''"),r("ALTER TABLE products ADD COLUMN newArrival INTEGER NOT NULL DEFAULT 0"),T("add_bevans_product_columns_v1")),t("create_product_variants_v1")||(e.exec(`
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
    `);let t=new Date().toISOString(),r=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),a=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,T,s,o]of a)r.run(e,T,s,o,t)})(),T("create_categories_v1")}}(n)),n),d=0,L=0;for(let e of i.prepare(`
    WITH cart_summary AS (
      SELECT v.email, v.name, MAX(ce.createdAt) AS lastAdded
      FROM cart_events ce
      JOIN visitors v ON v.id = ce.visitorId
      WHERE v.email IS NOT NULL
        AND TRIM(v.email) != ''
        AND ce.createdAt < datetime('now', '-24 hours')
        AND ce.createdAt > datetime('now', '-72 hours')
      GROUP BY LOWER(v.email)
    )
    SELECT email, name, lastAdded
    FROM cart_summary cs
    WHERE NOT EXISTS (
      SELECT 1 FROM orders o
      WHERE LOWER(o.email) = LOWER(cs.email)
        AND o.createdAt > cs.lastAdded
    )
  `).all()){let T=e.lastAdded.slice(0,10);if(R(i,e.email,"cart_abandon_1d",T)){L++;continue}let r=i.prepare(`
      SELECT DISTINCT ce.productId AS id, ce.productName AS name, ce.price, 1 AS qty
      FROM cart_events ce
      JOIN visitors v ON v.id = ce.visitorId
      WHERE LOWER(v.email) = ?
      ORDER BY ce.createdAt DESC
      LIMIT 6
    `).all(e.email.toLowerCase()),a=(0,t.randomUUID)(),s=(e.name??"there").split(" ")[0],o=`${s}, you left something behind — ${E.name}`,n=Buffer.from(JSON.stringify(r)).toString("base64"),l=`${X}/restore-cart?items=${n}`;try{await u({to:e.email,name:e.name??"there",subject:o,heading:"Your cart is waiting for you",body:`Hi ${s},

You browsed some great pieces but didn't complete your order. Your items are still available — don't miss out!`,ctaText:"Complete Your Order",ctaUrl:l,orderItems:r,restoreCartUrl:l,trackingId:a}),g(i,{id:a,email:e.email,type:"cart_abandon_1d",ref:T,subject:o}),d++}catch(e){console.error("[followups] cart_abandon_1d error:",e)}}for(let e of i.prepare(`
    SELECT id, ref, email, name FROM orders
    WHERE status = 'delivered'
      AND updatedAt < datetime('now', '-3 days')
      AND updatedAt > datetime('now', '-14 days')
  `).all()){if(R(i,e.email,"delivery_followup",e.ref)){L++;continue}let T=(0,t.randomUUID)(),r=e.name.split(" ")[0],a=`How was your order, ${r}? — ${E.name}`;try{await u({to:e.email,name:e.name,subject:a,heading:"How was your experience?",body:`Hi ${r},

Your order ${e.ref} was delivered recently and we hope you're loving your new pieces!

We'd love to hear your feedback — it takes less than a minute and helps us serve you better.`,ctaText:"Leave a Review",ctaUrl:`${X}/reviews`,trackingId:T}),g(i,{id:T,email:e.email,type:"delivery_followup",ref:e.ref,subject:a}),d++}catch(e){console.error("[followups] delivery_followup error:",e)}}for(let e of i.prepare(`
    SELECT email, name, MAX(createdAt) AS lastOrder
    FROM orders
    WHERE status IN ('approved', 'shipped', 'delivered')
    GROUP BY LOWER(email)
    HAVING lastOrder < datetime('now', '-30 days')
      AND lastOrder > datetime('now', '-60 days')
  `).all()){if(R(i,e.email,"reengagement_30d")){L++;continue}let T=(0,t.randomUUID)(),r=e.name.split(" ")[0],a=`We miss you, ${r}! — ${E.name}`;try{await u({to:e.email,name:e.name,subject:a,heading:`We miss you, ${r}!`,body:`Hi ${r},

It's been a while since your last order and we wanted to check in.

We've dropped new styles and collections we think you'll love. Come see what's new!`,ctaText:"Shop New Arrivals",ctaUrl:`${X}/new-arrivals`,trackingId:T}),g(i,{id:T,email:e.email,type:"reengagement_30d",subject:a}),d++}catch(e){console.error("[followups] reengagement_30d error:",e)}}return console.log(`[followups] sent=${d} skipped=${L}`),{sent:d,skipped:L}}e.s(["runFollowUps",0,I],94689)}];

//# sourceMappingURL=lib_followups_ts_1u3wnoc._.js.map