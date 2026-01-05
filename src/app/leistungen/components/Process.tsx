'use client'

import { Compass, Target, Phone, CalendarCheck } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { DecorativeParticles } from '@/components/ui'

const process = [
  {
    step: '01',
    icon: Compass,
    title: 'Onboarding',
    description: 'Wir analysieren Ihr Angebot, Ihre Zielgruppe und entwickeln die optimale Akquise-Strategie.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    step: '02',
    icon: Target,
    title: 'Setup',
    description: 'Erstellung maßgeschneiderter Gesprächsleitfäden und Selektion der Zielgruppe.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    step: '03',
    icon: Phone,
    title: 'Akquise-Start',
    description: 'Wir beginnen mit den Gesprächen und liefern qualifizierte Termine in Ihren Kalender.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    step: '04',
    icon: CalendarCheck,
    title: 'Optimierung',
    description: 'Kontinuierliche Verbesserung der Prozesse basierend auf Feedback und Ergebnissen.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
]

export default function Process() {
  return (
    <section className="section-padding relative">
      <DecorativeParticles
        particles={[
          { position: 'top-20 left-1/4', size: 'lg', color: 'bg-blue-400/30', animation: 'pulse', duration: '3s' },
          { position: 'bottom-1/4 right-1/5', size: 'sm', color: 'bg-green-400/40', animation: 'ping', duration: '4s' },
        ]}
      />

      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Der Ablauf
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
            So{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-green-400">
              starten wir
            </span>{' '}
            zusammen
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ein strukturierter Prozess für maximale Ergebnisse.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((item, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <div className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 h-full transition-all duration-500 hover:bg-white/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-default">
                <span className="absolute top-4 right-4 text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                  {item.step}
                </span>

                <div className={`h-12 w-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm relative z-10">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
