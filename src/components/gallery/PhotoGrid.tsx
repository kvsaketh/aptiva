import { useCallback, useEffect, useState } from 'react'

export type GalleryItem = { id: number; album: string; caption: string | null; thumb: string; web: string; original: string; width: number; height: number }

export default function PhotoGrid({ photos }: { photos: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, step])

  const cur = open === null ? null : photos[open]
  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {photos.map((p, i) => (
          <button key={p.id} onClick={() => setOpen(i)} className="group block w-full break-inside-avoid overflow-hidden bg-white/[0.04] text-left">
            <img src={p.thumb} alt={p.caption ?? p.album} width={p.width} height={p.height} loading="lazy"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]" />
          </button>
        ))}
      </div>

      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.caption ?? cur.album}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95" onClick={() => setOpen(null)}>
          <div className="flex items-center justify-between px-4 py-3 text-[13px] text-white/70">
            <span>{open! + 1} / {photos.length} · {cur.album}</span>
            <button onClick={() => setOpen(null)} aria-label="Close" className="px-3 py-1 text-2xl leading-none text-white hover:text-[#ff7d8e]">×</button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-16">
            <img src={cur.web} alt={cur.caption ?? cur.album} className="max-h-full max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
            {photos.length > 1 && (
              <>
                <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1) }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 px-3 py-4 text-2xl text-white hover:bg-white/20">‹</button>
                <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1) }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 px-3 py-4 text-2xl text-white hover:bg-white/20">›</button>
              </>
            )}
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-3 text-[13.5px] text-white/80" onClick={(e) => e.stopPropagation()}>
            <span>{cur.caption}</span>
            <a href={cur.original} target="_blank" rel="noreferrer" className="shrink-0 text-white/60 underline hover:text-white">Full size</a>
          </div>
        </div>
      )}
    </>
  )
}
