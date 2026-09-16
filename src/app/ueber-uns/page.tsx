import { Metadata } from 'next'
import {
  GrenzeSection,
  HausSection,
  HerkunftScene,
  TerminScene,
  UeberUnsIntro,
  ZusagenSection,
} from './components'
import { UEBER_UNS_SECTIONS } from './components/sections'
import { SectionRail } from '@/app/components/seite'
import { businessInfo } from '@/lib/local-seo'
import { generateBreadcrumbSchema } from '@/lib/schemas'
import styles from './components/ueber-uns.module.css'

const PAGE_URL = `${businessInfo.website}/ueber-uns`

/*
 * Die frühere Beschreibung arbeitete mit Häkchen („✓ Erfahrene
 * Vertriebsexperten ✓ Persönliche Betreuung ✓ Messbare Ergebnisse") und
 * Superlativen. Beides steht so nirgends auf der Seite, und die Häkchen
 * werden im Suchergebnis als Zeichenmüll ausgeliefert — dieselbe Bereinigung
 * wie beim Umbau von `/leistungen/[stadt]`.
 */
export const metadata: Metadata = {
  /* Kurz gehalten: Die Vorlage im Wurzel-Layout hängt „ | Carpantier
     Consulting" an, und ab etwa 65 Zeichen schneidet Google ab. */
  title: 'Über uns – Vertriebsagentur aus Köln',
  description:
    'Carpantier Consulting ist eine B2B-Vertriebsagentur aus Köln. Wer die Anrufe führt, woher die Arbeitsweise stammt und warum es fünf Kunden im Monat sind.',
  keywords: [
    'Carpantier Consulting',
    'B2B Vertriebsagentur Köln',
    'Vertriebsdienstleister Köln',
    'Nico-Luca Carpantier',
    'Vertriebsagentur Nordrhein-Westfalen',
    'Telefonakquise Agentur',
  ],
  openGraph: {
    title: 'Über uns | Carpantier Consulting',
    description:
      'Wer bei Carpantier Consulting telefoniert, woher die Arbeitsweise stammt und woran Sie uns messen können.',
    url: PAGE_URL,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

/**
 * „Über uns“ — wer in Ihrem Namen telefoniert.
 *
 * Sechs Abschnitte, zwei davon als Klebe-Bühne, rund vierzehn
 * Bildschirmhöhen; damit trägt die Seite die Fortschrittsleiste
 * (Baukasten § 7, beide Kriterien erfüllt).
 *
 * ## Welche Frage diese Seite beantwortet
 *
 * Nicht „was können die“ — das steht auf `/leistungen`. Hier geht es um den
 * Tausch, der dem Geschäft zugrunde liegt: Der Auftraggeber lässt jemand
 * Fremdes unter seinem Firmennamen anrufen. Die Seite beantwortet deshalb der
 * Reihe nach, wer das ist, woher die Arbeitsweise stammt, woran man sie
 * festhalten kann, wo ihre Grenze liegt und was sich nachprüfen lässt.
 *
 * ## Was von der Vorgängerfassung bewusst entfallen ist
 *
 * - **„3+ Jahre B2B“** stand als Auszeichnung im Einstieg, ohne zweite
 *   Quelle, neben „jahrelange Erfahrung“ im selben Bildschirm. Eine Zahl
 *   ohne Quelle ist schlechter als keine (Textleitfaden § 6.2).
 * - **Die vier Wertekarten** („Ergebnisorientiert“, „Partnerschaftlich“,
 *   „Kontinuierlich“, „Professionell“) sind durch vier Zusagen mit Gegenprobe
 *   ersetzt. Jeden der vier Sätze hätte ein Wettbewerber unverändert
 *   übernehmen können.
 * - **Die schwebenden Karten am Einstiegsbild** („Leidenschaft“, „Erfahrung“)
 *   trugen dunklen Text auf halbdurchsichtigem Grund und lagen damit bei
 *   1,52:1 Kontrast — weit unter der Schwelle von 4,5:1.
 *
 * Kein `'use client'`: Die Abschnitte bringen es selbst mit, wo sie Zustand
 * oder Scroll brauchen.
 */
export default function UeberUnsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: businessInfo.website },
    { name: 'Über uns', url: PAGE_URL },
  ])

  /*
   * `AboutPage` verweist auf die Organisation im Wurzel-Layout statt ihre
   * Angaben zu wiederholen. Zwei Beschreibungen desselben Unternehmens im
   * Markup laufen beim ersten Umformulieren auseinander; die `@id` ist genau
   * dafür da.
   */
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${PAGE_URL}#about`,
    url: PAGE_URL,
    name: 'Über Carpantier Consulting',
    inLanguage: 'de-DE',
    mainEntity: { '@id': `${businessInfo.website}/#organization` },
  }

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <UeberUnsIntro />
      <HerkunftScene />
      <ZusagenSection />
      <GrenzeSection />
      {/* „Das Unternehmen" steht zwischen den beiden dunklen Flächen: Die
          Grenzkarte und der Abschluss dürfen nicht aneinandergrenzen
          (Designleitfaden § 2.2). */}
      <HausSection />
      <TerminScene />
      <SectionRail sections={UEBER_UNS_SECTIONS} />
    </div>
  )
}
