module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},91242,e=>{"use strict";var t=e.i(89171),r=e.i(62294),a=e.i(54799);async function n(e){let{name:n,phone:s,email:i,type:o,message:T}=await e.json();if(!n||!s||!T)return t.NextResponse.json({error:"Name, phone and message are required"},{status:400});let d=(0,r.getDb)(),l=(0,a.randomBytes)(8).toString("hex"),u=new Date().toISOString();return d.prepare(`
    INSERT INTO leads (id, name, email, phone, message, productInterest, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(l,String(n).slice(0,200),String(i??"").slice(0,200),String(s).slice(0,50),String(T).slice(0,2e3),String(o??"General Enquiry").slice(0,100),u),t.NextResponse.json({ok:!0})}e.s(["POST",0,n])},10044,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),s=e.i(61916),i=e.i(74677),o=e.i(69741),T=e.i(16795),d=e.i(87718),l=e.i(95169),u=e.i(47587),p=e.i(66012),c=e.i(70101),E=e.i(26937),N=e.i(10372),L=e.i(93695);e.i(52474);var R=e.i(220);let m=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/contact/route.ts",nextConfigOutput:"",userland:()=>e.r(91242),...{}}),{workAsyncStorage:x,workUnitAsyncStorage:A,serverHooks:h}=m;async function g(e,t,a){a.requestMeta&&(0,n.setRequestMeta)(e,a.requestMeta),m.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let x="/api/contact/route";x=x.replace(/\/index$/,"")||"/";let A=await m.prepare(e,t,{srcPage:x,multiZoneDraftMode:!1});if(!A)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:h,deploymentId:g,params:U,nextConfig:O,parsedUrl:f,isDraftMode:v,prerenderManifest:S,routerServerContext:X,isOnDemandRevalidate:y,revalidateOnlyGenerated:I,resolvedPathname:w,clientReferenceManifest:C,serverActionsManifest:D}=A,F=(0,o.normalizeAppPath)(x),b=!!(S.dynamicRoutes[F]||S.routes[w]),q=async()=>((null==X?void 0:X.render404)?await X.render404(e,t,f,!1):t.end("This page could not be found"),null);if(b&&!v){let e=!!S.routes[w],t=S.dynamicRoutes[F];if(t&&!1===t.fallback&&!e){if(O.adapterPath)return await q();throw new L.NoFallbackError}}let P=null;!b||m.isDev||v||(P="/index"===(P=w)?"/":P);let _=!0===m.isDev||!b,j=b&&!_;D&&C&&(0,i.setManifestsSingleton)({page:x,clientReferenceManifest:C,serverActionsManifest:D});let k=e.method||"GET",M=(0,s.getTracer)(),H=M.getActiveScopeSpan(),B=!!(null==X?void 0:X.isWrappedByNextServer),K=!!(0,n.getRequestMeta)(e,"minimalMode"),Y=(0,n.getRequestMeta)(e,"incrementalCache")||await m.getIncrementalCache(e,O,S,K);null==Y||Y.resetRequestCache(),globalThis.__incrementalCache=Y;let G={params:U,previewProps:S.preview,renderOpts:{experimental:{authInterrupts:!!O.experimental.authInterrupts,useCacheTimeout:O.experimental.useCacheTimeout},cacheComponents:!!O.cacheComponents,validationLevel:O.experimental.instantInsights.validationLevel,supportsDynamicResponse:_,incrementalCache:Y,hmrRefreshHash:(0,n.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:O.cacheLife,staticPageGenerationTimeout:O.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>m.onRequestError(e,t,a,n,X)},sharedContext:{buildId:h,deploymentId:g}},$=new T.NodeNextRequest(e),V=new T.NodeNextResponse(t),W=d.NextRequestAdapter.fromNodeNextRequest($,(0,d.signalFromNodeResponse)(t)),Q=async({previousCacheEntry:r})=>{try{if(!K&&y&&I&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await m.handle(W,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let s=G.renderOpts.pendingWaitUntil;s&&a.waitUntil&&(a.waitUntil(s),s=void 0);let i=G.renderOpts.collectedTags;if(!b)return await (0,p.sendResponse)($,V,n,s),null;{let e=await n.blob(),t=(0,c.toNodeOutgoingHttpHeaders)(n.headers);i&&(t[N.NEXT_CACHE_TAGS_HEADER]=i),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=N.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=N.INFINITE_CACHE?!1!==r&&r>0?O.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:R.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await m.onRequestError(e,t,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:y})},!1,X),t}},z=async(n,i)=>{try{var o,T;let n=await m.handleResponse({req:e,nextConfig:O,cacheKey:P,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:y,revalidateOnlyGenerated:I,responseGenerator:Q,waitUntil:a.waitUntil,isMinimalMode:K});if(!b)return;if((null==n||null==(o=n.value)?void 0:o.kind)!==R.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==n||null==(T=n.value)?void 0:T.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",y?"REVALIDATED":n.isMiss?"MISS":n.isStale?"STALE":"HIT"),v&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let s=(0,c.fromNodeOutgoingHttpHeaders)(n.value.headers);K&&b||s.delete(N.NEXT_CACHE_TAGS_HEADER),!n.cacheControl||t.getHeader("Cache-Control")||s.get("Cache-Control")||s.set("Cache-Control",(0,E.getCacheControlHeader)(n.cacheControl)),await (0,p.sendResponse)($,V,new Response(n.value.body,{headers:s,status:n.value.status||200}));return}catch(t){if(t instanceof L.NoFallbackError||await m.onRequestError(e,t,{routerKind:"App Router",routePath:F,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:y})},!1,X),b)throw t;await (0,p.sendResponse)($,V,new Response(null,{status:500}));return}finally{(()=>{if(!n)return;let e=t.statusCode;n.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(n.setStatus({code:s.SpanStatusCode.ERROR}),n.setAttribute("error.type",e.toString()));let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==l.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||F,o=`${k} ${a}`;n.setAttributes({"next.route":a,"http.route":a,"next.span_name":o}),n.updateName(o),i&&i!==n&&(i.setAttribute("http.route",a),i.updateName(o))})()}};if(B&&H)await z(H,void 0);else{let t=M.getActiveScopeSpan();await M.withPropagatedContext(e.headers,()=>M.trace(l.BaseServerSpan.handleRequest,{spanName:`${k} ${x}`,kind:s.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},e=>z(e,t)),void 0,!B)}}e.s(["handler",0,g,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:x,workUnitAsyncStorage:A})},"routeModule",0,m,"serverHooks",0,h,"workAsyncStorage",0,x,"workUnitAsyncStorage",0,A])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let n=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),s=r.default.join(n,"daisy.db"),i=null;e.s(["getDb",0,function(){return i||((0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(i=new t.default(s)).pragma("journal_mode = WAL"),i.pragma("foreign_keys = ON"),i.exec(`
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
        `);e.transaction(e=>{for(let r of e)t.run({...r,inStock:+!!r.inStock,featured:+!!r.featured})})(r)}}catch{}e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run("json_import_gadgets_v1")}(i)),i}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0udjmc6._.js.map