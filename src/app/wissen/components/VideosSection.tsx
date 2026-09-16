'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { YouTubeVideo } from '@/lib/youtube'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './wissen.module.css'

/**
 * Die neuesten Videos — drei Karten mit Vorschaubild.
 *
 * Die Vorschaubilder kommen über den eigenen Server (`/api/youtube/thumbnail`),
 * nicht von `i.ytimg.com`: Ein Bild direkt von Google wäre ein Abruf an einen
 * Dritten, bevor jemand zugestimmt hat.
 *
 * Alle Karten führen auf `/wissen/videos` und **nicht** zu YouTube. Dort steht
 * der Abspieler, der erst nach der Einwilligung lädt; ein Verweis nach
 * youtube.com würde genau an dieser Einwilligung vorbeiführen.
 *
 * Ohne `quality` an `next/image`: Ein Wert, der nicht in
 * `next.config.js → images.qualities` steht, lässt Next den Vorlade-Hinweis
 * mit einer anderen Qualität erzeugen als das Bild selbst — das Bild wird
 * dann zweimal geladen (Baukasten § 8.4).
 */

/** Wie viele Videos hier stehen. Der Rest steht auf `/wissen/videos`. */
const ANZAHL = 3

function datum(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function VideosSection({ videos }: { videos: YouTubeVideo[] }) {
  const { ref, isIn } = useReveal<HTMLElement>()
  const neueste = videos.slice(0, ANZAHL)

  return (
    <section id="videos" ref={ref} className={styles.section} aria-labelledby="videos-title">
      <div className={styles.listHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Videos vom Kanal
        </div>

        <h2
          id="videos-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Manches zeigt man besser, als man es beschreibt.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Kurze Aufnahmen aus der laufenden Arbeit: was am Telefon trägt und was nicht. Abgespielt
          wird erst nach Ihrer Zustimmung – vorher lädt YouTube nichts.
        </p>
      </div>

      {neueste.length > 0 ? (
        <div
          className={`${styles.videoGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
        >
          {neueste.map((video) => (
            <Link key={video.id} href="/wissen/videos" className={styles.videoCard}>
              <span className={styles.videoBild}>
                <Image
                  src={video.thumbnailUrl}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px"
                />
              </span>
              <h3 className={styles.videoTitel}>{video.title}</h3>
              <span className={styles.videoDatum}>{datum(video.published)}</span>
            </Link>
          ))}
        </div>
      ) : (
        /* Der Kanal-Feed antwortet nicht. Kein Fehler — nur der Weg dorthin.
           Der Abschnitt bleibt stehen, damit die Fortschrittsleiste und der
           Aufbau der Seite sich nicht je nach Netzlage ändern. */
        <p
          className={`${styles.videoLeer} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.22s' } as React.CSSProperties}
        >
          Die Videoliste lässt sich gerade nicht laden. Auf der Videoseite steht sie vollständig,
          sobald der Kanal wieder antwortet.
        </p>
      )}

      <div
        className={`${styles.listFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.3s' } as React.CSSProperties}
      >
        <Link href="/wissen/videos" className={styles.textLink}>
          Alle Videos
        </Link>
      </div>
    </section>
  )
}
