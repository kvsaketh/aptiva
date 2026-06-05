import { useEffect, useRef, useState } from 'react'

/**
 * DesignLab — a live, in-app design companion for tuning FONTS, HEADING SIZES and
 * BRAND COLOURS without rebuilding. It writes CSS variables on :root that the
 * design system reads (--font-display, --font-body, --display-scale,
 * --display-tracking, --brand-red, --brand-blue, --grad-red/blue, --ink-900,
 * --paper). Dev-only. Hit "Copy tokens" to hand me the combo you like and I'll
 * bake it in permanently. Settings persist in localStorage.
 */

const HEADING_FONTS = [
  ['Clash Display', '"Clash Display"'],
  ['Geist', '"Geist"'],
  ['General Sans', '"General Sans"'],
  ['Cabinet Grotesk', '"Cabinet Grotesk"'],
  ['Sora', '"Sora"'],
  ['Space Grotesk', '"Space Grotesk"'],
  ['Satoshi', '"Satoshi"'],
  ['IBM Plex Sans', '"IBM Plex Sans"'],
  ['Inter', '"Inter"'],
] as const

const BODY_FONTS = [
  ['Satoshi', '"Satoshi"'],
  ['Geist', '"Geist"'],
  ['General Sans', '"General Sans"'],
  ['Inter', '"Inter"'],
  ['IBM Plex Sans', '"IBM Plex Sans"'],
] as const

const root = () => document.documentElement.style

/* hex helpers for gradient regeneration */
function clamp(n: number) { return Math.max(0, Math.min(255, Math.round(n))) }
function shade(hex: string, amt: number) {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16)
  const f = (v: number) => clamp(amt >= 0 ? v + (255 - v) * amt : v * (1 + amt))
  return '#' + [f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, '0')).join('')
}
function gradient(base: string) {
  return `linear-gradient(125deg, ${shade(base, 0.42)} 0%, ${base} 52%, ${shade(base, -0.42)} 100%)`
}

const DEFAULTS = {
  headFont: '"Space Grotesk"',
  bodyFont: '"Satoshi"',
  scale: 0.96,
  tracking: -0.005,
  red: '#ff0800',
  blue: '#5283ff',
  ink: '#060611',
}
type Settings = typeof DEFAULTS

function apply(s: Settings) {
  root().setProperty('--font-display', s.headFont)
  root().setProperty('--font-body', s.bodyFont)
  root().setProperty('--display-scale', String(s.scale))
  root().setProperty('--display-tracking', `${s.tracking}em`)
  root().setProperty('--brand-red', s.red)
  root().setProperty('--grad-red', gradient(s.red))
  root().setProperty('--grad-red-soft', `linear-gradient(125deg, ${shade(s.red, 0.5)}, ${shade(s.red, 0.1)})`)
  root().setProperty('--brand-blue', s.blue)
  root().setProperty('--grad-blue', gradient(s.blue))
  root().setProperty('--grad-blue-soft', `linear-gradient(125deg, ${shade(s.blue, 0.5)}, ${shade(s.blue, 0.1)})`)
  root().setProperty('--grad-brand', `linear-gradient(90deg, ${s.red}, ${shade(s.blue, -0.1)})`)
  root().setProperty('--ink-900', s.ink)
  root().setProperty('--ink-850', shade(s.ink, 0.12))
  root().setProperty('--ink-800', shade(s.ink, 0.2))
}

export default function DesignLab() {
  const [open, setOpen] = useState(false)
  const [s, setS] = useState<Settings>(() => {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('designlab') || '{}') } } catch { return DEFAULTS }
  })
  const [copied, setCopied] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    apply(s)
    localStorage.setItem('designlab', JSON.stringify(s))
    first.current = false
  }, [s])

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setS((p) => ({ ...p, [k]: v }))

  const copyTokens = () => {
    const txt = [
      '--font-display: ' + s.headFont + ';',
      '--font-body: ' + s.bodyFont + ';',
      '--display-scale: ' + s.scale + ';',
      '--display-tracking: ' + s.tracking + 'em;',
      'brand red: ' + s.red,
      'brand blue: ' + s.blue,
      'ink bg: ' + s.ink,
    ].join('\n')
    navigator.clipboard?.writeText(txt)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
    // eslint-disable-next-line no-console
    console.log('[DesignLab] tokens:\n' + txt)
  }

  const lbl = 'mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/45'
  const sel = 'w-full rounded-sm border border-white/15 bg-[#14141f] px-2.5 py-2 text-[13px] text-white outline-none focus:border-white/40'

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Design Lab"
        className="fixed bottom-6 left-6 z-[200] flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        style={{ background: 'linear-gradient(135deg,#e5322d,#2f6bff)' }}
      >
        {open ? '✕' : 'Aa'}
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 z-[200] max-h-[80vh] w-[300px] overflow-y-auto rounded-lg border border-white/12 bg-[#0b0b14]/95 p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">Design Lab</span>
            <button onClick={() => setS(DEFAULTS)} className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40 hover:text-white">Reset</button>
          </div>

          <div className="space-y-4">
            <div>
              <div className={lbl}>Heading font</div>
              <select className={sel} value={s.headFont} onChange={(e) => set('headFont', e.target.value)}>
                {HEADING_FONTS.map(([name, stack]) => <option key={name} value={stack} style={{ background: '#14141f' }}>{name}</option>)}
              </select>
              <div className="mt-2 text-2xl" style={{ fontFamily: `${s.headFont}, sans-serif` }}>Engineering the future</div>
            </div>

            <div>
              <div className={lbl}>Body font</div>
              <select className={sel} value={s.bodyFont} onChange={(e) => set('bodyFont', e.target.value)}>
                {BODY_FONTS.map(([name, stack]) => <option key={name} value={stack} style={{ background: '#14141f' }}>{name}</option>)}
              </select>
              <div className="mt-1.5 text-[13px] text-white/60" style={{ fontFamily: `${s.bodyFont}, sans-serif` }}>Full-stack IT &amp; digital transformation for the region.</div>
            </div>

            <div>
              <div className={lbl}><span>Heading size</span><span className="text-white/60">{Math.round(s.scale * 100)}%</span></div>
              <input type="range" min={0.55} max={1.1} step={0.01} value={s.scale} onChange={(e) => set('scale', +e.target.value)} className="w-full accent-[#e5322d]" />
            </div>

            <div>
              <div className={lbl}><span>Heading tracking</span><span className="text-white/60">{s.tracking}em</span></div>
              <input type="range" min={-0.06} max={0.02} step={0.005} value={s.tracking} onChange={(e) => set('tracking', +e.target.value)} className="w-full accent-[#e5322d]" />
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
              {([['Red', 'red'], ['Blue', 'blue'], ['BG', 'ink']] as const).map(([name, key]) => (
                <label key={key} className="flex flex-col items-center gap-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">{name}</span>
                  <input type="color" value={s[key]} onChange={(e) => set(key, e.target.value)} className="h-8 w-full cursor-pointer rounded-sm border border-white/15 bg-transparent" />
                </label>
              ))}
            </div>

            <button onClick={copyTokens} className="w-full rounded-sm py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] text-white" style={{ background: 'linear-gradient(135deg,#e5322d,#2f6bff)' }}>
              {copied ? 'Copied ✓' : 'Copy tokens'}
            </button>
            <p className="text-[11px] leading-relaxed text-white/40">Tune live across the whole site, then hit "Copy tokens" and paste them to me — I'll make it permanent.</p>
          </div>
        </div>
      )}
    </>
  )
}
