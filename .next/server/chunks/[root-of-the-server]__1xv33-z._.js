module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},94480,(e,t,r)=>{t.exports=e.x("cloudinary-f9f069d0ba9c5439",()=>require("cloudinary-f9f069d0ba9c5439"))},82784,e=>{"use strict";var t=e.i(94480);async function r(e,r){let s=r.startsWith("proof-")?"bevans-sons/proofs":"bevans-sons/products",a=`${s}/${Date.now()}-${r.replace(/\.[^.]+$/,"").replace(/[^a-z0-9]/gi,"-")}`,n=r.toLowerCase().endsWith(".pdf");return new Promise((r,s)=>{t.v2.uploader.upload_stream({public_id:a,overwrite:!0,resource_type:n?"raw":"image",...n?{}:{transformation:[{width:1400,quality:"auto:good",fetch_format:"auto"}]}},(e,t)=>{e||!t?s(e??Error("Upload failed")):r(t.secure_url)}).end(e)})}t.v2.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET}),e.s(["isConfigured",0,function(){return!!(process.env.CLOUDINARY_CLOUD_NAME&&process.env.CLOUDINARY_API_KEY&&process.env.CLOUDINARY_API_SECRET)},"uploadImage",0,r])},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},141,e=>{"use strict";var t=e.i(89171),r=e.i(68105),s=e.i(69722),a=e.i(82784),n=e.i(22734),o=e.i(14747);async function i(e,{params:T}){let E;if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:d}=await T,p=(0,s.getOrder)(d);if(!p)return t.NextResponse.json({error:"Not found"},{status:404});let{file:u,mimeType:c,filename:l}=await e.json();if(!u||!c||!l)return t.NextResponse.json({error:"No file provided"},{status:400});let L=Buffer.from(u,"base64");if(L.length>8388608)return t.NextResponse.json({error:"File too large (max 8 MB)"},{status:400});if(!["image/jpeg","image/png","image/webp","image/heic","application/pdf"].includes(c))return t.NextResponse.json({error:"Invalid file type"},{status:400});if((0,a.isConfigured)())E=await (0,a.uploadImage)(L,`proof-${p.ref}-${l}`);else{let e=o.default.join(process.cwd(),"public","uploads","proofs");(0,n.existsSync)(e)||(0,n.mkdirSync)(e,{recursive:!0});let t=l.split(".").pop()??"jpg",r=`proof-${p.ref}-${Date.now()}.${t}`;(0,n.writeFileSync)(o.default.join(e,r),L),E=`/uploads/proofs/${r}`}let N=(0,s.updateOrder)(d,{proof_url:E});return t.NextResponse.json(N)}e.s(["POST",0,i,"runtime",0,"nodejs"])},51251,e=>{"use strict";var t=e.i(47909),r=e.i(74017),s=e.i(96250),a=e.i(59756),n=e.i(61916),o=e.i(74677),i=e.i(69741),T=e.i(16795),E=e.i(87718),d=e.i(95169),p=e.i(47587),u=e.i(66012),c=e.i(70101),l=e.i(26937),L=e.i(10372),N=e.i(93695);e.i(52474);var A=e.i(220);let O=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/admin/orders/[id]/proof/route",pathname:"/api/admin/orders/[id]/proof",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/admin/orders/[id]/proof/route.ts",nextConfigOutput:"",userland:()=>e.r(141),...{}}),{workAsyncStorage:m,workUnitAsyncStorage:R,serverHooks:U}=O;async function _(e,t,s){s.requestMeta&&(0,a.setRequestMeta)(e,s.requestMeta),O.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let m="/api/admin/orders/[id]/proof/route";m=m.replace(/\/index$/,"")||"/";let R=await O.prepare(e,t,{srcPage:m,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==s.waitUntil||s.waitUntil.call(s,Promise.resolve()),null;let{buildId:U,deploymentId:_,params:X,nextConfig:f,parsedUrl:g,isDraftMode:h,prerenderManifest:I,routerServerContext:v,isOnDemandRevalidate:x,revalidateOnlyGenerated:S,resolvedPathname:D,clientReferenceManifest:C,serverActionsManifest:b}=R,w=(0,i.normalizeAppPath)(m),F=!!(I.dynamicRoutes[w]||I.routes[D]),y=async()=>((null==v?void 0:v.render404)?await v.render404(e,t,g,!1):t.end("This page could not be found"),null);if(F&&!h){let e=!!I.routes[D],t=I.dynamicRoutes[w];if(t&&!1===t.fallback&&!e){if(f.adapterPath)return await y();throw new N.NoFallbackError}}let M=null;!F||O.isDev||h||(M="/index"===(M=D)?"/":M);let k=!0===O.isDev||!F,P=F&&!k;b&&C&&(0,o.setManifestsSingleton)({page:m,clientReferenceManifest:C,serverActionsManifest:b});let Y=e.method||"GET",q=(0,n.getTracer)(),j=q.getActiveScopeSpan(),B=!!(null==v?void 0:v.isWrappedByNextServer),K=!!(0,a.getRequestMeta)(e,"minimalMode"),H=(0,a.getRequestMeta)(e,"incrementalCache")||await O.getIncrementalCache(e,f,I,K);null==H||H.resetRequestCache(),globalThis.__incrementalCache=H;let G={params:X,previewProps:I.preview,renderOpts:{experimental:{authInterrupts:!!f.experimental.authInterrupts,useCacheTimeout:f.experimental.useCacheTimeout},cacheComponents:!!f.cacheComponents,validationLevel:f.experimental.instantInsights.validationLevel,supportsDynamicResponse:k,incrementalCache:H,hmrRefreshHash:(0,a.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:f.cacheLife,staticPageGenerationTimeout:f.staticPageGenerationTimeout,waitUntil:s.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,s,a)=>O.onRequestError(e,t,s,a,v)},sharedContext:{buildId:U,deploymentId:_}},$=new T.NodeNextRequest(e),W=new T.NodeNextResponse(t),J=E.NextRequestAdapter.fromNodeNextRequest($,(0,E.signalFromNodeResponse)(t)),V=async({previousCacheEntry:r})=>{try{if(!K&&x&&S&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await O.handle(J,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let n=G.renderOpts.pendingWaitUntil;n&&s.waitUntil&&(s.waitUntil(n),n=void 0);let o=G.renderOpts.collectedTags;if(!F)return await (0,u.sendResponse)($,W,a,n),null;{let e=await a.blob(),t=(0,c.toNodeOutgoingHttpHeaders)(a.headers);o&&(t[L.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=L.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,s=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=L.INFINITE_CACHE?!1!==r&&r>0?f.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:s}}}}catch(t){throw(null==r?void 0:r.isStale)&&await O.onRequestError(e,t,{routerKind:"App Router",routePath:m,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:P,isOnDemandRevalidate:x})},!1,v),t}},Q=async(a,o)=>{try{var i,T;let a=await O.handleResponse({req:e,nextConfig:f,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:I,isRoutePPREnabled:!1,isOnDemandRevalidate:x,revalidateOnlyGenerated:S,responseGenerator:V,waitUntil:s.waitUntil,isMinimalMode:K});if(!F)return;if((null==a||null==(i=a.value)?void 0:i.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==a||null==(T=a.value)?void 0:T.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",x?"REVALIDATED":a.isMiss?"MISS":a.isStale?"STALE":"HIT"),h&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let n=(0,c.fromNodeOutgoingHttpHeaders)(a.value.headers);K&&F||n.delete(L.NEXT_CACHE_TAGS_HEADER),!a.cacheControl||t.getHeader("Cache-Control")||n.get("Cache-Control")||n.set("Cache-Control",(0,l.getCacheControlHeader)(a.cacheControl)),await (0,u.sendResponse)($,W,new Response(a.value.body,{headers:n,status:a.value.status||200}));return}catch(t){if(t instanceof N.NoFallbackError||await O.onRequestError(e,t,{routerKind:"App Router",routePath:w,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:P,isOnDemandRevalidate:x})},!1,v),F)throw t;await (0,u.sendResponse)($,W,new Response(null,{status:500}));return}finally{(()=>{if(!a)return;let e=t.statusCode;a.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(a.setStatus({code:n.SpanStatusCode.ERROR}),a.setAttribute("error.type",e.toString()));let r=q.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=r.get("next.route")||w,i=`${Y} ${s}`;a.setAttributes({"next.route":s,"http.route":s,"next.span_name":i}),a.updateName(i),o&&o!==a&&(o.setAttribute("http.route",s),o.updateName(i))})()}};if(B&&j)await Q(j,void 0);else{let t=q.getActiveScopeSpan();await q.withPropagatedContext(e.headers,()=>q.trace(d.BaseServerSpan.handleRequest,{spanName:`${Y} ${m}`,kind:n.SpanKind.SERVER,attributes:{"http.method":Y,"http.target":e.url}},e=>Q(e,t)),void 0,!B)}}e.s(["handler",0,_,"patchFetch",0,function(){return(0,s.patchFetch)({workAsyncStorage:m,workUnitAsyncStorage:R})},"routeModule",0,O,"serverHooks",0,U,"workAsyncStorage",0,m,"workUnitAsyncStorage",0,R])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),s=e.i(22734);let a=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),n=r.default.join(a,"bevans.db"),o=null;function i(){var e;let r;return o||((0,s.existsSync)(a)||(0,s.mkdirSync)(a,{recursive:!0}),(o=new t.default(n)).pragma("journal_mode = WAL"),o.pragma("foreign_keys = ON"),(e=o).exec(`
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
    `);let t=new Date().toISOString(),s=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),a=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,r,n,o]of a)s.run(e,r,n,o,t)})(),r("create_categories_v1")}}(o)),o}e.s(["exportProductsJson",0,function(e){try{let t=(e??i()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,s.existsSync)(a)||(0,s.mkdirSync)(a,{recursive:!0}),(0,s.writeFileSync)(r.default.join(a,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,i])},69722,e=>{"use strict";var t=e.i(62294),r=e.i(54799);function s(e){let r=(0,t.getDb)().prepare("SELECT * FROM orders WHERE id = ? OR ref = ?").get(e,e);return r?a(r):null}function a(e){return{...e,items:JSON.parse(e.items)}}e.s(["createOrder",0,function(e){let a=(0,t.getDb)(),n=new Date().toISOString(),o=(0,r.randomBytes)(8).toString("hex"),i="BS-"+(0,r.randomBytes)(3).toString("hex").toUpperCase();return a.prepare(`
    INSERT INTO orders (id, ref, name, email, phone, address, items, total, status, payment_method, eft_reference, bank_id, createdAt, updatedAt)
    VALUES (@id, @ref, @name, @email, @phone, @address, @items, @total, 'pending', 'eft', @eft_reference, @bank_id, @now, @now)
  `).run({id:o,ref:i,name:e.name,email:e.email,phone:e.phone,address:e.address,items:JSON.stringify(e.items),total:e.total,eft_reference:e.eft_reference??null,bank_id:e.bank_id??null,now:n}),s(o)},"generateTrackingNumber",0,function(){let e=(0,t.getDb)(),r=new Date().toISOString().slice(0,10).replace(/-/g,""),s=`BS-${r}-`,a=e.prepare("SELECT COUNT(*) as n FROM orders WHERE tracking_number LIKE ?").get(`${s}%`);return`${s}${String((a?.n??0)+1).padStart(4,"0")}`},"getOrder",0,s,"listOrders",0,function(){return(0,t.getDb)().prepare("SELECT * FROM orders ORDER BY createdAt DESC").all().map(a)},"updateOrder",0,function(e,r){let a=(0,t.getDb)(),n=[],o={id:e,now:new Date().toISOString()};return void 0!==r.status&&(n.push("status = @status"),o.status=r.status),void 0!==r.proof_url&&(n.push("proof_url = @proof_url"),o.proof_url=r.proof_url),void 0!==r.notes&&(n.push("notes = @notes"),o.notes=r.notes),void 0!==r.eft_reference&&(n.push("eft_reference = @eft_reference"),o.eft_reference=r.eft_reference),void 0!==r.tracking_number&&(n.push("tracking_number = @tracking_number"),o.tracking_number=r.tracking_number),n.length&&(n.push("updatedAt = @now"),a.prepare(`UPDATE orders SET ${n.join(", ")} WHERE id = @id`).run(o)),s(e)}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1xv33-z._.js.map