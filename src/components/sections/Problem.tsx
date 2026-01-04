'use client'

import { XCircle } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const PROBLEMS = [
  {
    title: 'Theorie statt Praxis',
    description: 'Andere verkaufen Ihnen Videokurse. Wir liefern echte Gespraeche.',
    quote: 'Sie brauchen keine weiteren Coachings, Sie brauchen Termine.',
  },
  {
    title: 'Zeitfresser Kaltakquise',
    description: 'Ihre Zeit ist im Kerngeschaeft gebunden, nicht am Telefonhoerer.',
    quote: 'Jede Stunde in der Akquise fehlt Ihnen in der Auslieferung.',
  },
  {
    title: 'Umsatz-Achterbahn',
    description: 'Mal laeuft es, mal nicht. Ohne System bleibt Erfolg Zufall.',
    quote: 'Planbarkeit entsteht nur durch konsistente Schlagzahl.',
  },
]

export default function Problem() {
  return (
    <section className="section-padding bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-10" />

      <div className="container-custom relative z-20">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Warum Ihre Akquise bisher{' '}
              <span className="text-destructive">nicht funktioniert</span> hat.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Die meisten Agenturinhaber scheitern nicht am Angebot, sondern an
              der fehlenden Konstanz im Vertrieb.
            </p>
          </FadeIn>

          <div className="grid gap-6 md:gap-8">
            {PROBLEMS.map((problem, index) => (
              <FadeIn key={index} delay={index * 0.15} direction="left">
                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 md:p-8 hover:bg-white/10 transition-colors duration-500">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="mt-1 flex-shrink-0">
                      <XCircle className="h-7 w-7 md:h-8 md:w-8 text-destructive/80" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                        {problem.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {problem.description}
                      </p>
                      <blockquote className="border-l-2 border-white/20 pl-4 italic text-sm text-white/60">
                        &ldquo;{problem.quote}&rdquo;
                      </blockquote>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
