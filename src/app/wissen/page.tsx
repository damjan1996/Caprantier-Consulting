import { Metadata } from 'next'
import {
  AbschlussScene,
  BegriffeSection,
  BeitraegeSection,
  HaltungScene,
  VideosSection,
  WissenIntro,
} from './components'
import { WISSEN_SECTIONS } from './components/sections'
import { SectionRail } from '@/app/components/seite'
import { getBlogPostPreviews } from '@/lib/blog'
import { glossarBegriffe } from '@/lib/glossar-content'
import { getVideos } from '@/lib/youtube'
import { businessInfo } from '@/lib/local-seo'
import { generateBreadcrumbSchema } from '@/lib/schemas'
import styles from './components/wissen.module.css'

const PAGE_URL = `${businessInfo.website}/wissen`

/** So lange wird eine gelesene Antwort des Kanal-Feeds wiederverwendet. */
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Wissen | B2B-Vertrieb, Kaltakquise & Leadgenerierung',
  description:
    'Fachartikel, Videos und Begriffserklärungen rund um B2B-Vertrieb, Telefonakquise und Leadgenerierung — gebündelt an einer Stelle.',
  keywords: [
    'B2B Vertrieb Wissen',
    'Kaltakquise Ratgeber',
    'Vertrieb Glossar',
    'Leadgenerierung Tipps',
  ],
  openGraph: {
    title: 'Wissen | B2B-Vertrieb, Kaltakquise & Leadgenerierung',
    description:
      'Fachartikel, Videos und Begriffserklärungen rund um B2B-Vertrieb und Telefonakquise.',
    url: PAGE_URL,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

/**
 * Einstieg in alle Inhalte: Beiträge, Videos und Begriffe.
 *
 * Die Seite bündelt nur — sie zieht nichts um. Blog und Glossar behalten ihre
 * Adressen `/blog` und `/glossar`, weil beide seit Langem indexiert sind. Ein
 * Umzug nach `/wissen/…` würde die Platzierungen dieser Seiten aufgeben, ohne
 * dass etwas gewonnen wäre.
 *
 * Aufgebaut als Familien-Einstieg (Designleitfaden § 9.1): sechs Abschnitte,
 * zwei davon als Klebe-Bühne, rund dreizehn Bildschirmhöhen. Der Wegweiser —
 * die Beitragsliste — steht weit oben, weil eine Übersicht nicht gelesen,
 * sondern benutzt wird.
 *
 * Die Reihenfolge folgt der Frage, mit der jemand hier ankommt: Was gibt es
 * (Beiträge, Videos, Begriffe) — warum soll ich dem glauben (Haltung) — und
 * dann der Abschluss.
 *
 * Kein `'use client'`: Die Abschnitte bringen es selbst mit, wo sie Zustand
 * oder Scroll brauchen. Die beiden Datenquellen — der Kanal-Feed und die
 * Beitragsvorschauen — werden hier serverseitig geholt und als Eigenschaften
 * weitergereicht.
 */
export default async function WissenPage() {
  const [videos, posts] = await Promise.all([getVideos(3), Promise.resolve(getBlogPostPreviews())])

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: businessInfo.website },
    { name: 'Wissen', url: PAGE_URL },
  ])

  return (
    <div className={styles.page}>
      {/* Brotkrumen, wie sie im Einstieg auch sichtbar stehen. Weiteres
          Markup gibt es hier bewusst nicht: Die Beiträge tragen ihr eigenes
          auf `/blog/[slug]`, das Glossar sein `DefinedTermSet` auf `/glossar`
          und die Videos ihr `VideoObject` auf `/wissen/videos`. Eine zweite
          Auszeichnung derselben Inhalte an dieser Stelle wäre eine Dopplung
          ohne Gewinn. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <WissenIntro beitraege={posts.length} begriffe={glossarBegriffe.length} />
      <BeitraegeSection posts={posts} />
      <VideosSection videos={videos} />
      <BegriffeSection />
      <HaltungScene />
      <AbschlussScene />
      <SectionRail sections={WISSEN_SECTIONS} />
    </div>
  )
}
