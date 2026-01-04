'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'

export default function CTA() {
  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.showPopupWidget('https://calendly.com/nico-carpantier-consulting/30min')
    }
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-background to-background z-0" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ihr nächster qualifizierter Kunde ist nur ein{' '}
              <span className="text-primary">Gespräch</span> entfernt.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              In 15 Minuten analysieren wir Ihr Potenzial und zeigen Ihnen, wie
              der Akquise-Prozess Ihren Kalender füllt.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center gap-6">
              <Button
                size="lg"
                onClick={openCalendly}
                className="text-lg md:text-xl px-8 md:px-10 py-6 md:py-8"
              >
                Kostenloses Strategiegespräch buchen
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </Button>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" /> Unverbindlich
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" /> 100% Kostenlos
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" /> Direkter
                  Experte
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
