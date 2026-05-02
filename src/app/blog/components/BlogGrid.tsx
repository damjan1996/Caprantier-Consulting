'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { BlogPostPreview } from '@/lib/blog'
import { getBlogImage } from '@/lib/blog-images'

const POSTS_PER_PAGE = 12

interface BlogGridProps {
  posts: BlogPostPreview[]
  categories: string[]
}

export default function BlogGrid({ posts, categories }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  // Scroll to top when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Categories */}
      <section className="pb-8">
        <div className="container-custom">
          <FadeIn delay={0}>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
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
                  onClick={() => setSelectedCategory(category)}
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
              {paginatedPosts.map((post, index) => (
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
                            loading={index < 6 ? 'eager' : 'lazy'}
                            priority={index < 3}
                          />
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-muted disabled:hover:text-muted-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Zurück
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first, last, current, and adjacent pages
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1

                  // Show ellipsis
                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span key={page} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    )
                  }

                  if (!showPage) return null

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors duration-150 ${
                        currentPage === page
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'border border-border bg-muted text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-muted disabled:hover:text-muted-foreground"
              >
                Weiter
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Results Info */}
          {filteredPosts.length > 0 && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {startIndex + 1}–{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} von {filteredPosts.length} Artikeln
            </p>
          )}
        </div>
      </section>
    </>
  )
}
