'use client'

import Script from 'next/script'
import { useEffect, useState, useCallback } from 'react'

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
  const [shouldLoadGA, setShouldLoadGA] = useState(false)

  // Trigger GA loading - called on user interaction or idle
  const triggerGALoad = useCallback(() => {
    setShouldLoadGA(true)
  }, [])

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

  // Delayed/interaction-based GA loading for better TBT
  useEffect(() => {
    if (shouldLoadGA || !GA_MEASUREMENT_ID) return

    const events = ['scroll', 'click', 'mousemove', 'keypress', 'touchstart']

    const handleInteraction = () => {
      triggerGALoad()
      // Remove all listeners after first interaction
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction, { capture: true })
      })
    }

    // Add interaction listeners
    events.forEach(event => {
      window.addEventListener(event, handleInteraction, { capture: true, passive: true })
    })

    // Fallback: Load after idle or 4 seconds max
    let timeoutId: ReturnType<typeof setTimeout>
    if ('requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => triggerGALoad(),
        { timeout: 4000 }
      )
      return () => {
        events.forEach(event => {
          window.removeEventListener(event, handleInteraction, { capture: true })
        })
        ;(window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId)
      }
    } else {
      // Fallback for browsers without requestIdleCallback
      timeoutId = setTimeout(triggerGALoad, 4000)
      return () => {
        events.forEach(event => {
          window.removeEventListener(event, handleInteraction, { capture: true })
        })
        clearTimeout(timeoutId)
      }
    }
  }, [shouldLoadGA, triggerGALoad])

  // Update Google Consent Mode when consent changes
  useEffect(() => {
    if (typeof window !== 'undefined' && consentInitialized) {
      // Verwende gtag-Funktion für Consent-Updates (type-safe)
      const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag
      if (gtag) {
        gtag('consent', 'update', {
          'analytics_storage': consent?.analytics ? 'granted' : 'denied',
          'ad_storage': consent?.marketing ? 'granted' : 'denied',
          'ad_user_data': consent?.marketing ? 'granted' : 'denied',
          'ad_personalization': consent?.marketing ? 'granted' : 'denied',
        })
      }
    }
  }, [consent, consentInitialized])

  // Don't render if no tracking IDs configured
  if (!GA_MEASUREMENT_ID && !CONTENTSQUARE_ID && !BREVO_CLIENT_KEY) {
    return null
  }

  return (
    <>
      {/* Google Analytics mit Consent Mode v2 - DSGVO-konform & Performance-optimiert */}
      {/* Wird erst bei User-Interaktion oder nach Idle geladen für bessere TBT */}
      {GA_MEASUREMENT_ID && shouldLoadGA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                // dataLayer und gtag wurden bereits im Head initialisiert
                // Consent Default wurde auch bereits im Head gesetzt

                // Prüfe gespeicherten Consent und aktualisiere sofort
                (function() {
                  try {
                    var stored = localStorage.getItem('cookie-consent');
                    if (stored) {
                      var parsed = JSON.parse(stored);
                      if (parsed.consent) {
                        gtag('consent', 'update', {
                          'analytics_storage': parsed.consent.analytics ? 'granted' : 'denied',
                          'ad_storage': parsed.consent.marketing ? 'granted' : 'denied',
                          'ad_user_data': parsed.consent.marketing ? 'granted' : 'denied',
                          'ad_personalization': parsed.consent.marketing ? 'granted' : 'denied'
                        });
                      }
                    }
                  } catch(e) {}
                })();

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
