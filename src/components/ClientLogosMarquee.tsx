import { trpc } from '@/providers/trpc'
import { clients as staticClients, brand as resolveBrand, type Brand } from '@/data/brands'
import BrandMark from './BrandMark'

function Row({ items, reverse }: { items: Brand[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div
      className="flex w-max items-center gap-4 marquee-pause"
      style={{ animation: `marquee ${reverse ? 46 : 40}s linear infinite ${reverse ? 'reverse' : ''}` }}
    >
      {doubled.map((b, i) => (
        <div key={`${b.slug}-${i}`} className="shrink-0">
          <BrandMark brand={b} />
        </div>
      ))}
    </div>
  )
}

export default function ClientLogosMarquee() {
  const { data } = trpc.media.clientLogo.list.useQuery()
  // Prefer DB clients (matched to fetched marks by slug/name) else the static roster.
  const list: Brand[] = data && data.length > 0
    ? data.map((c) => {
        const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        const r = resolveBrand(slug)
        return r.file ? r : { slug, name: c.name, file: null, domain: '' }
      })
    : staticClients

  const mid = Math.ceil(list.length / 2)

  return (
    <section className="surface-ink-flat relative overflow-hidden border-t border-white/10 py-20 md:py-28">
      <div className="container-xl mb-12 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
        <div>
          <span className="eyebrow-blue">Trusted across the region</span>
          <h2 className="display-3 mt-4 max-w-2xl text-white">
            Banks, governments, telecoms &amp; developers <span className="text-gradient-blue">run on Aptiva.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-white/55">
          A partner of record for 50+ enterprises worldwide — from national operators to sovereign institutions.
        </p>
      </div>

      <div className="relative space-y-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-900 to-transparent" />
        <div className="overflow-hidden"><Row items={list.slice(0, mid)} /></div>
        <div className="overflow-hidden"><Row items={list.slice(mid)} reverse /></div>
      </div>
    </section>
  )
}
