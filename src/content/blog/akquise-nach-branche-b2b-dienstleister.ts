import type { BlogPost } from '@/lib/blog-types'

// Neuer Beitrag vom 10.09.2026. Führt fünf kürzere zusammen:
// agentur-vertrieb-akquise, vertrieb-agenturen-kunden-gewinnen,
// beratung-consulting-vertrieb, maschinenbau-technischer-vertrieb,
// startup-vertrieb-bootstrap. Umleitungen in config/blog-redirects.js.
//
// Die fünf Vorgänger waren dasselbe Gerüst mit ausgetauschtem Branchennamen.
// Nebeneinander gestellt wird daraus etwas, das keiner einzeln leisten konnte:
// ein Vergleich, an dem ein Leser die eigene Lage wiedererkennt.
//
// TODO(Nico): Der Zykluslängen-Vergleich in der Tabelle beruht auf der
// Marktlogik der jeweiligen Branche, nicht auf gemessenen eigenen Werten.
// Sobald aus abgeschlossenen Projekten je Branche eine durchschnittliche
// Dauer vom Erstkontakt bis zum Auftrag vorliegt, gehört sie hier hinein.

export const akquiseNachBrancheB2bDienstleister: BlogPost = {
  slug: 'akquise-nach-branche-b2b-dienstleister',
  title: 'Akquise nach Branche: Agenturen, Beratungen, Maschinenbau, Startups',
  description:
    'Was sich in der B2B-Neukundengewinnung je Branche tatsächlich unterscheidet – Zielgruppe, Auslöser, Zykluslänge und der typische Engpass – für Agenturen, Unternehmensberatungen, technischen Vertrieb im Maschinenbau und Startups ohne Vertriebsbudget.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-05',
  updatedAt: '2026-09-10',
  category: 'Branchenspezifisch',
  tags: [
    'Agentur Neukundengewinnung',
    'Beratung Akquise',
    'Technischer Vertrieb',
    'Maschinenbau Vertrieb',
    'Startup Vertrieb',
    'B2B Dienstleister',
    'Branchenvertrieb',
    'Neukundengewinnung',
  ],
  featured: false,
  image: '/images/blog/agentur-vertrieb.webp',
  faqs: [
    {
      question: 'Warum tun sich Agenturen mit dem eigenen Vertrieb schwer?',
      answer:
        'Weil die Kapazität, die Akquise bräuchte, abrechenbar ist. Jede Stunde Eigenvertrieb ist eine nicht fakturierte Stunde – und im Auslastungshoch, wenn Zeit fehlt, unterbleibt sie. Drei Monate später fehlen die Anfragen. Das Ergebnis ist der bekannte Wellenverlauf, und er ist ein Kapazitätsproblem, kein Motivationsproblem.',
    },
    {
      question: 'Wie gewinnen Unternehmensberatungen neue Mandate?',
      answer:
        'Überwiegend über Empfehlung und persönliche Netzwerke, weil Vertrauen die eigentliche Kaufentscheidung trägt. Das funktioniert, bis das Netzwerk ausgeschöpft ist. Aktive Akquise wirkt in diesem Segment nur, wenn sie fachlich ansetzt – über eine konkrete Fragestellung statt über eine Leistungsvorstellung.',
    },
    {
      question: 'Was ist im technischen Vertrieb anders?',
      answer:
        'Die Zykluslänge und die Zahl der Beteiligten. Im Maschinen- und Anlagenbau vergehen zwischen Erstkontakt und Auftrag häufig zwölf Monate und mehr, und es entscheiden mehrere Rollen gemeinsam – Technik, Einkauf, Geschäftsführung. Erstkontakte zahlen deshalb erst im übernächsten Geschäftsjahr ein.',
    },
    {
      question: 'Wie akquiriert ein Startup ohne Vertriebsbudget?',
      answer:
        'Durch Gründerakquise mit dokumentierter Lernschleife. Die ersten fünfzig Gespräche gehören in die Hände der Gründer – nicht weil das günstiger ist, sondern weil dort das Produktverständnis entsteht. Erst wenn feststeht, welche Zielgruppe warum kauft, lohnt sich der Aufbau oder Einkauf von Vertriebskapazität.',
    },
  ],
  content: `
Die Behauptung, Vertrieb funktioniere in jeder Branche gleich, ist ungefähr so nützlich wie die Behauptung, er funktioniere überall anders. Beides stimmt teilweise.

Gleich ist das Handwerk: Liste, Anlass, Gespräch, Qualifizierung, Nachfassen. Unterschiedlich sind vier Größen – **wer entscheidet, was den Kauf auslöst, wie lange es dauert und wo der Engpass sitzt.** Dieser Beitrag stellt vier Branchen nebeneinander, in denen sich diese vier Größen deutlich unterscheiden.

## Die Übersicht

| | Agentur | Beratung | Maschinenbau | Startup |
|---|---|---|---|---|
| Entscheider | Marketingleitung oder GF | Geschäftsführung | Technik + Einkauf + GF | Fachbereich oder GF |
| Auslöser | Wechsel, Kampagne, Unzufriedenheit | konkrete Fragestellung, Veränderung | Investitionszyklus, Ausfall | akuter Schmerz |
| Zykluslänge | Wochen bis Monate | Monate | häufig über ein Jahr | Tage bis Wochen |
| Engpass | Kapazität für Eigenvertrieb | Skalierbarkeit von Vertrauen | Dauer bis zum Ertrag | fehlende Zielgruppenklarheit |
| Vertrauensträger | Arbeitsproben | Person und Referenz | Technik und Historie | Gründer |

## Agenturen: das Kapazitätsparadox

Der bekannteste Zyklus im Dienstleistungsgeschäft: Ein gutes Quartal füllt die Auslastung, die Akquise pausiert, drei Monate später fehlen die Anfragen. Dann wird akquiriert, es dauert wieder drei Monate – und die Welle beginnt von vorn.

Das wird regelmäßig als Disziplinproblem beschrieben. Es ist eines der Wirtschaftlichkeit: **Jede Stunde Eigenvertrieb ist eine Stunde, die nicht abgerechnet wird.** Im Auslastungshoch ist diese Stunde am teuersten – und genau dann wäre sie nötig, weil ihre Wirkung erst ein Quartal später eintritt.

Daraus folgen drei mögliche Antworten, und nur die letzte löst das Problem strukturell:

- **Akquise als feste Wochenzeit,** die auch in guten Wochen stattfindet. Wirksam, aber selten durchgehalten.
- **Empfehlungen systematisieren** – nach jedem Projekt aktiv fragen, statt zu hoffen. Günstig, aber begrenzt.
- **Den vorderen Teil auslagern,** damit die Akquisemenge nicht mehr mit der eigenen Auslastung schwankt.

Für die Ansprache gilt in diesem Segment eine Besonderheit: Marketingentscheider werden häufiger kalt angerufen als jede andere Rolle. Was hier trägt, ist ein Anlass, der zeigt, dass die Website des Zielunternehmens tatsächlich angesehen wurde – alles andere klingt nach der fünften Agentur in dieser Woche.

## Unternehmensberatungen: Vertrauen skaliert nicht

Beratungsleistungen werden über Personen gekauft, nicht über Leistungsbeschreibungen. Das erklärt, warum in diesem Segment fast alles über Empfehlung läuft – und warum das irgendwann an eine Grenze stößt: Ein persönliches Netzwerk ist endlich.

Aktive Akquise funktioniert hier, aber nur in einer Form: **fachlich statt vertrieblich.** Wer mit einer konkreten Fragestellung anruft, die im Zielunternehmen gerade ansteht, führt ein Fachgespräch. Wer mit einem Leistungsspektrum anruft, führt keines.

Zwei Hebel haben sich bewährt:

**Der Anlass aus der Veränderung.** Ein Führungswechsel, eine Übernahme, ein neuer Standort, eine regulatorische Anforderung – Beratung wird bei Veränderung gekauft, nicht im Normalbetrieb. Diese Ereignisse sind öffentlich recherchierbar.

**Die Vorleistung statt der Vorstellung.** Ein konkreter, brauchbarer Hinweis im Erstgespräch wirkt in diesem Segment stärker als jede Referenzliste – weil er die Arbeitsprobe ist, die sonst fehlt.

Die Zykluslänge bleibt: Zwischen Erstkontakt und Mandat vergehen häufig Monate. Wer nach vier Wochen Bilanz zieht, zieht sie zu früh. Wie man solche Vorgänge sauber offen hält, ohne die Pipeline zu verstopfen, steht im [Beitrag zur Vertriebssteuerung](/blog/vertriebssteuerung-kpis-pipeline).

## Maschinen- und Anlagenbau: das Geschäftsjahr als Taktgeber

Der technische Vertrieb ist der Gegenentwurf zu allem Schnellen. Drei Eigenheiten prägen ihn:

**Der Investitionszyklus bestimmt den Zeitpunkt.** Eine Maschine wird ersetzt, wenn sie ausfällt, wenn die Kapazität nicht mehr reicht oder wenn eine Vorschrift es verlangt. Dazwischen passiert nichts – unabhängig davon, wie gut das Angebot ist.

**Mehrere Rollen entscheiden gemeinsam.** Technik bewertet Eignung, Einkauf bewertet Konditionen, Geschäftsführung trägt das Risiko. Ein Ja der Technik ist kein Auftrag. Die Rollenverteilung beschreibt der [Beitrag zum Buying Center](/blog/bant-methode-erklaert).

**Der Erstkontakt zahlt spät ein.** Bei Zyklen über zwölf Monate ist die Akquise des laufenden Jahres eine Investition in das übernächste. Das hat eine unbequeme Konsequenz: Wer die Akquise in einem schwachen Jahr einstellt, um Kosten zu sparen, erzeugt eine Lücke, die er zwei Jahre später bezahlt – und dann nicht mehr aufholen kann.

Was in diesem Umfeld tatsächlich wirkt, ist deshalb weniger der Abschluss als die **Präsenz zum richtigen Zeitpunkt**: dokumentierte Wiedervorlagen entlang bekannter Investitionszyklen, gepflegt über Jahre.

## Startups: erst verstehen, dann skalieren

Der häufigste Fehler junger Unternehmen ist nicht zu wenig Vertrieb, sondern zu früh delegierter Vertrieb. Wer einen Vertriebsmitarbeiter einstellt, bevor feststeht, welche Zielgruppe warum kauft, bekommt zwei Probleme statt eines.

Die belastbare Reihenfolge lautet:

1. **Die Gründer führen die ersten fünfzig Gespräche selbst.** Nicht aus Kostengründen, sondern weil in diesen Gesprächen das Produktverständnis entsteht. Ein Vertriebsmitarbeiter kann diese Erkenntnisse nicht sammeln, weil er nicht weiß, was ungewöhnlich ist.
2. **Absagegründe dokumentieren, nicht nur Zusagen.** Die fünfzig Neins sagen mehr über den Markt als die fünf Jas.
3. **Erst wenn dasselbe Argument dreimal hintereinander gezogen hat,** lohnt sich der Aufbau oder Einkauf von Kapazität.

Für den Weg dorthin ist das Telefon der geeignetste Kanal, weil er als einziger innerhalb von Tagen antwortet – auch negativ. Der Kanalvergleich steht im [Beitrag zu den Kanälen der B2B-Leadgenerierung](/blog/b2b-leadgenerierung-kanaele).

## Der Vertrauensträger: was in jeder Branche die Kaufentscheidung trägt

Die vier Branchen unterscheiden sich am deutlichsten darin, **woran ein Käufer festmacht, ob er es riskiert.** Wer den falschen Vertrauensträger anbietet, argumentiert an der Entscheidung vorbei.

**Bei Agenturen ist es die Arbeitsprobe.** Ein Portfolio wirkt stärker als jede Referenzliste, weil der Käufer die Leistung selbst beurteilen kann. Eine Agentur, die im Erstgespräch keine vergleichbare Arbeit zeigt, verkauft schwerer – unabhängig davon, wie gut sie ist.

**Bei Beratungen ist es die Person.** Gekauft wird der Kopf, nicht das Haus. Deshalb funktioniert in diesem Segment persönliche Sichtbarkeit – Vorträge, Fachbeiträge, Netzwerk – besser als jede Unternehmensdarstellung, und deshalb ist die Übergabe an einen Kollegen die riskanteste Stelle im gesamten Prozess.

**Im Maschinenbau ist es die Historie.** Wie lange gibt es das Unternehmen, welche vergleichbaren Anlagen laufen wo, wie ist die Ersatzteilversorgung in zehn Jahren gesichert. Bei Investitionen mit langer Nutzungsdauer ist Bestandsfähigkeit ein Kaufkriterium, kein Nebenaspekt.

**Beim Startup sind es die Gründer.** Ein junges Unternehmen kann weder Historie noch Referenzmenge bieten. Was es bieten kann, ist die glaubwürdige Darstellung, dass es das Problem des Kunden genauer versteht als etablierte Anbieter – und das gelingt nur im direkten Gespräch mit den Gründern.

Die praktische Konsequenz gilt für alle vier: **Der Vertrauensträger gehört in den Erstkontakt, nicht ins Angebot.** Wer ihn bis zur schriftlichen Phase aufspart, hat die Entscheidung, ob überhaupt weitergesprochen wird, ohne sein stärkstes Argument geführt.

## Wenn die eigene Branche nicht dabei ist

Die vier Beispiele sind keine abschließende Liste. Wer die eigene Lage einordnen will, beantwortet vier Fragen – die Antworten bestimmen Kanal, Frequenz und Erwartung:

1. **Wie viele Unternehmen kommen realistisch als Kunde infrage?** Unter 200 heißt Einzelansprache, über 2.000 heißt System. Der [Kanalvergleich](/blog/b2b-leadgenerierung-kanaele) leitet daraus die Kanalwahl ab.
2. **Was löst den Kauf aus, und ist dieser Auslöser von außen erkennbar?** Wenn ja, ist die Recherche der wichtigste Teil der Arbeit. Wenn nein, entscheidet die Frequenz – man muss präsent sein, wenn es passiert.
3. **Wie lange dauert es vom Erstkontakt bis zum Auftrag?** Diese Zahl bestimmt, wann eine Kampagne bewertet werden darf. Wer bei einem Zyklus von neun Monaten nach acht Wochen abbricht, hat nur die Kosten gesehen.
4. **Wer entscheidet mit?** Je mehr Rollen, desto wichtiger die schriftliche Nachvollziehbarkeit – weil das Angebot ohne den Verfasser weitergereicht wird.

Wer diese vier Antworten hat, braucht keinen Branchenartikel mehr.

## Was in allen vier Branchen gleich bleibt

Bei aller Unterschiedlichkeit sind es vier Dinge, die überall über das Ergebnis entscheiden:

**Die Liste.** Wer angerufen wird, entscheidet mehr als das, was gesagt wird – und trägt zugleich die mutmaßliche Einwilligung nach [§ 7 UWG](https://www.gesetze-im-internet.de/uwg_2004/__7.html), die das Gespräch überhaupt zulässig macht.

**Der Anlass.** In jeder der vier Branchen ist es derselbe Unterschied: Wer sagen kann, warum ausgerechnet dieses Unternehmen angerufen wird, führt ein Gespräch. Wer es nicht kann, führt ein Standardgespräch.

**Die Regelmäßigkeit.** Der Wellenverlauf, der bei Agenturen am deutlichsten sichtbar ist, existiert überall. Die einzige Gegenmaßnahme ist eine Aktivitätszahl, die auch in guten Wochen gilt.

**Das Nachfassen.** Je länger der Zyklus, desto größer der Anteil der Abschlüsse, die aus Wiedervorlagen stammen. Im Maschinenbau ist es die Mehrheit.

Welche dieser vier Stellen bei uns wie abgedeckt wird, steht unter [Leistungen](/leistungen). Für zwei Branchen gibt es eigene Seiten: [Personaldienstleister](/branchen/personaldienstleister) und [IT-Systemhäuser](/branchen/it-systemhaeuser). Regional etwa [Vertriebsagentur Hamburg](/leistungen/hamburg) und [Kaltakquise Frankfurt](/kaltakquise/frankfurt).

## Quellen

- [§ 7 UWG – Unzumutbare Belästigungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__7.html)
- [Statistisches Unternehmensregister, Statistisches Bundesamt](https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/Unternehmensregister/_inhalt.html)
  `.trim(),
}
