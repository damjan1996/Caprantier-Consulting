'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { trackEvent } from '@/lib/analytics'

type FormData = {
  name: string
  email: string
  company: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Unternehmen ist erforderlich'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Nachricht muss mindestens 10 Zeichen lang sein'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      trackEvent('form_validation_error', 'contact_form', 'validation_failed')
      return
    }

    setStatus('submitting')
    trackEvent('form_submit', 'contact_form', 'attempt')

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In production, send to your API endpoint:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })
      // if (!response.ok) throw new Error('Failed to send')

      setStatus('success')
      trackEvent('form_submit', 'contact_form', 'success')
      setFormData({ name: '', email: '', company: '', phone: '', message: '' })
    } catch {
      setStatus('error')
      trackEvent('form_submit', 'contact_form', 'error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (status === 'success') {
    return (
      <FadeIn>
        <div className="bg-white/5 border border-green-500/30 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Nachricht gesendet!
          </h3>
          <p className="text-muted-foreground mb-6">
            Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
          <Button
            variant="secondary"
            onClick={() => setStatus('idle')}
          >
            Neue Nachricht senden
          </Button>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                errors.name ? 'border-red-500' : 'border-white/10 focus:border-primary'
              }`}
              placeholder="Max Mustermann"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              E-Mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                errors.email ? 'border-red-500' : 'border-white/10 focus:border-primary'
              }`}
              placeholder="max@beispiel.de"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
              Unternehmen *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                errors.company ? 'border-red-500' : 'border-white/10 focus:border-primary'
              }`}
              placeholder="Ihre Firma GmbH"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.company}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
              Telefon <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="+49 123 456789"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
            Nachricht *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none ${
              errors.message ? 'border-red-500' : 'border-white/10 focus:border-primary'
            }`}
            placeholder="Wie können wir Ihnen helfen?"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Error message */}
        {status === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-500 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per E-Mail.
            </p>
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full md:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Nachricht senden
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          * Pflichtfelder. Mit dem Absenden stimmen Sie unserer{' '}
          <a href="/datenschutz" className="text-primary hover:underline">
            Datenschutzerklärung
          </a>{' '}
          zu.
        </p>
      </form>
    </FadeIn>
  )
}
