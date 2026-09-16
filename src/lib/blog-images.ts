// Statische Blog-Bild-Imports für SSR-Optimierung.
// Next.js erzeugt daraus automatisch Blur-Platzhalter und optimierte Formate.
//
// Nach der Zusammenführung vom 10.09.2026 gibt es 13 Beiträge. Vier von ihnen
// sind aus mehreren Vorgängern entstanden und übernehmen das Bild des
// Beitrags, der ihr Thema am deutlichsten trägt. Die Bilddateien der
// entfallenen Beiträge bleiben unter `public/images/blog/` liegen: Sie sind
// noch in älteren Beitragsbildern und Social-Vorschauen verlinkt, und ein
// gelöschtes Bild erzeugt dort eine Lücke.
//
// Alle Bilder sind KI-generiert und als solche gekennzeichnet -- siehe
// `/ki-transparenz` und `AI_GENERATED_MEDIA_ATTRS`.

import { StaticImageData } from 'next/image'

import b2bKaltakquise from '@/../public/images/blog/b2b-kaltakquise.webp'
import vertriebAuslagern from '@/../public/images/blog/vertrieb-auslagern.webp'
import vertriebsagenturFinden from '@/../public/images/blog/vertriebsagentur-finden.webp'
import kaltakquiseRecht from '@/../public/images/blog/kaltakquise-recht.webp'
import einwandbehandlung from '@/../public/images/blog/einwandbehandlung.webp'
import inboundOutbound from '@/../public/images/blog/inbound-outbound.webp'
import leadgenerierungIt from '@/../public/images/blog/leadgenerierung-it.webp'
import bantMethode from '@/../public/images/blog/bant-methode.webp'
import vertriebskennzahlen from '@/../public/images/blog/vertriebskennzahlen.webp'
import angeboteSchreiben from '@/../public/images/blog/angebote-schreiben.webp'
import agenturVertrieb from '@/../public/images/blog/agentur-vertrieb.webp'
import vertriebsteamAufbauen from '@/../public/images/blog/vertriebsteam-aufbauen.webp'
import kiB2bVertrieb from '@/../public/images/blog/ki-b2b-vertrieb.webp'

/** Zuordnung Slug -> Beitragsbild. Muss zu `image` im Beitrag passen. */
export const blogImages: Record<string, StaticImageData> = {
  'b2b-kaltakquise-leitfaden': b2bKaltakquise,
  'vertrieb-auslagern-kosten-vorteile': vertriebAuslagern,
  'vertriebsagentur-finden-checkliste': vertriebsagenturFinden,
  'kaltakquise-rechtliche-grundlagen': kaltakquiseRecht,
  'einwandbehandlung-vertrieb': einwandbehandlung,
  'b2b-leadgenerierung-kanaele': inboundOutbound,
  'leadgenerierung-it-dienstleister': leadgenerierungIt,
  'bant-methode-erklaert': bantMethode,
  'vertriebssteuerung-kpis-pipeline': vertriebskennzahlen,
  'angebot-verhandlung-abschluss-b2b': angeboteSchreiben,
  'akquise-nach-branche-b2b-dienstleister': agenturVertrieb,
  'vertriebsteam-aufbauen-recruiting': vertriebsteamAufbauen,
  'ki-im-b2b-vertrieb': kiB2bVertrieb,
}

export function getBlogImage(slug: string): StaticImageData | undefined {
  return blogImages[slug]
}
