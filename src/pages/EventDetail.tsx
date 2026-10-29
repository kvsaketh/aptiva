import { useParams } from 'react-router-dom'
import Reveal from '@/components/motion/Reveal'
import CTASection from '@/components/kit/CTASection'
import { Aurora, GridBackdrop, Grain } from '@/components/motion/Atmosphere'
import { IconArrowRight, IconArrowUpRight } from '@/components/Icons'
import { EventVideo, RoleChips, useNow } from '@/components/events/EventPromos'
import { daysLabel, daysUntil, events, isVideoLive, meetingHref } from '@/data/events'
import NotFound from './NotFound'

export default function EventDetail() {
  const { slug } = useParams()
  const now = useNow()
  const e = events.find((x) => x.id === slug)
  if (!e) return <NotFound />

  const dated = !!e.start
  const ended = !!e.end && new Date(e.end).getTime() < now
  const live = dated && !ended && new Date(e.start!).getTime() <= now
  const status = ended ? 'Past event' : live ? 'Happening now' : dated ? daysLabel(daysUntil(e, now)) : 'Details soon'

  return (
    <div>
      {/* Header */}
      <section className="surface-ink-raised grain relative overflow-hidden pb-16 pt-36 md:pt-40">
        <Aurora />
        <GridBackdrop />
        <Grain />
        <div className="container-xl relative z-10">
          <nav className="mb-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            <a href="#/" className="hover:text-white">Home</a><span className="text-brand-red">/</span>
            <a href="#/events" className="hover:text-white">Events</a><span className="text-brand-red">/</span>
            <span className="text-white/75">{e.name}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow-red">{status}</span>
              <h1 className="mt-5 font-display text-[clamp(34px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">{e.name}</h1>
              {e.tagline && <p className="mt-4 max-w-xl text-[clamp(16px,1.5vw,20px)] leading-snug text-white/75">{e.tagline}</p>}
              <dl className="mt-7 grid max-w-xl grid-cols-2 gap-5 border-y border-white/10 py-5">
                <div><dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">Date</dt><dd className="mt-1 text-[15px] text-white">{e.dateLabel}</dd></div>
                <div><dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">Venue</dt><dd className="mt-1 text-[15px] text-white">{e.venue}, {e.city}</dd></div>
              </dl>
              <RoleChips event={e} className="mt-5" />
              {e.details && <ul className="mt-3 space-y-1 text-[14px] text-white/65">{e.details.map((d) => <li key={d}>{d}</li>)}</ul>}
              {!ended && (
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  {dated && <a href={meetingHref(e)} className="btn-primary"><span>Book a meeting</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>}
                  <a href={e.registerUrl ?? e.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/75 hover:text-white">
                    {e.registerUrl ? 'Register for the event' : 'Event website'}<IconArrowUpRight className="h-4 w-4 text-brand-red" />
                  </a>
                </div>
              )}
            </div>
            {e.banner && (
              <img src={e.banner} alt={`${e.name}: ${e.dateLabel}, ${e.venue}`} className="w-full border border-white/10 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.8)]" />
            )}
          </div>
        </div>
      </section>

      {/* About + what's at Aptiva */}
      {(e.about || e.atAptiva) && (
        <section className="surface-ink-flat relative">
          <div className="container-xl section-y-sm grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {e.about && (
              <Reveal stagger=".ab-item">
                <span className="ab-item eyebrow-blue">About the event</span>
                {e.about.map((p) => <p key={p} className="ab-item mt-5 text-[16px] leading-relaxed text-white/75">{p}</p>)}
              </Reveal>
            )}
            {e.atAptiva && (
              <Reveal stagger=".aa-item">
                <span className="aa-item eyebrow-red">At the Aptiva pod</span>
                <div className="mt-6 grid gap-4">
                  {e.atAptiva.map((a) => (
                    <div key={a.title} className="aa-item border border-white/10 bg-white/[0.03] p-5">
                      <p className="font-display text-[17px] font-semibold text-white">{a.title}</p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-white/60">{a.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Video (hidden until its go-live date) */}
      {isVideoLive(e, now) && (
        <section className="surface-ink-raised relative">
          <div className="container-xl section-y-sm">
            <span className="eyebrow-red">Watch</span>
            <h2 className="mb-8 mt-5 font-display text-[clamp(24px,2.6vw,36px)] font-semibold text-white">Aptiva's {e.partner} practice</h2>
            <div className="max-w-4xl"><EventVideo event={e} title={`Aptiva ${e.partner} practice and capabilities`} /></div>
          </div>
        </section>
      )}

      {/* Agenda */}
      {(e.agenda || e.agendaNote) && (
        <section className="surface-ink-flat relative border-t border-white/10">
          <div className="container-xl section-y-sm">
            <span className="eyebrow-blue">Agenda</span>
            {e.agenda ? (
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {e.agenda.map((s) => (
                  <div key={s.time + s.title} className="grid gap-1 py-4 md:grid-cols-[140px_1fr]">
                    <span className="font-mono text-[12px] text-white/50">{s.time}</span>
                    <div><p className="text-[15px] text-white">{s.title}</p>{s.speaker && <p className="text-[13px] text-white/55">{s.speaker}</p>}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-[16px] text-white/70">
                {e.agendaNote}{' '}
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="text-[#ff7d8e] hover:text-white">See the event website →</a>
              </p>
            )}
          </div>
        </section>
      )}

      {/* Last year's numbers */}
      {e.stats && (
        <section className="surface-ink-raised relative">
          <div className="container-xl section-y-sm">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {e.stats.map((s) => (
                <div key={s.label} className="border-l border-white/15 pl-5">
                  <p className="font-display text-[clamp(32px,4vw,52px)] font-semibold text-white">{s.value}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
            {e.statsNote && <p className="mt-6 text-[12.5px] text-white/40">{e.statsNote}</p>}
          </div>
        </section>
      )}

      <CTASection
        eyebrow={ended ? 'Missed us?' : `Meet us at ${e.name}`}
        title={ended ? <>Let's continue <span className="text-gradient-brand">the conversation.</span></> : <>Book time with our <span className="text-gradient-brand">specialists.</span></>}
        body="Tell us what you're working on and we'll line up the right people for a focused session."
        primary={{ label: ended || !dated ? 'Get in touch' : 'Book a meeting', href: ended || !dated ? '#/contact' : meetingHref(e) }}
        secondary={{ label: 'All events', href: '#/events' }}
      />
    </div>
  )
}
