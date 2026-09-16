import Link from 'next/link'
import Image from 'next/image'
import { YOUTUBE_CHANNEL_URL } from '@/lib/youtube'
import CookieSettingsButton from '@/components/ui/CookieSettingsButton'
import FooterRegions from './FooterRegions'
import styles from './footer.module.css'

import logoBlack from '@/../public/logo/Logo - Schwarz.png'

/**
 * Fußzeile.
 *
 * Vier Spalten, darunter die eingeklappten Stadt-Seiten und die Fußleiste.
 * Bewusst ohne Symbole vor den Einträgen: Die Fußzeile ist eine Linkliste,
 * kein Kontaktformular — ein Umschlag und eine Kartennadel tragen dort nichts
 * bei, was die Beschriftung nicht schon sagt.
 *
 * Das Verzeichnis der Verweise ist länger als im Entwurf. Kaltakquise,
 * Branchen und Referenzen sind eigene Seitenfamilien und brauchen von jeder
 * Seite aus einen Verweis — ohne den waren sie nur über die Sitemap
 * erreichbar. Das Layout stammt aus dem Entwurf, der Bestand aus der Website.
 */

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Leistungen', href: '/leistungen' },
  { name: 'Kaltakquise', href: '/kaltakquise' },
  { name: 'Branchen', href: '/branchen' },
  { name: 'Referenzen', href: '/referenzen' },
  { name: 'Wissen', href: '/wissen' },
  { name: 'Blog', href: '/blog' },
  { name: 'Videos', href: '/wissen/videos' },
  { name: 'Glossar', href: '/glossar' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
]

const services = [
  { name: 'B2B Telefonakquise', href: '/kaltakquise' },
  { name: 'Leadgenerierung', href: '/leistungen' },
  { name: 'Vertriebsoutsourcing', href: '/leistungen' },
  { name: 'Vertrieb für Personaldienstleister', href: '/branchen/personaldienstleister' },
  { name: 'Leadgenerierung für IT-Systemhäuser', href: '/branchen/it-systemhaeuser' },
]

const legal = [
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' },
  { name: 'KI-Transparenz', href: '/ki-transparenz' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandMark}>
            <Image
              src={logoBlack}
              alt=""
              width={40}
              height={40}
              sizes="26px"
              aria-hidden="true"
            />
            <span>
              Carpantier<span className={styles.brandDot}>.</span>
            </span>
          </Link>

          <p className={styles.brandText}>
            Ihre Vertriebsagentur für planbare Neukundengewinnung. Professionelle B2B-Kaltakquise
            und Leadgenerierung aus Köln – bundesweit.
          </p>

          <div className={styles.brandLinks}>
            <a href="mailto:info@carpantier-consulting.de">info@carpantier-consulting.de</a>
            <span className={styles.brandPlace}>Köln, Deutschland</span>
            {/* Reiner Verweis: Es wird nichts von YouTube geladen, solange
                niemand darauf klickt. */}
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkMuted}
            >
              YouTube-Kanal
            </a>
          </div>
        </div>

        <nav className={styles.column} aria-label="Navigation">
          <span className={styles.columnTitle}>Navigation</span>
          {navigation.map((item) => (
            <Link key={item.href + item.name} href={item.href} className={styles.link}>
              {item.name}
            </Link>
          ))}
        </nav>

        <nav className={styles.column} aria-label="Vertrieb & Akquise">
          <span className={styles.columnTitle}>Vertrieb &amp; Akquise</span>
          {services.map((item) => (
            <Link key={item.name} href={item.href} className={styles.link}>
              {item.name}
            </Link>
          ))}
          <Link href="/kontakt" className={styles.linkAccent}>
            Erstgespräch buchen · 15 Min.
          </Link>
        </nav>

        <nav className={styles.column} aria-label="Rechtliches">
          <span className={styles.columnTitle}>Rechtliches</span>
          {legal.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.name}
            </Link>
          ))}
          <CookieSettingsButton className={styles.linkButton} withIcon={false} />
        </nav>
      </div>

      <FooterRegions />

      <div className={styles.bottom}>
        <span>&copy; {currentYear} Carpantier Consulting. Alle Rechte vorbehalten.</span>
        <span>Vertriebsagentur &middot; B2B Akquise &middot; Leadgenerierung &middot; Köln</span>
      </div>
    </footer>
  )
}
