import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'
import { findQuickAnswer } from '@/lib/chat/quick-answers'
import { CARPANTIER_TOOLS_ANTHROPIC, ToolName } from '@/lib/chat/tools'
import { executeToolCall } from '@/lib/chat/tool-executor'
import { createSessionToken, readSessionToken } from '@/lib/chat/session-token'
import { notifyNewLead } from '@/lib/notifications'
import { clientKey, isRateLimited } from '@/lib/rate-limit'


const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

/** Längere Eingaben sind für eine Vertriebsanfrage nicht nötig (Art. 5 Abs. 1 lit. c DSGVO). */
const MAX_MESSAGE_LENGTH = 2000

const RATE_LIMIT_MESSAGES = 20
const RATE_LIMIT_WINDOW_MS = 60_000

/** So viele der jüngsten Nachrichten gehen als Gesprächskontext ans Modell. */
const HISTORY_MESSAGE_LIMIT = 6

const SYSTEM_PROMPT = `Du bist der KI-Assistent von Carpantier Consulting, B2B Vertriebsagentur aus Köln.

KERNINFOS:
- Services: Telefonakquise, Leadgenerierung, Terminqualifizierung
- Zielgruppe: B2B-Dienstleister (Agenturen, IT, Beratung, Software)
- Kontakt: nico@carpantier-consulting.de, +49 157 38186221
- Termin: https://calendly.com/nico-carpantier-consulting/30min

REGELN:
- Max 2-3 Sätze, knapp und freundlich
- Deutsch, durchgehend Sie-Form
- Auf die Frage, ob du ein Mensch bist, IMMER offenlegen, dass du ein KI-Assistent bist
  (Art. 50 Abs. 1 KI-VO). Niemals vorgeben, ein Mensch oder Nico zu sein.
- Bei Fragen zu Datenschutz, gespeicherten Daten oder Löschung: auf die Datenschutzerklärung
  unter /datenschutz und die Schaltfläche "Verlauf löschen" im Chatfenster verweisen
- Niemals nach personenbezogenen Daten fragen, die über eine E-Mail-Adresse hinausgehen
- Keine rechtliche, steuerliche oder medizinische Beratung; keine verbindlichen Zusagen
- NIEMALS konkrete Preise, Kosten oder Zahlen nennen - bei Preisfragen immer auf persönliches Gespräch verweisen
- Bei Interesse oder detaillierten Fragen → Kontakt empfehlen (Telefon, Mail oder Calendly)
- Der Kunde soll am Ende immer Nico kontaktieren
- KEINE Markdown-Formatierung (kein **, kein *, keine #)
- KEINE Emojis`

/**
 * Entfernt Query-String und Fragment aus der Seiten-URL.
 *
 * Kampagnen- und Tracking-Parameter können personenbezogene Daten enthalten,
 * die für den Chat-Kontext nicht erforderlich sind (Art. 5 Abs. 1 lit. c DSGVO).
 */
function stripQueryString(rawUrl: unknown): string | null {
  if (typeof rawUrl !== 'string' || !rawUrl) return null

  try {
    const url = new URL(rawUrl)
    return `${url.origin}${url.pathname}`
  } catch {
    return null
  }
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

type ChatSessionWithHistory = {
  id: string
  pageUrl: string | null
  visitorEmail: string | null
  messages: { role: string; content: string }[]
}

/**
 * Lädt die signierte Sitzung oder legt eine neue an.
 *
 * Eine fehlende oder nicht gültig signierte Kennung führt bewusst zu einer
 * neuen Sitzung statt zu einem Fehler: der Verlauf einer fremden Person darf
 * nicht fortgesetzt werden, der Chat soll aber weiter benutzbar bleiben.
 */
async function resolveSession(
  rawToken: unknown,
  pageUrl: string | null
): Promise<ChatSessionWithHistory> {
  const sessionId = readSessionToken(rawToken)

  if (sessionId) {
    // Absteigend sortiert und danach gedreht: `take` schneidet vom Anfang der
    // Sortierung ab, aufsteigend lieferte es also die ÄLTESTEN Nachrichten und
    // der Assistent verlöre in längeren Gesprächen den aktuellen Faden.
    const existing = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: { messages: { orderBy: { createdAt: 'desc' }, take: HISTORY_MESSAGE_LIMIT } },
    })
    if (existing) return { ...existing, messages: [...existing.messages].reverse() }
  }

  return prisma.chatSession.create({
    data: { pageUrl },
    include: { messages: true },
  })
}

/**
 * Übernimmt eine im Chat genannte E-Mail-Adresse als Kontaktwunsch.
 *
 * Die Angabe erfolgt freiwillig und aktiv; gespeichert wird nur die erste
 * genannte Adresse je Sitzung (Art. 6 Abs. 1 lit. a und lit. b DSGVO).
 */
async function captureEmail(session: ChatSessionWithHistory, message: string): Promise<void> {
  if (session.visitorEmail) return

  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  if (!emailMatch) return

  const capturedEmail = emailMatch[0]

  await prisma.chatSession.update({
    where: { id: session.id },
    data: { visitorEmail: capturedEmail },
  })

  const allMessages = await prisma.chatMessage.findMany({
    where: { sessionId: session.id },
    orderBy: { createdAt: 'asc' },
  })
  const chatHistory = allMessages
    .map((m) => `${m.role === 'user' ? 'Kunde' : 'Bot'}: ${m.content}`)
    .join('\n\n')

  // Bewusst abgewartet: in einer Serverless-Umgebung endet die Ausführung mit
  // der Antwort, eine nur angestoßene Zustellung ginge dann verloren. Ein
  // Fehlschlag darf den Chat aber nicht abbrechen.
  try {
    await notifyNewLead({
      email: capturedEmail,
      pageUrl: session.pageUrl,
      chatHistory,
    })
  } catch (error) {
    console.error('Lead-Benachrichtigung fehlgeschlagen:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(clientKey(request), RATE_LIMIT_MESSAGES, RATE_LIMIT_WINDOW_MS)) {
      return jsonResponse(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.' },
        429
      )
    }

    const { message, sessionToken: rawToken, pageUrl: rawPageUrl } = await request.json()
    const pageUrl = stripQueryString(rawPageUrl)

    if (!message || typeof message !== 'string') {
      return jsonResponse({ error: 'Message is required' }, 400)
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return jsonResponse({ error: 'Nachricht ist zu lang.' }, 413)
    }

    const session = await resolveSession(rawToken, pageUrl)
    const sessionToken = createSessionToken(session.id)

    // Die Abfrage begrenzt den Verlauf bereits auf HISTORY_MESSAGE_LIMIT.
    const history: Anthropic.MessageParam[] = session.messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }))

    await prisma.chatMessage.create({
      data: { sessionId: session.id, role: 'user', content: message },
    })
    await captureEmail(session, message)

    history.push({ role: 'user', content: message })

    // 1. Vordefinierte Antwort — kein Modellaufruf, keine Übermittlung in die USA.
    const quickAnswer = findQuickAnswer(message)
    if (quickAnswer) {
      await prisma.chatMessage.create({
        data: { sessionId: session.id, role: 'assistant', content: quickAnswer },
      })
      return jsonResponse({ message: quickAnswer, sessionToken, done: true })
    }

    // 2. Werkzeugaufrufe brauchen die vollständige Antwort und werden nicht gestreamt.
    if (requiresTools(message)) {
      const result = await handleWithTools(history)
      await prisma.chatMessage.create({
        data: { sessionId: session.id, role: 'assistant', content: result },
      })
      return jsonResponse({ message: result, sessionToken, done: true })
    }

    // 3. Gestreamte Modellantwort.
    const currentSessionId = session.id
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = ''

        try {
          const response = await anthropic.messages.stream({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 150,
            system: SYSTEM_PROMPT,
            messages: history,
          })

          for await (const event of response) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              const text = event.delta.text
              fullResponse += text
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text, sessionToken })}\n\n`)
              )
            }
          }

          await prisma.chatMessage.create({
            data: { sessionId: currentSessionId, role: 'assistant', content: fullResponse },
          })

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ done: true, sessionToken })}\n\n`)
          )
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`)
          )
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
}

/**
 * Löscht die eigene Chat-Sitzung samt Nachrichten.
 *
 * Setzt das Recht auf Löschung ohne Umweg über eine E-Mail an uns um
 * (Art. 17 Abs. 1 DSGVO). Löschbar ist nur die Sitzung, zu der der Aufrufer
 * ein gültig signiertes Token besitzt.
 */
export async function DELETE(request: NextRequest) {
  try {
    if (isRateLimited(clientKey(request), RATE_LIMIT_MESSAGES, RATE_LIMIT_WINDOW_MS)) {
      return jsonResponse({ error: 'Zu viele Anfragen.' }, 429)
    }

    const { sessionToken } = await request.json()
    const sessionId = readSessionToken(sessionToken)

    if (!sessionId) {
      return jsonResponse({ error: 'Ungültige Sitzung.' }, 400)
    }

    // ChatMessage hängt per onDelete: Cascade an ChatSession.
    await prisma.chatSession.deleteMany({ where: { id: sessionId } })

    return jsonResponse({ deleted: true })
  } catch (error) {
    console.error('Chat-Löschung fehlgeschlagen:', error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
}

function requiresTools(message: string): boolean {
  const lowerMsg = message.toLowerCase()
  const toolTriggers = [
    'kaltakquise erlaubt',
    'rechtlich',
    'dsgvo',
    'einwand',
    'skript',
    'köln',
    'berlin',
    'münchen',
    'hamburg',
    'frankfurt',
    'düsseldorf',
  ]
  return toolTriggers.some((t) => lowerMsg.includes(t))
}

async function handleWithTools(history: Anthropic.MessageParam[]): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    system: SYSTEM_PROMPT,
    messages: history,
    tools: CARPANTIER_TOOLS_ANTHROPIC,
  })

  const toolUseBlock = response.content.find((block) => block.type === 'tool_use')

  if (toolUseBlock && toolUseBlock.type === 'tool_use') {
    const toolResult = await executeToolCall(
      toolUseBlock.name as ToolName,
      toolUseBlock.input as Record<string, unknown>
    )

    const followUp = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: [
        ...history,
        { role: 'assistant', content: response.content },
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: toolUseBlock.id,
              content: JSON.stringify(toolResult),
            },
          ],
        },
      ],
    })

    const finalContent = followUp.content[0]
    return finalContent.type === 'text' ? finalContent.text : 'Wie kann ich Ihnen helfen?'
  }

  const textBlock = response.content.find((block) => block.type === 'text')
  return textBlock && textBlock.type === 'text' ? textBlock.text : 'Wie kann ich Ihnen helfen?'
}
