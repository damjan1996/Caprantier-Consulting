# Carpantier Consulting — carpantier-consulting.de

Website einer B2B-Vertriebsagentur (Nico Carpantier, Köln): Telefonakquise und
Terminvereinbarung. Next.js 16 (App Router), React 19, TypeScript, CSS-Module,
pnpm 11. Deployt auf Vercel (Region fra1). Sprache der Seite, der Dokumente und
der Commits: Deutsch.

## Befehle

```bash
pnpm dev                # Entwicklungsserver
pnpm verify             # Gate vor jedem Commit: typecheck + lint + check:all + build
pnpm check:all          # die 9 inhaltlichen Prüfungen, alle müssen „keine Beanstandungen“ melden
pnpm check:predeploy    # gegen einen laufenden Server: live, ssr, seo, performance
pnpm test:e2e           # Umbruchprüfung (Playwright)
```

Auf Windows scheitert `pnpm build` mit `EPERM`, solange ein `next dev` läuft —
Dateisperre, kein Konfigurationsfehler. Erst alle Dev-Server beenden.

## Wo was liegt

**Grundregel: Was nur eine Seite braucht, liegt im Ordner dieser Seite unter
`_components/`. Was mehrere Seiten teilen, liegt unter `src/components/`.**
Die URL sagt, wo der Code steht: `/kontakt` → `src/app/kontakt/`.

| Route | Ordner |
|---|---|
| `/` | `src/app/(home)/` — Routengruppe, erscheint nicht in der URL |
| `/leistungen`, `/leistungen/[stadt]` | `src/app/leistungen/`, `…/[stadt]/` |
| `/kaltakquise`, `/kaltakquise/[stadt]` | `src/app/kaltakquise/`, `…/[stadt]/` |
| `/branchen`, `/branchen/[branche]` | `src/app/branchen/`, `…/[branche]/` |
| `/referenzen`, `/ueber-uns`, `/kontakt` | je eigener Ordner |
| `/wissen`, `/wissen/videos`, `/glossar` | je eigener Ordner |
| `/blog`, `/blog/[slug]` | `src/app/blog/` — Beiträge selbst in `src/content/blog/` |
| `/datenschutz`, `/impressum`, `/ki-transparenz` | je eigener Ordner |
| `/llms.txt`, `/sitemap.xml`, API | `src/app/llms.txt/`, `src/app/sitemap.ts`, `src/app/api/` |

| Ordner | Inhalt |
|---|---|
| `src/components/seite/` | Seitengrundlage: `basis.module.css` (Token, Bausteine), `useReveal`, `useScrollScene`, `SectionRail`, die gemeinsamen Szenen `TerminScene` und `FragenSection` |
| `src/components/layout/` | Kopf- und Fußzeile |
| `src/components/calendly/` | Buchung (`useCalendly`), Buchungsfenster, Einwilligungskarte |
| `src/components/consent/` | Cookie-Einwilligung |
| `src/components/analytics/` | GA4 und Brevo nach Einwilligung, Web Vitals |
| `src/components/ui/` | kleine seitenübergreifende Bausteine (`Breadcrumbs`, `Button`, KI-Kennzeichnung, `LiteYouTube`) und das Gerüst der übrigen Seiten (`PageWrapper`, `PageHero`, `SectionCard`) |
| `src/content/` | **alles Redaktionelle:** Texte, Städte, Branchen, Preise, Fallstudien, Firmendaten (`local-seo.ts` → `businessInfo`) |
| `src/lib/` | **nur Logik:** JSON-LD-Erzeuger (`schemas.ts`), Blog-Ableitungen, Validierung, Versand, YouTube |
| `scripts/` | die `check:*`-Prüfungen; sie laden Module aus `src/` über `scripts/lib/load-ts-module.mjs` |
| `config/blog-redirects.js` | 301-Umleitungen der zusammengeführten Blogbeiträge |
| `docs/` | Regeln, Nachweise, Planung — Einstieg `docs/README.md` |

## Beim Bauen

- **Vor jeder Seitenänderung** `docs/seitenbaukasten.md` (wie gebaut),
  `docs/seitendesign.md` (wie es aussieht) und `docs/seitentexte.md` (was
  dasteht) lesen. Die Seiten `/`, `/leistungen`, `/kaltakquise`, `/branchen`,
  `/referenzen`, `/ueber-uns`, `/kontakt`, `/wissen` und die Stadtseiten sind
  auf dieser Grundlage gebaut; die übrigen nutzen Tailwind und `src/components/ui/`.
- Aufbau einer Seite: `page.tsx` (Server-Komponente) + `_components/` mit je
  einer Datei pro Abschnitt, **einem** Stylesheet `<route>.module.css`,
  und — falls die Seite sie hat — `sections.ts` für die Fortschrittsleiste
  sowie `termin.tsx` / `fragen.tsx` als Inhalt der gemeinsamen Szenen.
- **Keine `index.ts`-Sammel-Exporte.** Direkt importieren; im eigenen Ordner
  relativ (`./_components/X`), sonst über `@/`.
- Seiten-Stylesheets binden die Grundlage per `composes: x from
  '../../../components/seite/basis.module.css'` ein (CSS kennt `@/` nicht;
  unter `[stadt]` eine Ebene mehr).
- Wird ein Abschnitt von einer zweiten Seite gebraucht, zieht er nach
  `src/components/`. Wird ein geteilter Baustein nur noch von einer Seite
  genutzt, zieht er zu ihr.

## Unantastbar

Vollständig in `docs/sichtbarkeit/AUFTRAG-SICHTBARKEIT-2026-09.md`, Abschnitt 3.
`pnpm check:compliance` erzwingt einen Teil davon.

- Kein `aggregateRating` und kein `Review`-Markup ohne echte, freigegebene Kundenstimmen.
- Impressum nach `§ 5 DDG`, nie `§ 5 TMG`. Kein Link auf die abgeschaltete EU-OS-Plattform.
- Name, Anschrift, Telefon **nur** aus `businessInfo` (`src/content/local-seo.ts`).
- Keine erfundenen Zahlen, keine Kundenlogos oder Fallstudien ohne dokumentierte Freigabe.
- Preise erscheinen nur, wenn `PREISE_FREIGEGEBEN` in `src/content/pricing.ts` es erlaubt.
- `/ki-transparenz` bleibt vollständig; wer Bilder ersetzt, führt die Seite nach.
- Kaltakquise-Telefon (B2B, mutmaßliche Einwilligung) und Kaltakquise-Mail
  (ohne Einwilligung unzulässig) nie vermischen.
- **Nicht committen, nicht pushen, nicht deployen ohne ausdrückliche Freigabe.**

## Arbeitsweise

- Oft arbeiten mehrere Claude-Sitzungen gleichzeitig an diesem Repository.
  Vor der ersten Änderung prüfen, ob Dateien gerade anderweitig geändert werden
  (`git status`, Änderungszeiten); größere Umbauten in einem eigenen Worktree.
- Datenschutz- und KI-Nachweise in `docs/datenschutz/` und `docs/ki/` sind
  Nachweise, keine Werbetexte: nichts behaupten, was nicht belegt ist.
- Optional: Ein lokaler Wissensgraph (`graphify`) liegt, falls erzeugt, in
  `graphify-out/` (nicht versioniert). Er kennt keine CSS-Dateien.
- `knip` meldet `public/sw.js` und die Exporte `caseStudies`, `cityAcquisition`,
  `localDirectories`, `PREISE_FREIGEGEBEN` als ungenutzt — Fehlalarme: `sw.js`
  wird per URL registriert, die Exporte laden die Prüfskripte.
