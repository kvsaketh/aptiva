import { useParams } from 'react-router-dom'
import CTASection from '@/components/kit/CTASection'
import { Aurora, GridBackdrop, Grain } from '@/components/motion/Atmosphere'
import { IconArrowRight } from '@/components/Icons'
import { trpc } from '@/providers/trpc'
import { eventHref, events } from '@/data/events'
import PageLoader from '@/components/PageLoader'
import NotFound from './NotFound'

export default function ArticleDetail() {
  const { slug = '' } = useParams()
  // The server returns NOT_FOUND until the article's publish time, so early links show a 404.
  const { data: a, isLoading, error } = trpc.content.article.useQuery({ slug }, { retry: false })
  if (isLoading) return <PageLoader />
  if (error || !a) return <NotFound />

  const event = events.find((e) => e.id === a.eventId)
  const date = new Date(a.publishAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div>
      <section className="surface-ink-raised grain relative overflow-hidden pb-14 pt-36 md:pt-40">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.16]" style={{ backgroundImage: `url(${a.cover})` }} aria-hidden />
        <Aurora />
        <GridBackdrop />
        <Grain />
        <div className="container-xl relative z-10 max-w-4xl">
          <nav className="mb-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            <a href="#/" className="hover:text-white">Home</a><span className="text-brand-red">/</span>
            <a href="#/insights" className="hover:text-white">Insights</a>
          </nav>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
            <span className="bg-brand-red/15 px-2.5 py-1 text-brand-red">{a.category}</span>
            <span>{date}</span><span className="text-white/30">·</span><span>{a.readTime}</span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white text-balance">{a.title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/70">{a.excerpt}</p>
          <p className="mt-6 text-[13px] text-white/50">{a.author}</p>
        </div>
      </section>

      <article className="surface-ink-flat relative">
        <div className="container-xl section-y-sm max-w-3xl">
          {a.body.map((b, i) =>
            'h' in b ? <h2 key={i} className="mb-4 mt-12 font-display text-[clamp(22px,2.2vw,28px)] font-semibold text-white first:mt-0">{b.h}</h2>
            : 'p' in b ? <p key={i} className="mb-5 text-[17px] leading-[1.75] text-white/75">{b.p}</p>
            : 'ul' in b ? <ul key={i} className="mb-6 space-y-2.5 pl-5 text-[16.5px] leading-relaxed text-white/75 marker:text-brand-red [list-style:disc]">{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>
            : <blockquote key={i} className="my-10 border-l-2 border-brand-red pl-6 font-display text-[clamp(20px,2vw,26px)] leading-snug text-white">{b.quote}</blockquote>
          )}

          <div className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {a.tags.map((t) => <span key={t} className="border border-white/12 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/55">{t}</span>)}
          </div>

          {event && (
            <a href={eventHref(event)} className="group mt-10 flex items-center justify-between gap-4 border border-brand-blue/40 bg-white/[0.03] p-6 hover:bg-white/[0.06]">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#7fb0ff]">Related event</p>
                <p className="mt-1 font-display text-[18px] font-semibold text-white">{event.name}</p>
                <p className="text-[13px] text-white/55">{event.dateLabel} · {event.venue}, {event.city}</p>
              </div>
              <IconArrowRight className="h-5 w-5 shrink-0 text-brand-red transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </article>

      <CTASection
        eyebrow="Talk to our team"
        title={<>From perspective to <span className="text-gradient-brand">production.</span></>}
        body="When you're ready to turn an idea into a delivered outcome, our architects are ready to help."
        primary={{ label: 'Talk to an expert', href: '#/contact' }}
        secondary={{ label: 'More insights', href: '#/insights' }}
      />
    </div>
  )
}
