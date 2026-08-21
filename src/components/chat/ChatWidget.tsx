'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, X, Send, Loader2, Sparkles, ShieldCheck, Trash2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const QUICK_REPLIES = [
  'Was kostet das?',
  'Wie läuft das ab?',
  'Termin buchen',
]

/**
 * Merkt die Kenntnisnahme des KI- und Datenschutzhinweises, damit dieser pro
 * Browser nur einmal erscheint. Die Version erzwingt ein erneutes Einblenden,
 * sobald sich der Hinweistext inhaltlich ändert.
 */
const CHAT_NOTICE_KEY = 'chat-ai-notice'
const CHAT_NOTICE_VERSION = '2'

const WELCOME_MESSAGE =
  'Hallo! Ich bin der KI-Assistent von Carpantier Consulting — kein Mitarbeiter, sondern ein automatisiertes System. '
  + 'Wie kann ich Ihnen helfen?'

const RATE_LIMIT_MESSAGE =
  'Sie haben in kurzer Zeit sehr viele Nachrichten gesendet. Bitte versuchen Sie es in einer Minute erneut.'

const DELETED_MESSAGE =
  'Ihr Chatverlauf wurde gelöscht. Sie können jederzeit ein neues Gespräch beginnen.'

const ERROR_MESSAGE =
  'Entschuldigung, es ist ein Fehler aufgetreten. Bitte kontaktieren Sie uns direkt unter nico@carpantier-consulting.de'

// Convert URLs, emails, and phone numbers to clickable links
function linkify(text: string): React.ReactNode[] {
  const patterns = [
    { type: 'phone', regex: /(\+49[\s]?\d{2,4}[\s]?\d{6,8})/g },
    { type: 'email', regex: /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g },
    { type: 'url', regex: /(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g },
  ]

  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    let earliestMatch: { type: string; match: RegExpExecArray; index: number } | null = null

    for (const { type, regex } of patterns) {
      regex.lastIndex = 0
      const match = regex.exec(remaining)
      if (match && (earliestMatch === null || match.index < earliestMatch.index)) {
        earliestMatch = { type, match, index: match.index }
      }
    }

    if (!earliestMatch) {
      parts.push(remaining)
      break
    }

    if (earliestMatch.index > 0) {
      parts.push(remaining.slice(0, earliestMatch.index))
    }

    const matchedText = earliestMatch.match[0]

    if (earliestMatch.type === 'url') {
      const href = matchedText.startsWith('http') ? matchedText : `https://${matchedText}`
      parts.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
          {matchedText}
        </a>
      )
    } else if (earliestMatch.type === 'email') {
      parts.push(
        <a key={key++} href={`mailto:${matchedText}`} className="text-blue-400 underline hover:text-blue-300">
          {matchedText}
        </a>
      )
    } else if (earliestMatch.type === 'phone') {
      const cleanPhone = matchedText.replace(/\s/g, '')
      parts.push(
        <a key={key++} href={`tel:${cleanPhone}`} className="text-blue-400 underline hover:text-blue-300">
          {matchedText}
        </a>
      )
    }

    remaining = remaining.slice(earliestMatch.index + matchedText.length)
  }

  return parts
}

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [noticeAccepted, setNoticeAccepted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Ensure component only renders after hydration
  useEffect(() => {
    setMounted(true)
    try {
      setNoticeAccepted(localStorage.getItem(CHAT_NOTICE_KEY) === CHAT_NOTICE_VERSION)
    } catch {
      // Privater Modus o. Ä. — Hinweis wird dann bei jedem Öffnen gezeigt.
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && noticeAccepted) inputRef.current?.focus()
  }, [isOpen, noticeAccepted])

  useEffect(() => {
    if (isOpen && noticeAccepted && messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'assistant', content: WELCOME_MESSAGE }])
    }
  }, [isOpen, noticeAccepted, messages.length])

  // Don't render until mounted on client
  if (!mounted) return null

  const acceptNotice = () => {
    try {
      localStorage.setItem(CHAT_NOTICE_KEY, CHAT_NOTICE_VERSION)
    } catch {
      // Ohne Speicher bleibt die Kenntnisnahme auf diese Sitzung beschränkt.
    }
    setNoticeAccepted(true)
  }

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return

    setShowQuickReplies(false)

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Add placeholder for streaming response
    const assistantMsgId = `${Date.now()}-assistant`
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: 'assistant', content: '' },
    ])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          sessionToken,
          pageUrl: window.location.href,
        }),
      })

      // Eigene Behandlung, damit der Hinweis zur Ursache passt.
      if (response.status === 429) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: RATE_LIMIT_MESSAGE } : msg
          )
        )
        return
      }

      const contentType = response.headers.get('content-type')

      if (contentType?.includes('text/event-stream')) {
        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (reader) {
          let streamedContent = ''

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6))

                  if (data.sessionToken) {
                    setSessionToken(data.sessionToken)
                  }

                  if (data.text) {
                    streamedContent += data.text
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMsgId
                          ? { ...msg, content: streamedContent }
                          : msg
                      )
                    )
                  }

                  if (data.done) {
                    setIsLoading(false)
                  }

                  if (data.error) {
                    throw new Error(data.error)
                  }
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          }
        }
      } else {
        // Handle JSON response (quick answers, tool calls)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'API error')
        }

        setSessionToken(data.sessionToken)
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: data.message } : msg
          )
        )
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: ERROR_MESSAGE,
              }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Löscht den Verlauf serverseitig und lokal.
   *
   * Setzt das Recht auf Löschung unmittelbar im Chatfenster um
   * (Art. 17 Abs. 1 DSGVO), statt es nur in der Datenschutzerklärung zu nennen.
   */
  const deleteHistory = async () => {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      if (sessionToken) {
        await fetch('/api/chat', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionToken }),
        })
      }
    } catch {
      // Der lokale Verlauf wird trotzdem geleert; die Serverdaten verfallen
      // spätestens über die Aufbewahrungsfrist.
    } finally {
      setSessionToken(null)
      setMessages([{ id: 'deleted', role: 'assistant', content: DELETED_MESSAGE }])
      setShowQuickReplies(true)
      setIsDeleting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="KI-Chat öffnen — Sie chatten mit einem KI-Assistenten, nicht mit einem Menschen"
        title="KI-Chat öffnen"
      >
        <MessageCircle className="h-6 w-6" />
        {/* Kennzeichnung nach Art. 50 Abs. 1 KI-VO — bereits am geschlossenen Widget sichtbar */}
        <span className="absolute -top-1 -right-1 flex items-center gap-0.5 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold leading-none text-blue-700 shadow-sm ring-1 ring-blue-600/20">
          <Sparkles className="h-2 w-2" aria-hidden="true" />
          KI
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl bg-card shadow-2xl border border-border transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">KI-Assistent</h3>
              <p className="text-xs text-white/80">Automatisierte Antworten · Carpantier Consulting</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {noticeAccepted && (
              <button
                onClick={deleteHistory}
                disabled={isDeleting}
                className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white disabled:opacity-50"
                aria-label="Chatverlauf löschen"
                title="Chatverlauf löschen (Art. 17 DSGVO)"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* KI- und Datenschutzhinweis: erscheint vor der ersten Nachricht
            (Art. 50 Abs. 1 KI-VO, Art. 13 DSGVO) */}
        {!noticeAccepted ? (
          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex h-full flex-col">
              <div className="mb-3 flex items-center gap-2 text-foreground">
                <ShieldCheck className="h-5 w-5 text-blue-600" aria-hidden="true" />
                <h4 className="text-sm font-semibold">Bevor Sie starten</h4>
              </div>
              <ul className="space-y-2.5 text-xs leading-relaxed text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    Sie schreiben mit einem <strong className="font-semibold text-foreground">KI-Assistenten</strong>,
                    nicht mit einem Menschen. Antworten sind automatisiert erzeugt und können Fehler enthalten.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    Ihre Nachrichten werden zur Beantwortung an Anthropic (USA) übermittelt und bei uns
                    gespeichert. Geben Sie bitte keine sensiblen Daten ein.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    Nennen Sie im Chat Ihre E-Mail-Adresse, speichern wir diese, um Sie zu kontaktieren.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    Ihren Verlauf können Sie jederzeit über das Papierkorb-Symbol oben im
                    Chatfenster löschen.
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Details:{' '}
                <Link href="/datenschutz" className="text-primary underline hover:text-primary/80">
                  Datenschutzerklärung
                </Link>{' '}
                und{' '}
                <Link href="/ki-transparenz" className="text-primary underline hover:text-primary/80">
                  KI-Transparenz
                </Link>
                .
              </p>
              <button
                onClick={acceptNotice}
                className="mt-5 w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Verstanden — Chat starten
              </button>
            </div>
          </div>
        ) : (
        <>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}
              >
                {msg.content ? (
                  <p className="text-sm whitespace-pre-wrap">{linkify(msg.content)}</p>
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                )}
              </div>
            </div>
          ))}

          {/* Quick Replies */}
          {showQuickReplies && messages.length === 1 && !isLoading && (
            <div className="flex flex-wrap gap-2 pt-2">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="px-3 py-1.5 text-xs bg-white border border-border rounded-full text-muted-foreground hover:bg-muted hover:border-primary/30 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nachricht schreiben..."
              className="flex-1 rounded-full bg-muted px-4 py-2 text-sm text-foreground placeholder-muted-foreground outline-hidden focus:ring-2 focus:ring-blue-500/50"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Senden"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] leading-snug text-muted-foreground">
            KI-generierte Antworten — Fehler möglich.{' '}
            <Link href="/datenschutz" className="underline hover:text-foreground">
              Datenschutz
            </Link>{' '}
            ·{' '}
            <Link href="/ki-transparenz" className="underline hover:text-foreground">
              KI-Transparenz
            </Link>
          </p>
        </div>
        </>
        )}
      </div>
    </>
  )
}
