module.exports=[85148,(a,b,c)=>{b.exports=a.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},22734,(a,b,c)=>{b.exports=a.x("fs",()=>require("fs"))},93011,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/app/admin/dashboard/DeleteButton.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/app/admin/dashboard/DeleteButton.tsx","default")},46902,a=>{"use strict";var b=a.i(93011);a.n(b)},60751,a=>{"use strict";var b=a.i(7997),c=a.i(19419),d=a.i(17400),e=a.i(66879);function f(a){return{...a,items:JSON.parse(a.items)}}a.i(54799);var g=a.i(95936),h=a.i(88444),i=a.i(46902);async function j(){let a=(0,c.getProducts)(),j=(0,c.getLeads)(),k=(0,d.getQuotes)().filter(a=>"new"===a.status).length,l=(0,e.getDb)().prepare("SELECT * FROM orders ORDER BY createdAt DESC").all().map(f).filter(a=>"pending"===a.status||"proof_submitted"===a.status).length,m=a.filter(a=>a.featured).length,n=a.filter(a=>a.inStock).length;return(0,b.jsxs)("div",{className:"min-h-screen bg-[#0A0A0A]",children:[(0,b.jsxs)("header",{className:"bg-[#0f0f0f] border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsxs)("svg",{width:"32",height:"32",viewBox:"0 0 100 100",fill:"none",children:[[0,45,90,135,180,225,270,315].map(a=>(0,b.jsx)("ellipse",{cx:"50",cy:"22",rx:"9",ry:"18",fill:"#D4AF37",transform:`rotate(${a} 50 50)`},a)),(0,b.jsx)("circle",{cx:"50",cy:"50",r:"14",fill:"#D4AF37"}),(0,b.jsx)("circle",{cx:"50",cy:"50",r:"8",fill:"#0A0A0A"})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{style:{fontFamily:"var(--font-outfit)",fontWeight:700,color:"#D4AF37",fontSize:16},children:"Daisy & Co."}),(0,b.jsx)("p",{className:"text-gray-600 text-xs",children:"Staff Dashboard"})]})]}),(0,b.jsxs)("div",{className:"flex items-center gap-4",children:[(0,b.jsx)(g.default,{href:"/admin/dashboard/images",className:"text-gray-400 hover:text-white text-sm transition-colors",children:"Site Images"}),(0,b.jsx)(g.default,{href:"/admin/dashboard/orders",className:"text-gray-400 hover:text-white text-sm transition-colors",children:"Orders"}),(0,b.jsx)(g.default,{href:"/shop",target:"_blank",className:"text-gray-400 hover:text-white text-sm transition-colors",children:"View Shop ↗"}),(0,b.jsx)(h.default,{})]})]}),(0,b.jsxs)("div",{className:"max-w-6xl mx-auto px-6 py-10",children:[(0,b.jsx)("div",{className:"grid grid-cols-5 gap-4 mb-10",children:[{label:"Total Products",value:a.length,link:null},{label:"In Stock",value:n,link:null},{label:"Featured",value:m,link:null},{label:"New Quotes",value:k,link:"/admin/dashboard/quotes"},{label:"Pending Orders",value:l,link:"/admin/dashboard/orders"},{label:"Leads",value:j.length,link:null}].map(a=>(0,b.jsx)("div",{className:`bg-[#111111] border rounded-2xl p-5 text-center ${a.link&&a.value>0?"border-[#D4AF37]/40 cursor-pointer":"border-[#1F1F1F]"}`,children:a.link?(0,b.jsxs)(g.default,{href:a.link,children:[(0,b.jsx)("p",{className:"text-3xl font-bold text-[#D4AF37] mb-1",children:a.value}),(0,b.jsx)("p",{className:"text-gray-400 text-xs",children:a.label})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("p",{className:"text-3xl font-bold text-[#D4AF37] mb-1",children:a.value}),(0,b.jsx)("p",{className:"text-gray-400 text-xs",children:a.label})]})},a.label))}),(0,b.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,b.jsx)("h1",{className:"text-xl font-bold text-white",children:"Products"}),(0,b.jsx)(g.default,{href:"/admin/dashboard/new",className:"btn-gold px-5 py-2.5 rounded-xl text-sm font-bold",children:"+ Add Product"})]}),0===a.length?(0,b.jsxs)("div",{className:"bg-[#111111] border border-[#1F1F1F] rounded-2xl p-16 text-center",children:[(0,b.jsx)("p",{className:"text-gray-500 text-lg mb-6",children:"No products yet."}),(0,b.jsx)(g.default,{href:"/admin/dashboard/new",className:"btn-gold px-8 py-3 rounded-xl font-bold",children:"Add Your First Product"})]}):(0,b.jsxs)("div",{className:"bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden",children:[(0,b.jsx)("div",{className:"grid grid-cols-[60px_1fr_160px_180px_100px_120px] gap-4 px-5 py-3 border-b border-[#1F1F1F]",children:["","Product","Price","Category","Status","Actions"].map(a=>(0,b.jsx)("p",{className:"text-xs text-gray-500 uppercase tracking-wider font-medium",children:a},a))}),a.map(a=>(0,b.jsxs)("div",{className:"grid grid-cols-[60px_1fr_160px_180px_100px_120px] gap-4 items-center px-5 py-4 border-b border-[#1A1A1A] last:border-0 hover:bg-white/2 transition-colors",children:[(0,b.jsx)("div",{className:"w-12 h-12 rounded-xl overflow-hidden bg-[#0A0A0A] shrink-0",children:a.imageUrl?(0,b.jsx)("img",{src:a.imageUrl,alt:a.name,className:"w-full h-full object-cover"}):(0,b.jsx)("div",{className:"w-full h-full flex items-center justify-center text-gray-700 text-xs",children:"–"})}),(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsx)("p",{className:"text-white font-medium text-sm truncate",children:a.name}),a.description&&(0,b.jsx)("p",{className:"text-gray-500 text-xs truncate mt-0.5",children:a.description})]}),(0,b.jsx)("p",{className:"text-[#D4AF37] font-bold text-sm",children:a.price}),(0,b.jsx)("p",{className:"text-gray-400 text-sm truncate",children:a.category}),(0,b.jsxs)("div",{className:"flex gap-1.5 flex-wrap",children:[(0,b.jsx)("span",{className:`text-[10px] px-2 py-0.5 rounded-full font-medium ${a.inStock?"bg-green-400/10 text-green-400":"bg-red-400/10 text-red-400"}`,children:a.inStock?"In Stock":"Out of Stock"}),a.featured&&(0,b.jsx)("span",{className:"text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#D4AF37]/10 text-[#D4AF37]",children:"Featured"})]}),(0,b.jsxs)("div",{className:"flex gap-2",children:[(0,b.jsx)(g.default,{href:`/admin/dashboard/edit/${a.id}`,className:"px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors",children:"Edit"}),(0,b.jsx)(i.default,{id:a.id})]})]},a.id))]}),(0,b.jsxs)("div",{className:"mt-14",children:[(0,b.jsx)("h2",{className:"text-xl font-bold text-white mb-6",children:"Quote Requests & Leads"}),0===j.length?(0,b.jsx)("div",{className:"bg-[#111111] border border-[#1F1F1F] rounded-2xl p-10 text-center text-gray-500",children:"No leads yet. They appear here when someone submits the contact form."}):(0,b.jsxs)("div",{className:"bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden",children:[(0,b.jsx)("div",{className:"grid grid-cols-[1fr_160px_160px_1fr_140px] gap-4 px-5 py-3 border-b border-[#1F1F1F]",children:["Name","Email","Phone","Message","Date"].map(a=>(0,b.jsx)("p",{className:"text-xs text-gray-500 uppercase tracking-wider font-medium",children:a},a))}),j.map(a=>(0,b.jsxs)("div",{className:"grid grid-cols-[1fr_160px_160px_1fr_140px] gap-4 items-start px-5 py-4 border-b border-[#1A1A1A] last:border-0 hover:bg-white/2 transition-colors",children:[(0,b.jsx)("p",{className:"text-white text-sm font-medium truncate",children:a.name||"—"}),(0,b.jsx)("p",{className:"text-gray-400 text-sm truncate",children:a.email||"—"}),(0,b.jsx)("p",{className:"text-gray-400 text-sm truncate",children:a.phone||"—"}),(0,b.jsx)("p",{className:"text-gray-400 text-sm line-clamp-2 leading-snug",children:a.message||a.productInterest||"—"}),(0,b.jsx)("p",{className:"text-gray-600 text-xs",children:new Date(a.createdAt).toLocaleDateString("en-ZA")})]},a.id))]})]})]})]})}a.s(["default",0,j,"dynamic",0,"force-dynamic"],60751)},42627,function(a){a.n(a.i(60751))},60549,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/app/admin/dashboard/LogoutButton.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/app/admin/dashboard/LogoutButton.tsx","default")},88444,a=>{"use strict";var b=a.i(60549);a.n(b)},66879,a=>{"use strict";var b=a.i(85148),c=a.i(14747),d=a.i(22734);let e=process.env.DATA_DIR??c.default.join(process.cwd(),"data"),f=c.default.join(e,"daisy.db"),g=null;a.s(["getDb",0,function(){return g||((0,d.existsSync)(e)||(0,d.mkdirSync)(e,{recursive:!0}),(g=new b.default(f)).pragma("journal_mode = WAL"),g.pragma("foreign_keys = ON"),g.exec(`
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
  `),function(a){if(a.prepare("SELECT name FROM migrations WHERE name = ?").get("json_import"))return;let b=c.default.join(e,"products.json");if((0,d.existsSync)(b))try{let c=JSON.parse((0,d.readFileSync)(b,"utf-8")),e=a.prepare(`
        INSERT OR IGNORE INTO products
          (id, name, price, category, description, imageUrl, inStock, featured, createdAt, updatedAt)
        VALUES
          (@id, @name, @price, @category, @description, @imageUrl, @inStock, @featured, @createdAt, @updatedAt)
      `);a.transaction(a=>{for(let b of a)e.run({...b,inStock:+!!b.inStock,featured:+!!b.featured})})(c)}catch{}a.prepare("INSERT INTO migrations (name) VALUES (?)").run("json_import")}(g)),g}])},19419,a=>{"use strict";var b=a.i(66879);function c(a){return{...a,inStock:1===a.inStock,featured:1===a.featured}}a.s(["getLeads",0,function(){return(0,b.getDb)().prepare("SELECT * FROM leads ORDER BY createdAt DESC").all()},"getProduct",0,function(a){let d=(0,b.getDb)().prepare("SELECT * FROM products WHERE id = ?").get(a);return d?c(d):void 0},"getProducts",0,function(){return(0,b.getDb)().prepare("SELECT * FROM products ORDER BY createdAt DESC").all().map(c)},"getRelated",0,function(a,d,e=4){return(0,b.getDb)().prepare("SELECT * FROM products WHERE category = ? AND id != ? AND inStock = 1 ORDER BY createdAt DESC LIMIT ?").all(d,a,e).map(c)}])},17400,a=>{"use strict";var b=a.i(66879);a.i(54799),a.s(["getQuotes",0,function(){return(0,b.getDb)().prepare("SELECT * FROM quotes ORDER BY createdAt DESC").all()}])},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__18w25jm._.js.map