module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},84423,(e,t,r)=>{t.exports=e.x("nodemailer-9c35dd349a8aaa9f",()=>require("nodemailer-9c35dd349a8aaa9f"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},2163,e=>{"use strict";var t=e.i(89171),r=e.i(62294),s=e.i(54799),a=e.i(67010);async function n(e){let{searchParams:s}=new URL(e.url),a=s.get("sessionId"),n=s.get("after");if(!a)return t.NextResponse.json({messages:[]});let T=(0,r.getDb)(),o=n?T.prepare("SELECT * FROM chat_messages WHERE sessionId = ? AND createdAt > ? ORDER BY createdAt ASC").all(a,n):T.prepare("SELECT * FROM chat_messages WHERE sessionId = ? ORDER BY createdAt ASC").all(a);return t.NextResponse.json({messages:o})}async function T(e){let{sessionId:n,body:T,visitorId:o}=await e.json();if(!n||!T?.trim())return t.NextResponse.json({error:"Missing fields"},{status:400});let i=(0,r.getDb)(),E=new Date().toISOString(),d=(0,s.randomBytes)(8).toString("hex"),c=i.prepare("SELECT * FROM chat_sessions WHERE id = ?").get(n);if(!c)return t.NextResponse.json({error:"Session not found"},{status:404});if(i.prepare("INSERT INTO chat_messages (id, sessionId, sender, body, createdAt) VALUES (?,?,?,?,?)").run(d,n,"customer",T.trim().slice(0,2e3),E),i.prepare("UPDATE chat_sessions SET lastMessageAt=?, unreadAdmin=unreadAdmin+1 WHERE id=?").run(E,n),1===i.prepare("SELECT COUNT(*) as c FROM chat_messages WHERE sessionId=? AND sender='customer'").get(n).c){let e=String(c.name||"Anonymous"),t=String(c.phone||"—");(0,a.sendMail)({to:"MkhabeleEnterprise@gmail.com, MkhabeleEnterprise@gmail.com",subject:`💬 New Chat — ${e}`,html:`
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#0A0A0A;border-radius:10px;padding:28px;color:#e5e7eb">
          <h2 style="color:#D4AF37;margin:0 0 16px">New Chat Started</h2>
          <p style="margin:0 0 8px;color:#9ca3af">From: <strong style="color:#fff">${e}</strong></p>
          <p style="margin:0 0 8px;color:#9ca3af">Phone: <strong style="color:#fff">${t}</strong></p>
          <p style="margin:0 0 20px;color:#9ca3af">Message: <strong style="color:#fff">${T.slice(0,300)}</strong></p>
          <a href="https://bevanssons.store/admin/dashboard/chat" style="display:inline-block;background:#D4AF37;color:#000;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:8px">Reply in Admin</a>
        </div>
      `})}return t.NextResponse.json({ok:!0,id:d})}e.s(["GET",0,n,"POST",0,T])},41936,e=>{"use strict";var t=e.i(47909),r=e.i(74017),s=e.i(96250),a=e.i(59756),n=e.i(61916),T=e.i(74677),o=e.i(69741),i=e.i(16795),E=e.i(87718),d=e.i(95169),c=e.i(47587),p=e.i(66012),l=e.i(70101),N=e.i(26937),L=e.i(10372),u=e.i(93695);e.i(52474);var A=e.i(220);let m=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/chat/messages/route",pathname:"/api/chat/messages",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/chat/messages/route.ts",nextConfigOutput:"",userland:()=>e.r(2163),...{}}),{workAsyncStorage:R,workUnitAsyncStorage:U,serverHooks:O}=m;async function X(e,t,s){s.requestMeta&&(0,a.setRequestMeta)(e,s.requestMeta),m.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/chat/messages/route";R=R.replace(/\/index$/,"")||"/";let U=await m.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!U)return t.statusCode=400,t.end("Bad Request"),null==s.waitUntil||s.waitUntil.call(s,Promise.resolve()),null;let{buildId:O,deploymentId:X,params:g,nextConfig:h,parsedUrl:_,isDraftMode:x,prerenderManifest:I,routerServerContext:v,isOnDemandRevalidate:S,revalidateOnlyGenerated:f,resolvedPathname:C,clientReferenceManifest:D,serverActionsManifest:y}=U,b=(0,o.normalizeAppPath)(R),F=!!(I.dynamicRoutes[b]||I.routes[C]),M=async()=>((null==v?void 0:v.render404)?await v.render404(e,t,_,!1):t.end("This page could not be found"),null);if(F&&!x){let e=!!I.routes[C],t=I.dynamicRoutes[b];if(t&&!1===t.fallback&&!e){if(h.adapterPath)return await M();throw new u.NoFallbackError}}let w=null;!F||m.isDev||x||(w="/index"===(w=C)?"/":w);let k=!0===m.isDev||!F,P=F&&!k;y&&D&&(0,T.setManifestsSingleton)({page:R,clientReferenceManifest:D,serverActionsManifest:y});let B=e.method||"GET",q=(0,n.getTracer)(),Y=q.getActiveScopeSpan(),j=!!(null==v?void 0:v.isWrappedByNextServer),K=!!(0,a.getRequestMeta)(e,"minimalMode"),H=(0,a.getRequestMeta)(e,"incrementalCache")||await m.getIncrementalCache(e,h,I,K);null==H||H.resetRequestCache(),globalThis.__incrementalCache=H;let G={params:g,previewProps:I.preview,renderOpts:{experimental:{authInterrupts:!!h.experimental.authInterrupts,useCacheTimeout:h.experimental.useCacheTimeout},cacheComponents:!!h.cacheComponents,validationLevel:h.experimental.instantInsights.validationLevel,supportsDynamicResponse:k,incrementalCache:H,hmrRefreshHash:(0,a.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:h.cacheLife,staticPageGenerationTimeout:h.staticPageGenerationTimeout,waitUntil:s.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,s,a)=>m.onRequestError(e,t,s,a,v)},sharedContext:{buildId:O,deploymentId:X}},W=new i.NodeNextRequest(e),$=new i.NodeNextResponse(t),V=E.NextRequestAdapter.fromNodeNextRequest(W,(0,E.signalFromNodeResponse)(t)),Q=async({previousCacheEntry:r})=>{try{if(!K&&S&&f&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await m.handle(V,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let n=G.renderOpts.pendingWaitUntil;n&&s.waitUntil&&(s.waitUntil(n),n=void 0);let T=G.renderOpts.collectedTags;if(!F)return await (0,p.sendResponse)(W,$,a,n),null;{let e=await a.blob(),t=(0,l.toNodeOutgoingHttpHeaders)(a.headers);T&&(t[L.NEXT_CACHE_TAGS_HEADER]=T),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=L.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,s=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=L.INFINITE_CACHE?!1!==r&&r>0?h.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:s}}}}catch(t){throw(null==r?void 0:r.isStale)&&await m.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:P,isOnDemandRevalidate:S})},!1,v),t}},J=async(a,T)=>{try{var o,i;let a=await m.handleResponse({req:e,nextConfig:h,cacheKey:w,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:I,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:f,responseGenerator:Q,waitUntil:s.waitUntil,isMinimalMode:K});if(!F)return;if((null==a||null==(o=a.value)?void 0:o.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==a||null==(i=a.value)?void 0:i.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",S?"REVALIDATED":a.isMiss?"MISS":a.isStale?"STALE":"HIT"),x&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let n=(0,l.fromNodeOutgoingHttpHeaders)(a.value.headers);K&&F||n.delete(L.NEXT_CACHE_TAGS_HEADER),!a.cacheControl||t.getHeader("Cache-Control")||n.get("Cache-Control")||n.set("Cache-Control",(0,N.getCacheControlHeader)(a.cacheControl)),await (0,p.sendResponse)(W,$,new Response(a.value.body,{headers:n,status:a.value.status||200}));return}catch(t){if(t instanceof u.NoFallbackError||await m.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:P,isOnDemandRevalidate:S})},!1,v),F)throw t;await (0,p.sendResponse)(W,$,new Response(null,{status:500}));return}finally{(()=>{if(!a)return;let e=t.statusCode;a.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(a.setStatus({code:n.SpanStatusCode.ERROR}),a.setAttribute("error.type",e.toString()));let r=q.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=r.get("next.route")||b,o=`${B} ${s}`;a.setAttributes({"next.route":s,"http.route":s,"next.span_name":o}),a.updateName(o),T&&T!==a&&(T.setAttribute("http.route",s),T.updateName(o))})()}};if(j&&Y)await J(Y,void 0);else{let t=q.getActiveScopeSpan();await q.withPropagatedContext(e.headers,()=>q.trace(d.BaseServerSpan.handleRequest,{spanName:`${B} ${R}`,kind:n.SpanKind.SERVER,attributes:{"http.method":B,"http.target":e.url}},e=>J(e,t)),void 0,!j)}}e.s(["handler",0,X,"patchFetch",0,function(){return(0,s.patchFetch)({workAsyncStorage:R,workUnitAsyncStorage:U})},"routeModule",0,m,"serverHooks",0,O,"workAsyncStorage",0,R,"workUnitAsyncStorage",0,U])},72507,e=>{"use strict";let t={name:"Bevans Sons",tagline:"Premium Clothing. Crafted for the Bold.",domain:"https://bevans-sons.onrender.com",whatsapp:"27724816274",phone:"0724816274",email:"MkhabeleEnterprise@gmail.com",currency:"ZAR",currencySymbol:"R",locale:"en-ZA",social:{instagram:process.env.NEXT_PUBLIC_INSTAGRAM??"",facebook:process.env.NEXT_PUBLIC_FACEBOOK??"",tiktok:process.env.NEXT_PUBLIC_TIKTOK??""},shipping:{freeThreshold:1500,standardDays:"3-5 business days",expressDays:"1-2 business days"}};e.s(["BRAND",0,t,"getAdminEmails",0,function(){return[process.env.ADMIN_EMAIL??"",process.env.ADMIN_EMAIL_2??""].filter(Boolean).join(", ")},"getBankConfig",0,function(){return{bank:process.env.BANK_NAME??"",accountHolder:process.env.BANK_ACCOUNT_HOLDER??"",accountType:process.env.BANK_ACCOUNT_TYPE??"Business Account",accountNumber:process.env.BANK_ACCOUNT_NUMBER??"",branchCode:process.env.BANK_BRANCH_CODE??""}},"parsePrice",0,function(e){return null==e?0:"number"==typeof e?e:parseFloat(String(e).replace(/[^0-9.]/g,""))||0}])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),s=e.i(22734);let a=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),n=r.default.join(a,"bevans.db"),T=null;function o(){var e;let r;return T||((0,s.existsSync)(a)||(0,s.mkdirSync)(a,{recursive:!0}),(T=new t.default(n)).pragma("journal_mode = WAL"),T.pragma("foreign_keys = ON"),(e=T).exec(`
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
  `),(r=t=>{try{e.exec(t)}catch{}})("ALTER TABLE orders ADD COLUMN bank_id TEXT"),r("ALTER TABLE orders ADD COLUMN tracking_number TEXT"),r("ALTER TABLE installment_applications ADD COLUMN product_imageUrl TEXT"),function(e){let t=t=>!!e.prepare("SELECT name FROM migrations WHERE name = ?").get(t),r=t=>e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run(t),s=t=>{try{e.exec(t)}catch{}};if(t("add_bevans_product_columns_v1")||(s("ALTER TABLE products ADD COLUMN slug TEXT NOT NULL DEFAULT ''"),s("ALTER TABLE products ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex'"),s("ALTER TABLE products ADD COLUMN material TEXT NOT NULL DEFAULT ''"),s("ALTER TABLE products ADD COLUMN fit TEXT NOT NULL DEFAULT ''"),s("ALTER TABLE products ADD COLUMN newArrival INTEGER NOT NULL DEFAULT 0"),r("add_bevans_product_columns_v1")),t("create_product_variants_v1")||(e.exec(`
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
    `);let t=new Date().toISOString(),s=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),a=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,r,n,T]of a)s.run(e,r,n,T,t)})(),r("create_categories_v1")}}(T)),T}e.s(["exportProductsJson",0,function(e){try{let t=(e??o()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,s.existsSync)(a)||(0,s.mkdirSync)(a,{recursive:!0}),(0,s.writeFileSync)(r.default.join(a,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,o])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1xcqp7r._.js.map