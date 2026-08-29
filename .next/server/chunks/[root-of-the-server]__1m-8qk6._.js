module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},84423,(e,t,r)=>{t.exports=e.x("nodemailer-9c35dd349a8aaa9f",()=>require("nodemailer-9c35dd349a8aaa9f"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},67208,e=>{"use strict";var t=e.i(89171),r=e.i(62294),a=e.i(67010);async function s(e){let{visitorId:s,name:n,phone:T,email:i}=await e.json();if(!s||!T&&!i)return t.NextResponse.json({ok:!1},{status:400});let o=(0,r.getDb)(),d=new Date().toISOString();o.prepare(`
    INSERT INTO visitors (id, name, phone, email, createdAt)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name  = excluded.name,
      phone = excluded.phone,
      email = excluded.email
  `).run(String(s).slice(0,64),String(n??"").slice(0,200),String(T??"").slice(0,50),String(i??"").slice(0,200),d),o.prepare(`
    INSERT OR IGNORE INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(s,String(n??"").slice(0,200),String(i??"").slice(0,200),String(T??"").slice(0,50),"Lead captured via 20% off popup","General",d);let E=String(T??"").replace(/[^0-9]/g,"");return(0,a.sendMail)({to:"MkhabeleEnterprise@gmail.com, MkhabeleEnterprise@gmail.com",subject:`✨ New Lead — ${n||T||i}`,html:`
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#333">
        <div style="background:#0A0A0A;padding:20px 28px;border-radius:8px 8px 0 0">
          <h2 style="color:#D4AF37;margin:0;font-size:18px">New Lead Captured</h2>
          <p style="color:#888;margin:4px 0 0;font-size:12px">via 20% off popup</p>
        </div>
        <div style="background:#f9f9f9;padding:28px;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:7px 0;color:#666;width:100px;font-size:14px">Name</td><td style="padding:7px 0;font-weight:600;font-size:14px">${n||"—"}</td></tr>
            <tr><td style="padding:7px 0;color:#666;font-size:14px">Phone</td><td style="padding:7px 0;font-weight:600;font-size:14px">${T||"—"}</td></tr>
            <tr><td style="padding:7px 0;color:#666;font-size:14px">Email</td><td style="padding:7px 0;font-size:14px">${i||"—"}</td></tr>
          </table>
          ${E?`<div style="margin-top:20px"><a href="https://wa.me/${E}" style="display:inline-block;background:#25D366;color:#fff;font-weight:bold;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px">Message on WhatsApp</a></div>`:""}
        </div>
      </div>
    `}),i&&i.includes("@")&&(0,a.sendWelcomeEmail)({name:n??"",email:i}),t.NextResponse.json({ok:!0})}e.s(["POST",0,s])},44049,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),s=e.i(59756),n=e.i(61916),T=e.i(74677),i=e.i(69741),o=e.i(16795),d=e.i(87718),E=e.i(95169),c=e.i(47587),p=e.i(66012),l=e.i(70101),N=e.i(26937),L=e.i(10372),u=e.i(93695);e.i(52474);var A=e.i(220);let m=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/track/lead/route",pathname:"/api/track/lead",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/track/lead/route.ts",nextConfigOutput:"",userland:()=>e.r(67208),...{}}),{workAsyncStorage:U,workUnitAsyncStorage:O,serverHooks:R}=m;async function X(e,t,a){a.requestMeta&&(0,s.setRequestMeta)(e,a.requestMeta),m.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let U="/api/track/lead/route";U=U.replace(/\/index$/,"")||"/";let O=await m.prepare(e,t,{srcPage:U,multiZoneDraftMode:!1});if(!O)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:R,deploymentId:X,params:x,nextConfig:g,parsedUrl:_,isDraftMode:h,prerenderManifest:v,routerServerContext:I,isOnDemandRevalidate:S,revalidateOnlyGenerated:f,resolvedPathname:C,clientReferenceManifest:D,serverActionsManifest:y}=O,b=(0,i.normalizeAppPath)(U),F=!!(v.dynamicRoutes[b]||v.routes[C]),w=async()=>((null==I?void 0:I.render404)?await I.render404(e,t,_,!1):t.end("This page could not be found"),null);if(F&&!h){let e=!!v.routes[C],t=v.dynamicRoutes[b];if(t&&!1===t.fallback&&!e){if(g.adapterPath)return await w();throw new u.NoFallbackError}}let M=null;!F||m.isDev||h||(M="/index"===(M=C)?"/":M);let k=!0===m.isDev||!F,P=F&&!k;y&&D&&(0,T.setManifestsSingleton)({page:U,clientReferenceManifest:D,serverActionsManifest:y});let B=e.method||"GET",q=(0,n.getTracer)(),Y=q.getActiveScopeSpan(),j=!!(null==I?void 0:I.isWrappedByNextServer),K=!!(0,s.getRequestMeta)(e,"minimalMode"),H=(0,s.getRequestMeta)(e,"incrementalCache")||await m.getIncrementalCache(e,g,v,K);null==H||H.resetRequestCache(),globalThis.__incrementalCache=H;let G={params:x,previewProps:v.preview,renderOpts:{experimental:{authInterrupts:!!g.experimental.authInterrupts,useCacheTimeout:g.experimental.useCacheTimeout},cacheComponents:!!g.cacheComponents,validationLevel:g.experimental.instantInsights.validationLevel,supportsDynamicResponse:k,incrementalCache:H,hmrRefreshHash:(0,s.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:g.cacheLife,staticPageGenerationTimeout:g.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,s)=>m.onRequestError(e,t,a,s,I)},sharedContext:{buildId:R,deploymentId:X}},W=new o.NodeNextRequest(e),$=new o.NodeNextResponse(t),z=d.NextRequestAdapter.fromNodeNextRequest(W,(0,d.signalFromNodeResponse)(t)),V=async({previousCacheEntry:r})=>{try{if(!K&&S&&f&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await m.handle(z,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let n=G.renderOpts.pendingWaitUntil;n&&a.waitUntil&&(a.waitUntil(n),n=void 0);let T=G.renderOpts.collectedTags;if(!F)return await (0,p.sendResponse)(W,$,s,n),null;{let e=await s.blob(),t=(0,l.toNodeOutgoingHttpHeaders)(s.headers);T&&(t[L.NEXT_CACHE_TAGS_HEADER]=T),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=L.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=L.INFINITE_CACHE?!1!==r&&r>0?g.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await m.onRequestError(e,t,{routerKind:"App Router",routePath:U,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:P,isOnDemandRevalidate:S})},!1,I),t}},Q=async(s,T)=>{try{var i,o;let s=await m.handleResponse({req:e,nextConfig:g,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:v,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:f,responseGenerator:V,waitUntil:a.waitUntil,isMinimalMode:K});if(!F)return;if((null==s||null==(i=s.value)?void 0:i.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==s||null==(o=s.value)?void 0:o.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",S?"REVALIDATED":s.isMiss?"MISS":s.isStale?"STALE":"HIT"),h&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let n=(0,l.fromNodeOutgoingHttpHeaders)(s.value.headers);K&&F||n.delete(L.NEXT_CACHE_TAGS_HEADER),!s.cacheControl||t.getHeader("Cache-Control")||n.get("Cache-Control")||n.set("Cache-Control",(0,N.getCacheControlHeader)(s.cacheControl)),await (0,p.sendResponse)(W,$,new Response(s.value.body,{headers:n,status:s.value.status||200}));return}catch(t){if(t instanceof u.NoFallbackError||await m.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:P,isOnDemandRevalidate:S})},!1,I),F)throw t;await (0,p.sendResponse)(W,$,new Response(null,{status:500}));return}finally{(()=>{if(!s)return;let e=t.statusCode;s.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(s.setStatus({code:n.SpanStatusCode.ERROR}),s.setAttribute("error.type",e.toString()));let r=q.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==E.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||b,i=`${B} ${a}`;s.setAttributes({"next.route":a,"http.route":a,"next.span_name":i}),s.updateName(i),T&&T!==s&&(T.setAttribute("http.route",a),T.updateName(i))})()}};if(j&&Y)await Q(Y,void 0);else{let t=q.getActiveScopeSpan();await q.withPropagatedContext(e.headers,()=>q.trace(E.BaseServerSpan.handleRequest,{spanName:`${B} ${U}`,kind:n.SpanKind.SERVER,attributes:{"http.method":B,"http.target":e.url}},e=>Q(e,t)),void 0,!j)}}e.s(["handler",0,X,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:U,workUnitAsyncStorage:O})},"routeModule",0,m,"serverHooks",0,R,"workAsyncStorage",0,U,"workUnitAsyncStorage",0,O])},72507,e=>{"use strict";let t={name:"Bevans Sons",tagline:"Premium Clothing. Crafted for the Bold.",domain:"https://bevans-sons.onrender.com",whatsapp:"27724816274",phone:"0724816274",email:"MkhabeleEnterprise@gmail.com",currency:"ZAR",currencySymbol:"R",locale:"en-ZA",social:{instagram:process.env.NEXT_PUBLIC_INSTAGRAM??"",facebook:process.env.NEXT_PUBLIC_FACEBOOK??"",tiktok:process.env.NEXT_PUBLIC_TIKTOK??""},shipping:{freeThreshold:1500,standardDays:"3-5 business days",expressDays:"1-2 business days"}};e.s(["BRAND",0,t,"getAdminEmails",0,function(){return[process.env.ADMIN_EMAIL??"",process.env.ADMIN_EMAIL_2??""].filter(Boolean).join(", ")},"getBankConfig",0,function(){return{bank:process.env.BANK_NAME??"",accountHolder:process.env.BANK_ACCOUNT_HOLDER??"",accountType:process.env.BANK_ACCOUNT_TYPE??"Business Account",accountNumber:process.env.BANK_ACCOUNT_NUMBER??"",branchCode:process.env.BANK_BRANCH_CODE??""}},"parsePrice",0,function(e){return null==e?0:"number"==typeof e?e:parseFloat(String(e).replace(/[^0-9.]/g,""))||0}])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let s=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),n=r.default.join(s,"bevans.db"),T=null;function i(){var e;let r;return T||((0,a.existsSync)(s)||(0,a.mkdirSync)(s,{recursive:!0}),(T=new t.default(n)).pragma("journal_mode = WAL"),T.pragma("foreign_keys = ON"),(e=T).exec(`
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
    `);let t=new Date().toISOString(),a=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),s=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,r,n,T]of s)a.run(e,r,n,T,t)})(),r("create_categories_v1")}}(T)),T}e.s(["exportProductsJson",0,function(e){try{let t=(e??i()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,a.existsSync)(s)||(0,a.mkdirSync)(s,{recursive:!0}),(0,a.writeFileSync)(r.default.join(s,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,i])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1m-8qk6._.js.map