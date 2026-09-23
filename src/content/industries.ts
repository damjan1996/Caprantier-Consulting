/**
 * Branchenseiten unter `/branchen/[branche]`.
 *
 * Hintergrund (AP-8 des Auftrags "Sichtbarkeit", 10.09.2026): Gegen triveo
 * (seit 2002), DIMARCON (seit 1992) und PATT (seit 1994, ISO 9001) ist der
 * allgemeine Kaufbegriff "kaltakquise agentur" nicht zu gewinnen -- dreißig
 * Jahre Historie und dreistellige Referenzzahlen lassen sich nicht durch
 * bessere Texte aufholen. Googles KI-Übersicht zur Frage nach Anbietern für
 * IT- und Personaldienstleister zitiert dagegen Nischenanbieter. Genau dort
 * ist Platz.
 *
 * Deshalb zwei eigenständige Landingpages statt zweier Blogbeiträge: Eine
 * Landingpage darf verkaufen, ein Fachbeitrag muss erklären. Beide verweisen
 * aufeinander.
 *
 * Regel für neue Einträge: Kein Textbaustein darf wörtlich aus einer anderen
 * Branchen-, Stadt- oder Leistungsseite übernommen werden. Genau die
 * Dopplung hat den Blog in die Nichtindexierung geführt;
 * `scripts/check-content-duplication.mjs` prüft das bei jedem `pnpm verify`.
 */

export interface IndustryPainPoint {
  title: string
  text: string
}

export interface IndustryStep {
  title: string
  text: string
}

export interface IndustryFAQ {
  question: string
  answer: string
}

export interface IndustryPage {
  slug: string
  /** Kurzform für Navigation, Listen und llms.txt. */
  shortTitle: string
  /** H1 der Seite. */
  headline: string
  /** Ein Satz, der die Seite beschreibt. Wird auch in llms.txt verwendet. */
  summary: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  /** Kleiner Text über der H1. */
  kicker: string
  /** Einleitung unter der H1, zwei bis drei Sätze. */
  intro: string
  /** Warum diese Branche ein besonderes Akquiseproblem hat. */
  painPoints: IndustryPainPoint[]
  /** Wie die Zusammenarbeit konkret abläuft. */
  approach: IndustryStep[]
  /** Was die Zielgruppe von einem Anrufer erwartet. */
  qualification: string[]
  faqs: IndustryFAQ[]
  /** Fachbeiträge, die diese Seite vertiefen. */
  relatedPosts: string[]
  /** Stadt-Slugs für die regionale Verlinkung. */
  relatedCities: string[]
}

export const industryPages: IndustryPage[] = [
  {
    slug: 'personaldienstleister',
    shortTitle: 'Vertrieb für Personaldienstleister',
    headline: 'Vertriebsagentur für Personaldienstleister',
    summary:
      'B2B-Kaltakquise für Personaldienstleister, Personalvermittler und Zeitarbeitsunternehmen: Termine mit Entscheidern, die tatsächlich Personal suchen.',
    metaTitle: 'Vertriebsagentur für Personaldienstleister – Kaltakquise & Kundengewinnung',
    metaDescription:
      'Kundengewinnung für Personaldienstleister, Personalvermittler und Zeitarbeit: Wir übernehmen die Kaltakquise bei Unternehmen mit echtem Personalbedarf und liefern qualifizierte Entscheidertermine. Aus Köln, deutschlandweit.',
    keywords: [
      'Vertriebsagentur Personaldienstleister',
      'Kaltakquise Personaldienstleister',
      'Kundengewinnung Zeitarbeit',
      'Neukundengewinnung Personalvermittlung',
      'Vertrieb Personaldienstleistung',
      'Akquise Zeitarbeitsfirma',
      'Leadgenerierung Personaldienstleister',
      'Terminvereinbarung Personalvermittler',
    ],
    kicker: 'Branchenlösung Personaldienstleistung',
    intro:
      'Personaldienstleister verkaufen an dieselben Entscheider, die auch alle anderen anrufen. Wer hier Termine bekommen will, braucht keinen weiteren Anruf mit einem Bewerberprofil, sondern einen Anlass, der zeigt, dass im Zielunternehmen gerade etwas nicht besetzt wird.',
    painPoints: [
      {
        title: 'Der Markt ruft dieselben Nummern an',
        text: 'Ein Personalleiter im produzierenden Mittelstand bekommt Anrufe von Zeitarbeitsfirmen, Personalberatungen und Vermittlern in einer Frequenz, die kaum eine andere Rolle kennt. Ein Anruf, der mit dem eigenen Leistungsspektrum beginnt, ist innerhalb von zehn Sekunden einsortiert. Was durchkommt, ist ein Anruf, der mit einer konkreten Beobachtung über das angerufene Unternehmen beginnt.',
      },
      {
        title: 'Der Bedarf ist öffentlich sichtbar – und wird selten genutzt',
        text: 'Kaum eine Branche hat ihre Kaufsignale so offen liegen: Eine Stellenanzeige, die seit zwölf Wochen läuft, ist ein unbesetzter Bedarf mit Datum. Trotzdem arbeiten viele Vertriebe mit gekauften Adresslisten statt mit dem, was das Zielunternehmen selbst veröffentlicht hat.',
      },
      {
        title: 'Disponenten sollen verkaufen und besetzen zugleich',
        text: 'In den meisten Häusern liegt die Neukundengewinnung bei denselben Personen, die Kandidaten betreuen und Einsätze koordinieren. Wenn die Besetzung drückt, fällt die Akquise aus – und zwar genau dann, wenn das Geschäft gut läuft. Drei Monate später fehlen die Neukunden.',
      },
      {
        title: 'Der Preis ist erklärungsbedürftig, das Gespräch kurz',
        text: 'Überlassungssätze und Vermittlungsprovisionen lassen sich am Telefon nicht seriös verhandeln. Das Ziel des Erstkontakts ist deshalb nie der Abschluss, sondern ein Termin mit jemandem, der über Personalbudget entscheidet.',
      },
    ],
    approach: [
      {
        title: 'Zielunternehmen nach echtem Bedarf auswählen',
        text: 'Wir bauen die Liste aus veröffentlichten Stellenanzeigen, Wachstumssignalen und Standortereignissen auf – nicht aus einem gekauften Adressbestand. Jeder Kontakt trägt einen dokumentierten Anlass, der zugleich die Grundlage der mutmaßlichen Einwilligung nach § 7 UWG ist.',
      },
      {
        title: 'Die richtige Rolle ansprechen',
        text: 'Je nach Unternehmensgröße ist das die Personalleitung, die Geschäftsführung oder der Fachbereich, in dem die Stelle offen ist. In Unternehmen mit 20 bis 200 Mitarbeitern entscheidet häufig die Geschäftsführung selbst – dort anzusetzen verkürzt den Weg erheblich.',
      },
      {
        title: 'Auf Besetzbarkeit qualifizieren, nicht auf Freundlichkeit',
        text: 'Vor dem Termin klären wir, welche Positionen offen sind, seit wann, ob bereits mit Dienstleistern gearbeitet wird und wer über die Beauftragung entscheidet. Ein Termin ohne diese vier Antworten kostet Sie eine Stunde und bringt keinen Auftrag.',
      },
      {
        title: 'Termin übergeben, Wiedervorlage pflegen',
        text: 'Sie bekommen den Termin mit vollständiger Gesprächsnotiz in den Kalender. Unternehmen, die aktuell gebunden sind, landen mit Datum und Anlass auf Wiedervorlage – im Personalgeschäft entsteht ein erheblicher Teil der Abschlüsse aus genau diesen Kontakten.',
      },
    ],
    qualification: [
      'Welche Positionen sind offen, und seit wann?',
      'Wird bereits mit Personaldienstleistern gearbeitet – und mit wie vielen?',
      'Gibt es einen Rahmenvertrag, und wann läuft er aus?',
      'Wer entscheidet über die Beauftragung: Personalabteilung, Fachbereich oder Geschäftsführung?',
      'Steht die Besetzung unter Zeitdruck, oder ist sie ein Dauerthema?',
    ],
    faqs: [
      {
        question: 'Für welche Personaldienstleister arbeiten Sie?',
        answer:
          'Für Personalvermittler, Zeitarbeitsunternehmen und spezialisierte Personalberatungen mit fünf bis fünfzig Mitarbeitern, die Kundenunternehmen im deutschen Mittelstand gewinnen wollen. Nicht geeignet ist die Zusammenarbeit, wenn keine Kapazität besteht, die gelieferten Termine innerhalb weniger Tage wahrzunehmen.',
      },
      {
        question: 'Sprechen Sie Kandidaten oder Kundenunternehmen an?',
        answer:
          'Ausschließlich Kundenunternehmen. Die Ansprache von Kandidaten ist Ihr Geschäft und unterliegt anderen Regeln – wir übernehmen die Seite, auf der Ihre Umsätze entstehen: Unternehmen mit unbesetztem Personalbedarf.',
      },
      {
        question: 'Woher kommen die Zielunternehmen?',
        answer:
          'Aus öffentlich zugänglichen Quellen mit erkennbarem Anlass: laufende Stellenausschreibungen, Wachstums- und Standortmeldungen, Handelsregisterbekanntmachungen. Jeder Kontakt trägt ein dokumentiertes Auswahlkriterium – das ist zugleich die Grundlage dafür, dass der Anruf nach § 7 Abs. 2 Nr. 1 UWG zulässig ist.',
      },
      {
        question: 'Rufen Sie in unserem Namen an oder im eigenen?',
        answer:
          'Beides ist möglich und wird vor Projektbeginn festgelegt. In Ihrem Namen anzurufen ist im Personalgeschäft meist sinnvoller, weil der Angerufene bei einer Recherche Ihr Unternehmen finden soll. Der Auftragsverarbeitungsvertrag nach Art. 28 DSGVO liegt in beiden Fällen vor dem ersten Anruf vor.',
      },
      {
        question: 'Was kostet das?',
        answer:
          'Wir arbeiten mit einem abgegrenzten Pilotprojekt zum Einstieg – einem festen Kontingent qualifizierter Termine über einen Monat – und danach mit einem monatlich vereinbarten Umfang. Die Modellübersicht steht auf der Leistungsseite; welches passt, entscheidet sich an der Größe Ihrer Zielgruppe und daran, wie viele Termine Sie pro Woche wahrnehmen können.',
      },
    ],
    relatedPosts: [
      'vertriebsteam-aufbauen-recruiting',
      'b2b-kaltakquise-leitfaden',
      'vertrieb-auslagern-kosten-vorteile',
    ],
    relatedCities: ['koeln', 'duesseldorf', 'frankfurt'],
  },
  {
    slug: 'it-systemhaeuser',
    shortTitle: 'Leadgenerierung für IT-Systemhäuser',
    headline: 'Leadgenerierung für IT-Systemhäuser und Managed Service Provider',
    summary:
      'B2B-Akquise für Systemhäuser, MSP und IT-Dienstleister: Entscheidertermine bei Unternehmen, deren Betreuungsvertrag ausläuft oder deren IT dem Wachstum nicht mehr folgt.',
    metaTitle: 'Leadgenerierung für IT-Systemhäuser & Managed Service Provider',
    metaDescription:
      'Neukundengewinnung für IT-Systemhäuser, MSP und IT-Dienstleister: Wir sprechen Geschäftsführer an, deren Betreuungsvertrag ausläuft oder deren IT dem Wachstum nicht mehr folgt – und liefern qualifizierte Termine.',
    keywords: [
      'Leadgenerierung IT-Systemhaus',
      'Neukundengewinnung Systemhaus',
      'Kaltakquise IT-Dienstleister',
      'Managed Service Provider Vertrieb',
      'MSP Leadgenerierung',
      'Vertriebsagentur IT',
      'B2B Akquise IT-Branche',
      'Terminvereinbarung Systemhaus',
    ],
    kicker: 'Branchenlösung IT und Managed Services',
    intro:
      'IT-Betreuung wird selten aus Unzufriedenheit gewechselt und fast immer aus einem Anlass. Wer diesen Anlass kennt, bevor er anruft, führt ein Fachgespräch. Wer ihn nicht kennt, führt das Standardgespräch, das jeder Geschäftsführer eines Systemhauskunden schon dreimal geführt hat.',
    painPoints: [
      {
        title: 'Der beste Verkäufer ist der Geschäftsführer – und der ist im Projekt',
        text: 'In Systemhäusern mit fünf bis fünfzig Mitarbeitern kommt die Geschäftsführung fast immer aus der Technik und verkauft am glaubwürdigsten. Genau diese Person ist aber im Tagesgeschäft gebunden. Eine eigene Vertriebsleitung entsteht erfahrungsgemäß erst ab etwa dreißig Mitarbeitern.',
      },
      {
        title: 'Techniker akquirieren nicht, Vertriebler verstehen das Produkt nicht',
        text: 'Das strukturelle Dilemma der Branche: Wer die Lösung erklären kann, telefoniert ungern kalt. Wer gern kalt telefoniert, scheitert an der ersten technischen Rückfrage. Die praktikable Auflösung ist die Trennung nach Prozessschritt – Erstkontakt und Qualifizierung außerhalb, Fachgespräch bei Ihnen.',
      },
      {
        title: 'Das Zeitfenster ist schmal und terminiert',
        text: 'Rahmen- und Wartungsverträge laufen typischerweise 24 bis 36 Monate. Das Gesprächsfenster liegt drei bis sechs Monate vor Ablauf. Davor ist es zu früh, danach ist verlängert. Ohne systematische Wiedervorlage geht dieses Fenster jedes Mal verloren.',
      },
      {
        title: 'Empfehlungen tragen – bis sie es nicht mehr tun',
        text: 'Fast jedes Systemhaus ist über Empfehlung gewachsen, und das funktioniert zuverlässig, solange das Netzwerk trägt. Es ist nur endlich. Wer erst mit aktiver Akquise beginnt, wenn die Empfehlungen ausbleiben, verliert die Monate, die der Aufbau braucht.',
      },
    ],
    approach: [
      {
        title: 'Segment schärfen statt Branche nennen',
        text: 'Nicht "IT-Unternehmen", sondern beispielsweise Betriebe mit 20 bis 100 Arbeitsplätzen im Umkreis von 150 Kilometern, in denen ein Systemwechsel oder Wachstum erkennbar ist. Je enger das Segment, desto konkreter der erste Satz.',
      },
      {
        title: 'Anlass recherchieren, bevor gewählt wird',
        text: 'Wir arbeiten mit drei belastbaren Auslösern: auslaufende Betreuungsverträge, Wachstums- und Standortereignisse sowie regulatorische Anforderungen an Nachweispflichten. Stellenanzeigen für Systemadministration sind dabei die aussagekräftigste öffentliche Quelle.',
      },
      {
        title: 'Geschäftsführung ansprechen, nicht die IT-Abteilung',
        text: 'Bei Ihren Zielkunden entscheidet über einen Betreuungswechsel fast immer die Geschäftsführung – die interne IT ist häufig sogar strukturell dagegen. Ein freundliches Gespräch im Fachbereich ist deshalb kein Vorgang.',
      },
      {
        title: 'Auf das Vertragsende qualifizieren',
        text: 'Interesse ohne bekanntes Vertragsende ist im MSP-Geschäft wertlos. Wir klären, wer betreut, seit wann, bis wann und was heute fehlt – und legen alles, was gebunden ist, mit Datum auf Wiedervorlage.',
      },
    ],
    qualification: [
      'Wer betreut die IT heute – intern, extern oder gemischt?',
      'Wann läuft der bestehende Betreuungs- oder Rahmenvertrag aus?',
      'Was funktioniert heute nicht: Reaktionszeit, Erreichbarkeit, Projektfähigkeit, Sicherheit?',
      'Steht ein Wachstums-, Standort- oder Migrationsereignis an?',
      'Wer entscheidet über einen Wechsel, und wer redet mit?',
    ],
    faqs: [
      {
        question: 'Verstehen Ihre Mitarbeiter das technische Thema?',
        answer:
          'So weit, wie es der Erstkontakt verlangt: Wir müssen den Anlass erkennen, die richtigen Fragen stellen und ein Vertragsende sauber erfassen. Die Lösung erklären Sie im Fachgespräch. Wir geben ausdrücklich keine technische Beratung am Telefon – ein falsch verwendeter Fachbegriff kostet in dieser Zielgruppe das gesamte Gespräch.',
      },
      {
        question: 'Wie finden Sie heraus, wann ein Vertrag ausläuft?',
        answer:
          'Durch Fragen. Diese Information steht in keiner Datenbank, sie entsteht im Gespräch – und sie ist der eigentliche Ertrag der ersten Kampagnenmonate. Auch ein Kontakt, der aktuell gebunden ist, wird damit zu einem terminierten Vorgang statt zu einer Absage.',
      },
      {
        question: 'Arbeiten Sie auch für SaaS-Anbieter und Softwarehäuser?',
        answer:
          'Ja, mit anderer Kadenz. SaaS hat kürzere Entscheidungswege, niedrigere Einstiegspreise und braucht deutlich mehr Gespräche pro Abschluss. Die Recherche verschiebt sich dabei von der Einzelfirma auf das Segment, weil sich der Aufwand pro Kontakt sonst nicht rechnet.',
      },
      {
        question: 'Sprechen Sie unsere Wettbewerber an?',
        answer:
          'Nein. Zielgruppen, die wir für einen Auftraggeber bearbeiten, sind für die Dauer der Zusammenarbeit gesperrt. Wir arbeiten in einem regionalen Markt nicht gleichzeitig für zwei Systemhäuser mit demselben Zuschnitt.',
      },
      {
        question: 'Wie lange dauert es bis zu den ersten Terminen?',
        answer:
          'Die ersten Wochen dienen der Kalibrierung von Liste, Einstieg und Einwandbehandlung; belastbar wird eine Kampagne im IT-Umfeld ab etwa acht Wochen. Wer nach vier Wochen abbricht, hat ausschließlich die Lernphase bezahlt.',
      },
    ],
    relatedPosts: [
      'leadgenerierung-it-dienstleister',
      'bant-methode-erklaert',
      'vertriebsagentur-finden-checkliste',
    ],
    relatedCities: ['koeln', 'muenchen', 'hamburg'],
  },
]

export function getIndustryBySlug(slug: string): IndustryPage | undefined {
  return industryPages.find((industry) => industry.slug === slug)
}

export function getAllIndustrySlugs(): string[] {
  return industryPages.map((industry) => industry.slug)
}
