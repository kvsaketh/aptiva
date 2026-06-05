import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const differentiators = [
  { num: '01', title: 'Land & Expand Model', desc: 'Start with one project. Grow across the enterprise.' },
  { num: '02', title: 'Full-Stack IT Partner', desc: 'Content → Security → Cloud → AI — one relationship.' },
  { num: '03', title: 'Regulated Industry DNA', desc: 'Deep expertise in banking, government, telecom, and energy.' },
  { num: '04', title: 'GenAI & Agentic AI First-Mover', desc: 'LLMs, agentic workflows, and custom AI at enterprise scale.' },
  { num: '05', title: 'Multi-OEM Independence', desc: 'Vendor-agnostic. We recommend what works.' },
  { num: '06', title: 'Speed & Agility of a Boutique', desc: 'Boutique responsiveness with enterprise delivery muscle.' },
  { num: '07', title: 'Global Multi-Market', desc: 'Global expertise since 2017 across 7 global locations.' },
  { num: '08', title: '11 Solutions Portfolio', desc: 'Proprietary IP that creates switching cost and recurring revenue.' },
]

export default function WhyAptiva() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current.children,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
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

    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="why-aptiva"
      ref={sectionRef}
      className="w-full bg-white py-8 md:py-10 lg:py-32"
      style={{ padding: 'clamp(20px, 2vw, 32px) clamp(24px, 5vw, 80px)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div ref={leftRef} className="lg:col-span-3">
            <span className="label-red block mb-4">WHY APTIVA</span>
            <h2
              className="text-black font-bold leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
            >
              Built to Scale. Wired to Execute.
            </h2>

            <div className="grid grid-cols-3 gap-6 md:gap-8 mt-12">
              <div>
                <span className="text-black font-bold leading-none" style={{ fontSize: 'clamp(36px, 4vw, 64px)' }}>63%</span>
                <p className="text-black/60 text-xs uppercase tracking-[0.05em] mt-2">Project Gross Margin</p>
              </div>
              <div>
                <span className="text-black font-bold leading-none" style={{ fontSize: 'clamp(36px, 4vw, 64px)' }}>30%</span>
                <p className="text-black/60 text-xs uppercase tracking-[0.05em] mt-2">Projected Growth</p>
              </div>
              <div>
                <span className="text-blue-600 font-bold leading-none" style={{ fontSize: 'clamp(36px, 4vw, 64px)' }}>∞</span>
                <p className="text-black/60 text-xs uppercase tracking-[0.05em] mt-2">Scalable Solutions</p>
              </div>
            </div>

            <p className="text-black/60 mt-8 max-w-[480px] leading-relaxed" style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}>
              Solutions-led projects command 2x+ margins vs. pure staffing engagements. Every product maps to at least one vertical — zero dead weight in portfolio.
            </p>
          </div>

          <div ref={rightRef} className="lg:col-span-2">
            <div className="bg-gray-800 p-8 md:p-12">
              <p className="text-white font-semibold text-lg md:text-xl leading-relaxed">
                "Before Aptiva, our IT operations were fragmented across multiple vendors. Now we have a single full-stack partner — from content to security to cloud to AI."
              </p>
              <p className="text-black/60 mt-6 text-sm">— VP of Technology, Etisalat (e&)</p>
              <div className="w-10 h-[2px] bg-red-600 mt-4" />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <span className="label-blue block mb-6">COMPETITIVE EDGE</span>
          <h3 className="text-black font-semibold text-2xl md:text-3xl tracking-[-0.02em]">
            What Sets Us Apart
          </h3>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-10">
          {differentiators.map((diff) => (
            <div key={diff.num} className="group">
              <span className="text-black/60 font-bold text-2xl md:text-3xl block mb-2">
                {diff.num}
              </span>
              <h4 className="text-black font-semibold text-lg md:text-xl leading-tight">
                {diff.title}
              </h4>
              <p className="text-black/60 mt-2 text-sm leading-relaxed">
                {diff.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
