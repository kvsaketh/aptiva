import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import StatBand from '../components/kit/StatBand'
import Marquee from '../components/kit/Marquee'
import CTASection from '../components/kit/CTASection'
import {
  IconDocument, IconBrain, IconShield, IconFileCheck, IconLandmark, IconChart,
  IconGlobe, IconLayers, IconArrowRight, IconArrowUpRight, IconRocket, IconZap,
  IconServer, IconTrendingUp, IconSparkle, IconBuilding,
} from '../components/Icons'

/* ────────────── DATA (slugs + groupings PRESERVED) ────────────── */

type Sol = { name: string; slug: string; tag: string; blurb: string; metric: string; metricLabel: string; stack: string[] }
type Group = { title: string; subtitle: string; description: string; accent: 'blue' | 'red'; icon: typeof IconDocument; solutions: Sol[] }

const solutionGroups: Group[] = [
  {
    title: 'Content & Trust',
    subtitle: 'Intelligent content, document processing & digital trust',
    description:
      "Aptiva's flagship intellectual property in enterprise content. Agentic capture, GenAI classification, immutable archival and qualified digital trust — engineered for the regulated correspondence, records and signing workloads at the core of banking and government.",
    accent: 'blue',
    icon: IconDocument,
    solutions: [
      { name: 'Corroflow', slug: 'corroflow', tag: 'Intelligent Correspondence', blurb: 'Agentic correspondence that captures, understands, routes and drafts replies across every channel — cutting handling time up to 80%.', metric: '80%', metricLabel: 'faster handling', stack: ['NLP', 'Agentic', 'Omni-channel'] },
      { name: 'Classifyr', slug: 'classifyr', tag: 'Document Intelligence', blurb: 'Neural classification and extraction across 500+ document types and 40+ languages with self-learning taxonomies — 99.5% accuracy.', metric: '99.5%', metricLabel: 'accuracy', stack: ['ML', 'OCR/ICR', 'Arabic'] },
      { name: 'Vaultera', slug: 'vaultera', tag: 'Records & Archival', blurb: 'A unified physical-plus-digital vault with automated retention, legal hold and tamper-evident audit trails for full compliance.', metric: '60%', metricLabel: 'lower storage cost', stack: ['Retention', 'eDiscovery', 'Audit'] },
      { name: 'Signova', slug: 'signova', tag: 'Digital Signing & Trust', blurb: 'Qualified, advanced and simple e-signatures with biometric verification and PKI trust — 2M+ signatures processed.', metric: '2M+', metricLabel: 'signatures', stack: ['QES/AdES', 'PKI', 'UAE PASS'] },
    ],
  },
  {
    title: 'Fintech & Localization',
    subtitle: 'Lending automation & multilingual communication',
    description:
      'Digital lending engines and AI localization purpose-built for global markets — many languages, many regulators, one platform. Credit decisions in minutes; culturally accurate content in days, not weeks.',
    accent: 'red',
    icon: IconTrendingUp,
    solutions: [
      { name: 'Kredence', slug: 'kredence', tag: 'Corporate Lending', blurb: 'AI credit decisioning, risk scoring and portfolio intelligence that compresses corporate lending from days to minutes.', metric: '15 min', metricLabel: 'decision time', stack: ['AI scoring', 'Basel/IFRS', 'Core banking'] },
      { name: 'Lendora', slug: 'lendora', tag: 'Retail Lending', blurb: 'Instant digital onboarding, AI origination and real-time disbursement with embedded BNPL and smart KYC/AML.', metric: '80%', metricLabel: 'faster onboarding', stack: ['BNPL', 'KYC/AML', 'Embedded'] },
      { name: 'Linguara', slug: 'linguara', tag: 'Multilingual Localization', blurb: 'GenAI translation with human-in-the-loop review and cultural adaptation across 80+ languages — zero-code deployment.', metric: '70%', metricLabel: 'lower cost', stack: ['GenAI MT', 'Arabic', 'Zero-code'] },
    ],
  },
  {
    title: 'Procurement & Supply Chain',
    subtitle: 'Source-to-pay automation & supplier intelligence',
    description:
      'End-to-end source-to-pay and supplier-risk platforms for enterprises managing complex GCC supply chains across countries, currencies and mandates. Eliminate maverick spend; quantify supplier risk before it bites.',
    accent: 'blue',
    icon: IconLayers,
    solutions: [
      { name: 'Procuria', slug: 'procuria', tag: 'Source-to-Pay', blurb: 'Requisition-to-payment automation with eRFX, three-way matching and AI spend analytics — 15–25% cost reduction.', metric: '25%', metricLabel: 'cost savings', stack: ['eRFX', '3-way match', 'SAP/Oracle'] },
      { name: 'Vendrix', slug: 'vendrix', tag: 'Supplier Management', blurb: 'Supplier lifecycle, 360° scorecards and AI risk scoring across financial, compliance, ESG and geopolitical signals.', metric: '500+', metricLabel: 'vendors managed', stack: ['Risk AI', 'ESG', 'Portal'] },
    ],
  },
  {
    title: 'Media & Intelligence',
    subtitle: 'DOOH media management & audience analytics',
    description:
      "Data-driven media and audience intelligence for the region's fast-growing advertising landscape. Programmatic DOOH and privacy-first computer vision turn screens and footfall into measurable, optimized revenue.",
    accent: 'red',
    icon: IconChart,
    solutions: [
      { name: 'Adscopia', slug: 'adscopia', tag: 'DOOH & Media', blurb: 'AI media planning, programmatic DOOH and hyperlocal targeting across 5,000+ digital screens with real-time yield.', metric: '5,000+', metricLabel: 'screens', stack: ['Programmatic', 'RTB', 'Yield AI'] },
      { name: 'Gazelens', slug: 'gazelens', tag: 'Audience Analytics', blurb: 'Privacy-first computer vision measuring demographics, dwell, attention and sentiment across 200+ live locations.', metric: '200+', metricLabel: 'locations', stack: ['Vision', 'Edge', 'Privacy-first'] },
    ],
  },
]

const headerStats = [
  { value: '11', label: 'Proprietary platforms' },
  { value: '4', label: 'Solution suites' },
  { value: '40+', label: 'Languages supported' },
  { value: '7', label: 'Global locations' },
]

const thesisPoints = [
  { icon: IconRocket, title: 'Accelerated delivery', desc: 'Pre-built domain IP collapses programs from months to weeks — clients see value before the next budget cycle.' },
  { icon: IconShield, title: 'Switching cost & stickiness', desc: 'Deep integration into ECM, core-banking and ERP creates durable relationships and high renewal rates.' },
  { icon: IconTrendingUp, title: 'Recurring revenue engine', desc: 'Subscription and usage-based licensing turns each deployment into a compounding annuity, not a one-off sale.' },
  { icon: IconBrain, title: 'Agentic-AI native', desc: 'GenAI, agentic workflows and intelligent automation are designed in — not bolted on — across the portfolio.' },
]

const platformStats = [
  { to: 11, label: 'Proprietary enterprise solutions' },
  { to: 99.5, suffix: '%', decimals: 1, label: 'Document classification accuracy' },
  { to: 50, suffix: 'M+', label: 'Documents processed annually' },
  { to: 80, suffix: '%', label: 'Reduction in manual handling' },
]

const capabilityWords = [
  'AGENTIC AI', 'GENAI', 'INTELLIGENT AUTOMATION', 'DOCUMENT INTELLIGENCE', 'DIGITAL TRUST',
  'CREDIT DECISIONING', 'SOURCE-TO-PAY', 'COMPUTER VISION', 'MULTILINGUAL NLP', 'RECORDS GOVERNANCE',
  'PROGRAMMATIC DOOH', 'RISK SCORING',
]

const groupAnchor = (title: string) => title.toLowerCase().replace(/[^a-z]+/g, '-')

/* ────────────── PAGE ────────────── */

export default function Solutions() {
  return (
    <div>
      <PageHeader
        label="SOLUTIONS"
        title="Eleven platforms. One portfolio."
        subtitle="Proprietary, AI-native enterprise software that turns deep domain expertise into measurable outcomes — engineered for regulated institutions worldwide."
        bgImage="/tech-abstract-1.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Solutions' }]}
        stats={headerStats}
      />

      <Thesis />
      <PortfolioGrid />
      <PlatformValue />
      <CapabilityMarquee />
      <Architecture />
      <PortfolioBreakdown />

      <CTASection
        color="blue"
        eyebrow="See it in production"
        title={<>From slideware to <span className="text-gradient-blue">shipped outcomes.</span></>}
        body="Book a working session with our solution architects. We'll map one high-value workflow to a focused proof-of-value — and show you the platform running on your data."
        primary={{ label: 'Request a demo', href: '#/contact' }}
        secondary={{ label: 'Explore services', href: '#/services' }}
      />
    </div>
  )
}

/* ────────────── THESIS (dark) ────────────── */

function Thesis() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal stagger=".th-item">
            <span className="th-item eyebrow-blue">Proprietary IP</span>
            <p className="th-item mt-7 max-w-3xl font-display text-[clamp(23px,3.2vw,42px)] font-medium leading-[1.2] tracking-[-0.02em] text-white text-balance">
              Aptiva Solutions are not off-the-shelf tools. They are{' '}
              <span className="text-gradient-blue">purpose-built platforms</span>, distilled from hundreds of
              enterprise implementations — encoding the workflows, compliance regimes and integration patterns
              that make regulated-industry technology actually succeed.
            </p>
            <p className="th-item mt-7 max-w-2xl lead text-white/60">
              Each platform is AI-native and integration-first: agentic capture, GenAI reasoning and intelligent
              automation connect cleanly to existing ECM, ERP, CRM and core-banking systems. Clients realize value
              fast without ripping out what works — while building the foundation for long-term digital
              transformation. For Aptiva, this portfolio is the strategic core: it accelerates delivery, deepens
              relationships and drives durable recurring revenue.
            </p>
            <div className="th-item mt-9 flex flex-wrap gap-4">
              <a href="#content-trust" className="btn-primary-blue group"><span>Browse the portfolio</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
              <a href="#/services" className="btn-ghost group">How we deliver<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
            </div>
          </Reveal>

          <Reveal stagger=".thesis-card" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {thesisPoints.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="thesis-card card-ink group flex flex-col p-7">
                  <span className="icon-tile-blue mb-5 h-12 w-12"><Icon className="h-5 w-5 text-white/85" /></span>
                  <h3 className="font-display text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/55">{p.desc}</p>
                </div>
              )
            })}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ────────────── PORTFOLIO GRID (light, TiltCards) ────────────── */

function PortfolioGrid() {
  return (
    <section id="solutions-portfolio" className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="The portfolio"
          counter="11 platforms / 4 suites"
          title={<>Four suites engineered to <span className="text-gradient-blue">work as one.</span></>}
          intro="Grouped by the business problem they solve — content & trust, fintech & localization, procurement & supply chain, and media & intelligence. Every platform shares a common AI-native, integration-first foundation."
        />

        <div className="mt-16 space-y-20">
          {solutionGroups.map((group, gi) => {
            const Gicon = group.icon
            return (
              <div key={group.title} id={groupAnchor(group.title)} className="scroll-mt-28">
                <Reveal className="flex flex-col gap-5 border-b border-ink-900/10 pb-7 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className={`${group.accent === 'blue' ? 'icon-tile-blue-light' : 'icon-tile-light'} h-11 w-11`}>
                        <Gicon className={`h-5 w-5 ${group.accent === 'blue' ? 'text-brand-blue' : 'text-brand-red'}`} />
                      </span>
                      <span className={group.accent === 'blue' ? 'eyebrow-blue-on-light' : 'eyebrow-on-light'}>
                        Suite {String(gi + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em] text-ink-900 md:text-3xl">{group.title}</h3>
                    <p className="mt-1.5 text-[15px] font-medium text-ink-900/70">{group.subtitle}</p>
                    <p className="mt-4 text-[14.5px] leading-relaxed text-ink-900/55">{group.description}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-900/40">
                    {group.solutions.length} {group.solutions.length === 1 ? 'platform' : 'platforms'}
                  </span>
                </Reveal>

                <Reveal stagger=".sol-card" className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.solutions.map((sol) => (
                    <TiltCard
                      key={sol.slug}
                      href={`#/solutions/${sol.slug}`}
                      glow={group.accent}
                      className="sol-card group relative flex min-h-[400px] flex-col justify-end overflow-hidden border border-ink-900/10 bg-ink-900"
                    >
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(/solution-${sol.slug}.jpg)` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/25 transition-opacity duration-500 group-hover:via-ink-900/70" />
                      <div className={`absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40 ${group.accent === 'blue' ? 'bg-grad-blue' : 'bg-grad-red'}`} />

                      <div className="relative z-10 flex h-full flex-col p-7">
                        <div className="flex items-start justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">{sol.tag}</span>
                          <span className={`font-mono text-[10px] uppercase tracking-[0.1em] ${group.accent === 'blue' ? 'text-brand-blue' : 'text-brand-red'}`}>{sol.slug}</span>
                        </div>

                        <div className="mt-auto">
                          <div className="flex items-end gap-3">
                            <h4 className="font-display text-[28px] font-semibold leading-none text-white transition-colors group-hover:text-white">{sol.name}</h4>
                            <span className={`pb-1 font-display text-lg font-semibold leading-none ${group.accent === 'blue' ? 'text-gradient-blue' : 'text-gradient-red'}`}>{sol.metric}</span>
                          </div>
                          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">{sol.metricLabel}</span>

                          <p className="mt-4 max-h-0 overflow-hidden text-[13px] leading-relaxed text-white/0 transition-all duration-500 group-hover:max-h-40 group-hover:text-white/75">{sol.blurb}</p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {sol.stack.map((s) => (
                              <span key={s} className="border border-white/15 bg-white/[0.06] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/55">{s}</span>
                            ))}
                          </div>

                          <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all group-hover:gap-3">
                            View platform<IconArrowRight className={`h-3.5 w-3.5 ${group.accent === 'blue' ? 'text-brand-blue' : 'text-brand-red'}`} />
                          </span>
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ────────────── PLATFORM VALUE (dark, StatBand) ────────────── */

function PlatformValue() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <KineticBackdrop variant="mesh" color="blue" opacity={0.4} />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Platform value"
          title={<>Outcomes the portfolio <span className="text-gradient-blue">delivers at scale.</span></>}
          intro="Aggregate impact across live deployments in banking, government, telecom and energy — the proof behind the platforms."
        />
        <div className="mt-14">
          <StatBand color="blue" stats={platformStats} />
        </div>

        <Reveal stagger=".pv-point" className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: IconServer, t: 'Integration-first', d: 'REST APIs, event streams and pre-built connectors for OpenText, Documentum, SharePoint, SAP, Oracle and core banking.' },
            { icon: IconShield, t: 'Compliance built-in', d: 'GDPR, UAE Data Protection, KSA PDPL, ISO 27001 and SOC 2 controls with automated policy enforcement and audit trails.' },
            { icon: IconGlobe, t: 'Global by design', d: 'Arabic-first NLP, RTL interfaces, local identity (UAE PASS) and data-residency options across global markets.' },
          ].map((p) => {
            const Icon = p.icon
            return (
              <div key={p.t} className="pv-point card-ink group flex flex-col p-7">
                <span className="icon-tile-blue mb-5 h-12 w-12"><Icon className="h-5 w-5 text-white/85" /></span>
                <h3 className="font-display text-lg font-semibold text-white">{p.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{p.d}</p>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── CAPABILITY MARQUEE ────────────── */

function CapabilityMarquee() {
  return (
    <section className="surface-ink-flat relative overflow-hidden border-y border-white/10 py-10">
      <Marquee
        speed={42}
        separator={<span className="h-1 w-1 rounded-full bg-brand-blue/60" />}
        items={capabilityWords.map((w) => (
          <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-white/25 transition-colors hover:text-white/70 md:text-3xl">{w}</span>
        ))}
      />
    </section>
  )
}

/* ────────────── ARCHITECTURE (light) ────────────── */

const archSteps = [
  { no: '01', title: 'Ingest & capture', desc: 'Documents, correspondence, applications and signals enter via multi-channel capture, APIs and event streams — structured or not.' },
  { no: '02', title: 'Understand with AI', desc: 'GenAI and ML models classify, extract, score and reason — Arabic-first NLP, computer vision and credit models turn raw input into decisions.' },
  { no: '03', title: 'Orchestrate agentically', desc: 'Agentic workflows route, escalate, draft and act with policy-aware automation, human-in-the-loop checkpoints and SLA enforcement.' },
  { no: '04', title: 'Integrate & govern', desc: 'Results flow into ECM, ERP, CRM and core banking with tamper-evident audit trails, compliance reporting and continuous optimization.' },
]

function Architecture() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="How the platforms work"
          title={<>A shared, <span className="text-gradient-blue">agentic-AI architecture.</span></>}
          intro="Every Aptiva platform runs the same four-stage pipeline — capture, understand, orchestrate and integrate — so intelligence and automation are consistent, auditable and reusable across the suite."
        />
        <Reveal stagger=".arch-step" className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-ink-900/10 bg-ink-900/5 md:grid-cols-2 lg:grid-cols-4">
          {archSteps.map((s) => (
            <div key={s.no} className="arch-step group relative bg-white p-8 transition-colors duration-500 hover:bg-brand-blue/[0.03]">
              <span className="font-display text-5xl font-semibold text-ink-900/12 transition-colors duration-500 group-hover:text-brand-blue/40">{s.no}</span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-900/55">{s.desc}</p>
              <div className="mt-6 h-px w-8 bg-grad-blue transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <a href="#/contact" className="btn-primary-blue group"><span>Talk to a solution architect</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-900/45">
            <IconSparkle className="h-4 w-4 text-brand-blue" /> Agentic AI · GenAI · Intelligent automation
          </span>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── PORTFOLIO BREAKDOWN (dark) ────────────── */

const breakdown = [
  { num: '4', label: 'Content & Trust', accent: 'blue' as const, icon: IconDocument, anchor: 'content-trust' },
  { num: '3', label: 'Fintech & Localization', accent: 'red' as const, icon: IconTrendingUp, anchor: 'fintech-localization' },
  { num: '2', label: 'Procurement & Supply Chain', accent: 'blue' as const, icon: IconLayers, anchor: 'procurement-supply-chain' },
  { num: '2', label: 'Media & Intelligence', accent: 'red' as const, icon: IconChart, anchor: 'media-intelligence' },
]

const crossIndustries = [
  { name: 'Banking & Financial Services', icon: IconBuilding },
  { name: 'Government & Public Sector', icon: IconLandmark },
  { name: 'Telecommunications', icon: IconZap },
  { name: 'Energy, Oil & Gas', icon: IconFileCheck },
]

function PortfolioBreakdown() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <Aurora className="opacity-50" />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="At a glance"
          title={<>The portfolio, <span className="text-gradient-blue">mapped.</span></>}
          intro="Eleven platforms across four suites, deployed into the region's most demanding regulated industries."
        />

        <Reveal stagger=".bd-card" className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {breakdown.map((b) => {
            const Icon = b.icon
            return (
              <a
                key={b.label}
                href={`#${b.anchor}`}
                className="bd-card group relative flex flex-col justify-between overflow-hidden border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
              >
                <span className={`${b.accent === 'blue' ? 'icon-tile-blue' : 'icon-tile'} mb-6 h-12 w-12`}><Icon className="h-5 w-5 text-white/85" /></span>
                <div>
                  <span className={`font-display text-5xl font-semibold leading-none ${b.accent === 'blue' ? 'text-gradient-blue' : 'text-gradient-red'}`}>{b.num}</span>
                  <p className="mt-3 text-[14px] font-medium leading-snug text-white/75">{b.label}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40 transition-all group-hover:gap-3 group-hover:text-white/70">
                  Jump to suite<IconArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            )
          })}
        </Reveal>

        <Reveal className="mt-10 border-t border-white/10 pt-10">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">Deployed across regulated industries</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {crossIndustries.map((ind) => {
              const Icon = ind.icon
              return (
                <a key={ind.name} href="#/industries" className="group flex items-center gap-3 border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-brand-blue/40 hover:bg-white/[0.04]">
                  <span className="icon-tile-blue h-10 w-10 shrink-0"><Icon className="h-4.5 w-4.5 text-white/80" /></span>
                  <span className="text-[13px] font-semibold leading-tight text-white/85 transition-colors group-hover:text-white">{ind.name}</span>
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
