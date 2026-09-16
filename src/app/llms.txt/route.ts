import { businessInfo } from '@/lib/local-seo'
import { cities } from '@/lib/cities'
import { blogPosts } from '@/lib/blog'
import { industryPages } from '@/lib/industries'

/**
 * `/llms.txt` -- die Kurzfassung dieser Website für Sprachmodelle.
 *
 * Google wertet die Datei nicht aus; sie ist kein Ranking-Hebel. Sie ist
 * Parität mit fünf Wettbewerbern (shark-byte, triveo, asconcepts, vertriebwerk,
 * crowndirect), die alle eine haben, und sie gibt einem Modell, das die Domain
 * abruft, eine geordnete Einstiegsliste statt einer gerenderten Startseite.
 *
 * Bewusst als Route und nicht als Datei unter `public/`: Der Inhalt entsteht
 * aus `businessInfo`, `cities`, `industryPages` und `blogPosts`. Eine
 * abgetippte Fassung wäre nach dem ersten neuen Artikel falsch, und die NAP-
 * Daten dürfen im Projekt nur eine Quelle haben.
 */

export const dynamic = 'force-static'

const BASE_URL = businessInfo.website

function link(path: string, label: string, note: string): string {
  return `- [${label}](${BASE_URL}${path}): ${note}`
}

function buildLlmsTxt(): string {
  const { address, owner } = businessInfo

  const sections: string[] = [
    `# ${businessInfo.name}`,
    '',
    `> ${businessInfo.description}`,
    '',
    `Inhaber: ${owner.name}. Standort: ${address.postalCode} ${address.city}, ${address.region}. ` +
      'Deutschlandweit tätig, Schwerpunkt Rheinland. Zielgruppe sind B2B-Dienstleister mit ' +
      '5 bis 50 Mitarbeitern: Personaldienstleister, IT-Systemhäuser und Managed Service ' +
      'Provider, Unternehmensberatungen, SaaS-Anbieter und Agenturen.',
    '',
    '## Leistungen',
    '',
    link('/leistungen', 'Leistungen im Überblick', 'Telefonakquise, Leadgenerierung, Terminqualifizierung und Vertriebsoutsourcing'),
    link('/kontakt', 'Kontakt und Erstgespräch', 'Kostenloses Strategiegespräch, Terminbuchung'),
    link('/ueber-uns', 'Über Carpantier Consulting', `${owner.name}, Hintergrund und Arbeitsweise`),
    '',
    '## Branchen',
    '',
    ...industryPages.map((industry) =>
      link(`/branchen/${industry.slug}`, industry.shortTitle, industry.summary)
    ),
    '',
    '## Standorte',
    '',
    'Zwei Seitenfamilien je Stadt: `/leistungen/[stadt]` für Vertriebsoutsourcing, ' +
      '`/kaltakquise/[stadt]` für Telefonakquise und Terminvereinbarung.',
    '',
    ...cities.map((city) =>
      link(`/leistungen/${city.slug}`, `Vertriebsagentur ${city.name}`, `Vertrieb auslagern ${city.businessContext}`)
    ),
    '',
    ...cities.map((city) =>
      link(`/kaltakquise/${city.slug}`, `Kaltakquise Agentur ${city.name}`, `B2B-Telefonakquise und Terminvereinbarung in ${city.name}`)
    ),
    '',
    '## Fachbeiträge',
    '',
    ...blogPosts.map((post) => link(`/blog/${post.slug}`, post.title, post.description)),
    '',
    '## Nachschlagewerk',
    '',
    link('/glossar', 'Vertriebsglossar', 'Begriffe aus B2B-Vertrieb und Akquise'),
    link('/wissen', 'Wissen', 'Einstieg zu Fachbeiträgen, Videos und Glossar'),
    link('/wissen/videos', 'Videos', 'Beiträge aus dem YouTube-Kanal'),
    '',
    '## Rechtliches und Transparenz',
    '',
    link('/ki-transparenz', 'KI-Transparenz', 'Offenlegung nach Art. 50 KI-VO: welche Bilder und Texte KI-gestützt entstanden sind'),
    link('/impressum', 'Impressum', `Anbieterkennzeichnung nach § 5 DDG`),
    link('/datenschutz', 'Datenschutz', 'Datenschutzerklärung nach DSGVO'),
    '',
    '## Kontaktdaten',
    '',
    `- Telefon: ${businessInfo.phone}`,
    `- E-Mail: ${businessInfo.emailGeneral}`,
    `- Anschrift: ${address.street}, ${address.postalCode} ${address.city}`,
    `- Geschäftszeiten: Montag bis Freitag, 09:00-18:00 Uhr`,
    '',
  ]

  return sections.join('\n')
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
