module.exports=[85148,(e,t,r)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,r)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},84423,(e,t,r)=>{t.exports=e.x("nodemailer-9c35dd349a8aaa9f",()=>require("nodemailer-9c35dd349a8aaa9f"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},48035,e=>{"use strict";var t=e.i(89171),r=e.i(69722),a=e.i(68105),n=e.i(28746),i=e.i(84423);let s={bank:"TymeBank",accountHolder:"Daisy & Co.",accountType:"Business",accountNumber:"51072673949",branchCode:"678910"},o=process.env.MAIL_USER&&process.env.MAIL_PASS?i.default.createTransport({service:"gmail",auth:{user:process.env.MAIL_USER,pass:process.env.MAIL_PASS}}):null;async function d(){return await (0,a.isAuthenticated)()?t.NextResponse.json((0,r.listOrders)()):t.NextResponse.json({error:"Unauthorized"},{status:401})}async function u(e){let{name:a,email:i,phone:d,address:u,items:l}=await e.json();if(!a||!i||!d||!Array.isArray(l)||!l.length)return t.NextResponse.json({error:"Missing required fields"},{status:400});if("string"!=typeof a||a.length>200)return t.NextResponse.json({error:"Invalid name"},{status:400});if("string"!=typeof i||i.length>200||!i.includes("@"))return t.NextResponse.json({error:"Invalid email"},{status:400});if("string"!=typeof d||d.length>30)return t.NextResponse.json({error:"Invalid phone"},{status:400});if(l.length>50)return t.NextResponse.json({error:"Too many items"},{status:400});let c=[],p=0;for(let e of l){let r=(0,n.getProduct)(String(e.id??""));if(!r)return t.NextResponse.json({error:`Product not found: ${e.id}`},{status:400});let a=Math.max(1,Math.min(99,parseInt(e.qty,10)||1));p+=(parseFloat(String(r.price??"0").replace(/[^0-9.]/g,""))||0)*a,c.push({id:r.id,name:r.name,price:r.price,qty:a,imageUrl:r.imageUrl})}let T=(0,r.createOrder)({name:a.trim(),email:i.trim().toLowerCase(),phone:d.trim(),address:(u??"").toString().slice(0,500).trim(),items:c,total:p});if(o){let e=T.items.map(e=>`${e.name} \xd7 ${e.qty} — R ${Number(e.price).toLocaleString()}`).join("\n");o.sendMail({from:process.env.MAIL_USER,to:"info@daisyandco.co.za",subject:`New Order ${T.ref} — R${T.total.toLocaleString()} — ${a}`,text:`New order received.

Ref: ${T.ref}
Customer: ${a}
Email: ${i}
Phone: ${d}
Address: ${u}

Items:
${e}

Total: R${T.total.toLocaleString()}

Bank: ${s.bank} | ${s.accountHolder} | ${s.accountNumber}`}).catch(console.error)}return t.NextResponse.json({ok:!0,ref:T.ref,id:T.id,bank:s})}e.s(["GET",0,d,"POST",0,u])},81585,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),i=e.i(61916),s=e.i(74677),o=e.i(69741),d=e.i(16795),u=e.i(87718),l=e.i(95169),c=e.i(47587),p=e.i(66012),T=e.i(70101),E=e.i(26937),m=e.i(10372),f=e.i(93695);e.i(52474);var L=e.i(220);let N=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/orders/route",pathname:"/api/orders",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/orders/route.ts",nextConfigOutput:"",userland:()=>e.r(48035),...{}}),{workAsyncStorage:g,workUnitAsyncStorage:A,serverHooks:R}=N;async function h(e,t,a){a.requestMeta&&(0,n.setRequestMeta)(e,a.requestMeta),N.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let g="/api/orders/route";g=g.replace(/\/index$/,"")||"/";let A=await N.prepare(e,t,{srcPage:g,multiZoneDraftMode:!1});if(!A)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:R,deploymentId:h,params:S,nextConfig:x,parsedUrl:O,isDraftMode:U,prerenderManifest:v,routerServerContext:y,isOnDemandRevalidate:C,revalidateOnlyGenerated:I,resolvedPathname:D,clientReferenceManifest:w,serverActionsManifest:X}=A,b=(0,o.normalizeAppPath)(g),_=!!(v.dynamicRoutes[b]||v.routes[D]),k=async()=>((null==y?void 0:y.render404)?await y.render404(e,t,O,!1):t.end("This page could not be found"),null);if(_&&!U){let e=!!v.routes[D],t=v.dynamicRoutes[b];if(t&&!1===t.fallback&&!e){if(x.adapterPath)return await k();throw new f.NoFallbackError}}let P=null;!_||N.isDev||U||(P="/index"===(P=D)?"/":P);let F=!0===N.isDev||!_,j=_&&!F;X&&w&&(0,s.setManifestsSingleton)({page:g,clientReferenceManifest:w,serverActionsManifest:X});let q=e.method||"GET",M=(0,i.getTracer)(),H=M.getActiveScopeSpan(),$=!!(null==y?void 0:y.isWrappedByNextServer),B=!!(0,n.getRequestMeta)(e,"minimalMode"),K=(0,n.getRequestMeta)(e,"incrementalCache")||await N.getIncrementalCache(e,x,v,B);null==K||K.resetRequestCache(),globalThis.__incrementalCache=K;let Y={params:S,previewProps:v.preview,renderOpts:{experimental:{authInterrupts:!!x.experimental.authInterrupts,useCacheTimeout:x.experimental.useCacheTimeout},cacheComponents:!!x.cacheComponents,validationLevel:x.experimental.instantInsights.validationLevel,supportsDynamicResponse:F,incrementalCache:K,hmrRefreshHash:(0,n.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:x.cacheLife,staticPageGenerationTimeout:x.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>N.onRequestError(e,t,a,n,y)},sharedContext:{buildId:R,deploymentId:h}},G=new d.NodeNextRequest(e),W=new d.NodeNextResponse(t),V=u.NextRequestAdapter.fromNodeNextRequest(G,(0,u.signalFromNodeResponse)(t)),z=async({previousCacheEntry:r})=>{try{if(!B&&C&&I&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await N.handle(V,Y);e.fetchMetrics=Y.renderOpts.fetchMetrics;let i=Y.renderOpts.pendingWaitUntil;i&&a.waitUntil&&(a.waitUntil(i),i=void 0);let s=Y.renderOpts.collectedTags;if(!_)return await (0,p.sendResponse)(G,W,n,i),null;{let e=await n.blob(),t=(0,T.toNodeOutgoingHttpHeaders)(n.headers);s&&(t[m.NEXT_CACHE_TAGS_HEADER]=s),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==Y.renderOpts.collectedRevalidate&&!(Y.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&Y.renderOpts.collectedRevalidate,a=void 0===Y.renderOpts.collectedExpire||Y.renderOpts.collectedExpire>=m.INFINITE_CACHE?!1!==r&&r>0?x.expireTime:void 0:Y.renderOpts.collectedExpire;return{value:{kind:L.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await N.onRequestError(e,t,{routerKind:"App Router",routePath:g,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:C})},!1,y),t}},J=async(n,s)=>{try{var o,d;let n=await N.handleResponse({req:e,nextConfig:x,cacheKey:P,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:v,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:I,responseGenerator:z,waitUntil:a.waitUntil,isMinimalMode:B});if(!_)return;if((null==n||null==(o=n.value)?void 0:o.kind)!==L.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==n||null==(d=n.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});B||t.setHeader("x-nextjs-cache",C?"REVALIDATED":n.isMiss?"MISS":n.isStale?"STALE":"HIT"),U&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let i=(0,T.fromNodeOutgoingHttpHeaders)(n.value.headers);B&&_||i.delete(m.NEXT_CACHE_TAGS_HEADER),!n.cacheControl||t.getHeader("Cache-Control")||i.get("Cache-Control")||i.set("Cache-Control",(0,E.getCacheControlHeader)(n.cacheControl)),await (0,p.sendResponse)(G,W,new Response(n.value.body,{headers:i,status:n.value.status||200}));return}catch(t){if(t instanceof f.NoFallbackError||await N.onRequestError(e,t,{routerKind:"App Router",routePath:b,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:C})},!1,y),_)throw t;await (0,p.sendResponse)(G,W,new Response(null,{status:500}));return}finally{(()=>{if(!n)return;let e=t.statusCode;n.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(n.setStatus({code:i.SpanStatusCode.ERROR}),n.setAttribute("error.type",e.toString()));let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==l.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||b,o=`${q} ${a}`;n.setAttributes({"next.route":a,"http.route":a,"next.span_name":o}),n.updateName(o),s&&s!==n&&(s.setAttribute("http.route",a),s.updateName(o))})()}};if($&&H)await J(H,void 0);else{let t=M.getActiveScopeSpan();await M.withPropagatedContext(e.headers,()=>M.trace(l.BaseServerSpan.handleRequest,{spanName:`${q} ${g}`,kind:i.SpanKind.SERVER,attributes:{"http.method":q,"http.target":e.url}},e=>J(e,t)),void 0,!$)}}e.s(["handler",0,h,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:g,workUnitAsyncStorage:A})},"routeModule",0,N,"serverHooks",0,R,"workAsyncStorage",0,g,"workUnitAsyncStorage",0,A])},62294,e=>{"use strict";var t=e.i(85148),r=e.i(14747),a=e.i(22734);let n=process.env.DATA_DIR??r.default.join(process.cwd(),"data"),i=r.default.join(n,"daisy.db"),s=null;e.s(["getDb",0,function(){return s||((0,a.existsSync)(n)||(0,a.mkdirSync)(n,{recursive:!0}),(s=new t.default(i)).pragma("journal_mode = WAL"),s.pragma("foreign_keys = ON"),s.exec(`
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
      source            TEXT NOT NULL DEFAULT 'wizard',
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
  `),function(e){if(e.prepare("SELECT name FROM migrations WHERE name = ?").get("json_import"))return;let t=r.default.join(n,"products.json");if((0,a.existsSync)(t))try{let r=JSON.parse((0,a.readFileSync)(t,"utf-8")),n=e.prepare(`
        INSERT OR IGNORE INTO products
          (id, name, price, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
        VALUES
          (@id, @name, @price, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
      `);e.transaction(e=>{for(let t of e)n.run({...t,inStock:+!!t.inStock,featured:+!!t.featured})})(r)}catch{}e.prepare("INSERT INTO migrations (name) VALUES (?)").run("json_import")}(s)),s}])},69722,e=>{"use strict";var t=e.i(62294),r=e.i(54799);function a(e){let r=(0,t.getDb)().prepare("SELECT * FROM orders WHERE id = ? OR ref = ?").get(e,e);return r?n(r):null}function n(e){return{...e,items:JSON.parse(e.items)}}e.s(["createOrder",0,function(e){let n=(0,t.getDb)(),i=new Date().toISOString(),s=(0,r.randomBytes)(8).toString("hex"),o="DC-"+(0,r.randomBytes)(3).toString("hex").toUpperCase();return n.prepare(`
    INSERT INTO orders (id, ref, name, email, phone, address, items, total, status, payment_method, eft_reference, createdAt, updatedAt)
    VALUES (@id, @ref, @name, @email, @phone, @address, @items, @total, 'pending', 'eft', @eft_reference, @now, @now)
  `).run({id:s,ref:o,name:e.name,email:e.email,phone:e.phone,address:e.address,items:JSON.stringify(e.items),total:e.total,eft_reference:e.eft_reference??null,now:i}),a(s)},"getOrder",0,a,"listOrders",0,function(){return(0,t.getDb)().prepare("SELECT * FROM orders ORDER BY createdAt DESC").all().map(n)},"updateOrder",0,function(e,r){let n=(0,t.getDb)(),i=[],s={id:e,now:new Date().toISOString()};return void 0!==r.status&&(i.push("status = @status"),s.status=r.status),void 0!==r.proof_url&&(i.push("proof_url = @proof_url"),s.proof_url=r.proof_url),void 0!==r.notes&&(i.push("notes = @notes"),s.notes=r.notes),void 0!==r.eft_reference&&(i.push("eft_reference = @eft_reference"),s.eft_reference=r.eft_reference),i.length&&(i.push("updatedAt = @now"),n.prepare(`UPDATE orders SET ${i.join(", ")} WHERE id = @id`).run(s)),a(e)}])},28746,e=>{"use strict";var t=e.i(62294);function r(e){return{...e,inStock:1===e.inStock,featured:1===e.featured}}function a(e){let a=(0,t.getDb)().prepare("SELECT * FROM products WHERE id = ?").get(e);return a?r(a):void 0}e.s(["createProduct",0,function(e){let r=(0,t.getDb)(),n=new Date().toISOString(),i=`${Date.now()}`;return r.prepare(`
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1220nlj._.js.map