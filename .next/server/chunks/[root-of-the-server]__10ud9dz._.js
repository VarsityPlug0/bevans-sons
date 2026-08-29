module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},84423,(e,t,r)=>{t.exports=e.x("nodemailer-9c35dd349a8aaa9f",()=>require("nodemailer-9c35dd349a8aaa9f"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},13366,e=>{"use strict";var t=e.i(89171),r=e.i(68105),a=e.i(62294),s=e.i(69722),n=e.i(67010),i=e.i(72507),o=e.i(54799);async function T(e){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{subject:T,heading:E,body:d,ctaText:c,ctaUrl:u,recipients:l,customEmail:p,includeOrderItems:N,cartItems:L}=await e.json();if(!T||!E||!d)return t.NextResponse.json({error:"subject, heading and body are required"},{status:400});let m=[],A=(0,a.getDb)();if("custom"===l){if(!p||!p.includes("@"))return t.NextResponse.json({error:"Valid email required for custom recipient"},{status:400});let e=A.prepare("SELECT name FROM orders WHERE email = ? ORDER BY createdAt DESC LIMIT 1").get(p.toLowerCase());m=[{email:p,name:e?.name??"there"}]}else{let e=(0,s.listOrders)(),t=new Set;for(let r of e){let e=r.email.toLowerCase();t.has(e)||("pending"!==l||"pending"===r.status||"proof_submitted"===r.status)&&(t.add(e),m.push({email:r.email,name:r.name}))}}if(0===m.length)return t.NextResponse.json({error:"No recipients found"},{status:400});let O=A.prepare("SELECT items, ref, createdAt FROM orders WHERE email = ? ORDER BY createdAt DESC LIMIT 1"),R=0;for(let e of m)try{let t,r;if(L?.length){t=L;let e=Buffer.from(JSON.stringify(t)).toString("base64");r=`${i.BRAND.domain}/restore-cart?items=${e}`}else if(N){let a=O.get(e.email.toLowerCase());if(a){t=JSON.parse(a.items);let e=Buffer.from(JSON.stringify(t)).toString("base64");r=`${i.BRAND.domain}/restore-cart?items=${e}`}}await (0,n.sendCampaignEmail)({to:e.email,name:e.name,subject:T,heading:E,body:d,ctaText:c||void 0,ctaUrl:u||void 0,orderItems:t,restoreCartUrl:r}),R++}catch{}return A.prepare(`
    INSERT INTO email_campaigns (id, subject, heading, body, cta_text, cta_url, recipients, sent_to, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'sent', ?)
  `).run((0,o.randomUUID)(),T,E,d,c||null,u||null,l,R,new Date().toISOString()),t.NextResponse.json({ok:!0,sent:R,total:m.length})}e.s(["POST",0,T])},22689,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),s=e.i(59756),n=e.i(61916),i=e.i(74677),o=e.i(69741),T=e.i(16795),E=e.i(87718),d=e.i(95169),c=e.i(47587),u=e.i(66012),l=e.i(70101),p=e.i(26937),N=e.i(10372),L=e.i(93695);e.i(52474);var m=e.i(220);let A=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/admin/send-campaign/route",pathname:"/api/admin/send-campaign",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/admin/send-campaign/route.ts",nextConfigOutput:"",userland:()=>e.r(13366),...{}}),{workAsyncStorage:O,workUnitAsyncStorage:R,serverHooks:U}=A;async function _(e,t,a){a.requestMeta&&(0,s.setRequestMeta)(e,a.requestMeta),A.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let O="/api/admin/send-campaign/route";O=O.replace(/\/index$/,"")||"/";let R=await A.prepare(e,t,{srcPage:O,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:U,deploymentId:_,params:X,nextConfig:g,parsedUrl:h,isDraftMode:f,prerenderManifest:I,routerServerContext:S,isOnDemandRevalidate:v,revalidateOnlyGenerated:x,resolvedPathname:C,clientReferenceManifest:D,serverActionsManifest:b}=R,y=(0,o.normalizeAppPath)(O),F=!!(I.dynamicRoutes[y]||I.routes[C]),w=async()=>((null==S?void 0:S.render404)?await S.render404(e,t,h,!1):t.end("This page could not be found"),null);if(F&&!f){let e=!!I.routes[C],t=I.dynamicRoutes[y];if(t&&!1===t.fallback&&!e){if(g.adapterPath)return await w();throw new L.NoFallbackError}}let M=null;!F||A.isDev||f||(M="/index"===(M=C)?"/":M);let k=!0===A.isDev||!F,B=F&&!k;b&&D&&(0,i.setManifestsSingleton)({page:O,clientReferenceManifest:D,serverActionsManifest:b});let P=e.method||"GET",q=(0,n.getTracer)(),Y=q.getActiveScopeSpan(),j=!!(null==S?void 0:S.isWrappedByNextServer),K=!!(0,s.getRequestMeta)(e,"minimalMode"),H=(0,s.getRequestMeta)(e,"incrementalCache")||await A.getIncrementalCache(e,g,I,K);null==H||H.resetRequestCache(),globalThis.__incrementalCache=H;let G={params:X,previewProps:I.preview,renderOpts:{experimental:{authInterrupts:!!g.experimental.authInterrupts,useCacheTimeout:g.experimental.useCacheTimeout},cacheComponents:!!g.cacheComponents,validationLevel:g.experimental.instantInsights.validationLevel,supportsDynamicResponse:k,incrementalCache:H,hmrRefreshHash:(0,s.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:g.cacheLife,staticPageGenerationTimeout:g.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,s)=>A.onRequestError(e,t,a,s,S)},sharedContext:{buildId:U,deploymentId:_}},W=new T.NodeNextRequest(e),$=new T.NodeNextResponse(t),J=E.NextRequestAdapter.fromNodeNextRequest(W,(0,E.signalFromNodeResponse)(t)),V=async({previousCacheEntry:r})=>{try{if(!K&&v&&x&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await A.handle(J,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let n=G.renderOpts.pendingWaitUntil;n&&a.waitUntil&&(a.waitUntil(n),n=void 0);let i=G.renderOpts.collectedTags;if(!F)return await (0,u.sendResponse)(W,$,s,n),null;{let e=await s.blob(),t=(0,l.toNodeOutgoingHttpHeaders)(s.headers);i&&(t[N.NEXT_CACHE_TAGS_HEADER]=i),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=N.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=N.INFINITE_CACHE?!1!==r&&r>0?g.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await A.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:B,isOnDemandRevalidate:v})},!1,S),t}},Q=async(s,i)=>{try{var o,T;let s=await A.handleResponse({req:e,nextConfig:g,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:I,isRoutePPREnabled:!1,isOnDemandRevalidate:v,revalidateOnlyGenerated:x,responseGenerator:V,waitUntil:a.waitUntil,isMinimalMode:K});if(!F)return;if((null==s||null==(o=s.value)?void 0:o.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==s||null==(T=s.value)?void 0:T.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",v?"REVALIDATED":s.isMiss?"MISS":s.isStale?"STALE":"HIT"),f&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let n=(0,l.fromNodeOutgoingHttpHeaders)(s.value.headers);K&&F||n.delete(N.NEXT_CACHE_TAGS_HEADER),!s.cacheControl||t.getHeader("Cache-Control")||n.get("Cache-Control")||n.set("Cache-Control",(0,p.getCacheControlHeader)(s.cacheControl)),await (0,u.sendResponse)(W,$,new Response(s.value.body,{headers:n,status:s.value.status||200}));return}catch(t){if(t instanceof L.NoFallbackError||await A.onRequestError(e,t,{routerKind:"App Router",routePath:y,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:B,isOnDemandRevalidate:v})},!1,S),F)throw t;await (0,u.sendResponse)(W,$,new Response(null,{status:500}));return}finally{(()=>{if(!s)return;let e=t.statusCode;s.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(s.setStatus({code:n.SpanStatusCode.ERROR}),s.setAttribute("error.type",e.toString()));let r=q.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||y,o=`${P} ${a}`;s.setAttributes({"next.route":a,"http.route":a,"next.span_name":o}),s.updateName(o),i&&i!==s&&(i.setAttribute("http.route",a),i.updateName(o))})()}};if(j&&Y)await Q(Y,void 0);else{let t=q.getActiveScopeSpan();await q.withPropagatedContext(e.headers,()=>q.trace(d.BaseServerSpan.handleRequest,{spanName:`${P} ${O}`,kind:n.SpanKind.SERVER,attributes:{"http.method":P,"http.target":e.url}},e=>Q(e,t)),void 0,!j)}}e.s(["handler",0,_,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:O,workUnitAsyncStorage:R})},"routeModule",0,A,"serverHooks",0,U,"workAsyncStorage",0,O,"workUnitAsyncStorage",0,R])},72507,e=>{"use strict";let t={name:"Bevans Sons",tagline:"Premium Clothing. Crafted for the Bold.",domain:"https://bevans-sons.onrender.com",whatsapp:"27724816274",phone:"0724816274",email:"MkhabeleEnterprise@gmail.com",currency:"ZAR",currencySymbol:"R",locale:"en-ZA",social:{instagram:process.env.NEXT_PUBLIC_INSTAGRAM??"",facebook:process.env.NEXT_PUBLIC_FACEBOOK??"",tiktok:process.env.NEXT_PUBLIC_TIKTOK??""},shipping:{freeThreshold:1500,standardDays:"3-5 business days",expressDays:"1-2 business days"}};e.s(["BRAND",0,t,"getAdminEmails",0,function(){return[process.env.ADMIN_EMAIL??"",process.env.ADMIN_EMAIL_2??""].filter(Boolean).join(", ")},"getBankConfig",0,function(){return{bank:process.env.BANK_NAME??"",accountHolder:process.env.BANK_ACCOUNT_HOLDER??"",accountType:process.env.BANK_ACCOUNT_TYPE??"Business Account",accountNumber:process.env.BANK_ACCOUNT_NUMBER??"",branchCode:process.env.BANK_BRANCH_CODE??""}},"parsePrice",0,function(e){return null==e?0:"number"==typeof e?e:parseFloat(String(e).replace(/[^0-9.]/g,""))||0}])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let s=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),n=r.default.join(s,"bevans.db"),i=null;function o(){var e;let r;return i||((0,a.existsSync)(s)||(0,a.mkdirSync)(s,{recursive:!0}),(i=new t.default(n)).pragma("journal_mode = WAL"),i.pragma("foreign_keys = ON"),(e=i).exec(`
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
  `),(r=t=>{try{e.exec(t)}catch{}})("ALTER TABLE orders ADD COLUMN bank_id TEXT"),r("ALTER TABLE orders ADD COLUMN tracking_number TEXT"),r("ALTER TABLE installment_applications ADD COLUMN product_imageUrl TEXT"),function(e){let t=t=>!!e.prepare("SELECT name FROM migrations WHERE name = ?").get(t),r=t=>e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run(t),a=t=>{try{e.exec(t)}catch{}};if(t("add_bevans_product_columns_v1")||(a("ALTER TABLE products ADD COLUMN slug TEXT NOT NULL DEFAULT ''"),a("ALTER TABLE products ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex'"),a("ALTER TABLE products ADD COLUMN material TEXT NOT NULL DEFAULT ''"),a("ALTER TABLE products ADD COLUMN fit TEXT NOT NULL DEFAULT ''"),a("ALTER TABLE products ADD COLUMN newArrival INTEGER NOT NULL DEFAULT 0"),r("add_bevans_product_columns_v1")),t("create_product_variants_v1")||(e.exec(`
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
    `),r("create_product_variants_v1")),t("create_product_images_v1")||(e.exec(`
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
    `),r("create_product_images_v1")),!t("drop_solar_quotes_v1"))if(e.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='quotes'").get()){let t=e.prepare("SELECT COUNT(*) as c FROM quotes").get().c;t>0?console.warn(`[bevans] quotes table has ${t} row(s) — skipping drop. Manual review needed.`):(e.exec("DROP TABLE IF EXISTS quotes"),r("drop_solar_quotes_v1"))}else r("drop_solar_quotes_v1");if(t("seed_bevans_products_v1")||r("seed_bevans_products_v1"),!t("create_categories_v1")){e.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id        TEXT PRIMARY KEY,
        name      TEXT UNIQUE NOT NULL,
        gender    TEXT NOT NULL DEFAULT 'Unisex',
        position  INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL
      );
    `);let t=new Date().toISOString(),a=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),s=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,r,n,i]of s)a.run(e,r,n,i,t)})(),r("create_categories_v1")}}(i)),i}e.s(["exportProductsJson",0,function(e){try{let t=(e??o()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,a.existsSync)(s)||(0,a.mkdirSync)(s,{recursive:!0}),(0,a.writeFileSync)(r.default.join(s,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,o])},69722,e=>{"use strict";var t=e.i(62294),r=e.i(54799);function a(e){let r=(0,t.getDb)().prepare("SELECT * FROM orders WHERE id = ? OR ref = ?").get(e,e);return r?s(r):null}function s(e){return{...e,items:JSON.parse(e.items)}}e.s(["createOrder",0,function(e){let s=(0,t.getDb)(),n=new Date().toISOString(),i=(0,r.randomBytes)(8).toString("hex"),o="BS-"+(0,r.randomBytes)(3).toString("hex").toUpperCase();return s.prepare(`
    INSERT INTO orders (id, ref, name, email, phone, address, items, total, status, payment_method, eft_reference, bank_id, createdAt, updatedAt)
    VALUES (@id, @ref, @name, @email, @phone, @address, @items, @total, 'pending', 'eft', @eft_reference, @bank_id, @now, @now)
  `).run({id:i,ref:o,name:e.name,email:e.email,phone:e.phone,address:e.address,items:JSON.stringify(e.items),total:e.total,eft_reference:e.eft_reference??null,bank_id:e.bank_id??null,now:n}),a(i)},"generateTrackingNumber",0,function(){let e=(0,t.getDb)(),r=new Date().toISOString().slice(0,10).replace(/-/g,""),a=`BS-${r}-`,s=e.prepare("SELECT COUNT(*) as n FROM orders WHERE tracking_number LIKE ?").get(`${a}%`);return`${a}${String((s?.n??0)+1).padStart(4,"0")}`},"getOrder",0,a,"listOrders",0,function(){return(0,t.getDb)().prepare("SELECT * FROM orders ORDER BY createdAt DESC").all().map(s)},"updateOrder",0,function(e,r){let s=(0,t.getDb)(),n=[],i={id:e,now:new Date().toISOString()};return void 0!==r.status&&(n.push("status = @status"),i.status=r.status),void 0!==r.proof_url&&(n.push("proof_url = @proof_url"),i.proof_url=r.proof_url),void 0!==r.notes&&(n.push("notes = @notes"),i.notes=r.notes),void 0!==r.eft_reference&&(n.push("eft_reference = @eft_reference"),i.eft_reference=r.eft_reference),void 0!==r.tracking_number&&(n.push("tracking_number = @tracking_number"),i.tracking_number=r.tracking_number),n.length&&(n.push("updatedAt = @now"),s.prepare(`UPDATE orders SET ${n.join(", ")} WHERE id = @id`).run(i)),a(e)}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__10ud9dz._.js.map