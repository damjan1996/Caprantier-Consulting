import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="container-custom text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Seite nicht gefunden
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Die gesuchte Seite existiert leider nicht oder wurde verschoben.
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurueck zur Startseite
          </Button>
        </Link>
      </div>
    </section>
  )
}
