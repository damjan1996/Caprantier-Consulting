'use client'

import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { cities } from '@/lib/cities'

export default function ServiceAreas() {
  return (
    <section className="section-padding relative">
      {/* Decorative elements - prozentbasiert für Mobile */}
      <div className="absolute top-1/4 right-[5%] w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/3 left-[8%] w-1 h-1 bg-blue-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />

      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Unsere Regionen
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
            B2B Akquise in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              ganz Deutschland
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Von Köln aus betreuen wir Unternehmen in allen wichtigen Wirtschaftsregionen Deutschlands.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cities.map((city, index) => (
              <Link
                key={city.slug}
                href={`/leistungen/${city.slug}`}
                className="group relative p-5 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate group-hover:text-primary transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {city.regionShort}
                    </p>
                  </div>
                </div>
                <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-white/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Auch in weiteren Städten und Regionen verfügbar.{' '}
            <Link href="/kontakt" className="text-primary hover:underline">
              Kontaktieren Sie uns
            </Link>{' '}
            für Ihre Region.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
