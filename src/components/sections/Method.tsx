'use client'

import { Compass, Phone, CalendarCheck } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const STEPS = [
  {
    icon: Compass,
    title: '1. Strategie-Blueprint',
    description:
      'Messerscharfe Analyse von Angebot und Zielgruppe. Wir definieren genau, wen wir anrufen und was wir sagen.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  {
    icon: Phone,
    title: '2. Akquise-Uebernahme',
    description:
      'Wir fuehren die Gespraeche, als waeren wir Teil Ihres Teams. Professionell, hartnaeckig und sympathisch.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
  {
    icon: CalendarCheck,
    title: '3. Verkaufsgespraeche',
    description:
      'Sie erhalten qualifizierte Termine direkt in Ihren Kalender. Sie schliessen ab - wir halten Ihnen den Ruecken frei.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
  },
]

export default function Method() {
  return (
    <section className="section-padding bg-background/50 backdrop-blur-3xl">
      <div className="container-custom">
        <div className="text-center mb-16 md:mb-20">
          <FadeIn>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Der Prozess
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              Das 3-Schritte-System
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              In drei Schritten von der &ldquo;kalten Liste&rdquo; zum zahlenden Kunden.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          {STEPS.map((step, index) => (
            <FadeIn key={index} delay={index * 0.2} className="relative z-10">
              <div
                className={`flex flex-col h-full p-8 md:p-10 rounded-3xl border ${step.border} glass-card hover:bg-white/10 transition-all duration-500 group hover:-translate-y-2`}
              >
                <div
                  className={`h-14 w-14 rounded-xl ${step.bg} ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
