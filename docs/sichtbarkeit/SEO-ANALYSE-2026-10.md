# SEO-Analyse und Umsetzung — Suchbegriffe, Verlinkung, Technik

**Stand:** 01.10.2026 · **Deployt:** 01.10.2026 als `ac019d8` (Branch `seo/querverlinkung-2026-10`, auf `main` gebracht) — Abnahme auf der Live-Domain in 7.4
**Grundlage:** Crawl aller 58 Live-Adressen am 01.10.2026; Positionsmessung vom 10.09.2026 in
`C:\Users\damja\Documents\Carpantier Consulting\COMPETITOR-SEO-EXPLORATION.md` (außerhalb des Repos);
Repo-Stand `8c6a854`
**Gilt neben:** [ROADMAP-GESAMT-2026-09.md](ROADMAP-GESAMT-2026-09.md) — Paket-IDs (`AP-…`) beziehen sich darauf

---

## 0 · Kurzfassung

1. **Ohne JavaScript stand auf keiner Seite der Inhalt in `<main>`.** Ein `src/app/loading.tsx`
   legte jede Seite hinter eine Suspense-Grenze; selbst die statisch erzeugten Seiten lieferten
   in `<main>` nur „Wird geladen…“. Inhalt und `h1` lagen als `<div hidden>` hinter der Fußzeile.
   Google rendert das, GPTBot, ClaudeBot und PerplexityBot nicht. Auf Impressum, Datenschutz und
   den Branchenseiten steckte dasselbe Muster in einzelnen Abschnitten. Behoben; eine Prüfung über
   alle Sitemap-Adressen verhindert die Rückkehr.
2. **Die Seiten, die ranken, trugen ihren Suchbegriff nicht vorn im Titel.** Die Vertriebs-
   Stadtseiten begannen mit „Vertrieb <Stadt>“ statt „Vertriebsagentur <Stadt>“; die Kaltakquise-
   Stadtseiten kamen auf 90–96 Zeichen. Insgesamt lagen 37 von 58 Titeln über 65 Zeichen und 51 von
   58 Beschreibungen über 165. Jetzt: kein Titel über 65, nur noch 14 Beschreibungen darüber
   (die 13 Beiträge und `/ki-transparenz`, Begründung in 6).
3. **Interne Verlinkung:** 71 Inhaltsverweise mehr (585 → 656). `/wissen` von 0 auf 14 eingehende,
   `/ueber-uns` von 1 auf 14, drei bisher schwach verlinkte Beiträge auf 21–27.
4. **Das größte Risiko ist inhaltlich, nicht technisch:** Auf `/leistungen/[stadt]` — der
   Familie, die heute rankt — sind nach Tausch des Stadtnamens **83 % des Textes identisch**
   (Köln gegen Bonn). Das ist das Doorway-Muster aus AP-5.1. Code löst es nicht; es braucht
   echte Ortssubstanz.
5. **Der größte Hebel liegt weiter außerhalb der Website:** Google Business Profile, Bewertungen,
   Sortlist/wlw/OMR, Preise. Daran hat sich seit dem 12.09.2026 nichts geändert.

---

## 1 · Grundlage und Grenzen

| Quelle | Stand | Einschränkung |
|---|---|---|
| Positionen google.de | 10.09.2026, Raum Köln | Snapshot, drei Wochen alt; `/kaltakquise/[stadt]` ging erst danach live. Welche Adresse rankte, wurde nicht festgehalten |
| Search Console | **nicht verfügbar** | Ohne Zugang keine Liste der tatsächlich gefundenen Suchanfragen, keine Indexierungsdiagnose |
| Crawl, eigene Auswertung | 01.10.2026, 58 Adressen | Liest das ausgelieferte HTML wie ein Bot ohne JavaScript |
| KI-Linker (Modell `typesafe-ai/jev` über Vercel AI Gateway, `CoderConda/Projekte/SEO`) | 01.10.2026 | Lauf mit Freigabe (110 Ranking-Aufrufe, Budget 0,10 €) gestartet und **beim ersten Aufruf abgebrochen:** „Free tier users do not have access to this model“. Nichts berechnet. **Ohnehin erst nach dem Deployment sinnvoll:** Live sieht das Werkzeug wegen 2.1 je Seite zwei Wörter. Es lehnt solche Seiten inzwischen selbst ab |

Die Zuordnung Suchbegriff → Adresse in 3.1 folgt aus Titel und Inhalt der Seiten (Frankfurt #2
kann nur `/leistungen/frankfurt` sein — keine andere Seite nennt Frankfurt im Titel). Für Köln ist
sie eine Annahme: Startseite und `/leistungen/koeln` kommen beide in Frage.

---

## 2 · Technischer Befund: Inhalt außerhalb von `<main>`

### 2.1 Was ausgeliefert wurde

Live am 01.10.2026, `/leistungen`, rohes HTML:

```html
<main><!--$?--><template id="B:0"></template>
  <div class="min-h-screen …"><p>Wird geladen...</p></div>
</main>
<footer>…</footer>
…
<div hidden id="S:0"> … h1, alle Abschnitte … </div>
<script>$RC("B:0","S:0")</script>
```

Gemessen über alle 58 Adressen: **in `<main>` je 2 Wörter** („Wird geladen“), der Inhalt
(276–3.533 Wörter je Seite) im versteckten Teilstück. `check-ssr.mjs` meldete grün, weil es
nur prüfte, ob der Text *irgendwo* im HTML steht.

### 2.2 Warum das zählt

- **Google** rendert JavaScript und sieht die fertige Seite — für das klassische Ranking war
  der Schaden begrenzt.
- **GPTBot, ClaudeBot, PerplexityBot** führen kein JavaScript aus (Roadmap AP-1.2). Sie bekommen
  einen Platzhalter in `<main>` und den Inhalt als `hidden`-Element.
- **Textauszieher** wie Mozillas Readability, die viele Abruf-Werkzeuge verwenden, verwerfen
  `hidden`-Elemente vollständig. Übrig bleibt „Wird geladen…“.
- **Impressum:** Ohne JavaScript waren die Pflichtangaben nach § 5 DDG unsichtbar — genau das
  sollte der `<noscript>`-Block in `layout.tsx` verhindern.

### 2.3 Umgesetzt

| Stelle | Änderung |
|---|---|
| `src/app/loading.tsx` | gelöscht; Begründung als Kommentar an `<main>` in `layout.tsx` |
| `src/app/impressum/page.tsx`, `datenschutz/page.tsx` | `<Suspense>` um die Abschnitte entfernt (es gab nichts, worauf zu warten war) |
| `src/app/branchen/[branche]/page.tsx` | Abschluss direkt statt über `dynamic()` in `<Suspense>` (Baukasten § 2.2) |
| `scripts/check-ssr.mjs` | Prüftext muss in `<main>` stehen (jetzt auch auf der Startseite); zusätzlich **jede** Sitemap-Adresse: Status 200 und kein gestreamtes Teilstück |

Ergebnis gegen den Produktionsbuild: 58 von 58 Adressen ohne gestreamten Inhalt, genau eine `h1`
in `<main>`. LCP unverändert (7.3).

---

## 3 · Suchbegriffe und Seiten

### 3.1 Was rankt — und was die Seite dafür jetzt trägt

| Suchbegriff | 10.09. | Seite | Titel vorher → nachher | Was vorn steht |
|---|---|---|---|---|
| vertriebsagentur frankfurt | **2** | `/leistungen/frankfurt` | `Vertrieb Frankfurt \| Vertriebsagentur & B2B-Akquise \| Carpantier` → `Vertriebsagentur Frankfurt: Vertrieb auslagern \| Carpantier` | acapella-group.de |
| vertriebsagentur düsseldorf | **4** | `/leistungen/duesseldorf` | analog | shark-byte.de, sortlist.de, stadtritter.de |
| kaltakquise agentur köln | **6** | `/kaltakquise/koeln` | `Kaltakquise Agentur Köln \| B2B-Telefonakquise & Terminvereinbarung \| Carpantier Consulting` (90) → `Kaltakquise Agentur Köln – Telefonakquise \| Carpantier` (54) | triveo, profit-sale, shark-byte, sortlist, asconcepts |
| vertriebsagentur köln | **7** | `/leistungen/koeln` (Annahme, siehe 1) | wie Frankfurt | shark-byte, sortlist, asconcepts, vertriebs-helden, suxxeed, zeitfuerbio |
| vertriebsagentur berlin / stuttgart | **7** | `/leistungen/berlin`, `/stuttgart` | wie Frankfurt | jeweils Sortlist und Stadtverzeichnisse |
| telefonakquise agentur köln | **8** | `/kaltakquise/koeln` | „Telefonakquise“ jetzt im Titel | triveo, sortlist, dialogminds, profit-sale, agildialog, crowndirect |
| vertriebsagentur hamburg | **8** | `/leistungen/hamburg` | wie Frankfurt | sales-port, sortlist, stadtritter |
| carpantier consulting, nico carpantier | **1** | `/`, `/ueber-uns` | `B2B-Vertriebsagentur aus Köln \| Carpantier Consulting`; `/ueber-uns`: `Über uns: Nico-Luca Carpantier` | — |

**Ein Titelbegriff, eine Seite.** Zwei Seiten mit demselben führenden Begriff konkurrieren
miteinander statt mit dem Wettbewerb (Kannibalisierung). Deshalb:

| Begriff | trägt ihn | bewusst nicht |
|---|---|---|
| „Vertriebsagentur Köln“ | `/leistungen/koeln` | Startseite („B2B-Vertriebsagentur aus Köln“) |
| „Vertriebsagentur aus Köln“ | nur die Startseite | `/kontakt` (jetzt „Kontakt und Erstgespräch“) und `/ueber-uns` (jetzt „Über uns: Nico-Luca Carpantier“) — beide trugen ihn vorher |
| „Vertrieb auslagern“ (Kaufbegriff) | `/leistungen` | Kostenbeitrag: Suchtitel „Was kostet es, den Vertrieb auszulagern?“ |
| „Leadgenerierung für IT-Systemhäuser“ | `/branchen/it-systemhaeuser` | Beitrag `leadgenerierung-it-dienstleister`: Suchtitel „Akquise für IT-Dienstleister, MSP und SaaS“; der Verweis „IT-Systemhaus“ im Einwandbeitrag zeigt auf die Branchenseite |

### 3.2 Was nicht rankt — und was realistisch ist

| Begriffsfamilie | Stand 10.09. | Zielseite | Einschätzung |
|---|---|---|---|
| Kopfbegriffe: `kaltakquise agentur`, `vertrieb auslagern`, `b2b telefonakquise agentur`, `vertriebsoutsourcing b2b`, `sdr as a service` | 0 von 9 in den Top 10 | `/kaltakquise`, `/leistungen` | Gehört triveo, DIMARCON, PATT (20–34 Jahre, Hunderte Referenzen). Mit Titeln allein nicht zu holen; Autorität, Bewertungen und öffentliche Preise (AP-2.1) sind die Voraussetzung |
| `was kostet eine vertriebsagentur` (Roadmap § 9) | nicht gemessen | Kostenbeitrag | Suchtitel stellt jetzt die Kostenfrage |
| Informationelle Fragen (`beste uhrzeit kaltakquise`, `gatekeeper überwinden` …) | 0 von 10 | 13 Fachbeiträge | Am 10.09. waren nur 4 Beiträge indexiert. Erst Search Console klären (AP-1), dann bewerten |
| `kaltakquise personaldienstleister`, `kaltakquise it-systemhaus` (Roadmap § 9) | nicht gemessen | `/branchen/…` | Beide Beschreibungen beginnen jetzt mit „Kaltakquise für …“. Titel: „Kundenakquise für Personaldienstleister“ (das Wort der Branche, AP-B3), „Leadgenerierung für IT-Systemhäuser“ |
| `telefonakquise agentur münchen`, `leadgenerierung agentur köln` | nicht in Top 10 | Stadtseiten | Dort ranken nationale Telemarketer bzw. Online-Agenturen; geringe Chance ohne Ortssubstanz |

### 3.3 Die Seitenfamilie, die rankt, ist zu 83 % Vorlage

Gemessen am 01.10.2026: Text von `/leistungen/koeln` und `/leistungen/bonn`, Stadtnamen getauscht,
satzweise verglichen.

| Familie | Sätze gleich | Wörter gleich |
|---|---|---|
| `/leistungen/[stadt]` | 55 von 64 | **83 %** |
| `/kaltakquise/[stadt]` | 57 von 70 | 72 % |

Google nennt keinen Schwellenwert (Roadmap § 8). Der Modifier-Delete-Test fällt aber für
`/leistungen/[stadt]` eindeutig aus: Was nach dem Streichen des Stadtnamens bleibt, ist auf
allen fünfzehn Seiten dieselbe Seite. **Das ist zugleich der Hebel nach oben:** Frankfurt #2 und
Düsseldorf #4 stehen gegen Wettbewerber mit einer einzigen echten Ortsseite. Eigener Inhalt je
Stadt — reale Branchenstruktur, Erreichbarkeitsfenster, ein Beispiel aus einem Projekt dort —
ist der Unterschied zwischen #4 und #1 und schützt zugleich vor der Doorway-Einstufung. Nicht in
diesem Paket umgesetzt, weil es echtes Ortswissen braucht (AP-5.1).

---

## 4 · Interne Verlinkung

### 4.1 Befund (live, 01.10.2026)

Gezählt sind Verweise aus Seiteninhalten — Kopf, Navigation (auch Brotkrumen) und Fußzeile zählen
nicht, sie verlinken alles von überall und sagen wenig über den Zusammenhang.

| Seite | eingehend aus Inhalten | Befund |
|---|---|---|
| `/wissen` | **0** | nur über Menü und Fußzeile erreichbar |
| `/ueber-uns` | **1** | Autorenseite der 13 Beiträge, aber kein Beitrag verlinkt sie |
| `/glossar` | 1 | |
| `/branchen` | **2** | Einstieg einer ganzen Familie |
| 6 von 13 Beiträgen | 4–5 | darunter `b2b-leadgenerierung-kanaele`, `vertriebsteam-aufbauen-recruiting` |
| Startseite → Unterseiten | **4 Ziele** bei 2.122 Wörtern | kein Verweis auf `/leistungen`, `/kaltakquise`, Beiträge |
| `/leistungen/[stadt]` → Beiträge | **0** | Schwesterfamilie `/kaltakquise/[stadt]` verweist auf drei |
| Glossar | 6 × „Mehr erfahren“ | einer davon auf die Umleitung `/blog/sdr-as-a-service` |

### 4.2 Umgesetzt

| Stelle | Verweis | Ankertext |
|---|---|---|
| 15 × `/leistungen/[stadt]`, neue Spalte „Zum Weiterlesen“ | 3 Beiträge zur Frage dieser Familie | „Was Vertrieb auslagern kostet“, „Eigenes Vertriebsteam oder Agentur“, „Welcher Akquisekanal wann trägt“ |
| 15 × `/leistungen/[stadt]`, „In der Nähe“ | Nachbarstädte | „Vertriebsagentur <Stadt>“ statt „Vertrieb <Stadt>“ — der Begriff, den die Zielseite im Titel trägt |
| 13 Beiträge, Autorzeile | `/ueber-uns` (`rel="author"`, dieselbe Adresse wie `author.url` im Article-Markup) | Nico-Luca Carpantier |
| 13 Beiträge, unter „Weitere Artikel“ | `/wissen` | „Alle Beiträge, Videos und Begriffe im Wissensbereich“ |
| Glossar, Einleitung | `/wissen` | „Wissensbereich“ |
| 13 Beiträge | Brotkrumen Start › Wissen › Blog statt „Zurück zum Blog“; `BreadcrumbList` gleich | Wissen, Blog |
| Blogübersicht, Glossar | Brotkrumen Start › Wissen › Blog bzw. › Glossar (ohne Markup, wie vorher) | Wissen |
| `/leistungen`, Hinweis unter den Regionen | `/kaltakquise`, `/branchen`, `/kontakt` | „Kaltakquise nach Standort“, „Branchenlösungen“, „sprechen Sie uns an“ |
| Startseite, Prozess | `/leistungen` | „Leistungen im Detail“ |
| Startseite, Häufige Fragen | `/blog/kaltakquise-rechtliche-grundlagen` | „Kaltakquise und Recht“ (nicht „Rechtliche Grundlagen“ — neben der Mail-Adresse läse sich das wie Impressum oder Datenschutz) |
| 4 Beiträge, im Fließtext | Angebot/Verhandlung, Vertriebsteam, `/branchen/it-systemhaeuser`, `/branchen` | nur Wendungen, die schon im Text standen — kein Satz neu geschrieben |
| Glossar | Beitragstitel statt „Mehr erfahren“; 8 Begriffe neu mit Beitrag, 3 mit Leistungsseite; Verweis auf die Umleitung ersetzt | z. B. „Beitrag: Leads qualifizieren: BANT, Lead Scoring und das Buying Center“ |

**Bekannte Grenze, mit Absicht:** Die beiden Verweise auf der Startseite stehen in der Aktionszeile
der Klebe-Bühne (`.pinAction`) neben dem Knopf — wie die Mail-Adresse, die dort schon stand. Auf dem
Telefon blendet `basis.module.css` diese Zeile aus (`[data-buehne] .pinAction`). Im HTML stehen die
Verweise trotzdem, für Suchmaschinen zählen sie; zu sehen sind sie nur ab Tablet-Breite. In die
Antworten selbst gehören sie nicht: Nicht aktive Antworten sind nur durchsichtig, ein Verweis darin
wäre unsichtbar per Tastatur erreichbar. Ein eigener Block nach der Bühne (`.sceneAfter`) brächte
56–120 px Leerraum, an dem die Umbruchprüfung auf dem Telefon misst.

### 4.3 Ergebnis (Produktionsbuild gegen Live, gleiche Zählweise)

| Seite | eingehend vorher → nachher |
|---|---|
| `/wissen` | 0 → **14** |
| `/ueber-uns` | 1 → **14** |
| `/blog/vertrieb-auslagern-kosten-vorteile` | 12 → **27** |
| `/blog/b2b-leadgenerierung-kanaele` | 5 → **21** |
| `/blog/vertriebsteam-aufbauen-recruiting` | 5 → **21** |
| `/blog/angebot-verhandlung-abschluss-b2b` | 4 → 5 |
| `/branchen` | 2 → 4 |
| `/kaltakquise` | 15 → 17 |
| `/leistungen` | 34 → 36 |
| `/branchen/it-systemhaeuser` | 33 → 34 |
| `/blog/leadgenerierung-it-dienstleister` | 5 → 4 (gewollt, siehe 3.1) |
| `/blog` | 15 → 2 (die 13 „Zurück zum Blog“ sind jetzt Brotkrumen in `<nav>` — für Google weiter Verweise, in dieser Zählung nicht) |
| `/leistungen/[stadt]` ausgehend | 9 → 12 je Seite |
| Summe Inhaltsverweise (eindeutig je Seite) | 585 → **656** |

### 4.4 Als Prüfung festgeschrieben

- `scripts/check-internal-links.mjs` verlangt für `/leistungen`, `/kaltakquise`, `/branchen`,
  `/wissen`, `/ueber-uns` und `/kontakt` mindestens zwei Seiteninhalte, die sie verlinken. Nicht
  gezählt werden Kopf und Fuß, der eigene Routenordner, Brotkrumen (Komponente und Markup),
  `llms.txt`, Sitemap, 404- und Offline-Seite sowie Kommentare im Quelltext.
- Dieselbe Prüfung meldet jeden Verweis auf `/blog/<slug>`, den es nicht oder nur als Umleitung
  gibt — auch in Listen wie `{ slug: '…' }`, die eine Vorlage als `/blog/${…}` verlinkt.
- `scripts/blog-audit.mjs` bricht ab, wenn eine FAQ-Antwort Markdown-Verweise enthält — FAQs sind
  reiner Text und gehen wortgleich ins Markup.
- Die Glossarseite bricht den Build, wenn ein `blogLink` auf keinen vorhandenen Beitrag zeigt.

**Zur Entstehung, weil es die Prüfungen erklärt:** Eine unabhängige Durchsicht des Branches fand
in der ersten Fassung, dass die Einstiegsseiten-Prüfung Brotkrumen und `llms.txt` mitzählte —
`/wissen` bestand sie mit null echten Verweisen —, dass der Sitemap-Durchlauf von `check-ssr` den
Statuscode nicht prüfte, und dass ein Verweis versehentlich in einer FAQ-Antwort gelandet war.
Alle drei sind behoben und durch die Regeln oben abgedeckt.

---

## 5 · Titel und Beschreibungen

Regel, wie sie `scripts/check-seo.mjs` misst: Titel 15–65 Zeichen, Beschreibung 70–165.

| | live (01.10.) | Branch |
|---|---|---|
| Titel über 65 Zeichen | 37 von 58 | **0** |
| Beschreibungen über 165 Zeichen | 51 von 58 | 14 (13 Beiträge, KI-Transparenz) |
| Hinweise in `check-seo` | 88 | 14 |
| Suchbegriff am Titelanfang (Vertriebs-Stadtseiten) | 0 von 15 (`Vertrieb Köln …`) | 15 von 15 (`Vertriebsagentur Köln …`) |

Einzelheiten:

- **Kurzer Firmenname** („| Carpantier“) auf beiden Stadtfamilien und den Beiträgen: Mit
  „| Carpantier Consulting“ (24 Zeichen) passt „Vertriebsagentur Düsseldorf: Vertrieb auslagern“
  nicht unter 65. Die Vertriebs-Stadtseiten trugen den kurzen Namen schon vorher.
- **Beiträge:** neues optionales Feld `seoTitle` für das Suchergebnis; die Überschrift auf der
  Seite bleibt unverändert. Elf Beiträge haben eines, zwei passen ohne. Der Rechtsbeitrag heißt
  im Suchergebnis „Kaltakquise im B2B: was erlaubt ist und was nicht“ — nie verkürzt auf „was
  erlaubt ist“ (Textleitfaden § 7.1).
- **Kaltakquise-Stadtseiten:** Die Beschreibung verband zwei Leitbranchen mit „und“ und ergab
  „Software und IT und Logistik“. Jetzt steht die erste Leitbranche als Nachsatz („Leitbranche:
  Energiewirtschaft.“).
- **`/kaltakquise`:** Beschreibung nennt den Kanal („Telefonische B2B-Kaltakquise“); die Zahl der
  Wirtschaftsräume wird gezählt.
- **Blogübersicht:** Beschreibung versprach „50+ Fachartikel“ — seit dem 10.09.2026 sind es 13.
  Die Zahl wird jetzt gezählt.
- **Startseite:** Beschreibung ohne „✓“ und „!“, ohne „Wir“ als Subjekt und ohne eine weitere
  abgetippte Fassung von „3–8“.

---

## 6 · Weitere Änderungen

| Änderung | Begründung |
|---|---|
| `keywords`-Angabe auf allen 14 Seiten entfernt (50 Begriffe allein im Wurzel-Layout), `getCityKeywords` und `industry.keywords` gelöscht | Google wertet das Feld nicht aus; Bing nennt eine überladene Angabe als Spam-Signal; die Suchwortstrategie lag für jeden Wettbewerber im Quelltext |
| Open-Graph-Grundwerte (`src/lib/open-graph.ts`) auf allen Seiten | Next.js ersetzt das `openGraph` einer Unterseite, statt es zu ergänzen: Zehn Seiten hatten kein Vorschaubild, 55 keinen Seitennamen; `/ki-transparenz` und `/referenzen` gaben als `og:url` die Startseite an. Jetzt 59 von 59 mit Bild und Seitenname, 58 eindeutige `og:title` |
| `twitter`-Block im Wurzel-Layout ohne Titel und Beschreibung | Jede Unterseite erbte Titel und Beschreibung der Startseite; ohne sie greift X auf `og:*` der Seite zurück |
| Brotkrumen-Markup der Branchenseiten: „Startseite“ statt „Home“ | wie überall sonst |
| `/wissen`-Titel gekürzt | 76 → 60 Zeichen |

**Nicht geändert, mit Absicht:**

- **Beschreibungen der 13 Beiträge** (195–249 Zeichen): Sie sind zugleich der sichtbare Anreißer
  auf `/blog` und `/wissen`. Kürzen ist eine Textentscheidung, keine technische. Google schneidet
  bei ~155 ab; das Wichtige steht in allen 13 vorn.
- **Beschreibung von `/ki-transparenz`** (220 Zeichen): Die Seite ist unantastbar (Auftrag § 3.4);
  geändert wurden nur ihre Open-Graph-Angaben.
- **H1 der Stadtseiten** („Vertrieb auslagern in Köln – ohne den Abschluss aus der Hand zu geben.“):
  Der Titel trägt jetzt den Suchbegriff; die Überschrift ist Gestaltung und Text (seitentexte.md § 3).
- **Weiteres Schema:** Roadmap § 11 — kein Uplift gemessen. Die neuen Brotkrumen entsprechen nur dem
  vorhandenen `BreadcrumbList`.

---

## 7 · Prüfstand

### 7.1 Gate

`pnpm verify`: Typen, Lint, neun inhaltliche Prüfungen ohne Beanstandung, Produktionsbuild.

### 7.2 Gegen den Produktionsbuild (`localhost:3100`)

| Prüfung | Ergebnis |
|---|---|
| `check-live` | 103 Abrufe, keine Beanstandung |
| `check-ssr` | 6 Adressen mit 12 Textstellen in `<main>`; 52 weitere mit Status 200 und ohne gestreamten Inhalt |
| `check-seo` | 58 eindeutige Titel und Beschreibungen, keine Beanstandung, 14 Hinweise |
| `check-performance` | CLS 0,000 überall; LCP Mittel 446–487 ms über mehrere Läufe (Basis ohne Änderungen: 440–494 ms) |
| Kopfdaten-Vergleich mit live, alle 58 Adressen | `canonical` und `robots` unverändert; JSON-LD parsebar; genau eine `h1` in `<main>`; keine `keywords`; kein Markdown-Rest im Text; Brotkrumen sichtbar und im Markup gleich |
| Umbruchprüfung (`pnpm test:e2e`, 26 Adressen × 7 Breiten u. a.) | 368 von 368 |

### 7.3 Nebenbefund: LCP auf zwei Seiten

`/leistungen` und `/leistungen/[stadt]` liegen bei **~780 ms LCP** — im Produktionsbuild **ohne**
die Änderungen dieses Pakets gleich gemessen (772–804 ms). Die Revision vom 12.09.2026 maß dort
328–340 ms. Beide Seiten teilen das Einstiegsbild `nico-sales-call.jpg`. Weit unter der Schwelle
von 2,5 s, aber eine Verdopplung seit dem 12.09., deren Ursache in einem der späteren Umbauten
liegt. Nicht untersucht.

### 7.4 Abnahme auf der Live-Domain (01.10.2026, nach dem Deployment von `ac019d8`)

Mit dem Branch gingen die elf bis dahin nicht gepushten Commits vom 23.09.2026 (Seitenstruktur,
Aufräumen, Dokumentation) live; sie waren Grundlage aller Prüfungen oben. Der JUKE-Talents-Commit
vom 18.09.2026 (`5eb9069`) ist per Rebase in die neue Struktur übernommen.

| Prüfung gegen `https://carpantier-consulting.de` | Ergebnis |
|---|---|
| Vercel-Deployment `ac019d8`, Umgebung Production | erfolgreich, rund eine Minute Build |
| `check-live` | 103 Abrufe, keine Beanstandung |
| `check-ssr` | Inhalt in `<main>` auf 6 Stichproben; 52 weitere Adressen mit Status 200, nichts gestreamt |
| `check-seo` | 58 eindeutige Titel und Beschreibungen, 14 Hinweise (vorher 88) |
| Inhaltsverweise (Zählweise aus 4) | 585 → 656; `/wissen` 0 → 14, `/ueber-uns` 1 → 14 |
| Einwilligung (Release-Checkliste 3.1) | vor der Einwilligung und nach „Alle ablehnen“ kein Abruf eines fremden Hosts |
| Entfernte Endpunkte (3.4) | `/api/chat`, `/api/admin/leads`, `/api/cron/cleanup-chats` → 404 |
| **Nicht** automatisch geprüft | Kontaktformular mit echter Anfrage (3.2) und „Alle akzeptieren“ (3.1) — beide erzeugen echte Zustellung bzw. Messdaten |

---

## 8 · Nächste Schritte nach Hebel

| # | Schritt | Wer | Warum jetzt |
|---|---|---|---|
| 1 | ~~Branch prüfen, freigeben, deployen~~ — erledigt 01.10.2026 (`ac019d8`). **Offen:** in der Search Console die Sitemap neu einreichen | Damjan | Titeländerungen wirken erst nach dem nächsten Crawl |
| 2 | **Search-Console-Zugang** — oder den Connector „AdvisorPPC (Search Console)“ in claude.ai autorisieren | Nico / Damjan | Ohne ihn bleibt jede Positionsaussage eine Stichprobe. Erst damit lässt sich sagen, für welche Anfragen die Seite tatsächlich Impressionen hat — und welche Adresse für „vertriebsagentur köln“ rankt |
| 3 | Google Business Profile (AP-4.1), Anschrift vorher klären (AP-1.0) | Nico | Local Pack für „vertriebsagentur köln“ gewinnt AS Concepts mit 52 Bewertungen; ohne Profil ist die Firma dort nicht vorhanden |
| 4 | Ortssubstanz für `/leistungen/[stadt]` (AP-5.1), zuerst Frankfurt und Düsseldorf | Nico liefert Ortswissen, Umsetzung im Code | 83 % Vorlage auf der Familie, die rankt — Risiko und Hebel zugleich (3.3) |
| 5 | Sortlist, wlw, OMR Reviews (AP-4.2) | Nico | Sortlist steht in 13 von 29 gemessenen Trefferlisten, auf der Kölner Kategorieseite fehlt Carpantier |
| 6 | Preise veröffentlichen (AP-2.1) | Nico | Gefäß steht; einer von zwei gemessenen On-Page-Hebeln |
| 7 | KI-Linker **nach dem Deployment**: Guthaben im Vercel AI Gateway, dann `npm run links -- carpantier --all` | Damjan | Modell `typesafe-ai/jev`, 110 Ranking-Aufrufe plus Ankerdurchgang, geschätzt ≈ 0,03 $ (≈ 0,02 €), harte Grenze `--max-usd 0.10`. Braucht eine neue Freigabe mit Modell, Aufrufzahl und Budget. Liefert je Seite den Verweis, den ein Leser als Nächstes braucht — Gegenprobe zu 4.2 |
| 8 | Nachmessung frühestens vier Wochen nach dem Deployment | — | Gleiche Bedingungen wie am 10.09.2026; Begriffe aus Roadmap § 9 |

---

## 9 · Dateien dieses Pakets

```
docs/README.md, docs/sichtbarkeit/SEO-ANALYSE-2026-10.md   dieses Dokument und sein Eintrag
scripts/check-ssr.mjs                Inhalt in <main>; jede Sitemap-Adresse: Status 200, nicht gestreamt
scripts/check-internal-links.mjs     Einstiegsseiten aus Seiteninhalten; unbekannte/umgeleitete Beiträge
scripts/blog-audit.mjs               keine Markdown-Verweise in FAQs
src/app/loading.tsx                  gelöscht
src/app/layout.tsx                   Startseiten-Titel/-Beschreibung, keywords entfernt, OG-Grundwerte,
                                     twitter ohne Titel, Hinweis an <main>
src/lib/open-graph.ts                neu: OG-Grundwerte
src/app/(home)/_components/          zwei Verweise (Prozess, Fragen)
src/app/leistungen/layout.tsx, [stadt]/layout.tsx                  Titel/Beschreibung, OG
src/app/leistungen/[stadt]/_components/RegionSection.tsx, stadt.module.css
                                     Spalte „Zum Weiterlesen“, Ankertexte „Vertriebsagentur <Stadt>“
src/app/leistungen/_components/RegionsSection.tsx, leistungen.module.css
                                     Hinweis mit Verweisen, Verweisstil
src/app/kaltakquise/page.tsx, [stadt]/layout.tsx                   Titel/Beschreibung, OG
src/app/branchen/page.tsx, [branche]/layout.tsx                    Titel/Beschreibung, OG
src/app/branchen/[branche]/page.tsx  Abschluss ohne dynamic()/Suspense; „Startseite“ im Markup
src/app/impressum/page.tsx, datenschutz/page.tsx                   ohne Suspense
src/app/impressum/layout.tsx, datenschutz/layout.tsx, ki-transparenz/layout.tsx,
src/app/referenzen/layout.tsx        OG
src/app/kontakt/page.tsx, ueber-uns/page.tsx                       Titel, keywords entfernt, OG
src/app/wissen/page.tsx, wissen/videos/page.tsx                    Titel, keywords entfernt, OG
src/app/blog/page.tsx                Titel, gezählte Beitragszahl, Brotkrumen, OG
src/app/blog/[slug]/page.tsx         seoTitle, Brotkrumen, Autorverweis, Verweis /wissen, OG
src/app/glossar/page.tsx             Verweistexte, Leistungsverweise, Verweis /wissen, Brotkrumen, OG
src/content/blog/*.ts                seoTitle (11), Fließtext-Verweise (4)
src/content/glossar.ts               Beiträge und Leistungsseiten je Begriff
src/content/industries.ts            Titel/Beschreibung, keywords entfernt
src/content/cities.ts                getCityKeywords entfernt
src/lib/blog-types.ts                Feld seoTitle
```
