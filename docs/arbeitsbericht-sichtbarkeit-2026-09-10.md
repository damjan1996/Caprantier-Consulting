# Arbeitsbericht: Umsetzung des Auftrags „Sichtbarkeit"

**Arbeit ausgeführt:** 10.09.2026, ca. 19:50–21:10 CEST
**Bericht erstellt:** 12.09.2026
**Auftrag:** `AUFTRAG-SICHTBARKEIT-2026-09.md`
**Ausgangs-Commit:** `d701236` · **Branch:** `main` · **nicht committet, nicht deployt**

Dieses Dokument ist der vollständige Bericht über alles, was in dieser Session
geändert wurde. Zwei weitere Dokumente gehen ins Detail:

- `docs/ap1-indexierung-befund.md` — die Diagnose, warum 48 von 52 Beiträgen
  nicht im Index waren
- `docs/aufgaben-nico.md` — was ohne Nicos Zuarbeit nicht weitergeht
- `docs/revision-2026-09-10.md` — der Revisionslauf nach Abschnitt 7 des Auftrags

> **Nicht Teil dieser Session:** Zwei Dateien im Projektstamm stammen aus
> parallelen Sessions und bauen auf dem hier beschriebenen Stand auf —
> `ROADMAP-KI-SICHTBARKEIT-2026-09.md` (12.09., 00:08) und
> `ROADMAP-GESAMT-2026-09.md` (12.09., 00:26). Sie wurden nicht angefasst.
> Wo sie den hier dokumentierten Stand beschreiben, gilt im Zweifel dieser
> Bericht, weil er aus dem Arbeitsvorgang selbst entstanden ist.

---

## 1 · Zusammenfassung in Zahlen

| | Wert |
|---|---|
| Geänderte Dateien | 24 |
| Neue Dateien | 42 |
| Zeilen im Diff der geänderten Dateien | +813 / −8.641 |
| Routen vorher → nachher | 30 → **68** |
| Blogbeiträge | 52 → **13** |
| Adressen in der Sitemap | 33 → **58** |
| Dauerhafte Umleitungen | 0 → **43** (301) |
| Prüfungen in `pnpm verify` | 1 → **8** |

**Gate-Stand am Ende:** `pnpm verify` grün · `pnpm test:e2e` 148/148 grün.

---

## 2 · Ausgangslage

Der Auftrag beruhte auf einer Live-Messung vom 10.09.2026. Die belastbaren
Befunde daraus:

- Das Muster `vertriebsagentur [stadt]` trägt: Frankfurt Position 2,
  Düsseldorf 4, sechs weitere Städte in den Top 10.
- **0 von 9** nationalen Kaufbegriffen in den Top 10.
- **0 von 10** informationellen Suchanfragen platziert, obwohl für fast jede
  ein Beitrag existierte.
- `site:carpantier-consulting.de/blog` → „Ungefähr 5 Ergebnisse" bei 52 URLs
  in der Sitemap.
- Kein Google Business Profile.
- Kein Preis auf `/leistungen`.

`pnpm verify` war zu Beginn dieser Session grün — der Ausgangszustand war also
technisch intakt, aber inhaltlich und strukturell nicht wettbewerbsfähig.

---

## 3 · Die Arbeitspakete im Einzelnen

### AP-1 · Diagnose der Nicht-Indexierung

**Ergebnis:** `docs/ap1-indexierung-befund.md`

Zuerst wurde ein Messwerkzeug gebaut (`scripts/blog-audit.mjs`), das je Beitrag
Wortzahl, FAQ-Einträge, externe Quellen und interne Links zählt. Der
Ausgangsbefund:

```
52 Beiträge · Median 429 Wörter · Mittel 430 · Minimum 219 · Maximum 687
Mit FAQ-Block: 5/52 · mit externer Quelle: 0/52 · mit Stadt-/Leistungslink: 0/52
```

Der Median liegt niedriger als die im Auftrag genannten 457 Wörter, weil dieses
Skript Markdown-Auszeichnung nicht als Text zählt. An der Aussage ändert das
nichts.

**Der entscheidende Fund stand nicht im Auftrag.** `BlogGrid.tsx` paginierte
clientseitig:

```
const POSTS_PER_PAGE = 12
const [currentPage, setCurrentPage] = useState(1)
const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
```

Die Seitenzahl lag in React-State. Es gab **keine URL für Seite 2** und keinen
Verweis, dem ein Crawler folgen konnte. Im ausgelieferten HTML von `/blog`
standen damit 12 der 52 Artikel-Links; die übrigen 40 waren ausschließlich über
die Sitemap erreichbar.

Gegen die Messung geprüft:

- Alle **vier** indexierten Beiträge standen auf Seite 1 **und** wurden
  zusätzlich von `/glossar` oder aus einem anderen Beitrag verlinkt.
- Von den **40** Beiträgen ohne jeden internen Link war **keiner** indexiert.
- Vier weitere waren verlinkt und trotzdem nicht indexiert.

Daraus die Kernaussage des Befunds: **Ein interner Link ist notwendig, aber
nicht hinreichend.** Ohne Verlinkung wird ein Beitrag gar nicht erst ernsthaft
bewertet; unter den verlinkten entscheidet dann die Qualität. Beide Hebel
wirken nur zusammen — deshalb hätte weder reines Textverlängern noch reines
Verlinken das Problem gelöst.

**Als Annahme gekennzeichnet** (mangels Search-Console-Zugang): die Zuordnung
zu Googles Kategorien „Gefunden – zurzeit nicht indexiert" gegen „Gecrawlt –
zurzeit nicht indexiert".

---

### AP-2 · Crawler-Sperren und `llms.txt`

**Geändert:** `public/robots.txt` (+36 / −19)

Entfernt:

| Regel | Warum |
|---|---|
| `Disallow: /` für AhrefsBot, SemrushBot, DotBot, MJ12bot | Hat keinen Wettbewerber an der Analyse gehindert, aber die Domain aus den Datensätzen genommen, aus denen Vergleichslisten gespeist werden |
| `Disallow: /*?*` samt drei `utm_`-Ausnahmen | `Allow` und `Disallow` gleicher Spezifität konkurrieren; Kampagnen-URLs konnten ungewollt herausfallen. Duplikate löst das `canonical`-Tag, das nachweislich jede Seitenvorlage setzt |
| **`Disallow: /_next/static/chunks/`** | Nicht im Auftrag genannt, aber die teuerste Zeile im File: Die Sperre nahm Googles Renderer die JavaScript-Bundles weg, die er braucht, um die Seite wie ein Besucher zu sehen |

KI-Crawler bleiben ausdrücklich erlaubt, mit Begründung im File.

**Neu:** `src/app/llms.txt/route.ts`

Als Route statt als statische Datei unter `public/`, weil der Inhalt aus
`businessInfo`, `cities`, `industryPages` und `blogPosts` entsteht. Eine
abgetippte Fassung wäre nach dem ersten neuen Beitrag falsch, und NAP-Daten
dürfen im Projekt nur eine Quelle haben.

Im Build gegengeprüft: Content-Type `text/plain; charset=utf-8`.

---

### AP-3 · Blog-Sanierung

Das größte Paket. **52 → 13 Beiträge, 43 Umleitungen.**

#### Die Cluster

| Zielbeitrag | führt zusammen |
|---|---|
| `b2b-kaltakquise-leitfaden` | + 6: Skript, Uhrzeit, Gatekeeper, Warm/Kalt, Mailbox, Einstieg |
| `b2b-leadgenerierung-kanaele` *(neu)* | + 11: LinkedIn, Sales Navigator, Cold Mail, Content, Webinare, Messen, In-/Outbound, ABM, Social Selling, Video, LinkedIn vs. Kalt |
| `vertriebssteuerung-kpis-pipeline` *(neu)* | + 6: Strategie, Ziele, KPIs, Pipeline, Funnel, CRM |
| `akquise-nach-branche-b2b-dienstleister` *(neu)* | + 5: Agentur ×2, Beratung, Maschinenbau, Startup |
| `bant-methode-erklaert` | + 4: Lead Scoring, Buying Center, Discovery Call, Remote Selling |
| `vertrieb-auslagern-kosten-vorteile` | + 3: SDR, Inhouse-Vergleich, Hybridmodell |
| `angebot-verhandlung-abschluss-b2b` *(neu)* | + 3: Angebot, Preisverhandlung, Closing |
| `ki-im-b2b-vertrieb` | + 2: ChatGPT, Automatisierung |
| `einwandbehandlung-vertrieb` | + 1: Follow-up |
| `vertriebsagentur-finden-checkliste` | + 1: Agentur steuern |
| `leadgenerierung-it-dienstleister` | + 1: SaaS |
| `kaltakquise-rechtliche-grundlagen` | eigenständig |
| `vertriebsteam-aufbauen-recruiting` | eigenständig |

Neun Alt-Slugs blieben erhalten, darunter **alle vier indexierten**. Keine
indexierte Adresse wurde umgezogen.

#### Das Ergebnis

| Messwert | vorher | nachher |
|---|---|---|
| Beiträge | 52 | 13 |
| Median Wortzahl | 429 | **1.306** |
| Minimum | 219 | **1.213** |
| Maximum | 687 | **1.436** |
| mit FAQ-Block (≥ 3) | 5 / 52 | **13 / 13** |
| mit externer Quelle | 0 / 52 | **13 / 13** |
| mit Link auf `/leistungen` | 0 / 52 | **13 / 13** |
| crawlbar verlinkt | 12 / 52 | **13 / 13** |
| mit ≥ 2 eingehenden Links | — | **13 / 13** (Min. 2, Max. 10) |

#### Externe Quellen

Alle vor der Verwendung abgerufen und auf Existenz und Inhalt geprüft:

- `gesetze-im-internet.de` — § 5, § 5a, § 7 UWG; § 84 HGB; AÜG
- `dsgvo-gesetz.de` — Art. 6, Art. 14 DSGVO
- `bundesnetzagentur.de` — „Ärger mit Rufnummern und Anrufen"
- `destatis.de` — Statistisches Unternehmensregister (3,5 Mio. rechtliche Einheiten)
- `bitkom.org`

Der Schwerpunkt auf Primärquellen ist Absicht: Die Messung zeigte, dass Googles
KI-Übersicht in dieser Kategorie ungefragt den Rechtsrahmen mitliefert.
Juristische Präzision ist hier ein zitierrelevantes Signal.

#### Struktur

`src/lib/blog.ts` ist von **8.287 auf 113 Zeilen** geschrumpft. Die Beiträge
liegen als je eine Datei unter `src/content/blog/` (zusammen 2.417 Zeilen), die
Typen in `src/lib/blog-types.ts`.

Die Aufteilung folgt der Entscheidungsregel aus dem Auftrag und wurde erst
**nach** dem Schreiben der Beiträge getroffen: 13 Beiträge à ~1.300 Wörter
hätten die Datei wieder über 4.000 Zeilen getrieben.

Das eigene Typmodul war nötig, weil sonst ein Importzyklus zwischen Index und
Inhalt entsteht — für den TypeScript-Compiler harmlos, für Werkzeuge, die die
Dateien einzeln laden, nicht.

#### Umleitungen

`config/blog-redirects.js` (CommonJS, außerhalb von `src/`, weil
`next.config.js` sie lädt) hält die 43 Zuordnungen. `next.config.js` hatte
bisher nur `headers()`; `redirects()` ist neu.

**`statusCode: 301` statt `permanent: true`:** Next.js setzt bei `permanent`
eine 308. Die ist semantisch ebenfalls dauerhaft, der Auftrag verlangt aber
ausdrücklich 301, und ältere Prüfwerkzeuge kennen 308 bis heute nicht. Im
Routen-Manifest des Builds gegengeprüft: 43 Einträge, alle 301.

Jede Umleitung zeigt auf den thematisch passenden Zielbeitrag, **keine
Sammelumleitung auf `/blog`** — die würde Google als Soft-404 behandeln und
den Wert der alten Adresse gerade nicht übertragen.

#### Nebenbefunde, die mitbehoben wurden

`src/components/ui/Markdown.tsx`:

- **Nummerierte Listen erzeugten `<li>` ohne `<ol>`** — die Nummern fehlten im
  Ergebnis. Ursache: Aufzählungen wurden vor dem Einfassen verarbeitet,
  Nummerierungen danach.
- **Tabellen ab der zweiten pro Beitrag verloren ihre Kopfzeile.** Die
  Kopfzeile wurde daran erkannt, ob sie vor dem *ersten* Vorkommen von `|---|`
  im gesamten Text stand. Jetzt wird blockweise gearbeitet.
- **Externe Links** tragen `target="_blank" rel="noopener noreferrer"` — ohne
  `nofollow`, weil Verweise auf Primärquellen ein Qualitätssignal sind.

Beides fiel vorher nicht auf, weil kaum ein Beitrag nummerierte Listen oder
mehr als eine Tabelle enthielt.

`src/app/blog/components/BlogGrid.tsx`: Die clientseitige Paginierung ist
entfernt; die Übersicht rendert alle Beiträge, der Kategoriefilter blendet nur
aus, was bereits im HTML steht. Ein Kommentar hält fest, unter welcher
Bedingung eine Paginierung zurückkommen darf (echte, serverseitig gerenderte
Adressen).

---

### AP-4 · Lesezeit

`readingTime` ist aus dem Datensatz **entfernt** und wird in
`getReadingTime()` aus der Wortzahl gerechnet (200 Wörter/Minute, aufgerundet,
Minimum 1).

Ein Beitrag kann keine falsche Lesezeit mehr behaupten, weil es kein Feld dafür
mehr gibt. Vorher stand `readingTime: '12 min'` an einem 430-Wort-Text.

---

### AP-5 · Zweite Stadt-Begriffsfamilie

**Neu:** `/kaltakquise` und `/kaltakquise/[stadt]` für alle 15 Städte.

`src/lib/cities.ts` blieb unangetastet — der Auftrag hielt fest, dass dort
nichts zu reparieren ist. Die ortsbezogenen Texte liegen in
`src/lib/city-acquisition.ts`, je Stadt eigenständig geschrieben:
Marktstruktur, wer vor Ort angerufen wird, Erreichbarkeitsfenster,
Leitbranchen.

Metadaten und FAQ besetzen bewusst andere Begriffe als `/leistungen/[stadt]`
(dort „Vertrieb" und „Vertriebsagentur", hier „Kaltakquise",
„Telefonakquise", „Terminvereinbarung"), damit die beiden Familien nicht
gegeneinander ranken.

`getKaltakquiseFAQs()` in `src/lib/schemas.ts` ist ein eigener Generator, keine
Wiederverwendung von `getCityFAQs()` — zwei Seitenfamilien mit identischem
FAQ-Block wären derselbe Text unter zwei Adressen.

---

### AP-6 · Preisanker

**Neu:** `src/lib/pricing.ts`, `src/app/leistungen/components/Pricing.tsx`

Drei Modelle: Pilotprojekt, laufende Akquise, pro qualifiziertem Termin. Jedes
mit Leistungsumfang **und einer ausdrücklich benannten Grenze** des Modells.

Die Freigabe ist zweistufig gebaut:

1. `preis` je Modell eintragen (steht auf `null`)
2. `PREISE_FREIGEGEBEN` auf `true` setzen (steht auf `false`)

**Beides ist nötig.** Das Flag allein veröffentlicht nichts — so kann eine
versehentliche Änderung keine erfundene Zahl live schalten. `Offer`-Markup
entsteht nur mit freigegebenem Betrag.

Der Auslieferungsstand nennt damit ein nachvollziehbares Preismodell **ohne
Zahl** und sagt dem Leser, warum: Der Preis hängt an den wöchentlichen
Akquisestunden, die sich aus der Zielgruppengröße ergeben.

---

### AP-7 · Fallstudien-Gefäß

**Neu:** `src/lib/case-studies.ts`, `/referenzen`

Die Route heißt **`/referenzen`**, nicht `/case-studies`. Jener Pfad ist im
Compliance-Gate gesperrt, weil dort einmal erfundene Firmennamen, Zitate und
Kennzahlen standen. Die Sperre bleibt bestehen und wurde nicht umgangen.

Datenmodell mit `freigegebenAm`, `kundeNennbar` und `istBeispiel`. Enthalten
ist ein Blindmuster, das ausschließlich den Aufbau zeigt: keine Firma, keine
Zahlen, ein sichtbarer Warnhinweis.

Solange ein Blindmuster im Bestand ist:

- steht die Route auf `noindex` (an `enthaeltBeispiele()` gekoppelt, nicht
  handgesetzt),
- **fehlt sie in der Sitemap**,
- und das Compliance-Gate bricht den Build, wenn die Kopplung entfernt wird.

Im Build gegengeprüft: `<meta name="robots" content="noindex, follow">`.

---

### AP-8 · Nischenseiten

**Neu:** `src/lib/industries.ts`, `/branchen`, `/branchen/[branche]`

- `/branchen/personaldienstleister`
- `/branchen/it-systemhaeuser`

Jede mit eigener Ausgangslage (vier Punkte), eigenem Vorgehen (vier Schritte),
eigenen Qualifizierungsfragen, eigenem FAQ-Schema und Verweisen auf die
passenden Fachbeiträge und Stadtseiten.

Die Übersicht `/branchen` existiert nicht der Vollständigkeit halber: Ohne sie
hätten die beiden Branchenseiten je nur einen eingehenden internen Link — genau
der Zustand, der im Blog belegt zur Nichtindexierung geführt hat.

---

### AP-9 · Verzeichnisse

**Geändert:** `src/lib/local-seo.ts`

15 → **18 Einträge**, ergänzt um **Sortlist, ProvenExpert und OMR Reviews**.
Sortlist stand in 13 von 29 gemessenen Suchergebnissen und wird von Googles
KI-Übersicht als Vergleichsquelle empfohlen.

Struktur um `submittedAt` und `profileUrl` erweitert, `DirectoryStatus` als
eigener Typ, `getOffeneVerzeichnisse()` sortiert nach Priorität.

`scripts/check-directories.mjs` erzwingt: `submitted` braucht ein Datum im
Format JJJJ-MM-TT und nicht in der Zukunft, `verified` zusätzlich eine
`https`-Profiladresse, `pending` darf keines von beidem tragen.

---

## 4 · Funde außerhalb des Auftrags

### 4.1 NAP-Widerspruch: zwei Postleitzahlen

| Ort im Code | Angabe |
|---|---|
| Impressum, Datenschutzerklärung, Organisations-JSON-LD | **50935** |
| `local-seo.ts`, Chatbot-Auskunft | **50735** |

Dazu **drei verschiedene Schreibweisen** derselben Rufnummer
(`+49 (0)1573 8186221`, `+49 (0) 15738186221`, `+49 1573 8186221`).

Abschnitt 3.6 des Auftrags führt NAP-Konsistenz als unantastbar — sie war es
nicht.

**Vereinheitlicht auf 50935**, die Angabe des Impressums, weil sie die
rechtlich verbindliche Anbieterkennzeichnung nach § 5 DDG ist und in drei von
vier Fundstellen stand. Impressum, Datenschutz, Chatbot, Stadtseiten und
Root-Layout lesen jetzt alle aus `businessInfo`.

> **Ungeprüft und an Nico gemeldet:** Ob „Stammheimer Straße 123" tatsächlich
> in 50935 liegt, ist nicht verifiziert. Das ist Voraussetzung für die
> GBP-Verifizierung und im Impressum abmahnfähig, wenn es falsch ist.

**Neue Compliance-Regel:** Straße, Postleitzahl und Rufnummer dürfen außerhalb
von `local-seo.ts` nirgends im Quelltext stehen. Die Regel meldete beim ersten
Lauf sofort zwei weitere Fundstellen.

### 4.2 Der Chatbot gab die falsche Adresse aus

`src/lib/chat/tool-executor.ts` lieferte im Kontakt-Fallback die abweichende
Postleitzahl — an Interessenten, im Klartext.

### 4.3 Beispielwerte auf `/leistungen`

`+47 %` bei „Leads" und `12` bei „Termine" standen als `<text>` in
`DataAnalyticsIllustration`. Diese Illustration wird über
`src/app/leistungen/components/Services.tsx` ausgeliefert — die Zahlen standen
also tatsächlich auf der Seite, die verkauft.

**Entfernt.** Die KPI-Kacheln bleiben als Form erhalten, tragen aber keine Zahl
mehr.

### 4.4 Nicht angefasst: die Kennzahlen auf der Startseite

`src/app/components/Benefits.tsx` trägt den Abschnitt „Das erreichen unsere
Kunden" mit „87 % Entscheider-Quote", „35 %+ Ø Abschlussquote", „3–8 Termine
pro Woche", „< 14 Tage bis zum ersten Termin" und fünf anonymisierten
Erfolgsgeschichten — eingeleitet mit *„Echte Ergebnisse, echte Unternehmen."*

**Bewusst nicht geändert.** Der Text gibt die Zahlen ausdrücklich als real aus.
Sind sie es, sind sie das stärkste Material der Website und gehören belegt
statt gelöscht; sind sie es nicht, müssen sie weg (§ 5 UWG). Das ist eine
Entscheidung über Tatsachen, die diese Session nicht treffen kann —
`docs/aufgaben-nico.md`, Punkt 2b.

---

## 5 · Die neuen Prüfungen

`pnpm verify` umfasste eine Prüfung und umfasst jetzt acht. Reihenfolge: erst
die schnellen, dann der Build.

| Skript | Erzwingt |
|---|---|
| `check:compliance` | UWG/DDG-Regressionen, NAP-Einheit, Fallstudien-`noindex`, Kundenname nur mit Freigabe |
| `check:blog` | ≥ 1.200 Wörter, ≥ 3 FAQ, ≥ 1 externe Quelle, Link auf `/leistungen` |
| `check:redirects` | kein totes Ziel, keine Kette, kein aktiver Slug umgeleitet, keine Dopplung |
| `check:links` | jeder Beitrag von ≥ 2 Seiten verlinkt, Übersicht rendert alle |
| `check:sitemap` | jede Adresse existiert, keine umgeleitete, keine `noindex`-Seite, nichts fehlt |
| `check:duplication` | kein Satz ab 60 Zeichen doppelt über Städte oder Branchen |
| `check:pricing` | keine Freigabe ohne Betrag, kein Betrag ≤ 0 |
| `check:directories` | kein Status ohne Beleg |

Zwei Hilfsmodule dazu:

- `scripts/lib/load-ts-module.mjs` — lädt TypeScript-Datenmodule zur Laufzeit
  in ein Node-Skript, löst relative Pfade und den `@/`-Alias auf, erkennt
  Importzyklen. Damit prüfen die Skripte dieselben Daten, die die Website
  rendert, statt einer zweiten Kopie.
- `scripts/lib/count-words.mjs` — Schnellzähler für einzelne Beitragsdateien
  während des Schreibens.

**Die beiden neuen Compliance-Regeln wurden gegengeprüft**, indem der Verstoß
absichtlich herbeigeführt wurde: Beide brachen den Lauf mit Exit-Code 1 und
wurden danach zurückgenommen.

---

## 6 · Alle Dateien

### Neu (42)

**Inhalt**
```
src/content/blog/index.ts
src/content/blog/akquise-nach-branche-b2b-dienstleister.ts
src/content/blog/angebot-verhandlung-abschluss-b2b.ts
src/content/blog/b2b-kaltakquise-leitfaden.ts
src/content/blog/b2b-leadgenerierung-kanaele.ts
src/content/blog/bant-methode-erklaert.ts
src/content/blog/einwandbehandlung-vertrieb.ts
src/content/blog/kaltakquise-rechtliche-grundlagen.ts
src/content/blog/ki-im-b2b-vertrieb.ts
src/content/blog/leadgenerierung-it-dienstleister.ts
src/content/blog/vertrieb-auslagern-kosten-vorteile.ts
src/content/blog/vertriebsagentur-finden-checkliste.ts
src/content/blog/vertriebssteuerung-kpis-pipeline.ts
src/content/blog/vertriebsteam-aufbauen-recruiting.ts
```

**Datenmodule**
```
src/lib/blog-types.ts
src/lib/case-studies.ts
src/lib/city-acquisition.ts
src/lib/industries.ts
src/lib/pricing.ts
config/blog-redirects.js
```

**Routen**
```
src/app/branchen/page.tsx
src/app/branchen/[branche]/page.tsx
src/app/branchen/[branche]/layout.tsx
src/app/kaltakquise/page.tsx
src/app/kaltakquise/[stadt]/page.tsx
src/app/kaltakquise/[stadt]/layout.tsx
src/app/referenzen/page.tsx
src/app/referenzen/layout.tsx
src/app/llms.txt/route.ts
src/app/leistungen/components/Pricing.tsx
```

**Prüfskripte**
```
scripts/blog-audit.mjs
scripts/check-blog-redirects.mjs
scripts/check-content-duplication.mjs
scripts/check-directories.mjs
scripts/check-internal-links.mjs
scripts/check-pricing.mjs
scripts/check-sitemap.mjs
scripts/lib/load-ts-module.mjs
scripts/lib/count-words.mjs
```

**Dokumentation**
```
docs/ap1-indexierung-befund.md
docs/aufgaben-nico.md
docs/revision-2026-09-10.md
```

### Geändert (24)

| Datei | Änderung |
|---|---|
| `src/lib/blog.ts` | 8.287 → 113 Zeilen; Index, berechnete Lesezeit, `getRelatedPosts()` nach Tag-Übereinstimmung |
| `src/lib/blog-images.ts` | auf die 13 Beiträge reduziert |
| `src/lib/local-seo.ts` | PLZ vereinheitlicht, `localDirectories` 15 → 18 mit neuen Feldern |
| `src/lib/schemas.ts` | `getKaltakquiseFAQs()`, `generateKaltakquiseFAQSchema()` |
| `src/lib/chat/tool-executor.ts` | Kontaktdaten aus `businessInfo` |
| `src/app/sitemap.ts` | 33 → 58 Adressen, `/referenzen` an Indexierbarkeit gekoppelt |
| `src/app/layout.tsx` | NAP-Daten aus `businessInfo` |
| `src/app/blog/[slug]/page.tsx` | berechnete Lesezeit, neue Related-Logik, dreispaltig |
| `src/app/blog/components/BlogGrid.tsx` | clientseitige Paginierung entfernt |
| `src/app/leistungen/page.tsx` | Preisbaustein, `Offer`-Schema |
| `src/app/leistungen/components/index.ts` | `Pricing` exportiert |
| `src/app/leistungen/[stadt]/page.tsx` | NAP aus `businessInfo` statt hartkodiert |
| `src/app/impressum/components/InfoCards.tsx` | NAP aus `businessInfo` |
| `src/app/impressum/components/AdditionalSections.tsx` | Rufnummer aus `businessInfo` |
| `src/app/datenschutz/components/PrivacySections.tsx` | NAP aus `businessInfo` |
| `src/components/ui/Markdown.tsx` | `<ol>`-Fehler, Tabellenköpfe, externe Link-Attribute |
| `src/components/layout/Header.tsx` | Untermenü „Leistungen" mit Kaltakquise, Branchen, Referenzen |
| `src/components/layout/Footer.tsx` | neue Bereiche, zweite Stadtfamilie |
| `src/components/illustrations/index.tsx` | Beispielzahlen entfernt |
| `next.config.js` | `redirects()` neu, 43 × 301 |
| `public/robots.txt` | drei Sperren entfernt |
| `package.json` | acht Prüfskripte, neues `verify` |
| `scripts/check-compliance.mjs` | drei neue Regeln |
| `.gitignore` | Playwright-Screenshots |

---

## 7 · Revisionslauf

### Technisch

```
pnpm verify   → grün
pnpm test:e2e → 148 Tests, alle grün (3,5 min)
```

Zusätzlich geprüft:

- **Sitemap:** 58 Adressen, jede gegen den Routenbestand geprüft. Keine
  umgeleitete Adresse, keine `noindex`-Seite enthalten, keine fehlt.
- **Umleitungen:** 43, im Routen-Manifest des Builds als Statuscode 301
  bestätigt.
- **Canonicals:** jede Seitenvorlage setzt einen eigenen, auf sich selbst.
- **JSON-LD:** Bestand unbeschädigt; erweitert um `Service` je Stadt und
  Branche, zwei `ItemList`, `FAQPage` je Kaltakquise- und Branchenseite,
  `BreadcrumbList` durchgehend. `Offer` bewusst noch nicht.
- **Verwaiste Beiträge:** keine. Minimum 2 eingehende Links, Maximum 10.
- **`/llms.txt`:** Content-Type `text/plain; charset=utf-8`.
- **`/referenzen`:** `<meta name="robots" content="noindex, follow">`.

Die Playwright-Suite meldet drei Warnungen, die schon vor dem Umbau bestanden:
zwei Bedienelemente unter der empfohlenen Touch-Zielgröße und das
„KI"-Kürzel im Transparenz-Abzeichen mit 9 px.

### Inhaltlich

- Kein Beitrag unter 1.200 Wörtern. ✓
- Keine behauptete Lesezeit — das Feld existiert nicht mehr. ✓
- `/leistungen` frei von Beispielzahlen. ✓
- `/ki-transparenz` unverändert vollständig, zusätzlich aus dem KI-Beitrag
  verlinkt. ✓
- § 7 UWG: Die Trennung Telefon/E-Mail ist in vier Beiträgen ausdrücklich
  ausgeführt und nirgends verwischt; der Rechtsbeitrag zitiert Abs. 2 Nr. 1 im
  Wortlaut. ✓
- Offen: die Kennzahlen auf der Startseite (Abschnitt 4.4).

### Nachmessung

Nicht durchgeführt und nicht durchführbar: Der Stand ist nicht deployt, und der
Auftrag hält fest, dass eine Messung unmittelbar nach dem Deployment nichts
misst. Erwartung für den einzigen schnell reagierenden Wert
(`site:carpantier-consulting.de/blog`): Die Zahl **fällt zunächst**, weil 43
Adressen mit 301 antworten, bevor sie mit den 13 belastbaren Beiträgen steigt.

---

## 8 · Was bewusst nicht getan wurde

| | Warum |
|---|---|
| Nichts committet, nichts gepusht, nichts deployt | Abschnitt 3.8 des Auftrags — Push entscheidet Damjan |
| Kennzahlen der Startseite unverändert | Entscheidung über Tatsachen, siehe 4.4 |
| Keine Preisbeträge eingetragen | Geschäftsentscheidung |
| Keine Fallstudieninhalte erfunden | Abschnitt 3.5 |
| `src/lib/cities.ts` unangetastet | Auftrag: Bestand ist konsistent |
| `/ki-transparenz` unangetastet | Abschnitt 3.4 — Aktivposten |
| `src/app/case-studies/` nicht wiederbelebt | Compliance-Sperre bleibt |
| Kein `aggregateRating`, kein `Review` | Abschnitt 3.1 |
| Backlinks | keine Daten; AP-2 öffnet die Crawler, Historie entsteht erst |
| Core Web Vitals | eigenes Paket laut Abschnitt 8 |

---

## 8b · Nachtrag 12.09.2026: Prüfung am laufenden Dev-Server

Nach dem Bericht oben wurde der Stand gegen einen laufenden Server geprüft.
Dabei kamen drei Mängel heraus, die Quelltext-Prüfungen nicht finden können.

### Neu: `scripts/check-live.mjs`

Prüft gegen einen antwortenden Server, was §7.1 verlangt und was sich vorher
nur gegen die Datenmodule prüfen ließ. **103 Abrufe, keine Beanstandung:**

| Prüfung | Ergebnis |
|---|---|
| 58 Sitemap-Adressen | alle 200 |
| 43 Umleitungen | alle 301 auf das hinterlegte Ziel, keine auf `/blog` |
| `/llms.txt`, `/robots.txt` | 200, `text/plain` |

Das Skript gehört nicht in `pnpm verify` (es braucht einen Server), sondern
vor ein Deployment. Es nimmt auch eine Zieladresse entgegen:
`node scripts/check-live.mjs https://carpantier-consulting.de`.

### Mangel 1: Marker-Attribut im ausgelieferten HTML

`data-liste="ol"` blieb nach dem Einfassen der Listen stehen – 16-mal je
Beitrag, in allen 13 Beiträgen. Funktional folgenlos, aber ein
Implementierungsdetail im öffentlichen Quelltext. Dazu doppelte Einrückung,
weil `ml-4` am `<li>` und `ml-6` an der Liste zusammenwirkten. Beides behoben.

### Mangel 2: ASCII-Doppelbindestrich in sichtbarem Text

Die Umstellung auf den Halbgeviertstrich hatte nur `src/content/blog/`
erfasst. In `schemas.ts`, `pricing.ts`, `case-studies.ts` und `local-seo.ts`
blieb ` -- ` stehen – **live sichtbar im FAQ jeder der 15
Kaltakquise-Stadtseiten und im dazugehörigen FAQPage-Markup.** Im Quelltext
fällt das nicht auf, im Rendering sofort.

Neun Stellen korrigiert. `scripts/check-content-duplication.mjs` prüft das
jetzt mit und hat beim ersten Lauf vier weitere gefunden, die beim Suchen von
Hand durchgerutscht wären.

### Mangel 3: ASCII-Ersatzschreibungen für Umlaute

In `local-seo.ts` standen 33 Wörter wie `fuer`, `laeuft`, `Prioritaet`,
`Naechstes`, `Koeln` – entstanden, weil diese Datei über ein
ASCII-Patchskript geschrieben wurde. Die Einträge sind heute nicht gerendert,
aber die Schreibweise ist falsch und wäre es beim ersten Rendern auch
sichtbar. Alle korrigiert, URLs und Slugs unangetastet.

### Was am Server zusätzlich bestätigt wurde

- **Der `<ol>`-Fehler und der Tabellenkopf-Fehler sind sichtbar behoben**:
  nummerierte Listen tragen 1./2./3./4., und die *zweite* Tabelle im Beitrag
  trägt ihre Kopfzeile.
- Preisbaustein zeigt drei Modelle ohne Betrag mit dem Hinweis, dass der
  Betrag im Erstgespräch fällt.
- `/referenzen` zeigt den Leerzustand plus das gekennzeichnete Blindmuster.
- Die neue Fußzeile führt beide Stadtfamilien, Branchen und Referenzen.
- 62 vorgerenderte Seiten: **199 JSON-LD-Blöcke, alle gültiges JSON**, je
  Seite genau eine H1, Canonicals korrekt.
- Alle 18 Zitate zu § 7 UWG gegen den Gesetzestext geprüft: Abs. 2 Nr. 1
  Telefon, Nr. 2 elektronische Post, Abs. 3 Bestandskunden – alle korrekt.

### Einmal aufgetreten, nicht reproduzierbar

Auf `/leistungen` meldete das Next-Overlay einmalig einen
Hydration-Mismatch (`<main>` gegen `<Suspense>` in `RootLayout`). Nach hartem
Neuladen und auf `/leistungen/koeln`, `/ueber-uns`, `/kontakt` trat er nicht
auf. Auf derselben Seite warf gleichzeitig eine Chrome-Erweiterung
(`share-modal.js`) eine Ausnahme – Next nennt Erweiterungen, die vor der
Hydration ins DOM greifen, ausdrücklich als Ursache. Der Produktionsbuild
rendert alle 68 Seiten fehlerfrei vor, und die 148 Playwright-Tests laufen in
einem Browser ohne Erweiterungen grün. **Ausschließen lässt es sich damit
nicht, belegen ebenso wenig.** Wer es erneut sieht, sollte zuerst im
Inkognito-Modus ohne Erweiterungen gegenprüfen.

---

## 9 · Nächste Schritte

**Vor dem Deployment**

1. Postleitzahl bestätigen (`docs/aufgaben-nico.md`, Punkt 1)
2. Über die Kennzahlen der Startseite entscheiden (Punkt 2b)
3. `pnpm verify` erneut laufen lassen, committen, deployen

**Unmittelbar nach dem Deployment**

4. Sitemap in der Search Console neu einreichen
5. Stichprobe: drei umgeleitete Adressen auf 301 prüfen
6. `curl -I https://carpantier-consulting.de/llms.txt` → 200, `text/plain`

**Danach, nach Wirkung sortiert**

7. Google Business Profile anlegen und verifizieren
8. Bewertungen einsammeln, Zielmarke 20
9. Sortlist-Profil anlegen
10. Zwei bis drei echte Fallstudien liefern
11. Preisentscheidung treffen und freigeben

Die Reihenfolge 7 → 8 → 9 ist wichtiger als alles Übrige zusammen. Der Code
kann ab hier nichts mehr beitragen, was diese drei Punkte ersetzt.
