import { MetadataRoute } from 'next'
import { cities } from '@/lib/cities'
import { blogPosts } from '@/lib/blog'
import { industryPages } from '@/lib/industries'
import { businessInfo } from '@/lib/local-seo'
import { enthaeltBeispiele } from '@/lib/case-studies'

/**
 * Sitemap.
 *
 * Drei Regeln, die `scripts/check-sitemap.mjs` bei jedem `pnpm verify` prüft:
 *
 * 1. **Keine umgeleitete Adresse.** Die 43 am 10.09.2026 zusammengeführten
 *    Blog-Slugs antworten mit 301. Stünden sie hier, meldete die Search
 *    Console für jede von ihnen einen Fehler und würde der Sitemap insgesamt
 *    weniger vertrauen. Weil die Blogliste aus `blogPosts` entsteht, kann das
 *    gar nicht erst passieren -- geprüft wird es trotzdem.
 * 2. **Keine Seite auf `noindex`.** `/referenzen` steht auf `noindex`, solange
 *    dort ein Blindmuster liegt. Eine Adresse, die man Google anbietet und
 *    gleichzeitig verbietet, ist ein Widerspruch im eigenen Signal.
 * 3. **`lastModified` nur dort, wo ein echtes Inhaltsdatum dahintersteht.**
 *    Siehe unten.
 *
 * ## Warum die meisten Einträge kein `lastModified` tragen (AP-1.4)
 *
 * Bis zum 12.09.2026 setzte diese Datei für die Startseite, alle Stadt-,
 * Branchen- und Übrigenseiten `lastModified: new Date()` -- also bei jedem
 * Build "gerade eben", unabhängig davon, ob sich am Inhalt etwas geändert
 * hatte. Das ist kein neutraler Platzhalter, sondern eine Falschangabe an
 * Google, und sie fällt in eine Kategorie, die Google ausdrücklich als
 * Warnzeichen führt:
 *
 *   "Are you changing the date of pages to make them seem fresh when the
 *    content has not substantially changed?"
 *   -- developers.google.com/search/docs/fundamentals/creating-helpful-content
 *
 * Dazu die Vorgabe aus der Dokumentation zu Veröffentlichungsdaten: sichtbare
 * und strukturierte Datumsangaben müssen übereinstimmen. Ein Build-Datum
 * stimmt mit nichts überein, was auf der Seite steht.
 *
 * Deshalb gilt: **Kein Datum ist besser als ein falsches.** `lastModified`
 * steht nur an den Fachbeiträgen, weil dort mit `post.updatedAt` ein echtes,
 * gepflegtes Inhaltsdatum existiert. Alle anderen Routen lassen das Feld weg,
 * bis es für sie ebenfalls eines gibt. `changeFrequency` und `priority`
 * bleiben -- das sind Hinweise, keine Tatsachenbehauptungen.
 *
 * Wer später ein echtes Datum ergänzt, pflegt es im jeweiligen Datenmodul
 * (`cities.ts`, `industries.ts`) und reicht es von dort durch. Nicht hier
 * hart eintragen: eine Zahl in dieser Datei veraltet, ohne dass es jemand
 * merkt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = businessInfo.website

  // `/leistungen/[stadt]` -- Begriffsfamilie "Vertrieb / Vertriebsagentur"
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/leistungen/${city.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // `/kaltakquise/[stadt]` -- Begriffsfamilie "Kaltakquise / Telefonakquise"
  const kaltakquiseCityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/kaltakquise/${city.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const industryDetailPages: MetadataRoute.Sitemap = industryPages.map((industry) => ({
    url: `${baseUrl}/branchen/${industry.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Einziger Seitentyp mit echtem Inhaltsdatum.
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // `/referenzen` gehört nur in die Sitemap, wenn die Seite auch indexierbar
  // ist -- also erst, wenn dort ausschliesslich echte, freigegebene Fälle
  // stehen.
  const referenzenPages: MetadataRoute.Sitemap = enthaeltBeispiele()
    ? []
    : [
        {
          url: `${baseUrl}/referenzen`,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        },
      ]

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/leistungen`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kaltakquise`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/branchen`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    ...cityPages,
    ...kaltakquiseCityPages,
    ...industryDetailPages,
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPages,
    ...referenzenPages,
    {
      url: `${baseUrl}/wissen`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wissen/videos`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ueber-uns`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossar`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/impressum`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ki-transparenz`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
