module.exports=[67010,33464,e=>{"use strict";var t=e.i(84423),o=e.i(14747),r=e.i(22734);let i=[{id:"fnb",bank:"FNB / RMB",accountHolder:"Daisy Gadgets Co.",accountType:"Business Cheque Account",accountNumber:"63211629332",branchCode:"250655",payshap:"+27848961782@FNB"},{id:"tymebank",bank:"TymeBank / GoTymeBank",accountHolder:"Daisy Gadgets Co.",accountType:"Business Account",accountNumber:"51072673949",branchCode:"678910"}];function a(e){return i.find(t=>t.id===e)??i[0]}e.s(["getBankById",0,a,"getRotatingBank",0,function(e){return i[e%i.length]}],33464);let n=o.default.join(process.cwd(),"public","logo.jpg"),s="logo@daisygadgets",p="#D4AF37",l="#f5d76e",d="#0A0A0A",c="#161616",g="#1F1F1F",f="#6b7280",x="27848961782",y="https://daisygadgetsco.com";async function u(e){let o=process.env.RESEND_API_KEY?t.default.createTransport({host:"smtp.resend.com",port:587,secure:!1,auth:{user:"resend",pass:process.env.RESEND_API_KEY}}):process.env.MAIL_USER&&process.env.MAIL_PASS?t.default.createTransport({service:"gmail",auth:{user:process.env.MAIL_USER,pass:process.env.MAIL_PASS}}):null;if(!o)return void console.error("mailer: env vars missing");try{let t=e.attachments??[];(0,r.existsSync)(n)&&t.unshift({filename:"logo.jpg",path:n,cid:s}),await o.sendMail({from:process.env.RESEND_API_KEY?'"Daisy Gadgets Co." <noreply@daisygadgetsco.com>':`"Daisy Gadgets Co." <${process.env.MAIL_USER??"noreply@daisygadgetsco.com"}>`,to:e.to,subject:e.subject,html:e.html,attachments:t})}catch(e){console.error("mailer send error:",e)}}async function m(e){try{let t=await fetch(e,{signal:AbortSignal.timeout(5e3)});if(!t.ok)return null;return Buffer.from(await t.arrayBuffer())}catch{return null}}async function h(e){let t=[],o=new Map;return await Promise.all(e.map(async(e,r)=>{if(!e.imageUrl)return;let i=await m(e.imageUrl.startsWith("http")?e.imageUrl:y+e.imageUrl);if(!i)return;let a=`product-${r}@daisy`,n=e.imageUrl.split(".").pop()?.split("?")[0]??"jpg";t.push({filename:`product-${r}.${n}`,content:i,cid:a}),o.set(e.imageUrl,`cid:${a}`)})),{attachments:t,cidMap:o}}function b(e,t=""){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Daisy Gadgets Co.</title>
</head>
<body style="margin:0;padding:0;background:${d};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${d};padding:28px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid ${g}">

        <!-- Gold shimmer top bar -->
        <tr><td style="background:linear-gradient(90deg,${d},${p},${l},${p},${d});height:3px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Header -->
        <tr>
          <td style="background:${d};padding:24px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="cid:${s}" alt="Daisy Gadgets Co." height="44" style="height:44px;width:auto;display:block;border:0" />
                </td>
                <td align="right">
                  <a href="${y}" style="color:${f};font-size:12px;text-decoration:none">daisygadgetsco.co.za</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${t}

        <!-- Body -->
        <tr>
          <td style="background:#111111;padding:36px 36px 32px;border-top:1px solid ${g}">
            ${e}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${d};padding:24px 36px;border-top:1px solid ${g}">
            <p style="margin:0 0 8px;color:${f};font-size:12px;text-align:center">
              Questions? &nbsp;
              <a href="https://wa.me/${x}" style="color:${p};text-decoration:none;font-weight:600">WhatsApp +27 84 896 1782</a>
              &nbsp;\xb7&nbsp;
              <a href="${y}" style="color:${p};text-decoration:none;font-weight:600">daisygadgetsco.co.za</a>
            </p>
            <p style="margin:0;color:#333;font-size:11px;text-align:center">
              \xa9 ${new Date().getFullYear()} Daisy Gadgets Co. \xb7 All rights reserved.
            </p>
          </td>
        </tr>

        <!-- Bottom gold bar -->
        <tr><td style="background:linear-gradient(90deg,${d},${p},${l},${p},${d});height:2px;font-size:0;line-height:0">&nbsp;</td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`}function $(e){return`<p style="margin:0 0 3px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em">${e}</p>`}function v(){return`<div style="height:1px;background:${g};margin:24px 0"></div>`}function w(e,t,o=p,r=d){return`<a href="${t}" style="display:inline-block;background:${o};color:${r};font-weight:800;text-decoration:none;padding:13px 26px;border-radius:10px;font-size:14px;letter-spacing:0.02em">${e}</a>`}function z(e,t){return`<tr>
    <td style="padding:8px 0;color:${f};font-size:13px;width:150px;vertical-align:top;border-bottom:1px solid ${g}">${e}</td>
    <td style="padding:8px 0;color:#e5e7eb;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid ${g}">${t}</td>
  </tr>`}function k(e,t){return`<span style="display:inline-block;background:${t}22;color:${t};border:1px solid ${t}55;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.05em">${e}</span>`}async function D(e){let{attachments:t,cidMap:o}=await h(e.items),r=e.items.map(e=>{let t=(parseFloat(String(e.price).replace(/[^0-9.]/g,""))*e.qty).toLocaleString("en-ZA"),r=e.imageUrl?o.get(e.imageUrl)??(e.imageUrl.startsWith("http")?e.imageUrl:y+e.imageUrl):null,i=r?`<img src="${r}" alt="${e.name}" width="64" height="64" style="width:64px;height:64px;object-fit:cover;border-radius:10px;display:block;border:1px solid ${g}" />`:`<div style="width:64px;height:64px;background:${c};border:1px solid ${g};border-radius:10px"></div>`;return`
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${g};width:76px;vertical-align:middle">${i}</td>
      <td style="padding:12px 12px;border-bottom:1px solid ${g};vertical-align:middle">
        <p style="margin:0 0 4px;color:#e5e7eb;font-size:14px;font-weight:600">${e.name}</p>
        <p style="margin:0;color:${f};font-size:12px">Qty: ${e.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${g};text-align:right;vertical-align:middle">
        <span style="color:${p};font-size:14px;font-weight:700">R ${t}</span>
      </td>
    </tr>`}).join(""),i=b(`
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:48px;line-height:1;margin-bottom:12px">🎊</div>
      <h1 style="margin:0 0 8px;color:#f9fafb;font-size:26px;font-weight:900">Thank you for your purchase!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${e.name.split(" ")[0]}, your payment has been verified and your order is confirmed.</p>
    </div>

    <!-- Ref pill -->
    <div style="background:${c};border:1px solid ${p}44;border-radius:10px;padding:14px 20px;margin-bottom:28px;display:flex;align-items:center">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="color:${f};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Order Reference</td>
        <td style="text-align:right;color:${p};font-size:18px;font-weight:900;letter-spacing:0.08em;font-family:monospace">${e.ref}</td>
      </tr></table>
    </div>

    <!-- Items -->
    <p style="margin:0 0 12px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Order Summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px">
      ${r}
    </table>

    <!-- Totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 28px">
      <tr>
        <td style="padding:6px 0;color:${f};font-size:13px">Subtotal</td>
        <td style="padding:6px 0;text-align:right;color:#d1d5db;font-size:13px">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:${f};font-size:13px">Shipping</td>
        <td style="padding:6px 0;text-align:right;color:#22c55e;font-size:13px;font-weight:700">Free</td>
      </tr>
      <tr>
        <td style="padding:10px 0 0;color:#e5e7eb;font-size:16px;font-weight:800;border-top:1px solid ${g}">Total</td>
        <td style="padding:10px 0 0;text-align:right;color:${p};font-size:20px;font-weight:900;border-top:1px solid ${g}">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${v()}

    <!-- Customer info grid -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Customer Information</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
      <tr>
        <td width="50%" style="padding:0 8px 0 0;vertical-align:top">
          <div style="background:${c};border:1px solid ${g};border-radius:10px;padding:16px 18px;margin-bottom:12px">
            <p style="margin:0 0 6px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Address</p>
            <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${e.name}<br>${e.address||"—"}</p>
          </div>
          <div style="background:${c};border:1px solid ${g};border-radius:10px;padding:16px 18px">
            <p style="margin:0 0 6px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Billing Address</p>
            <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${e.name}<br>${e.address||"—"}</p>
          </div>
        </td>
        <td width="50%" style="padding:0 0 0 8px;vertical-align:top">
          <div style="background:${c};border:1px solid ${g};border-radius:10px;padding:16px 18px;margin-bottom:12px">
            <p style="margin:0 0 6px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Method</p>
            <p style="margin:0;color:#d1d5db;font-size:13px">📦 Standard Delivery<br><span style="color:${f};font-size:12px">2–5 business days</span></p>
          </div>
          <div style="background:${c};border:1px solid ${g};border-radius:10px;padding:16px 18px">
            <p style="margin:0 0 6px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Payment Method</p>
            <p style="margin:0;color:#d1d5db;font-size:13px">🏦 EFT Bank Transfer<br><span style="color:#22c55e;font-size:12px;font-weight:700">✔ Payment Verified</span></p>
          </div>
        </td>
      </tr>
    </table>

    <div style="text-align:center">
      ${w("💬 Chat on WhatsApp",`https://wa.me/${x}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff")}
    </div>
  `);await u({to:e.email,subject:`Order Confirmed ✨ — ${e.ref} | Daisy Gadgets Co.`,html:i,attachments:t})}async function A(e){let t=b(`
    ${$("Payment Received")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">✅ We got your proof!</h1>
    <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.6">
      Hi ${e.name.split(" ")[0]}, we received your proof of payment for order <strong style="color:${p}">${e.ref}</strong>.
    </p>

    <div style="background:${c};border:1px solid #22c55e44;border-left:3px solid #22c55e;border-radius:0 12px 12px 0;padding:18px 20px;margin-bottom:28px">
      <p style="margin:0;color:#86efac;font-size:14px;line-height:1.7">
        Your proof is under review. We will verify and confirm your order within <strong>24 hours</strong>. You will receive another email as soon as it is approved.
      </p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Need help or want to check in?</p>
    ${w("Chat on WhatsApp",`https://wa.me/${x}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff")}
  `);await u({to:e.email,subject:`Payment Proof Received — ${e.ref} | Daisy Gadgets Co.`,html:t})}async function C(e){let t=e.bank??a("fnb"),{attachments:o,cidMap:r}=await h(e.items),i=e.items.map(e=>{let t=(parseFloat(String(e.price).replace(/[^0-9.]/g,""))*e.qty).toLocaleString("en-ZA"),o=parseFloat(String(e.price).replace(/[^0-9.]/g,"")).toLocaleString("en-ZA"),i=e.imageUrl?r.get(e.imageUrl)??(e.imageUrl.startsWith("http")?e.imageUrl:y+e.imageUrl):null,a=i?`<img src="${i}" alt="${e.name}" width="64" height="64" style="width:64px;height:64px;object-fit:cover;border-radius:10px;display:block;border:1px solid ${g}" />`:`<div style="width:64px;height:64px;background:${c};border:1px solid ${g};border-radius:10px"></div>`;return`
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${g};width:76px;vertical-align:middle">${a}</td>
      <td style="padding:12px 10px;border-bottom:1px solid ${g};vertical-align:middle">
        <p style="margin:0 0 3px;color:#e5e7eb;font-size:14px;font-weight:600">${e.name}</p>
        <p style="margin:0;color:${f};font-size:12px">R ${o} \xd7 ${e.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${g};text-align:right;vertical-align:middle">
        <span style="color:${p};font-size:14px;font-weight:700">R ${t}</span>
      </td>
    </tr>`}).join(""),n=e.reason?`<div style="background:${c};border-left:3px solid #ef4444;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:24px">
        <p style="margin:0 0 4px;color:#ef4444;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Reason from our team</p>
        <p style="margin:0;color:#fca5a5;font-size:14px;line-height:1.6">${e.reason}</p>
       </div>`:"",s=b(`
    <!-- Hero -->
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:48px;line-height:1;margin-bottom:14px">🔔</div>
      <div style="display:inline-block;background:#ef444420;color:#ef4444;border:1px solid #ef444450;padding:5px 16px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.06em;margin-bottom:14px">Action Required</div>
      <h1 style="margin:0 0 10px;color:#f9fafb;font-size:26px;font-weight:900;line-height:1.2">Payment could not be verified</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px;line-height:1.6">Hi <strong style="color:#e5e7eb">${e.name.split(" ")[0]}</strong>, we were unable to verify your proof of payment for order <strong style="color:${p};font-family:monospace">${e.ref}</strong>.</p>
    </div>

    ${n}

    <p style="margin:0 0 24px;color:#9ca3af;font-size:14px;line-height:1.7">
      Don&apos;t worry — this happens sometimes. Please re-do your payment using the details below and upload a clear screenshot or photo of your confirmation.
    </p>

    ${v()}

    <!-- Order summary with images -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Your Order</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px">
      ${i}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 28px">
      <tr>
        <td style="padding:6px 0;color:${f};font-size:13px">Subtotal</td>
        <td style="padding:6px 0;text-align:right;color:#d1d5db;font-size:13px">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:${f};font-size:13px">Shipping</td>
        <td style="padding:6px 0;text-align:right;color:#22c55e;font-size:13px;font-weight:700">Free</td>
      </tr>
      <tr>
        <td style="padding:10px 0 0;color:#e5e7eb;font-size:16px;font-weight:800;border-top:1px solid ${g}">Total Due</td>
        <td style="padding:10px 0 0;text-align:right;color:${p};font-size:20px;font-weight:900;border-top:1px solid ${g}">R ${e.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${v()}

    <!-- Bank details -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Payment Details (EFT)</p>
    <div style="background:${c};border:1px solid ${g};border-radius:12px;padding:4px 20px;margin-bottom:28px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${z("Bank",t.bank)}
        ${z("Account Holder",t.accountHolder)}
        ${z("Account Type",t.accountType)}
        ${z("Account Number",`<span style="font-family:monospace;font-size:15px;color:${p};letter-spacing:0.06em">${t.accountNumber}</span>`)}
        ${z("Branch Code",t.branchCode)}
        ${t.payshap?z("PayShap",t.payshap):""}
        ${z("Reference",`<strong style="color:${p};font-size:15px;font-family:monospace">${e.ref}</strong>`)}
        ${z("Amount",`<strong style="color:${p};font-size:15px">R ${e.total.toLocaleString("en-ZA")}</strong>`)}
      </table>
    </div>

    <p style="margin:0 0 20px;color:#9ca3af;font-size:14px">Once paid, upload your new proof of payment — or send it directly on WhatsApp and we will update your order manually.</p>
    <div>
      ${w("📤 Upload New Proof",`${y}/checkout`,p,d)}
      &nbsp;&nbsp;
      ${w("💬 Send via WhatsApp",`https://wa.me/${x}?text=Hi%2C%20re-sending%20proof%20for%20order%20${e.ref}`,"#25D366","#fff")}
    </div>
  `);await u({to:e.email,subject:`⚠️ Action Required — ${e.ref} | Daisy Gadgets Co.`,html:s,attachments:o})}let S={approved:{pill:["Payment Approved","#22c55e"],icon:"🎊",title:"Your payment is confirmed!",body:"Great news — your payment has been verified and your order is now being packed and prepared for dispatch. We will notify you as soon as it ships.",cta:["💬 Chat on WhatsApp",`https://wa.me/${x}`]},shipped:{pill:["Shipped","#3b82f6"],icon:"📦",title:"Your order has been shipped!",body:"We are pleased to inform you that your order has been successfully packed, processed and shipped.\n\nYour parcel is now in transit to the selected delivery destination. Please keep your contact number available in case our delivery team needs to contact you regarding your order.\n\nWe will notify you again when your order moves to Out for Delivery.",cta:["💬 Track via WhatsApp",`https://wa.me/${x}`]},delivered:{pill:["Delivered",p],icon:"🎁",title:"Your order has been delivered!",body:"We are delighted to confirm that your Daisy Gadgets Co. order has been successfully delivered.\n\nThank you for trusting Daisy Gadgets Co. with your purchase. We hope you are completely satisfied with your order. If you experience any issue with the product or require assistance after delivery, please contact our customer support team and we will be happy to assist.\n\nWe would also appreciate your feedback about your shopping experience with us.\n\nThank you for choosing Daisy Gadgets Co. — Smart Tech. Better Living.",cta:["⭐ Leave a Review",`${y}/reviews`]}};async function T(e){let t=S[e.status];if(!t)return;let o=e.notes?`<div style="background:${c};border-left:3px solid ${p};border-radius:0 10px 10px 0;padding:14px 18px;margin:20px 0">
        <p style="margin:0 0 4px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Note from our team</p>
        <p style="margin:0;color:#d1d5db;font-size:14px;font-style:italic;line-height:1.6">"${e.notes}"</p>
       </div>`:"",r="shipped"===e.status&&e.tracking_number?`<div style="background:${c};border:1px solid #3b82f644;border-left:3px solid #3b82f6;border-radius:0 12px 12px 0;padding:16px 20px;margin:4px 0 20px">
        <p style="margin:0 0 4px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Your Tracking Number</p>
        <p style="margin:0;color:#93c5fd;font-size:20px;font-weight:700;font-family:monospace;letter-spacing:0.08em">${e.tracking_number}</p>
       </div>`:"",i="delivered"===e.status?`<div style="background:${c};border:1px solid ${p}33;border-radius:12px;padding:16px 20px;margin:4px 0 20px">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:${f};font-size:13px">Delivery Status</td>
            <td style="color:#10b981;font-size:13px;font-weight:700;text-align:right">Successfully Delivered</td>
          </tr>
          <tr>
            <td style="color:${f};font-size:13px;padding-top:8px">Delivery Date</td>
            <td style="color:#e5e7eb;font-size:13px;font-weight:600;text-align:right;padding-top:8px">${new Date().toLocaleDateString("en-ZA",{day:"numeric",month:"long",year:"numeric"})}</td>
          </tr>
        </table>
       </div>`:"",a={approved:`Payment Approved — ${e.ref} | Daisy Gadgets Co.`,rejected:`Action Required — ${e.ref} | Daisy Gadgets Co.`,shipped:`Your Order Has Been Shipped – #${e.ref}`,delivered:`Order Successfully Delivered – #${e.ref}`},n=b(`
    <div style="margin-bottom:16px">${k(...t.pill)}</div>
    <div style="font-size:36px;margin-bottom:12px;line-height:1">${t.icon}</div>
    <h1 style="margin:0 0 6px;color:#f9fafb;font-size:26px;font-weight:900">${t.title}</h1>
    <p style="margin:0 0 4px;color:${f};font-size:13px">Order: <strong style="color:${p}">${e.ref}</strong></p>
    ${v()}
    <p style="margin:0 0 14px;color:#9ca3af;font-size:15px">Dear ${e.name.split(" ")[0]},</p>
    ${i}
    ${r}
    ${t.body.split("\n\n").map(e=>`<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${e}</p>`).join("")}
    ${o}
    ${t.cta?`<div style="margin-top:24px">${w(t.cta[0],t.cta[1])}&nbsp;&nbsp;${w("💬 WhatsApp Us",`https://wa.me/${x}?text=Hi%2C%20re%20order%20${e.ref}`,"#25D366","#fff")}</div>`:""}
  `);await u({to:e.email,subject:a[e.status]??`Order Update — ${e.ref}`,html:n})}let Y={processing:{icon:"⚙️",pillText:"Being Prepared",pillColor:"#8b5cf6",title:"Your order is being prepared",subject:"Your Order Is Being Prepared – Daisy Gadgets Co.",defaultMessage:"We are pleased to confirm that your order has been successfully confirmed and is now being prepared by our fulfilment team.\n\nOur team is carefully preparing your order to ensure everything is correct before it moves to the next stage.\n\nWe will notify you as soon as your order is ready for packing.",stage:2},packed:{icon:"📦",pillText:"Being Packed",pillColor:"#3b82f6",title:"Your order is being packed",subject:"Your Order Is Being Packed – Daisy Gadgets Co.",defaultMessage:"Your order has successfully moved to the packing stage.\n\nOur fulfilment team is currently checking and securely packaging your order to ensure that it is properly prepared for transportation.\n\nOnce packing and final quality checks are completed, your order will proceed to shipping. You will receive another notification when your order has been dispatched.",stage:3},out_for_delivery:{icon:"🏠",pillText:"Out for Delivery",pillColor:"#10b981",title:"Your order is out for delivery today!",subject:"Your Order Is Out for Delivery Today",defaultMessage:"Great news. Your Daisy Gadgets Co. order is now out for delivery.\n\nYour assigned delivery driver is currently completing the delivery route and will contact you directly when they are approaching your location.\n\nKindly keep your phone available and ensure that someone is available to receive the order.\n\nPlease note: Delivery times may vary depending on the driver's route, traffic and other scheduled deliveries.\n\nWe appreciate your patience and look forward to completing your delivery successfully.",stage:5},delayed:{icon:"⏳",pillText:"Slight Delay",pillColor:"#f59e0b",title:"A small update on your order",subject:"Update on Your Order – Daisy Gadgets Co.",defaultMessage:"We would like to inform you that there has been a slight delay with your order. We sincerely apologise for any inconvenience this may cause.\n\nOur team is working to resolve this as quickly as possible and your order will be on its way shortly. We will keep you updated with any further changes.",stage:-1},custom:{icon:"📬",pillText:"Update",pillColor:p,title:"An update on your order",subject:"Update on Your Order – Daisy Gadgets Co.",defaultMessage:"",stage:-1}};async function P(e){var t;let o,r,i,a=Y[e.templateId]??Y.custom,n=e.message?e.message.split("\n\n").map(e=>`<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${e}</p>`).join(""):"",s=e.tracking_number?`<div style="background:${c};border:1px solid #3b82f644;border-left:3px solid #3b82f6;border-radius:0 12px 12px 0;padding:16px 20px;margin:16px 0 20px">
        <p style="margin:0 0 4px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Your Tracking Number</p>
        <p style="margin:0;color:#93c5fd;font-size:20px;font-weight:700;font-family:monospace;letter-spacing:0.08em">${e.tracking_number}</p>
       </div>`:"",l=b(`
    <div style="margin-bottom:16px">${k(a.pillText,a.pillColor)}</div>
    <div style="font-size:36px;margin-bottom:12px;line-height:1">${a.icon}</div>
    <h1 style="margin:0 0 6px;color:#f9fafb;font-size:26px;font-weight:900">${a.title}</h1>
    <p style="margin:0 0 4px;color:${f};font-size:13px">Order: <strong style="color:${p}">${e.ref}</strong></p>
    ${v()}
    <p style="margin:0 0 14px;color:#9ca3af;font-size:15px">Dear ${e.name.split(" ")[0]},</p>
    ${a.stage>0?(t=a.stage,r=[],i=[],(o=["Order Placed","Processing","Packed","Dispatched","Delivered"]).forEach((e,a)=>{let n=a+1,s=n<t,l=n===t,c=s?"#10b981":l?p:"#1a1a1a",g=s?"#fff":l?d:"#555";r.push(`<td align="center"><table cellpadding="0" cellspacing="0" style="margin:0 auto"><tr><td align="center" width="28" height="28" style="width:28px;height:28px;border-radius:14px;background:${c};border:2px solid ${s?"#10b981":l?p:"#2a2a2a"};text-align:center;vertical-align:middle;font-size:11px;font-weight:800;color:${g};line-height:24px">${s?"&#10003;":n}</td></tr></table></td>`),i.push(`<td align="center" style="padding:6px 2px 0;vertical-align:top"><p style="margin:0;font-size:10px;color:${l?"#e5e7eb":s?"#9ca3af":"#4b5563"};font-weight:${l?700:400};line-height:1.4">${e}</p></td>`),a<o.length-1&&(r.push(`<td style="vertical-align:middle;padding-bottom:4px"><div style="height:2px;background:${a+1<t?"#10b981":"#2a2a2a"}"></div></td>`),i.push("<td></td>"))}),`<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 8px"><tr>${r.join("")}</tr><tr>${i.join("")}</tr></table>`):""}
    ${s}
    ${n}
    <div style="margin-top:8px">
      ${w("💬 Chat on WhatsApp",`https://wa.me/${x}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff")}
    </div>
  `);await u({to:e.email,subject:a.subject,html:l})}async function R(e){let t=b(`
    ${$("Your Quote is Ready")}
    <h1 style="margin:6px 0 6px;color:#f9fafb;font-size:28px;font-weight:900">Hi ${e.name.split(" ")[0]}, here is your quote</h1>
    <p style="margin:0 0 28px;color:${f};font-size:13px">Reference: <strong style="color:#e5e7eb">${e.ref}</strong></p>

    <!-- Package card -->
    <div style="background:${c};border:1px solid ${p}44;border-radius:14px;padding:28px;margin-bottom:24px;text-align:center">
      ${$("Recommended Package")}
      <p style="margin:8px 0 20px;color:#f9fafb;font-size:22px;font-weight:900">${e.package}</p>
      <div style="height:1px;background:${g};margin:0 0 20px"></div>
      ${$("Estimated Price")}
      <p style="margin:8px 0 0;color:${p};font-size:34px;font-weight:900;letter-spacing:0.02em">${e.price}</p>
    </div>

    ${e.message?`
    <p style="margin:0 0 10px;color:#e5e7eb;font-size:15px;font-weight:700">Message from our team</p>
    <div style="background:${c};border:1px solid ${g};border-left:3px solid ${p};border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:28px">
      <p style="margin:0;color:#d1d5db;font-size:14px;line-height:1.8">${e.message.replace(/\n/g,"<br>")}</p>
    </div>`:""}

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Ready to proceed or have questions?</p>
    ${w("Accept Quote",`https://wa.me/${x}?text=Hi%2C%20I%20accept%20quote%20${e.ref}`,p,d)}
    &nbsp;&nbsp;
    ${w("Ask a Question",`https://wa.me/${x}?text=Hi%2C%20question%20about%20quote%20${e.ref}`,"#25D366","#fff")}
  `);await u({to:e.email,subject:`Your Quote — ${e.ref} | Daisy Gadgets Co.`,html:t})}async function j(e){let t=b(`
    ${$("Welcome to the family")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">
      ✨ You are in${e.name?`, ${e.name.split(" ")[0]}`:""}!
    </h1>
    <p style="margin:0 0 28px;color:#9ca3af;font-size:15px;line-height:1.6">Thank you for joining the Daisy Gadgets Co. family. Here is your exclusive first-order discount code:</p>

    <!-- Code card -->
    <div style="background:${d};border:1px solid ${p}55;border-radius:14px;padding:32px;text-align:center;margin-bottom:28px">
      ${$("Your Exclusive Discount Code")}
      <p style="margin:12px 0;color:${p};font-size:40px;font-weight:900;letter-spacing:0.15em;font-family:monospace">DAISY25</p>
      <div style="height:1px;background:${g};margin:16px 0"></div>
      <p style="margin:0;color:${f};font-size:13px;line-height:1.6">💎 25% off your first order — mention this code on WhatsApp<br>when placing your order. Valid for all products.</p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Browse our full range of gadgets, appliances, solar solutions and more:</p>
    ${w("🛍️ Shop Now",`${y}/shop`)}
    &nbsp;&nbsp;
    ${w("💬 Claim via WhatsApp",`https://wa.me/${x}?text=Hi%2C%20I%20have%20the%20discount%20code%20DAISY25`,"#25D366","#fff")}
  `);await u({to:e.email,subject:"✨ Your 25% Discount Code — Daisy Gadgets Co.",html:t})}e.s(["TRACKING_TEMPLATES",0,Y,"sendMail",0,u,"sendOrderConfirmation",0,D,"sendProofAcknowledgement",0,A,"sendQuoteReply",0,R,"sendRejectionEmail",0,C,"sendStatusUpdate",0,T,"sendTrackingUpdate",0,P,"sendWelcomeEmail",0,j],67010)}];

//# sourceMappingURL=lib_mailer_ts_0qdwzgv._.js.map