'use client'

import { PopupModal, useCalendlyEventListener } from 'react-calendly'
import { trackCalendlyScheduled } from '@/lib/analytics'

/**
 * Das eigentliche Buchungsfenster.
 *
 * Eigene Datei, damit der CalendlyProvider sie erst nach der Zustimmung des
 * Besuchers nachladen kann — beim Rendern dieser Komponente geht bereits der
 * erste Request an Calendly.
 */

// hide_gdpr_banner darf NICHT gesetzt werden: Calendly setzt eigene Cookies und
// muss dafür selbst einwilligen lassen (§ 25 Abs. 1 TDDDG).
const CALENDLY_URL = 'https://calendly.com/nico-carpantier-consulting/30min'

type CalendlyBookingModalProps = {
  onClose: () => void
  rootElement: HTMLElement
}

export default function CalendlyBookingModal({ onClose, rootElement }: CalendlyBookingModalProps) {
  useCalendlyEventListener({
    // Kein Logging des Payloads: er enthält Name und E-Mail-Adresse des Buchenden.
    onEventScheduled: () => trackCalendlyScheduled(),
  })

  return (
    <PopupModal
      url={CALENDLY_URL}
      onModalClose={onClose}
      open
      rootElement={rootElement}
      pageSettings={{
        backgroundColor: 'ffffff',
        primaryColor: '3b82f6',
        textColor: '1f2937',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
      }}
    />
  )
}
