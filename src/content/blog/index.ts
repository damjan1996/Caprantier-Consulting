import type { BlogPost } from '@/lib/blog-types'

import { b2bKaltakquiseLeitfaden } from './b2b-kaltakquise-leitfaden'
import { einwandbehandlungVertrieb } from './einwandbehandlung-vertrieb'
import { kaltakquiseRechtlicheGrundlagen } from './kaltakquise-rechtliche-grundlagen'
import { vertriebAuslagernKostenVorteile } from './vertrieb-auslagern-kosten-vorteile'
import { vertriebsagenturFindenCheckliste } from './vertriebsagentur-finden-checkliste'
import { b2bLeadgenerierungKanaele } from './b2b-leadgenerierung-kanaele'
import { bantMethodeErklaert } from './bant-methode-erklaert'
import { vertriebssteuerungKpisPipeline } from './vertriebssteuerung-kpis-pipeline'
import { angebotVerhandlungAbschlussB2b } from './angebot-verhandlung-abschluss-b2b'
import { kiImB2bVertrieb } from './ki-im-b2b-vertrieb'
import { leadgenerierungItDienstleister } from './leadgenerierung-it-dienstleister'
import { akquiseNachBrancheB2bDienstleister } from './akquise-nach-branche-b2b-dienstleister'
import { vertriebsteamAufbauenRecruiting } from './vertriebsteam-aufbauen-recruiting'

/**
 * Die Fachbeiträge in der Reihenfolge, in der sie auf `/blog` erscheinen.
 *
 * Bis zum 10.09.2026 standen hier 52 Beiträge mit einem Median von 429
 * Wörtern. Vier davon waren im Google-Index; die übrigen 48 hatte Google
 * gecrawlt und nicht aufgenommen. Die Diagnose steht in
 * `docs/ap1-indexierung-befund.md`.
 *
 * Die 52 wurden auf diese 13 zusammengeführt. Jeder entfernte Slug wird per
 * 301 auf seinen Zielbeitrag umgeleitet – die Zuordnung steht in
 * `config/blog-redirects.js`, und `scripts/check-blog-redirects.mjs` stellt
 * sicher, dass keiner vergessen wurde.
 *
 * Neue Beiträge müssen die Schwellen aus `scripts/blog-audit.mjs` erfüllen:
 * über 1.200 Wörter, mindestens drei FAQ-Einträge, mindestens eine externe
 * Quelle und ein interner Link auf `/leistungen`. Das Skript ist Teil von
 * `pnpm verify` – ein dünner Beitrag bricht den Build, statt still im
 * Nichtindexierten zu verschwinden.
 */
export const blogPosts: BlogPost[] = [
  b2bKaltakquiseLeitfaden,
  vertriebAuslagernKostenVorteile,
  vertriebsagenturFindenCheckliste,
  kaltakquiseRechtlicheGrundlagen,
  einwandbehandlungVertrieb,
  b2bLeadgenerierungKanaele,
  leadgenerierungItDienstleister,
  bantMethodeErklaert,
  vertriebssteuerungKpisPipeline,
  angebotVerhandlungAbschlussB2b,
  akquiseNachBrancheB2bDienstleister,
  vertriebsteamAufbauenRecruiting,
  kiImB2bVertrieb,
]
