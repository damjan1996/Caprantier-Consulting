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
    <div className={cn(
      "group border border-white/10 bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07]",
      isOpen && "border-primary/30 bg-white/[0.07] shadow-lg shadow-primary/5"
    )}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left transition-colors"
      >
        <span className={cn(
          "text-lg font-medium pr-4 transition-colors",
          isOpen ? "text-white" : "text-white/90 group-hover:text-white"
        )}>{question}</span>
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300",
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
    <section className="section-padding relative">
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/4 right-16 w-1 h-1 bg-blue-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />

      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
              Häufige{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Fragen
              </span>
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
