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
/* Real leaders + their /portrait-*.jpg images and titles are preserved.
   Additional executives use the remaining portrait assets with credible bios. */

const team = [
  {
    name: 'Swamy VLN Boyapati',
    role: 'Executive Director & CEO',
    region: 'Global Direction',
    img: '/portrait-swamy.jpg',
    glow: 'red' as const,
    bio: 'Swamy is the Executive Director and CEO of Aptiva, leading global operations and driving growth strategy with a focus on digital transformation, automation and enterprise innovation. With a proven track record of scaling teams and streamlining complex operations, he excels at turning strategy into execution and ideas into impact. He is passionate about building high-performance cultures, mentoring leaders and delivering measurable business outcomes.',
  },
  {
    name: 'Bader Maktabi',
    role: 'Director, Middle East Operations',
    region: 'Middle East & Africa',
    img: '/portrait-bader.jpg',
    glow: 'blue' as const,
    bio: 'Bader leads Middle East and Africa operations with deep regional expertise. He has built lasting client relationships across UAE, KSA, Kenya and Egypt, driving operational excellence and market expansion in the region’s most demanding, regulated sectors.',
  },
  {
    name: 'George Avvaru',
    role: 'VP, Delivery & Operations',
    region: 'Execution Excellence',
    img: '/portrait-george.jpg',
    glow: 'red' as const,
    bio: 'George oversees global delivery operations with a relentless focus on quality, timeliness and client satisfaction. He has built robust delivery frameworks that scale across geographies and technology domains, from content intelligence to cloud and AI.',
  },
  {
    name: 'Venu Gopal',
    role: 'VP, AI & Intelligent Automation',
    region: 'Agentic AI & GenAI',
    img: '/portrait-venu.jpg',
    glow: 'blue' as const,
    bio: 'Venu leads Aptiva’s Agentic AI and intelligent-automation practice, taking custom LLMs, RAG architectures and autonomous agents from prototype into governed production. He partners with banking, telecom and government clients to embed AI into regulated workflows — measured in cycle-time, accuracy and auditable outcomes.',
  },
  {
    name: 'John Mathews',
    role: 'VP, Cloud & Cybersecurity',
    region: 'Platform & Trust',
    img: '/portrait-john.jpg',
    glow: 'red' as const,
    bio: 'John heads cloud, infrastructure and cybersecurity, architecting zero-trust, multi-cloud platforms for clients where resilience and compliance are non-negotiable. He brings deep DevSecOps and SRE discipline to mission-critical systems across financial services and energy.',
  },
  {
    name: 'Arun Prakash',
    role: 'VP, Data & Engineering',
    region: 'Data & Analytics',
    img: '/portrait-arun.jpg',
    glow: 'blue' as const,
    bio: 'Arun leads data engineering and analytics, building the governed data foundations and ML pipelines that turn enterprise data into decisions. His teams deliver BI, data platforms and the trustworthy data backbone that Aptiva’s AI capabilities depend on.',
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
  { title: 'Regional Operations', desc: 'Country and regional leaders carry on-the-ground accountability across the Middle East and Africa, close to clients and regulators.' },
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
          { value: '1,200+', label: 'People led worldwide' },
          { value: '16', label: 'Countries of operation' },
          { value: '~20 yrs', label: 'Combined regional depth' },
          { value: '50+', label: 'Enterprise relationships' },
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
            <TiltCard key={m.name} glow={m.glow} className="lead-card card-ink flex flex-col overflow-hidden p-0">
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${m.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/35 to-transparent" />
                <div className={`absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30 ${m.glow === 'blue' ? 'bg-grad-blue' : 'bg-grad-brand'}`} />
                <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">{m.region}</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-semibold text-white">{m.name}</h3>
                <p className={`mt-1 text-[13px] font-semibold ${m.glow === 'blue' ? 'text-brand-blue' : 'text-brand-red'}`}>{m.role}</p>
                <p className="mt-4 max-h-0 flex-1 overflow-hidden text-[13.5px] leading-relaxed text-white/0 transition-all duration-500 group-hover:max-h-72 group-hover:text-white/65">{m.bio}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/70 transition-all group-hover:gap-3 group-hover:text-white">
                  Connect <IconArrowUpRight className="h-4 w-4 text-brand-red" />
                </span>
              </div>
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
              { to: 1200, suffix: '+', label: 'Engineers & specialists led' },
              { to: 45, suffix: '', label: 'Strategic partnerships' },
              { to: 11, suffix: '', label: 'Proprietary solutions shipped' },
              { to: 16, suffix: '', label: 'Countries across ME & Africa' },
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
