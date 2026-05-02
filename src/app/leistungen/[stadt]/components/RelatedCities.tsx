'use client'

import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { type City, cities, getSlugFromName } from '@/lib/cities'

interface RelatedCitiesProps {
  city: City
}

export default function RelatedCities({ city }: RelatedCitiesProps) {
  // Get related cities: nearby areas + some other major cities
  const nearbySlugs = city.nearbyAreas
    .map((name) => getSlugFromName(name))
    .filter(Boolean) as string[]

  // Get other major cities that are not nearby and not the current city
  const otherCities = cities
    .filter((c) => c.slug !== city.slug && !nearbySlugs.includes(c.slug))
    .slice(0, 3)

  const relatedCities = [
    ...cities.filter((c) => nearbySlugs.includes(c.slug)),
    ...otherCities,
  ].slice(0, 6)

  return (
    <section className="section-padding relative bg-muted/50">
      <div className="container-custom">
        <FadeIn className="text-center mb-10">
          <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Weitere Standorte
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-[1.15]">
            B2B Akquise in{' '}
            <span className="text-primary">
              weiteren Städten
            </span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Neben {city.name} unterstützen wir Unternehmen in ganz Deutschland bei der B2B-Akquise.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedCities.map((relatedCity) => (
              <Link
                key={relatedCity.slug}
                href={`/leistungen/${relatedCity.slug}`}
                className="group relative p-4 rounded-xl border border-border bg-white transition-all duration-300 hover:bg-muted hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 text-center"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  {relatedCity.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {relatedCity.regionShort}
                </p>
                <ArrowRight className="absolute bottom-3 right-3 h-3 w-3 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 opacity-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="text-center mt-8">
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Alle Leistungen ansehen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
