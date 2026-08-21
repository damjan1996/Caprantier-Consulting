import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Löscht abgelaufene Chatverläufe.
 *
 * Art. 5 Abs. 1 lit. e DSGVO verlangt, dass personenbezogene Daten nur so lange
 * gespeichert werden, wie es für den Zweck erforderlich ist. Ohne diesen Job
 * blieben Chatnachrichten und darin genannte E-Mail-Adressen unbegrenzt liegen.
 *
 * Die Fristen entsprechen den in der Datenschutzerklärung genannten Angaben —
 * beide müssen gemeinsam geändert werden.
 */

/** Chats ohne hinterlassene Kontaktdaten: reine Serviceanfragen. */
const RETENTION_DAYS_ANONYMOUS = 90

/** Chats mit Kontaktdaten: Anbahnung eines Geschäftskontakts. */
const RETENTION_DAYS_WITH_CONTACT = 365

const DAY_IN_MS = 24 * 60 * 60 * 1000

function cutoff(days: number, now: number): Date {
  return new Date(now - days * DAY_IN_MS)
}

export async function GET(request: NextRequest) {
  // Vercel Cron signiert seine Aufrufe mit CRON_SECRET. Ohne gesetztes Secret
  // bleibt der Endpunkt geschlossen, damit er nicht öffentlich auslösbar ist.
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.error('CRON_SECRET ist nicht gesetzt — Chat-Cleanup ist deaktiviert.')
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = Date.now()

    // ChatMessage hängt per onDelete: Cascade an ChatSession — Nachrichten
    // verschwinden mit der Sitzung.
    const { count } = await prisma.chatSession.deleteMany({
      where: {
        OR: [
          { visitorEmail: null, createdAt: { lt: cutoff(RETENTION_DAYS_ANONYMOUS, now) } },
          { visitorEmail: { not: null }, createdAt: { lt: cutoff(RETENTION_DAYS_WITH_CONTACT, now) } },
        ],
      },
    })

    console.log(`Chat-Cleanup: ${count} Sitzungen gelöscht.`)
    return NextResponse.json({ deletedSessions: count })
  } catch (error) {
    console.error('Chat-Cleanup fehlgeschlagen:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
