'use client'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/27724816274?text=Hi%20Bevans%20Sons%2C%20I%20have%20an%20enquiry."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:bg-[#22c35e] transition-colors"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  )
}
