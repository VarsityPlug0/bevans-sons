import { getDb } from "./db";

export interface SiteImage {
  key: string;
  url: string;
  label: string;
  section: string;
}

// All editable site images with their defaults
export const SITE_IMAGE_DEFAULTS: SiteImage[] = [
  // Homepage
  { key: "home.hero",           url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=90&auto=format&fit=crop",  label: "Hero Image",                    section: "Homepage" },
  { key: "home.wizard_bg",      url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80&auto=format&fit=crop", label: "Solar Wizard Section Background", section: "Homepage" },
  { key: "home.cta_bg",         url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=85&auto=format&fit=crop", label: "Final CTA Background",           section: "Homepage" },
  { key: "home.feat_solar_ess", url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=85&auto=format&fit=crop",  label: "Featured: Essential Home Solar", section: "Homepage" },
  { key: "home.feat_solar_pre", url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&q=85&auto=format&fit=crop",  label: "Featured: Premium Home Solar",   section: "Homepage" },
  { key: "home.feat_tv",        url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=700&q=85&auto=format&fit=crop",  label: "Featured: Smart TV",             section: "Homepage" },
  { key: "home.feat_ps5",       url: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=700&q=85&auto=format&fit=crop",  label: "Featured: PlayStation 5",        section: "Homepage" },

  // Solar main page
  { key: "solar.pkg_essential", url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop&q=85", label: "Package: Essential Home",    section: "Solar" },
  { key: "solar.pkg_premium",   url: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=500&fit=crop&q=85", label: "Package: Premium Home",      section: "Solar" },
  { key: "solar.pkg_business",  url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=500&fit=crop&q=85", label: "Package: Business Pro",      section: "Solar" },

  // Solar Residential
  { key: "solar.res_1",         url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop&q=85", label: "Residential: Essential",    section: "Solar Residential" },
  { key: "solar.res_2",         url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=500&fit=crop&q=85", label: "Residential: Premium",      section: "Solar Residential" },
  { key: "solar.res_3",         url: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=500&fit=crop&q=85", label: "Residential: Business Pro", section: "Solar Residential" },

  // Solar Commercial
  { key: "solar.com_hero",      url: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1600&q=80&auto=format&fit=crop", label: "Commercial Hero",       section: "Solar Commercial" },
  { key: "solar.com_1",         url: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=500&fit=crop&q=85",        label: "Commercial: Package 1", section: "Solar Commercial" },
  { key: "solar.com_2",         url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&q=85",           label: "Commercial: Package 2", section: "Solar Commercial" },
  { key: "solar.com_3",         url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=500&fit=crop&q=85",        label: "Commercial: Package 3", section: "Solar Commercial" },
  { key: "solar.com_4",         url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop&q=85",        label: "Commercial: Package 4", section: "Solar Commercial" },

  // Solar Inverters & Batteries
  { key: "solar.inv_1",         url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&h=480&fit=crop&q=85", label: "Inverter: Hybrid 5kW",         section: "Inverters & Batteries" },
  { key: "solar.inv_2",         url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=700&h=480&fit=crop&q=85", label: "Inverter: Hybrid 8kW",         section: "Inverters & Batteries" },
  { key: "solar.inv_3",         url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700&h=480&fit=crop&q=85", label: "Inverter: Off-Grid 10kW",      section: "Inverters & Batteries" },
  { key: "solar.bat_1",         url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&h=480&fit=crop&q=85",   label: "Battery: Lithium 100Ah",       section: "Inverters & Batteries" },
  { key: "solar.bat_2",         url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=700&h=480&fit=crop&q=85", label: "Battery: Lithium 200Ah",       section: "Inverters & Batteries" },
  { key: "solar.bat_3",         url: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=700&h=480&fit=crop&q=85",   label: "Battery: Lithium Wall Mount", section: "Inverters & Batteries" },

  // Electronics — TVs
  { key: "elec.tv_1",           url: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&h=340&fit=crop&q=85", label: 'TV: 43" 4K Smart TV',         section: "Electronics" },
  { key: "elec.tv_2",           url: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf754?w=500&h=340&fit=crop&q=85", label: 'TV: 55" QLED Smart TV',        section: "Electronics" },
  { key: "elec.tv_3",           url: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&h=340&fit=crop&q=85", label: 'TV: 65" 4K Android TV',        section: "Electronics" },
  { key: "elec.tv_4",           url: "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=500&h=340&fit=crop&q=85", label: 'TV: 75" Premium 4K TV',        section: "Electronics" },
  // Electronics — Gaming
  { key: "elec.game_1",         url: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=500&h=340&fit=crop&q=85", label: "Gaming: PlayStation 5",        section: "Electronics" },
  { key: "elec.game_2",         url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&h=340&fit=crop&q=85", label: "Gaming: Xbox Series X",        section: "Electronics" },
  { key: "elec.game_3",         url: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=500&h=340&fit=crop&q=85", label: "Gaming: Controllers",          section: "Electronics" },
  { key: "elec.game_4",         url: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=340&fit=crop&q=85", label: "Gaming: Headsets",             section: "Electronics" },
  // Electronics — Home & Office
  { key: "elec.office_1",       url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=340&fit=crop&q=85", label: "Office: Laptop Computers",     section: "Electronics" },
  { key: "elec.office_2",       url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=340&fit=crop&q=85", label: "Office: Keyboards & Mice",     section: "Electronics" },
  { key: "elec.office_3",       url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=340&fit=crop&q=85", label: "Office: Bluetooth Speakers",   section: "Electronics" },
  { key: "elec.office_4",       url: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=340&fit=crop&q=85", label: "Office: USB Hubs",             section: "Electronics" },
  // Electronics — Accessories
  { key: "elec.acc_1",          url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=340&fit=crop&q=85", label: "Accessories: HDMI Cables",     section: "Electronics" },
  { key: "elec.acc_2",          url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=340&fit=crop&q=85", label: "Accessories: Charging Cables", section: "Electronics" },
  { key: "elec.acc_3",          url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=340&fit=crop&q=85", label: "Accessories: Power Banks",     section: "Electronics" },
  { key: "elec.acc_4",          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=340&fit=crop&q=85",   label: "Accessories: Cable Mgmt",      section: "Electronics" },
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
