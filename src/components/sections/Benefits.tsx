'use client'

import { Target, Clock, TrendingUp, Users, Shield, BarChart3 } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const BENEFITS = [
  {
    icon: Target,
    title: 'Qualifizierte Termine',
    description:
      'Nur vorqualifizierte Entscheider, die echtes Interesse haben. Keine Zeitverschwendung mit unqualifizierten Leads.',
  },
  {
    icon: Clock,
    title: 'Zeit für Ihr Kerngeschäft',
    description:
      'Während wir akquirieren, können Sie sich auf das konzentrieren, was Sie am besten können: Ihre Kunden betreuen.',
  },
  {
    icon: TrendingUp,
    title: 'Planbare Umsätze',
    description:
      'Schluss mit der Umsatz-Achterbahn. Mit konstanter Schlagzahl zu planbarem Wachstum.',
  },
  {
    icon: Users,
    title: 'Kein eigenes Sales-Team',
    description:
      'Sparen Sie sich die Kosten und den Aufwand für Recruiting, Onboarding und Führung eines eigenen Vertriebsteams.',
  },
  {
    icon: Shield,
    title: 'Expertise aus Erfahrung',
    description:
      'Jahrelange Erfahrung in B2B-Vertrieb und Recruiting. Bewährte Strategien, die funktionieren.',
  },
  {
    icon: BarChart3,
    title: 'Volle Transparenz',
    description:
      'Detailliertes Reporting über alle Aktivitäten. Sie wissen immer genau, was passiert.',
  },
]

export default function Benefits() {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Ihre Vorteile
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Warum Carpantier Consulting?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Wir übernehmen Ihre Akquise - Sie schließen ab.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {BENEFITS.map((benefit, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group p-6 md:p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
