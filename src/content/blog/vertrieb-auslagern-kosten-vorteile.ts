import type { BlogPost } from '@/lib/blog-types'

// Zusammenführung vom 10.09.2026: ersetzt zusätzlich sdr-as-a-service,
// inhouse-team-vs-vertriebsagentur und hybrid-vertrieb-modell.
// Umleitungen in config/blog-redirects.js.
//
// Dieser Beitrag ist einer der vier, die am 10.09.2026 überhaupt im Google-
// Index standen – und der einzige, dessen Snippet bereits einen Preis nennt.
// Der Slug bleibt deshalb unverändert.
//
// TODO(Nico): Die Vollkostenrechnung für den eigenen Vertriebsmitarbeiter
// arbeitet mit Marktbandbreiten. Sobald eine echte Kalkulation aus einem
// Kundenprojekt vorliegt (Zielgehalt, Einarbeitungsdauer bis zum ersten
// eigenen Termin, tatsächliche Terminzahl im ersten Halbjahr), gehört sie
// hier hinein – mit Quelle und Freigabe.

export const vertriebAuslagernKostenVorteile: BlogPost = {
  slug: 'vertrieb-auslagern-kosten-vorteile',
  title: 'Vertrieb auslagern: Kosten, Modelle und wann es sich rechnet',
  description:
    'Was Vertriebsoutsourcing kostet, welche Abrechnungsmodelle es gibt und wie sich eine externe Vertriebsagentur gegen einen eigenen Vertriebsmitarbeiter rechnet – mit Vollkostenvergleich und den Fällen, in denen Auslagern die falsche Antwort ist.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-18',
  updatedAt: '2026-09-10',
  category: 'Vertriebsoutsourcing',
  tags: [
    'Vertrieb auslagern',
    'Vertriebsoutsourcing',
    'Vertriebsagentur',
    'Kosten Vertriebsoutsourcing',
    'SDR as a Service',
    'externer Vertrieb',
    'Sales Outsourcing',
    'Vertriebsdienstleister',
  ],
  featured: true,
  image: '/images/blog/vertrieb-auslagern.webp',
  faqs: [
    {
      question: 'Was kostet es, den Vertrieb auszulagern?',
      answer:
        'Der Markt für B2B-Kaltakquise im DACH-Raum bewegt sich überwiegend zwischen etwa 2.000 und 8.000 Euro monatlich, je nach Umfang; pro qualifiziertem Entscheidertermin werden Größenordnungen um 300 Euro genannt. Vollservice-Mandate mit Strategie, Reporting und mehreren Kampagnen liegen darüber. Der Preis hängt vor allem an der Zahl der wöchentlichen Akquisestunden, nicht an der Branche.',
    },
    {
      question: 'Was ist SDR as a Service?',
      answer:
        'Ein Modell, bei dem ein externer Sales Development Representative ausschließlich den vorderen Teil des Vertriebs übernimmt: Liste, Erstansprache, Qualifizierung und Terminvereinbarung. Das Verkaufsgespräch, das Angebot und der Abschluss bleiben beim Auftraggeber. Es ist die schlankste Form des Vertriebsoutsourcings und passt zu Unternehmen, die abschließen können, aber keine Termine haben.',
    },
    {
      question: 'Rechnet sich eine Vertriebsagentur gegenüber einem eigenen Mitarbeiter?',
      answer:
        'Die Frage entscheidet sich nicht am Monatsbetrag, sondern an drei Größen: Vollkosten statt Bruttogehalt, Zeit bis zur Produktivität und Auslastung. Ein eigener Mitarbeiter kostet inklusive Arbeitgeberanteil, Ausstattung, Führung und Ausfallzeiten deutlich mehr als sein Gehalt und ist mehrere Monate lang nicht produktiv. Er lohnt sich, sobald dauerhaft Vollauslastung besteht.',
    },
    {
      question: 'Wann ist Vertriebsoutsourcing die falsche Entscheidung?',
      answer:
        'Wenn das Angebot noch nicht verkauft wurde. Eine Agentur kann Termine liefern, aber keine Positionierung ersetzen: Wer selbst noch nicht weiß, welches Problem er für wen löst und was es kostet, bekommt teure Gespräche ohne Abschluss. Ebenfalls ungeeignet ist der Fall, in dem intern niemand Zeit hat, die gelieferten Termine wahrzunehmen.',
    },
    {
      question: 'Ist eine ausgelagerte Akquise Arbeitnehmerüberlassung?',
      answer:
        'Nein, solange ein Dienst- oder Werkvertrag vorliegt und der Dienstleister eigenverantwortlich arbeitet. Arbeitnehmerüberlassung nach dem AÜG setzt voraus, dass der Auftraggeber weisungsbefugt gegenüber der eingesetzten Person ist und sie in seine Arbeitsorganisation eingliedert. Wer einem externen Akquisemitarbeiter feste Arbeitszeiten und einen Arbeitsplatz im eigenen Betrieb vorgibt, nähert sich dieser Grenze.',
    },
  ],
  content: `
Die Frage "Was kostet es, den Vertrieb auszulagern?" hat keine einzelne Antwort, aber einen klaren Rahmen. Dieser Beitrag liefert beides: die Bandbreiten der gängigen Abrechnungsmodelle und die Rechnung, die tatsächlich entscheidet – der Vergleich mit den Vollkosten eines eigenen Vertriebsmitarbeiters.

## Die vier Abrechnungsmodelle

Im deutschen Markt sind vier Modelle verbreitet. Sie unterscheiden sich nicht nur im Preis, sondern darin, wer welches Risiko trägt.

### 1. Pilotprojekt mit festem Stundenkontingent

Ein abgegrenztes Kontingent an Akquisestunden zu einem Festpreis, typischerweise über vier bis acht Wochen. Der Auftraggeber kauft Aktivität, nicht Ergebnis.

**Geeignet für:** den ersten Test. Nach einem Pilotprojekt ist bekannt, wie die Zielgruppe reagiert, welche Einwände kommen und wie viele Gespräche für einen Termin nötig sind. Diese Daten sind der eigentliche Ertrag.

**Risiko:** liegt beim Auftraggeber. Wenn die Liste oder das Angebot nicht trägt, ist das Kontingent trotzdem verbraucht – allerdings mit einer belastbaren Erkenntnis als Gegenwert.

### 2. Monatlicher Retainer

Eine feste monatliche Vergütung für eine vereinbarte Zahl wöchentlicher Akquisestunden. Das mit Abstand häufigste Modell für laufende Zusammenarbeit.

**Geeignet für:** kontinuierliche Neukundengewinnung, wenn das Angebot validiert ist. Der Retainer ist planbar und erlaubt es, über mehrere Monate hinweg zu optimieren – was bei Kaltakquise entscheidend ist, weil die ersten Wochen fast immer die schlechtesten sind.

**Risiko:** geteilt. Der Dienstleister bindet Kapazität, der Auftraggeber bindet Budget.

### 3. Vergütung pro qualifiziertem Termin

Bezahlt wird je vereinbartem Entscheidertermin, der definierte Kriterien erfüllt. Googles eigene KI-Übersicht nennt für den deutschen Markt Größenordnungen um 300 Euro pro qualifiziertem Termin.

**Geeignet für:** Auftraggeber, die maximale Kostenklarheit wollen.

**Der Haken, den man kennen sollte:** Dieses Modell schafft einen Anreiz zur Menge. Was ein qualifizierter Termin ist, muss deshalb vor Projektbeginn schriftlich und messbar definiert sein – Rolle des Gesprächspartners, erkennbarer Bedarf, Zeithorizont, und was passiert, wenn der Termin nicht stattfindet. Fehlt diese Definition, entsteht Streit statt Pipeline.

### 4. Erfolgsprovision auf den Abschluss

Vergütung erst, wenn ein Vertrag zustande kommt. Klingt für den Auftraggeber ideal und wird von seriösen Anbietern regelmäßig abgelehnt.

Der Grund ist nicht Bequemlichkeit: Der Dienstleister hat auf den Abschluss keinen Einfluss. Er kann den Termin liefern; ob im Verkaufsgespräch überzeugt wird, ob das Angebot marktgerecht ist und ob nachgefasst wird, liegt außerhalb seiner Kontrolle. Wer trotzdem rein erfolgsabhängig arbeitet, muss das Risiko einpreisen – über eine Provisionshöhe, die den Auftraggeber am Ende teurer kommt als ein Retainer.

Rechtlich ist diese Konstruktion im Übrigen dem Handelsvertreter nahe. [§ 84 HGB](https://www.gesetze-im-internet.de/hgb/__84.html) definiert: "Handelsvertreter ist, wer als selbständiger Gewerbetreibender ständig damit betraut ist, für einen anderen Unternehmer Geschäfte zu vermitteln oder in dessen Namen abzuschließen." Damit greifen Vorschriften, die im Dienstleistungsverhältnis nicht gelten – unter anderem der Ausgleichsanspruch nach § 89b HGB.

## Der Vergleich, der tatsächlich entscheidet

Die meisten Kostenvergleiche stellen den Monatspreis der Agentur dem Bruttogehalt eines Vertriebsmitarbeiters gegenüber. Das ist die falsche Rechnung, weil auf der einen Seite Vollkosten stehen und auf der anderen nur ein Teil.

Ein eigener Mitarbeiter im Vertriebsinnendienst kostet zusätzlich zum Bruttogehalt:

| Position | Warum sie zählt |
|---|---|
| Arbeitgeberanteil zur Sozialversicherung | rund ein Fünftel des Bruttogehalts, gesetzlich |
| Arbeitsplatz, Telefonie, CRM-Lizenz | fällt ab Tag 1 an, unabhängig von Produktivität |
| Einarbeitung | mehrere Monate bis zum ersten selbst erarbeiteten Termin |
| Führung | Zeit der Geschäftsführung, die sonst verkauft |
| Urlaub, Krankheit, Fluktuation | Akquise pausiert vollständig |
| Recruiting bei Neubesetzung | erneut Zeit und Kosten |

Die letzte Zeile ist die teuerste und wird am häufigsten vergessen: Vertriebsinnendienst hat eine hohe Fluktuation. Wer einen Mitarbeiter nach neun Monaten verliert, hat die Einarbeitung bezahlt und nichts davon behalten.

Dem gegenüber steht bei einer externen Lösung: keine Lohnnebenkosten, Produktivität ab der ersten Woche, keine Ausfallzeiten – aber auch kein Aufbau von internem Wissen und eine Abhängigkeit vom Dienstleister.

**Die Faustregel, die daraus folgt:** Ein eigener Mitarbeiter lohnt sich, sobald dauerhaft Vollauslastung besteht und das Vertriebswissen strategisch im Haus bleiben soll. Wann dieser Punkt erreicht ist und worauf es bei der Besetzung ankommt, steht im [Beitrag zum Aufbau eines Vertriebsteams](/blog/vertriebsteam-aufbauen-recruiting). Solange der Bedarf schwankt oder unter einer vollen Stelle liegt, ist die externe Lösung günstiger – nicht wegen des Stundensatzes, sondern weil keine Leerlaufzeit bezahlt wird.

## Das hybride Modell

In der Praxis ist die Frage selten "entweder oder". Die verbreitetste Aufteilung trennt nach Prozessschritt statt nach Person:

- **Extern:** Listenaufbau, Erstansprache, Qualifizierung, Terminvereinbarung – der Teil, der Volumen und Frustrationstoleranz braucht.
- **Intern:** Verkaufsgespräch, Angebot, Verhandlung, Abschluss, Betreuung – der Teil, der Produktwissen und Entscheidungsbefugnis braucht.

Das ist genau der Zuschnitt von **SDR as a Service**. Der Sales Development Representative arbeitet den vorderen Trichter ab; der Abschluss bleibt dort, wo das Produkt zu Hause ist. Für die meisten B2B-Dienstleister mit fünf bis fünfzig Mitarbeitern ist das die wirtschaftlichste Aufteilung, weil der Engpass fast nie beim Abschluss liegt, sondern bei der Zahl der Gespräche.

Damit die Übergabe funktioniert, braucht es drei Festlegungen: eine gemeinsame Definition des qualifizierten Termins, ein einziges System, in dem beide Seiten dokumentieren, und einen festen wöchentlichen Abgleich. Wie man das messbar hält, steht im [Beitrag zur Vertriebssteuerung](/blog/vertriebssteuerung-kpis-pipeline).

## Die arbeitsrechtliche Grenze

Ein Punkt, der bei enger Zusammenarbeit relevant wird: Auslagerung ist keine Arbeitnehmerüberlassung, solange der Dienstleister eigenverantwortlich arbeitet. Das [Gesetz zur Regelung der Arbeitnehmerüberlassung](https://www.gesetze-im-internet.de/a_g/) greift, wenn Personen in die Arbeitsorganisation des Auftraggebers eingegliedert und dessen Weisungen unterstellt werden – dann ist eine Erlaubnis erforderlich, und ohne sie drohen erhebliche Folgen bis hin zum fingierten Arbeitsverhältnis.

Praktisch heißt das: Zielvorgaben, Zielgruppen und Gesprächsinhalte darf der Auftraggeber bestimmen. Feste Anwesenheitszeiten, ein Arbeitsplatz im eigenen Betrieb und die direkte Weisung im Tagesgeschäft gehören nicht dazu.

## Wie ein Pilotprojekt tatsächlich abläuft

Weil der Pilot das übliche Einstiegsmodell ist, lohnt ein Blick auf den realen Ablauf. Er erklärt zugleich, warum vier Wochen zu kurz sind.

**Woche 1 – Zielbild und Liste.** Zielgruppe schärfen, Auswahlkriterium festlegen, Liste aufbauen und anreichern. Parallel entstehen Gesprächsgerüst, Qualifizierungsfragen und die Definition des qualifizierten Termins. In dieser Woche wird nicht telefoniert, und das ist richtig so: Jede Stunde hier spart später drei.

**Woche 2 bis 3 – Kalibrierung.** Die ersten Gespräche laufen. Sie sind statistisch die schlechtesten des gesamten Projekts, weil Einstieg und Einwandbehandlung noch nicht an der Realität geprüft sind. Der Ertrag dieser Wochen sind nicht Termine, sondern Absagegründe: Sie zeigen, ob die Zielgruppe das Problem überhaupt hat.

**Woche 4 bis 6 – Nachschärfen.** Einstieg, Anlass und Zielgruppenzuschnitt werden anhand der Absagegründe korrigiert. Hier steigt die Terminquote in der Regel deutlich – oder es zeigt sich, dass die Zielgruppe falsch gewählt war. Beides ist ein verwertbares Ergebnis.

**Woche 7 bis 8 – Serie.** Erst jetzt läuft die Kampagne im eingeschwungenen Zustand. Was in diesen Wochen an Terminen entsteht, ist die Zahl, mit der sich hochrechnen lässt.

Wer nach Woche 4 abbricht, hat die Kalibrierung bezahlt und den Ertrag nicht abgeholt. Das ist der teuerste Fehler im gesamten Modell – und der häufigste.

## Was ein Pilot liefert, selbst wenn kein Auftrag entsteht

Auch ein Pilotprojekt ohne Abschluss ist selten wertlos, weil es drei Dinge belegt, die vorher Vermutungen waren:

- **Ob die Zielgruppe das Problem kennt.** Wenn 80 von 100 Entscheidern sagen, das Thema sei bei ihnen nicht relevant, ist das keine Vertriebsschwäche, sondern eine Marktinformation.
- **Was der echte Einwand ist.** Der Einwand, den ein Unternehmen bei sich selbst vermutet, und der, der tatsächlich kommt, sind erfahrungsgemäß nicht derselbe.
- **Wie viele Gespräche ein Termin kostet.** Diese Zahl ist die Grundlage jeder späteren Planung, intern wie extern. Ohne sie ist jede Vertriebsplanung geraten.

Diese drei Erkenntnisse sind auch dann nutzbar, wenn die Akquise anschließend intern aufgebaut wird.

## Wann Auslagern die falsche Antwort ist

Drei Fälle, in denen keine Agentur hilft:

**Das Angebot ist nicht verkauft.** Wer nicht in einem Satz sagen kann, welches Problem er für welche Zielgruppe löst und was das kostet, bekommt Gespräche ohne Abschluss. Eine Agentur verstärkt, was da ist – sie ersetzt keine Positionierung.

**Es gibt niemanden, der die Termine wahrnimmt.** Zwölf qualifizierte Termine im Monat sind wertlos, wenn die Geschäftsführung schon ausgelastet ist. Das ist der häufigste Grund, aus dem gute Kampagnen abgebrochen werden.

**Die Erwartung ist ein Abschluss in Woche zwei.** Die ersten Wochen jeder Kaltakquisekampagne dienen der Kalibrierung: Liste, Einstieg, Einwände. Wer nach vier Wochen abbricht, bezahlt ausschließlich die Lernphase und erntet nie.

## Worauf man bei der Auswahl achtet

Ein Preisvergleich allein führt in die Irre, weil die Leistungsdefinitionen auseinandergehen. Was zu prüfen ist – vom Auftragsverarbeitungsvertrag über die Terminqualität bis zum Reporting – steht in der [Checkliste zur Auswahl einer Vertriebsagentur](/blog/vertriebsagentur-finden-checkliste). Der rechtliche Rahmen, der für jeden Anbieter gleich gilt, steht im [Beitrag zu den rechtlichen Grundlagen](/blog/kaltakquise-rechtliche-grundlagen).

Wie wir arbeiten, welche Zielgruppen wir übernehmen und wie ein Pilotprojekt bei uns abläuft, steht unter [Leistungen](/leistungen). Für Unternehmen im Rheinland gibt es eigene Seiten zur [Vertriebsagentur Köln](/leistungen/koeln) und zur [Vertriebsagentur Düsseldorf](/leistungen/duesseldorf).

## Quellen

- [§ 84 HGB – Handelsvertreter, gesetze-im-internet.de](https://www.gesetze-im-internet.de/hgb/__84.html)
- [Gesetz zur Regelung der Arbeitnehmerüberlassung (AÜG), gesetze-im-internet.de](https://www.gesetze-im-internet.de/a_g/)
- [Statistisches Unternehmensregister, Statistisches Bundesamt](https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/Unternehmensregister/_inhalt.html)
  `.trim(),
}
