'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import CalendlyConsentCard from '@/components/ui/CalendlyConsentCard'

/**
 * Calendly wird in zwei Schritten geladen.
 *
 * Ein Klick auf einen Buchungs-Button öffnet zunächst nur eine Zwischenkarte,
 * die den Drittlandtransfer erklärt. Erst der zweite Klick lädt das Paket
 * react-calendly nach und öffnet das Buchungsfenster. Ohne diesen Zwischenschritt
 * ginge die IP-Adresse des Besuchers ungefragt an einen Anbieter in den USA.
 */

// Das Paket wird bewusst erst nach der Zustimmung geholt: Ein statischer Import
// würde react-calendly in jedes Seiten-Bundle ziehen, obwohl die meisten
// Besucher nie buchen.
const CalendlyBookingModal = dynamic(() => import('@/components/ui/CalendlyBookingModal'), {
  ssr: false,
})

type Stage = 'closed' | 'notice' | 'booking'

interface CalendlyContextType {
  openCalendly: () => void
  closeCalendly: () => void
  onHover: () => void
  isOpen: boolean
}

const CalendlyContext = createContext<CalendlyContextType | null>(null)

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>('closed')
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRootElement(document.getElementById('__next') || document.body)
  }, [])

  const openCalendly = useCallback(() => setStage('notice'), [])
  const closeCalendly = useCallback(() => setStage('closed'), [])
  const acceptCalendly = useCallback(() => setStage('booking'), [])

  // Bewusst ein No-op: Vorladen von Calendly beim Hover würde die IP-Adresse
  // des Besuchers ohne Einwilligung in die USA übertragen.
  const onHover = useCallback(() => {}, [])

  return (
    <CalendlyContext.Provider
      value={{ openCalendly, closeCalendly, onHover, isOpen: stage !== 'closed' }}
    >
      {children}

      {stage === 'notice' && (
        <CalendlyConsentCard onAccept={acceptCalendly} onDismiss={closeCalendly} />
      )}

      {stage === 'booking' && rootElement && (
        <CalendlyBookingModal onClose={closeCalendly} rootElement={rootElement} />
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
