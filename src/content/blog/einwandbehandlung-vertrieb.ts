import type { BlogPost } from '@/lib/blog-types'

// Zusammenführung vom 10.09.2026: ersetzt zusätzlich
// follow-up-strategien-vertrieb. Umleitung in config/blog-redirects.js.
//
// TODO(Nico): Die fünf Standardeinwände sind aus der Methode abgeleitet, nicht
// aus deiner Statistik. Wenn du aus 100 Gesprächen mitzählst, welcher Einwand
// wie oft kommt, wird aus der Reihenfolge in diesem Beitrag eine belegte
// Rangfolge – das kann sonst niemand im Wettbewerbsfeld liefern.

export const einwandbehandlungVertrieb: BlogPost = {
  slug: 'einwandbehandlung-vertrieb',
  title: 'Einwandbehandlung im B2B-Vertrieb: Die fünf Sätze, die wirklich kommen',
  description:
    'Kein Interesse, keine Zeit, zu teuer, schicken Sie Unterlagen, wir haben schon jemanden: Wie man die fünf häufigsten Einwände im B2B-Telefonvertrieb behandelt – und wie man danach professionell nachfasst.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-14',
  updatedAt: '2026-09-10',
  category: 'Vertriebsmethoden',
  tags: [
    'Einwandbehandlung',
    'B2B Vertrieb',
    'Kaltakquise',
    'Telefonakquise',
    'Follow-up',
    'Nachfassen',
    'Vertriebsgespräch',
    'Terminvereinbarung',
  ],
  featured: true,
  image: '/images/blog/einwandbehandlung.webp',
  faqs: [
    {
      question: 'Was ist der Unterschied zwischen einem Einwand und einem Vorwand?',
      answer:
        'Ein Einwand nennt einen echten Hinderungsgrund und lässt sich prüfen: zu teuer, kein Budget in diesem Quartal, bestehender Vertrag bis Jahresende. Ein Vorwand beendet das Gespräch, ohne einen Grund preiszugeben – kein Interesse ist der häufigste. Einwände beantwortet man, Vorwände hinterfragt man einmal freundlich und akzeptiert sie dann.',
    },
    {
      question: 'Wie oft darf man nach einer Absage noch einmal nachfassen?',
      answer:
        'Nach einem klaren Nein gar nicht mehr im selben Anlass. Nach einem melden Sie sich später so oft, wie ein Anlass es rechtfertigt – mit dokumentiertem Datum und neuem Grund. Wer beim dritten Anruf dieselbe Frage stellt wie beim ersten, hat keinen Anlass, sondern eine Wiedervorlage ohne Inhalt.',
    },
    {
      question: 'Wie reagiert man auf den Einwand zu teuer im Erstgespräch?',
      answer:
        'Im Erstgespräch ist zu teuer fast nie ein Preiseinwand, sondern ein Wertproblem: Der Angerufene kann den Nutzen nicht beziffern und vergleicht deshalb mit null. Die richtige Reaktion ist keine Rabattdiskussion, sondern die Frage, womit verglichen wird. Über den Preis wird erst gesprochen, wenn der Bedarf feststeht.',
    },
    {
      question: 'Ist ein Anruf nach einer E-Mail rechtlich zulässig?',
      answer:
        'Für den Anruf gegenüber Unternehmen gilt § 7 Abs. 2 Nr. 1 UWG mit der mutmaßlichen Einwilligung – eine vorherige E-Mail ändert daran nichts, weder positiv noch negativ. Umgekehrt gilt: Eine Werbe-E-Mail ohne vorherige Einwilligung bleibt unzulässig, auch nach einem freundlichen Telefonat, solange keine Einwilligung erteilt wurde.',
    },
  ],
  content: `
Im B2B-Telefonvertrieb entscheidet nicht der Einstieg über das Ergebnis, sondern der Satz danach. Der Einstieg dauert 20 Sekunden, dann kommt in den allermeisten Gesprächen ein Einwand. Wer an dieser Stelle in den Verkaufsmodus schaltet, verliert. Wer zuhört, bekommt eine zweite Frage.

Dieser Beitrag behandelt die fünf Einwände, die in der Praxis tatsächlich kommen, die Unterscheidung zwischen Einwand und Vorwand – und den Teil, den die meisten auslassen: das Nachfassen.

## Einwand oder Vorwand

Die wichtigste Unterscheidung des gesamten Gesprächs, und sie kostet nur eine Frage.

Ein **Einwand** benennt einen Grund. "Wir haben bis Jahresende einen laufenden Vertrag" ist prüfbar, verhandelbar und terminierbar. Ein **Vorwand** beendet das Gespräch, ohne einen Grund preiszugeben. "Kein Interesse" ist der Klassiker.

Der Unterschied ist nicht moralisch. Ein Vorwand ist eine völlig legitime Art, ein unerwünschtes Gespräch zu beenden, und wer ihn nicht respektiert, verliert mehr als den Termin. Die Regel: **Einen Vorwand hinterfragt man genau einmal.** Kommt danach wieder ein Vorwand, ist das Gespräch beendet – freundlich, ohne Nachtreten, mit dem Angebot, sich in sechs Monaten wieder zu melden.

## Die fünf Sätze, die wirklich kommen

### 1. "Kein Interesse"

Fast immer ein Vorwand, und fast immer zu früh, um inhaltlich gemeint zu sein: Der Angerufene hat nach 20 Sekunden noch gar nicht gehört, worum es geht. Er weist nicht das Angebot ab, sondern die Situation.

Was funktioniert: die Situation anerkennen und **eine** konkrete Frage stellen, die inhaltlich beantwortbar ist. Nicht "Darf ich Ihnen trotzdem kurz erklären", sondern eine Frage zum Anlass des Anrufs – also zu dem Grund, aus dem die Liste ausgerechnet dieses Unternehmen enthält.

Was nicht funktioniert: Widerspruch. "Das kann ich verstehen, aber ..." ist ein hörbares Aber, und danach hört niemand mehr zu.

### 2. "Keine Zeit"

Meist ein echter Einwand und deshalb einfach zu behandeln: Er ist eine Terminfrage in Verkleidung. Die richtige Reaktion ist nicht, das Gespräch zu verkürzen, sondern es zu verschieben – mit einem konkreten Vorschlag statt einer offenen Bitte.

Wer hier "Wann passt es Ihnen besser?" fragt, bekommt "Melden Sie sich mal wieder". Wer zwei konkrete Zeitfenster vorschlägt, bekommt eine Entscheidung.

### 3. "Schicken Sie mir Unterlagen"

Der freundlichste Vorwand im deutschen B2B. In den seltensten Fällen ist eine Unterlage wirklich gewünscht; meistens ist es der höfliche Weg, das Gespräch zu beenden, ohne Nein zu sagen.

Der Umgang damit ist trotzdem nicht: ablehnen. Der Umgang ist: **die Unterlage an eine Information koppeln.** Wer fragt, worauf die Unterlage eingehen soll, erfährt entweder den echten Bedarf – oder dass es keinen gibt. Beides ist mehr wert als ein ungelesenes PDF.

Und hier liegt eine juristische Falle: Wenn im Gespräch keine Einwilligung in Werbe-E-Mails erteilt wurde, ist der Versand von Werbematerial per Mail nicht durch die telefonische mutmaßliche Einwilligung gedeckt. Die Zusendung angeforderter Unterlagen ist etwas anderes als eine Werbemail – die Grenze verläuft an der Frage, ob der Empfänger sie erbeten hat. Mehr dazu im [Beitrag zu den rechtlichen Grundlagen](/blog/kaltakquise-rechtliche-grundlagen).

### 4. "Wir haben schon jemanden"

Der wertvollste Einwand überhaupt, weil er drei Informationen auf einmal liefert: Es gibt Bedarf, es gibt Budget, und es gibt einen Vergleichsmaßstab.

Die falsche Reaktion ist der Angriff auf den Wettbewerber. Die richtige ist die Frage nach dem, was heute **nicht** abgedeckt ist – und nach dem Vertragsende. Ein Unternehmen, das zufrieden ist, sagt das deutlich; eines, das nur eingerichtet ist, fängt an zu erzählen.

Ein Termin ist hier selten. Eine Wiedervorlage drei Monate vor Vertragsende dagegen fast immer.

### 5. "Zu teuer"

Im Erstgespräch praktisch nie ein Preiseinwand. Wer den Nutzen nicht beziffern kann, vergleicht mit null – und gegen null ist jeder Preis zu hoch.

Die Frage, die weiterführt, lautet: **womit verglichen wird.** Mit einer internen Lösung? Mit einem anderen Anbieter? Mit Nichtstun? Erst wenn das feststeht, ist eine Preisdiskussion überhaupt sinnvoll. Wie man den Preis danach sauber verhandelt, steht im [Beitrag zu Angebot, Verhandlung und Abschluss](/blog/angebot-verhandlung-abschluss-b2b).

## Das Muster hinter allen fünf

Alle fünf Reaktionen folgen derselben Reihenfolge, und die ist wichtiger als jede Formulierung:

1. **Anerkennen** – ohne Aber. Der Einwand ist berechtigt, bis das Gegenteil feststeht.
2. **Eine Frage** – eine, nicht drei. Sie muss inhaltlich beantwortbar sein.
3. **Zuhören** – vollständig. Die Antwort enthält fast immer den nächsten Schritt.
4. **Einen konkreten Vorschlag** – Termin, Wiedervorlage oder sauberes Ende.

Was in keiner der vier Stufen vorkommt: das eigene Angebot. Wer im Einwand über die eigene Leistung spricht, hat die Stufen übersprungen.

## Nachfassen: der Teil, an dem 80 Prozent aufhören

Die meisten Akquiseprojekte scheitern nicht am Erstgespräch, sondern daran, dass es kein zweites gibt. "Melden Sie sich in einem halben Jahr nochmal" ist ein vereinbarter Termin ohne Kalendereintrag – und genau so sollte er behandelt werden.

Ein belastbares Nachfassen braucht drei Dinge:

**Ein Datum, kein Zeitraum.** "Im Herbst" verschwindet. Der 14. Oktober nicht.

**Einen Anlass, keinen Anlassersatz.** Der zweite Anruf braucht einen neuen Grund: das Vertragsende, das der Angerufene selbst genannt hat, eine Veränderung im Unternehmen, ein abgeschlossenes Projekt. "Ich wollte nur nochmal nachhören" ist kein Anlass, sondern eine Entschuldigung dafür, keinen zu haben.

**Den Anschluss ans letzte Gespräch.** Der zweite Anruf beginnt nicht mit dem Einstieg von vorne, sondern mit dem, was beim letzten Mal gesagt wurde. Das ist der Moment, in dem sich zeigt, ob im ersten Gespräch jemand zugehört hat.

### Wie viele Kontakte sind angemessen

Es gibt keine allgemeingültige Zahl, aber eine brauchbare Regel: **so lange, wie ein Anlass existiert.** Wer bei jedem Kontakt einen neuen Grund hat, ist hartnäckig. Wer denselben Grund wiederholt, ist lästig – und im Zweifel Gegenstand einer Beschwerde bei der [Bundesnetzagentur](https://www.bundesnetzagentur.de/DE/Vportal/TK/Aerger/start.html), die unerlaubte Telefonwerbung verfolgt und Bußgelder verhängt.

Nach einem ausdrücklichen "Rufen Sie mich nicht mehr an" endet jede Kontaktaufnahme sofort und dauerhaft. Das ist keine Höflichkeit, sondern ein Widerspruch, der zu dokumentieren und im CRM zu sperren ist – die mutmaßliche Einwilligung nach [§ 7 UWG](https://www.gesetze-im-internet.de/uwg_2004/__7.html) ist damit widerlegt.

## Einwandvorwegnahme: der Einwand, der nie kommt

Die eleganteste Einwandbehandlung ist die, die im Einstieg schon stattgefunden hat. Wer weiß, dass in einer Zielgruppe zuverlässig derselbe Einwand kommt, kann ihn vorwegnehmen – allerdings nur unter einer Bedingung: Er muss **mit einer Antwort** vorweggenommen werden, nicht als Entschuldigung.

Falsch: "Ich weiß, Sie bekommen viele solcher Anrufe." Das ist keine Vorwegnahme, sondern eine Einladung zum Auflegen.

Richtig ist die Nennung des Grundes, aus dem dieser Anruf anders ist als die anderen – und der ist immer derselbe wie das Auswahlkriterium der Liste. Wer sagen kann, warum ausgerechnet dieses Unternehmen angerufen wird, hat den Einwand "kein Interesse" strukturell entwertet, bevor er ausgesprochen war.

Die Grenze: Mehr als ein vorweggenommener Einwand pro Gespräch wirkt defensiv. Wer drei mögliche Bedenken abräumt, bevor eines geäußert wurde, klingt wie jemand, der mit Widerstand rechnet.

## Einwände in schriftlicher Kommunikation

Am Telefon ist ein Einwand ein Satz. In E-Mail und LinkedIn ist er Schweigen – und das ist deutlich schwerer zu behandeln, weil die Rückfrage fehlt.

Zwei Unterschiede sind praktisch relevant:

**Es gibt keine zweite Chance im selben Kontakt.** Am Telefon folgt auf den Einwand sofort die Frage. Schriftlich vergehen Tage, und die Nachfrage wirkt schnell wie Drängen.

**Das Nichtantworten ist mehrdeutig.** Keine Antwort kann Desinteresse, Urlaub, Überlastung oder ein internes Nein bedeuten. Wer darauf mit einer Erinnerung reagiert, die nichts Neues enthält, verwandelt Mehrdeutigkeit in eine klare Absage.

Hinzu kommt die rechtliche Asymmetrie: Der Anruf ist gegenüber Unternehmen bei mutmaßlicher Einwilligung zulässig, die unaufgeforderte Werbe-E-Mail nicht. Wer nach einem Telefonat schriftlich nachfasst, sollte deshalb genau wissen, ob der Gesprächspartner die Unterlage erbeten hat – oder ob er gerade eine unzulässige Werbemail schreibt. Die Kanäle im Einzelnen behandelt der [Beitrag zu den Kanälen der B2B-Leadgenerierung](/blog/b2b-leadgenerierung-kanaele).

## Einwandbehandlung trainieren, nicht auswendig lernen

Was messbar besser wird, wenn man es übt, und was nicht:

| Übungsform | Wirkt auf | Aufwand |
|---|---|---|
| Eigene Gespräche mitschreiben, Einwände protokollieren | die Rangfolge der Einwände in **dieser** Zielgruppe | gering, dauerhaft |
| Rollenspiel mit vertauschten Rollen | Reaktionszeit, Tonfall | mittel |
| Erste 60 Sekunden mitschneiden und anhören | Sprechtempo, Füllwörter, Unterbrechungen | gering, unangenehm |
| Antworten auswendig lernen | nichts Nachweisbares | hoch |

Der Mitschnitt ist die unbeliebteste und wirksamste Methode. Wer die eigenen ersten 60 Sekunden zehnmal hintereinander hört, findet mehr Verbesserungen als in jedem Seminar – und braucht dafür nur eine Einwilligung des Gesprächspartners, wo die Aufnahme rechtlich erforderlich ist.

## Warum Einwandbehandlung nicht am Skript hängt

Wer die fünf Antworten auswendig lernt, klingt beim sechsten Gespräch wie ein Anrufbeantworter. Was tatsächlich trägt, ist die Kenntnis der Zielgruppe: Wer weiß, welche drei Probleme ein IT-Systemhaus mit 25 Mitarbeitern im Vertrieb hat, braucht keine Einwandtechnik – der Einwand kommt gar nicht erst, weil der Einstieg schon den richtigen Punkt getroffen hat.

Deshalb liegt der Hebel vor dem Gespräch. Der [Leitfaden zur B2B-Kaltakquise](/blog/b2b-kaltakquise-leitfaden) behandelt die Liste, den Anlass und den Einstieg – die drei Stellen, an denen Einwände entstehen oder eben nicht.

Wenn die eigene Kapazität für regelmäßige Akquise nicht reicht, ist die Auslagerung eine Option. Was wir dabei übernehmen, steht unter [Leistungen](/leistungen); für den Raum Düsseldorf gibt es eine eigene Seite zur [Vertriebsagentur Düsseldorf](/leistungen/duesseldorf).

## Quellen

- [§ 7 UWG – Unzumutbare Belästigungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__7.html)
- [Ärger mit Rufnummern und Anrufen, Bundesnetzagentur](https://www.bundesnetzagentur.de/DE/Vportal/TK/Aerger/start.html)
  `.trim(),
}
