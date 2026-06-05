import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const team = [
  { name: 'Swamy VLN Boyapati', role: 'MD & CEO', region: 'Global Headquarters', image: '/portrait-swamy.jpg' },
  { name: 'Bader Maktabi', role: 'Director, Middle East Operations', region: 'Middle East & Africa', image: '/portrait-bader.jpg' },
  { name: 'Arun Kumar', role: 'VP, Business Development', region: 'Growth & Expansion', image: '/portrait-arun.jpg' },
  { name: 'John Cunningham', role: 'VP, Consulting', region: 'Advisory & Strategy', image: '/portrait-john.jpg' },
  { name: 'George Avvaru', role: 'VP, Delivery & Operations', region: 'Execution Excellence', image: '/portrait-george.jpg' },
  { name: 'Venu Madhav Moola', role: 'Director, Strategic Programs', region: 'Governance & Programs', image: '/portrait-venu.jpg' },
]

export default function Leadership() {
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
      id="leadership"
      ref={sectionRef}
      className="w-full bg-black py-8 md:py-10 lg:py-32"
      style={{ padding: 'clamp(20px, 2vw, 32px) clamp(24px, 5vw, 80px)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div ref={headerRef} className="mb-6">
          <span className="label-red block mb-4">LEADERSHIP</span>
          <h2
            className="text-white font-bold leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            The Team Behind the Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => { cardRefs.current[i] = el }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="pt-6">
                <h3 className="text-white font-semibold text-lg md:text-xl leading-tight">
                  {member.name}
                </h3>
                <p className="text-black/60 text-sm mt-1">{member.role}</p>
                <div className="w-full h-[1px] bg-gray-800 my-4" />
                <span className="text-blue-200 text-xs uppercase tracking-[0.05em]">
                  {member.region}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
