module.exports=[67010,e=>{"use strict";var t=e.i(84423),o=e.i(14747),i=e.i(22734);let r=o.default.join(process.cwd(),"public","logo.jpg"),a="logo@daisygadgets",n="#D4AF37",p="#f5d76e",s="#0A0A0A",d="#161616",l="#1F1F1F",g="#6b7280",c="27848961782",x="https://daisygadgetsco.com";async function f(e){let o,n=(o=process.env.RESEND_API_KEY)?t.default.createTransport({host:"smtp.resend.com",port:587,secure:!1,auth:{user:"resend",pass:o}}):null;if(!n)return void console.error("mailer: env vars missing");try{let t=e.attachments??[];(0,i.existsSync)(r)&&t.unshift({filename:"logo.jpg",path:r,cid:a}),await n.sendMail({from:'"Daisy Gadgets Co." <noreply@daisygadgetsco.com>',to:e.to,subject:e.subject,html:e.html,attachments:t})}catch(e){console.error("mailer send error:",e)}}async function m(e){try{let t=await fetch(e,{signal:AbortSignal.timeout(5e3)});if(!t.ok)return null;return Buffer.from(await t.arrayBuffer())}catch{return null}}async function h(e){let t=[],o=new Map;return await Promise.all(e.map(async(e,i)=>{if(!e.imageUrl)return;let r=await m(e.imageUrl.startsWith("http")?e.imageUrl:x+e.imageUrl);if(!r)return;let a=`product-${i}@daisy`,n=e.imageUrl.split(".").pop()?.split("?")[0]??"jpg";t.push({filename:`product-${i}.${n}`,content:r,cid:a}),o.set(e.imageUrl,`cid:${a}`)})),{attachments:t,cidMap:o}}function y(e,t=""){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Daisy Gadgets Co.</title>
</head>
<body style="margin:0;padding:0;background:${s};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${s};padding:28px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid ${l}">

        <!-- Gold shimmer top bar -->
        <tr><td style="background:linear-gradient(90deg,${s},${n},${p},${n},${s});height:3px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Header -->
        <tr>
          <td style="background:${s};padding:24px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="cid:${a}" alt="Daisy Gadgets Co." height="44" style="height:44px;width:auto;display:block;border:0" />
                </td>
                <td align="right">
                  <a href="${x}" style="color:${g};font-size:12px;text-decoration:none">daisygadgetsco.co.za</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${t}

        <!-- Body -->
        <tr>
          <td style="background:#111111;padding:36px 36px 32px;border-top:1px solid ${l}">
            ${e}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${s};padding:24px 36px;border-top:1px solid ${l}">
            <p style="margin:0 0 8px;color:${g};font-size:12px;text-align:center">
              Questions? &nbsp;
              <a href="https://wa.me/${c}" style="color:${n};text-decoration:none;font-weight:600">WhatsApp +27 84 896 1782</a>
              &nbsp;\xb7&nbsp;
              <a href="${x}" style="color:${n};text-decoration:none;font-weight:600">daisygadgetsco.co.za</a>
            </p>
            <p style="margin:0;color:#333;font-size:11px;text-align:center">
              \xa9 ${new Date().getFullYear()} Daisy Gadgets Co. \xb7 All rights reserved.
            </p>
          </td>
        </tr>

        <!-- Bottom gold bar -->
        <tr><td style="background:linear-gradient(90deg,${s},${n},${p},${n},${s});height:2px;font-size:0;line-height:0">&nbsp;</td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`}function $(e){return`<p style="margin:0 0 3px;color:${g};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em">${e}</p>`}function b(){return`<div style="height:1px;background:${l};margin:24px 0"></div>`}function u(e,t,o=n,i=s){return`<a href="${t}" style="display:inline-block;background:${o};color:${i};font-weight:800;text-decoration:none;padding:13px 26px;border-radius:10px;font-size:14px;letter-spacing:0.02em">${e}</a>`}function w(e,t){return`<tr>
    <td style="padding:8px 0;color:${g};font-size:13px;width:150px;vertical-align:top;border-bottom:1px solid ${l}">${e}</td>
    <td style="padding:8px 0;color:#e5e7eb;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid ${l}">${t}</td>
  </tr>`}async function v(e){let{attachments:t,cidMap:o}=await h(e.items),i=e.items.map(e=>{let t=(parseFloat(String(e.price).replace(/[^0-9.]/g,""))*e.qty).toLocaleString("en-ZA"),i=e.imageUrl?o.get(e.imageUrl)??(e.imageUrl.startsWith("http")?e.imageUrl:x+e.imageUrl):null,r=i?`<img src="${i}" alt="${e.name}" width="64" height="64" style="width:64px;height:64px;object-fit:cover;border-radius:10px;display:block;border:1px solid ${l}" />`:`<div style="width:64px;height:64px;background:${d};border:1px solid ${l};border-radius:10px"></div>`;return`
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${l};width:76px;vertical-align:middle">${r}</td>
      <td style="padding:12px 12px;border-bottom:1px solid ${l};vertical-align:middle">
        <p style="margin:0 0 4px;color:#e5e7eb;font-size:14px;font-weight:600">${e.name}</p>
        <p style="margin:0;color:${g};font-size:12px">Qty: ${e.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${l};text-align:right;vertical-align:middle">
        <span style="color:${n};font-size:14px;font-weight:700">R ${t}</span>
      </td>
    </tr>`}).join(""),r=y(`
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:48px;line-height:1;margin-bottom:12px">🎊</div>
      <h1 style="margin:0 0 8px;color:#f9fafb;font-size:26px;font-weight:900">Thank you for your purchase!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${e.name.split(" ")[0]}, your payment has been verified and your order is confirmed.</p>
    </div>

    <!-- Ref pill -->
    <div style="background:${d};border:1px solid ${n}44;border-radius:10px;padding:14px 20px;margin-bottom:28px;display:flex;align-items:center">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="color:${g};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Order Reference</td>
        <td style="text-align:right;color:${n};font-size:18px;font-weight:900;letter-spacing:0.08em;font-family:monospace">${e.ref}</td>
      </tr></table>
    </div>

    <!-- Items -->
    <p style="margin:0 0 12px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Order Summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px">
      ${i}
    </table>

    <!-- Totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 28px">
      <tr>
        <td style="padding:6px 0;color:${g};font-size:13px">Subtotal</td>
        <td style="padding:6px 0;text-align:right;color:#d1d5db;font-size:13px">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:${g};font-size:13px">Shipping</td>
        <td style="padding:6px 0;text-align:right;color:#22c55e;font-size:13px;font-weight:700">Free</td>
      </tr>
      <tr>
        <td style="padding:10px 0 0;color:#e5e7eb;font-size:16px;font-weight:800;border-top:1px solid ${l}">Total</td>
        <td style="padding:10px 0 0;text-align:right;color:${n};font-size:20px;font-weight:900;border-top:1px solid ${l}">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${b()}

    <!-- Customer info grid -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Customer Information</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
      <tr>
        <td width="50%" style="padding:0 8px 0 0;vertical-align:top">
          <div style="background:${d};border:1px solid ${l};border-radius:10px;padding:16px 18px;margin-bottom:12px">
            <p style="margin:0 0 6px;color:${g};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Address</p>
            <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${e.name}<br>${e.address||"—"}</p>
          </div>
          <div style="background:${d};border:1px solid ${l};border-radius:10px;padding:16px 18px">
            <p style="margin:0 0 6px;color:${g};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Billing Address</p>
            <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${e.name}<br>${e.address||"—"}</p>
          </div>
        </td>
        <td width="50%" style="padding:0 0 0 8px;vertical-align:top">
          <div style="background:${d};border:1px solid ${l};border-radius:10px;padding:16px 18px;margin-bottom:12px">
            <p style="margin:0 0 6px;color:${g};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Method</p>
            <p style="margin:0;color:#d1d5db;font-size:13px">📦 Standard Delivery<br><span style="color:${g};font-size:12px">2–5 business days</span></p>
          </div>
          <div style="background:${d};border:1px solid ${l};border-radius:10px;padding:16px 18px">
            <p style="margin:0 0 6px;color:${g};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Payment Method</p>
            <p style="margin:0;color:#d1d5db;font-size:13px">🏦 EFT Bank Transfer<br><span style="color:#22c55e;font-size:12px;font-weight:700">✔ Payment Verified</span></p>
          </div>
        </td>
      </tr>
    </table>

    <div style="text-align:center">
      ${u("💬 Chat on WhatsApp",`https://wa.me/${c}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff")}
    </div>
  `);await f({to:e.email,subject:`Order Confirmed ✨ — ${e.ref} | Daisy Gadgets Co.`,html:r,attachments:t})}async function z(e){let t=y(`
    ${$("Payment Received")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">✅ We got your proof!</h1>
    <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.6">
      Hi ${e.name.split(" ")[0]}, we received your proof of payment for order <strong style="color:${n}">${e.ref}</strong>.
    </p>

    <div style="background:${d};border:1px solid #22c55e44;border-left:3px solid #22c55e;border-radius:0 12px 12px 0;padding:18px 20px;margin-bottom:28px">
      <p style="margin:0;color:#86efac;font-size:14px;line-height:1.7">
        Your proof is under review. We will verify and confirm your order within <strong>24 hours</strong>. You will receive another email as soon as it is approved.
      </p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Need help or want to check in?</p>
    ${u("Chat on WhatsApp",`https://wa.me/${c}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff")}
  `);await f({to:e.email,subject:`Payment Proof Received — ${e.ref} | Daisy Gadgets Co.`,html:t})}async function k(e){let{attachments:t,cidMap:o}=await h(e.items),i=e.items.map(e=>{let t=(parseFloat(String(e.price).replace(/[^0-9.]/g,""))*e.qty).toLocaleString("en-ZA"),i=parseFloat(String(e.price).replace(/[^0-9.]/g,"")).toLocaleString("en-ZA"),r=e.imageUrl?o.get(e.imageUrl)??(e.imageUrl.startsWith("http")?e.imageUrl:x+e.imageUrl):null,a=r?`<img src="${r}" alt="${e.name}" width="64" height="64" style="width:64px;height:64px;object-fit:cover;border-radius:10px;display:block;border:1px solid ${l}" />`:`<div style="width:64px;height:64px;background:${d};border:1px solid ${l};border-radius:10px"></div>`;return`
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${l};width:76px;vertical-align:middle">${a}</td>
      <td style="padding:12px 10px;border-bottom:1px solid ${l};vertical-align:middle">
        <p style="margin:0 0 3px;color:#e5e7eb;font-size:14px;font-weight:600">${e.name}</p>
        <p style="margin:0;color:${g};font-size:12px">R ${i} \xd7 ${e.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${l};text-align:right;vertical-align:middle">
        <span style="color:${n};font-size:14px;font-weight:700">R ${t}</span>
      </td>
    </tr>`}).join(""),r=e.reason?`<div style="background:${d};border-left:3px solid #ef4444;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:24px">
        <p style="margin:0 0 4px;color:#ef4444;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Reason from our team</p>
        <p style="margin:0;color:#fca5a5;font-size:14px;line-height:1.6">${e.reason}</p>
       </div>`:"",a=y(`
    <!-- Hero -->
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:48px;line-height:1;margin-bottom:14px">🔔</div>
      <div style="display:inline-block;background:#ef444420;color:#ef4444;border:1px solid #ef444450;padding:5px 16px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.06em;margin-bottom:14px">Action Required</div>
      <h1 style="margin:0 0 10px;color:#f9fafb;font-size:26px;font-weight:900;line-height:1.2">Payment could not be verified</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px;line-height:1.6">Hi <strong style="color:#e5e7eb">${e.name.split(" ")[0]}</strong>, we were unable to verify your proof of payment for order <strong style="color:${n};font-family:monospace">${e.ref}</strong>.</p>
    </div>

    ${r}

    <p style="margin:0 0 24px;color:#9ca3af;font-size:14px;line-height:1.7">
      Don&apos;t worry — this happens sometimes. Please re-do your payment using the details below and upload a clear screenshot or photo of your confirmation.
    </p>

    ${b()}

    <!-- Order summary with images -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Your Order</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px">
      ${i}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 28px">
      <tr>
        <td style="padding:6px 0;color:${g};font-size:13px">Subtotal</td>
        <td style="padding:6px 0;text-align:right;color:#d1d5db;font-size:13px">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:${g};font-size:13px">Shipping</td>
        <td style="padding:6px 0;text-align:right;color:#22c55e;font-size:13px;font-weight:700">Free</td>
      </tr>
      <tr>
        <td style="padding:10px 0 0;color:#e5e7eb;font-size:16px;font-weight:800;border-top:1px solid ${l}">Total Due</td>
        <td style="padding:10px 0 0;text-align:right;color:${n};font-size:20px;font-weight:900;border-top:1px solid ${l}">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${b()}

    <!-- Bank details -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Payment Details (EFT)</p>
    <div style="background:${d};border:1px solid ${l};border-radius:12px;padding:4px 20px;margin-bottom:28px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${w("Bank","FNB / RMB")}
        ${w("Account Holder","Daisy Gadgets Co.")}
        ${w("Account Type","Business Current")}
        ${w("Account Number",`<span style="font-family:monospace;font-size:15px;color:${n};letter-spacing:0.06em">63211629332</span>`)}
        ${w("Branch Code","250655")}
        ${w("PayShap","+27848961782@FNB")}
        ${w("Reference",`<strong style="color:${n};font-size:15px;font-family:monospace">${e.ref}</strong>`)}
        ${w("Amount",`<strong style="color:${n};font-size:15px">R ${e.total.toLocaleString("en-ZA")}</strong>`)}
      </table>
    </div>

    <p style="margin:0 0 20px;color:#9ca3af;font-size:14px">Once paid, upload your new proof of payment — or send it directly on WhatsApp and we will update your order manually.</p>
    <div>
      ${u("📤 Upload New Proof",`${x}/checkout`,n,s)}
      &nbsp;&nbsp;
      ${u("💬 Send via WhatsApp",`https://wa.me/${c}?text=Hi%2C%20re-sending%20proof%20for%20order%20${e.ref}`,"#25D366","#fff")}
    </div>
  `);await f({to:e.email,subject:`⚠️ Action Required — ${e.ref} | Daisy Gadgets Co.`,html:a,attachments:t})}let A={approved:{pill:["Payment Approved","#22c55e"],icon:"🎊",title:"Your payment is confirmed!",body:"Great news — your payment has been verified and your order is now being packed and prepared for dispatch. We will notify you as soon as it ships.",cta:["💬 Chat on WhatsApp",`https://wa.me/${c}`]},shipped:{pill:["Shipped","#3b82f6"],icon:"📦",title:"Your order is on its way!",body:"Your order has been handed over to the courier and is heading your way. Delivery typically takes 2–5 business days within South Africa.",cta:["💬 Track via WhatsApp",`https://wa.me/${c}`]},delivered:{pill:["Delivered",n],icon:"🎁",title:"Your order has been delivered!",body:"We hope you love your new purchase! If you have any issues at all, please reach out immediately and we will make it right.",cta:["⭐ Leave a Review",`${x}/reviews`]}};async function C(e){let t=A[e.status];if(!t)return;let o=e.notes?`<div style="background:${d};border-left:3px solid ${n};border-radius:0 10px 10px 0;padding:14px 18px;margin:20px 0">
        <p style="margin:0 0 4px;color:${g};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Note from our team</p>
        <p style="margin:0;color:#d1d5db;font-size:14px;font-style:italic;line-height:1.6">"${e.notes}"</p>
       </div>`:"",i={approved:`Payment Approved — ${e.ref} | Daisy Gadgets Co.`,rejected:`Action Required — ${e.ref} | Daisy Gadgets Co.`,shipped:`Your Order Has Shipped — ${e.ref} | Daisy Gadgets Co.`,delivered:`Order Delivered — ${e.ref} | Daisy Gadgets Co.`},r=y(`
    <div style="margin-bottom:16px">${function(e,t){return`<span style="display:inline-block;background:${t}22;color:${t};border:1px solid ${t}55;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.05em">${e}</span>`}(...t.pill)}</div>
    <div style="font-size:36px;margin-bottom:12px;line-height:1">${t.icon}</div>
    <h1 style="margin:0 0 6px;color:#f9fafb;font-size:26px;font-weight:900">${t.title}</h1>
    <p style="margin:0 0 4px;color:${g};font-size:13px">Order: <strong style="color:${n}">${e.ref}</strong></p>
    ${b()}
    <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7">Hi ${e.name.split(" ")[0]}, ${t.body}</p>
    ${o}
    ${t.cta?`<div style="margin-top:24px">${u(t.cta[0],t.cta[1])}&nbsp;&nbsp;${u("WhatsApp Us",`https://wa.me/${c}?text=Hi%2C%20re%20order%20${e.ref}`,"#25D366","#fff")}</div>`:""}
  `);await f({to:e.email,subject:i[e.status]??`Order Update — ${e.ref}`,html:r})}async function D(e){let t=y(`
    ${$("Your Quote is Ready")}
    <h1 style="margin:6px 0 6px;color:#f9fafb;font-size:28px;font-weight:900">Hi ${e.name.split(" ")[0]}, here is your quote</h1>
    <p style="margin:0 0 28px;color:${g};font-size:13px">Reference: <strong style="color:#e5e7eb">${e.ref}</strong></p>

    <!-- Package card -->
    <div style="background:${d};border:1px solid ${n}44;border-radius:14px;padding:28px;margin-bottom:24px;text-align:center">
      ${$("Recommended Package")}
      <p style="margin:8px 0 20px;color:#f9fafb;font-size:22px;font-weight:900">${e.package}</p>
      <div style="height:1px;background:${l};margin:0 0 20px"></div>
      ${$("Estimated Price")}
      <p style="margin:8px 0 0;color:${n};font-size:34px;font-weight:900;letter-spacing:0.02em">${e.price}</p>
    </div>

    ${e.message?`
    <p style="margin:0 0 10px;color:#e5e7eb;font-size:15px;font-weight:700">Message from our team</p>
    <div style="background:${d};border:1px solid ${l};border-left:3px solid ${n};border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:28px">
      <p style="margin:0;color:#d1d5db;font-size:14px;line-height:1.8">${e.message.replace(/\n/g,"<br>")}</p>
    </div>`:""}

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Ready to proceed or have questions?</p>
    ${u("Accept Quote",`https://wa.me/${c}?text=Hi%2C%20I%20accept%20quote%20${e.ref}`,n,s)}
    &nbsp;&nbsp;
    ${u("Ask a Question",`https://wa.me/${c}?text=Hi%2C%20question%20about%20quote%20${e.ref}`,"#25D366","#fff")}
  `);await f({to:e.email,subject:`Your Quote — ${e.ref} | Daisy Gadgets Co.`,html:t})}async function S(e){let t=y(`
    ${$("Welcome to the family")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">
      ✨ You are in${e.name?`, ${e.name.split(" ")[0]}`:""}!
    </h1>
    <p style="margin:0 0 28px;color:#9ca3af;font-size:15px;line-height:1.6">Thank you for joining the Daisy Gadgets Co. family. Here is your exclusive first-order discount code:</p>

    <!-- Code card -->
    <div style="background:${s};border:1px solid ${n}55;border-radius:14px;padding:32px;text-align:center;margin-bottom:28px">
      ${$("Your Exclusive Discount Code")}
      <p style="margin:12px 0;color:${n};font-size:40px;font-weight:900;letter-spacing:0.15em;font-family:monospace">DAISY25</p>
      <div style="height:1px;background:${l};margin:16px 0"></div>
      <p style="margin:0;color:${g};font-size:13px;line-height:1.6">💎 25% off your first order — mention this code on WhatsApp<br>when placing your order. Valid for all products.</p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Browse our full range of gadgets, appliances, solar solutions and more:</p>
    ${u("🛍️ Shop Now",`${x}/shop`)}
    &nbsp;&nbsp;
    ${u("💬 Claim via WhatsApp",`https://wa.me/${c}?text=Hi%2C%20I%20have%20the%20discount%20code%20DAISY25`,"#25D366","#fff")}
  `);await f({to:e.email,subject:"✨ Your 25% Discount Code — Daisy Gadgets Co.",html:t})}e.s(["sendMail",0,f,"sendOrderConfirmation",0,v,"sendProofAcknowledgement",0,z,"sendQuoteReply",0,D,"sendRejectionEmail",0,k,"sendStatusUpdate",0,C,"sendWelcomeEmail",0,S])}];

//# sourceMappingURL=lib_mailer_ts_0qdwzgv._.js.map