// ── Bevans Sons — Central Brand Configuration ──────────────────────────────
// Non-secret brand values live here.
// Secrets (passwords, API keys, bank account numbers) MUST remain in env vars.

export const BRAND = {
  name: "Bevans Sons",
  tagline: "Premium Clothing. Crafted for the Bold.",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bevanssons.store",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "Email Us",
  currency: "ZAR",
  currencySymbol: "R",
  locale: "en-ZA",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK ?? "",
  },
  shipping: {
    freeThreshold: 1500,
    standardDays: "3-5 business days",
    expressDays: "1-2 business days",
  },
} as const;

// ── Bank Details ─────────────────────────────────────────────────────────────
// Read from environment variables ONLY. Never hardcoded.
export function getBankConfig() {
  return {
    bank: process.env.BANK_NAME ?? "",
    accountHolder: process.env.BANK_ACCOUNT_HOLDER ?? "",
    accountType: process.env.BANK_ACCOUNT_TYPE ?? "Business Account",
    accountNumber: process.env.BANK_ACCOUNT_NUMBER ?? "",
    branchCode: process.env.BANK_BRANCH_CODE ?? "",
  };
}

// ── Email Config ─────────────────────────────────────────────────────────────
export function getAdminEmails(): string {
  const primary = process.env.ADMIN_EMAIL ?? "";
  const secondary = process.env.ADMIN_EMAIL_2 ?? "";
  return [primary, secondary].filter(Boolean).join(", ");
}

// ── Price Formatting ─────────────────────────────────────────────────────────
export function formatPrice(value: number | string): string {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(amount)) return `${BRAND.currencySymbol}0.00`;
  return new Intl.NumberFormat(BRAND.locale, {
    style: "currency",
    currency: BRAND.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Parses price from DB (stored as numeric string or number)
export function parsePrice(value: string | number | null | undefined): number {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  return parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
}

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

// ── Genders ──────────────────────────────────────────────────────────────────
export const GENDERS = ["Men", "Women", "Unisex"] as const;
export type Gender = (typeof GENDERS)[number];
