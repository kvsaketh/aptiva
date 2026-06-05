import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { GridBackdrop, Grain, Aurora } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import StatBand from '../components/kit/StatBand'
import Marquee from '../components/kit/Marquee'
import CTASection from '../components/kit/CTASection'
import BrandMark from '../components/BrandMark'
import { clients } from '../data/brands'
import {
  IconBuilding, IconAntenna, IconLandmark, IconZap, IconConstruction, IconHeartPulse,
  IconArrowRight, IconArrowUpRight, IconBrain, IconShield, IconFileCheck, IconChart,
  IconCloud, IconLayers,
} from '../components/Icons'

/* ────────────── DATA ────────────── */

const industries = [
  {
    slug: 'banking',
    name: 'Banking & Financial Services',
    icon: IconBuilding,
    img: '/industry-banking.jpg',
    tagline: 'Core modernization, lending & onboarding',
    blurb: 'Agentic onboarding, intelligent lending and compliant content for the region’s leading banks and NBFCs.',
    span: 'lg:col-span-2',
  },
  {
    slug: 'telecom',
    name: 'Telecommunications',
    icon: IconAntenna,
    img: '/industry-telecom.jpg',
    tagline: 'OSS/BSS, CX & network intelligence',
    blurb: 'AI-driven assurance, omni-channel CX and content platforms for national operators at carrier scale.',
    span: '',
  },
  {
    slug: 'government',
    name: 'Government & Public Sector',
    icon: IconLandmark,
    img: '/industry-government.jpg',
    tagline: 'Citizen services, digital-by-default',
    blurb: 'Secure content, intelligent correspondence and digital identity for sovereign, citizen-first government.',
    span: '',
  },
  {
    slug: 'energy',
    name: 'Energy, Oil & Gas',
    icon: IconZap,
    img: '/industry-energy.jpg',
    tagline: 'Critical infrastructure & HSE intelligence',
    blurb: 'Zero-trust security, AIOps and asset intelligence for mission-critical, 24×7 industrial operations.',
    span: 'lg:col-span-2',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate & Construction',
    icon: IconConstruction,
    img: '/industry-real-estate.jpg',
    tagline: 'PropTech, CLM & project intelligence',
    blurb: 'Unified project content, CLM and luxury-grade buyer journeys for the region’s top developers.',
    span: '',
  },
  {
    slug: 'insurance',
    name: 'Insurance & Healthcare',
    icon: IconHeartPulse,
    img: '/industry-healthcare.jpg',
    tagline: 'Claims automation & member experience',
    blurb: 'Touchless claims, fraud analytics and compliant member data platforms for payers and providers.',
    span: '',
  },
]

const capabilities = [
  {
    icon: IconBrain,
    title: 'Agentic AI & GenAI',
    desc: 'Domain-tuned LLMs, agentic workflows and RAG that automate the document-heavy, decision-heavy work at the core of every regulated business.',
    tags: ['LLM', 'Agents', 'RAG'],
  },
  {
    icon: IconFileCheck,
    title: 'Content & Document Intelligence',
    desc: 'Enterprise content platforms, intelligent capture and digital archival with retention, audit and compliance governance built in.',
    tags: ['ECM', 'IDP', 'Archival'],
  },
  {
    icon: IconShield,
    title: 'Cybersecurity & Trust',
    desc: 'Zero-trust architecture, 24×7 SOC, continuous VAPT and digital signing — engineered for sectors where a breach is existential.',
    tags: ['Zero-trust', 'SOC', 'VAPT'],
  },
  {
    icon: IconCloud,
    title: 'Cloud, Infra & Resilience',
    desc: 'Sovereign and multi-cloud migration, DevSecOps and SRE delivering the availability SLAs that regulated workloads demand.',
    tags: ['Multi-cloud', 'SRE', 'DevSecOps'],
  },
  {
    icon: IconChart,
    title: 'Data & Analytics',
    desc: 'Governed data platforms, ML pipelines and real-time decisioning that turn regulatory reporting from a burden into an advantage.',
    tags: ['BI', 'ML', 'Governance'],
  },
  {
    icon: IconLayers,
    title: 'Proprietary Solution IP',
    desc: 'Eleven enterprise platforms — Corroflow, Kredence, Vaultera, Procuria and more — pre-mapped to sector workflows and compliance.',
    tags: ['11 Platforms', 'Pre-built', 'Localized'],
  },
]

const regulators = [
  'CBUAE', 'SAMA', 'CBO', 'CBK', 'DHA', 'IA (UAE)', 'RERA', 'IAEA', 'ISO 27001',
  'NESA / SIA', 'PDPL', 'UAE Pass', 'Basel III/IV', 'AML / CFT',
]

const proofStats = [
  { to: 50, suffix: '+', label: 'Enterprise clients across regulated sectors' },
  { to: 16, label: 'Countries served across the Middle East & Africa' },
  { to: 20, suffix: ' yrs', label: 'Of audited regulated-industry delivery' },
  { to: 99.95, decimals: 2, suffix: '%', label: 'Uptime on mission-critical platforms' },
]

const dna = [
  {
    no: '01',
    title: 'We speak compliance fluently',
    desc: 'Our teams sit with risk officers, regulators and auditors. Compliance-by-design, audit trails and evidence packs are part of delivery — not an afterthought.',
  },
  {
    no: '02',
    title: 'Production, not slideware',
    desc: 'Every AI, automation and content programme we ship runs under regulatory scrutiny in live operations — with the observability and controls to prove it.',
  },
  {
    no: '03',
    title: 'Region-native by default',
    desc: 'Arabic-first interfaces, data sovereignty, local hosting and integrations with UAE Pass and national rails are baked in across two continents.',
  },
  {
    no: '04',
    title: 'One accountable partner',
    desc: 'Content, cloud, security, data and AI under a single relationship — so there is no finger-pointing when an audit, incident or deadline lands.',
  },
]

const marqueeWords = [
  'AGENTIC AI', 'KYC AUTOMATION', 'CLAIMS ADJUDICATION', 'ZERO-TRUST', 'OSS / BSS',
  'INTELLIGENT CAPTURE', 'SOVEREIGN CLOUD', 'CONTRACT INTELLIGENCE', 'FRAUD ANALYTICS',
  'DIGITAL ONBOARDING', 'REGULATORY REPORTING', 'AIOPS',
]

/* ────────────── PAGE ────────────── */

export default function Industries() {
  return (
    <div>
      <PageHeader
        label="INDUSTRIES"
        title="Domain depth where stakes are highest"
        subtitle="Two decades inside the region’s most regulated, mission-critical sectors — pairing audited delivery with a first-mover edge in Agentic AI, automation and digital transformation."
        bgImage="/industry-banking.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Industries' }]}
        stats={[
          { value: '6', label: 'Core sectors' },
          { value: '50+', label: 'Enterprise clients' },
          { value: '16', label: 'Countries' },
          { value: '11', label: 'Proprietary platforms' },
        ]}
      />

      <RegulatedDNA />
      <IndustryGrid />
      <CrossCapability />
      <Proof />
      <ClientProof />

      <CTASection
        eyebrow="Your sector, our depth"
        title={<>Let’s build the system your <span className="text-gradient-brand">regulator will trust.</span></>}
        body="Tell us where the friction is — onboarding, claims, correspondence, compliance, uptime — and we’ll map a land-and-expand programme that de-risks every step."
        primary={{ label: 'Talk to a sector lead', href: '#/contact' }}
        secondary={{ label: 'Explore our solutions', href: '#/solutions' }}
      />
    </div>
  )
}

/* ────────────── REGULATED DNA (dark intro) ────────────── */

function RegulatedDNA() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="border-y border-white/10 py-4">
        <Marquee
          speed={42}
          items={marqueeWords.map((w) => (
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/30">{w}</span>
          ))}
        />
      </div>

      <div className="container-xl section-y">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal stagger=".dna-head">
              <span className="dna-head eyebrow-red">Regulated-industry DNA</span>
              <h2 className="dna-head display-2 mt-5 text-white text-balance">
                We don’t adapt to regulation. <span className="text-gradient-brand">We’re built around it.</span>
              </h2>
              <p className="dna-head lead mt-6 max-w-xl text-white/60">
                Aptiva exists for the institutions that move the Middle East and Africa forward — banks,
                ministries, operators, utilities and insurers where downtime, breaches and non-compliance
                are not options. We bring the workflows, controls and regional context that make enterprise
                technology survive an audit and scale in production.
              </p>
              <div className="dna-head mt-10 flex flex-wrap gap-4">
                <a href="#/services" className="btn-primary group"><span>Our capabilities</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
                <a href="#/case-studies" className="btn-ghost group">See the proof<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal stagger=".dna-item" className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/[0.04] sm:grid-cols-2">
              {dna.map((d) => (
                <div key={d.no} className="dna-item group bg-ink-900/70 p-7 transition-colors duration-500 hover:bg-white/[0.03]">
                  <span className="font-display text-4xl font-semibold text-white/15 transition-colors duration-500 group-hover:text-white/40">{d.no}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">{d.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/55">{d.desc}</p>
                  <div className="mt-5 h-px w-8 bg-grad-red transition-all duration-500 group-hover:w-16" />
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────── INDUSTRY GRID (light, premium image cards) ────────────── */

function IndustryGrid() {
  return (
    <section id="industries" className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Sectors we serve"
          counter="01 / 03"
          title={<>Six sectors. <span className="text-gradient-brand">One delivery standard.</span></>}
          intro="Each practice pairs deep domain fluency with our full-stack platform — so transformation lands with the compliance, security and scale the sector demands."
        />

        <Reveal stagger=".ind-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => {
            const Icon = ind.icon
            return (
              <TiltCard
                key={ind.slug}
                href={`#/industries/${ind.slug}`}
                glow="red"
                max={6}
                className={`ind-card flex min-h-[340px] flex-col justify-end overflow-hidden border border-ink-900/10 p-7 ${ind.span}`}
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${ind.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/15 transition-opacity duration-500 group-hover:via-ink-900/60" />
                <div className="absolute inset-0 bg-grad-red opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40" />
                <div className="relative z-10">
                  <span className="icon-tile mb-4 h-11 w-11"><Icon className="h-5 w-5 text-white" /></span>
                  <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/55">{ind.tagline}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">{ind.name}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-[13.5px] leading-relaxed text-white/0 transition-all duration-500 group-hover:max-h-28 group-hover:text-white/75">{ind.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70 transition-all group-hover:gap-3.5">Explore sector<IconArrowRight className="h-3.5 w-3.5 text-brand-red" /></span>
                </div>
              </TiltCard>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── CROSS-INDUSTRY CAPABILITY (dark) ────────────── */

function CrossCapability() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <KineticBackdrop variant="mesh" color="blue" opacity={0.4} />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Cross-industry capability"
          counter="02 / 03"
          title={<>The same engine, <span className="text-gradient-blue">tuned per sector.</span></>}
          intro="Whatever the vertical, the underlying capability set is shared — which is why a pattern proven in banking accelerates a programme in government, telecom or healthcare."
        />

        <Reveal stagger=".cap-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <TiltCard key={cap.title} glow="blue" max={7} className="cap-card card-ink flex flex-col p-8">
                <span className="icon-tile-blue mb-6 h-14 w-14"><Icon className="h-6 w-6 text-white/90" /></span>
                <h3 className="font-display text-lg font-semibold text-white">{cap.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/55">{cap.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cap.tags.map((t) => (
                    <span key={t} className="border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">{t}</span>
                  ))}
                </div>
              </TiltCard>
            )
          })}
        </Reveal>

        <Reveal className="mt-14">
          <div className="flex flex-col gap-4 border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Frameworks & regulators we engineer for</p>
            <div className="flex flex-wrap gap-2">
              {regulators.map((r) => (
                <span key={r} className="border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/55">{r}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── PROOF / STAT BAND (dark flat) ────────────── */

function Proof() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <Aurora className="opacity-50" />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Proof, not promises"
          counter="03 / 03"
          title={<>Trusted where failure <span className="text-gradient-brand">isn’t an option.</span></>}
          intro="The numbers behind two decades of regulated delivery across the Middle East and Africa."
        />
        <div className="mt-14">
          <StatBand stats={proofStats} color="red" />
        </div>
      </div>
    </section>
  )
}

/* ────────────── CLIENT PROOF (light, brand marks) ────────────── */

function ClientProof() {
  return (
    <section className="surface-paper-warm relative overflow-hidden">
      <div className="container-xl section-y">
        <SectionHeading
          theme="light"
          eyebrow="Who we serve"
          title={<>The institutions that <span className="text-gradient-brand">define the region.</span></>}
          intro="Banks, ministries, operators, utilities and developers across the GCC and East Africa trust Aptiva as a long-term transformation partner."
        />
        <Reveal stagger=".brand-cell" className="mt-14 flex flex-wrap gap-3">
          {clients.map((c) => (
            <div key={c.slug} className="brand-cell">
              <BrandMark brand={c} theme="light" />
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-12">
          <a href="#/case-studies" className="btn-dark group">Read the case studies<IconArrowRight className="h-4 w-4" /></a>
        </Reveal>
      </div>
    </section>
  )
}
