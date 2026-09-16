// Blog-Artikel: Index, Ableitungen und Hilfsfunktionen.
//
// Die Beiträge selbst liegen als je eine Datei unter `src/content/blog/`, die
// Typen in `src/lib/blog-types.ts`.
//
// Bis zum 10.09.2026 standen alle 52 Beiträge als Template-Literale in dieser
// Datei -- 8.287 Zeilen, in denen ein einzelner falscher Backtick den gesamten
// Blog zerlegt. Nach der Zusammenführung auf 13 belastbare Beiträge ist der
// Text pro Beitrag deutlich länger; in einer Datei wären es wieder über 4.000
// Zeilen. Eine Datei je Beitrag hält Diffs lesbar und macht sichtbar, welcher
// Beitrag sich geändert hat.

import { blogPosts } from '@/content/blog'
import type { BlogPost } from '@/lib/blog-types'

export type { BlogPost, BlogPostFAQ, BlogPostPreview } from '@/lib/blog-types'
export { blogPosts }

/** Lesegeschwindigkeit für Fachtexte. Konservativ gewählt, eher zu langsam als zu schnell. */
const WOERTER_PRO_MINUTE = 200

/**
 * Zählt die tatsächlich gelesenen Wörter eines Markdown-Textes.
 *
 * Markdown-Auszeichnung zählt nicht mit: Rauten, Tabellenstriche, Listenpunkte
 * und Link-Ziele sind Syntax. Der Linktext dagegen wird gelesen und zählt.
 */
export function countContentWords(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\s*\|[\s:|-]+\|\s*$/gm, ' ')
    .replace(/\[([^\]]*)\]\([^)\s]+\)/g, '$1')
    .replace(/[#>*_`|]/g, ' ')
    .replace(/^\s*[-+]\s+/gm, ' ')
    .replace(/^\s*\d+\.\s+/gm, ' ')

  return text.split(/\s+/).filter((wort) => /[\p{L}\p{N}]/u.test(wort)).length
}

/**
 * Lesezeit aus der tatsächlichen Textlänge.
 *
 * Bis zum 10.09.2026 war `readingTime` ein handgesetztes Feld im Datensatz.
 * Ein Beitrag mit 430 Wörtern behauptete `12 min` -- eine Angabe, die jeder
 * Leser in unter zwei Minuten widerlegt, auf einer Seite, die Vertrauen
 * verkauft. Das Feld gibt es deshalb nicht mehr; die Zeit wird gerechnet.
 */
export function getReadingTime(post: Pick<BlogPost, 'content'>): string {
  const minuten = Math.max(1, Math.ceil(countContentWords(post.content) / WOERTER_PRO_MINUTE))
  return `${minuten} min`
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug)
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))]
}

/** Nur die für die Übersicht nötigen Felder, ohne den vollständigen Text. */
export function getBlogPostPreviews() {
  return blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    author: post.author,
    publishedAt: post.publishedAt,
    readingTime: getReadingTime(post),
    category: post.category,
    featured: post.featured,
  }))
}

/**
 * Beiträge, die thematisch zu einem gegebenen passen.
 *
 * Vorher lieferte diese Auswahl auf `/blog/[slug]` die ersten beiden Treffer
 * aus Kategorie oder `featured` -- in der Praxis fast immer dieselben zwei
 * Beiträge. Dadurch bekamen einzelne Beiträge gar keinen eingehenden Link,
 * was §7.1 des Auftrags "Sichtbarkeit" ausdrücklich verbietet. Jetzt
 * entscheiden gemeinsame Tags, dann die Kategorie, dann die Reihenfolge --
 * und `scripts/check-internal-links.mjs` prüft, dass am Ende jeder Beitrag
 * von mindestens zwei anderen Seiten erreichbar ist.
 */
export function getRelatedPosts(currentSlug: string, anzahl = 3): BlogPost[] {
  const aktuell = getBlogPostBySlug(currentSlug)
  if (!aktuell) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      punkte:
        post.tags.filter((tag) => aktuell.tags.includes(tag)).length * 2 +
        (post.category === aktuell.category ? 1 : 0),
    }))
    .sort((a, b) => b.punkte - a.punkte)
    .slice(0, anzahl)
    .map(({ post }) => post)
}
