import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import StatBand from '../components/kit/StatBand'
import Marquee from '../components/kit/Marquee'
import CTASection from '../components/kit/CTASection'
import Accordion from '../components/interactive/Accordion'
import {
  IconArrowRight, IconArrowUpRight, IconBrain, IconCloud, IconShield,
  IconChart, IconHeadset, IconSettings, IconLightbulb, IconRocket,
  IconUsers, IconGlobe, IconAward, IconZap, IconHeartPulse, IconTrendingUp,
  IconLayers, IconSparkle,
} from '../components/Icons'

/* ────────────── DATA ────────────── */

const values = [
  { icon: IconBrain, title: 'Build, don\'t demo', desc: 'We ship agentic AI and automation into production for real institutions — not slideware. Your code runs where it counts.' },
  { icon: IconRocket, title: 'Ownership over hierarchy', desc: 'Small, senior squads own outcomes end-to-end. Initiative is rewarded; you\'re trusted with consequential work early.' },
  { icon: IconShield, title: 'Rigor as a default', desc: 'Banking, government and telecom clients demand audited quality. We engineer for security, compliance and uptime by habit.' },
  { icon: IconUsers, title: 'Mentorship that compounds', desc: 'Principal engineers and architects invest in you. Knowledge moves freely across 16 countries and every practice.' },
  { icon: IconGlobe, title: 'Regional impact', desc: 'The systems you build power banks, governments and operators that millions of people across MEA rely on daily.' },
  { icon: IconTrendingUp, title: 'Grow without a ceiling', desc: 'Dual tracks — deep technical or leadership — with clear progression from associate to principal and partner.' },
]

const benefits = [
  { icon: IconAward, title: 'Competitive compensation', desc: 'Market-leading salaries, annual performance bonuses and referral rewards.' },
  { icon: IconHeartPulse, title: 'Health & wellbeing', desc: 'Comprehensive medical insurance for you and your family, plus wellness support.' },
  { icon: IconLightbulb, title: 'Learning budget', desc: 'Dedicated annual budget for courses, conferences and books — plus protected learning time.' },
  { icon: IconShield, title: 'Certification sponsorship', desc: 'We fund and reward AWS, Azure, GCP, security and platform certifications.' },
  { icon: IconGlobe, title: 'Hybrid & remote', desc: 'Flexible working across our offices and remote, aligned to your role and clients.' },
  { icon: IconRocket, title: 'Relocation support', desc: 'Visa sponsorship and relocation assistance for UAE, KSA and other office locations.' },
  { icon: IconUsers, title: 'Real mentorship', desc: 'Structured onboarding, a dedicated buddy and ongoing 1:1s with senior engineers.' },
  { icon: IconZap, title: 'Frontier tooling', desc: 'Access to leading LLMs, cloud platforms and the latest AI/automation stack.' },
]

const teams = [
  {
    icon: IconBrain, name: 'AI & Automation', glow: 'red' as const,
    blurb: 'The team building agentic AI, GenAI and intelligent automation into production for regulated enterprises.',
    roles: [
      { title: 'Senior GenAI Engineer', loc: 'Dubai · Hybrid' },
      { title: 'Agentic AI / LLM Engineer', loc: 'Dubai · Remote' },
      { title: 'ML / RAG Platform Engineer', loc: 'RAK · Hybrid' },
      { title: 'Automation (RPA) Specialist', loc: 'Dubai · On-site' },
    ],
  },
  {
    icon: IconCloud, name: 'Cloud & Cybersecurity', glow: 'blue' as const,
    blurb: 'Multi-cloud migration, DevSecOps, SRE and zero-trust security for mission-critical workloads.',
    roles: [
      { title: 'Cloud Solutions Architect', loc: 'Riyadh · Hybrid' },
      { title: 'DevSecOps / SRE Engineer', loc: 'Riyadh · Hybrid' },
      { title: 'Cybersecurity Consultant (VAPT)', loc: 'Dubai · On-site' },
      { title: 'Platform / Infrastructure Engineer', loc: 'RAK · Hybrid' },
    ],
  },
  {
    icon: IconChart, name: 'Data & Analytics', glow: 'blue' as const,
    blurb: 'Data engineering, governance, BI and ML pipelines that turn enterprise data into decisions.',
    roles: [
      { title: 'Senior Data Engineer', loc: 'Dubai · Hybrid' },
      { title: 'Analytics / BI Consultant', loc: 'Dubai · Hybrid' },
      { title: 'Data Governance Lead', loc: 'Abu Dhabi · On-site' },
    ],
  },
  {
    icon: IconSettings, name: 'Content & Automation', glow: 'red' as const,
    blurb: 'Engineering our content-intelligence platforms — IDP, ECM and intelligent correspondence at scale.',
    roles: [
      { title: 'Full-Stack Engineer (Platforms)', loc: 'Hyderabad · Hybrid' },
      { title: 'Document Intelligence Engineer', loc: 'Dubai · Hybrid' },
      { title: 'QA / Quality Engineering Lead', loc: 'Hyderabad · Remote' },
    ],
  },
  {
    icon: IconLightbulb, name: 'Consulting', glow: 'red' as const,
    blurb: 'Business-value consultants and analysts who shape transformation roadmaps with our clients.',
    roles: [
      { title: 'Business Value Consultant', loc: 'Dubai · Hybrid' },
      { title: 'Senior Business Analyst', loc: 'Dubai · Hybrid' },
      { title: 'Solution / Enterprise Architect', loc: 'Dubai · Hybrid' },
    ],
  },
  {
    icon: IconHeadset, name: 'Managed Services & Delivery', glow: 'blue' as const,
    blurb: '24×7 managed services, AIOps and delivery leadership keeping enterprise systems running.',
    roles: [
      { title: 'Managed Services Engineer', loc: 'RAK · Shifts' },
      { title: 'Project / Delivery Manager', loc: 'Abu Dhabi · On-site' },
      { title: 'CX / CCaaS Specialist', loc: 'Dubai · Hybrid' },
    ],
  },
]

const locations = ['All', 'Dubai', 'Riyadh', 'Abu Dhabi', 'RAK', 'Hyderabad', 'Remote']

const process = [
  { no: '01', title: 'Application review', desc: 'A real engineer or practice lead reads your application — not just a keyword filter. We respond either way.' },
  { no: '02', title: 'Intro conversation', desc: 'A 30-minute call to understand your story, motivations and what you want to build next.' },
  { no: '03', title: 'Technical / craft round', desc: 'A practical, role-relevant assessment or working session — collaborative, not a gotcha.' },
  { no: '04', title: 'Team & values fit', desc: 'Meet your future colleagues and the hiring manager. We go deep on how we work and what good looks like.' },
  { no: '05', title: 'Offer & onboarding', desc: 'A clear offer, visa and relocation support where needed, and a structured first-90-days plan.' },
]

const growth = [
  { icon: IconLayers, title: 'Dual career tracks', desc: 'Choose a deep technical path to Principal or a leadership path to Practice Lead — both equally valued and compensated.' },
  { icon: IconAward, title: 'Funded certifications', desc: 'We sponsor and reward cloud, security and platform certifications, and give you time to prepare.' },
  { icon: IconBrain, title: 'Frontier AI exposure', desc: 'Work hands-on with the latest LLMs, agentic frameworks and automation tooling on real enterprise problems.' },
  { icon: IconUsers, title: 'Mentorship & guilds', desc: 'Internal guilds, brown-bags and principal-led mentoring move knowledge across all 16 countries we operate in.' },
]

const stats = [
  { value: '1,200+', label: 'Team members' },
  { value: '16', label: 'Countries' },
  { value: '30%', label: 'YoY growth' },
  { value: '11', label: 'Proprietary platforms' },
]

const marqueeWords = [
  'AGENTIC AI', 'CLOUD', 'CYBERSECURITY', 'DATA ENGINEERING', 'AUTOMATION',
  'CONSULTING', 'MANAGED SERVICES', 'QUALITY ENGINEERING', 'DIGITAL EXPERIENCE',
]

/* ────────────── PAGE ────────────── */

export default function Careers() {
  return (
    <div>
      <PageHeader
        label="CAREERS"
        title="Build the region's intelligent future"
        subtitle="Join the team engineering agentic AI, automation and digital transformation for the banks, governments and operators that move the Middle East and Africa."
        bgImage="/tech-abstract-2.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Careers' }]}
        stats={stats}
      />

      <WhyAptiva />
      <Values />
      <Benefits />
      <OpenRoles />
      <LifeAtAptiva />
      <Growth />
      <ProcessAndFaq />
      <CTASection
        eyebrow="Don't see your role?"
        title={<>Talented people are always <span className="text-gradient-brand">worth a conversation.</span></>}
        body="Send us your story and what you want to build next. If there's a fit — now or soon — we'll find it. We hire for trajectory, not just the current opening."
        primary={{ label: 'Apply / get in touch', href: '#/contact' }}
        secondary={{ label: 'careers@aptivacorp.ae', href: 'mailto:info@aptivacorp.ae' }}
      />
    </div>
  )
}

/* ────────────── WHY APTIVA (narrative) ────────────── */

function WhyAptiva() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <KineticBackdrop variant="orbit" color="red" opacity={0.22} className="left-1/2 w-[150%] -translate-x-1/2" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <Reveal stagger=".why-item">
            <span className="why-item eyebrow-red">Why Aptiva</span>
            <h2 className="why-item display-3 mt-5 text-white text-balance">
              Where the region's most ambitious engineers <span className="text-gradient-brand">do their best work.</span>
            </h2>
            <p className="why-item lead mt-6 max-w-xl text-white/65">
              For two decades, Aptiva has been the partner regulated institutions trust to modernize. Today we're channeling that
              into a single mission: bringing agentic AI and intelligent automation into production across the Middle East and Africa.
            </p>
            <p className="why-item mt-5 max-w-xl text-[15px] leading-relaxed text-white/55">
              That means the problems you'll solve are real and consequential — onboarding millions of bank customers, automating
              government correspondence at national scale, securing energy infrastructure. You'll work in small, senior squads with
              the autonomy to own outcomes, the mentorship to grow fast, and access to frontier tooling. No busywork, no theatre —
              just hard, meaningful engineering for clients who depend on it.
            </p>
            <div className="why-item mt-9 flex flex-wrap gap-4">
              <a href="#open-roles" className="btn-primary"><span>See open roles</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
              <a href="#/about" className="btn-ghost group">Our story<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            </div>
          </Reveal>

          <Reveal from="scale" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: 'url(/about-ai.jpg)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
                  <IconSparkle className="h-3.5 w-3.5 text-brand-red" /> Engineering for the institutions that matter
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <Marquee speed={40} items={marqueeWords.map((w) => (
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/30">{w}</span>
        ))} />
      </div>
    </section>
  )
}

/* ────────────── VALUES (light, TiltCard) ────────────── */

function Values() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="How we work"
          counter="01 / 05"
          title={<>The culture behind the <span className="text-gradient-brand">engineering.</span></>}
          intro="Six principles that shape how we hire, build and grow — the things we actually reward, not just the things we put on a wall."
        />
        <Reveal stagger=".value-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <TiltCard key={v.title} glow="red" className="value-card card-paper flex flex-col p-8">
                <span className="icon-tile-light mb-6 h-14 w-14"><Icon className="h-6 w-6 text-brand-red transition-colors group-hover:text-white" /></span>
                <h3 className="font-display text-xl font-semibold text-ink-900">{v.title}</h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-900/55">{v.desc}</p>
              </TiltCard>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── BENEFITS (dark) ────────────── */

function Benefits() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <Aurora className="opacity-55" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="What you get"
          counter="02 / 05"
          title={<>Benefits that back your <span className="text-gradient-brand">growth.</span></>}
          intro="We invest in the people who build for us — from compensation and health to the time and tooling to keep getting sharper."
        />
        <Reveal stagger=".benefit-card" className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <div key={b.title} className="benefit-card card-ink group flex flex-col p-7">
                <span className="icon-tile mb-5 h-12 w-12"><Icon className="h-5 w-5 text-white/85" /></span>
                <h3 className="font-display text-base font-semibold text-white">{b.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/55">{b.desc}</p>
                <div className="mt-5 h-px w-8 bg-grad-red transition-all duration-500 group-hover:w-14" />
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── OPEN ROLES (filterable) ────────────── */

function OpenRoles() {
  const [filter, setFilter] = useState('All')

  const visibleTeams = teams
    .map((t) => ({ ...t, roles: filter === 'All' ? t.roles : t.roles.filter((r) => r.loc.includes(filter)) }))
    .filter((t) => t.roles.length > 0)

  const total = teams.reduce((n, t) => n + t.roles.length, 0)

  return (
    <section id="open-roles" className="surface-ink-flat relative overflow-hidden scroll-mt-24">
      <div className="container-xl section-y">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Open roles"
            counter="03 / 05"
            title={<>Find where you <span className="text-gradient-brand">fit in.</span></>}
            intro={`${total} roles open across our practices — from agentic-AI engineering to cloud, security, data, consulting and managed services.`}
            className="md:max-w-2xl"
          />
        </div>

        <Reveal className="mt-12 flex flex-wrap gap-2.5">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setFilter(loc)}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-all duration-200 ${
                filter === loc
                  ? 'bg-grad-brand text-white'
                  : 'border border-white/12 bg-white/[0.03] text-white/55 hover:border-white/30 hover:text-white'
              }`}
            >
              {loc}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 space-y-10">
          {visibleTeams.map((team) => {
            const Icon = team.icon
            return (
              <Reveal key={team.name} stagger=".role-row">
                <div className="mb-4 flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center ${team.glow === 'blue' ? 'icon-tile-blue' : 'icon-tile'}`}>
                    <Icon className="h-5 w-5 text-white/85" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{team.name}</h3>
                    <p className="hidden text-[13px] text-white/50 sm:block">{team.blurb}</p>
                  </div>
                </div>
                <div className="border-t border-white/10">
                  {team.roles.map((role) => (
                    <a
                      key={role.title}
                      href="#/contact"
                      className="role-row group flex items-center justify-between gap-4 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.025]"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
                        <span className="font-display text-lg font-semibold text-white transition-colors group-hover:text-brand-red md:text-xl">{role.title}</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">{role.loc} · Full-time</span>
                      </div>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white/45 transition-all group-hover:gap-3.5 group-hover:text-white">
                        Apply<IconArrowRight className="h-4 w-4" />
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>
            )
          })}

          {visibleTeams.length === 0 && (
            <Reveal className="card-ink flex flex-col items-start gap-4 p-9">
              <span className="icon-tile h-12 w-12"><IconGlobe className="h-6 w-6 text-white/85" /></span>
              <h3 className="font-display text-xl font-semibold text-white">No roles in {filter} right now.</h3>
              <p className="max-w-md text-[14px] leading-relaxed text-white/55">
                We're growing fast and new roles open every month. Send us your details and we'll reach out when something fits.
              </p>
              <a href="#/contact" className="btn-ghost mt-1">Submit your profile</a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

/* ────────────── LIFE AT APTIVA (imagery) ────────────── */

function LifeAtAptiva() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Life at Aptiva"
          counter="04 / 05"
          title={<>People who build, <span className="text-gradient-brand">together.</span></>}
          intro="Senior teams, real autonomy and a culture that travels across every office and time zone we work in."
        />
        <Reveal stagger=".life-tile" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="life-tile group relative flex min-h-[360px] flex-col justify-end overflow-hidden border border-ink-900/10">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url(/about-office.jpg)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-transparent" />
            <div className="relative z-10 p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-red">Our offices</span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">Hubs across the region</h3>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/70">
                From our Ras Al-Khaimah HQ to Dubai, Abu Dhabi and Riyadh — modern spaces built for focused, collaborative engineering.
              </p>
            </div>
          </div>
          <div className="life-tile group relative flex min-h-[360px] flex-col justify-end overflow-hidden border border-ink-900/10">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url(/about-global.jpg)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-transparent" />
            <div className="absolute inset-0 bg-grad-blue opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-25" />
            <div className="relative z-10 p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-blue">One global team</span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">16 countries, one culture</h3>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/70">
                Cross-border squads, shared guilds and knowledge that flows freely — you're never far from someone who's solved it before.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 surface-ink-flat relative overflow-hidden border border-white/10 p-8 md:p-10">
          <KineticBackdrop variant="mesh" color="blue" opacity={0.16} className="left-1/2 w-[160%] -translate-x-1/2" />
          <div className="relative z-10">
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">By the numbers</p>
            <StatBand
              color="blue"
              stats={[
                { to: 1200, suffix: '+', label: 'Engineers, consultants & specialists' },
                { to: 16, label: 'Countries across MEA & beyond' },
                { to: 30, suffix: '%', label: 'Year-on-year team growth' },
                { to: 50, suffix: '+', label: 'Enterprise clients served' },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────── GROWTH & LEARNING ────────────── */

function Growth() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <GridBackdrop />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Growth & learning"
          counter="05 / 05"
          title={<>We hire for trajectory, then <span className="text-gradient-brand">invest in it.</span></>}
          intro="Joining Aptiva is a step on a long path. Here's how we make sure you keep getting better — and keep being recognized for it."
        />
        <Reveal stagger=".growth-card" className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {growth.map((g) => {
            const Icon = g.icon
            return (
              <div key={g.title} className="growth-card card-ink group flex flex-col p-7">
                <span className="icon-tile mb-5 h-12 w-12"><Icon className="h-5 w-5 text-white/85" /></span>
                <h3 className="font-display text-lg font-semibold text-white">{g.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{g.desc}</p>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── PROCESS + FAQ ────────────── */

function ProcessAndFaq() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y">
        <SectionHeading
          eyebrow="Hiring process"
          title={<>A clear path, <span className="text-gradient-brand">start to offer.</span></>}
          intro="No mystery, no ghosting. Five steps, typically over two to three weeks — and you'll hear from a real person at every stage."
        />

        <Reveal stagger=".proc-step" className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/[0.04] md:grid-cols-3 lg:grid-cols-5">
          {process.map((s) => (
            <div key={s.no} className="proc-step group bg-ink-900/70 p-7 transition-colors duration-500 hover:bg-white/[0.03]">
              <span className="font-display text-4xl font-semibold text-white/15 transition-colors duration-500 group-hover:text-white/40">{s.no}</span>
              <h3 className="mt-4 font-display text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-white/55">{s.desc}</p>
              <div className="mt-5 h-px w-7 bg-grad-brand transition-all duration-500 group-hover:w-14" />
            </div>
          ))}
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow-red">Questions</span>
            <h3 className="display-3 mt-5 text-white text-balance">Good to <span className="text-gradient-brand">know.</span></h3>
            <p className="mt-5 text-[15px] leading-relaxed text-white/55">
              Still have a question? Email us at{' '}
              <a href="mailto:info@aptivacorp.ae" className="text-white underline decoration-brand-red/50 underline-offset-4 hover:text-brand-red">info@aptivacorp.ae</a>{' '}
              and a member of our talent team will help.
            </p>
          </Reveal>
          <Reveal>
            <Accordion items={[
              { title: 'What is the recruitment process like?', content: <p>Application review, an intro conversation, a practical role-relevant assessment, a team & values round, then an offer. It typically takes two to three weeks, and a real person responds at every stage.</p> },
              { title: 'Do you offer remote or hybrid work?', content: <p>Yes. Many roles are hybrid or fully remote depending on the position and client requirements. We have people working across the UAE, KSA, Oman, Kenya and India.</p> },
              { title: 'Do you sponsor visas and relocation?', content: <p>We sponsor employment visas for the UAE, KSA and other locations where we have offices, and provide relocation support for international hires.</p> },
              { title: 'What does career growth look like?', content: <p>Two equally-valued tracks — a deep technical path to Principal and a leadership path to Practice Lead — with clear progression criteria, funded certifications and principal-led mentorship.</p> },
              { title: 'I don\'t see a role that fits. Can I still apply?', content: <p>Absolutely. We hire for trajectory and new roles open every month. Send your details via the contact page and we\'ll reach out when there\'s a fit.</p> },
              { title: 'What technologies will I work with?', content: <p>Frontier LLMs and agentic frameworks, major cloud platforms (AWS, Azure, GCP), modern data and automation stacks, and our own proprietary content-intelligence platforms — applied to real enterprise problems.</p> },
            ]} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
