'use client'

import Image from 'next/image'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { DecorativeParticles } from '@/components/ui'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useCalendly } from '@/hooks/useCalendly'

// Static imports for automatic blur placeholders
import nicoOffice from '@/../public/images/nico-office.jpg'
import nicoPortrait from '@/../public/images/nico-portrait-new.jpg'

export default function Hero() {
  const { openCalendly, onHover } = useCalendly()

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
      <DecorativeParticles preset="hero" />

      <div className="container-custom relative z-20">
        {/* Breadcrumbs */}
        <FadeIn className="mb-6">
          <Breadcrumbs
            items={[{ label: 'Über uns' }]}
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <FadeIn delay={0.1}>
              <div className="group inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground cursor-default transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transform-gpu">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse group-hover:animate-ping"></span>
                Über uns
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
                B2B-Akquise ist unsere{' '}
                <span className="text-primary">
                  Leidenschaft
                </span>.
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Bei Carpantier Consulting verbinden wir jahrelange Erfahrung im
                B2B-Vertrieb mit dem Ziel, inhabergeführten Unternehmen und
                Dienstleistern{' '}
                <strong className="text-foreground">planbare Neukundengewinnung</strong>{' '}
                zu ermöglichen - von Personalvermittlern über IT-Systemhäuser bis zu SaaS-Anbietern.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Button size="lg" onClick={() => openCalendly()} onMouseEnter={onHover} className="group">
                  Uns kennenlernen
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex items-center gap-4 justify-center lg:justify-start pt-4">
                <div className="group h-16 w-16 rounded-full overflow-hidden border-2 border-primary/50 transition-all duration-300 hover:border-primary hover:scale-110 cursor-pointer">
                  <Image
                    src={nicoPortrait}
                    alt="Nico Carpantier"
                    width={64}
                    height={64}
                    className="object-cover object-top w-full h-full"
                    placeholder="blur"
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Nico Carpantier</div>
                  <div className="text-sm text-muted-foreground">
                    Geschäftsführer & Sales Consultant
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Hero Image */}
          <FadeIn delay={0.3} direction="right" className="lg:col-span-5 order-first lg:order-last">
            <div className="relative h-[350px] sm:h-[400px] md:h-[480px] lg:h-[540px] max-w-md mx-auto lg:max-w-none group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-2xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-primary/10">
                <Image
                  src={nicoOffice}
                  alt="Nico Carpantier - B2B Sales Consultant"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                  placeholder="blur"
                />

                {/* Floating Cards */}
                <div className="absolute bottom-20 left-2 bg-card/90 backdrop-blur-md border border-border p-3 md:p-4 rounded-xl shadow-xl animate-float-slow cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-card hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 group/card">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 group-hover/card:bg-primary/30 group-hover/card:scale-110">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/80 group-hover/card:text-foreground transition-colors">Leidenschaft</p>
                      <p className="text-sm font-bold text-foreground">für B2B Sales</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-2 bg-card/90 backdrop-blur-md border border-border p-3 md:p-4 rounded-xl shadow-xl animate-float-slower cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-card hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 group/card2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 transition-all duration-300 group-hover/card2:bg-blue-500/30 group-hover/card2:scale-110">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/80 group-hover/card2:text-foreground transition-colors">Erfahrung</p>
                      <p className="text-sm font-bold text-foreground">3+ Jahre B2B</p>
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
