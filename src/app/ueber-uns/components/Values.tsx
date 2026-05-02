'use client'

import { Target, Users, TrendingUp, Award } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { DecorativeParticles } from '@/components/ui'

const values = [
  {
    icon: Target,
    title: 'Ergebnisorientiert',
    description: 'Wir messen uns an den Terminen, die wir liefern - nicht an Aktivitäten.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    bgHover: 'group-hover:bg-blue-400/20',
    borderHover: 'hover:border-blue-400/40',
    shadow: 'hover:shadow-blue-500/10',
  },
  {
    icon: Users,
    title: 'Partnerschaftlich',
    description: 'Wir arbeiten als Teil Ihres Teams und repräsentieren Ihre Marke.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    bgHover: 'group-hover:bg-purple-400/20',
    borderHover: 'hover:border-purple-400/40',
    shadow: 'hover:shadow-purple-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Kontinuierlich',
    description: 'Konstante Schlagzahl statt einmaliger Aktionen für nachhaltige Ergebnisse.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    bgHover: 'group-hover:bg-green-400/20',
    borderHover: 'hover:border-green-400/40',
    shadow: 'hover:shadow-green-500/10',
  },
  {
    icon: Award,
    title: 'Professionell',
    description: 'Jahrelange Erfahrung im B2B-Vertrieb und Recruiting.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    bgHover: 'group-hover:bg-orange-400/20',
    borderHover: 'hover:border-orange-400/40',
    shadow: 'hover:shadow-orange-500/10',
  },
]

export default function Values() {
  return (
    <section className="section-padding relative">
      <DecorativeParticles
        particles={[
          { position: 'top-1/3 left-10', size: 'sm', color: 'bg-green-400/40', animation: 'pulse', duration: '3s' },
          { position: 'bottom-1/4 right-16', size: 'sm', color: 'bg-orange-400/30', animation: 'ping', duration: '4s' },
        ]}
      />

      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Unsere Werte
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
            Wofür wir{' '}
            <span className="text-primary">
              stehen
            </span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className={`group p-6 rounded-2xl border border-border bg-white h-full transition-all duration-500 hover:bg-muted ${value.borderHover} hover:shadow-xl ${value.shadow} hover:-translate-y-1 cursor-default`}>
                <div className={`h-12 w-12 rounded-xl ${value.bg} ${value.bgHover} ${value.color} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
