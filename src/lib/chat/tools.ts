import Anthropic from '@anthropic-ai/sdk'

export const CARPANTIER_TOOLS_ANTHROPIC: Anthropic.Tool[] = [
  {
    name: 'search_knowledge',
    description: 'Suche in der Wissensdatenbank nach Informationen zu B2B Vertrieb, Kaltakquise, Leadgenerierung.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Suchbegriff (z.B. "Kaltakquise", "BANT")',
        },
        category: {
          type: 'string',
          enum: ['vertrieb', 'kaltakquise', 'leadgenerierung', 'rechtliches', 'methoden', 'all'],
          description: 'Kategorie',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_service_info',
    description: 'Informationen zu Dienstleistungen (Telefonakquise, Leadgenerierung, etc.)',
    input_schema: {
      type: 'object',
      properties: {
        service: {
          type: 'string',
          enum: ['telefonakquise', 'leadgenerierung', 'terminqualifizierung', 'reporting', 'all'],
          description: 'Dienstleistung',
        },
      },
      required: ['service'],
    },
  },
  {
    name: 'get_faq',
    description: 'Häufig gestellte Fragen zu Preisen, Prozess, etc.',
    input_schema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['general', 'pricing', 'process', 'services', 'all'],
          description: 'FAQ-Kategorie',
        },
      },
      required: ['category'],
    },
  },
  {
    name: 'get_company_info',
    description: 'Unternehmensinformationen (Kontakt, Öffnungszeiten, Über uns)',
    input_schema: {
      type: 'object',
      properties: {
        info_type: {
          type: 'string',
          enum: ['contact', 'hours', 'about', 'process', 'team'],
          description: 'Art der Information',
        },
      },
      required: ['info_type'],
    },
  },
  {
    name: 'get_city_info',
    description: 'Informationen zu Vertriebsdienstleistungen in einer Stadt',
    input_schema: {
      type: 'object',
      properties: {
        city: {
          type: 'string',
          description: 'Stadtname (z.B. "Köln", "München")',
        },
      },
      required: ['city'],
    },
  },
  {
    name: 'schedule_consultation',
    description: 'Calendly-Link für Terminbuchung',
    input_schema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
]

export type ToolName =
  | 'search_knowledge'
  | 'get_service_info'
  | 'get_faq'
  | 'get_company_info'
  | 'get_city_info'
  | 'schedule_consultation'

export interface ToolResult {
  success: boolean
  data?: Record<string, unknown>
  error?: string
}
