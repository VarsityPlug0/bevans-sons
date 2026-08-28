import nodemailer from "nodemailer";
import path from "path";
import { existsSync } from "fs";
import { getDefaultBank, type BankDetails } from "./bankDetails";
import { BRAND } from "./config";

const LOGO_PATH = path.join(process.cwd(), "public", "logo.jpg");
const LOGO_CID  = "logo@bevanssons";

const ACCENT     = "#FFFFFF";
const ACCENT_DIM = "#D1D5DB";
const BLACK      = "#0A0A0A";
const DARK       = "#111111";
const DARK2      = "#161616";
const BORDER     = "#1F1F1F";
const MUTED      = "#6b7280";

const WA_NUM = BRAND.whatsapp;
const SITE   = BRAND.domain;
const BRAND_NAME = BRAND.name;

function createTransporter() {
  if (process.env.RESEND_API_KEY) {
    return nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 587,
      secure: false,
      auth: { user: "resend", pass: process.env.RESEND_API_KEY },
    });
  }
  if (process.env.MAIL_USER && process.env.MAIL_PASS) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });
  }
  return null;
}

function fromAddress() {
  const domain = new URL(SITE).hostname;
  return process.env.RESEND_API_KEY
    ? `"${BRAND_NAME}" <noreply@${domain}>`
    : `"${BRAND_NAME}" <${process.env.MAIL_USER ?? `noreply@${domain}`}>`;
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
      from: fromAddress(),
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      attachments,
    });
  } catch (err) { console.error("mailer send error:", err); }
}

async function fetchImageBuffer(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

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
      const cid = `product-${i}@bevans`;
      const ext = item.imageUrl.split(".").pop()?.split("?")[0] ?? "jpg";
      attachments.push({ filename: `product-${i}.${ext}`, content: buf, cid });
      cidMap.set(item.imageUrl, `cid:${cid}`);
    })
  );

  return { attachments, cidMap };
}

// ─── Layout ──────────────────────────────────────────────────────────────────
function layout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${BRAND_NAME}</title>
</head>
<body style="margin:0;padding:0;background:${BLACK};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BLACK};padding:28px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid ${BORDER}">

        <!-- Top border -->
        <tr><td style="background:${ACCENT};height:2px;font-size:0;line-height:0">&nbsp;</td></tr>

        <!-- Header -->
        <tr>
          <td style="background:${BLACK};padding:24px 36px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="cid:${LOGO_CID}" alt="${BRAND_NAME}" height="44" style="height:44px;width:auto;display:block;border:0" />
                </td>
                <td align="right">
                  <a href="${SITE}" style="color:${MUTED};font-size:12px;text-decoration:none">${new URL(SITE).hostname}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

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
              ${WA_NUM ? `<a href="https://wa.me/${WA_NUM}" style="color:${ACCENT};text-decoration:none;font-weight:600">WhatsApp</a> &nbsp;·&nbsp;` : ""}
              <a href="${SITE}" style="color:${ACCENT};text-decoration:none;font-weight:600">${new URL(SITE).hostname}</a>
            </p>
            <p style="margin:0;color:#333;font-size:11px;text-align:center">
              © ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
            </p>
          </td>
        </tr>

        <!-- Bottom border -->
        <tr><td style="background:${ACCENT};height:1px;font-size:0;line-height:0">&nbsp;</td></tr>

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

function btn(text: string, href: string, bg = ACCENT, fg = BLACK) {
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
  items: { name: string; price: string | number; qty: number; imageUrl?: string; size?: string; colour?: string }[];
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
    const meta = [i.size, i.colour].filter(Boolean).join(" · ");
    return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${BORDER};width:76px;vertical-align:middle">${thumb}</td>
      <td style="padding:12px 12px;border-bottom:1px solid ${BORDER};vertical-align:middle">
        <p style="margin:0 0 4px;color:#e5e7eb;font-size:14px;font-weight:600">${i.name}</p>
        ${meta ? `<p style="margin:0 0 2px;color:${MUTED};font-size:12px">${meta}</p>` : ""}
        <p style="margin:0;color:${MUTED};font-size:12px">Qty: ${i.qty}</p>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${BORDER};text-align:right;vertical-align:middle">
        <span style="color:${ACCENT};font-size:14px;font-weight:700">R ${lineTotal}</span>
      </td>
    </tr>`;
  }).join("");

  const html = layout(`
    <div style="text-align:center;margin-bottom:28px">
      <h1 style="margin:0 0 8px;color:#f9fafb;font-size:26px;font-weight:900">Thank you for your order!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${data.name.split(" ")[0]}, your payment has been verified and your order is confirmed.</p>
    </div>

    <div style="background:${DARK2};border:1px solid #ffffff22;border-radius:10px;padding:14px 20px;margin-bottom:28px">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="color:${MUTED};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Order Reference</td>
        <td style="text-align:right;color:${ACCENT};font-size:18px;font-weight:900;letter-spacing:0.08em;font-family:monospace">${data.ref}</td>
      </tr></table>
    </div>

    <p style="margin:0 0 12px;color:#e5e7eb;font-size:15px;font-weight:700">Order Summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px">
      ${itemRows}
    </table>

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
        <td style="padding:10px 0 0;text-align:right;color:${ACCENT};font-size:20px;font-weight:900;border-top:1px solid ${BORDER}">R ${data.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${divider()}

    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">Delivery Information</p>
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td width="50%" style="padding:0 8px 0 0;vertical-align:top">
        <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:10px;padding:16px 18px">
          <p style="margin:0 0 6px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Shipping Address</p>
          <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">${data.name}<br>${data.address || "—"}</p>
        </div>
      </td>
      <td width="50%" style="padding:0 0 0 8px;vertical-align:top">
        <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:10px;padding:16px 18px">
          <p style="margin:0 0 6px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Delivery</p>
          <p style="margin:0;color:#d1d5db;font-size:13px">Standard Delivery<br><span style="color:${MUTED};font-size:12px">3–5 business days</span></p>
        </div>
      </td>
    </tr></table>

    <div style="text-align:center;margin-top:24px">
      ${WA_NUM ? btn("Chat on WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20checking%20on%20order%20${data.ref}`, "#25D366", "#fff") : ""}
    </div>
  `);

  await sendMail({ to: data.email, subject: `Order Confirmed — ${data.ref} | ${BRAND_NAME}`, html, attachments: imgAttachments });
}

// ─── 2. Admin: New Order Notification ────────────────────────────────────────
export async function sendAdminOrderNotification(data: OrderEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const itemList = data.items
    .map(i => {
      const meta = [i.size, i.colour].filter(Boolean).join(" · ");
      return `• ${i.name}${meta ? ` (${meta})` : ""} × ${i.qty} — R ${parseFloat(String(i.price).replace(/[^0-9.]/g, "")).toLocaleString("en-ZA")}`;
    })
    .join("<br>");

  const html = layout(`
    <h1 style="margin:0 0 8px;color:#f9fafb;font-size:22px;font-weight:900">New Order Received</h1>
    <p style="margin:0 0 20px;color:${MUTED};font-size:14px">Ref: <strong style="color:${ACCENT}">${data.ref}</strong></p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
      ${infoRow("Name", data.name)}
      ${infoRow("Email", data.email)}
      ${infoRow("Phone", data.phone ?? "—")}
      ${infoRow("Address", data.address ?? "—")}
      ${infoRow("Total", `R ${data.total.toLocaleString("en-ZA")}`)}
    </table>
    <p style="margin:0 0 8px;color:#e5e7eb;font-size:14px;font-weight:700">Items</p>
    <p style="margin:0 0 20px;color:#d1d5db;font-size:13px;line-height:2">${itemList}</p>
    ${btn("View in Admin", `${SITE}/admin/dashboard/orders`)}
  `);

  await sendMail({ to: adminEmail, subject: `New Order — ${data.ref} | ${BRAND_NAME}`, html });
}

// ─── 3. Proof Acknowledgement ─────────────────────────────────────────────────
export async function sendProofAcknowledgement(data: { name: string; email: string; ref: string }) {
  const html = layout(`
    ${label("Payment Received")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">We got your proof!</h1>
    <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.6">
      Hi ${data.name.split(" ")[0]}, we received your proof of payment for order <strong style="color:${ACCENT}">${data.ref}</strong>.
    </p>

    <div style="background:${DARK2};border:1px solid #22c55e44;border-left:3px solid #22c55e;border-radius:0 12px 12px 0;padding:18px 20px;margin-bottom:28px">
      <p style="margin:0;color:#86efac;font-size:14px;line-height:1.7">
        Your proof is under review. We will verify and confirm your order within <strong>24 hours</strong>. You will receive another email as soon as it is approved.
      </p>
    </div>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Need help or want to check in?</p>
    ${WA_NUM ? btn("Chat on WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20checking%20on%20order%20${data.ref}`, "#25D366", "#fff") : ""}
  `);
  await sendMail({ to: data.email, subject: `Payment Proof Received — ${data.ref} | ${BRAND_NAME}`, html });
}

// ─── 4. Rejection Email ──────────────────────────────────────────────────────
export interface RejectionEmailData {
  name: string;
  email: string;
  ref: string;
  total: number;
  items: { name: string; price: string | number; qty: number; imageUrl?: string }[];
  reason?: string | null;
  bank?: BankDetails | null;
}

export async function sendRejectionEmail(data: RejectionEmailData) {
  const bank = data.bank ?? getDefaultBank();
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
        <span style="color:${ACCENT};font-size:14px;font-weight:700">R ${lineTotal}</span>
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
    <div style="text-align:center;margin-bottom:28px">
      <div style="display:inline-block;background:#ef444420;color:#ef4444;border:1px solid #ef444450;padding:5px 16px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.06em;margin-bottom:14px">Action Required</div>
      <h1 style="margin:0 0 10px;color:#f9fafb;font-size:26px;font-weight:900;line-height:1.2">Payment could not be verified</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px;line-height:1.6">Hi <strong style="color:#e5e7eb">${data.name.split(" ")[0]}</strong>, we were unable to verify your proof of payment for order <strong style="color:${ACCENT};font-family:monospace">${data.ref}</strong>.</p>
    </div>

    ${reasonHtml}

    <p style="margin:0 0 24px;color:#9ca3af;font-size:14px;line-height:1.7">
      Please re-do your payment using the details below and upload a clear screenshot of your confirmation.
    </p>

    ${divider()}

    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">Your Order</p>
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
        <td style="padding:10px 0 0;text-align:right;color:${ACCENT};font-size:20px;font-weight:900;border-top:1px solid ${BORDER}">R ${data.total.toLocaleString("en-ZA")}</td>
      </tr>
    </table>

    ${divider()}

    <p style="margin:0 0 14px;color:#e5e7eb;font-size:15px;font-weight:700">Payment Details (EFT)</p>
    <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:12px;padding:4px 20px;margin-bottom:28px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Bank", bank.bank)}
        ${infoRow("Account Holder", bank.accountHolder)}
        ${infoRow("Account Type", bank.accountType)}
        ${infoRow("Account Number", `<span style="font-family:monospace;font-size:15px;color:${ACCENT};letter-spacing:0.06em">${bank.accountNumber}</span>`)}
        ${infoRow("Branch Code", bank.branchCode)}
        ${bank.payshap ? infoRow("PayShap", bank.payshap) : ""}
        ${infoRow("Reference", `<strong style="color:${ACCENT};font-size:15px;font-family:monospace">${data.ref}</strong>`)}
        ${infoRow("Amount", `<strong style="color:${ACCENT};font-size:15px">R ${data.total.toLocaleString("en-ZA")}</strong>`)}
      </table>
    </div>

    <p style="margin:0 0 20px;color:#9ca3af;font-size:14px">Once paid, upload your new proof of payment — or send it directly on WhatsApp.</p>
    <div>
      ${btn("Upload New Proof", `${SITE}/checkout`, ACCENT, BLACK)}
      ${WA_NUM ? `&nbsp;&nbsp;${btn("Send via WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20re-sending%20proof%20for%20order%20${data.ref}`, "#25D366", "#fff")}` : ""}
    </div>
  `);

  await sendMail({ to: data.email, subject: `Action Required — ${data.ref} | ${BRAND_NAME}`, html, attachments: imgAttachments });
}

// ─── 5. Order Status Updates ──────────────────────────────────────────────────
const STATUS_CONTENT: Record<string, { pill: [string, string]; title: string; body: string; cta?: [string, string]; icon: string }> = {
  approved: {
    pill: ["Payment Approved", "#22c55e"],
    icon: "✓",
    title: "Your payment is confirmed!",
    body: "Great news — your payment has been verified and your order is now being packed and prepared for dispatch. We will notify you as soon as it ships.",
    cta: WA_NUM ? ["Chat on WhatsApp", `https://wa.me/${WA_NUM}`] : undefined,
  },
  shipped: {
    pill: ["Shipped", "#3b82f6"],
    icon: "📦",
    title: "Your order has been shipped!",
    body: "Your order has been packed and dispatched. Your parcel is now in transit — please keep your contact number available in case our delivery team needs to reach you.\n\nWe will notify you again when your order is out for delivery.",
    cta: WA_NUM ? ["Track via WhatsApp", `https://wa.me/${WA_NUM}`] : undefined,
  },
  delivered: {
    pill: ["Delivered", ACCENT],
    icon: "✓",
    title: "Your order has been delivered!",
    body: `We are delighted to confirm that your ${BRAND_NAME} order has been successfully delivered.\n\nThank you for choosing ${BRAND_NAME}. We hope you love your new pieces. If you experience any issue, please reach out and we will be happy to assist.\n\nWe would also appreciate your feedback about your shopping experience.`,
    cta: ["Leave a Review", `${SITE}/reviews`],
  },
};

function bodyParagraphs(text: string): string {
  return text.split("\n\n")
    .map(p => `<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${p}</p>`)
    .join("");
}

export async function sendStatusUpdate(data: { name: string; email: string; ref: string; status: string; notes?: string | null; tracking_number?: string | null }) {
  const content = STATUS_CONTENT[data.status];
  if (!content) return;

  const notesHtml = data.notes
    ? `<div style="background:${DARK2};border-left:3px solid ${ACCENT_DIM};border-radius:0 10px 10px 0;padding:14px 18px;margin:20px 0">
        <p style="margin:0 0 4px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Note from our team</p>
        <p style="margin:0;color:#d1d5db;font-size:14px;font-style:italic;line-height:1.6">"${data.notes}"</p>
       </div>`
    : "";

  const trackingHtml = data.status === "shipped" && data.tracking_number
    ? `<div style="background:${DARK2};border:1px solid #3b82f644;border-left:3px solid #3b82f6;border-radius:0 12px 12px 0;padding:16px 20px;margin:4px 0 20px">
        <p style="margin:0 0 4px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Your Tracking Number</p>
        <p style="margin:0;color:#93c5fd;font-size:20px;font-weight:700;font-family:monospace;letter-spacing:0.08em">${data.tracking_number}</p>
       </div>`
    : "";

  const subjects: Record<string, string> = {
    approved:  `Payment Approved — ${data.ref} | ${BRAND_NAME}`,
    shipped:   `Your Order Has Been Shipped — ${data.ref} | ${BRAND_NAME}`,
    delivered: `Order Delivered — ${data.ref} | ${BRAND_NAME}`,
  };

  const html = layout(`
    <div style="margin-bottom:16px">${statusPill(...content.pill)}</div>
    <div style="font-size:30px;margin-bottom:12px;line-height:1">${content.icon}</div>
    <h1 style="margin:0 0 6px;color:#f9fafb;font-size:26px;font-weight:900">${content.title}</h1>
    <p style="margin:0 0 4px;color:${MUTED};font-size:13px">Order: <strong style="color:${ACCENT}">${data.ref}</strong></p>
    ${divider()}
    <p style="margin:0 0 14px;color:#9ca3af;font-size:15px">Dear ${data.name.split(" ")[0]},</p>
    ${trackingHtml}
    ${bodyParagraphs(content.body)}
    ${notesHtml}
    ${content.cta ? `<div style="margin-top:24px">${btn(content.cta[0], content.cta[1])}${WA_NUM ? `&nbsp;&nbsp;${btn("WhatsApp Us", `https://wa.me/${WA_NUM}?text=Hi%2C%20re%20order%20${data.ref}`, "#25D366", "#fff")}` : ""}</div>` : ""}
  `);

  await sendMail({ to: data.email, subject: subjects[data.status] ?? `Order Update — ${data.ref} | ${BRAND_NAME}`, html });
}

// ─── 6. Tracking / Progress Update ───────────────────────────────────────────
export const TRACKING_TEMPLATES: Record<string, {
  icon: string; pillText: string; pillColor: string;
  title: string; subject: string; defaultMessage: string; stage: number;
}> = {
  processing: {
    icon: "⚙️", pillText: "Being Prepared", pillColor: "#8b5cf6",
    title: "Your order is being prepared",
    subject: `Your Order Is Being Prepared — ${BRAND_NAME}`,
    defaultMessage: "We are pleased to confirm that your order has been placed and is now being prepared by our fulfilment team.\n\nWe will notify you as soon as your order is ready for packing.",
    stage: 2,
  },
  packed: {
    icon: "📦", pillText: "Being Packed", pillColor: "#3b82f6",
    title: "Your order is being packed",
    subject: `Your Order Is Being Packed — ${BRAND_NAME}`,
    defaultMessage: "Your order has moved to the packing stage.\n\nOur team is carefully packaging your order to ensure it is properly prepared for transport. You will be notified once dispatched.",
    stage: 3,
  },
  out_for_delivery: {
    icon: "🏠", pillText: "Out for Delivery", pillColor: "#10b981",
    title: "Your order is out for delivery today!",
    subject: `Your Order Is Out for Delivery — ${BRAND_NAME}`,
    defaultMessage: "Your order is out for delivery.\n\nYour delivery driver will contact you when approaching your location. Please keep your phone available and ensure someone is available to receive the order.",
    stage: 5,
  },
  delayed: {
    icon: "⏳", pillText: "Slight Delay", pillColor: "#f59e0b",
    title: "A small update on your order",
    subject: `Update on Your Order — ${BRAND_NAME}`,
    defaultMessage: "We would like to inform you that there has been a slight delay with your order. We sincerely apologise for any inconvenience.\n\nOur team is resolving this as quickly as possible and will keep you updated.",
    stage: -1,
  },
  custom: {
    icon: "📬", pillText: "Update", pillColor: ACCENT_DIM,
    title: "An update on your order",
    subject: `Update on Your Order — ${BRAND_NAME}`,
    defaultMessage: "",
    stage: -1,
  },
};

function progressBar(activeStage: number): string {
  const stages = ["Order Placed", "Processing", "Packed", "Dispatched", "Delivered"];
  const dotCells: string[] = [];
  const labelCells: string[] = [];

  stages.forEach((name, i) => {
    const s = i + 1;
    const done = s < activeStage;
    const active = s === activeStage;
    const dotBg    = done ? "#10b981" : active ? "#fff" : "#1a1a1a";
    const dotColor = done ? "#fff" : active ? "#000" : "#555";
    const labelColor = active ? "#e5e7eb" : done ? "#9ca3af" : "#4b5563";

    dotCells.push(
      `<td align="center"><table cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>` +
      `<td align="center" width="28" height="28" style="width:28px;height:28px;border-radius:14px;background:${dotBg};border:2px solid ${done ? "#10b981" : active ? "#fff" : "#2a2a2a"};text-align:center;vertical-align:middle;font-size:11px;font-weight:800;color:${dotColor};line-height:24px">` +
      `${done ? "&#10003;" : s}</td></tr></table></td>`
    );
    labelCells.push(
      `<td align="center" style="padding:6px 2px 0;vertical-align:top"><p style="margin:0;font-size:10px;color:${labelColor};font-weight:${active ? 700 : 400};line-height:1.4">${name}</p></td>`
    );

    if (i < stages.length - 1) {
      const lineColor = i + 1 < activeStage ? "#10b981" : "#2a2a2a";
      dotCells.push(`<td style="vertical-align:middle;padding-bottom:4px"><div style="height:2px;background:${lineColor}"></div></td>`);
      labelCells.push(`<td></td>`);
    }
  });

  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 8px"><tr>${dotCells.join("")}</tr><tr>${labelCells.join("")}</tr></table>`;
}

export async function sendTrackingUpdate(data: {
  name: string; email: string; ref: string;
  templateId: string; message: string; tracking_number?: string | null;
}) {
  const tmpl = TRACKING_TEMPLATES[data.templateId] ?? TRACKING_TEMPLATES.custom;

  const bodyHtml = data.message
    ? data.message.split("\n\n").map(p =>
        `<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${p}</p>`
      ).join("")
    : "";

  const trackingHtml = data.tracking_number
    ? `<div style="background:${DARK2};border:1px solid #3b82f644;border-left:3px solid #3b82f6;border-radius:0 12px 12px 0;padding:16px 20px;margin:16px 0 20px">
        <p style="margin:0 0 4px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Your Tracking Number</p>
        <p style="margin:0;color:#93c5fd;font-size:20px;font-weight:700;font-family:monospace;letter-spacing:0.08em">${data.tracking_number}</p>
       </div>`
    : "";

  const html = layout(`
    <div style="margin-bottom:16px">${statusPill(tmpl.pillText, tmpl.pillColor)}</div>
    <div style="font-size:36px;margin-bottom:12px;line-height:1">${tmpl.icon}</div>
    <h1 style="margin:0 0 6px;color:#f9fafb;font-size:26px;font-weight:900">${tmpl.title}</h1>
    <p style="margin:0 0 4px;color:${MUTED};font-size:13px">Order: <strong style="color:${ACCENT}">${data.ref}</strong></p>
    ${divider()}
    <p style="margin:0 0 14px;color:#9ca3af;font-size:15px">Dear ${data.name.split(" ")[0]},</p>
    ${tmpl.stage > 0 ? progressBar(tmpl.stage) : ""}
    ${trackingHtml}
    ${bodyHtml}
    <div style="margin-top:8px">
      ${WA_NUM ? btn("Chat on WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20checking%20on%20order%20${data.ref}`, "#25D366", "#fff") : ""}
    </div>
  `);

  await sendMail({ to: data.email, subject: tmpl.subject, html });
}

// ─── 7. Welcome Email ─────────────────────────────────────────────────────────
export async function sendWelcomeEmail(data: { name: string; email: string }) {
  const html = layout(`
    ${label("Welcome to the family")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">
      You are in${data.name ? `, ${data.name.split(" ")[0]}` : ""}!
    </h1>
    <p style="margin:0 0 28px;color:#9ca3af;font-size:15px;line-height:1.6">
      Thank you for joining the ${BRAND_NAME} family. Premium clothing, crafted for the bold.
    </p>

    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Browse our latest arrivals and collections:</p>
    ${btn("Shop Now", `${SITE}/shop`, ACCENT, BLACK)}
    ${WA_NUM ? `&nbsp;&nbsp;${btn("Chat with Us", `https://wa.me/${WA_NUM}`, "#25D366", "#fff")}` : ""}
  `);

  await sendMail({ to: data.email, subject: `Welcome to ${BRAND_NAME}`, html });
}

// ─── 8. OTP ───────────────────────────────────────────────────────────────────
export async function sendCreditOtp(data: { email: string; otp: string; purpose: "application" | "account" }) {
  const purposeText = data.purpose === "application"
    ? "complete your credit application"
    : "access your credit account";
  const html = layout(`
    ${label("Verification Code")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">Your OTP</h1>
    <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.6">
      Use the code below to ${purposeText}. It expires in <strong style="color:#e5e7eb">10 minutes</strong>.
    </p>
    <div style="background:#0A0A0A;border:1px solid #ffffff22;border-radius:14px;padding:32px;text-align:center;margin-bottom:28px">
      <p style="margin:0;color:${ACCENT};font-size:48px;font-weight:900;letter-spacing:0.3em;font-family:monospace">${data.otp}</p>
    </div>
    <p style="margin:0;color:#4b5563;font-size:13px">If you did not request this code, please ignore this email.</p>
  `);
  await sendMail({ to: data.email, subject: `Your OTP: ${data.otp} — ${BRAND_NAME}`, html });
}

export async function sendCreditApplicationReceived(data: { name: string; email: string; ref: string; amount: number; term: number }) {
  const html = layout(`
    ${label("Credit Application")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">Application Received</h1>
    <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.6">
      Hi ${data.name.split(" ")[0]}, we have received your credit application <strong style="color:${ACCENT}">${data.ref}</strong>.
      Our team will review and respond within <strong style="color:#e5e7eb">1–2 business days</strong>.
    </p>
    <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:12px;padding:20px 24px;margin-bottom:28px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Reference", data.ref)}
        ${infoRow("Requested Amount", `R ${data.amount.toLocaleString("en-ZA")}`)}
        ${infoRow("Repayment Term", `${data.term} months`)}
        ${infoRow("Status", "Under Review")}
      </table>
    </div>
    <p style="color:#9ca3af;font-size:14px;margin:0 0 20px">Questions? Contact us on WhatsApp.</p>
    ${WA_NUM ? btn("Chat on WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20checking%20on%20credit%20application%20${data.ref}`, "#25D366", "#fff") : ""}
  `);
  await sendMail({ to: data.email, subject: `Credit Application Received — ${data.ref} | ${BRAND_NAME}`, html });
}

export async function sendCreditApproved(data: { name: string; email: string; ref: string; creditLimit: number }) {
  const html = layout(`
    <div style="text-align:center;margin-bottom:28px">
      <h1 style="margin:0 0 8px;color:#f9fafb;font-size:26px;font-weight:900">Credit Approved!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${data.name.split(" ")[0]}, your credit application has been approved.</p>
    </div>
    <div style="background:${DARK2};border:1px solid #ffffff22;border-radius:14px;padding:28px;text-align:center;margin-bottom:28px">
      ${label("Your Credit Limit")}
      <p style="margin:8px 0 0;color:${ACCENT};font-size:38px;font-weight:900">R ${data.creditLimit.toLocaleString("en-ZA")}</p>
    </div>
    <div style="text-align:center">
      ${btn("View My Account", `${SITE}/credit/account`, ACCENT, BLACK)}
      &nbsp;&nbsp;
      ${btn("Shop Now", `${SITE}/shop`, DARK2, ACCENT)}
    </div>
  `);
  await sendMail({ to: data.email, subject: `Credit Approved — R${data.creditLimit.toLocaleString("en-ZA")} | ${BRAND_NAME}`, html });
}

export async function sendCreditRejected(data: { name: string; email: string; ref: string; reason?: string }) {
  const reasonHtml = data.reason
    ? `<div style="background:${DARK2};border-left:3px solid #ef4444;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:24px">
        <p style="margin:0 0 4px;color:#ef4444;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Reason</p>
        <p style="margin:0;color:#fca5a5;font-size:14px;line-height:1.6">${data.reason}</p>
       </div>`
    : "";
  const html = layout(`
    ${label("Credit Application")}
    <h1 style="margin:6px 0 10px;color:#f9fafb;font-size:28px;font-weight:900">Application Outcome</h1>
    <p style="margin:0 0 20px;color:#9ca3af;font-size:15px;line-height:1.6">
      Hi ${data.name.split(" ")[0]}, unfortunately we were unable to approve your credit application <strong style="color:${ACCENT}">${data.ref}</strong> at this time.
    </p>
    ${reasonHtml}
    <p style="margin:0 0 20px;color:#9ca3af;font-size:14px;line-height:1.7">
      You are welcome to reapply in 3 months. In the meantime, you can shop using our EFT payment option.
    </p>
    ${btn("Shop Now", `${SITE}/shop`, ACCENT, BLACK)}
    ${WA_NUM ? `&nbsp;&nbsp;${btn("Chat with Us", `https://wa.me/${WA_NUM}`, "#25D366", "#fff")}` : ""}
  `);
  await sendMail({ to: data.email, subject: `Credit Application Update — ${data.ref} | ${BRAND_NAME}`, html });
}

export async function sendCreditOrderConfirmed(data: {
  name: string;
  email: string;
  orderRef: string;
  creditOrderRef: string;
  amount: number;
  termMonths: number;
  monthly: number;
  total: number;
  instalments: { instalment_number: number; due_date: string; amount: number }[];
}) {
  const scheduleRows = data.instalments.map(p =>
    `<tr>
      <td style="padding:8px 0;color:${MUTED};font-size:13px;border-bottom:1px solid ${BORDER}">Instalment ${p.instalment_number}</td>
      <td style="padding:8px 0;color:#e5e7eb;font-size:13px;font-weight:600;border-bottom:1px solid ${BORDER}">${new Date(p.due_date).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}</td>
      <td style="padding:8px 0;color:${ACCENT};font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid ${BORDER}">R ${p.amount.toLocaleString("en-ZA")}</td>
    </tr>`
  ).join("");

  const html = layout(`
    <div style="text-align:center;margin-bottom:28px">
      <h1 style="margin:0 0 8px;color:#f9fafb;font-size:26px;font-weight:900">Order on Credit Confirmed!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${data.name.split(" ")[0]}, your order has been placed on your credit account.</p>
    </div>
    <div style="background:${DARK2};border:1px solid #ffffff22;border-radius:12px;padding:16px 20px;margin-bottom:24px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Order Ref", data.orderRef)}
        ${infoRow("Credit Agreement", data.creditOrderRef)}
        ${infoRow("Purchase Amount", `R ${data.amount.toLocaleString("en-ZA")}`)}
        ${infoRow("Repayment Term", `${data.termMonths} months`)}
        ${infoRow("Monthly Instalment", `R ${data.monthly.toLocaleString("en-ZA")}`)}
        ${infoRow("Total Repayable", `R ${data.total.toLocaleString("en-ZA")}`)}
      </table>
    </div>
    <p style="margin:0 0 12px;color:#e5e7eb;font-size:15px;font-weight:700">Repayment Schedule</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      ${scheduleRows}
    </table>
    ${btn("View My Account", `${SITE}/credit/account`, ACCENT, BLACK)}
  `);
  await sendMail({ to: data.email, subject: `Credit Order Confirmed — ${data.orderRef} | ${BRAND_NAME}`, html });
}

// ─── 9. Installment: Approval ─────────────────────────────────────────────────
export async function sendInstallmentApproval(data: {
  name: string;
  email: string;
  ref: string;
  product_name: string;
  product_price: number;
  deposit: number;
  monthly_payment: number;
  term_months: number;
  total_repayable: number;
  phone: string;
}) {
  const bank = getDefaultBank();
  const fmt = (n: number) => `R ${n.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;
  const waMsg = encodeURIComponent(
    `Hi, I received approval for my installment application ${data.ref} for the ${data.product_name}. I'm ready to pay my deposit of ${fmt(data.deposit)}.`
  );

  const html = layout(`
    <div style="text-align:center;margin-bottom:28px">
      <h1 style="margin:0 0 8px;color:#fff;font-size:22px;font-weight:900">Application Approved!</h1>
      <p style="margin:0;color:#9ca3af;font-size:14px">Hi ${data.name.split(" ")[0]}, your installment plan is confirmed.</p>
    </div>

    <div style="background:${BLACK};border:1px solid #ffffff22;border-radius:12px;padding:16px 20px;margin-bottom:24px">
      ${label("Application Reference")}
      <p style="margin:4px 0 12px;color:${ACCENT};font-size:24px;font-weight:900;font-family:monospace;letter-spacing:0.1em">${data.ref}</p>
      ${label("Product")}
      <p style="margin:4px 0 0;color:#fff;font-size:15px;font-weight:700">${data.product_name}</p>
    </div>

    ${divider()}

    <p style="margin:0 0 12px;color:#fff;font-size:15px;font-weight:700">Your Payment Schedule</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};color:${MUTED};font-size:13px">Deposit <span style="color:#f59e0b;font-size:11px;font-weight:700">(pay first)</span></td>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};color:#f59e0b;font-size:18px;font-weight:900;text-align:right">${fmt(data.deposit)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};color:${MUTED};font-size:13px">Monthly Payment × ${data.term_months} months</td>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};color:${ACCENT};font-size:18px;font-weight:900;text-align:right">${fmt(data.monthly_payment)}/mo</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:${MUTED};font-size:13px">Total Repayable</td>
        <td style="padding:10px 0;color:#e5e7eb;font-size:14px;font-weight:700;text-align:right">${fmt(data.total_repayable)}</td>
      </tr>
    </table>

    <div style="background:#f59e0b11;border:1px solid #f59e0b44;border-radius:12px;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0 0 6px;color:#f59e0b;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Next Step — Pay Your Deposit</p>
      <p style="margin:0;color:#d1d5db;font-size:13px;line-height:1.6">Transfer <strong style="color:#f59e0b">${fmt(data.deposit)}</strong> using <strong style="color:#fff">${data.ref}</strong> as your reference, then send proof of payment on WhatsApp.</p>
    </div>

    ${divider()}

    <p style="margin:0 0 12px;color:#fff;font-size:15px;font-weight:700">Payment Details</p>
    <div style="background:${DARK2};border:1px solid ${BORDER};border-radius:12px;padding:4px 20px;margin-bottom:24px">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Bank", bank.bank)}
        ${infoRow("Account Holder", bank.accountHolder)}
        ${infoRow("Account Number", `<span style="font-family:monospace">${bank.accountNumber}</span>`)}
        ${infoRow("Branch Code", bank.branchCode)}
        ${infoRow("Reference", `<strong style="color:${ACCENT}">${data.ref}</strong>`)}
      </table>
    </div>

    <div style="text-align:center">
      ${WA_NUM ? btn("Send Proof on WhatsApp", `https://wa.me/${WA_NUM}?text=${waMsg}`, "#25D366", "#fff") : ""}
    </div>
    <p style="margin:12px 0 0;color:${MUTED};font-size:12px;text-align:center">Always use <strong style="color:#fff">${data.ref}</strong> as your payment reference.</p>
  `);

  await sendMail({ to: data.email, subject: `Installment Approved — ${data.ref} | ${BRAND_NAME}`, html });
}

// ─── 10. Campaign / Marketing Emails ─────────────────────────────────────────
export interface CampaignEmailData {
  to: string;
  name: string;
  subject: string;
  heading: string;
  body: string;
  ctaText: string;
  ctaUrl: string;
  orderItems?: { name: string; price: string; qty: number; imageUrl?: string }[];
  restoreCartUrl?: string;
  trackingId?: string;
}

export async function sendCampaignEmail(data: CampaignEmailData) {
  const itemsHtml = data.orderItems?.length
    ? `<p style="margin:0 0 12px;color:#e5e7eb;font-size:14px;font-weight:700">Your Items</p>` +
      data.orderItems.map(i =>
        `<div style="background:${DARK2};border:1px solid ${BORDER};border-radius:10px;padding:12px 16px;margin-bottom:8px;display:flex;align-items:center">
          <p style="margin:0;color:#e5e7eb;font-size:14px;font-weight:600">${i.name} <span style="color:${MUTED};font-weight:400">× ${i.qty}</span></p>
        </div>`
      ).join("")
    : "";

  const trackingPixel = data.trackingId
    ? `<img src="${SITE}/api/track/${data.trackingId}" width="1" height="1" style="display:none" alt="" />`
    : "";

  const html = layout(`
    <h1 style="margin:0 0 8px;color:#f9fafb;font-size:24px;font-weight:900">${data.heading}</h1>
    ${divider()}
    ${data.body.split("\n\n").map(p => `<p style="margin:0 0 14px;color:#9ca3af;font-size:15px;line-height:1.7">${p}</p>`).join("")}
    ${itemsHtml}
    <div style="margin-top:24px">${btn(data.ctaText, data.ctaUrl, ACCENT, BLACK)}</div>
    ${trackingPixel}
  `);

  await sendMail({ to: data.to, subject: data.subject, html });
}

// ─── Installment status update emails ────────────────────────────────────────

interface InstallmentStatusData {
  name: string;
  email: string;
  ref: string;
  product_name: string;
  deposit: number;
  monthly_payment: number;
  term_months: number;
  total_repayable: number;
  phone: string;
  admin_notes?: string | null;
}

function installmentSimpleEmail(
  data: InstallmentStatusData,
  title: string,
  body: string,
  pillText: string,
  pillColor: string
): string {
  const notesHtml = data.admin_notes
    ? `<div style="background:${DARK2};border-left:3px solid ${ACCENT_DIM};border-radius:0 10px 10px 0;padding:14px 18px;margin:16px 0">
        <p style="margin:0 0 4px;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">Note from our team</p>
        <p style="margin:0;color:#d1d5db;font-size:14px;line-height:1.6">${data.admin_notes}</p>
       </div>`
    : "";

  return layout(`
    <div style="margin-bottom:16px">${statusPill(pillText, pillColor)}</div>
    <h1 style="margin:0 0 10px;color:#f9fafb;font-size:22px;font-weight:900">${title}</h1>
    <p style="margin:0 0 20px;color:#9ca3af;font-size:14px">Hi ${data.name.split(" ")[0]}, ref: <strong style="color:${ACCENT}">${data.ref}</strong></p>
    <p style="margin:0 0 20px;color:#9ca3af;font-size:15px;line-height:1.7">${body}</p>
    ${notesHtml}
    ${WA_NUM ? `<div style="margin-top:24px">${btn("Chat on WhatsApp", `https://wa.me/${WA_NUM}?text=Hi%2C%20re%20installment%20${data.ref}`, "#25D366", "#fff")}</div>` : ""}
  `);
}

export async function sendInstallmentReviewing(data: InstallmentStatusData) {
  const html = installmentSimpleEmail(data,
    "Application Under Review",
    `We are currently reviewing your installment application for <strong style="color:#e5e7eb">${data.product_name}</strong>. Our team will get back to you within 24 hours.`,
    "Under Review", "#3b82f6"
  );
  await sendMail({ to: data.email, subject: `Application Under Review — ${data.ref} | ${BRAND_NAME}`, html });
}

export async function sendInstallmentAwaitingPayment(data: InstallmentStatusData) {
  const bank = getDefaultBank();
  const fmt = (n: number) => `R ${n.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;
  const html = installmentSimpleEmail(data,
    "Awaiting Deposit Payment",
    `Your installment plan for <strong style="color:#e5e7eb">${data.product_name}</strong> is approved. Please pay your deposit of <strong style="color:${ACCENT}">${fmt(data.deposit)}</strong> to <strong style="color:#e5e7eb">${bank.bank}</strong> (acc: ${bank.accountNumber}) using reference <strong style="color:${ACCENT}">${data.ref}</strong>.`,
    "Awaiting Payment", "#f59e0b"
  );
  await sendMail({ to: data.email, subject: `Deposit Required — ${data.ref} | ${BRAND_NAME}`, html });
}

export async function sendInstallmentActive(data: InstallmentStatusData) {
  const fmt = (n: number) => `R ${n.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;
  const html = installmentSimpleEmail(data,
    "Your Plan is Active!",
    `Great news! Your installment plan for <strong style="color:#e5e7eb">${data.product_name}</strong> is now active. Your monthly payment of <strong style="color:${ACCENT}">${fmt(data.monthly_payment)}</strong> is due each month for ${data.term_months} months.`,
    "Active", "#22c55e"
  );
  await sendMail({ to: data.email, subject: `Installment Plan Active — ${data.ref} | ${BRAND_NAME}`, html });
}

export async function sendInstallmentCompleted(data: InstallmentStatusData) {
  const html = installmentSimpleEmail(data,
    "Plan Completed!",
    `Congratulations! You have successfully completed your installment plan for <strong style="color:#e5e7eb">${data.product_name}</strong>. Thank you for choosing ${BRAND_NAME}.`,
    "Completed", "#22c55e"
  );
  await sendMail({ to: data.email, subject: `Installment Completed — ${data.ref} | ${BRAND_NAME}`, html });
}

export async function sendInstallmentDeclined(data: InstallmentStatusData) {
  const html = installmentSimpleEmail(data,
    "Application Declined",
    `Unfortunately your installment application for <strong style="color:#e5e7eb">${data.product_name}</strong> could not be approved at this time. Please contact us for more information.`,
    "Declined", "#ef4444"
  );
  await sendMail({ to: data.email, subject: `Application Update — ${data.ref} | ${BRAND_NAME}`, html });
}
