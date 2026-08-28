import { getDb } from "./db";

export interface SiteImage {
  key: string;
  url: string;
  label: string;
  section: string;
}

// Fashion-oriented editable site images with placeholder defaults
export const SITE_IMAGE_DEFAULTS: SiteImage[] = [
  // Homepage
  { key: "home.hero",          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&auto=format&fit=crop", label: "Hero Image",               section: "Homepage" },
  { key: "home.hero_2",        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85&auto=format&fit=crop", label: "Hero Image 2",           section: "Homepage" },
  { key: "home.men_banner",    url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=85&auto=format&fit=crop",  label: "Men's Section Banner",    section: "Homepage" },
  { key: "home.women_banner",  url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85&auto=format&fit=crop",  label: "Women's Section Banner",  section: "Homepage" },
  { key: "home.cta_bg",        url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=85&auto=format&fit=crop", label: "CTA Background",          section: "Homepage" },
  { key: "home.editorial_1",   url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85&auto=format&fit=crop",  label: "Editorial Image 1",       section: "Homepage" },
  { key: "home.editorial_2",   url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=85&auto=format&fit=crop",  label: "Editorial Image 2",       section: "Homepage" },
  { key: "home.brand_story",   url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=85&auto=format&fit=crop",  label: "Brand Story Image",       section: "Homepage" },

  // Men's page
  { key: "men.hero",           url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1400&q=85&auto=format&fit=crop", label: "Men's Hero",              section: "Men" },
  { key: "men.tshirts",        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85&auto=format&fit=crop",  label: "Men's T-Shirts",          section: "Men" },
  { key: "men.hoodies",        url: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85&auto=format&fit=crop",     label: "Men's Hoodies",           section: "Men" },
  { key: "men.jackets",        url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=85&auto=format&fit=crop",  label: "Men's Jackets",           section: "Men" },

  // Women's page
  { key: "women.hero",         url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=85&auto=format&fit=crop", label: "Women's Hero",            section: "Women" },
  { key: "women.tops",         url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=85&auto=format&fit=crop",  label: "Women's Tops",            section: "Women" },
  { key: "women.dresses",      url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=85&auto=format&fit=crop",  label: "Women's Dresses",         section: "Women" },
  { key: "women.hoodies",      url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=85&auto=format&fit=crop",     label: "Women's Hoodies",         section: "Women" },

  // Collections
  { key: "col.hero",           url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=85&auto=format&fit=crop", label: "Collections Hero",        section: "Collections" },
  { key: "col.streetwear",     url: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700&q=85&auto=format&fit=crop",  label: "Streetwear Collection",   section: "Collections" },
  { key: "col.essentials",     url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85&auto=format&fit=crop",  label: "Essentials Collection",   section: "Collections" },

  // About
  { key: "about.hero",         url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=85&auto=format&fit=crop", label: "About Hero",              section: "About" },
  { key: "about.studio",       url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop",    label: "Studio / Workshop",       section: "About" },
];

export function seedSiteImages() {
  const db = getDb();
  const insert = db.prepare(`
    INSERT OR IGNORE INTO site_images (key, url, label, section)
    VALUES (@key, @url, @label, @section)
  `);
  db.transaction((rows: SiteImage[]) => {
    for (const row of rows) insert.run(row);
  })(SITE_IMAGE_DEFAULTS);
}

export function getAllSiteImages(): SiteImage[] {
  seedSiteImages();
  return getDb().prepare("SELECT * FROM site_images ORDER BY section, key").all() as SiteImage[];
}

export function getSiteImage(key: string): string {
  seedSiteImages();
  const row = getDb().prepare("SELECT url FROM site_images WHERE key = ?").get(key) as { url: string } | undefined;
  if (row) return row.url;
  return SITE_IMAGE_DEFAULTS.find(d => d.key === key)?.url ?? "";
}

export function getSiteImages(keys: string[]): Record<string, string> {
  seedSiteImages();
  const rows = getDb()
    .prepare(`SELECT key, url FROM site_images WHERE key IN (${keys.map(() => "?").join(",")})`)
    .all(...keys) as { key: string; url: string }[];
  const map: Record<string, string> = {};
  for (const d of SITE_IMAGE_DEFAULTS) map[d.key] = d.url;
  for (const r of rows) map[r.key] = r.url;
  return map;
}

export function upsertSiteImage(key: string, url: string): void {
  getDb().prepare(`
    INSERT INTO site_images (key, url, label, section)
    VALUES (@key, @url, @label, @section)
    ON CONFLICT(key) DO UPDATE SET url = excluded.url
  `).run({
    key,
    url,
    label: SITE_IMAGE_DEFAULTS.find(d => d.key === key)?.label ?? key,
    section: SITE_IMAGE_DEFAULTS.find(d => d.key === key)?.section ?? "Other",
  });
}
