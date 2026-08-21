import { z } from 'zod'

/**
 * Wortlaut der Einwilligung am Kontaktformular.
 *
 * Formular und Server-Route teilen sich diese Konstante, damit der in der
 * Benachrichtigung protokollierte Nachweis exakt dem entspricht, was der
 * Besucher tatsächlich gelesen hat (Art. 7 Abs. 1 DSGVO).
 */
export const CONTACT_CONSENT_TEXT =
  'Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.'

/** Grenzen halten die Weiterleitungsmail lesbar und den Endpunkt belastbar. */
const MAX = { name: 100, email: 150, company: 150, phone: 40, message: 5000 } as const

export const contactRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name ist erforderlich').max(MAX.name),
  email: z.string().trim().email('Bitte geben Sie eine gültige E-Mail-Adresse ein').max(MAX.email),
  company: z.string().trim().min(1, 'Unternehmen ist erforderlich').max(MAX.company),
  phone: z.string().trim().max(MAX.phone).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Nachricht muss mindestens 10 Zeichen lang sein')
    .max(MAX.message),
  // Die Einwilligung wird serverseitig erneut geprüft: eine reine
  // Client-Validierung liesse sich umgehen und wäre kein Nachweis.
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: 'Bitte stimmen Sie der Datenschutzerklärung zu' }),
  }),
  // Honeypot: unsichtbares Feld, das nur Bots ausfüllen. Die Ablehnung gehört
  // ins Schema — die Route quittiert jeden Schema-Fehler mit derselben
  // generischen Meldung, sodass ein Bot den Treffer nicht zuordnen kann.
  website: z.string().max(0, 'Ungültige Eingabe').optional(),
})

export type ContactRequestInput = z.infer<typeof contactRequestSchema>
