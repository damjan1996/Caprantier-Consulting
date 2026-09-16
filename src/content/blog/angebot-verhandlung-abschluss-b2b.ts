import type { BlogPost } from '@/lib/blog-types'

// Neuer Beitrag vom 10.09.2026. Führt drei kürzere zusammen:
// angebote-schreiben-b2b, preisverhandlung-b2b-vertrieb,
// closing-techniken-vertrieb. Umleitungen in config/blog-redirects.js.
//
// Die drei Vorgänger behandelten drei Abschnitte desselben Vorgangs. Getrennt
// beantworteten sie keine vollständige Frage; zusammen decken sie den Weg vom
// Gespräch zur Unterschrift ab.
//
// TODO(Nico): Der Abschnitt "Die fünf Verlustgründe" ist aus der Methode
// abgeleitet. Deine tatsächliche Verteilung über ein Jahr – welcher Grund wie
// oft – wäre die belastbarste Zahl auf dieser ganzen Website.

export const angebotVerhandlungAbschlussB2b: BlogPost = {
  slug: 'angebot-verhandlung-abschluss-b2b',
  title: 'Vom Angebot zum Abschluss: B2B-Angebote, Preisverhandlung und Closing',
  description:
    'Wie ein B2B-Angebot aufgebaut sein muss, damit es entschieden wird, wie man einen Preis verhandelt ohne Rabattspirale, und warum der häufigste verlorene Auftrag nicht an den Wettbewerber geht, sondern an die Nichtentscheidung.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-10',
  updatedAt: '2026-09-10',
  category: 'Vertriebsmethoden',
  tags: [
    'B2B Angebot',
    'Angebot schreiben',
    'Preisverhandlung',
    'Closing',
    'Abschlusstechniken',
    'Vertriebsprozess',
    'Verhandlung',
    'B2B Vertrieb',
  ],
  featured: false,
  image: '/images/blog/angebote-schreiben.webp',
  faqs: [
    {
      question: 'Wie sollte ein B2B-Angebot aufgebaut sein?',
      answer:
        'Vom Problem zum Preis, nicht umgekehrt. Zuerst die Ausgangslage in den Worten des Kunden, dann das angestrebte Ergebnis, dann der Weg dorthin, dann Umfang und Preis, zuletzt der nächste Schritt mit Datum. Wer mit der Unternehmensvorstellung beginnt, verliert den Leser, bevor der Nutzen kommt.',
    },
    {
      question: 'Wie reagiert man auf die Forderung nach Rabatt?',
      answer:
        'Nie mit einem reinen Preisnachlass. Jede Preisreduktion braucht eine Gegenleistung: längere Laufzeit, größerer Umfang, schnellere Zahlung, Referenzfreigabe. Ein Rabatt ohne Gegenleistung entwertet nicht nur diesen Auftrag, sondern jeden künftigen – und signalisiert, dass der ursprüngliche Preis nicht ernst gemeint war.',
    },
    {
      question: 'Wie lange sollte ein B2B-Angebot gültig sein?',
      answer:
        'So lange, wie die Kalkulation trägt, und nicht länger – in der Praxis zwei bis vier Wochen. Eine Frist ohne sachlichen Grund wirkt als Druckmittel und beschädigt Vertrauen. Eine Frist mit Grund, etwa reservierte Kapazität, ist nachvollziehbar und wird akzeptiert.',
    },
    {
      question: 'Was ist der häufigste Grund für einen verlorenen B2B-Auftrag?',
      answer:
        'Nicht der Wettbewerber, sondern die ausbleibende Entscheidung. Ein Angebot konkurriert im B2B in erster Linie mit dem Zustand, alles so zu lassen wie es ist. Deshalb gehört in jedes Angebot die Konsequenz des Nichtstuns – in Zahlen, die der Kunde selbst genannt hat.',
    },
  ],
  content: `
Zwischen einem guten Gespräch und einem Auftrag liegen im B2B drei Schritte, an denen regelmäßig mehr verloren geht als in der gesamten Akquise davor: das Angebot, die Preisverhandlung und der Abschluss.

Das Bemerkenswerte daran: Diese drei Schritte sind vollständig kontrollierbar. Wer im Erstgespräch nicht durchkommt, hat das Gegenüber nicht in der Hand. Wer ein Angebot schreibt, hat jede Zeile in der Hand – und schreibt trotzdem meistens dasselbe Dokument wie alle anderen.

## Das Angebot: vom Problem zum Preis

Das typische B2B-Angebot beginnt mit einer Unternehmensvorstellung, führt über eine Leistungsbeschreibung zum Preis und endet mit einer Grußformel. Es liest sich, als sei es für den Absender geschrieben – und das ist es meistens auch.

Ein Angebot, das entschieden wird, hat eine andere Reihenfolge:

**1. Die Ausgangslage – in den Worten des Kunden.** Der erste Absatz beschreibt das Problem so, wie es im Gespräch geschildert wurde. Wörtlich, wenn möglich. Dieser Absatz beantwortet die einzige Frage, die der Leser wirklich hat: Hat der überhaupt verstanden, worum es geht?

Er hat zusätzlich einen praktischen Nutzen: Wenn das Angebot intern weitergereicht wird – und das wird es --, versteht auch jemand den Kontext, der beim Gespräch nicht dabei war.

**2. Das angestrebte Ergebnis.** Was ist in sechs Monaten anders? Möglichst in derselben Einheit, in der das Problem beschrieben wurde. Wenn der Kunde von zwei verlorenen Angeboten pro Monat gesprochen hat, gehört das Ergebnis in dieser Größe formuliert.

**3. Der Weg dorthin.** Kurz. Drei bis fünf Schritte mit Zeitangabe. Kein Methodenkatalog – der Kunde kauft ein Ergebnis, keine Vorgehensweise.

**4. Umfang und Preis.** Konkret, ohne Fußnotenlabyrinth. Was ist enthalten, was ausdrücklich nicht, welche Mitwirkung wird erwartet. Der Abschnitt "was nicht enthalten ist" verhindert mehr Streit als jede AGB.

**5. Der nächste Schritt mit Datum.** Nicht "wir freuen uns auf Ihre Rückmeldung", sondern ein konkreter, terminierter Vorgang.

### Zwei oder drei Varianten – aber nicht mehr

Ein einzelnes Angebot erzeugt eine Ja-Nein-Entscheidung. Zwei bis drei Varianten verschieben die Frage zu "welche" – und erlauben es dem Kunden zugleich, den Umfang zu wählen, statt über den Preis zu verhandeln.

Was dabei nicht funktioniert: Varianten, die sich nur im Preis unterscheiden. Sie machen sichtbar, dass der Preis verhandelbar ist. Varianten müssen sich im **Umfang** unterscheiden – Laufzeit, Anzahl, Betreuungstiefe.

Mehr als drei Varianten führen erfahrungsgemäß zu keiner Entscheidung. Wer die Wahl zwischen fünf Möglichkeiten hat, verschiebt.

## Der Preis und was er aussagt

Zwei Fehler dominieren die Preisdiskussion im deutschen Mittelstand, und sie sind gegenläufig.

**Fehler eins: Der Preis erscheint zu früh.** Wer im Erstgespräch einen Preis nennt, bevor die Kosten des Problems geklärt sind, wird mit null verglichen. Gegen null ist jeder Preis zu hoch.

**Fehler zwei: Der Preis erscheint zu spät.** Wer die Größenordnung bis zum schriftlichen Angebot geheim hält, riskiert, dass drei Wochen Arbeit an einer Zahl scheitern, die in Minute 30 des Erstgesprächs hätte fallen können. Eine Bandbreite gehört ins Erstgespräch, sobald der Bedarf steht.

### Rabatt nur gegen Gegenleistung

Die Forderung nach Nachlass ist im B2B-Einkauf Routine und selten ein Ablehnungsgrund. Entscheidend ist die Reaktion.

Ein Nachlass ohne Gegenleistung sagt drei Dinge, alle schlecht: Der ursprüngliche Preis war nicht ernst gemeint. Es geht noch mehr. Und beim nächsten Auftrag beginnt die Verhandlung unterhalb des jetzigen Preises.

Ein Nachlass mit Gegenleistung sagt das Gegenteil. Mögliche Gegenleistungen:

- **Längere Laufzeit** oder frühere Verlängerungsentscheidung
- **Größerer Umfang** – mehr Volumen zum besseren Stückpreis
- **Zahlungsziel** – Vorauszahlung oder kürzere Frist
- **Referenzfreigabe** – namentlich nennbar, schriftlich freigegeben
- **Reduzierter Umfang** zum reduzierten Preis, die ehrlichste Variante

Die vierte Möglichkeit ist im Marketing besonders wertvoll: Eine schriftlich freigegebene Referenz ist im deutschen B2B seltener als ein Rabatt und wirkt länger.

### Was im Preisgespräch rechtlich zählt

Werbeaussagen zum Preis unterliegen [§ 5 UWG](https://www.gesetze-im-internet.de/uwg_2004/__5.html): Irreführende Angaben über Preis oder Preisbestandteile sind unzulässig. Praktisch heißt das: Ein durchgestrichener "Normalpreis", der nie verlangt wurde, ist keine Verhandlungstaktik, sondern ein Wettbewerbsverstoß. Auch [§ 5a UWG](https://www.gesetze-im-internet.de/uwg_2004/__5a.html) ist relevant – Irreführung durch Unterlassen erfasst das Verschweigen wesentlicher Preisbestandteile.

## Der Abschluss: weniger Technik, mehr Klarheit

Die klassischen Abschlusstechniken – Alternativfrage, Verknappung, angenommener Abschluss – funktionieren im B2B mit fünf bis fünfzig Mitarbeitern schlecht bis kontraproduktiv. Der Grund ist strukturell: Der Gesprächspartner ist meistens Inhaber oder Geschäftsführer, entscheidet über sein eigenes Geld und erkennt Technik sofort.

Was stattdessen trägt, sind drei Fragen.

**"Was fehlt Ihnen noch zur Entscheidung?"** Die direkteste und wirksamste Frage im gesamten Vertriebsprozess. Sie unterstellt keine Zustimmung, sie öffnet den echten Einwand, und sie wird fast immer beantwortet.

**"Wer schaut sich das außer Ihnen noch an?"** Klärt das Buying Center, bevor das Angebot in einer internen Runde verschwindet, auf die niemand Zugriff hat. Mehr dazu im [Beitrag zur Lead-Qualifizierung](/blog/bant-methode-erklaert).

**"Wann fällt die Entscheidung?"** Ein Datum, kein Zeitraum. Ohne Datum gibt es keinen legitimen Anlass nachzufassen – und Nachfassen ohne Anlass ist der Punkt, an dem Vertrieb lästig wird.

### Nachfassen nach dem Angebot

Der Zeitraum zwischen Angebot und Entscheidung ist die Phase, in der die meisten Vorgänge lautlos sterben. Drei Regeln halten sie am Leben:

**Der Nachfasstermin wird im Gespräch vereinbart, nicht danach erfunden.** Wer beim Übersenden des Angebots sagt, wann er sich melden wird, und dann genau dann anruft, ist verlässlich. Wer ohne Ankündigung nach zehn Tagen anruft, ist lästig.

**Jeder Kontakt bringt etwas mit.** Eine Antwort auf eine offene Frage, eine Präzisierung, eine Referenz, eine Information zum Zeitplan. "Ich wollte nur nachhören, ob Sie schon dazu gekommen sind" ist kein Anlass, sondern eine Bitte um Aufmerksamkeit.

**Nach dem dritten erfolglosen Versuch wird der Vorgang geschlossen** – ausdrücklich und schriftlich, mit einem Satz, der die Tür offen lässt. Diese Nachricht erzeugt erfahrungsgemäß mehr Rückmeldungen als die drei Versuche davor, weil sie die einzige ist, die keine Antwort verlangt.

### Verhandeln, wenn der Einkauf übernimmt

Ab einer gewissen Unternehmensgröße wechselt der Ansprechpartner nach dem fachlichen Ja zum Einkauf – und mit ihm die Logik des Gesprächs. Der Fachbereich bewertet Eignung, der Einkauf bewertet Konditionen und Vergleichbarkeit.

Drei Dinge helfen an dieser Stelle:

- **Das fachliche Ja schriftlich haben,** bevor der Einkauf übernimmt. Ohne diesen Bezugspunkt wird nur noch über den Preis gesprochen.
- **Vergleichbarkeit aktiv herstellen.** Wer selbst benennt, worin sich sein Angebot von einem billigeren unterscheidet, bestimmt die Vergleichskriterien mit. Wer es dem Einkauf überlässt, wird auf den Stundensatz reduziert.
- **Eine Position kennen, die verhandelbar ist,** und eine, die es nicht ist. Eine Verhandlung ohne jeden Spielraum endet ohne Abschluss; eine ohne Grenze endet ohne Marge.

### Die fünf Verlustgründe

Wer Absagen kategorisiert, findet regelmäßig dieselbe Verteilung – und eine Überraschung:

| Grund | Was er bedeutet | Was hilft |
|---|---|---|
| Keine Entscheidung getroffen | Problem nicht dringend genug | Kosten des Nichtstuns beziffern |
| Preis | meist Wertproblem, selten Budget | Ergebnis in Kundeneinheiten |
| Wettbewerber | Vergleich verloren | Verlustgrund erfragen, nicht raten |
| Zeitpunkt | Bedarf da, Priorität nicht | Wiedervorlage mit Datum |
| Kein Bedarf | Qualifizierung war zu weich | früher disqualifizieren |

Die Überraschung ist die erste Zeile: **Der häufigste Wettbewerber im B2B ist die Nichtentscheidung.** Ein Angebot konkurriert weniger mit dem Mitbewerber als mit dem Zustand, alles so zu lassen, wie es ist.

Daraus folgt der wirksamste Eingriff in jedes Angebot: die Konsequenz des Nichtstuns – in Zahlen, die der Kunde selbst genannt hat. Nicht als Drohung, sondern als Rechnung. Wer im Erstgespräch gesagt hat, dass zwei Angebote im Monat verloren gehen, hat den Betrag selbst geliefert.

## Nach dem Ja und nach dem Nein

**Nach der Zusage** entscheidet die erste Woche über die Verlängerung. Was vereinbart wurde, gehört sofort terminiert; der erste sichtbare Fortschritt sollte innerhalb weniger Tage liegen. Die häufigste Ursache für Kündigungen nach drei Monaten ist ein zäher Start.

**Nach der Absage** gehört genau eine Frage gestellt: woran es gelegen hat. Nicht um zu diskutieren – um es zu erfahren. Die Antwort ist die einzige belastbare Information über den eigenen Markt, die kostenlos zu haben ist, und sie gehört in dieselbe Kategorienliste wie oben. Wie man sie systematisch auswertet, steht im [Beitrag zur Vertriebssteuerung](/blog/vertriebssteuerung-kpis-pipeline).

Wenn es an Terminen fehlt, an denen dieser Prozess überhaupt beginnen kann, steht der Weg dorthin im [Leitfaden zur B2B-Kaltakquise](/blog/b2b-kaltakquise-leitfaden). Was wir dabei übernehmen, steht unter [Leistungen](/leistungen), regional etwa für die [Vertriebsagentur Stuttgart](/leistungen/stuttgart).

## Quellen

- [§ 5 UWG – Irreführende geschäftliche Handlungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__5.html)
- [§ 5a UWG – Irreführung durch Unterlassen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__5a.html)
- [§ 84 HGB – Handelsvertreter, gesetze-im-internet.de](https://www.gesetze-im-internet.de/hgb/__84.html)
  `.trim(),
}
