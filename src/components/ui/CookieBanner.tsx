'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Cookie, X, Settings, Check } from 'lucide-react'
import { useCookieConsent, CookieConsent } from '@/hooks/useCookieConsent'
import { Button } from './Button'

export default function CookieBanner() {
  const { showBanner, acceptAll, acceptNecessary, updateConsent, setShowBanner } = useCookieConsent()
  const [showSettings, setShowSettings] = useState(false)
  const [customConsent, setCustomConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  if (!showBanner) return null

  const handleSaveSettings = () => {
    updateConsent(customConsent)
    setShowSettings(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100]" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[101] p-4 md:p-6">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            {!showSettings ? (
              // Main Banner
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Cookie className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Cookie-Einstellungen
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-6">
                      Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
                      Einige Cookies sind notwendig für den Betrieb der Website, während andere uns helfen,
                      die Website zu verbessern und Ihnen personalisierte Inhalte anzubieten.{' '}
                      <Link href="/datenschutz" className="text-primary underline hover:text-primary/80">
                        Mehr erfahren
                      </Link>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={acceptAll} className="flex-1 sm:flex-none">
                        <Check className="h-4 w-4 mr-2" />
                        Alle akzeptieren
                      </Button>
                      <Button variant="secondary" onClick={acceptNecessary} className="flex-1 sm:flex-none">
                        Nur notwendige
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowSettings(true)}
                        className="flex-1 sm:flex-none"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Einstellungen
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Settings Panel
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Settings className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Cookie-Einstellungen anpassen
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="p-4 rounded-xl border border-border bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Notwendige Cookies</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          Dienste: Cookie-Einstellungen, KI-Chatbot, Calendly (Terminbuchung)
                        </p>
                      </div>
                      <div className="shrink-0 ml-4">
                        <div className="w-12 h-6 rounded-full bg-primary flex items-center justify-end px-1 cursor-not-allowed">
                          <div className="w-4 h-4 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 rounded-xl border border-border bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Analyse-Cookies</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen.
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          Dienste: Google Analytics, Hotjar
                        </p>
                      </div>
                      <div className="shrink-0 ml-4">
                        <button
                          onClick={() => setCustomConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
                          className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                            customConsent.analytics ? 'bg-primary justify-end' : 'bg-muted justify-start'
                          }`}
                        >
                          <div className="w-4 h-4 rounded-full bg-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="p-4 rounded-xl border border-border bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Marketing-Cookies</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten.
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          Dienste: Brevo (E-Mail-Marketing)
                        </p>
                      </div>
                      <div className="shrink-0 ml-4">
                        <button
                          onClick={() => setCustomConsent(prev => ({ ...prev, marketing: !prev.marketing }))}
                          className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                            customConsent.marketing ? 'bg-primary justify-end' : 'bg-muted justify-start'
                          }`}
                        >
                          <div className="w-4 h-4 rounded-full bg-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleSaveSettings} className="flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    Auswahl speichern
                  </Button>
                  <Button variant="secondary" onClick={acceptAll} className="flex-1">
                    Alle akzeptieren
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Weitere Informationen finden Sie in unserer{' '}
                  <Link href="/datenschutz" className="text-primary underline hover:text-primary/80">
                    Datenschutzerklärung
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
