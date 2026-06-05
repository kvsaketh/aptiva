import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

/** Scroll-triggered count-up number. */
export default function Counter({ to, prefix = '', suffix = '', decimals = 0, duration = 2, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const obj = { v: 0 }
      gsap.to(obj, {
        v: to, duration, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = prefix + obj.v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix
        },
      })
    }, el)
    return () => ctx.revert()
  }, [to, prefix, suffix, decimals, duration])
  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}
