'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

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
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Ensure component only renders after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Hallo! Ich bin der KI-Assistent von Carpantier Consulting. Wie kann ich dir helfen?',
        },
      ])
    }
  }, [isOpen, messages.length])

  // Don't render until mounted on client
  if (!mounted) return null

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
          sessionId,
          pageUrl: window.location.href,
        }),
      })

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

                  if (data.sessionId) {
                    setSessionId(data.sessionId)
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

        if (response.ok) {
          setSessionId(data.sessionId)
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: data.message }
                : msg
            )
          )
        } else {
          throw new Error('API error')
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte kontaktiere uns direkt unter nico@carpantier-consulting.de',
              }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
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
        aria-label="Chat öffnen"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl bg-[#0f0f0f] shadow-2xl border border-white/10 transition-all duration-300 ${
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
              <h3 className="font-semibold text-white text-sm">Carpantier Consulting</h3>
              <p className="text-xs text-white/80">Meist sofortige Antwort</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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
                    : 'bg-white/10 text-gray-200 rounded-bl-md'
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
                  className="px-3 py-1.5 text-xs bg-white/5 border border-white/20 rounded-full text-gray-300 hover:bg-white/10 hover:border-white/30 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nachricht schreiben..."
              className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white placeholder-gray-400 outline-hidden focus:ring-2 focus:ring-blue-500/50"
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
        </div>
      </div>
    </>
  )
}
