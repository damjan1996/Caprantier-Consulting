'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCalendly } from '@/hooks/useCalendly'

// Use the dark logo for light backgrounds
import logoBlack from '@/../public/logo/Logo - Schwarz.png'

type NavChild = {
  name: string
  href: string
  /** Kennzeichnet einen neuen Bereich. Nach ein paar Monaten entfernen. */
  isNew?: boolean
}

type NavItem = {
  name: string
  href: string
  children?: NavChild[]
}

/**
 * Blog, Videos und Glossar liegen unter dem Punkt „Wissen".
 *
 * Ohne die Gruppierung hätte die Leiste mit den Videos sechs Einträge — und
 * drei davon wären inhaltlich dasselbe. Die Adressen der Unterpunkte bleiben
 * unverändert: `/blog` und `/glossar` sind indexiert und werden nicht
 * umgezogen, nur anders einsortiert.
 */
const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Leistungen', href: '/leistungen' },
  { name: 'Videos', href: '/wissen/videos' },
  {
    name: 'Wissen',
    href: '/wissen',
    children: [
      { name: 'Blog', href: '/blog' },
      { name: 'Glossar', href: '/glossar' },
    ],
  },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  /** Name des aufgeklappten Untermenüs — jeweils nur eines gleichzeitig. */
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null)
  const { openCalendly, onHover } = useCalendly()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Ein aufgeklapptes Untermenü muss sich auch ohne Maus schließen lassen.
  useEffect(() => {
    if (!openMenu) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [openMenu])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-sm border-gray-200 py-3'
            : 'bg-white/60 backdrop-blur-sm border-transparent py-5'
        )}
      >
        <nav className="container-custom flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoBlack}
              alt="Carpantier Consulting"
              width={40}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
            <span className="text-xl md:text-2xl font-bold text-foreground">
              Carpantier<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) =>
              item.children ? (
                <DesktopSubmenu
                  key={item.name}
                  item={item}
                  isOpen={openMenu === item.name}
                  onOpen={() => setOpenMenu(item.name)}
                  onClose={() => setOpenMenu(null)}
                />
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => openCalendly()}
              onMouseEnter={onHover}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Phone className="h-4 w-4" />
              Erstgespräch buchen
            </button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menü öffnen"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden overflow-hidden',
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-200',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={cn(
            'absolute top-0 right-0 h-full w-72 bg-white border-l border-border shadow-2xl transition-transform duration-300 ease-out',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src={logoBlack}
                alt="Carpantier Consulting"
                width={32}
                height={32}
                className="h-7 w-auto"
              />
              <span className="text-lg font-bold text-foreground">
                Carpantier<span className="text-primary">.</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Menü schließen"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="px-6 py-4">
            <div className="flex flex-col gap-2">
              {navigation.map((item) =>
                item.children ? (
                  <MobileSubmenu
                    key={item.name}
                    item={item}
                    isOpen={openMobileMenu === item.name}
                    onToggle={() =>
                      setOpenMobileMenu((current) => (current === item.name ? null : item.name))
                    }
                    onNavigate={() => setIsMobileMenuOpen(false)}
                  />
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors py-3 px-4 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openCalendly()
                }}
                onMouseEnter={onHover}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-3 px-4"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>Erstgespräch buchen</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

/**
 * Untermenü in der Desktop-Leiste.
 *
 * Der Punkt selbst bleibt ein Link auf die Übersichtsseite — wer ihn anklickt,
 * landet auf `/wissen` und nicht in einer Sackgasse. Aufgeklappt wird per Maus
 * und per Tastatur: Sobald der Link den Fokus bekommt, öffnet sich die Liste,
 * beim Verlassen der Gruppe schließt sie wieder.
 */
function DesktopSubmenu({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(event) => {
        // Beim Weiterspringen in die Liste bleibt der Fokus in dieser Gruppe.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onClose()
      }}
    >
      <Link
        href={item.href}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {item.name}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </Link>

      {isOpen && (
        // pt-3 überbrückt die Lücke zum Link, damit das Menü beim Hinfahren
        // mit der Maus nicht zuklappt.
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="min-w-[200px] rounded-xl border border-border bg-white p-2 shadow-lg">
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {child.name}
                {child.isNew && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    Neu
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Untermenü im mobilen Menü.
 *
 * Bewusst zum Aufklappen statt als Überfahren-Menü: Auf dem Telefon gibt es
 * keinen Mauszeiger, ein Hover-Menü wäre dort nicht bedienbar.
 */
function MobileSubmenu({
  item,
  isOpen,
  onToggle,
  onNavigate,
}: {
  item: NavItem
  isOpen: boolean
  onToggle: () => void
  onNavigate: () => void
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {item.name}
        <ChevronDown
          className={cn('h-5 w-5 transition-transform duration-200', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="mt-1 flex flex-col gap-1 border-l border-border pl-3 ml-4">
          <Link
            href={item.href}
            onClick={onNavigate}
            className="rounded-lg px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Übersicht
          </Link>
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {child.name}
              {child.isNew && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                  Neu
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
