import { useEffect, useState } from 'react'
import { Aurora, Grain } from '../components/motion/Atmosphere'
import { IconArrowRight, IconArrowUpRight } from '../components/Icons'

const footerLinks = {
  services: [
    { label: 'Content & Document Intelligence', href: '#/services/content-intelligence' },
    { label: 'GenAI, Agentic AI & Automation', href: '#/services/ai-automation' },
    { label: 'Cloud, Infra & Cybersecurity', href: '#/services/cloud-security' },
    { label: 'Data & Analytics', href: '#/services/data-analytics' },
    { label: 'Customer Experience (CX)', href: '#/services/customer-experience' },
    { label: 'Digital Workplace', href: '#/services/digital-workplace' },
  ],
  solutions: [
    { label: 'Corroflow', href: '#/solutions/corroflow' },
    { label: 'Classifyr', href: '#/solutions/classifyr' },
    { label: 'Vaultera', href: '#/solutions/vaultera' },
    { label: 'Kredence', href: '#/solutions/kredence' },
    { label: 'Procuria', href: '#/solutions/procuria' },
    { label: 'Adscopia', href: '#/solutions/adscopia' },
  ],
  industries: [
    { label: 'Banking & Financial Services', href: '#/industries/banking' },
    { label: 'Telecommunications', href: '#/industries/telecom' },
    { label: 'Government & Public Sector', href: '#/industries/government' },
    { label: 'Energy, Oil & Gas', href: '#/industries/energy' },
    { label: 'Real Estate & Construction', href: '#/industries/real-estate' },
    { label: 'Insurance & Healthcare', href: '#/industries/insurance' },
  ],
  company: [
    { label: 'About Us', href: '#/about' },
    { label: 'Leadership', href: '#/leadership' },
    { label: 'Case Studies', href: '#/case-studies' },
    { label: 'Strategic Partners', href: '#/partners' },
    { label: 'Insights', href: '#/insights' },
    { label: 'Careers', href: '#/careers' },
  ],
}

function LinkCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <a href={l.href} className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/55 transition-colors hover:text-white">
              <span className="h-px w-0 bg-brand-red transition-all duration-300 group-hover:w-3" />
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="surface-ink-flat relative">
      {/* CTA Banner */}
      <div className="relative overflow-hidden border-y border-white/10">
        <Aurora className="opacity-70" />
        <Grain />
        <div className="container-xl relative z-10 py-20 md:py-28">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow-red">Let's build</span>
              <h3 className="display-2 mt-5 text-white text-balance">
                Ready to engineer your <span className="text-gradient-brand">enterprise future?</span>
              </h3>
              <p className="lead mt-5 text-white/60">
                Start with one project. Scale across the enterprise. Talk to a team that has delivered for banks, governments and telecoms across 16 countries.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href="#/contact" className="btn-primary"><span>Start a conversation</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
              <a href="mailto:sales@aptivacorp.ae" className="btn-ghost">sales@aptivacorp.ae</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container-xl py-16 md:py-20">
        <div className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
          <img src="/logo-dark-bg.png" alt="Aptiva Technologies" className="h-[3.08rem] w-auto object-contain" />
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/45">
            IT Services · Digital Transformation · Enterprise AI
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-6">
          <LinkCol title="Services" links={footerLinks.services} />
          <LinkCol title="Solutions" links={footerLinks.solutions} />
          <LinkCol title="Industries" links={footerLinks.industries} />
          <LinkCol title="Company" links={footerLinks.company} />

          {/* Contact + offices spanning 2 cols */}
          <div className="col-span-2 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h4 className="mb-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">Contact</h4>
              <div className="space-y-3 text-[13.5px]">
                <a href="mailto:sales@aptivacorp.ae" className="block text-white/55 transition-colors hover:text-white">sales@aptivacorp.ae</a>
                <a href="mailto:info@aptivacorp.ae" className="block text-white/55 transition-colors hover:text-white">info@aptivacorp.ae</a>
                <a href="tel:+97142201106" className="block text-white/55 transition-colors hover:text-white">+971 4 2201106</a>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                {[
                  { label: 'X', href: 'https://x.com/AptivaCorp', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aptivacorp/', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="group flex h-9 w-9 items-center justify-center border border-white/10 bg-white/[0.03] transition-all hover:border-transparent hover:bg-grad-brand">
                    <svg className="h-3.5 w-3.5 text-white/70 transition-colors group-hover:text-white" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/35">Offices</h4>
              <div className="space-y-4 text-[13px] leading-relaxed text-white/55">
                <div>
                  <span className="block font-semibold text-white/85">Ras Al-Khaimah · HQ</span>
                  A4-332, Al Hamra Ind. Zone FZ<br />P.O. Box 82264, RAK, UAE
                </div>
                <div>
                  <span className="block font-semibold text-white/85">Dubai</span>
                  Suite 504, Platinum Business Centre<br />Al Nahda 2, Dubai, UAE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-mono text-[11.5px] tracking-[0.06em] text-white/40">
            © {new Date().getFullYear()} Aptiva Technologies Group · All rights reserved
          </p>
          <div className="flex items-center gap-7">
            <a href="#" className="text-[12px] text-white/45 transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="text-[12px] text-white/45 transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center bg-grad-brand text-white shadow-glow-red transition-all duration-300 ${showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      >
        <IconArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </footer>
  )
}
