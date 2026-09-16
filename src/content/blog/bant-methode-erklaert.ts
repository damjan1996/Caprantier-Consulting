import type { BlogPost } from '@/lib/blog-types'

// Zusammenführung vom 10.09.2026: ersetzt zusätzlich
// lead-scoring-priorisierung, buying-center-stakeholder,
// discovery-call-leitfaden und remote-selling-video-call.
// Umleitungen in config/blog-redirects.js.
//
// Der Slug bleibt, weil /glossar seit Langem hierher verlinkt und der Beitrag
// damit einer der wenigen ist, die überhaupt eingehende interne Links haben.
//
// TODO(Nico): Die Qualifizierungsfragen sind methodisch korrekt, aber
// allgemein. Deine tatsächlichen fünf Fragen aus dem Erstgespräch – in der
// Reihenfolge, in der du sie stellst – wären der Teil, den niemand
// nachschreiben kann.

export const bantMethodeErklaert: BlogPost = {
  slug: 'bant-methode-erklaert',
  title: 'Leads qualifizieren: BANT, Lead Scoring und das Buying Center',
  description:
    'Wie man im B2B erkennt, ob aus einem Gespräch ein Kunde werden kann: die BANT-Kriterien und ihre Grenzen, Lead Scoring ohne Werkzeugballast, die Rollen im Buying Center und der Ablauf eines Discovery Calls.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-16',
  updatedAt: '2026-09-10',
  category: 'Vertriebsmethoden',
  tags: [
    'BANT',
    'Lead Qualifizierung',
    'Lead Scoring',
    'Buying Center',
    'Discovery Call',
    'B2B Vertrieb',
    'Vertriebsmethoden',
    'Terminqualität',
  ],
  featured: false,
  image: '/images/blog/bant-methode.webp',
  faqs: [
    {
      question: 'Wofür steht BANT?',
      answer:
        'Budget, Authority, Need, Timing – Budget, Entscheidungsbefugnis, Bedarf und Zeitpunkt. Die vier Kriterien stammen aus dem klassischen Großkundenvertrieb und dienen dazu, vor einer Investition in ein Verkaufsgespräch zu prüfen, ob ein Abschluss überhaupt möglich ist.',
    },
    {
      question: 'Ist BANT noch zeitgemäß?',
      answer:
        'Als Prüfschema ja, als Reihenfolge nein. Die ursprüngliche Reihenfolge beginnt beim Budget – eine Frage, die im Erstkontakt fast nie ehrlich beantwortet wird und häufig das Gespräch beendet. Sinnvoller ist die Reihenfolge Need, Authority, Timing, Budget: Erst wenn der Bedarf feststeht, ist die Budgetfrage beantwortbar.',
    },
    {
      question: 'Was ist ein Buying Center?',
      answer:
        'Die Gesamtheit der Personen, die an einer B2B-Kaufentscheidung beteiligt sind. Typische Rollen sind Initiator, Anwender, fachlicher Prüfer, Einkauf als Türhüter, Entscheider und Budgetverantwortlicher. In Unternehmen mit fünf bis fünfzig Mitarbeitern fallen mehrere Rollen häufig auf eine Person zusammen – was Entscheidungen deutlich beschleunigt.',
    },
    {
      question: 'Braucht ein kleines Unternehmen Lead Scoring?',
      answer:
        'Ein Punktesystem in einer Software meist nicht. Was jedes Unternehmen braucht, ist eine schriftliche Definition, welcher Lead vorrangig bearbeitet wird. Drei Kriterien mit je zwei Ausprägungen reichen aus und lassen sich auf einem Blatt Papier führen.',
    },
  ],
  content: `
Der teuerste Termin im B2B-Vertrieb ist der, der stattfindet, obwohl von vornherein feststand, dass daraus nichts wird. Er kostet Vorbereitung, Fahrtzeit oder eine Stunde Videokonferenz, und er verdrängt einen anderen Termin, aus dem etwas geworden wäre.

Qualifizierung ist die Disziplin, diese Termine vorher auszusortieren. Sie ist unbeliebt, weil sie kurzfristig weniger Termine bedeutet – und wirksam, weil sie mittelfristig mehr Abschlüsse bedeutet.

## BANT: die vier Kriterien

BANT stammt aus dem Großkundenvertrieb und prüft vier Dinge:

**Budget.** Existiert Geld für die Lösung dieses Problems – nicht: gibt es einen Budgetposten mit diesem Namen. Im Mittelstand entsteht Budget häufig erst durch die Entscheidung, nicht vorher.

**Authority.** Kann die Person, mit der gesprochen wird, entscheiden – oder wer sonst?

**Need.** Existiert das Problem, und ist es dem Gegenüber bewusst? Ein Problem, das niemand spürt, wird nicht gelöst.

**Timing.** Steht die Entscheidung in einem absehbaren Zeitraum an, oder ist sie unbestimmt?

### Die Reihenfolge ist falsch

Die häufigste Anwendungsfehler ist, BANT in der Reihenfolge des Akronyms abzufragen. Die Budgetfrage im Erstkontakt hat drei Nachteile: Sie wird selten ehrlich beantwortet, sie signalisiert, dass es um den Preis geht, bevor über den Nutzen gesprochen wurde, und sie beendet Gespräche, die noch zu retten gewesen wären.

Die brauchbare Reihenfolge lautet **N-A-T-B**:

1. **Need** – Gibt es das Problem, und was kostet es heute?
2. **Authority** – Wer entscheidet, und wer ist noch beteiligt?
3. **Timing** – Wann soll es gelöst sein, und was passiert, wenn nicht?
4. **Budget** – Ergibt sich nach den ersten drei fast von selbst.

Wer die Kosten des Problems kennt, hat die Budgetfrage bereits beantwortet: Ein Problem, das 40.000 Euro im Jahr kostet, rechtfertigt eine vierstellige monatliche Investition. Ein Problem, dessen Kosten niemand beziffern kann, rechtfertigt keine.

### Wo BANT an Grenzen stößt

BANT prüft, ob ein Kauf möglich ist – nicht, ob er wahrscheinlich ist. Drei Dinge fehlen dem Schema:

- **Der Auslöser.** Warum jetzt und nicht seit drei Jahren? Ohne Auslöser bleiben auch vollständig qualifizierte Leads liegen.
- **Der Wettbewerb.** Wer ist noch im Rennen, und ist es womöglich die interne Lösung?
- **Die Konsequenz des Nichtstuns.** Der stärkste Wettbewerber im B2B ist die Entscheidung, nichts zu ändern.

Diese drei Fragen gehören ergänzt, sonst entsteht ein Kalender voller technisch qualifizierter Leads, die nie entscheiden.

## Das Buying Center: wer außer dem Gesprächspartner mitredet

Im B2B entscheidet selten eine Person allein. Die Beteiligten lassen sich sechs Rollen zuordnen – die sich in kleinen Unternehmen überlagern:

| Rolle | Interesse | Erkennbar an |
|---|---|---|
| Initiator | will das Problem loswerden | hat den Kontakt hergestellt |
| Anwender | muss damit arbeiten | fragt nach Aufwand und Alltag |
| Fachlicher Prüfer | prüft Eignung | fragt nach Details und Grenzen |
| Einkauf | Konditionen, Vergleichbarkeit | fragt nach Preis und Vertrag |
| Entscheider | trägt die Folgen | fragt nach Risiko und Alternative |
| Budgetverantwortung | gibt das Geld frei | taucht oft erst am Ende auf |

**Die praktische Konsequenz:** Eine Zusage des Initiators ist keine Entscheidung. Die entscheidende Frage im Erstgespräch lautet deshalb nicht "Sind Sie der Entscheider?" – darauf antwortet fast jeder mit Ja --, sondern: **"Wer schaut sich das außer Ihnen noch an, bevor Sie entscheiden?"**

In Unternehmen mit fünf bis fünfzig Mitarbeitern – der Zielgruppe der meisten B2B-Dienstleister – fallen mehrere Rollen auf die Geschäftsführung zusammen. Das ist der Grund, warum Entscheidungen dort deutlich schneller fallen als im Konzern, und zugleich der Grund, warum es keinen Sinn hat, unterhalb der Geschäftsführung anzusetzen.

## Lead Scoring ohne Werkzeugballast

Lead Scoring hat den Ruf, ein Softwarethema zu sein. Das ist es nur bei großen Mengen. Für alle anderen ist es eine schriftliche Priorisierungsregel.

Drei Kriterien reichen:

**Passung** – entspricht das Unternehmen dem Zielprofil? Branche, Größe, Rolle. Ja oder nein, keine Zwischenstufen.

**Anlass** – gibt es einen erkennbaren Auslöser? Wachstum, offene Stellen, Systemwechsel, neuer Standort, regulatorische Änderung.

**Signal** – hat das Unternehmen etwas getan? Anfrage, Webinarteilnahme, Rückruf, wiederholter Besuch.

Aus drei Ja-Nein-Kriterien entstehen acht Kombinationen, und die Reihenfolge ist offensichtlich: Passung plus Anlass plus Signal zuerst, Passung ohne alles zuletzt, alles ohne Passung gar nicht. Wer das auf einem Blatt führt, hat 90 Prozent des Nutzens eines Scoring-Systems.

Der Fehler, den Punktesysteme regelmäßig produzieren: Sie belohnen Aktivität statt Passung. Ein Kontakt, der fünf Newsletter geöffnet hat, aber nicht ins Zielprofil passt, bekommt eine hohe Punktzahl und ist trotzdem kein Kunde.

## Der Discovery Call: Ablauf einer Stunde

Der Discovery Call ist der erste Termin nach der Terminvereinbarung – der Ort, an dem qualifiziert wird, bevor irgendetwas angeboten wird. Ein bewährter Ablauf für 45 bis 60 Minuten:

**Minute 0-5 – Rahmen setzen.** Dauer, Ziel und ein Satz, der die Erwartung korrigiert: Dass am Ende auch ein "passt nicht" stehen kann. Das erhöht die Ehrlichkeit der folgenden 40 Minuten erheblich.

**Minute 5-25 – Ist-Zustand.** Wie läuft es heute, was wurde bereits versucht, was hat nicht funktioniert und warum. Der Teil, in dem am meisten zu lernen ist – und in dem am wenigsten gesprochen werden sollte.

**Minute 25-35 – Kosten des Problems.** Was passiert, wenn nichts geändert wird? Diese Frage beantwortet später die Budgetfrage.

**Minute 35-45 – Entscheidungsweg.** Wer ist beteiligt, wie wurde eine vergleichbare Entscheidung zuletzt getroffen, wie lange hat sie gedauert.

**Minute 45-55 – Passung benennen.** Ehrlich, in beide Richtungen. Wenn es nicht passt, ist das hier zu sagen.

**Minute 55-60 – Nächster Schritt mit Datum.** Kein "wir melden uns".

Der Anteil eigener Redezeit sollte unter 30 Prozent liegen. Wer mehr spricht, präsentiert – und Präsentation ist der Termin danach.

### Wenn der Termin per Video stattfindet

Der Ablauf bleibt gleich, drei Dinge ändern sich: Die Aufmerksamkeitsspanne ist kürzer, also gehört alles über 45 Minuten geteilt. Pausen wirken länger, also braucht es explizite Übergaben statt stillschweigender. Und Bildschirmfreigaben verschieben das Gespräch unweigerlich in den Präsentationsmodus – deshalb gehören sie an den Schluss, nicht an den Anfang.

## Disqualifizieren ist die eigentliche Leistung

Der Teil der Qualifizierung, der in kaum einer Vertriebsschulung vorkommt: Ein frühes, sauberes Nein ist wertvoller als ein spätes Vielleicht.

Die Rechnung dahinter ist banal und wird trotzdem ignoriert. Ein Lead, der nicht passt, verbraucht Vorbereitung, Termin, Angebot, zwei bis drei Nachfassvorgänge und mehrere Wochen Aufmerksamkeit in der Pipeline. Wer ihn in Minute 20 des Erstgesprächs aussortiert, gewinnt diese Zeit für einen Lead, der passt.

Drei Formulierungen, die das ermöglichen, ohne unhöflich zu wirken:

- **Die Erwartung vorab korrigieren.** Ein Satz zu Beginn, dass am Ende auch ein "passt nicht" stehen darf, macht das spätere Nein zu einem vereinbarten Ergebnis statt zu einer Absage.
- **Die Grenze von sich aus nennen.** "Bei unter zehn Mitarbeitern rechnet sich das erfahrungsgemäß nicht" ist eine Information, keine Zurückweisung – und sie erzeugt regelmäßig Widerspruch bei denen, für die es sich doch rechnet.
- **Den Verbleib klären.** Ein Nein zum jetzigen Zeitpunkt ist selten ein Nein für immer. Ein Wiedervorlagedatum mit Anlass hält die Tür offen, ohne die Pipeline zu verstopfen.

Die Kennzahl dazu heißt Disqualifizierungsquote, und sie sollte deutlich über null liegen. Ein Vertrieb, der niemanden aussortiert, qualifiziert nicht – er sammelt.

## Qualifizierung dokumentieren, sonst zählt sie nicht

Qualifizierung, die nur im Kopf des Gesprächsführenden existiert, geht beim nächsten Kontakt verloren. Vier Felder je Kontakt genügen, und sie gehören in dasselbe System, in dem auch die Termine liegen:

| Feld | Beispielinhalt |
|---|---|
| Auslöser | zweiter Standort eröffnet, Vertrieb wächst nicht mit |
| Entscheidungsweg | Geschäftsführung entscheidet, Fachbereich prüft mit |
| Kosten des Problems | rund zwei verlorene Angebote im Monat |
| Nächster Schritt | Rückruf 14.10., nach Abschluss der Standorteröffnung |

Der erste und der dritte Punkt sind die, die beim zweiten Kontakt den Unterschied machen: Wer damit ins Gespräch einsteigt statt mit einer Wiederholung des Einstiegs, führt ein Anschlussgespräch statt eines zweiten Erstgesprächs.

## Was das für die Terminvereinbarung bedeutet

Qualifizierung beginnt nicht im Discovery Call, sondern im Akquisetelefonat. Ein Termin, bei dem Bedarf, Zuständigkeit und Zeitpunkt vorher nicht geklärt wurden, ist ein Termin auf Verdacht. Genau diese Vorqualifizierung unterscheidet einen brauchbaren Kalender von einem vollen – und sie ist der Grund, warum die Definition des qualifizierten Termins in jedem Agenturvertrag stehen sollte, wie die [Checkliste zur Agenturauswahl](/blog/vertriebsagentur-finden-checkliste) zeigt.

Wie die Fragen im Telefonat gestellt werden, ohne dass daraus ein Verhör wird, steht im [Leitfaden zur B2B-Kaltakquise](/blog/b2b-kaltakquise-leitfaden). Was wir bei der Vorqualifizierung übernehmen, steht unter [Leistungen](/leistungen), regional etwa für die [Vertriebsagentur Köln](/leistungen/koeln).

## Quellen

- [Statistisches Unternehmensregister, Statistisches Bundesamt](https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/Unternehmensregister/_inhalt.html)
- [§ 7 UWG – Unzumutbare Belästigungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__7.html)
  `.trim(),
}
