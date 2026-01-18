import Link from 'next/link'
import { ArrowLeft, Home, BookOpen, Phone, Briefcase, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const helpfulLinks = [
  {
    name: 'Startseite',
    href: '/',
    icon: Home,
    description: 'Zurück zur Hauptseite',
  },
  {
    name: 'Leistungen',
    href: '/leistungen',
    icon: Briefcase,
    description: 'Unsere B2B-Akquise Services',
  },
  {
    name: 'Blog',
    href: '/blog',
    icon: BookOpen,
    description: 'Vertriebswissen & Tipps',
  },
  {
    name: 'Kontakt',
    href: '/kontakt',
    icon: Phone,
    description: 'Sprechen Sie mit uns',
  },
]

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom text-center relative z-10 py-20">
        {/* 404 Number */}
        <div className="relative inline-block mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary/40 to-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-16 w-16 md:h-20 md:w-20 text-primary/60" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Seite nicht gefunden
        </h2>
        <p className="text-muted-foreground mb-12 max-w-lg mx-auto text-lg">
          Die gesuchte Seite existiert leider nicht oder wurde verschoben.
          Vielleicht finden Sie hier, was Sie suchen:
        </p>

        {/* Helpful Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          {helpfulLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
            >
              <link.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-white mb-1">{link.name}</div>
              <div className="text-xs text-muted-foreground">{link.description}</div>
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Zur Startseite
            </Button>
          </Link>
          <Link href="/kontakt">
            <Button size="lg" variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Kontakt aufnehmen
            </Button>
          </Link>
        </div>

        {/* SEO hint */}
        <p className="mt-12 text-sm text-muted-foreground/60">
          Fehler 404 - Carpantier Consulting | B2B Vertriebsagentur Köln
        </p>
      </div>
    </section>
  )
}
