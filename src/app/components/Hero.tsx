'use client'

import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCalendly } from '@/hooks/useCalendly'

// Static import for automatic blur placeholder generation at build time
import nicoPortrait from '@/../public/images/nico-portrait-new.jpg'

export default function Hero() {
  const { openCalendly, onHover } = useCalendly()

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
      {/* Animated decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary/60 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute top-1/3 left-1/5 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-ping" style={{ animationDuration: '4s' }} />

      <div className="container-custom relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="group inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-white cursor-default transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transform-gpu">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse group-hover:animate-ping"></span>
                B2B Vertriebsagentur
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Ihre B2B{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-glow">
                  Vertriebsagentur
                </span>{' '}
                für planbare Neukundengewinnung
              </h1>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              <p className="text-lg md:text-xl font-semibold text-white/90 max-w-lg mx-auto lg:mx-0">
                Die Ära der unplanbaren Akquise ist vorbei.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Für B2B-Dienstleister und inhabergeführte Unternehmen, die wachsen wollen -{' '}
                <strong className="text-white">ohne eigenes Vertriebsteam aufzubauen</strong>.
                Wir liefern qualifizierte Termine mit Entscheidern direkt in Ihren Kalender.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Button size="lg" onClick={() => openCalendly()} onMouseEnter={onHover} className="group">
                  Erstgespräch sichern
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-sm text-muted-foreground">
                <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-white cursor-default">
                  <CheckCircle className="h-4 w-4 text-green-500 transition-transform duration-300 group-hover:scale-110" /> Unverbindlich
                </span>
                <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-white cursor-default">
                  <CheckCircle className="h-4 w-4 text-green-500 transition-transform duration-300 group-hover:scale-110" /> Kostenlos
                </span>
                <span className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-white cursor-default">
                  <CheckCircle className="h-4 w-4 text-green-500 transition-transform duration-300 group-hover:scale-110" /> Nur 5 Kunden/Monat
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image - keine Animation für schnelleren LCP */}
          <div className="lg:col-span-5 order-first lg:order-last">
            <div className="relative h-[350px] sm:h-[400px] md:h-[480px] lg:h-[540px] max-w-md mx-auto lg:max-w-none group">
              {/* Glow Effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md transition-all duration-500 group-hover:border-white/30 group-hover:shadow-primary/10">
                <Image
                  src={nicoPortrait}
                  alt="Nico Carpantier - B2B Telefonakquise & Leadgenerierung aus Köln"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                  fetchPriority="high"
                  placeholder="blur"
                  quality={85}
                />

                {/* Floating Cards */}
                <div className="absolute bottom-20 left-2 bg-card/90 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-xl shadow-xl animate-float-slow cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-card hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 group/card">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 transition-all duration-300 group-hover/card:bg-green-500/30 group-hover/card:scale-110">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80 group-hover/card:text-white transition-colors">Neuer Termin</p>
                      <p className="text-sm font-bold text-white">Heute, 14:00 Uhr</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-2 bg-card/90 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-xl shadow-xl animate-float-slower cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-card hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 group/card2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 transition-all duration-300 group-hover/card2:bg-blue-500/30 group-hover/card2:scale-110">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80 group-hover/card2:text-white transition-colors">Qualifiziert</p>
                      <p className="text-sm font-bold text-white">Lead bestätigt</p>
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
