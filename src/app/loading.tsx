export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo/Spinner */}
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        </div>

        {/* Loading Text */}
        <p className="text-muted-foreground text-sm animate-pulse">
          Wird geladen...
        </p>
      </div>
    </div>
  )
}
