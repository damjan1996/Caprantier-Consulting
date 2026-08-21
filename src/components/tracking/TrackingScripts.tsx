'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

type CookieConsent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'

// Environment variables for tracking IDs
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const BREVO_CLIENT_KEY = process.env.NEXT_PUBLIC_BREVO_CLIENT_KEY

export default function TrackingScripts() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [consentInitialized, setConsentInitialized] = useState(false)

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

  // Consent Mode aktuell halten - auch beim Widerruf, damit ein bereits
  // geladenes gtag.js sofort aufhoert zu speichern.
  // Den ersten Pageview sendet gtag('config', ...) nach dem Laden selbst.
  useEffect(() => {
    if (typeof window === 'undefined' || !consentInitialized) return

    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag
    if (!gtag) return

    const marketingGranted = consent?.marketing ? 'granted' : 'denied'

    gtag('consent', 'update', {
      'analytics_storage': consent?.analytics ? 'granted' : 'denied',
      'ad_storage': marketingGranted,
      'ad_user_data': marketingGranted,
      'ad_personalization': marketingGranted,
    })
  }, [consent, consentInitialized])

  return (
    <>
      {/* Google Analytics - gtag.js wird erst nach Analyse-Einwilligung geladen.
          Vorher geht kein Request an googletagmanager.com raus (§ 25 Abs. 1 TDDDG). */}
      {consent?.analytics && GA_MEASUREMENT_ID && (
        <>
          <Script
            id="ga-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  anonymize_ip: true,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
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
