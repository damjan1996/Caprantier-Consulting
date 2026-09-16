import { Metadata } from 'next'
import { enthaeltBeispiele } from '@/lib/case-studies'
import { businessInfo } from '@/lib/local-seo'

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
  alternates: {
    canonical: PAGE_URL,
  },
}

export default function ReferenzenLayout({ children }: { children: React.ReactNode }) {
  return children
}
