import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { BRAND } from "@/lib/config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.domain),
  title: {
    default: `${BRAND.name} | Premium Clothing — South Africa`,
    template: `%s | ${BRAND.name}`,
  },
  description: "Premium clothing crafted for the bold. Men's and women's fashion — hoodies, tees, jackets, dresses and more. Free delivery across South Africa.",
  keywords: "premium clothing South Africa, streetwear, hoodies, t-shirts, jackets, dresses, Bevans Sons",
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: "Premium clothing crafted for the bold. Shop men's and women's fashion with free delivery across South Africa.",
    url: BRAND.domain,
    siteName: BRAND.name,
    locale: "en_ZA",
    type: "website",
    images: [{ url: "/logo.jpg", width: 512, height: 512, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Premium Clothing`,
    description: "Premium clothing crafted for the bold. Shop men's and women's fashion.",
    images: ["/logo.jpg"],
  },
  alternates: {
    canonical: BRAND.domain,
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: BRAND.name,
  url: BRAND.domain,
  logo: `${BRAND.domain}/logo.jpg`,
  description: BRAND.tagline,
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    areaServed: "ZA",
    availableLanguage: "English",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === "development" && (
          <Script src="http://localhost:7891/vibe-client.js" data-project="C:/Users/money/daisy-co" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
