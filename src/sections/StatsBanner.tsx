import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IconUsers, IconGlobe, IconLayers, IconCheckCircle } from '../components/Icons'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 50, suffix: '+', label: 'Enterprise clients', icon: IconUsers },
  { value: 120, suffix: '+', label: 'Projects delivered', icon: IconCheckCircle },
  { value: 7, suffix: '', label: 'Global locations', icon: IconGlobe },
  { value: 11, suffix: '', label: 'Proprietary platforms', icon: IconLayers },
]

export default function StatsBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 56, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } })

      numberRefs.current.forEach((num, i) => {
        if (!num) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stats[i].value, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => { num.textContent = Math.floor(obj.val).toLocaleString() + stats[i].suffix },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="surface-ink-raised relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-grad-brand opacity-50" aria-hidden />
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container-xl section-y-sm relative z-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="eyebrow-blue">By the numbers</span>
            <h2 className="display-3 mt-4 max-w-xl text-white">Scale that compounds across the enterprise.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
            Global delivery since 2017 — measured in trust, retention and outcomes for the institutions we serve.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="stat-card group border-gradient relative overflow-hidden border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 md:p-8">
                <span className="icon-tile mb-6 h-11 w-11"><Icon className="h-5 w-5 text-white/85" /></span>
                <span
                  ref={(el) => { numberRefs.current[i] = el }}
                  className="block font-display font-semibold leading-none tracking-[-0.03em] text-white"
                  style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}
                >0</span>
                <span className="mt-4 block text-[13px] leading-snug text-white/55">{stat.label}</span>
                <div className="mt-5 h-px w-10 bg-grad-brand transition-all duration-500 group-hover:w-20" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
