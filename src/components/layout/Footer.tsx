import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Leistungen', href: '/leistungen' },
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/60 backdrop-blur-sm border-t border-white/10 relative z-10">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <Image
                src="/logo/Logo - Weiß.png"
                alt="Carpantier Consulting"
                width={40}
                height={40}
                className="h-9 w-auto"
              />
              <span className="text-2xl font-bold text-white">
                Carpantier<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Planbare Neukundengewinnung durch professionelle B2B-Telefonakquise.
              Wir liefern qualifizierte Termine mit Entscheidern direkt in Ihren Kalender.
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="mailto:info@carpantier-consulting.de" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                info@carpantier-consulting.de
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Köln, Deutschland
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Carpantier Consulting. Alle Rechte vorbehalten.
            </p>
            <p className="text-sm text-muted-foreground">
              B2B Sales Consulting aus Köln
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
