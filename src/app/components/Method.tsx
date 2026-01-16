'use client'

import Image from 'next/image'
import { Compass, Phone, CalendarCheck } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { PORTRAIT_BLUR, IMAGE_SIZES } from '@/lib/image-placeholders'

const STEPS = [
  {
    icon: Compass,
    title: '1. Strategie-Blueprint',
    description:
      'Messerscharfe Analyse von Angebot und Zielgruppe. Wir definieren genau, wen wir anrufen und was wir sagen.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    bgHover: 'group-hover:bg-blue-400/20',
    border: 'border-blue-400/20',
    borderHover: 'hover:border-blue-400/40',
    shadow: 'hover:shadow-blue-500/10',
  },
  {
    icon: Phone,
    title: '2. Akquise-Übernahme',
    description:
      'Wir führen die Gespräche, als wären wir Teil Ihres Teams. Professionell, hartnäckig und sympathisch.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    bgHover: 'group-hover:bg-purple-400/20',
    border: 'border-purple-400/20',
    borderHover: 'hover:border-purple-400/40',
    shadow: 'hover:shadow-purple-500/10',
  },
  {
    icon: CalendarCheck,
    title: '3. Verkaufsgespräche',
    description:
      'Sie erhalten qualifizierte Termine direkt in Ihren Kalender. Sie schließen ab - wir halten Ihnen den Rücken frei.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    bgHover: 'group-hover:bg-green-400/20',
    border: 'border-green-400/20',
    borderHover: 'hover:border-green-400/40',
    shadow: 'hover:shadow-green-500/10',
  },
]

export default function Method() {
  return (
    <section className="section-padding relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/2 right-10 w-1 h-1 bg-green-400/30 rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />

      <div className="container-custom">
        <div className="text-center mb-16 md:mb-20">
          <FadeIn>
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              Der Prozess
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
              Das{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-green-400">
                3-Schritte-System
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              In drei Schritten von der &ldquo;kalten Liste&rdquo; zum zahlenden Kunden.
            </p>
          </FadeIn>
        </div>

        {/* Visual with Strategy Image */}
        <FadeIn className="mb-16 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group order-last lg:order-first">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <Image
                  src="/images/nico-strategy.jpg"
                  alt="Nico Carpantier erklärt Strategie am Whiteboard"
                  fill
                  sizes={IMAGE_SIZES.heroPortrait}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={PORTRAIT_BLUR}
                />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Individuelle Strategie für{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Ihren Erfolg
                </span>
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Jedes Unternehmen ist einzigartig. Deshalb entwickeln wir gemeinsam eine maßgeschneiderte Akquise-Strategie,
                die zu Ihrem Angebot, Ihrer Zielgruppe und Ihren Zielen passt.
              </p>
              <ul className="space-y-3">
                {['Zielgruppenanalyse', 'Skript-Entwicklung', 'Einwandbehandlung'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          {STEPS.map((step, index) => (
            <FadeIn key={index} delay={index * 0.2} className="relative z-10">
              <div
                className={`group flex flex-col h-full p-8 md:p-10 rounded-3xl border ${step.border} ${step.borderHover} bg-white/5 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${step.shadow} cursor-default`}
              >
                {/* Step number indicator */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border border-white/10 flex items-center justify-center text-xs font-bold text-white/60 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
                  {index + 1}
                </div>

                <div
                  className={`h-14 w-14 rounded-xl ${step.bg} ${step.bgHover} ${step.color} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
                >
                  <step.icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 transition-colors group-hover:text-white">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed transition-colors group-hover:text-muted-foreground/90">
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
