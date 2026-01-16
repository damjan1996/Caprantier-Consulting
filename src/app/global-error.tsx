'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="de">
      <body className="bg-[#0a0a0a] text-white">
        <section className="min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">
              Kritischer Fehler
            </h1>

            <p className="text-gray-400 mb-8">
              Die Anwendung konnte nicht geladen werden. Bitte laden Sie die Seite neu.
            </p>

            {error.digest && (
              <p className="text-xs text-gray-500 mb-6 font-mono">
                Fehler-ID: {error.digest}
              </p>
            )}

            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Seite neu laden
            </button>
          </div>
        </section>
      </body>
    </html>
  )
}
