'use client'

import { MessageSquare, Target, Settings, CalendarCheck } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const STEPS = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Kennenlerngespräch',
    description: 'In einem kurzen, unverbindlichen Gespräch lernen wir Ihr Unternehmen, Ihr Angebot und Ihre Zielgruppe kennen. Wir prüfen ehrlich, ob wir Ihnen helfen können.',
    duration: '15–20 Minuten',
  },
  {
    icon: Target,
    title: 'Kick-Off Meeting',
    number: '02',
    description: 'Gemeinsam definieren wir Ihre ideale Zielgruppe, entwickeln die Gesprächsstrategie und legen fest, was einen qualifizierten Termin für Sie ausmacht.',
    duration: '45–60 Minuten',
  },
  {
    icon: Settings,
    title: 'Akquise-Strategie & Setup',
    number: '03',
    description: 'Wir bauen Ihre komplette Akquise-Infrastruktur auf: Recherche, Skripte, Einwandbehandlung, CRM-Anbindung. Kein Eigenaufwand für Sie.',
    duration: 'Kein Eigenaufwand',
  },
  {
    icon: CalendarCheck,
    title: 'Wöchentlich neue Termine in Ihrem Kalender',
    number: '04',
    description: 'Ab jetzt telefonieren wir in Ihrem Namen — professionell, sympathisch und auf Augenhöhe. Qualifizierte Entscheider-Termine landen direkt in Ihrem Kalender.',
    duration: 'Kein Eigenaufwand',
  },
]

export default function Method() {
  return (
    <section className="section-padding relative bg-white">
      <div className="container-custom">
        <FadeIn className="text-center mb-12 md:mb-16">
          <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Der Prozess
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
            So können Sie mit uns{' '}
            <span className="text-primary">zusammenarbeiten</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Von der ersten Kontaktaufnahme bis zu regelmäßigen Terminen in Ihrem Kalender — in vier einfachen Schritten.
          </p>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {STEPS.map((step, index) => (
              <FadeIn key={index} delay={index * 0.15} direction="left">
                <div className="group relative flex gap-6 md:gap-8 p-6 md:p-8 rounded-2xl border border-border bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                  {/* Step Number */}
                  <div className="shrink-0">
                    <div className="h-14 w-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                      <step.icon className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-primary/60 tracking-wider">SCHRITT {step.number}</span>
                      {step.duration && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{step.duration}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
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
