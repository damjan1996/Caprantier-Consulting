'use client'

import dynamic from 'next/dynamic'

/**
 * Was erst im Browser laufen darf.
 *
 * Bis zum 16.09.2026 stand hier zusätzlich das Chat-Fenster. Der KI-Chat ist
 * entfallen — damit entfallen zugleich die Transparenzpflicht nach
 * Art. 50 Abs. 1 KI-VO, die Übermittlung von Chatnachrichten an einen
 * Auftragsverarbeiter in den USA und die Speicherung von Gesprächsverläufen
 * samt Löschfristen.
 */

// Dynamic imports müssen in Client Components sein für ssr: false
const TrackingScripts = dynamic(
  () => import('@/components/tracking/TrackingScripts'),
  { ssr: false }
)

export function ClientSideComponents() {
  return <TrackingScripts />
}
