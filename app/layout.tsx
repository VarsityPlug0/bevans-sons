import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIAssistant from "@/components/AIAssistant";
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
  title: "Daisy Gadgets Co. | Premium Gadgets — Worldwide Shipping",
  description: "Premium gadgets for everyday convenience. iPhones, Smart TVs, Gaming, Laptops, MacBooks, Home Appliances, Solar & more. Free worldwide delivery. Same-day delivery in South Africa.",
  keywords: "gadgets South Africa, iPhones, smart TVs, gaming consoles, PS5, Xbox, laptops, MacBook, solar panels, home appliances, daisy gadgets",
  openGraph: {
    title: "Daisy Gadgets Co. | Premium Gadgets For Everyday Convenience",
    description: "Premium gadgets for everyday convenience. Worldwide shipping available. Free delivery in South Africa.",
    url: "https://daisygadgetsco.co.za",
    siteName: "Daisy Gadgets Co.",
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
          <main className="pt-[116px] pb-[64px] md:pb-0">{children}</main>
          <Footer />
          <WhatsAppButton />
          <AIAssistant />
          {process.env.NODE_ENV === "development" && (
            <Script src="http://localhost:7891/vibe-client.js" data-project="C:/Users/money/daisy-co" strategy="afterInteractive" />
          )}
        </CartProvider>
      </body>
    </html>
  );
}
