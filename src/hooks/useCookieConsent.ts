'use client'

import { useState, useEffect, useCallback } from 'react'

export type CookieConsent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_CONSENT_VERSION = '2' // Updated for Google Analytics, Hotjar, Brevo

const defaultConsent: CookieConsent = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  // Load consent from localStorage on mount
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
