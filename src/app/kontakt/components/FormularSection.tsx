'use client'

import { useState } from 'react'
import Link from 'next/link'
import { businessInfo } from '@/lib/local-seo'
import { trackEvent } from '@/lib/analytics'
import { CONTACT_CONSENT_TEXT, contactRequestSchema } from '@/lib/contact'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './kontakt.module.css'

/**
 * Das Kontaktformular.
 *
 * **Neu eingekleidet, nicht neu gebaut.** Unverändert geblieben sind die
 * Feldnamen, das Schema (`contactRequestSchema`), der Wortlaut der
 * Einwilligung (`CONTACT_CONSENT_TEXT`), der Honigtopf, die Ereignisse für
 * die Reichweitenmessung und der Endpunkt `/api/contact` samt seiner
 * Server-Prüfung, Ratenbegrenzung und Einwilligungsprotokollierung. Getauscht
 * ist nur die Darstellung: Vorher lag hier ein Tailwind-Baustein mitten in
 * einer Seite, die sonst auf CSS-Modulen läuft.
 *
 * ## Eine Prüfung, nicht zwei
 *
 * Die Vorgängerfassung hatte eine eigene `validateForm()`, die die Regeln aus
 * `contactRequestSchema` noch einmal von Hand nachbildete — bis hin zu einem
 * zweiten E-Mail-Muster. Zwei Prüfungen laufen beim ersten Umformulieren
 * auseinander, und die Client-Seite lockert dann stillschweigend, was der
 * Server noch verlangt. Geprüft wird jetzt beidseitig mit demselben Schema;
 * `zod` liegt ohnehin im Bündel, weil dieses Modul den Einwilligungstext
 * mitbringt.
 *
 * Die Server-Prüfung bleibt die verbindliche: Eine reine Client-Validierung
 * lässt sich umgehen und wäre kein Nachweis (Art. 7 Abs. 1 DSGVO).
 */

/** Der Einwilligungstext bricht am Link auf; der Wortlaut bleibt der geteilte. */
const [EINWILLIGUNG_VOR_LINK, EINWILLIGUNG_NACH_LINK] =
  CONTACT_CONSENT_TEXT.split('Datenschutzerklärung')

const LEERES_FORMULAR = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  privacyConsent: false,
  /** Honigtopf — bleibt für echte Besucher leer und ist nicht sichtbar. */
  website: '',
}

type Formularwerte = typeof LEERES_FORMULAR
type Feldfehler = Partial<Record<keyof Formularwerte, string>>
type Zustand = 'ruht' | 'sendet' | 'gesendet' | 'fehler'

const RUECKFALL_FEHLER = `Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an ${businessInfo.emailGeneral}.`

export default function FormularSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  const [werte, setWerte] = useState<Formularwerte>(LEERES_FORMULAR)
  const [fehler, setFehler] = useState<Feldfehler>({})
  const [zustand, setZustand] = useState<Zustand>('ruht')
  const [sendefehler, setSendefehler] = useState(RUECKFALL_FEHLER)

  const aendern = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target
    const neuerWert = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    setWerte((vorher) => ({ ...vorher, [name]: neuerWert }))

    if (fehler[name as keyof Formularwerte]) {
      setFehler((vorher) => ({ ...vorher, [name]: undefined }))
    }
  }

  const absenden = async (event: React.FormEvent) => {
    event.preventDefault()

    const geprueft = contactRequestSchema.safeParse(werte)
    if (!geprueft.success) {
      const gefunden: Feldfehler = {}
      for (const problem of geprueft.error.issues) {
        const feld = problem.path[0] as keyof Formularwerte | undefined
        // Je Feld die erste Meldung — mehrere untereinander sind nicht hilfreicher.
        if (feld && !gefunden[feld]) gefunden[feld] = problem.message
      }
      setFehler(gefunden)
      trackEvent('form_validation_error', 'contact_form', 'validation_failed')
      return
    }

    setZustand('sendet')
    trackEvent('form_submit', 'contact_form', 'attempt')

    try {
      const antwort = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(werte),
      })

      if (!antwort.ok) {
        const koerper = await antwort.json().catch(() => null)
        setSendefehler(koerper?.error || RUECKFALL_FEHLER)
        setZustand('fehler')
        trackEvent('form_submit', 'contact_form', 'error')
        return
      }

      setZustand('gesendet')
      trackEvent('form_submit', 'contact_form', 'success')
      setWerte(LEERES_FORMULAR)
    } catch {
      setSendefehler(RUECKFALL_FEHLER)
      setZustand('fehler')
      trackEvent('form_submit', 'contact_form', 'error')
    }
  }

  return (
    <section id="formular" ref={ref} className={styles.section} aria-labelledby="formular-title">
      <div className={styles.formularHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Das Formular
        </div>

        <h2
          id="formular-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Fünf Felder. Je genauer die Zielgruppe, desto kürzer die Antwort.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Am hilfreichsten ist, was Sie verkaufen und an wen. Damit lässt sich vorab einschätzen,
          ob wir in diesem Markt etwas beitragen können.
        </p>
      </div>

      <div
        className={`${styles.formCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '22px', '--rd': '0.24s' } as React.CSSProperties}
      >
        {zustand === 'gesendet' ? (
          <div className={styles.erfolg} aria-live="polite">
            <span className={styles.erfolgMarke}>Nachricht ist raus</span>
            <h3 className={styles.erfolgTitel}>Angekommen.</h3>
            <p className={styles.erfolgText}>
              Eine Antwort kommt innerhalb eines Werktags – auch dann, wenn wir absagen. Gespeichert
              wird die Nachricht dabei nicht; sie liegt nur als E-Mail in unserem Postfach.
            </p>
            <button
              type="button"
              className={`${styles.btnDark} ${styles.btnSmall}`}
              onClick={() => setZustand('ruht')}
            >
              Noch eine Nachricht schreiben
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={absenden} noValidate>
            {/* Honigtopf gegen Spam-Bots: für Menschen und Vorlesehilfen nicht vorhanden. */}
            <div className={styles.honigtopf} aria-hidden="true">
              <label htmlFor="website">Bitte nicht ausfüllen</label>
              <input
                type="text"
                id="website"
                name="website"
                value={werte.website}
                onChange={aendern}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className={styles.formGrid}>
              <div className={styles.feld}>
                <label htmlFor="name" className={styles.feldLabel}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={werte.name}
                  onChange={aendern}
                  required
                  autoComplete="name"
                  aria-invalid={fehler.name ? true : undefined}
                  aria-describedby={fehler.name ? 'name-fehler' : undefined}
                  className={`${styles.eingabe} ${fehler.name ? styles.eingabeFehler : ''}`}
                  placeholder="Vor- und Nachname"
                />
                {fehler.name && (
                  <span id="name-fehler" className={styles.feldFehler}>
                    {fehler.name}
                  </span>
                )}
              </div>

              <div className={styles.feld}>
                <label htmlFor="email" className={styles.feldLabel}>
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={werte.email}
                  onChange={aendern}
                  required
                  autoComplete="email"
                  aria-invalid={fehler.email ? true : undefined}
                  aria-describedby={fehler.email ? 'email-fehler' : undefined}
                  className={`${styles.eingabe} ${fehler.email ? styles.eingabeFehler : ''}`}
                  placeholder="name@unternehmen.de"
                />
                {fehler.email && (
                  <span id="email-fehler" className={styles.feldFehler}>
                    {fehler.email}
                  </span>
                )}
              </div>

              <div className={styles.feld}>
                <label htmlFor="company" className={styles.feldLabel}>
                  Unternehmen *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={werte.company}
                  onChange={aendern}
                  required
                  autoComplete="organization"
                  aria-invalid={fehler.company ? true : undefined}
                  aria-describedby={fehler.company ? 'company-fehler' : undefined}
                  className={`${styles.eingabe} ${fehler.company ? styles.eingabeFehler : ''}`}
                  placeholder="Firmenname"
                />
                {fehler.company && (
                  <span id="company-fehler" className={styles.feldFehler}>
                    {fehler.company}
                  </span>
                )}
              </div>

              <div className={styles.feld}>
                <label htmlFor="phone" className={styles.feldLabel}>
                  Telefon <span className={styles.feldOptional}>(freiwillig)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={werte.phone}
                  onChange={aendern}
                  autoComplete="tel"
                  aria-invalid={fehler.phone ? true : undefined}
                  aria-describedby={fehler.phone ? 'phone-fehler' : undefined}
                  className={`${styles.eingabe} ${fehler.phone ? styles.eingabeFehler : ''}`}
                  placeholder="Für den Rückruf, falls Ihnen das lieber ist"
                />
                {fehler.phone && (
                  <span id="phone-fehler" className={styles.feldFehler}>
                    {fehler.phone}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.feld}>
              <label htmlFor="message" className={styles.feldLabel}>
                Nachricht *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={werte.message}
                onChange={aendern}
                required
                aria-invalid={fehler.message ? true : undefined}
                aria-describedby={fehler.message ? 'message-fehler' : undefined}
                className={`${styles.eingabe} ${styles.eingabeMehrzeilig} ${
                  fehler.message ? styles.eingabeFehler : ''
                }`}
                placeholder="Was verkaufen Sie, an wen – und woran hakt es bei der Akquise gerade?"
              />
              {fehler.message && (
                <span id="message-fehler" className={styles.feldFehler}>
                  {fehler.message}
                </span>
              )}
            </div>

            <div className={styles.einwilligung}>
              <label className={styles.einwilligungZeile} htmlFor="privacyConsent">
                <input
                  type="checkbox"
                  id="privacyConsent"
                  name="privacyConsent"
                  checked={werte.privacyConsent}
                  onChange={aendern}
                  required
                  aria-invalid={fehler.privacyConsent ? true : undefined}
                  aria-describedby={fehler.privacyConsent ? 'consent-fehler' : undefined}
                  className={styles.kasten}
                />
                <span className={styles.einwilligungText}>
                  {EINWILLIGUNG_VOR_LINK}
                  <Link href="/datenschutz" target="_blank" rel="noopener noreferrer">
                    Datenschutzerklärung
                  </Link>
                  {EINWILLIGUNG_NACH_LINK} *
                </span>
              </label>
              {fehler.privacyConsent && (
                <span id="consent-fehler" className={styles.feldFehler}>
                  {fehler.privacyConsent}
                </span>
              )}
            </div>

            {/* Transparenzhinweis nach Art. 13 DSGVO — unmittelbar an der
                Erhebung, damit der Zweck ohne Umweg über die
                Datenschutzerklärung erkennbar ist. Wortlaut unverändert aus
                der Vorgängerfassung. */}
            <p className={styles.hinweis}>
              Ihre Angaben nutzen wir ausschließlich, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1
              lit. b und lit. a DSGVO). Der Versand an unser Postfach läuft über unseren
              Auftragsverarbeiter Brevo (Brevo GmbH, Berlin). Wir geben die Daten nicht zu
              Werbezwecken weiter und löschen sie, sobald Ihre Anfrage erledigt ist und keine
              gesetzliche Aufbewahrungsfrist entgegensteht. Ihre Einwilligung können Sie jederzeit
              formlos an{' '}
              <a href={`mailto:${businessInfo.emailGeneral}`}>{businessInfo.emailGeneral}</a>{' '}
              widerrufen. Einzelheiten und Ihre Betroffenenrechte:{' '}
              <Link href="/datenschutz">Datenschutzerklärung</Link>.
            </p>

            {zustand === 'fehler' && (
              <p className={styles.sendeFehler} role="alert">
                {sendefehler}
              </p>
            )}

            <div className={styles.formFoot}>
              <button type="submit" className={styles.btnDark} disabled={zustand === 'sendet'}>
                {zustand === 'sendet' ? 'Wird gesendet …' : 'Nachricht senden'}
              </button>
              <span className={styles.pflicht}>* Pflichtfeld</span>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
