import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain, BrandRule } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import StatBand from '../components/kit/StatBand'
import Marquee from '../components/kit/Marquee'
import CTASection from '../components/kit/CTASection'
import {
  IconDocument, IconBrain, IconCloud, IconChart, IconHeadset, IconMonitor,
  IconFileCheck, IconLightbulb, IconSettings, IconSmartphone, IconUsers, IconCheckCircle,
  IconShield, IconRocket, IconAward, IconGlobe, IconLayers,
  IconArrowRight, IconArrowUpRight, IconSparkle,
} from '../components/Icons'

/* ────────────── DATA (slugs PRESERVED) ────────────── */

const corePillars = [
  {
    title: 'Content & Document Intelligence',
    slug: 'content-intelligence',
    glow: 'red' as const,
    icon: IconDocument,
    desc: 'Capture, classify, govern and retire enterprise content across its full lifecycle — with AI doing the heavy lifting. We turn document estates into searchable, compliant, automation-ready intelligence.',
    capabilities: ['Enterprise content platforms (OpenText, Documentum)', 'Intelligent document processing & AI-driven OCR', 'Digital archival, retention & legal hold', 'Workflow automation & straight-through processing'],
    tags: ['ECM', 'IDP', 'Archival', 'Governance'],
  },
  {
    title: 'GenAI, Agentic AI & Automation',
    slug: 'ai-automation',
    glow: 'red' as const,
    icon: IconBrain,
    desc: 'Production-grade generative and agentic AI — not slideware. Autonomous agents that plan, act and adapt; custom LLMs grounded in your data; and hyperautomation that compounds across the enterprise.',
    capabilities: ['Autonomous AI agents & multi-step agentic workflows', 'Custom & fine-tuned LLMs (Arabic + English)', 'RAG architecture, vector stores & AI infrastructure', 'RPA & hyperautomation (UiPath, Automation Anywhere)'],
    tags: ['Agentic AI', 'LLM', 'RAG', 'RPA'],
  },
  {
    title: 'Cloud, Infra & Cybersecurity',
    slug: 'cloud-security',
    glow: 'blue' as const,
    icon: IconCloud,
    desc: 'Resilient, sovereign-ready infrastructure for regulated industries. Multi-cloud migration, DevSecOps and SRE engineered alongside zero-trust security and continuous vulnerability management.',
    capabilities: ['Multi-cloud migration & architecture (AWS, Azure, OCI)', 'DevOps / DevSecOps / Site Reliability Engineering', 'Zero-trust security, IAM & continuous VAPT', 'Sovereign cloud, DR & business continuity'],
    tags: ['Multi-cloud', 'DevSecOps', 'Zero-trust', 'VAPT'],
  },
  {
    title: 'Data & Analytics',
    slug: 'data-analytics',
    glow: 'blue' as const,
    icon: IconChart,
    desc: 'A modern data foundation that turns raw signal into decisions. Lakehouse engineering, governed self-service BI, and ML pipelines that move insight from days to seconds.',
    capabilities: ['Lakehouse engineering (Databricks, Snowflake)', 'Governed BI & visualization (Power BI, Tableau)', 'ML, predictive & real-time decision intelligence', 'Data governance, quality & MDM frameworks'],
    tags: ['Lakehouse', 'BI', 'ML', 'Governance'],
  },
  {
    title: 'Customer Experience (CX)',
    slug: 'customer-experience',
    glow: 'red' as const,
    icon: IconHeadset,
    desc: 'Omnichannel engagement that feels effortless. Cloud contact centers, AI agent-assist and speech analytics, and frictionless digital onboarding that turns acquisition from days into minutes.',
    capabilities: ['CCaaS & omnichannel contact center (Genesys Cloud)', 'Speech analytics, agent-assist & QM', 'Digital onboarding, eKYC & biometric verification', 'Journey analytics & personalization'],
    tags: ['CCaaS', 'eKYC', 'Onboarding', 'Speech AI'],
  },
  {
    title: 'Digital Workplace',
    slug: 'digital-workplace',
    glow: 'blue' as const,
    icon: IconMonitor,
    desc: 'A connected, intelligent workplace for distributed teams. Modern intranets, employee experience platforms and AI-powered knowledge discovery that lift productivity and engagement.',
    capabilities: ['Modern intranet & collaboration (M365, SharePoint)', 'Employee experience platforms (ServiceNow)', 'AI knowledge management & enterprise search', 'Gamification, learning & engagement analytics'],
    tags: ['Intranet', 'EX', 'KM', 'Search'],
  },
]

const specializedPractices = [
  { title: 'Contract Lifecycle Management', slug: 'clm', icon: IconFileCheck, blurb: 'GenAI-powered authoring, negotiation and obligation monitoring — up to 70% faster cycles.' },
  { title: 'Business Value Consulting', slug: 'consulting', icon: IconLightbulb, blurb: 'Maturity assessments, enterprise architecture and transformation roadmaps tied to ROI.' },
  { title: 'Managed Services & SRE', slug: 'managed-services', icon: IconSettings, blurb: '24×7 L1–L3 operations with AIOps observability and 99.99% availability SLAs.' },
  { title: 'Digital Experience Platforms', slug: 'digital-experience', icon: IconSmartphone, blurb: 'Digital banking, Salesforce ecosystems and application modernization at scale.' },
  { title: 'Strategic Resource Partnership', slug: 'resource-partnership', icon: IconUsers, blurb: 'Certified, multilingual talent through flexible onshore, offshore and hybrid models.' },
  { title: 'Quality Engineering & Testing', slug: 'quality-engineering', icon: IconCheckCircle, blurb: 'Automated regression, performance testing and CI/CD quality gates for release confidence.' },
]

const engagementModel = [
  { no: '01', title: 'Discover & Diagnose', desc: 'Digital-maturity assessment, value mapping and stakeholder alignment produce a prioritized roadmap anchored to business outcomes — not technology for its own sake.' },
  { no: '02', title: 'Architect & Pilot', desc: 'Reference architecture, a focused proof-of-value and a land-and-expand plan de-risk investment before a single production line of code ships at scale.' },
  { no: '03', title: 'Engineer & Scale', desc: 'Agile delivery squads ship production systems with security, compliance, observability and change management built in from sprint one — never bolted on.' },
  { no: '04', title: 'Operate & Optimize', desc: '24×7 managed services, AIOps and continuous optimization keep value compounding long after go-live, with quarterly business reviews tied to KPIs.' },
]

const whyItems = [
  { icon: IconRocket, title: 'Land & Expand Model', desc: 'Start with one focused project, prove value fast, then grow across the enterprise as trust compounds — the model behind 9-year client relationships.' },
  { icon: IconShield, title: 'Full-Stack Accountability', desc: 'Content, security, cloud, data and AI under one relationship — no finger-pointing across a dozen vendors when something breaks.' },
  { icon: IconAward, title: 'Regulated-Industry DNA', desc: 'Audited delivery across banking, government, telecom and energy, where compliance, sovereignty and uptime are non-negotiable.' },
  { icon: IconBrain, title: 'GenAI & Agentic First-Mover', desc: 'Autonomous agents, custom LLMs and RAG delivered in production at enterprise scale — with responsible-AI governance baked in.' },
  { icon: IconGlobe, title: 'ME + Africa Dual-Market', desc: 'Two decades of on-the-ground regional expertise spanning 16 countries, two continents and Arabic-first delivery.' },
  { icon: IconLayers, title: '11-Strong Solution Portfolio', desc: 'Proprietary IP that accelerates delivery, creates switching cost and drives long-term recurring value.' },
]

const statBand = [
  { to: 6, label: 'Core capability pillars' },
  { to: 6, label: 'Specialized practices' },
  { to: 45, label: 'Strategic OEM partners' },
  { to: 1200, suffix: '+', label: 'Certified experts' },
]

const techStack = [
  'OpenText', 'UiPath', 'Automation Anywhere', 'Databricks', 'Snowflake', 'AWS',
  'Microsoft Azure', 'Oracle Cloud', 'Genesys', 'Salesforce', 'ServiceNow',
  'CrowdStrike', 'Kubernetes', 'Power BI', 'Tableau',
]

const marqueeWords = ['CONTENT INTELLIGENCE', 'AGENTIC AI', 'GENAI', 'CLOUD', 'CYBERSECURITY', 'DATA & ANALYTICS', 'CUSTOMER EXPERIENCE', 'HYPERAUTOMATION', 'MANAGED SERVICES', 'QUALITY ENGINEERING']

/* ────────────── PAGE ────────────── */

export default function Services() {
  return (
    <div>
      <PageHeader
        label="SERVICES"
        title="Full-Stack Digital Transformation"
        subtitle="Six core pillars and six specialized practices — engineered for the demands of regulated industries across the Middle East and Africa, and led everywhere by Agentic AI, GenAI and intelligent automation."
        bgImage="/tech-abstract-2.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Services' }]}
        stats={[
          { value: '12', label: 'Service domains' },
          { value: '45', label: 'OEM partners' },
          { value: '1,200+', label: 'Certified experts' },
          { value: '16', label: 'Countries' },
        ]}
      />

      <Positioning />
      <CorePillars />
      <SpecializedPractices />
      <EngagementModel />
      <WhyOurServices />
      <TechMarquee />

      <CTASection
        eyebrow="Start where it matters"
        title={<>Begin with one focused engagement. <span className="text-gradient-brand">Scale across the enterprise.</span></>}
        body="Tell us the outcome you need — faster onboarding, autonomous workflows, a sovereign cloud, a defensible records estate. We'll architect the path and prove value before we scale it."
        primary={{ label: 'Scope an engagement', href: '#/contact' }}
        secondary={{ label: 'See our solutions', href: '#/solutions' }}
      />
    </div>
  )
}

/* ────────────── POSITIONING ────────────── */

function Positioning() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="border-y border-white/10 py-4">
        <Marquee
          items={marqueeWords.map((w) => (
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/30">{w}</span>
          ))}
          separator={<span className="h-1 w-1 rounded-full bg-brand-red/60" />}
        />
      </div>
      <div className="container-xl section-y">
        <Reveal stagger=".pos-item">
          <span className="pos-item eyebrow-red">How we deliver</span>
          <p className="pos-item mt-7 max-w-5xl font-display text-[clamp(24px,3.4vw,46px)] font-medium leading-[1.18] tracking-[-0.02em] text-white text-balance">
            One accountable partner across the entire transformation stack — pairing two decades of
            regulated-industry delivery with a <span className="text-gradient-brand">first-mover edge in GenAI and agentic automation.</span>
          </p>
          <div className="pos-item mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-red">Outcomes, not outputs</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">Every engagement is anchored to a measurable business KPI — cycle time, cost-to-serve, resolution rate, uptime — and reviewed against it quarterly.</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-red">Built for the regulated enterprise</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">Data sovereignty, auditability and compliance with GDPR, UAE PDPL and KSA PDPL are designed in, not retrofitted, from day one.</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-red">Proven at national scale</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">Multi-year partnerships with the region's flagship banks, operators and government entities — measured in millions of transactions, not pilots.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── CORE PILLARS (light, TiltCard grid) ────────────── */

function CorePillars() {
  return (
    <section id="core-pillars" className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Core capabilities"
          counter="01 / 03"
          title={<>Six pillars of <span className="text-gradient-brand">digital transformation.</span></>}
          intro="Each pillar is staffed by certified specialists, backed by strategic OEM partnerships and refined across hundreds of enterprise implementations. They are engineered to work together — or stand alone."
        />

        <Reveal stagger=".pillar-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {corePillars.map((p) => {
            const Icon = p.icon
            const isBlue = p.glow === 'blue'
            return (
              <TiltCard
                key={p.slug}
                href={`#/services/${p.slug}`}
                glow={p.glow}
                className="pillar-card card-paper flex flex-col p-8"
              >
                <span className={`${isBlue ? 'icon-tile-blue-light' : 'icon-tile-light'} mb-6 h-14 w-14`}>
                  <Icon className={`h-6 w-6 ${isBlue ? 'text-brand-blue' : 'text-brand-red'} transition-colors group-hover:text-white`} />
                </span>
                <h3 className={`font-display text-xl font-semibold text-ink-900 transition-colors ${isBlue ? 'group-hover:text-brand-blue' : 'group-hover:text-brand-red'}`}>{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-900/55">{p.desc}</p>
                <ul className="mt-5 space-y-2">
                  {p.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-900/70">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isBlue ? 'bg-brand-blue' : 'bg-brand-red'}`} />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="border border-ink-900/10 bg-ink-900/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-900/45">{t}</span>
                  ))}
                </div>
                <span className={`mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] ${isBlue ? 'text-brand-blue' : 'text-brand-red'} opacity-0 transition-all group-hover:opacity-100`}>
                  Explore service <IconArrowRight className="h-3.5 w-3.5" />
                </span>
              </TiltCard>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── SPECIALIZED PRACTICES (dark) ────────────── */

function SpecializedPractices() {
  return (
    <section id="specialized-practices" className="surface-ink-flat relative overflow-hidden">
      <KineticBackdrop variant="mesh" color="blue" opacity={0.3} className="left-1/3 w-[120%]" />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Specialized practices"
          counter="02 / 03"
          title={<>Six practices for the <span className="text-gradient-blue">nuance enterprises live in.</span></>}
          intro="Domain-led practices that complement the core pillars — bringing the regulatory knowledge, change management and industry best practice that separate enterprise-grade delivery from generic implementation."
        />

        <Reveal stagger=".prac-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {specializedPractices.map((p) => {
            const Icon = p.icon
            return (
              <a
                key={p.slug}
                href={`#/services/${p.slug}`}
                className="prac-card card-ink group flex flex-col p-7"
              >
                <span className="icon-tile-blue mb-5 h-12 w-12"><Icon className="h-5 w-5 text-white/85" /></span>
                <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-brand-blue">{p.title}</h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-white/55">{p.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white/45 transition-all group-hover:gap-3.5 group-hover:text-white">
                  View practice <IconArrowRight className="h-3.5 w-3.5 text-brand-blue" />
                </span>
              </a>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── ENGAGEMENT MODEL (dark raised) ────────────── */

function EngagementModel() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <Aurora className="opacity-60" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="How we engage"
          counter="03 / 03"
          title={<>A land-and-expand model, <span className="text-gradient-brand">built to de-risk.</span></>}
          intro="We start small, prove value fast, then scale across the enterprise — so every step earns the next. The same methodology spans a 12-week proof-of-value and a multi-year transformation program."
        />
        <Reveal stagger=".step" className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/[0.04] md:grid-cols-2 lg:grid-cols-4">
          {engagementModel.map((s) => (
            <div key={s.no} className="step group relative bg-ink-900/70 p-8 transition-colors duration-500 hover:bg-white/[0.03]">
              <span className="font-display text-5xl font-semibold text-white/15 transition-colors duration-500 group-hover:text-white/40">{s.no}</span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/55">{s.desc}</p>
              <div className="mt-6 h-px w-8 bg-grad-brand transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── WHY OUR SERVICES (light, StatBand proof) ────────────── */

function WhyOurServices() {
  return (
    <section id="why-services" className="surface-paper-warm relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Why our services"
          title={<>Built to scale. <span className="text-gradient-brand">Wired to execute.</span></>}
          intro="Six reasons the region's most demanding institutions trust Aptiva as a long-term delivery partner — and keep expanding the relationship."
        />

        <Reveal stagger=".why-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="why-card card-paper group flex flex-col p-8">
                <span className="icon-tile-light mb-6 h-12 w-12"><Icon className="h-5 w-5 text-brand-red transition-colors group-hover:text-white" /></span>
                <h3 className="font-display text-lg font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-900/55">{item.desc}</p>
              </div>
            )
          })}
        </Reveal>

        <BrandRule className="my-16" />

        <div className="surface-ink-flat relative overflow-hidden border border-white/10 p-8 md:p-12">
          <Reveal className="mb-10 flex items-center gap-3">
            <IconSparkle className="h-5 w-5 text-brand-red" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">Service delivery at a glance</span>
          </Reveal>
          <StatBand stats={statBand} />
        </div>
      </div>
    </section>
  )
}

/* ────────────── TECH / PARTNER MARQUEE (dark) ────────────── */

function TechMarquee() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow-blue">The stack we deliver on</span>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(22px,2.6vw,34px)] font-semibold leading-tight tracking-[-0.02em] text-white text-balance">
              Certified across <span className="text-gradient-blue">45 strategic platforms</span> — so we engineer with depth, not guesswork.
            </h2>
          </div>
          <a href="#/contact" className="btn-ghost group shrink-0">
            Discuss your stack<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      <div className="border-y border-white/10 py-8">
        <Marquee
          speed={42}
          items={techStack.map((t) => (
            <span className="font-display text-2xl font-semibold tracking-[-0.01em] text-white/35 transition-colors hover:text-white md:text-3xl">{t}</span>
          ))}
          separator={<span className="h-1.5 w-1.5 rounded-full bg-brand-blue/50" />}
        />
      </div>
    </section>
  )
}
