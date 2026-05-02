import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'
import { cities } from '@/lib/cities'
import CookieSettingsButton from '@/components/ui/CookieSettingsButton'

import logoBlack from '@/../public/logo/Logo - Schwarz.png'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Leistungen', href: '/leistungen' },
    { name: 'Blog', href: '/blog' },
    { name: 'Glossar', href: '/glossar' },
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ],
  services: [
    { name: 'B2B Telefonakquise', href: '/leistungen' },
    { name: 'Leadgenerierung', href: '/leistungen' },
    { name: 'Vertriebsoutsourcing', href: '/leistungen' },
    { name: 'Case Studies', href: '/case-studies' },
  ],
  cities: cities.map((city) => ({
    name: `Vertrieb ${city.name}`,
    href: `/leistungen/${city.slug}`,
  })),
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-border relative z-10">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <Image
                src={logoBlack}
                alt="Carpantier Consulting - Vertriebsagentur für B2B Akquise"
                width={40}
                height={40}
                className="h-9 w-auto"
              />
              <span className="text-2xl font-bold text-foreground">
                Carpantier<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm">
              Ihre Vertriebsagentur für planbare Neukundengewinnung. Professionelle B2B-Kaltakquise und Leadgenerierung aus Köln — bundesweit.
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="mailto:info@carpantier-consulting.de" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                info@carpantier-consulting.de
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Köln, Deutschland
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Vertrieb & Akquise</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-foreground font-semibold mb-4">Vertriebsagentur in Ihrer Stadt</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-x-4 gap-y-2">
            {navigation.cities.map((item) => (
              <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Carpantier Consulting. Alle Rechte vorbehalten.
            </p>
            <p className="text-sm text-muted-foreground">
              Vertriebsagentur &middot; B2B Akquise &middot; Leadgenerierung &middot; Köln
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
