module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},58857,e=>{"use strict";var t=e.i(89171),r=e.i(62294),s=e.i(68105);async function T(){if(!await (0,s.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let e=(0,r.getDb)().prepare(`
    SELECT s.*,
      (SELECT body FROM chat_messages WHERE sessionId=s.id ORDER BY createdAt DESC LIMIT 1) as lastMessage,
      (SELECT COUNT(*) FROM chat_messages WHERE sessionId=s.id) as messageCount
    FROM chat_sessions s
    ORDER BY s.lastMessageAt DESC
    LIMIT 100
  `).all();return t.NextResponse.json(e)}e.s(["GET",0,T])},40110,e=>{"use strict";var t=e.i(47909),r=e.i(74017),s=e.i(96250),T=e.i(59756),a=e.i(61916),n=e.i(74677),i=e.i(69741),o=e.i(16795),E=e.i(87718),d=e.i(95169),L=e.i(47587),N=e.i(66012),c=e.i(70101),p=e.i(26937),l=e.i(10372),u=e.i(93695);e.i(52474);var A=e.i(220);let R=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/admin/chat/sessions/route",pathname:"/api/admin/chat/sessions",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/admin/chat/sessions/route.ts",nextConfigOutput:"",userland:()=>e.r(58857),...{}}),{workAsyncStorage:U,workUnitAsyncStorage:O,serverHooks:m}=R;async function X(e,t,s){s.requestMeta&&(0,T.setRequestMeta)(e,s.requestMeta),R.isDev&&(0,T.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let U="/api/admin/chat/sessions/route";U=U.replace(/\/index$/,"")||"/";let O=await R.prepare(e,t,{srcPage:U,multiZoneDraftMode:!1});if(!O)return t.statusCode=400,t.end("Bad Request"),null==s.waitUntil||s.waitUntil.call(s,Promise.resolve()),null;let{buildId:m,deploymentId:X,params:_,nextConfig:h,parsedUrl:I,isDraftMode:x,prerenderManifest:v,routerServerContext:g,isOnDemandRevalidate:S,revalidateOnlyGenerated:C,resolvedPathname:D,clientReferenceManifest:F,serverActionsManifest:f}=O,M=(0,i.normalizeAppPath)(U),y=!!(v.dynamicRoutes[M]||v.routes[D]),w=async()=>((null==g?void 0:g.render404)?await g.render404(e,t,I,!1):t.end("This page could not be found"),null);if(y&&!x){let e=!!v.routes[D],t=v.dynamicRoutes[M];if(t&&!1===t.fallback&&!e){if(h.adapterPath)return await w();throw new u.NoFallbackError}}let b=null;!y||R.isDev||x||(b="/index"===(b=D)?"/":b);let P=!0===R.isDev||!y,k=y&&!P;f&&F&&(0,n.setManifestsSingleton)({page:U,clientReferenceManifest:F,serverActionsManifest:f});let q=e.method||"GET",Y=(0,a.getTracer)(),B=Y.getActiveScopeSpan(),j=!!(null==g?void 0:g.isWrappedByNextServer),K=!!(0,T.getRequestMeta)(e,"minimalMode"),H=(0,T.getRequestMeta)(e,"incrementalCache")||await R.getIncrementalCache(e,h,v,K);null==H||H.resetRequestCache(),globalThis.__incrementalCache=H;let G={params:_,previewProps:v.preview,renderOpts:{experimental:{authInterrupts:!!h.experimental.authInterrupts,useCacheTimeout:h.experimental.useCacheTimeout},cacheComponents:!!h.cacheComponents,validationLevel:h.experimental.instantInsights.validationLevel,supportsDynamicResponse:P,incrementalCache:H,hmrRefreshHash:(0,T.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:h.cacheLife,staticPageGenerationTimeout:h.staticPageGenerationTimeout,waitUntil:s.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,s,T)=>R.onRequestError(e,t,s,T,g)},sharedContext:{buildId:m,deploymentId:X}},W=new o.NodeNextRequest(e),$=new o.NodeNextResponse(t),Q=E.NextRequestAdapter.fromNodeNextRequest(W,(0,E.signalFromNodeResponse)(t)),V=async({previousCacheEntry:r})=>{try{if(!K&&S&&C&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let T=await R.handle(Q,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let a=G.renderOpts.pendingWaitUntil;a&&s.waitUntil&&(s.waitUntil(a),a=void 0);let n=G.renderOpts.collectedTags;if(!y)return await (0,N.sendResponse)(W,$,T,a),null;{let e=await T.blob(),t=(0,c.toNodeOutgoingHttpHeaders)(T.headers);n&&(t[l.NEXT_CACHE_TAGS_HEADER]=n),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=l.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,s=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=l.INFINITE_CACHE?!1!==r&&r>0?h.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:T.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:s}}}}catch(t){throw(null==r?void 0:r.isStale)&&await R.onRequestError(e,t,{routerKind:"App Router",routePath:U,routeType:"route",revalidateReason:(0,L.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:S})},!1,g),t}},J=async(T,n)=>{try{var i,o;let T=await R.handleResponse({req:e,nextConfig:h,cacheKey:b,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:v,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:C,responseGenerator:V,waitUntil:s.waitUntil,isMinimalMode:K});if(!y)return;if((null==T||null==(i=T.value)?void 0:i.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==T||null==(o=T.value)?void 0:o.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",S?"REVALIDATED":T.isMiss?"MISS":T.isStale?"STALE":"HIT"),x&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let a=(0,c.fromNodeOutgoingHttpHeaders)(T.value.headers);K&&y||a.delete(l.NEXT_CACHE_TAGS_HEADER),!T.cacheControl||t.getHeader("Cache-Control")||a.get("Cache-Control")||a.set("Cache-Control",(0,p.getCacheControlHeader)(T.cacheControl)),await (0,N.sendResponse)(W,$,new Response(T.value.body,{headers:a,status:T.value.status||200}));return}catch(t){if(t instanceof u.NoFallbackError||await R.onRequestError(e,t,{routerKind:"App Router",routePath:M,routeType:"route",revalidateReason:(0,L.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:S})},!1,g),y)throw t;await (0,N.sendResponse)(W,$,new Response(null,{status:500}));return}finally{(()=>{if(!T)return;let e=t.statusCode;T.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(T.setStatus({code:a.SpanStatusCode.ERROR}),T.setAttribute("error.type",e.toString()));let r=Y.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=r.get("next.route")||M,i=`${q} ${s}`;T.setAttributes({"next.route":s,"http.route":s,"next.span_name":i}),T.updateName(i),n&&n!==T&&(n.setAttribute("http.route",s),n.updateName(i))})()}};if(j&&B)await J(B,void 0);else{let t=Y.getActiveScopeSpan();await Y.withPropagatedContext(e.headers,()=>Y.trace(d.BaseServerSpan.handleRequest,{spanName:`${q} ${U}`,kind:a.SpanKind.SERVER,attributes:{"http.method":q,"http.target":e.url}},e=>J(e,t)),void 0,!j)}}e.s(["handler",0,X,"patchFetch",0,function(){return(0,s.patchFetch)({workAsyncStorage:U,workUnitAsyncStorage:O})},"routeModule",0,R,"serverHooks",0,m,"workAsyncStorage",0,U,"workUnitAsyncStorage",0,O])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),s=e.i(22734);let T=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),a=r.default.join(T,"bevans.db"),n=null;function i(){var e;let r;return n||((0,s.existsSync)(T)||(0,s.mkdirSync)(T,{recursive:!0}),(n=new t.default(a)).pragma("journal_mode = WAL"),n.pragma("foreign_keys = ON"),(e=n).exec(`
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
    `);let t=new Date().toISOString(),s=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),T=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,r,a,n]of T)s.run(e,r,a,n,t)})(),r("create_categories_v1")}}(n)),n}e.s(["exportProductsJson",0,function(e){try{let t=(e??i()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,s.existsSync)(T)||(0,s.mkdirSync)(T,{recursive:!0}),(0,s.writeFileSync)(r.default.join(T,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,i])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1uwtof5._.js.map