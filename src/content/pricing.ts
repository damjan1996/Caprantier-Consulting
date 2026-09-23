/**
 * Preismodelle für `/leistungen`.
 *
 * Ausgangslage (AP-6 des Auftrags "Sichtbarkeit", 10.09.2026): Auf
 * `/leistungen` stand kein Preis. Gleichzeitig nennt der einzige indexierte
 * Blogbeitrag mit Preisbezug im Google-Snippet bereits eine Spanne, und der
 * wichtigste Kölner Wettbewerber gewinnt die Stadt unter anderem mit einem
 * sichtbaren Einstiegspreis. Die Marke beziffert den Markt also -- nur nicht
 * dort, wo verkauft wird.
 *
 * ## Warum hier keine Zahlen stehen
 *
 * Welcher Preis aufgerufen wird, ist eine Geschäftsentscheidung von Nico und
 * keine technische. Deshalb ist `preis` in jedem Modell absichtlich `null`.
 * Das Umlegen von `PREISE_FREIGEGEBEN` allein veröffentlicht **nichts** --
 * es müssen zusätzlich echte Beträge eingetragen werden. Diese Trennung ist
 * beabsichtigt: Ein Flag, das versehentlich umgelegt wird, darf keine
 * erfundenen Zahlen live schalten (Abschnitt 3.5 des Auftrags).
 *
 * ## Entscheidungsgrundlage für Nico
 *
 * Marktband laut Googles eigener KI-Übersicht: 2.000-8.000 EUR/Monat oder
 * rund 300 EUR pro qualifiziertem Termin. PATT nennt öffentlich ab 2.000
 * EUR/Monat, SharkByte gewinnt Köln unter anderem mit einem sichtbaren
 * "40-Stunden-Pilot 2.000 EUR", Erst-Kontakt startet bei "wenigen hundert
 * Euro". Details in `docs/aufgaben-nico.md`, Punkt 5.
 *
 * ## Freigabe
 *
 * 1. Beträge in `priceModels` eintragen (`preis`, `preisHinweis`).
 * 2. `PREISE_FREIGEGEBEN` auf `true` setzen.
 * 3. `pnpm verify` -- `scripts/check-pricing.mjs` prüft, dass kein Modell
 *    freigegeben ist, dem der Betrag fehlt.
 */

/**
 * ## Was verkauft wird
 *
 * **Verkauft werden Termine, nicht Akquisestunden.** Bis zum 16.09.2026
 * beschrieben Pilotprojekt und laufende Akquise hier ein Kontingent an
 * Akquisestunden -- das ist das im Markt übliche Modell (siehe den Beitrag zu
 * den Kosten), aber nicht das, womit diese Agentur nach aussen geht.
 *
 * Der Unterschied ist keine Formulierung: Beim Stundenmodell trägt der
 * Auftraggeber das Ergebnisrisiko, beim Terminmodell der Dienstleister. Wer
 * die Texte hier ändert, muss diese Richtung beibehalten.
 *
 * **Die Stunden bleiben als Möglichkeit bestehen, aber nicht als Aufhänger.**
 * Je nach Angebot kann ein fester Stundenumfang sinnvoller sein; das steht
 * deshalb in der `eignung` der laufenden Akquise als Alternative und nicht in
 * der Leistungsliste. Der erste Satz nennt immer die Terminzahl -- wer
 * überfliegt, soll das lesen, und wer vergleicht, findet die Option.
 */

/**
 * Steuert, ob Beträge öffentlich sichtbar sind.
 *
 * `false`: Die Modelle werden erklärt, Beträge bleiben aus und es entsteht
 * kein `Offer`-Markup. Das ist der Auslieferungsstand bis zur Freigabe.
 */
export const PREISE_FREIGEGEBEN = false

export interface PriceModel {
  key: string
  name: string
  /** Ein Satz: Für wen ist dieses Modell gedacht. */
  eignung: string
  /** Betrag in Euro. `null`, solange keine Entscheidung getroffen ist. */
  preis: number | null
  /** Bezugsgröße des Betrags, etwa "einmalig" oder "pro Monat". */
  einheit: string
  /** Zusatz unter dem Betrag, etwa "zzgl. USt.". Nur mit Betrag sichtbar. */
  preisHinweis?: string
  /** Was enthalten ist. */
  leistungen: string[]
  /** Was dieses Modell bewusst nicht leistet. */
  grenze: string
  hervorgehoben?: boolean
}

export const priceModels: PriceModel[] = [
  {
    key: 'pilot',
    name: 'Pilotprojekt',
    eignung:
      'Der Einstieg. Ein festes Kontingent von 10–15 qualifizierten Terminen über einen Monat, mit dem sich die Zielgruppe belastbar testen lässt.',
    preis: null,
    einheit: 'einmalig',
    leistungen: [
      'Zielgruppendefinition und Auswahlkriterium je Kontakt',
      'Listenaufbau aus öffentlich zugänglichen Anlässen',
      'Gesprächsgerüst, Qualifizierungsfragen, Terminkriterien',
      '10–15 qualifizierte Termine im Projektmonat',
      'Wöchentliches Reporting mit Absagegründen im Wortlaut',
      'Auftragsverarbeitungsvertrag nach Art. 28 DSGVO',
    ],
    grenze:
      'Ein Monat zeigt, ob die Zielgruppe trägt – eine belastbare Quote entsteht erst ab etwa acht Wochen. Die Termine kommen dabei nicht gleichmäßig: Die erste Woche geht für Liste und Kalibrierung drauf.',
  },
  {
    key: 'retainer',
    name: 'Laufende Akquise',
    eignung:
      'Das Modell für kontinuierliche Neukundengewinnung, wenn das Angebot validiert ist. Vereinbart wird eine feste Terminzahl pro Monat – je nach Angebot stattdessen ein fester Stundenumfang.',
    preis: null,
    einheit: 'pro Monat',
    leistungen: [
      'Feste Terminzahl pro Monat, schriftlich vereinbart',
      'Laufende Pflege von Liste, Einstieg und Einwandbehandlung',
      'Qualifizierte Termine direkt in Ihren Kalender',
      'Wiedervorlagen mit Datum und Anlass',
      'Wöchentlicher Abgleich, 30 Minuten',
      'Vier Kennzahlen im Reporting statt zwanzig',
    ],
    grenze:
      'Sinnvoll erst, wenn intern Kapazität besteht, die Termine innerhalb weniger Tage wahrzunehmen. Termine, die niemand annimmt, sind der häufigste Grund für abgebrochene Kampagnen.',
    hervorgehoben: true,
  },
  {
    key: 'pro-termin',
    name: 'Pro qualifiziertem Termin',
    eignung:
      'Für Auftraggeber, die maximale Kostenklarheit wollen. Abgerechnet wird je Termin, der die vorher schriftlich festgelegten Kriterien erfüllt.',
    preis: null,
    einheit: 'pro Termin',
    leistungen: [
      'Schriftliche Definition des qualifizierten Termins vor Projektbeginn',
      'Kriterien: Rolle, erkennbarer Bedarf, Zeithorizont',
      'Nachbesserung, wenn ein Termin die Kriterien nicht erfüllt',
      'Abrechnung nach stattgefundenen, nicht nach vereinbarten Terminen',
    ],
    grenze:
      'Dieses Modell setzt einen Anreiz zur Menge. Es funktioniert nur mit einer messbaren Terminqualität im Vertrag – ohne die entsteht Streit statt Pipeline.',
  },
]

/** Beträge sind nur sichtbar, wenn sie freigegeben **und** eingetragen sind. */
export function istPreisSichtbar(modell: PriceModel): boolean {
  return PREISE_FREIGEGEBEN && typeof modell.preis === 'number'
}

/** Formatiert einen Betrag für die Anzeige, etwa "2.000 €". */
export function formatPreis(betrag: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(betrag)
}

/**
 * `Offer`-Markup für die freigegebenen Modelle.
 *
 * Gibt `null` zurück, solange kein Betrag freigegeben ist. Ein `Offer` ohne
 * `price` ist gegenüber Google wertlos und gegenüber dem Leser irreführend --
 * beides will Abschnitt 3 des Auftrags ausdrücklich vermeiden.
 */
export function generateOfferSchema(basisUrl: string) {
  const freigegeben = priceModels.filter(istPreisSichtbar)
  if (freigegeben.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Preismodelle B2B-Vertriebsunterstützung',
    url: `${basisUrl}/leistungen`,
    itemListElement: freigegeben.map((modell) => ({
      '@type': 'Offer',
      name: modell.name,
      description: modell.eignung,
      price: modell.preis,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Service',
        name: `${modell.name} – B2B-Telefonakquise und Terminvereinbarung`,
      },
    })),
  }
}
