/**
 * IndustryMotif — minimal, subtle vector motion graphic per industry.
 * Built from the site's own animation utilities (animate-spin-slow/slower,
 * animate-dash, node-pulse, animate-float) and brand gradient strokes, so it
 * sits quietly inside the dark "ink" surfaces. Line-based, low-contrast, decent
 * size — atmosphere, not decoration.
 */

type Accent = 'red' | 'blue'

const ACCENT: Record<string, Accent> = {
  banking: 'red',
  telecom: 'blue',
  government: 'red',
  energy: 'red',
  'real-estate': 'blue',
  insurance: 'blue',
}

const HAIR = 'rgba(255,255,255,0.14)'
const HAIR_SOFT = 'rgba(255,255,255,0.10)'

/** pointy-top hexagon points string centred at (100,100) */
function hex(r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + 60 * i) * Math.PI) / 180
    return `${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

/** symmetric upward arc of radius r, apex above the point (cx,cy) */
function arc(cx: number, cy: number, r: number) {
  const dx = r * 0.866
  const dy = r * 0.5
  return `M ${(cx - dx).toFixed(1)},${(cy - dy).toFixed(1)} A ${r},${r} 0 0 1 ${(cx + dx).toFixed(1)},${(cy - dy).toFixed(1)}`
}

function Motif({ slug, g, dot }: { slug: string; g: string; dot: string }) {
  const grad = `url(#${g})`
  switch (slug) {
    case 'banking': // vault dial — concentric rings, ticks, pulsing core
      return (
        <g strokeLinecap="round">
          <circle cx="100" cy="100" r="74" stroke={HAIR_SOFT} strokeWidth="1" />
          <g className="animate-spin-slower" style={{ transformOrigin: 'center' }}>
            <circle cx="100" cy="100" r="62" stroke={grad} strokeWidth="1.3" className="animate-dash" />
          </g>
          <circle cx="100" cy="100" r="40" stroke={HAIR} strokeWidth="1" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 * Math.PI) / 180
            return (
              <line
                key={i}
                x1={(100 + 46 * Math.cos(a)).toFixed(1)} y1={(100 + 46 * Math.sin(a)).toFixed(1)}
                x2={(100 + 53 * Math.cos(a)).toFixed(1)} y2={(100 + 53 * Math.sin(a)).toFixed(1)}
                stroke={HAIR} strokeWidth="1"
              />
            )
          })}
          <circle cx="100" cy="100" r="12" stroke={grad} strokeWidth="1.3" />
          <circle cx="100" cy="100" r="3" fill={dot} style={{ animation: 'node-pulse 3.2s ease-in-out infinite' }} />
        </g>
      )
    case 'telecom': // signal tower — radiating arcs from a pulsing tip
      return (
        <g strokeLinecap="round">
          <line x1="100" y1="70" x2="100" y2="150" stroke={HAIR} strokeWidth="1.2" />
          <line x1="80" y1="150" x2="120" y2="150" stroke={HAIR_SOFT} strokeWidth="1" />
          <path d={arc(100, 66, 20)} stroke={grad} strokeWidth="1.4" strokeOpacity="0.85" className="animate-dash" />
          <path d={arc(100, 66, 34)} stroke={grad} strokeWidth="1.3" strokeOpacity="0.55" className="animate-dash" />
          <path d={arc(100, 66, 48)} stroke={grad} strokeWidth="1.2" strokeOpacity="0.3" className="animate-dash" />
          <circle cx="100" cy="66" r="4" fill={dot} style={{ animation: 'node-pulse 2.6s ease-in-out infinite' }} />
        </g>
      )
    case 'government': // civic dome + pillars behind a slow-turning seal
      return (
        <g strokeLinecap="round">
          <g className="animate-spin-slower" style={{ transformOrigin: 'center' }}>
            <circle cx="100" cy="100" r="72" stroke={grad} strokeWidth="1.2" strokeOpacity="0.5" className="animate-dash" />
          </g>
          <path d="M70 104 A30 30 0 0 1 130 104" stroke={HAIR} strokeWidth="1.3" />
          <circle cx="100" cy="62" r="3" fill={dot} style={{ animation: 'node-pulse 3s ease-in-out infinite' }} />
          {[74, 90, 110, 126].map((x) => (
            <line key={x} x1={x} y1="106" x2={x} y2="146" stroke={HAIR} strokeWidth="1.2" />
          ))}
          <line x1="64" y1="106" x2="136" y2="106" stroke={HAIR} strokeWidth="1.2" />
          <line x1="60" y1="146" x2="140" y2="146" stroke={HAIR_SOFT} strokeWidth="1" />
          <line x1="56" y1="154" x2="144" y2="154" stroke={HAIR_SOFT} strokeWidth="1" />
        </g>
      )
    case 'energy': // counter-rotating hexagons with a pulsing core + orbiting node
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <g className="animate-spin-slow" style={{ transformOrigin: 'center' }}>
            <polygon points={hex(68)} stroke={grad} strokeWidth="1.3" className="animate-dash" />
            <circle cx="100" cy="32" r="2.6" fill={dot} />
          </g>
          <g className="animate-spin-slower" style={{ transformOrigin: 'center' }}>
            <polygon points={hex(44)} stroke={HAIR} strokeWidth="1" />
          </g>
          <circle cx="100" cy="100" r="9" stroke={grad} strokeWidth="1.3" />
          <circle cx="100" cy="100" r="3" fill={dot} style={{ animation: 'node-pulse 2.4s ease-in-out infinite' }} />
        </g>
      )
    case 'real-estate': // quiet skyline — towers rising over a scan line, crane on the tallest
      return (
        <g strokeLinecap="round">
          <line x1="44" y1="152" x2="156" y2="152" stroke={grad} strokeWidth="1.2" strokeOpacity="0.5" className="animate-dash" />
          <rect x="62" y="106" width="22" height="46" stroke={HAIR} strokeWidth="1.2" />
          <rect x="119" y="118" width="18" height="34" stroke={HAIR} strokeWidth="1.2" />
          <rect x="89" y="74" width="24" height="78" stroke={grad} strokeWidth="1.3" />
          {[88, 100, 112, 124, 136].map((y) => (
            <line key={`a${y}`} x1="67" y1={y} x2="79" y2={y} stroke={HAIR_SOFT} strokeWidth="1" />
          ))}
          {[86, 98, 110, 122, 134].map((y) => (
            <line key={`b${y}`} x1="94" y1={y} x2="108" y2={y} stroke={HAIR_SOFT} strokeWidth="1" />
          ))}
          <line x1="101" y1="74" x2="101" y2="58" stroke={HAIR} strokeWidth="1.2" />
          <line x1="101" y1="60" x2="126" y2="60" stroke={HAIR} strokeWidth="1.2" />
          <circle cx="126" cy="60" r="3" fill={dot} style={{ animation: 'node-pulse 3.4s ease-in-out infinite' }} />
        </g>
      )
    case 'insurance': // shield + flowing heartbeat
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M100 40 L150 60 L150 104 C150 132 128 152 100 162 C72 152 50 132 50 104 L50 60 Z" stroke={HAIR} strokeWidth="1.2" />
          <path d="M100 58 L136 73 L136 104 C136 124 120 139 100 147 C80 139 64 124 64 104 L64 73 Z" stroke={grad} strokeWidth="1.2" strokeOpacity="0.5" />
          <path d="M62 110 H88 l5 -18 l7 32 l6 -22 l4 8 H140" stroke={grad} strokeWidth="1.6" className="animate-dash-fast" />
          <circle cx="140" cy="110" r="3.2" fill={dot} style={{ animation: 'node-pulse 2.2s ease-in-out infinite' }} />
        </g>
      )
    default:
      return <circle cx="100" cy="100" r="60" stroke={HAIR} strokeWidth="1.2" />
  }
}

export default function IndustryMotif({ slug, className = '' }: { slug: string; className?: string }) {
  const accent = ACCENT[slug] ?? 'red'
  const g = `imgrad-${slug}-${accent}`
  const stops = accent === 'red' ? ['#ff706b', '#ff0800', '#940500'] : ['#9bb7ff', '#5283ff', '#304c94']
  const dot = accent === 'red' ? '#ff3a33' : '#7aa0ff'
  const glow =
    accent === 'red'
      ? 'radial-gradient(circle, rgba(255,8,0,0.12), transparent 68%)'
      : 'radial-gradient(circle, rgba(82,131,255,0.13), transparent 68%)'

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[360px] ${className}`} aria-hidden>
      <div className="absolute inset-[14%] rounded-full opacity-50 blur-3xl" style={{ background: glow }} />
      <svg viewBox="0 0 200 200" fill="none" className="animate-float relative h-full w-full">
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={stops[0]} />
            <stop offset="55%" stopColor={stops[1]} />
            <stop offset="100%" stopColor={stops[2]} />
          </linearGradient>
        </defs>
        <Motif slug={slug} g={g} dot={dot} />
      </svg>
    </div>
  )
}
