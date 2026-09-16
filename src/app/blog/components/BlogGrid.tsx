'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { BlogPostPreview } from '@/lib/blog'
import { getBlogImage } from '@/lib/blog-images'
import { AiGeneratedBadge, AI_GENERATED_MEDIA_ATTRS } from '@/components/ui'

interface BlogGridProps {
  posts: BlogPostPreview[]
  categories: string[]
}

/**
 * Übersicht der Fachbeiträge mit Filter nach Kategorie.
 *
 * Hier stand bis zum 10.09.2026 eine Paginierung mit zwölf Beiträgen pro
 * Seite, deren Seitenzahl ausschließlich in React-State lebte. Es gab keine
 * URL für Seite 2 und keinen Verweis, dem ein Crawler hätte folgen können --
 * im ausgelieferten HTML standen damit 12 von 52 Artikel-Links, und die
 * übrigen 40 waren nur über die Sitemap erreichbar. Keiner dieser 40 Beiträge
 * war indexiert; alle vier indexierten standen auf Seite 1. Der Befund steht
 * in `docs/ap1-indexierung-befund.md`.
 *
 * Deshalb rendert die Übersicht jetzt alle Beiträge. Der Kategoriefilter
 * blendet nur aus, was bereits im HTML steht -- Googlebot sieht die
 * vollständige Liste, unabhängig davon, welcher Filter aktiv ist.
 *
 * Sollte der Bestand einmal so wachsen, dass eine Seite unzumutbar wird, darf
 * die Paginierung nur mit echten Adressen zurückkommen (`/blog/seite/2`), die
 * serverseitig gerendert und untereinander verlinkt sind. Ein reiner
 * State-Wechsel nimmt den Beiträgen wieder ihre einzige Verlinkung.
 */
export default function BlogGrid({ posts, categories }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts

  const selectCategory = (category: string | null) => {
    setSelectedCategory(category)
  }

  return (
    <>
      {/* Categories */}
      <section className="pb-8">
        <div className="container-custom">
          <FadeIn delay={0}>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => selectCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
                  selectedCategory === null
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-muted text-muted-foreground border border-border hover:bg-muted hover:text-foreground'
                }`}
              >
                Alle Artikel
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => selectCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
                    selectedCategory === category
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'bg-muted text-muted-foreground border border-border hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Keine Artikel in dieser Kategorie gefunden.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <FadeIn
                  key={post.slug}
                  delay={index < 6 ? Math.min(index * 0.03, 0.15) : 0}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="relative h-full rounded-2xl border border-border bg-white transition-[background-color,border-color] duration-200 hover:bg-muted hover:border-primary/30 md:hover:shadow-xl md:hover:shadow-primary/5 md:hover:-translate-y-1 md:transition-all overflow-hidden">
                      {/* Image */}
                      {getBlogImage(post.slug) && (
                        <div className="relative w-full aspect-[16/9] overflow-hidden">
                          <Image
                            src={getBlogImage(post.slug)!}
                            alt={post.title}
                            fill
                            className="object-cover md:transition-transform md:duration-300 md:group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            placeholder="blur"
                            {...AI_GENERATED_MEDIA_ATTRS}
                            loading={index < 6 ? 'eager' : 'lazy'}
                            priority={index < 3}
                          />
                          {/* Transparenzhinweis nach Art. 50 Abs. 4 KI-VO.
                              `linked={false}`: die Karte ist bereits ein Link. */}
                          <AiGeneratedBadge corner="bottom-left" size="sm" linked={false} />
                          {/* Featured Badge */}
                          {post.featured && (
                            <div className="absolute top-3 right-3">
                              <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-full backdrop-blur-xs">
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
                        <h2 className="text-xl font-bold text-foreground mb-3 md:group-hover:text-primary md:transition-colors line-clamp-2">
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
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground md:group-hover:text-primary md:transition-colors">
                          Weiterlesen
                          <ArrowRight className="h-4 w-4 md:transition-transform md:group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}

          {/* Results Info */}
          {filteredPosts.length > 0 && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'Artikel' : 'Artikel'}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
