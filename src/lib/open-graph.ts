import type { Metadata } from 'next'
import { businessInfo } from '@/content/local-seo'

/**
 * Grundwerte für den Open-Graph-Block jeder Seite.
 *
 * Next.js ersetzt das `openGraph` einer Unterseite vollständig, statt es mit dem
 * des Wurzel-Layouts zu verbinden. Bis zum 01.10.2026 fehlten deshalb auf zehn
 * Unterseiten Vorschaubild, Seitenname und Sprache — auf LinkedIn geteilt
 * erschienen `/kaltakquise`, `/glossar` oder `/kontakt` ohne Bild, und
 * `/ki-transparenz` und `/referenzen` gaben sich als Startseite aus (`og:url`).
 *
 * Jede Seite setzt ihren Block deshalb als
 * `{ ...OG_GRUNDWERTE, title, description, url }` und überschreibt nur, was sie
 * selbst anders hat (Bild, `type: 'article'`).
 *
 * Das Vorschaubild trägt den KI-Hinweis im Bild selbst (siehe `layout.tsx`).
 */
export const OG_GRUNDWERTE = {
  type: 'website',
  locale: 'de_DE',
  siteName: businessInfo.name,
  images: [
    {
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: `${businessInfo.name} – B2B-Vertriebsagentur aus Köln`,
    },
  ],
} satisfies NonNullable<Metadata['openGraph']>
