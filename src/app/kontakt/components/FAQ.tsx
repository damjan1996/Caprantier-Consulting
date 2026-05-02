'use client'

import { Mail, Phone } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { DecorativeParticles } from '@/components/ui'
import { useCalendly } from '@/hooks/useCalendly'

export default function FAQ() {
  const { openCalendly, onHover } = useCalendly()

  return (
    <section className="section-padding relative">
      <DecorativeParticles
        particles={[
          { position: 'top-1/3 left-1/4', size: 'lg', color: 'bg-purple-400/40', animation: 'pulse', duration: '3s' },
          { position: 'bottom-1/4 right-1/3', size: 'sm', color: 'bg-primary/30', animation: 'ping', duration: '4s' },
        ]}
      />

      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              Noch Fragen?
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-[1.15]">
              Wir helfen Ihnen{' '}
              <span className="text-primary">
                gerne weiter
              </span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Schauen Sie in unserem FAQ-Bereich auf der Startseite nach oder
              kontaktieren Sie uns direkt. Wir sind für Sie da.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" onClick={() => openCalendly()} onMouseEnter={onHover} className="group">
                <Phone className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Gespräch buchen
              </Button>
              <a href="mailto:info@carpantier-consulting.de">
                <Button variant="outline" className="w-full group">
                  <Mail className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  E-Mail senden
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
