// ── Bevans Sons — Clothing Categories ────────────────────────────────────────

export const MEN_CATEGORIES = [
  "Men's T-Shirts",
  "Men's Hoodies",
  "Men's Shirts",
  "Men's Jackets",
  "Men's Pants",
  "Men's Shorts",
] as const;

export const WOMEN_CATEGORIES = [
  "Women's Tops",
  "Women's Dresses",
  "Women's Hoodies",
  "Women's Jackets",
  "Women's Pants",
  "Women's Shorts",
] as const;

export const UNISEX_CATEGORIES = [
  "Unisex T-Shirts",
  "Unisex Hoodies",
  "Streetwear",
] as const;

export const ACCESSORIES_CATEGORIES = [
  "Caps",
  "Bags",
  "Sneakers",
  "Accessories",
] as const;

export const CATEGORIES = [
  ...MEN_CATEGORIES,
  ...WOMEN_CATEGORIES,
  ...UNISEX_CATEGORIES,
  ...ACCESSORIES_CATEGORIES,
] as const;

export type Category = (typeof CATEGORIES)[number];

export function getCategoryGender(cat: string): "Men" | "Women" | "Unisex" | null {
  if ((MEN_CATEGORIES as readonly string[]).includes(cat)) return "Men";
  if ((WOMEN_CATEGORIES as readonly string[]).includes(cat)) return "Women";
  if ((UNISEX_CATEGORIES as readonly string[]).includes(cat)) return "Unisex";
  return null;
}

export function getCategoriesByGender(gender: "Men" | "Women" | "Unisex" | "All"): string[] {
  if (gender === "Men") return [...MEN_CATEGORIES];
  if (gender === "Women") return [...WOMEN_CATEGORIES];
  if (gender === "Unisex") return [...UNISEX_CATEGORIES];
  return [...CATEGORIES];
}

// ── Backward-compatibility shims ──────────────────────────────────────────────
// All categories are now clothing. Device categories no longer exist.
export const CLOTHING_CATEGORIES = CATEGORIES;
export const DEVICE_CATEGORIES: readonly string[] = [] as const;

export function isClothingCategory(cat: string): boolean {
  return (CATEGORIES as readonly string[]).includes(cat);
}

export function isDeviceCategory(_cat: string): boolean {
  return false;
}
