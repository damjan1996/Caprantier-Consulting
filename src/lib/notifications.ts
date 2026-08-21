const BREVO_API_KEY = process.env.BREVO_API_KEY
const NOTIFY_EMAIL = 'nico@carpantier-consulting.de'
const SENDER = {
  name: 'Carpantier Website',
  email: 'noreply@carpantier-consulting.de',
}

/**
 * Entschärft Besuchereingaben für die HTML-Benachrichtigung.
 *
 * Chatnachrichten und Formularfelder landen unverändert in einer E-Mail. Ohne
 * Maskierung könnte darin enthaltenes Markup das Postfach-Rendering übernehmen
 * oder Links unterschieben.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function sendMail(subject: string, htmlContent: string): Promise<boolean> {
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY not set')
    return false
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email: NOTIFY_EMAIL }],
        subject,
        htmlContent,
      }),
    })

    if (!response.ok) {
      console.error('Brevo API error:', await response.text())
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to send notification:', error)
    return false
  }
}

interface LeadNotification {
  email: string
  pageUrl: string | null
  chatHistory: string
}

export async function notifyNewLead(lead: LeadNotification): Promise<boolean> {
  const email = escapeHtml(lead.email)

  return sendMail(
    `Neuer Lead: ${lead.email}`,
    `
      <h2>Neuer Lead aus dem Chatbot</h2>
      <p><strong>E-Mail:</strong> ${email}</p>
      <p><strong>Seite:</strong> ${escapeHtml(lead.pageUrl || 'Unbekannt')}</p>
      <h3>Chatverlauf:</h3>
      <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${escapeHtml(lead.chatHistory)}</pre>
      <p style="margin-top: 20px;">
        <a href="mailto:${email}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Kontakt aufnehmen
        </a>
      </p>
    `
  )
}

interface ContactRequest {
  name: string
  email: string
  company: string
  phone: string
  message: string
  /** Wortlaut und Zeitpunkt der im Formular erteilten Einwilligung. */
  consent: { text: string; grantedAt: string }
}

/**
 * Leitet eine Formularanfrage an unser Postfach weiter.
 *
 * Die Mail ist zugleich der Einwilligungsnachweis (Art. 7 Abs. 1 DSGVO): weil
 * die Anfrage bewusst nicht in der Datenbank landet, ist sie der einzige Ort,
 * an dem Wortlaut und Zeitpunkt der Einwilligung dokumentiert sind. Sie gehört
 * deshalb archiviert, solange die Anfrage bearbeitet wird.
 */
export async function notifyContactRequest(request: ContactRequest): Promise<boolean> {
  const email = escapeHtml(request.email)
  const grantedAt = new Date(request.consent.grantedAt).toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
  })

  return sendMail(
    `Kontaktformular: ${request.name} (${request.company})`,
    `
      <h2>Neue Anfrage über das Kontaktformular</h2>
      <p><strong>Name:</strong> ${escapeHtml(request.name)}</p>
      <p><strong>Unternehmen:</strong> ${escapeHtml(request.company)}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(request.phone) || '—'}</p>
      <h3>Nachricht:</h3>
      <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${escapeHtml(request.message)}</pre>
      <h3>Einwilligungsnachweis (Art. 7 Abs. 1 DSGVO)</h3>
      <p style="font-size: 13px; color: #444;">
        Bestätigt am ${escapeHtml(grantedAt)} Uhr (Europe/Berlin)<br />
        Wortlaut: „${escapeHtml(request.consent.text)}“
      </p>
      <p style="margin-top: 20px;">
        <a href="mailto:${email}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Antworten
        </a>
      </p>
    `
  )
}
