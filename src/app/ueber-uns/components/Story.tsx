'use client'

import FadeIn from '@/components/ui/FadeIn'
import { DecorativeParticles } from '@/components/ui'

const storyParagraphs = [
  'Carpantier Consulting entstand aus einer einfachen Erkenntnis: Die meisten Agenturen und IT-Dienstleister haben ein hervorragendes Angebot, aber keine Zeit oder Ressourcen für systematische Akquise.',
  'Mit jahrelanger Erfahrung im B2B-Vertrieb - von der Personalberatung bis zur direkten Kundenakquise - wissen wir, wie wichtig eine konstante Pipeline qualifizierter Leads ist. Diese Expertise bringen wir nun gezielt für unsere Partner ein.',
  'Unser Ansatz: Wir übernehmen nicht nur die Akquise, sondern werden zum erweiterten Teil Ihres Teams. Professionell, zuverlässig und mit dem klaren Fokus auf messbare Ergebnisse.',
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
