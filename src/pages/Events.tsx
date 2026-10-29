import PageHeader from '@/components/layout/PageHeader'
import Reveal from '@/components/motion/Reveal'
import CTASection from '@/components/kit/CTASection'
import { IconArrowRight } from '@/components/Icons'
import { EventVideo, RoleChips, useNow } from '@/components/events/EventPromos'
import { type AptivaEvent, daysLabel, daysUntil, eventHref, groupedEvents, meetingHref } from '@/data/events'

export default function Events() {
  const now = useNow()
  const { upcoming, tba, past } = groupedEvents(now)

  return (
    <div>
      <PageHeader
        label="Events"
        title="Meet Aptiva across the region."
        subtitle="Where our teams will be next: sponsoring, exhibiting and speaking alongside the platforms we build on. Book time with us at any of them."
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Events' }]}
      />

      <section className="surface-ink-flat relative">
        <div className="container-xl section-y-sm">
          <span className="eyebrow-red">Upcoming</span>
          <Reveal stagger=".ev-item" className="mt-8 grid gap-6">
            {upcoming.map((e, i) => <EventRow key={e.id} event={e} now={now} highlight={i === 0} />)}
            {tba.map((e) => <EventRow key={e.id} event={e} now={now} />)}
            {upcoming.length + tba.length === 0 && (
              <p className="ev-item text-white/55">New events are coming soon. Get in touch to meet our team in the meantime.</p>
            )}
          </Reveal>
        </div>
      </section>

      {past.length > 0 && (
        <section className="surface-ink-raised relative">
          <div className="container-xl section-y-sm">
            <span className="eyebrow-blue">Past events</span>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {past.map((e) => (
                <div key={e.id} className="border border-white/10 bg-white/[0.02] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">{e.dateLabel} · {e.city}</p>
                  <a href={eventHref(e)} className="mt-2 block font-display text-[20px] font-semibold text-white hover:underline">{e.name}</a>
                  <RoleChips event={e} className="mt-3" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Meet the team"
        title={<>Can't make it? <span className="text-gradient-brand">Let's meet anyway.</span></>}
        body="Tell us what you're working on and we'll set up a session with the right specialists."
        primary={{ label: 'Get in touch', href: '#/contact' }}
        secondary={{ label: 'Our partners', href: '#/partners' }}
      />
    </div>
  )
}

function EventRow({ event: e, now, highlight }: { event: AptivaEvent; now: number; highlight?: boolean }) {
  const dated = !!e.start
  const live = dated && new Date(e.start!).getTime() <= now
  const days = dated ? daysUntil(e, now) : null

  return (
    <article id={e.id} className={`ev-item scroll-mt-32 border bg-white/[0.03] ${highlight ? 'border-brand-blue/50' : 'border-white/10'}`}>
      <div className="flex flex-col md:flex-row">
        <div className={`flex shrink-0 flex-row items-center gap-3 px-6 py-5 md:w-[200px] md:flex-col md:items-start md:justify-center md:gap-1 ${highlight ? 'bg-grad-blue' : 'bg-white/[0.04]'}`}>
          <span className="font-display text-[20px] font-semibold leading-tight text-white">{e.dateLabel}</span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/75">
            {live ? 'Happening now' : days !== null ? daysLabel(days) : 'Details soon'}
          </span>
        </div>
        <div className="flex-1 p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">{e.partner} · {e.city}</p>
          <h2 className="mt-2 font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight text-white"><a href={eventHref(e)} className="hover:underline">{e.name}</a></h2>
          <p className="mt-1.5 text-[14px] text-white/55">{e.venue}</p>
          <RoleChips event={e} className="mt-4" />
          {e.details && (
            <ul className="mt-4 space-y-1 text-[14px] text-white/70">
              {e.details.map((d) => <li key={d}>{d}</li>)}
            </ul>
          )}
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/70">{e.summary}</p>

          {e.video && (
            <div className="mt-6 max-w-3xl">
              <EventVideo event={e} title={`Aptiva at ${e.name}`} />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-5">
            {dated && <a href={meetingHref(e)} className="btn-primary"><span>Book a meeting</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>}
            <a href={eventHref(e)} className="inline-flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/70 hover:text-white">
              Event details<IconArrowRight className="h-4 w-4 text-brand-red" />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
