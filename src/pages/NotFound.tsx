import { Aurora, Grain } from '@/components/motion/Atmosphere'
import KineticBackdrop from '@/components/kit/KineticBackdrop'
import { IconArrowRight, IconArrowUpRight } from '@/components/Icons'

const links = [
  { label: 'Services', href: '#/services' },
  { label: 'Solutions', href: '#/solutions' },
  { label: 'Industries', href: '#/industries' },
  { label: 'Case Studies', href: '#/case-studies' },
  { label: 'About', href: '#/about' },
  { label: 'Contact', href: '#/contact' },
]

export default function NotFound() {
  return (
    <section className="surface-ink-raised grain relative flex min-h-[82vh] items-center overflow-hidden">
      <Aurora />
      <KineticBackdrop variant="orbit" color="red" opacity={0.4} className="left-1/2 w-[120%] -translate-x-1/2" />
      <Grain />
      <div className="container-xl relative z-10 text-center">
        <span className="eyebrow-red justify-center">Error 404</span>
        <h1 className="mt-6 font-display font-semibold leading-none tracking-[-0.04em] text-gradient-red" style={{ fontSize: 'clamp(96px, 20vw, 260px)' }}>
          404
        </h1>
        <h2 className="display-3 mx-auto mt-2 max-w-2xl text-white text-balance">This page took an unscheduled migration.</h2>
        <p className="lead mx-auto mt-5 max-w-xl text-white/60">
          The page you're looking for has moved, retired, or never existed. Let's get you back to something useful.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#/" className="btn-primary"><span>Back to home</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
          <a href="#/contact" className="btn-ghost group">Contact us<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
        </div>

        <div className="mx-auto mt-14 max-w-2xl border-t border-white/10 pt-8">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">Popular destinations</p>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="group border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[13px] text-white/65 transition-all hover:border-brand-red/40 hover:bg-white/[0.06] hover:text-white">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
