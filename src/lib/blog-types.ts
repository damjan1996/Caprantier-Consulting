/**
 * Typen der Fachbeiträge.
 *
 * Bewusst getrennt von `blog.ts`: Die Beitragsdateien unter `src/content/blog/`
 * brauchen den Typ, und `blog.ts` braucht die Beiträge. Stünden die Typen in
 * `blog.ts`, entstünde ein Importzyklus zwischen Index und Inhalt -- für den
 * TypeScript-Compiler harmlos, für jedes Werkzeug, das die Dateien einzeln
 * lädt (etwa `scripts/blog-audit.mjs`), nicht.
 */

export interface BlogPostFAQ {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  author: string
  publishedAt: string
  updatedAt: string
  category: string
  tags: string[]
  featured: boolean
  /** Optional: Name der Illustration-Komponente für den Artikel */
  illustration?: string
  /** Bild für den Artikel (Header-Bild) */
  image?: string
  /**
   * FAQ-Sektion für Featured Snippets.
   *
   * Kein optionales Feld: `scripts/blog-audit.mjs` verlangt mindestens drei
   * Einträge je Beitrag. Vor dem Umbau am 10.09.2026 hatten 5 von 52 Beiträgen
   * einen FAQ-Block -- und genau solche Blöcke sind das, was in KI-Antworten
   * und Featured Snippets zitiert wird.
   */
  faqs: BlogPostFAQ[]
}

/** Leichtgewichtige Version für die Blog-Übersicht (ohne Content). */
export interface BlogPostPreview {
  slug: string
  title: string
  description: string
  author: string
  publishedAt: string
  readingTime: string
  category: string
  featured: boolean
}
