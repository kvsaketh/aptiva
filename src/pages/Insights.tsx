import { useEffect, useMemo, useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '@/components/motion/Atmosphere'
import KineticBackdrop from '@/components/kit/KineticBackdrop'
import TiltCard from '@/components/kit/TiltCard'
import Marquee from '@/components/kit/Marquee'
import CTASection from '@/components/kit/CTASection'
import { IconArrowRight, IconArrowUpRight, IconBrain, IconSparkle } from '@/components/Icons'

/* ──────────────────────────────────────────────────────────────
   TYPES + DATA  (real existing entries preserved, expanded)
   ────────────────────────────────────────────────────────────── */

type Article = {
  id: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  readTime: string
  author: string
  cover: string
  featured?: boolean
}

const articles: Article[] = [
  {
    id: 'a1',
    title: 'Agentic AI in Banking: How Autonomous Agents Are Reshaping Customer Experience in the Middle East',
    date: 'March 15, 2026',
    category: 'Agentic AI',
    tags: ['Agentic AI', 'Banking', 'Customer Experience'],
    excerpt: 'Autonomous agents that plan, execute and adapt are moving from pilots to production. We unpack how leading GCC banks deploy agentic workflows across onboarding, servicing and dispute resolution — and the guardrails that keep them compliant.',
    readTime: '12 min read',
    author: 'Swamy Nathan, Head of AI',
    cover: '/about-ai.jpg',
    featured: true,
  },
  {
    id: 'a2',
    title: 'Digital Transformation in the Public Sector: The UAE Government Excellence Model',
    date: 'February 28, 2026',
    category: 'Digital Transformation',
    tags: ['Public Sector', 'Digital Transformation', 'Government'],
    excerpt: 'The UAE ranks among the top ten nations for digital-government maturity. We examine how content management, intelligent automation and sovereign cloud combine to deliver citizen-centric services at national scale.',
    readTime: '10 min read',
    author: 'George Mathew, Public Sector Lead',
    cover: '/industry-government.jpg',
    featured: true,
  },
  {
    id: 'a3',
    title: 'Real Estate 4.0: How AI and Automation Are Transforming Property Development in the GCC',
    date: 'March 1, 2026',
    category: 'Digital Transformation',
    tags: ['Real Estate', 'AI', 'Automation', 'PropTech'],
    excerpt: 'From master-developers to boutique studios, the GCC property sector is embracing AI-driven engagement, automated CLM and digital twins. A deep dive into the technologies driving Real Estate 4.0 and the ROI early adopters report.',
    readTime: '11 min read',
    author: 'Venu Gopal, Solutions Director',
    cover: '/industry-real-estate.jpg',
    featured: true,
  },
  {
    id: 'a4',
    title: 'The Role of LLMs in Financial Services: Compliance, Risk Assessment and Customer Engagement',
    date: 'January 20, 2026',
    category: 'GenAI',
    tags: ['LLMs', 'Financial Services', 'Compliance'],
    excerpt: 'Large language models are reshaping AML, regulatory reporting and conversational banking. We look at practical implementations — from automated SAR drafting to assistants that understand Arabic dialects and financial terminology.',
    readTime: '9 min read',
    author: 'Arun Krishnan, Principal Architect',
    cover: '/tech-abstract-1.jpg',
  },
  {
    id: 'a5',
    title: 'RAG Architecture for Enterprise Knowledge Management in Regulated Industries',
    date: 'March 5, 2026',
    category: 'GenAI',
    tags: ['RAG', 'Knowledge Management', 'Enterprise AI'],
    excerpt: 'Retrieval-Augmented Generation has become the dominant pattern for AI that demands accuracy and traceability. We detail ingestion pipelines, vector stores and the guardrails banks and government bodies use to prevent hallucination.',
    readTime: '10 min read',
    author: 'Swamy Nathan, Head of AI',
    cover: '/tech-abstract-2.jpg',
  },
  {
    id: 'a6',
    title: 'Cybersecurity in the Age of AI: Zero-Trust Architecture for Financial Institutions',
    date: 'January 5, 2026',
    category: 'Cybersecurity',
    tags: ['Cybersecurity', 'Zero Trust', 'Financial Institutions'],
    excerpt: 'As AI-powered attacks grow more sophisticated, banks must verify every request. We explore how XDR, continuous exposure management and AI-driven detection combine into a zero-trust posture for transaction systems.',
    readTime: '11 min read',
    author: 'Bader Al-Mansoori, Security Lead',
    cover: '/hero-abstract.jpg',
  },
  {
    id: 'a7',
    title: 'Smart City Infrastructure: Integrating IoT, AI and Cloud for Next-Generation Urban Management',
    date: 'December 10, 2025',
    category: 'Cloud',
    tags: ['Smart City', 'IoT', 'Cloud'],
    excerpt: 'Smart-city programs across the region integrate sensors, AI analytics and cloud to optimize mobility, energy and public safety. We examine the reference architecture behind mission-critical national infrastructure.',
    readTime: '13 min read',
    author: 'George Mathew, Public Sector Lead',
    cover: '/about-global.jpg',
  },
  {
    id: 'a8',
    title: 'Intelligent Document Processing: Transforming Government Service Delivery',
    date: 'December 5, 2025',
    category: 'Intelligent Automation',
    tags: ['IDP', 'Document Processing', 'Government'],
    excerpt: 'Government bodies process millions of documents a year. We show how IDP — combining OCR, NLP and machine learning — cuts processing from weeks to hours while pushing extraction accuracy beyond 99.5%.',
    readTime: '10 min read',
    author: 'Venu Gopal, Solutions Director',
    cover: '/industry-government.jpg',
  },
  {
    id: 'a9',
    title: 'Conversational AI in Banking: Building Assistants That Actually Work',
    date: 'March 3, 2026',
    category: 'GenAI',
    tags: ['Conversational AI', 'Banking', 'NLP'],
    excerpt: 'Most banking bots fail on domain knowledge, multilingual support and backend integration. We share the architecture of production-grade conversational AI handling 500K+ monthly interactions at 95% resolution.',
    readTime: '8 min read',
    author: 'Arun Krishnan, Principal Architect',
    cover: '/tech-abstract-1.jpg',
  },
  {
    id: 'a10',
    title: 'Open Banking and API-Led Connectivity: The Future of Financial Services in the GCC',
    date: 'February 1, 2026',
    category: 'Digital Transformation',
    tags: ['Open Banking', 'APIs', 'Fintech'],
    excerpt: 'Open-banking regulation is pushing GCC banks to expose APIs for account data, payments and product comparison. We explore the platforms enabling this shift and how regional banks are building API marketplaces.',
    readTime: '8 min read',
    author: 'John Abraham, Banking Practice',
    cover: '/industry-banking.jpg',
  },
  {
    id: 'a11',
    title: 'Building an AI Center of Excellence: Lessons from 50+ Enterprise Implementations',
    date: 'February 18, 2026',
    category: 'Agentic AI',
    tags: ['AI', 'Center of Excellence', 'Best Practices'],
    excerpt: 'An AI CoE is the organizational engine behind successful adoption. Drawing on 50+ implementations across banking, telecom and government, we share the governance model, team structure and platform stack that deliver.',
    readTime: '9 min read',
    author: 'Swamy Nathan, Head of AI',
    cover: '/tech-abstract-2.jpg',
  },
  {
    id: 'a12',
    title: 'Hyperautonomy: The Next Evolution Beyond Hyperautomation',
    date: 'March 15, 2026',
    category: 'Intelligent Automation',
    tags: ['Hyperautonomy', 'Agentic AI', 'Automation'],
    excerpt: 'Hyperautomation connected RPA, AI and process mining. Hyperautonomy goes further — systems that self-optimize, self-heal and decide autonomously. We map the technologies and readiness required for the autonomous enterprise.',
    readTime: '9 min read',
    author: 'Venu Gopal, Solutions Director',
    cover: '/hero-abstract.jpg',
  },
  {
    id: 'a13',
    title: 'Sovereign Cloud in MENA: Balancing Innovation, Compliance and Data Residency',
    date: 'February 12, 2026',
    category: 'Cloud',
    tags: ['Cloud', 'Sovereign Cloud', 'Compliance'],
    excerpt: 'Data-residency mandates are reshaping cloud strategy across the region. We weigh sovereign-cloud options against hyperscaler regions and outline a landing-zone pattern that satisfies regulators without stalling delivery.',
    readTime: '10 min read',
    author: 'Arun Krishnan, Principal Architect',
    cover: '/about-global.jpg',
  },
  {
    id: 'a14',
    title: 'Process Mining Before Automation: Finding the Opportunities That Actually Pay Back',
    date: 'January 28, 2026',
    category: 'Intelligent Automation',
    tags: ['Process Mining', 'RPA', 'Automation'],
    excerpt: 'Automation without discovery wastes budget. We walk through a real process-mining engagement at a regional bank — from event-log analysis to a prioritized automation backlog with quantified payback.',
    readTime: '7 min read',
    author: 'Venu Gopal, Solutions Director',
    cover: '/tech-abstract-1.jpg',
  },
]

/* Topic filter chips (visual). */
const topics = ['All', 'Agentic AI', 'GenAI', 'Intelligent Automation', 'Cybersecurity', 'Cloud', 'Digital Transformation']

/* Popular topics with article counts. */
const popularTopics = [
  { name: 'Agentic AI', count: 12 },
  { name: 'GenAI & LLMs', count: 18 },
  { name: 'Intelligent Automation', count: 15 },
  { name: 'Zero-Trust Security', count: 9 },
  { name: 'Sovereign Cloud', count: 7 },
  { name: 'Open Banking', count: 6 },
  { name: 'Document Intelligence', count: 11 },
  { name: 'Smart Cities', count: 5 },
]

const marqueeTopics = ['AGENTIC AI', 'GENAI', 'INTELLIGENT AUTOMATION', 'ZERO TRUST', 'SOVEREIGN CLOUD', 'RAG', 'PROCESS MINING', 'OPEN BANKING', 'DIGITAL TRANSFORMATION']

export default function Insights() {
  const [topic, setTopic] = useState('All')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const featured = articles.find((a) => a.featured) as Article
  const featuredRail = articles.filter((a) => a.featured && a.id !== featured.id)

  const filtered = useMemo(() => {
    const rest = articles.filter((a) => a.id !== featured.id)
    if (topic === 'All') return rest
    return rest.filter((a) => a.category === topic || a.tags.includes(topic))
  }, [topic, featured.id])

  return (
    <div>
      <PageHeader
        label="Insights"
        title="Thought leadership for the intelligent enterprise."
        subtitle="Expert perspectives on Agentic AI, GenAI, intelligent automation and digital transformation across the regulated industries of the Middle East and Africa."
        bgImage="/tech-abstract-2.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Insights' }]}
        stats={[
          { value: '40+', label: 'Published Articles' },
          { value: '12', label: 'Topic Areas' },
          { value: 'Weekly', label: 'Publishing Cadence' },
          { value: '50+', label: 'Expert Contributors' },
        ]}
      />

      <FeaturedHero article={featured} rail={featuredRail} />
      <ArticleGrid topic={topic} setTopic={setTopic} items={filtered} />
      <PopularTopics />
      <Newsletter />
      <TopicMarquee />

      <CTASection
        eyebrow="Go deeper"
        title={<>From perspective to <span className="text-gradient-brand">production.</span></>}
        body="Every article here is grounded in work we have shipped. When you are ready to turn an idea into a delivered outcome, our architects are ready to help."
        primary={{ label: 'Talk to an expert', href: '#/contact' }}
        secondary={{ label: 'Explore our solutions', href: '#/solutions' }}
      />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────
   FEATURED HERO (dark) — large lead story + side rail
   ────────────────────────────────────────────────────────────── */

function FeaturedHero({ article, rail }: { article: Article; rail: Article[] }) {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y">
        <Reveal className="mb-10 flex items-center gap-3">
          <span className="eyebrow-red">Featured</span>
          <span className="h-px flex-1 bg-white/10" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <TiltCard glow="red" max={5} href="#/insights" className="group lg:col-span-8">
            <article className="card-ink relative flex min-h-[420px] flex-col justify-end overflow-hidden p-8 md:p-10">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${article.cover})` }} aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/30" aria-hidden />
              <div className="absolute inset-0 bg-grad-red opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30" aria-hidden />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
                  <span className="bg-brand-red/15 px-2.5 py-1 text-brand-red">{article.category}</span>
                  <span>{article.date}</span>
                  <span className="text-white/30">·</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="mt-5 max-w-3xl font-display text-2xl font-semibold leading-tight text-white text-balance md:text-[34px]">{article.title}</h3>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">{article.excerpt}</p>
                <div className="mt-7 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white/70">{article.author}</span>
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all group-hover:gap-3">
                    Read article <IconArrowRight className="h-3.5 w-3.5 text-brand-red" />
                  </span>
                </div>
              </div>
            </article>
          </TiltCard>

          <Reveal stagger=".rail-card" className="flex flex-col gap-6 lg:col-span-4">
            {rail.map((a) => (
              <a key={a.id} href="#/insights" className="rail-card card-ink group flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                  <span className="text-brand-red">{a.category}</span>
                  <span className="text-white/25">·</span>
                  <span>{a.readTime}</span>
                </div>
                <h4 className="mt-3 font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-brand-red">{a.title}</h4>
                <p className="mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-white/55">{a.excerpt}</p>
                <span className="mt-4 text-[12px] text-white/45">{a.author}</span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   ARTICLE GRID (light) — filter chips + TiltCard cards
   ────────────────────────────────────────────────────────────── */

function ArticleGrid({ topic, setTopic, items }: { topic: string; setTopic: (t: string) => void; items: Article[] }) {
  return (
    <section className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="The library"
          title={<>Perspectives from the <span className="text-gradient-brand">delivery front line.</span></>}
          intro="Field notes, reference architectures and lessons learned — written by the architects who ship them."
        />

        <Reveal className="mt-10 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`border px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-all ${
                topic === t
                  ? 'border-brand-red bg-brand-red/10 text-brand-red'
                  : 'border-ink-900/12 text-ink-900/55 hover:border-ink-900/30 hover:text-ink-900'
              }`}
            >
              {t}
            </button>
          ))}
        </Reveal>

        {items.length > 0 ? (
          <Reveal stagger=".grid-card" key={topic} className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => (
              <TiltCard key={a.id} glow="red" max={6} href="#/insights" className="grid-card card-paper group flex flex-col overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${a.cover})` }} aria-hidden />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" aria-hidden />
                  <span className="absolute left-4 top-4 bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-900 backdrop-blur">{a.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-900/45">
                    <span>{a.date}</span><span className="text-ink-900/25">·</span><span>{a.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-[18px] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-red">{a.title}</h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-ink-900/60">{a.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-ink-900/8 pt-4">
                    <span className="text-[12.5px] text-ink-900/55">{a.author}</span>
                    <IconArrowUpRight className="h-4 w-4 text-brand-red transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </TiltCard>
            ))}
          </Reveal>
        ) : (
          <Reveal className="mt-16 border border-ink-900/10 bg-white p-16 text-center">
            <p className="text-ink-900/60">No articles in this topic yet.</p>
            <button onClick={() => setTopic('All')} className="mt-4 text-[12px] font-bold uppercase tracking-[0.1em] text-brand-red">Clear filter</button>
          </Reveal>
        )}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   POPULAR TOPICS (dark) + KineticBackdrop
   ────────────────────────────────────────────────────────────── */

function PopularTopics() {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <KineticBackdrop variant="mesh" color="blue" opacity={0.4} />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Explore by topic"
          title={<>The themes shaping <span className="text-gradient-blue">enterprise technology.</span></>}
          intro="The subjects our readers return to most — from agentic systems to sovereign cloud."
        />
        <Reveal stagger=".topic-pill" className="mt-14 flex flex-wrap gap-3">
          {popularTopics.map((t) => (
            <a key={t.name} href="#/insights" className="topic-pill group flex items-center gap-3 border border-white/10 bg-white/[0.03] px-5 py-3 transition-all hover:-translate-y-0.5 hover:border-brand-blue/40 hover:bg-white/[0.06]">
              <IconSparkle className="h-4 w-4 text-brand-blue" />
              <span className="text-[14px] font-medium text-white/80 transition-colors group-hover:text-white">{t.name}</span>
              <span className="font-mono text-[11px] text-white/35">{t.count}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   NEWSLETTER BAND (light)
   ────────────────────────────────────────────────────────────── */

function Newsletter() {
  return (
    <section className="surface-paper-warm relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <Reveal stagger=".nl-item" className="relative overflow-hidden border border-ink-900/10 bg-ink-900 p-10 md:p-16">
          <Aurora className="opacity-50" />
          <Grain />
          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="nl-item inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-red">
                <IconBrain className="h-4 w-4" /> The Intelligence Brief
              </span>
              <h3 className="nl-item mt-5 font-display text-[clamp(24px,3vw,38px)] font-semibold leading-tight text-white text-balance">
                Enterprise AI signal, <span className="text-gradient-brand">not noise.</span>
              </h3>
              <p className="nl-item mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
                A monthly briefing on Agentic AI, intelligent automation and regulated-industry transformation across ME &amp; Africa. Curated by our practice leads. No spam, unsubscribe anytime.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form
                className="nl-item flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="nl-email" className="sr-only">Work email</label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="flex-1 border border-white/15 bg-white/[0.04] px-4 py-3.5 text-[14px] text-white placeholder:text-white/35 transition-colors focus:border-brand-red focus:outline-none"
                />
                <button type="submit" className="btn-primary shrink-0">
                  <span>Subscribe</span><IconArrowRight className="relative z-10 h-4 w-4" />
                </button>
              </form>
              <p className="nl-item mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/35">Joined by 4,000+ technology leaders</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   TOPIC MARQUEE (dark)
   ────────────────────────────────────────────────────────────── */

function TopicMarquee() {
  return (
    <section className="surface-ink-flat relative overflow-hidden border-t border-white/10 py-16">
      <Marquee
        speed={42}
        items={marqueeTopics.map((t) => (
          <span key={t} className="font-display text-[clamp(20px,2.4vw,34px)] font-medium text-white/25 transition-colors hover:text-white/70">{t}</span>
        ))}
      />
    </section>
  )
}
