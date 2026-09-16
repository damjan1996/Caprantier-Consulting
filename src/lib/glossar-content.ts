/**
 * Die Begriffe des B2B-Vertriebs-Glossars.
 *
 * Standen bis zum 15.09.2026 als Feld in `src/app/glossar/page.tsx`. Sie sind
 * seitdem dreifach in Gebrauch: in der Glossarseite selbst, im
 * `DefinedTermSet`-Markup dort und in der Kurzliste auf `/wissen`. Damit
 * gehören sie nach Baukasten § 8.3 in ein Datenmodul — zwei Textstände
 * zwischen sichtbarem Inhalt und Markup sind ein Verstoss, den man der Seite
 * nicht ansieht.
 *
 * Die Reihenfolge ist alphabetisch und wird von der Glossarseite so
 * beibehalten; gruppiert wird dort nach `category`.
 */

export interface GlossarBegriff {
  /** Sprungmarke auf der Glossarseite, z. B. `/glossar#bant`. */
  id: string
  term: string
  /** Eine Zeile — genug fuer eine Liste, zu wenig fuer eine Definition. */
  shortDescription: string
  /** Die Definition. Wird auch als `DefinedTerm.description` ausgeliefert. */
  fullDescription: string
  relatedTerms: string[]
  category: string
  /** Weiterfuehrender Beitrag, falls es einen gibt. */
  blogLink?: string
}

export const glossarBegriffe: GlossarBegriff[] = [
  {
    id: 'akquise',
    term: 'Akquise',
    shortDescription: 'Gewinnung von Neukunden durch aktive Ansprache',
    fullDescription:
      'Akquise bezeichnet alle Maßnahmen zur Gewinnung von Neukunden. Man unterscheidet zwischen Kaltakquise (Ansprache ohne vorherigen Kontakt) und Warmakquise (Kontaktaufnahme mit bereits bekannten Interessenten). Im B2B-Bereich ist die telefonische Akquise nach wie vor eine der effektivsten Methoden.',
    relatedTerms: ['Kaltakquise', 'Warmakquise', 'Leadgenerierung'],
    category: 'Grundlagen',
  },
  {
    id: 'bant',
    term: 'BANT-Methode',
    shortDescription: 'Framework zur Lead-Qualifizierung',
    fullDescription:
      'BANT steht für Budget, Authority, Need und Timing. Es ist eine bewährte Methode zur Qualifizierung von Leads im B2B-Vertrieb. Ein Lead gilt als qualifiziert, wenn er über ausreichend Budget verfügt, die Entscheidungsbefugnis hat, einen konkreten Bedarf aufweist und der Zeitpunkt für einen Kauf passt.',
    relatedTerms: ['Lead-Qualifizierung', 'Sales Qualified Lead'],
    category: 'Methoden',
    blogLink: '/blog/bant-methode-erklaert',
  },
  {
    id: 'b2b',
    term: 'B2B (Business-to-Business)',
    shortDescription: 'Geschäftsbeziehungen zwischen Unternehmen',
    fullDescription:
      'B2B beschreibt Geschäftsbeziehungen zwischen zwei oder mehr Unternehmen, im Gegensatz zu B2C (Business-to-Consumer). Im B2B-Vertrieb sind die Verkaufszyklen typischerweise länger, die Entscheidungsprozesse komplexer und die Auftragswerte höher.',
    relatedTerms: ['B2C', 'Enterprise Sales'],
    category: 'Grundlagen',
  },
  {
    id: 'cold-calling',
    term: 'Cold Calling / Kaltakquise',
    shortDescription: 'Telefonische Erstansprache potenzieller Kunden',
    fullDescription:
      'Cold Calling bezeichnet die telefonische Kontaktaufnahme mit potenziellen Kunden ohne vorherige Geschäftsbeziehung. Gegenüber Unternehmen ist Telefonwerbung nach § 7 Abs. 2 Nr. 1 UWG zulässig, wenn zumindest eine mutmaßliche Einwilligung des Angerufenen vorliegt — gegenüber Verbrauchern ist dagegen immer eine ausdrückliche vorherige Einwilligung nötig. Professionelle Kaltakquise erfordert gute Vorbereitung, ein überzeugendes Skript und ausgeprägte Kommunikationsfähigkeiten.',
    relatedTerms: ['Akquise', 'Telefonakquise', 'Einwandbehandlung'],
    category: 'Methoden',
    blogLink: '/blog/kaltakquise-rechtliche-grundlagen',
  },
  {
    id: 'crm',
    term: 'CRM (Customer Relationship Management)',
    shortDescription: 'System zur Verwaltung von Kundenbeziehungen',
    fullDescription:
      'Ein CRM-System ist eine Software zur Verwaltung und Analyse von Kundeninteraktionen. Es hilft Vertriebsteams, Leads zu verfolgen, Verkaufschancen zu managen und Kundenbeziehungen zu pflegen. Bekannte CRM-Systeme sind Salesforce, HubSpot und Pipedrive.',
    relatedTerms: ['Pipeline', 'Lead Management'],
    category: 'Tools',
  },
  {
    id: 'decision-maker',
    term: 'Decision Maker / Entscheider',
    shortDescription: 'Person mit Kaufentscheidungsbefugnis',
    fullDescription:
      'Ein Decision Maker ist die Person in einem Unternehmen, die die finale Entscheidung über einen Kauf treffen kann. Im B2B-Vertrieb ist es entscheidend, den richtigen Entscheider zu identifizieren und anzusprechen. Oft gibt es mehrere Stakeholder im Buying Center.',
    relatedTerms: ['Buying Center', 'Gatekeeper', 'BANT'],
    category: 'Grundlagen',
  },
  {
    id: 'einwandbehandlung',
    term: 'Einwandbehandlung',
    shortDescription: 'Professioneller Umgang mit Kundenbedenken',
    fullDescription:
      'Einwandbehandlung bezeichnet Techniken, um auf Bedenken und Einwände potenzieller Kunden professionell zu reagieren. Typische Einwände sind "kein Interesse", "keine Zeit", "zu teuer" oder "wir haben schon einen Anbieter". Eine gute Einwandbehandlung wandelt Einwände in Verkaufschancen um.',
    relatedTerms: ['Kaltakquise', 'Verkaufsgespräch'],
    category: 'Methoden',
    blogLink: '/blog/einwandbehandlung-vertrieb',
  },
  {
    id: 'lead',
    term: 'Lead',
    shortDescription: 'Potenzieller Kunde mit Interesse',
    fullDescription:
      'Ein Lead ist ein potenzieller Kunde, der Interesse an einem Produkt oder einer Dienstleistung gezeigt hat. Leads werden typischerweise nach ihrer Qualität unterschieden: Marketing Qualified Leads (MQL) zeigen erstes Interesse, Sales Qualified Leads (SQL) sind kaufbereit.',
    relatedTerms: ['MQL', 'SQL', 'Lead-Qualifizierung'],
    category: 'Grundlagen',
  },
  {
    id: 'leadgenerierung',
    term: 'Leadgenerierung',
    shortDescription: 'Gewinnung potenzieller Kundeninteressenten',
    fullDescription:
      'Leadgenerierung umfasst alle Maßnahmen zur Gewinnung von Kontaktdaten potenzieller Kunden. Methoden sind u.a. Content Marketing, Social Selling, Kaltakquise, Events und Paid Advertising. Ziel ist es, eine Pipeline mit qualifizierten Interessenten aufzubauen.',
    relatedTerms: ['Lead', 'Pipeline', 'Akquise'],
    category: 'Methoden',
    blogLink: '/blog/leadgenerierung-it-dienstleister',
  },
  {
    id: 'pipeline',
    term: 'Sales Pipeline',
    shortDescription: 'Visuelle Darstellung des Verkaufsprozesses',
    fullDescription:
      'Die Sales Pipeline ist eine visuelle Darstellung aller aktiven Verkaufschancen in verschiedenen Phasen des Verkaufsprozesses. Typische Phasen sind: Lead, Qualifizierung, Angebot, Verhandlung, Abschluss. Eine gut gefüllte Pipeline ist entscheidend für planbaren Umsatz.',
    relatedTerms: ['CRM', 'Forecast', 'Conversion Rate'],
    category: 'Tools',
  },
  {
    id: 'sdr',
    term: 'SDR (Sales Development Representative)',
    shortDescription: 'Vertriebsmitarbeiter für Leadqualifizierung',
    fullDescription:
      'Ein SDR ist ein Vertriebsmitarbeiter, der sich auf die Generierung und Qualifizierung von Leads spezialisiert hat. SDRs führen Erstgespräche, qualifizieren Interessenten nach BANT-Kriterien und übergeben qualifizierte Termine an Account Executives. SDR as a Service ermöglicht Unternehmen, diese Funktion auszulagern.',
    relatedTerms: ['BDR', 'Account Executive', 'Inside Sales'],
    category: 'Rollen',
    blogLink: '/blog/sdr-as-a-service',
  },
  {
    id: 'vertriebsoutsourcing',
    term: 'Vertriebsoutsourcing',
    shortDescription: 'Auslagerung von Vertriebsaktivitäten',
    fullDescription:
      'Vertriebsoutsourcing bezeichnet die Auslagerung von Vertriebsaktivitäten an externe Dienstleister. Vorteile sind Kosteneffizienz, Skalierbarkeit und Zugang zu Expertenwissen. Besonders für KMUs ist Vertriebsoutsourcing eine attraktive Alternative zum Aufbau eines eigenen Vertriebsteams.',
    relatedTerms: ['SDR as a Service', 'Vertriebsagentur'],
    category: 'Strategien',
    blogLink: '/blog/vertrieb-auslagern-kosten-vorteile',
  },
  {
    id: 'warmakquise',
    term: 'Warmakquise',
    shortDescription: 'Kontaktaufnahme mit bekannten Interessenten',
    fullDescription:
      'Warmakquise bezeichnet die Kontaktaufnahme mit Personen, zu denen bereits eine Verbindung besteht - sei es durch vorherige Gespräche, Empfehlungen, Website-Besuche oder Event-Teilnahmen. Die Erfolgsquote bei Warmakquise ist typischerweise höher als bei Kaltakquise.',
    relatedTerms: ['Kaltakquise', 'Lead Nurturing'],
    category: 'Methoden',
  },
  {
    id: 'buying-center',
    term: 'Buying Center',
    shortDescription: 'Gruppe von Entscheidungsbeteiligten',
    fullDescription:
      'Das Buying Center umfasst alle Personen in einem Unternehmen, die am Kaufentscheidungsprozess beteiligt sind. Typische Rollen sind: Initiator, Beeinflusser, Entscheider, Einkäufer und Nutzer. Im B2B-Vertrieb ist es wichtig, alle relevanten Stakeholder zu identifizieren und anzusprechen.',
    relatedTerms: ['Decision Maker', 'Stakeholder'],
    category: 'Grundlagen',
  },
  {
    id: 'conversion-rate',
    term: 'Conversion Rate',
    shortDescription: 'Umwandlungsrate im Vertriebsprozess',
    fullDescription:
      'Die Conversion Rate misst, wie viele Leads oder Interessenten in die nächste Phase des Vertriebsprozesses oder zu Kunden konvertiert werden. Eine typische Lead-to-Customer Conversion Rate im B2B liegt bei 2-5%. Die Optimierung der Conversion Rate ist ein wichtiger Hebel für mehr Umsatz.',
    relatedTerms: ['Pipeline', 'KPIs', 'Forecast'],
    category: 'Metriken',
  },
]

/** Die Kategorien in der Reihenfolge, in der die Glossarseite sie zeigt. */
export const glossarKategorien = [...new Set(glossarBegriffe.map((b) => b.category))].sort()
