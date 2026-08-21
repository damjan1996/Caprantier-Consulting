import { NextRequest, NextResponse } from 'next/server'
import { CONTACT_CONSENT_TEXT, contactRequestSchema } from '@/lib/contact'
import { notifyContactRequest } from '@/lib/notifications'
import { clientKey, isRateLimited } from '@/lib/rate-limit'

/**
 * Nimmt Anfragen aus dem Kontaktformular entgegen.
 *
 * Die Angaben werden ausschließlich per E-Mail an uns weitergeleitet und nicht
 * in der Datenbank abgelegt: für die Bearbeitung einer Anfrage ist keine
 * zusätzliche Speicherung erforderlich (Art. 5 Abs. 1 lit. c DSGVO).
 * Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)
 * bzw. Art. 6 Abs. 1 lit. a DSGVO über die Einwilligung im Formular.
 *
 * Geprüft wird mit `contactRequestSchema` — demselben Schema, an dem sich das
 * Formular orientiert. Ein zweites Schema an dieser Stelle würde mit der Zeit
 * abweichen und die Server-Prüfung stillschweigend lockern.
 */

const RATE_LIMIT_REQUESTS = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60_000

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request), RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
      { status: 429 }
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  // Schlägt auch an, wenn das unsichtbare Honeypot-Feld ausgefüllt wurde.
  const parsed = contactRequestSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Bitte prüfen Sie Ihre Eingaben.' }, { status: 400 })
  }

  const { name, email, company, phone, message } = parsed.data

  const delivered = await notifyContactRequest({
    name,
    email,
    company,
    phone: phone ?? '',
    message,
    // Nachweis der Einwilligung nach Art. 7 Abs. 1 DSGVO: Wortlaut und
    // Zeitpunkt gehören in die Weiterleitung, sonst existiert der Nachweis
    // nirgends — gespeichert wird die Anfrage ja bewusst nicht.
    consent: {
      text: CONTACT_CONSENT_TEXT,
      grantedAt: new Date().toISOString(),
    },
  })

  if (!delivered) {
    return NextResponse.json(
      { error: 'Die Nachricht konnte nicht zugestellt werden.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ sent: true })
}
