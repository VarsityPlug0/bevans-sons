import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bevanssons.store'

  const staticPages = [
    { path: '/', priority: 1.0, freq: 'daily' as const },
    { path: '/products', priority: 0.9, freq: 'daily' as const },
    { path: '/about', priority: 0.8, freq: 'monthly' as const },
    { path: '/contact', priority: 0.8, freq: 'monthly' as const },
    { path: '/faq', priority: 0.7, freq: 'monthly' as const },
    { path: '/size-guide', priority: 0.7, freq: 'monthly' as const },
    { path: '/track-order', priority: 0.6, freq: 'weekly' as const },
    { path: '/shipping', priority: 0.6, freq: 'monthly' as const },
    { path: '/returns-policy', priority: 0.6, freq: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.4, freq: 'yearly' as const },
    { path: '/terms', priority: 0.4, freq: 'yearly' as const },
    { path: '/categories/running', priority: 0.8, freq: 'weekly' as const },
    { path: '/categories/lifestyle', priority: 0.8, freq: 'weekly' as const },
    { path: '/categories/basketball', priority: 0.8, freq: 'weekly' as const },
    { path: '/categories/men', priority: 0.8, freq: 'weekly' as const },
    { path: '/categories/women', priority: 0.8, freq: 'weekly' as const },
  ]

  return staticPages.map(({ path, priority, freq }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }))
}
