'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { trackCalendlyScheduled } from '@/lib/analytics'

// hide_gdpr_banner darf NICHT gesetzt werden: Calendly setzt eigene Cookies und
// muss dafuer selbst einwilligen lassen (§ 25 Abs. 1 TDDDG).
const CALENDLY_URL = 'https://calendly.com/nico-carpantier-consulting/30min'

interface CalendlyContextType {
  openCalendly: () => void
  closeCalendly: () => void
  onHover: () => void
  isOpen: boolean
}

const CalendlyContext = createContext<CalendlyContextType | null>(null)

// Calendly Modal Component - only loaded on client
function CalendlyModal({ isOpen, onClose, rootElement }: {
  isOpen: boolean
  onClose: () => void
  rootElement: HTMLElement
}) {
  const { PopupModal, useCalendlyEventListener } = require('react-calendly')

  useCalendlyEventListener({
    onEventScheduled: (e: { data: { payload: unknown } }) => {
      // Kein Logging des Payloads: er enthaelt Name und E-Mail-Adresse des Buchenden.
      trackCalendlyScheduled()
    },
  })

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

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
    setRootElement(document.getElementById('__next') || document.body)
  }, [])

  const openCalendly = useCallback(() => setIsOpen(true), [])
  const closeCalendly = useCallback(() => setIsOpen(false), [])
  // Bewusst ein No-op: Vorladen von Calendly beim Hover wuerde die IP-Adresse
  // des Besuchers ohne Einwilligung in die USA uebertragen.
  const onHover = useCallback(() => {}, [])

  return (
    <CalendlyContext.Provider value={{ openCalendly, closeCalendly, onHover, isOpen }}>
      {children}
      {mounted && rootElement && (
        <CalendlyModal
          isOpen={isOpen}
          onClose={closeCalendly}
          rootElement={rootElement}
        />
      )}
    </CalendlyContext.Provider>
  )
}

export function useCalendly() {
  const context = useContext(CalendlyContext)
  if (!context) {
    throw new Error('useCalendly must be used within CalendlyProvider')
  }
  return context
}
