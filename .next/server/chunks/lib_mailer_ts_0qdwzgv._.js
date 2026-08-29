module.exports=[67010,33464,e=>{"use strict";var t=e.i(84423),o=e.i(14747),r=e.i(22734),i=e.i(72507);function n(){let e=(0,i.getBankConfig)();return{id:"primary",bank:e.bank,accountHolder:e.accountHolder,accountType:e.accountType,accountNumber:e.accountNumber,branchCode:e.branchCode}}e.s(["getBankById",0,function(e){return n()},"getDefaultBank",0,n],33464);let a=o.default.join(process.cwd(),"public","logo.jpg"),l="logo@bevanssons",p="#FFFFFF",s="#D1D5DB",d="#0A0A0A",c="#161616",g="#1F1F1F",f="#6b7280",m=i.BRAND.whatsapp,x=i.BRAND.domain,y=i.BRAND.name;async function h(e){let o=process.env.RESEND_API_KEY?t.default.createTransport({host:"smtp.resend.com",port:587,secure:!1,auth:{user:"resend",pass:process.env.RESEND_API_KEY}}):process.env.MAIL_USER&&process.env.MAIL_PASS?t.default.createTransport({service:"gmail",auth:{user:process.env.MAIL_USER,pass:process.env.MAIL_PASS}}):null;if(!o)return void console.error("mailer: env vars missing");try{let t,i=e.attachments??[];(0,r.existsSync)(a)&&i.unshift({filename:"logo.jpg",path:a,cid:l}),await o.sendMail({from:(t=new URL(x).hostname,process.env.RESEND_API_KEY?`"${y}" <noreply@${t}>`:`"${y}" <${process.env.MAIL_USER??`noreply@${t}`}>`),to:e.to,subject:e.subject,html:e.html,attachments:i})}catch(e){console.error("mailer send error:",e)}}async function u(e){try{let t=await fetch(e,{signal:AbortSignal.timeout(5e3)});if(!t.ok)return null;return Buffer.from(await t.arrayBuffer())}catch{return null}}async function $(e){let t=[],o=new Map;return await Promise.all(e.map(async(e,r)=>{if(!e.imageUrl)return;let i=await u(e.imageUrl.startsWith("http")?e.imageUrl:x+e.imageUrl);if(!i)return;let n=`product-${r}@bevans`,a=e.imageUrl.split(".").pop()?.split("?")[0]??"jpg";t.push({filename:`product-${r}.${a}`,content:i,cid:n}),o.set(e.imageUrl,`cid:${n}`)})),{attachments:t,cidMap:o}}function b(e){return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${y}</title>
</head>
<body style="margin:0;padding:0;background:${d};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${d};padding:28px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid ${g}">

        <!-- Top border -->
        <tr><td style="background:${p};height:2px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Header -->
        <tr>
          <td style="background:${d};padding:24px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="cid:${l}" alt="${y}" height="44" style="height:44px;width:auto;display:block;border:0" />
                </td>
                <td align="right">
                  <a href="${x}" style="color:${f};font-size:12px;text-decoration:none">${new URL(x).hostname}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

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
              ${m?`<a href="https://wa.me/${m}" style="color:${p};text-decoration:none;font-weight:600">WhatsApp</a> &nbsp;\xb7&nbsp;`:""}
              <a href="${x}" style="color:${p};text-decoration:none;font-weight:600">${new URL(x).hostname}</a>
            </p>
            <p style="margin:0;color:#333;font-size:11px;text-align:center">
              \xa9 ${new Date().getFullYear()} ${y}. All rights reserved.
            </p>
          </td>
        </tr>

        <!-- Bottom border -->
        <tr><td style="background:${p};height:1px;font-size:0;line-height:0">&nbsp;</td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`}function w(e){return`<p style="margin:0 0 3px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em">${e}</p>`}function v(){return`<div style="height:1px;background:${g};margin:24px 0"></div>`}function z(e,t,o=p,r=d){return`<a href="${t}" style="display:inline-block;background:${o};color:${r};font-weight:800;text-decoration:none;padding:13px 26px;border-radius:10px;font-size:14px;letter-spacing:0.02em">${e}</a>`}function k(e,t){return`<tr>
    <td style="padding:8px 0;color:${f};font-size:13px;width:150px;vertical-align:top;border-bottom:1px solid ${g}">${e}</td>
    <td style="padding:8px 0;color:#e5e7eb;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid ${g}">${t}</td>
  </tr>`}function A(e,t){return`<span style="display:inline-block;background:${t}22;color:${t};border:1px solid ${t}55;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.05em">${e}</span>`}async function S(e){let{attachments:t,cidMap:o}=await $(e.items),r=e.items.map(e=>{let t=(parseFloat(String(e.price).replace(/[^0-9.]/g,""))*e.qty).toLocaleString("en-ZA"),r=e.imageUrl?o.get(e.imageUrl)??(e.imageUrl.startsWith("http")?e.imageUrl:x+e.imageUrl):null,i=r?`<img src="${r}" alt="${e.name}" width="64" height="64" style="width:64px;height:64px;object-fit:cover;border-radius:10px;display:block;border:1px solid ${g}" />`:`<div style="width:64px;height:64px;background:${c};border:1px solid ${g};border-radius:10px"></div>`,n=[e.size,e.colour].filter(Boolean).join(" · ");return`
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${g};width:76px;vertical-align:middle">${i}</td>
      <td style="padding:12px 12px;border-bottom:1px solid ${g};vertical-align:middle">
        <p style="margin:0 0 4px;color:#e5e7eb;font-size:14px;font-weight:600">${e.name}</p>
        ${n?`<p style="margin:0 0 2px;color:${f};font-size:12px">${n}</p>`:""}
        <p style="margin:0;color:${f};font-size:12px">Qty: ${e.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${g};text-align:right;vertical-align:middle">
        <span style="color:${p};font-size:14px;font-weight:700">R ${t}</span>
      </td>
    </tr>`}).join(""),i=b(`
    <div style="text-align:center;margin-bottom:28px">
      <h1 style="margin:0 0 8px;color:#f9fafb;font-size:26px;font-weight:900">Thank you for your order!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${e.name.split(" ")[0]}, your payment has been verified and your order is confirmed.</p>
    </div>

    <div style="background:${c};border:1px solid #ffffff22;border-radius:10px;padding:14px 20px;margin-bottom:28px">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="color:${f};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Order Reference</td>
        <td style="text-align:right;color:${p};font-size:18px;font-weight:900;letter-spacing:0.08em;font-family:monospace">${e.ref}</td>
      </tr></table>
    </div>

    <p style="margin:0 0 12px;color:#e5e7eb;font-size:15px;font-weight:700">Order Summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px">
      ${r}
    </table>

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

    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">Delivery Information</p>
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td width="50%" style="padding:0 8px 0 0;vertical-align:top">
        <div style="background:${c};border:1px solid ${g};border-radius:10px;padding:16px 18px">
          <p style="margin:0 0 6px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Address</p>
          <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${e.name}<br>${e.address||"—"}</p>
        </div>
      </td>
      <td width="50%" style="padding:0 0 0 8px;vertical-align:top">
        <div style="background:${c};border:1px solid ${g};border-radius:10px;padding:16px 18px">
          <p style="margin:0 0 6px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Delivery</p>
          <p style="margin:0;color:#d1d5db;font-size:13px">Standard Delivery<br><span style="color:${f};font-size:12px">3–5 business days</span></p>
        </div>
      </td>
    </tr></table>

    <div style="text-align:center;margin-top:24px">
      ${m?z("Chat on WhatsApp",`https://wa.me/${m}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff"):""}
    </div>
  `);await h({to:e.email,subject:`Order Confirmed — ${e.ref} | ${y}`,html:i,attachments:t})}async function D(e){let t=process.env.ADMIN_EMAIL;if(!t)return;let o=e.items.map(e=>{let t=[e.size,e.colour].filter(Boolean).join(" · ");return`• ${e.name}${t?` (${t})`:""} \xd7 ${e.qty} — R ${parseFloat(String(e.price).replace(/[^0-9.]/g,"")).toLocaleString("en-ZA")}`}).join("<br>"),r=b(`
    <h1 style="margin:0 0 8px;color:#f9fafb;font-size:22px;font-weight:900">New Order Received</h1>
    <p style="margin:0 0 20px;color:${f};font-size:14px">Ref: <strong style="color:${p}">${e.ref}</strong></p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
      ${k("Name",e.name)}
      ${k("Email",e.email)}
      ${k("Phone",e.phone??"—")}
      ${k("Address",e.address??"—")}
      ${k("Total",`R ${e.total.toLocaleString("en-ZA")}`)}
    </table>
    <p style="margin:0 0 8px;color:#e5e7eb;font-size:14px;font-weight:700">Items</p>
    <p style="margin:0 0 20px;color:#d1d5db;font-size:13px;line-height:2">${o}</p>
    ${z("View in Admin",`${x}/admin/dashboard/orders`)}
  `);await h({to:t,subject:`New Order — ${e.ref} | ${y}`,html:r})}async function R(e){let t=b(`
    ${w("Payment Received")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">We got your proof!</h1>
    <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.6">
      Hi ${e.name.split(" ")[0]}, we received your proof of payment for order <strong style="color:${p}">${e.ref}</strong>.
    </p>

    <div style="background:${c};border:1px solid #22c55e44;border-left:3px solid #22c55e;border-radius:0 12px 12px 0;padding:18px 20px;margin-bottom:28px">
      <p style="margin:0;color:#86efac;font-size:14px;line-height:1.7">
        Your proof is under review. We will verify and confirm your order within <strong>24 hours</strong>. You will receive another email as soon as it is approved.
      </p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Need help or want to check in?</p>
    ${m?z("Chat on WhatsApp",`https://wa.me/${m}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff"):""}
  `);await h({to:e.email,subject:`Payment Proof Received — ${e.ref} | ${y}`,html:t})}async function P(e){let t=e.bank??n(),{attachments:o,cidMap:r}=await $(e.items),i=e.items.map(e=>{let t=(parseFloat(String(e.price).replace(/[^0-9.]/g,""))*e.qty).toLocaleString("en-ZA"),o=parseFloat(String(e.price).replace(/[^0-9.]/g,"")).toLocaleString("en-ZA"),i=e.imageUrl?r.get(e.imageUrl)??(e.imageUrl.startsWith("http")?e.imageUrl:x+e.imageUrl):null,n=i?`<img src="${i}" alt="${e.name}" width="64" height="64" style="width:64px;height:64px;object-fit:cover;border-radius:10px;display:block;border:1px solid ${g}" />`:`<div style="width:64px;height:64px;background:${c};border:1px solid ${g};border-radius:10px"></div>`;return`
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${g};width:76px;vertical-align:middle">${n}</td>
      <td style="padding:12px 10px;border-bottom:1px solid ${g};vertical-align:middle">
        <p style="margin:0 0 3px;color:#e5e7eb;font-size:14px;font-weight:600">${e.name}</p>
        <p style="margin:0;color:${f};font-size:12px">R ${o} \xd7 ${e.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${g};text-align:right;vertical-align:middle">
        <span style="color:${p};font-size:14px;font-weight:700">R ${t}</span>
      </td>
    </tr>`}).join(""),a=e.reason?`<div style="background:${c};border-left:3px solid #ef4444;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:24px">
        <p style="margin:0 0 4px;color:#ef4444;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Reason from our team</p>
        <p style="margin:0;color:#fca5a5;font-size:14px;line-height:1.6">${e.reason}</p>
       </div>`:"",l=b(`
    <div style="text-align:center;margin-bottom:28px">
      <div style="display:inline-block;background:#ef444420;color:#ef4444;border:1px solid #ef444450;padding:5px 16px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.06em;margin-bottom:14px">Action Required</div>
      <h1 style="margin:0 0 10px;color:#f9fafb;font-size:26px;font-weight:900;line-height:1.2">Payment could not be verified</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px;line-height:1.6">Hi <strong style="color:#e5e7eb">${e.name.split(" ")[0]}</strong>, we were unable to verify your proof of payment for order <strong style="color:${p};font-family:monospace">${e.ref}</strong>.</p>
    </div>

    ${a}

    <p style="margin:0 0 24px;color:#9ca3af;font-size:14px;line-height:1.7">
      Please re-do your payment using the details below and upload a clear screenshot of your confirmation.
    </p>

    ${v()}

    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">Your Order</p>
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

    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">Payment Details (EFT)</p>
    <div style="background:${c};border:1px solid ${g};border-radius:12px;padding:4px 20px;margin-bottom:28px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${k("Bank",t.bank)}
        ${k("Account Holder",t.accountHolder)}
        ${k("Account Type",t.accountType)}
        ${k("Account Number",`<span style="font-family:monospace;font-size:15px;color:${p};letter-spacing:0.06em">${t.accountNumber}</span>`)}
        ${k("Branch Code",t.branchCode)}
        ${t.payshap?k("PayShap",t.payshap):""}
        ${k("Reference",`<strong style="color:${p};font-size:15px;font-family:monospace">${e.ref}</strong>`)}
        ${k("Amount",`<strong style="color:${p};font-size:15px">R ${e.total.toLocaleString("en-ZA")}</strong>`)}
      </table>
    </div>

    <p style="margin:0 0 20px;color:#9ca3af;font-size:14px">Once paid, upload your new proof of payment — or send it directly on WhatsApp.</p>
    <div>
      ${z("Upload New Proof",`${x}/checkout`,p,d)}
      ${m?`&nbsp;&nbsp;${z("Send via WhatsApp",`https://wa.me/${m}?text=Hi%2C%20re-sending%20proof%20for%20order%20${e.ref}`,"#25D366","#fff")}`:""}
    </div>
  `);await h({to:e.email,subject:`Action Required — ${e.ref} | ${y}`,html:l,attachments:o})}let j={approved:{pill:["Payment Approved","#22c55e"],icon:"✓",title:"Your payment is confirmed!",body:"Great news — your payment has been verified and your order is now being packed and prepared for dispatch. We will notify you as soon as it ships.",cta:m?["Chat on WhatsApp",`https://wa.me/${m}`]:void 0},shipped:{pill:["Shipped","#3b82f6"],icon:"📦",title:"Your order has been shipped!",body:"Your order has been packed and dispatched. Your parcel is now in transit — please keep your contact number available in case our delivery team needs to reach you.\n\nWe will notify you again when your order is out for delivery.",cta:m?["Track via WhatsApp",`https://wa.me/${m}`]:void 0},delivered:{pill:["Delivered",p],icon:"✓",title:"Your order has been delivered!",body:`We are delighted to confirm that your ${y} order has been successfully delivered.

Thank you for choosing ${y}. We hope you love your new pieces. If you experience any issue, please reach out and we will be happy to assist.

We would also appreciate your feedback about your shopping experience.`,cta:["Leave a Review",`${x}/reviews`]}};async function U(e){let t=j[e.status];if(!t)return;let o=e.notes?`<div style="background:${c};border-left:3px solid ${s};border-radius:0 10px 10px 0;padding:14px 18px;margin:20px 0">
        <p style="margin:0 0 4px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Note from our team</p>
        <p style="margin:0;color:#d1d5db;font-size:14px;font-style:italic;line-height:1.6">"${e.notes}"</p>
       </div>`:"",r="shipped"===e.status&&e.tracking_number?`<div style="background:${c};border:1px solid #3b82f644;border-left:3px solid #3b82f6;border-radius:0 12px 12px 0;padding:16px 20px;margin:4px 0 20px">
        <p style="margin:0 0 4px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Your Tracking Number</p>
        <p style="margin:0;color:#93c5fd;font-size:20px;font-weight:700;font-family:monospace;letter-spacing:0.08em">${e.tracking_number}</p>
       </div>`:"",i={approved:`Payment Approved — ${e.ref} | ${y}`,shipped:`Your Order Has Been Shipped — ${e.ref} | ${y}`,delivered:`Order Delivered — ${e.ref} | ${y}`},n=b(`
    <div style="margin-bottom:16px">${A(...t.pill)}</div>
    <div style="font-size:30px;margin-bottom:12px;line-height:1">${t.icon}</div>
    <h1 style="margin:0 0 6px;color:#f9fafb;font-size:26px;font-weight:900">${t.title}</h1>
    <p style="margin:0 0 4px;color:${f};font-size:13px">Order: <strong style="color:${p}">${e.ref}</strong></p>
    ${v()}
    <p style="margin:0 0 14px;color:#9ca3af;font-size:15px">Dear ${e.name.split(" ")[0]},</p>
    ${r}
    ${t.body.split("\n\n").map(e=>`<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${e}</p>`).join("")}
    ${o}
    ${t.cta?`<div style="margin-top:24px">${z(t.cta[0],t.cta[1])}${m?`&nbsp;&nbsp;${z("WhatsApp Us",`https://wa.me/${m}?text=Hi%2C%20re%20order%20${e.ref}`,"#25D366","#fff")}`:""}</div>`:""}
  `);await h({to:e.email,subject:i[e.status]??`Order Update — ${e.ref} | ${y}`,html:n})}let Y={processing:{icon:"⚙️",pillText:"Being Prepared",pillColor:"#8b5cf6",title:"Your order is being prepared",subject:`Your Order Is Being Prepared — ${y}`,defaultMessage:"We are pleased to confirm that your order has been placed and is now being prepared by our fulfilment team.\n\nWe will notify you as soon as your order is ready for packing.",stage:2},packed:{icon:"📦",pillText:"Being Packed",pillColor:"#3b82f6",title:"Your order is being packed",subject:`Your Order Is Being Packed — ${y}`,defaultMessage:"Your order has moved to the packing stage.\n\nOur team is carefully packaging your order to ensure it is properly prepared for transport. You will be notified once dispatched.",stage:3},out_for_delivery:{icon:"🏠",pillText:"Out for Delivery",pillColor:"#10b981",title:"Your order is out for delivery today!",subject:`Your Order Is Out for Delivery — ${y}`,defaultMessage:"Your order is out for delivery.\n\nYour delivery driver will contact you when approaching your location. Please keep your phone available and ensure someone is available to receive the order.",stage:5},delayed:{icon:"⏳",pillText:"Slight Delay",pillColor:"#f59e0b",title:"A small update on your order",subject:`Update on Your Order — ${y}`,defaultMessage:"We would like to inform you that there has been a slight delay with your order. We sincerely apologise for any inconvenience.\n\nOur team is resolving this as quickly as possible and will keep you updated.",stage:-1},custom:{icon:"📬",pillText:"Update",pillColor:s,title:"An update on your order",subject:`Update on Your Order — ${y}`,defaultMessage:"",stage:-1}};async function C(e){var t;let o,r,i,n=Y[e.templateId]??Y.custom,a=e.message?e.message.split("\n\n").map(e=>`<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${e}</p>`).join(""):"",l=e.tracking_number?`<div style="background:${c};border:1px solid #3b82f644;border-left:3px solid #3b82f6;border-radius:0 12px 12px 0;padding:16px 20px;margin:16px 0 20px">
        <p style="margin:0 0 4px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Your Tracking Number</p>
        <p style="margin:0;color:#93c5fd;font-size:20px;font-weight:700;font-family:monospace;letter-spacing:0.08em">${e.tracking_number}</p>
       </div>`:"",s=b(`
    <div style="margin-bottom:16px">${A(n.pillText,n.pillColor)}</div>
    <div style="font-size:36px;margin-bottom:12px;line-height:1">${n.icon}</div>
    <h1 style="margin:0 0 6px;color:#f9fafb;font-size:26px;font-weight:900">${n.title}</h1>
    <p style="margin:0 0 4px;color:${f};font-size:13px">Order: <strong style="color:${p}">${e.ref}</strong></p>
    ${v()}
    <p style="margin:0 0 14px;color:#9ca3af;font-size:15px">Dear ${e.name.split(" ")[0]},</p>
    ${n.stage>0?(t=n.stage,r=[],i=[],(o=["Order Placed","Processing","Packed","Dispatched","Delivered"]).forEach((e,n)=>{let a=n+1,l=a<t,p=a===t;r.push(`<td align="center"><table cellpadding="0" cellspacing="0" style="margin:0 auto"><tr><td align="center" width="28" height="28" style="width:28px;height:28px;border-radius:14px;background:${l?"#10b981":p?"#fff":"#1a1a1a"};border:2px solid ${l?"#10b981":p?"#fff":"#2a2a2a"};text-align:center;vertical-align:middle;font-size:11px;font-weight:800;color:${l?"#fff":p?"#000":"#555"};line-height:24px">${l?"&#10003;":a}</td></tr></table></td>`),i.push(`<td align="center" style="padding:6px 2px 0;vertical-align:top"><p style="margin:0;font-size:10px;color:${p?"#e5e7eb":l?"#9ca3af":"#4b5563"};font-weight:${p?700:400};line-height:1.4">${e}</p></td>`),n<o.length-1&&(r.push(`<td style="vertical-align:middle;padding-bottom:4px"><div style="height:2px;background:${n+1<t?"#10b981":"#2a2a2a"}"></div></td>`),i.push("<td></td>"))}),`<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 8px"><tr>${r.join("")}</tr><tr>${i.join("")}</tr></table>`):""}
    ${l}
    ${a}
    <div style="margin-top:8px">
      ${m?z("Chat on WhatsApp",`https://wa.me/${m}?text=Hi%2C%20checking%20on%20order%20${e.ref}`,"#25D366","#fff"):""}
    </div>
  `);await h({to:e.email,subject:n.subject,html:s})}async function I(e){let t=b(`
    ${w("Welcome to the family")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">
      You are in${e.name?`, ${e.name.split(" ")[0]}`:""}!
    </h1>
    <p style="margin:0 0 28px;color:#9ca3af;font-size:15px;line-height:1.6">
      Thank you for joining the ${y} family. Premium clothing, crafted for the bold.
    </p>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Browse our latest arrivals and collections:</p>
    ${z("Shop Now",`${x}/shop`,p,d)}
    ${m?`&nbsp;&nbsp;${z("Chat with Us",`https://wa.me/${m}`,"#25D366","#fff")}`:""}
  `);await h({to:e.email,subject:`Welcome to ${y}`,html:t})}async function _(e){let t=n(),o=e=>`R ${e.toLocaleString("en-ZA",{minimumFractionDigits:2})}`,r=encodeURIComponent(`Hi, I received approval for my installment application ${e.ref} for the ${e.product_name}. I'm ready to pay my deposit of ${o(e.deposit)}.`),i=b(`
    <div style="text-align:center;margin-bottom:28px">
      <h1 style="margin:0 0 8px;color:#fff;font-size:22px;font-weight:900">Application Approved!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${e.name.split(" ")[0]}, your installment plan is confirmed.</p>
    </div>

    <div style="background:${d};border:1px solid #ffffff22;border-radius:12px;padding:16px 20px;margin-bottom:24px">
      ${w("Application Reference")}
      <p style="margin:4px 0 12px;color:${p};font-size:24px;font-weight:900;font-family:monospace;letter-spacing:0.1em">${e.ref}</p>
      ${w("Product")}
      <p style="margin:4px 0 0;color:#fff;font-size:15px;font-weight:700">${e.product_name}</p>
    </div>

    ${v()}

    <p style="margin:0 0 12px;color:#fff;font-size:15px;font-weight:700">Your Payment Schedule</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${g};color:${f};font-size:13px">Deposit <span style="color:#f59e0b;font-size:11px;font-weight:700">(pay first)</span></td>
        <td style="padding:10px 0;border-bottom:1px solid ${g};color:#f59e0b;font-size:18px;font-weight:900;text-align:right">${o(e.deposit)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${g};color:${f};font-size:13px">Monthly Payment \xd7 ${e.term_months} months</td>
        <td style="padding:10px 0;border-bottom:1px solid ${g};color:${p};font-size:18px;font-weight:900;text-align:right">${o(e.monthly_payment)}/mo</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:${f};font-size:13px">Total Repayable</td>
        <td style="padding:10px 0;color:#e5e7eb;font-size:14px;font-weight:700;text-align:right">${o(e.total_repayable)}</td>
      </tr>
    </table>

    <div style="background:#f59e0b11;border:1px solid #f59e0b44;border-radius:12px;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0 0 6px;color:#f59e0b;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Next Step — Pay Your Deposit</p>
      <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">Transfer <strong style="color:#f59e0b">${o(e.deposit)}</strong> using <strong style="color:#fff">${e.ref}</strong> as your reference, then send proof of payment on WhatsApp.</p>
    </div>

    ${v()}

    <p style="margin:0 0 12px;color:#fff;font-size:15px;font-weight:700">Payment Details</p>
    <div style="background:${c};border:1px solid ${g};border-radius:12px;padding:4px 20px;margin-bottom:24px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${k("Bank",t.bank)}
        ${k("Account Holder",t.accountHolder)}
        ${k("Account Number",`<span style="font-family:monospace">${t.accountNumber}</span>`)}
        ${k("Branch Code",t.branchCode)}
        ${k("Reference",`<strong style="color:${p}">${e.ref}</strong>`)}
      </table>
    </div>

    <div style="text-align:center">
      ${m?z("Send Proof on WhatsApp",`https://wa.me/${m}?text=${r}`,"#25D366","#fff"):""}
    </div>
    <p style="margin:12px 0 0;color:${f};font-size:12px;text-align:center">Always use <strong style="color:#fff">${e.ref}</strong> as your payment reference.</p>
  `);await h({to:e.email,subject:`Installment Approved — ${e.ref} | ${y}`,html:i})}async function T(e){let t=e.orderItems?.length?'<p style="margin:0 0 12px;color:#e5e7eb;font-size:14px;font-weight:700">Your Items</p>'+e.orderItems.map(e=>`<div style="background:${c};border:1px solid ${g};border-radius:10px;padding:12px 16px;margin-bottom:8px;display:flex;align-items:center">
          <p style="margin:0;color:#e5e7eb;font-size:14px;font-weight:600">${e.name} <span style="color:${f};font-weight:400">\xd7 ${e.qty}</span></p>
        </div>`).join(""):"",o=e.trackingId?`<img src="${x}/api/track/${e.trackingId}" width="1" height="1" style="display:none" alt="" />`:"",r=b(`
    <h1 style="margin:0 0 8px;color:#f9fafb;font-size:24px;font-weight:900">${e.heading}</h1>
    ${v()}
    ${e.body.split("\n\n").map(e=>`<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${e}</p>`).join("")}
    ${t}
    <div style="margin-top:24px">${z(e.ctaText,e.ctaUrl,p,d)}</div>
    ${o}
  `);await h({to:e.to,subject:e.subject,html:r})}function W(e,t,o,r,i){let n=e.admin_notes?`<div style="background:${c};border-left:3px solid ${s};border-radius:0 10px 10px 0;padding:14px 18px;margin:16px 0">
        <p style="margin:0 0 4px;color:${f};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Note from our team</p>
        <p style="margin:0;color:#d1d5db;font-size:14px;line-height:1.6">${e.admin_notes}</p>
       </div>`:"";return b(`
    <div style="margin-bottom:16px">${A(r,i)}</div>
    <h1 style="margin:0 0 10px;color:#f9fafb;font-size:22px;font-weight:900">${t}</h1>
    <p style="margin:0 0 20px;color:#9ca3af;font-size:14px">Hi ${e.name.split(" ")[0]}, ref: <strong style="color:${p}">${e.ref}</strong></p>
    <p style="margin:0 0 20px;color:#9ca3af;font-size:15px;line-height:1.7">${o}</p>
    ${n}
    ${m?`<div style="margin-top:24px">${z("Chat on WhatsApp",`https://wa.me/${m}?text=Hi%2C%20re%20installment%20${e.ref}`,"#25D366","#fff")}</div>`:""}
  `)}async function N(e){let t=W(e,"Application Under Review",`We are currently reviewing your installment application for <strong style="color:#e5e7eb">${e.product_name}</strong>. Our team will get back to you within 24 hours.`,"Under Review","#3b82f6");await h({to:e.email,subject:`Application Under Review — ${e.ref} | ${y}`,html:t})}async function O(e){let t,o=n(),r=W(e,"Awaiting Deposit Payment",`Your installment plan for <strong style="color:#e5e7eb">${e.product_name}</strong> is approved. Please pay your deposit of <strong style="color:${p}">${(t=e.deposit,`R ${t.toLocaleString("en-ZA",{minimumFractionDigits:2})}`)}</strong> to <strong style="color:#e5e7eb">${o.bank}</strong> (acc: ${o.accountNumber}) using reference <strong style="color:${p}">${e.ref}</strong>.`,"Awaiting Payment","#f59e0b");await h({to:e.email,subject:`Deposit Required — ${e.ref} | ${y}`,html:r})}async function B(e){let t,o=W(e,"Your Plan is Active!",`Great news! Your installment plan for <strong style="color:#e5e7eb">${e.product_name}</strong> is now active. Your monthly payment of <strong style="color:${p}">${(t=e.monthly_payment,`R ${t.toLocaleString("en-ZA",{minimumFractionDigits:2})}`)}</strong> is due each month for ${e.term_months} months.`,"Active","#22c55e");await h({to:e.email,subject:`Installment Plan Active — ${e.ref} | ${y}`,html:o})}async function L(e){let t=W(e,"Plan Completed!",`Congratulations! You have successfully completed your installment plan for <strong style="color:#e5e7eb">${e.product_name}</strong>. Thank you for choosing ${y}.`,"Completed","#22c55e");await h({to:e.email,subject:`Installment Completed — ${e.ref} | ${y}`,html:t})}async function E(e){let t=W(e,"Application Declined",`Unfortunately your installment application for <strong style="color:#e5e7eb">${e.product_name}</strong> could not be approved at this time. Please contact us for more information.`,"Declined","#ef4444");await h({to:e.email,subject:`Application Update — ${e.ref} | ${y}`,html:t})}e.s(["TRACKING_TEMPLATES",0,Y,"sendAdminOrderNotification",0,D,"sendCampaignEmail",0,T,"sendInstallmentActive",0,B,"sendInstallmentApproval",0,_,"sendInstallmentAwaitingPayment",0,O,"sendInstallmentCompleted",0,L,"sendInstallmentDeclined",0,E,"sendInstallmentReviewing",0,N,"sendMail",0,h,"sendOrderConfirmation",0,S,"sendProofAcknowledgement",0,R,"sendRejectionEmail",0,P,"sendStatusUpdate",0,U,"sendTrackingUpdate",0,C,"sendWelcomeEmail",0,I],67010)}];

//# sourceMappingURL=lib_mailer_ts_0qdwzgv._.js.map