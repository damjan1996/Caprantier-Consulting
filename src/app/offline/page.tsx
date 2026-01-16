import { WifiOff, RefreshCw } from 'lucide-react'

export const metadata = {
  title: 'Offline',
}

export default function OfflinePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="container-custom text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
            <WifiOff className="h-10 w-10 text-yellow-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Sie sind offline
        </h1>

        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Erneut versuchen
        </button>
      </div>
    </section>
  )
}
