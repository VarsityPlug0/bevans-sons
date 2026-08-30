'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m the Bevans Sons assistant. How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try WhatsApp: +27 72 481 6274' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="w-80 sm:w-96 bg-white border border-brand-mid shadow-2xl flex flex-col overflow-hidden"
          style={{ height: '480px' }}>
          {/* Header */}
          <div className="bg-brand-black text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="font-bebas text-base tracking-[0.1em] uppercase">Bevans Sons Support</p>
              <p className="text-[10px] text-white/50 tracking-wide">Typically replies in minutes</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:opacity-70 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-brand-light">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-brand-black text-white'
                    : 'bg-white text-brand-black border border-brand-mid'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-brand-mid px-3.5 py-2.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-muted" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-brand-mid flex flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 text-xs outline-none bg-white text-brand-black placeholder:text-brand-muted"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-4 bg-brand-black text-white disabled:opacity-40 hover:bg-brand-dark transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 bg-brand-black text-white shadow-xl hover:bg-brand-dark transition-colors flex items-center justify-center"
        aria-label="Open chat"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </div>
  )
}
