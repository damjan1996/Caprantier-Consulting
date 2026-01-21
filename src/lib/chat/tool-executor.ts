import { prisma } from '@/lib/prisma'
import { ToolName, ToolResult } from './tools'

export async function executeToolCall(
  toolName: ToolName,
  input: Record<string, unknown>
): Promise<ToolResult> {
  switch (toolName) {
    case 'search_knowledge': {
      const query = (input.query as string).toLowerCase()
      const category = input.category as string | undefined

      // Search in articles
      const articles = await prisma.knowledgeArticle.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { keywords: { contains: query, mode: 'insensitive' } },
          ],
          ...(category && category !== 'all' ? { category } : {}),
        },
        select: {
          title: true,
          description: true,
          keyPoints: true,
          faqs: true,
        },
        take: 3,
      })

      if (articles.length === 0) {
        return {
          success: true,
          data: {
            found: false,
            message: 'Keine Artikel zu diesem Thema gefunden.',
          },
        }
      }

      const formattedArticles = articles.map((a) => ({
        title: a.title,
        description: a.description,
        keyPoints: JSON.parse(a.keyPoints || '[]'),
        faqs: JSON.parse(a.faqs || '[]'),
      }))

      return {
        success: true,
        data: {
          found: true,
          articles: formattedArticles,
        },
      }
    }

    case 'get_service_info': {
      const service = input.service as string

      if (service === 'all') {
        const services = await prisma.knowledgeService.findMany({
          select: {
            title: true,
            description: true,
            features: true,
          },
        })

        return {
          success: true,
          data: {
            services: services.map((s) => ({
              title: s.title,
              description: s.description,
              features: JSON.parse(s.features || '[]'),
            })),
          },
        }
      }

      const serviceData = await prisma.knowledgeService.findUnique({
        where: { slug: service },
      })

      if (!serviceData) {
        return {
          success: true,
          data: {
            found: false,
            message: 'Service nicht gefunden.',
          },
        }
      }

      return {
        success: true,
        data: {
          found: true,
          title: serviceData.title,
          description: serviceData.description,
          features: JSON.parse(serviceData.features || '[]'),
          benefits: JSON.parse(serviceData.benefits || '[]'),
        },
      }
    }

    case 'get_faq': {
      const category = input.category as string
      const question = input.question as string | undefined

      const faqs = await prisma.knowledgeFAQ.findMany({
        where: {
          ...(category !== 'all' ? { category } : {}),
          ...(question
            ? {
                OR: [
                  { question: { contains: question, mode: 'insensitive' } },
                  { answer: { contains: question, mode: 'insensitive' } },
                ],
              }
            : {}),
        },
        orderBy: { priority: 'desc' },
        take: 5,
      })

      return {
        success: true,
        data: {
          faqs: faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          })),
        },
      }
    }

    case 'get_company_info': {
      const infoType = input.info_type as string

      const info = await prisma.companyInfo.findUnique({
        where: { key: infoType },
      })

      if (!info) {
        // Fallback für Basis-Kontaktdaten
        if (infoType === 'contact') {
          return {
            success: true,
            data: {
              name: 'Carpantier Consulting',
              owner: 'Nico-Luca Carpantier',
              email: 'nico@carpantier-consulting.de',
              phone: '+49 157 38186221',
              address: 'Stammheimer Straße 123, 50735 Köln',
              calendly: 'https://calendly.com/nico-carpantier/30min',
            },
          }
        }
        return {
          success: true,
          data: { found: false },
        }
      }

      return {
        success: true,
        data: JSON.parse(info.value),
      }
    }

    case 'get_city_info': {
      const cityName = (input.city as string).toLowerCase()

      const city = await prisma.knowledgeCity.findFirst({
        where: {
          OR: [
            { name: { equals: cityName, mode: 'insensitive' } },
            { slug: { equals: cityName, mode: 'insensitive' } },
          ],
        },
      })

      if (!city) {
        return {
          success: true,
          data: {
            found: false,
            message: `Wir sind deutschlandweit tätig, auch in ${input.city}.`,
          },
        }
      }

      return {
        success: true,
        data: {
          found: true,
          name: city.name,
          region: city.region,
          description: city.description,
          nearbyAreas: JSON.parse(city.nearbyAreas || '[]'),
        },
      }
    }

    case 'schedule_consultation': {
      return {
        success: true,
        data: {
          calendlyUrl: 'https://calendly.com/nico-carpantier/30min',
          message:
            'Hier kannst du ein kostenloses 30-minütiges Strategiegespräch buchen.',
        },
      }
    }

    default:
      return { success: false, error: `Unknown tool: ${toolName}` }
  }
}
