'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'

const FAQS = [
  {
    question: 'Wie viele Termine kann ich pro Woche erwarten?',
    answer: 'Im Durchschnitt liefern wir 3–8 qualifizierte Termine pro Woche, je nach Branche und Zielgruppe. Die genaue Zahl besprechen wir im Kennenlerngespräch, da sie von Faktoren wie Marktgröße und Angebotskomplexität abhängt.',
  },
  {
    question: 'Telefonieren Sie in unserem Namen?',
    answer: 'Ja, genau. Wir treten als Teil Ihres Teams auf — wie ein eigener Mitarbeiter. Ihre Gesprächspartner merken keinen Unterschied. Wir verwenden Ihren Firmennamen, Ihre E-Mail-Signatur und sprechen im Wir-Format.',
  },
  {
    question: 'Wie qualifizieren Sie die Leads?',
    answer: 'Wir stellen sicher, dass wir mit dem Entscheider sprechen und ein grundsätzliches Interesse am Angebot besteht. Kein „Kaffeetrinken"-Termin — nur Gespräche mit echter Auftragschance landen in Ihrem Kalender.',
  },
  {
    question: 'Gibt es eine Mindestlaufzeit?',
    answer: 'Wir empfehlen eine Zusammenarbeit von mindestens 3 Monaten, damit der Prozess seine volle Wirkung entfalten kann. Es gibt keine versteckten Kündigungsfristen — wir überzeugen durch Ergebnisse, nicht durch Verträge.',
  },
  {
    question: 'Welche Branchen funktionieren besonders gut?',
    answer: 'Besonders gut funktioniert unsere Akquise für B2B-Dienstleister: Personalvermittler, IT-Systemhäuser, Unternehmensberater, SaaS-Anbieter, Web- und Software-Agenturen sowie Industrie-Anbieter. Entscheidend ist ein Customer-Lifetime-Value ab 10.000 €.',
  },
  {
    question: 'Was kostet die Zusammenarbeit?',
    answer: 'Da wir keine Standard-Pakete verkaufen, sondern maßgeschneiderte Lösungen, variiert der Preis. Im Kennenlerngespräch können wir Ihnen nach kurzer Analyse eine transparente Hausnummer nennen. Grundsätzlich: Unsere Kunden sehen uns als Investment, nicht als Kostenstelle.',
  },
  {
    question: 'Wie schnell kann ich mit den ersten Terminen rechnen?',
    answer: 'Nach dem Kick-Off Meeting und der Setup-Phase starten wir in der Regel innerhalb von 10–14 Tagen mit den ersten Gesprächen. Die ersten qualifizierten Termine landen oft schon in der zweiten Woche in Ihrem Kalender.',
  },
  {
    question: 'Warum nur 5 Kunden pro Monat?',
    answer: 'Qualität vor Quantität. Wir arbeiten bewusst nur mit maximal 5 Kunden gleichzeitig, um jedem die volle Aufmerksamkeit und Schlagzahl zu geben. Das ist auch der Grund, warum wir so gute Ergebnisse liefern.',
  },
]

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
      "border border-border bg-white rounded-xl overflow-hidden transition-all duration-300",
      isOpen && "shadow-md border-primary/20"
    )}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
      >
        <span className={cn(
          "text-lg font-medium pr-4 transition-colors",
          isOpen ? "text-primary" : "text-foreground"
        )}>{question}</span>
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0",
          isOpen ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
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
        <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding relative bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
              Häufige{' '}
              <span className="text-primary">Fragen</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Alles, was Sie vor dem Start wissen müssen.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-3">
              {FAQS.map((faq, index) => (
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
