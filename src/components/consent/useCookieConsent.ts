'use client'

import { useState, useEffect, useCallback } from 'react'

export type CookieConsent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'
// Version der Einwilligung. Erhoehen, sobald eine Kategorie einen zusaetzlichen
// Dienst bekommt — dann muss neu eingewilligt werden. Beim Wegfall eines
// Dienstes bleibt die Version stehen: eine bestehende Einwilligung deckt den
// kleineren Umfang weiterhin ab.
const COOKIE_CONSENT_VERSION = '2'

const defaultConsent: CookieConsent = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  // Die gespeicherte Einwilligung liegt in localStorage und ist auf dem
  // Server nicht lesbar. Der Banner startet deshalb bewusst im Zustand
  // "unbekannt" und wird erst im Browser aufgelöst — andernfalls würde die
  // erste Ausgabe entweder den Banner fälschlich zeigen oder fälschlich
  // unterdrücken.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.version === COOKIE_CONSENT_VERSION) {
          setConsent(parsed.consent)
          setShowBanner(false)
        } else {
          // Version mismatch, show banner again
          setShowBanner(true)
        }
      } catch {
        setShowBanner(true)
      }
    } else {
      setShowBanner(true)
    }
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    const data = {
      version: COOKIE_CONSENT_VERSION,
      consent: newConsent,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data))
    setConsent(newConsent)
    setShowBanner(false)

    // Dispatch custom event to notify tracking scripts
    window.dispatchEvent(new CustomEvent('cookie-consent-update'))
  }, [])

  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    })
  }, [saveConsent])

  const acceptNecessary = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    })
  }, [saveConsent])

  const updateConsent = useCallback((newConsent: Partial<CookieConsent>) => {
    saveConsent({
      ...defaultConsent,
      ...consent,
      ...newConsent,
      necessary: true, // Always keep necessary
    })
  }, [consent, saveConsent])

  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    setConsent(null)
    setShowBanner(true)
  }, [])

  return {
    consent,
    showBanner,
    acceptAll,
    acceptNecessary,
    updateConsent,
    resetConsent,
    setShowBanner,
  }
}
