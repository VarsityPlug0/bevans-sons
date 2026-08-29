module.exports=[94689,e=>{"use strict";var t=e.i(54799),r=e.i(99904),a=e.i(84423),o=e.i(14747),i=e.i(22734);let n={name:"Bevans Sons",tagline:"Premium Clothing. Crafted for the Bold.",domain:"https://bevans-sons.onrender.com",whatsapp:"27724816274",phone:"0724816274",email:"MkhabeleEnterprise@gmail.com",currency:"ZAR",currencySymbol:"R",locale:"en-ZA",social:{instagram:process.env.NEXT_PUBLIC_INSTAGRAM??"",facebook:process.env.NEXT_PUBLIC_FACEBOOK??"",tiktok:process.env.NEXT_PUBLIC_TIKTOK??""},shipping:{freeThreshold:1500,standardDays:"3-5 business days",expressDays:"1-2 business days"}},s=o.default.join(process.cwd(),"public","logo.jpg"),l="logo@bevanssons",d="#FFFFFF",c="#0A0A0A",p="#1F1F1F",m="#6b7280",g=n.whatsapp,u=n.domain,h=n.name;async function y(e){let t=process.env.RESEND_API_KEY?a.default.createTransport({host:"smtp.resend.com",port:587,secure:!1,auth:{user:"resend",pass:process.env.RESEND_API_KEY}}):process.env.MAIL_USER&&process.env.MAIL_PASS?a.default.createTransport({service:"gmail",auth:{user:process.env.MAIL_USER,pass:process.env.MAIL_PASS}}):null;if(!t)return void console.error("mailer: env vars missing");try{let r,a=e.attachments??[];(0,i.existsSync)(s)&&a.unshift({filename:"logo.jpg",path:s,cid:l}),await t.sendMail({from:(r=new URL(u).hostname,process.env.RESEND_API_KEY?`"${h}" <noreply@${r}>`:`"${h}" <${process.env.MAIL_USER??`noreply@${r}`}>`),to:e.to,subject:e.subject,html:e.html,attachments:a})}catch(e){console.error("mailer send error:",e)}}async function f(e){var t;let r=e.orderItems?.length?'<p style="margin:0 0 12px;color:#e5e7eb;font-size:14px;font-weight:700">Your Items</p>'+e.orderItems.map(e=>`<div style="background:#161616;border:1px solid ${p};border-radius:10px;padding:12px 16px;margin-bottom:8px;display:flex;align-items:center">
          <p style="margin:0;color:#e5e7eb;font-size:14px;font-weight:600">${e.name} <span style="color:${m};font-weight:400">\xd7 ${e.qty}</span></p>
        </div>`).join(""):"",a=e.trackingId?`<img src="${u}/api/track/${e.trackingId}" width="1" height="1" style="display:none" alt="" />`:"",o=(t=`
    <h1 style="margin:0 0 8px;color:#f9fafb;font-size:24px;font-weight:900">${e.heading}</h1>
    <div style="height:1px;background:${p};margin:24px 0"></div>
    ${e.body.split("\n\n").map(e=>`<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${e}</p>`).join("")}
    ${r}
    <div style="margin-top:24px">${function(e,t,r=d,a=c){return`<a href="${t}" style="display:inline-block;background:${r};color:${a};font-weight:800;text-decoration:none;padding:13px 26px;border-radius:10px;font-size:14px;letter-spacing:0.02em">${e}</a>`}(e.ctaText,e.ctaUrl,d,c)}</div>
    ${a}
  `,`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${h}</title>
</head>
<body style="margin:0;padding:0;background:${c};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${c};padding:28px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid ${p}">

        <!-- Top border -->
        <tr><td style="background:${d};height:2px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Header -->
        <tr>
          <td style="background:${c};padding:24px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="cid:${l}" alt="${h}" height="44" style="height:44px;width:auto;display:block;border:0" />
                </td>
                <td align="right">
                  <a href="${u}" style="color:${m};font-size:12px;text-decoration:none">${new URL(u).hostname}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#111111;padding:36px 36px 32px;border-top:1px solid ${p}">
            ${t}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${c};padding:24px 36px;border-top:1px solid ${p}">
            <p style="margin:0 0 8px;color:${m};font-size:12px;text-align:center">
              Questions? &nbsp;
              ${g?`<a href="https://wa.me/${g}" style="color:${d};text-decoration:none;font-weight:600">WhatsApp</a> &nbsp;\xb7&nbsp;`:""}
              <a href="${u}" style="color:${d};text-decoration:none;font-weight:600">${new URL(u).hostname}</a>
            </p>
            <p style="margin:0;color:#333;font-size:11px;text-align:center">
              \xa9 ${new Date().getFullYear()} ${h}. All rights reserved.
            </p>
          </td>
        </tr>

        <!-- Bottom border -->
        <tr><td style="background:${d};height:1px;font-size:0;line-height:0">&nbsp;</td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`);await y({to:e.to,subject:e.subject,html:o})}let w=n.domain;function b(e,t,r,a){if(a)return!!e.prepare("SELECT id FROM email_sends WHERE LOWER(email) = ? AND type = ? AND ref = ?").get(t.toLowerCase(),r,a);let o=new Date(Date.now()-3024e6).toISOString();return!!e.prepare("SELECT id FROM email_sends WHERE LOWER(email) = ? AND type = ? AND createdAt > ?").get(t.toLowerCase(),r,o)}function v(e,t){e.prepare(`
    INSERT OR IGNORE INTO email_sends (id, email, type, ref, subject, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(t.id,t.email.toLowerCase(),t.type,t.ref??null,t.subject,new Date().toISOString())}async function $(){let e=(0,r.getDb)(),a=0,o=0;for(let r of e.prepare(`
    WITH cart_summary AS (
      SELECT v.email, v.name, MAX(ce.createdAt) AS lastAdded
      FROM cart_events ce
      JOIN visitors v ON v.id = ce.visitorId
      WHERE v.email IS NOT NULL
        AND TRIM(v.email) != ''
        AND ce.createdAt < datetime('now', '-24 hours')
        AND ce.createdAt > datetime('now', '-72 hours')
      GROUP BY LOWER(v.email)
    )
    SELECT email, name, lastAdded
    FROM cart_summary cs
    WHERE NOT EXISTS (
      SELECT 1 FROM orders o
      WHERE LOWER(o.email) = LOWER(cs.email)
        AND o.createdAt > cs.lastAdded
    )
  `).all()){let i=r.lastAdded.slice(0,10);if(b(e,r.email,"cart_abandon_1d",i)){o++;continue}let s=e.prepare(`
      SELECT DISTINCT ce.productId AS id, ce.productName AS name, ce.price, 1 AS qty
      FROM cart_events ce
      JOIN visitors v ON v.id = ce.visitorId
      WHERE LOWER(v.email) = ?
      ORDER BY ce.createdAt DESC
      LIMIT 6
    `).all(r.email.toLowerCase()),l=(0,t.randomUUID)(),d=(r.name??"there").split(" ")[0],c=`${d}, you left something behind — ${n.name}`,p=Buffer.from(JSON.stringify(s)).toString("base64"),m=`${w}/restore-cart?items=${p}`;try{await f({to:r.email,name:r.name??"there",subject:c,heading:"Your cart is waiting for you",body:`Hi ${d},

You browsed some great pieces but didn't complete your order. Your items are still available — don't miss out!`,ctaText:"Complete Your Order",ctaUrl:m,orderItems:s,restoreCartUrl:m,trackingId:l}),v(e,{id:l,email:r.email,type:"cart_abandon_1d",ref:i,subject:c}),a++}catch(e){console.error("[followups] cart_abandon_1d error:",e)}}for(let r of e.prepare(`
    SELECT id, ref, email, name FROM orders
    WHERE status = 'delivered'
      AND updatedAt < datetime('now', '-3 days')
      AND updatedAt > datetime('now', '-14 days')
  `).all()){if(b(e,r.email,"delivery_followup",r.ref)){o++;continue}let i=(0,t.randomUUID)(),s=r.name.split(" ")[0],l=`How was your order, ${s}? — ${n.name}`;try{await f({to:r.email,name:r.name,subject:l,heading:"How was your experience?",body:`Hi ${s},

Your order ${r.ref} was delivered recently and we hope you're loving your new pieces!

We'd love to hear your feedback — it takes less than a minute and helps us serve you better.`,ctaText:"Leave a Review",ctaUrl:`${w}/reviews`,trackingId:i}),v(e,{id:i,email:r.email,type:"delivery_followup",ref:r.ref,subject:l}),a++}catch(e){console.error("[followups] delivery_followup error:",e)}}for(let r of e.prepare(`
    SELECT email, name, MAX(createdAt) AS lastOrder
    FROM orders
    WHERE status IN ('approved', 'shipped', 'delivered')
    GROUP BY LOWER(email)
    HAVING lastOrder < datetime('now', '-30 days')
      AND lastOrder > datetime('now', '-60 days')
  `).all()){if(b(e,r.email,"reengagement_30d")){o++;continue}let i=(0,t.randomUUID)(),s=r.name.split(" ")[0],l=`We miss you, ${s}! — ${n.name}`;try{await f({to:r.email,name:r.name,subject:l,heading:`We miss you, ${s}!`,body:`Hi ${s},

It's been a while since your last order and we wanted to check in.

We've dropped new styles and collections we think you'll love. Come see what's new!`,ctaText:"Shop New Arrivals",ctaUrl:`${w}/new-arrivals`,trackingId:i}),v(e,{id:i,email:r.email,type:"reengagement_30d",subject:l}),a++}catch(e){console.error("[followups] reengagement_30d error:",e)}}return console.log(`[followups] sent=${a} skipped=${o}`),{sent:a,skipped:o}}e.s(["runFollowUps",0,$],94689)}];

//# sourceMappingURL=lib_followups_ts_1u3wnoc._.js.map