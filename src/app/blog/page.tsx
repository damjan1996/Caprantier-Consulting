import { Metadata } from 'next'
import { PageWrapper } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { getBlogPostPreviews, getAllCategories } from '@/lib/blog'
import BlogGrid from './components/BlogGrid'

export const metadata: Metadata = {
  title: 'Blog | B2B Vertrieb, Kaltakquise & Leadgenerierung | Carpantier Consulting',
  description: 'B2B Vertriebswissen: Kaltakquise Tipps, Leadgenerierung Strategien, Vertriebsoutsourcing, BANT-Methode, Einwandbehandlung. 50+ Fachartikel von Vertriebsprofis aus Köln.',
  keywords: [
    'B2B Vertrieb Blog',
    'Kaltakquise Tipps',
    'Leadgenerierung B2B',
    'Vertriebsoutsourcing',
    'Telefonakquise Leitfaden',
    'BANT-Methode',
    'SDR as a Service',
    'Vertrieb auslagern',
    'Einwandbehandlung',
    'Sales Blog Deutschland',
    'B2B Akquise Strategien',
    'Neukundengewinnung',
    'Cold Calling Tipps',
    'Vertriebsagentur Blog',
  ],
  openGraph: {
    title: 'B2B Vertrieb Blog | Kaltakquise, Leadgenerierung & mehr',
    description: 'Praxiswissen zu B2B Vertrieb, Kaltakquise und Leadgenerierung. 50+ Fachartikel von erfahrenen Vertriebsprofis.',
    url: 'https://carpantier-consulting.de/blog',
    type: 'website',
    siteName: 'Carpantier Consulting',
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
            <Breadcrumbs items={[{ label: 'Blog' }]} />
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
