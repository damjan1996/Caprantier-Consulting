'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'
import type { City } from '@/lib/cities'

interface StadtFAQProps {
  city: City
}

// Generate city-specific FAQs
function getCityFAQs(city: City) {
  return [
    {
      question: `Bieten Sie B2B Akquise in ${city.name} an?`,
      answer: `Ja, wir sind spezialisiert auf B2B Telefonakquise und Leadgenerierung ${city.businessContext}. ${city.regionalText} Von unserem Standort in Köln aus betreuen wir Unternehmen in ${city.name} und Umgebung.`,
    },
    {
      question: `Wie läuft die Zusammenarbeit mit Unternehmen aus ${city.name} ab?`,
      answer: `Die Zusammenarbeit startet mit einem kostenlosen Strategiegespräch. Wir analysieren Ihre Zielgruppe in ${city.name} und ${city.region}, entwickeln maßgeschneiderte Gesprächsleitfäden und beginnen mit der Akquise. Alle Termine werden digital übergeben - die Distanz spielt keine Rolle.`,
    },
    {
      question: `Welche Branchen sprechen Sie in ${city.name} an?`,
      answer: `Wir sind auf B2B-Dienstleister spezialisiert: Agenturen, IT-Dienstleister, Beratungsunternehmen und Softwareunternehmen ${city.businessContext}. Unsere Expertise liegt in der Ansprache von Entscheidern in mittelständischen Unternehmen.`,
    },
    {
      question: `Wie schnell kann ich mit ersten Terminen in ${city.name} rechnen?`,
      answer: `Nach dem Onboarding und der Kampagneneinrichtung können Sie oft schon in der ersten Woche mit den ersten qualifizierten Terminen rechnen. Die genaue Geschwindigkeit hängt von Ihrer Zielgruppe und Branche in ${city.name} ab.`,
    },
    {
      question: `Was unterscheidet Carpantier von anderen Akquise-Agenturen in ${city.region}?`,
      answer: `Wir liefern ausschließlich BANT-qualifizierte Termine mit echten Entscheidern. Keine Masse, sondern Klasse. Zudem haben wir über 3 Jahre Erfahrung speziell im B2B-Dienstleisterumfeld und verstehen die Herausforderungen von Unternehmen ${city.businessContext}.`,
    },
  ]
}

// Generate FAQPage Schema for SEO
export function generateCityFAQSchema(city: City) {
  const faqs = getCityFAQs(city)
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className={cn(
      "group border border-white/10 bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07]",
      isOpen && "border-primary/30 bg-white/[0.07] shadow-lg shadow-primary/5"
    )}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
      >
        <span className={cn(
          "text-base font-medium pr-4 transition-colors",
          isOpen ? "text-white" : "text-white/90 group-hover:text-white"
        )}>{question}</span>
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0",
          isOpen ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground group-hover:bg-white/20 group-hover:text-white"
        )}>
          <ChevronDown
            className={cn(
              'h-5 w-5 transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-500 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <p className="px-5 pb-5 text-muted-foreground leading-relaxed text-sm">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function StadtFAQ({ city }: StadtFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = getCityFAQs(city)

  return (
    <section className="section-padding relative">
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/4 right-16 w-1 h-1 bg-blue-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />

      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-10">
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              FAQ {city.name}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-[1.15]">
              Häufige Fragen zur{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Akquise in {city.name}
              </span>
            </h2>
            <p className="text-base text-muted-foreground">
              Alles, was Sie über unsere B2B-Akquise {city.businessContext} wissen müssen.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
