'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCalendly } from '@/hooks/useCalendly'

// Static import for SSR optimization
import logoWhite from '@/../public/logo/Logo - Weiß.png'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Leistungen', href: '/leistungen' },
  { name: 'Blog', href: '/blog' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openCalendly, onHover } = useCalendly()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
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

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm',
          isScrolled
            ? 'bg-black/70 backdrop-blur-lg shadow-lg shadow-black/10 py-3'
            : 'bg-black/40 py-5'
        )}
      >
        <nav className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoWhite}
              alt="Carpantier Consulting"
              width={40}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
            <span className="text-xl md:text-2xl font-bold text-white">
              Carpantier<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menü öffnen"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden',
          isMobileMenuOpen
            ? 'pointer-events-auto'
            : 'pointer-events-none'
        )}
      >
        {/* Backdrop - click to close */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-72 bg-background border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src={logoWhite}
                alt="Carpantier Consulting"
                width={32}
                height={32}
                className="h-7 w-auto"
              />
              <span className="text-lg font-bold text-white">
                Carpantier<span className="text-primary">.</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-muted-foreground hover:text-white transition-colors"
              aria-label="Menü schließen"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-6 py-4">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openCalendly()
                }}
                onMouseEnter={onHover}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-3 px-4"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>Erstgespräch buchen</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
