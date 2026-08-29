module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},84423,(e,t,r)=>{t.exports=e.x("nodemailer-9c35dd349a8aaa9f",()=>require("nodemailer-9c35dd349a8aaa9f"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},96136,e=>{"use strict";var t=e.i(89171),r=e.i(62294),a=e.i(54799),s=e.i(84423);let T=process.env.RESEND_API_KEY?s.default.createTransport({host:"smtp.resend.com",port:587,secure:!1,auth:{user:"resend",pass:process.env.RESEND_API_KEY}}):null;async function n(e){let{visitorId:s,productId:n,productName:i,price:o,category:E,visitorName:d,visitorPhone:c,visitorEmail:L}=await e.json();if(!n||!i)return t.NextResponse.json({ok:!1},{status:400});let N=(0,r.getDb)(),l=(0,a.randomBytes)(8).toString("hex"),p=new Date().toISOString();if(N.prepare(`
    INSERT INTO cart_events (id, visitorId, productId, productName, price, category, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(l,s??null,String(n).slice(0,100),String(i).slice(0,300),String(o).slice(0,50),String(E).slice(0,100),p),T){let e=d||c||L?`
Customer: ${d??"Unknown"}
Phone: ${c??"—"}
Email: ${L??"—"}`:"\nCustomer: Anonymous visitor";T.sendMail({from:"Bevans Sons <MkhabeleEnterprise@gmail.com>",to:"MkhabeleEnterprise@gmail.com, MkhabeleEnterprise@gmail.com",subject:`🛒 Cart — ${i} added`,text:`Someone added a product to their enquiry cart.

Product: ${i}
Category: ${E}
Price: ${o}${e}

Time: ${new Date(p).toLocaleString("en-ZA",{timeZone:"Africa/Johannesburg"})}`}).catch(console.error)}return t.NextResponse.json({ok:!0})}e.s(["POST",0,n])},38867,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),s=e.i(59756),T=e.i(61916),n=e.i(74677),i=e.i(69741),o=e.i(16795),E=e.i(87718),d=e.i(95169),c=e.i(47587),L=e.i(66012),N=e.i(70101),l=e.i(26937),p=e.i(10372),u=e.i(93695);e.i(52474);var A=e.i(220);let U=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/track/cart/route",pathname:"/api/track/cart",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/track/cart/route.ts",nextConfigOutput:"",userland:()=>e.r(96136),...{}}),{workAsyncStorage:R,workUnitAsyncStorage:O,serverHooks:m}=U;async function X(e,t,a){a.requestMeta&&(0,s.setRequestMeta)(e,a.requestMeta),U.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/track/cart/route";R=R.replace(/\/index$/,"")||"/";let O=await U.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!O)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:m,deploymentId:X,params:_,nextConfig:h,parsedUrl:I,isDraftMode:x,prerenderManifest:v,routerServerContext:g,isOnDemandRevalidate:S,revalidateOnlyGenerated:D,resolvedPathname:C,clientReferenceManifest:f,serverActionsManifest:F}=O,y=(0,i.normalizeAppPath)(R),w=!!(v.dynamicRoutes[y]||v.routes[C]),b=async()=>((null==g?void 0:g.render404)?await g.render404(e,t,I,!1):t.end("This page could not be found"),null);if(w&&!x){let e=!!v.routes[C],t=v.dynamicRoutes[y];if(t&&!1===t.fallback&&!e){if(h.adapterPath)return await b();throw new u.NoFallbackError}}let M=null;!w||U.isDev||x||(M="/index"===(M=C)?"/":M);let k=!0===U.isDev||!w,P=w&&!k;F&&f&&(0,n.setManifestsSingleton)({page:R,clientReferenceManifest:f,serverActionsManifest:F});let q=e.method||"GET",Y=(0,T.getTracer)(),B=Y.getActiveScopeSpan(),j=!!(null==g?void 0:g.isWrappedByNextServer),K=!!(0,s.getRequestMeta)(e,"minimalMode"),H=(0,s.getRequestMeta)(e,"incrementalCache")||await U.getIncrementalCache(e,h,v,K);null==H||H.resetRequestCache(),globalThis.__incrementalCache=H;let G={params:_,previewProps:v.preview,renderOpts:{experimental:{authInterrupts:!!h.experimental.authInterrupts,useCacheTimeout:h.experimental.useCacheTimeout},cacheComponents:!!h.cacheComponents,validationLevel:h.experimental.instantInsights.validationLevel,supportsDynamicResponse:k,incrementalCache:H,hmrRefreshHash:(0,s.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:h.cacheLife,staticPageGenerationTimeout:h.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,s)=>U.onRequestError(e,t,a,s,g)},sharedContext:{buildId:m,deploymentId:X}},W=new o.NodeNextRequest(e),$=new o.NodeNextResponse(t),V=E.NextRequestAdapter.fromNodeNextRequest(W,(0,E.signalFromNodeResponse)(t)),J=async({previousCacheEntry:r})=>{try{if(!K&&S&&D&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await U.handle(V,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let T=G.renderOpts.pendingWaitUntil;T&&a.waitUntil&&(a.waitUntil(T),T=void 0);let n=G.renderOpts.collectedTags;if(!w)return await (0,L.sendResponse)(W,$,s,T),null;{let e=await s.blob(),t=(0,N.toNodeOutgoingHttpHeaders)(s.headers);n&&(t[p.NEXT_CACHE_TAGS_HEADER]=n),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=p.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=p.INFINITE_CACHE?!1!==r&&r>0?h.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await U.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:P,isOnDemandRevalidate:S})},!1,g),t}},Q=async(s,n)=>{try{var i,o;let s=await U.handleResponse({req:e,nextConfig:h,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:v,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:D,responseGenerator:J,waitUntil:a.waitUntil,isMinimalMode:K});if(!w)return;if((null==s||null==(i=s.value)?void 0:i.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==s||null==(o=s.value)?void 0:o.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",S?"REVALIDATED":s.isMiss?"MISS":s.isStale?"STALE":"HIT"),x&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let T=(0,N.fromNodeOutgoingHttpHeaders)(s.value.headers);K&&w||T.delete(p.NEXT_CACHE_TAGS_HEADER),!s.cacheControl||t.getHeader("Cache-Control")||T.get("Cache-Control")||T.set("Cache-Control",(0,l.getCacheControlHeader)(s.cacheControl)),await (0,L.sendResponse)(W,$,new Response(s.value.body,{headers:T,status:s.value.status||200}));return}catch(t){if(t instanceof u.NoFallbackError||await U.onRequestError(e,t,{routerKind:"App Router",routePath:y,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:P,isOnDemandRevalidate:S})},!1,g),w)throw t;await (0,L.sendResponse)(W,$,new Response(null,{status:500}));return}finally{(()=>{if(!s)return;let e=t.statusCode;s.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(s.setStatus({code:T.SpanStatusCode.ERROR}),s.setAttribute("error.type",e.toString()));let r=Y.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||y,i=`${q} ${a}`;s.setAttributes({"next.route":a,"http.route":a,"next.span_name":i}),s.updateName(i),n&&n!==s&&(n.setAttribute("http.route",a),n.updateName(i))})()}};if(j&&B)await Q(B,void 0);else{let t=Y.getActiveScopeSpan();await Y.withPropagatedContext(e.headers,()=>Y.trace(d.BaseServerSpan.handleRequest,{spanName:`${q} ${R}`,kind:T.SpanKind.SERVER,attributes:{"http.method":q,"http.target":e.url}},e=>Q(e,t)),void 0,!j)}}e.s(["handler",0,X,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:R,workUnitAsyncStorage:O})},"routeModule",0,U,"serverHooks",0,m,"workAsyncStorage",0,R,"workUnitAsyncStorage",0,O])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let s=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),T=r.default.join(s,"bevans.db"),n=null;function i(){var e;let r;return n||((0,a.existsSync)(s)||(0,a.mkdirSync)(s,{recursive:!0}),(n=new t.default(T)).pragma("journal_mode = WAL"),n.pragma("foreign_keys = ON"),(e=n).exec(`
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
    `);let t=new Date().toISOString(),a=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),s=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,r,T,n]of s)a.run(e,r,T,n,t)})(),r("create_categories_v1")}}(n)),n}e.s(["exportProductsJson",0,function(e){try{let t=(e??i()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,a.existsSync)(s)||(0,a.mkdirSync)(s,{recursive:!0}),(0,a.writeFileSync)(r.default.join(s,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,i])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1lkurac._.js.map