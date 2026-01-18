import { Metadata } from 'next'
import { PageWrapper } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { getBlogPostPreviews, getAllCategories } from '@/lib/blog'
import BlogGrid from './components/BlogGrid'

export const metadata: Metadata = {
  title: 'Blog | Vertrieb & B2B Akquise Wissen | Carpantier Consulting',
  description: 'Praxiswissen zu Vertrieb, B2B Kaltakquise, Leadgenerierung und Vertriebsoutsourcing. Tipps und Strategien von Vertriebsprofis.',
  keywords: [
    'Vertrieb Blog',
    'B2B Akquise Tipps',
    'Kaltakquise Leitfaden',
    'Leadgenerierung Strategien',
    'Vertriebsoutsourcing',
    'Sales Blog',
  ],
  openGraph: {
    title: 'Blog | Vertrieb & B2B Akquise Wissen',
    description: 'Praxiswissen zu Vertrieb, B2B Kaltakquise und Leadgenerierung.',
    url: 'https://carpantier-consulting.de/blog',
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/blog',
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
              Vertriebswissen für{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
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
