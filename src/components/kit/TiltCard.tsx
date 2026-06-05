import { useRef } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  /** max tilt in degrees */
  max?: number
  /** show a cursor-following spotlight glow */
  glow?: 'red' | 'blue' | 'none'
  as?: React.ElementType
  href?: string
}

/**
 * 3D tilt-on-hover card with a cursor-following spotlight. Pure transform +
 * radial-gradient overlay; disabled under prefers-reduced-motion.
 */
export default function TiltCard({ children, className = '', max = 8, glow = 'red', as, href }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const Tag: React.ElementType = as ?? (href ? 'a' : 'div')

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) translateZ(0)`
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'
  }

  const glowColor = glow === 'blue' ? 'rgba(91,134,255,0.18)' : glow === 'red' ? 'rgba(255,90,110,0.18)' : 'transparent'

  return (
    <Tag
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
    >
      {glow !== 'none' && (
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(420px circle at var(--mx,50%) var(--my,50%), ${glowColor}, transparent 60%)` }}
          aria-hidden
        />
      )}
      {children}
    </Tag>
  )
}
