import type { BlogPost } from '@/lib/blog-types'

// Bleibt eigenständig. Der Beitrag ist der Fachunterbau für die Branchenseite
// /branchen/personaldienstleister und zugleich die Stelle, an der Nicos
// Recruiting-Hintergrund fachlich trägt – das ist der glaubwürdigste
// Aufhänger, den die Marke hat (siehe AP-8 des Auftrags "Sichtbarkeit").
//
// TODO(Nico): Der Abschnitt "Die ersten 90 Tage" ist methodisch hergeleitet.
// Wenn du aus deiner Recruiting-Zeit konkrete Erfahrungswerte hast – wie
// lange es bis zum ersten selbst erarbeiteten Termin gedauert hat, woran
// Einstellungen gescheitert sind --, gehören sie hierher. Das ist der Teil,
// den weder triveo noch SharkByte schreiben können.

export const vertriebsteamAufbauenRecruiting: BlogPost = {
  slug: 'vertriebsteam-aufbauen-recruiting',
  title: 'Vertriebsteam aufbauen: einstellen, auslagern oder beides',
  description:
    'Wann sich die erste Vertriebsstelle rechnet, wie man sie besetzt, ohne auf Selbstdarstellung hereinzufallen, was die ersten 90 Tage entscheiden – und in welchen Fällen eine externe Lösung die ehrlichere Antwort ist.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2025-12-30',
  updatedAt: '2026-09-10',
  category: 'Strategie',
  tags: [
    'Vertriebsteam aufbauen',
    'Vertrieb Recruiting',
    'SDR einstellen',
    'Vertriebsmitarbeiter',
    'Onboarding Vertrieb',
    'Vertriebsorganisation',
    'Personalauswahl',
    'Vertriebsoutsourcing',
  ],
  featured: false,
  image: '/images/blog/vertriebsteam-aufbauen.webp',
  faqs: [
    {
      question: 'Ab wann lohnt sich die erste Vertriebsstelle?',
      answer:
        'Wenn die aus dem Umsatzziel abgeleitete wöchentliche Aktivitätszahl dauerhaft über der verfügbaren Zeit liegt und der Deckungsbeitrag die Vollkosten der Stelle über mindestens zwölf Monate trägt. Entscheidend ist die Dauerhaftigkeit: Eine Stelle, die nur in Hochphasen ausgelastet wäre, ist teurer als eingekaufte Kapazität.',
    },
    {
      question: 'Was kostet ein Vertriebsmitarbeiter wirklich?',
      answer:
        'Deutlich mehr als das Bruttogehalt. Hinzu kommen der Arbeitgeberanteil zur Sozialversicherung, Arbeitsplatz, Telefonie und CRM-Lizenz, mehrere Monate Einarbeitung ohne eigene Ergebnisse, Führungszeit der Geschäftsführung sowie Urlaub, Krankheit und das Risiko einer Neubesetzung. Die Vollkosten sind die einzige Grundlage, auf der sich ein Vergleich mit einer externen Lösung rechnen lässt.',
    },
    {
      question: 'Worauf achtet man bei der Auswahl eines SDR?',
      answer:
        'Auf drei nachprüfbare Dinge statt auf Selbstdarstellung: eine Arbeitsprobe am Telefon im Auswahlverfahren, die Fähigkeit, aus einer Absage eine Information zu machen, und Belastbarkeit gegenüber Wiederholung. Verkaufstalent im Vorstellungsgespräch sagt wenig aus – ein Bewerbungsgespräch ist ein Warmkontakt, Kaltakquise ist das Gegenteil.',
    },
    {
      question: 'Ist es sinnvoll, intern und extern zu kombinieren?',
      answer:
        'Häufig ja. Die verbreitetste Aufteilung trennt nach Prozessschritt: Listenaufbau, Erstansprache und Terminvereinbarung extern, Verkaufsgespräch und Abschluss intern. So bleibt das Produktwissen im Haus, während die Akquisemenge nicht mehr mit der eigenen Auslastung schwankt.',
    },
  ],
  content: `
Die Frage "Sollen wir jemanden für den Vertrieb einstellen?" wird meistens zu spät und auf falscher Grundlage gestellt: dann, wenn der Umsatz einbricht, und mit dem Bruttogehalt als Rechengröße. Beides führt zu teuren Fehlentscheidungen.

Dieser Beitrag behandelt die drei Entscheidungen, aus denen der Aufbau eines Vertriebs tatsächlich besteht: ob, wen und wie – und wann keine davon die richtige Antwort ist.

## Die Rechnung vor der Entscheidung

Bevor über Personen gesprochen wird, gehören zwei Zahlen auf den Tisch.

**Erstens: die abgeleitete Wochenaktivität.** Aus dem Umsatzziel lässt sich rückwärts berechnen, wie viele Erstkontakte pro Woche nötig sind – über Auftragswert, Abschlussquote, Terminquote und Kontaktquote. Der Rechenweg steht im [Beitrag zur Vertriebssteuerung](/blog/vertriebssteuerung-kpis-pipeline).

Diese Zahl beantwortet die Frage, ob überhaupt ein Kapazitätsproblem vorliegt. Häufig zeigt sich: Nicht die Menge fehlt, sondern die Regelmäßigkeit.

**Zweitens: die Vollkosten der Stelle.** Nicht das Bruttogehalt, sondern:

| Position | Anmerkung |
|---|---|
| Bruttogehalt inklusive variabler Anteile | Ausgangsgröße |
| Arbeitgeberanteil Sozialversicherung | rund ein Fünftel, gesetzlich |
| Arbeitsplatz, Telefonie, CRM-Lizenz | ab Tag 1, unabhängig von Ergebnissen |
| Einarbeitung | mehrere Monate ohne eigene Termine |
| Führungszeit | Zeit der Geschäftsführung, die sonst verkauft |
| Urlaub, Krankheit | Akquise pausiert vollständig |
| Risiko der Neubesetzung | Fluktuation im Innendienst ist hoch |

Erst wenn diese Summe über zwölf Monate vom erwarteten Deckungsbeitrag getragen wird, ist die Stelle wirtschaftlich. Der Vergleich mit einer externen Lösung steht im [Beitrag zu den Kosten von Vertriebsoutsourcing](/blog/vertrieb-auslagern-kosten-vorteile).

## Welche Rolle eigentlich gesucht wird

Ein verbreiteter Fehler ist, "einen Vertriebler" zu suchen. Der Begriff umfasst mindestens drei Rollen mit unterschiedlichen Anforderungen – und Menschen, die alle drei können, sind selten und teuer.

**Sales Development (SDR).** Liste, Erstansprache, Qualifizierung, Terminvereinbarung. Braucht Ausdauer, Frustrationstoleranz und Struktur. Braucht **kein** tiefes Produktwissen.

**Account Executive.** Führt das Verkaufsgespräch, erstellt das Angebot, verhandelt, schließt ab. Braucht Produktwissen, Verhandlungssicherheit und Entscheidungsbefugnis.

**Account Management.** Betreut Bestandskunden, erweitert Aufträge. Braucht Verlässlichkeit und Fachnähe.

Für die meisten B2B-Dienstleister mit fünf bis fünfzig Mitarbeitern sitzt der Engpass bei der ersten Rolle – es fehlen Gespräche, nicht Abschlussfähigkeit. Der Abschluss liegt ohnehin bei der Geschäftsführung, und das ist meistens richtig so.

Daraus folgt eine unbequeme Erkenntnis: **Die erste Vertriebsstelle sollte fast nie ein Allrounder sein.** Ein Allrounder verlagert seine Zeit erfahrungsgemäß in den angenehmeren Teil – Bestandskunden und warme Kontakte --, und die Kaltakquise, für die er eingestellt wurde, findet nicht statt.

## Auswahl: was sich prüfen lässt und was nicht

Ein Bewerbungsgespräch ist ein Warmkontakt: Beide Seiten wollen, dass es gut läuft. Kaltakquise ist strukturell das Gegenteil. Deshalb sagt souveränes Auftreten im Vorstellungsgespräch über die Eignung wenig aus.

Drei Dinge lassen sich dagegen tatsächlich prüfen:

**Die Arbeitsprobe am Telefon.** Ein echter Anruf im Auswahlverfahren, mit fünfzehn Minuten Vorbereitung und einer realen Liste. Der Unterschied zwischen Bewerbern zeigt sich hier in Minuten – und in einer Dimension, die kein Lebenslauf abbildet.

**Der Umgang mit der Absage.** Die aufschlussreichste Frage im Gespräch lautet: "Erzählen Sie mir von einem Kunden, der abgesagt hat, und was Sie daraus gelernt haben." Wer die Schuld beim Kunden, beim Produkt oder beim Preis abliefert, wird dasselbe im Job tun. Wer eine konkrete Erkenntnis nennt, hat die Fähigkeit, die den Unterschied macht.

**Die Haltung zur Wiederholung.** Kaltakquise ist über weite Strecken dieselbe Tätigkeit. Die Frage, welcher Teil der Arbeit langweilig war und wie damit umgegangen wurde, trennt zuverlässiger als jede Selbsteinschätzung.

Was sich **nicht** prüfen lässt: Motivation aus einer Formulierung, Ehrgeiz aus einem Anschreiben und Belastbarkeit aus einer Behauptung.

## Die ersten 90 Tage entscheiden

Die meisten Fehlbesetzungen im Vertriebsinnendienst sind keine Auswahlfehler, sondern Einarbeitungsfehler. Ein Ablauf, der sich bewährt hat:

**Woche 1-2 – Zuhören.** Bestehende Gespräche mithören, Angebote lesen, mit Bestandskunden sprechen. Kein eigener Anruf. Wer in Woche 1 telefoniert, wiederholt Formulierungen, die er nicht versteht.

**Woche 3-4 – Begleitet telefonieren.** Eigene Gespräche mit direkter Rückmeldung danach. Zahlenziele sind hier schädlich: Sie erzeugen Menge statt Qualität, und die Qualität muss zuerst sitzen.

**Woche 5-8 – Eigenständig, mit Wochenrückblick.** Erste eigene Termine, gemeinsame Auswertung der Absagegründe. Ab hier gelten Aktivitätsziele, aber noch keine Ergebnisziele.

**Woche 9-13 – Ergebnisverantwortung.** Jetzt zählt die Terminzahl. Vorher zu messen bestraft die Lernphase.

Zwei Dinge gehören ab Tag 1 dazu, weil sie sich später nicht nachrüsten lassen: die Dokumentationsdisziplin – jeder Kontakt mit nächstem Schritt und Datum – und der rechtliche Rahmen. Dass B2B-Telefonakquise nach [§ 7 Abs. 2 Nr. 1 UWG](https://www.gesetze-im-internet.de/uwg_2004/__7.html) nur bei mutmaßlicher Einwilligung zulässig ist, dass Werbe-E-Mails ohne Einwilligung es nicht sind und dass ein Widerspruch sofort und dauerhaft zu sperren ist, gehört in die erste Woche. Details im [Beitrag zu den rechtlichen Grundlagen](/blog/kaltakquise-rechtliche-grundlagen).

## Vergütung: was der variable Anteil tatsächlich steuert

Die Standardannahme lautet, ein hoher variabler Anteil erzeuge Leistung. Für die Rolle, um die es hier meistens geht – Erstkontakt und Terminvereinbarung --, stimmt das nur eingeschränkt, und zwar aus einem strukturellen Grund: **Ein SDR beeinflusst den Abschluss nicht.**

Wer die Vergütung an den Auftrag koppelt, koppelt sie an eine Größe, über die eine andere Person entscheidet. Die vorhersehbare Reaktion ist nicht mehr Anstrengung, sondern Verschiebung: Der SDR bevorzugt Kontakte, die schnell abschließen, und vernachlässigt die, die einen längeren Zyklus haben – also häufig die größeren.

Brauchbarer ist eine Kopplung an das, was tatsächlich in der Hand der Rolle liegt:

| Bezugsgröße | Steuert | Nebenwirkung |
|---|---|---|
| Wählversuche | Aktivität | erzeugt Menge ohne Qualität |
| Vereinbarte Termine | Terminmenge | verleitet zu weicher Qualifizierung |
| **Stattgefundene Termine** | Terminqualität | keine nennenswerte |
| Abschlüsse | nichts, was der SDR steuert | Verschiebung zu kurzen Zyklen |

Die dritte Zeile ist der brauchbarste Bezugspunkt, weil sie Menge und Qualität gleichzeitig belohnt: Ein Termin, der nicht stattfindet, zählt nicht. Dieselbe Logik gilt übrigens für externe Dienstleister – weshalb die Wahrnehmungsquote in der [Checkliste zur Agenturauswahl](/blog/vertriebsagentur-finden-checkliste) die zentrale Kennzahl ist.

Zur Höhe: Ein Fixanteil, der die Lebenshaltung trägt, ist im Innendienst keine Schwäche, sondern Voraussetzung. Wer existenziell vom variablen Anteil abhängt, telefoniert unter Druck – und Druck ist am Telefon hörbar.

## Woran Vertriebseinstellungen scheitern

Vier Muster, die sich wiederholen:

**Zu früh.** Die Zielgruppe ist nicht geklärt, das Angebot nicht validiert. Ein Vertriebsmitarbeiter kann keine Positionierung ersetzen – er verstärkt, was da ist.

**Ohne Führung.** Vertrieb ist die Funktion mit der kürzesten Rückkopplung zwischen Verhalten und Ergebnis und braucht deshalb wöchentliche Auswertung. Wer einstellt und nach drei Monaten nach Zahlen fragt, bekommt Ausreden statt Erkenntnisse.

**Ohne Liste.** Wer einem neuen Mitarbeiter die Zielgruppenrecherche gleich mitüberträgt, verliert zwei Monate. Die Liste ist eine strategische Entscheidung der Geschäftsführung, keine Einstiegsaufgabe.

**Ohne Übergabe.** Der SDR vereinbart Termine, die niemand wahrnimmt, weil die Geschäftsführung ausgelastet ist. Das demotiviert schneller als jede Absage.

## Wann die externe Lösung die ehrlichere Antwort ist

Drei Konstellationen, in denen Einstellen die teurere Entscheidung ist:

**Der Bedarf schwankt.** Wenn die abgeleitete Wochenaktivität in guten Monaten bei einer halben Stelle liegt und in schwachen bei einer ganzen, wird eine Vollzeitstelle einen erheblichen Teil des Jahres nicht ausgelastet – und Leerlauf ist die teuerste Form von Vertriebskapazität.

**Es fehlt Führungskapazität.** Ohne wöchentliche Auswertung wird aus einer Einstellung keine Leistung. Wer diese Zeit nicht hat, kauft besser eine Leistung ein als eine Person.

**Es ist unklar, ob die Zielgruppe trägt.** Ein Pilotprojekt beantwortet in acht Wochen, was eine Einstellung erst nach einem halben Jahr beantwortet – und kostet dabei weniger.

Umgekehrt gilt: Wer dauerhafte Vollauslastung hat, Führungszeit einplanen kann und das Vertriebswissen strategisch im Haus halten will, sollte einstellen. Die Kombination – Erstkontakt extern, Abschluss intern – ist für viele der wirtschaftlichste Mittelweg.

Für Personaldienstleister, die diese Abwägung beruflich für andere treffen und im eigenen Vertrieb vor derselben Frage stehen, gibt es eine eigene [Branchenseite](/branchen/personaldienstleister). Was wir übernehmen, steht unter [Leistungen](/leistungen), regional etwa für die [Vertriebsagentur Köln](/leistungen/koeln).

## Quellen

- [§ 7 UWG – Unzumutbare Belästigungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__7.html)
- [Gesetz zur Regelung der Arbeitnehmerüberlassung (AÜG), gesetze-im-internet.de](https://www.gesetze-im-internet.de/a_g/)
- [Statistisches Unternehmensregister, Statistisches Bundesamt](https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/Unternehmensregister/_inhalt.html)
  `.trim(),
}
