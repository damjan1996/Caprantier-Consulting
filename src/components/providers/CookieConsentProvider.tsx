'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useCookieConsent, CookieConsent } from '@/hooks/useCookieConsent'
import CookieBanner from '@/components/ui/CookieBanner'

type CookieConsentContextType = {
  consent: CookieConsent | null
  showBanner: boolean
  acceptAll: () => void
  acceptNecessary: () => void
  updateConsent: (consent: Partial<CookieConsent>) => void
  resetConsent: () => void
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

export function useCookieConsentContext() {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsentContext must be used within CookieConsentProvider')
  }
  return context
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const cookieConsent = useCookieConsent()

  return (
    <CookieConsentContext.Provider value={cookieConsent}>
      {children}
      <CookieBanner />
    </CookieConsentContext.Provider>
  )
}
