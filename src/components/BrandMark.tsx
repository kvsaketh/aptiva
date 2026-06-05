import { useState } from 'react'
import type { Brand } from '@/data/brands'

function monogram(name: string) {
  const clean = name.replace(/\(.*?\)/g, '').trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

/**
 * Real brand mark + wordmark on a uniform tile. Grayscale & dimmed at rest,
 * full-colour + lift on hover. Falls back to a gradient monogram when no
 * logo asset was fetched (or the image fails to load).
 */
export default function BrandMark({ brand, theme = 'dark' }: { brand: Brand; theme?: 'dark' | 'light' }) {
  const [broken, setBroken] = useState(false)
  const showImg = brand.file && !broken
  const dark = theme === 'dark'

  return (
    <div
      className={`group/brand flex items-center gap-3 border px-5 py-3.5 transition-all duration-400 ${
        dark
          ? 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
          : 'border-ink-900/10 bg-white hover:border-ink-900/20 hover:shadow-lift-light'
      }`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center">
        {showImg ? (
          <img
            src={brand.file as string}
            alt={brand.name}
            loading="lazy"
            onError={() => setBroken(true)}
            className="h-7 w-7 object-contain opacity-70 grayscale transition-all duration-400 group-hover/brand:opacity-100 group-hover/brand:grayscale-0"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center bg-grad-red font-mono text-[10px] font-bold text-white">
            {monogram(brand.name)}
          </span>
        )}
      </span>
      <span className={`whitespace-nowrap text-[13.5px] font-medium tracking-[0.01em] transition-colors ${dark ? 'text-white/65 group-hover/brand:text-white' : 'text-ink-900/70 group-hover/brand:text-ink-900'}`}>
        {brand.name}
      </span>
    </div>
  )
}
