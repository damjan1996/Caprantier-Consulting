import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * Signierte Kennung einer Chat-Sitzung.
 *
 * Der Browser schickt die Sitzungskennung bei jeder Nachricht zurück. Ohne
 * Signatur könnte jemand eine fremde Kennung angeben und damit den Verlauf
 * einer anderen Person fortsetzen — deren letzte Nachrichten gelangen dann als
 * Kontext ins Sprachmodell und in die eigene Antwort. cuid-Kennungen enthalten
 * Zeitstempel und Zähler und taugen deshalb nicht als Geheimnis
 * (Art. 32 Abs. 1 lit. b DSGVO — Vertraulichkeit).
 */

const SEPARATOR = '.'

const configuredSecret = process.env.CHAT_SESSION_SECRET

let fallbackSecret: string | null = null

/**
 * Ohne gesetztes `CHAT_SESSION_SECRET` gilt ein Zufallsschlüssel je
 * Serverprozess: laufende Sitzungen brechen dann bei einem Neustart ab und
 * beginnen neu — sicher, aber für den Betrieb nicht gedacht.
 */
function getSecret(): string {
  if (configuredSecret) return configuredSecret

  if (!fallbackSecret) {
    fallbackSecret = randomBytes(32).toString('hex')
    console.warn(
      'CHAT_SESSION_SECRET ist nicht gesetzt — Chat-Sitzungen überdauern keinen Neustart.'
    )
  }

  return fallbackSecret
}

function sign(sessionId: string): string {
  return createHmac('sha256', getSecret()).update(sessionId).digest('hex')
}

function isEqual(expected: string, received: string): boolean {
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(received, 'utf8')
  return a.length === b.length && timingSafeEqual(a, b)
}

export function createSessionToken(sessionId: string): string {
  return `${sessionId}${SEPARATOR}${sign(sessionId)}`
}

/** Gibt die Sitzungskennung zurück — oder `null`, wenn die Signatur nicht passt. */
export function readSessionToken(token: unknown): string | null {
  if (typeof token !== 'string') return null

  const separatorIndex = token.lastIndexOf(SEPARATOR)
  if (separatorIndex <= 0) return null

  const sessionId = token.slice(0, separatorIndex)
  const signature = token.slice(separatorIndex + 1)

  return isEqual(sign(sessionId), signature) ? sessionId : null
}
