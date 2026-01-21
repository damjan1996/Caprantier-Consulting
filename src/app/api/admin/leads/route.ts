import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Simple API key auth - set this in .env
const ADMIN_API_KEY = process.env.ADMIN_API_KEY

export async function GET(request: NextRequest) {
  // Check API key
  const apiKey = request.headers.get('x-api-key')
  if (ADMIN_API_KEY && apiKey !== ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const leads = await prisma.chatSession.findMany({
      where: {
        visitorEmail: { not: null },
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const formattedLeads = leads.map((lead) => ({
      id: lead.id,
      email: lead.visitorEmail,
      pageUrl: lead.pageUrl,
      createdAt: lead.createdAt,
      messageCount: lead.messages.length,
      chatHistory: lead.messages.map((m) => ({
        role: m.role,
        content: m.content,
        createdAt: m.createdAt,
      })),
    }))

    return NextResponse.json({
      count: formattedLeads.length,
      leads: formattedLeads,
    })
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
