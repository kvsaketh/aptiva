import { useEffect } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import StatBand from '../components/kit/StatBand'
import CTASection from '../components/kit/CTASection'
import {
  IconBrain, IconShield, IconGlobe, IconRocket, IconUsers, IconAward,
  IconArrowRight, IconArrowUpRight,
} from '../components/Icons'

/* ────────────── DATA ────────────── */
/* Real leadership — names, titles and LinkedIn profiles per aptivatechnologies.com. */

const LINKEDIN_PATH = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

function initials(name: string) {
  const parts = name.replace(/\(.*?\)/g, '').trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

const team = [
  {
    name: 'Swamy VLN Boyapati',
    role: 'Managing Director & CEO',
    region: 'Global Direction',
    glow: 'red' as const,
    linkedin: 'https://www.linkedin.com/in/swamyvlnboyapati/',
    bio: 'Leads Aptiva’s global operations and growth strategy, with a focus on digital transformation, automation and enterprise innovation — turning strategy into execution and building high-performance cultures.',
  },
  {
    name: 'George Avvaru',
    role: 'Vice President, Delivery & Operations',
    region: 'Execution Excellence',
    glow: 'blue' as const,
    linkedin: 'https://www.linkedin.com/in/georgeavvaru/',
    bio: 'Owns global delivery and operations with a relentless focus on quality, timeliness and client satisfaction — building frameworks that scale across geographies and technology domains.',
  },
  {
    name: 'Bader Maktabi',
    role: 'Director, Operations',
    region: 'Global Operations',
    glow: 'red' as const,
    linkedin: 'https://www.linkedin.com/in/bader-maktabi-bb49914b/',
    bio: 'Leads operations with deep cross-market expertise, building lasting client relationships and driving expansion across the world’s most demanding, regulated sectors.',
  },
]

const philosophy = [
  { icon: IconRocket, title: 'Operators, not figureheads', desc: 'Our leaders have delivered in the trenches of banking, government and telecom. They lead from the front — close to the work, close to the client, accountable for the outcome.' },
  { icon: IconBrain, title: 'AI-first by conviction', desc: 'Leadership backs the early, decisive bets on Agentic AI and intelligent automation — and the engineering discipline to ship them safely into regulated production.' },
  { icon: IconShield, title: 'Earned trust over hype', desc: 'In our markets, credibility compounds. We make commitments we can keep, then keep them — through audits, uptime and multi-year partnerships.' },
  { icon: IconUsers, title: 'Build leaders, not dependence', desc: 'We invest in high-performance cultures and the next generation of regional technology leaders — capability that stays with our clients and our teams.' },
]

const governance = [
  { title: 'Executive Leadership', desc: 'CEO and functional VPs own strategy, growth and the global P&L — setting direction and standing behind delivery.' },
  { title: 'Global Operations', desc: 'Country and regional leaders carry on-the-ground accountability across global markets, close to clients and regulators.' },
  { title: 'Delivery & Quality Governance', desc: 'Delivery, quality-engineering and managed-services leadership enforce the frameworks that keep mission-critical systems audited and dependable.' },
  { title: 'Advisory & Partnerships', desc: 'An advisory network and 45 strategic OEM partnerships inform technology direction, independence and long-term client value.' },
]

/* ────────────── PAGE ────────────── */

export default function Leadership() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <div>
      <PageHeader
        label="Leadership"
        title="The team behind the growth"
        subtitle="Experienced operators driving innovation, growth and client success across global markets — built to scale, wired to execute."
        bgImage="/hero-abstract.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'About', href: '#/about' }, { label: 'Leadership' }]}
        stats={[
          { value: '7', label: 'Global locations' },
          { value: '50+', label: 'Enterprise relationships' },
          { value: '45', label: 'Strategic partnerships' },
          { value: '2017', label: 'Founded' },
        ]}
      />

      <ExecutiveTeam />
      <Philosophy />
      <Governance />
      <Proof />

      <CTASection
        eyebrow="Join us"
        title={<>Build the <span className="text-gradient-brand">intelligent enterprise</span> with our team.</>}
        body="Whether you’re an enterprise leader looking for a partner or a builder looking for your next challenge — we’d like to hear from you."
        primary={{ label: 'Talk to leadership', href: '#/contact' }}
        secondary={{ label: 'Explore careers', href: '#/careers' }}
      />
    </div>
  )
}

/* ────────────── EXECUTIVE TEAM (dark) ────────────── */

function ExecutiveTeam() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <KineticBackdrop variant="mesh" color="red" opacity={0.35} />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Executive team"
          title={<>Leaders driving <span className="text-gradient-brand">innovation and growth.</span></>}
          intro="A senior bench spanning operations, delivery, AI, cloud and data — each accountable for a part of the full-stack promise we make to clients."
        />

        <Reveal stagger=".lead-card" className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <TiltCard key={m.name} glow={m.glow} className="lead-card card-ink flex flex-col p-8">
              <div className="mb-6 flex items-center justify-between">
                <span className={`flex h-14 w-14 items-center justify-center font-display text-lg font-semibold text-white ${m.glow === 'blue' ? 'bg-grad-blue' : 'bg-grad-red'}`}>
                  {initials(m.name)}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">{m.region}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white">{m.name}</h3>
              <p className={`mt-1.5 text-[13.5px] font-semibold ${m.glow === 'blue' ? 'text-brand-blue' : 'text-brand-red'}`}>{m.role}</p>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-white/55">{m.bio}</p>
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 border border-white/12 bg-white/[0.03] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white/75 transition-all hover:border-transparent hover:bg-grad-brand hover:text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d={LINKEDIN_PATH} /></svg>
                Connect on LinkedIn
              </a>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── LEADERSHIP PHILOSOPHY (light) ────────────── */

function Philosophy() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="How we lead"
          title={<>A leadership philosophy built on <span className="text-gradient-brand">trust and execution.</span></>}
          intro="The beliefs that shape how our leaders show up — for clients, for teams and for the markets we serve."
        />
        <Reveal stagger=".phil-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {philosophy.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="phil-card card-paper group flex gap-5 p-8">
                <span className="icon-tile-light h-12 w-12 shrink-0"><Icon className="h-5 w-5 text-brand-red transition-colors group-hover:text-white" /></span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-red">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-900/60">{p.desc}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── GOVERNANCE / ADVISORY (dark) ────────────── */

function Governance() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <Aurora className="opacity-60" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Governance & advisory"
            title={<>Structured for <span className="text-gradient-brand">accountability.</span></>}
            intro="A clear leadership structure and an advisory network keep strategy, delivery and independence aligned — so clients always know who owns the outcome."
          />
          <Reveal stagger=".gov-row" className="border-t border-white/10">
            {governance.map((g, i) => (
              <div key={g.title} className="gov-row group flex items-start gap-6 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.025]">
                <span className="font-display text-3xl font-semibold text-white/15 transition-colors group-hover:text-white/35">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{g.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/55">{g.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ────────────── PROOF / STATS (dark) ────────────── */

function Proof() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Leadership in numbers"
            title={<>Scale that the team has <span className="text-gradient-brand">built and earned.</span></>}
            className="md:max-w-2xl"
          />
          <Reveal>
            <a href="#/about" className="btn-ghost group shrink-0">Read our story<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <StatBand
            stats={[
              { to: 50, suffix: '+', label: 'Enterprise relationships' },
              { to: 45, suffix: '', label: 'Strategic partnerships' },
              { to: 11, suffix: '', label: 'Proprietary solutions shipped' },
              { to: 7, suffix: '', label: 'Global locations' },
            ]}
          />
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
            <IconAward className="h-4 w-4 text-brand-red" /> Awarded delivery across regulated industries
          </span>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
            <IconGlobe className="h-4 w-4 text-brand-blue" /> Banking · Government · Telecom · Energy
          </span>
          <a href="#/contact" className="ml-auto inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white">
            Work with us<IconArrowRight className="h-4 w-4 text-brand-red" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
