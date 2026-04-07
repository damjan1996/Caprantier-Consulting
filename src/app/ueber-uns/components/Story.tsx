'use client'

import FadeIn from '@/components/ui/FadeIn'
import { DecorativeParticles } from '@/components/ui'

const storyParagraphs = [
  'Carpantier Consulting entstand aus einer einfachen Erkenntnis: Die meisten B2B-Dienstleister haben ein hervorragendes Angebot und zufriedene Kunden - aber keine Kontrolle darüber, wann das nächste Gespräch stattfindet.',
  'Ob Personalvermittler, IT-Systemhäuser, Unternehmensberater oder SaaS-Anbieter - sie alle kennen das gleiche Problem: Das Tagesgeschäft frisst alles, die Akquise bleibt liegen, die Pipeline wird dünn. Mit jahrelanger Erfahrung im B2B-Vertrieb liefern wir genau das, was fehlt: einen konstanten Zustrom qualifizierter Gespräche.',
  'Unser Ansatz: Wir sind kein externer Dienstleister, sondern ein Multiplikator für Ihr Geschäft. Professionell, zuverlässig und mit dem klaren Fokus auf Termine mit echten Entscheidern.',
]

export default function Story() {
  return (
    <section className="section-padding relative">
      <DecorativeParticles preset="section" />

      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              Unsere Geschichte
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
              Wie alles{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                begann
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6">
              {storyParagraphs.map((text, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg text-muted-foreground p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                >
                  {text}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
