import type { BlogPost } from '@/lib/blog-types'

// Zusammenführung vom 10.09.2026: ersetzt zusätzlich sdr-as-a-service,
// inhouse-team-vs-vertriebsagentur und hybrid-vertrieb-modell.
// Umleitungen in config/blog-redirects.js.
//
// Dieser Beitrag ist einer der vier, die am 10.09.2026 überhaupt im Google-
// Index standen – und der einzige, dessen Snippet bereits einen Preis nennt.
// Der Slug bleibt deshalb unverändert.
//
// Am 01.10.2026 ausgebaut: Search Console meldet „Gecrawlt – zurzeit nicht
// indexiert“, obwohl der Beitrag für elf Anfragen rankt („vertriebsoutsourcing
// kosten“ Ø Position 11,0, „akquise auslagern“ 9,9, „vertrieb auslagern
// kosten“ 9,5). Neu sind die Kurzantwort, der Vollkostenvergleich in zwei
// Spalten, das Rechenbeispiel zum ersten Quartal und „So rechnen wir ab“.
//
// Jede Zahl darin hat eine Quelle im Repository: die Marktspannen aus der
// FAQ-Antwort unten und `src/content/pricing.ts`, die Einarbeitungswochen aus
// `vertriebsteam-aufbauen-recruiting.ts`, Erstgespräch, Kick-off, Anlauf und
// „weniger als 90 Minuten“ aus `src/content/home.ts`, Pilotkontingent,
// wöchentlicher Abgleich und „belastbare Quote ab etwa acht Wochen“ aus
// `src/content/pricing.ts`. Ändert sich eine davon dort, ist sie hier
// nachzuziehen.
//
// Das Rechenbeispiel vergleicht beide Seiten gleich: Kosten je Termin, die
// Lernphase jeweils eingeschlossen. Eine erste Fassung zählte beim eigenen
// SDR nur die Wochen mit Ergebnisverantwortung, beim Dienstleister jede Woche
// nach dem Setup – das hätte die externe Lösung schöngerechnet.
//
// TODO(Nico): Das Rechenbeispiel rechnet bewusst ohne Euro-Beträge, weil
// keiner belegt ist. Gebraucht werden (1) eine echte Kalkulation aus einem
// Kundenprojekt – Zielgehalt der Stelle, Arbeitsplatz- und Toolkosten,
// tatsächliche Wochen bis zum ersten eigenen Termin, Terminzahl im ersten
// Quartal – mit Quelle und Freigabe, und (2) deine Preise
// (`PREISE_FREIGEGEBEN` in `src/content/pricing.ts`). Dann wird aus dem
// Rechenweg ein Beispiel in Euro.
//
// TODO(Nico): Die Marktspanne (2.000–8.000 Euro im Monat, um 300 Euro je
// Termin) stützt sich nur auf Googles KI-Übersicht. Der eigene Beitrag zu KI
// im Vertrieb sagt, solche Zahlen gehören geprüft. Wenn du eine belastbare,
// zitierbare Quelle hast oder die Spanne aus eigenen Angeboten bestätigen
// kannst, gehört sie hier und in die FAQ.

export const vertriebAuslagernKostenVorteile: BlogPost = {
  slug: 'vertrieb-auslagern-kosten-vorteile',
  title: 'Vertrieb auslagern: Kosten, Modelle und wann es sich rechnet',
  // Nicht „Vertrieb auslagern: …“ — damit beginnt der Titel von /leistungen. Der
  // Beitrag beantwortet die Kostenfrage, die Leistungsseite das Angebot.
  seoTitle: 'Was kostet es, den Vertrieb auszulagern?',
  description:
    'Was Vertriebsoutsourcing kostet: Marktspannen, Abrechnungsmodelle und der Vollkostenvergleich mit einem eigenen SDR – mit Rechenbeispiel fürs erste Quartal.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-18',
  updatedAt: '2026-10-01',
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
      question: 'Was ist der Unterschied zwischen Akquise auslagern und Vertrieb auslagern?',
      answer:
        'Wer die Akquise auslagert, gibt nur den vorderen Teil ab: Liste, Erstansprache, Qualifizierung und Terminvereinbarung. Wer den Vertrieb auslagert, gibt im weitesten Sinn auch Angebot und Abschluss ab. Für die meisten B2B-Dienstleister ist die erste Variante die wirtschaftlichere, weil der Engpass bei der Zahl der Gespräche liegt und der Abschluss Produktwissen braucht, das im eigenen Haus sitzt.',
    },
    {
      question: 'Ist eine ausgelagerte Akquise Arbeitnehmerüberlassung?',
      answer:
        'Nein, solange ein Dienst- oder Werkvertrag vorliegt und der Dienstleister eigenverantwortlich arbeitet. Arbeitnehmerüberlassung nach dem AÜG setzt voraus, dass der Auftraggeber weisungsbefugt gegenüber der eingesetzten Person ist und sie in seine Arbeitsorganisation eingliedert. Wer einem externen Akquisemitarbeiter feste Arbeitszeiten und einen Arbeitsplatz im eigenen Betrieb vorgibt, nähert sich dieser Grenze.',
    },
  ],
  content: `
Die Frage "Was kostet es, den Vertrieb auszulagern?" hat keine einzelne Antwort, aber einen klaren Rahmen. Dieser Beitrag liefert beides: die Bandbreiten der gängigen Abrechnungsmodelle und die Rechnung, die tatsächlich entscheidet – der Vergleich mit den Vollkosten eines eigenen Vertriebsmitarbeiters, einmal als Tabelle und einmal durchgerechnet für das erste Quartal.

## Was kostet Vertriebsoutsourcing?

Für ausgelagerte B2B-Telefonakquise im DACH-Raum nennt Googles KI-Übersicht überwiegend 2.000 bis 8.000 Euro im Monat, je nach Umfang, und Größenordnungen um 300 Euro je qualifiziertem Termin. Vollservice-Mandate mit Strategie, Reporting und mehreren Kampagnen liegen darüber.

Das sind Marktspannen, keine Angebote. Wo ein Preis darin liegt, entscheiden drei Größen: der Umfang – wöchentliche Akquisestunden oder vereinbarte Termine –, das Abrechnungsmodell und die Frage, wer das Ergebnisrisiko trägt. Aussagekräftig wird jede dieser Zahlen erst neben der Gegenrechnung: Was kostet dieselbe Arbeit im eigenen Haus?

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

Bezahlt wird je vereinbartem Entscheidertermin, der definierte Kriterien erfüllt – nach der oben genannten Größenordnung um 300 Euro pro qualifiziertem Termin.

**Geeignet für:** Auftraggeber, die maximale Kostenklarheit wollen.

**Der Haken, den man kennen sollte:** Dieses Modell schafft einen Anreiz zur Menge. Was ein qualifizierter Termin ist, muss deshalb vor Projektbeginn schriftlich und messbar definiert sein – Rolle des Gesprächspartners, erkennbarer Bedarf, Zeithorizont, und was passiert, wenn der Termin nicht stattfindet. Fehlt diese Definition, entsteht Streit statt Pipeline.

### 4. Erfolgsprovision auf den Abschluss

Vergütung erst, wenn ein Vertrag zustande kommt. Klingt für den Auftraggeber ideal und wird von seriösen Anbietern regelmäßig abgelehnt.

Der Grund ist nicht Bequemlichkeit: Der Dienstleister hat auf den Abschluss keinen Einfluss. Er kann den Termin liefern; ob im Verkaufsgespräch überzeugt wird, ob das Angebot marktgerecht ist und ob nachgefasst wird, liegt außerhalb seiner Kontrolle. Wer trotzdem rein erfolgsabhängig arbeitet, muss das Risiko einpreisen – über eine Provisionshöhe, die den Auftraggeber am Ende teurer kommt als ein Retainer.

Rechtlich ist diese Konstruktion im Übrigen dem Handelsvertreter nahe. [§ 84 HGB](https://www.gesetze-im-internet.de/hgb/__84.html) definiert: "Handelsvertreter ist, wer als selbständiger Gewerbetreibender ständig damit betraut ist, für einen anderen Unternehmer Geschäfte zu vermitteln oder in dessen Namen abzuschließen." Damit greifen Vorschriften, die im Dienstleistungsverhältnis nicht gelten – unter anderem der Ausgleichsanspruch nach § 89b HGB.

## Eigener SDR oder Vertriebsoutsourcing: der Vollkostenvergleich

Die meisten Kostenvergleiche stellen den Monatspreis der Agentur dem Bruttogehalt eines Vertriebsmitarbeiters gegenüber. Das ist die falsche Rechnung, weil auf der einen Seite Vollkosten stehen und auf der anderen nur ein Teil.

Vollständig sieht der Vergleich zwischen einem eigenen [Sales Development Representative](/glossar#sdr) im Vertriebsinnendienst und einer ausgelagerten Lösung so aus:

| Kostenblock | Eigener SDR | Vertriebsoutsourcing |
|---|---|---|
| Gehalt | Bruttogehalt inklusive variabler Anteile | entfällt, bezahlt wird das vereinbarte Modell |
| Lohnnebenkosten | Arbeitgeberanteil zur Sozialversicherung, rund ein Fünftel des Bruttogehalts | entfallen |
| Werkzeuge | Arbeitsplatz, Telefonie, CRM-Lizenz ab Tag 1, unabhängig von Produktivität | bringt der Dienstleister mit |
| Anlaufzeit | Stellenbesetzung, dann Einarbeitung – eigene Termine frühestens ab Woche 5 | erste Anrufe nach 10 bis 14 Tagen |
| Führungszeit | Einarbeitung, Begleitung am Telefon, wöchentliche Auswertung | Kick-off, bei laufender Akquise ein wöchentlicher Abgleich |
| Urlaub, Krankheit | Akquise pausiert vollständig | Sache des Dienstleisters – nach der Vertretung fragen |
| Fluktuation | Recruiting und Einarbeitung beginnen von vorn | trägt der Dienstleister |

Die letzte Zeile ist die teuerste und wird am häufigsten vergessen: Vertriebsinnendienst hat eine hohe Fluktuation. Wer einen Mitarbeiter nach neun Monaten verliert, hat die Einarbeitung bezahlt und nichts davon behalten.

Auf der anderen Seite steht, was die externe Lösung nicht leistet: Im eigenen Team wächst kein Vertriebswissen, und es entsteht eine Abhängigkeit vom Dienstleister. Beides lässt sich begrenzen – Liste, Gesprächsnotizen und Gesprächsgerüst gehören von Anfang an ins eigene CRM –, aber nicht wegrechnen.

**Die Faustregel, die daraus folgt:** Ein eigener Mitarbeiter lohnt sich, sobald dauerhaft Vollauslastung besteht und das Vertriebswissen strategisch im Haus bleiben soll. Wann dieser Punkt erreicht ist und worauf es bei der Besetzung ankommt, steht im [Beitrag zum Aufbau eines Vertriebsteams](/blog/vertriebsteam-aufbauen-recruiting). Solange der Bedarf schwankt oder unter einer vollen Stelle liegt, ist die externe Lösung günstiger – nicht wegen des Stundensatzes, sondern weil keine Leerlaufzeit bezahlt wird.

## Rechenbeispiel: das erste Quartal

Ein Rechenbeispiel mit einem angenommenen Gehalt wäre schnell gemacht – und genau so viel wert wie die Annahme. Dieses rechnet deshalb mit dem, was sich belegen lässt: mit Wochen und Minuten. Die Beträge setzen Sie am Ende selbst ein.

**Eigener SDR.** Nach dem Einarbeitungsplan aus dem Beitrag zum Vertriebsteam hört eine neue Kraft in den Wochen 1 und 2 zu, telefoniert in den Wochen 3 und 4 begleitet, vereinbart ab Woche 5 erste eigene Termine und trägt ab Woche 9 Ergebnisverantwortung. Bezahlt werden alle 13 Wochen des Quartals, eigene Termine entstehen in höchstens neun davon. Dazu kommen die Kosten der Stellenbesetzung und die Zeit der Geschäftsführung für Begleitung und Auswertung.

**Vertriebsoutsourcing bei uns.** Der Anlauf kostet Sie weniger als 90 Minuten: ein Erstgespräch von 15 Minuten und einen Kick-off von 45 bis 60 Minuten. Die ersten Anrufe laufen in der Regel nach 10 bis 14 Tagen; bei laufender Akquise kommt ein wöchentlicher Abgleich von 30 Minuten dazu. Eine Lernphase gibt es auch hier – die ersten Wochen kalibrieren Liste, Einstieg und Einwände, eine belastbare Quote entsteht erst ab etwa acht Wochen. Wer sie bezahlt, hängt am Modell: Wird nach Terminen abgerechnet, trägt sie der Dienstleister.

| Erstes Quartal, 13 Wochen | Eigener SDR | Vertriebsoutsourcing bei uns |
|---|---|---|
| Vor Woche 1 | Stelle ausschreiben und besetzen | Erstgespräch und Kick-off, zusammen unter 90 Minuten |
| Erste eigene Anrufe | Woche 3, begleitet | nach 10 bis 14 Tagen |
| Belastbare Zahlen | ab Woche 9, mit der Ergebnisverantwortung | ab etwa acht Wochen |
| Wer die Lernphase bezahlt | Sie, mit 13 Wochen Vollkosten | im Terminmodell der Dienstleister |
| Ihre Zeit | Begleitung und Auswertung, jede Woche | Anlauf unter 90 Minuten, bei laufender Akquise 30 Minuten pro Woche |

**Der Rechenweg für Ihre eigenen Zahlen:**

1. Monatliche Vollkosten der Stelle: Bruttomonatsgehalt × 1,2 für den Arbeitgeberanteil, plus Arbeitsplatz, Telefonie und CRM.
2. Kosten des ersten Quartals: drei Monate Vollkosten plus die Kosten der Stellenbesetzung.
3. Kosten je Termin intern: Quartalskosten geteilt durch die Termine, die die neue Stelle im Quartal selbst vereinbart hat.
4. Kosten je Termin extern: Preis des externen Modells für dasselbe Quartal geteilt durch die gelieferten qualifizierten Termine.

Schritt 3 gegen Schritt 4 ist der ehrliche Vergleich. Er rechnet nicht Gehalt gegen Monatspreis, sondern auf beiden Seiten Kosten gegen Termine, die Lernphase jeweils eingeschlossen. Im ersten Quartal trägt die eigene Stelle ihre Einarbeitung allein, deshalb fällt Schritt 3 dort hoch aus. Je länger eine voll ausgelastete Stelle besetzt bleibt, desto kleiner wird dieser Anteil – das ist der Punkt, an dem Einstellen beginnt, sich zu rechnen.

## Akquise auslagern, Abschluss behalten: das hybride Modell

In der Praxis ist die Frage selten "entweder oder". Wer die Akquise auslagert, gibt nicht den Vertrieb ab, sondern seinen vorderen Teil. Die verbreitetste Aufteilung trennt nach Prozessschritt statt nach Person:

- **Extern:** Listenaufbau, Erstansprache, Qualifizierung, Terminvereinbarung – der Teil, der Volumen und Frustrationstoleranz braucht.
- **Intern:** Verkaufsgespräch, [Angebot, Verhandlung, Abschluss](/blog/angebot-verhandlung-abschluss-b2b), Betreuung – der Teil, der Produktwissen und Entscheidungsbefugnis braucht.

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

## So rechnen wir ab

Anders als beim Stundenkontingent oben verkaufen wir in der Regel Termine, nicht Akquisestunden – das Ergebnisrisiko liegt dann bei uns. Drei Modelle stehen zur Wahl, jedes mit seiner Grenze:

- **Pilotprojekt:** ein festes Kontingent von 10–15 qualifizierten Terminen über einen Monat. Bezahlt werden dabei Termine, nicht die Kalibrierung. Ein Monat zeigt, ob die Zielgruppe trägt; eine belastbare Quote entsteht aber auch hier erst ab etwa acht Wochen.
- **Laufende Akquise:** eine feste, schriftlich vereinbarte Terminzahl pro Monat, je nach Angebot stattdessen ein fester Stundenumfang. Sinnvoll erst, wenn intern jemand die Termine innerhalb weniger Tage wahrnehmen kann.
- **Pro qualifiziertem Termin:** abgerechnet nach stattgefundenen, nicht nach vereinbarten Terminen – auf Grundlage einer schriftlichen Definition des qualifizierten Termins vor Projektbeginn.

Beträge stehen hier bewusst nicht: Wir verkaufen keine Standardpakete, deshalb variiert der Preis. Im Erstgespräch nennen wir Ihnen nach kurzer Analyse eine transparente Hausnummer. Die drei Modelle mit allem, was dazugehört, stehen auf der [Leistungsseite unter "Zusammenarbeit"](/leistungen#preise).

## Worauf man bei der Auswahl achtet

Ein Preisvergleich allein führt in die Irre, weil die Leistungsdefinitionen auseinandergehen. Was zu prüfen ist – vom Auftragsverarbeitungsvertrag über die Terminqualität bis zum Reporting – steht in der [Checkliste zur Auswahl einer Vertriebsagentur](/blog/vertriebsagentur-finden-checkliste). Der rechtliche Rahmen, der für jeden Anbieter gleich gilt, steht im [Beitrag zu den rechtlichen Grundlagen](/blog/kaltakquise-rechtliche-grundlagen).

Wie wir arbeiten, welche Zielgruppen wir übernehmen und wie ein Pilotprojekt bei uns abläuft, steht unter [Leistungen](/leistungen). Für Unternehmen im Rheinland gibt es eigene Seiten zur [Vertriebsagentur Köln](/leistungen/koeln) und zur [Vertriebsagentur Düsseldorf](/leistungen/duesseldorf).

## Quellen

- [§ 84 HGB – Handelsvertreter, gesetze-im-internet.de](https://www.gesetze-im-internet.de/hgb/__84.html)
- [Gesetz zur Regelung der Arbeitnehmerüberlassung (AÜG), gesetze-im-internet.de](https://www.gesetze-im-internet.de/a_g/)
- [Statistisches Unternehmensregister, Statistisches Bundesamt](https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/Unternehmensregister/_inhalt.html)
  `.trim(),
}
