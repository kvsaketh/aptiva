import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    title: 'Content & Document Intelligence',
    description: 'Enterprise Content Platforms, Intelligent Capture & IDP, Digital Archival & Governance, Records Lifecycle Management',
    tags: ['ECM', 'IDP', 'Archival', 'Records'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
        <rect x="8" y="4" width="32" height="40" rx="2" />
        <line x1="16" y1="14" x2="32" y2="14" />
        <line x1="16" y1="22" x2="32" y2="22" />
        <line x1="16" y1="30" x2="28" y2="30" />
        <path d="M4 12h8M4 20h8M4 28h8" />
      </svg>
    ),
  },
  {
    title: 'GenAI, Agentic AI & Automation',
    description: 'LLMs & Agentic Workflows, Conversational AI & Custom LLMs, RAG & AI Infrastructure Mgmt, RPA & Hyperautomation',
    tags: ['LLMs', 'RAG', 'RPA', 'AI/ML Ops'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
        <circle cx="24" cy="16" r="8" />
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" />
        <circle cx="24" cy="16" r="3" fill="currentColor" />
        <path d="M16 8l-4-4M32 8l4-4" />
      </svg>
    ),
  },
  {
    title: 'Cloud, Infra & Cybersecurity',
    description: 'Multi-Cloud Migration & Architecture, DevOps / DevSecOps / SRE, MLOps & Model Lifecycle Mgmt, Zero-Trust Security & VAPT',
    tags: ['Multi-Cloud', 'DevSecOps', 'Zero-Trust', 'SRE'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
        <path d="M12 28c0-6.627 5.373-12 12-12s12 5.373 12 12" />
        <path d="M24 16v-4M36 28h4M8 28H4" />
        <path d="M24 40V28M20 32l4-4 4 4" />
        <rect x="18" y="36" width="12" height="8" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Data & Analytics',
    description: 'BI Dashboards & Visualization, Data Engineering & Governance, ML & Text Analytics, Real-Time Decision Intelligence',
    tags: ['BI', 'Data Engineering', 'ML', 'Text Analytics'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
        <rect x="6" y="24" width="8" height="18" rx="1" />
        <rect x="20" y="14" width="8" height="28" rx="1" />
        <rect x="34" y="6" width="8" height="36" rx="1" />
        <path d="M10 20l4-4 4 4M28 10l4-4 4 4" />
      </svg>
    ),
  },
  {
    title: 'Customer Experience (CX)',
    description: 'CCaaS & Omni-Channel CX, Speech Analytics & Agent Assist, Digital Onboarding Journeys, Interactive Video & Engagement',
    tags: ['CCaaS', 'Speech Analytics', 'Digital Onboarding'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
        <circle cx="24" cy="16" r="10" />
        <path d="M8 42c0-8.837 7.163-14 16-14s16 5.163 16 14" />
        <path d="M20 12l4 4 8-8" />
      </svg>
    ),
  },
  {
    title: 'Digital Workplace',
    description: 'Modern Intranet & Collaboration, Employee Experience Platforms, Knowledge Management, Gamification & Engagement',
    tags: ['Intranet', 'Knowledge Mgmt', 'Gamification'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
        <rect x="6" y="6" width="36" height="28" rx="2" />
        <path d="M6 18h36M18 34v8M30 34v8" />
        <circle cx="16" cy="14" r="2" fill="currentColor" />
        <circle cx="24" cy="14" r="2" fill="currentColor" />
        <circle cx="32" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
  },
]

export default function CoreCapabilities() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

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

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    })
  }, [])

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="w-full bg-white py-8 md:py-10 lg:py-32"
      style={{ padding: 'clamp(20px, 2vw, 32px) clamp(24px, 5vw, 80px)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div ref={headerRef} className="mb-6">
          <span className="label-red block mb-4">WHAT WE DELIVER</span>
          <h2
            className="text-black font-bold leading-[1.05] tracking-[-0.03em] max-w-[700px]"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            Six Pillars of Digital Transformation
          </h2>
          <p className="text-black/60 mt-4 max-w-[600px] leading-relaxed" style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}>
            From content intelligence to AI-driven automation — full-stack capabilities for the modern enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              ref={(el) => { cardRefs.current[i] = el }}
              className="group bg-white border border-gray-100 p-8 lg:p-10 transition-all duration-300 hover:border-blue-600 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div className="mb-6">{cap.icon}</div>
              <h3 className="text-black font-semibold text-xl lg:text-2xl leading-tight tracking-[-0.01em]">
                {cap.title}
              </h3>
              <p className="text-black/60 mt-3 leading-relaxed text-sm lg:text-base">
                {cap.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-50 text-gray-700 text-xs font-medium px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
