'use client'

import { XCircle } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { SalesGrowthIllustration } from '@/components/illustrations'

const PROBLEMS = [
  {
    title: 'Theorie statt Praxis',
    description: 'Andere verkaufen Ihnen Videokurse. Wir liefern echte Gespräche.',
    quote: 'Sie brauchen keine weiteren Coachings, Sie brauchen Termine.',
  },
  {
    title: 'Zeitfresser Kaltakquise',
    description: 'Ihre Zeit ist im Kerngeschäft gebunden, nicht am Telefonhörer.',
    quote: 'Jede Stunde in der Akquise fehlt Ihnen in der Auslieferung.',
  },
  {
    title: 'Umsatz-Achterbahn',
    description: 'Mal läuft es, mal nicht. Ohne System bleibt Erfolg Zufall.',
    quote: 'Planbarkeit entsteht nur durch konsistente Schlagzahl.',
  },
]

export default function Problem() {
  return (
    <section className="section-padding relative">
      {/* Decorative elements - prozentbasiert für Mobile */}
      <div className="absolute top-1/4 right-[5%] w-1.5 h-1.5 bg-destructive/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/3 left-[8%] w-1 h-1 bg-red-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />

      <div className="container-custom relative">
        <div className="max-w-5xl mx-auto">
          {/* Visual Header with Illustration */}
          <FadeIn className="mb-12 md:mb-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left order-last lg:order-first">
                <span className="inline-block text-destructive/80 font-medium tracking-wider uppercase text-sm mb-4">
                  Das Problem
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
                  Warum Ihre Akquise bisher{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-destructive to-red-500">nicht funktioniert</span> hat.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  Die meisten Agenturinhaber scheitern nicht am Angebot, sondern an
                  der fehlenden Konstanz im Vertrieb.
                </p>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[320px] h-[240px] opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
                  <SalesGrowthIllustration className="w-full h-full rotate-180 opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="text-center mb-16 hidden">
            <span className="inline-block text-destructive/80 font-medium tracking-wider uppercase text-sm mb-4">
              Das Problem
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
              Warum Ihre Akquise bisher{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-destructive to-red-500">nicht funktioniert</span> hat.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Die meisten Agenturinhaber scheitern nicht am Angebot, sondern an
              der fehlenden Konstanz im Vertrieb.
            </p>
          </FadeIn>

          <div className="grid gap-5 md:gap-6">
            {PROBLEMS.map((problem, index) => (
              <FadeIn key={index} delay={index * 0.15} direction="left">
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 transition-all duration-500 hover:bg-white/10 hover:border-destructive/30 hover:shadow-xl hover:shadow-destructive/5 hover:-translate-y-1 cursor-default">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-start gap-4 md:gap-6">
                    <div className="mt-1 flex-shrink-0">
                      <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center transition-all duration-300 group-hover:bg-destructive/20 group-hover:scale-110">
                        <XCircle className="h-6 w-6 text-destructive/80 transition-colors group-hover:text-destructive" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 transition-colors group-hover:text-white">
                        {problem.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 transition-colors group-hover:text-muted-foreground/90">
                        {problem.description}
                      </p>
                      <blockquote className="border-l-2 border-white/20 pl-4 italic text-sm text-white/60 transition-all duration-300 group-hover:border-destructive/40 group-hover:text-white/70">
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
