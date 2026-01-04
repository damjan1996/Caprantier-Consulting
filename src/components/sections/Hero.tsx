'use client'

import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'

export default function Hero() {
  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.showPopupWidget('https://calendly.com/nico-carpantier-consulting/30min')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />
        <Image
          src="/images/abstract-bg-1.jpg"
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      {/* Glow Effect */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] hero-glow blur-3xl pointer-events-none opacity-60" />

      <div className="container-custom relative z-20 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Planbare Kundenakquise
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                Die Ära der{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-glow">
                  unplanbaren Akquise
                </span>{' '}
                ist vorbei.
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Wir implementieren das System, das qualifizierte Kunden{' '}
                <strong className="text-white">planbar</strong> in Ihren Kalender
                bringt - ohne Kaltakquise-Frust und ohne eigene Vertriebsmitarbeiter.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" onClick={openCalendly}>
                  Erstgespräch sichern
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" /> Unverbindlich
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" /> Kostenlos
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" /> Limitiert auf 5 Partner/Monat
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Hero Image */}
          <FadeIn delay={0.3} direction="right" className="order-first lg:order-last">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md">
                <Image
                  src="/images/nico-portrait.png"
                  alt="Nico Carpantier - B2B Sales Consultant"
                  fill
                  className="object-cover object-center"
                  priority
                />

                {/* Floating Cards */}
                <div className="absolute top-1/4 -left-4 md:-left-8 bg-card/90 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-xl shadow-xl animate-float-slow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Neuer Termin</p>
                      <p className="text-sm font-bold text-white">Heute, 14:00 Uhr</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/3 -right-4 md:-right-8 bg-card/90 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-xl shadow-xl animate-float-slower">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Qualifiziert</p>
                      <p className="text-sm font-bold text-white">Entscheider erreicht</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
