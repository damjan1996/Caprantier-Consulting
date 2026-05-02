'use client'

import { MessageCircle, Search, Flame } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const STRATEGIES = [
  {
    icon: MessageCircle,
    title: 'Kein Druck und keine Verkaufs-Floskeln',
    description: 'Wir führen Gespräche auf Augenhöhe, die sich nicht wie typische Kaltakquise anfühlen. Professionell, sympathisch und respektvoll — so entstehen echte Verbindungen.',
    color: 'text-primary',
    bg: 'bg-primary/5',
  },
  {
    icon: Search,
    title: 'Wir suchen die Nadel im Heuhaufen',
    description: 'Nicht jeder Lead ist ein guter Lead. Wir identifizieren die Unternehmen und Entscheider, die wirklich zu Ihrem Angebot passen — nur Termine mit echter Auftragschance.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Flame,
    title: 'Aus kalten Leads werden warme Kontakte',
    description: 'Wir machen aus einem kalten Lead einen warmen Lead. Durch gezielte Gesprächsführung wecken wir echtes Interesse — bevor der Termin in Ihrem Kalender landet.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
]

export default function Problem() {
  return (
    <section className="section-padding relative bg-white">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              Unsere Strategie
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
              Warum unsere Akquise-Strategie{' '}
              <span className="text-primary">so gut funktioniert</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Ihr externes Akquise-Büro läuft wie ein Uhrwerk — wie ein eigener Mitarbeiter, nur ohne den Aufwand.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {STRATEGIES.map((strategy, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className="group relative h-full p-8 rounded-2xl border border-border bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  <div className={`h-14 w-14 rounded-xl ${strategy.bg} ${strategy.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <strategy.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {strategy.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {strategy.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
