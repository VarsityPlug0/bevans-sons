module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},53538,e=>{"use strict";var t=e.i(89171),r=e.i(39258);let a=["eligibility_clicked","step1_complete","step2_complete","application_submitted","whatsapp_clicked","term_changed","abandoned"];async function n(e){let{event:n,product_id:s,ref:i,term_months:T,metadata:o}=await e.json();return a.includes(n)?((0,r.trackEvent)({event:n,product_id:s,ref:i,term_months:T,metadata:o}),t.NextResponse.json({ok:!0})):t.NextResponse.json({error:"Invalid event"},{status:400})}e.s(["POST",0,n])},55014,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),s=e.i(61916),i=e.i(74677),T=e.i(69741),o=e.i(16795),E=e.i(87718),d=e.i(95169),l=e.i(47587),p=e.i(66012),c=e.i(70101),u=e.i(26937),L=e.i(10372),N=e.i(93695);e.i(52474);var m=e.i(220);let A=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/installments/events/route",pathname:"/api/installments/events",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/installments/events/route.ts",nextConfigOutput:"",userland:()=>e.r(53538),...{}}),{workAsyncStorage:O,workUnitAsyncStorage:_,serverHooks:R}=A;async function U(e,t,a){a.requestMeta&&(0,n.setRequestMeta)(e,a.requestMeta),A.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let O="/api/installments/events/route";O=O.replace(/\/index$/,"")||"/";let _=await A.prepare(e,t,{srcPage:O,multiZoneDraftMode:!1});if(!_)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:R,deploymentId:U,params:X,nextConfig:g,parsedUrl:h,isDraftMode:S,prerenderManifest:v,routerServerContext:I,isOnDemandRevalidate:x,revalidateOnlyGenerated:f,resolvedPathname:D,clientReferenceManifest:C,serverActionsManifest:y}=_,b=(0,T.normalizeAppPath)(O),F=!!(v.dynamicRoutes[b]||v.routes[D]),w=async()=>((null==I?void 0:I.render404)?await I.render404(e,t,h,!1):t.end("This page could not be found"),null);if(F&&!S){let e=!!v.routes[D],t=v.dynamicRoutes[b];if(t&&!1===t.fallback&&!e){if(g.adapterPath)return await w();throw new N.NoFallbackError}}let M=null;!F||A.isDev||S||(M="/index"===(M=D)?"/":M);let P=!0===A.isDev||!F,k=F&&!P;y&&C&&(0,i.setManifestsSingleton)({page:O,clientReferenceManifest:C,serverActionsManifest:y});let q=e.method||"GET",B=(0,s.getTracer)(),Y=B.getActiveScopeSpan(),j=!!(null==I?void 0:I.isWrappedByNextServer),H=!!(0,n.getRequestMeta)(e,"minimalMode"),K=(0,n.getRequestMeta)(e,"incrementalCache")||await A.getIncrementalCache(e,g,v,H);null==K||K.resetRequestCache(),globalThis.__incrementalCache=K;let G={params:X,previewProps:v.preview,renderOpts:{experimental:{authInterrupts:!!g.experimental.authInterrupts,useCacheTimeout:g.experimental.useCacheTimeout},cacheComponents:!!g.cacheComponents,validationLevel:g.experimental.instantInsights.validationLevel,supportsDynamicResponse:P,incrementalCache:K,hmrRefreshHash:(0,n.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:g.cacheLife,staticPageGenerationTimeout:g.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>A.onRequestError(e,t,a,n,I)},sharedContext:{buildId:R,deploymentId:U}},W=new o.NodeNextRequest(e),J=new o.NodeNextResponse(t),V=E.NextRequestAdapter.fromNodeNextRequest(W,(0,E.signalFromNodeResponse)(t)),$=async({previousCacheEntry:r})=>{try{if(!H&&x&&f&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await A.handle(V,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let s=G.renderOpts.pendingWaitUntil;s&&a.waitUntil&&(a.waitUntil(s),s=void 0);let i=G.renderOpts.collectedTags;if(!F)return await (0,p.sendResponse)(W,J,n,s),null;{let e=await n.blob(),t=(0,c.toNodeOutgoingHttpHeaders)(n.headers);i&&(t[L.NEXT_CACHE_TAGS_HEADER]=i),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=L.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=L.INFINITE_CACHE?!1!==r&&r>0?g.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await A.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,l.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:x})},!1,I),t}},Q=async(n,i)=>{try{var T,o;let n=await A.handleResponse({req:e,nextConfig:g,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:v,isRoutePPREnabled:!1,isOnDemandRevalidate:x,revalidateOnlyGenerated:f,responseGenerator:$,waitUntil:a.waitUntil,isMinimalMode:H});if(!F)return;if((null==n||null==(T=n.value)?void 0:T.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==n||null==(o=n.value)?void 0:o.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});H||t.setHeader("x-nextjs-cache",x?"REVALIDATED":n.isMiss?"MISS":n.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let s=(0,c.fromNodeOutgoingHttpHeaders)(n.value.headers);H&&F||s.delete(L.NEXT_CACHE_TAGS_HEADER),!n.cacheControl||t.getHeader("Cache-Control")||s.get("Cache-Control")||s.set("Cache-Control",(0,u.getCacheControlHeader)(n.cacheControl)),await (0,p.sendResponse)(W,J,new Response(n.value.body,{headers:s,status:n.value.status||200}));return}catch(t){if(t instanceof N.NoFallbackError||await A.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,l.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:x})},!1,I),F)throw t;await (0,p.sendResponse)(W,J,new Response(null,{status:500}));return}finally{(()=>{if(!n)return;let e=t.statusCode;n.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(n.setStatus({code:s.SpanStatusCode.ERROR}),n.setAttribute("error.type",e.toString()));let r=B.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||b,T=`${q} ${a}`;n.setAttributes({"next.route":a,"http.route":a,"next.span_name":T}),n.updateName(T),i&&i!==n&&(i.setAttribute("http.route",a),i.updateName(T))})()}};if(j&&Y)await Q(Y,void 0);else{let t=B.getActiveScopeSpan();await B.withPropagatedContext(e.headers,()=>B.trace(d.BaseServerSpan.handleRequest,{spanName:`${q} ${O}`,kind:s.SpanKind.SERVER,attributes:{"http.method":q,"http.target":e.url}},e=>Q(e,t)),void 0,!j)}}e.s(["handler",0,U,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:O,workUnitAsyncStorage:_})},"routeModule",0,A,"serverHooks",0,R,"workAsyncStorage",0,O,"workUnitAsyncStorage",0,_])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let n=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),s=r.default.join(n,"bevans.db"),i=null;function T(){var e;let r;return i||((0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(i=new t.default(s)).pragma("journal_mode = WAL"),i.pragma("foreign_keys = ON"),(e=i).exec(`
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
    `);let t=new Date().toISOString(),a=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),n=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,r,s,i]of n)a.run(e,r,s,i,t)})(),r("create_categories_v1")}}(i)),i}e.s(["exportProductsJson",0,function(e){try{let t=(e??T()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(0,a.writeFileSync)(r.default.join(n,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,T])},39258,e=>{"use strict";var t=e.i(62294),r=e.i(54799);function a(e){return{...e,eligible_terms:JSON.parse(e.eligible_terms),active:1===e.active}}function n(e){let r=(0,t.getDb)().prepare("SELECT * FROM installment_settings WHERE product_id = ? AND active = 1").get(e);return r?a(r):null}function s(e){return(0,t.getDb)().prepare("SELECT * FROM installment_applications WHERE id = ? OR ref = ?").get(e,e)||null}e.s(["calcMonthly",0,function(e,t,r,a,n){let s=e-t+n;if(0===a){let e=Math.ceil(s/r*100)/100;return{monthly:e,total:t+e*r,interest:0}}let i=Math.ceil(s*a*Math.pow(1+a,r)/(Math.pow(1+a,r)-1)*100)/100,T=i*r,o=Math.round((T-s)*100)/100;return{monthly:i,total:t+T,interest:o}},"createApplication",0,function(e){let a=(0,t.getDb)(),n=new Date().toISOString(),i=(0,r.randomBytes)(8).toString("hex"),T="IA-"+(0,r.randomBytes)(3).toString("hex").toUpperCase();return a.prepare(`
    INSERT INTO installment_applications
      (id, ref, product_id, product_name, product_price, product_imageUrl, term_months, monthly_payment,
       deposit, total_repayable, name, phone, email, id_number, address,
       status, whatsapp_clicked, createdAt, updatedAt)
    VALUES
      (@id, @ref, @product_id, @product_name, @product_price, @product_imageUrl, @term_months, @monthly_payment,
       @deposit, @total_repayable, @name, @phone, @email, @id_number, @address,
       'new', 0, @now, @now)
  `).run({id:i,ref:T,...e,product_imageUrl:e.product_imageUrl??null,now:n}),s(i)},"getApplication",0,s,"getEventStats",0,function(){return Object.fromEntries((0,t.getDb)().prepare("SELECT event, COUNT(*) as count FROM installment_events GROUP BY event").all().map(e=>[e.event,e.count]))},"getSettings",0,n,"listAllSettings",0,function(){return(0,t.getDb)().prepare("SELECT * FROM installment_settings ORDER BY createdAt DESC").all().map(a)},"listApplications",0,function(){return(0,t.getDb)().prepare("SELECT * FROM installment_applications ORDER BY createdAt DESC").all()},"trackEvent",0,function(e){let a=(0,t.getDb)(),n=(0,r.randomBytes)(8).toString("hex");a.prepare(`
    INSERT INTO installment_events (id, event, product_id, ref, term_months, metadata, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(n,e.event,e.product_id??null,e.ref??null,e.term_months??null,e.metadata?JSON.stringify(e.metadata):null,new Date().toISOString())},"updateApplicationStatus",0,function(e,r,a){let n=(0,t.getDb)(),s=new Date().toISOString();n.prepare("UPDATE installment_applications SET status = ?, admin_notes = COALESCE(?, admin_notes), updatedAt = ? WHERE id = ?").run(r,a??null,s,e)},"upsertSettings",0,function(e){let a=(0,t.getDb)(),s=new Date().toISOString();if(a.prepare("SELECT id FROM installment_settings WHERE product_id = ?").get(e.product_id))a.prepare(`
      UPDATE installment_settings
      SET min_deposit_pct = ?, eligible_terms = ?, monthly_rate = ?, admin_fee = ?, active = ?, updatedAt = ?
      WHERE product_id = ?
    `).run(e.min_deposit_pct,JSON.stringify(e.eligible_terms),e.monthly_rate,e.admin_fee,+!!e.active,s,e.product_id);else{let t=(0,r.randomBytes)(8).toString("hex");a.prepare(`
      INSERT INTO installment_settings
        (id, product_id, min_deposit_pct, eligible_terms, monthly_rate, admin_fee, active, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(t,e.product_id,e.min_deposit_pct,JSON.stringify(e.eligible_terms),e.monthly_rate,e.admin_fee,+!!e.active,s,s)}return n(e.product_id)}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0hkbpws._.js.map