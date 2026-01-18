// Statische Blog-Bild-Imports für SSR-Optimierung
// Next.js generiert automatisch Blur-Placeholders und optimiert die Bilder

import vertriebAuslagern from '@/../public/images/blog/vertrieb-auslagern.png'
import b2bKaltakquise from '@/../public/images/blog/b2b-kaltakquise.png'
import leadgenerierungIt from '@/../public/images/blog/leadgenerierung-it.png'
import kiB2bVertrieb from '@/../public/images/blog/ki-b2b-vertrieb.png'
import kaltakquiseRecht from '@/../public/images/blog/kaltakquise-recht.png'
import bantMethode from '@/../public/images/blog/bant-methode.png'
import sdrService from '@/../public/images/blog/sdr-service.png'
import einwandbehandlung from '@/../public/images/blog/einwandbehandlung.png'

import { StaticImageData } from 'next/image'

// Mapping von Slug zu statischem Bild-Import
export const blogImages: Record<string, StaticImageData> = {
  'vertrieb-auslagern-kosten-vorteile': vertriebAuslagern,
  'b2b-kaltakquise-leitfaden': b2bKaltakquise,
  'leadgenerierung-it-dienstleister': leadgenerierungIt,
  'ki-im-b2b-vertrieb': kiB2bVertrieb,
  'kaltakquise-rechtliche-grundlagen': kaltakquiseRecht,
  'bant-methode-erklaert': bantMethode,
  'sdr-as-a-service': sdrService,
  'einwandbehandlung-vertrieb': einwandbehandlung,
}

// Helper-Funktion zum Abrufen des Bildes
export function getBlogImage(slug: string): StaticImageData | undefined {
  return blogImages[slug]
}
