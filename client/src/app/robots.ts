import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bevanssons.store'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account/', '/checkout', '/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
