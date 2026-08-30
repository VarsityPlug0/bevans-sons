import type { Metadata } from 'next'
import { Bebas_Neue, Montserrat } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { ChatWidget } from '@/components/support/ChatWidget'
import { WhatsAppButton } from '@/components/support/WhatsAppButton'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Bevans Sons', template: '%s | Bevans Sons' },
  description: 'Premium sneakers delivered to your door across South Africa. Bevans Sons — Reg. 2023/116995/07.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${montserrat.variable} bg-white text-brand-black min-h-screen flex flex-col font-sans`}>
        <QueryProvider>
          <div className="bg-brand-black text-white text-[11px] font-medium tracking-[0.15em] text-center py-2.5 uppercase">
            Free Delivery on Orders Over R999
          </div>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ChatWidget />
        </QueryProvider>
      </body>
    </html>
  )
}
