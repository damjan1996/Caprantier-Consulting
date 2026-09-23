# carpantier-consulting.de

Website von Carpantier Consulting, B2B-Vertriebsagentur aus Köln.
Next.js 16, React 19, TypeScript, CSS-Module; deployt auf Vercel.

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm verify    # Typen, Lint, inhaltliche Prüfungen und Build — vor jedem Commit
```

Umgebungsvariablen: siehe `.env.example`.

## Aufbau

- `src/app/<route>/` — jede Seite mit ihren eigenen Abschnitten in `_components/`
- `src/components/` — was mehrere Seiten teilen (Seitengrundlage, Kopf/Fuß, Buchung, Einwilligung, Messung)
- `src/content/` — Texte und Daten; `src/lib/` — Logik
- `scripts/` — die Prüfungen hinter `pnpm check:*`
- `docs/` — Gestaltungs-, Text- und Bauregeln, Nachweise, Planung (Einstieg: `docs/README.md`)

Eine ausführliche Karte mit den Regeln, die beim Arbeiten gelten, steht in
[`CLAUDE.md`](CLAUDE.md).
