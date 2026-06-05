import { useEffect } from 'react'
import {
  IconBuilding, IconAntenna, IconLandmark, IconZap, IconConstruction, IconHeartPulse,
  IconArrowRight, IconArrowUpRight, IconBrain, IconShield, IconRocket, IconTrendingUp,
  IconCheckCircle, IconGlobe,
} from '../components/Icons'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import Counter from '../components/kit/Counter'
import StatBand from '../components/kit/StatBand'
import Marquee from '../components/kit/Marquee'
import CTASection from '../components/kit/CTASection'
import BrandMark from '../components/BrandMark'
import { brand } from '../data/brands'

/* ────────────── DATA ────────────── */

type Industry = 'Banking' | 'Telecom' | 'Public Sector' | 'Real Estate' | 'Energy' | 'Insurance' | 'Transport'

interface FeaturedCase {
  slug: string
  client: string
  tagline: string
  industry: Industry
  brandSlug: string
  image: string
  metric: { to: number; suffix?: string; prefix?: string; decimals?: number }
  metricLabel: string
  summary: string
  results: string[]
  meta: string
}

// Flagship engagements — PRESERVE existing slugs (fab, etisalat, etihad-rail, aldar, enec, dubai-economy)
const featuredCases: FeaturedCase[] = [
  {
    slug: 'etisalat',
    client: 'Etisalat (e&)',
    tagline: 'UAE’s Leading Telecom · 9-Year Partnership',
    industry: 'Telecom',
    brandSlug: 'etisalat',
    image: '/case-etisalat.jpg',
    metric: { to: 80, suffix: '%' },
    metricLabel: 'faster document processing',
    summary: 'A full-stack partnership spanning content intelligence, GenAI, RPA, cloud and security — 15 engagements grown over nine years across the region’s largest operator.',
    results: ['80% faster processing', '50+ processes automated', '15,000+ endpoints secured'],
    meta: '15 engagements',
  },
  {
    slug: 'fab',
    client: 'First Abu Dhabi Bank',
    tagline: 'UAE’s Largest Bank · 8-Year Partnership',
    industry: 'Banking',
    brandSlug: 'fab',
    image: '/case-fab.jpg',
    metric: { to: 60, suffix: '%' },
    metricLabel: 'faster compliance reporting',
    summary: 'A land-and-expand journey from a single ECM project to seven global engagements — unifying content, workflow, compliance and observability across five countries.',
    results: ['20,000+ users served', '5M+ documents archived', '100% regulatory coverage'],
    meta: '7 engagements',
  },
  {
    slug: 'etihad-rail',
    client: 'Etihad Rail',
    tagline: 'National Railway Network · Infrastructure',
    industry: 'Transport',
    brandSlug: 'etihad-rail',
    image: '/case-etihad-rail.jpg',
    metric: { to: 99.99, suffix: '%', decimals: 2 },
    metricLabel: 'platform uptime SLA',
    summary: 'Hybrid-cloud architecture and 24×7 managed services engineered to scale with the UAE’s 1,200km national rail network — with disaster recovery measured in minutes.',
    results: ['1,200km network', '99.99% uptime', '<1hr recovery RTO'],
    meta: 'Mission-critical SRE',
  },
  {
    slug: 'enec',
    client: 'Emirates Nuclear Energy',
    tagline: 'Critical National Infrastructure · Energy',
    industry: 'Energy',
    brandSlug: 'enec',
    image: '/case-enec.jpg',
    metric: { to: 5000, prefix: '', suffix: '+' },
    metricLabel: 'endpoints under zero-trust',
    summary: 'A zero-trust security framework and 24×7 SOC protecting the UAE’s first nuclear operator — engineered to IAEA standards with sub-15-minute threat response.',
    results: ['<15min threat response', 'IAEA compliant', 'Zero incidents'],
    meta: '24×7 SOC',
  },
  {
    slug: 'aldar',
    client: 'Aldar Properties',
    tagline: 'UAE Real Estate Leader · 2-Year Partnership',
    industry: 'Real Estate',
    brandSlug: 'aldar',
    image: '/case-aldar.jpg',
    metric: { to: 2, suffix: 'M+' },
    metricLabel: 'documents under management',
    summary: 'Enterprise content, intelligent correspondence and payment automation creating a single source of truth across 50+ developments and 10,000+ tenants.',
    results: ['2M+ documents', '10K+ tenants automated', 'Real-time reconciliation'],
    meta: '50+ projects',
  },
  {
    slug: 'dubai-economy',
    client: 'Dubai Economy & Tourism',
    tagline: 'UAE Government · 3-Year Partnership',
    industry: 'Public Sector',
    brandSlug: 'det',
    image: '/case-dubai-economy.jpg',
    metric: { to: 70, suffix: '%' },
    metricLabel: 'faster license processing',
    summary: 'A digital-by-default transformation — intelligent correspondence, UAE Pass identity and automated reconciliation — that took a city’s economic engine fully paperless.',
    results: ['100% paperless', '50K+ businesses', '99.5% AI classification'],
    meta: '3 engagements',
  },
]

// Additional engagements — PRESERVE slugs from CaseStudyDetail data map
interface OtherCase {
  slug: string
  name: string
  industry: Industry
  location: string
  engagement: string
  solution: string
  outcome: string
  brandSlug: string
}

const otherCases: OtherCase[] = [
  { slug: 'daman-health', name: 'Daman Health IC', industry: 'Insurance', location: 'UAE', engagement: 'Customer Experience Transformation', solution: 'CCaaS · Speech Analytics · AI Agent-Assist', outcome: '+40% CSAT, 90% claims < 24h', brandSlug: 'daman' },
  { slug: 'mashreq-bank', name: 'Mashreq Bank', industry: 'Banking', location: 'UAE', engagement: 'Data & Analytics Platform', solution: 'Databricks Lakehouse · Power BI · ML', outcome: '10TB+/day, 85% ML accuracy', brandSlug: 'mashreq' },
  { slug: 'rak-bank', name: 'RAK Bank', industry: 'Banking', location: 'UAE', engagement: 'Intelligent Process Automation', solution: 'UiPath RPA · Intelligent Capture · Process Mining', outcome: '90% cost cut, 50K+ hours saved', brandSlug: 'rakbank' },
  { slug: 'nbf', name: 'National Bank of Fujairah', industry: 'Banking', location: 'UAE', engagement: 'Digital Banking Platform', solution: 'Digital Experience · Salesforce CRM · AI', outcome: '+300% mobile adoption', brandSlug: 'nbf' },
  { slug: 'uae-mof', name: 'UAE Ministry of Finance', industry: 'Public Sector', location: 'UAE', engagement: 'Content & Document Intelligence', solution: 'OpenText Documentum · Intelligent Capture', outcome: '5M+ docs, 100% compliance', brandSlug: 'mof' },
  { slug: 'damac', name: 'DAMAC Properties', industry: 'Real Estate', location: 'UAE', engagement: 'Customer Experience & CRM', solution: 'Salesforce · Marketing & Experience Cloud', outcome: '100K+ profiles, +60% ROI', brandSlug: 'damac' },
  { slug: 'samana', name: 'SAMANA Developers', industry: 'Real Estate', location: 'UAE', engagement: 'Managed Services & Cloud', solution: 'AWS · Datadog · 24×7 SRE', outcome: '99.95% uptime, -60% cost', brandSlug: 'samana' },
  { slug: 'oab', name: 'Oman Arab Bank', industry: 'Banking', location: 'Oman', engagement: 'Core Banking Digitalization', solution: 'FinexCore · Open Banking APIs', outcome: '15+ fintech partners, +400% mobile', brandSlug: 'oab' },
  { slug: 'im-bank', name: 'I&M Bank', industry: 'Banking', location: 'East Africa', engagement: 'ECM & Compliance Automation', solution: 'OpenText · UiPath · Compliance Workflows', outcome: 'Unified across 4 countries', brandSlug: 'im-bank' },
  { slug: 'liquid-telecom', name: 'Liquid Telecom', industry: 'Telecom', location: 'Africa', engagement: 'Network Operations & AIOps', solution: 'ServiceNow · Datadog · Predictive AIOps', outcome: '-40% outages, 50K+ assets', brandSlug: 'liquid' },
]

const industryMeta: Record<Industry, { icon: typeof IconBuilding; glow: 'red' | 'blue' }> = {
  Banking: { icon: IconBuilding, glow: 'red' },
  Telecom: { icon: IconAntenna, glow: 'blue' },
  'Public Sector': { icon: IconLandmark, glow: 'red' },
  'Real Estate': { icon: IconConstruction, glow: 'blue' },
  Energy: { icon: IconZap, glow: 'red' },
  Insurance: { icon: IconHeartPulse, glow: 'blue' },
  Transport: { icon: IconGlobe, glow: 'red' },
}

const proofPoints = [
  { icon: IconBrain, title: 'Agentic AI in production', desc: 'Not pilots or slideware — GenAI, RAG and agentic workflows running inside regulated banks, operators and ministries every day.' },
  { icon: IconShield, title: 'Regulated-industry rigor', desc: 'Engagements audited against CBUAE, SCA, IAEA and ISO 27001 — where a single compliance gap is not an option.' },
  { icon: IconRocket, title: 'Land-and-expand trust', desc: 'Flagship clients start with one project and grow to 7–15 engagements as value compounds and trust deepens.' },
  { icon: IconTrendingUp, title: 'Quantified outcomes', desc: 'Every engagement is measured: faster processing, lower cost, higher uptime, better experience — proof, not promises.' },
]

const aggregateStats = [
  { to: 27, suffix: '+', label: 'Enterprise engagements delivered across MEA' },
  { to: 16, label: 'Countries spanning two continents' },
  { to: 50, suffix: 'K+', label: 'Man-hours saved per year through automation' },
  { to: 99.9, suffix: '%', decimals: 1, label: 'Average uptime across managed platforms' },
]

const marqueeOutcomes = [
  '80% FASTER PROCESSING', '60% LOWER COST', '99.99% UPTIME', '50K+ HOURS SAVED',
  '300% ADOPTION GROWTH', 'ZERO BREACHES', '24H CLAIMS', '99.5% AI ACCURACY',
]

const filterTags = ['All', 'Banking', 'Telecom', 'Public Sector', 'Real Estate', 'Energy', 'Insurance']

/* ────────────── PAGE ────────────── */

export default function CaseStudies() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <div>
      <PageHeader
        label="Proof, not promises"
        title="Outcomes we have engineered."
        subtitle="27+ enterprise engagements across banking, government, telecom, energy and real estate — deep partnerships measured in years and quantified outcomes, not one-off projects."
        bgImage="/about-partners.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Case Studies' }]}
        stats={[
          { value: '27+', label: 'Engagements' },
          { value: '16', label: 'Countries' },
          { value: '9yr', label: 'Longest Partnership' },
          { value: '50+', label: 'Enterprise Clients' },
        ]}
      />

      <Intro />
      <Flagship />
      <ResultsBand />
      <MoreEngagements />
      <ClientStrip />
      <CTASection
        eyebrow="Your outcome, next"
        title={<>Let’s engineer the next case study <span className="text-gradient-brand">together.</span></>}
        body="Start with one focused proof-of-value. We’ll prove the outcome, then scale it across your enterprise."
        primary={{ label: 'Start a conversation', href: '#/contact' }}
        secondary={{ label: 'Explore our services', href: '#/services' }}
      />
    </div>
  )
}

/* ────────────── INTRO / POSITIONING ────────────── */

function Intro() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="border-y border-white/10 py-4">
        <Marquee
          items={marqueeOutcomes.map((w) => (
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/30">{w}</span>
          ))}
        />
      </div>
      <div className="container-xl section-y">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal stagger=".intro-item" className="lg:col-span-7">
            <span className="intro-item eyebrow-red">Why these stories matter</span>
            <p className="intro-item mt-7 font-display text-[clamp(22px,3.1vw,40px)] font-medium leading-[1.2] tracking-[-0.02em] text-white text-balance">
              The institutions that move the region forward don’t buy
              <span className="text-gradient-brand"> demos</span> — they buy outcomes that hold up under audit, at scale,
              for years.
            </p>
            <p className="intro-item mt-7 max-w-2xl text-[15px] leading-relaxed text-white/60">
              Every engagement below started the same way: a single, well-scoped problem with a measurable outcome.
              We proved value fast, earned the right to the next problem, and grew into a long-term partner. That
              land-and-expand discipline is why a first ECM project at First Abu Dhabi Bank became seven global
              engagements, and why Etisalat trusted us across fifteen — from content intelligence to GenAI,
              automation, cloud and zero-trust security.
            </p>
            <p className="intro-item mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">
              What ties them together is a refusal to ship slideware. Agentic AI, intelligent automation and digital
              transformation are delivered into production inside regulated banks, national operators, ministries and
              critical-infrastructure operators — where compliance is non-negotiable and uptime is measured to the
              fourth decimal.
            </p>
          </Reveal>

          <Reveal stagger=".pp-item" className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {proofPoints.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="pp-item card-ink group flex flex-col p-6">
                    <span className="icon-tile mb-5 h-11 w-11"><Icon className="h-5 w-5 text-white/85" /></span>
                    <h3 className="font-display text-[15px] font-semibold leading-tight text-white">{p.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-white/55">{p.desc}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ────────────── FLAGSHIP GRID (light) ────────────── */

function Flagship() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Flagship engagements"
          counter="01 / 03"
          title={<>Partnerships measured in <span className="text-gradient-brand">years and outcomes.</span></>}
          intro="Six defining relationships across the region’s most demanding institutions — each a multi-year, multi-engagement transformation."
        />

        {/* Filter-feel tag row (visual; full filtering lives in the directory below) */}
        <Reveal className="mt-12 flex flex-wrap gap-2">
          {filterTags.map((t, i) => (
            <span
              key={t}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-all ${
                i === 0
                  ? 'border border-brand-red/40 bg-brand-red/[0.06] text-brand-red'
                  : 'border border-ink-900/10 bg-white text-ink-900/55 hover:border-ink-900/25 hover:text-ink-900'
              }`}
            >
              {t}
            </span>
          ))}
        </Reveal>

        <Reveal stagger=".case-card" className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((c) => {
            const meta = industryMeta[c.industry]
            const Icon = meta.icon
            return (
              <TiltCard
                key={c.slug}
                href={`#/case-studies/${c.slug}`}
                glow={meta.glow}
                className="case-card card-paper flex flex-col overflow-hidden"
              >
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${c.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/10" />
                  <div className={`absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40 ${meta.glow === 'blue' ? 'bg-grad-blue' : 'bg-grad-brand'}`} />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/20 bg-ink-900/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
                    <Icon className="h-3.5 w-3.5" />{c.industry}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-lg font-semibold text-white">{c.client}</h3>
                    <p className="mt-0.5 text-[12px] text-white/70">{c.tagline}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-end gap-3">
                    <span className={`font-display text-[40px] font-semibold leading-none ${meta.glow === 'blue' ? 'text-gradient-blue' : 'text-gradient-brand'}`}>
                      <Counter to={c.metric.to} prefix={c.metric.prefix} suffix={c.metric.suffix} decimals={c.metric.decimals} />
                    </span>
                    <span className="pb-1 text-[11.5px] uppercase tracking-[0.08em] text-ink-900/55">{c.metricLabel}</span>
                  </div>

                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-ink-900/60">{c.summary}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.results.map((r) => (
                      <span key={r} className="border border-ink-900/10 bg-ink-900/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-900/50">{r}</span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-ink-900/10 pt-4">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-900/45">{c.meta}</span>
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-red transition-all group-hover:gap-3">
                      Read story<IconArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── AGGREGATE RESULTS BAND (dark) ────────────── */

function ResultsBand() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <KineticBackdrop variant="flow" color="blue" opacity={0.4} />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Aggregate impact"
          counter="02 / 03"
          title={<>The numbers behind the <span className="text-gradient-brand">partnerships.</span></>}
          intro="Outcomes compounded across nearly three dozen engagements in regulated, mission-critical environments."
        />
        <div className="mt-14">
          <StatBand color="blue" stats={aggregateStats} />
        </div>
        <Reveal className="mt-8 max-w-3xl text-[15px] leading-relaxed text-white/55">
          These aren’t headline figures from a single project. They reflect a portfolio of long-running relationships
          where automation removed manual toil, intelligent platforms collapsed processing time, and disciplined SRE
          kept mission-critical systems available — quarter after quarter, audit after audit.
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── MORE ENGAGEMENTS DIRECTORY (dark) ────────────── */

function MoreEngagements() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="More client engagements"
            counter="03 / 03"
            title={<>Depth across every <span className="text-gradient-brand">regulated sector.</span></>}
            intro="From core-banking modernization in Oman to AIOps across the African continent — the full breadth of delivery."
            className="md:max-w-2xl"
          />
          <Reveal>
            <a href="#/contact" className="btn-ghost group shrink-0">Discuss your project<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </Reveal>
        </div>

        <Reveal stagger=".more-card" className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {otherCases.map((cs) => {
            const meta = industryMeta[cs.industry]
            const Icon = meta.icon
            return (
              <a
                key={cs.slug}
                href={`#/case-studies/${cs.slug}`}
                className="more-card card-ink group flex flex-col p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`icon-tile h-11 w-11 ${meta.glow === 'blue' ? 'icon-tile-blue' : ''}`}><Icon className="h-5 w-5 text-white/85" /></span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">{cs.location}</span>
                </div>
                <h4 className="mt-5 font-display text-[17px] font-semibold text-white transition-colors group-hover:text-brand-red">{cs.name}</h4>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40">{cs.industry}</p>
                <p className="mt-4 text-[13.5px] font-medium leading-snug text-white/75">{cs.engagement}</p>
                <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-white/50">{cs.solution}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="flex items-center gap-2 text-[11px] font-semibold text-brand-red">
                    <IconCheckCircle className="h-3.5 w-3.5" />{cs.outcome}
                  </span>
                  <IconArrowRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </a>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── CLIENT LOGO STRIP (light) ────────────── */

function ClientStrip() {
  const featuredSlugs = featuredCases.map((c) => c.brandSlug)
  const otherSlugs = otherCases.map((c) => c.brandSlug)
  const logoSlugs = [...featuredSlugs, ...otherSlugs]

  return (
    <section className="surface-paper-warm relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Trusted by the region’s leaders"
          title={<>The names behind the <span className="text-gradient-brand">numbers.</span></>}
          intro="Banks, operators, ministries and developers that trust Aptiva as a long-term transformation partner."
        />
        <Reveal stagger=".logo-item" className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {logoSlugs.map((slug) => (
            <div key={slug} className="logo-item">
              <BrandMark brand={brand(slug)} theme="light" />
            </div>
          ))}
        </Reveal>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Aurora className="opacity-[0.05]" />
      </div>
    </section>
  )
}
