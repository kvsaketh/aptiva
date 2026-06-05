/**
 * KineticBackdrop — lightweight animated SVG section backgrounds (no WebGL).
 * Variants add motion + "wow" to any section cheaply. Drop into a relative,
 * overflow-hidden parent; it's absolutely positioned and pointer-events-none.
 *
 *   <KineticBackdrop variant="orbit" color="blue" />
 */
type Variant = 'orbit' | 'mesh' | 'flow' | 'rings'
type Color = 'red' | 'blue'

const STROKE: Record<Color, string> = { red: '#f0455c', blue: '#5b86ff' }
const STROKE2: Record<Color, string> = { red: '#7c3aed', blue: '#7c3aed' }

export default function KineticBackdrop({
  variant = 'orbit',
  color = 'red',
  className = '',
  opacity = 0.5,
}: { variant?: Variant; color?: Color; className?: string; opacity?: number }) {
  const c = STROKE[color]
  const c2 = STROKE2[color]
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity }} aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id={`kg-${variant}-${color}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c} stopOpacity="0.9" />
            <stop offset="100%" stopColor={c2} stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id={`kr-${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c} stopOpacity="0.35" />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </radialGradient>
        </defs>

        {variant === 'orbit' && (
          <g transform="translate(400 400)">
            <circle r="320" fill={`url(#kr-${color})`} />
            <g className="animate-spin-slow">
              <circle r="300" stroke={`url(#kg-orbit-${color})`} strokeWidth="1" className="animate-dash" />
              <circle cx="300" cy="0" r="4" fill={c} />
            </g>
            <g className="animate-spin-slower">
              <circle r="220" stroke={c2} strokeOpacity="0.4" strokeWidth="1" className="animate-dash-fast" />
              <circle cx="-220" cy="0" r="3.5" fill={c2} />
            </g>
            <g className="animate-spin-slow">
              <circle r="140" stroke={c} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 8" />
              <circle cx="140" cy="0" r="3" fill={c} />
            </g>
            <circle r="64" stroke={c} strokeOpacity="0.3" strokeWidth="1" />
          </g>
        )}

        {variant === 'rings' && (
          <g transform="translate(400 400)">
            {[80, 150, 220, 290, 360].map((r, i) => (
              <circle key={r} r={r} stroke={i % 2 ? c2 : c} strokeOpacity={0.16 + i * 0.04} strokeWidth="1"
                className={i % 2 ? 'animate-spin-slower' : 'animate-spin-slow'} strokeDasharray={`${2 + i} ${10 - i}`} />
            ))}
          </g>
        )}

        {variant === 'flow' && (
          <g stroke={`url(#kg-flow-${color})`} strokeWidth="1.2" fill="none">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path key={i}
                d={`M-50 ${120 + i * 110} C 200 ${40 + i * 110}, 600 ${260 + i * 90}, 860 ${120 + i * 100}`}
                className={i % 2 ? 'animate-dash' : 'animate-dash-fast'} strokeOpacity={0.5 - i * 0.05} />
            ))}
          </g>
        )}

        {variant === 'mesh' && (
          <g>
            {MESH_LINES.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 3 ? c : c2} strokeOpacity="0.22" strokeWidth="0.8" />
            ))}
            {MESH_NODES.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.6" fill={i % 2 ? c : c2}
                style={{ animation: `node-pulse ${3 + (i % 5)}s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}

const MESH_NODES: [number, number][] = [
  [120, 140], [300, 90], [520, 160], [700, 110], [180, 360], [400, 300],
  [620, 380], [760, 320], [90, 560], [320, 560], [540, 600], [700, 560], [240, 720], [480, 700], [660, 740],
]
const MESH_LINES: [number, number, number, number][] = [
  [120, 140, 300, 90], [300, 90, 520, 160], [520, 160, 700, 110], [120, 140, 180, 360],
  [300, 90, 400, 300], [520, 160, 620, 380], [700, 110, 760, 320], [180, 360, 400, 300],
  [400, 300, 620, 380], [620, 380, 760, 320], [180, 360, 90, 560], [400, 300, 320, 560],
  [620, 380, 540, 600], [760, 320, 700, 560], [90, 560, 320, 560], [320, 560, 540, 600],
  [540, 600, 700, 560], [320, 560, 240, 720], [540, 600, 480, 700], [700, 560, 660, 740],
  [240, 720, 480, 700], [480, 700, 660, 740],
]
