/**
 * Ortsbezogene Inhalte für die zweite Stadt-Seitenfamilie `/kaltakquise/[stadt]`.
 *
 * Hintergrund (AP-5 des Auftrags "Sichtbarkeit", 10.09.2026): Das Muster
 * `vertriebsagentur [stadt]` unter `/leistungen/[stadt]` trägt messbar --
 * Frankfurt auf Position 2, Düsseldorf auf 4, sechs weitere Städte in den
 * Top 10. Die zweite Begriffsfamilie `kaltakquise agentur [stadt]` und
 * `telefonakquise agentur [stadt]` fällt dagegen an Wettbewerber.
 *
 * Der Auftrag ist dabei ausdrücklich: **keine Kopie der Texte.** Eine zweite
 * Seitenfamilie mit denselben Absätzen erzeugt genau das Dünn-Content-Problem
 * eine Ebene höher, an dem der Blog gescheitert ist. Jede Stadt bekommt
 * deshalb hier eigene Absätze mit tatsächlichem lokalem Bezug --
 * Branchenstruktur, wer vor Ort angerufen wird, wann diese Rollen erreichbar
 * sind.
 *
 * `scripts/check-content-duplication.mjs` prüft bei jedem `pnpm verify`, dass
 * sich kein Textblock über zwei Städte hinweg wiederholt und dass sich diese
 * Texte nicht mit `regionalText` aus `cities.ts` überschneiden.
 */

export interface CityAcquisition {
  /** Wirtschaftsstruktur vor Ort, zwei bis drei Sätze. Eigenständig je Stadt. */
  marktText: string
  /** Wen wir hier typischerweise anrufen. Eigenständig je Stadt. */
  zielgruppenText: string
  /** Leitbranchen am Ort, für Aufzählung und Metadaten. */
  leitbranchen: string[]
  /** Bezug für die Erreichbarkeit: Wann sind Entscheider hier ans Telefon zu bekommen. */
  erreichbarkeit: string
}

export const cityAcquisition: Record<string, CityAcquisition> = {
  koeln: {
    marktText:
      'Köln ist unser Heimatmarkt und einer der wenigen deutschen Standorte, an denen Medien, Versicherungswirtschaft und ein sehr breiter inhabergeführter Mittelstand direkt nebeneinander liegen. Für die Telefonakquise heißt das: kurze Entscheidungswege in den Agenturen und Dienstleistern des linksrheinischen Gürtels, deutlich formalere Wege in Versicherung und Konzernumfeld.',
    zielgruppenText:
      'Wir rufen im Kölner Raum überwiegend Geschäftsführungen von Dienstleistern mit fünf bis fünfzig Mitarbeitern an – Agenturen, IT-Häuser, Personalvermittler und Beratungen. In dieser Größenordnung ist die Geschäftsführung zugleich Entscheider und Fachbereich, was den Weg vom Erstkontakt zum Termin auf einen Schritt verkürzt.',
    leitbranchen: ['Medien und Agenturen', 'Versicherungswirtschaft', 'IT-Dienstleistung', 'Handel und Logistik'],
    erreichbarkeit:
      'Im Agentur- und Dienstleistungsumfeld ist der späte Vormittag das verlässlichste Fenster; Geschäftsführungen mit Kundenterminen sind eher zwischen 16:30 und 18:00 Uhr erreichbar.',
  },
  duesseldorf: {
    marktText:
      'Düsseldorf ist Landeshauptstadt, Messestandort und Sitz überdurchschnittlich vieler Landesgesellschaften internationaler Konzerne. Diese Doppelstruktur prägt die Akquise: Neben dem klassischen Mittelstand sitzen hier Niederlassungen, deren Budgetentscheidungen anderswo fallen – das gehört im Erstgespräch geklärt, bevor ein Termin vereinbart wird.',
    zielgruppenText:
      'Unser Schwerpunkt liegt auf inhabergeführten Beratungs-, Werbe- und Handelsunternehmen sowie auf IT-Dienstleistern zwischen Medienhafen und Ratinger Umland. Bei Landesgesellschaften klären wir vorab, ob die Beauftragung vor Ort oder in der Zentrale entschieden wird.',
    leitbranchen: ['Unternehmensberatung', 'Werbung und Kommunikation', 'Mode und Handel', 'Telekommunikation'],
    erreichbarkeit:
      'In beratungsnahen Häusern ist der frühe Nachmittag am ergiebigsten. Während der großen Messezyklen fällt die Erreichbarkeit spürbar ab – diese Wochen planen wir aus der Kampagne heraus.',
  },
  bonn: {
    marktText:
      'Bonn ist geprägt von Telekommunikation, Wissenschaft und einer ungewöhnlichen Dichte an Bundesbehörden und internationalen Organisationen. Der Mittelstand im Rhein-Sieg-Kreis arbeitet häufig als Zulieferer oder Dienstleister für genau dieses Umfeld – mit entsprechend langen Beschaffungswegen.',
    zielgruppenText:
      'Wir sprechen im Bonner Raum vor allem IT- und Ingenieurdienstleister sowie spezialisierte Beratungen an. Weil viele von ihnen im öffentlichen Umfeld arbeiten, ist die Frage nach laufenden Rahmenverträgen und deren Ende hier wichtiger als in jedem anderen von uns bearbeiteten Markt.',
    leitbranchen: ['Telekommunikation', 'Wissenschaft und Forschung', 'Öffentliche Auftraggeber', 'IT-Sicherheit'],
    erreichbarkeit:
      'Behördennahe Unternehmen folgen klassischen Bürozeiten: Zwischen 9:00 und 11:00 Uhr ist die Verbindungsquote am höchsten, freitagnachmittags praktisch null.',
  },
  essen: {
    marktText:
      'Essen hat den Wandel von der Montanindustrie zum Dienstleistungs- und Energiestandort weitgehend vollzogen. Zwei Konzernzentralen der Energiewirtschaft und ein dichtes Netz technischer Dienstleister bestimmen das Bild – und mit ihnen ein Mittelstand, der überwiegend als Zulieferer und Instandhalter arbeitet.',
    zielgruppenText:
      'Im Essener Raum rufen wir vorwiegend technische Dienstleister, Instandhaltungs- und Ingenieurbüros sowie IT-Häuser an. Diese Zielgruppe erwartet am Telefon Sachlichkeit und Zahlen; ein Gespräch, das mit Nutzenversprechen beginnt, ist hier nach zehn Sekunden beendet.',
    leitbranchen: ['Energiewirtschaft', 'Technische Dienstleistung', 'Instandhaltung', 'Logistik'],
    erreichbarkeit:
      'Technische Betriebe sind früh erreichbar – zwischen 7:00 und 8:30 Uhr, bevor der Tag verplant ist. Ab dem späten Vormittag sind die Ansprechpartner meist im Außeneinsatz.',
  },
  dortmund: {
    marktText:
      'Dortmund hat sich über den Technologiepark und die Hochschulen zu einem der wachstumsstärksten IT-Standorte Westfalens entwickelt. Neben den jungen Software- und Logistikunternehmen steht ein traditionsreicher Maschinenbau, dessen Investitionszyklen den Takt vorgeben.',
    zielgruppenText:
      'Wir arbeiten hier zweigleisig: Software- und IT-Dienstleister im Umfeld des Technologiezentrums erreichen wir über kurze, fachliche Gespräche, den produzierenden Mittelstand über den Investitions- oder Instandhaltungsanlass. Beide Gruppen brauchen unterschiedliche Gesprächsgerüste.',
    leitbranchen: ['Software und IT', 'Logistik', 'Maschinenbau', 'Versicherungen'],
    erreichbarkeit:
      'IT-Unternehmen sind vor dem ersten Tagesabgleich gegen 9:00 Uhr am besten erreichbar, produzierende Betriebe deutlich früher.',
  },
  frankfurt: {
    marktText:
      'Frankfurt ist der Finanzplatz des Kontinents, und das verändert die Akquise messbar: Compliance-Anforderungen, dokumentierte Beschaffungsprozesse und ein hoher Anteil internationaler Entscheider prägen selbst mittelständische Zulieferer. Daneben steht ein Rhein-Main-Umland mit klassischem Mittelstand und einer der dichtesten Logistikstrukturen Europas.',
    zielgruppenText:
      'Unser Schwerpunkt liegt auf Beratungs-, IT- und Personaldienstleistern, die den Finanzsektor und die Logistik beliefern. Weil die Beschaffung hier häufig formalisiert ist, klären wir im Erstkontakt konsequent, wer freigibt und ob ein Lieferantenprozess durchlaufen werden muss.',
    leitbranchen: ['Finanzdienstleistung', 'IT und Rechenzentren', 'Logistik und Luftfracht', 'Beratung'],
    erreichbarkeit:
      'Im Finanzumfeld liegt das beste Fenster nach Handelsschluss am späten Nachmittag. Der frühe Vormittag ist dort weitgehend verplant.',
  },
  muenchen: {
    marktText:
      'München verbindet Konzernzentralen, eine sehr aktive Technologieszene und einen wohlhabenden Mittelstand im Umland. Der Wettbewerb um Aufmerksamkeit ist entsprechend hoch: Entscheider in München werden häufiger kalt angerufen als in jeder anderen von uns bearbeiteten Stadt, was den Anspruch an den ersten Satz erhöht.',
    zielgruppenText:
      'Wir sprechen hier überwiegend Software- und SaaS-Anbieter, IT-Systemhäuser und spezialisierte Beratungen an. In dieser Zielgruppe ist ein recherchierter Anlass keine Kür, sondern die Voraussetzung dafür, dass das Gespräch über die Begrüßung hinauskommt.',
    leitbranchen: ['Software und SaaS', 'Automotive-Zulieferung', 'Versicherung', 'Medien'],
    erreichbarkeit:
      'Technologieunternehmen sind am späten Vormittag erreichbar, oft auch noch nach 17:30 Uhr. Der Montagvormittag ist hier durchgängig der schwächste Zeitraum.',
  },
  hamburg: {
    marktText:
      'Hamburg lebt von Hafen, Handel und Medien. Der Außenhandel bringt eine Besonderheit mit: Viele Entscheider arbeiten in Zeitzonen ihrer Handelspartner, was die Erreichbarkeit nach hinten verschiebt. Dazu kommt eine große Zahl inhabergeführter Handelshäuser mit sehr kurzen Entscheidungswegen.',
    zielgruppenText:
      'Wir rufen in Hamburg vor allem Handels-, Logistik- und Medienunternehmen sowie deren IT-Dienstleister an. In den klassischen Handelshäusern entscheidet häufig die Inhaberfamilie selbst – dort ist der Weg vom ersten Gespräch zur Entscheidung kürzer als überall sonst im Norden.',
    leitbranchen: ['Außenhandel', 'Logistik und Hafenwirtschaft', 'Medien und Verlage', 'Konsumgüter'],
    erreichbarkeit:
      'Handelsunternehmen sind früh erreichbar, ab 8:00 Uhr. Im Medienumfeld verschiebt sich das Fenster auf den Nachmittag.',
  },
  berlin: {
    marktText:
      'Berlin hat den größten Anteil junger Unternehmen unter allen deutschen Großstädten und zugleich einen stark öffentlich geprägten Sektor. Diese beiden Welten kaufen völlig unterschiedlich: schnelle, formlose Entscheidungen auf der einen Seite, langwierige Beschaffung auf der anderen.',
    zielgruppenText:
      'Unser Schwerpunkt liegt auf inhabergeführten Dienstleistern und Softwareunternehmen abseits des öffentlichen Sektors. In jungen Unternehmen ist die Ansprechperson oft nicht die Geschäftsführung, sondern die Fachbereichsleitung mit eigenem Budget – das erkennen wir im Erstgespräch, statt es vorauszusetzen.',
    leitbranchen: ['Software und Digitalwirtschaft', 'Kreativwirtschaft', 'Gesundheitswirtschaft', 'Öffentlicher Sektor'],
    erreichbarkeit:
      'Der Tag beginnt später als im Westen: Vor 10:00 Uhr lohnt sich der Versuch selten, dafür ist das Fenster bis 18:30 Uhr offen.',
  },
  stuttgart: {
    marktText:
      'Der Großraum Stuttgart hat die höchste Dichte an mittelständischen Zulieferern der Automobil- und Maschinenbauindustrie in Deutschland. Viele dieser Betriebe sind seit Generationen inhabergeführt, technisch führend und im Vertrieb bewusst zurückhaltend – ein Umfeld, in dem Sachlichkeit deutlich weiter trägt als jedes Verkaufsargument.',
    zielgruppenText:
      'Wir sprechen im Ländle vor allem technische Dienstleister, Engineering-Büros und IT-Häuser an, die diese Zulieferer beliefern. Weil hier über Investitionszyklen entschieden wird, ist die Wiedervorlage mit Datum wichtiger als der schnelle Termin.',
    leitbranchen: ['Automobilzulieferung', 'Maschinenbau', 'Engineering-Dienstleistung', 'Messtechnik'],
    erreichbarkeit:
      'Produzierende Betriebe und ihre Dienstleister sind zwischen 7:30 und 9:00 Uhr am besten erreichbar. Nach 16:00 Uhr sinkt die Quote deutlich.',
  },
  hannover: {
    marktText:
      'Hannover ist Messestadt, Versicherungsstandort und Zentrum eines flächigen niedersächsischen Mittelstands. Der Messebetrieb strukturiert das Geschäftsjahr spürbar: In den Wochen um die großen Industriemessen verschieben sich Prioritäten und Erreichbarkeiten im gesamten Umland.',
    zielgruppenText:
      'Wir rufen hier überwiegend Industriedienstleister, Versicherungsmakler und IT-Häuser an. Der Messekalender ist dabei ein doppelter Anlass: Vor der Messe geht es um Vorbereitung, danach um die Nachbearbeitung von Kontakten, für die intern selten Kapazität da ist.',
    leitbranchen: ['Messewirtschaft', 'Versicherung', 'Industriedienstleistung', 'Nutzfahrzeuge'],
    erreichbarkeit:
      'Außerhalb der Messewochen ist der Vormittag zuverlässig. Während der großen Messen planen wir keine Kampagnenwochen.',
  },
  leipzig: {
    marktText:
      'Leipzig wächst seit Jahren schneller als der Bundesdurchschnitt, getragen von Logistik, Automobilfertigung und einer wachsenden Digitalwirtschaft. Viele Unternehmen befinden sich in der Phase, in der aus dem Gründerbetrieb eine Organisation wird – und genau in dieser Phase entsteht erstmals Bedarf an strukturierter Neukundengewinnung.',
    zielgruppenText:
      'Unser Schwerpunkt liegt auf wachsenden Dienstleistern und IT-Unternehmen, bei denen die Geschäftsführung den Vertrieb bislang selbst gemacht hat. Der Anlass ist hier fast immer derselbe: Das Wachstum hat die Zeit aufgebraucht, die früher für Akquise da war.',
    leitbranchen: ['Logistik', 'Automobilfertigung', 'Digitalwirtschaft', 'Energie'],
    erreichbarkeit:
      'Der Vormittag zwischen 9:00 und 11:30 Uhr trägt am zuverlässigsten; in Logistikbetrieben lohnt zusätzlich der frühe Morgen.',
  },
  dresden: {
    marktText:
      'Dresden ist der bedeutendste Mikroelektronikstandort Europas. Um die Halbleiterfertigung hat sich ein Netz hochspezialisierter Zulieferer, Reinraum- und Messtechnikdienstleister gebildet, deren Zielmärkte fast durchweg international sind – die Akquise vor Ort betrifft daher oft nur die Zulieferkette, nicht den Endmarkt.',
    zielgruppenText:
      'Wir sprechen hier technische Dienstleister, Ingenieurbüros und IT-Unternehmen an, die die Halbleiter- und Forschungslandschaft beliefern. Diese Zielgruppe ist fachlich außerordentlich anspruchsvoll; wir qualifizieren am Telefon und beraten ausdrücklich nicht.',
    leitbranchen: ['Mikroelektronik', 'Reinraumtechnik', 'Forschung', 'Softwareentwicklung'],
    erreichbarkeit:
      'In forschungsnahen Betrieben ist der frühe Nachmittag am ergiebigsten, weil vormittags Labor- und Projektzeiten liegen.',
  },
  nuernberg: {
    marktText:
      'Die Metropolregion Nürnberg verbindet klassische Industrie mit einem starken Markt für Automatisierungs- und Medizintechnik. Fürth, Erlangen und Nürnberg bilden dabei einen zusammenhängenden Wirtschaftsraum, in dem viele Zulieferbeziehungen über Jahrzehnte gewachsen sind – neue Anbieter kommen fast ausschließlich über einen konkreten Anlass hinein.',
    zielgruppenText:
      'Wir rufen hier vorwiegend technische Dienstleister, Automatisierungsspezialisten und IT-Systemhäuser an. Weil bestehende Lieferantenbeziehungen sehr stabil sind, arbeiten wir konsequent mit Vertragsenden und Investitionszyklen statt mit allgemeinem Interesse.',
    leitbranchen: ['Automatisierungstechnik', 'Medizintechnik', 'Marktforschung', 'Logistik'],
    erreichbarkeit:
      'Der Vormittag zwischen 8:30 und 11:00 Uhr ist verlässlich; in der Medizintechnik verschiebt sich das Fenster nach hinten.',
  },
  bremen: {
    marktText:
      'Bremen verbindet Hafenwirtschaft mit Luft- und Raumfahrt sowie einer bedeutenden Nahrungsmittelindustrie. Der Wirtschaftsraum ist überschaubar und gut vernetzt – was bedeutet, dass ein unsauber geführtes Akquisegespräch schneller die Runde macht als in jedem größeren Markt.',
    zielgruppenText:
      'Unser Schwerpunkt liegt auf technischen Dienstleistern und Zulieferern der Luftfahrt- und Lebensmittelbranche sowie auf IT-Häusern. In einem Markt dieser Größe arbeiten wir bewusst mit kleineren Listen und höherer Vorbereitung je Kontakt.',
    leitbranchen: ['Luft- und Raumfahrt', 'Hafenwirtschaft', 'Nahrungsmittelindustrie', 'Windenergie'],
    erreichbarkeit:
      'Industriebetriebe sind früh erreichbar, ab 7:30 Uhr. In der Hafenlogistik lohnt zusätzlich der späte Nachmittag.',
  },
}

export function getCityAcquisition(slug: string): CityAcquisition | undefined {
  return cityAcquisition[slug]
}
