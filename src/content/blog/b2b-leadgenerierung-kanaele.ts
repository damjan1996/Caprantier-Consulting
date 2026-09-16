import type { BlogPost } from '@/lib/blog-types'

// Neuer Beitrag vom 10.09.2026. Führt elf kürzere zusammen:
// linkedin-b2b-leadgenerierung, sales-navigator-anleitung,
// cold-email-b2b-marketing, content-marketing-leadgenerierung,
// webinare-leadgenerierung-guide, messen-events-leadgenerierung,
// inbound-outbound-leadstrategie, account-based-marketing-strategie,
// social-selling-beziehungsaufbau, video-prospecting-vertrieb,
// linkedin-vs-kaltakquise. Umleitungen in config/blog-redirects.js.
//
// Die elf Vorgänger waren dasselbe Argument in elf Varianten. Ein Vergleich
// über alle Kanäle hinweg beantwortet die Suchanfrage, die dahintersteht --
// "welcher Kanal für B2B-Leads" --, die Einzelbeiträge taten es nicht.
//
// TODO(Nico): Die Spalte "Aufwand pro Termin" ist qualitativ gehalten, weil
// belastbare eigene Zahlen fehlen. Sobald aus deinen Projekten je Kanal die
// Zahl der Gespräche pro Termin vorliegt, wird daraus die interessanteste
// Tabelle der ganzen Seite.

export const b2bLeadgenerierungKanaele: BlogPost = {
  slug: 'b2b-leadgenerierung-kanaele',
  title: 'B2B-Leadgenerierung: Welcher Kanal wann funktioniert',
  description:
    'Telefon, LinkedIn, E-Mail, Content, Webinare, Messen und ABM im direkten Vergleich: Aufwand, Vorlaufzeit, Skalierbarkeit und rechtliche Grenzen jedes Kanals – und warum die Wahl an der Zielgruppengröße hängt, nicht am Trend.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-16',
  updatedAt: '2026-09-10',
  category: 'Leadgenerierung',
  tags: [
    'B2B Leadgenerierung',
    'Leadgenerierung Kanäle',
    'LinkedIn B2B',
    'Cold Email',
    'Content Marketing',
    'Account Based Marketing',
    'Inbound Outbound',
    'Social Selling',
  ],
  featured: true,
  image: '/images/blog/inbound-outbound.webp',
  faqs: [
    {
      question: 'Welcher Kanal bringt im B2B die meisten Leads?',
      answer:
        'Die Frage lässt sich nur mit der Zielgruppengröße beantworten. Bei weniger als etwa 200 relevanten Unternehmen ist der direkte Kanal – Telefon, ergänzt um persönliche LinkedIn-Ansprache – überlegen, weil jedes Gespräch zählt. Bei mehreren tausend potenziellen Kunden lohnen skalierende Kanäle wie Content und bezahlte Reichweite, die Anfragen erzeugen, statt sie einzeln zu suchen.',
    },
    {
      question: 'Ist Cold Email im B2B erlaubt?',
      answer:
        'Nein, nicht ohne vorherige ausdrückliche Einwilligung. § 7 Abs. 2 Nr. 2 UWG erlaubt für Werbung per elektronischer Post keine Ausnahme für Unternehmen – anders als beim Telefonanruf, wo die mutmaßliche Einwilligung genügt. Die einzige praktische Ausnahme ist die enge Bestandskundenregelung des § 7 Abs. 3 UWG.',
    },
    {
      question: 'Was ist besser: LinkedIn oder Kaltakquise am Telefon?',
      answer:
        'Sie lösen verschiedene Probleme. LinkedIn erreicht Entscheider, die kein Telefon mehr abnehmen, und erlaubt einen weichen Erstkontakt; es braucht aber Vorlauf und liefert selten kurzfristig Termine. Das Telefon liefert innerhalb von Tagen verwertbare Antworten – auch negative. In der Praxis funktioniert die Kombination am besten: Kontakt über LinkedIn, Termin über das Telefon.',
    },
    {
      question: 'Wie lange dauert es, bis Content Marketing Leads liefert?',
      answer:
        'Realistisch mehrere Monate bis über ein Jahr, weil erst Inhalte entstehen, dann Sichtbarkeit und erst danach Anfragen. Content ist deshalb kein Ersatz für aktive Akquise in der Anlaufphase, sondern eine parallele Investition, die deren Kosten langfristig senkt.',
    },
    {
      question: 'Was ist Account Based Marketing?',
      answer:
        'Ein Vorgehen, bei dem nicht eine Zielgruppe, sondern eine feste Liste einzelner Zielunternehmen bearbeitet wird – jedes mit eigener Ansprache über mehrere Kanäle und mehrere Rollen im Unternehmen. Es lohnt sich, wenn ein einzelner Kunde einen hohen Deckungsbeitrag hat und die Zahl möglicher Kunden klein ist.',
    },
  ],
  content: `
Die Frage nach dem besten Kanal für B2B-Leads wird meistens falsch gestellt. Sie lautet nicht "Telefon oder LinkedIn", sondern: **Wie viele Unternehmen kommen als Kunde überhaupt infrage?** Aus dieser einen Zahl folgt fast alles Weitere.

Bei 80 möglichen Kunden ist jeder Kanal falsch, der auf Reichweite setzt. Bei 8.000 ist jeder Kanal falsch, der Einzelansprache verlangt. Dieser Beitrag ordnet die sieben relevanten Kanäle nach diesem Kriterium – und nennt bei jedem die rechtliche Grenze, die in Deutschland gilt.

## Die Übersicht

| Kanal | Vorlauf | Skaliert | Rechtliche Hürde | Passt bei Zielgruppe |
|---|---|---|---|---|
| Telefon | Tage | mittel | mutmaßliche Einwilligung genügt | klein bis mittel |
| LinkedIn direkt | Wochen | gering | Plattformregeln, kein Werberecht | klein |
| E-Mail kalt | – | hoch | **Einwilligung erforderlich** | nicht ohne Einwilligung |
| Content und SEO | Monate | hoch | keine | groß |
| Webinar | Wochen | mittel | Einwilligung für Nachfassmails | mittel bis groß |
| Messe | Monate | gering | keine, Kontakt ist erbeten | mittel |
| ABM | Wochen | sehr gering | je nach Kanal | sehr klein |

## Telefon: der einzige Kanal mit sofortiger Antwort

Der direkte Anruf hat eine Eigenschaft, die kein anderer Kanal bietet: Er liefert innerhalb von Tagen eine Antwort – und zwar auch die negative. Wer 100 Entscheider anruft, weiß nach zwei Wochen, ob die Zielgruppe das Problem kennt. Wer 100 Blogartikel schreibt, weiß es nach zwei Jahren.

**Rechtlich** ist das Telefon im B2B der einzige Direktkanal mit einer echten Erleichterung. [§ 7 Abs. 2 Nr. 1 UWG](https://www.gesetze-im-internet.de/uwg_2004/__7.html) verlangt gegenüber einem sonstigen Marktteilnehmer nur eine "zumindest mutmaßliche Einwilligung" – gegenüber Verbrauchern dagegen eine vorherige ausdrückliche. Diese Unterscheidung ist der Grund, warum Telefonakquise im deutschen B2B funktioniert und im Endkundengeschäft nicht.

**Grenze:** Der Aufwand pro Termin ist hoch und lässt sich nicht durch Technik senken, nur durch bessere Listen. Der vollständige Ablauf steht im [Leitfaden zur B2B-Kaltakquise](/blog/b2b-kaltakquise-leitfaden).

## LinkedIn: Zugang, wo das Telefon nicht mehr durchkommt

In manchen Rollen – IT-Leitung, Produktmanagement, jüngere Geschäftsführung – ist das Telefon faktisch tot. Dort ist LinkedIn kein Trend, sondern der einzige verbleibende Direktkanal.

Was funktioniert:

- **Kontaktanfrage ohne Nachricht**, danach zwei bis drei Wochen Sichtbarkeit über eigene Beiträge, dann eine Nachricht mit konkretem Anlass.
- **Kommentieren statt Anschreiben.** Ein fachlicher Kommentar unter einem Beitrag des Entscheiders erzeugt mehr Aufmerksamkeit als jede Direktnachricht.
- **Eine Nachricht, eine Frage.** Wer im ersten Kontakt eine Leistung präsentiert, wird ignoriert oder blockiert.

Was nicht funktioniert: automatisierte Nachrichtensequenzen. Sie verstoßen gegen die Nutzungsbedingungen der Plattform, führen zu Kontosperren, und ihre Antwortquoten sinken seit Jahren, weil jeder Empfänger das Muster erkennt.

**Grenze:** LinkedIn erzeugt Beziehungen, aber selten kurzfristig Termine. Die Kombination trägt: Kontakt über LinkedIn aufbauen, Termin über das Telefon vereinbaren. Genau deshalb ist die verbreitete Gegenüberstellung "LinkedIn oder Kaltakquise" eine falsche Alternative.

## E-Mail: der Kanal, bei dem die meisten rechtlich falsch liegen

Kalte Werbe-E-Mails sind in Deutschland auch gegenüber Unternehmen unzulässig, solange keine vorherige ausdrückliche Einwilligung vorliegt. § 7 Abs. 2 Nr. 2 UWG kennt für elektronische Post **keine** Entsprechung zur mutmaßlichen Einwilligung beim Telefonat.

Das ist der wichtigste Unterschied in diesem gesamten Beitrag, und er wird regelmäßig verwischt – meist von Anbietern automatisierter Outreach-Werkzeuge, deren Rechtsraum ein anderer ist.

Was zulässig bleibt:

- **Angeforderte Unterlagen** nach einem Telefonat. Die Grenze verläuft an der Bitte des Empfängers.
- **Bestandskunden** im engen Rahmen des § 7 Abs. 3 UWG: Adresse beim Verkauf erlangt, eigene ähnliche Leistung, Widerspruchshinweis bei jeder Verwendung.
- **Newsletter mit dokumentierter Einwilligung**, üblicherweise über ein Double-Opt-in.

Hinzu kommt die Informationspflicht aus [Art. 14 DSGVO](https://dsgvo-gesetz.de/art-14-dsgvo/), wenn die Adresse recherchiert und nicht beim Empfänger erhoben wurde. Details im [Beitrag zu den rechtlichen Grundlagen](/blog/kaltakquise-rechtliche-grundlagen).

## Content und SEO: langsam, aber kumulativ

Fachbeiträge, die eine echte Frage beantworten, erzeugen Anfragen von Menschen, die bereits suchen. Der Kanal hat zwei Eigenschaften, die ihn von allen anderen unterscheiden: Er braucht Monate bis zur ersten Wirkung, und die Wirkung hört nicht auf, wenn man aufhört zu zahlen.

Was in diesem Kanal tatsächlich zählt, ist nicht Menge, sondern Tiefe. Fünfzig kurze Beiträge zu überlappenden Themen bewirken weniger als zehn, die eine Frage vollständig beantworten – eine Erfahrung, die dieser Blog selbst gemacht hat.

**Grenze:** Als alleiniger Kanal in der Anlaufphase ungeeignet. Wer heute Kunden braucht, kann nicht auf einen Kanal setzen, der in neun Monaten wirkt.

## Webinare: Qualifizierung durch Selbstauswahl

Ein Fachwebinar erzeugt weniger Kontakte als eine Kampagne, aber besser vorqualifizierte: Wer 45 Minuten investiert, hat das Problem.

Drei Dinge entscheiden über den Ertrag: ein Thema, das eine konkrete Frage beantwortet statt die eigene Leistung vorzustellen; eine Aufzeichnung, die anschließend als Inhalt weiterlebt; und ein Nachfassen per Telefon statt per Mail-Sequenz – letztere braucht ohnehin eine Einwilligung.

**Grenze:** Der Aufwand pro Durchführung bleibt konstant, die Teilnehmerzahl schwankt stark.

## Messen: teuer, aber rechtlich unkompliziert

Der Messekontakt ist der einzige Erstkontakt, den der Interessent selbst herstellt. Damit entfällt die gesamte Diskussion um Einwilligungen – und die Nachfassquote ist entsprechend hoch, sofern innerhalb weniger Tage nachgefasst wird.

Der Fehler, der den Kanal regelmäßig entwertet, ist die Nachbearbeitung: Visitenkarten, die drei Wochen liegen bleiben, sind wertlos. Die Nachfassliste gehört noch am Messetag ins CRM, mit Notiz zum Gesprächsinhalt.

**Grenze:** hohe Fixkosten, geringe Skalierbarkeit, langer Vorlauf.

## Account Based Marketing: wenn die Liste kürzer ist als 50

ABM dreht die übliche Logik um: Statt einer Zielgruppe wird eine namentliche Liste einzelner Unternehmen bearbeitet, jedes mit eigener Ansprache und über mehrere Rollen hinweg – Geschäftsführung, Fachbereich, Einkauf.

Das lohnt sich, wenn ein einzelner Kunde einen sehr hohen Deckungsbeitrag hat und die Zahl möglicher Kunden klein ist. In dieser Konstellation ist jede Streuung Verschwendung. Wie man die verschiedenen Rollen eines Zielunternehmens sauber auseinanderhält, steht im [Beitrag zur Lead-Qualifizierung](/blog/bant-methode-erklaert).

**Grenze:** extrem aufwendig pro Kontakt. Bei mehr als etwa 50 Zielunternehmen bricht das Modell wirtschaftlich zusammen.

## Die eine Kennzahl, die alle Kanäle vergleichbar macht

Kanäle lassen sich nicht über Kontaktzahlen vergleichen – ein Messekontakt und ein Newsletter-Öffner sind nicht dieselbe Einheit. Vergleichbar wird es erst über die **Kosten je stattgefundenem qualifiziertem Termin**.

Die Rechnung ist einfach und wird trotzden selten aufgestellt:

> Alle Kosten des Kanals im Zeitraum, geteilt durch die Zahl der Termine, die daraus tatsächlich stattgefunden haben.

Drei Details entscheiden darüber, ob die Zahl brauchbar ist:

**Eigene Arbeitszeit zählt mit.** Ein Kanal, der "nichts kostet", weil die Geschäftsführung ihn selbst betreibt, ist meist der teuerste. Die Stunde der Geschäftsführung ist der knappste Rohstoff im Unternehmen.

**Stattgefunden, nicht vereinbart.** Ein Kanal, der viele Termine erzeugt, von denen die Hälfte platzt, sieht in der Vereinbarungsstatistik gut aus und in der Wahrheit schlecht.

**Der Zeitraum muss zum Kanal passen.** Content über drei Monate zu bewerten ergibt eine unendlich hohe Zahl. Sinnvoll ist ein rollierender Zwölfmonatszeitraum – oder die getrennte Betrachtung von Kanälen mit Vorlauf und solchen ohne.

Wer diese Zahl für zwei Kanäle über zwölf Monate führt, braucht keine Kanaldiskussion mehr. Wie man sie in der laufenden Steuerung mitführt, steht im [Beitrag zur Vertriebssteuerung](/blog/vertriebssteuerung-kpis-pipeline).

## Warum Kanalmix-Empfehlungen meist scheitern

Die verbreitete Empfehlung lautet, mehrere Kanäle parallel zu bespielen. Sie ist richtig und wird trotzdem regelmäßig zum Problem, aus einem einfachen Grund: **Jeder Kanal hat eine Mindestintensität, unterhalb derer er nichts liefert.**

Zwei LinkedIn-Beiträge im Quartal erzeugen keine Sichtbarkeit. Zwanzig Anrufe im Monat erzeugen keine belastbare Statistik. Ein Blogbeitrag alle sechs Wochen erzeugt keine thematische Autorität. Wer fünf Kanäle mit je einem Fünftel der nötigen Intensität betreibt, hat fünfmal nichts – und schließt daraus, dass keiner funktioniert.

Die belastbarere Reihenfolge lautet: **einen Kanal über die Mindestintensität bringen, ihn messen, erst dann den zweiten anfangen.** Für die meisten B2B-Dienstleister mit begrenzter Kapazität ist der erste Kanal das Telefon – nicht weil es der angenehmste ist, sondern weil er als einziger innerhalb von Wochen eine Antwort liefert, an der sich alles Weitere ausrichten lässt.

## Die Entscheidung in einem Satz

Man nehme die Zahl der Unternehmen, die als Kunde realistisch infrage kommen:

- **Unter 50:** ABM, ergänzt um Telefon. Jedes Unternehmen einzeln.
- **50 bis 500:** Telefon als Hauptkanal, LinkedIn zur Vorbereitung, Content parallel als Investition.
- **500 bis 5.000:** Telefon plus Content plus Webinare. Ab hier lohnt Systematik.
- **Über 5.000:** Content, bezahlte Reichweite und Inbound tragen; Telefon nur noch für den qualifizierten Teil der Anfragen.

Der häufigste Fehler ist, einen Kanal zu wählen, weil er gerade besprochen wird, statt weil er zur Zielgruppengröße passt. Der zweithäufigste ist, alle sieben gleichzeitig anzufangen.

Welchen Teil davon wir übernehmen, steht unter [Leistungen](/leistungen); für den regionalen Zuschnitt gibt es Seiten wie die zur [Vertriebsagentur Frankfurt](/leistungen/frankfurt) und zur [Kaltakquise in Köln](/kaltakquise/koeln).

## Quellen

- [§ 7 UWG – Unzumutbare Belästigungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__7.html)
- [Art. 14 DSGVO – Informationspflicht bei Daten aus Drittquellen](https://dsgvo-gesetz.de/art-14-dsgvo/)
- [Ärger mit Rufnummern und Anrufen, Bundesnetzagentur](https://www.bundesnetzagentur.de/DE/Vportal/TK/Aerger/start.html)
  `.trim(),
}
