import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import { CartProvider } from "@/components/CartContext";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="pt-[116px] pb-[64px] md:pb-0">{children}</main>
      <Footer />
      <AIAssistant />
    </CartProvider>
  );
}
