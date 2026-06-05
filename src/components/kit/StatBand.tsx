import Reveal from '../motion/Reveal'
import Counter from './Counter'

export type Stat = { to: number; prefix?: string; suffix?: string; decimals?: number; label: string }

/** Animated count-up stat band. Works on dark sections. */
export default function StatBand({ stats, color = 'red' }: { stats: Stat[]; color?: 'red' | 'blue' }) {
  return (
    <Reveal stagger=".stat-item" className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/[0.04] lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="stat-item group bg-ink-900/70 p-7 transition-colors duration-500 hover:bg-white/[0.03]">
          <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
            <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
          </div>
          <div className="mt-3 text-[13px] leading-snug text-white/55">{s.label}</div>
          <div className={`mt-4 h-px w-9 transition-all duration-500 group-hover:w-16 ${color === 'blue' ? 'bg-grad-blue' : 'bg-grad-red'}`} />
        </div>
      ))}
    </Reveal>
  )
}
