import { createHash } from 'node:crypto'

/**
 * Mengenbegrenzung je Absender im Arbeitsspeicher.
 *
 * Hält den Chat-Endpunkt davon ab, als kostenloser Modellzugang oder zum
 * Vollschreiben der Chat-Datenbank missbraucht zu werden
 * (Art. 32 Abs. 1 lit. b DSGVO — Belastbarkeit und Verfügbarkeit).
 *
 * Der Zähler gilt je Serverinstanz. Auf mehreren Instanzen greift die Grenze
 * entsprechend lockerer; für eine harte Grenze braucht es einen gemeinsamen
 * Speicher wie Redis.
 */

type Window = { count: number; resetAt: number }

const windows = new Map<string, Window>()

/** Verhindert, dass abgelaufene Einträge den Speicher unbegrenzt füllen. */
function evictExpired(now: number): void {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key)
  }
}

/**
 * Die IP-Adresse selbst wird nicht gehalten: der Hash genügt zum Zählen und
 * ist kein Klartext-Personenbezug im Speicher (Art. 5 Abs. 1 lit. c DSGVO).
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded || request.headers.get('x-real-ip') || 'unknown'
  return createHash('sha256').update(ip).digest('hex')
}

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()

  if (windows.size > 5000) evictExpired(now)

  const current = windows.get(key)

  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }

  current.count += 1
  return current.count > limit
}
