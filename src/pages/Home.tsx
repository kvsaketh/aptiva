import {
  IconDocument, IconBrain, IconCloud, IconChart, IconHeadset, IconMonitor,
  IconFileCheck, IconLightbulb, IconSettings, IconSmartphone, IconUsers, IconCheckCircle,
  IconShield, IconRocket, IconAward, IconZap, IconGlobe, IconBuilding,
  IconAntenna, IconLandmark, IconConstruction, IconHeartPulse,
  IconArrowRight, IconArrowUpRight, IconLayers,
} from '../components/Icons'
import ClientLogosMarquee from '../components/ClientLogosMarquee'
import Hero from '../sections/Hero'
import StatsBanner from '../sections/StatsBanner'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '../components/motion/Atmosphere'

/* ────────────── DATA ────────────── */

const corePillars = [
  { title: 'Content & Document Intelligence', slug: 'content-intelligence', desc: 'Enterprise content platforms, intelligent capture & IDP, and digital archival with end-to-end governance.', icon: IconDocument, tags: ['ECM', 'IDP', 'Archival'] },
  { title: 'GenAI, Agentic AI & Automation', slug: 'ai-automation', desc: 'Production LLMs, agentic workflows, conversational AI, RAG infrastructure and RPA at enterprise scale.', icon: IconBrain, tags: ['LLM', 'Agents', 'RAG', 'RPA'] },
  { title: 'Cloud, Infra & Cybersecurity', slug: 'cloud-security', desc: 'Multi-cloud migration, DevSecOps & SRE, zero-trust architecture and continuous VAPT.', icon: IconCloud, tags: ['Multi-cloud', 'DevSecOps', 'Zero-trust'] },
  { title: 'Data & Analytics', slug: 'data-analytics', desc: 'BI dashboards, data engineering & governance, ML pipelines and text analytics that turn data into decisions.', icon: IconChart, tags: ['BI', 'ML', 'Governance'] },
  { title: 'Customer Experience (CX)', slug: 'customer-experience', desc: 'CCaaS & omni-channel CX, speech analytics and frictionless digital onboarding journeys.', icon: IconHeadset, tags: ['CCaaS', 'Onboarding'] },
  { title: 'Digital Workplace', slug: 'digital-workplace', desc: 'Modern intranet & collaboration, employee experience platforms and enterprise knowledge management.', icon: IconMonitor, tags: ['Intranet', 'EX', 'KM'] },
]

const specializedPractices = [
  { title: 'Contract Lifecycle Management', slug: 'clm', icon: IconFileCheck },
  { title: 'Business Value Consulting', slug: 'consulting', icon: IconLightbulb },
  { title: 'Managed Services & SRE', slug: 'managed-services', icon: IconSettings },
  { title: 'Digital Experience Platforms', slug: 'digital-experience', icon: IconSmartphone },
  { title: 'Strategic Resource Partnership', slug: 'resource-partnership', icon: IconUsers },
  { title: 'Quality Engineering & Testing', slug: 'quality-engineering', icon: IconCheckCircle },
]

const approach = [
  { no: '01', title: 'Discover & Diagnose', desc: 'Digital-maturity assessment, value mapping and a prioritized roadmap aligned to business outcomes.' },
  { no: '02', title: 'Architect & Pilot', desc: 'Reference architecture, a focused proof-of-value and a land-and-expand plan that de-risks investment.' },
  { no: '03', title: 'Engineer & Scale', desc: 'Agile delivery squads ship production systems with security, compliance and observability built in.' },
  { no: '04', title: 'Operate & Optimize', desc: '24×7 managed services, AIOps and continuous optimization that keep value compounding.' },
]

const solutionGroups = [
  { title: 'Content & Trust', solutions: [
    { name: 'Corroflow', slug: 'corroflow', tag: 'Intelligent Correspondence' },
    { name: 'Classifyr', slug: 'classifyr', tag: 'Document Intelligence' },
    { name: 'Vaultera', slug: 'vaultera', tag: 'Records & Archival' },
    { name: 'Signova', slug: 'signova', tag: 'Digital Signing & Trust' },
  ]},
  { title: 'Fintech & Localization', solutions: [
    { name: 'Kredence', slug: 'kredence', tag: 'Corporate Lending' },
    { name: 'Lendora', slug: 'lendora', tag: 'Retail Lending' },
    { name: 'Linguara', slug: 'linguara', tag: 'Multilingual Localization' },
  ]},
  { title: 'Procurement & Supply Chain', solutions: [
    { name: 'Procuria', slug: 'procuria', tag: 'Source-to-Pay' },
    { name: 'Vendrix', slug: 'vendrix', tag: 'Supplier Management' },
  ]},
  { title: 'Media & Intelligence', solutions: [
    { name: 'Adscopia', slug: 'adscopia', tag: 'DOOH & Media' },
    { name: 'Gazelens', slug: 'gazelens', tag: 'Audience Analytics' },
  ]},
]

const industries = [
  { name: 'Banking & Financial Services', slug: 'banking', icon: IconBuilding, img: '/industry-banking.jpg', blurb: 'Core modernization, lending & onboarding for the region’s leading banks.' },
  { name: 'Telecommunications', slug: 'telecom', icon: IconAntenna, img: '/industry-telecom.jpg', blurb: 'OSS/BSS, CX and network data platforms for national operators.' },
  { name: 'Government & Public Sector', slug: 'government', icon: IconLandmark, img: '/industry-government.jpg', blurb: 'Citizen services, secure content and digital-by-default governance.' },
  { name: 'Energy, Oil & Gas', slug: 'energy', icon: IconZap, img: '/industry-energy.jpg', blurb: 'Asset intelligence, HSE and operational analytics at industrial scale.' },
  { name: 'Real Estate & Construction', slug: 'real-estate', icon: IconConstruction, img: '/industry-real-estate.jpg', blurb: 'Sales, CLM and project intelligence for major developers.' },
  { name: 'Insurance & Healthcare', slug: 'insurance', icon: IconHeartPulse, img: '/industry-healthcare.jpg', blurb: 'Claims automation, member experience and compliant data platforms.' },
]

const whyItems = [
  { icon: IconRocket, title: 'Land & Expand Model', desc: 'Start with one focused project, then grow across the enterprise as trust and value compound.' },
  { icon: IconShield, title: 'Full-Stack IT Partner', desc: 'Content, security, cloud and AI under one accountable relationship — no finger-pointing across vendors.' },
  { icon: IconAward, title: 'Regulated-Industry DNA', desc: 'Deep, audited expertise across banking, government, telecom and energy where compliance is non-negotiable.' },
  { icon: IconBrain, title: 'GenAI & Agentic First-Mover', desc: 'LLMs, agentic workflows and custom AI delivered in production — not slideware — at enterprise scale.' },
  { icon: IconGlobe, title: 'Global Multi-Market', desc: 'On-the-ground expertise since 2017 spanning 7 global locations worldwide.' },
  { icon: IconLayers, title: '11-Strong Solution Portfolio', desc: 'Proprietary IP that creates switching cost, accelerates delivery and drives recurring revenue.' },
]

const proofCases = [
  { client: 'First Abu Dhabi Bank', slug: 'fab', img: '/case-fab.jpg', metric: '60%', metricLabel: 'faster onboarding', summary: 'Re-engineered digital onboarding and document intelligence across retail banking.' },
  { client: 'Etisalat (e&)', slug: 'etisalat', img: '/case-etisalat.jpg', metric: '3.2M', metricLabel: 'docs / month', summary: 'Automated correspondence and capture at national-operator scale.' },
  { client: 'Etihad Rail', slug: 'etihad-rail', img: '/case-etihad-rail.jpg', metric: '99.95%', metricLabel: 'platform uptime', summary: 'Managed services & SRE for mission-critical rail operations.' },
]

const marqueeWords = ['CONTENT INTELLIGENCE', 'AGENTIC AI', 'CLOUD', 'CYBERSECURITY', 'DATA & ANALYTICS', 'CUSTOMER EXPERIENCE', 'AUTOMATION', 'MANAGED SERVICES']

/* ────────────── PAGE ────────────── */

export default function Home() {
  return (
    <div>
      <Hero />
      <StatsBanner />
      <PositioningBand />
      <Capabilities />
      <Approach />
      <Solutions />
      <Industries />
      <WhyAptiva />
      <ProofCases />
      <ClientLogosMarquee />
    </div>
  )
}

/* ────────────── POSITIONING ────────────── */

function PositioningBand() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="border-y border-white/10 py-4">
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-[12px] uppercase tracking-[0.22em] text-white/30">
              {w}<span className="h-1 w-1 rounded-full bg-brand-red/60" />
            </span>
          ))}
        </div>
      </div>
      <div className="container-xl section-y">
        <Reveal stagger=".pb-item">
          <span className="pb-item eyebrow-red">Who we are</span>
          <p className="pb-item mt-7 max-w-5xl font-display text-[clamp(24px,3.4vw,46px)] font-medium leading-[1.18] tracking-[-0.02em] text-white text-balance">
            Aptiva is the <span className="text-gradient-brand">full-stack technology partner</span> for the institutions
            that move the world forward — pairing regulated-industry delivery since 2017 with
            a first-mover edge in GenAI and agentic automation.
          </p>
          <div className="pb-item mt-10 flex flex-wrap gap-4">
            <a href="#/about" className="btn-dark group !bg-white/[0.04] !text-white border border-white/15 hover:!bg-white/10">Our story<IconArrowRight className="h-4 w-4" /></a>
            <a href="#/leadership" className="inline-flex items-center gap-2 px-2 py-4 text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white">Meet the leadership<IconArrowUpRight className="h-4 w-4 text-brand-red" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── CAPABILITIES (light) ────────────── */

function Capabilities() {
  return (
    <section id="capabilities" className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="What we deliver"
          counter="01 / 04"
          title={<>Six pillars of <span className="text-gradient-brand">digital transformation.</span></>}
          intro="Full-stack capabilities for the modern enterprise — engineered to work together, delivered by specialists who have done it before."
        />

        <Reveal stagger=".cap-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {corePillars.map((cap) => {
            const Icon = cap.icon
            return (
              <a key={cap.slug} href={`#/services/${cap.slug}`} className="cap-card card-paper group flex flex-col p-8">
                <span className="icon-tile-light mb-6 h-14 w-14"><Icon className="h-6 w-6 text-brand-red transition-colors group-hover:text-white" /></span>
                <h3 className="font-display text-xl font-semibold text-ink-900 transition-colors group-hover:text-brand-red">{cap.title}</h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-900/55">{cap.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cap.tags.map((t) => (
                    <span key={t} className="border border-ink-900/10 bg-ink-900/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-900/45">{t}</span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-red opacity-0 transition-all group-hover:opacity-100">
                  Explore service <IconArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            )
          })}
        </Reveal>

        {/* Specialized practices */}
        <Reveal className="mt-14">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-900/45">Plus six specialized practices</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {specializedPractices.map((p) => {
              const Icon = p.icon
              return (
                <a key={p.slug} href={`#/services/${p.slug}`} className="group flex flex-col items-start gap-3 border border-ink-900/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/50 hover:shadow-lift-light">
                  <span className="icon-tile-light h-10 w-10"><Icon className="h-5 w-5 text-brand-blue transition-colors group-hover:text-white" /></span>
                  <h4 className="text-[13px] font-semibold leading-tight text-ink-900 transition-colors group-hover:text-brand-blue">{p.title}</h4>
                </a>
              )
            })}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <a href="#/services" className="btn-dark group">View all services<IconArrowRight className="h-4 w-4" /></a>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── APPROACH ────────────── */

function Approach() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <Aurora className="opacity-60" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="How we engage"
          counter="02 / 04"
          title={<>A land-and-expand model, <span className="text-gradient-brand">built to de-risk.</span></>}
          intro="We start small, prove value fast, then scale across the enterprise — so every step earns the next."
        />
        <Reveal stagger=".step" className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/[0.04] md:grid-cols-2 lg:grid-cols-4">
          {approach.map((s) => (
            <div key={s.no} className="step group relative bg-ink-900/70 p-8 transition-colors duration-500 hover:bg-white/[0.03]">
              <span className="font-display text-5xl font-semibold text-white/15 transition-colors duration-500 group-hover:text-white/40">{s.no}</span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/55">{s.desc}</p>
              <div className="mt-6 h-px w-8 bg-grad-brand transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── SOLUTIONS (dark, fixed text) ────────────── */

function Solutions() {
  return (
    <section id="solutions" className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y">
        <SectionHeading
          eyebrow="Proprietary platforms"
          counter="03 / 04"
          title={<>Eleven solutions. <span className="text-gradient-brand">Built for enterprise.</span></>}
          intro="Purpose-built products that accelerate delivery, deepen relationships and drive long-term recurring revenue."
        />

        <div className="mt-14 space-y-10">
          {solutionGroups.map((group) => (
            <Reveal key={group.title} stagger=".sol-row">
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">{group.title}</h3>
              <div className="border-t border-white/10">
                {group.solutions.map((sol) => (
                  <a key={sol.slug} href={`#/solutions/${sol.slug}`} className="sol-row group flex items-center justify-between gap-4 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.025]">
                    <div className="flex items-baseline gap-5">
                      <span className="font-display text-2xl font-semibold text-white transition-colors group-hover:text-brand-red md:text-[28px]">{sol.name}</span>
                      <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-white/40 sm:inline">{sol.tag}</span>
                    </div>
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white/45 transition-all group-hover:gap-3.5 group-hover:text-white">
                      View<IconArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <a href="#/solutions" className="btn-ghost group">Explore the full portfolio<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── INDUSTRIES (light, image cards) ────────────── */

function Industries() {
  return (
    <section id="industries" className="surface-paper relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Industries we serve"
          counter="04 / 04"
          title={<>Deep domain expertise where <span className="text-gradient-brand">stakes are highest.</span></>}
          intro="Regulated industries. Complex requirements. Purpose-built solutions delivered with audited rigor."
        />

        <Reveal stagger=".ind-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => {
            const Icon = ind.icon
            return (
              <a key={ind.slug} href={`#/industries/${ind.slug}`} className="ind-card group relative flex min-h-[300px] flex-col justify-end overflow-hidden border border-ink-900/10 p-7">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${ind.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/20 transition-opacity duration-500 group-hover:from-ink-900 group-hover:via-ink-900/60" />
                <div className="absolute inset-0 bg-grad-brand opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40" />
                <div className="relative z-10">
                  <span className="icon-tile mb-4 h-11 w-11"><Icon className="h-5 w-5 text-white" /></span>
                  <h3 className="font-display text-xl font-semibold text-white">{ind.name}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-[13.5px] leading-relaxed text-white/0 transition-all duration-500 group-hover:max-h-24 group-hover:text-white/75">{ind.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">Explore<IconArrowRight className="h-3.5 w-3.5 text-brand-red" /></span>
                </div>
              </a>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── WHY APTIVA (dark) ────────────── */

function WhyAptiva() {
  return (
    <section id="why-aptiva" className="surface-ink-raised relative overflow-hidden">
      <GridBackdrop />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Why Aptiva"
          title={<>Built to scale. <span className="text-gradient-brand">Wired to execute.</span></>}
          intro="Six reasons the region’s most demanding institutions choose us as a long-term partner."
        />
        <Reveal stagger=".why-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="why-card card-ink group flex flex-col p-8">
                <span className="icon-tile mb-6 h-12 w-12"><Icon className="h-5 w-5 text-white/85" /></span>
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{item.desc}</p>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── PROOF / CASE STUDIES ────────────── */

function ProofCases() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Proof, not promises"
            title={<>Outcomes we’ve <span className="text-gradient-brand">engineered.</span></>}
            className="md:max-w-2xl"
          />
          <Reveal>
            <a href="#/case-studies" className="btn-ghost group shrink-0">All case studies<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </Reveal>
        </div>

        <Reveal stagger=".proof-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {proofCases.map((c) => (
            <a key={c.slug} href={`#/case-studies/${c.slug}`} className="proof-card card-ink group flex flex-col overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${c.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">{c.client}</span>
                <div className="mt-4 flex items-end gap-3">
                  <span className="font-display text-4xl font-semibold text-gradient-brand leading-none">{c.metric}</span>
                  <span className="pb-1 text-[12px] uppercase tracking-[0.1em] text-white/50">{c.metricLabel}</span>
                </div>
                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-white/60">{c.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all group-hover:gap-3">
                  Read the story<IconArrowRight className="h-3.5 w-3.5 text-brand-red" />
                </span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
