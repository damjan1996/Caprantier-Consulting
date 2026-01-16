'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

type CookieConsent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'

export default function TrackingScripts() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)

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

  return (
    <>
      {/* Google Analytics - nur bei Analytics-Einwilligung */}
      {consent?.analytics && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-K5EZ67MCY7"
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-K5EZ67MCY7', {
                  anonymize_ip: true
                });
              `,
            }}
          />
        </>
      )}

      {/* Hotjar / Contentsquare - nur bei Analytics-Einwilligung */}
      {consent?.analytics && (
        <Script
          src="https://t.contentsquare.net/uxa/1fd438cca552d.js"
          strategy="lazyOnload"
        />
      )}

      {/* Brevo (Sendinblue) - nur bei Marketing-Einwilligung */}
      {consent?.marketing && (
        <Script
          id="brevo-tracking"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.sib = {
                  equeue: [],
                  client_key: "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"
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
