/**
 * Events Aptiva takes part in. To add or change one, edit this list only:
 * the top strip, homepage card, floating card and /events page all read it.
 *
 * Times are Dubai/Riyadh local (+04:00 / +03:00). An event is "upcoming"
 * until its `end` passes, then it moves to Past events automatically.
 */

export type EventRole = 'Sponsor' | 'Booth' | 'Speaking' | 'Attending'

export type AptivaEvent = {
  id: string
  name: string
  partner: string
  /** null = date not confirmed yet; listed as "Date TBA", never promoted as "next". */
  start: string | null
  end: string | null
  dateLabel: string
  venue: string
  city: string
  roles: EventRole[]
  /** e.g. booth number or session title, once known */
  details?: string[]
  summary: string
  url: string
  video?: { youtubeId: string; liveFrom: string }
  /* Optional detail-page content (src/pages/EventDetail.tsx); the page skips any that are missing. */
  tagline?: string
  banner?: string
  registerUrl?: string
  about?: string[]
  /** What visitors get from Aptiva at this event */
  atAptiva?: { title: string; desc: string }[]
  stats?: { value: string; label: string }[]
  statsNote?: string
  agenda?: { time: string; title: string; speaker?: string }[]
  agendaNote?: string
}

export const events: AptivaEvent[] = [
  {
    id: 'uipath-fusion-dubai-2026',
    name: 'UiPath FUSION Dubai',
    partner: 'UiPath',
    // Date per UiPath's partner pack (27 Oct): 2 Nov, not the 3 Nov on their older public page.
    start: '2026-11-02T09:00:00+04:00',
    end: '2026-11-02T23:59:59+04:00',
    dateLabel: '2 Nov 2026',
    venue: 'Museum of the Future',
    city: 'Dubai',
    roles: ['Sponsor', 'Booth', 'Speaking'],
    details: ['Partner pod in the FUSION foyer, next to the Agentic Lab'],
    summary:
      'Agentic automation in production: how Aptiva designs, builds and runs UiPath agents and RPA for banks, government and telecom across the region.',
    url: 'https://www.uipath.com/events/fusion/global/dubai',
    registerUrl: 'https://www.uipath.com/events/fusion/global/dubai#register-now',
    banner: '/events/fusion-dubai-2026.jpg',
    tagline: 'Accelerate your journey from AI investment to enterprise impact.',
    about: [
      "FUSION is UiPath's flagship event of the year, back in Dubai for its second edition. It brings together customers, partners and media from the region's leading enterprises: the executives, architects and transformation leaders shaping automation strategy and investment.",
      'The focus is turning AI and automation into measurable business value: how agents, robots, people and systems are orchestrated together, with governance and security built in from the start.',
      'Aptiva is a FUSION Dubai sponsor. Find us at our partner pod in the foyer to see agentic automation running in production for regulated industries.',
    ],
    atAptiva: [
      { title: 'Live agentic automation demos', desc: 'UiPath agents and robots working together on real banking, government and telecom processes.' },
      { title: 'From pilot to production', desc: 'How we take automation from a first use case to an enterprise-wide programme, with governance built in.' },
      { title: 'Book time with our specialists', desc: 'A focused conversation with our UiPath architects about your own processes and priorities.' },
    ],
    stats: [
      { value: '1,000+', label: 'Registrations' },
      { value: '450', label: 'Attendees' },
      { value: '70%', label: 'VP, director & above' },
    ],
    statsNote: 'FUSION Dubai 2025, as reported by UiPath.',
    agendaNote: 'UiPath will publish the full agenda soon.',
    // Set youtubeId once the video is uploaded; it shows from liveFrom onwards.
    video: { youtubeId: '', liveFrom: '2026-11-02T00:00:00+04:00' },
  },
  {
    id: 'opentext-summit-me-2026',
    name: 'OpenText Summit Middle East',
    partner: 'OpenText',
    start: '2026-11-24T09:00:00+04:00',
    end: '2026-11-24T23:59:59+04:00',
    dateLabel: '24 Nov 2026',
    venue: 'Atlantis The Palm',
    city: 'Dubai',
    roles: ['Sponsor', 'Booth', 'Speaking'],
    summary:
      'Secure information management for the AI era: content intelligence, records and archival on OpenText, delivered by Aptiva for regulated enterprises.',
    url: 'https://events.opentext.com/en-ae-ot-summit-middle-east-2026/home',
  },
  {
    id: 'gitex-global-2026',
    name: 'GITEX Global',
    partner: 'GITEX',
    start: '2026-12-07T09:00:00+04:00',
    end: '2026-12-11T23:59:59+04:00',
    dateLabel: '7–11 Dec 2026',
    venue: 'Summit 7 Dec at Dubai World Trade Centre · Expo 8–11 Dec at Expo City Dubai',
    city: 'Dubai',
    roles: ['Sponsor', 'Booth', 'Speaking'],
    summary:
      "The region's biggest tech week. Meet Aptiva for GenAI, agentic AI, cloud, cybersecurity and our 11 proprietary platforms.",
    url: 'https://www.gitex.com/',
  },
  {
    id: 'leap-2027',
    name: 'LEAP',
    partner: 'LEAP',
    start: null,
    end: null,
    dateLabel: 'Date TBA · early 2027',
    venue: 'Riyadh',
    city: 'Riyadh',
    roles: ['Attending'],
    summary: 'Aptiva at LEAP in Riyadh. Details coming soon.',
    url: 'https://onegiantleap.com/',
  },
]

const t = (iso: string) => new Date(iso).getTime()

/** Dated events that haven't ended yet, soonest first. */
export function upcomingEvents(now = Date.now()) {
  return events
    .filter((e) => e.end && t(e.end) >= now)
    .sort((a, b) => t(a.start!) - t(b.start!))
}

export function nextEvent(now = Date.now()): AptivaEvent | undefined {
  return upcomingEvents(now)[0]
}

/** Upcoming first, then date-TBA, then past (most recent first). */
export function groupedEvents(now = Date.now()) {
  const upcoming = upcomingEvents(now)
  const tba = events.filter((e) => !e.end)
  const past = events
    .filter((e) => e.end && t(e.end) < now)
    .sort((a, b) => t(b.start!) - t(a.start!))
  return { upcoming, tba, past }
}

export function isVideoLive(e: AptivaEvent, now = Date.now()) {
  return !!e.video?.youtubeId && t(e.video.liveFrom) <= now
}

export function daysUntil(e: AptivaEvent, now = Date.now()) {
  return Math.max(0, Math.floor((t(e.start!) - now) / 86_400_000))
}

export const daysLabel = (days: number) => (days === 0 ? 'Starting soon' : `${days} ${days === 1 ? 'day' : 'days'} to go`)

export const eventHref = (e: AptivaEvent) => `#/events/${e.id}`

export const meetingHref = (e: AptivaEvent) => `#/contact?event=${e.id}`
