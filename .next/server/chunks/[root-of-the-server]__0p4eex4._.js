module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},31187,e=>{"use strict";var t=e.i(89171),r=e.i(68105),a=e.i(28746);async function n(e,{params:i}){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:s}=await i,o=(0,a.getProduct)(s);return o?t.NextResponse.json(o):t.NextResponse.json({error:"Not found"},{status:404})}async function i(e,{params:n}){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:s}=await n,o=await e.json(),d=(0,a.updateProduct)(s,o);return d?t.NextResponse.json(d):t.NextResponse.json({error:"Not found"},{status:404})}async function s(e,{params:n}){if(!await (0,r.isAuthenticated)())return t.NextResponse.json({error:"Unauthorized"},{status:401});let{id:i}=await n;return(0,a.deleteProduct)(i)?t.NextResponse.json({ok:!0}):t.NextResponse.json({error:"Not found"},{status:404})}e.s(["DELETE",0,s,"GET",0,n,"PUT",0,i])},1423,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),i=e.i(61916),s=e.i(74677),o=e.i(69741),d=e.i(16795),u=e.i(87718),c=e.i(95169),p=e.i(47587),l=e.i(66012),T=e.i(70101),E=e.i(26937),L=e.i(10372),N=e.i(93695);e.i(52474);var A=e.i(220);let m=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/admin/products/[id]/route",pathname:"/api/admin/products/[id]",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/admin/products/[id]/route.ts",nextConfigOutput:"",userland:()=>e.r(31187),...{}}),{workAsyncStorage:R,workUnitAsyncStorage:g,serverHooks:x}=m;async function f(e,t,a){a.requestMeta&&(0,n.setRequestMeta)(e,a.requestMeta),m.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/admin/products/[id]/route";R=R.replace(/\/index$/,"")||"/";let g=await m.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!g)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:x,deploymentId:f,params:U,nextConfig:h,parsedUrl:O,isDraftMode:S,prerenderManifest:v,routerServerContext:y,isOnDemandRevalidate:C,revalidateOnlyGenerated:X,resolvedPathname:w,clientReferenceManifest:D,serverActionsManifest:I}=g,P=(0,o.normalizeAppPath)(R),b=!!(v.dynamicRoutes[P]||v.routes[w]),k=async()=>((null==y?void 0:y.render404)?await y.render404(e,t,O,!1):t.end("This page could not be found"),null);if(b&&!S){let e=!!v.routes[w],t=v.dynamicRoutes[P];if(t&&!1===t.fallback&&!e){if(h.adapterPath)return await k();throw new N.NoFallbackError}}let F=null;!b||m.isDev||S||(F="/index"===(F=w)?"/":F);let j=!0===m.isDev||!b,q=b&&!j;I&&D&&(0,s.setManifestsSingleton)({page:R,clientReferenceManifest:D,serverActionsManifest:I});let _=e.method||"GET",M=(0,i.getTracer)(),H=M.getActiveScopeSpan(),B=!!(null==y?void 0:y.isWrappedByNextServer),K=!!(0,n.getRequestMeta)(e,"minimalMode"),Y=(0,n.getRequestMeta)(e,"incrementalCache")||await m.getIncrementalCache(e,h,v,K);null==Y||Y.resetRequestCache(),globalThis.__incrementalCache=Y;let G={params:U,previewProps:v.preview,renderOpts:{experimental:{authInterrupts:!!h.experimental.authInterrupts,useCacheTimeout:h.experimental.useCacheTimeout},cacheComponents:!!h.cacheComponents,validationLevel:h.experimental.instantInsights.validationLevel,supportsDynamicResponse:j,incrementalCache:Y,hmrRefreshHash:(0,n.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:h.cacheLife,staticPageGenerationTimeout:h.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>m.onRequestError(e,t,a,n,y)},sharedContext:{buildId:x,deploymentId:f}},$=new d.NodeNextRequest(e),V=new d.NodeNextResponse(t),W=u.NextRequestAdapter.fromNodeNextRequest($,(0,u.signalFromNodeResponse)(t)),z=async({previousCacheEntry:r})=>{try{if(!K&&C&&X&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await m.handle(W,G);e.fetchMetrics=G.renderOpts.fetchMetrics;let i=G.renderOpts.pendingWaitUntil;i&&a.waitUntil&&(a.waitUntil(i),i=void 0);let s=G.renderOpts.collectedTags;if(!b)return await (0,l.sendResponse)($,V,n,i),null;{let e=await n.blob(),t=(0,T.toNodeOutgoingHttpHeaders)(n.headers);s&&(t[L.NEXT_CACHE_TAGS_HEADER]=s),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==G.renderOpts.collectedRevalidate&&!(G.renderOpts.collectedRevalidate>=L.INFINITE_CACHE)&&G.renderOpts.collectedRevalidate,a=void 0===G.renderOpts.collectedExpire||G.renderOpts.collectedExpire>=L.INFINITE_CACHE?!1!==r&&r>0?h.expireTime:void 0:G.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await m.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:C})},!1,y),t}},Q=async(n,s)=>{try{var o,d;let n=await m.handleResponse({req:e,nextConfig:h,cacheKey:F,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:v,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:X,responseGenerator:z,waitUntil:a.waitUntil,isMinimalMode:K});if(!b)return;if((null==n||null==(o=n.value)?void 0:o.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==n||null==(d=n.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",C?"REVALIDATED":n.isMiss?"MISS":n.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let i=(0,T.fromNodeOutgoingHttpHeaders)(n.value.headers);K&&b||i.delete(L.NEXT_CACHE_TAGS_HEADER),!n.cacheControl||t.getHeader("Cache-Control")||i.get("Cache-Control")||i.set("Cache-Control",(0,E.getCacheControlHeader)(n.cacheControl)),await (0,l.sendResponse)($,V,new Response(n.value.body,{headers:i,status:n.value.status||200}));return}catch(t){if(t instanceof N.NoFallbackError||await m.onRequestError(e,t,{routerKind:"App Router",routePath:P,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:C})},!1,y),b)throw t;await (0,l.sendResponse)($,V,new Response(null,{status:500}));return}finally{(()=>{if(!n)return;let e=t.statusCode;n.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(n.setStatus({code:i.SpanStatusCode.ERROR}),n.setAttribute("error.type",e.toString()));let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==c.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||P,o=`${_} ${a}`;n.setAttributes({"next.route":a,"http.route":a,"next.span_name":o}),n.updateName(o),s&&s!==n&&(s.setAttribute("http.route",a),s.updateName(o))})()}};if(B&&H)await Q(H,void 0);else{let t=M.getActiveScopeSpan();await M.withPropagatedContext(e.headers,()=>M.trace(c.BaseServerSpan.handleRequest,{spanName:`${_} ${R}`,kind:i.SpanKind.SERVER,attributes:{"http.method":_,"http.target":e.url}},e=>Q(e,t)),void 0,!B)}}e.s(["handler",0,f,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:R,workUnitAsyncStorage:g})},"routeModule",0,m,"serverHooks",0,x,"workAsyncStorage",0,R,"workUnitAsyncStorage",0,g])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let n=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),i=r.default.join(n,"daisy.db"),s=null;e.s(["getDb",0,function(){return s||((0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(s=new t.default(i)).pragma("journal_mode = WAL"),s.pragma("foreign_keys = ON"),s.exec(`
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
        `);e.transaction(e=>{for(let r of e)t.run({...r,inStock:+!!r.inStock,featured:+!!r.featured})})(r)}}catch{}e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run("json_import_gadgets_v1")}(s)),s}])},28746,e=>{"use strict";var t=e.i(62294);function r(e){return{...e,inStock:1===e.inStock,featured:1===e.featured}}function a(e){let a=(0,t.getDb)().prepare("SELECT * FROM products WHERE id = ?").get(e);return a?r(a):void 0}e.s(["createProduct",0,function(e){let r=(0,t.getDb)(),n=new Date().toISOString(),i=`${Date.now()}`;return r.prepare(`
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0p4eex4._.js.map