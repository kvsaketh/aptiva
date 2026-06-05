import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Aurora, GridBackdrop, Grain } from '../motion/Atmosphere'
import { IconArrowRight } from '../Icons'

interface Crumb { label: string; href?: string }

interface PageHeaderProps {
  label: string
  title: string
  subtitle?: string
  bgImage?: string
  crumbs?: Crumb[]
  stats?: { value: string; label: string }[]
}

/**
 * Premium animated page header used across all inner pages. Layered aurora +
 * grid + grain atmosphere, gradient-accented title, optional breadcrumb and
 * inline stat strip. Title words rise on mount.
 */
export default function PageHeader({ label, title, subtitle, bgImage, crumbs, stats }: PageHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.ph-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.ph-word', { opacity: 0, y: 60, rotateX: -40 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.08 }, '-=0.2')
        .fromTo('.ph-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.45')
        .fromTo('.ph-stat', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
    }, el)
    return () => ctx.revert()
  }, [])

  const words = title.split(' ')

  return (
    <section
      ref={ref}
      className="surface-ink-raised grain relative flex min-h-[58vh] items-center overflow-hidden pt-40 pb-20 md:min-h-[64vh]"
    >
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.14]"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden
        />
      )}
      <Aurora />
      <GridBackdrop />
      <Grain />
      <div className="absolute inset-x-0 bottom-0 h-px bg-grad-brand animate-grad-pan" aria-hidden />

      <div className="container-xl relative z-10 w-full">
        {crumbs && (
          <nav className="ph-eyebrow mb-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <a href={c.href} className="transition-colors hover:text-white">{c.label}</a>
                ) : (
                  <span className="text-white/70">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-brand-red">/</span>}
              </span>
            ))}
          </nav>
        )}

        <span className="ph-eyebrow eyebrow-red">{label}</span>

        <h1 className="display-1 mt-6 max-w-5xl text-white text-balance" style={{ perspective: 800 }}>
          {words.map((w, i) => (
            <span key={i} className="ph-word mr-[0.28ch] inline-block">
              {i === words.length - 1 ? <span className="text-gradient-brand">{w}</span> : w}
            </span>
          ))}
        </h1>

        {subtitle && (
          <p className="ph-sub lead mt-7 max-w-2xl text-white/65">{subtitle}</p>
        )}

        {stats && (
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label} className="ph-stat">
                <div className="font-display text-3xl font-semibold text-white md:text-4xl">{s.value}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {!stats && (
          <a href="#/contact" className="ph-sub mt-10 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white">
            Talk to our team
            <IconArrowRight className="h-4 w-4 text-brand-red" />
          </a>
        )}
      </div>
    </section>
  )
}
