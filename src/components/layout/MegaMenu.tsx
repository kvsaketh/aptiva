import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import {
  IconDocument, IconBrain, IconCloud, IconChart, IconHeadset, IconMonitor,
  IconFileCheck, IconLightbulb, IconSettings, IconSmartphone, IconUsers, IconCheckCircle,
  IconBuilding, IconAntenna, IconLandmark, IconZap, IconConstruction, IconHeartPulse,
  IconArrowRight, IconArrowUpRight, IconSparkle,
} from '../Icons'

/* ────────────── DATA ────────────── */

type MenuItem = { label: string; href: string; icon?: React.ElementType; desc?: string }
type MenuColumn = { title: string; items: MenuItem[] }
type MenuDef = { columns: MenuColumn[]; featured: { eyebrow: string; title: string; desc: string; href: string } }

const megaMenuData: Record<string, MenuDef> = {
  services: {
    columns: [
      {
        title: 'Core Pillars',
        items: [
          { label: 'Content & Document Intelligence', href: '#/services/content-intelligence', icon: IconDocument },
          { label: 'GenAI, Agentic AI & Automation', href: '#/services/ai-automation', icon: IconBrain },
          { label: 'Cloud, Infra & Cybersecurity', href: '#/services/cloud-security', icon: IconCloud },
          { label: 'Data & Analytics', href: '#/services/data-analytics', icon: IconChart },
          { label: 'Customer Experience (CX)', href: '#/services/customer-experience', icon: IconHeadset },
          { label: 'Digital Workplace', href: '#/services/digital-workplace', icon: IconMonitor },
        ],
      },
      {
        title: 'Specialized Practices',
        items: [
          { label: 'Contract Lifecycle Management', href: '#/services/clm', icon: IconFileCheck },
          { label: 'Business Value Consulting', href: '#/services/consulting', icon: IconLightbulb },
          { label: 'Managed Services & SRE', href: '#/services/managed-services', icon: IconSettings },
          { label: 'Digital Experience Platforms', href: '#/services/digital-experience', icon: IconSmartphone },
          { label: 'Strategic Resource Partnership', href: '#/services/resource-partnership', icon: IconUsers },
          { label: 'Quality Engineering & Testing', href: '#/services/quality-engineering', icon: IconCheckCircle },
        ],
      },
    ],
    featured: {
      eyebrow: 'Flagship Practice',
      title: 'GenAI & Agentic AI',
      desc: 'Production-grade LLMs, RAG and autonomous agents — engineered for regulated enterprises.',
      href: '#/services/ai-automation',
    },
  },
  solutions: {
    columns: [
      {
        title: 'Content & Trust',
        items: [
          { label: 'Corroflow', href: '#/solutions/corroflow', desc: 'Intelligent Correspondence' },
          { label: 'Classifyr', href: '#/solutions/classifyr', desc: 'Document Intelligence' },
          { label: 'Vaultera', href: '#/solutions/vaultera', desc: 'Records & Archival' },
          { label: 'Signova', href: '#/solutions/signova', desc: 'Digital Signing & Trust' },
        ],
      },
      {
        title: 'Fintech & Localization',
        items: [
          { label: 'Kredence', href: '#/solutions/kredence', desc: 'Corporate Lending' },
          { label: 'Lendora', href: '#/solutions/lendora', desc: 'Retail Lending' },
          { label: 'Linguara', href: '#/solutions/linguara', desc: 'Multilingual Localization' },
        ],
      },
      {
        title: 'Procurement & Media',
        items: [
          { label: 'Procuria', href: '#/solutions/procuria', desc: 'Source-to-Pay' },
          { label: 'Vendrix', href: '#/solutions/vendrix', desc: 'Supplier Management' },
          { label: 'Adscopia', href: '#/solutions/adscopia', desc: 'DOOH & Media' },
          { label: 'Gazelens', href: '#/solutions/gazelens', desc: 'Audience Analytics' },
        ],
      },
    ],
    featured: {
      eyebrow: '11 Platforms',
      title: 'Proprietary IP Portfolio',
      desc: 'Purpose-built products that create switching cost and recurring revenue.',
      href: '#/solutions',
    },
  },
  industries: {
    columns: [
      {
        title: 'Verticals',
        items: [
          { label: 'Banking & Financial Services', href: '#/industries/banking', icon: IconBuilding },
          { label: 'Telecommunications', href: '#/industries/telecom', icon: IconAntenna },
          { label: 'Government & Public Sector', href: '#/industries/government', icon: IconLandmark },
        ],
      },
      {
        title: ' ',
        items: [
          { label: 'Energy, Oil & Gas', href: '#/industries/energy', icon: IconZap },
          { label: 'Real Estate & Construction', href: '#/industries/real-estate', icon: IconConstruction },
          { label: 'Insurance & Healthcare', href: '#/industries/insurance', icon: IconHeartPulse },
        ],
      },
    ],
    featured: {
      eyebrow: 'Two Decades',
      title: 'Regulated-Industry DNA',
      desc: '16 countries across the Middle East & Africa. Compliance built in from day one.',
      href: '#/industries',
    },
  },
  company: {
    columns: [
      {
        title: 'Company',
        items: [
          { label: 'About Us', href: '#/about' },
          { label: 'Leadership', href: '#/leadership' },
          { label: 'Case Studies', href: '#/case-studies' },
          { label: 'Insights', href: '#/insights' },
        ],
      },
      {
        title: 'Connect',
        items: [
          { label: 'Strategic Partners', href: '#/partners' },
          { label: 'Careers', href: '#/careers' },
          { label: 'Contact', href: '#/contact' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Join Us',
      title: 'Build the Enterprise Future',
      desc: '1,200+ engineers across the region. We are hiring across every practice.',
      href: '#/careers',
    },
  },
}

const navItems = [
  { key: 'services', label: 'Services', href: '#/services' },
  { key: 'solutions', label: 'Solutions', href: '#/solutions' },
  { key: 'industries', label: 'Industries', href: '#/industries' },
  { key: 'company', label: 'Company', href: '#/about' },
]

/* ────────────── COMPONENT ────────────── */

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  useEffect(() => {
    setActiveMenu(null)
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 })
    }
  }, [])

  useEffect(() => {
    if (activeMenu && panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' })
      gsap.fromTo(panelRef.current.querySelectorAll('.mm-item'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.34, stagger: 0.025, ease: 'power2.out', delay: 0.04 })
    }
  }, [activeMenu])

  const handleMouseEnter = (key: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setActiveMenu(key)
  }
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setActiveMenu(null), 140)
  }

  const solid = scrolled || activeMenu

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'glass-nav' : 'bg-transparent'}`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container-xl flex h-[80px] items-center justify-between">
          {/* Logo */}
          <a href="#/" className="group flex items-center" aria-label="Aptiva home">
            <img src="/logo-dark-bg.png" alt="Aptiva Technologies" className="h-[1.848rem] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04] md:h-[2.156rem]" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden h-full items-center lg:flex">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative flex h-full items-center"
                onMouseEnter={() => handleMouseEnter(item.key)}
              >
                <a
                  href={item.href}
                  className={`group relative flex h-full items-center gap-1.5 px-5 text-[12.5px] font-semibold uppercase tracking-[0.1em] transition-colors ${activeMenu === item.key ? 'text-white' : 'text-white/75 hover:text-white'}`}
                >
                  {item.label}
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className={`transition-transform duration-300 ${activeMenu === item.key ? 'rotate-180' : ''}`}>
                    <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className={`absolute inset-x-5 bottom-[22px] h-px origin-left bg-grad-brand transition-transform duration-300 ${activeMenu === item.key ? 'scale-x-100' : 'scale-x-0'}`} />
                </a>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden shrink-0 lg:block">
            <a href="#/contact" className="btn-primary !px-6 !py-3 text-[11.5px] whitespace-nowrap">
              <span>Get in touch</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button className="p-2 text-white lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <div className="flex w-6 flex-col gap-1.5">
              <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'translate-y-[8px] rotate-45' : ''}`} />
              <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileOpen ? '-translate-y-[8px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mega Panel */}
        {activeMenu && megaMenuData[activeMenu] && (
          <div
            ref={panelRef}
            className="absolute inset-x-0 top-[80px] border-t border-white/10 bg-ink-900/95 backdrop-blur-2xl"
            onMouseEnter={() => closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current)}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-grad-brand opacity-60" aria-hidden />
            <div className="container-xl grid grid-cols-12 gap-10 py-12">
              <div className={`col-span-12 grid gap-x-10 gap-y-2 lg:col-span-8 ${megaMenuData[activeMenu].columns.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                {megaMenuData[activeMenu].columns.map((col, i) => (
                  <div key={i}>
                    <h4 className="mb-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/35">{col.title}</h4>
                    <ul className="space-y-1">
                      {col.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <li key={item.href} className="mm-item">
                            <a href={item.href} className="group flex items-center gap-3 rounded-sm px-3 py-2.5 -mx-3 transition-colors hover:bg-white/[0.04]">
                              {Icon && (
                                <span className="icon-tile h-9 w-9 rounded-none">
                                  <Icon className="h-[18px] w-[18px] text-white/80" />
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="block text-[14px] font-medium text-white/85 transition-colors group-hover:text-white">{item.label}</span>
                                {item.desc && <span className="block text-[11.5px] text-white/40">{item.desc}</span>}
                              </span>
                              <IconArrowRight className="ml-auto h-3.5 w-3.5 -translate-x-1 text-brand-red opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured card */}
              <a
                href={megaMenuData[activeMenu].featured.href}
                className="mm-item group relative col-span-12 overflow-hidden border border-white/10 p-7 lg:col-span-4"
              >
                <div className="absolute inset-0 -z-10 bg-grad-brand opacity-[0.14] transition-opacity duration-500 group-hover:opacity-25" aria-hidden />
                <div className="dotgrid absolute inset-0 -z-10 opacity-30" aria-hidden />
                <IconSparkle className="mb-5 h-6 w-6 text-white" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/55">{megaMenuData[activeMenu].featured.eyebrow}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{megaMenuData[activeMenu].featured.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{megaMenuData[activeMenu].featured.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white">
                  Explore <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="surface-ink-raised fixed inset-0 z-[60] overflow-y-auto pt-6">
          <div className="flex items-center justify-between px-6 pb-4">
            <img src="/logo-dark-bg.png" alt="Aptiva Technologies" className="h-[2.31rem] w-auto" />
            <button className="p-2 text-white" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="space-y-5 px-6 py-6">
            {navItems.map((item) => (
              <div key={item.key} className="border-b border-white/10 pb-5">
                <a href={item.href} onClick={() => setMobileOpen(false)} className="mb-3 block font-display text-xl font-semibold uppercase tracking-[0.04em] text-white">{item.label}</a>
                <div className="grid grid-cols-1 gap-1 pl-1 sm:grid-cols-2">
                  {megaMenuData[item.key].columns.flatMap((c) => c.items).map((sub) => (
                    <a key={sub.href} href={sub.href} onClick={() => setMobileOpen(false)} className="py-1.5 text-sm text-white/65 transition-colors hover:text-brand-red">{sub.label}</a>
                  ))}
                </div>
              </div>
            ))}
            <a href="#/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-2 w-full"><span>Get in touch</span></a>
          </div>
        </div>
      )}
    </>
  )
}
