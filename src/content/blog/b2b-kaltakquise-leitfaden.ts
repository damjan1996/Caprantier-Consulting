import type { BlogPost } from '@/lib/blog-types'

// Zusammenführung vom 10.09.2026. Dieser Beitrag ersetzt sechs kürzere:
// telefonakquise-skript-erstellen, kaltakquise-beste-uhrzeit,
// gatekeeper-ueberwinden, kaltakquise-warmakquise-unterschied,
// voicemail-vertrieb-tipps, gespraechseinstieg-kaltakquise.
// Die Umleitungen stehen in config/blog-redirects.js.
//
// TODO(Nico): Die Abschnitte "Der Einstieg" und "Der Gatekeeper" tragen die
// Methode, aber keine echten Gesprächsbeispiele. Zwei bis drei wörtliche
// Einstiege aus deinen eigenen Telefonaten – einer, der funktioniert hat,
// einer, der abgebrochen wurde – machen aus diesem Text den einzigen im
// Wettbewerbsfeld, der nicht aus zweiter Hand geschrieben ist.

export const b2bKaltakquiseLeitfaden: BlogPost = {
  slug: 'b2b-kaltakquise-leitfaden',
  title: 'B2B-Kaltakquise: Leitfaden für das Telefongespräch',
  description:
    'Vom Listenaufbau bis zum vereinbarten Termin: rechtlicher Rahmen nach § 7 UWG, Anrufzeiten, Gatekeeper, Gesprächseinstieg, Einwände und Mailbox. Der vollständige Leitfaden für B2B-Telefonakquise.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-18',
  updatedAt: '2026-09-10',
  category: 'Kaltakquise',
  tags: [
    'B2B Kaltakquise',
    'Telefonakquise',
    'Kaltakquise Leitfaden',
    'Gesprächseinstieg',
    'Gatekeeper',
    'Telefonakquise Skript',
    'Neukundengewinnung',
    'Terminvereinbarung',
  ],
  featured: true,
  image: '/images/blog/b2b-kaltakquise.webp',
  faqs: [
    {
      question: 'Ist B2B-Kaltakquise am Telefon in Deutschland erlaubt?',
      answer:
        'Gegenüber Unternehmen ja, sofern eine mutmaßliche Einwilligung vorliegt. § 7 Abs. 2 Nr. 1 UWG verlangt beim Verbraucher eine vorherige ausdrückliche Einwilligung, beim sonstigen Marktteilnehmer dagegen nur eine zumindest mutmaßliche. Diese liegt vor, wenn das Angebot einen konkreten sachlichen Bezug zur Geschäftstätigkeit des Angerufenen hat. Für Werbe-E-Mails gilt diese Erleichterung nicht.',
    },
    {
      question: 'Wann ist die beste Zeit für einen Akquiseanruf?',
      answer:
        'Es gibt kein universell bestes Zeitfenster, sondern nur eines pro Zielgruppe. Entscheidend ist, wann die angerufene Rolle erreichbar und nicht im Termin ist. Handwerk und Produktion sind früh am Morgen erreichbar, Geschäftsführung im Dienstleistungsumfeld eher am späten Vormittag und am frühen Abend. Wer die eigenen Verbindungsquoten je Stunde protokolliert, hat die Antwort nach etwa 200 Anrufen selbst.',
    },
    {
      question: 'Wie viele Anrufe braucht es für einen qualifizierten Termin?',
      answer:
        'Realistisch sind im deutschen B2B-Mittelstand mehrere Dutzend Wählversuche pro vereinbartem Entscheidertermin, weil ein großer Teil der Versuche gar nicht zu einem Gespräch führt. Die aussagekräftige Kennzahl ist deshalb nicht der Wählversuch, sondern das erreichte Entscheidergespräch: aus diesen entsteht ein Termin deutlich häufiger.',
    },
    {
      question: 'Braucht Kaltakquise ein Skript?',
      answer:
        'Ein Skript zum Ablesen schadet, ein Gesprächsgerüst hilft. Festgelegt gehören der erste Satz, die Qualifizierungsfragen und die Terminfrage. Alles dazwischen ist Zuhören. Wer den Einstieg wörtlich festlegt, verliert im entscheidenden Moment weniger Zeit mit Formulieren.',
    },
    {
      question: 'Was ist der Unterschied zwischen Kaltakquise und Warmakquise?',
      answer:
        'Kaltakquise ist der Erstkontakt ohne vorherige Geschäftsbeziehung. Warmakquise setzt auf einem bestehenden Bezug auf: ein früherer Kunde, ein Messekontakt, eine Empfehlung, eine Anfrage. Der rechtliche Rahmen unterscheidet sich beim Telefonat kaum, der Gesprächsverlauf massiv, weil bei Warmakquise die Legitimationsfrage entfällt.',
    },
  ],
  content: `
Kaltakquise am Telefon hat im deutschen B2B einen schlechten Ruf und eine hohe Trefferquote. Beides stimmt. Der schlechte Ruf stammt aus dem Verbrauchergeschäft, wo ungefragte Anrufe verboten sind und trotzdem stattfinden. Die Trefferquote stammt daraus, dass ein Telefonat die einzige Kontaktform ist, in der ein Entscheider innerhalb von 90 Sekunden Rückfragen stellen kann.

Dieser Leitfaden führt durch den vollständigen Ablauf: rechtlicher Rahmen, Liste, Anrufzeit, Gatekeeper, Einstieg, Qualifizierung, Terminfrage, Mailbox und Nachfassen.

## Der rechtliche Rahmen in drei Sätzen

Maßgeblich ist [§ 7 Abs. 2 Nr. 1 UWG](https://www.gesetze-im-internet.de/uwg_2004/__7.html). Die Vorschrift unterscheidet ausdrücklich zwei Fälle: Werbung "mit einem Telefonanruf gegenüber einem Verbraucher ohne dessen vorherige ausdrückliche Einwilligung oder gegenüber einem sonstigen Marktteilnehmer ohne dessen zumindest mutmaßliche Einwilligung".

Der Unterschied ist die Grundlage des gesamten B2B-Telefonvertriebs. Beim Verbraucher braucht es ein aktives Ja vor dem Anruf. Beim Unternehmen genügt die mutmaßliche Einwilligung – die Annahme, dass ein Anruf im geschäftlichen Interesse des Angerufenen liegt, weil das Angebot einen konkreten sachlichen Bezug zu seiner Tätigkeit hat.

Diese Erleichterung gilt **nur für den Anruf**. Für Werbe-E-Mails ohne vorherige Einwilligung gibt es sie nicht. Wer den Unterschied verwischt, riskiert Abmahnungen. Die Details, die Beweislast und die Frage, wie weit der sachliche Bezug reicht, stehen im [Beitrag zu den rechtlichen Grundlagen der Kaltakquise](/blog/kaltakquise-rechtliche-grundlagen).

## Die Liste entscheidet mehr als das Gespräch

Der häufigste Grund für erfolglose Akquise ist keine schlechte Gesprächsführung, sondern eine Liste, die nicht zum Angebot passt. Das [Unternehmensregister des Statistischen Bundesamts](https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/Unternehmensregister/_inhalt.html) führt rund 3,5 Millionen rechtliche Einheiten in Deutschland. Davon kommen für ein bestimmtes B2B-Angebot typischerweise ein paar hundert bis wenige tausend infrage.

Eine belastbare Liste beantwortet vor dem ersten Anruf vier Fragen:

1. **Warum jetzt?** Gibt es einen Anlass – Wachstum, offene Stellen, neuer Standort, Regulierung, Systemwechsel?
2. **Wer entscheidet?** Nicht die Abteilung, die Rolle. Bei fünf bis fünfzig Mitarbeitern ist das meist die Geschäftsführung selbst.
3. **Was kostet das Problem?** Ein Angebot, das ein Problem löst, dessen Preis der Angerufene nicht beziffern kann, verkauft sich nicht am Telefon.
4. **Wer löst es sonst?** Wenn es keinen Wettbewerber gibt, gibt es meist auch keinen Markt.

Wer diese vier Fragen nicht beantworten kann, sollte nicht mit dem Wählen anfangen. Die Zeit ist in der Recherche besser investiert. Beim Aufbau der Kriterien hilft der Beitrag zur [Lead-Qualifizierung nach BANT](/blog/bant-methode-erklaert).

## Anrufzeiten: messen statt glauben

Zu den beliebtesten Behauptungen im Vertrieb gehört, es gebe eine allgemein beste Uhrzeit für Akquiseanrufe. Es gibt keine. Es gibt nur ein bestes Zeitfenster **pro Zielgruppe**, und das hängt an der Rolle, nicht am Wochentag.

Als Ausgangshypothese hat sich bewährt:

| Zielgruppe | Erreichbar | Warum |
|---|---|---|
| Handwerk, Produktion, Logistik | 07:00-08:00 Uhr | vor Schichtbeginn im Büro |
| Geschäftsführung Dienstleistung | 10:00-11:30 und 16:30-18:00 Uhr | zwischen den Terminblöcken |
| IT-Leitung, Systemhäuser | 09:00-10:00 Uhr | vor dem ersten Ticket-Standup |
| Personalwesen | 14:00-16:00 Uhr | Vormittag gehört Bewerbungsgesprächen |
| Einkauf, Verwaltung | 09:00-11:00 Uhr | feste Bürozeiten |

Diese Tabelle ist ein Startpunkt, keine Wahrheit. Belastbar wird sie erst durch die eigenen Daten. Wer über 200 Wählversuche hinweg Uhrzeit und Ergebnis protokolliert, sieht das eigene Muster deutlich – und es weicht regelmäßig von jeder allgemeinen Empfehlung ab.

Wichtiger als die Uhrzeit ist die **Blockbildung**: zwei Stunden am Stück wählen schlägt zwanzig über den Tag verteilte Anrufe deutlich, weil Einwände nach dem zehnten Gespräch anders klingen als nach dem ersten.

## Der Gatekeeper ist kein Gegner

Das Sekretariat filtert nicht aus Bosheit, sondern im Auftrag. Wer das akzeptiert, kommt weiter als jeder, der Tricks anwendet.

Drei Dinge funktionieren zuverlässig:

**Klarheit statt Tarnung.** Wer beim Anlass lügt, verliert spätestens beim Rückruf. Der eigene Name, das eigene Unternehmen und der Grund des Anrufs in einem Satz – das ist keine Schwäche, das ist die schnellste Route.

**Die Frage nach der Zuständigkeit statt nach der Person.** Wer bei Ihnen entscheidet, an wen die Neukundenakquise geht? ist eine beantwortbare Frage. Kann ich Herrn Müller sprechen? ist es nur mit Ja oder Nein.

**Den Gatekeeper als Quelle nutzen.** Auch wenn kein Durchstellen erfolgt: Name, Funktion, beste Erreichbarkeit und der Hinweis, dass das Thema gerade nicht ansteht, sind Informationen, die den nächsten Versuch verkürzen.

Nicht funktionieren: erfundene Rückrufe, vorgetäuschte Bekanntschaft, Vornamen ohne Grundlage. Das erhöht die Durchstellquote im einzelnen Anruf und senkt die Terminquote über die Kampagne, weil das Gespräch mit einer Korrektur beginnt.

## Der Einstieg: 20 Sekunden

Der erste Satz entscheidet, ob es ein Gespräch gibt. Er hat drei Aufgaben und braucht drei Teile:

1. **Wer spricht** – Name und Firma, ohne Umschweife.
2. **Warum ausgerechnet dieses Unternehmen** – der konkrete Anlass. Das ist der Teil, den fast alle weglassen und der den Unterschied macht.
3. **Was jetzt passieren soll** – eine Frage, keine Präsentation.

Der zweite Teil ist zugleich die praktische Umsetzung der mutmaßlichen Einwilligung: Wer sagen kann, warum das Angebot zur Geschäftstätigkeit des Angerufenen passt, erfüllt die Voraussetzung des § 7 UWG nicht nur formal, sondern hörbar.

Was den Einstieg zuverlässig zerstört: eine Frage nach der Befindlichkeit, die Ankündigung, es dauere nur zwei Minuten, und jede Formulierung, die eine Absage vorwegnimmt.

Nach dem Einstieg kommt in den meisten Gesprächen ein Einwand. Der ist kein Scheitern, sondern der Anfang des Gesprächs – wie man ihn behandelt, steht im [Beitrag zur Einwandbehandlung](/blog/einwandbehandlung-vertrieb).

## Qualifizieren, bevor der Termin fällt

Ein Termin, der nicht qualifiziert ist, kostet zweimal Zeit: einmal beim Vereinbaren, einmal beim Absagen. Vor der Terminfrage gehören deshalb drei Punkte geklärt:

- **Bedarf**: Gibt es das Problem überhaupt, und ist es dem Angerufenen bewusst?
- **Zuständigkeit**: Spricht diese Person für die Entscheidung oder holt sie jemanden dazu?
- **Zeitpunkt**: Steht das Thema in den nächsten Monaten an oder gar nicht?

Fehlt einer der drei, ist der ehrliche Ausgang kein Termin, sondern ein Wiedervorlagedatum. Genau diese Disziplin unterscheidet einen Kalender voller Gespräche von einem Kalender voller Absagen.

## Die Mailbox: kurz, konkret, mit Rückrufgrund

In den meisten Kampagnen landet ein erheblicher Teil der Versuche auf der Mailbox. Eine Nachricht lohnt sich, wenn sie unter 25 Sekunden bleibt und einen Grund zum Rückruf liefert:

- Name, Firma, Rufnummer – **die Nummer zweimal**, am Anfang und am Ende.
- Der konkrete Anlass in einem Satz.
- Kein Angebot, keine Leistungsbeschreibung, keine Bitte um Rückruf ohne Grund.

Sinnvoll ist die Mailbox beim zweiten und dritten Versuch, nicht beim ersten. Beim ersten Versuch ist der Anruf ohne Nachricht die bessere Wahl, weil eine Nachricht das Gespräch vorwegnimmt, bevor überhaupt eines stattgefunden hat.

## Kaltakquise oder Warmakquise

Der Unterschied ist nicht rechtlicher, sondern gesprächspsychologischer Natur.

| Merkmal | Kaltakquise | Warmakquise |
|---|---|---|
| Ausgangslage | kein vorheriger Kontakt | Messe, Anfrage, Empfehlung, Altkunde |
| Erste Hürde | Legitimation: warum dieser Anruf? | entfällt weitgehend |
| Gesprächsdauer | kurz, hohe Abbruchquote | länger, inhaltlicher |
| Aufwand pro Termin | hoch | deutlich niedriger |
| Skalierbarkeit | hoch, Liste ist beliebig erweiterbar | begrenzt durch bestehende Kontakte |

In der Praxis ist die Frage nie entweder oder. Warmakquise ist immer zuerst dran, weil sie günstiger ist – sie geht nur irgendwann aus. Kaltakquise ist der Kanal, der nicht ausgeht.

## Nachfassen: der Teil, an dem die meisten aufhören

Ein "melden Sie sich in einem halben Jahr nochmal" ist kein Nein, sondern ein Termin ohne Eintrag. Wer diese Fälle konsequent auf Wiedervorlage legt und den Anlass notiert, hat nach zwölf Monaten eine Liste, die deutlich besser konvertiert als jede neu gekaufte Adresse.

Drei Regeln haben sich bewährt: das Datum nennen, den Anlass notieren, und beim Wiederanruf mit dem letzten Gespräch beginnen, nicht mit dem Einstieg von vorne.

## Wenn die Kapazität fehlt

Kaltakquise funktioniert, wenn sie regelmäßig stattfindet. Genau daran scheitert sie in kleinen und mittleren Unternehmen: Nach zwei guten Monaten ist die Pipeline voll, die Akquise pausiert, und drei Monate später ist sie leer. Wer diesen Zyklus kennt, hat entweder ein Kapazitäts- oder ein Prozessproblem – und beides löst sich nicht durch ein besseres Skript.

Ein Weg heraus ist, die Akquise auszulagern. Was das kostet und welche Modelle es gibt, steht im [Beitrag zu den Kosten von Vertriebsoutsourcing](/blog/vertrieb-auslagern-kosten-vorteile). Wie wir das konkret umsetzen, steht auf der Seite zu [unseren Leistungen](/leistungen); für das Rheinland gibt es eine eigene Übersicht zur [Kaltakquise in Köln](/kaltakquise/koeln).

## Quellen

- [§ 7 UWG – Unzumutbare Belästigungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__7.html)
- [Statistisches Unternehmensregister, Statistisches Bundesamt](https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/Unternehmensregister/_inhalt.html)
- [Ärger mit Rufnummern und Anrufen, Bundesnetzagentur](https://www.bundesnetzagentur.de/DE/Vportal/TK/Aerger/start.html)
  `.trim(),
}
