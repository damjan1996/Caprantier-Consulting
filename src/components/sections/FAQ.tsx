'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import FadeIn from '@/components/ui/FadeIn'

const FAQS = [
  {
    question: 'Was passiert im Erstgespräch?',
    answer:
      'Im Erstgespräch analysieren wir Ihre aktuelle Situation und prüfen, ob unser System für Ihre Agentur geeignet ist. Wir geben Ihnen bereits erste strategische Impulse mit, völlig unverbindlich.',
  },
  {
    question: 'Warum ist das Gespräch kostenlos?',
    answer:
      'Wir investieren in Vorleistung, weil wir wissen, dass unser System überzeugt. Wenn wir sehen, dass wir Ihnen helfen können, machen wir Ihnen ein Angebot. Wenn nicht, haben Sie trotzdem wertvolle Klarheit gewonnen.',
  },
  {
    question: 'Was kostet die Dienstleistung?',
    answer:
      'Da wir keine Standard-Pakete verkaufen, sondern maßgeschneiderte Lösungen, variiert der Preis je nach Umfang und Zielsetzung. Im Erstgespräch können wir Ihnen nach der Analyse eine genaue Hausnummer nennen.',
  },
  {
    question: 'Für wen ist Carpantier Consulting geeignet?',
    answer:
      'Wir arbeiten exklusiv mit Dienstleistern und Agenturinhabern (B2B), die ein funktionierendes Angebot haben und bereit sind, zu skalieren. Wir arbeiten nicht mit Network Marketern oder Dropshippern.',
  },
  {
    question: 'Sind die Termine qualifiziert?',
    answer:
      'Ja. Wir vereinbaren keine "Kaffeetrinken"-Termine. Jeder Lead wird nach Ihren Kriterien vorqualifiziert (BANT-Methode: Budget, Authority, Need, Timing), bevor er in Ihrem Kalender landet.',
  },
  {
    question: 'Wie schnell kann ich mit Ergebnissen rechnen?',
    answer:
      'Nach dem Onboarding starten wir in der Regel innerhalb weniger Tage mit den ersten Gesprächen. Die ersten qualifizierten Termine können Sie oft schon in der ersten Woche erwarten.',
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
    <div className="border border-white/10 bg-white/5 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-lg font-medium text-white pr-4">{question}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96' : 'max-h-0'
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
    <section className="section-padding bg-background border-t border-white/5">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Häufige Fragen
            </h2>
            <p className="text-muted-foreground">
              Alles, was Sie vor dem Start wissen müssen.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-4">
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
