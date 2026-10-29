import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IconArrowRight, IconArrowUpRight } from '../Icons'
import { type AptivaEvent, daysUntil, eventHref, isVideoLive, meetingHref, nextEvent } from '@/data/events'

/* ────────────── shared bits ────────────── */

/** Current time, refreshed every 30s so countdowns and auto-switching stay live. */
export function useNow() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(id)
  }, [])
  return now
}

// Dismissals are remembered per event, so the next event shows again.
function useDismissed(kind: string, id?: string) {
  const key = `aptiva-event-${kind}-dismissed:${id}`
  const [dismissed, setDismissed] = useState(false)
  useEffect(() => {
    try { setDismissed(!!id && localStorage.getItem(key) === '1') } catch { setDismissed(false) }
  }, [key, id])
  const dismiss = () => {
    setDismissed(true)
    try { localStorage.setItem(key, '1') } catch { /* private mode: dismiss for this visit only */ }
  }
  return [dismissed, dismiss] as const
}

const isLive = (e: AptivaEvent, now: number) => new Date(e.start!).getTime() <= now

export function RoleChips({ event, className = '' }: { event: AptivaEvent; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {event.roles.map((r) => (
        <span key={r} className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/80">
          {r}
        </span>
      ))}
    </div>
  )
}

function CloseButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} aria-label={label} className="shrink-0 p-1 text-white/45 transition-colors hover:text-white">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
    </button>
  )
}

/* ────────────── A · top strip (every page, scrolls away) ────────────── */

const STRIP_H = 36

export function EventStrip() {
  const now = useNow()
  const event = nextEvent(now)
  const [dismissed, dismiss] = useDismissed('strip', event?.id)
  const shown = !!event && !dismissed

  // The header is fixed; push it down by whatever part of the strip is still on screen.
  useEffect(() => {
    const root = document.documentElement
    const update = () => root.style.setProperty('--strip-offset', `${shown ? Math.max(0, STRIP_H - window.scrollY) : 0}px`)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => { window.removeEventListener('scroll', update); root.style.setProperty('--strip-offset', '0px') }
  }, [shown])

  if (!shown) return null
  return (
    <div className="relative z-[51] border-b border-white/10 bg-ink-800" style={{ height: STRIP_H }}>
      <div className="container-xl flex h-full items-center gap-3 text-[12px]">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
        </span>
        <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/50 sm:inline">{isLive(event, now) ? 'Happening now' : 'Next event'}</span>
        <a href={eventHref(event)} className="truncate font-semibold text-white hover:underline">{event.name}</a>
        <span className="hidden truncate text-white/50 md:inline">{event.dateLabel} · {event.city}</span>
        <span className="hidden rounded-full border border-white/15 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/70 lg:inline">{event.roles[0]}</span>
        <a href={meetingHref(event)} className="ml-auto shrink-0 font-semibold text-[#ff7d8e] hover:text-white">
          <span className="hidden sm:inline">Book a meeting</span><span className="sm:hidden">Meet us</span> →
        </a>
        <CloseButton onClick={dismiss} label="Hide event banner" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-grad-red opacity-70" aria-hidden />
    </div>
  )
}

/* ────────────── B · homepage card under the hero ────────────── */

export function NextEventCard() {
  const now = useNow()
  const event = nextEvent(now)
  if (!event) return null
  const live = isLive(event, now)
  const days = daysUntil(event, now)

  return (
    <section id="next-event-card" className="surface-ink-flat relative">
      <div className="container-xl py-10 md:py-14">
        <div className="flex flex-col overflow-hidden border border-white/12 bg-white/[0.03] md:flex-row">
          <div className="flex shrink-0 flex-row items-center justify-center gap-3 bg-grad-blue px-8 py-6 text-center md:w-[180px] md:flex-col md:gap-1">
            {live ? (
              <span className="font-display text-[22px] font-semibold leading-tight">Happening<br className="hidden md:block" /> now</span>
            ) : (
              <>
                {days > 0 && <span className="font-display text-[52px] font-semibold leading-none">{days}</span>}
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/85">{days === 0 ? 'Starting soon' : days === 1 ? 'day to go' : 'days to go'}</span>
              </>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-5 p-6 md:flex-row md:items-center md:p-8">
            <div className="flex-1">
              <span className="eyebrow-red">Meet Aptiva at</span>
              <h2 className="mt-3 font-display text-[clamp(22px,2.4vw,32px)] font-semibold leading-tight text-white">{event.name}</h2>
              <p className="mt-1.5 text-[14px] text-white/55">{event.dateLabel} · {event.venue}, {event.city}</p>
              <RoleChips event={event} className="mt-4" />
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-4">
              <a href={meetingHref(event)} className="btn-primary"><span>Book a meeting</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
              <a href={eventHref(event)} className="inline-flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/70 hover:text-white">
                Event details<IconArrowUpRight className="h-4 w-4 text-brand-red" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────── C · floating card (every page, after scrolling) ────────────── */

function Countdown({ event, now }: { event: AptivaEvent; now: number }) {
  const ms = Math.max(0, new Date(event.start!).getTime() - now)
  const parts = [
    [Math.floor(ms / 86_400_000), 'Days'],
    [Math.floor(ms / 3_600_000) % 24, 'Hrs'],
    [Math.floor(ms / 60_000) % 60, 'Min'],
  ] as const
  return (
    <div className="flex gap-1.5">
      {parts.map(([n, l]) => (
        <span key={l} className="min-w-[38px] rounded bg-white/[0.07] px-1.5 py-1 text-center">
          <span className="block font-mono text-[14px] font-semibold text-white">{String(n).padStart(2, '0')}</span>
          <span className="block font-mono text-[8.5px] uppercase tracking-[0.12em] text-white/45">{l}</span>
        </span>
      ))}
    </div>
  )
}

export function EventFloat() {
  const now = useNow()
  const event = nextEvent(now)
  const { pathname } = useLocation()
  const [dismissed, dismiss] = useDismissed('float', event?.id)
  const [scrolledEnough, setScrolledEnough] = useState(false)

  useEffect(() => {
    const check = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const card = document.getElementById('next-event-card')
      // Halfway down the page, and never while the homepage card is still on screen.
      setScrolledEnough(max > 0 && window.scrollY / max >= 0.5 && (!card || card.getBoundingClientRect().bottom < 0))
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [pathname])

  if (!event || dismissed || pathname === '/events' || pathname === `/events/${event.id}`) return null
  const live = isLive(event, now)

  return (
    <aside
      aria-label="Upcoming event"
      className={`fixed bottom-[88px] right-4 z-40 md:right-6 w-[min(300px,calc(100vw-32px))] overflow-hidden rounded-xl border border-white/15 bg-ink-700 shadow-[0_18px_48px_-12px_rgba(0,0,0,0.7)] transition-all duration-500 ${scrolledEnough ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
    >
      <div className="flex items-center justify-between bg-grad-blue py-1.5 pl-4 pr-2">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">{live ? 'Happening now' : 'Meet Aptiva at'}</span>
        <CloseButton onClick={dismiss} label="Hide event card" />
      </div>
      <div className="p-4">
        <p className="font-display text-[16px] font-semibold leading-snug text-white">{event.name}</p>
        <p className="mb-3 mt-0.5 text-[12px] text-white/55">{event.dateLabel} · {event.city}</p>
        {!live && <Countdown event={event} now={now} />}
        <RoleChips event={event} className="mt-3" />
        <div className="mt-4 flex items-center gap-3">
          <a href={meetingHref(event)} className="btn-primary !px-4 !py-2.5 text-[11px]"><span>Book a meeting</span></a>
          <a href={eventHref(event)} className="text-[11.5px] font-semibold text-white/65 hover:text-white">Details →</a>
        </div>
      </div>
    </aside>
  )
}

/* ────────────── video (hidden until its go-live date) ────────────── */

export function EventVideo({ event, title }: { event: AptivaEvent; title: string }) {
  const now = useNow()
  if (!isVideoLive(event, now)) return null
  return (
    <div className="relative aspect-video w-full overflow-hidden border border-white/12 bg-black">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${event.video!.youtubeId}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  )
}
