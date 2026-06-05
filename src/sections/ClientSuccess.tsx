import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const clients = [
  'Etisalat (e&)', 'First Abu Dhabi Bank', 'Dubai Economy & Tourism', 'Aldar Properties',
  'Emirates Nuclear Energy Corp', 'Etihad Rail', 'Daman Health IC', 'Mashreq Bank',
  'RAK Bank', 'National Bank of Fujairah', 'Oman Arab Bank', 'I&M Bank',
]

const caseStudies = [
  {
    client: 'Etisalat (e&)',
    industry: 'UAE Telecom · 9-Year Partnership',
    stat: '15',
    statLabel: 'ENGAGEMENTS',
    description: 'Enterprise Content Platform, Knowledge & Collaboration, Intelligent Document Processing, Digital Customer Onboarding, RPA, Cloud & SaaS Transformation, Cybersecurity Operations',
  },
  {
    client: 'First Abu Dhabi Bank',
    industry: 'Global Banking · 8-Year Partnership',
    stat: '7',
    statLabel: 'ENGAGEMENTS',
    description: 'Started with 1 project → grew to 7 across all global locations. Enterprise Content, Low-Code Workflow, Regulatory Compliance, IT Service Management',
  },
  {
    client: 'Dubai Economy & Tourism',
    industry: 'UAE Government · 3-Year Partnership',
    stat: '3',
    statLabel: 'ENGAGEMENTS',
    description: 'Enterprise Content Platform, Digital Identity & e-Signing, Digital Correspondence & Communication Management',
  },
]

export default function ClientSuccess() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

    if (logosRef.current) {
      gsap.fromTo(
        logosRef.current.children,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: logosRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="w-full bg-gray-50 py-8 md:py-10 lg:py-32"
      style={{ padding: 'clamp(20px, 2vw, 32px) clamp(24px, 5vw, 80px)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <span className="label-red block mb-4">TRUSTED BY LEADERS</span>
          <h2
            className="text-black font-bold leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            Deep Partnerships, Not One-Off Projects
          </h2>
        </div>

        <div
          ref={logosRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center mb-20"
        >
          {clients.map((client) => (
            <div
              key={client}
              className="text-black/60 font-semibold text-sm md:text-base tracking-[0.02em] opacity-60 hover:opacity-100 transition-opacity duration-300 text-center"
            >
              {client}
            </div>
          ))}
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudies.map((cs) => (
            <div
              key={cs.client}
              className="bg-white border border-gray-100 p-8 md:p-10 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
            >
              <h3 className="text-black font-semibold text-xl md:text-2xl leading-tight">
                {cs.client}
              </h3>
              <span className="inline-block bg-gray-100 text-black/60 text-xs font-medium px-3 py-1 mt-3">
                {cs.industry}
              </span>
              <div className="w-full h-[1px] bg-gray-100 my-6" />
              <span className="text-blue-600 font-bold text-3xl md:text-4xl tracking-[-0.02em]">
                {cs.stat}
              </span>
              <span className="text-blue-600 text-xs uppercase tracking-[0.05em] ml-2 font-semibold">
                {cs.statLabel}
              </span>
              <p className="text-black/60 mt-4 text-sm leading-relaxed">
                {cs.description}
              </p>
              <button className="text-red-600 text-xs uppercase tracking-[0.05em] font-semibold mt-6 flex items-center gap-2 hover:gap-3 transition-all">
                READ CASE STUDY →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
