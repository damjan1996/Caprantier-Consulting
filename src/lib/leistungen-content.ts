/**
 * Redaktioneller Inhalt der Leistungsseite.
 *
 * Die vier Leistungen stehen hier und nicht in der Komponente, weil dieselben
 * Angaben als `Service`-Markup ausgeliefert werden (siehe
 * `generateServicesSchema` in `src/lib/schemas.ts`). Zwei getrennte Textstände
 * laufen beim ersten Umformulieren auseinander, und der Verstoß fällt
 * niemandem auf, der die Seite ansieht.
 *
 * Die Preismodelle stehen bewusst **nicht** hier, sondern weiterhin in
 * `src/lib/pricing.ts` — dort hängen die Freigabe-Logik und die Prüfung in
 * `scripts/check-pricing.mjs` daran.
 */

export interface ServiceEntry {
  /** Kurzform für die Reihenfolge-Marke in der Karte, etwa „Schritt 1". */
  step: string
  title: string
  /** Ein Satz, der die Leistung in der Sprache des Kunden beschreibt. */
  description: string
  /** Was konkret dazugehört. Vier Punkte, nicht mehr. */
  features: string[]
}

/**
 * Die Reihenfolge ist die des Arbeitsablaufs, nicht die der Wichtigkeit:
 * Erst steht fest, wen man anruft, dann wird angerufen, dann qualifiziert,
 * dann berichtet. Wer die Karten anders sortiert, zerreißt die Kette.
 */
export const services: ServiceEntry[] = [
  {
    step: 'Schritt 1',
    title: 'Zielgruppe und Liste',
    description:
      'Bevor jemand zum Hörer greift, steht fest, wen wir anrufen und warum gerade jetzt. Kein Abtelefonieren gekaufter Adressen.',
    features: [
      'Auswahlkriterien je Kontakt, schriftlich festgehalten',
      'Listenaufbau aus öffentlich zugänglichen Anlässen',
      'Entscheider statt Zentrale – Rolle vorab geprüft',
      'Übergabe in Ihr CRM, nicht in eine Tabelle bei uns',
    ],
  },
  {
    step: 'Schritt 2',
    title: 'Telefonakquise in Ihrem Namen',
    description:
      'Wir melden uns mit Ihrem Firmennamen und sprechen in der Wir-Form. Für die Gegenseite sind wir Ihr Vertrieb, nicht ein Dienstleister im Auftrag.',
    features: [
      'Gesprächsgerüst statt auswendig gelerntem Skript',
      'Branchenspezifischer Einstieg, kein „Störe ich gerade?"',
      'Einwandbehandlung, die das Gespräch weiterführt',
      'Nachschärfung am echten Gespräch, nicht am Reißbrett',
    ],
  },
  {
    step: 'Schritt 3',
    title: 'Qualifizierung des Termins',
    description:
      'Drei Fragen entscheiden, ob ein Gespräch in Ihrem Kalender landet. Fehlt eine Antwort, beenden wir das Telefonat freundlich – und tragen nichts ein.',
    features: [
      'Rolle, erkennbarer Bedarf, Zeithorizont – vorab definiert',
      'Einladung aus Ihrem Kalender mit Ihrer Signatur',
      'Gesprächsnotiz zur Vorbereitung, im CRM oder per Mail',
      'Erinnerung vor dem Termin, damit er auch stattfindet',
    ],
  },
  {
    step: 'Schritt 4',
    title: 'Bericht und Nachsteuerung',
    description:
      'Sie sehen wöchentlich, was passiert ist – auch das, was nicht funktioniert hat. Absagegründe stehen im Wortlaut im Bericht, nicht als Kategorie.',
    features: [
      'Vier Kennzahlen im Reporting statt zwanzig',
      'Absagegründe unverändert, nicht zusammengefasst',
      'Wiedervorlagen mit Datum und Anlass',
      'Wöchentlicher Abgleich, 30 Minuten',
    ],
  },
]

/** Was im Erstgespräch geklärt wird — die drei Punkte des Abschlusses. */
export interface AgendaEntry {
  when: string
  what: string
  detail: string
}

export const erstgespraechAgenda: AgendaEntry[] = [
  {
    when: 'Minute 1–5',
    what: 'Ihre Zielgruppe',
    detail: 'Wen wollen Sie erreichen, und gibt es davon genug für eine laufende Akquise?',
  },
  {
    when: 'Minute 5–10',
    what: 'Das passende Modell',
    detail: 'Pilot, laufende Akquise oder Abrechnung je Termin – und was jeweils dagegen spricht.',
  },
  {
    when: 'Minute 10–15',
    what: 'Ehrliche Einschätzung',
    detail: 'Ob wir liefern können. Wenn nicht, sagen wir das im Gespräch und nicht im Angebot.',
  },
]
