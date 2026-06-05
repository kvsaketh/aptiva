import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** stagger child elements matching this selector instead of the wrapper itself */
  stagger?: string
  delay?: number
  y?: number
  from?: 'up' | 'down' | 'left' | 'right' | 'scale'
  duration?: number
  as?: React.ElementType
  start?: string
}

/**
 * Scroll-triggered reveal. Wraps content and animates it (or staggered children)
 * into view once. Respects prefers-reduced-motion via the .will-reveal fallback.
 */
export default function Reveal({
  children,
  className = '',
  stagger,
  delay = 0,
  y = 40,
  from = 'up',
  duration = 0.9,
  as: Tag = 'div',
  start = 'top 82%',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fromVars: gsap.TweenVars = { opacity: 0 }
    if (from === 'up') fromVars.y = y
    if (from === 'down') fromVars.y = -y
    if (from === 'left') fromVars.x = -y
    if (from === 'right') fromVars.x = y
    if (from === 'scale') { fromVars.scale = 0.92; fromVars.y = y * 0.4 }

    const targets = stagger ? el.querySelectorAll(stagger) : el
    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, {
        opacity: 1, x: 0, y: 0, scale: 1,
        duration,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: el, start, once: true },
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, delay, y, from, duration, start])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
