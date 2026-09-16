import type { BlogPost } from '@/lib/blog-types'

// Neuer Beitrag vom 10.09.2026. Führt sechs kürzere zusammen:
// vertriebsstrategie-entwickeln, vertriebsziele-smart-methode,
// vertriebskennzahlen-kpis, vertriebspipeline-aufbauen,
// sales-funnel-optimierung, crm-system-vergleich-mittelstand.
// Umleitungen in config/blog-redirects.js.
//
// TODO(Nico): Die Beispielrechnung zur Rückwärtsplanung nutzt bewusst runde
// Platzhalterwerte und sagt das auch. Mit deinen echten Quoten aus einem
// abgeschlossenen Projekt wird daraus ein Rechenweg, den ein Leser eins zu
// eins übernehmen kann.

export const vertriebssteuerungKpisPipeline: BlogPost = {
  slug: 'vertriebssteuerung-kpis-pipeline',
  title: 'Vertriebssteuerung: Von der Jahreszahl zur Wochenaktivität',
  description:
    'Wie man aus einem Umsatzziel eine wöchentliche Aktivitätszahl ableitet, welche vier Kennzahlen im B2B-Mittelstand ausreichen, wie eine belastbare Pipeline aufgebaut ist und woran man erkennt, an welcher Stelle sie klemmt.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2025-12-30',
  updatedAt: '2026-09-10',
  category: 'Strategie',
  tags: [
    'Vertriebssteuerung',
    'Vertriebskennzahlen',
    'Vertriebspipeline',
    'Sales Funnel',
    'Vertriebsstrategie',
    'Vertriebsziele',
    'CRM',
    'KPI',
  ],
  featured: false,
  image: '/images/blog/vertriebskennzahlen.webp',
  faqs: [
    {
      question: 'Welche Vertriebskennzahlen braucht ein mittelständisches B2B-Unternehmen?',
      answer:
        'Vier reichen: Netto-Kontaktquote (erreichte Entscheider je Wählversuch), Terminquote (Termine je erreichtem Entscheider), Wahrnehmungsquote (stattgefundene je vereinbarte Termine) und Abschlussquote. Jede weitere Kennzahl verlängert das Reporting, ohne eine Entscheidung zu verbessern.',
    },
    {
      question: 'Wie leitet man aus einem Umsatzziel eine Aktivitätszahl ab?',
      answer:
        'Rückwärts über vier Schritte: Umsatzziel geteilt durch den durchschnittlichen Auftragswert ergibt die Zahl der Aufträge; geteilt durch die Abschlussquote die Zahl der Termine; geteilt durch die Terminquote die Zahl der Entscheidergespräche; geteilt durch die Kontaktquote die Zahl der Wählversuche. Geteilt durch 45 Arbeitswochen ergibt sich die Wochenzahl.',
    },
    {
      question: 'Was gehört in eine B2B-Vertriebspipeline?',
      answer:
        'Nur Vorgänge mit einem verabredeten nächsten Schritt und einem Datum. Ein Kontakt ohne nächsten Termin ist kein Pipeline-Eintrag, sondern eine Wiedervorlage. Diese Trennung ist der Unterschied zwischen einer Pipeline, aus der sich planen lässt, und einer Liste, die nur groß aussieht.',
    },
    {
      question: 'Braucht ein kleines Unternehmen ein CRM-System?',
      answer:
        'Ein System ja, eine große Software meist nicht. Entscheidend sind vier Dinge: dass jeder Kontakt einen nächsten Schritt mit Datum hat, dass Widersprüche gegen Werbeanrufe dauerhaft gesperrt werden können, dass die vier Kennzahlen ohne Handarbeit ablesbar sind und dass die Daten exportierbar bleiben. Alles darüber hinaus ist Komfort.',
    },
  ],
  content: `
Die meisten Vertriebsziele im Mittelstand sind Umsatzzahlen, und Umsatzzahlen sind nicht steuerbar. Niemand kann montags entscheiden, 300.000 Euro Umsatz zu machen. Steuerbar ist genau eine Größe: **wie viele Gespräche diese Woche stattfinden.**

Vertriebssteuerung ist die Übersetzung zwischen beidem. Dieser Beitrag beschreibt den Rechenweg, die vier Kennzahlen, die dafür nötig sind, und wie man erkennt, an welcher Stelle es klemmt.

## Von der Jahreszahl zur Wochenaktivität

Die Rückwärtsrechnung hat vier Schritte. Sie funktioniert nur mit eigenen Quoten – die folgenden Werte sind ausdrücklich Platzhalter, um den Rechenweg zu zeigen, keine Benchmarks.

**Ausgangspunkt:** 300.000 Euro Neugeschäft im Jahr, durchschnittlicher Auftragswert 15.000 Euro.

| Schritt | Rechnung | Ergebnis |
|---|---|---|
| Aufträge | 300.000 / 15.000 | 20 im Jahr |
| Termine | 20 / Abschlussquote 25 % | 80 im Jahr |
| Entscheidergespräche | 80 / Terminquote 20 % | 400 im Jahr |
| Wählversuche | 400 / Kontaktquote 20 % | 2.000 im Jahr |
| **Pro Arbeitswoche** | 2.000 / 45 | **rund 45 Wählversuche** |

Diese eine Zahl – 45 Wählversuche pro Woche – ist die einzige, die ein Mensch am Montag tatsächlich beeinflussen kann. Alles darüber ist Ergebnis.

Die Rechnung leistet noch etwas Zweites, das wichtiger ist als die Zahl selbst: Sie macht Unmöglichkeiten sichtbar. Wer aus derselben Rechnung 400 Wählversuche pro Woche erhält und eine Person im Vertrieb hat, hat kein Motivationsproblem, sondern ein Kapazitätsproblem. Die ehrliche Konsequenz ist dann, das Ziel zu senken, den Auftragswert zu erhöhen oder Kapazität einzukaufen – nicht, mehr Druck zu machen.

## Warum SMART-Ziele im Vertrieb oft nichts ändern

Die verbreitete Zielformel – spezifisch, messbar, attraktiv, realistisch, terminiert – ist nicht falsch, greift im Vertrieb aber zu kurz, weil sie schweigt, wer das Ziel beeinflussen kann.

"Bis 31.12. 300.000 Euro Neugeschäft" erfüllt alle fünf Kriterien und ist trotzdem kein steuerbares Ziel: Es ist ein Ergebnis, das von Abschlussquote, Marktlage und Zufall abhängt.

Brauchbar wird es erst in zwei Ebenen:

- **Ergebnisziel** (jährlich, nicht steuerbar): 300.000 Euro Neugeschäft.
- **Aktivitätsziel** (wöchentlich, steuerbar): 45 Wählversuche, daraus 9 Entscheidergespräche.

Nur das zweite gehört in ein wöchentliches Gespräch. Das erste gehört ins Quartalsgespräch, wo über Preis, Zielgruppe und Kapazität entschieden wird.

## Die vier Kennzahlen

Mehr als vier braucht kein B2B-Mittelständler. Der Wert dieser vier liegt darin, dass jede von ihnen auf eine **andere Ursache** zeigt.

**Netto-Kontaktquote** – erreichte Entscheider je Wählversuch. Misst Liste und Anrufzeit. Fällt sie, sind die Daten veraltet oder die Zeitfenster falsch. Sie hat nichts mit der Gesprächsqualität zu tun.

**Terminquote** – Termine je erreichtem Entscheider. Misst Einstieg, Angebot und Einwandbehandlung. Fällt sie bei stabiler Kontaktquote, liegt es am Gespräch oder daran, dass die Zielgruppe das Problem nicht hat.

**Wahrnehmungsquote** – stattgefundene je vereinbarte Termine. Misst Terminqualität. Der aussagekräftigste der vier Werte, weil er als einziger unterscheidet, ob ein voller Kalender auch ein guter Kalender ist.

**Abschlussquote** – Aufträge je stattgefundenem Termin. Misst das Verkaufsgespräch und die Passung der Zielgruppe. Eine sehr hohe Abschlussquote ist kein reines Lob: Sie deutet oft darauf hin, dass zu eng qualifiziert und zu wenig angerufen wird.

### Was diese vier gemeinsam zeigen

Der eigentliche Nutzen entsteht erst im Zusammenhang. Vier typische Muster:

| Beobachtung | Wahrscheinliche Ursache | Richtige Reaktion |
|---|---|---|
| Kontaktquote fällt, Terminquote stabil | Liste veraltet, falsche Zeitfenster | Daten prüfen, Anrufzeiten verschieben |
| Kontaktquote stabil, Terminquote fällt | Einstieg oder Zielgruppe | Absagegründe auswerten |
| Terminquote hoch, Wahrnehmungsquote niedrig | zu weich qualifiziert | Kriterien verschärfen |
| Alles stabil, Abschlussquote fällt | Angebot, Preis oder Wettbewerb | Verlustgründe erfassen |

Die dritte Zeile ist die, die am häufigsten übersehen wird – besonders dort, wo pro Termin vergütet wird. Wie man sie vertraglich absichert, steht in der [Checkliste zur Agenturauswahl](/blog/vertriebsagentur-finden-checkliste).

## Die Pipeline: was hineingehört und was nicht

Die meisten Pipelines im Mittelstand sind zu groß, weil sie Kontakte enthalten statt Vorgänge. Eine belastbare Regel:

> In der Pipeline steht nur, was einen **verabredeten nächsten Schritt mit Datum** hat.

Alles andere ist Wiedervorlage. Der Unterschied ist nicht kosmetisch: Aus einer Pipeline nach dieser Definition lässt sich der Umsatz der nächsten Monate abschätzen, aus einer Kontaktliste nicht.

Vier Phasen reichen für die meisten B2B-Dienstleister:

1. **Qualifiziert** – Bedarf, Zuständigkeit und Zeitpunkt sind geklärt, Termin steht.
2. **Im Gespräch** – Erstgespräch fand statt, nächster Schritt vereinbart.
3. **Angebot** – Angebot liegt vor, Entscheidungsdatum bekannt.
4. **Entscheidung** – Zusage, Absage oder Verschiebung mit neuem Datum.

Mehr Phasen erzeugen mehr Pflegeaufwand und keine bessere Prognose. Was dagegen jede Phase braucht, ist ein **Verfallsdatum**: Ein Vorgang, der drei Wochen ohne Bewegung in derselben Phase steht, ist kein Vorgang mehr. Er gehört zurück in die Wiedervorlage – sonst wächst die Pipeline, ohne dass Umsatz folgt.

### Warum die gewichtete Pipeline im Mittelstand selten trägt

Die verbreitete Prognosemethode multipliziert jeden Vorgang mit einer Abschlusswahrscheinlichkeit – 25 Prozent in Phase 1, 50 in Phase 2, 75 in Phase 3 – und summiert das Ergebnis. In Konzernen mit hunderten gleichartigen Vorgängen funktioniert das, weil sich Abweichungen ausmitteln.

Bei 20 Aufträgen im Jahr funktioniert es nicht. Ein Vorgang über 40.000 Euro mit 50 Prozent Wahrscheinlichkeit ergibt rechnerisch 20.000 Euro Umsatz – ein Betrag, der in der Realität nie eintritt. Entweder kommen 40.000 oder null. Die gewichtete Summe beschreibt einen Erwartungswert, der bei kleinen Fallzahlen so gut wie nie mit dem tatsächlichen Ergebnis übereinstimmt.

Was bei kleinen Zahlen besser funktioniert, sind **zwei Zahlen statt einer**: die Summe aller Vorgänge mit vereinbartem Entscheidungsdatum in den nächsten 60 Tagen, und daneben die Zahl dieser Vorgänge. Ein Quartal mit drei großen Entscheidungen ist ein anderes Risiko als eines mit zwölf kleinen, auch wenn die gewichtete Summe identisch ist.

### Der Fehler, gute Wochen zu belohnen

Ein verbreiteter Steuerungsfehler: In Wochen mit vielen Terminen wird die Akquise zurückgefahren, weil die Termine Zeit kosten. Drei bis vier Wochen später – genau die Vorlaufzeit der Pipeline – ist der Kalender leer, die Akquise wird hochgefahren, und der Zyklus beginnt von vorn.

Das ist der Grund, warum Vertrieb in kleinen Unternehmen in Wellen verläuft, und es ist kein Motivationsproblem. Es ist ein Kapazitätsproblem mit zeitversetzter Wirkung.

Die einzige wirksame Gegenmaßnahme ist, die wöchentliche Aktivitätszahl als **Untergrenze** zu behandeln, die auch in guten Wochen gilt – notfalls mit weniger Stunden, aber nie mit null. Wer das intern nicht durchhält, hat genau den Fall vor sich, in dem eine externe Kapazität wirtschaftlich sinnvoll wird: Sie schwankt nicht mit der eigenen Auslastung.

## Verlustgründe: die wertvollsten Daten, die niemand erfasst

Was ein Unternehmen über seinen Markt lernen kann, steckt fast vollständig in den Absagen – und wird fast nie erfasst.

Fünf Kategorien genügen: kein Bedarf, kein Budget, Zeitpunkt falsch, Wettbewerber gewonnen, keine Entscheidung getroffen. Die letzte ist im B2B regelmäßig die größte, und sie ist die einzige, gegen die sich etwas tun lässt, das nichts mit dem Preis zu tun hat.

Wer diese fünf Kategorien über ein Jahr führt, weiß am Jahresende, ob das Problem im Angebot, in der Zielgruppe oder im Prozess liegt. Wer sie nicht führt, diskutiert im Januar über Rabatte.

## Das System dahinter

Ein CRM ist im Mittelstand kein Softwareprojekt, sondern eine Entscheidung über vier Fähigkeiten:

- **Nächster Schritt mit Datum** an jedem Vorgang, verpflichtend.
- **Sperrfeld für Widersprüche**, das jeder Listenimport respektiert. Wer künftige Werbeanrufe untersagt, darf nicht durch den nächsten Import wieder auf der Liste landen – die mutmaßliche Einwilligung nach [§ 7 UWG](https://www.gesetze-im-internet.de/uwg_2004/__7.html) ist dann widerlegt.
- **Die vier Kennzahlen ohne Handarbeit** ablesbar.
- **Exportierbarkeit** der Daten in einem offenen Format.

Das zweite Kriterium ist das, an dem einfache Tabellenlösungen scheitern – und zugleich das, das im Streitfall zählt. Der datenschutzrechtliche Rahmen dazu steht im [Beitrag zu den rechtlichen Grundlagen](/blog/kaltakquise-rechtliche-grundlagen); [Art. 6 Abs. 1 lit. f DSGVO](https://dsgvo-gesetz.de/art-6-dsgvo/) trägt die Verarbeitung nur, solange sie auf das Erforderliche beschränkt bleibt.

Alles Weitere – Automatisierungen, Dashboards, Prognosemodelle – ist Komfort und sollte erst angeschafft werden, wenn die vier Grundfähigkeiten sitzen. Was Automatisierung sinnvoll übernehmen kann und was nicht, steht im [Beitrag zu KI im B2B-Vertrieb](/blog/ki-im-b2b-vertrieb).

## Der wöchentliche Termin

Dreißig Minuten, immer gleicher Ablauf: die vier Kennzahlen gegen die Vorwoche, drei wörtliche Absagegründe, eine beschlossene Änderung. Eine, nicht fünf – wer drei Dinge gleichzeitig ändert, weiß hinterher nicht, welches gewirkt hat.

Dieser Termin ist der eigentliche Unterschied zwischen Vertrieb, der über Monate besser wird, und Vertrieb, der jedes Jahr neu anfängt.

Wenn die Kapazität für die abgeleitete Wochenzahl nicht reicht, ist Auslagern eine der drei möglichen Antworten – die anderen beiden sind ein höherer Auftragswert oder ein niedrigeres Ziel. Was das kostet, steht im [Beitrag zu den Kosten von Vertriebsoutsourcing](/blog/vertrieb-auslagern-kosten-vorteile); was wir übernehmen, unter [Leistungen](/leistungen) und regional etwa für die [Vertriebsagentur Berlin](/leistungen/berlin).

## Quellen

- [§ 7 UWG – Unzumutbare Belästigungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__7.html)
- [Art. 6 DSGVO – Rechtmäßigkeit der Verarbeitung](https://dsgvo-gesetz.de/art-6-dsgvo/)
- [Statistisches Unternehmensregister, Statistisches Bundesamt](https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/Unternehmensregister/_inhalt.html)
  `.trim(),
}
