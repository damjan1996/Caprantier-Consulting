'use client'

import { Phone, Target, BarChart3, Users, CheckCircle } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { DecorativeParticles } from '@/components/ui'
import {
  PhoneCallIllustration,
  TargetAudienceIllustration,
  CalendarLeadsIllustration,
  DataAnalyticsIllustration,
} from '@/components/illustrations'

const services = [
  {
    icon: Phone,
    illustration: PhoneCallIllustration,
    title: 'Telefonakquise',
    description: 'Professionelle Kaltakquise durch erfahrene Sales-Experten. Wir sprechen mit Entscheidern auf Augenhöhe.',
    features: ['Individuelle Gesprächsleitfäden', 'Branchenspezifische Ansprache', 'Kontinuierliche Optimierung', 'Erfahrene B2B-Vertriebsprofis'],
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    bgHover: 'group-hover:bg-blue-400/20',
    borderHover: 'hover:border-blue-400/40',
    shadow: 'hover:shadow-blue-500/10',
  },
  {
    icon: Target,
    illustration: TargetAudienceIllustration,
    title: 'Leadgenerierung',
    description: 'Zielgenaue Identifikation und Ansprache Ihrer idealen Kunden nach maßgeschneiderten Kriterien.',
    features: ['Präzise Zielgruppenselektion', 'Datenqualifizierung', 'Entscheider-Qualifizierung', 'CRM-Integration'],
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    bgHover: 'group-hover:bg-purple-400/20',
    borderHover: 'hover:border-purple-400/40',
    shadow: 'hover:shadow-purple-500/10',
  },
  {
    icon: Users,
    illustration: CalendarLeadsIllustration,
    title: 'Terminqualifizierung',
    description: 'Nur qualifizierte Termine mit echten Entscheidern, die grundsätzliches Interesse an Ihrem Angebot haben.',
    features: ['Vorqualifizierte Leads', 'Entscheider-Kontakte', 'Terminerinnerungen', 'Flexible Kalenderintegration'],
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    bgHover: 'group-hover:bg-green-400/20',
    borderHover: 'hover:border-green-400/40',
    shadow: 'hover:shadow-green-500/10',
  },
  {
    icon: BarChart3,
    illustration: DataAnalyticsIllustration,
    title: 'Reporting & Analyse',
    description: 'Transparente Berichte über alle Aktivitäten und Ergebnisse. Volle Kontrolle für Sie.',
    features: ['Wöchentliche Reports', 'KPI-Tracking', 'Conversion-Analysen', 'Optimierungsvorschläge'],
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    bgHover: 'group-hover:bg-orange-400/20',
    borderHover: 'hover:border-orange-400/40',
    shadow: 'hover:shadow-orange-500/10',
  },
]

export default function Services() {
  return (
    <section className="section-padding relative">
      <DecorativeParticles
        particles={[
          { position: 'top-1/4 left-10', size: 'lg', color: 'bg-blue-400/40', animation: 'pulse', duration: '3s' },
          { position: 'bottom-1/3 right-16', size: 'sm', color: 'bg-purple-400/30', animation: 'ping', duration: '4s' },
        ]}
      />

      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Was wir bieten
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
            Unsere{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-green-400">
              Kernleistungen
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Alles aus einer Hand - von der Strategie bis zum qualifizierten Termin.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className={`group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 h-full transition-all duration-500 hover:bg-white/10 ${service.borderHover} hover:shadow-xl ${service.shadow} hover:-translate-y-1 cursor-default overflow-hidden`}>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Background Illustration */}
                <div className="absolute -right-8 -bottom-8 w-[180px] h-[135px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                  <service.illustration className="w-full h-full" />
                </div>

                <div className="relative">
                  <div className={`h-14 w-14 rounded-2xl ${service.bg} ${service.bgHover} ${service.color} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
