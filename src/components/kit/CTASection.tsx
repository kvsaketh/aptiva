import { Aurora, Grain } from '../motion/Atmosphere'
import Reveal from '../motion/Reveal'
import KineticBackdrop from './KineticBackdrop'
import { IconArrowRight } from '../Icons'

type Props = {
  eyebrow?: string
  title: React.ReactNode
  body?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  color?: 'red' | 'blue'
}

/** Reusable closing CTA band with animated backdrop. Use at the end of pages. */
export default function CTASection({
  eyebrow = "Let's talk",
  title,
  body,
  primary = { label: 'Start a conversation', href: '#/contact' },
  secondary,
  color = 'red',
}: Props) {
  return (
    <section className="surface-ink-raised relative overflow-hidden border-t border-white/10">
      <Aurora className="opacity-70" />
      <KineticBackdrop variant="orbit" color={color} opacity={0.35} className="left-1/2 w-[140%] -translate-x-1/2" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <Reveal stagger=".cta-item" className="flex flex-col items-center text-center">
          <span className={`cta-item ${color === 'blue' ? 'eyebrow-blue' : 'eyebrow-red'}`}>{eyebrow}</span>
          <h2 className="cta-item display-2 mt-6 max-w-4xl text-white text-balance">{title}</h2>
          {body && <p className="cta-item lead mt-6 max-w-2xl text-white/60">{body}</p>}
          <div className="cta-item mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={primary.href} className={color === 'blue' ? 'btn-primary-blue' : 'btn-primary'}>
              <span>{primary.label}</span><IconArrowRight className="relative z-10 h-4 w-4" />
            </a>
            {secondary && <a href={secondary.href} className="btn-ghost">{secondary.label}</a>}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
