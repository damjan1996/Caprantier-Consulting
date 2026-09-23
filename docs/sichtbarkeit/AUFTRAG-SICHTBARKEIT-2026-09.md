# Arbeitsauftrag: Sichtbarkeit carpantier-consulting.de

**Erstellt:** 10.09.2026 · **Grundlage:** Live-Messung Google/Bing/DDG/KI-Übersicht vom 10.09.2026
**Repo:** `C:\Users\damja\WebstormProjects\Nico Luca Carpantier` · Branch `main`
**Zugehörige Analyse:** `C:\Users\damja\Documents\Carpantier Consulting\COMPETITOR-SEO-EXPLORATION.md`

---

## 0 · An die Session, die diesen Auftrag übernimmt

Lies diese Datei vollständig, bevor du eine Zeile änderst. Danach:

1. **Arbeite Abschnitt 6 der Reihe nach ab.** Die Reihenfolge ist keine Empfehlung, sondern eine Abhängigkeitskette.
2. **Jedes Arbeitspaket hat ein Akzeptanzkriterium und einen Prüfbefehl.** Ein Paket ist erst fertig, wenn der Prüfbefehl grün ist — nicht, wenn der Code geschrieben ist.
3. **Fasse nichts aus Abschnitt 3 an.** Das sind die Stellen, an denen dieses Projekt schon einmal beschädigt wurde.
4. **Was du nicht entscheiden kannst, entscheidest du nicht.** Abschnitt 4 trennt sauber, was Code leisten kann und was von Nico kommen muss. Wenn ein Paket an fehlendem Input hängt: Paket sauber bis zur Grenze bauen, die Grenze im Ergebnis benennen, nächstes Paket beginnen. Nicht erfinden.
5. **Am Ende läuft Abschnitt 7** — der Revisionslauf über die gesamte Seite.

Alles in diesem Auftrag ist am 10.09.2026 gemessen worden. Wenn du später startest, prüfe die Zahlen in Abschnitt 2 stichprobenartig nach, bevor du dich darauf verlässt.

---

## 1 · Projektkontext

| | |
|---|---|
| **Was** | Marketing-Website + Lead-Generierung für Carpantier Consulting, B2B-Vertriebsagentur (Telefonakquise, Leadgenerierung, Terminqualifizierung) |
| **Inhaber** | Nico-Luca Carpantier, Köln |
| **Stack** | Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind CSS v4, Prisma 5 + PostgreSQL |
| **Weitere Bausteine** | Anthropic SDK (Chatbot, Claude Haiku 4.5), Brevo (Mail), GA4 + Consent Mode v2, Calendly, Playwright |
| **Paketmanager** | **pnpm** (nicht npm) |
| **Deployment** | Vercel (primär), Docker + Nginx (alternativ) |

### Befehle

```bash
pnpm dev                 # Dev-Server (Turbopack)
pnpm typecheck           # tsc --noEmit
pnpm lint                # eslint
pnpm check:compliance    # Rechts-Regressionsschutz, siehe Abschnitt 3
pnpm build               # prisma generate && next build
pnpm verify              # typecheck + lint + check:compliance + build  ← das Gate
pnpm test:e2e            # Playwright
```

### Die Dateien, um die es hier geht

| Pfad | Inhalt |
|---|---|
| `src/lib/blog.ts` | **8.287 Zeilen**, alle 52 Blogartikel als Objekte mit `content` als Template-Literal |
| `src/lib/cities.ts` | 17 Stadt-Datensätze, speisen `/leistungen/[stadt]` |
| `src/lib/local-seo.ts` | `businessInfo` (NAP), `localDirectories` (15 Einträge, **alle `status: 'pending'`**), `getLocalBusinessSchema` |
| `src/lib/schemas.ts` | JSON-LD-Generatoren: City-FAQ, BlogPost, Blog-FAQ, Breadcrumb, HowTo, Homepage-FAQ, ServiceArea, HomepageVideo |
| `src/app/sitemap.ts` | Sitemap, dynamisch |
| `public/robots.txt` | **statisch** — hier liegen die Crawler-Sperren |
| `src/app/leistungen/[stadt]/page.tsx` | Stadt-Landingpages |
| `src/app/blog/[slug]/page.tsx` | Artikelseite, rendert `post.content` über `<Markdown>` |
| `scripts/check-compliance.mjs` | Rechts-Gate, Teil von `pnpm verify` |

---

## 2 · Messbefund vom 10.09.2026 — arbeite damit, nicht dagegen

### Was funktioniert

| Suchbegriff (google.de, Standort Köln) | Position |
|---|---|
| `vertriebsagentur frankfurt` | **2** |
| `vertriebsagentur düsseldorf` | **4** |
| `kaltakquise agentur köln` | **6** |
| `vertriebsagentur köln` / `berlin` / `stuttgart` | **7** |
| `telefonakquise agentur köln` / `vertriebsagentur hamburg` | **8** |
| `carpantier consulting` / `nico carpantier` | **1** |

Bing `vertriebsagentur köln` → **Position 1**. DuckDuckGo `kaltakquise agentur köln` → **Position 2**.
Das Muster `vertriebsagentur [stadt]` trägt. Es ist der einzige Hebel, der heute nachweislich zieht.

### Was nicht funktioniert

- **0 von 9** nationalen Kaufbegriffen in den Top 10 (`kaltakquise agentur`, `vertrieb auslagern`, `b2b terminvereinbarung agentur`, `vertriebsoutsourcing b2b`, `sdr as a service`, …).
- **0 von 10** informationellen Suchanfragen — obwohl für fast jede ein Blogartikel existiert.
- `site:carpantier-consulting.de/blog` → **„Ungefähr 5 Ergebnisse"** bei 52 Blog-URLs in der Sitemap. Indexiert sind nur `/blog`, `einwandbehandlung-vertrieb`, `b2b-kaltakquise-leitfaden`, `kaltakquise-rechtliche-grundlagen`, `vertrieb-auslagern-kosten-vorteile`.
- **Kein Google Business Profile.** Der lokale Index kennt die Firma nicht; Google schlägt bei der Markensuche die fremde „Carpentier Consulting GmbH" (Gau-Weinheim) vor.
- Auf `/leistungen` steht **kein Preis**.

### Die wahrscheinliche Ursache der Nicht-Indexierung — im Repo messbar

```
52 Artikel · Median 457 Wörter · Mittel 470 · Minimum 221 · Maximum 765
Unter 600 Wörtern: 38 von 52.  Über 900 Wörtern: 0 von 52.
FAQ-Block vorhanden: 5 von 52.
```

Gleichzeitig behaupten die Artikel `readingTime` bis **„12 min"** — ein 457-Wort-Text ist in unter zwei Minuten gelesen. Das ist kein Ranking-Problem, das ist ein Qualitätssignal-Problem: 52 kurze, thematisch überlappende, KI-geschriebene Texte ohne externe Verlinkung, dazu eine nachprüfbar falsche Lesezeit-Angabe. Google hat sie gecrawlt und nicht in den Index genommen.

**Konsequenz für diesen Auftrag: Mehr Artikel derselben Machart verschärfen das Problem.** Der Blog wird verkleinert und vertieft, nicht erweitert.

### Wettbewerbslage in einem Satz

Köln entscheiden **SharkByte** (Platz 1 Köln *und* Düsseldorf mit nur ~23 indexierten Seiten, sichtbarer Einstiegspreis „40-Stunden-Pilot 2.000 €"), **AS Concepts** (4,9 ★ aus 52 Google-Bewertungen, gewinnt Local Pack und wird in Googles KI-Übersicht zuerst genannt) und **Profit Sale** (fünf Video-Cases mit Firmennamen). National gehören die Kaufbegriffe triveo (seit 2002), DIMARCON (seit 1992), PATT (seit 1994, 2.764 Referenzen, ISO 9001, Preis öffentlich).

Marktband laut Googles eigener KI-Übersicht: **2.000–8.000 €/Monat** oder **~300 € pro qualifiziertem Termin**.

---

## 3 · Unantastbar

Diese Punkte sind nicht verhandelbar. `pnpm check:compliance` erzwingt die ersten drei automatisch — es gehört zu `pnpm verify` und damit vor jedes Deployment.

1. **Kein `aggregateRating`, keine `Review`-Auszeichnung, solange es keine echten, freigegebenen und auf der Seite sichtbaren Kundenstimmen gibt.** Das Gate bricht den Build. Grund: § 5 UWG. Auch nicht „als Platzhalter", auch nicht auskommentiert in einer `.ts`-Datei — das Skript prüft den Quelltext, nicht das Rendering.
2. **Impressum: `§ 5 DDG`, niemals `§ 5 TMG`.**
3. **Kein Link auf die EU-Plattform zur Online-Streitbeilegung** (seit 20.07.2025 abgeschaltet).
4. **`/ki-transparenz` bleibt bestehen und bleibt vollständig.** Die Seite legt offen, dass alle fotorealistischen Personenbilder KI-generiert sind und Blog-/Glossartexte KI-gestützt entstanden. Das ist AI Act Art. 50 und ein Aktivposten. Sie wird nicht abgeschwächt, nicht versteckt, nicht aus der Navigation genommen. Wenn Bilder ersetzt werden, wird die Seite **nachgeführt**, nicht gelöscht.
5. **Keine erfundenen Zahlen.** Keine Kundenlogos ohne Freigabe, keine Fallzahlen ohne Beleg, keine Terminquoten, die nicht aus echten Projekten stammen. Wettbewerber behaupten „489 Mio. € Abschlusssummen" — das ist deren Risiko, nicht unser Vorbild.
6. **NAP bleibt konsistent.** `businessInfo` in `src/lib/local-seo.ts` ist die einzige Quelle für Name, Adresse, Telefon. Keine abweichende Schreibweise irgendwo sonst im Code.
7. **Rechtsaussagen zur Kaltakquise bleiben korrekt.** B2B-Telefonakquise ist nach § 7 UWG bei mutmaßlicher Einwilligung zulässig; Kaltakquise-**Mail** ohne Einwilligung ist es nicht. Diese Unterscheidung darf in keinem Text verwischt werden.
8. **Nicht committen und nicht deployen ohne ausdrückliche Freigabe.** Arbeiten, `pnpm verify` grün melden, Ergebnis berichten. Push entscheidet Damjan.

---

## 4 · Wer macht was

Der wichtigste Abschnitt dieses Auftrags. Ein erheblicher Teil des Rückstands ist **nicht durch Code behebbar**.

### Kann diese Session allein erledigen

- Crawler-Sperren, `llms.txt`, Sitemap, strukturierte Daten, Metadaten
- Blog-Konsolidierung, Umleitungen, interne Verlinkung
- `readingTime` an die tatsächliche Textlänge binden
- Neue Stadt- und Nischenseiten aus vorhandenen Mustern
- Datenmodell und Komponenten für Fallstudien, Preise, Bewertungen — **die Gefäße**
- Statuspflege in `localDirectories`

### Braucht Nico — ohne ihn kein Fortschritt

| Was | Warum es nicht anders geht |
|---|---|
| **Google Business Profile anlegen und verifizieren** | Verifizierung läuft über Postkarte/Telefon an die echte Firma. Höchster Einzelhebel des gesamten Auftrags. |
| **Bewertungen einsammeln** | Ohne echte Bewertungen kein Bewertungs-Markup (siehe Abschnitt 3.1). Zielmarke 20+, um an AS Concepts (4,9 ★ / 52) heranzukommen. |
| **Echtes Foto** | Das Gründerporträt ist als KI-generiert deklariert. Bei einer Ein-Mann-Agentur ist der Gründer das einzige, was der Käufer beurteilen kann. |
| **2–3 echte Fallstudien** | Auch anonymisiert („IT-Systemhaus, 45 MA — 14 Entscheidertermine in 8 Wochen") braucht es reale Zahlen aus realen Projekten. |
| **Preisentscheidung** | Ob 2.000 € Pilot, 300 €/Termin oder Retainer — das ist eine Geschäftsentscheidung, keine technische. |
| **Sortlist / OMR Reviews / ProvenExpert** | Profilanlage verlangt Firmendaten und Identitätsnachweis. |
| **Google-Search-Console-Zugriff** | Ohne den ist AP-1 eine Vermutung statt einer Diagnose. |
| **Fachliche Substanz für die Tiefenartikel** | Was die Artikel von KI-Fließtext unterscheidet, sind Nicos echte Gesprächserfahrungen, Einwände, Zahlen. |

**Wenn dieser Input fehlt:** Gefäß bauen, mit klar als Beispiel markierten Platzhaltern befüllen, die Lücke im Ergebnisbericht benennen. Niemals Platzhalter, die wie echte Angaben aussehen.

---

## 5 · Zielbild

Nach vollständiger Umsetzung:

- Der Blog besteht aus **10–14 belastbaren Artikeln** statt 52 dünnen. Jeder deckt eine reale Suchanfrage ab, ist über 1.200 Wörter, hat einen FAQ-Block und mindestens eine externe Quelle. Die übrigen 38–42 sind zusammengeführt und per `301` umgeleitet — nicht gelöscht.
- `readingTime` wird berechnet, nicht behauptet.
- Das Stadt-Muster ist auf die zweite Begriffsfamilie ausgeweitet (`kaltakquise agentur [stadt]`, `b2b terminvereinbarung [stadt]`).
- Es existieren **zwei Nischenseiten** — Personaldienstleister und IT-Systemhäuser — als eigene Einstiege statt als Blogthemen.
- `/leistungen` nennt einen Preis oder ein nachvollziehbares Preismodell.
- Fallstudien haben ein Datenmodell und eine Darstellung; sie warten nur noch auf Inhalte.
- `robots.txt` sperrt keine SEO-Crawler mehr, `llms.txt` existiert.
- `localDirectories` bildet den echten Stand ab statt 15× `pending`.

---

## 6 · Arbeitspakete

### AP-1 · Diagnose der Nicht-Indexierung
**Blockiert alles Weitere am Blog. Zuerst.**

- **Ziel:** Belegen, *warum* 48 von 52 Artikeln nicht im Index sind.
- **Vorgehen:**
  1. Search Console → Seiten-Bericht. Die beiden Kategorien sauber trennen: **„Gecrawlt – zurzeit nicht indexiert"** (Google war da und hat abgelehnt → Qualitätsproblem, AP-3 ist die richtige Antwort) gegen **„Gefunden – zurzeit nicht indexiert"** (Google war nicht da → Crawl-Budget/Verlinkung, dann zuerst interne Verlinkung und Sitemap prüfen).
  2. Prüfen, ob die Blogartikel überhaupt intern verlinkt sind — von Startseite, `/leistungen`, `/wissen` oder nur von `/blog`.
  3. Stichprobe: drei nicht indexierte URLs mit dem URL-Prüftool live testen.
- **Ohne GSC-Zugang:** Der Repo-Befund aus Abschnitt 2 (Median 457 Wörter, 0 Artikel über 900, falsche `readingTime`) ist stark genug, um mit AP-3 zu beginnen. Dann aber **im Bericht als Annahme kennzeichnen**, nicht als Diagnose.
- **Akzeptanz:** Schriftlicher Befund mit Zahlen je Kategorie, im Repo unter `docs/`.

---

### AP-2 · Crawler-Sperren und `llms.txt`
**Kleinster Aufwand im gesamten Auftrag, sofort erledigen.**

- **Dateien:** `public/robots.txt`, neu `public/llms.txt`
- **Vorgehen:**
  1. Die Blöcke `User-agent: AhrefsBot`, `SemrushBot`, `DotBot`, `MJ12bot` mit `Disallow: /` **entfernen**. Sie verhindern keine Konkurrenzanalyse — Wettbewerber sehen das Backlinkprofil über Fremdcrawls ohnehin. Sie nehmen die Domain aus genau den Datensätzen, aus denen Vergleichs-Listicles gespeist werden, und aus dem eigenen Monitoring. Zwei der drei stärksten Köln-Rivalen sperren nichts.
  2. `Disallow: /*?*` prüfen: Der Block kappt sämtliche Query-Parameter-URLs. Die `utm_*`-Ausnahmen darunter greifen bei Google nicht zuverlässig, weil `Disallow` und `Allow` gleicher Spezifität konkurrieren. Entweder die Regel entfernen und Duplikate über `canonical` lösen (bevorzugt), oder die Ausnahmen präzisieren.
  3. **KI-Crawler bleiben erlaubt.** GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, CCBot: kein einziger der 18 geprüften Wettbewerber sperrt sie. Nicht anfangen.
  4. `public/llms.txt` anlegen. Aufbau wie bei den Wettbewerbern shark-byte.de, triveo.de, asconcepts.de, vertriebwerk.com: H1 mit Firmenname, ein `>`-Blockzitat als Kurzbeschreibung, danach Abschnitte mit Links auf Leistungen, Städte, die verbliebenen Kernartikel, Kontakt. Inhalte aus `businessInfo` ziehen, nicht neu tippen.
- **Einordnung, damit die Erwartung stimmt:** Google wertet `llms.txt` nicht aus. Es ist Parität mit fünf Wettbewerbern, kein Ranking-Hebel. Entsprechend niedrig priorisiert, aber in 30 Minuten erledigt.
- **Akzeptanz:** `curl -s https://carpantier-consulting.de/llms.txt` liefert nach Deploy 200 mit `text/plain`; in `robots.txt` steht kein SEO-Crawler mehr auf `Disallow`.

---

### AP-3 · Blog-Sanierung
**Das größte Paket. Nicht anfangen, bevor AP-1 steht.**

- **Ziel:** Aus 52 dünnen Artikeln 10–14 belastbare machen, ohne einen einzigen Link zu brechen.
- **Vorgehen:**
  1. **Bestand aufnehmen.** Für jeden der 52 Slugs erfassen: Wortzahl, ob indexiert (Abschnitt 2 nennt die vier), ob eine reale Suchanfrage dahintersteht, thematische Überschneidung mit anderen. Ergebnis als Tabelle in `docs/`.
  2. **Cluster bilden.** Beispiele, die sich im Bestand aufdrängen: `kaltakquise-warmakquise-unterschied` + `gespraechseinstieg-kaltakquise` + `einwandbehandlung-vertrieb` + `gatekeeper-ueberwinden` + `telefonakquise-skript-erstellen` + `kaltakquise-beste-uhrzeit` → **ein** Leitfaden Gesprächsführung. `vertriebsstrategie-entwickeln` + `vertriebsziele-smart-methode` + `vertriebskennzahlen-kpis` + `vertriebspipeline-aufbauen` → **ein** Artikel Vertriebssteuerung. Die Cluster vor der Umsetzung zur Freigabe vorlegen.
  3. **Zielartikel schreiben.** Pro Artikel: über 1.200 Wörter, echte Gliederung, FAQ-Block (bisher haben nur 5 von 52 einen), mindestens eine externe Quelle mit Link, interne Links auf `/leistungen` und die passende Stadtseite. **Substanz kommt von Nico** (Abschnitt 4) — ohne seinen Input entsteht wieder derselbe Fließtext, der das Problem verursacht hat. Wenn er nicht liefert: Gliederung und Faktengerüst bauen, Textstellen sichtbar als `TODO(Nico)` markieren, nicht mit Füllmaterial schließen.
  4. **Umleiten.** Jeder zusammengeführte Slug bekommt eine **301** auf seinen Zielartikel. `next.config.js` hat bisher **nur** `headers()` — die `async redirects()`-Funktion muss neu angelegt werden. Keine 404, kein stilles Löschen.
  5. **Sitemap** zieht automatisch aus `blog.ts`; nach dem Umbau gegenprüfen, dass keine umgeleitete URL mehr darin steht.
  6. **Struktur:** `src/lib/blog.ts` hat 8.287 Zeilen. Wenn die Artikel auf 10–14 schrumpfen, bleibt die Datei handhabbar — dann nicht zusätzlich umbauen. Falls die Zielartikel die Datei über ~4.000 Zeilen treiben, je Artikel eine Datei unter `src/content/blog/` und ein Index in `blog.ts`. **Diese Entscheidung erst nach Schritt 3 treffen**, nicht vorher.
- **Akzeptanz:** `pnpm verify` grün · kein verbliebener Artikel unter 1.200 Wörtern · jeder entfernte Slug beantwortet mit 301 · jeder Artikel hat FAQ und mindestens einen externen Link.
- **Prüfbefehl:** `node scripts/blog-audit.mjs` (in diesem Paket mit anlegen: gibt je Artikel Wortzahl, FAQ-Anzahl, Anzahl externer Links aus und bricht mit Exit-Code 1 bei Unterschreitung).

---

### AP-4 · `readingTime` ehrlich machen

- **Problem:** `readingTime: '12 min'` steht an einem 457-Wort-Artikel. Das ist eine nachprüfbar falsche Angabe auf einer Seite, die Vertrauen verkauft.
- **Vorgehen:** `readingTime` aus dem Datensatz nehmen und zur Laufzeit aus der Wortzahl berechnen (200 Wörter/Minute, auf volle Minuten aufrunden, Minimum 1). Ableitung in `src/lib/blog.ts` neben den bestehenden Preview-Helfern.
- **Akzeptanz:** Kein Artikel trägt mehr eine handgesetzte Lesezeit; die angezeigte Zeit passt zur tatsächlichen Länge. `pnpm typecheck` grün.

---

### AP-5 · Stadt-Muster ausbauen
**Das einzige, was messbar funktioniert. Hier liegt der schnellste Ertrag.**

- **Ziel:** Die zweite Begriffsfamilie besetzen. Heute rankt `vertriebsagentur [stadt]`; `kaltakquise agentur [stadt]` und `telefonakquise agentur [stadt]` fallen bisher an Wettbewerber.
- **Vorgehen:**
  1. `src/lib/cities.ts` enthält 15 Städte (`koeln duesseldorf bonn essen dortmund frankfurt muenchen hamburg berlin stuttgart hannover leipzig dresden nuernberg bremen`); `src/app/sitemap.ts` mappt sie direkt. Bestand ist konsistent, hier ist nichts zu reparieren.
  2. Zweite Route anlegen, Muster von `/leistungen/[stadt]` übernehmen: `/kaltakquise/[stadt]`. **Keine Kopie der Texte** — sonst entsteht dasselbe Dünn-Content-Problem eine Ebene höher. Je Stadt braucht es einen eigenen Absatz mit lokalem Bezug (Branchenstruktur, Industrie vor Ort, Erreichbarkeit).
  3. `generateCityFAQSchema` und `generateServiceAreaSchema` aus `src/lib/schemas.ts` wiederverwenden.
  4. Interne Verlinkung: Jede Stadtseite verlinkt auf die passenden Kernartikel aus AP-3 und umgekehrt.
  5. Priorität nach Messstand: Frankfurt (#2) und Düsseldorf (#4) sind nah an der Spitze — dort zuerst nachlegen. München, Leipzig, Bremen, Nürnberg ranken bislang nicht; dort ist der Aufwand größer als der erwartete Ertrag.
- **Akzeptanz:** Neue Routen bauen, sind in der Sitemap, tragen valides JSON-LD, kein Textblock ist über zwei Städte hinweg identisch.

---

### AP-6 · Preisanker auf `/leistungen`
**Hängt an Nicos Entscheidung (Abschnitt 4).**

- **Kontext für die Entscheidung:** Marktband laut Googles KI-Übersicht 2.000–8.000 €/Monat oder ~300 €/Termin. PATT nennt öffentlich ab 2.000 €/Monat. SharkByte gewinnt Köln unter anderem mit einem sichtbaren „40-Stunden-Pilot 2.000 €". Erst-Kontakt startet bei „wenigen hundert Euro". Kurios: Der einzige indexierte Carpantier-Artikel mit Preisbezug nennt im Google-Snippet bereits „2.000–15.000 €/Monat je nach Modell" — die Marke beziffert den Markt also schon, nur nicht dort, wo verkauft wird.
- **Vorgehen:** Preisbaustein auf `/leistungen` bauen, der drei Modelle aufnehmen kann (Pilot / Retainer / pro Termin). Werte aus einer Konstante, nicht im JSX verstreut. `Offer`-Schema **nur**, wenn ein echter Preis feststeht.
- **Akzeptanz:** Baustein steht, ist über eine Konstante konfigurierbar, ohne Freigabe nicht veröffentlicht.

---

### AP-7 · Fallstudien: Gefäß bauen
**Inhalte kommen von Nico. Das Gefäß nicht.**

- **Vorgehen:**
  1. Typ `CaseStudy` definieren: Branche, Unternehmensgröße, Ausgangslage, Zeitraum, Maßnahme, Ergebniszahlen, ob der Kundenname genannt werden darf.
  2. Übersicht plus Detailansicht, Einstieg von Startseite und `/leistungen`.
  3. **Kein `aggregateRating`, kein `Review`-Schema.** Siehe Abschnitt 3.1 — das Compliance-Gate bricht den Build. Zulässig ist `Article` oder `CreativeWork`.
  4. Ohne Inhalte: **eine** klar als Beispiel gekennzeichnete Fallstudie zur Demonstration, sichtbar als solche markiert, nicht indexierbar (`noindex`), und im Bericht benannt.
- **Akzeptanz:** Route und Komponenten stehen, `pnpm check:compliance` grün, keine erfundene Zahl im Auslieferungsstand.

---

### AP-8 · Nischenseiten
**Der Weg an den Platzhirschen vorbei.**

- **Begründung aus der Messung:** Gegen triveo, DIMARCON und PATT ist `kaltakquise agentur` nicht zu gewinnen — 30+ Jahre Historie, dreistellige Referenzzahlen, ISO-Zertifizierung. Googles KI-Übersicht zur Frage nach IT- und Personaldienstleistern zitiert dagegen **Die Vertriebswikinger** und **DIMARCON**, also Nischenschärfe. Genau dort ist Platz.
- **Vorgehen:** Zwei eigenständige Landingpages, nicht als Blogartikel:
  - `Vertriebsagentur für Personaldienstleister` — Nicos Recruiting-Hintergrund ist der glaubwürdigste Aufhänger, den die Marke hat.
  - `Leadgenerierung für IT-Systemhäuser und Managed Service Provider` — direkte Konkurrenz ist BDE Sales Partners, die exakt diese Positionierung fahren, aber mit fünf namentlichen Referenzen.
  Aufbau wie die Stadtseiten: eigenes FAQ-Schema, eigener Einstieg, interne Verlinkung.
- **Akzeptanz:** Beide Routen bauen, in der Sitemap, valides JSON-LD, keine Textdopplung zu bestehenden Seiten.

---

### AP-9 · `localDirectories` an die Wirklichkeit binden

- **Problem:** Alle 15 Einträge in `src/lib/local-seo.ts` stehen auf `status: 'pending'` — inklusive Google Business Profile. Das ist ein Aufgabenzettel, der als Datenstruktur getarnt ist.
- **Vorgehen:** Feld um `submittedAt` und `profileUrl` erweitern, Sortlist / OMR Reviews / ProvenExpert ergänzen (Sortlist stand in 13 von 29 gemessenen SERPs und wird von der KI-Übersicht als Vergleichsquelle empfohlen — dort zu fehlen kostet mehr als jedes einzelne Ranking). Status nach jeder tatsächlichen Anmeldung pflegen.
- **Akzeptanz:** Struktur erweitert, Sortlist/OMR/ProvenExpert enthalten, `pnpm typecheck` grün.

---

## 7 · Revisionslauf

**Läuft, wenn AP-1 bis AP-9 abgeschlossen sind.** Kein Teil davon darf durch ein einzelnes Arbeitspaket vorweggenommen werden — der Sinn ist der Blick auf das Ganze, nachdem alle Teile sich gegenseitig beeinflusst haben.

### 7.1 Technisch

```bash
pnpm verify        # muss grün sein, ohne Ausnahme
pnpm test:e2e      # Playwright, alle Suites
```

Zusätzlich prüfen:
- **Jede URL der Sitemap** liefert 200. Kein Eintrag zeigt auf eine umgeleitete oder entfernte Seite.
- **Jeder entfernte Blog-Slug** antwortet mit 301 auf ein sinnvolles Ziel — nicht pauschal auf `/blog`.
- **Canonicals** eindeutig, keine Seite verweist auf eine andere Seite als sich selbst, außer bei bewusster Konsolidierung.
- **JSON-LD** jeder Seitenvorlage gegen den Rich-Results-Test. Der Bestand ist der stärkste im Wettbewerbsfeld — sechs Wettbewerber haben gar kein JSON-LD. Er darf beim Umbau nicht beschädigt werden.
- **Kein verwaister Artikel:** jeder verbliebene Blogartikel ist von mindestens zwei anderen Seiten intern verlinkt.

### 7.2 Inhaltlich

- Kein Artikel unter 1.200 Wörtern.
- Keine Lesezeit, die nicht berechnet ist.
- Keine Zahl auf der Seite, die nicht belegt ist. Insbesondere: „+47 % Leads" und „12 Termine" auf `/leistungen` sind derzeit Beispielwerte — entweder mit echten Projektzahlen unterlegen oder entfernen.
- `/ki-transparenz` deckt den tatsächlichen Stand ab. Wenn Bilder durch echte Fotos ersetzt wurden, ist die Seite nachgeführt.
- Rechtsaussagen zu § 7 UWG unverändert korrekt, Trennung Telefon/Mail sauber.

### 7.3 Nachmessung

Diese Suchbegriffe am Ende erneut prüfen und gegen die Werte aus Abschnitt 2 stellen — gleiche Bedingungen: google.de, `hl=de`, `gl=de`, Standort Köln, Personalisierung aus.

```
vertriebsagentur köln · vertriebsagentur frankfurt · vertriebsagentur düsseldorf
kaltakquise agentur köln · telefonakquise agentur köln
b2b telefonakquise agentur · kaltakquise agentur · vertrieb auslagern
site:carpantier-consulting.de · site:carpantier-consulting.de/blog
```

Erwartung ehrlich halten: **Die Indexierung reagiert in Wochen, nicht in Tagen.** Ein Vergleich unmittelbar nach dem Deployment misst nichts. Der einzige Wert, der schnell zurückkommt, ist `site:…/blog` — dort muss die Zahl steigen.

### 7.4 Bericht

Am Ende eine Datei `docs/revision-<datum>.md` mit: was umgesetzt wurde, was nicht und warum, welche Punkte an Nicos Input hängen, welche Messwerte sich verändert haben, welche Annahmen aus AP-1 sich bestätigt oder als falsch erwiesen haben.

---

## 8 · Was dieser Auftrag nicht abdeckt

- **Backlinks.** Keine Daten verfügbar — Ahrefs und Semrush waren gesperrt (AP-2 ändert das für die Zukunft, liefert aber keine Historie). Ohne Linkdaten bleibt unklar, wie viel des Rückstands auf Autorität statt auf Content entfällt. Nach AP-2 und einer Karenzzeit erneut aufgreifen.
- **Core Web Vitals.** Nicht gemessen. Eigenes Paket, falls die Search Console dort etwas meldet.
- **Der Chatbot.** Läuft, war nicht Gegenstand der Analyse.
- **Bezahlte Sichtbarkeit.** Bing zeigt bei `b2b telefonakquise agentur` vier Anzeigen vor zwei organischen Treffern — die organische Fläche ist dort minimal. Ob sich SEA lohnt, ist eine Budgetfrage für Nico.
- **ChatGPT- und Perplexity-Sichtbarkeit.** Beide verlangen Anmeldung, wurden daher nicht gemessen. Prompts zum Selbsttest stehen in `COMPETITOR-SEO-EXPLORATION.md`, Abschnitt 8.

---

## 9 · Wenn du diese Session kalt startest

Was du zusätzlich brauchst und was nicht:

**Brauchst du nicht** — steht alles hier oder im Repo: Stack, Befehle, Dateipfade, Messwerte, Wettbewerbslage, Guardrails.

**Musst du dir holen:**
1. `pnpm install`, dann einmal `pnpm verify`, um den Ausgangszustand zu kennen. Erst danach die erste Änderung.
   Stand 10.09.2026 geprüft: `check:compliance` meldet „keine Beanstandungen", `tsc --noEmit` läuft ohne Fehler durch. `lint` und `build` waren nicht Teil dieser Prüfung — der erste vollständige `pnpm verify`-Lauf gehört an den Anfang der Session, nicht in die Mitte.
2. `git log --oneline -10` und `git status` — der letzte Stand betraf die Videoseite unter `/wissen`, nicht den Blog.
3. `src/lib/blog.ts`, `src/lib/cities.ts`, `src/lib/local-seo.ts`, `scripts/check-compliance.mjs` lesen, bevor du sie änderst. Die Compliance-Datei erklärt in Kommentaren, welcher Punkt schon einmal live beanstandet war.
4. `COMPETITOR-SEO-EXPLORATION.md` für die vollständige Wettbewerbsanalyse mit allen 29 gemessenen Suchanfragen.

**Musst du erfragen, bevor du damit anfängst:**
- Search-Console-Zugang (AP-1)
- Freigabe der Cluster-Zuordnung (AP-3, Schritt 2)
- Preisentscheidung (AP-6)
- Alles aus der rechten Spalte in Abschnitt 4

**Erste Handlung einer neuen Session:** AP-2 vollständig erledigen. Es ist unabhängig, unumstritten, in unter einer Stunde fertig und liefert sofort einen sauberen `pnpm verify`-Durchlauf als Referenzpunkt für alles Weitere.

---

*Grundlage: Messung vom 10.09.2026, 16:40–17:30 CEST, Standort Köln. Positionen sind ein Snapshot und schwanken.*
