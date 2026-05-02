'use client'

import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCalendly } from '@/hooks/useCalendly'

import nicoPortrait from '@/../public/images/nico-portrait-new.jpg'

export default function Hero() {
  const { openCalendly, onHover } = useCalendly()

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container-custom relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                B2B Akquise-Agentur aus Köln
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground leading-[1.15]">
                Jede Woche{' '}
                <span className="text-primary">
                  3–8 Termine
                </span>{' '}
                mit Entscheidern aus Ihrer Zielgruppe
              </h1>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Wir übernehmen Ihre komplette B2B-Kaltakquise und finden die Unternehmen, die wirklich an Ihrem Angebot interessiert sind. Planbare Neukundengewinnung ohne Druck — von Köln aus, bundesweit.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Button size="lg" onClick={() => openCalendly()} onMouseEnter={onHover} className="group">
                  Kostenloses Strategie-Gespräch vereinbaren
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Unverbindlich & kostenlos
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Nur 5 Kunden pro Monat
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Erste Termine in 14 Tagen
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 order-first lg:order-last">
            <div className="relative h-[350px] sm:h-[400px] md:h-[480px] lg:h-[540px] max-w-md mx-auto lg:max-w-none group">
              <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-xl bg-white transition-all duration-500 group-hover:shadow-2xl">
                <Image
                  src={nicoPortrait}
                  alt="Nico Carpantier - B2B Kaltakquise & Leadgenerierung aus Köln"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px"
                  className="object-cover object-top"
                  priority
                  fetchPriority="high"
                  placeholder="blur"
                  quality={85}
                />

                {/* Floating Cards */}
                <div className="absolute bottom-20 left-2 bg-white/95 backdrop-blur-md border border-border p-3 md:p-4 rounded-xl shadow-lg animate-float-slow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Neuer Termin</p>
                      <p className="text-sm font-bold text-foreground">Heute, 14:00 Uhr</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-2 bg-white/95 backdrop-blur-md border border-border p-3 md:p-4 rounded-xl shadow-lg animate-float-slower">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Qualifiziert</p>
                      <p className="text-sm font-bold text-foreground">Lead bestätigt</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
