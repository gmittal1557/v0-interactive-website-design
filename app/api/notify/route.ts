import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// Simple in-memory rate limiter: max 1 notification per 5 seconds (prevents double-fires only)
let lastNotification = 0
const COOLDOWN_MS = 5_000

export async function POST(req: NextRequest) {
  console.log("[notify] called, BOT_TOKEN exists:", !!TELEGRAM_BOT_TOKEN, "CHAT_ID exists:", !!TELEGRAM_CHAT_ID)

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log("[notify] Telegram not configured")
    return NextResponse.json({ ok: false, error: "Telegram not configured" }, { status: 500 })
  }

  const now = Date.now()
  if (now - lastNotification < COOLDOWN_MS) {
    console.log("[notify] throttled")
    return NextResponse.json({ ok: true, throttled: true })
  }
  lastNotification = now

  try {
    const body = await req.json().catch(() => ({}))
    const referrer = body.referrer || "direct"
    const ua = req.headers.get("user-agent") || "unknown"
    const isMobile = /mobile|android|iphone/i.test(ua)
    const device = isMobile ? "Mobile" : "Desktop"
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })

    const message = `New visitor on Glean for Teachers\n\nDevice: ${device}\nReferrer: ${referrer}\nTime: ${timestamp} ET`

    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    )

    const tgData = await tgRes.json()
    console.log("[notify] Telegram response:", JSON.stringify(tgData))

    return NextResponse.json({ ok: tgData.ok, telegramResponse: tgData })
  } catch (err) {
    console.error("[notify] error:", err)
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 })
  }
}
