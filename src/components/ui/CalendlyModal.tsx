'use client'

import { useState, useEffect } from 'react'
import { PopupModal, useCalendlyEventListener } from 'react-calendly'
import { trackCalendlyScheduled } from '@/lib/analytics'

// hide_gdpr_banner darf NICHT gesetzt werden: Calendly setzt eigene Cookies und
// muss dafuer selbst einwilligen lassen (§ 25 Abs. 1 TDDDG).
const CALENDLY_URL = 'https://calendly.com/nico-carpantier-consulting/30min'

interface CalendlyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRootElement(document.getElementById('__next') || document.body)
  }, [])

  // Event listener for analytics
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      // Kein Logging des Payloads: er enthaelt Name und E-Mail-Adresse des Buchenden.
      trackCalendlyScheduled()
    },
  })

  if (!rootElement) return null

  return (
    <PopupModal
      url={CALENDLY_URL}
      onModalClose={onClose}
      open={isOpen}
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

// Hook für einfache Verwendung
export function useCalendlyModal() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { isOpen, open, close }
}
