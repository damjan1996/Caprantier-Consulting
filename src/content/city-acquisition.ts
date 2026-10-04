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
 * deshalb hier eigene Absätze mit lokalem Bezug --
 * Branchenstruktur und wer vor Ort angerufen wird. Zeitfenster je Stadt gibt es
 * nicht; die Seiten nennen nur den allgemeinen Erfahrungswert.
 *
 * `scripts/check-content-duplication.mjs` prüft bei jedem `pnpm verify`, dass
 * sich kein Textblock über zwei Städte hinweg wiederholt und dass sich diese
 * Texte nicht mit `regionalText` aus `cities.ts` überschneiden.
 */

export interface CityAcquisition {
  /** Wirtschaftsstruktur vor Ort, zwei bis drei Sätze. Eigenständig je Stadt. */
  marktText: string
  /** Welche Zielgruppen hier in Frage kommen. Eigenständig je Stadt. */
  zielgruppenText: string
  /** Leitbranchen am Ort, für Aufzählung und Metadaten. */
  leitbranchen: string[]
}

export const cityAcquisition: Record<string, CityAcquisition> = {
  koeln: {
    marktText:
      'Köln ist der Sitz von Carpantier Consulting. Medien, Versicherungswirtschaft und ein breiter inhabergeführter Mittelstand liegen hier nah beieinander.',
    zielgruppenText:
      'Für das Angebot kommen im Kölner Raum vor allem Dienstleister mit fünf bis fünfzig Mitarbeitern in Frage – Agenturen, IT-Häuser, Personalvermittler und Beratungen. In dieser Größenordnung ist die Geschäftsführung häufig zugleich Entscheider und Fachbereich.',
    leitbranchen: ['Medien und Agenturen', 'Versicherungswirtschaft', 'IT-Dienstleistung', 'Handel und Logistik'],
  },
  duesseldorf: {
    marktText:
      'Düsseldorf ist Landeshauptstadt, Messestandort und Sitz vieler Landesgesellschaften internationaler Konzerne. Neben dem klassischen Mittelstand gibt es hier deshalb Niederlassungen, deren Budgetentscheidungen an anderer Stelle fallen.',
    zielgruppenText:
      'In Frage kommen inhabergeführte Beratungs-, Werbe- und Handelsunternehmen sowie IT-Dienstleister zwischen Medienhafen und Ratinger Umland. Bei Landesgesellschaften ist vorab zu klären, ob über die Beauftragung vor Ort oder in der Zentrale entschieden wird.',
    leitbranchen: ['Unternehmensberatung', 'Werbung und Kommunikation', 'Mode und Handel', 'Telekommunikation'],
  },
  bonn: {
    marktText:
      'Bonn ist geprägt von Telekommunikation, Wissenschaft sowie Bundesbehörden und internationalen Organisationen. Der Mittelstand im Rhein-Sieg-Kreis arbeitet häufig als Zulieferer oder Dienstleister für dieses Umfeld.',
    zielgruppenText:
      'In Frage kommen vor allem IT- und Ingenieurdienstleister sowie spezialisierte Beratungen. Wer im öffentlichen Umfeld arbeitet, hat oft laufende Rahmenverträge, deren Ende ein möglicher Anlass für ein Gespräch ist.',
    leitbranchen: ['Telekommunikation', 'Wissenschaft und Forschung', 'Öffentliche Auftraggeber', 'IT-Sicherheit'],
  },
  essen: {
    marktText:
      'Essen hat den Wandel von der Montanindustrie zum Dienstleistungs- und Energiestandort weitgehend vollzogen. Zwei Konzernzentralen der Energiewirtschaft und ein dichtes Netz technischer Dienstleister bestimmen das Bild – und mit ihnen ein Mittelstand, der überwiegend als Zulieferer und Instandhalter arbeitet.',
    zielgruppenText:
      'In Frage kommen technische Dienstleister, Instandhaltungs- und Ingenieurbüros sowie IT-Häuser, die Energiewirtschaft und Industrie beliefern.',
    leitbranchen: ['Energiewirtschaft', 'Technische Dienstleistung', 'Instandhaltung', 'Logistik'],
  },
  dortmund: {
    marktText:
      'Dortmund hat sich über den Technologiepark und die Hochschulen zu einem wichtigen IT-Standort Westfalens entwickelt. Neben den jungen Software- und Logistikunternehmen steht ein traditionsreicher Maschinenbau.',
    zielgruppenText:
      'In Frage kommen Software- und IT-Dienstleister im Umfeld des Technologiezentrums sowie der produzierende Mittelstand und seine technischen Dienstleister. Der Anlass für ein Gespräch ist in beiden Gruppen ein anderer: hier der Wachstumsschritt, dort die Investition oder die Instandhaltung.',
    leitbranchen: ['Software und IT', 'Logistik', 'Maschinenbau', 'Versicherungen'],
  },
  frankfurt: {
    marktText:
      'Frankfurt ist ein bedeutender Finanzplatz Europas. Compliance-Anforderungen und formalisierte Beschaffungsprozesse prägen dort auch viele mittelständische Zulieferer; daneben steht ein Rhein-Main-Umland mit klassischem Mittelstand und viel Logistik.',
    zielgruppenText:
      'In Frage kommen Beratungs-, IT- und Personaldienstleister, die den Finanzsektor und die Logistik beliefern. Weil die Beschaffung dort häufig formalisiert ist, ist vorab zu klären, wer freigibt und ob ein Lieferantenprozess zu durchlaufen ist.',
    leitbranchen: ['Finanzdienstleistung', 'IT und Rechenzentren', 'Logistik und Luftfracht', 'Beratung'],
  },
  muenchen: {
    marktText:
      'München verbindet Konzernzentralen, eine aktive Technologieszene und einen wohlhabenden Mittelstand im Umland. Besonders viele Software- und IT-Unternehmen haben hier ihren Sitz.',
    zielgruppenText:
      'In Frage kommen Software- und SaaS-Anbieter, IT-Systemhäuser und spezialisierte Beratungen. Ein Anruf braucht in dieser Zielgruppe einen erkennbaren Anlass, damit er über die Begrüßung hinauskommt.',
    leitbranchen: ['Software und SaaS', 'Automotive-Zulieferung', 'Versicherung', 'Medien'],
  },
  hamburg: {
    marktText:
      'Hamburg lebt von Hafen, Handel und Medien. Dazu kommt eine große Zahl inhabergeführter Handelshäuser.',
    zielgruppenText:
      'In Frage kommen Handels-, Logistik- und Medienunternehmen sowie deren IT-Dienstleister. In klassischen Handelshäusern entscheidet häufig die Inhaberfamilie selbst.',
    leitbranchen: ['Außenhandel', 'Logistik und Hafenwirtschaft', 'Medien und Verlage', 'Konsumgüter'],
  },
  berlin: {
    marktText:
      'Berlin hat viele junge Unternehmen und zugleich einen stark öffentlich geprägten Sektor. Beide Seiten beschaffen unterschiedlich: formloser und schneller auf der einen, formalisiert auf der anderen.',
    zielgruppenText:
      'In Frage kommen inhabergeführte Dienstleister und Softwareunternehmen abseits des öffentlichen Sektors. In jungen Unternehmen ist die Ansprechperson oft die Fachbereichsleitung mit eigenem Budget und nicht die Geschäftsführung.',
    leitbranchen: ['Software und Digitalwirtschaft', 'Kreativwirtschaft', 'Gesundheitswirtschaft', 'Öffentlicher Sektor'],
  },
  stuttgart: {
    marktText:
      'Der Großraum Stuttgart ist stark von mittelständischen Zulieferern der Automobil- und Maschinenbauindustrie geprägt. Viele dieser Betriebe sind seit Generationen inhabergeführt.',
    zielgruppenText:
      'In Frage kommen technische Dienstleister, Engineering-Büros und IT-Häuser, die diese Zulieferer beliefern. Weil dort über Investitionszyklen entschieden wird, hat ein Gespräch häufig einen langen Vorlauf; eine Wiedervorlage mit Datum gehört dazu.',
    leitbranchen: ['Automobilzulieferung', 'Maschinenbau', 'Engineering-Dienstleistung', 'Messtechnik'],
  },
  hannover: {
    marktText:
      'Hannover ist Messestadt, Versicherungsstandort und Zentrum eines flächigen niedersächsischen Mittelstands. Der Messekalender gibt dem Geschäftsjahr vieler Unternehmen im Umland eine feste Struktur.',
    zielgruppenText:
      'In Frage kommen Industriedienstleister, Versicherungsmakler und IT-Häuser. Der Messekalender kann dabei ein Anlass sein: vor der Messe die Vorbereitung, danach die Nachbearbeitung der Kontakte.',
    leitbranchen: ['Messewirtschaft', 'Versicherung', 'Industriedienstleistung', 'Nutzfahrzeuge'],
  },
  leipzig: {
    marktText:
      'Leipzig wächst seit Jahren, getragen von Logistik, Automobilfertigung und einer wachsenden Digitalwirtschaft. Viele Unternehmen befinden sich in der Phase, in der aus dem Gründerbetrieb eine Organisation wird.',
    zielgruppenText:
      'In Frage kommen wachsende Dienstleister und IT-Unternehmen, bei denen die Geschäftsführung den Vertrieb bislang selbst gemacht hat. Ein häufiger Anlass ist, dass das Wachstum die Zeit für Akquise aufgebraucht hat.',
    leitbranchen: ['Logistik', 'Automobilfertigung', 'Digitalwirtschaft', 'Energie'],
  },
  dresden: {
    marktText:
      'Dresden ist ein bedeutender Mikroelektronikstandort Europas. Um die Halbleiterfertigung hat sich ein Netz spezialisierter Zulieferer sowie Reinraum- und Messtechnikdienstleister gebildet, deren Zielmärkte häufig international sind.',
    zielgruppenText:
      'In Frage kommen technische Dienstleister, Ingenieurbüros und IT-Unternehmen, die die Halbleiter- und Forschungslandschaft beliefern. Am Telefon wird qualifiziert, fachlich beraten wird dort nicht.',
    leitbranchen: ['Mikroelektronik', 'Reinraumtechnik', 'Forschung', 'Softwareentwicklung'],
  },
  nuernberg: {
    marktText:
      'Die Metropolregion Nürnberg verbindet klassische Industrie mit einem starken Markt für Automatisierungs- und Medizintechnik. Fürth, Erlangen und Nürnberg bilden einen zusammenhängenden Wirtschaftsraum, in dem viele Zulieferbeziehungen über Jahrzehnte gewachsen sind.',
    zielgruppenText:
      'In Frage kommen technische Dienstleister, Automatisierungsspezialisten und IT-Systemhäuser. Wo Lieferantenbeziehungen lange bestehen, sind Vertragsenden und Investitionszyklen ein naheliegender Anlass.',
    leitbranchen: ['Automatisierungstechnik', 'Medizintechnik', 'Marktforschung', 'Logistik'],
  },
  bremen: {
    marktText:
      'Bremen verbindet Hafenwirtschaft mit Luft- und Raumfahrt sowie einer bedeutenden Nahrungsmittelindustrie. Der Wirtschaftsraum ist überschaubar und gut vernetzt.',
    zielgruppenText:
      'In Frage kommen technische Dienstleister und Zulieferer der Luftfahrt- und Lebensmittelbranche sowie IT-Häuser. In einem überschaubaren Markt lohnt sich eine gründliche Vorbereitung je Kontakt.',
    leitbranchen: ['Luft- und Raumfahrt', 'Hafenwirtschaft', 'Nahrungsmittelindustrie', 'Windenergie'],
  },
}

export function getCityAcquisition(slug: string): CityAcquisition | undefined {
  return cityAcquisition[slug]
}
