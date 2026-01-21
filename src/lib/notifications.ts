const BREVO_API_KEY = process.env.BREVO_API_KEY
const NOTIFY_EMAIL = 'nico@carpantier-consulting.de'

interface LeadNotification {
  email: string
  pageUrl: string | null
  chatHistory: string
}

export async function notifyNewLead(lead: LeadNotification) {
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY not set')
    return
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Carpantier Chatbot',
          email: 'noreply@carpantier-consulting.de',
        },
        to: [{ email: NOTIFY_EMAIL }],
        subject: `Neuer Lead: ${lead.email}`,
        htmlContent: `
          <h2>Neuer Lead aus dem Chatbot</h2>
          <p><strong>E-Mail:</strong> ${lead.email}</p>
          <p><strong>Seite:</strong> ${lead.pageUrl || 'Unbekannt'}</p>
          <h3>Chatverlauf:</h3>
          <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${lead.chatHistory}</pre>
          <p style="margin-top: 20px;">
            <a href="mailto:${lead.email}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Kontakt aufnehmen
            </a>
          </p>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Brevo API error:', error)
    }
  } catch (error) {
    console.error('Failed to send lead notification:', error)
  }
}
