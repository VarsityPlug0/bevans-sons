module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},31187,e=>{"use strict";var t=e.i(89171),r=e.i(68105),a=e.i(28746),n=e.i(62294);async function i(e,{params:n}){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:s}=await n,o=(0,a.getProduct)(s);return o?t.NextResponse.json(o):t.NextResponse.json({error:"Not found"},{status:404})}async function s(e,{params:i}){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:o}=await i,T=await e.json(),E=(0,a.updateProduct)(o,T);return E?((0,n.exportProductsJson)(),t.NextResponse.json(E)):t.NextResponse.json({error:"Not found"},{status:404})}async function o(e,{params:i}){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:s}=await i,T=await e.json(),E=(0,a.updateProduct)(s,T);return E?((0,n.exportProductsJson)(),t.NextResponse.json(E)):t.NextResponse.json({error:"Not found"},{status:404})}async function T(e,{params:i}){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:s}=await i;return(0,a.deleteProduct)(s)?((0,n.exportProductsJson)(),t.NextResponse.json({ok:!0})):t.NextResponse.json({error:"Not found"},{status:404})}e.s(["DELETE",0,T,"GET",0,i,"PATCH",0,o,"PUT",0,s])},1423,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),i=e.i(61916),s=e.i(74677),o=e.i(69741),T=e.i(16795),E=e.i(87718),d=e.i(95169),c=e.i(47587),u=e.i(66012),l=e.i(70101),p=e.i(26937),L=e.i(10372),N=e.i(93695);e.i(52474);var A=e.i(220);let R=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/admin/products/[id]/route",pathname:"/api/admin/products/[id]",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/admin/products/[id]/route.ts",nextConfigOutput:"",userland:()=>e.r(31187),...{}}),{workAsyncStorage:O,workUnitAsyncStorage:m,serverHooks:U}=R;async function g(e,t,a){a.requestMeta&&(0,n.setRequestMeta)(e,a.requestMeta),R.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let O="/api/admin/products/[id]/route";O=O.replace(/\/index$/,"")||"/";let m=await R.prepare(e,t,{srcPage:O,multiZoneDraftMode:!1});if(!m)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:U,deploymentId:g,params:S,nextConfig:X,parsedUrl:v,isDraftMode:I,prerenderManifest:f,routerServerContext:C,isOnDemandRevalidate:D,revalidateOnlyGenerated:_,resolvedPathname:x,clientReferenceManifest:h,serverActionsManifest:w}=m,F=(0,o.normalizeAppPath)(O),P=!!(f.dynamicRoutes[F]||f.routes[x]),y=async()=>((null==C?void 0:C.render404)?await C.render404(e,t,v,!1):t.end("This page could not be found"),null);if(P&&!I){let e=!!f.routes[x],t=f.dynamicRoutes[F];if(t&&!1===t.fallback&&!e){if(X.adapterPath)return await y();throw new N.NoFallbackError}}let M=null;!P||R.isDev||I||(M="/index"===(M=x)?"/":M);let b=!0===R.isDev||!P,k=P&&!b;w&&h&&(0,s.setManifestsSingleton)({page:O,clientReferenceManifest:h,serverActionsManifest:w});let B=e.method||"GET",Y=(0,i.getTracer)(),j=Y.getActiveScopeSpan(),q=!!(null==C?void 0:C.isWrappedByNextServer),H=!!(0,n.getRequestMeta)(e,"minimalMode"),W=(0,n.getRequestMeta)(e,"incrementalCache")||await R.getIncrementalCache(e,X,f,H);null==W||W.resetRequestCache(),globalThis.__incrementalCache=W;let K={params:S,previewProps:f.preview,renderOpts:{experimental:{authInterrupts:!!X.experimental.authInterrupts,useCacheTimeout:X.experimental.useCacheTimeout},cacheComponents:!!X.cacheComponents,validationLevel:X.experimental.instantInsights.validationLevel,supportsDynamicResponse:b,incrementalCache:W,hmrRefreshHash:(0,n.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:X.cacheLife,staticPageGenerationTimeout:X.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>R.onRequestError(e,t,a,n,C)},sharedContext:{buildId:U,deploymentId:g}},G=new T.NodeNextRequest(e),$=new T.NodeNextResponse(t),V=E.NextRequestAdapter.fromNodeNextRequest(G,(0,E.signalFromNodeResponse)(t)),z=async({previousCacheEntry:r})=>{try{if(!H&&D&&_&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await R.handle(V,K);e.fetchMetrics=K.renderOpts.fetchMetrics;let i=K.renderOpts.pendingWaitUntil;i&&a.waitUntil&&(a.waitUntil(i),i=void 0);let s=K.renderOpts.collectedTags;if(!P)return await (0,u.sendResponse)(G,$,n,i),null;{let e=await n.blob(),t=(0,l.toNodeOutgoingHttpHeaders)(n.headers);s&&(t[L.NEXT_CACHE_TAGS_HEADER]=s),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=L.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,a=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=L.INFINITE_CACHE?!1!==r&&r>0?X.expireTime:void 0:K.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await R.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:D})},!1,C),t}},J=async(n,s)=>{try{var o,T;let n=await R.handleResponse({req:e,nextConfig:X,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:f,isRoutePPREnabled:!1,isOnDemandRevalidate:D,revalidateOnlyGenerated:_,responseGenerator:z,waitUntil:a.waitUntil,isMinimalMode:H});if(!P)return;if((null==n||null==(o=n.value)?void 0:o.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==n||null==(T=n.value)?void 0:T.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});H||t.setHeader("x-nextjs-cache",D?"REVALIDATED":n.isMiss?"MISS":n.isStale?"STALE":"HIT"),I&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let i=(0,l.fromNodeOutgoingHttpHeaders)(n.value.headers);H&&P||i.delete(L.NEXT_CACHE_TAGS_HEADER),!n.cacheControl||t.getHeader("Cache-Control")||i.get("Cache-Control")||i.set("Cache-Control",(0,p.getCacheControlHeader)(n.cacheControl)),await (0,u.sendResponse)(G,$,new Response(n.value.body,{headers:i,status:n.value.status||200}));return}catch(t){if(t instanceof N.NoFallbackError||await R.onRequestError(e,t,{routerKind:"App Router",routePath:F,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:D})},!1,C),P)throw t;await (0,u.sendResponse)(G,$,new Response(null,{status:500}));return}finally{(()=>{if(!n)return;let e=t.statusCode;n.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(n.setStatus({code:i.SpanStatusCode.ERROR}),n.setAttribute("error.type",e.toString()));let r=Y.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||F,o=`${B} ${a}`;n.setAttributes({"next.route":a,"http.route":a,"next.span_name":o}),n.updateName(o),s&&s!==n&&(s.setAttribute("http.route",a),s.updateName(o))})()}};if(q&&j)await J(j,void 0);else{let t=Y.getActiveScopeSpan();await Y.withPropagatedContext(e.headers,()=>Y.trace(d.BaseServerSpan.handleRequest,{spanName:`${B} ${O}`,kind:i.SpanKind.SERVER,attributes:{"http.method":B,"http.target":e.url}},e=>J(e,t)),void 0,!q)}}e.s(["handler",0,g,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:O,workUnitAsyncStorage:m})},"routeModule",0,R,"serverHooks",0,U,"workAsyncStorage",0,O,"workUnitAsyncStorage",0,m])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let n=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),i=r.default.join(n,"bevans.db"),s=null;function o(){var e;let r;return s||((0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(s=new t.default(i)).pragma("journal_mode = WAL"),s.pragma("foreign_keys = ON"),(e=s).exec(`
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
    `);let t=new Date().toISOString(),a=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),n=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,r,i,s]of n)a.run(e,r,i,s,t)})(),r("create_categories_v1")}}(s)),s}e.s(["exportProductsJson",0,function(e){try{let t=(e??o()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(0,a.writeFileSync)(r.default.join(n,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,o])},28746,67357,e=>{"use strict";var t=e.i(62294);function r(e){return{...e,stock:Number(e.stock),price_override:null!=e.price_override?Number(e.price_override):null}}function a(e){return(0,t.getDb)().prepare("SELECT * FROM product_variants WHERE product_id = ? ORDER BY colour, size").all(e).map(r)}function n(e){return{...e,inStock:1===e.inStock,featured:1===e.featured,newArrival:1===e.newArrival,gender:e.gender??null,material:e.material??null,fit:e.fit??null,slug:e.slug??e.id}}function i(){return(0,t.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(n)}function s(e){let r=(0,t.getDb)().prepare("SELECT * FROM products WHERE id = ? OR slug = ?").get(e,e);return r?n(r):void 0}e.s(["getVariant",0,function(e){let a=(0,t.getDb)().prepare("SELECT * FROM product_variants WHERE id = ?").get(e);return a?r(a):null},"getVariantsByProduct",0,a],67357),e.s(["createProduct",0,function(e){var r;let a,n=(0,t.getDb)(),i=new Date().toISOString(),o=`${Date.now()}`,T=e.slug||(r=e.name,a=r.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),`${a}-${o.slice(-6)}`);return n.prepare(`
    INSERT INTO products (id, name, slug, price, originalPrice, category, gender, description, imageUrl, material, fit, newArrival, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @slug, @price, @originalPrice, @category, @gender, @description, @imageUrl, @material, @fit, @newArrival, @inStock, @featured, @createdAt, @updatedAt)
  `).run({id:o,name:e.name,slug:T,price:e.price,originalPrice:e.originalPrice??"",category:e.category,gender:e.gender??null,description:e.description,imageUrl:e.imageUrl,material:e.material??null,fit:e.fit??null,newArrival:+!!e.newArrival,inStock:+!!e.inStock,featured:+!!e.featured,createdAt:i,updatedAt:i}),s(o)},"deleteProduct",0,function(e){return(0,t.getDb)().prepare("DELETE FROM products WHERE id = ?").run(e).changes>0},"getCartEvents",0,function(){return(0,t.getDb)().prepare(`
    SELECT c.*, v.name AS visitorName, v.phone AS visitorPhone, v.email AS visitorEmail
    FROM cart_events c
    LEFT JOIN visitors v ON c.visitorId = v.id
    ORDER BY c.createdAt DESC
    LIMIT 200
  `).all()},"getFeaturedProducts",0,function(e=8){return(0,t.getDb)().prepare("SELECT * FROM products WHERE featured = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e).map(n)},"getLeads",0,function(){return(0,t.getDb)().prepare("SELECT * FROM leads ORDER BY createdAt DESC").all()},"getNewArrivals",0,function(e=8){return(0,t.getDb)().prepare("SELECT * FROM products WHERE newArrival = 1 AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e).map(n)},"getProduct",0,s,"getProductWithVariants",0,function(e){let t=s(e);if(t)return{...t,variants:a(t.id)}},"getProducts",0,i,"getProductsByCategory",0,function(e,r=24){return(0,t.getDb)().prepare("SELECT * FROM products WHERE category = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e,r).map(n)},"getProductsByGender",0,function(e,r=24){return(0,t.getDb)().prepare("SELECT * FROM products WHERE gender = ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(e,r).map(n)},"getProductsWithVariants",0,function(){return i().map(e=>({...e,variants:a(e.id)}))},"getRelated",0,function(e,r,a=4){return(0,t.getDb)().prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(r,e,a).map(n)},"getSaleProducts",0,function(e=24){return(0,t.getDb)().prepare("SELECT * FROM products WHERE inStock = 1 AND originalPrice IS NOT NULL AND originalPrice != '' ORDER BY createdAt DESC LIMIT ?").all(e).map(n)},"saveLead",0,function(e){let r=(0,t.getDb)(),a=`${Date.now()}`;r.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (@id, @name, @email, @phone, @message, @productInterest, @createdAt)
  `).run({id:a,...e,createdAt:new Date().toISOString()})},"updateProduct",0,function(e,r){if(!s(e))return null;let a=new Date().toISOString();return(0,t.getDb)().prepare(`
    UPDATE products SET
      name         = COALESCE(@name, name),
      slug         = COALESCE(@slug, slug),
      price        = COALESCE(@price, price),
      originalPrice= COALESCE(@originalPrice, originalPrice),
      category     = COALESCE(@category, category),
      gender       = COALESCE(@gender, gender),
      description  = COALESCE(@description, description),
      imageUrl     = COALESCE(@imageUrl, imageUrl),
      material     = COALESCE(@material, material),
      fit          = COALESCE(@fit, fit),
      newArrival   = COALESCE(@newArrival, newArrival),
      inStock      = COALESCE(@inStock, inStock),
      featured     = COALESCE(@featured, featured),
      updatedAt    = @updatedAt
    WHERE id = @id
  `).run({id:e,updatedAt:a,name:r.name??null,slug:r.slug??null,price:r.price??null,originalPrice:r.originalPrice??null,category:r.category??null,gender:r.gender??null,description:r.description??null,imageUrl:r.imageUrl??null,material:r.material??null,fit:r.fit??null,newArrival:void 0!==r.newArrival?+!!r.newArrival:null,inStock:void 0!==r.inStock?+!!r.inStock:null,featured:void 0!==r.featured?+!!r.featured:null}),s(e)}],28746)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1o2hb4s._.js.map