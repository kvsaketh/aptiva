import { useEffect } from 'react'
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
  IconBrain, IconShield, IconRocket, IconAward, IconGlobe, IconUsers,
  IconTrendingUp, IconZap, IconLayers, IconBuilding, IconLandmark, IconAntenna,
  IconArrowRight, IconArrowUpRight, IconCheckCircle, IconSparkle,
} from '../components/Icons'

/* ────────────── DATA ────────────── */

const timeline = [
  { year: '2004', title: 'Founded in the UAE', desc: 'Aptiva is established in Dubai with a focused content-management and enterprise-capture practice — built to digitize the paper-heavy back offices of the region’s banks and ministries.' },
  { year: '2009', title: 'Banking & government depth', desc: 'Early flagship engagements across UAE financial services and public sector establish a reputation for delivery in audited, compliance-first environments.' },
  { year: '2013', title: 'Full-stack expansion', desc: 'The practice broadens from content into cloud, cybersecurity and data — the first step toward a single, accountable full-stack IT partnership.' },
  { year: '2016', title: 'Africa entry', desc: 'On-the-ground delivery extends into East and West Africa — Kenya, Tanzania, Egypt and beyond — opening a genuine ME + Africa dual-market footprint.' },
  { year: '2019', title: 'Proprietary IP portfolio', desc: 'A portfolio of purpose-built platforms takes shape — correspondence, archival, lending and procurement products that accelerate delivery and create switching cost.' },
  { year: '2021', title: 'GenAI & automation first-mover', desc: 'Aptiva moves early on LLMs, RAG and intelligent automation — putting production AI into regulated workflows before the market caught up.' },
  { year: 'Today', title: 'Agentic AI at enterprise scale', desc: '1,200+ specialists across 16 countries deploy autonomous agents, custom models and intelligent automation for 50+ enterprise clients.' },
]

const principles = [
  { icon: IconShield, title: 'Trust is the product', desc: 'In banking, government and energy, credibility is earned in audit logs and uptime — not slideware. We engineer for compliance, security and accountability from the first sprint.' },
  { icon: IconRocket, title: 'Prove value before scale', desc: 'Our land-and-expand model starts with one focused, measurable outcome — then compounds across the enterprise as confidence grows. Every step earns the next.' },
  { icon: IconBrain, title: 'AI in production, not theory', desc: 'We treat Agentic AI and GenAI as operational systems: governed, observable and wired into real processes — autonomously executing work, not just demonstrating it.' },
  { icon: IconUsers, title: 'One accountable partner', desc: 'Content, cloud, security, data and AI under a single relationship. No finger-pointing across vendors — one team owns the outcome end to end.' },
  { icon: IconGlobe, title: 'Regional fluency, global rigor', desc: 'Two decades on the ground across the Middle East and Africa, paired with delivery standards and engineering discipline that meet any global benchmark.' },
  { icon: IconTrendingUp, title: 'Outcomes over outputs', desc: 'We measure success in cycle-time, cost, risk and revenue — the metrics our clients are measured on — not in tickets closed or hours billed.' },
]

const differentiators = [
  { num: '01', icon: IconTrendingUp, title: 'Land & Expand Model', desc: 'Start with one project, prove value, then grow across the enterprise — from content to security to cloud to AI.' },
  { num: '02', icon: IconLayers, title: 'Full-Stack IT Partner', desc: 'One relationship for everything: content, security, cloud, data and AI — without fragmented vendor management.' },
  { num: '03', icon: IconShield, title: 'Regulated-Industry DNA', desc: 'Deep, audited expertise in banking, government, telecom, energy and real estate — where compliance is non-negotiable.' },
  { num: '04', icon: IconRocket, title: 'GenAI & Agentic First-Mover', desc: 'Pioneers in enterprise AI — LLMs, agentic workflows, custom models and RAG, deployed in production before the market caught up.' },
  { num: '05', icon: IconAward, title: 'Multi-OEM Independence', desc: 'Vendor-agnostic recommendations backed by 45 strategic partnerships including OpenText, UiPath, Oracle and Microsoft.' },
  { num: '06', icon: IconGlobe, title: 'ME + Africa Dual-Market', desc: 'Two decades of regional expertise across UAE, KSA, Kenya, Oman, Egypt and beyond — 16 countries and counting.' },
  { num: '07', icon: IconUsers, title: 'Boutique Agility at Scale', desc: 'Boutique responsiveness with enterprise delivery muscle — the speed of a specialist with the depth of a systems integrator.' },
  { num: '08', icon: IconZap, title: '11-Strong Solution Portfolio', desc: 'Proprietary IP that creates switching cost and recurring revenue — from Corroflow to Gazelens.' },
]

const aiCapabilities = [
  'AGENTIC AI', 'GENERATIVE AI', 'CUSTOM LLMs', 'RAG INFRASTRUCTURE', 'INTELLIGENT AUTOMATION',
  'CONVERSATIONAL AI', 'RPA AT SCALE', 'AIOps', 'DIGITAL TRANSFORMATION', 'PROCESS MINING',
]

const regions = [
  { icon: IconBuilding, name: 'United Arab Emirates', detail: 'Headquarters & primary delivery hub — banking, government and energy.' },
  { icon: IconLandmark, name: 'Saudi Arabia', detail: 'Vision-2030 aligned transformation across public sector and financial services.' },
  { icon: IconGlobe, name: 'East Africa', detail: 'Kenya, Tanzania and the wider region — banking modernization and digital services.' },
  { icon: IconAntenna, name: 'North & West Africa', detail: 'Egypt and beyond — telecom, content intelligence and citizen-facing platforms.' },
]

const leadershipPeek = [
  { name: 'Swamy VLN Boyapati', role: 'Executive Director & CEO', img: '/portrait-swamy.jpg' },
  { name: 'Bader Maktabi', role: 'Director, Middle East Operations', img: '/portrait-bader.jpg' },
  { name: 'George Avvaru', role: 'VP, Delivery & Operations', img: '/portrait-george.jpg' },
]

/* ────────────── PAGE ────────────── */

export default function About() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <div>
      <PageHeader
        label="About Aptiva"
        title="Engineered for the AI era"
        subtitle="A full-stack IT and digital-transformation partner for the Middle East and Africa — pairing two decades of regulated-industry delivery with a first-mover edge in Agentic AI and intelligent automation."
        bgImage="/about-hero.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'About' }]}
        stats={[
          { value: '~20 yrs', label: 'Of regional delivery' },
          { value: '16', label: 'Countries, two continents' },
          { value: '1,200+', label: 'Engineers & specialists' },
          { value: '11', label: 'Proprietary solutions' },
        ]}
      />

      <Story />
      <Thesis />
      <Timeline />
      <Principles />
      <Differentiators />
      <AiLeadership />
      <Global />
      <LeadershipTeaser />

      <CTASection
        eyebrow="Partner with Aptiva"
        title={<>Let’s build the <span className="text-gradient-brand">intelligent enterprise</span> together.</>}
        body="From a first focused engagement to enterprise-wide transformation — talk to the team trusted by the region’s most demanding institutions."
        primary={{ label: 'Start a conversation', href: '#/contact' }}
        secondary={{ label: 'Explore our services', href: '#/services' }}
      />
    </div>
  )
}

/* ────────────── STORY (light) ────────────── */

function Story() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading
              theme="light"
              eyebrow="Our story"
              title={<>A digital-native partner, <span className="text-gradient-brand">built for the modern enterprise.</span></>}
            />
            <Reveal stagger=".story-p" className="mt-8 space-y-5">
              <p className="story-p lead text-ink-900/70">
                Aptiva Technologies was founded on a singular conviction: that the institutions powering the Middle East and Africa
                deserve a technology partner built for their reality — not a legacy systems integrator that bolted on digital
                capabilities after the fact. We are a digital-native enterprise, purpose-built from day one to close the technology
                gap across two of the world’s fastest-evolving regions.
              </p>
              <p className="story-p text-[15.5px] leading-relaxed text-ink-900/65">
                Over nearly two decades we have grown from a focused content-management practice into a full-stack IT and
                digital-transformation partner — delivering across six core pillars and six specialized practices, backed by 1,200+
                engineers, 45 strategic partnerships and 11 proprietary enterprise solutions. Our work spans the most demanding,
                regulated environments on earth: central banks and tier-one lenders, national telecom operators, government
                ministries and the energy infrastructure that keeps economies running.
              </p>
              <p className="story-p text-[15.5px] leading-relaxed text-ink-900/65">
                Today Aptiva sits at the forefront of the Agentic AI revolution — deploying autonomous agents, custom LLMs and
                intelligent automation that don’t merely assist but execute complex business processes end to end. The mission has
                never changed: deliver purpose-built technology that creates measurable business value and enduring competitive
                advantage for the clients who trust us.
              </p>
            </Reveal>
          </div>

          <Reveal stagger=".story-card" className="grid grid-cols-1 gap-4 self-start">
            <TiltCard glow="red" className="story-card card-paper overflow-hidden p-0">
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url(/about-ai.jpg)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              </div>
              <div className="p-7">
                <span className="icon-tile-light mb-4 h-11 w-11"><IconBrain className="h-5 w-5 text-brand-red transition-colors group-hover:text-white" /></span>
                <h3 className="font-display text-lg font-semibold text-ink-900">Agentic AI & automation at our core</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-900/60">LLMs, agentic workflows, RAG, conversational AI and RPA — intelligent automation that autonomously executes complex business processes.</p>
              </div>
            </TiltCard>
            <TiltCard glow="blue" className="story-card card-paper overflow-hidden p-0">
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url(/about-partners.jpg)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              </div>
              <div className="p-7">
                <span className="icon-tile-blue-light mb-4 h-11 w-11"><IconLayers className="h-5 w-5 text-brand-blue transition-colors group-hover:text-white" /></span>
                <h3 className="font-display text-lg font-semibold text-ink-900">45 strategic partnerships</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-900/60">Deep alliances with OpenText, UiPath, Oracle, Microsoft and 40 more — vendor-agnostic, recommendation-driven, results-focused.</p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ────────────── FULL-STACK THESIS (dark) ────────────── */

function Thesis() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <KineticBackdrop variant="flow" color="blue" opacity={0.4} />
      <div className="container-xl section-y relative z-10">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="The full-stack thesis"
            title={<>One accountable partner across the <span className="text-gradient-blue">entire stack.</span></>}
            intro="Enterprises don’t fail at transformation because they lack vendors — they fail because no one owns the whole. Aptiva is engineered to be that single, accountable partner."
          />
          <Reveal stagger=".thesis-p" className="space-y-5 lg:pt-4">
            <p className="thesis-p text-[15.5px] leading-relaxed text-white/65">
              The typical enterprise juggles a content vendor, a cloud vendor, a security vendor, a data vendor and an AI vendor —
              each optimizing for their slice, none accountable for the outcome. The result is integration debt, finger-pointing and
              transformation that stalls between the lines on the org chart.
            </p>
            <p className="thesis-p text-[15.5px] leading-relaxed text-white/65">
              Aptiva collapses that complexity into one relationship. Content and document intelligence, cloud and cybersecurity,
              data and analytics, customer experience, the digital workplace — and the GenAI and agentic automation that ties them
              together — delivered by specialists who have done it before, under a single line of accountability.
            </p>
            <div className="thesis-p mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'Content & document intelligence',
                'Cloud, infrastructure & cybersecurity',
                'Data, analytics & ML engineering',
                'GenAI, Agentic AI & automation',
              ].map((t) => (
                <div key={t} className="flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-3.5">
                  <IconCheckCircle className="h-4 w-4 shrink-0 text-brand-blue" />
                  <span className="text-[13.5px] text-white/80">{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <StatBand
            color="blue"
            stats={[
              { to: 6, suffix: '', label: 'Core capability pillars' },
              { to: 6, suffix: '', label: 'Specialized practices' },
              { to: 45, suffix: '', label: 'Strategic technology partners' },
              { to: 50, prefix: '', suffix: '+', label: 'Enterprise clients served' },
            ]}
          />
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── TIMELINE (light) ────────────── */

function Timeline() {
  return (
    <section className="surface-paper-warm relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Two decades in"
          counter="2004 → today"
          title={<>From content practice to <span className="text-gradient-brand">Agentic AI leader.</span></>}
          intro="A steady, compounding expansion — broadening capability and geography while never losing the regulated-industry discipline we were built on."
        />

        <Reveal stagger=".tl-item" className="relative mt-16">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-900/15 md:left-1/2" aria-hidden />
          <div className="space-y-10">
            {timeline.map((m, i) => (
              <div key={m.year} className={`tl-item relative pl-10 md:grid md:grid-cols-2 md:items-center md:gap-12 md:pl-0 ${i % 2 ? 'md:[direction:rtl]' : ''}`}>
                <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-grad-brand ring-4 ring-paper-warm md:left-1/2 md:-translate-x-1/2" aria-hidden />
                <div className={`[direction:ltr] ${i % 2 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                  <span className="font-display text-4xl font-semibold text-gradient-brand md:text-5xl">{m.year}</span>
                </div>
                <div className="[direction:ltr] mt-1 md:mt-0">
                  <h3 className="font-display text-lg font-semibold text-ink-900">{m.title}</h3>
                  <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-ink-900/60">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── PRINCIPLES / VALUES (dark) ────────────── */

function Principles() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <Aurora className="opacity-60" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="What we believe"
          title={<>The principles that <span className="text-gradient-brand">govern every engagement.</span></>}
          intro="Not posters on a wall — the operating beliefs that shape how we architect, deliver and stand behind our work."
        />
        <Reveal stagger=".pr-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon
            return (
              <TiltCard key={p.title} glow="red" className="pr-card card-ink flex flex-col p-8">
                <span className="icon-tile mb-6 h-12 w-12"><Icon className="h-5 w-5 text-white/85" /></span>
                <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{p.desc}</p>
                <div className="mt-6 h-px w-9 bg-grad-brand transition-all duration-500 group-hover:w-16" />
              </TiltCard>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── DIFFERENTIATORS (light) ────────────── */

function Differentiators() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="What makes us different"
          title={<>Eight reasons the region’s leaders <span className="text-gradient-brand">choose Aptiva.</span></>}
          intro="The combination is the moat: full-stack accountability, regulated-industry depth, proprietary IP and a genuine head start in enterprise AI."
        />
        <Reveal stagger=".diff-card" className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d) => {
            const Icon = d.icon
            return (
              <div key={d.num} className="diff-card card-paper group flex flex-col p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="icon-tile-light h-11 w-11"><Icon className="h-5 w-5 text-brand-red transition-colors group-hover:text-white" /></span>
                  <span className="font-display text-3xl font-semibold text-ink-900/10 transition-colors group-hover:text-ink-900/25">{d.num}</span>
                </div>
                <h3 className="font-display text-[16px] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-red">{d.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-900/55">{d.desc}</p>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── AI LEADERSHIP BAND (dark) ────────────── */

function AiLeadership() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <KineticBackdrop variant="orbit" color="red" opacity={0.4} className="left-1/2 w-[120%] -translate-x-1/2" />
      <div className="container-xl section-y relative z-10">
        <Reveal stagger=".ai-item" className="mx-auto max-w-4xl text-center">
          <span className="ai-item eyebrow-red mx-auto w-fit"><span className="inline-flex items-center gap-2"><IconSparkle className="h-3.5 w-3.5" />Where we lead</span></span>
          <h2 className="ai-item display-2 mt-6 text-white text-balance">
            Agentic AI, GenAI and intelligent automation — <span className="text-gradient-brand">in production, at enterprise scale.</span>
          </h2>
          <p className="ai-item lead mt-6 text-white/65">
            We moved early and we ship for real. Autonomous agents that execute multi-step processes, custom LLMs grounded in
            enterprise knowledge through RAG, conversational AI and RPA — governed, observable and woven into the regulated
            workflows of banks, operators and ministries. This is the heart of how Aptiva makes digital transformation tangible.
          </p>
          <div className="ai-item mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#/services/ai-automation" className="btn-primary"><span>Explore AI & automation</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
            <a href="#/solutions" className="btn-ghost group">See our platforms<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 border-y border-white/10 py-5">
        <Marquee
          items={aiCapabilities.map((w) => (
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/35">{w}</span>
          ))}
        />
      </div>
    </section>
  )
}

/* ────────────── GLOBAL PRESENCE (light) ────────────── */

function Global() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              theme="light"
              eyebrow="Global presence"
              title={<>A genuine <span className="text-gradient-brand">ME + Africa</span> footprint.</>}
              intro="Sixteen countries across two continents — not flags on a map, but on-the-ground delivery teams who understand the regulators, languages and realities of each market."
            />
            <Reveal className="mt-8">
              <a href="#/contact" className="btn-dark group">Find your nearest team<IconArrowRight className="h-4 w-4" /></a>
            </Reveal>
          </div>

          <Reveal stagger=".region-card" className="self-start">
            <div className="relative mb-5 h-52 overflow-hidden border border-ink-900/10">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/about-global.jpg)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {regions.map((r) => {
                const Icon = r.icon
                return (
                  <div key={r.name} className="region-card card-paper group flex flex-col p-6">
                    <span className="icon-tile-blue-light mb-4 h-10 w-10"><Icon className="h-5 w-5 text-brand-blue transition-colors group-hover:text-white" /></span>
                    <h3 className="text-[15px] font-semibold text-ink-900">{r.name}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-900/55">{r.detail}</p>
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

/* ────────────── LEADERSHIP TEASER (dark) ────────────── */

function LeadershipTeaser() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <BrandRule />
      <GridBackdrop />
      <div className="container-xl section-y relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="The people behind it"
            title={<>Led by operators who have <span className="text-gradient-brand">done it before.</span></>}
            className="md:max-w-2xl"
          />
          <Reveal>
            <a href="#/leadership" className="btn-ghost group shrink-0">Meet the leadership<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </Reveal>
        </div>

        <Reveal stagger=".peek-card" className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {leadershipPeek.map((p) => (
            <a key={p.name} href="#/leadership" className="peek-card group relative block min-h-[320px] overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${p.img})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-lg font-semibold text-white">{p.name}</h3>
                <p className="mt-1 text-[12.5px] font-medium text-brand-red">{p.role}</p>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
