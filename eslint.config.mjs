import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

/**
 * ESLint 9 (Flat Config).
 *
 * Zuvor lag hier eine .eslintrc.json, die ESLint 9 gar nicht mehr liest — die
 * Qualitaetspruefung lief deshalb ins Leere und meldete trotzdem Erfolg.
 * `next lint` gibt es in Next 16 nicht mehr, das Skript ruft jetzt `eslint .`.
 */
export default defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    // Standard-Ignores von eslint-config-next, die durch das eigene
    // globalIgnores sonst verloren gehen.
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',

    // Erzeugter Prisma-Client.
    'src/generated/**',

    // Arbeitsmaterial und Hilfsskripte ausserhalb der Anwendung: kein
    // Bestandteil des Deployments, deshalb auch nicht Teil der Pruefung.
    'scripts/**',
    '.claude/**',
    '.playwright-mcp/**',
    'carpantier-landing/**',
    'docs/**',
    'public/sw.js',
    '*.js',
  ]),

  {
    rules: {
      // Bilder auf dieser Seite laufen durchgaengig ueber next/image; die
      // Regel bleibt scharf, damit das so bleibt.
      '@next/next/no-img-element': 'error',
    },
  },
])
