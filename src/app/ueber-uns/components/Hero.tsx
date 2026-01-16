'use client'

import Image from 'next/image'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { DecorativeParticles } from '@/components/ui'
import { useCalendly } from '@/hooks/useCalendly'
import { PORTRAIT_BLUR, IMAGE_SIZES } from '@/lib/image-placeholders'

export default function Hero() {
  const { openCalendly, onHover } = useCalendly()

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
      <DecorativeParticles preset="hero" />

      <div className="container-custom relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <FadeIn delay={0.1}>
              <div className="group inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-white cursor-default transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transform-gpu">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse group-hover:animate-ping"></span>
                Über uns
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                B2B-Akquise ist unsere{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
                  Leidenschaft
                </span>.
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Bei Carpantier Consulting verbinden wir jahrelange Erfahrung im
                B2B-Vertrieb und Recruiting mit dem Ziel, Agenturen und
                IT-Dienstleistern{' '}
                <strong className="text-white">planbare Neukundengewinnung</strong>{' '}
                zu ermöglichen.
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
                    src="/images/nico-portrait-new.jpg"
                    alt="Nico Carpantier"
                    width={64}
                    height={64}
                    className="object-cover object-top w-full h-full"
                    placeholder="blur"
                    blurDataURL={PORTRAIT_BLUR}
                  />
                </div>
                <div>
                  <div className="font-semibold text-white">Nico Carpantier</div>
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

              <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md transition-all duration-500 group-hover:border-white/30 group-hover:shadow-primary/10">
                <Image
                  src="/images/nico-office.jpg"
                  alt="Nico Carpantier - B2B Sales Consultant"
                  fill
                  sizes={IMAGE_SIZES.heroPortrait}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                  placeholder="blur"
                  blurDataURL={PORTRAIT_BLUR}
                />

                {/* Floating Cards */}
                <div className="absolute bottom-20 left-2 bg-card/90 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-xl shadow-xl animate-float-slow cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-card hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 group/card">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 group-hover/card:bg-primary/30 group-hover/card:scale-110">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80 group-hover/card:text-white transition-colors">Leidenschaft</p>
                      <p className="text-sm font-bold text-white">für B2B Sales</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-2 bg-card/90 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-xl shadow-xl animate-float-slower cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-card hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 group/card2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 transition-all duration-300 group-hover/card2:bg-blue-500/30 group-hover/card2:scale-110">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80 group-hover/card2:text-white transition-colors">Erfahrung</p>
                      <p className="text-sm font-bold text-white">3+ Jahre B2B</p>
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
