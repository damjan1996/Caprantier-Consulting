'use client'

import Link from 'next/link'
import type { BlogPostPreview } from '@/lib/blog'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './wissen.module.css'

/**
 * Die neuesten Beiträge — als Zeilenliste, nicht als Kachelfeld.
 *
 * Man überfliegt hier Titel, keine Bilder. Eine Liste macht das in einem
 * Blick; drei Kachelreihen zwingen den Blick in Schlangenlinien. Und weil
 * gleich darunter die Videokarten und das Begriffsfeld folgen, braucht dieser
 * Abschnitt eine andere Textur (siehe Kopfkommentar im Stylesheet).
 *
 * Keine Bühne: Beiträge sind zum Nachschlagen da, nicht in einer Reihenfolge
 * zu lesen (Designleitfaden § 5.2).
 */

/** Wie viele Beiträge hier stehen. Der Rest steht auf `/blog`. */
const ANZAHL = 6

export default function BeitraegeSection({ posts }: { posts: BlogPostPreview[] }) {
  const { ref, isIn } = useReveal<HTMLElement>()

  const neueste = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, ANZAHL)

  return (
    <section id="beitraege" ref={ref} className={styles.section} aria-labelledby="beitraege-title">
      <div className={styles.listHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Beiträge
        </div>

        <h2
          id="beitraege-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Ein Thema, ein Beitrag. Dafür einer, der es zu Ende bringt.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Jeder Text beantwortet eine Frage vollständig – mit Zahlen, Beispielen und dem, was
          nicht funktioniert hat. Die Lesezeit steht dran.
        </p>
      </div>

      <div
        className={`${styles.postList} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
      >
        {neueste.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postRow}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <span className={styles.postMeta}>
              <span>{post.category}</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>{post.readingTime}</span>
            </span>
            <p className={styles.postText}>{post.description}</p>
          </Link>
        ))}
      </div>

      <div
        className={`${styles.listFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.3s' } as React.CSSProperties}
      >
        <Link href="/blog" className={styles.textLink}>
          Alle {posts.length} Beiträge
        </Link>
      </div>
    </section>
  )
}
