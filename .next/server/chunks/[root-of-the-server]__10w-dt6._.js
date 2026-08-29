module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},84423,(e,t,r)=>{t.exports=e.x("nodemailer-9c35dd349a8aaa9f",()=>require("nodemailer-9c35dd349a8aaa9f"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},88387,e=>{"use strict";var t=e.i(89171),r=e.i(68105),n=e.i(39258),a=e.i(67010);let s=["new","reviewing","approved","awaiting_payment","active","completed","declined"];async function i(e,{params:o}){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:T}=await o,{status:d,admin_notes:E}=await e.json();if(!s.includes(d))return t.NextResponse.json({error:"Invalid status"},{status:400});let l=(0,n.getApplication)(T);if(!l)return t.NextResponse.json({error:"Not found"},{status:404});(0,n.updateApplicationStatus)(T,d,E);let p={name:l.name,email:l.email,ref:l.ref,product_name:l.product_name,product_price:l.product_price,deposit:l.deposit,monthly_payment:l.monthly_payment,term_months:l.term_months,total_repayable:l.total_repayable,phone:l.phone,admin_notes:E??l.admin_notes},c={reviewing:()=>(0,a.sendInstallmentReviewing)(p),approved:()=>(0,a.sendInstallmentApproval)(p),awaiting_payment:()=>(0,a.sendInstallmentAwaitingPayment)(p),active:()=>(0,a.sendInstallmentActive)(p),completed:()=>(0,a.sendInstallmentCompleted)(p),declined:()=>(0,a.sendInstallmentDeclined)(p)};return c[d]&&c[d]().catch(console.error),t.NextResponse.json({ok:!0})}async function o(e,{params:s}){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:i}=await s,{action:T}=await e.json();if("resend_invoice"!==T)return t.NextResponse.json({error:"Unknown action"},{status:400});let d=(0,n.getApplication)(i);return d?(await (0,a.sendInstallmentApproval)({name:d.name,email:d.email,ref:d.ref,product_name:d.product_name,product_price:d.product_price,deposit:d.deposit,monthly_payment:d.monthly_payment,term_months:d.term_months,total_repayable:d.total_repayable,phone:d.phone}),t.NextResponse.json({ok:!0})):t.NextResponse.json({error:"Not found"},{status:404})}e.s(["PATCH",0,i,"POST",0,o])},4632,e=>{"use strict";var t=e.i(47909),r=e.i(74017),n=e.i(96250),a=e.i(59756),s=e.i(61916),i=e.i(74677),o=e.i(69741),T=e.i(16795),d=e.i(87718),E=e.i(95169),l=e.i(47587),p=e.i(66012),c=e.i(70101),u=e.i(26937),N=e.i(10372),L=e.i(93695);e.i(52474);var m=e.i(220);let A=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/admin/installments/[id]/route",pathname:"/api/admin/installments/[id]",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/admin/installments/[id]/route.ts",nextConfigOutput:"",userland:()=>e.r(88387),...{}}),{workAsyncStorage:_,workUnitAsyncStorage:R,serverHooks:O}=A;async function U(e,t,n){n.requestMeta&&(0,a.setRequestMeta)(e,n.requestMeta),A.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let _="/api/admin/installments/[id]/route";_=_.replace(/\/index$/,"")||"/";let R=await A.prepare(e,t,{srcPage:_,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:O,deploymentId:U,params:g,nextConfig:h,parsedUrl:X,isDraftMode:v,prerenderManifest:I,routerServerContext:S,isOnDemandRevalidate:x,revalidateOnlyGenerated:f,resolvedPathname:C,clientReferenceManifest:D,serverActionsManifest:y}=R,b=(0,o.normalizeAppPath)(_),w=!!(I.dynamicRoutes[b]||I.routes[C]),F=async()=>((null==S?void 0:S.render404)?await S.render404(e,t,X,!1):t.end("This page could not be found"),null);if(w&&!v){let e=!!I.routes[C],t=I.dynamicRoutes[b];if(t&&!1===t.fallback&&!e){if(h.adapterPath)return await F();throw new L.NoFallbackError}}let M=null;!w||A.isDev||v||(M="/index"===(M=C)?"/":M);let P=!0===A.isDev||!w,B=w&&!P;y&&D&&(0,i.setManifestsSingleton)({page:_,clientReferenceManifest:D,serverActionsManifest:y});let k=e.method||"GET",q=(0,s.getTracer)(),j=q.getActiveScopeSpan(),Y=!!(null==S?void 0:S.isWrappedByNextServer),K=!!(0,a.getRequestMeta)(e,"minimalMode"),H=(0,a.getRequestMeta)(e,"incrementalCache")||await A.getIncrementalCache(e,h,I,K);null==H||H.resetRequestCache(),globalThis.__incrementalCache=H;let G={params:g,previewProps:I.preview,renderOpts:{experimental:{authInterrupts:!!h.experimental.authInterrupts,useCacheTimeout:h.experimental.useCacheTimeout},cacheComponents:!!h.cacheComponents,validationLevel:h.experimental.instantInsights.validationLevel,supportsDynamicResponse:P,incrementalCache:H,hmrRefreshHash:(0,a.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:h.cacheLife,staticPageGenerationTimeout:h.staticPageGenerationTimeout,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,a)=>A.onRequestError(e,t,n,a,S)},sharedContext:{buildId:O,deploymentId:U}},W=new T.NodeNextRequest(e),J=new T.NodeNextResponse(t),V=d.NextRequestAdapter.fromNodeNextRequest(W,(0,d.signalFromNodeResponse)(t)),$=async({previousCacheEntry:r})=>{try{if(!K&&x&&f&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await A.handle(V,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let s=G.renderOpts.pendingWaitUntil;s&&n.waitUntil&&(n.waitUntil(s),s=void 0);let i=G.renderOpts.collectedTags;if(!w)return await (0,p.sendResponse)(W,J,a,s),null;{let e=await a.blob(),t=(0,c.toNodeOutgoingHttpHeaders)(a.headers);i&&(t[N.NEXT_CACHE_TAGS_HEADER]=i),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=N.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,n=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=N.INFINITE_CACHE?!1!==r&&r>0?h.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==r?void 0:r.isStale)&&await A.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,l.getRevalidateReason)({isStaticGeneration:B,isOnDemandRevalidate:x})},!1,S),t}},Q=async(a,i)=>{try{var o,T;let a=await A.handleResponse({req:e,nextConfig:h,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:I,isRoutePPREnabled:!1,isOnDemandRevalidate:x,revalidateOnlyGenerated:f,responseGenerator:$,waitUntil:n.waitUntil,isMinimalMode:K});if(!w)return;if((null==a||null==(o=a.value)?void 0:o.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==a||null==(T=a.value)?void 0:T.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",x?"REVALIDATED":a.isMiss?"MISS":a.isStale?"STALE":"HIT"),v&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let s=(0,c.fromNodeOutgoingHttpHeaders)(a.value.headers);K&&w||s.delete(N.NEXT_CACHE_TAGS_HEADER),!a.cacheControl||t.getHeader("Cache-Control")||s.get("Cache-Control")||s.set("Cache-Control",(0,u.getCacheControlHeader)(a.cacheControl)),await (0,p.sendResponse)(W,J,new Response(a.value.body,{headers:s,status:a.value.status||200}));return}catch(t){if(t instanceof L.NoFallbackError||await A.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,l.getRevalidateReason)({isStaticGeneration:B,isOnDemandRevalidate:x})},!1,S),w)throw t;await (0,p.sendResponse)(W,J,new Response(null,{status:500}));return}finally{(()=>{if(!a)return;let e=t.statusCode;a.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(a.setStatus({code:s.SpanStatusCode.ERROR}),a.setAttribute("error.type",e.toString()));let r=q.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==E.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route")||b,o=`${k} ${n}`;a.setAttributes({"next.route":n,"http.route":n,"next.span_name":o}),a.updateName(o),i&&i!==a&&(i.setAttribute("http.route",n),i.updateName(o))})()}};if(Y&&j)await Q(j,void 0);else{let t=q.getActiveScopeSpan();await q.withPropagatedContext(e.headers,()=>q.trace(E.BaseServerSpan.handleRequest,{spanName:`${k} ${_}`,kind:s.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},e=>Q(e,t)),void 0,!Y)}}e.s(["handler",0,U,"patchFetch",0,function(){return(0,n.patchFetch)({workAsyncStorage:_,workUnitAsyncStorage:R})},"routeModule",0,A,"serverHooks",0,O,"workAsyncStorage",0,_,"workUnitAsyncStorage",0,R])},72507,e=>{"use strict";let t={name:"Bevans Sons",tagline:"Premium Clothing. Crafted for the Bold.",domain:"https://bevans-sons.onrender.com",whatsapp:"27724816274",phone:"0724816274",email:"MkhabeleEnterprise@gmail.com",currency:"ZAR",currencySymbol:"R",locale:"en-ZA",social:{instagram:process.env.NEXT_PUBLIC_INSTAGRAM??"",facebook:process.env.NEXT_PUBLIC_FACEBOOK??"",tiktok:process.env.NEXT_PUBLIC_TIKTOK??""},shipping:{freeThreshold:1500,standardDays:"3-5 business days",expressDays:"1-2 business days"}};e.s(["BRAND",0,t,"getAdminEmails",0,function(){return[process.env.ADMIN_EMAIL??"",process.env.ADMIN_EMAIL_2??""].filter(Boolean).join(", ")},"getBankConfig",0,function(){return{bank:process.env.BANK_NAME??"",accountHolder:process.env.BANK_ACCOUNT_HOLDER??"",accountType:process.env.BANK_ACCOUNT_TYPE??"Business Account",accountNumber:process.env.BANK_ACCOUNT_NUMBER??"",branchCode:process.env.BANK_BRANCH_CODE??""}},"parsePrice",0,function(e){return null==e?0:"number"==typeof e?e:parseFloat(String(e).replace(/[^0-9.]/g,""))||0}])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),n=e.i(22734);let a=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),s=r.default.join(a,"bevans.db"),i=null;function o(){var e;let r;return i||((0,n.existsSync)(a)||(0,n.mkdirSync)(a,{recursive:!0}),(i=new t.default(s)).pragma("journal_mode = WAL"),i.pragma("foreign_keys = ON"),(e=i).exec(`
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
  `),(r=t=>{try{e.exec(t)}catch{}})("ALTER TABLE orders ADD COLUMN bank_id TEXT"),r("ALTER TABLE orders ADD COLUMN tracking_number TEXT"),r("ALTER TABLE installment_applications ADD COLUMN product_imageUrl TEXT"),function(e){let t=t=>!!e.prepare("SELECT name FROM migrations WHERE name = ?").get(t),r=t=>e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run(t),n=t=>{try{e.exec(t)}catch{}};if(t("add_bevans_product_columns_v1")||(n("ALTER TABLE products ADD COLUMN slug TEXT NOT NULL DEFAULT ''"),n("ALTER TABLE products ADD COLUMN gender TEXT NOT NULL DEFAULT 'Unisex'"),n("ALTER TABLE products ADD COLUMN material TEXT NOT NULL DEFAULT ''"),n("ALTER TABLE products ADD COLUMN fit TEXT NOT NULL DEFAULT ''"),n("ALTER TABLE products ADD COLUMN newArrival INTEGER NOT NULL DEFAULT 0"),r("add_bevans_product_columns_v1")),t("create_product_variants_v1")||(e.exec(`
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
    `);let t=new Date().toISOString(),n=e.prepare("INSERT OR IGNORE INTO categories (id, name, gender, position, createdAt) VALUES (?, ?, ?, ?, ?)"),a=[["mens-tshirts","Men's T-Shirts","Men",0],["mens-hoodies","Men's Hoodies","Men",1],["mens-shirts","Men's Shirts","Men",2],["mens-jackets","Men's Jackets","Men",3],["mens-pants","Men's Pants","Men",4],["mens-shorts","Men's Shorts","Men",5],["womens-tops","Women's Tops","Women",0],["womens-dresses","Women's Dresses","Women",1],["womens-hoodies","Women's Hoodies","Women",2],["womens-jackets","Women's Jackets","Women",3],["womens-pants","Women's Pants","Women",4],["womens-shorts","Women's Shorts","Women",5],["unisex-tshirts","Unisex T-Shirts","Unisex",0],["unisex-hoodies","Unisex Hoodies","Unisex",1],["streetwear","Streetwear","Unisex",2],["caps","Caps","Accessories",0],["bags","Bags","Accessories",1],["sneakers","Sneakers","Accessories",2],["accessories","Accessories","Accessories",3]];e.transaction(()=>{for(let[e,r,s,i]of a)n.run(e,r,s,i,t)})(),r("create_categories_v1")}}(i)),i}e.s(["exportProductsJson",0,function(e){try{let t=(e??o()).prepare("SELECT * FROM products ORDER BY category, name").all();(0,n.existsSync)(a)||(0,n.mkdirSync)(a,{recursive:!0}),(0,n.writeFileSync)(r.default.join(a,"products-backup.json"),JSON.stringify(t,null,2))}catch{}},"getDb",0,o])},39258,e=>{"use strict";var t=e.i(62294),r=e.i(54799);function n(e){return{...e,eligible_terms:JSON.parse(e.eligible_terms),active:1===e.active}}function a(e){let r=(0,t.getDb)().prepare("SELECT * FROM installment_settings WHERE product_id = ? AND active = 1").get(e);return r?n(r):null}function s(e){return(0,t.getDb)().prepare("SELECT * FROM installment_applications WHERE id = ? OR ref = ?").get(e,e)||null}e.s(["calcMonthly",0,function(e,t,r,n,a){let s=e-t+a;if(0===n){let e=Math.ceil(s/r*100)/100;return{monthly:e,total:t+e*r,interest:0}}let i=Math.ceil(s*n*Math.pow(1+n,r)/(Math.pow(1+n,r)-1)*100)/100,o=i*r,T=Math.round((o-s)*100)/100;return{monthly:i,total:t+o,interest:T}},"createApplication",0,function(e){let n=(0,t.getDb)(),a=new Date().toISOString(),i=(0,r.randomBytes)(8).toString("hex"),o="IA-"+(0,r.randomBytes)(3).toString("hex").toUpperCase();return n.prepare(`
    INSERT INTO installment_applications
      (id, ref, product_id, product_name, product_price, product_imageUrl, term_months, monthly_payment,
       deposit, total_repayable, name, phone, email, id_number, address,
       status, whatsapp_clicked, createdAt, updatedAt)
    VALUES
      (@id, @ref, @product_id, @product_name, @product_price, @product_imageUrl, @term_months, @monthly_payment,
       @deposit, @total_repayable, @name, @phone, @email, @id_number, @address,
       'new', 0, @now, @now)
  `).run({id:i,ref:o,...e,product_imageUrl:e.product_imageUrl??null,now:a}),s(i)},"getApplication",0,s,"getEventStats",0,function(){return Object.fromEntries((0,t.getDb)().prepare("SELECT event, COUNT(*) as count FROM installment_events GROUP BY event").all().map(e=>[e.event,e.count]))},"getSettings",0,a,"listAllSettings",0,function(){return(0,t.getDb)().prepare("SELECT * FROM installment_settings ORDER BY createdAt DESC").all().map(n)},"listApplications",0,function(){return(0,t.getDb)().prepare("SELECT * FROM installment_applications ORDER BY createdAt DESC").all()},"trackEvent",0,function(e){let n=(0,t.getDb)(),a=(0,r.randomBytes)(8).toString("hex");n.prepare(`
    INSERT INTO installment_events (id, event, product_id, ref, term_months, metadata, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(a,e.event,e.product_id??null,e.ref??null,e.term_months??null,e.metadata?JSON.stringify(e.metadata):null,new Date().toISOString())},"updateApplicationStatus",0,function(e,r,n){let a=(0,t.getDb)(),s=new Date().toISOString();a.prepare("UPDATE installment_applications SET status = ?, admin_notes = COALESCE(?, admin_notes), updatedAt = ? WHERE id = ?").run(r,n??null,s,e)},"upsertSettings",0,function(e){let n=(0,t.getDb)(),s=new Date().toISOString();if(n.prepare("SELECT id FROM installment_settings WHERE product_id = ?").get(e.product_id))n.prepare(`
      UPDATE installment_settings
      SET min_deposit_pct = ?, eligible_terms = ?, monthly_rate = ?, admin_fee = ?, active = ?, updatedAt = ?
      WHERE product_id = ?
    `).run(e.min_deposit_pct,JSON.stringify(e.eligible_terms),e.monthly_rate,e.admin_fee,+!!e.active,s,e.product_id);else{let t=(0,r.randomBytes)(8).toString("hex");n.prepare(`
      INSERT INTO installment_settings
        (id, product_id, min_deposit_pct, eligible_terms, monthly_rate, admin_fee, active, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(t,e.product_id,e.min_deposit_pct,JSON.stringify(e.eligible_terms),e.monthly_rate,e.admin_fee,+!!e.active,s,s)}return a(e.product_id)}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__10w-dt6._.js.map