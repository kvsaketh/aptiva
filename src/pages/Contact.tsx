import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import Marquee from '../components/kit/Marquee'
import CTASection from '../components/kit/CTASection'
import {
  IconArrowRight, IconArrowUpRight, IconHeadset, IconUsers, IconBrain,
  IconShield, IconRocket, IconGlobe, IconBuilding, IconCheckCircle,
  IconZap, IconLayers, IconSparkle,
} from '../components/Icons'

/* ────────────── DATA ────────────── */

const channels = [
  { eyebrow: 'Sales & Partnerships', value: 'sales@aptivacorp.ae', href: 'mailto:sales@aptivacorp.ae', note: 'New engagements, RFPs and proof-of-value', icon: IconRocket },
  { eyebrow: 'General Inquiries', value: 'info@aptivacorp.ae', href: 'mailto:info@aptivacorp.ae', note: 'Company, press and everything else', icon: IconHeadset },
  { eyebrow: 'Talk to a person', value: '+971 4 2201106', href: 'tel:+97142201106', note: 'Sun–Thu · 09:00–18:00 GST', icon: IconUsers },
  { eyebrow: 'Direct line', value: '+971 4 2201181', href: 'tel:+97142201181', note: 'Reception & switchboard', icon: IconBuilding },
]

const offices = [
  {
    city: 'Ras Al-Khaimah', tag: 'Global HQ', img: '/about-office.jpg',
    lines: ['Aptiva Technologies FZE', 'A4-332, Al Hamra Ind. Zone FZ', 'P.O. Box 82264, Ras Al-Khaimah, UAE'],
  },
  {
    city: 'Dubai', tag: 'Regional Office', img: '/about-global.jpg',
    lines: ['Suite 504, Platinum Business Centre', 'Al Nahda 2', 'P.O. Box 82264, Dubai, UAE'],
  },
  {
    city: 'Abu Dhabi', tag: 'UAE', img: '/industry-government.jpg',
    lines: ['Dar Al Salaam Building, Office 1016', '10th Floor, Liwa Corniche Street', 'Abu Dhabi, UAE'],
  },
  {
    city: 'Riyadh', tag: 'Saudi Arabia', img: '/industry-energy.jpg',
    lines: ['Le Cygne Commercial Center', 'Kaab Bin Malik Street, Al Olaya', 'Riyadh 12611, KSA'],
  },
]

const moreOffices = [
  { city: 'Nairobi', country: 'Kenya', address: 'Purshottam Place, Westlands, P.O. Box 46728, Nairobi' },
  { city: 'Muscat', country: 'Oman', address: '#0400Z107, Building 4, Knowledge Oasis Muscat, P.O. Box 1367' },
]

const interests = [
  { value: 'ai-automation', label: 'GenAI, Agentic AI & Automation' },
  { value: 'content-intelligence', label: 'Content & Document Intelligence' },
  { value: 'cloud-security', label: 'Cloud, Infrastructure & Cybersecurity' },
  { value: 'data-analytics', label: 'Data & Analytics' },
  { value: 'customer-experience', label: 'Customer Experience (CX)' },
  { value: 'solutions', label: 'Proprietary Platforms & Solutions' },
  { value: 'managed-services', label: 'Managed Services & SRE' },
  { value: 'consulting', label: 'Business Value Consulting' },
  { value: 'partnership', label: 'Strategic Partnership' },
  { value: 'careers', label: 'Careers & Talent' },
]

const reasons = [
  { icon: IconBrain, title: 'GenAI & agentic-first', desc: 'Production LLMs, agentic workflows and intelligent automation — engineered for the region, not retro-fitted from a demo.' },
  { icon: IconShield, title: 'Regulated-industry rigor', desc: 'Two decades delivering for banks, governments, telecoms and energy where compliance and uptime are non-negotiable.' },
  { icon: IconGlobe, title: 'On-the-ground presence', desc: 'Local teams across the UAE, KSA, Oman and Kenya — same time zone, same language, real accountability.' },
  { icon: IconLayers, title: 'One accountable partner', desc: 'Content, cloud, security, data and AI under a single relationship — no finger-pointing across vendors.' },
]

const expectations = [
  { no: '01', title: 'You reach out', desc: 'Send the brief below, or email us directly. Share as much or as little as you have — a one-liner is enough to start.' },
  { no: '02', title: 'We reply within one business day', desc: 'A senior solutions lead — not a call-centre — reviews your note and responds with relevant context and next steps.' },
  { no: '03', title: 'A focused discovery call', desc: 'A 30-minute working session to understand objectives, constraints, compliance posture and the outcome that matters.' },
  { no: '04', title: 'A proof-of-value plan', desc: 'We scope a small, de-risked first engagement that proves value fast — then a clear path to scale across the enterprise.' },
]

const marqueeWords = [
  'AGENTIC AI', 'GENAI', 'INTELLIGENT AUTOMATION', 'CLOUD & SECURITY', 'DATA & ANALYTICS',
  'DIGITAL TRANSFORMATION', 'MANAGED SERVICES', 'CONTENT INTELLIGENCE',
]

/* ────────────── PAGE ────────────── */

export default function Contact() {
  return (
    <div>
      <PageHeader
        label="CONTACT"
        title="Let's engineer what's next"
        subtitle="Start with one conversation. Talk to a team that has delivered AI, cloud and digital transformation for the institutions that move the Middle East and Africa forward."
        bgImage="/tech-abstract-1.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Contact' }]}
        stats={[
          { value: '< 1 day', label: 'Response time' },
          { value: '6', label: 'Regional offices' },
          { value: '16', label: 'Countries served' },
          { value: '24×7', label: 'Managed support' },
        ]}
      />

      <PrimaryContact />
      <ExpectBand />
      <Offices />
      <Reasons />
      <CTASection
        eyebrow="Prefer to start over email?"
        title={<>Tell us about your <span className="text-gradient-brand">transformation goal.</span></>}
        body="Whether you're scoping an agentic-AI pilot or planning an enterprise-wide modernization, our team will point you to the fastest path to value."
        primary={{ label: 'sales@aptivacorp.ae', href: 'mailto:sales@aptivacorp.ae' }}
        secondary={{ label: 'Explore careers', href: '#/careers' }}
      />
    </div>
  )
}

/* ────────────── PRIMARY: FORM + CHANNELS ────────────── */

function PrimaryContact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const field = 'w-full border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[14px] text-white placeholder:text-white/35 outline-none transition-all duration-200 focus:border-brand-red/70 focus:bg-white/[0.05] focus:ring-1 focus:ring-brand-red/30'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <KineticBackdrop variant="mesh" color="red" opacity={0.18} className="left-1/2 w-[150%] -translate-x-1/2" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Form */}
          <Reveal stagger=".cf-item">
            <span className="cf-item eyebrow-red">Start a conversation</span>
            <h2 className="cf-item display-3 mt-5 text-white text-balance">
              Tell us where you want to <span className="text-gradient-brand">get to.</span>
            </h2>
            <p className="cf-item lead mt-5 max-w-xl text-white/60">
              Share a few details and the right specialist will get back to you within one business day — no call-centre, no run-around.
            </p>

            <div className="cf-item mt-10">
              {submitted ? (
                <div className="card-ink flex flex-col items-start gap-4 p-9">
                  <span className="icon-tile h-12 w-12"><IconCheckCircle className="h-6 w-6 text-white" /></span>
                  <h3 className="font-display text-2xl font-semibold text-white">Message received.</h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-white/60">
                    Thank you for reaching out. A senior member of our team will respond within one business day. For anything urgent, email{' '}
                    <a href="mailto:sales@aptivacorp.ae" className="text-white underline decoration-brand-red/50 underline-offset-4 hover:text-brand-red">sales@aptivacorp.ae</a>.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', interest: '', message: '' }) }}
                    className="btn-ghost mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">Full name *</span>
                      <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" className={field} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">Company</span>
                      <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Corp" className={field} />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">Work email *</span>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" className={field} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">Phone</span>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+971 ..." className={field} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">I'm interested in</span>
                    <select required value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className={`${field} ${form.interest ? 'text-white' : '!text-white/40'}`}>
                      <option value="" disabled className="bg-ink-900 text-white">Select a focus area…</option>
                      {interests.map((i) => (
                        <option key={i.value} value={i.value} className="bg-ink-900 text-white">{i.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">How can we help? *</span>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your objective, timeline and any constraints…" className={`${field} resize-none`} />
                  </label>
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button type="submit" className="btn-primary"><span>Send message</span><IconArrowRight className="relative z-10 h-4 w-4" /></button>
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                      <IconShield className="h-3.5 w-3.5 text-brand-red" /> Your details stay confidential
                    </span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Channels */}
          <div className="space-y-4">
            <Reveal stagger=".ch-card" className="space-y-4">
              <p className="ch-card font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">Reach us directly</p>
              {channels.map((ch) => {
                const Icon = ch.icon
                return (
                  <TiltCard key={ch.eyebrow} as="a" href={ch.href} glow="red" max={5} className="ch-card card-ink group flex items-start gap-4 p-6">
                    <span className="icon-tile mt-0.5 h-11 w-11 shrink-0"><Icon className="h-5 w-5 text-white/85" /></span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-brand-red">{ch.eyebrow}</span>
                      <span className="mt-1.5 block break-words font-display text-lg font-semibold text-white transition-colors group-hover:text-brand-red">{ch.value}</span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-white/50">{ch.note}</span>
                    </span>
                    <IconArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-red" />
                  </TiltCard>
                )
              })}
            </Reveal>

            <Reveal className="card-ink relative overflow-hidden p-7">
              <KineticBackdrop variant="rings" color="blue" opacity={0.5} />
              <div className="relative z-10">
                <span className="eyebrow-blue">Follow Aptiva</span>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">
                  Insights on agentic AI, regulated-industry transformation and engineering culture across the region.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  {[
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aptivacorp/', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                    { label: 'X', href: 'https://x.com/AptivaCorp', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="group flex h-10 w-10 items-center justify-center border border-white/12 bg-white/[0.03] transition-all hover:border-transparent hover:bg-grad-brand">
                      <svg className="h-4 w-4 text-white/70 transition-colors group-hover:text-white" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                    </a>
                  ))}
                  <a href="https://aptivatechnologies.com" target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/45 transition-colors hover:text-white">
                    aptivatechnologies.com <IconArrowUpRight className="h-3.5 w-3.5 text-brand-blue" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* capability marquee */}
      <div className="border-t border-white/10 py-5">
        <Marquee speed={42} items={marqueeWords.map((w) => (
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/30">{w}</span>
        ))} />
      </div>
    </section>
  )
}

/* ────────────── WHAT TO EXPECT ────────────── */

function ExpectBand() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="What happens next"
          counter="01 / 03"
          title={<>From first message to <span className="text-gradient-brand">measurable value.</span></>}
          intro="No black box. Here's exactly what to expect after you reach out — a senior-led, de-risked path from conversation to outcome."
        />
        <Reveal stagger=".exp-step" className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-ink-900/10 bg-ink-900/[0.04] md:grid-cols-2 lg:grid-cols-4">
          {expectations.map((s) => (
            <div key={s.no} className="exp-step group bg-paper p-8 transition-colors duration-500 hover:bg-white">
              <span className="font-display text-5xl font-semibold text-ink-900/15 transition-colors duration-500 group-hover:text-brand-red/45">{s.no}</span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-900/55">{s.desc}</p>
              <div className="mt-6 h-px w-8 bg-grad-red transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── OFFICES ────────────── */

function Offices() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <Aurora className="opacity-60" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Find us in the region"
          counter="02 / 03"
          title={<>Local teams, <span className="text-gradient-brand">on the ground.</span></>}
          intro="Six offices across the Middle East and Africa mean same-time-zone collaboration, regional compliance fluency and people you can meet in person."
        />

        <Reveal stagger=".office-card" className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((o) => (
            <div key={o.city} className="office-card group relative flex min-h-[320px] flex-col justify-end overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${o.img})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/75 to-ink-900/25 transition-opacity duration-500 group-hover:via-ink-900/65" />
              <div className="absolute inset-0 bg-grad-brand opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30" />
              <div className="relative z-10 p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-red">{o.tag}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{o.city}</h3>
                <div className="mt-3 max-h-0 overflow-hidden text-[12.5px] leading-relaxed text-white/0 transition-all duration-500 group-hover:max-h-40 group-hover:text-white/70">
                  {o.lines.map((l) => <p key={l}>{l}</p>)}
                </div>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal stagger=".more-office" className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {moreOffices.map((o) => (
            <div key={o.city} className="more-office card-ink flex items-start gap-4 p-6">
              <span className="icon-tile mt-0.5 h-10 w-10 shrink-0"><IconGlobe className="h-5 w-5 text-white/85" /></span>
              <div>
                <div className="flex items-baseline gap-2">
                  <h4 className="font-display text-lg font-semibold text-white">{o.city}</h4>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{o.country}</span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-white/55">{o.address}</p>
              </div>
            </div>
          ))}
        </Reveal>

        {/* map-style panel */}
        <Reveal className="mt-5">
          <div className="relative flex min-h-[200px] items-center justify-between gap-6 overflow-hidden border border-white/10 bg-ink-900/60 p-8 md:p-10">
            <KineticBackdrop variant="flow" color="blue" opacity={0.35} className="left-1/2 w-[150%] -translate-x-1/2" />
            <div className="relative z-10">
              <span className="eyebrow-blue">Headquarters</span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">Al Hamra Industrial Zone, Ras Al-Khaimah</h3>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/55">
                Our home base in the UAE — engineering, delivery and managed-services teams operating across the region from a single accountable hub.
              </p>
              <a href="https://maps.google.com/?q=Al+Hamra+Industrial+Zone+Ras+Al+Khaimah" target="_blank" rel="noopener noreferrer" className="btn-ghost group mt-6 inline-flex">
                Open in Maps<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="relative z-10 hidden shrink-0 lg:block">
              <span className="flex h-24 w-24 items-center justify-center rounded-full border border-brand-blue/30 bg-brand-blue/[0.06]">
                <IconZap className="h-9 w-9 text-brand-blue" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── REASONS TO PARTNER ────────────── */

function Reasons() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Why partner with Aptiva"
          counter="03 / 03"
          title={<>A reason to start the <span className="text-gradient-brand">conversation.</span></>}
          intro="Beyond the brief — the things that make working with us different, from the first call to long-term operations."
        />
        <Reveal stagger=".reason-card" className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => {
            const Icon = r.icon
            return (
              <TiltCard key={r.title} glow="red" className="reason-card card-paper flex flex-col p-7">
                <span className="icon-tile-light mb-5 h-12 w-12"><Icon className="h-5 w-5 text-brand-red transition-colors group-hover:text-white" /></span>
                <h3 className="font-display text-lg font-semibold text-ink-900">{r.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-900/55">{r.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2"><IconSparkle className="h-3.5 w-3.5 text-brand-red" /><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-900/40">Aptiva difference</span></span>
              </TiltCard>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
