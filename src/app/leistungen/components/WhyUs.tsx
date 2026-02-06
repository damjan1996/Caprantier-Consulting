'use client'

import { Zap, Shield, Clock } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { DecorativeParticles } from '@/components/ui'

const benefits = [
  { icon: Zap, title: 'Schnelle Ergebnisse', desc: 'Erste Termine oft schon in der ersten Woche', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { icon: Shield, title: 'Kein Risiko', desc: 'Transparente Zusammenarbeit ohne versteckte Kosten', color: 'text-green-400', bg: 'bg-green-400/10' },
  { icon: Clock, title: 'Zeitersparnis', desc: 'Fokussieren Sie sich auf Ihr Kerngeschäft', color: 'text-blue-400', bg: 'bg-blue-400/10' },
]

const stats = [
  { value: '3+', label: 'Jahre Erfahrung' },
  { value: '100%', label: 'B2B-Fokus' },
  { value: '5', label: 'Partner/Monat' },
  { value: 'BANT', label: 'Qualifizierung' },
]

export default function WhyUs() {
  return (
    <section className="section-padding relative">
      <DecorativeParticles
        particles={[
          { position: 'top-1/3 left-10', size: 'sm', color: 'bg-primary/40', animation: 'pulse', duration: '3s' },
          { position: 'bottom-1/4 right-16', size: 'sm', color: 'bg-blue-400/30', animation: 'ping', duration: '4s' },
        ]}
      />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              Warum wir?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
              Erfahrung, die den{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Unterschied
              </span>{' '}
              macht
            </h2>
            <p className="text-muted-foreground mb-8">
              Jahrelange Erfahrung im B2B-Vertrieb und Recruiting. Wir wissen,
              wie man mit Entscheidern spricht und Termine vereinbart, die zu
              Abschlüssen führen.
            </p>
            <div className="space-y-4">
              {benefits.map((item, index) => (
                <div key={index} className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-default">
                  <div className={`h-10 w-10 rounded-lg ${item.bg} ${item.color} flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="right">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="group p-6 rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-500 hover:bg-white/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-default">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
