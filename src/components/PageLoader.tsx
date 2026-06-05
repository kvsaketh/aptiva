/** Lightweight branded fallback shown while a lazy route chunk loads. */
export default function PageLoader() {
  return (
    <div className="surface-ink-flat flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-red border-r-brand-blue" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Loading</span>
      </div>
    </div>
  )
}
