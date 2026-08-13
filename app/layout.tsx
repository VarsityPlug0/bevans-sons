import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/components/CartContext";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Daisy & Co | Premium Solar & Electronics South Africa",
  description: "Premium residential and commercial solar systems, inverters, lithium batteries, smart TVs and electronics with delivery across South Africa.",
  keywords: "solar panels South Africa, residential solar, commercial solar, inverters, lithium batteries, smart TVs, electronics",
  openGraph: {
    title: "Daisy & Co | Premium Solar & Electronics South Africa",
    description: "Premium residential and commercial solar systems, inverters, lithium batteries, smart TVs and electronics with delivery across South Africa.",
    url: "https://daisyandco.co.za",
    siteName: "Daisy & Co",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main className="pt-[80px] pb-[64px] md:pb-0">{children}</main>
          <Footer />
          <WhatsAppButton />
          {process.env.NODE_ENV === "development" && (
            <Script src="http://localhost:7891/vibe-client.js" data-project="C:/Users/money/daisy-co" strategy="afterInteractive" />
          )}
        </CartProvider>
      </body>
    </html>
  );
}
