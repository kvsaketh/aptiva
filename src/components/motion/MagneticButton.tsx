import { useRef } from 'react'

type Props = {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  strength?: number
}

/**
 * Magnetic hover button — the element eases toward the cursor while hovered,
 * snapping back on leave. Falls back to a plain anchor/button for a11y.
 */
export default function MagneticButton({
  href,
  onClick,
  children,
  className = '',
  strength = 0.32,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0,0)'
  }

  const common = {
    ref,
    className: `${className} will-change-transform transition-transform duration-300 ease-out`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  }

  if (href) {
    return (
      <a href={href} {...common}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} {...common}>
      {children}
    </button>
  )
}
