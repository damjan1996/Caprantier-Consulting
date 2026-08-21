'use client'

import { createContext, useContext, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useCookieConsent, CookieConsent } from '@/hooks/useCookieConsent'

// Dynamic import for CookieBanner - non-critical, load after hydration
const CookieBanner = dynamic(() => import('@/components/ui/CookieBanner'), {
  ssr: false,
})

type CookieConsentContextType = {
  consent: CookieConsent | null
  showBanner: boolean
  acceptAll: () => void
  acceptNecessary: () => void
  updateConsent: (consent: Partial<CookieConsent>) => void
  resetConsent: () => void
  setShowBanner: (show: boolean) => void
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

/**
 * Zugriff auf den geteilten Einwilligungs-Zustand.
 *
 * Jede Komponente MUSS diesen Hook statt `useCookieConsent()` verwenden:
 * `useCookieConsent()` legt bei jedem Aufruf einen eigenen State an, sodass
 * z. B. der Footer-Button das Banner nicht öffnen könnte und ein Widerruf der
 * Einwilligung faktisch unmöglich wäre (Art. 7 Abs. 3 DSGVO).
 */
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
