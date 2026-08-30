import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/components/providers/QueryProvider'

export const metadata: Metadata = {
  title: 'Store Admin — Business Control Center',
  description: 'Internal business management system',
  robots: 'noindex, nofollow', // Admin must never be indexed by search engines
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
