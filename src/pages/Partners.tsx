import { useEffect } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '@/components/motion/Atmosphere'
import KineticBackdrop from '@/components/kit/KineticBackdrop'
import TiltCard from '@/components/kit/TiltCard'
import StatBand from '@/components/kit/StatBand'
import Marquee from '@/components/kit/Marquee'
import CTASection from '@/components/kit/CTASection'
import BrandMark from '@/components/BrandMark'
import { partnerGroups, allPartners, brand } from '@/data/brands'
import type { Brand } from '@/data/brands'
import {
  IconCloud, IconDocument, IconBrain, IconShield, IconServer, IconGlobe,
  IconAward, IconRocket, IconLayers, IconCheckCircle,
  IconArrowRight, IconArrowUpRight, IconSparkle, IconSettings, IconUsers,
} from '@/components/Icons'

/* ──────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────── */

/* Map the six real brand groups to icons + a client-facing narrative. */
const groupMeta: Record<string, { icon: typeof IconCloud; blurb: string; tags: string[] }> = {
  'Hyperscalers & Cloud': {
    icon: IconCloud,
    blurb: 'Certified architects across the leading public clouds — designing resilient, cost-optimized landing zones with sovereign-data residency for regulated workloads.',
    tags: ['Well-Architected', 'Sovereign Cloud', 'FinOps'],
  },
  'Content, Data & EIM': {
    icon: IconDocument,
    blurb: 'The enterprise information backbone — ECM, intelligent capture, governance, eDiscovery and EPM platforms that turn unstructured content into governed, queryable assets.',
    tags: ['ECM', 'IDP', 'Governance'],
  },
  'AI & Automation': {
    icon: IconBrain,
    blurb: 'GenAI, agentic orchestration and RPA at scale — production document understanding, conversational AI and process mining wired into core systems of record.',
    tags: ['Agentic AI', 'RPA', 'Process Mining'],
  },
  'Cybersecurity & Trust': {
    icon: IconShield,
    blurb: 'Zero-trust, continuous exposure management and digital-trust services — XDR, NAC, vulnerability management and PKI engineered for audited, high-stakes environments.',
    tags: ['Zero Trust', 'XDR', 'PKI'],
  },
  'Infrastructure & Observability': {
    icon: IconServer,
    blurb: 'The platform layer — enterprise networking, hyperconverged infrastructure, Kubernetes and full-stack observability that keeps mission-critical systems fast and visible.',
    tags: ['HCI', 'Kubernetes', 'Observability'],
  },
  'Global SIs & Regional': {
    icon: IconGlobe,
    blurb: 'Co-delivery alliances and regional sovereign-cloud providers — extending capacity and local compliance reach across the Middle East and Africa.',
    tags: ['Co-delivery', 'Regional', 'Sovereign'],
  },
}

const counterFor = (i: number) => `${String(i + 1).padStart(2, '0')} / ${String(partnerGroups.length).padStart(2, '0')}`

/* Flagship / priority alliances (preserved from the original page). */
const flagshipSlugs = ['opentext', 'uipath', 'oracle', 'unifyapps', 'microsoft']

/* Partner tiers / certifications. */
const tiers = [
  {
    icon: IconAward,
    tier: 'Diamond & Elite',
    partners: 'UiPath · OpenText · Oracle',
    desc: 'Top-tier status earned through 50+ production implementations, certified delivery teams and reference customers in banking and government.',
    accent: 'red' as const,
  },
  {
    icon: IconRocket,
    tier: 'Premier & Advanced',
    partners: 'Microsoft · AWS · Google Cloud · CrowdStrike',
    desc: 'Advanced-tier competencies across cloud, data and security — early roadmap access, joint go-to-market and preferential client pricing.',
    accent: 'blue' as const,
  },
  {
    icon: IconCheckCircle,
    tier: 'Certified & Authorized',
    partners: 'Tenable · Cisco · Dell · Automation Anywhere',
    desc: 'Authorized resale, implementation and managed-service rights backed by accredited engineers and platform-specific certifications.',
    accent: 'red' as const,
  },
]

/* Capabilities the alliance ecosystem unlocks. */
const allianceValue = [
  { icon: IconLayers, title: 'Multi-Vendor Orchestration', desc: 'We compose hyperscaler, content, AI and security platforms into one accountable, integrated solution — no finger-pointing across vendors.' },
  { icon: IconSparkle, title: 'Early Roadmap Access', desc: 'Top-tier status gives our clients beta features, design-partner programs and influence over product direction before general availability.' },
  { icon: IconSettings, title: 'Certified Delivery Pods', desc: '200+ accredited consultants — solution architects, RPA developers and security engineers — certified across the full partner stack.' },
  { icon: IconUsers, title: 'Co-Innovation Centers', desc: 'Joint innovation labs with OpenText and others build region-specific accelerators for banking, government and real estate.' },
]

/* "How we partner" methodology. */
const engagement = [
  { no: '01', title: 'Evaluate & Match', desc: 'We assess the requirement against the full alliance portfolio and select the platform — or combination — that best fits the outcome, not the commission.' },
  { no: '02', title: 'Architect & License', desc: 'Reference architecture, right-sized licensing and a commercial structure negotiated through our partner tier for the best total cost of ownership.' },
  { no: '03', title: 'Implement & Certify', desc: 'Certified delivery pods build to vendor best-practice, with security and compliance reviews baked into every sprint.' },
  { no: '04', title: 'Operate & Optimize', desc: 'Managed services, vendor-escalation paths and continuous optimization keep the platform current as roadmaps evolve.' },
]

/* Become-a-partner tracks. */
const partnerTracks = [
  { icon: IconRocket, title: 'Technology ISVs', desc: 'Embed your platform into our solution portfolio and reach 50+ enterprise clients across 16 countries with certified delivery and local support.' },
  { icon: IconGlobe, title: 'Regional Resellers', desc: 'Extend your geographic reach with our implementation muscle, managed services and regulated-industry credentials across ME & Africa.' },
  { icon: IconLayers, title: 'Global System Integrators', desc: 'Co-deliver large transformation programs — we bring regional depth, you bring scale, clients get one seamless team.' },
]

export default function Partners() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const flagship: Brand[] = flagshipSlugs.map(brand)

  return (
    <div>
      <PageHeader
        label="Strategic Partners"
        title="Best-in-class technology, one accountable partner."
        subtitle="Deep technical alliances across cloud, content, AI, automation, cybersecurity and infrastructure — orchestrated into outcomes for the Middle East and Africa's most demanding institutions."
        bgImage="/about-partners.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Partners' }]}
        stats={[
          { value: '45+', label: 'Strategic Partners' },
          { value: '6', label: 'Alliance Domains' },
          { value: '200+', label: 'Certified Consultants' },
          { value: '15', label: 'Diamond & Elite Tiers' },
        ]}
      />

      <EcosystemIntro flagship={flagship} />
      <AllianceDomains />
      <PartnerTiers />
      <AllianceValue />
      <Engagement />
      <BecomePartner />
      <EcosystemMarquee />

      <CTASection
        eyebrow="Build with the best"
        title={<>One relationship. The <span className="text-gradient-brand">entire technology stack.</span></>}
        body="Tell us the outcome you need. We'll assemble the right platforms, the right certifications and the right team — and stand behind every layer."
        primary={{ label: 'Discuss an alliance', href: '#/contact' }}
        secondary={{ label: 'Explore our solutions', href: '#/solutions' }}
      />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────
   ECOSYSTEM INTRO (dark) + flagship alliances
   ────────────────────────────────────────────────────────────── */

function EcosystemIntro({ flagship }: { flagship: Brand[] }) {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal stagger=".intro-item" className="lg:col-span-7">
            <span className="intro-item eyebrow-red">Why our ecosystem matters</span>
            <p className="intro-item mt-7 font-display text-[clamp(22px,3vw,38px)] font-medium leading-[1.22] tracking-[-0.02em] text-white text-balance">
              Great outcomes are rarely built on a single product. We pair two decades of
              regulated-industry delivery with <span className="text-gradient-brand">the world's leading platforms</span> —
              then orchestrate them into one integrated, accountable solution.
            </p>
            <p className="intro-item mt-6 max-w-2xl text-[15px] leading-relaxed text-white/60">
              Our alliances are technical, not transactional. Certified architects, hands-on lab
              experience and top-tier partner status mean we recommend the right platform for the
              outcome — and carry the engineering accountability for how those platforms work
              together in production. For our clients, that translates to faster delivery, better
              commercial terms and a single point of ownership across cloud, content, AI and security.
            </p>
            <div className="intro-item mt-9 flex flex-wrap gap-4">
              <a href="#domains" className="btn-primary"><span>Explore the alliance domains</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
              <a href="#/services" className="btn-ghost group">See how we deliver<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
            </div>
          </Reveal>

          <Reveal stagger=".flag-item" className="lg:col-span-5">
            <p className="flag-item mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">Priority alliances</p>
            <div className="flex flex-col gap-3">
              {flagship.map((b) => (
                <div key={b.slug} className="flag-item">
                  <BrandMark brand={b} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   ALLIANCE DOMAINS (light) — one premium block per real category
   ────────────────────────────────────────────────────────────── */

function AllianceDomains() {
  return (
    <section id="domains" className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="The partner ecosystem"
          title={<>Six domains of <span className="text-gradient-brand">deep technical alliance.</span></>}
          intro="Every layer of the modern enterprise stack — covered by certified specialists and orchestrated by one team."
        />

        <div className="mt-16 space-y-5">
          {partnerGroups.map((group, i) => {
            const meta = groupMeta[group.title] ?? { icon: IconLayers, blurb: '', tags: [] }
            const Icon = meta.icon
            return (
              <Reveal key={group.title} stagger=".dom-brand" className="card-paper group p-7 md:p-9">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <div className="flex items-center justify-between">
                      <span className="icon-tile-light h-12 w-12"><Icon className="h-5 w-5 text-brand-red transition-colors group-hover:text-white" /></span>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-ink-900/25">{counterFor(i)}</span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-ink-900">{group.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-ink-900/60">{meta.blurb}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {meta.tags.map((t) => (
                        <span key={t} className="border border-ink-900/10 bg-ink-900/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-900/45">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                      {group.brands.map((b) => (
                        <div key={b.slug} className="dom-brand">
                          <BrandMark brand={b} theme="light" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   PARTNER TIERS / CERTIFICATIONS (dark) + StatBand
   ────────────────────────────────────────────────────────────── */

function PartnerTiers() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <Aurora className="opacity-60" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Tiers & certifications"
          title={<>Status that becomes <span className="text-gradient-brand">client advantage.</span></>}
          intro="Partner tier is not a badge — it is leverage. The higher our accreditation, the earlier the access, the better the pricing and the deeper the support our clients receive."
        />

        <Reveal stagger=".tier-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((t) => {
            const Icon = t.icon
            return (
              <TiltCard key={t.tier} glow={t.accent} className="tier-card card-ink flex flex-col p-8">
                <span className={`mb-6 h-12 w-12 ${t.accent === 'blue' ? 'icon-tile-blue' : 'icon-tile'}`}><Icon className="h-5 w-5 text-white/85" /></span>
                <h3 className="font-display text-xl font-semibold text-white">{t.tier}</h3>
                <p className={`mt-2 font-mono text-[11px] uppercase tracking-[0.12em] ${t.accent === 'blue' ? 'text-brand-blue' : 'text-brand-red'}`}>{t.partners}</p>
                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-white/60">{t.desc}</p>
              </TiltCard>
            )
          })}
        </Reveal>

        <div className="mt-12">
          <StatBand
            stats={[
              { to: 200, suffix: '+', label: 'Certified consultants across the partner stack' },
              { to: 45, suffix: '+', label: 'Active technology alliances' },
              { to: 50, suffix: '+', label: 'Joint production implementations' },
              { to: 16, label: 'Countries with local delivery & support' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   ALLIANCE VALUE (light) — why clients benefit
   ────────────────────────────────────────────────────────────── */

function AllianceValue() {
  return (
    <section className="surface-paper-warm relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="What it means for clients"
          title={<>The whole is greater than <span className="text-gradient-brand">the sum of the licences.</span></>}
          intro="A partner network only matters if it changes outcomes. Here is what our alliances unlock for the institutions we serve."
        />
        <Reveal stagger=".val-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {allianceValue.map((v) => {
            const Icon = v.icon
            return (
              <div key={v.title} className="val-card card-paper group flex items-start gap-5 p-8">
                <span className="icon-tile-light h-12 w-12 shrink-0"><Icon className="h-5 w-5 text-brand-red transition-colors group-hover:text-white" /></span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-900">{v.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-900/60">{v.desc}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   ENGAGEMENT METHODOLOGY (dark) + KineticBackdrop
   ────────────────────────────────────────────────────────────── */

function Engagement() {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <KineticBackdrop variant="flow" color="blue" opacity={0.4} />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="How we partner"
          title={<>Platform-agnostic by design, <span className="text-gradient-blue">accountable by default.</span></>}
          intro="We choose the platform that fits the outcome — then carry the engineering accountability end to end."
        />
        <Reveal stagger=".step" className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/[0.04] md:grid-cols-2 lg:grid-cols-4">
          {engagement.map((s) => (
            <div key={s.no} className="step group relative bg-ink-900/70 p-8 transition-colors duration-500 hover:bg-white/[0.03]">
              <span className="font-display text-5xl font-semibold text-white/15 transition-colors duration-500 group-hover:text-white/40">{s.no}</span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/55">{s.desc}</p>
              <div className="mt-6 h-px w-8 bg-grad-blue transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   BECOME A PARTNER (light)
   ────────────────────────────────────────────────────────────── */

function BecomePartner() {
  return (
    <section className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Become a partner"
          title={<>Grow with us across <span className="text-gradient-brand">ME &amp; Africa.</span></>}
          intro="ISVs, regional resellers and global SIs partner with Aptiva to reach regulated-industry buyers with certified delivery and local presence."
        />
        <Reveal stagger=".track-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {partnerTracks.map((t) => {
            const Icon = t.icon
            return (
              <TiltCard key={t.title} glow="red" className="track-card card-paper flex flex-col p-8">
                <span className="icon-tile-light mb-6 h-14 w-14"><Icon className="h-6 w-6 text-brand-red transition-colors group-hover:text-white" /></span>
                <h3 className="font-display text-xl font-semibold text-ink-900">{t.title}</h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-900/60">{t.desc}</p>
                <a href="#/contact" className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-red transition-all hover:gap-3">
                  Start the conversation <IconArrowRight className="h-3.5 w-3.5" />
                </a>
              </TiltCard>
            )
          })}
        </Reveal>

        <Reveal className="mt-12">
          <div className="flex flex-col items-start justify-between gap-6 border border-ink-900/10 bg-ink-900/[0.02] p-8 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink-900">Ready to explore a partnership?</h3>
              <p className="mt-2 text-[14px] text-ink-900/60">Our alliances team responds within two business days.</p>
            </div>
            <a href="#/contact" className="btn-primary shrink-0"><span>Apply to partner</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   FULL ECOSYSTEM MARQUEE (dark)
   ────────────────────────────────────────────────────────────── */

function EcosystemMarquee() {
  const half = Math.ceil(allPartners.length / 2)
  const rowA = allPartners.slice(0, half)
  const rowB = allPartners.slice(half)
  return (
    <section className="surface-ink-flat relative overflow-hidden border-t border-white/10">
      <div className="container-xl pt-20">
        <SectionHeading
          eyebrow="The complete ecosystem"
          title={<>Forty-five alliances, <span className="text-gradient-brand">one delivery engine.</span></>}
          intro="The full roster of platforms our certified teams design, build, secure and operate every day."
        />
      </div>
      <div className="mt-14 space-y-4 pb-20">
        <Marquee
          speed={48}
          items={rowA.map((b) => <BrandMark key={b.slug} brand={b} />)}
          separator={<span className="h-1 w-1 rounded-full bg-brand-red/40" />}
        />
        <Marquee
          speed={56}
          reverse
          items={rowB.map((b) => <BrandMark key={b.slug} brand={b} />)}
          separator={<span className="h-1 w-1 rounded-full bg-brand-blue/40" />}
        />
      </div>
    </section>
  )
}
