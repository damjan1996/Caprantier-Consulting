import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'
import { findQuickAnswer } from '@/lib/chat/quick-answers'
import { CARPANTIER_TOOLS_ANTHROPIC, ToolName } from '@/lib/chat/tools'
import { executeToolCall } from '@/lib/chat/tool-executor'
import { notifyNewLead } from '@/lib/notifications'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `Du bist der KI-Assistent von Carpantier Consulting, B2B Vertriebsagentur aus Köln.

KERNINFOS:
- Services: Telefonakquise, Leadgenerierung, Terminqualifizierung
- Zielgruppe: B2B-Dienstleister (Agenturen, IT, Beratung, Software)
- Kontakt: nico@carpantier-consulting.de, +49 157 38186221
- Termin: https://calendly.com/nico-carpantier-consulting/30min

REGELN:
- Max 2-3 Sätze, knapp und freundlich
- Deutsch
- NIEMALS konkrete Preise, Kosten oder Zahlen nennen - bei Preisfragen immer auf persönliches Gespräch verweisen
- Bei Interesse oder detaillierten Fragen → Kontakt empfehlen (Telefon, Mail oder Calendly)
- Der Kunde soll am Ende immer Nico kontaktieren
- KEINE Markdown-Formatierung (kein **, kein *, keine #)
- KEINE Emojis`

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, pageUrl } = await request.json()

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 1. Check for quick answer (instant, no streaming needed)
    const quickAnswer = findQuickAnswer(message)
    if (quickAnswer) {
      saveMessages(sessionId, pageUrl, message, quickAnswer)
      return new Response(JSON.stringify({ message: quickAnswer, sessionId, done: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 2. Get or create session
    let session
    if (sessionId) {
      session = await prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: { messages: { orderBy: { createdAt: 'asc' }, take: 6 } },
      })
    }

    if (!session) {
      session = await prisma.chatSession.create({
        data: { pageUrl },
        include: { messages: true },
      })
    }

    // Save user message
    await prisma.chatMessage.create({
      data: { sessionId: session.id, role: 'user', content: message },
    })

    // Extract and save email if found in message
    const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
    if (emailMatch && !session.visitorEmail) {
      const capturedEmail = emailMatch[0]

      await prisma.chatSession.update({
        where: { id: session.id },
        data: { visitorEmail: capturedEmail },
      })

      // Build chat history for notification
      const allMessages = await prisma.chatMessage.findMany({
        where: { sessionId: session.id },
        orderBy: { createdAt: 'asc' },
      })
      const chatHistory = allMessages
        .map((m) => `${m.role === 'user' ? 'Kunde' : 'Bot'}: ${m.content}`)
        .join('\n\n')

      // Send notification (don't await - fire and forget)
      notifyNewLead({
        email: capturedEmail,
        pageUrl: session.pageUrl,
        chatHistory,
      })
    }

    // Build conversation history
    const history: Anthropic.MessageParam[] = session.messages.slice(-4).map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }))
    history.push({ role: 'user', content: message })

    // 3. Check if needs tools (no streaming for tool calls)
    const needsTools = requiresTools(message)

    if (needsTools) {
      const result = await handleWithTools(history)
      await prisma.chatMessage.create({
        data: { sessionId: session.id, role: 'assistant', content: result },
      })
      return new Response(JSON.stringify({ message: result, sessionId: session.id, done: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 4. Stream response
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
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text, sessionId: currentSessionId })}\n\n`))
            }
          }

          // Save complete message
          await prisma.chatMessage.create({
            data: { sessionId: currentSessionId, role: 'assistant', content: fullResponse },
          })

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, sessionId: currentSessionId })}\n\n`))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`))
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
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

async function saveMessages(
  sessionId: string | null,
  pageUrl: string,
  userMsg: string,
  assistantMsg: string
) {
  try {
    let sid = sessionId
    if (!sid) {
      const session = await prisma.chatSession.create({ data: { pageUrl } })
      sid = session.id
    }
    await prisma.chatMessage.createMany({
      data: [
        { sessionId: sid, role: 'user', content: userMsg },
        { sessionId: sid, role: 'assistant', content: assistantMsg },
      ],
    })
  } catch (e) {
    console.error('Failed to save messages:', e)
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
