module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},70087,e=>{"use strict";var t=e.i(89171),r=e.i(69722);async function a(e){let a=e.nextUrl.searchParams.get("ref")?.trim();if(!a)return t.NextResponse.json({error:"Ref required"},{status:400});let n=(0,r.getOrder)(a);return n?t.NextResponse.json({ref:n.ref,status:n.status,name:n.name,createdAt:n.createdAt,updatedAt:n.updatedAt,items:n.items,total:n.total}):t.NextResponse.json({error:"Order not found"},{status:404})}e.s(["GET",0,a])},49334,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),s=e.i(61916),o=e.i(74677),i=e.i(69741),d=e.i(16795),l=e.i(87718),u=e.i(95169),T=e.i(47587),p=e.i(66012),c=e.i(70101),E=e.i(26937),N=e.i(10372),L=e.i(93695);e.i(52474);var m=e.i(220);let f=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/track-order/route",pathname:"/api/track-order",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/track-order/route.ts",nextConfigOutput:"",userland:()=>e.r(70087),...{}}),{workAsyncStorage:R,workUnitAsyncStorage:A,serverHooks:h}=f;async function x(e,t,a){a.requestMeta&&(0,n.setRequestMeta)(e,a.requestMeta),f.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/track-order/route";R=R.replace(/\/index$/,"")||"/";let A=await f.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!A)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:h,deploymentId:x,params:g,nextConfig:O,parsedUrl:U,isDraftMode:v,prerenderManifest:S,routerServerContext:y,isOnDemandRevalidate:X,revalidateOnlyGenerated:C,resolvedPathname:w,clientReferenceManifest:D,serverActionsManifest:I}=A,_=(0,i.normalizeAppPath)(R),b=!!(S.dynamicRoutes[_]||S.routes[w]),F=async()=>((null==y?void 0:y.render404)?await y.render404(e,t,U,!1):t.end("This page could not be found"),null);if(b&&!v){let e=!!S.routes[w],t=S.dynamicRoutes[_];if(t&&!1===t.fallback&&!e){if(O.adapterPath)return await F();throw new L.NoFallbackError}}let P=null;!b||f.isDev||v||(P="/index"===(P=w)?"/":P);let q=!0===f.isDev||!b,k=b&&!q;I&&D&&(0,o.setManifestsSingleton)({page:R,clientReferenceManifest:D,serverActionsManifest:I});let j=e.method||"GET",M=(0,s.getTracer)(),H=M.getActiveScopeSpan(),B=!!(null==y?void 0:y.isWrappedByNextServer),K=!!(0,n.getRequestMeta)(e,"minimalMode"),Y=(0,n.getRequestMeta)(e,"incrementalCache")||await f.getIncrementalCache(e,O,S,K);null==Y||Y.resetRequestCache(),globalThis.__incrementalCache=Y;let G={params:g,previewProps:S.preview,renderOpts:{experimental:{authInterrupts:!!O.experimental.authInterrupts,useCacheTimeout:O.experimental.useCacheTimeout},cacheComponents:!!O.cacheComponents,validationLevel:O.experimental.instantInsights.validationLevel,supportsDynamicResponse:q,incrementalCache:Y,hmrRefreshHash:(0,n.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:O.cacheLife,staticPageGenerationTimeout:O.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>f.onRequestError(e,t,a,n,y)},sharedContext:{buildId:h,deploymentId:x}},$=new d.NodeNextRequest(e),V=new d.NodeNextResponse(t),W=l.NextRequestAdapter.fromNodeNextRequest($,(0,l.signalFromNodeResponse)(t)),J=async({previousCacheEntry:r})=>{try{if(!K&&X&&C&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await f.handle(W,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let s=G.renderOpts.pendingWaitUntil;s&&a.waitUntil&&(a.waitUntil(s),s=void 0);let o=G.renderOpts.collectedTags;if(!b)return await (0,p.sendResponse)($,V,n,s),null;{let e=await n.blob(),t=(0,c.toNodeOutgoingHttpHeaders)(n.headers);o&&(t[N.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=N.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=N.INFINITE_CACHE?!1!==r&&r>0?O.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await f.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,T.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:X})},!1,y),t}},Q=async(n,o)=>{try{var i,d;let n=await f.handleResponse({req:e,nextConfig:O,cacheKey:P,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:X,revalidateOnlyGenerated:C,responseGenerator:J,waitUntil:a.waitUntil,isMinimalMode:K});if(!b)return;if((null==n||null==(i=n.value)?void 0:i.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==n||null==(d=n.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",X?"REVALIDATED":n.isMiss?"MISS":n.isStale?"STALE":"HIT"),v&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let s=(0,c.fromNodeOutgoingHttpHeaders)(n.value.headers);K&&b||s.delete(N.NEXT_CACHE_TAGS_HEADER),!n.cacheControl||t.getHeader("Cache-Control")||s.get("Cache-Control")||s.set("Cache-Control",(0,E.getCacheControlHeader)(n.cacheControl)),await (0,p.sendResponse)($,V,new Response(n.value.body,{headers:s,status:n.value.status||200}));return}catch(t){if(t instanceof L.NoFallbackError||await f.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,T.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:X})},!1,y),b)throw t;await (0,p.sendResponse)($,V,new Response(null,{status:500}));return}finally{(()=>{if(!n)return;let e=t.statusCode;n.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(n.setStatus({code:s.SpanStatusCode.ERROR}),n.setAttribute("error.type",e.toString()));let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==u.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||_,i=`${j} ${a}`;n.setAttributes({"next.route":a,"http.route":a,"next.span_name":i}),n.updateName(i),o&&o!==n&&(o.setAttribute("http.route",a),o.updateName(i))})()}};if(B&&H)await Q(H,void 0);else{let t=M.getActiveScopeSpan();await M.withPropagatedContext(e.headers,()=>M.trace(u.BaseServerSpan.handleRequest,{spanName:`${j} ${R}`,kind:s.SpanKind.SERVER,attributes:{"http.method":j,"http.target":e.url}},e=>Q(e,t)),void 0,!B)}}e.s(["handler",0,x,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:R,workUnitAsyncStorage:A})},"routeModule",0,f,"serverHooks",0,h,"workAsyncStorage",0,R,"workUnitAsyncStorage",0,A])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let n=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),s=r.default.join(n,"daisy.db"),o=null;e.s(["getDb",0,function(){return o||((0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(o=new t.default(s)).pragma("journal_mode = WAL"),o.pragma("foreign_keys = ON"),o.exec(`
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
        `);e.transaction(e=>{for(let r of e)t.run({...r,inStock:+!!r.inStock,featured:+!!r.featured})})(r)}}catch{}e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run("json_import_gadgets_v1")}(o)),o}])},69722,e=>{"use strict";var t=e.i(62294),r=e.i(54799);function a(e){let r=(0,t.getDb)().prepare("SELECT * FROM orders WHERE id = ? OR ref = ?").get(e,e);return r?n(r):null}function n(e){return{...e,items:JSON.parse(e.items)}}e.s(["createOrder",0,function(e){let n=(0,t.getDb)(),s=new Date().toISOString(),o=(0,r.randomBytes)(8).toString("hex"),i="DC-"+(0,r.randomBytes)(3).toString("hex").toUpperCase();return n.prepare(`
    INSERT INTO orders (id, ref, name, email, phone, address, items, total, status, payment_method, eft_reference, createdAt, updatedAt)
    VALUES (@id, @ref, @name, @email, @phone, @address, @items, @total, 'pending', 'eft', @eft_reference, @now, @now)
  `).run({id:o,ref:i,name:e.name,email:e.email,phone:e.phone,address:e.address,items:JSON.stringify(e.items),total:e.total,eft_reference:e.eft_reference??null,now:s}),a(o)},"getOrder",0,a,"listOrders",0,function(){return(0,t.getDb)().prepare("SELECT * FROM orders ORDER BY createdAt DESC").all().map(n)},"updateOrder",0,function(e,r){let n=(0,t.getDb)(),s=[],o={id:e,now:new Date().toISOString()};return void 0!==r.status&&(s.push("status = @status"),o.status=r.status),void 0!==r.proof_url&&(s.push("proof_url = @proof_url"),o.proof_url=r.proof_url),void 0!==r.notes&&(s.push("notes = @notes"),o.notes=r.notes),void 0!==r.eft_reference&&(s.push("eft_reference = @eft_reference"),o.eft_reference=r.eft_reference),s.length&&(s.push("updatedAt = @now"),n.prepare(`UPDATE orders SET ${s.join(", ")} WHERE id = @id`).run(o)),a(e)}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0nj-2gh._.js.map