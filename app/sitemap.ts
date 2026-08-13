import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const BASE = "https://daisyandco.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                                        lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/solar`,                             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/solar/residential`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/solar/commercial`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/solar/inverters-batteries`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/electronics`,                       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/shop`,                              lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/about`,                             lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,                           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
