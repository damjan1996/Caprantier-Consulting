'use client'

import Script from 'next/script'
import { useEffect, useState, useRef } from 'react'

type CookieConsent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'

// Environment variables for tracking IDs
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const CONTENTSQUARE_ID = process.env.NEXT_PUBLIC_CONTENTSQUARE_ID
const BREVO_CLIENT_KEY = process.env.NEXT_PUBLIC_BREVO_CLIENT_KEY

export default function TrackingScripts() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [consentInitialized, setConsentInitialized] = useState(false)
  const prevAnalyticsConsent = useRef<boolean | null>(null)

  useEffect(() => {
    // Initial load
    const loadConsent = () => {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setConsent(parsed.consent)
        } catch {
          setConsent(null)
        }
      }
      setConsentInitialized(true)
    }

    loadConsent()

    // Listen for storage changes (when user updates consent)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY) {
        loadConsent()
      }
    }

    // Listen for custom consent update event
    const handleConsentUpdate = () => {
      loadConsent()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cookie-consent-update', handleConsentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cookie-consent-update', handleConsentUpdate)
    }
  }, [])

  // Update Google Consent Mode when consent changes & send pageview after opt-in
  useEffect(() => {
    if (typeof window !== 'undefined' && consentInitialized) {
      const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag
      if (gtag) {
        const analyticsGranted = consent?.analytics ? 'granted' : 'denied'
        const marketingGranted = consent?.marketing ? 'granted' : 'denied'

        gtag('consent', 'update', {
          'analytics_storage': analyticsGranted,
          'ad_storage': marketingGranted,
          'ad_user_data': marketingGranted,
          'ad_personalization': marketingGranted,
        })

        // Pageview nur senden wenn Consent sich gerade von denied->granted geändert hat
        // (nicht bei Seiten-Load mit bereits gespeichertem Consent - dort sendet gtag config den Pageview)
        const wasGranted = prevAnalyticsConsent.current
        const isNowGranted = consent?.analytics ?? false
        prevAnalyticsConsent.current = isNowGranted

        if (!wasGranted && isNowGranted && GA_MEASUREMENT_ID) {
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
          })
        }
      }
    }
  }, [consent, consentInitialized])

  return (
    <>
      {/* Hotjar / Contentsquare - nur bei Analytics-Einwilligung */}
      {consent?.analytics && CONTENTSQUARE_ID && (
        <Script
          src={`https://t.contentsquare.net/uxa/${CONTENTSQUARE_ID}.js`}
          strategy="lazyOnload"
        />
      )}

      {/* Brevo (Sendinblue) - nur bei Marketing-Einwilligung */}
      {consent?.marketing && BREVO_CLIENT_KEY && (
        <Script
          id="brevo-tracking"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.sib = {
                  equeue: [],
                  client_key: "${BREVO_CLIENT_KEY}"
                };
                window.sib.email_id = function() {
                  return arguments[0] ? window.sib.equeue.push(arguments[0]) : false;
                };
                var script = document.createElement("script");
                script.async = true;
                script.src = "https://sibautomation.com/sa.js?key=" + window.sib.client_key;
                document.body.appendChild(script);
              })();
            `,
          }}
        />
      )}
    </>
  )
}
