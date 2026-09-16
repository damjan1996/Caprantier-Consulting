import { Metadata } from 'next'
import {
  AbgrenzungSection,
  DanachScene,
  FormularSection,
  KontaktIntro,
  TerminScene,
  WegeSection,
} from './components'
import { KONTAKT_SECTIONS } from './components/sections'
import { SectionRail } from '@/app/components/seite'
import { businessInfo } from '@/lib/local-seo'
import { generateBreadcrumbSchema } from '@/lib/schemas'
import styles from './components/kontakt.module.css'

const PAGE_URL = `${businessInfo.website}/kontakt`

/*
 * Die frühere Beschreibung arbeitete mit Häkchen („✓ Vertriebsdienstleister
 * Köln ✓ Vertrieb auslagern") und endete auf einem Ausrufezeichen. Häkchen
 * werden im Suchergebnis als Zeichenmüll ausgeliefert, und auf der ganzen
 * Website steht sonst kein einziges Ausrufezeichen (Textleitfaden § 9).
 */
export const metadata: Metadata = {
  title: 'Kontakt – B2B-Vertriebsagentur aus Köln',
  description:
    'Erstgespräch buchen, schreiben oder anrufen – die drei Wege zu Carpantier Consulting in Köln, jeweils mit Antwortzeit und dem, was mit Ihrer Nachricht passiert.',
  keywords: [
    'Kontakt Carpantier Consulting',
    'Vertriebsagentur Köln Kontakt',
    'B2B Vertrieb Beratung anfragen',
    'Erstgespräch Telefonakquise',
    'Vertrieb auslagern Kontakt',
    'Leadgenerierung Anfrage',
  ],
  openGraph: {
    title: 'Kontakt | Carpantier Consulting',
    description:
      'Erstgespräch, Nachricht oder Anruf – mit der Antwortzeit, die jeweils dahintersteht.',
    url: PAGE_URL,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

/**
 * Kontaktseite.
 *
 * Sechs Abschnitte, zwei davon als Klebe-Bühne; damit trägt die Seite die
 * Fortschrittsleiste (Baukasten § 7).
 *
 * ## Welche Frage diese Seite beantwortet
 *
 * Nicht „was können die“ (`/leistungen`) und nicht „wer sind die“
 * (`/ueber-uns`), sondern: **Wie nehme ich Kontakt auf, und was passiert
 * dann?** Der zweite Teil ist der, den Kontaktseiten üblicherweise
 * auslassen — er steht hier als eigener Abschnitt.
 *
 * ## Das Formular
 *
 * `FormularSection` ist neu eingekleidet, aber nicht neu gebaut: Feldnamen,
 * Schema (`contactRequestSchema`), Einwilligungstext, Honigtopf, die
 * Ereignisse für die Reichweitenmessung und der Endpunkt `/api/contact`
 * bleiben unverändert. Die Server-Route, ihre Ratenbegrenzung und die
 * Einwilligungsprotokollierung nach Art. 7 Abs. 1 DSGVO sind nicht angefasst.
 *
 * Entfallen ist `src/components/sections/ContactForm.tsx` — dieser Baustein
 * hatte nach dem Umbau keinen Verwender mehr und brachte eine zweite,
 * handgeschriebene Prüfung mit, die dieselben Regeln noch einmal nachbildete.
 *
 * Kein `'use client'`: Die Abschnitte bringen es selbst mit, wo sie Zustand
 * oder Scroll brauchen.
 */
export default function KontaktPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: businessInfo.website },
    { name: 'Kontakt', url: PAGE_URL },
  ])

  /*
   * `ContactPage` verweist auf die Organisation im Wurzel-Layout, statt ihre
   * Angaben zu wiederholen. Zwei Beschreibungen desselben Unternehmens im
   * Markup laufen beim ersten Umformulieren auseinander; die `@id` ist genau
   * dafür da.
   */
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${PAGE_URL}#contact`,
    url: PAGE_URL,
    name: 'Kontakt zu Carpantier Consulting',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <KontaktIntro />
      <WegeSection />
      {/* Die Abgrenzung steht vor dem Formular, nicht dahinter: Wer sich hier
          wiedererkennt, soll nicht erst tippen. Zugleich trennen Formular und
          Bühne die beiden dunklen Flächen (Designleitfaden § 2.2). */}
      <AbgrenzungSection />
      <FormularSection />
      <DanachScene />
      <TerminScene />
      <SectionRail sections={KONTAKT_SECTIONS} />
    </div>
  )
}
