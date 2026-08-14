module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},94480,(e,t,r)=>{t.exports=e.x("cloudinary-f9f069d0ba9c5439",()=>require("cloudinary-f9f069d0ba9c5439"))},82784,e=>{"use strict";var t=e.i(94480);async function r(e,r){let a=r.startsWith("proof-")?"daisy-co/proofs":"daisy-co/products",n=`${a}/${Date.now()}-${r.replace(/\.[^.]+$/,"").replace(/[^a-z0-9]/gi,"-")}`,o=r.toLowerCase().endsWith(".pdf");return new Promise((r,a)=>{t.v2.uploader.upload_stream({public_id:n,overwrite:!0,resource_type:o?"raw":"image",...o?{}:{transformation:[{width:1400,quality:"auto:good",fetch_format:"auto"}]}},(e,t)=>{e||!t?a(e??Error("Upload failed")):r(t.secure_url)}).end(e)})}t.v2.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET}),e.s(["isConfigured",0,function(){return!!(process.env.CLOUDINARY_CLOUD_NAME&&process.env.CLOUDINARY_API_KEY&&process.env.CLOUDINARY_API_SECRET)},"uploadImage",0,r])},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},25110,e=>{"use strict";var t=e.i(89171),r=e.i(82784),a=e.i(69722),n=e.i(22734),o=e.i(14747);async function s(e){try{let s,{file:i,mimeType:d,filename:p,orderId:l,ref:u}=await e.json();if(!i||!d||!p)return t.NextResponse.json({error:"No file provided"},{status:400});let c=Buffer.from(i,"base64");if(c.length>8388608)return t.NextResponse.json({error:"File too large (max 8 MB)"},{status:400});if(!["image/jpeg","image/png","image/webp","image/heic","application/pdf"].includes(d))return t.NextResponse.json({error:"Invalid file type. Upload JPG, PNG, WEBP or PDF."},{status:400});if((0,r.isConfigured)())s=await (0,r.uploadImage)(c,`proof-${u??l??"order"}-${p}`);else{let e=o.default.join(process.cwd(),"public","uploads","proofs");(0,n.existsSync)(e)||(0,n.mkdirSync)(e,{recursive:!0});let t=p.split(".").pop()??"jpg",r=`proof-${u??l??"order"}-${Date.now()}.${t}`;(0,n.writeFileSync)(o.default.join(e,r),c),s=`/uploads/proofs/${r}`}return(l||u)&&(0,a.updateOrder)(l??u,{proof_url:s,status:"proof_submitted"}),t.NextResponse.json({ok:!0,url:s})}catch(r){let e=r instanceof Error?r.message:JSON.stringify(r);return console.error("upload-proof error:",e,r),t.NextResponse.json({error:e},{status:500})}}e.s(["POST",0,s,"runtime",0,"nodejs"])},39167,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),o=e.i(61916),s=e.i(74677),i=e.i(69741),d=e.i(16795),p=e.i(87718),l=e.i(95169),u=e.i(47587),c=e.i(66012),T=e.i(70101),E=e.i(26937),f=e.i(10372),N=e.i(93695);e.i(52474);var L=e.i(220);let m=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/upload-proof/route",pathname:"/api/upload-proof",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/upload-proof/route.ts",nextConfigOutput:"",userland:()=>e.r(25110),...{}}),{workAsyncStorage:R,workUnitAsyncStorage:g,serverHooks:A}=m;async function h(e,t,a){a.requestMeta&&(0,n.setRequestMeta)(e,a.requestMeta),m.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/upload-proof/route";R=R.replace(/\/index$/,"")||"/";let g=await m.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!g)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:A,deploymentId:h,params:x,nextConfig:O,parsedUrl:U,isDraftMode:v,prerenderManifest:y,routerServerContext:S,isOnDemandRevalidate:_,revalidateOnlyGenerated:C,resolvedPathname:w,clientReferenceManifest:I,serverActionsManifest:D}=g,X=(0,i.normalizeAppPath)(R),b=!!(y.dynamicRoutes[X]||y.routes[w]),P=async()=>((null==S?void 0:S.render404)?await S.render404(e,t,U,!1):t.end("This page could not be found"),null);if(b&&!v){let e=!!y.routes[w],t=y.dynamicRoutes[X];if(t&&!1===t.fallback&&!e){if(O.adapterPath)return await P();throw new N.NoFallbackError}}let F=null;!b||m.isDev||v||(F="/index"===(F=w)?"/":F);let j=!0===m.isDev||!b,q=b&&!j;D&&I&&(0,s.setManifestsSingleton)({page:R,clientReferenceManifest:I,serverActionsManifest:D});let k=e.method||"GET",M=(0,o.getTracer)(),H=M.getActiveScopeSpan(),Y=!!(null==S?void 0:S.isWrappedByNextServer),B=!!(0,n.getRequestMeta)(e,"minimalMode"),$=(0,n.getRequestMeta)(e,"incrementalCache")||await m.getIncrementalCache(e,O,y,B);null==$||$.resetRequestCache(),globalThis.__incrementalCache=$;let K={params:x,previewProps:y.preview,renderOpts:{experimental:{authInterrupts:!!O.experimental.authInterrupts,useCacheTimeout:O.experimental.useCacheTimeout},cacheComponents:!!O.cacheComponents,validationLevel:O.experimental.instantInsights.validationLevel,supportsDynamicResponse:j,incrementalCache:$,hmrRefreshHash:(0,n.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:O.cacheLife,staticPageGenerationTimeout:O.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>m.onRequestError(e,t,a,n,S)},sharedContext:{buildId:A,deploymentId:h}},G=new d.NodeNextRequest(e),W=new d.NodeNextResponse(t),V=p.NextRequestAdapter.fromNodeNextRequest(G,(0,p.signalFromNodeResponse)(t)),J=async({previousCacheEntry:r})=>{try{if(!B&&_&&C&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await m.handle(V,K);e.fetchMetrics=K.renderOpts.fetchMetrics;let o=K.renderOpts.pendingWaitUntil;o&&a.waitUntil&&(a.waitUntil(o),o=void 0);let s=K.renderOpts.collectedTags;if(!b)return await (0,c.sendResponse)(G,W,n,o),null;{let e=await n.blob(),t=(0,T.toNodeOutgoingHttpHeaders)(n.headers);s&&(t[f.NEXT_CACHE_TAGS_HEADER]=s),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=f.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,a=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=f.INFINITE_CACHE?!1!==r&&r>0?O.expireTime:void 0:K.renderOpts.collectedExpire;return{value:{kind:L.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await m.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:_})},!1,S),t}},z=async(n,s)=>{try{var i,d;let n=await m.handleResponse({req:e,nextConfig:O,cacheKey:F,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:y,isRoutePPREnabled:!1,isOnDemandRevalidate:_,revalidateOnlyGenerated:C,responseGenerator:J,waitUntil:a.waitUntil,isMinimalMode:B});if(!b)return;if((null==n||null==(i=n.value)?void 0:i.kind)!==L.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==n||null==(d=n.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});B||t.setHeader("x-nextjs-cache",_?"REVALIDATED":n.isMiss?"MISS":n.isStale?"STALE":"HIT"),v&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let o=(0,T.fromNodeOutgoingHttpHeaders)(n.value.headers);B&&b||o.delete(f.NEXT_CACHE_TAGS_HEADER),!n.cacheControl||t.getHeader("Cache-Control")||o.get("Cache-Control")||o.set("Cache-Control",(0,E.getCacheControlHeader)(n.cacheControl)),await (0,c.sendResponse)(G,W,new Response(n.value.body,{headers:o,status:n.value.status||200}));return}catch(t){if(t instanceof N.NoFallbackError||await m.onRequestError(e,t,{routerKind:"App Router",routePath:X,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:_})},!1,S),b)throw t;await (0,c.sendResponse)(G,W,new Response(null,{status:500}));return}finally{(()=>{if(!n)return;let e=t.statusCode;n.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(n.setStatus({code:o.SpanStatusCode.ERROR}),n.setAttribute("error.type",e.toString()));let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==l.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||X,i=`${k} ${a}`;n.setAttributes({"next.route":a,"http.route":a,"next.span_name":i}),n.updateName(i),s&&s!==n&&(s.setAttribute("http.route",a),s.updateName(i))})()}};if(Y&&H)await z(H,void 0);else{let t=M.getActiveScopeSpan();await M.withPropagatedContext(e.headers,()=>M.trace(l.BaseServerSpan.handleRequest,{spanName:`${k} ${R}`,kind:o.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},e=>z(e,t)),void 0,!Y)}}e.s(["handler",0,h,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:R,workUnitAsyncStorage:g})},"routeModule",0,m,"serverHooks",0,A,"workAsyncStorage",0,R,"workUnitAsyncStorage",0,g])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let n=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),o=r.default.join(n,"daisy.db"),s=null;e.s(["getDb",0,function(){return s||((0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(s=new t.default(o)).pragma("journal_mode = WAL"),s.pragma("foreign_keys = ON"),s.exec(`
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
        `);e.transaction(e=>{for(let r of e)t.run({...r,inStock:+!!r.inStock,featured:+!!r.featured})})(r)}}catch{}e.prepare("INSERT OR IGNORE INTO migrations (name) VALUES (?)").run("json_import_gadgets_v1")}(s)),s}])},69722,e=>{"use strict";var t=e.i(62294),r=e.i(54799);function a(e){let r=(0,t.getDb)().prepare("SELECT * FROM orders WHERE id = ? OR ref = ?").get(e,e);return r?n(r):null}function n(e){return{...e,items:JSON.parse(e.items)}}e.s(["createOrder",0,function(e){let n=(0,t.getDb)(),o=new Date().toISOString(),s=(0,r.randomBytes)(8).toString("hex"),i="DC-"+(0,r.randomBytes)(3).toString("hex").toUpperCase();return n.prepare(`
    INSERT INTO orders (id, ref, name, email, phone, address, items, total, status, payment_method, eft_reference, createdAt, updatedAt)
    VALUES (@id, @ref, @name, @email, @phone, @address, @items, @total, 'pending', 'eft', @eft_reference, @now, @now)
  `).run({id:s,ref:i,name:e.name,email:e.email,phone:e.phone,address:e.address,items:JSON.stringify(e.items),total:e.total,eft_reference:e.eft_reference??null,now:o}),a(s)},"getOrder",0,a,"listOrders",0,function(){return(0,t.getDb)().prepare("SELECT * FROM orders ORDER BY createdAt DESC").all().map(n)},"updateOrder",0,function(e,r){let n=(0,t.getDb)(),o=[],s={id:e,now:new Date().toISOString()};return void 0!==r.status&&(o.push("status = @status"),s.status=r.status),void 0!==r.proof_url&&(o.push("proof_url = @proof_url"),s.proof_url=r.proof_url),void 0!==r.notes&&(o.push("notes = @notes"),s.notes=r.notes),void 0!==r.eft_reference&&(o.push("eft_reference = @eft_reference"),s.eft_reference=r.eft_reference),o.length&&(o.push("updatedAt = @now"),n.prepare(`UPDATE orders SET ${o.join(", ")} WHERE id = @id`).run(s)),a(e)}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0e-m-nh._.js.map