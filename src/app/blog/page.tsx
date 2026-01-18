import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { PageWrapper } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { blogPosts, getAllCategories } from '@/lib/blog'
import { getBlogImage } from '@/lib/blog-images'

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

      {/* Categories */}
      <section className="pb-8">
        <div className="container-custom">
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30 transition-all hover:bg-primary/30"
              >
                Alle Artikel
              </Link>
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-white/70 border border-white/10 transition-all hover:bg-white/10 hover:text-white cursor-default"
                >
                  {category}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="relative h-full rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
                    {/* Image */}
                    {getBlogImage(post.slug) && (
                      <div className="relative w-full aspect-[16/9] overflow-hidden">
                        <Image
                          src={getBlogImage(post.slug)!}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                        />
                        {/* Featured Badge */}
                        {post.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-full backdrop-blur-sm">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="text-sm text-primary font-medium">{post.category}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </span>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-primary transition-colors">
                      Weiterlesen
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
