# AP-1 · Warum 48 von 52 Blogbeiträgen nicht im Google-Index sind

**Erstellt:** 10.09.2026, 19:56 CEST
**Grundlage:** Messung vom 10.09.2026 (Abschnitt 2 des Auftrags) + Repo-Analyse mit `scripts/blog-audit.mjs`
**Status der Diagnose:** teils **belegt**, teils **Annahme** — die Trennung steht in Abschnitt 4.

---

## 1 · Was gemessen wurde

`site:carpantier-consulting.de/blog` lieferte am 10.09.2026 „Ungefähr 5 Ergebnisse":
die Übersicht `/blog` und vier Beiträge.

| Indexiert | Slug |
|---|---|
| ✓ | `/blog` (Übersicht) |
| ✓ | `einwandbehandlung-vertrieb` |
| ✓ | `b2b-kaltakquise-leitfaden` |
| ✓ | `kaltakquise-rechtliche-grundlagen` |
| ✓ | `vertrieb-auslagern-kosten-vorteile` |
| ✗ | die übrigen 48 |

In `src/app/sitemap.ts` stehen alle 52. Google kennt die URLs also.

---

## 2 · Der Repo-Befund

Gemessen mit `node scripts/blog-audit.mjs --inventar` auf dem Stand vor dem Umbau:

```
52 Beiträge · Median 429 Wörter · Mittel 430 · Minimum 219 · Maximum 687
Mit FAQ-Block: 5/52 · mit externer Quelle: 0/52 · mit Stadt- oder Leistungslink: 0/52
```

Drei Zahlen davon standen so noch in keiner Auswertung:

- **0 von 52** Beiträgen verlinkt eine externe Quelle. Der Blog ist eine geschlossene Insel.
- **0 von 52** Beiträgen verlinkt auf `/leistungen` oder eine Stadtseite. Der Blog trägt
  nichts zu den Seiten bei, die tatsächlich ranken.
- Der Median liegt bei **429 Wörtern** (der Auftrag nannte 457 — die Abweichung entsteht
  dadurch, dass dieses Skript Markdown-Auszeichnung nicht als Text zählt). Die Aussage
  ändert sich nicht: kein Beitrag erreicht 700 Wörter.

Dazu die widerlegbare Behauptung: Beiträge tragen `readingTime` bis `12 min` bei
430 Wörtern Text. Das ist bei 200 Wörtern pro Minute eine Angabe, die um den Faktor 5
danebenliegt — nachprüfbar von jedem Leser und von jedem Crawler.

---

## 3 · Die eigentliche Ursache: 40 Beiträge waren nie intern verlinkt

Das ist der Fund, der die Auswahl der vier indexierten Beiträge erklärt.

**`src/app/blog/components/BlogGrid.tsx` paginiert clientseitig.**

```
const POSTS_PER_PAGE = 12
const [currentPage, setCurrentPage] = useState(1)
const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)
```

Die Seitenzahl lebt in React-State. Es gibt **keine URL für Seite 2**, keinen `<a>`-Verweis
darauf, nichts, dem ein Crawler folgen könnte. Im ausgelieferten HTML von `/blog` stehen
damit **genau 12 der 52 Artikel-Links**. Die übrigen 40 sind ausschließlich über die
Sitemap erreichbar.

Die weiteren internen Verweise im Bestand:

| Quelle | Verlinkte Beiträge |
|---|---|
| `/blog` (Seite 1 von 5) | die ersten 12 der Liste |
| `/glossar` | `bant-methode-erklaert`, `kaltakquise-rechtliche-grundlagen`, `einwandbehandlung-vertrieb`, `leadgenerierung-it-dienstleister`, `sdr-as-a-service`, `vertrieb-auslagern-kosten-vorteile` |
| aus Beiträgen heraus | `b2b-kaltakquise-leitfaden` (4×), `vertrieb-auslagern-kosten-vorteile` (2×), `bant-methode-erklaert` (2×), je 1× `sdr-as-a-service`, `kaltakquise-rechtliche-grundlagen`, `gatekeeper-ueberwinden`, `einwandbehandlung-vertrieb` |

Gegengeprüft mit der Messung:

- **Alle vier indexierten Beiträge stehen auf Seite 1 der Übersicht** und werden
  zusätzlich von `/glossar` oder aus einem anderen Beitrag verlinkt.
- **Kein einziger der 40 Beiträge ohne internen Link ist indexiert.**
- Vier Beiträge sind verlinkt und trotzdem nicht indexiert
  (`bant-methode-erklaert`, `leadgenerierung-it-dienstleister`, `sdr-as-a-service`,
  `gatekeeper-ueberwinden`).

Daraus folgt eine saubere Zweiteilung:

> **Ein interner Link ist notwendig, aber nicht hinreichend.**
> Ohne Verlinkung wird ein Beitrag gar nicht erst ernsthaft bewertet — 40 von 40 nicht
> indexiert. Unter den verlinkten entscheidet dann die Qualität — vier von acht schaffen es.

Das deckt beide Kategorien des Search-Console-Berichts ab, die AP-1 trennen sollte:
Die 40 unverlinkten sind der Kandidat für **„Gefunden – zurzeit nicht indexiert"**
(Crawl-Budget/Verlinkung), die vier verlinkten Nicht-Indexierten der Kandidat für
**„Gecrawlt – zurzeit nicht indexiert"** (Qualität).

---

## 4 · Was belegt ist und was Annahme bleibt

**Belegt (im Repo nachmessbar, unabhängig von Google):**

- 40 von 52 Beiträgen haben keinen einzigen crawlbaren internen Link. — `BlogGrid.tsx`
- 0 von 52 verlinken eine externe Quelle. — `blog-audit.mjs`
- 0 von 52 verlinken auf `/leistungen` oder eine Stadtseite. — `blog-audit.mjs`
- Median 429 Wörter, Maximum 687. — `blog-audit.mjs`
- `readingTime` ist handgesetzt und widerspricht der Textlänge. — `src/lib/blog.ts`
- Alle vier indexierten Beiträge sind intern verlinkt; keiner der 40 unverlinkten ist es.
  — Abgleich Messung ↔ Repo

**Annahme (mangels Google-Search-Console-Zugang nicht verifiziert):**

- Dass Google die 40 unverlinkten Beiträge als **„Gefunden – zurzeit nicht indexiert"**
  und die vier verlinkten als **„Gecrawlt – zurzeit nicht indexiert"** führt. Die
  Korrelation ist stark, aber die Kategoriezuordnung ist nicht gemessen.
- Dass keine `noindex`-Auszeichnung oder Soft-404-Bewertung im Spiel ist. Der Quelltext
  gibt dafür nichts her (`robots: index/follow` global, kein `noindex` auf `/blog/[slug]`),
  aber ein Live-Test mit dem URL-Prüftool hat nicht stattgefunden.

**Was fehlt, um aus der Annahme eine Diagnose zu machen:** Zugriff auf die Google Search
Console für `carpantier-consulting.de` — Seiten-Bericht mit den Kategoriezahlen und drei
Live-Tests im URL-Prüftool. Siehe `docs/aufgaben-nico.md`, Punkt 7.

---

## 5 · Was daraus folgt

| Maßnahme | Adressiert | Paket |
|---|---|---|
| Clientseitige Paginierung entfernen, alle Beiträge crawlbar verlinken | die 40 unverlinkten | AP-3 |
| 52 dünne → 13 belastbare Beiträge, je über 1.200 Wörter | die Qualitätsschwelle | AP-3 |
| FAQ-Block und externe Quelle in jedem Beitrag verpflichtend | Qualitätssignal, `blog-audit.mjs` erzwingt es | AP-3 |
| Jeder Beitrag verlinkt `/leistungen` und eine Stadtseite, jeder Beitrag wird von ≥2 Seiten verlinkt | Linkfluss in beide Richtungen | AP-3 / §7.1 |
| `readingTime` berechnen statt behaupten | widerlegbare Angabe | AP-4 |
| 39 zusammengeführte Slugs per 301 auf ihr Ziel | kein Linkverlust | AP-3 |

**Die Reihenfolge ist nicht beliebig.** Ein längerer Text auf einer Seite, zu der kein Link
führt, ändert nichts. Ein Link auf einen 430-Wort-Text, den Google schon einmal abgelehnt
hat, ebenfalls nicht. Beide Hebel wirken nur zusammen.
