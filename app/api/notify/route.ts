import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// Simple in-memory rate limiter: max 1 notification per 60 seconds
let lastNotification = 0
const COOLDOWN_MS = 60_000

export async function POST(req: NextRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return NextResponse.json({ ok: false, error: "Telegram not configured" }, { status: 500 })
  }

  const now = Date.now()
  if (now - lastNotification < COOLDOWN_MS) {
    return NextResponse.json({ ok: true, throttled: true })
  }
  lastNotification = now

  try {
    const body = await req.json().catch(() => ({}))
    const referrer = body.referrer || "direct"
    const ua = req.headers.get("user-agent") || "unknown"
    const isMobile = /mobile|android|iphone/i.test(ua)
    const device = isMobile ? "📱 Mobile" : "💻 Desktop"
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })

    const message =
      `🔔 *New visitor on Glean for Teachers*\n\n` +
      `${device}\n` +
      `🔗 Referrer: ${referrer}\n` +
      `🕐 ${timestamp} PT`

    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    )

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 })
  }
}
