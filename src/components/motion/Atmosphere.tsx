/**
 * Decorative background atmospheres — aurora gradient meshes, grids and grain.
 * All are pointer-events-none and absolutely positioned; drop into a relative,
 * overflow-hidden parent.
 */

export function Aurora({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="animate-aurora absolute -top-1/3 -left-1/4 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(229,50,45,0.22),transparent_62%)] blur-[60px]" />
      <div className="animate-aurora-slow absolute top-1/4 -right-1/4 h-[58vw] w-[58vw] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.22),transparent_62%)] blur-[60px]" />
      <div className="animate-aurora absolute -bottom-1/3 left-1/3 h-[48vw] w-[48vw] rounded-full bg-[radial-gradient(circle,rgba(124,60,237,0.18),transparent_64%)] blur-[70px]" />
    </div>
  )
}

export function GridBackdrop({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${light ? 'linegrid opacity-[0.5]' : 'linegrid'} ${className}`}
      style={{
        maskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 78%)',
      }}
      aria-hidden
    />
  )
}

export function Grain() {
  return <div className="grain pointer-events-none absolute inset-0" aria-hidden />
}

/** thin animated brand rule */
export function BrandRule({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-full bg-grad-brand animate-grad-pan ${className}`}
      aria-hidden
    />
  )
}
