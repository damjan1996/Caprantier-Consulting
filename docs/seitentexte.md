# Textleitfaden — wie die Seiten sprechen

**Stand:** 16.09.2026
**Referenzumsetzung:** `src/app/page.tsx`, `src/app/components/home/`, `src/lib/home-content.ts`
**Gilt für:** alle neuen Seiten und jeden Umbau bestehender Seiten

Schwesterdokumente: [seitendesign.md](seitendesign.md) (wie es aussieht),
[seitenbaukasten.md](seitenbaukasten.md) (wie es gebaut wird).

Alle Beispiele in diesem Dokument stehen so auf der Startseite. Sie sind keine
Muster zum Abschreiben, sondern Belege für die Regel darüber.

---

## 1 · Die Haltung

**Die Seite gewinnt, indem sie absagt.**

Das ist keine Koketterie, sondern der tragende Zug: Ein Abschnitt heißt „Für
wen wir arbeiten – und für wen nicht", vier Punkte darin sind Ausschlüsse, und
der Selbsttest darunter kann mit „Ehrlich: eher kein Fit." enden. Wer sich
wiedererkennt, bucht kein Gespräch, das ohnehin zu nichts führt — und wer sich
im anderen Teil wiedererkennt, weiß, dass die Zusage etwas bedeutet.

Alles andere folgt daraus:

| Regel | Statt |
|---|---|
| **Sie-Form, und der Kunde ist das Subjekt.** „Die ersten Termine stehen in **Ihrem** Kalender." | „Wir generieren Leads." |
| **Eine Zahl schlägt jedes Adjektiv.** „3–8 Termine pro Woche", „weniger als 90 Minuten Ihrer Zeit" | „zahlreiche", „minimaler Aufwand" |
| **Den Einwand zuerst nennen, dann beantworten.** „Kein Call-Center. Ihr externer Vertrieb – mit einem Gesicht." | den Einwand hoffen zu überhören |
| **Sagen, was es kostet — auch an Zeit und Geduld.** „Setup braucht rund 14 Tage, planbare Zahlen drei Monate. Wer das nicht mitgeht, wird enttäuscht." | „schnelle Erfolge" |
| **Kein Superlativ, kein Ausrufezeichen.** Auf der ganzen Startseite steht **kein einziges** Ausrufezeichen. | „der beste", „einzigartig", „revolutionär!" |
| **Eine Zusage bekommt ihre Gegenprobe.** „Absagegründe stehen im Wortlaut im Bericht." – *Gebrochen, wenn:* „Im Bericht steht „kein Bedarf" statt des Satzes, den der Angerufene gesagt hat." | eine Zusage, die sich nicht widerlegen lässt |

Ein Satz, der auf jeder Vertriebsseite stehen könnte, hat auf dieser nichts
verloren. Prüffrage: **Könnte der Wettbewerber denselben Satz unverändert
übernehmen?** Dann ist er austauschbar und wird gestrichen oder mit einer Zahl
gefüllt.

---

## 2 · Der Bauplan eines Abschnitts

Jeder tragende Abschnitt besteht aus fünf Teilen in fester Reihenfolge. Die
Längen sind an der Startseite gemessen, nicht geschätzt.

| Teil | Rolle | Länge (gemessen) | Beispiel |
|---|---|---|---|
| **Etikett** | Wo bin ich? | 8–40 Zeichen, Mitte 17 | `Der Prozess` |
| **Überschrift** | Die eine Aussage | 49–79 Zeichen, Mitte 60 | `Vier Schritte. Weniger als 90 Minuten Ihrer Zeit.` |
| **Vorspann** | Löst die Überschrift ein | 108–180 Zeichen, 1–2 Sätze | `Zwei Gespräche mit Ihnen, dann übernehmen wir. Die ersten qualifizierten Termine stehen in der Regel innerhalb von 14 Tagen in Ihrem Kalender.` |
| **Inhalt** | Die Einträge | Titel 8–61, Absatz 100–225 Zeichen | die vier Prozesskarten |
| **Aufruf** | Der nächste Schritt | Knopf ≤ 25 Zeichen | `Schritt 1 starten` + `15 Min.` |

Der Aufruf gehört **in** den Abschnitt, nicht dahinter. Auf der Startseite
standen Aufrufe dreimal unterhalb der Bühne und lasen sich wie ein fremdes
Element zwischen zwei Abschnitten: Wenn der Knopf ins Bild kam, war der Inhalt,
auf den er sich bezog, längst weggescrollt.

> **Die eine Ausnahme:** Der Selbsttest unter „Passt das?" steht weiterhin
> hinter der Bühne. Er ist kein Aufruf, sondern ein eigener kleiner Vorgang mit
> drei Fragen — der braucht Platz und darf den Leser anhalten. Ein Knopf darf
> das nicht.

---

## 3 · Überschriften

Drei Muster, alle auf der Startseite belegt:

**A · Verneinung, dann Einlösung.** Nimmt dem Leser den Einwand aus der Hand.

> Kein Skript, kein Druck. Drei Schritte, bis ein Termin wirklich ein Termin ist.
> Kein Call-Center. Ihr externer Vertrieb – mit einem Gesicht.
> Wir passen nicht zu jedem. Das sagen wir Ihnen nach 15 Minuten.

**B · Zahl im Satz.** Die Zahl ist das Versprechen, nicht die Zierde.

> Vier Schritte. Weniger als 90 Minuten Ihrer Zeit.
> In 15 Minuten wissen Sie, ob wir Ihren Kalender füllen können.
> Wöchentlich 3–8 Termine mit Entscheidern aus Ihrer Zielgruppe

**C · Konsequenz statt Merkmal.** Beschreibt, was passiert — nicht, was man tut.

> Wer Akquise dem Zufall überlässt, merkt es erst, wenn die Pipeline leer ist.
> Das erreichen unsere Kunden in den ersten Wochen.
> Was Entscheider uns vor dem ersten Gespräch fragen.

Formale Regeln:

- **Ein ganzer Satz mit Punkt**, kein Nominalstil. Nicht „Unser Prozess im
  Überblick", sondern „Vier Schritte. Weniger als 90 Minuten Ihrer Zeit."
- **Zwei kurze Sätze schlagen einen langen.** Der erste setzt, der zweite löst
  ein.
- **Höchstens 79 Zeichen** — so lang ist die längste Überschrift der
  Startseite. Die Spalte ist auf `20ch` begrenzt, eine Überschrift läuft dort
  über drei bis vier Zeilen; jedes Zeichen darüber geht auf eine fünfte, die
  dann meist aus zwei Wörtern besteht.
- **Keine Frage als Überschrift**, außer im FAQ — dort ist die Frage der
  Inhalt.

Das Etikett darüber benennt den Abschnitt sachlich (`Das Problem`,
`Referenzen`, `Häufige Fragen`) und **wiederholt die Überschrift nicht**. Es
darf spröde sein; es ist eine Ortsangabe, kein Werbetext.

---

## 4 · Vorspann

Ein bis zwei Sätze, die die Überschrift belegen — nicht umformulieren.

> **Überschrift:** Wir passen nicht zu jedem. Das sagen wir Ihnen nach 15 Minuten.
> **Vorspann:** Wir nehmen maximal fünf Kunden pro Monat auf. Deshalb prüfen wir
> vorher genau – auf beiden Seiten. Das spart Ihnen Geld und uns Gespräche, die
> nirgendwo hinführen.

Die Überschrift behauptet, der Vorspann nennt den Grund („maximal fünf Kunden
pro Monat") und den Nutzen für beide Seiten. Ein Vorspann, der die Überschrift
nur noch einmal sagt, wird gestrichen — dann trägt die Überschrift allein.

---

## 5 · Kleintext

| Sorte | Regel | Beispiele |
|---|---|---|
| **Schaltfläche** | Verb + Objekt, ≤ 25 Zeichen, nie „Hier klicken" | `Erstgespräch buchen`, `Schritt 1 starten`, `Frage im Gespräch klären`, `15 Minuten mit Nico` |
| **Aufklapp-Zeile** | trägt den Inhalt, nicht den Aufruf — die 25 Zeichen gelten hier **nicht** | `Ist Kaltakquise per Telefon in Düsseldorf erlaubt?` |
| **Hinweis in der Schaltfläche** | die Zeitangabe, sonst nichts | `15 Min.` |
| **Begleittext daneben** | nimmt die Hürde | `Kostenlos, direkt mit dem Gründer` |
| **Merkmalszeile** | drei Punkte, mit Trennpunkten | `Unverbindlich · Nur 5 Kunden pro Monat · Erste Termine in 14 Tagen` |
| **Fußnote am Schaubild** | sagt, was es *nicht* ist | `Beispielhafte Woche, keine echten Kundendaten` |
| **Gegenprobe** | der beobachtbare Fall, in dem eine Zusage gebrochen ist — ein ganzer Satz, die 25 Zeichen gelten hier **nicht** | `Ein Zielkunde fragt Sie, wer denn diese Agentur gewesen sei, die da angerufen hat.` |
| **Antwortzeit** | steht an jedem Weg, über den man uns erreicht, und ist eine Zusage — also nachprüfbar und ohne Verstärker | `Antwort in einem Werktag`, `Sofort buchbar`, `Montag bis Freitag, 9–18 Uhr` |

Der Aufruf heißt auf jeder Seite **„Erstgespräch buchen"**, wenn er der
Hauptaufruf ist. Abwandlungen („Schritt 1 starten", „Frage im Gespräch klären")
gibt es nur dort, wo der Abschnitt einen eigenen Anlass liefert — und sie
führen zum selben Ziel.

---

## 6 · Zahlen

### 6.1 Die Zahlen der Seite

| Zahl | Bedeutung | Quelle im Code |
|---|---|---|
| **3–8** | qualifizierte Termine pro Woche | `homeFaqs`, Einstiegsüberschrift, Prozesszähler |
| **14 Tage** | bis zum ersten Termin | `PROOF` im Einstieg, Prozess, Abschluss |
| **15 Minuten** | Dauer des Erstgesprächs | überall am Aufruf |
| **5 Kunden** | Aufnahme pro Monat | Merkmalszeile, „Passt das?", FAQ |
| **90 Minuten** | Gesamtaufwand über den ganzen Prozess | Prozessüberschrift |
| **3 Monate** | empfohlene Zusammenarbeit | Prozess, FAQ |
| **10.000 €** | Mindest-Kundenwert | „Passt das?", FAQ |
| **87 % / 35 %** | Entscheider-Quote / Abschlussquote | `PROOF` im Einstieg |

### 6.2 Die Regeln dazu

1. **Eine Zahl, eine Quelle.** Sie steht in `src/lib/home-content.ts` oder als
   Konstante im Abschnitt und wird von dort verwendet — nicht abgetippt. Zwei
   Textstände laufen beim ersten Umformulieren auseinander, und es fällt
   niemandem auf, der die Seite ansieht.
2. **Dieselbe Zahl heißt überall gleich.** „3–8" bleibt „3–8", nicht einmal
   „bis zu 8" und einmal „durchschnittlich 5".
3. **Eine Spanne ist ehrlicher als ein Mittelwert** und wird deshalb bevorzugt.
4. **Kein Firmenname neben einer Zahl ohne schriftliche Freigabe.** Das ist
   eine irreführende geschäftliche Handlung (§ 5 UWG); an genau diesem Punkt
   ist die frühere Fallstudienseite gescheitert. Deshalb steht in „Ergebnisse"
   Branche über Region statt eines Namens, und die Zahl darunter:

   > Kunde
   > **Maschinenbau**
   > Mittelstand · Nordrhein-Westfalen
   > ERGEBNIS
   > 14 qualifizierte Entscheider-Termine in 8 Wochen

   Sobald Zahl **und** Freigabe vorliegen, gehören sie in
   `src/lib/case-studies.ts` und von dort in die Seite.
5. **Keine Preise ohne Freigabe.** `scripts/check-pricing.mjs` prüft das bei
   jedem `check:all`. Die Seite sagt stattdessen, wie der Preis zustande kommt:
   „Im Erstgespräch nennen wir Ihnen nach kurzer Analyse eine transparente
   Hausnummer."
6. **Kein Bewertungs-Markup ohne echte, sichtbare, freigegebene Stimmen.**
   `aggregateRating` ist in `scripts/check-compliance.mjs` gesperrt.

---

## 7 · Recht im Text

Diese Punkte sind entschieden und gelten unverändert für jede weitere Seite.
Ausführlich im [Baukasten § 8.1](seitenbaukasten.md).

### 7.1 Kaltakquise

Wenn eine Seite die Zulässigkeit anspricht, dann in dieser Form — sie steht
wörtlich in `homeFaqs` und ist die einzige freigegebene Fassung:

> Ja – unter klaren Bedingungen. Gegenüber Unternehmen ist ein Anruf ohne
> vorherige Einwilligung zulässig, wenn eine sogenannte mutmaßliche Einwilligung
> vorliegt […] (§ 7 Abs. 2 Nr. 1 UWG). […] Datenschutzrechtlich stützen wir uns
> auf das berechtigte Interesse (Art. 6 Abs. 1 lit. f DSGVO) […] Privatpersonen
> rufen wir grundsätzlich nicht an.

Dazu **immer** der Hinweis darunter:

> Allgemeine Einordnung, keine Rechtsberatung. Die ausführliche Fassung mit
> Quellen steht im Beitrag zu den rechtlichen Grundlagen.

Nie ohne Paragraphen, nie verkürzt auf „Kaltakquise ist im B2B erlaubt".

### 7.2 Weitere Pflichten im Text

| Thema | Regel |
|---|---|
| KI-Bilder | sichtbare Kennzeichnung (Art. 50 Abs. 4 KI-VO) — auch im `alt`-Text: „(KI-generiertes Bild)" |
| Anschrift, Telefon, Name | **nur** aus `src/lib/local-seo.ts` (`businessInfo`). Abgetippte Adressen erzeugen eine zweite Quelle — es waren schon zwei verschiedene Postleitzahlen im Umlauf |
| Impressum | § 5 DDG, nicht § 5 TMG |
| Streitbeilegung | kein Link auf die EU-OS-Plattform, sie ist seit 20.07.2025 abgeschaltet |

### 7.3 Gesperrte Suchbegriffe

`scripts/check-forbidden-targets.mjs` sperrt Wortkombinationen, die eine Seite
auf die falsche Absicht ausrichten oder in den Privatkundenbereich führen —
etwa `Terminvereinbarung Anlagenbau` (Google löst das als Bauzeitenplanung
auf) oder `Wärmepumpe` (der Markt ist Einfamilienhaus, Anrufe gingen an
Privathaushalte). Vor jeder neuen Landingpage: **Titel und H1 gegen die Liste
prüfen**, die Datei nennt zu jedem Eintrag den Grund und meist eine
Alternative.

---

## 8 · Texte, die zweimal ausgeliefert werden

Alles, was auch als JSON-LD erscheint — FAQ-Antworten, Prozessschritte — steht
in `src/lib/home-content.ts` und wird von der Komponente **und** von
`src/lib/schemas.ts` gelesen. Nie zweimal geschrieben.

Für Abschnitte auf einer Klebe-Bühne kommt eines dazu: Die nicht sichtbaren
Einträge liegen auf `opacity: 0`, **nicht** auf `display: none`. Sie stehen
damit vollständig im ausgelieferten HTML, sind über die Seitensuche des
Browsers auffindbar und decken sich mit dem Markup. Beim FAQ-Abschnitt ist das
nachgeprüft: neun Fragen im Markup, neun Fragen und neun Antworten im
Seitentext.

---

## 9 · Schreibweisen

Gemessen am ausgelieferten Text der Startseite:

| Zeichen | Verwendung | Vorkommen |
|---|---|---|
| `–` Halbgeviertstrich mit Leerzeichen | der Gedankenstrich des Hauses | 54 × |
| `—` Geviertstrich | **Ausnahme**, siehe unten | 4 × |
| `„ "` deutsche Anführungszeichen | Zitate und ironische Anführung | 6 × |
| `U+00A0` geschütztes Leerzeichen | vor `€`, `%`, in `3–8`, `< 14 Tage` | 9 × |
| `!` | kommt nicht vor | 0 × |

> **Zur Uneinheitlichkeit:** Vier Stellen verwenden den Geviertstrich (`—`) —
> der Vorspann von „Ergebnisse", zwei Referenzkarten und die Chat-Bestätigung.
> Das ist gewachsen, nicht gewollt. **Neuer Text nimmt den Halbgeviertstrich.**

Weiter:

- **Zahlen bis zwölf im Fließtext ausschreiben**, außer sie sind das
  Versprechen: „drei Monate", aber „3–8 Termine", „15 Min.".
- **Umlaute und ß in jedem sichtbaren Text.** In Codekommentaren ist beides
  gemischt; das ist Bestand, kein Vorbild.
- **Abkürzungen ausschreiben**, außer den etablierten: B2B, CRM, SaaS, IT, KI.

### 9.1 Anglizismen

Erlaubt, weil die Zielgruppe sie selbst benutzt: *B2B, CRM, SaaS, Leads,
Pipeline, Kick-off, Setup, Call-Center, Pitch.*

Nicht erlaubt, weil sie nichts sagen: *Growth, Funnel, Journey, Solution,
Performance, skalieren, ganzheitlich, maßgeschneidert, innovativ,
Rundum-sorglos.* Für jedes gibt es ein deutsches Wort, das genauer ist — und
wenn nicht, fehlt der Gedanke, nicht das Wort.

> **Diese Listen gelten für die eigene Copy einer Seite, nicht für Zitate.**
> Übersichtsseiten zeigen Anreißer aus anderen Quellen — Beitragstitel und
> -beschreibungen, Begriffserklärungen, Videotitel vom Kanal. Was dort steht,
> gehört dort geprüft, wo es geschrieben wird, nicht auf der Seite, die es
> zitiert. Auf `/wissen` meldete die Wortprüfung sonst „Skalierbarkeit“ aus
> der Beschreibung eines Blogbeitrags — ein Verstoß, den man auf dieser Seite
> gar nicht beheben kann. Wer die Abnahme automatisiert, muss Anreißerbereiche
> vorher herausnehmen.

---

## 10 · Was nie geschrieben wird

| Nicht schreiben | Warum |
|---|---|
| Firmenname neben einer nicht freigegebenen Zahl | § 5 UWG |
| „Kaltakquise ist erlaubt" ohne Bedingungen und Paragraphen | verkürzt eine Rechtsfrage zur Werbeaussage |
| Preise, Pakete oder „ab"-Beträge | keine Freigabe; `check-pricing.mjs` bricht den Lauf ab |
| Erfundene Kundenstimmen, `aggregateRating` | gesperrt in `check-compliance.mjs` |
| Ein konkretes Datum in einem Schaubild („KW 38") | veraltet ab dem Tag nach dem Deployment |
| „Garantiert", „100 %", „in nur X Tagen" | Zusagen, die niemand halten kann. Stand bis zum 16.09.2026 als „Schnelle Antwort garantiert" auf `/kontakt`; geblieben ist die Angabe ohne das Wort — ein Werktag |
| Adresse oder Telefonnummer im Fließtext | gehört in `businessInfo`, sonst laufen die Angaben auseinander |
| Dringlichkeit ohne Grund („nur noch heute") | die Seite hat einen echten Grund: fünf Kunden pro Monat |

---

## 11 · Textabnahme

- [ ] Jeder Abschnitt hat Etikett, Überschrift, Vorspann — und der tragende
      Abschnitt einen Aufruf **innerhalb** des Abschnitts
- [ ] Keine Überschrift über 79 Zeichen, kein Vorspann über zwei Sätze
- [ ] Jede Zahl steht genau einmal im Code und überall gleich im Text
- [ ] Kein Firmenname neben einer Zahl ohne abgelegte Freigabe
- [ ] Rechtsaussagen mit Paragraph und mit dem Hinweis „keine Rechtsberatung"
- [ ] Titel und H1 gegen `scripts/check-forbidden-targets.mjs` geprüft
- [ ] Texte mit JSON-LD-Zweitverwendung stehen in einem Datenmodul
- [ ] Alle Einträge einer Bühne stehen im ausgelieferten HTML (Seitensuche)
- [ ] Kein Ausrufezeichen, kein Superlativ, kein Anglizismus aus § 9.1
- [ ] Prüffrage bestanden: Kein Satz, den der Wettbewerber unverändert
      übernehmen könnte
- [ ] Bei einer **Seitenfamilie mit Schwesterfamilie**: Beantwortet die Seite
      eine andere Frage als ihre Schwester — nicht nur mit anderen Wörtern?
- [ ] `pnpm run check:all` meldet neunmal „keine Beanstandungen"

> **Beim Umbau: die vorhandenen Texte gegen diese Liste lesen, nicht nur die
> neuen.** Auf `/leistungen/[stadt]` standen sechs Antworten, die als
> `FAQPage` ausgeliefert wurden und der übrigen Website widersprachen: „oft
> schon in der ersten Woche“ gegen „innerhalb von 10–14 Tagen“ in
> `home-content.ts`, dazu „maßgeschneiderte Vertriebsstrategien“, „liefern
> schnelle Ergebnisse“, Preismodelle unter anderen Namen als in `pricing.ts`
> und eine Jahreszahl ohne zweite Quelle. Fünfzehn Seiten lang, seit Monaten
> online. Im Quelltext fällt so etwas nicht auf — es steht in einem
> Datenmodul, nicht in der Komponente, die man gerade umbaut.
