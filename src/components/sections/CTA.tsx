'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { useCalendly } from '@/hooks/useCalendly'

export default function CTA() {
  const { openCalendly, onHover } = useCalendly()

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/50 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-green-400/40 rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl opacity-50" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              Jetzt starten
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15]">
              Ihr nächster qualifizierter Kunde ist nur ein{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
                Gespräch
              </span>{' '}
              entfernt.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              In 15 Minuten analysieren wir Ihr Potenzial und zeigen Ihnen, wie
              der Akquise-Prozess Ihren Kalender füllt.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center gap-6">
              <Button
                size="lg"
                onClick={() => openCalendly()}
                onMouseEnter={onHover}
                className="group text-lg md:text-xl px-8 md:px-10 py-6 md:py-8"
              >
                Kostenloses Strategiegespräch buchen
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-white cursor-default">
                  <CheckCircle className="h-4 w-4 text-green-500 transition-transform duration-300 group-hover:scale-110" /> Unverbindlich
                </span>
                <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-white cursor-default">
                  <CheckCircle className="h-4 w-4 text-green-500 transition-transform duration-300 group-hover:scale-110" /> 100% Kostenlos
                </span>
                <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-white cursor-default">
                  <CheckCircle className="h-4 w-4 text-green-500 transition-transform duration-300 group-hover:scale-110" /> Direkter Experte
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
