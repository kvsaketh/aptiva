import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const solutions = [
  { name: 'Corroflow', category: 'Content & Trust', desc: 'Intelligent Correspondence — AI-Driven Composition, Smart Routing, Omni-Channel Dispatch' },
  { name: 'Classifyr', category: 'Content & Trust', desc: 'Document Intelligence — Neural Auto-Classification, Metadata Extraction, Self-Learning Taxonomy' },
  { name: 'Vaultera', category: 'Content & Trust', desc: 'Records & Archival — Unified Physical + Digital Vault, Mobile-First, Compliance-Ready' },
  { name: 'Signova', category: 'Content & Trust', desc: 'Digital Signing & Trust — Zero-Touch Signing, Embedded Workflows, Regulatory Audit Trail' },
  { name: 'Kredence', category: 'Fintech', desc: 'Corporate Lending — AI Credit Decisioning, Risk & Compliance, Portfolio Intelligence' },
  { name: 'Lendora', category: 'Fintech', desc: 'Retail Lending — Instant Onboarding, End-to-End Origination, Smart KYC/AML' },
  { name: 'Linguara', category: 'Fintech', desc: 'Multilingual Localization — 80+ Languages, Real-Time Transform, Zero Code Integration' },
  { name: 'Procuria', category: 'Procurement', desc: 'Source-to-Pay Procurement — Spend Automation, eRFX & eAuctions, AI Spend Analytics' },
  { name: 'Vendrix', category: 'Procurement', desc: 'Supplier Management — Supplier Scoring, Performance Tracking, Risk & Compliance' },
  { name: 'Adscopia', category: 'Media', desc: 'DOOH & Media Platform — AI Media Planning, Programmatic DOOH, Hyperlocal Campaigns' },
  { name: 'Gazelens', category: 'Media', desc: 'Audience Analytics — Demographics Detection, Emotion Tracking, Campaign ROI' },
]

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const bgImageRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }

    rowRefs.current.forEach((row, i) => {
      if (!row) return
      gsap.fromTo(
        row,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )
    })
  }, [])

  useEffect(() => {
    if (!bgImageRef.current) return
    if (hoveredIndex !== null) {
      gsap.to(bgImageRef.current, { opacity: 0.3, scale: 1, duration: 0.4 })
    } else {
      gsap.to(bgImageRef.current, { opacity: 0, scale: 0.95, duration: 0.3 })
    }
  }, [hoveredIndex])

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="w-full bg-black py-8 md:py-10 lg:py-32 relative overflow-hidden"
      style={{ padding: 'clamp(20px, 2vw, 32px) clamp(24px, 5vw, 80px)' }}
    >
      <div
        ref={bgImageRef}
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-0 pointer-events-none"
        style={{
          backgroundImage: hoveredIndex !== null
            ? `url(/solution-${solutions[hoveredIndex].name.toLowerCase()}.jpg)`
            : 'none',
        }}
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div ref={headerRef} className="mb-6">
          <span className="label-red block mb-4">OUR SOLUTIONS</span>
          <h2
            className="text-white font-bold leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            11 Solutions. Built for Enterprise.
          </h2>
          <p className="text-white mt-4 max-w-[560px] leading-relaxed" style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}>
            Purpose-built platforms that create vendor lock-in and long-term recurring revenue.
          </p>
        </div>

        <div className="border-t border-white/10">
          {solutions.map((sol, i) => (
            <div
              key={sol.name}
              ref={(el) => { rowRefs.current[i] = el }}
              className="border-b border-white/10 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8 cursor-pointer transition-all duration-300 hover:bg-white/5 group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-white font-semibold tracking-[-0.02em]" style={{ fontSize: 'clamp(20px, 2.5vw, 36px)' }}>
                  {sol.name}
                </h3>
              </div>
              <div className="flex-1 hidden lg:block">
                <span className="text-black/60 text-xs uppercase tracking-[0.05em]">{sol.category}</span>
                <p className="text-black/60 text-sm mt-1">{sol.desc}</p>
              </div>
              <span className="text-black/60 text-xs uppercase tracking-[0.05em] flex items-center gap-2 group-hover:text-blue-500 group-hover:gap-3 transition-all">
                VIEW <span className="text-lg">→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
