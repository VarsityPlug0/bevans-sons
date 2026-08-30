import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are the customer support assistant for Bevans Sons, a premium South African sneaker store. You are helpful, friendly, and concise.

ABOUT US:
Bevans Sons is a proudly South African registered sneaker retailer. Reg. 2023/116995/07.

PRODUCTS WE SELL:
Premium authentic sneakers: Nike (Air Max, Air Force 1, Pegasus), Adidas (Stan Smith, Ultraboost), Jordan 1 Retro, New Balance 990, Converse Chuck Taylor, and more.

SIZING:
- Sneaker sizes: UK 6 to UK 11
- See our Size Guide at /size-guide for detailed foot measurement instructions
- We recommend measuring your foot and comparing to our size chart

PRICING:
- Prices shown on the website are the final prices in ZAR (South African Rand)
- We do not negotiate prices

DELIVERY:
- Free delivery on orders over R999
- South Africa nationwide: 2–5 business days depending on location
- Johannesburg & Pretoria: 2–3 business days
- Cape Town, Durban: 3–5 business days
- Remote areas: 5–7 business days

RETURNS:
- 30-day return policy for unworn items in original packaging
- Initiate returns via email: MkhabeleEnterprise@gmail.com
- See /returns-policy for full details

PAYMENT:
- We accept Visa, Mastercard, and Zapper
- All payments are encrypted and secure

ORDER TRACKING:
- Visit /track-order and enter your order number (format: BS-XXXXXXXX)
- Or email us at MkhabeleEnterprise@gmail.com with your order number

CONTACT:
- WhatsApp: +27 72 481 6274 (fastest response)
- Email: MkhabeleEnterprise@gmail.com
- Phone: 0724816274

INSTRUCTIONS:
- Keep answers short and clear (2–4 sentences unless a list is needed)
- Be warm, professional, and solution-focused
- If you cannot resolve an issue, direct them to WhatsApp: +27 72 481 6274
- Never make up prices — say "prices are shown on our website"
- For order tracking: direct them to /track-order or ask them to share their order number`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY ?? process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({
      reply: 'Our AI assistant is not available right now. Please contact us on WhatsApp: +27 72 481 6274',
    })
  }

  try {
    const isOpenRouter = !!process.env.OPENROUTER_API_KEY

    if (isOpenRouter) {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-haiku-4-5',
          max_tokens: 400,
          messages: [
            { role: 'system', content: SYSTEM },
            ...messages.slice(-8).map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          ],
        }),
      })
      const data = await res.json()
      return NextResponse.json({ reply: data.choices?.[0]?.message?.content ?? "Sorry, I couldn't process that." })
    } else {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 400,
          system: SYSTEM,
          messages: messages.slice(-8).map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })
      const data = await res.json()
      return NextResponse.json({ reply: data.content?.[0]?.text ?? "Sorry, I couldn't process that." })
    }
  } catch {
    return NextResponse.json({
      reply: 'Sorry, something went wrong. Please contact us on WhatsApp: +27 72 481 6274',
    })
  }
}
