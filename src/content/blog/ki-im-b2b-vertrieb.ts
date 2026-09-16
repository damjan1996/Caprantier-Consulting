import type { BlogPost } from '@/lib/blog-types'

// Zusammenführung vom 10.09.2026: ersetzt zusätzlich chatgpt-ki-vertrieb und
// sales-automation-workflow. Umleitungen in config/blog-redirects.js.
//
// Dieser Beitrag ist der einzige, der auf /ki-transparenz verweisen muss:
// Wer über KI im Vertrieb schreibt und selbst KI-gestützt schreibt, macht das
// sichtbar. Die Verlinkung ist deshalb kein Beiwerk, sondern Teil der Aussage.

export const kiImB2bVertrieb: BlogPost = {
  slug: 'ki-im-b2b-vertrieb',
  title: 'KI im B2B-Vertrieb: Was sie übernimmt und was sie nicht kann',
  description:
    'Wo Sprachmodelle und Automatisierung im B2B-Vertrieb echte Arbeit abnehmen – Recherche, Vorbereitung, Dokumentation, Auswertung – und wo ihr Einsatz rechtlich oder inhaltlich an Grenzen stößt. Mit dem Rahmen aus DSGVO und KI-Verordnung.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-18',
  updatedAt: '2026-09-10',
  category: 'Trends',
  tags: [
    'KI im Vertrieb',
    'Sales Automation',
    'ChatGPT Vertrieb',
    'Vertriebsautomatisierung',
    'KI-Verordnung',
    'B2B Vertrieb',
    'CRM Automatisierung',
    'Datenschutz',
  ],
  featured: false,
  image: '/images/blog/ki-b2b-vertrieb.webp',
  faqs: [
    {
      question: 'Wofür lässt sich KI im B2B-Vertrieb sinnvoll einsetzen?',
      answer:
        'Für alles, was Textarbeit um das Gespräch herum ist: Recherche und Zusammenfassung von Zielunternehmen, Vorbereitung von Gesprächsleitfäden, Nachbereitung und Dokumentation, Entwürfe für Angebote sowie die Auswertung von Absagegründen. Nicht für das Gespräch selbst und nicht für die Entscheidung, wer angerufen wird.',
    },
    {
      question: 'Darf man Kundendaten in ein Sprachmodell eingeben?',
      answer:
        'Nur unter Bedingungen. Personenbezogene Daten in einen externen Dienst zu geben, ist eine Verarbeitung nach DSGVO und braucht eine Rechtsgrundlage sowie einen Auftragsverarbeitungsvertrag mit dem Anbieter. In der Praxis ist es meist einfacher und sicherer, vor der Eingabe zu anonymisieren – Branche und Größe reichen für fast jede Recherche.',
    },
    {
      question: 'Muss KI-Einsatz im Vertrieb gekennzeichnet werden?',
      answer:
        'Bei direkter Interaktion ja. Art. 50 der KI-Verordnung verlangt, dass Menschen erkennen können, wenn sie mit einem KI-System interagieren – das betrifft Chatbots und synthetische Stimmen. Ein intern zur Vorbereitung genutztes Sprachmodell löst diese Pflicht nicht aus; ein Anruf mit synthetischer Stimme sehr wohl.',
    },
    {
      question: 'Ersetzt KI den Vertriebsmitarbeiter?',
      answer:
        'Im B2B-Erstkontakt bislang nicht. Was ein Gespräch trägt, ist die Fähigkeit, auf eine unerwartete Antwort mit einer Rückfrage zu reagieren, die zeigt, dass zugehört wurde. Was Automatisierung zuverlässig übernimmt, ist die Arbeit davor und danach – und das ist in der Praxis der größere Zeitanteil.',
    },
  ],
  content: `
Über KI im Vertrieb wird überwiegend in zwei Extremen gesprochen: Sie ersetze bald jeden Vertriebsmitarbeiter, oder sie sei ein Spielzeug. Beides führt zu schlechten Entscheidungen.

Nützlicher ist eine nüchterne Aufteilung entlang der Frage, was am Vertriebsalltag eigentlich Textarbeit ist – denn genau dort liegt der Nutzen, und er ist erheblich.

## Die Aufteilung

In einem typischen Akquiseprozess entfällt nur ein Teil der Zeit auf das Gespräch selbst. Der Rest ist Recherche, Vorbereitung, Dokumentation, Nachbereitung und Auswertung – und das ist überwiegend Textarbeit.

| Tätigkeit | Automatisierbar | Warum |
|---|---|---|
| Zielunternehmen recherchieren und zusammenfassen | weitgehend | Textarbeit mit öffentlich verfügbarer Quelle |
| Gesprächsleitfaden je Zielgruppe entwerfen | teilweise | Entwurf ja, Prüfung durch Menschen zwingend |
| Das Telefonat führen | nein | verlangt Reaktion auf Unerwartetes |
| Gesprächsnotiz strukturieren | weitgehend | Umformung vorhandener Information |
| Angebotsentwurf erstellen | teilweise | Struktur ja, Inhalt und Preis nein |
| Absagegründe kategorisieren und auswerten | weitgehend | Musterkennung in Freitext |
| Entscheiden, wer angerufen wird | nein | rechtliche Verantwortung, siehe unten |

Die letzte Zeile ist die wichtigste und wird am häufigsten übersehen.

## Wo der Nutzen tatsächlich entsteht

**Recherche und Verdichtung.** Vor einem Anruf wissen, was das Unternehmen macht, wie groß es ist, ob es wächst und welche Stellen ausgeschrieben sind – das ist die Arbeit, die in der Praxis am häufigsten ausfällt, weil sie pro Kontakt mehrere Minuten kostet. Genau diese Verdichtung öffentlich verfügbarer Informationen können Sprachmodelle zuverlässig.

Der Ertrag ist kein Zeitgewinn, sondern ein Qualitätsgewinn: Der konkrete Anlass im Gesprächseinstieg ist der Teil, der über das Gespräch entscheidet – und zugleich der, der die mutmaßliche Einwilligung nach [§ 7 UWG](https://www.gesetze-im-internet.de/uwg_2004/__7.html) trägt.

**Nachbereitung.** Eine Gesprächsnotiz in die vier Felder zu bringen, die im CRM stehen sollten – Auslöser, Entscheidungsweg, Kosten des Problems, nächster Schritt --, ist eine Umformung. Sie kostet pro Gespräch ein paar Minuten und unterbleibt deshalb regelmäßig, was die gesamte spätere Auswertung wertlos macht.

**Auswertung von Freitext.** Zweihundert Absagegründe in fünf Kategorien zu sortieren, ist eine Aufgabe, für die im Mittelstand nie jemand Zeit hat. Sie ist zugleich die wertvollste Auswertung überhaupt, weil sie zeigt, ob das Problem im Angebot, in der Zielgruppe oder im Prozess liegt – siehe [Beitrag zur Vertriebssteuerung](/blog/vertriebssteuerung-kpis-pipeline).

## Wo es nicht funktioniert

**Im Gespräch selbst.** Ein Akquisetelefonat besteht aus wenigen Sekunden Vortrag und ansonsten aus Reaktionen auf Antworten, die nicht vorhersehbar waren. Was ein Gespräch trägt, ist die Rückfrage, die zeigt, dass zugehört wurde – und die auf einen Nebensatz reagiert, den kein Leitfaden vorgesehen hat.

**In der Massenansprache.** Automatisiert erzeugte Personalisierung erkennt jeder Empfänger nach dem zweiten Satz. Der Effekt ist nicht neutral, sondern negativ: Ein erkennbar generierter persönlicher Bezug wirkt schlechter als gar keiner, weil er einen Vertrauensbruch signalisiert.

**Bei der Zielgruppenentscheidung.** Wer angerufen wird, ist eine rechtliche Entscheidung. Die Beweislast für die mutmaßliche Einwilligung liegt beim werbenden Unternehmen; ein automatisch erzeugtes Auswahlkriterium, das niemand geprüft hat, ist im Streitfall keine Verteidigung. Details im [Beitrag zu den rechtlichen Grundlagen](/blog/kaltakquise-rechtliche-grundlagen).

## Der rechtliche Rahmen

Drei Regelwerke sind relevant, und sie greifen unabhängig voneinander.

### Datenschutz

Personenbezogene Daten in einen externen Dienst zu geben, ist eine Verarbeitung im Sinne der DSGVO. Sie braucht eine Rechtsgrundlage – im Vertrieb üblicherweise das berechtigte Interesse nach [Art. 6 Abs. 1 lit. f DSGVO](https://dsgvo-gesetz.de/art-6-dsgvo/) – und einen Auftragsverarbeitungsvertrag mit dem Anbieter.

Der praktikablere Weg ist meistens ein anderer: **vor der Eingabe anonymisieren.** Für die Frage, welche Einwände ein IT-Systemhaus mit 25 Mitarbeitern typischerweise hat, braucht kein Modell den Firmennamen. Wer sich diese Gewohnheit angewöhnt, umgeht die gesamte Diskussion.

Hinzu kommt: Wurden die Daten nicht bei der betroffenen Person erhoben – der Regelfall bei recherchierten Listen --, greift die Informationspflicht aus [Art. 14 DSGVO](https://dsgvo-gesetz.de/art-14-dsgvo/).

### KI-Verordnung

Art. 50 der europäischen KI-Verordnung verlangt Transparenz bei direkter Interaktion: Menschen müssen erkennen können, dass sie mit einem KI-System sprechen. Für den Vertrieb heißt das konkret:

- **Chatbot auf der Website:** kennzeichnungspflichtig.
- **Synthetische Stimme im Telefonat:** kennzeichnungspflichtig – und im deutschen B2B-Erstkontakt ohnehin eine schlechte Idee.
- **Intern genutztes Sprachmodell zur Vorbereitung:** löst die Pflicht nicht aus, weil keine Interaktion mit der betroffenen Person stattfindet.
- **KI-generierte Bilder und Texte auf der eigenen Website:** gehören offengelegt. Wie wir das handhaben, steht auf unserer Seite zur [KI-Transparenz](/ki-transparenz).

### Wettbewerbsrecht

Automatisch erzeugte Inhalte unterliegen denselben Regeln wie jeder andere Werbetext. [§ 5 UWG](https://www.gesetze-im-internet.de/uwg_2004/__5.html) untersagt irreführende Angaben unabhängig davon, wer sie formuliert hat. Ein Sprachmodell, das eine plausibel klingende Referenzzahl erfindet, erzeugt einen Wettbewerbsverstoß – und die Verantwortung liegt bei dem, der ihn veröffentlicht.

Das ist der praktisch wichtigste Punkt des gesamten Themas: **Sprachmodelle erzeugen zuverlässig plausible Zahlen.** Jede Zahl, jeder Kundenname und jede Erfolgsangabe aus einem generierten Text gehört geprüft oder gestrichen.

## Ein realistischer Einstieg in drei Schritten

Die meisten KI-Vorhaben im Vertrieb scheitern nicht an der Technik, sondern daran, dass sie zu groß beginnen. Ein Vorgehen, das trägt:

**Schritt 1 – eine wiederkehrende Textaufgabe wählen.** Nicht "den Vertrieb automatisieren", sondern eine konkrete Tätigkeit, die mehrmals pro Woche anfällt und heute Zeit kostet: die Vorbereitung auf zehn Anrufe, die Strukturierung der Gesprächsnotizen einer Woche, die Kategorisierung der Absagegründe eines Monats.

**Schritt 2 – den Aufwand vorher messen.** Wie lange dauert die Aufgabe heute, pro Woche? Ohne diese Zahl lässt sich hinterher nicht sagen, ob sich etwas verbessert hat – und in der Praxis wird diese Messung fast nie gemacht, weshalb fast jedes Vorhaben als Erfolg gilt.

**Schritt 3 – das Ergebnis vier Wochen lang gegenlesen.** Jede Ausgabe wird geprüft, bevor sie verwendet wird. Nach vier Wochen ist bekannt, wo das Werkzeug zuverlässig ist und wo nicht. Erst dann darf die Prüfung an den unkritischen Stellen entfallen.

Der dritte Schritt ist der, der übersprungen wird, und er ist der teuerste. Ein Modell, das in neun von zehn Fällen richtig liegt, erzeugt bei ungeprüfter Verwendung genau einen falschen Firmennamen im Angebot – und das kostet mehr, als die Zeitersparnis wert war.

## Was sich verändert hat und was nicht

Zwei Entwicklungen sind für den Vertriebsalltag tatsächlich relevant.

**Verändert hat sich die Kostenseite der Vorbereitung.** Eine gründliche Recherche pro Zielunternehmen war früher eine Entscheidung zwischen Menge und Qualität. Heute ist sie beides, und damit ist das häufigste Argument gegen recherchierte Ansprache – "dafür ist keine Zeit" – entfallen.

**Verändert hat sich die Erwartung auf der Empfängerseite.** Weil Personalisierung billig geworden ist, ist sie kein Unterscheidungsmerkmal mehr. Ein Anruf, der auf eine Stellenanzeige verweist, war vor drei Jahren bemerkenswert; heute ist er der Standard, gegen den verglichen wird. Der Unterschied entsteht nun eine Ebene tiefer: beim Verständnis dessen, was die recherchierte Information für das Zielunternehmen bedeutet.

**Nicht verändert hat sich, wer entscheidet.** Ein B2B-Kauf wird von Menschen getroffen, die ein Risiko tragen. Sie kaufen bei jemandem, dem sie zutrauen, das Problem zu verstehen. Kein Werkzeug erzeugt dieses Zutrauen; es kann nur die Zeit freiräumen, in der es entsteht.

## Wo Automatisierung ohne KI schon reicht

Ein erheblicher Teil dessen, was als KI-Projekt begonnen wird, ist eine gewöhnliche Automatisierung – und die ist billiger, zuverlässiger und sofort verfügbar:

- **Terminbuchung** mit Kalenderabgleich statt Terminfindung per Mail.
- **Erinnerung** vor jedem Termin, die die Ausfallquote messbar senkt.
- **Wiedervorlagen**, die automatisch fällig werden, statt handgeführter Listen.
- **Sperrliste** für Widersprüche, die jeder Listenimport respektiert.
- **Wöchentliches Kennzahlenblatt** ohne Handarbeit.

Der letzte Punkt entscheidet in der Praxis darüber, ob überhaupt gesteuert wird: Was jede Woche von Hand zusammengestellt werden muss, wird nach vier Wochen nicht mehr zusammengestellt.

## Die nüchterne Einordnung

KI verschiebt im B2B-Vertrieb nicht, **ob** verkauft wird, sondern wie viel Zeit für das Verkaufen übrig bleibt. Wer die Recherche vor dem Anruf von fünf auf eine Minute verkürzt, telefoniert bei gleicher Arbeitszeit deutlich mehr – und das ist die einzige Größe, die im Vertrieb wirklich steuerbar ist.

Was dagegen unverändert bleibt: die Liste, der Anlass, das Zuhören und die Nachfassdisziplin. Der Weg dorthin steht im [Leitfaden zur B2B-Kaltakquise](/blog/b2b-kaltakquise-leitfaden), und die Frage, welcher Kanal überhaupt zur eigenen Zielgruppengröße passt, im [Kanalvergleich](/blog/b2b-leadgenerierung-kanaele).

Was wir übernehmen – und an welchen Stellen wir dabei Werkzeuge einsetzen – steht unter [Leistungen](/leistungen), regional etwa für die [Vertriebsagentur München](/leistungen/muenchen).

## Quellen

- [§ 5 UWG – Irreführende geschäftliche Handlungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__5.html)
- [§ 7 UWG – Unzumutbare Belästigungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__7.html)
- [Art. 6 DSGVO – Rechtmäßigkeit der Verarbeitung](https://dsgvo-gesetz.de/art-6-dsgvo/)
- [Art. 14 DSGVO – Informationspflicht bei Daten aus Drittquellen](https://dsgvo-gesetz.de/art-14-dsgvo/)
  `.trim(),
}
