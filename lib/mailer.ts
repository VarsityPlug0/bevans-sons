import nodemailer from "nodemailer";
import path from "path";
import { existsSync } from "fs";

const LOGO_PATH = path.join(process.cwd(), "public", "logo.jpg");
const LOGO_CID  = "logo@daisygadgets";

const GOLD        = "#D4AF37";
const GOLD_LIGHT  = "#f5d76e";
const BLACK       = "#0A0A0A";
const DARK        = "#111111";
const DARK2       = "#161616";
const BORDER      = "#1F1F1F";
const MUTED       = "#6b7280";
const WA_NUM      = "27848961782";
const SITE        = "https://daisygadgetsco.com";

const BANK = {
  bank: "FNB / RMB",
  accountHolder: "Daisy Gadgets Co.",
  accountType: "Business Current",
  accountNumber: "63211629332",
  branchCode: "250655",
  payshap: "+27848961782@FNB",
};

function createTransporter() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false,
    auth: { user: "resend", pass: apiKey },
  });
}

type MailAttachment =
  | { filename: string; path: string; cid: string }
  | { filename: string; content: Buffer; cid: string };

export async function sendMail(opts: { to: string; subject: string; html: string; attachments?: MailAttachment[] }) {
  const transporter = createTransporter();
  if (!transporter) { console.error("mailer: env vars missing"); return; }
  try {
    const attachments: MailAttachment[] = opts.attachments ?? [];
    if (existsSync(LOGO_PATH)) {
      attachments.unshift({ filename: "logo.jpg", path: LOGO_PATH, cid: LOGO_CID });
    }
    await transporter.sendMail({
      from: `"Daisy Gadgets Co." <noreply@daisygadgetsco.com>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      attachments,
    });
  } catch (err) { console.error("mailer send error:", err); }
}

// Fetch a remote image URL and return a Buffer (for CID inlining)
async function fetchImageBuffer(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

// Build CID attachment list + HTML thumb src map for a set of items
async function buildProductAttachments(
  items: { name: string; imageUrl?: string }[]
): Promise<{ attachments: MailAttachment[]; cidMap: Map<string, string> }> {
  const attachments: MailAttachment[] = [];
  const cidMap = new Map<string, string>();

  await Promise.all(
    items.map(async (item, i) => {
      if (!item.imageUrl) return;
      const buf = await fetchImageBuffer(
        item.imageUrl.startsWith("http") ? item.imageUrl : SITE + item.imageUrl
      );
      if (!buf) return;
      const cid = `product-${i}@daisy`;
      const ext = item.imageUrl.split(".").pop()?.split("?")[0] ?? "jpg";
      attachments.push({ filename: `product-${i}.${ext}`, content: buf, cid });
      cidMap.set(item.imageUrl, `cid:${cid}`);
    })
  );

  return { attachments, cidMap };
}

// ─── Layout ──────────────────────────────────────────────────────────────────
function layout(content: string, accentBar = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Daisy Gadgets Co.</title>
</head>
<body style="margin:0;padding:0;background:${BLACK};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BLACK};padding:28px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid ${BORDER}">

        <!-- Gold shimmer top bar -->
        <tr><td style="background:linear-gradient(90deg,${BLACK},${GOLD},${GOLD_LIGHT},${GOLD},${BLACK});height:3px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Header -->
        <tr>
          <td style="background:${BLACK};padding:24px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="cid:${LOGO_CID}" alt="Daisy Gadgets Co." height="44" style="height:44px;width:auto;display:block;border:0" />
                </td>
                <td align="right">
                  <a href="${SITE}" style="color:${MUTED};font-size:12px;text-decoration:none">daisygadgetsco.co.za</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${accentBar}

        <!-- Body -->
        <tr>
          <td style="background:${DARK};padding:36px 36px 32px;border-top:1px solid ${BORDER}">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${BLACK};padding:24px 36px;border-top:1px solid ${BORDER}">
            <p style="margin:0 0 8px;color:${MUTED};font-size:12px;text-align:center">
              Questions? &nbsp;
              <a href="https://wa.me/${WA_NUM}" style="color:${GOLD};text-decoration:none;font-weight:600">WhatsApp +27 84 896 1782</a>
              &nbsp;·&nbsp;
              <a href="${SITE}" style="color:${GOLD};text-decoration:none;font-weight:600">daisygadgetsco.co.za</a>
            </p>
            <p style="margin:0;color:#333;font-size:11px;text-align:center">
              © ${new Date().getFullYear()} Daisy Gadgets Co. · All rights reserved.
            </p>
          </td>
        </tr>

        <!-- Bottom gold bar -->
        <tr><td style="background:linear-gradient(90deg,${BLACK},${GOLD},${GOLD_LIGHT},${GOLD},${BLACK});height:2px;font-size:0;line-height:0">&nbsp;</td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function label(text: string) {
  return `<p style="margin:0 0 3px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em">${text}</p>`;
}

function divider() {
  return `<div style="height:1px;background:${BORDER};margin:24px 0"></div>`;
}

function btn(text: string, href: string, bg = GOLD, fg = BLACK) {
  return `<a href="${href}" style="display:inline-block;background:${bg};color:${fg};font-weight:800;text-decoration:none;padding:13px 26px;border-radius:10px;font-size:14px;letter-spacing:0.02em">${text}</a>`;
}

function infoRow(key: string, val: string) {
  return `<tr>
    <td style="padding:8px 0;color:${MUTED};font-size:13px;width:150px;vertical-align:top;border-bottom:1px solid ${BORDER}">${key}</td>
    <td style="padding:8px 0;color:#e5e7eb;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid ${BORDER}">${val}</td>
  </tr>`;
}

function statusPill(text: string, color: string) {
  return `<span style="display:inline-block;background:${color}22;color:${color};border:1px solid ${color}55;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.05em">${text}</span>`;
}

// ─── 1. Order Confirmation ────────────────────────────────────────────────────
export interface OrderEmailData {
  name: string;
  email: string;
  ref: string;
  items: { name: string; price: string; qty: number; imageUrl?: string }[];
  total: number;
  address?: string;
  phone?: string;
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  const { attachments: imgAttachments, cidMap } = await buildProductAttachments(data.items);

  const itemRows = data.items.map(i => {
    const lineTotal = (parseFloat(String(i.price).replace(/[^0-9.]/g, "")) * i.qty).toLocaleString("en-ZA");
    const src = i.imageUrl ? (cidMap.get(i.imageUrl) ?? (i.imageUrl.startsWith("http") ? i.imageUrl : SITE + i.imageUrl)) : null;
    const thumb = src
      ? `<img src="${src}" alt="${i.name}" width="64" height="64" style="width:64px;height:64px;object-fit:cover;border-radius:10px;display:block;border:1px solid ${BORDER}" />`
      : `<div style="width:64px;height:64px;background:${DARK2};border:1px solid ${BORDER};border-radius:10px"></div>`;
    return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${BORDER};width:76px;vertical-align:middle">${thumb}</td>
      <td style="padding:12px 12px;border-bottom:1px solid ${BORDER};vertical-align:middle">
        <p style="margin:0 0 4px;color:#e5e7eb;font-size:14px;font-weight:600">${i.name}</p>
        <p style="margin:0;color:${MUTED};font-size:12px">Qty: ${i.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${BORDER};text-align:right;vertical-align:middle">
        <span style="color:${GOLD};font-size:14px;font-weight:700">R ${lineTotal}</span>
      </td>
    </tr>`;
  }).join("");

  const html = layout(`
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:48px;line-height:1;margin-bottom:12px">🎊</div>
      <h1 style="margin:0 0 8px;color:#f9fafb;font-size:26px;font-weight:900">Thank you for your purchase!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${data.name.split(" ")[0]}, your payment has been verified and your order is confirmed.</p>
    </div>

    <!-- Ref pill -->
    <div style="background:${DARK2};border:1px solid ${GOLD}44;border-radius:10px;padding:14px 20px;margin-bottom:28px;display:flex;align-items:center">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="color:${MUTED};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Order Reference</td>
        <td style="text-align:right;color:${GOLD};font-size:18px;font-weight:900;letter-spacing:0.08em;font-family:monospace">${data.ref}</td>
      </tr></table>
    </div>

    <!-- Items -->
    <p style="margin:0 0 12px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Order Summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px">
      ${itemRows}
    </table>

    <!-- Totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 28px">
      <tr>
        <td style="padding:6px 0;color:${MUTED};font-size:13px">Subtotal</td>
        <td style="padding:6px 0;text-align:right;color:#d1d5db;font-size:13px">R ${data.total.toLocaleString("en-ZA")}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:${MUTED};font-size:13px">Shipping</td>
        <td style="padding:6px 0;text-align:right;color:#22c55e;font-size:13px;font-weight:700">Free</td>
      </tr>
      <tr>
        <td style="padding:10px 0 0;color:#e5e7eb;font-size:16px;font-weight:800;border-top:1px solid ${BORDER}">Total</td>
        <td style="padding:10px 0 0;text-align:right;color:${GOLD};font-size:20px;font-weight:900;border-top:1px solid ${BORDER}">R ${data.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${divider()}

    <!-- Customer info grid -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Customer Information</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
      <tr>
        <td width="50%" style="padding:0 8px 0 0;vertical-align:top">
          <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:10px;padding:16px 18px;margin-bottom:12px">
            <p style="margin:0 0 6px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Address</p>
            <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${data.name}<br>${data.address || "—"}</p>
          </div>
          <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:10px;padding:16px 18px">
            <p style="margin:0 0 6px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Billing Address</p>
            <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${data.name}<br>${data.address || "—"}</p>
          </div>
        </td>
        <td width="50%" style="padding:0 0 0 8px;vertical-align:top">
          <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:10px;padding:16px 18px;margin-bottom:12px">
            <p style="margin:0 0 6px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Method</p>
            <p style="margin:0;color:#d1d5db;font-size:13px">📦 Standard Delivery<br><span style="color:${MUTED};font-size:12px">2–5 business days</span></p>
          </div>
          <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:10px;padding:16px 18px">
            <p style="margin:0 0 6px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Payment Method</p>
            <p style="margin:0;color:#d1d5db;font-size:13px">🏦 EFT Bank Transfer<br><span style="color:#22c55e;font-size:12px;font-weight:700">✔ Payment Verified</span></p>
          </div>
        </td>
      </tr>
    </table>

    <div style="text-align:center">
      ${btn("💬 Chat on WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20checking%20on%20order%20${data.ref}`, "#25D366", "#fff")}
    </div>
  `);

  await sendMail({ to: data.email, subject: `Order Confirmed ✨ — ${data.ref} | Daisy Gadgets Co.`, html, attachments: imgAttachments });
}

// ─── 2. Proof Acknowledgement ─────────────────────────────────────────────────
export async function sendProofAcknowledgement(data: { name: string; email: string; ref: string }) {
  const html = layout(`
    ${label("Payment Received")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">✅ We got your proof!</h1>
    <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.6">
      Hi ${data.name.split(" ")[0]}, we received your proof of payment for order <strong style="color:${GOLD}">${data.ref}</strong>.
    </p>

    <div style="background:${DARK2};border:1px solid #22c55e44;border-left:3px solid #22c55e;border-radius:0 12px 12px 0;padding:18px 20px;margin-bottom:28px">
      <p style="margin:0;color:#86efac;font-size:14px;line-height:1.7">
        Your proof is under review. We will verify and confirm your order within <strong>24 hours</strong>. You will receive another email as soon as it is approved.
      </p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Need help or want to check in?</p>
    ${btn("Chat on WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20checking%20on%20order%20${data.ref}`, "#25D366", "#fff")}
  `);
  await sendMail({ to: data.email, subject: `Payment Proof Received — ${data.ref} | Daisy Gadgets Co.`, html });
}

// ─── 3. Rejection Email ──────────────────────────────────────────────────────
export interface RejectionEmailData {
  name: string;
  email: string;
  ref: string;
  total: number;
  items: { name: string; price: string; qty: number; imageUrl?: string }[];
  reason?: string | null;
}

export async function sendRejectionEmail(data: RejectionEmailData) {
  const { attachments: imgAttachments, cidMap } = await buildProductAttachments(data.items);

  const itemRows = data.items.map(i => {
    const lineTotal = (parseFloat(String(i.price).replace(/[^0-9.]/g, "")) * i.qty).toLocaleString("en-ZA");
    const unitPrice = parseFloat(String(i.price).replace(/[^0-9.]/g, "")).toLocaleString("en-ZA");
    const src = i.imageUrl ? (cidMap.get(i.imageUrl) ?? (i.imageUrl.startsWith("http") ? i.imageUrl : SITE + i.imageUrl)) : null;
    const thumb = src
      ? `<img src="${src}" alt="${i.name}" width="64" height="64" style="width:64px;height:64px;object-fit:cover;border-radius:10px;display:block;border:1px solid ${BORDER}" />`
      : `<div style="width:64px;height:64px;background:${DARK2};border:1px solid ${BORDER};border-radius:10px"></div>`;
    return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${BORDER};width:76px;vertical-align:middle">${thumb}</td>
      <td style="padding:12px 10px;border-bottom:1px solid ${BORDER};vertical-align:middle">
        <p style="margin:0 0 3px;color:#e5e7eb;font-size:14px;font-weight:600">${i.name}</p>
        <p style="margin:0;color:${MUTED};font-size:12px">R ${unitPrice} × ${i.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${BORDER};text-align:right;vertical-align:middle">
        <span style="color:${GOLD};font-size:14px;font-weight:700">R ${lineTotal}</span>
      </td>
    </tr>`;
  }).join("");

  const reasonHtml = data.reason
    ? `<div style="background:${DARK2};border-left:3px solid #ef4444;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:24px">
        <p style="margin:0 0 4px;color:#ef4444;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Reason from our team</p>
        <p style="margin:0;color:#fca5a5;font-size:14px;line-height:1.6">${data.reason}</p>
       </div>`
    : "";

  const html = layout(`
    <!-- Hero -->
    <div style="text-align:center;margin-bottom:28px">
      <div style="font-size:48px;line-height:1;margin-bottom:14px">🔔</div>
      <div style="display:inline-block;background:#ef444420;color:#ef4444;border:1px solid #ef444450;padding:5px 16px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.06em;margin-bottom:14px">Action Required</div>
      <h1 style="margin:0 0 10px;color:#f9fafb;font-size:26px;font-weight:900;line-height:1.2">Payment could not be verified</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px;line-height:1.6">Hi <strong style="color:#e5e7eb">${data.name.split(" ")[0]}</strong>, we were unable to verify your proof of payment for order <strong style="color:${GOLD};font-family:monospace">${data.ref}</strong>.</p>
    </div>

    ${reasonHtml}

    <p style="margin:0 0 24px;color:#9ca3af;font-size:14px;line-height:1.7">
      Don&apos;t worry — this happens sometimes. Please re-do your payment using the details below and upload a clear screenshot or photo of your confirmation.
    </p>

    ${divider()}

    <!-- Order summary with images -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Your Order</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px">
      ${itemRows}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 28px">
      <tr>
        <td style="padding:6px 0;color:${MUTED};font-size:13px">Subtotal</td>
        <td style="padding:6px 0;text-align:right;color:#d1d5db;font-size:13px">R ${data.total.toLocaleString("en-ZA")}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:${MUTED};font-size:13px">Shipping</td>
        <td style="padding:6px 0;text-align:right;color:#22c55e;font-size:13px;font-weight:700">Free</td>
      </tr>
      <tr>
        <td style="padding:10px 0 0;color:#e5e7eb;font-size:16px;font-weight:800;border-top:1px solid ${BORDER}">Total Due</td>
        <td style="padding:10px 0 0;text-align:right;color:${GOLD};font-size:20px;font-weight:900;border-top:1px solid ${BORDER}">R ${data.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${divider()}

    <!-- Bank details -->
    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">✦ Payment Details (EFT)</p>
    <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:12px;padding:4px 20px;margin-bottom:28px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Bank", BANK.bank)}
        ${infoRow("Account Holder", BANK.accountHolder)}
        ${infoRow("Account Type", BANK.accountType)}
        ${infoRow("Account Number", `<span style="font-family:monospace;font-size:15px;color:${GOLD};letter-spacing:0.06em">${BANK.accountNumber}</span>`)}
        ${infoRow("Branch Code", BANK.branchCode)}
        ${infoRow("PayShap", BANK.payshap)}
        ${infoRow("Reference", `<strong style="color:${GOLD};font-size:15px;font-family:monospace">${data.ref}</strong>`)}
        ${infoRow("Amount", `<strong style="color:${GOLD};font-size:15px">R ${data.total.toLocaleString("en-ZA")}</strong>`)}
      </table>
    </div>

    <p style="margin:0 0 20px;color:#9ca3af;font-size:14px">Once paid, upload your new proof of payment — or send it directly on WhatsApp and we will update your order manually.</p>
    <div>
      ${btn("📤 Upload New Proof", `${SITE}/checkout`, GOLD, BLACK)}
      &nbsp;&nbsp;
      ${btn("💬 Send via WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20re-sending%20proof%20for%20order%20${data.ref}`, "#25D366", "#fff")}
    </div>
  `);

  await sendMail({ to: data.email, subject: `⚠️ Action Required — ${data.ref} | Daisy Gadgets Co.`, html, attachments: imgAttachments });
}

// ─── 4. Order Status Updates ──────────────────────────────────────────────────
const STATUS_CONTENT: Record<string, { pill: [string, string]; title: string; body: string; cta?: [string, string]; icon: string }> = {
  approved: {
    pill: ["Payment Approved", "#22c55e"],
    icon: "🎊",
    title: "Your payment is confirmed!",
    body: "Great news — your payment has been verified and your order is now being packed and prepared for dispatch. We will notify you as soon as it ships.",
    cta: ["💬 Chat on WhatsApp", `https://wa.me/${WA_NUM}`],
  },
  shipped: {
    pill: ["Shipped", "#3b82f6"],
    icon: "📦",
    title: "Your order is on its way!",
    body: "Your order has been handed over to the courier and is heading your way. Delivery typically takes 2–5 business days within South Africa.",
    cta: ["💬 Track via WhatsApp", `https://wa.me/${WA_NUM}`],
  },
  delivered: {
    pill: ["Delivered", GOLD],
    icon: "🎁",
    title: "Your order has been delivered!",
    body: "We hope you love your new purchase! If you have any issues at all, please reach out immediately and we will make it right.",
    cta: ["⭐ Leave a Review", `${SITE}/reviews`],
  },
};

export async function sendStatusUpdate(data: { name: string; email: string; ref: string; status: string; notes?: string | null }) {
  const content = STATUS_CONTENT[data.status];
  if (!content) return;

  const notesHtml = data.notes
    ? `<div style="background:${DARK2};border-left:3px solid ${GOLD};border-radius:0 10px 10px 0;padding:14px 18px;margin:20px 0">
        <p style="margin:0 0 4px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Note from our team</p>
        <p style="margin:0;color:#d1d5db;font-size:14px;font-style:italic;line-height:1.6">"${data.notes}"</p>
       </div>`
    : "";

  const subjects: Record<string, string> = {
    approved: `Payment Approved — ${data.ref} | Daisy Gadgets Co.`,
    rejected: `Action Required — ${data.ref} | Daisy Gadgets Co.`,
    shipped:  `Your Order Has Shipped — ${data.ref} | Daisy Gadgets Co.`,
    delivered: `Order Delivered — ${data.ref} | Daisy Gadgets Co.`,
  };

  const html = layout(`
    <div style="margin-bottom:16px">${statusPill(...content.pill)}</div>
    <div style="font-size:36px;margin-bottom:12px;line-height:1">${content.icon}</div>
    <h1 style="margin:0 0 6px;color:#f9fafb;font-size:26px;font-weight:900">${content.title}</h1>
    <p style="margin:0 0 4px;color:${MUTED};font-size:13px">Order: <strong style="color:${GOLD}">${data.ref}</strong></p>
    ${divider()}
    <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7">Hi ${data.name.split(" ")[0]}, ${content.body}</p>
    ${notesHtml}
    ${content.cta ? `<div style="margin-top:24px">${btn(content.cta[0], content.cta[1])}&nbsp;&nbsp;${btn("WhatsApp Us", `https://wa.me/${WA_NUM}?text=Hi%2C%20re%20order%20${data.ref}`, "#25D366", "#fff")}</div>` : ""}
  `);

  await sendMail({ to: data.email, subject: subjects[data.status] ?? `Order Update — ${data.ref}`, html });
}

// ─── 4. Quote Reply ───────────────────────────────────────────────────────────
export async function sendQuoteReply(data: { name: string; email: string; ref: string; package: string; price: string; message: string }) {
  const html = layout(`
    ${label("Your Quote is Ready")}
    <h1 style="margin:6px 0 6px;color:#f9fafb;font-size:28px;font-weight:900">Hi ${data.name.split(" ")[0]}, here is your quote</h1>
    <p style="margin:0 0 28px;color:${MUTED};font-size:13px">Reference: <strong style="color:#e5e7eb">${data.ref}</strong></p>

    <!-- Package card -->
    <div style="background:${DARK2};border:1px solid ${GOLD}44;border-radius:14px;padding:28px;margin-bottom:24px;text-align:center">
      ${label("Recommended Package")}
      <p style="margin:8px 0 20px;color:#f9fafb;font-size:22px;font-weight:900">${data.package}</p>
      <div style="height:1px;background:${BORDER};margin:0 0 20px"></div>
      ${label("Estimated Price")}
      <p style="margin:8px 0 0;color:${GOLD};font-size:34px;font-weight:900;letter-spacing:0.02em">${data.price}</p>
    </div>

    ${data.message ? `
    <p style="margin:0 0 10px;color:#e5e7eb;font-size:15px;font-weight:700">Message from our team</p>
    <div style="background:${DARK2};border:1px solid ${BORDER};border-left:3px solid ${GOLD};border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:28px">
      <p style="margin:0;color:#d1d5db;font-size:14px;line-height:1.8">${data.message.replace(/\n/g, "<br>")}</p>
    </div>` : ""}

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Ready to proceed or have questions?</p>
    ${btn("Accept Quote", `https://wa.me/${WA_NUM}?text=Hi%2C%20I%20accept%20quote%20${data.ref}`, GOLD, BLACK)}
    &nbsp;&nbsp;
    ${btn("Ask a Question", `https://wa.me/${WA_NUM}?text=Hi%2C%20question%20about%20quote%20${data.ref}`, "#25D366", "#fff")}
  `);

  await sendMail({ to: data.email, subject: `Your Quote — ${data.ref} | Daisy Gadgets Co.`, html });
}

// ─── 5. Welcome / Discount Code ──────────────────────────────────────────────
export async function sendWelcomeEmail(data: { name: string; email: string }) {
  const html = layout(`
    ${label("Welcome to the family")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">
      ✨ You are in${data.name ? `, ${data.name.split(" ")[0]}` : ""}!
    </h1>
    <p style="margin:0 0 28px;color:#9ca3af;font-size:15px;line-height:1.6">Thank you for joining the Daisy Gadgets Co. family. Here is your exclusive first-order discount code:</p>

    <!-- Code card -->
    <div style="background:${BLACK};border:1px solid ${GOLD}55;border-radius:14px;padding:32px;text-align:center;margin-bottom:28px">
      ${label("Your Exclusive Discount Code")}
      <p style="margin:12px 0;color:${GOLD};font-size:40px;font-weight:900;letter-spacing:0.15em;font-family:monospace">DAISY25</p>
      <div style="height:1px;background:${BORDER};margin:16px 0"></div>
      <p style="margin:0;color:${MUTED};font-size:13px;line-height:1.6">💎 25% off your first order — mention this code on WhatsApp<br>when placing your order. Valid for all products.</p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Browse our full range of gadgets, appliances, solar solutions and more:</p>
    ${btn("🛍️ Shop Now", `${SITE}/shop`)}
    &nbsp;&nbsp;
    ${btn("💬 Claim via WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20I%20have%20the%20discount%20code%20DAISY25`, "#25D366", "#fff")}
  `);

  await sendMail({ to: data.email, subject: "✨ Your 25% Discount Code — Daisy Gadgets Co.", html });
}
