module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},84423,(e,t,r)=>{t.exports=e.x("nodemailer-9c35dd349a8aaa9f",()=>require("nodemailer-9c35dd349a8aaa9f"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},45194,e=>{"use strict";var t=e.i(89171),r=e.i(84423),a=e.i(28746);function n(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let i=process.env.MAIL_USER&&process.env.MAIL_PASS?r.default.createTransport({service:"gmail",auth:{user:process.env.MAIL_USER,pass:process.env.MAIL_PASS}}):null;async function o(e){let{name:r,phone:o,email:s,type:d,message:l}=await e.json();if(!r||!o)return t.NextResponse.json({error:"Name and phone are required"},{status:400});if((0,a.saveLead)({name:r,phone:o,email:s,message:l||d,productInterest:d}),i)try{let e=String(o).replace(/[^0-9]/g,"");await i.sendMail({from:process.env.MAIL_USER,to:"daisygadgetsco@gmail.com",subject:`New Quote Request — ${n(d)} — ${n(r)}`,html:`
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#D4AF37;">New Quote Request — Daisy Gadgets Co.</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${n(r)}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0;font-weight:600">${n(o)}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0">${n(s)||"Not provided"}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Interested in</td><td style="padding:8px 0;font-weight:600">${n(d)}</td></tr>
              <tr><td style="padding:8px 0;color:#666;vertical-align:top">Message</td><td style="padding:8px 0">${n(l)||"No message"}</td></tr>
            </table>
            <hr style="margin:20px 0;border-color:#eee"/>
            <p style="color:#666;font-size:13px">Reply via WhatsApp: <a href="https://wa.me/${e}">wa.me/${e}</a></p>
          </div>
        `})}catch(e){console.error("Mail error:",e)}return t.NextResponse.json({ok:!0})}e.s(["POST",0,o])},22473,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),i=e.i(61916),o=e.i(74677),s=e.i(69741),d=e.i(16795),l=e.i(87718),p=e.i(95169),u=e.i(47587),c=e.i(66012),T=e.i(70101),E=e.i(26937),L=e.i(10372),g=e.i(93695);e.i(52474);var N=e.i(220);let m=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/quote/route",pathname:"/api/quote",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/quote/route.ts",nextConfigOutput:"",userland:()=>e.r(45194),...{}}),{workAsyncStorage:A,workUnitAsyncStorage:R,serverHooks:x}=m;async function f(e,t,a){a.requestMeta&&(0,n.setRequestMeta)(e,a.requestMeta),m.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let A="/api/quote/route";A=A.replace(/\/index$/,"")||"/";let R=await m.prepare(e,t,{srcPage:A,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:x,deploymentId:f,params:h,nextConfig:U,parsedUrl:S,isDraftMode:O,prerenderManifest:v,routerServerContext:y,isOnDemandRevalidate:C,revalidateOnlyGenerated:w,resolvedPathname:I,clientReferenceManifest:X,serverActionsManifest:D}=R,b=(0,s.normalizeAppPath)(A),P=!!(v.dynamicRoutes[b]||v.routes[I]),F=async()=>((null==y?void 0:y.render404)?await y.render404(e,t,S,!1):t.end("This page could not be found"),null);if(P&&!O){let e=!!v.routes[I],t=v.dynamicRoutes[b];if(t&&!1===t.fallback&&!e){if(U.adapterPath)return await F();throw new g.NoFallbackError}}let k=null;!P||m.isDev||O||(k="/index"===(k=I)?"/":k);let q=!0===m.isDev||!P,_=P&&!q;D&&X&&(0,o.setManifestsSingleton)({page:A,clientReferenceManifest:X,serverActionsManifest:D});let M=e.method||"GET",j=(0,i.getTracer)(),H=j.getActiveScopeSpan(),$=!!(null==y?void 0:y.isWrappedByNextServer),B=!!(0,n.getRequestMeta)(e,"minimalMode"),K=(0,n.getRequestMeta)(e,"incrementalCache")||await m.getIncrementalCache(e,U,v,B);null==K||K.resetRequestCache(),globalThis.__incrementalCache=K;let Y={params:h,previewProps:v.preview,renderOpts:{experimental:{authInterrupts:!!U.experimental.authInterrupts,useCacheTimeout:U.experimental.useCacheTimeout},cacheComponents:!!U.cacheComponents,validationLevel:U.experimental.instantInsights.validationLevel,supportsDynamicResponse:q,incrementalCache:K,hmrRefreshHash:(0,n.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:U.cacheLife,staticPageGenerationTimeout:U.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>m.onRequestError(e,t,a,n,y)},sharedContext:{buildId:x,deploymentId:f}},G=new d.NodeNextRequest(e),W=new d.NodeNextResponse(t),V=l.NextRequestAdapter.fromNodeNextRequest(G,(0,l.signalFromNodeResponse)(t)),Q=async({previousCacheEntry:r})=>{try{if(!B&&C&&w&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await m.handle(V,Y);e.fetchMetrics=Y.renderOpts.fetchMetrics;let i=Y.renderOpts.pendingWaitUntil;i&&a.waitUntil&&(a.waitUntil(i),i=void 0);let o=Y.renderOpts.collectedTags;if(!P)return await (0,c.sendResponse)(G,W,n,i),null;{let e=await n.blob(),t=(0,T.toNodeOutgoingHttpHeaders)(n.headers);o&&(t[L.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==Y.renderOpts.collectedRevalidate&&!(Y.renderOpts.collectedRevalidate>=L.INFINITE_CACHE)&&Y.renderOpts.collectedRevalidate,a=void 0===Y.renderOpts.collectedExpire||Y.renderOpts.collectedExpire>=L.INFINITE_CACHE?!1!==r&&r>0?U.expireTime:void 0:Y.renderOpts.collectedExpire;return{value:{kind:N.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await m.onRequestError(e,t,{routerKind:"App Router",routePath:A,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:_,isOnDemandRevalidate:C})},!1,y),t}},z=async(n,o)=>{try{var s,d;let n=await m.handleResponse({req:e,nextConfig:U,cacheKey:k,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:v,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:w,responseGenerator:Q,waitUntil:a.waitUntil,isMinimalMode:B});if(!P)return;if((null==n||null==(s=n.value)?void 0:s.kind)!==N.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==n||null==(d=n.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});B||t.setHeader("x-nextjs-cache",C?"REVALIDATED":n.isMiss?"MISS":n.isStale?"STALE":"HIT"),O&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let i=(0,T.fromNodeOutgoingHttpHeaders)(n.value.headers);B&&P||i.delete(L.NEXT_CACHE_TAGS_HEADER),!n.cacheControl||t.getHeader("Cache-Control")||i.get("Cache-Control")||i.set("Cache-Control",(0,E.getCacheControlHeader)(n.cacheControl)),await (0,c.sendResponse)(G,W,new Response(n.value.body,{headers:i,status:n.value.status||200}));return}catch(t){if(t instanceof g.NoFallbackError||await m.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:_,isOnDemandRevalidate:C})},!1,y),P)throw t;await (0,c.sendResponse)(G,W,new Response(null,{status:500}));return}finally{(()=>{if(!n)return;let e=t.statusCode;n.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(n.setStatus({code:i.SpanStatusCode.ERROR}),n.setAttribute("error.type",e.toString()));let r=j.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||b,s=`${M} ${a}`;n.setAttributes({"next.route":a,"http.route":a,"next.span_name":s}),n.updateName(s),o&&o!==n&&(o.setAttribute("http.route",a),o.updateName(s))})()}};if($&&H)await z(H,void 0);else{let t=j.getActiveScopeSpan();await j.withPropagatedContext(e.headers,()=>j.trace(p.BaseServerSpan.handleRequest,{spanName:`${M} ${A}`,kind:i.SpanKind.SERVER,attributes:{"http.method":M,"http.target":e.url}},e=>z(e,t)),void 0,!$)}}e.s(["handler",0,f,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:R})},"routeModule",0,m,"serverHooks",0,x,"workAsyncStorage",0,A,"workUnitAsyncStorage",0,R])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let n=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),i=r.default.join(n,"daisy.db"),o=null;e.s(["getDb",0,function(){return o||((0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(o=new t.default(i)).pragma("journal_mode = WAL"),o.pragma("foreign_keys = ON"),o.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      price       TEXT NOT NULL,
      category    TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      imageUrl    TEXT NOT NULL DEFAULT '',
      inStock     INTEGER NOT NULL DEFAULT 1,
      featured    INTEGER NOT NULL DEFAULT 0,
      createdAt   TEXT NOT NULL,
      updatedAt   TEXT NOT NULL
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

    CREATE TABLE IF NOT EXISTS quotes (
      id                TEXT PRIMARY KEY,
      ref               TEXT UNIQUE NOT NULL,
      name              TEXT NOT NULL DEFAULT '',
      phone             TEXT NOT NULL DEFAULT '',
      email             TEXT NOT NULL DEFAULT '',
      province          TEXT NOT NULL DEFAULT '',
      propertyType      TEXT NOT NULL DEFAULT '',
      monthlyBill       TEXT NOT NULL DEFAULT '',
      mainGoal          TEXT NOT NULL DEFAULT '',
      appliances        TEXT NOT NULL DEFAULT '[]',
      budget            TEXT NOT NULL DEFAULT '',
      recommendedPackage TEXT NOT NULL DEFAULT '',
      estimatedPrice    TEXT NOT NULL DEFAULT '',
      message           TEXT NOT NULL DEFAULT '',
      status            TEXT NOT NULL DEFAULT 'new',
      source            TEXT NOT NULL DEFAULT 'contact',
      createdAt         TEXT NOT NULL
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
      createdAt      TEXT NOT NULL,
      updatedAt      TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS site_images (
      key     TEXT PRIMARY KEY,
      url     TEXT NOT NULL,
      label   TEXT NOT NULL,
      section TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY
    );
  `),function(e){if(e.prepare("SELECT name FROM migrations WHERE name = ?").get("json_import_gadgets_v1"))return;let t=r.default.join(n,"products.json");if((0,a.existsSync)(t))try{let r=JSON.parse((0,a.readFileSync)(t,"utf-8"));if(Array.isArray(r)&&r.length>0){e.prepare("DELETE FROM products").run();let t=e.prepare(`
          INSERT OR REPLACE INTO products
            (id, name, price, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
          VALUES
            (@id, @name, @price, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
        `);e.transaction(e=>{for(let r of e)t.run({...r,inStock:+!!r.inStock,featured:+!!r.featured})})(r)}}catch{}e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run("json_import_gadgets_v1")}(o)),o}])},28746,e=>{"use strict";var t=e.i(62294);function r(e){return{...e,inStock:1===e.inStock,featured:1===e.featured}}function a(e){let a=(0,t.getDb)().prepare("SELECT * FROM products WHERE id = ?").get(e);return a?r(a):void 0}e.s(["createProduct",0,function(e){let r=(0,t.getDb)(),n=new Date().toISOString(),i=`${Date.now()}`;return r.prepare(`
    INSERT INTO products (id, name, price, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
    VALUES (@id, @name, @price, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
  `).run({id:i,...e,inStock:+!!e.inStock,featured:+!!e.featured,createdAt:n,updatedAt:n}),a(i)},"deleteProduct",0,function(e){return(0,t.getDb)().prepare("DELETE FROM products WHERE id = ?").run(e).changes>0},"getProduct",0,a,"getProducts",0,function(){return(0,t.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(r)},"saveLead",0,function(e){let r=(0,t.getDb)(),a=`${Date.now()}`;r.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (@id, @name, @email, @phone, @message, @productInterest, @createdAt)
  `).run({id:a,...e,createdAt:new Date().toISOString()})},"updateProduct",0,function(e,r){if(!a(e))return null;let n=new Date().toISOString();return(0,t.getDb)().prepare(`
    UPDATE products SET
      name = COALESCE(@name, name),
      price = COALESCE(@price, price),
      category = COALESCE(@category, category),
      description = COALESCE(@description, description),
      imageUrl = COALESCE(@imageUrl, imageUrl),
      inStock = COALESCE(@inStock, inStock),
      featured = COALESCE(@featured, featured),
      updatedAt = @updatedAt
    WHERE id = @id
  `).run({id:e,updatedAt:n,name:r.name??null,price:r.price??null,category:r.category??null,description:r.description??null,imageUrl:r.imageUrl??null,inStock:void 0!==r.inStock?+!!r.inStock:null,featured:void 0!==r.featured?+!!r.featured:null}),a(e)}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__215d5vm._.js.map