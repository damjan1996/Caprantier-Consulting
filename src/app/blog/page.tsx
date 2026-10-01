import { Metadata } from 'next'
import PageWrapper from '@/components/ui/PageWrapper'
import FadeIn from '@/components/ui/FadeIn'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { getBlogPostPreviews, getAllCategories, getAllBlogSlugs } from '@/lib/blog'
import BlogGrid from './_components/BlogGrid'
import { OG_GRUNDWERTE } from '@/lib/open-graph'

/*
 * Die Anzahl wird gezählt, nicht behauptet. Bis zum 01.10.2026 versprach die
 * Beschreibung „50+ Fachartikel“ — seit der Zusammenführung am 10.09.2026 sind
 * es dreizehn, und das Suchergebnis widersprach der Seite, auf die es führte.
 */
const BEITRAEGE = getAllBlogSlugs().length

export const metadata: Metadata = {
  title: 'Blog: B2B-Vertrieb und Kaltakquise',
  description: `${BEITRAEGE} Fachbeiträge zu B2B-Kaltakquise, Leadgenerierung und Vertriebsoutsourcing: Rechtsrahmen, Gesprächsführung, Kosten und Kennzahlen – ohne Anmeldung.`,
  openGraph: {
    ...OG_GRUNDWERTE,
    title: 'Blog: B2B-Vertrieb und Kaltakquise | Carpantier Consulting',
    description: `${BEITRAEGE} Fachbeiträge zu Kaltakquise, Leadgenerierung und Vertriebsoutsourcing – aus der Praxis, ohne Anmeldung.`,
    url: 'https://carpantier-consulting.de/blog',
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlogPage() {
  const categories = getAllCategories()
  const posts = getBlogPostPreviews()

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <FadeIn className="mb-6">
            <Breadcrumbs items={[{ label: 'Wissen', href: '/wissen' }, { label: 'Blog' }]} />
          </FadeIn>

          <FadeIn className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              Blog
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
              Vertriebswissen für{' '}
              <span className="text-primary">
                B2B-Profis
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Praxistipps, Strategien und Insights zu Kaltakquise, Leadgenerierung und Vertriebsoutsourcing.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filterable Blog Grid */}
      <BlogGrid posts={posts} categories={categories} />
    </PageWrapper>
  )
}
