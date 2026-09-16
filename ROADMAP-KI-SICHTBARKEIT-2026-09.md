# Roadmap: Sichtbarkeit in klassischer und generativer Suche

**Erstellt:** 11.09.2026, 23:58 CEST
**Grundlage:** Recherche zu GEO/AEO-Evidenzlage 2026 (vier parallele Rechercheläufe, ~90 Quellen) + Code-Analyse des Repos
**Vorgänger:** `AUFTRAG-SICHTBARKEIT-2026-09.md` — **weitgehend abgearbeitet**, siehe Abschnitt 1
**Repo:** `C:\Users\damja\WebstormProjects\Nico Luca Carpantier` · Branch `main`

---

## 0 · An die Session, die das übernimmt

1. **Lies Abschnitt 1 und 2 zuerst.** Abschnitt 1 sagt dir, was schon erledigt ist — der alte Auftrag ist nicht mehr der Arbeitsstand. Abschnitt 2 korrigiert drei Annahmen, die im alten Auftrag noch drinstehen und durch Messdaten widerlegt sind.
2. **Die Phasen sind eine Abhängigkeitskette, keine Prioritätenliste.** Phase 1 ist ein Tor: Inhaltsarbeit vor Phase 1 ist Arbeit hinter einer verschlossenen Tür.
3. **Jedes Paket hat Ziel, Vorgehen, Akzeptanz, Prüfbefehl und Evidenzgrad.** Fertig ist ein Paket, wenn der Prüfbefehl grün ist.
4. **Abschnitt 3 von `AUFTRAG-SICHTBARKEIT-2026-09.md` gilt unverändert weiter.** Die acht Guardrails dort sind nicht verhandelbar und werden hier nicht wiederholt.
5. **Was du nicht entscheiden kannst, entscheidest du nicht.** Abschnitt 6 trennt Code-Arbeit von Nicos Input.
6. **Nicht committen, nicht deployen ohne Freigabe.** Arbeiten, `pnpm verify` grün melden, berichten.

### Evidenzgrade in diesem Dokument

| Tag | Bedeutung |
|---|---|
| `[GEMESSEN]` | Peer-Review **oder** große Stichprobe mit offengelegter Methodik und Kontrollgruppe. Schließt Anbieterstudien ein, wenn Stichprobe, Zeitraum und Verfahren nachvollziehbar sind |
| `[ANBIETER]` | Anbieterdaten ohne Kontrollgruppe, rein beobachtend, oder mit direktem Verkaufsinteresse am Ergebnis |
| `[OFFIZIELL]` | Google-/Plattform-Dokumentation, wörtlich zitiert und gegen die Primärquelle geprüft |
| `[RECHTLICH]` | Gesetzeslage, keine Messung |
| `[KEINE EVIDENZ]` | Verbreitete Behauptung ohne auffindbare Primärquelle |

**Alle wörtlichen Zitate in diesem Dokument wurden am 12.09.2026 gegen die Primärquelle geprüft** (Google-Dokumentation im Volltext abgerufen, Wayback-Stände zum Vergleich, Mueller-Zitat gegen den Originalbeitrag). Das betrifft acht Google-Passagen und das Mueller-Zitat.

**Warnung zur Quellenlage:** Ein großer Teil der kursierenden GEO-Zahlen ist auf keine Primärquelle zurückführbar. Nachweislich erfunden: „Moz fand r = 0,73 zwischen 40–60-Wort-Absätzen und Featured Snippets" (Moz hat das nie gemessen), „Tabellen werden 4,2× häufiger zitiert", „FAQ-Blöcke 2,8×", „AI Search Institute: Person-Schema 1,8×" (die Organisation existiert nicht). **Regel: Jeder nackte Multiplikator ohne Stichprobengröße und Methodik gilt als erfunden, bis das Gegenteil belegt ist.**

---

## 1 · Stand am 11.09.2026 — was seit dem alten Auftrag passiert ist

Eine Parallel-Session hat AP-1 bis AP-9 des Vorgängerauftrags weitgehend umgesetzt. Gemessener Repo-Stand:

| Bereich | Stand |
|---|---|
| **Blog** | 13 Beiträge (vorher 52), Median **1.306 Wörter**, Minimum 1.213. FAQ 13/13, externe Quelle 13/13, Stadt-/Leistungslink 13/13. Beiträge liegen einzeln unter `src/content/blog/`. |
| **Blog-Verlinkung** | Client-Pagination in `BlogGrid.tsx` entfernt. **Der Kernbefund des alten AP-1 ist damit adressiert** — vorher waren 40 von 52 Beiträgen über Links unerreichbar. |
| **Neue Routen** | `/kaltakquise`, `/kaltakquise/[stadt]`, `/branchen`, `/branchen/[branche]`, `/referenzen`, `/llms.txt` |
| **Preisgefäß** | `src/lib/pricing.ts` mit `PREISE_FREIGEGEBEN = false`, Beträge bewusst `null`, `scripts/check-pricing.mjs` als Gate |
| **Datengefäße** | `case-studies.ts`, `industries.ts`, `city-acquisition.ts`, `blog-types.ts` |
| **Prüfskripte** | `blog-audit`, `check-blog-redirects`, `check-content-duplication`, `check-directories`, `check-internal-links`, `check-pricing`, `check-sitemap` |
| **robots.txt** | AI-Crawler bewusst erlaubt, SEO-Crawler entsperrt, `_next/static/chunks` und `/*?*` entfernt |

**Qualitativer Sprung bei den Stadtdaten.** `src/lib/city-acquisition.ts` gibt jeder Stadt vier eigenständige Felder (`marktText`, `zielgruppenText`, `leitbranchen`, `erreichbarkeit`) mit zusammen **~92 eigenen Wörtern** — inhaltlich verschieden, mit echten Ortsbezügen (Erreichbarkeitsfenster, Leitbranchen, Entscheidungswege). Das ist belastbar.

**Aber: es gibt jetzt zwei Stadtseiten-Sets mit sehr unterschiedlicher Substanz.**

| Route | Eigene Wörter je Stadt | Bewertung |
|---|---|---|
| `/kaltakquise/[stadt]` | ~92, vier eigenständige Felder | Besteht den Modifier-Delete-Test |
| `/leistungen/[stadt]` | **~26** (`regionalText` + `businessContext`), FAQ zu 100 % Template-Interpolation | Besteht ihn **nicht** |

Das ist das offene Risiko dieses Projekts, siehe Phase 5.

### Zwei Dinge sind fertig, aber nicht live

- `public/robots.txt` ist korrigiert, aber **nicht committet**.
- `src/app/llms.txt/route.ts` existiert, aber `https://carpantier-consulting.de/llms.txt` liefert **404**. Vier von fünf Wettbewerbern liefern `200 text/plain` (shark-byte, triveo, asconcepts, vertriebwerk).

---

## 2 · Drei Annahmen aus dem alten Auftrag, die durch Messdaten widerlegt sind

### 2.1 Die 1.200-Wörter-Untergrenze ist kein Google-Ziel

`[OFFIZIELL]` https://developers.google.com/search/docs/fundamentals/creating-helpful-content

> Are you writing to a particular word count because you've heard or read that Google has a preferred word count? **(No, we don't.)**

Google listet das unter den **Warnzeichen** für suchmaschinen-zuerst erstellte Inhalte. Die 13 Beiträge liegen in einem auffällig engen Band von 1.213 bis 1.436 Wörtern — genau das Muster, das dieser Satz beschreibt.

Dazu die Abrufmechanik `[GEMESSEN]`, DEJAN, 883.262 Grounding-Snippets über Googles Grounding-API:

- Grounding-Budget je Anfrage: **Median ~1.929 Wörter über alle Quellen zusammen**
- Je Seite ausgewählt: **Median 377 Wörter**, 77 % im Band 200–600
- Abdeckung fällt von **61 % (Seiten unter 1.000 Wörtern) auf 13 % (Seiten über 3.000)**, entnommene Wörter plateauen bei ~540

**Konsequenz:** Die Beiträge sind gut so, wie sie sind. **Nicht verlängern.** Die Arbeit liegt in der Passagenstruktur innerhalb der bestehenden Länge (Phase 3), nicht in mehr Text.

### 2.2 FAQPage-Schema ist seit Mai 2026 wirkungslos — der sichtbare Text ist der ganze Wert

`[OFFIZIELL]` Google Search Central Changelog:

> **May 8** — Deprecating the FAQ rich result feature. *Why:* This feature will no longer appear in Google Search starting **May 7, 2026**.
> **June 12** — Removed documentation for the FAQ rich result feature.

Dazu `[GEMESSEN]` searchVIU, 8 Szenarien × 5 KI-Systeme: **JSON-LD wurde von null von fünf Systemen beim Abruf ausgelesen.** Versteckte Microdata und RDFa ebenfalls null. Sichtbares HTML wurde ausgelesen.

Und `[GEMESSEN]` Ahrefs, Difference-in-Differences, 1.885 Seiten mit neu ergänztem JSON-LD gegen 4.000 gematchte Kontrollseiten: AI Overviews **−4,6 %** (signifikant), AI Mode +2,4 % (n.s.), ChatGPT +2,2 % (n.s.). Kein Uplift auf irgendeiner Plattform.

**Konsequenz:** Bestehendes Schema behalten, es schadet nicht. **Aber keine weitere Arbeit hineinstecken.** `generateCityFAQSchema` und `generateBlogFAQSchema` sind ab jetzt Hygiene, kein Hebel. Der sichtbare FAQ-Block auf der Seite leistet die Arbeit.

### 2.3 llms.txt ist Wettbewerbsparität, kein Ranking-Hebel — das war im alten Auftrag schon richtig eingeordnet

`[OFFIZIELL]` Google Changelog, 15.06.2026:

> while these files **aren't needed for Google Search (and won't negatively or positively impact your visibility or rankings)**, it's fine if you want to maintain these files for other services or systems that use them.

`[GEMESSEN]` Ahrefs, 137.210 Domains: **97 % erhielten im Messmonat null Anfragen** auf die Datei. KI-Abrufbots machten 1,1 % der Anfragen aus, die überhaupt ankamen.

**Konsequenz:** Ausliefern, weil vier Wettbewerber es tun. Danach nie wieder anfassen.

---

## 3 · Was die Recherche als tatsächlich wirksam ausweist

Die Evidenzlage ist dünner, als der Markt behauptet. Der Großteil kursierender GEO-Zahlen ist nicht belegbar — „Tabellen werden 4,2× häufiger zitiert", „FAQ-Blöcke 2,8×", „Moz fand r=0,73 für 40–60-Wort-Absätze" sind auf **keine Primärquelle** zurückführbar `[KEINE EVIDENZ]`. Was standhält:

| Hebel | Evidenz |
|---|---|
| **Auffindbarkeit im Abrufkorpus** | Höchstbewerteter Faktor in jeder Meta-Auswertung. C-SEO Bench: Position 1 im Kontext war **~7,6× wirksamer als die beste Inhaltstaktik** `[GEMESSEN]` |
| **Konkrete Preise nennen** | Eines von nur **zwei** On-Page-Merkmalen mit isolierter Messwirkung `[GEMESSEN]` |
| **Wettbewerber namentlich nennen** | Das zweite. Abrufrate **19 % → 50 %** `[GEMESSEN]` |
| **Vergleichs- und Bestenlisten-Format** | Zitationspräsenz: best-in-class 91,2 %, Kaufberatung 89,8 %, Vergleich 83,5 %, **Definition 80,7 % (Schlusslicht)** `[GEMESSEN]` |
| **Zahlen, Definitionen, Vergleiche in ~28-Wort-Blöcken oben im Abschnitt** | Konvergiert über vier unabhängige Studien. 64 % zitierter Passagen sind der erste oder zweite Satz ihres Abschnitts `[GEMESSEN]` |
| **Erwähnungen auf Fremdseiten** | **84 % aller KI-Zitate** stammen aus Earned Media. Pressemitteilungen: 0,2 %. Fachpresse schlägt Wire-Verteilung um Faktor 2,8–4,2 `[GEMESSEN]` |
| **Google Business Profile** | ChatGPT bezieht **38,0 %** seiner Quellen für deutsche lokale Empfehlungen aus Google Maps. Perplexity: ~0 % — dort sind es zu 30,5 % Bewertungs- und Branchenportale `[GEMESSEN, deutsch]` |

Quellen: cloro AI Search Index (735 Prompts × 5 Engines) · arXiv 2506.11097 · arXiv 2605.25517 · DEJAN Grounding-Analyse · Muck Rack (>25 Mio. Links) · NeuRank (800 lokale deutsche Anfragen, 20 Städte).

---

## 4 · Phase 1 — Das Tor: Abrufbarkeit

**Vor allem anderen. Inhaltsarbeit vor diesem Tor verpufft.**

Begründung `[GEMESSEN]`: Die vielzitierte GEO-Studie (arXiv 2311.09735, +41 % durch Statistiken und Zitate) hat innerhalb eines **fest vorgegebenen Abrufkorpus** gemessen — die Quelle war bereits drin. Auffindbarkeit wurde nie gemessen. Im Ende-zu-Ende-Test (SAGEO Arena) **senkte** reine Textoptimierung die Top-10-Präsenz um 16 % und die Zitation um 6 %.

### AP-1.0 · Postleitzahl und Geo-Koordinaten korrigieren

**Vor allem anderen. Dieses Paket blockiert den höchstbewerteten Hebel des Projekts.**

- **Befund:** Die Parallel-Session hat die widersprüchliche PLZ am 10.09.2026 auf **50935** vereinheitlicht und in `src/lib/local-seo.ts` selbst vermerkt, dass die Zuordnung ungeprüft ist. **Sie ist falsch.**

  Abfrage gegen OpenStreetMap/Nominatim am 12.09.2026:
  ```
  Stammheimer Straße 123, Köln
  → "123, Stammheimer Straße, Riehl, Nippes, Köln, Nordrhein-Westfalen, 50735"
  → 50.9654857 / 6.9768817
  ```
  **50735** ist Riehl/Nippes im Norden. **50935** ist Sülz/Klettenberg im Südwesten — ein anderer Stadtteil. Vereinheitlicht wurde auf den falschen der beiden Werte.

- **Zweiter Fehler, bisher unbemerkt:** `geo` in `src/lib/local-seo.ts` steht auf `50.9375 / 6.9603`. Der tatsächliche Gebäudestandort liegt **3,32 km entfernt**. Die Koordinaten gehen in `LocalBusiness`-JSON-LD auf jeder Stadtseite ein.

- **Vorgehen:**
  1. **Nico bestätigt die korrekte Anschrift.** Nicht aus OSM ableiten — das ist ein Hinweis, keine Rechtsgrundlage.
  2. Danach PLZ und Koordinaten an **einer** Stelle korrigieren (`businessInfo` in `src/lib/local-seo.ts`) und alle abweichenden Vorkommen darauf zurückführen — Impressum, Datenschutz, `layout.tsx`, `leistungen/[stadt]/page.tsx`, `chat/tool-executor.ts`.
  3. `scripts/check-compliance.mjs` um eine NAP-Konsistenzprüfung erweitern: genau eine PLZ und eine Anschrift im gesamten Quelltext.

- **Akzeptanz:** Genau ein PLZ-Wert im Repo, Koordinaten auf die bestätigte Anschrift gesetzt, `pnpm verify` grün.

- **Warum das an erster Stelle steht:**
  - `[RECHTLICH]` Die Anschrift im Impressum ist die verbindliche Anbieterkennzeichnung nach § 5 DDG. Eine falsche PLZ ist abmahnfähig.
  - `[OFFIZIELL]` Google verweigert die Verifizierung eines Business Profiles, wenn die Adresse nicht zustellbar ist. **AP-4.1 ist der höchstbewertete Hebel des gesamten Projekts und hängt vollständig hieran.**
  - Jede Verzeichnisanmeldung (AP-4.2) zementiert die Adresse weiter. Eine falsche NAP zuerst über wlw, OMR und Sortlist zu verteilen und danach zu korrigieren, ist die teuerste Reihenfolge.

### AP-1.1 · robots.txt und llms.txt live bringen

- **Ziel:** Die fertige Arbeit ist ausgeliefert.
- **Vorgehen:** `public/robots.txt` und `src/app/llms.txt/route.ts` in den Freigabelauf geben. Kein inhaltlicher Umbau nötig.
- **Akzeptanz:** `curl -sI https://carpantier-consulting.de/llms.txt` → `200`, `content-type: text/plain`. In `robots.txt` steht kein SEO-Crawler mehr auf `Disallow`.
- **Evidenz:** `[GEMESSEN]` SEOSOON, 1.444 .de-Domains: **41,5 % der deutschen Dienstleisterseiten sperren mindestens einen KI-Bot.** Offen zu sein ist ein kostenloser struktureller Vorteil gegenüber vier von zehn Wettbewerbern — und bei jedem Hosting- oder Cloudflare-Wechsel zu verteidigen.

### AP-1.2 · Serverseitiges Rendering der tragenden Inhalte prüfen

- **Ziel:** Preise, Vergleichstabellen und FAQ-Antworten stehen im initialen HTML.
- **Vorgehen:** Für je eine Seite aus `/leistungen`, `/kaltakquise/[stadt]`, `/branchen/[branche]`, `/blog/[slug]` das rohe Server-HTML abrufen und prüfen, ob der tragende Text enthalten ist:
  ```bash
  curl -s -A "GPTBot" https://carpantier-consulting.de/leistungen | grep -c "Pilot\|Retainer\|pro Termin"
  ```
- **Akzeptanz:** Jeder geprüfte Kerninhalt ist ohne JavaScript-Ausführung im HTML vorhanden.
- **Evidenz:** `[GEMESSEN]` searchVIU: **ClaudeBot, GPTBot und PerplexityBot führen kein JavaScript aus.** Was clientseitig gerendert wird, existiert für diese Crawler nicht. Bei Next.js ist das der eine technische Punkt, der alles andere stillschweigend wertlos machen kann.

### AP-1.3 · Interne Verlinkung verifizieren statt annehmen

- **Ziel:** Kein Beitrag und keine Stadtseite ist nur über die Sitemap erreichbar.
- **Vorgehen:** `scripts/check-internal-links.mjs` so erweitern, dass es den **Linkgraph von der Startseite aus traversiert** und Seiten meldet, die von keiner anderen Seite aus erreichbar sind. Der frühere Fehler war genau das: 40 von 52 Beiträgen hingen nur in der Sitemap, weil `BlogGrid` clientseitig paginierte. Alle vier damals indexierten Beiträge lagen in den erreichbaren zwölf, keiner der 40 verwaisten war indexiert.
- **Akzeptanz:** Skript meldet null unerreichbare URLs, läuft in `pnpm verify`.
- **Evidenz:** `[OFFIZIELL]` Googles Doorway-Fragenkatalog von 2015, bis heute gültig: *„Do these pages exist as an 'island?' Are they difficult or impossible to navigate to from other parts of your site?"*


### AP-1.4 · Sitemap-`lastmod` ehrlich machen

- **Problem:** `src/app/sitemap.ts` setzt für Startseite, `/leistungen` und alle Stadtseiten `lastModified: currentDate` — also bei jedem Build „gerade eben".
- **Vorgehen:** Echtes Änderungsdatum je Route pflegen oder das Feld weglassen. Kein Datum ist besser als ein falsches.
- **Akzeptanz:** Kein `lastModified` im Sitemap-Output, das nicht einer tatsächlichen inhaltlichen Änderung entspricht.
- **Evidenz:** `[OFFIZIELL]` https://developers.google.com/search/docs/appearance/publication-dates — *„Ensure that the date … match between the equivalent user-visible and structured values."* Und aus dem Helpful-Content-Dokument als Warnzeichen: *„Are you changing the date of pages to make them seem fresh when the content has not substantially changed?"*

---

## 5 · Phase 2 — Die zwei gemessenen On-Page-Hebel

**Das ist der Teil mit dem besten Evidenz-Aufwand-Verhältnis im gesamten Projekt.**

### AP-2.1 · Preise veröffentlichen

- **Ziel:** `/leistungen` nennt echte Beträge oder ein nachvollziehbares Preismodell.
- **Vorgehen:** Das Gefäß steht (`src/lib/pricing.ts`, `Pricing.tsx`, `check-pricing.mjs`). Es fehlen **nur die Zahlen** — Geschäftsentscheidung, siehe Abschnitt 6. Sobald sie da sind: Beträge in `priceModels` eintragen, `PREISE_FREIGEGEBEN = true`, `Offer`-Markup mit echtem `price` und `priceCurrency` ergänzen.
- **Zusätzlich:** `priceRange: '€€€'` in `src/app/layout.tsx` ist ein bedeutungsloser Platzhalter. Entweder durch eine echte Spanne ersetzen oder entfernen.
- **Akzeptanz:** `pnpm verify` grün, `check-pricing.mjs` bestätigt, dass kein freigegebenes Modell ohne Betrag ausgeliefert wird.
- **Evidenz:** `[GEMESSEN]` cloro, 249 Seiten × 27 Merkmale: „Konkrete Preise nennen" war eines von zwei Merkmalen, die abgerufene von ignorierten Seiten trennten. `[ANBIETER]` ezgeo, 304 B2B-Unternehmen, 66 Anbieter ohne öffentliche Preise gegen 40 mit: **93,9 % der KI-Antworten über Anbieter ohne öffentliche Preise nennen trotzdem konkrete Beträge**, nur 3 % erwähnen, dass der Preis nicht öffentlich ist. Fazit der Studie: *„Hiding your price doesn't remove the answer. It removes your voice from it."* **Einschränkung:** nur ein Modell, ein Durchlauf je Anbieter — die Größenordnung ist richtungsweisend, nicht belastbar. Die Kernaussage stützt sich ohnehin auf die unabhängige cloro-Messung darüber.
- **Marktlage:** Der deutsche SERP zu „Vertriebsagentur Kosten" wird von Agenturbeiträgen dominiert, die Preisnennung ausdrücklich ablehnen. Das Feld ist frei.

> **Kurios und handlungsleitend:** Die Stadt-FAQ in `src/lib/schemas.ts` stellt bereits wörtlich die Frage „Was kostet eine Vertriebsagentur in {Stadt}?" — und beantwortet sie ohne eine einzige Zahl. Die Seite stellt die wertvollste Frage des Marktes und verweigert die Antwort.

### AP-2.2 · Vergleichsseiten, die Wettbewerber benennen

- **Ziel:** Mindestens drei Seiten im Vergleichsformat, die Alternativen namentlich nennen.
- **Vorgehen:** Kandidaten aus der vorhandenen Struktur:
  - `Vertriebsagentur beauftragen oder Vertriebler einstellen` — Kosten, Zeit bis zum ersten Termin, Risiko, Kündbarkeit, je mit Zahlen
  - `Telefonakquise auslagern vs. im Haus aufbauen`
  - `Pay-per-Lead vs. Retainer vs. Stundenmodell` — Tabelle mit Eignung je Unternehmensgröße
  - Optional, heikler: ein ehrlicher Anbietervergleich für den Kölner Markt
  Jede Seite: Vergleichstabelle mit ≤5 Zeilen × 3 Spalten, Antwortabsatz oben, je Zeile eine Zahl.
- **Guardrail:** Aussagen über Wettbewerber müssen belegbar und sachlich sein (§ 6 UWG, vergleichende Werbung). Nur öffentlich nachprüfbare Angaben — veröffentlichte Preise, Gründungsjahr, Zertifizierungen. **Keine Bewertungen fremder Leistungsqualität.**
- **Akzeptanz:** Routen bauen, in der Sitemap, `check-content-duplication.mjs` grün, jede Tabelle serverseitig gerendert.
- **Evidenz:** `[GEMESSEN]` cloro: Seiten ohne genannten Wettbewerber wurden zu **19 %** abgerufen, mit **50 %**. `[GEMESSEN]` cloro-Archetypen: Vergleich 83,5 %, Kaufberatung 89,8 %, best-in-class 91,2 % Zitationspräsenz — Definition mit 80,7 % am schlechtesten.

---

## 6 · Phase 3 — Passagenstruktur statt Textmenge

**Keine neuen Artikel. Keine längeren Artikel.** Die bestehenden 13 Beiträge und die Leistungs-, Stadt- und Branchenseiten werden auf Entnehmbarkeit umgebaut.

### AP-3.1 · Antwort-zuerst-Struktur

- **Vorgehen, je Abschnitt:**
  1. Überschrift formuliert die reale Suchfrage aus (nicht zwingend als Frage, aber in der Wortwahl der Anfrage).
  2. **Direkt darunter ein eigenständiger Antwortblock von 40–80 Wörtern**, zwei bis vier Sätze, ohne Pronomen, die aus dem Block hinauszeigen.
  3. Darin mindestens **eine Zahl, ein Datum oder ein benannter Fakt**.
  4. Erst danach Herleitung, Beispiel, Einschränkung.
- **Akzeptanz:** `scripts/blog-audit.mjs` um eine Prüfung erweitern: je H2 ein Absatz ≤80 Wörter unmittelbar nach der Überschrift; Anteil Abschnitte mit Zahl im Antwortblock wird ausgewiesen.
- **Evidenz:** `[GEMESSEN]` Portent, 30.000 Keywords: Absatz-Snippets am häufigsten 40–45 Wörter (ausdrücklich eine **Anzeigegrenze**, keine Auswahlregel). `[GEMESSEN]` RAG-Forschung: optimale Chunk-Größen 128–512 Token; NAACL 2025: feste 200-Wort-Chunks erreichten semantisches Chunking. `[ANBIETER]` MaxAEO, 3.200 zitierte Passagen über 8 Engines, handklassifiziert: Median **28 Wörter**, **64 % waren erster oder zweiter Satz ihres Abschnitts**. Beobachtend, keine Kontrollgruppe; die Autoren bezeichnen die Werte selbst als *„directional, not laws"*.

**Widerspruch, der offen bleibt:** Dieselbe MaxAEO-Auswertung misst für Frage-Antwort-Formate einen 2,5-fachen Entnahmevorteil, während arXiv 2604.25707 für Q&A-Format **−5,7 %** Einfluss misst. Unterschiedliche Metriken, unterschiedliche Korpora, beide bleiben stehen. **Konvergent über alle vier Studien sind nur Zahlen und Definitionen, nach vorn gestellt** — darauf stützt sich AP-3.1, nicht auf das Frageformat.

### AP-3.2 · Zahlendichte erhöhen, ohne etwas zu erfinden

- **Vorgehen:** Jeder Beitrag und jede Leistungsseite bekommt überprüfbare Zahlen — Marktdaten mit Quelle, gesetzliche Fristen, Branchenkennzahlen, Zeitangaben aus dem eigenen Prozess. **Keine erfundenen Erfolgsquoten** (Abschnitt 3.5 des Vorgängerauftrags).
- **Evidenz:** `[GEMESSEN]` arXiv 2604.25707, 21.143 Zitate: Statistiken **+61,6 %**, Definitionen +57,3 %, Vergleiche +55,3 % Einflussgewinn. `[GEMESSEN]` arXiv 2311.09735: „Statistics Addition" +30–33 % gegenüber Basis, „Keyword Stuffing" **−8 %, also unter Basis**.

### AP-3.3 · Glossar in Einzel-URLs zerlegen — mit Einschränkung

- **Stand:** `src/app/glossar/page.tsx` hat 15 Begriffe mit ~55-Wort-Definitionen auf **einer** URL.
- **Vorgehen:** Nur zerlegen, wenn jeder Eintrag **eine Zahl, ein Datum oder einen deutschen Marktbezug** bekommt, den ein Sprachmodell nicht aus sich selbst erzeugen kann. Sonst bleibt es, wie es ist.
- **Evidenz:** `[GEMESSEN]` cloro: Definitionsanfragen sind mit 80,7 % der **schwächste** Archetyp, weil Modelle sie aus dem Training beantworten, ohne abzurufen. Begründung der Studie: konkurrenzfähig wird eine Definitionsseite nur über *„named data and dated figures"*. **Niedrige Priorität.**

---

## 7 · Phase 4 — Off-Page: der 84-Prozent-Kanal

**Der ehrlichste Befund der ganzen Recherche: der größte Hebel liegt nicht auf dieser Website.**

`[GEMESSEN]` Muck Rack, >25 Mio. zitierte Links, 17 Branchen: **Earned Media = 84 % aller KI-Zitate.** Bezahlt/Advertorial 0,3 %. Pressemitteilungen 0,2 %.
`[ANBIETER]` Ahrefs, 75.000 Marken: Markenerwähnungen im Web korrelieren mit KI-Sichtbarkeit bei **0,664**, Backlinks bei **0,218**. Ahrefs selbst: *„Correlation isn't causation."*

### AP-4.1 · Google Business Profile

- **Höchster gemessener Einzelhebel. Braucht Nico.**
- **Evidenz:** `[GEMESSEN, deutsch]` NeuRank, 800 lokale Anfragen, 10 Branchen, 20 deutsche Städte: ChatGPT bezieht **38,0 %** seiner Quellen für lokale Unternehmensempfehlungen aus **Google Maps**. Ohne GBP ist die Firma von gut einem Drittel der Abruffläche strukturell ausgeschlossen.
- **Wichtig:** Perplexity nutzt Google Maps zu ~0 % und zu **30,5 %** Bewertungs- und Branchenportale. **Die beiden Engines laufen auf verschiedenen Substraten — GBP und Portale ersetzen einander nicht.**

### AP-4.2 · Portale und Vergleichslisten — fünf gute statt fünfzig

- **Vorgehen:** `localDirectories` in `src/lib/local-seo.ts` auf die Einträge konzentrieren, für die es Evidenz gibt:
  - **wlw.de** — das einzige deutsche B2B-Verzeichnis, das GPTBot, OAI-SearchBot, ChatGPT-User und PerplexityBot in der robots.txt **ausdrücklich erlaubt** (von mir am 10.09.2026 direkt geprüft)
  - **OMR Reviews** — erlaubt `/*/reviews/`, taucht in der blinq-DACH-Studie in den Top-Quellen für Google AI Overviews **und** Perplexity auf
  - **Sortlist** (Kategorie Vertrieb Köln, 42 Agenturen), **ProvenExpert**, **Clutch** — offen crawlbar, aber in **keinem** Zitationsdatensatz nachweisbar `[KEINE EVIDENZ]`
- **Ehrliche Einordnung:** Kein Agenturverzeichnis (Sortlist, Clutch, DesignRush) erscheint in irgendeiner Top-10-Zitationsliste. Von den B2B-Verzeichnissen tauchen nur G2 und Gartner auf — beides Software/Analyst, nicht Dienstleistung. **Crawlbar heißt nicht zitiert.**
- **Evidenz für Listicles:** `[ANBIETER]` Peec AI, ~200.000 KI-Antworten, 5,7 Mio. Datenpunkte, 8 Engines: Platz 1 in einer häufig abgerufenen **Fremd**-Vergleichsliste = **+16,5 Prozentpunkte** Sichtbarkeit (B2B-SaaS), +13,4 pp (MarTech). **Sättigung nach wenigen Platzierungen** — fünf gute schlagen fünfzig schwache. Die Autoren nennen die Auswertung ausdrücklich beobachtend und nicht randomisiert; sie gilt nur für Listen, die tatsächlich häufig abgerufen werden. Peec verkauft KI-Sichtbarkeits-Monitoring — Interessenlage mitlesen.
- **Warnung zu drweb.de:** Führt einen „Leadgenerierung Agentur Vergleich 2026" (54 Anbieter, monatlich aktualisiert), legt aber offen, Provision zu erhalten **und Brand Mentions zu verkaufen**. Das ist bezahlte Platzierung im redaktionellen Gewand — und bezahlt ist 0,3 % der Zitate.

### AP-4.3 · Fachpresse statt Pressemitteilung

- **Vorgehen:** Ziel sind Zitate in deutschen B2B-/Vertriebsfachmedien, nicht Wire-Verteilung.
- **Evidenz:** `[GEMESSEN]` Fachpublikationen erzeugen **2,8–4,2× mehr Zitate als Wire-Aufgriffe** derselben Meldung; redaktionelle Platzierungen 2,3× gegenüber Wire. In der deutschen B2B-Messung war die meistzitierte deutschsprachige Fachpublikation ihrer Kategorie mit 75 von 4.724 Zitaten vertreten.

### AP-4.4 · LinkedIn unter Nicos Namen, nicht als Unternehmensseite

- **Vorgehen:** Öffentliche Beiträge und Pulse-Artikel unter `Nico-Luca Carpantier`, 500–2.000 Wörter, Wissens- und Ratgeberformat.
- **Evidenz:** `[ANBIETER]` LinkedIn ist zweithäufigst zitierte Domain (~11 % der Antworten); Artikel und Beiträge machen 50–66 % der zitierten LinkedIn-Inhalte aus. `[GEMESSEN]` Profound: **Profil-Zitate fielen von 33,9 % auf 14,5 %**, während Beiträge und Artikel stiegen — LinkedIns robots.txt sperrt `/profile/`. ChatGPT und Google AI Mode zitieren zu 59 % Einzelpersonen statt Unternehmensseiten.
- **Dämpfer:** In der deutschen B2B-Beschaffungsmessung lag LinkedIn nur auf **Rang 52**.

### AP-4.5 · Ein wiederkehrender eigener Benchmark

- **Ziel:** Eine jährlich aktualisierte Auswertung auf stabiler URL, z. B. „Terminquote in der B2B-Telefonakquise nach Branche, n = X Kampagnen".
- **Aufbau:** Ergebnis in den ersten 30 % der Seite · Methodik in einem abgesetzten Kasten (Stichprobe, Zeitraum, Messgröße, Verfahren) · ausdrücklicher Vergleich benannter Optionen · URL bleibt über Jahre gleich.
- **Evidenz:** `[GEMESSEN]` Gauge/Growth Memo, 301 Seiten, 1.075 Zitate: Primärforschung war 2,7 % der Seiten, erhielt aber 8,4 % der Zitate — **3,3-fache Zitationsdichte**. **75 der 90 Zitate entfielen auf ein einziges Format:** Benchmarks, die eine „Welches ist das beste"-Frage direkt beantworten.
- **Braucht Nico.** Ohne echte Kampagnenzahlen entsteht hier nichts.

---

## 8 · Phase 5 — Risiko zurückbauen: die dünnen Stadtseiten

**Das ist das einzige echte Abstrafungsrisiko im Projekt.**

### Googles Wortlaut, der genau diesen Fall beschreibt

`[OFFIZIELL]` https://developers.google.com/search/docs/essentials/spam-policies — Stand 28.08.2026. Der Abschnitt heißt inzwischen **„Doorway abuse"**, nicht mehr „Doorways":

> **Doorway abuse**
>
> Doorway abuse is when sites or pages are created to rank for specific, similar search queries. They lead users to intermediate pages that aren't as useful as the final destination. Examples of doorway abuse include:
>
> - Having multiple websites with slight variations to the URL and home page to maximize their reach for any specific query
> - **Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page**
> - Generating pages to funnel visitors into the actual usable or relevant portion of a site
> - **Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy**

Und der zweite einschlägige Abschnitt:

> **Scaled content abuse**
>
> Scaled content abuse is when many pages are generated for the primary purpose of manipulating search rankings and not helping users. This abusive practice is typically focused on creating large amounts of unoriginal content that provides little to no value to users, no matter how it's created.
>
> Examples of scaled content abuse include, but aren't limited to:
>
> - Using generative AI tools or other similar tools to generate many pages without adding value for users
> - Scraping feeds, search results, or other content to generate many pages (including through automated transformations like synonymizing, translating, or other obfuscation techniques), where little value is provided to users
> - Stitching or combining content from different web pages without adding value
> - Creating multiple sites with the intent of hiding the scaled nature of the content
> - Creating many pages where the content makes little or no sense to a reader but contains search keywords
>
> If you're hosting such content on your site, exclude it from Search.

**Korrektur eines verbreiteten Irrtums:** Dieser Wortlaut hat sich seit März 2024 **nicht** geändert — Abgleich gegen Wayback-Stände vom 18.03.2024 und 26.03.2025 ergibt Zeichengleichheit bis auf `are not` → `aren't`. Was sich im März 2024 änderte: Die Vorgängerregel „Spammy automatically-generated content" wurde **ersetzt**. Der Auslöser wanderte vom **Mechanismus** (jede alte Beispielzeile nannte eine Maschine) zu **Menge × Absicht × Wert**.

### Der Unterschied in der Durchsetzung ist erheblich

Es gibt **keine Manual Action namens „Scaled content abuse"**. Doorways fallen unter *„Thin content with little or no added value"* — überlebbar und begrenzt. Scaled content abuse fällt unter *„Major spam problems"* — typischerweise vollständige Deindexierung. Eine Ein-Mann-Agentur mit begrenzten Stadtseiten liegt auf der Doorway-Seite dieser Karte.

### Was zu tun ist

- **Ziel:** Kein Stadtseiten-Set mit unter ~90 eigenen Wörtern je Stadt.
- **Vorgehen, in dieser Reihenfolge:**
  1. `/leistungen/[stadt]` auf das Niveau von `/kaltakquise/[stadt]` heben — also `src/lib/cities.ts` um Felder ergänzen, die `city-acquisition.ts` bereits vormacht. **Oder:** die 15 Seiten zusammenführen und auf `/kaltakquise/[stadt]` umleiten.
  2. Die Template-FAQ in `getCityFAQs` (`src/lib/schemas.ts`) auflösen — sechs Fragen, die sich ausschließlich durch `${city.name}` unterscheiden, sind wörtlich *„substantially similar pages"*.
  3. Modifier-Delete-Test als Prüfskript: Stadtnamen aus dem gerenderten Text entfernen, verbleibende Texte paarweise vergleichen. Über einem Schwellwert bricht der Build.
- **Akzeptanz:** `scripts/check-content-duplication.mjs` um den Modifier-Delete-Test erweitert, läuft in `pnpm verify`, meldet null Seitenpaare über Schwellwert.
- **Evidenz:** `[OFFIZIELL]` John Mueller: *„If you don't have unique information to add to a page other than a city-name, then I'd fold those pages together and instead make a single (or few) really strong pages instead."*

### Was ausdrücklich **nicht** gebaut wird

**Kein Kreuzprodukt aus Branche × Stadt.** `/branchen/[branche]` und `/kaltakquise/[stadt]` bleiben getrennte Achsen. Keine URLs der Form `/branchen/[branche]/[stadt]`.

`[OFFIZIELL]` John Mueller, September 2026 — die direkteste verfügbare Aussage zu genau diesem Muster:

> Regarding the site you describe, it's hard to say, but I worry a bit because it sounds like a programmatic SEO play, **where you iterate through a large list of domain names, technologies, and attributes - finding all possible combinations.** It's easy for a programmer to do, even easier with code generators now. You end up with tons of pages that have "some" value, but the overall picture is not that exciting. Expanding it with even more generated data ("what does php mean?" etc) doesn't make it more useful for users. Programmatic SEO like this often leads to a site that's either spam, borderline spam, or low quality. It's easy to spin something up with many pages, it's hard to provide real value to users. **Our systems have possibly lost faith in your site providing good value to users based on the old pages.** Resolving this tends to take time & significant effort to show the value.

Zwei Dinge daran: Der Alarm gilt dem **Kreuzprodukt**, und der Schaden ist **seitenweit und dauerhaft**, nicht seitenbezogen.

`[GEMESSEN]` Lily Ray, 220 Websites aus den Referenzlisten von KI-Content-Plattformen — also den selbst beworbenen Erfolgen dieser Anbieter: **54 % verloren über 30 % ihres Traffic-Höchststands, 39 % über 50 %, 22 % über 75 %.** Auf ihrer Risikoliste steht ausdrücklich *„programmatic location/language scaling with minimal per-page uniqueness"*. Da die Stichprobe aus Erfolgsgeschichten besteht, sind das **Untergrenzen**.

### Es gibt keine Schwellenwerte — und das ist wichtig

Ich habe Spam-Policies, Helpful-Content-Dokument, Core-Updates-Dokument, die März-2024-Ankündigung, den Doorway-Beitrag von 2015, die Manual-Actions-Dokumentation und die vollständigen Quality Rater Guidelines (Sept. 2025) durchsucht. **Google veröffentlicht keine einzige Zahl** — keine Seitenzahl, keinen Prozentsatz einzigartigen Inhalts, keine Wortzahl, kein Template-Verhältnis.

Frei erfunden, kursieren aber als Regel `[KEINE EVIDENZ]`: „500–800 Wörter einzigartig je Seite" · „60–70 % je Seite einzigartig halten" · „unter 100 programmatische Seiten ist sicher" · „30 % Template / 70 % einzigartig".

Der einzige belastbare Test ist qualitativ: **Modifier-Delete.** Stadtnamen streichen — bleibt ein austauschbares Template übrig, hat die Seite keinen eigenen Wert, unabhängig von ihrer Wortzahl.

Dazu die Quality Rater Guidelines §3.2, der Satz, der programmatische Arbeit überhaupt legitimiert `[OFFIZIELL]`:

> **Effort may go into designing page functionality or building systems that power a webpage.**

Deshalb überleben Zapier und Wise: Dort erzeugt das **System** den Wert je Seite. `city-acquisition.ts` geht in genau diese Richtung — echte Erreichbarkeitsfenster, echte Leitbranchen, echte Entscheidungswege je Stadt. `cities.ts` tut es nicht.

---

## 9 · Was von Nico kommen muss

Ohne diese Punkte bleiben die Gefäße leer. `docs/aufgaben-nico.md` existiert bereits — dort pflegen, nicht doppeln.

| Was | Warum es nicht anders geht | Blockiert |
|---|---|---|
| **Korrekte Anschrift bestätigen — PLZ 50735 oder 50935?** | **Dringendster Punkt.** Die Adresse steht im Repo auf 50935; OpenStreetMap ordnet „Stammheimer Straße 123" eindeutig **50735** (Riehl/Nippes) zu. Nur Nico kennt die zustellbare Anschrift. Falsche PLZ im Impressum ist abmahnfähig und verhindert die GBP-Verifizierung. | AP-1.0, AP-4.1, AP-4.2 |
| **Google Business Profile anlegen und verifizieren** | Verifizierung per Postkarte/Telefon an die echte Firma. 38 % der ChatGPT-Abruffläche für lokale deutsche Anfragen. Setzt AP-1.0 voraus. | AP-4.1 |
| **Preisentscheidung** | Geschäftsentscheidung, keine technische. Marktband 2.000–8.000 €/Monat oder ~300 €/Termin. | AP-2.1, AP-2.2 |
| **Bewertungen einsammeln** | Ohne echte Bewertungen kein Bewertungs-Markup — und Selbst-Markup auf der eigenen Domain ist seit 2019 ohnehin nicht rich-result-fähig. | Portalprofile |
| **2–3 echte Fallstudien mit Zahlen** | `case-studies.ts` steht, braucht reale Werte. Anonymisiert reicht. | AP-4.5, `/referenzen` |
| **Kampagnendaten für den Benchmark** | Der 3,3-fach-Hebel der Primärforschung entsteht nur aus echten Zahlen. | AP-4.5 |
| **Profile bei wlw, OMR Reviews, Sortlist** | Verlangen Firmendaten und Identitätsnachweis. | AP-4.2 |
| **Echtes Foto** | Bei einer Ein-Mann-Agentur ist der Gründer das Einzige, was der Käufer beurteilen kann. Das aktuelle Porträt ist als KI-generiert deklariert. | E-E-A-T |
| **Search-Console-Zugang** | Ohne ihn ist jede Indexierungsaussage eine Vermutung. | Phase 6 |

Fehlt ein Input: Gefäß bis zur Grenze bauen, Grenze im Bericht benennen, nächstes Paket beginnen. **Niemals Platzhalter, die wie echte Angaben aussehen.**

---

## 10 · Was ausdrücklich nicht getan wird

| Nicht tun | Grund |
|---|---|
| Artikel verlängern, um 1.200/1.500/2.000 Wörter zu erreichen | `[OFFIZIELL]` *„(No, we don't.)"* — und Grounding-Abdeckung fällt jenseits ~1.500 Wörtern von 61 % auf 13 % |
| Weiteres Schema ergänzen | `[GEMESSEN]` DiD-Test: kein Uplift, AI Overviews −4,6 %. JSON-LD wird beim Abruf von 0 von 5 Systemen gelesen |
| `speakable` implementieren | `[OFFIZIELL]` Beta, **nur US-englische Publisher** |
| `ItemList`/Carousel ausbauen | `[OFFIZIELL]` nur mit Course/Movie/Recipe/Restaurant zulässig |
| `ProfessionalService` verwenden | `[OFFIZIELL]` auf Vokabularebene deprecated. Korrekt sind `LocalBusiness` + `Organization` |
| FAQPage als Zitationstaktik behandeln | `[OFFIZIELL]` Rich Result seit 07.05.2026 abgeschaltet. Sichtbarer Text leistet die Arbeit |
| llms.txt weiter pflegen | `[GEMESSEN]` 97 % der Dateien erhielten null Anfragen |
| Reddit bespielen | `[GEMESSEN]` 14,55 % deutscher Gesamtzitate, aber **1,1 %** in deutschen B2B-Beschaffungsantworten |
| Wikipedia-Artikel anstreben | Relevanzkriterien verlangen ≥1.000 Mitarbeiter oder >100 Mio. € Umsatz. Ein Versuch erzeugt einen dauerhaften Löschdiskussions-Eintrag |
| Pressemitteilungen verteilen | `[GEMESSEN]` 0,2 % aller Zitate |
| Kreuzprodukt Branche × Stadt | Abschnitt 8 |

---

## 11 · Phase 6 — Messung

**Erwartung ehrlich halten:** Indexierung reagiert in Wochen. Ein Vergleich unmittelbar nach dem Deployment misst nichts.

Dazu eine gemessene Obergrenze für jede Erfolgsbehauptung `[GEMESSEN]`: **45,5 % der Zitate in AI Overviews wechseln zwischen zwei aufeinanderfolgenden Aktualisierungen**; Inhalte verschieben sich im Schnitt alle 2,15 Tage. **Alles unterhalb von ~45 % Veränderung liegt im Rauschen.** Einzelbeobachtungen („wir wurden zitiert") sind kein Beleg.

Und für die Plattformseite `[GEMESSEN]`: SISTRIX maß nach dem GPT-5.5-Rollout im Mai 2026, dass sich **47 % der Domainverteilung in deutschsprachigen ChatGPT-Antworten binnen 48 Stunden änderten** — gegen 1–2 % normale Monatsschwankung. Plattformspezifische Optimierung hat eine kurze Halbwertszeit. Belastbar sind Abrufbarkeit, Verlinkung und Preistransparenz.

### Messpunkte

```
# Klassisch, google.de, hl=de, gl=de, Standort Köln, Personalisierung aus
vertriebsagentur köln · frankfurt · düsseldorf
kaltakquise agentur köln · telefonakquise agentur köln
vertrieb auslagern · was kostet eine vertriebsagentur
site:carpantier-consulting.de · site:carpantier-consulting.de/blog

# Generativ, je Engine getrennt protokollieren
ChatGPT:    "Welche Vertriebsagentur in Köln für B2B-Telefonakquise?"
Perplexity: "Vertriebsagentur Köln Kaltakquise Kosten"
Google AIO: "vertriebsagentur kosten"
```

**Getrennt auswerten.** ChatGPT (Google Maps, 38 %) und Perplexity (Portale, 30,5 %) laufen auf verschiedenen Substraten; eine gemeinsame Kennzahl verdeckt genau den Unterschied, der die Maßnahmen steuert.

### Bericht

`docs/revision-<datum>.md`: was umgesetzt wurde, was nicht und warum, was an Nicos Input hängt, welche Messwerte sich verändert haben, welche Annahmen sich als falsch erwiesen haben.

---

## 12 · Reihenfolge in einem Satz

Zuerst die Anschrift klären, weil eine falsche PLZ das Business Profile blockiert und sich über jede Verzeichnisanmeldung weiter verbreitet (AP-1.0) · dann live bringen, was fertig ist (AP-1.1) · dann sicherstellen, dass Crawler alles sehen (AP-1.2 bis AP-1.4) · dann die zwei gemessenen Hebel setzen, Preis und Wettbewerbernennung (Phase 2) · dann die vorhandenen Texte auf Entnehmbarkeit umbauen, ohne sie zu verlängern (Phase 3) · parallel dazu das, was nicht auf dieser Website liegt, weil es 84 % ausmacht (Phase 4) · und das Doorway-Risiko der dünnen Stadtseiten zurückbauen, bevor es teuer wird (Phase 5).

---

*Evidenzstand 11.09.2026. Primärquellen (wörtliche Google-Dokumente, Wayback-Vergleichsstände, vollständige Quality Rater Guidelines) liegen unter `C:\Users\damja\AppData\Local\Temp\claude\C--Users-damja-WebstormProjects-Nico-Luca-Carpantier\67683b42-8d28-40fd-ab7b-4ee6f7516e26\scratchpad\`. Diese Ablage ist sitzungsgebunden und nicht dauerhaft.*
