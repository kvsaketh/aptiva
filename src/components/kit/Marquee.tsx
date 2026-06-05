type Props = {
  items: React.ReactNode[]
  /** seconds for one loop */
  speed?: number
  reverse?: boolean
  className?: string
  separator?: React.ReactNode
}

/** Seamless infinite marquee for any node list. */
export default function Marquee({ items, speed = 38, reverse, className = '', separator }: Props) {
  const doubled = [...items, ...items]
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex w-max items-center gap-8 marquee-pause ${className}`}
        style={{ animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}` }}
      >
        {doubled.map((it, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8">
            {it}
            {separator ?? <span className="h-1 w-1 rounded-full bg-brand-red/50" />}
          </span>
        ))}
      </div>
    </div>
  )
}
