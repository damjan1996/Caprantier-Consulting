'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { useCalendly } from '@/hooks/useCalendly'

export default function CTA() {
  const { openCalendly, onHover } = useCalendly()

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              Jetzt starten
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.15]">
              Bereit für planbare{' '}
              <span className="text-primary">Neukundengewinnung</span>?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              In 15 Minuten besprechen wir Ihr Potenzial und zeigen Ihnen, wie wir Ihren Kalender mit qualifizierten Entscheider-Terminen füllen.
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
                Kostenloses Strategie-Gespräch vereinbaren
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Unverbindlich & kostenlos
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-600" /> In 15 Minuten Klarheit
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Direkt mit dem Gründer
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
