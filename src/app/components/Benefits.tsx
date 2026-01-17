'use client'

import Image from 'next/image'
import { Target, Clock, TrendingUp, Users, Shield, BarChart3 } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

// Static import for automatic blur placeholder
import nicoConsulting from '@/../public/images/nico-consulting.jpg'

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
    <section className="section-padding relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/3 right-16 w-1.5 h-1.5 bg-primary/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />

      <div className="container-custom">
        {/* Visual Header with Image */}
        <FadeIn className="mb-16 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
                Ihre Vorteile
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
                Warum{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
                  Carpantier Consulting
                </span>?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Wir übernehmen Ihre Akquise - Sie schließen ab. Persönlich, professionell und mit voller Transparenz.
              </p>
            </div>
            <div className="relative h-[280px] md:h-[350px] rounded-2xl overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <Image
                  src={nicoConsulting}
                  alt="Nico Carpantier - Persönliche B2B Akquise Beratung in Köln"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {BENEFITS.map((benefit, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 h-full hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-default">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <benefit.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 transition-colors group-hover:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed transition-colors group-hover:text-muted-foreground/90">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
