import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { BRAND } from "@/lib/config";

export const dynamic = "force-dynamic";

const BASE = BRAND.domain;

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE,                           lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
  { url: `${BASE}/shop`,                 lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
  { url: `${BASE}/men`,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/women`,                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE}/collections`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/new-arrivals`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/size-guide`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/about`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/contact`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/faq`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/delivery`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE}/payment-options`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE}/track-order`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE}/policies/privacy`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  { url: `${BASE}/policies/terms`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  { url: `${BASE}/policies/returns`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  { url: `${BASE}/policies/refund`,      lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getProducts().filter((p) => p.inStock);
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/shop/${p.slug ?? p.id}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: p.featured ? 0.8 : 0.7,
  }));

  return [...STATIC_PAGES, ...productPages];
}
