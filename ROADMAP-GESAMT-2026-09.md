# Gesamt-Roadmap Sichtbarkeit — Carpantier Consulting

**Erstellt:** 12.09.2026
**Repo:** `C:\Users\damja\WebstormProjects\Nico Luca Carpantier` · Branch `main` · Remote `github.com/damjan1996/Caprantier-Consulting`
**Führt zusammen:**
- `ROADMAP-KI-SICHTBARKEIT-2026-09.md` (11.09., GEO/AEO-Evidenz + Code-Analyse) — **Struktur, Evidenzdisziplin und Paket-IDs dieses Dokuments stammen von dort**
- `AUFTRAG-SICHTBARKEIT-2026-09.md` (10.09.) — Abschnitt 3 („Unantastbar") gilt unverändert
- **Branchenatlas** https://claude.ai/code/artifact/76049c3f-6bbe-4005-9772-1238581a4620 (12.09., 157 Suchanfragen, 20 Wettbewerber-Domains) — liefert die Inhalte der neuen `AP-B`-Pakete
- **Wettbewerbsradar** https://claude.ai/code/artifact/3369d312-0c78-4854-924f-c93ecd9e166c (10.09.)

---

## 0 · An die Session, die das übernimmt

1. **Lies Abschnitt 1 zuerst.** Dort stehen fünf Empfehlungen aus den Vorgängerdokumenten, die **nicht mehr gelten**. Zwei davon stammen aus dem Branchenatlas und werden hier ausdrücklich zurückgenommen. Wer sie umsetzt, arbeitet gegen belegte Google-Richtlinien.
2. **Die Phasen sind eine Abhängigkeitskette, keine Prioritätenliste.** Phase 1 ist ein Tor.
3. **Paket-IDs sind stabil, Phasennummern nicht.** `AP-1.x` bis `AP-4.x` stammen aus der KI-Sichtbarkeits-Roadmap und behalten dort ihre Bedeutung. Neue Pakete aus dem Branchenatlas tragen das Präfix **`AP-B`**. Weil die Branchenachse als neue Phase dazwischenkommt, verschieben sich die hinteren Phasennummern gegenüber dem Vorgängerdokument. **Immer die Paket-ID zitieren, nie die Phasennummer.**

   | Paket | Phase hier | Phase in `ROADMAP-KI-SICHTBARKEIT` |
   |---|---|---|
   | `AP-1.x` Abrufbarkeit | Phase 1 | Phase 1 |
   | `AP-2.x` Preis + Vergleich | Phase 2 | Phase 2 |
   | `AP-3.x` Passagenstruktur | Phase 3 | Phase 3 |
   | **`AP-B*` Branchenachse** | **Phase 4 (neu)** | — |
   | `AP-4.x` Off-Page | Phase 5 | Phase 4 |
   | `AP-5.x` Stadtseiten-Risiko | Phase 6 | Phase 5 |
   | Messung | Phase 7 | Phase 6 |
4. **Fertig ist ein Paket, wenn der Prüfbefehl grün ist** — nicht, wenn der Text steht.
5. **Was du nicht entscheiden kannst, entscheidest du nicht.** Abschnitt 10 trennt Code-Arbeit von Nicos Input. Fehlt ein Input: Gefäß bis zur Grenze bauen, Grenze im Bericht benennen, nächstes Paket beginnen. **Niemals Platzhalter, die wie echte Angaben aussehen.**
6. **Nicht committen, nicht deployen ohne Freigabe.** Arbeiten, `pnpm verify` grün melden, berichten. Push entscheidet Damjan.

### Evidenzgrade

| Tag | Bedeutung |
|---|---|
| `[OFFIZIELL]` | Google-/Plattform-Dokumentation, wörtlich gegen die Primärquelle geprüft |
| `[GEMESSEN]` | Peer-Review oder große Stichprobe mit offengelegter Methodik und Kontrollgruppe |
| `[ANBIETER]` | Anbieterdaten ohne Kontrollgruppe oder mit Verkaufsinteresse am Ergebnis |
| `[SERP-BEFUND]` | Aus dem Branchenatlas: Zusammensetzung der Trefferliste, **kein** Volumen, **keine** verifizierten google.de-Positionen |
| `[RECHTLICH]` | Gesetzeslage, keine Messung |
| `[KEINE EVIDENZ]` | Verbreitete Behauptung ohne auffindbare Primärquelle |

**Regel:** Jeder nackte Multiplikator ohne Stichprobengröße und Methodik gilt als erfunden, bis das Gegenteil belegt ist.

### Unantastbar

Die acht Punkte aus `AUFTRAG-SICHTBARKEIT-2026-09.md` Abschnitt 3 gelten unverändert und werden hier nicht wiederholt. Kurzform, weil diese fünf in diesem Dokument ständig berührt werden:

- **Kein `aggregateRating`/`Review`-Markup ohne echte, freigegebene, sichtbare Kundenstimmen** (§ 5 UWG, Build-Gate).
- **Keine erfundenen Zahlen** — keine Logos ohne Freigabe, keine Terminquoten ohne echtes Projekt.
- **`/ki-transparenz` bleibt vollständig** (AI Act Art. 50, Aktivposten).
- **NAP nur aus `businessInfo` in `src/lib/local-seo.ts`.**
- **B2B-Telefonakquise bei mutmaßlicher Einwilligung zulässig, Kaltakquise-Mail ohne Einwilligung nicht** — diese Unterscheidung nie verwischen.

---

## 1 · Was aus den Vorgängerdokumenten nicht mehr gilt

Fünf Korrekturen. Die ersten drei betreffen den alten Auftrag, die letzten beiden **nehmen Empfehlungen aus dem Branchenatlas zurück**.

### 1.1 Keine Wortzahl-Untergrenze — auch nicht 900

`[OFFIZIELL]` https://developers.google.com/search/docs/fundamentals/creating-helpful-content

> Are you writing to a particular word count because you've heard or read that Google has a preferred word count? **(No, we don't.)**

Google führt das unter den **Warnzeichen** für suchmaschinen-zuerst erstellte Inhalte.

`[GEMESSEN]` DEJAN, 883.262 Grounding-Snippets: je Seite ausgewählt **Median 377 Wörter**; Abdeckung fällt von **61 % (unter 1.000 Wörtern) auf 13 % (über 3.000)**.

**Der Branchenatlas nannte „≥900 Wörter je Seite" als Abnahmekriterium. Das wird gestrichen.** An seine Stelle tritt der Substanztest aus AP-B2: eigener, nicht interpolierbarer Inhalt, der den Modifier-Delete-Test besteht. Eine Seite mit 500 substanzhaltigen Wörtern ist besser als eine mit 1.200 aufgefüllten. Die 13 bestehenden Beiträge (Median 1.306 Wörter) werden **nicht verlängert**.

### 1.2 FAQPage-Schema ist Hygiene, kein Hebel

`[OFFIZIELL]` Google Search Central Changelog: *„**May 8** — Deprecating the FAQ rich result feature … will no longer appear in Google Search starting **May 7, 2026**."*

`[GEMESSEN]` searchVIU, 8 Szenarien × 5 KI-Systeme: **JSON-LD wurde von null von fünf Systemen beim Abruf ausgelesen.** `[GEMESSEN]` Ahrefs, Difference-in-Differences, 1.885 Seiten gegen 4.000 Kontrollseiten: AI Overviews **−4,6 %**, kein Uplift auf irgendeiner Plattform.

**Der Branchenatlas führte „FAQPage-Markup" als Abnahmekriterium der Branchenseiten-Vorlage. Das wird zurückgestuft:** Bestehendes Schema bleibt, es schadet nicht. **Der sichtbare FAQ-Block leistet die Arbeit** — er bleibt Pflicht. Neue Arbeit fließt in den sichtbaren Text, nicht ins Markup.

### 1.3 llms.txt ist Wettbewerbsparität

`[OFFIZIELL]` Google, 15.06.2026: *„these files aren't needed for Google Search (and won't negatively or positively impact your visibility or rankings)"*. `[GEMESSEN]` Ahrefs, 137.210 Domains: **97 % erhielten null Anfragen.** Ausliefern (AP-1.1), danach nie wieder anfassen.

### 1.4 ⛔ Kein Kreuzprodukt Branche × Stadt — Empfehlung zurückgenommen

**Der Branchenatlas empfahl `/branchen/[branche]/[stadt]` als „die größte unbesetzte Struktur im deutschen Markt" und nannte vier konkrete Startpaare. Diese Empfehlung wird vollständig zurückgenommen.**

Sie beruhte auf einer Wettbewerbslücken-Analyse: Nur `diekaltakquiseagentur.de` kombiniert beide Achsen, mit 15 dünnen Seiten, in denen Lorem ipsum steht. Das ist als Beobachtung richtig — **es wurde nur der falsche Schluss daraus gezogen.** Dass niemand es ordentlich macht, kann auch daran liegen, dass Google das Muster ausdrücklich adressiert.

`[OFFIZIELL]` John Mueller, September 2026, zu genau diesem Muster:

> it sounds like a programmatic SEO play, **where you iterate through a large list of domain names, technologies, and attributes - finding all possible combinations.** … Programmatic SEO like this often leads to a site that's either spam, borderline spam, or low quality. … **Our systems have possibly lost faith in your site providing good value to users based on the old pages.**

Der Alarm gilt dem **Kreuzprodukt**, und der Schaden ist **seitenweit und dauerhaft**, nicht seitenbezogen.

`[OFFIZIELL]` Spam-Policies, „Doorway abuse": *„Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page"* · *„Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy"*.

`[GEMESSEN]` Lily Ray, 220 Websites aus den Referenzlisten von KI-Content-Plattformen: **54 % verloren über 30 % ihres Traffic-Höchststands, 22 % über 75 %.** Auf der Risikoliste ausdrücklich *„programmatic location/language scaling with minimal per-page uniqueness"*. Da die Stichprobe aus Erfolgsgeschichten besteht, sind das Untergrenzen.

**`/branchen/[branche]` und `/kaltakquise/[stadt]` bleiben getrennte Achsen.** Keine URLs der Form `/branchen/[branche]/[stadt]`. Wo eine Branche regional besonders stark ist, gehört das als Absatz **in** die Branchenseite, nicht auf eine eigene URL.

### 1.5 Verzeichnisse: klassische Suche und KI-Zitate sind zwei verschiedene Dinge

Der Branchenatlas empfahl Einträge bei Sortlist, ProvenExpert, werkenntdenbesten, drweb.de, onmylist.de mit der Begründung, `kaltakquise agentur erfahrungen` und `vertriebsagentur vergleich` seien mit einer eigenen Seite strukturell nicht gewinnbar. **Das bleibt richtig — aber nur für die klassische Suche.**

`[KEINE EVIDENZ]` Für KI-Zitate gilt es nicht: **Kein Agenturverzeichnis** (Sortlist, Clutch, DesignRush) erscheint in irgendeiner Top-10-Zitationsliste. Von den B2B-Verzeichnissen tauchen nur G2 und Gartner auf — Software/Analyst, nicht Dienstleistung. **Crawlbar heißt nicht zitiert.**

**Konsequenz:** Verzeichnisse ja, aber nach Zweck getrennt priorisieren (AP-4.2). Und **drweb.de fällt raus**: Die Seite legt offen, Provision zu erhalten **und Brand Mentions zu verkaufen** — bezahlte Platzierung im redaktionellen Gewand, und bezahlt ist `[GEMESSEN]` 0,3 % aller KI-Zitate.

---

## 2 · Arbeitsstand am 12.09.2026

### Erledigt (Parallel-Session, 10./11.09.)

| Bereich | Stand |
|---|---|
| **Blog** | 52 → **13 Beiträge**, Median 1.306 Wörter, Minimum 1.213. FAQ 13/13, externe Quelle 13/13, Stadt-/Leistungslink 13/13. Einzeldateien unter `src/content/blog/` |
| **Blog-Verlinkung** | Client-Pagination in `BlogGrid.tsx` **entfernt** — der Kernbefund ist adressiert |
| **Neue Routen** | `/kaltakquise`, `/kaltakquise/[stadt]`, `/branchen`, `/branchen/[branche]`, `/referenzen`, `/llms.txt` |
| **Branchenseiten** | `src/lib/industries.ts`, **2 Einträge**: `personaldienstleister`, `it-systemhaeuser` |
| **Preisgefäß** | `src/lib/pricing.ts` mit `PREISE_FREIGEGEBEN = false`, Beträge `null`, `check-pricing.mjs` als Gate |
| **Datengefäße** | `case-studies.ts`, `industries.ts`, `city-acquisition.ts`, `blog-types.ts` |
| **Prüfskripte** | `blog-audit`, `check-blog-redirects`, `check-content-duplication`, `check-directories`, `check-internal-links`, `check-pricing`, `check-sitemap` |
| **robots.txt** | KI-Crawler erlaubt, SEO-Crawler entsperrt, `/*?*` entfernt — **nicht committet** |

> **Wichtig für die Einordnung der Branchenatlas-Befunde:** Dessen Messungen (12 von 52 Beiträgen verlinkt, 40 Waisen, Artikel mit 224 Wörtern) stammen von der **live ausgelieferten Seite**. Der Arbeitsbaum ist inzwischen deutlich weiter. Die Befunde bleiben als Begründung gültig, beschreiben aber nicht mehr den Repo-Stand.

### Fertig, aber nicht live

- `public/robots.txt` — korrigiert, nicht committet
- `src/app/llms.txt/route.ts` — existiert, aber `https://carpantier-consulting.de/llms.txt` liefert **404**

### Das offene Risiko

Zwei Stadtseiten-Sets mit sehr unterschiedlicher Substanz:

| Route | Eigene Wörter je Stadt | Modifier-Delete-Test |
|---|---|---|
| `/kaltakquise/[stadt]` | ~92, vier eigenständige Felder | **besteht** |
| `/leistungen/[stadt]` | **~26**, FAQ zu 100 % Template-Interpolation | **besteht nicht** |

Siehe Phase 6.

---

### Was die Recherche als tatsächlich wirksam ausweist

Orientierungstabelle für alle folgenden Phasen. Die Evidenzlage ist dünner, als der Markt behauptet — der Großteil kursierender GEO-Zahlen ist auf keine Primärquelle zurückführbar. **Nachweislich erfunden** `[KEINE EVIDENZ]`: „Moz fand r = 0,73 zwischen 40–60-Wort-Absätzen und Featured Snippets" (Moz hat das nie gemessen), „Tabellen werden 4,2× häufiger zitiert", „FAQ-Blöcke 2,8×", „AI Search Institute: Person-Schema 1,8×" (die Organisation existiert nicht). Was standhält:

| Hebel | Evidenz | Paket |
|---|---|---|
| **Auffindbarkeit im Abrufkorpus** | Höchstbewerteter Faktor jeder Meta-Auswertung. C-SEO Bench: Position 1 im Kontext **~7,6× wirksamer als die beste Inhaltstaktik** `[GEMESSEN]` | Phase 1 |
| **Konkrete Preise nennen** | Eines von nur **zwei** On-Page-Merkmalen mit isolierter Messwirkung `[GEMESSEN]` | AP-2.1 |
| **Wettbewerber namentlich nennen** | Das zweite. Abrufrate **19 % → 50 %** `[GEMESSEN]` | AP-2.2, AP-2.3 |
| **Vergleichs- und Bestenlisten-Format** | Zitationspräsenz: best-in-class 91,2 %, Kaufberatung 89,8 %, Vergleich 83,5 %, **Definition 80,7 % (Schlusslicht)** `[GEMESSEN]` | AP-2.3, AP-3.3 |
| **Zahlen und Definitionen in ~28-Wort-Blöcken oben im Abschnitt** | Konvergiert über vier unabhängige Studien. 64 % zitierter Passagen sind erster oder zweiter Satz ihres Abschnitts `[GEMESSEN]` | AP-3.1 |
| **Erwähnungen auf Fremdseiten** | **84 % aller KI-Zitate** stammen aus Earned Media. Pressemitteilungen 0,2 %. Fachpresse schlägt Wire-Verteilung um Faktor 2,8–4,2 `[GEMESSEN]` | Phase 5 |
| **Google Business Profile** | ChatGPT bezieht **38,0 %** seiner Quellen für deutsche lokale Empfehlungen aus Google Maps. Perplexity ~0 % — dort 30,5 % Bewertungs- und Branchenportale `[GEMESSEN, deutsch]` | AP-4.1, AP-4.2 |

Quellen: cloro AI Search Index (735 Prompts × 5 Engines) · arXiv 2506.11097 · arXiv 2605.25517 · DEJAN Grounding-Analyse · Muck Rack (>25 Mio. Links) · NeuRank (800 lokale deutsche Anfragen, 20 Städte).

---

## 3 · Phase 1 — Das Tor: Abrufbarkeit

**Vor allem anderen. Inhaltsarbeit vor diesem Tor verpufft.**

`[GEMESSEN]` Die vielzitierte GEO-Studie (arXiv 2311.09735, +41 %) hat innerhalb eines **fest vorgegebenen Abrufkorpus** gemessen — Auffindbarkeit wurde nie gemessen. Im Ende-zu-Ende-Test (SAGEO Arena) **senkte** reine Textoptimierung die Top-10-Präsenz um 16 %. `[GEMESSEN]` C-SEO Bench: Position 1 im Kontext war **~7,6× wirksamer als die beste Inhaltstaktik**.

### AP-1.0 · Postleitzahl und Geo-Koordinaten korrigieren

**Blockiert den höchstbewerteten Hebel des Projekts.**

- **Befund:** Vereinheitlicht wurde auf **50935** (Sülz/Klettenberg). Nominatim ordnet „Stammheimer Straße 123, Köln" eindeutig **50735** (Riehl/Nippes) zu, Koordinaten 50.9654857 / 6.9768817. Zusätzlich steht `geo` in `src/lib/local-seo.ts` auf 50.9375 / 6.9603 — **3,32 km vom tatsächlichen Standort entfernt**, und geht in `LocalBusiness`-JSON-LD auf jeder Stadtseite ein.
- **Vorgehen:** (1) **Nico bestätigt die Anschrift** — OSM ist ein Hinweis, keine Rechtsgrundlage. (2) PLZ und Koordinaten an **einer** Stelle korrigieren (`businessInfo`), alle Vorkommen darauf zurückführen: Impressum, Datenschutz, `layout.tsx`, `leistungen/[stadt]/page.tsx`, `chat/tool-executor.ts`. (3) `check-compliance.mjs` um NAP-Konsistenzprüfung erweitern.
- **Akzeptanz:** Genau ein PLZ-Wert im Repo, Koordinaten auf die bestätigte Anschrift, `pnpm verify` grün.
- **Warum zuerst:** `[RECHTLICH]` § 5 DDG, falsche PLZ ist abmahnfähig. `[OFFIZIELL]` Google verweigert GBP-Verifizierung bei nicht zustellbarer Adresse — **AP-4.1 hängt vollständig hieran**. Und jede Verzeichnisanmeldung zementiert eine falsche NAP weiter.

### AP-1.1 · robots.txt und llms.txt live bringen

- **Akzeptanz:** `curl -sI …/llms.txt` → `200`, `content-type: text/plain`. Kein SEO-Crawler mehr auf `Disallow`.
- **Evidenz:** `[GEMESSEN]` SEOSOON, 1.444 .de-Domains: **41,5 % der deutschen Dienstleisterseiten sperren mindestens einen KI-Bot.** Offen zu sein ist ein kostenloser struktureller Vorteil — und bei jedem Hosting- oder Cloudflare-Wechsel zu verteidigen.

### AP-1.2 · Serverseitiges Rendering der tragenden Inhalte prüfen

- **Vorgehen:** Für je eine Seite aus `/leistungen`, `/kaltakquise/[stadt]`, `/branchen/[branche]`, `/blog/[slug]` das rohe Server-HTML prüfen:
  ```bash
  curl -s -A "GPTBot" https://carpantier-consulting.de/leistungen | grep -c "Pilot\|Retainer\|pro Termin"
  ```
- **Akzeptanz:** Jeder Kerninhalt ohne JavaScript-Ausführung im HTML vorhanden.
- **Evidenz:** `[GEMESSEN]` searchVIU: **ClaudeBot, GPTBot und PerplexityBot führen kein JavaScript aus.** Bei Next.js der eine technische Punkt, der alles andere stillschweigend wertlos machen kann.

### AP-1.3 · Interne Verlinkung verifizieren statt annehmen

- **Vorgehen:** `check-internal-links.mjs` so erweitern, dass es den **Linkgraph von der Startseite aus traversiert** und unerreichbare Seiten meldet.
- **Akzeptanz:** Null unerreichbare URLs, läuft in `pnpm verify`.
- **Evidenz:** `[OFFIZIELL]` Googles Doorway-Fragenkatalog: *„Do these pages exist as an 'island?'"* — und der Branchenatlas hat genau diesen Fehler auf der Live-Seite nachgewiesen: Vereinigungsmenge aller internen Blog-Links über die gesamte Website = 12 von 52; alle vier indexierten Beiträge lagen darin, keiner der 40 Waisen.

### AP-1.4 · Sitemap-`lastmod` ehrlich machen

- **Problem:** `sitemap.ts` setzt für Startseite, `/leistungen` und alle Stadtseiten `lastModified: currentDate` — bei jedem Build „gerade eben".
- **Akzeptanz:** Kein `lastModified`, das keiner tatsächlichen inhaltlichen Änderung entspricht. Kein Datum ist besser als ein falsches.
- **Evidenz:** `[OFFIZIELL]` Helpful-Content-Warnzeichen: *„Are you changing the date of pages to make them seem fresh when the content has not substantially changed?"*

---

## 4 · Phase 2 — Die zwei gemessenen On-Page-Hebel

**Bestes Evidenz-Aufwand-Verhältnis im gesamten Projekt.** Von 27 geprüften On-Page-Merkmalen trennten genau **zwei** abgerufene von ignorierten Seiten: konkrete Preise nennen, und Wettbewerber namentlich nennen.

### AP-2.1 · Preise veröffentlichen

- **Stand:** Gefäß steht (`pricing.ts`, `Pricing.tsx`, `check-pricing.mjs`). Es fehlen **nur die Zahlen** — Geschäftsentscheidung, Abschnitt 10.
- **Vorgehen, genau in dieser Reihenfolge** (steht so im Kopf von `pricing.ts`): (1) Beträge in `priceModels` eintragen (`preis`, `preisHinweis`), (2) `PREISE_FREIGEGEBEN` auf `true`, (3) `pnpm verify`. **Das Flag allein veröffentlicht nichts** — die Trennung ist Absicht, damit ein versehentlich umgelegtes Flag keine erfundenen Zahlen live schaltet. `Offer`-Markup entsteht automatisch, sobald Beträge vorliegen. Zusätzlich: `priceRange: '€€€'` in `layout.tsx` ist ein bedeutungsloser Platzhalter — echte Spanne oder entfernen.
- **Evidenz:** `[GEMESSEN]` cloro, 249 Seiten × 27 Merkmale. `[ANBIETER]` ezgeo, 304 B2B-Unternehmen: **93,9 % der KI-Antworten über Anbieter ohne öffentliche Preise nennen trotzdem konkrete Beträge**, nur 3 % erwähnen, dass der Preis nicht öffentlich ist — *„Hiding your price doesn't remove the answer. It removes your voice from it."*
- **Marktlage** `[SERP-BEFUND]`: Von 20 geprüften Anbietern nennen **drei** einen Preis — PATT („ab ca. 2.000 €/Monat", auf allen 87 Branchenseiten), phocus-direct (~16.000 € Dreimonatspilot), SharkByte (40-Stunden-Pilot 2.000 €). PATT ist zugleich der einzige Anbieter, den die Google-KI-Übersicht **namentlich mit Preis** nennt. Marktband laut KI-Übersicht: 2.000–8.000 €/Monat bzw. ~300 €/Termin.

> **Handlungsleitend:** Die Stadt-FAQ in `src/lib/schemas.ts` stellt bereits wörtlich „Was kostet eine Vertriebsagentur in {Stadt}?" — und beantwortet sie ohne eine einzige Zahl.

### AP-2.2 · Vergleichsseiten, die Wettbewerber benennen

- **Ziel:** Mindestens drei Seiten im Vergleichsformat mit namentlich genannten Alternativen.
- **Evidenz:** `[GEMESSEN]` cloro: Seiten ohne genannten Wettbewerber wurden zu **19 %** abgerufen, mit **50 %**. Archetypen-Zitationspräsenz: best-in-class 91,2 %, Kaufberatung 89,8 %, Vergleich 83,5 %, **Definition 80,7 % (Schlusslicht)**.
- **Guardrail:** `[RECHTLICH]` § 6 UWG, vergleichende Werbung. Nur öffentlich nachprüfbare Angaben — veröffentlichte Preise, Gründungsjahr, Zertifizierungen. **Keine Bewertungen fremder Leistungsqualität.**
- **Format je Seite:** Antwortabsatz oben · Vergleichstabelle ≤5 Zeilen × 3 Spalten · je Zeile eine Zahl · serverseitig gerendert.

### AP-2.3 · Das Kosten-Cluster — vier Seiten, aus dem Branchenatlas

Der deutsche SERP zu Preisfragen wird von Agenturbeiträgen dominiert, die Preisnennung ausdrücklich ablehnen. **Das Feld ist frei** `[SERP-BEFUND]`. Hub bauen, Spokes verlinken.

| Rolle | Route | Title / H1 | Befund |
|---|---|---|---|
| **Hub** | `/leistungen/preise` | `Kaltakquise-Agentur Preise: alle Modelle im Vergleich` / `Kaltakquise-Agentur Preise: Stundensatz, Retainer, Pay-per-Lead` | Kontestiertester Teil des Clusters, aber die Klammer |
| Spoke | `/leistungen/telefonakquise-kosten` | `Telefonakquise auslagern: Kosten, Preismodelle und Break-even` / `Was kostet es, Telefonakquise auszulagern?` | Späte Kaufabsicht, **niemand beantwortet sie**. PATT rankt mit einer allgemeinen Seite und versteckt „ab ca. 2.000 €/Monat" im Fließtext |
| Spoke | `/leistungen/erfolgsprovision` | `Kaltakquise auf Erfolgsprovision: Modelle, Preise, Grenzen` / `Kaltakquise auf Erfolgsprovision — was funktioniert und was nicht` | **Die Suche lieferte fünf Treffer, keinen zum Thema** — der am wenigsten beanspruchte kommerzielle Begriff der gesamten Erhebung. Und die Frage kommt in jedem Erstgespräch. VERTRIEBWERK lehnt Erfolgsprovision öffentlich aus Qualitätsgründen ab — eine klare eigene Position ist hier der Inhalt |
| Spoke | `/leistungen/vertriebsagentur-oder-mitarbeiter` | `Vertriebsagentur oder eigener Vertriebsmitarbeiter?` / `Vertriebsagentur oder eigener Vertriebsmitarbeiter — die Rechnung` | Nur DIMARCON adressiert die Make-or-buy-Frage. **Muss die Vollkostenrechnung enthalten:** Arbeitgeberanteil, Ramp-up-Zeit, CRM/Tooling, Ausfallrisiko — bei 5, 10 und 20 Mitarbeitern |

**Alle vier erfüllen AP-2.2 gleichzeitig**, wenn sie Wettbewerber namentlich mit deren *veröffentlichten* Preisen nennen. Das ist zulässig (öffentlich nachprüfbar) und verdoppelt laut cloro die Abrufrate.

### AP-2.4 · Eine Anbieter-Vergleichsseite

- `/leistungen/vertriebsagentur-vergleich-koeln` oder ein ehrlicher `triveo Alternative`-Vergleich.
- **Befund** `[SERP-BEFUND]`: `triveo Alternative` ist unbesetzt — die deutsche Suche liefert ausschließlich triveos eigene Seiten. Geringes Volumen, geringe Kosten.
- **Heikel**, deshalb streng nach dem § 6 UWG-Guardrail oben. Im Zweifel weglassen.

---

## 5 · Phase 3 — Passagenstruktur statt Textmenge

**Keine neuen Artikel. Keine längeren Artikel.** Die 13 Beiträge und die Leistungs-, Stadt- und Branchenseiten werden auf Entnehmbarkeit umgebaut.

### AP-3.1 · Antwort-zuerst-Struktur

- **Je Abschnitt:** (1) Überschrift formuliert die reale Suchfrage in der Wortwahl der Anfrage. (2) Direkt darunter ein **eigenständiger Antwortblock von 40–80 Wörtern**, ohne Pronomen, die aus dem Block hinauszeigen. (3) Darin **mindestens eine Zahl, ein Datum oder ein benannter Fakt**. (4) Erst danach Herleitung, Beispiel, Einschränkung.
- **Akzeptanz:** `blog-audit.mjs` prüft: je H2 ein Absatz ≤80 Wörter unmittelbar nach der Überschrift; Anteil Abschnitte mit Zahl im Antwortblock wird ausgewiesen.
- **Evidenz:** `[GEMESSEN]` Portent, 30.000 Keywords: Absatz-Snippets 40–45 Wörter (ausdrücklich **Anzeigegrenze**, keine Auswahlregel). `[GEMESSEN]` NAACL 2025: feste 200-Wort-Chunks erreichten semantisches Chunking. `[ANBIETER]` MaxAEO, 3.200 zitierte Passagen: Median **28 Wörter**, **64 % erster oder zweiter Satz ihres Abschnitts** — die Autoren selbst: *„directional, not laws"*.
- **Offener Widerspruch:** MaxAEO misst für Frage-Antwort-Format 2,5-fachen Entnahmevorteil, arXiv 2604.25707 misst **−5,7 %**. Beide bleiben stehen. **Konvergent über vier Studien sind nur Zahlen und Definitionen, nach vorn gestellt** — darauf stützt sich dieses Paket, nicht auf das Frageformat.

### AP-3.2 · Zahlendichte erhöhen, ohne etwas zu erfinden

- Marktdaten mit Quelle, gesetzliche Fristen, Branchenkennzahlen, Zeitangaben aus dem eigenen Prozess. **Keine erfundenen Erfolgsquoten.**
- **Evidenz:** `[GEMESSEN]` arXiv 2604.25707, 21.143 Zitate: Statistiken **+61,6 %**, Definitionen +57,3 %, Vergleiche +55,3 %. `[GEMESSEN]` arXiv 2311.09735: „Keyword Stuffing" **−8 %, unter Basis**.

### AP-3.3 · Glossar — niedrige Priorität, mit Bedingung

- **Stand:** 15 Begriffe mit ~55-Wort-Definitionen auf **einer** URL.
- **Nur zerlegen, wenn jeder Eintrag eine Zahl, ein Datum oder einen deutschen Marktbezug bekommt**, den ein Sprachmodell nicht aus sich selbst erzeugen kann. Sonst bleibt es, wie es ist.
- **Evidenz:** `[GEMESSEN]` cloro: Definitionsanfragen sind mit 80,7 % der **schwächste** Archetyp. `[SERP-BEFUND]` Ergänzend: `BANT Methode` und `Buying Center` werden von HubSpot DE, Ryte Wiki und CRM-Anbietern gehalten — eine kleine Domain gewinnt dort nicht. **Der Branchenatlas rät von 60 Einzel-URLs ausdrücklich ab.**

---

## 6 · Phase 4 — Die Branchenachse (`AP-B`)

Neue Pakete aus dem Branchenatlas. **Eine Achse, kein Kreuzprodukt** (Abschnitt 1.4).

### AP-B1 · Die Vorlage für Branchenseiten festschreiben

Zehn Bausteine, abgeleitet aus dem, was auf den stärksten Seiten des Marktes wiederkehrt (termin-fabrik, phocus-direct, bdesales, PATT). Die zwei bestehenden Einträge in `industries.ts` daran messen und nachziehen.

| # | Baustein | Hinweis |
|---|---|---|
| 1 | **H1 mit Negativkontrast** | Stärkstes deutsches Muster im Feld. Entscheider **und** falschen Ansprechpartner nennen: „Termine mit Entscheidern, nicht mit Administratoren" |
| 2 | **Für wen wir arbeiten — und für wen nicht** | Qualifizierung direkt unter dem H1. Ausschließen macht glaubwürdiger |
| 3 | **Entscheiderblock** | Rollen aus `decisionMakers`. **Nur deutsche Titel — IT-Leitung und Geschäftsführung, nie CIO/CTO.** Die stehen auf null deutschen rankenden Seiten |
| 4 | **Anlässe, die einen Anruf rechtfertigen** | Operativer Kern **und** Rechtsanker: Der Anlass belegt die mutmaßliche Einwilligung |
| 5 | **Was am Telefon in dieser Branche anders ist** | Der Abschnitt, den fast niemand hat. Inklusive Anrufzeitfenster, wo sie real sind |
| 6 | **Terminkriterien** | Wörtliche Definition, was als gelieferter Termin zählt, mit Beispiel. Hier schlägt Präzision Volumen |
| 7 | **Ablauf in 4–6 Schritten** | Bestehende `Process`-Komponente wiederverwenden |
| 8 | **Branchen-FAQ mit echten Einwänden** | **Sichtbarer Text ist Pflicht, Schema ist Hygiene** (Abschnitt 1.2). Echte Einwände: „Unsere Anlagen kosten sechsstellig. Entscheidet das jemand nach einem Anruf?" |
| 9 | **§ 7 UWG für diese Branche** | `[SERP-BEFUND]` Der klarste Inhaltsvorsprung: PATT und TEAMWORK — die beiden Anbieter im wichtigsten Zielsegment — führen dazu **nichts**; PATT nennt nur DSGVO |
| 10 | **Weitere Branchen** | Quervernetzung. Kein deutscher Anbieter hat sie — und genau dieser Block verhindert Waisenseiten |

- **Akzeptanz:** `check-content-duplication.mjs` grün; kein Textbaustein wörtlich aus einer anderen Branchen-, Stadt- oder Leistungsseite (Regel steht bereits im Kopf von `industries.ts`).

### AP-B2 · Substanztest statt Wortzahl

Ersetzt das gestrichene 900-Wörter-Kriterium (Abschnitt 1.1). Eine Branchenseite ist substanzhaltig, wenn sie **alle vier** erfüllt:

1. **Modifier-Delete-Test:** Branchennamen aus dem gerenderten Text streichen — bleibt ein austauschbares Template übrig, hat die Seite keinen eigenen Wert.
2. **Mindestens drei branchenspezifische Fakten**, die nicht aus der Vorlage interpolierbar sind: namentliche Entscheiderrollen, echte Anlässe, echte Zeitfenster, echte Einwände.
3. **Mindestens eine überprüfbare Zahl** mit Quelle oder eigener Herkunft.
4. **Das Branchenvokabular ist getroffen** — die Branche in ihren eigenen Worten (siehe AP-B3).

`[OFFIZIELL]` Quality Rater Guidelines §3.2, der Satz, der programmatische Arbeit legitimiert: *„**Effort may go into designing page functionality or building systems that power a webpage.**"* Deshalb überleben Zapier und Wise — dort erzeugt das **System** den Wert je Seite.

### AP-B3 · Branchen ausbauen — sechs statt sechzig

**Nicos Kapazität (fünf Kunden pro Monat) ist das bindende Limit, nicht der Suchraum.** `[SERP-BEFUND]` PATT hält 87 Branchenseiten, triveo 6 — die Breite ist nicht der Wettbewerbsvorteil, die Tiefe ist es.

**Je Seite ist ein echtes Gespräch Voraussetzung** (Nico oder ein Betrieb der Branche). Ohne das entsteht wieder eine Hülle.

| Prio | Slug | Title / H1 | Befund |
|---|---|---|---|
| **fertig** | `personaldienstleister` | — bestehend, gegen AP-B1/B2 nachziehen | **Das Flaggschiff.** `[SERP-BEFUND]` „Vertriebsagentur für Personaldienstleister" hat eine **invertierte SERP** — alle Treffer sind Personaldienstleister, die Vertriebler suchen. PATT hat nur die Standardvorlage (mit Textfehler „Personalleasingung"), TEAMWORK die Exact-Match-Domain mit dünner Seite ohne Preise, Belege und Rechtsteil. **Niemand beansprucht Operator-Glaubwürdigkeit** — Nicos Recruiting-Herkunft ist das einzige nicht kopierbare Asset. Vokabular: **Kundenakquise** (nicht Neukundengewinnung), **Vertriebsdisponent**, Überlassung, Personalbedarf, Rahmenvertrag |
| **fertig** | `it-systemhaeuser` | — bestehend, nachziehen | `[SERP-BEFUND]` „Vertriebsagentur IT-Branche" ist hart (DIMARCON, triveo, MarketDialog, Doppelweiss). Eine Ebene tiefer frei: **das Wort „Systemhaus" trägt keine rankende Seite im Titel** — TerminFabrik und LetterHouse weichen auf „IT-Dienstleister" aus. Anti-Ziel: Administrator |
| 3 | `saas-software` | `Vertriebsoutsourcing für SaaS-Anbieter – externer Vertrieb ab Tag 1` / `…: ein externes Sales-Team, das Ihre Demo-Termine füllt` | Nur **generische** Outsourcing-Seiten ranken. Eine SaaS-spezifische schlägt sie über Relevanz. Anti-Ziel: Anwender |
| 4 | `bildungstraeger` | `Kaltakquise für Bildungsträger & Weiterbildungsanbieter` / `…: Firmenkunden für Ihre Weiterbildungen gewinnen` | **Objektiv weichste SERP der Erhebung:** besteht vollständig aus *Seminaren über Kaltakquise*. Entscheider: Personalleiter, Personalentwickler, Ausbildungsleiter |
| 5 | `textilservice` | `Kaltakquise für Textilservice & Mietwäsche – Firmenkunden-Termine` / `Neukundengewinnung für Textilservice und Berufskleidung` | Die rankenden Domains **sind die Zielkunden** (dbl.de, bardusch.com). PATT hat „Textilhandel", nicht Textilservice. Vertragsgeschäft mit Laufzeit |
| 6 | `dentallabor` ⚠ | `Neukundengewinnung für Dentallabore – neue Zahnarztpraxen gewinnen` / `Wir gewinnen neue Praxen für Ihr Dentallabor` | Fachpresse benennt Schmerz und Kanal wörtlich. **⚠ Aber: das Leiturteil zur Kaltakquise-Rechtslage betrifft genau diese Anrufbewegung — siehe AP-B5. Rechtsteil zuerst oder Branche zurückstellen.** |

**Zweite Welle, erst nach Indexierungsnachweis** (je mit echtem Gespräch): `lohnfertigung-zerspanung` · `verpackung` · `landtechnik` (einzige der 120 Anfragen mit **null** Akquise-Anbietern) · `malerbetrieb-gewerblich` (nur gewerblich — privat ist B2C) · `geruestbau` (dünnste gemessene SERP, ein Forenbeitrag rankt) · `klima-kaeltetechnik` (PATT *hat* eine Seite, sie rankt nicht — schlagbar) · `wirtschaftspruefer` · `architekturbuero`.

**Nicht bauen, obwohl im ICP:** `unternehmensberatung` und `agenturen` sind **hart** (PATT und Skavio halten dedizierte Seiten). Erst mit zwei zitierfähigen Fällen.

### AP-B4 · Die Begriffsachse — Leistungsseiten mit freiem Feld

`[SERP-BEFUND]` Kopfbegriffe sind vergeben (`kaltakquise agentur`, `b2b telefonakquise agentur`, `vertrieb auslagern`, `vertriebsoutsourcing b2b` — triveo, DIMARCON, PATT, alivello). Diese drei Hintertüren sind es nicht:

| Route | Title / H1 | Befund |
|---|---|---|
| `/leistungen/messeterminierung` | `Messeterminierung B2B – Standtermine mit Entscheidern vorab vereinbaren` / `Messeterminierung: Ihr Messestand ist ausgebucht, bevor die Messe beginnt` | **Höchste Überzeugung.** Die SERP ist kaputt — sie liefert Messe**bau**-Agenturen und Messe-Hostess-Stellenanzeigen. Kein Akquise-Anbieter besetzt den Begriff. Und die **Koelnmesse liegt vor der Haustür**. ⚠ **Jeder Titel und H1 muss „Telefon" oder „Termine" tragen**, sonst liefert Google weiter Standbauer. Vor der Frühjahrs-Messesaison ausliefern |
| `/leistungen/terminierungsagentur` | `Terminierungsagentur B2B – qualifizierte Entscheidertermine aus Köln` / `Terminierungsagentur für den B2B-Vertrieb` | Exact-Match-Hintertür: triveo, DIMARCON und BDE ranken im Cluster über *„B2B Terminierung"* — **das Kompositum „Terminierungsagentur" trägt keine Seite im gesamten Trefferraum im Titel** |
| `/leistungen/bestandskundenreaktivierung` | `Bestandskundenreaktivierung B2B – inaktive Kunden telefonisch zurückholen` / `…: Der günstigste Umsatz liegt in Ihrem eigenen CRM` | **Kein nationaler Anbieter im Cluster** — triveo, DIMARCON, PATT und alivello fehlen vollständig |

⚠ **Vor dem Bau Volumen prüfen:** `angebotsnachverfolgung` und `kundenrueckgewinnung` waren die reinsten Lücken der Erhebung, sind aber vermutlich weich, **weil kaum jemand danach sucht**. Der Erhebung stand kein Volumenwerkzeug zur Verfügung. Bei geringem Volumen als Stützseiten ins Kosten-Cluster hängen, nicht als eigene Einstiegsseiten.

### AP-B5 · Rechtsabschnitt — und die Dentallabor-Warnung

- **Der Hebel** `[RECHTLICH]`, **Zitat am 12.09.2026 gegen dejure.org geprüft:** **BVerwG, Urteil vom 29.01.2025, Az. 6 C 3.23**. Instanzenzug VG Saarlouis → OVG Saarland → BVerwG, referenziert EuGH C-21/23. Kernaussage: Öffentlich verfügbare geschäftliche Rufnummern begründen für sich genommen **kein** berechtigtes Interesse für Werbeanrufe. Viele derzeit rankende deutsche Seiten beschreiben noch den Stand davor — **sie sind veraltet und verdrängbar**.
- ⚠ **Das Urteil betrifft Telefonwerbung gegenüber *Zahnarztpraxen* unter Nutzung öffentlich zugänglicher Kontaktdaten** — also exakt die Anrufbewegung, die `/branchen/dentallabor` verkaufen würde. Das macht die Branche nicht unmöglich, aber sie ist die **einzige der sechs, deren Akquisepraxis höchstrichterlich adressiert ist**. Entweder Baustein 9 für diese Seite zuerst schreiben und freigeben lassen, oder die Seite in die zweite Welle schieben.
- **Bedingungen fürs Ausliefern:** Die Lesart, dass mutmaßliche Einwilligung allein nicht mehr genügt, **ist umstritten** — als Entwicklungsrichtung darstellen, nie als gesicherte Rechtslage. § 7 Abs. 1 / Abs. 2 Nr. 1 / Abs. 3 UWG und Art. 6 Abs. 1 lit. f DSGVO präzise zitieren. Namentlicher Autor, Datum, Stand-Vermerk. **Kein Bußgeldbetrag.** **Keine Veröffentlichung ohne anwaltliche Freigabe.** Bestehendes „Kein Rechtsrat"-Muster aus `/glossar` übernehmen.

### AP-B6 · Die Sperrliste ins Prüfskript

Zwölf Suchbegriffe, die gewinnbar aussehen und es nicht sind. Als Kommentarblock in `industries.ts` **und** als Negativliste in `check-content-duplication.mjs` oder einem eigenen `check-forbidden-targets.mjs`, damit sie nicht in sechs Monaten erneut vorgeschlagen werden.

**Intent-Fallen** — Google löst den Begriff anders auf:
`Terminvereinbarung Anlagenbau` → Projektterminplanung (stattdessen „Entscheider-Termine im Anlagenbau") · `Leadgenerierung Automatisierungstechnik` → *automatisierte* Leadgenerierung (stattdessen „Kaltakquise Automatisierungstechnik") · `Terminvereinbarung Facility Management` → Buchungssoftware · `Telefonakquise Cloud Anbieter` → Telefonanlagen · `Terminvereinbarung IT-Systemhaus` → deren eigene Buchungsseiten · `Kaltakquise für CRM Berater` → CRM-Software · `Büroausstattung Firmenkunden` → Kaiserkraft/Bechtle/IKEA · `Werbemittel B2B` → invertiert, der Suchende kauft Giveaways.

**B2C im B2B-Kostüm** — die Anrufe gingen an Privathaushalte, nach § 7 UWG ohne Einwilligung unzulässig:
`Wärmepumpe B2B` · `Garten- und Landschaftsbau` · `Photovoltaik` unqualifiziert (nur Gewerbedach/Industriehallen/Freiflächen/Kommunen, und selbst dann hart) · `Pflegedienste` (weiche SERP, schwacher Käufer: Seminare und Coaching ranken, dazu Heilmittelwerberecht).

> **Die Faustregel, die es wert ist, behalten zu werden:** Die überfüllten Keywords sind überfüllt, **weil** sie B2C sind. Die Lead-Broker-Industrie hat in echten B2B-Gewerken nichts zu verkaufen — **man kann einem Gerüstbauer keinen Hausbesitzer-Lead verkaufen.** Deshalb kamen die sauber-B2B-Branchen als weich zurück.

**Jobsuche-Kontamination** — der Suchende will Arbeit, keinen Dienstleister:
`Vertriebsmitarbeiter auf Zeit mieten` · `Vertriebspartner … gesucht` („gesucht" invertiert die Richtung) · `Technischer Vertrieb Maschinenbau` ohne „auslagern" · `Rent a Salesman` (eingetragene Marke) · `Interim Sales Manager` (fremde Branche, angebotsseitig).

---

## 7 · Phase 5 — Off-Page: der 84-Prozent-Kanal

**Der ehrlichste Befund: Der größte Hebel liegt nicht auf dieser Website.**

`[GEMESSEN]` Muck Rack, >25 Mio. zitierte Links, 17 Branchen: **Earned Media = 84 % aller KI-Zitate.** Bezahlt/Advertorial 0,3 %. Pressemitteilungen 0,2 %.

### AP-4.1 · Google Business Profile

- **Höchster gemessener Einzelhebel. Braucht Nico. Setzt AP-1.0 voraus.**
- `[GEMESSEN, deutsch]` NeuRank, 800 lokale Anfragen, 20 deutsche Städte: ChatGPT bezieht **38,0 %** seiner Quellen für lokale Empfehlungen aus **Google Maps**. Ohne GBP ist die Firma von gut einem Drittel der Abruffläche strukturell ausgeschlossen.
- **Perplexity nutzt Google Maps zu ~0 %** und zu **30,5 %** Bewertungs- und Branchenportale. **Die Engines laufen auf verschiedenen Substraten — GBP und Portale ersetzen einander nicht.**
- `[SERP-BEFUND]` Zusätzliche Dringlichkeit: Ohne GBP schlägt Google bei der Markensuche die fremde *Carpentier Consulting GmbH* (Gau-Weinheim) vor. Im Kölner Local Pack gewinnt AS Concepts mit 4,9 ★ aus 52 Bewertungen.
- `docs/GOOGLE_BUSINESS_SETUP.md` existiert bereits — dort weiterarbeiten, nicht doppeln.

### AP-4.2 · Portale — nach Zweck getrennt, fünf gute statt fünfzig

Siehe Korrektur 1.5. **Zwei getrennte Ziele, nicht vermischen:**

| Ziel | Portale | Begründung |
|---|---|---|
| **KI-Zitate** | **wlw.de** — einziges deutsches B2B-Verzeichnis, das GPTBot, OAI-SearchBot, ChatGPT-User und PerplexityBot in robots.txt **ausdrücklich erlaubt** · **OMR Reviews** — erlaubt `/*/reviews/`, in der blinq-DACH-Studie in den Top-Quellen für Google AI Overviews und Perplexity | `[GEMESSEN]` Die einzigen beiden mit Zitationsnachweis |
| **Klassische Suche + Referral** | **Sortlist** (Kategorie Vertrieb Köln, 42 Agenturen), **ProvenExpert** | `[SERP-BEFUND]` Sortlist steht in **13 von 29** gemessenen SERPs und wird von der Google-KI-Übersicht als Vergleichsquelle empfohlen; Carpantier fehlt auf der Kölner Seite. `[KEINE EVIDENZ]` für KI-Zitate |
| **Nicht verfolgen** | drweb.de | Legt offen, Provision zu erhalten **und Brand Mentions zu verkaufen** — bezahlte Platzierung, und bezahlt ist 0,3 % der Zitate |

- `[ANBIETER]` Peec AI, ~200.000 KI-Antworten: Platz 1 in einer **häufig abgerufenen Fremd-Vergleichsliste** = +16,5 Prozentpunkte Sichtbarkeit (B2B-SaaS). **Sättigung nach wenigen Platzierungen.** Gilt nur für Listen, die tatsächlich häufig abgerufen werden; Peec verkauft KI-Sichtbarkeits-Monitoring.
- `[SERP-BEFUND]` Das löst zugleich die beiden Anfragen mit der höchsten Kaufabsicht im Datensatz — `kaltakquise agentur erfahrungen` und `vertriebsagentur vergleich` —, die mit einer eigenen Seite **strukturell** nicht erreichbar sind, weil das gewinnende Format ein Drittvergleich ist.

### AP-4.3 · Fachpresse statt Pressemitteilung

- `[GEMESSEN]` Fachpublikationen erzeugen **2,8–4,2× mehr Zitate als Wire-Aufgriffe** derselben Meldung.
- `[SERP-BEFUND]` Konkreter offener Kanal: **marketing-boerse.de** veröffentlicht bylined Fachbeiträge von triveo **und** alivello — in mindestens einem Fall denselben Text unter beiden Namen. Carpantier kommt dort nicht vor.

### AP-4.4 · LinkedIn unter Nicos Namen, nicht als Unternehmensseite

- Öffentliche Beiträge und Pulse-Artikel unter `Nico-Luca Carpantier`, 500–2.000 Wörter, Wissensformat.
- `[GEMESSEN]` Profound: **Profil-Zitate fielen von 33,9 % auf 14,5 %**, während Beiträge und Artikel stiegen — LinkedIns robots.txt sperrt `/profile/`. ChatGPT und Google AI Mode zitieren zu 59 % Einzelpersonen statt Unternehmensseiten.
- **Dämpfer:** In der deutschen B2B-Beschaffungsmessung lag LinkedIn nur auf **Rang 52**.
- `[RECHTLICH]` Erinnerung: LinkedIn-**DM** zur Kaltakquise bleibt nach § 7 UWG tabu. Beiträge sind kein Direktkontakt.

### AP-4.5 · Ein wiederkehrender eigener Benchmark

- „Terminquote in der B2B-Telefonakquise nach Branche, n = X Kampagnen", jährlich aktualisiert, **stabile URL**.
- **Aufbau:** Ergebnis in den ersten 30 % der Seite · Methodik im abgesetzten Kasten (Stichprobe, Zeitraum, Messgröße, Verfahren) · ausdrücklicher Vergleich benannter Optionen.
- `[GEMESSEN]` Gauge/Growth Memo, 301 Seiten, 1.075 Zitate: Primärforschung war 2,7 % der Seiten, erhielt 8,4 % der Zitate — **3,3-fache Zitationsdichte**. **75 von 90 Zitaten entfielen auf ein einziges Format:** Benchmarks, die eine „Welches ist das beste"-Frage direkt beantworten.
- `[SERP-BEFUND]` Der Markt ist dafür offen: Bei `wie viele Termine pro Woche realistisch` widersprechen sich die Quellen um eine Größenordnung („1 pro Woche" gegen „3–9 pro Tag"), und der Datenführer bei `Kaltakquise Erfolgsquote` ist eine **übersetzte US-Seite**. **Auch die enttäuschenden Zahlen veröffentlichen** — das macht die Seite zitierfähig statt werblich.
- **Braucht Nico.** Ohne echte Kampagnenzahlen entsteht hier nichts.

---

## 8 · Phase 6 — Risiko zurückbauen: die dünnen Stadtseiten

**Das einzige echte Abstrafungsrisiko im Projekt.**

`[OFFIZIELL]` Spam-Policies, Stand 28.08.2026, Abschnitt heißt inzwischen **„Doorway abuse"**:

> - **Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page**
> - **Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy**

**Durchsetzungsunterschied, wichtig für die Einordnung:** Es gibt **keine Manual Action namens „Scaled content abuse"**. Doorways fallen unter *„Thin content with little or no added value"* — überlebbar und begrenzt. Scaled content abuse fällt unter *„Major spam problems"* — typischerweise vollständige Deindexierung. Eine Ein-Mann-Agentur mit begrenzten Stadtseiten liegt auf der **Doorway-Seite** dieser Karte.

### Es gibt keine Schwellenwerte — und das ist wichtig

Spam-Policies, Helpful-Content-Dokument, Core-Updates-Dokument, die März-2024-Ankündigung, der Doorway-Beitrag von 2015, die Manual-Actions-Dokumentation und die vollständigen Quality Rater Guidelines (Sept. 2025) wurden durchsucht. **Google veröffentlicht keine einzige Zahl** — keine Seitenzahl, keinen Prozentsatz einzigartigen Inhalts, keine Wortzahl, kein Template-Verhältnis.

Frei erfunden, kursieren aber als Regel `[KEINE EVIDENZ]`: „500–800 Wörter einzigartig je Seite" · „60–70 % je Seite einzigartig halten" · „unter 100 programmatische Seiten ist sicher" · „30 % Template / 70 % einzigartig".

> **Das gilt ausdrücklich auch als Ersatz für die gestrichene 900-Wörter-Regel** (Abschnitt 1.1). Wer eine Zahl braucht, um sich sicher zu fühlen, erfindet sie. Der einzige belastbare Test ist qualitativ: **Modifier-Delete** — Stadt- oder Branchennamen streichen; bleibt ein austauschbares Template übrig, hat die Seite keinen eigenen Wert, unabhängig von ihrer Wortzahl.

### AP-5.1 · `/leistungen/[stadt]` auf Substanz heben oder zusammenführen

1. `/leistungen/[stadt]` auf das Niveau von `/kaltakquise/[stadt]` heben — `cities.ts` um die Felder ergänzen, die `city-acquisition.ts` vormacht (~92 eigene Wörter, echte Erreichbarkeitsfenster, Leitbranchen, Entscheidungswege). **Oder:** die 15 Seiten zusammenführen und auf `/kaltakquise/[stadt]` umleiten.
2. Template-FAQ in `getCityFAQs` auflösen — sechs Fragen, die sich ausschließlich durch `${city.name}` unterscheiden, sind wörtlich *„substantially similar pages"*.
3. **Modifier-Delete-Test als Prüfskript:** Stadtnamen aus dem gerenderten Text entfernen, verbleibende Texte paarweise vergleichen, über Schwellwert bricht der Build.
- **Akzeptanz:** `check-content-duplication.mjs` um den Test erweitert, in `pnpm verify`, null Seitenpaare über Schwellwert.
- `[OFFIZIELL]` John Mueller: *„If you don't have unique information to add to a page other than a city-name, then I'd fold those pages together and instead make a single (or few) really strong pages instead."*

### AP-5.2 · Geo-Ausbau — erst nach AP-5.1, und nur einachsig

`[SERP-BEFUND]` Kandidaten nach SERP-Weichheit × realer B2B-Dichte × Erreichbarkeit von Köln:

| Stadt | Befund |
|---|---|
| **Wuppertal** | Ein lokaler Wettbewerber, sonst Verzeichnisfüllung. Bergisches Land, 40 min von Köln, keine SharkByte-Seite |
| **Mönchengladbach** | Weichste gemessene Stadt-SERP — eine Facebook-Seite und der Wikipedia-Artikel zu Borussia ranken. Krefeld und Viersen in `nearbyAreas` |
| **Aachen** | Null Vertriebsagentur-Seiten. RWTH-Ausgründungen = Firmen mit Produkt und ohne Vertriebsfunktion |
| **Münster** | Eine *Münchner* Domain rankt dort auf Wortähnlichkeit |
| Bielefeld/OWL | ⚠ Braucht explizite B2B-Kaltakquise-Rahmung — lokal driftet „Vertriebsagentur" zur Handelsvertretung |
| Mannheim | ⚠ **triveos Heimat.** Zuletzt, wenn überhaupt |

**Erst messen, dann bauen:** SharkByte betreibt exakt fünf Stadtseiten (Köln, Essen, Dortmund, Duisburg, Bochum — aus deren Sitemap verifiziert). Wie die bestehenden Essen- und Dortmund-Seiten gegen SharkByte stehen, entscheidet über Duisburg und Bochum.

**Günstiger als jede neue Stadt:** `[SERP-BEFUND]` Frankfurt, Berlin und Hamburg existieren bereits, verlieren aber `kaltakquise agentur [stadt]` an **nationale** Seiten, die dort mangels lokaler Alternative ranken. Das ist Keyword-Abdeckung auf gebauten Seiten.

---

## 9 · Phase 7 — Messung

**Erwartung ehrlich halten:** Indexierung reagiert in Wochen. Ein Vergleich unmittelbar nach dem Deployment misst nichts.

`[GEMESSEN]` **45,5 % der Zitate in AI Overviews wechseln zwischen zwei aufeinanderfolgenden Aktualisierungen**; Inhalte verschieben sich im Schnitt alle 2,15 Tage. **Alles unterhalb von ~45 % Veränderung liegt im Rauschen.** Einzelbeobachtungen („wir wurden zitiert") sind kein Beleg.

`[GEMESSEN]` SISTRIX nach dem GPT-5.5-Rollout Mai 2026: **47 % der Domainverteilung in deutschsprachigen ChatGPT-Antworten änderten sich binnen 48 Stunden** — gegen 1–2 % normale Monatsschwankung. Plattformspezifische Optimierung hat eine kurze Halbwertszeit. Belastbar sind Abrufbarkeit, Verlinkung und Preistransparenz.

```
# Klassisch, google.de, hl=de, gl=de, Standort Köln, Personalisierung aus
vertriebsagentur köln · frankfurt · düsseldorf
kaltakquise agentur köln · telefonakquise agentur köln
vertrieb auslagern · was kostet eine vertriebsagentur
kaltakquise personaldienstleister · kaltakquise it-systemhaus · messeterminierung
site:carpantier-consulting.de · site:carpantier-consulting.de/blog

# Generativ, je Engine getrennt protokollieren
ChatGPT:    "Welche Vertriebsagentur in Köln für B2B-Telefonakquise?"
Perplexity: "Vertriebsagentur Köln Kaltakquise Kosten"
Google AIO: "vertriebsagentur kosten"
```

**Getrennt auswerten.** ChatGPT (Google Maps, 38 %) und Perplexity (Portale, 30,5 %) laufen auf verschiedenen Substraten; eine gemeinsame Kennzahl verdeckt genau den Unterschied, der die Maßnahmen steuert.

### Prüfpunkt nach Phase 4

Der Branchenatlas setzt hier ein **Tor**, und es bleibt bestehen: Sind die neuen Branchen- und Leistungsseiten indexiert? Search Console → Seiten, „Gecrawlt – zurzeit nicht indexiert" gegen „Gefunden – zurzeit nicht indexiert" unterscheiden. **Wenn nein, wird die zweite Welle nicht gebaut**, sondern die Ursache behoben.

### Bericht

`docs/revision-<datum>.md`: was umgesetzt wurde, was nicht und warum, was an Nicos Input hängt, welche Messwerte sich verändert haben, welche Annahmen sich als falsch erwiesen haben.

---

## 10 · Was von Nico kommen muss

`docs/aufgaben-nico.md` existiert bereits — dort pflegen, nicht doppeln.

| Was | Warum es nicht anders geht | Blockiert |
|---|---|---|
| **Anschrift bestätigen — PLZ 50735 oder 50935?** | **Dringendster Punkt.** Repo steht auf 50935, OSM ordnet „Stammheimer Straße 123" eindeutig 50735 zu. Falsche PLZ ist abmahnfähig und verhindert die GBP-Verifizierung | AP-1.0, AP-4.1, AP-4.2 |
| **Google Business Profile anlegen und verifizieren** | 38 % der ChatGPT-Abruffläche für lokale deutsche Anfragen | AP-4.1 |
| **Preisentscheidung** — Fixpreis, Tagessatz oder Preis pro Termin? | Geschäftsentscheidung. Marktband 2.000–8.000 €/Monat bzw. ~300 €/Termin | AP-2.1, **AP-2.3 komplett** |
| **Position zur Erfolgsprovision** | Die Seite ist als Absicherung wertlos — sie braucht eine klare eigene Haltung | AP-2.3 |
| **Kampagnendaten**: Wählversuche → Entscheider erreicht → Termin → Erscheinungsquote, mit Stichprobe | Der 3,3-fach-Hebel der Primärforschung entsteht nur aus echten Zahlen. **Das einzige Asset, das kein Wettbewerber kopieren kann** | AP-4.5, AP-3.2 |
| **2–3 echte Fallstudien mit Zahlen** | `case-studies.ts` steht, braucht reale Werte. Anonymisiert reicht | `/referenzen`, AP-4.5 |
| **Branchenmaterial**: je ein echtes Gespräch pro geplanter Branchenseite | Ohne das wird jede Seite eine Hülle und AP-B2 schlägt fehl | AP-B3 |
| **Bewertungen einsammeln** | Ohne echte Bewertungen kein Markup (§ 5 UWG, Build-Gate) | Portalprofile |
| **Profile bei wlw, OMR Reviews, Sortlist** | Verlangen Firmendaten und Identitätsnachweis | AP-4.2 |
| **Echtes Foto** | Bei einer Ein-Mann-Agentur ist der Gründer das Einzige, was der Käufer beurteilen kann | E-E-A-T |
| **Anwalt für die Rechtsseiten** | Wer gibt frei, bis wann? | AP-B5 |
| **Du oder Sie** | Site siezt, 12 von 13 Aufnahmen duzen. Neue Seiten folgen der Site, bis Nico entscheidet | alle Texte |
| **Search-Console-Zugang** | Ohne ihn ist jede Indexierungsaussage eine Vermutung | Phase 7 |

---

## 11 · Was ausdrücklich nicht getan wird

| Nicht tun | Grund |
|---|---|
| **Kreuzprodukt Branche × Stadt** | Abschnitt 1.4 — Mueller Sept. 2026, Schaden ist seitenweit und dauerhaft |
| Artikel verlängern, um eine Wortzahl zu erreichen | `[OFFIZIELL]` *„(No, we don't.)"*; Grounding-Abdeckung fällt jenseits ~1.500 Wörtern von 61 % auf 13 % |
| Weiteres Schema ergänzen | `[GEMESSEN]` DiD-Test: kein Uplift, AI Overviews −4,6 %; JSON-LD wird von 0 von 5 Systemen beim Abruf gelesen |
| FAQPage als Zitationstaktik behandeln | `[OFFIZIELL]` Rich Result seit 07.05.2026 abgeschaltet |
| Glossar in 60 Einzel-URLs zerlegen | `[GEMESSEN]` schwächster Archetyp; `[SERP-BEFUND]` HubSpot DE und Ryte halten die Begriffe |
| `speakable` implementieren | `[OFFIZIELL]` Beta, nur US-englische Publisher |
| `ItemList`/Carousel ausbauen | `[OFFIZIELL]` nur mit Course/Movie/Recipe/Restaurant zulässig |
| `ProfessionalService` verwenden | `[OFFIZIELL]` auf Vokabularebene deprecated — korrekt sind `LocalBusiness` + `Organization` |
| llms.txt weiter pflegen | `[GEMESSEN]` 97 % der Dateien erhielten null Anfragen |
| Reddit bespielen | `[GEMESSEN]` 14,55 % deutscher Gesamtzitate, aber **1,1 %** in deutschen B2B-Beschaffungsantworten |
| Wikipedia-Artikel anstreben | Relevanzkriterien ≥1.000 Mitarbeiter oder >100 Mio. € Umsatz; ein Versuch erzeugt einen dauerhaften Löschdiskussions-Eintrag |
| Pressemitteilungen verteilen | `[GEMESSEN]` 0,2 % aller Zitate |
| drweb.de-Eintrag verfolgen | Verkauft Brand Mentions; bezahlt = 0,3 % der Zitate |
| Die zwölf Begriffe der Sperrliste | AP-B6 |

---

## 12 · Reihenfolge in einem Satz

Zuerst die Anschrift klären, weil eine falsche PLZ das Business Profile blockiert und sich über jede Verzeichnisanmeldung weiter verbreitet (AP-1.0) · dann live bringen, was fertig ist (AP-1.1) · dann sicherstellen, dass Crawler alles ohne JavaScript sehen und nichts verwaist ist (AP-1.2 bis AP-1.4) · dann die zwei gemessenen Hebel setzen, Preis und Wettbewerbernennung, und dabei das Kosten-Cluster bauen (Phase 2) · dann die vorhandenen Texte auf Entnehmbarkeit umbauen, ohne sie zu verlängern (Phase 3) · dann die Branchenachse auf sechs tiefe Seiten bringen, je mit echtem Gespräch, ohne Kreuzprodukt (Phase 4) · parallel dazu das, was nicht auf dieser Website liegt, weil es 84 % ausmacht (Phase 5) · und das Doorway-Risiko der dünnen `/leistungen/[stadt]`-Seiten zurückbauen, bevor neue Städte dazukommen (Phase 6).

---

## Anhang · Grenzen der Branchenatlas-Befunde

Alles mit `[SERP-BEFUND]` markierte stammt aus der Erhebung vom 12.09.2026 und trägt diese Einschränkungen:

- **Kein Suchvolumen.** Jede Bewertung beruht auf der *Zusammensetzung* der Trefferliste — wer rankt, mit welchem Seitentyp. Belastbares Wettbewerbssignal, **kein Nachfragesignal**. Mehrere „weiche" Begriffe sind vermutlich weich, weil kaum gesucht.
- **Die Suche war US-lokalisiert** und lieferte Trefferlisten ohne Positionen, ohne Anzeigen, ohne „Ähnliche Fragen", ohne Local Pack. AT/CH-Domains mischen sich ein — der deutsche Wettbewerb ist eher etwas **stärker** als dargestellt. **Alles Budgetrelevante vor Umsetzung an einem echten google.de mit Kölner IP gegenprüfen.**
- **Wettbewerber-Angaben sind Eigenangaben**, nicht unabhängig geprüft.
- **Direkt gemessen und reproduzierbar** sind dagegen: PATTs 87 Branchenseiten (Sitemap), SharkBytes 5 Stadtseiten (Sitemap), die 15 Branche×Stadt-Seiten von diekaltakquiseagentur inklusive Lorem ipsum (Stichprobe 3/3), sowie der interne Linkgraph der Live-Seite (52 Beitragsseiten plus 7 Hub-Seiten abgerufen, Vereinigungsmenge 12).
- **Das BVerwG-Zitat wurde am 12.09.2026 gegen dejure.org geprüft** und bestätigt.
