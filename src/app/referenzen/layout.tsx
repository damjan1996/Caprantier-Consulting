import { Metadata } from 'next'
import { enthaeltBeispiele } from '@/content/case-studies'
import { businessInfo } from '@/content/local-seo'
import { OG_GRUNDWERTE } from '@/lib/open-graph'

const PAGE_URL = `${businessInfo.website}/referenzen`

/**
 * Metadaten der Fallstudienseite.
 *
 * Die `robots`-Angabe ist an den Datenbestand gekoppelt, nicht handgesetzt:
 * Solange `caseStudies` ein Blindmuster enthält, steht die Seite auf
 * `noindex`. Erst wenn ausschließlich echte, schriftlich freigegebene Fälle
 * darin stehen, wird sie indexierbar. `scripts/check-compliance.mjs` prüft
 * genau diese Kopplung -- eine Seite mit erfundenen Zahlen im Index war der
 * Grund, aus dem die Vorgängerseite unter /case-studies entfernt werden musste.
 */
export const metadata: Metadata = {
  title: 'Referenzen und Fallstudien',
  description:
    'Dokumentierte Ergebnisse aus abgeschlossenen Akquiseprojekten: Ausgangslage, Vorgehen, Zahlen. Veröffentlicht wird ausschließlich, was der Kunde schriftlich freigegeben hat.',
  robots: enthaeltBeispiele()
    ? { index: false, follow: true }
    : { index: true, follow: true },
  openGraph: {
    ...OG_GRUNDWERTE,
    title: 'Referenzen und Fallstudien | Carpantier Consulting',
    description: 'Dokumentierte Ergebnisse aus abgeschlossenen Akquiseprojekten – veröffentlicht nur mit schriftlicher Freigabe.',
    url: PAGE_URL,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

export default function ReferenzenLayout({ children }: { children: React.ReactNode }) {
  return children
}
