'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { PopupModal, useCalendlyEventListener } from 'react-calendly'

const CALENDLY_URL = 'https://calendly.com/nico-carpantier-consulting/30min?hide_gdpr_banner=1'

interface CalendlyContextType {
  openCalendly: () => void
  closeCalendly: () => void
  onHover: () => void
  isOpen: boolean
}

const CalendlyContext = createContext<CalendlyContextType | null>(null)

// Prefetch Calendly resources on hover
let prefetched = false
function prefetchCalendly() {
  if (prefetched || typeof window === 'undefined') return
  prefetched = true

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = CALENDLY_URL
  link.as = 'document'
  document.head.appendChild(link)
}

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRootElement(document.getElementById('__next') || document.body)
  }, [])

  const openCalendly = useCallback(() => setIsOpen(true), [])
  const closeCalendly = useCallback(() => setIsOpen(false), [])
  const onHover = useCallback(() => prefetchCalendly(), [])

  // Event tracking
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log('Calendly: Event scheduled', e.data.payload)
    },
  })

  return (
    <CalendlyContext.Provider value={{ openCalendly, closeCalendly, onHover, isOpen }}>
      {children}
      {rootElement && (
        <PopupModal
          url={CALENDLY_URL}
          onModalClose={closeCalendly}
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
