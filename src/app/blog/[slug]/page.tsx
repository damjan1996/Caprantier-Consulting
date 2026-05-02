import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react'
import { PageWrapper } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import { getBlogPostBySlug, getAllBlogSlugs, blogPosts, BlogPost } from '@/lib/blog'
import { getBlogImage } from '@/lib/blog-images'
import { generateBlogPostSchema, generateBreadcrumbSchema, generateBlogFAQSchema } from '@/lib/schemas'
import Markdown from '@/components/ui/Markdown'
import BlogIllustration from './BlogIllustration'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artikel nicht gefunden | Carpantier Consulting',
    }
  }

  return {
    title: `${post.title} | Carpantier Consulting Blog`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://carpantier-consulting.de/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [{
        url: `https://carpantier-consulting.de${post.image}`,
        width: 1200,
        height: 675,
        alt: post.title,
      }] : undefined,
    },
    alternates: {
      canonical: `https://carpantier-consulting.de/blog/${post.slug}`,
    },
  }
}

// Related posts (excluding current)
function getRelatedPosts(currentSlug: string, category: string): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => p.category === category || p.featured)
    .slice(0, 2)
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, post.category)

  // Schema.org structured data
  const articleSchema = generateBlogPostSchema(post)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://carpantier-consulting.de' },
    { name: 'Blog', url: 'https://carpantier-consulting.de/blog' },
    { name: post.title, url: `https://carpantier-consulting.de/blog/${post.slug}` },
  ])
  const faqSchema = post.faqs ? generateBlogFAQSchema(post.faqs) : null

  return (
    <PageWrapper>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zum Blog
            </Link>

            {/* Category */}
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">{post.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-[1.2]">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime} Lesezeit
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Header Image */}
      {getBlogImage(post.slug) && (
        <section className="pb-8">
          <div className="container-custom">
            <FadeIn delay={0} className="max-w-4xl mx-auto">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border">
                <Image
                  src={getBlogImage(post.slug)!}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                  placeholder="blur"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Illustration Section (fallback if no image) */}
      {post.illustration && !getBlogImage(post.slug) && (
        <section className="pb-8">
          <div className="container-custom">
            <FadeIn delay={0} className="max-w-4xl mx-auto">
              <div className="rounded-2xl border border-border bg-muted p-4 md:p-8 overflow-hidden">
                <BlogIllustration name={post.illustration} />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="pb-16">
        <div className="container-custom">
          <FadeIn delay={0} className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <Markdown content={post.content} />
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-50 border-t border-border">
          <div className="container-custom">
            <FadeIn className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-6">Weitere Artikel</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group p-5 rounded-xl border border-border bg-white md:hover:bg-muted md:hover:border-primary/30 transition-colors duration-150"
                  >
                    <span className="text-xs text-primary font-medium">{relatedPost.category}</span>
                    <h3 className="text-base font-semibold text-foreground mt-2 md:group-hover:text-primary md:transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="section-padding bg-gray-50 border-t border-border">
          <div className="container-custom">
            <FadeIn className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-6">Häufig gestellte Fragen</h2>
              <div className="space-y-4">
                {post.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl border border-border bg-white"
                  >
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <div className="p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Bereit für mehr qualifizierte Termine?
              </h2>
              <p className="text-muted-foreground mb-6">
                Erfahren Sie in einem kostenlosen Strategiegespräch, wie wir Ihren Vertrieb auf das
                nächste Level bringen.
              </p>
              <Link
                href="/kontakt"
                className="btn-primary inline-flex items-center gap-2"
              >
                Kostenlos beraten lassen
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
