import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const regions = [
  {
    name: 'MIDDLE EAST & AFRICA',
    locations: [
      { city: 'Abu Dhabi Office', address: 'Dar Al Salaam Building, 1016\nLiwa Corniche Street\nAbu Dhabi, UAE' },
      { city: 'Dubai Office', address: 'Platinum Business Centre\nAl Nahda 2, P.O. Box 82264\nDubai, UAE' },
      { city: 'Riyadh Office', address: 'Le Cygne Commercial Center\nKaab Bin Malik Street, Al Olaya\nRiyadh, 12611, KSA' },
      { city: 'Nairobi Office', address: 'Purshottam Place, Westlands\nP.O. Box 46728\nNairobi, Kenya' },
    ],
  },
  {
    name: 'AMERICAS',
    locations: [
      { city: 'US Head Office', address: '100 Franklin Sq. Drive, Suite 210\nSomerset, NJ 08873, USA' },
      { city: 'US Office (CA)', address: '5092 Roxborough Drive\nPlacentia, CA 92870, USA' },
      { city: 'Canada Office', address: '4430 Glen Erin Drive\nMississauga, Ontario L5M 4GM\nCanada' },
    ],
  },
  {
    name: 'EUROPE',
    locations: [
      { city: 'UK Head Office', address: '71-75 Shelton Street\nCovent Garden\nLondon WC2H 9JQ, UK' },
      { city: 'UK Office (Birmingham)', address: 'Centre Court\n1301 Stratford Road\nBirmingham B28 9HH, UK' },
    ],
  },
  {
    name: 'INDIA',
    locations: [
      { city: 'India Office', address: 'Ground Floor, N Heights\nMadhapur, Hyderabad\nTelangana 12354, India' },
    ],
  },
]

export default function GlobalPresence() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeRegion, setActiveRegion] = useState(0)
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
  }, [])

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      )
    }
  }, [activeRegion])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full bg-white py-8 md:py-10 lg:py-32"
      style={{ padding: 'clamp(20px, 2vw, 32px) clamp(24px, 5vw, 80px)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <span className="label-blue block mb-4">GLOBAL REACH</span>
          <h2
            className="text-black font-bold leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            10 Offices. 16 Countries. One Mission.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {regions.map((region, i) => (
            <button
              key={region.name}
              onClick={() => setActiveRegion(i)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.05em] font-medium transition-all duration-200 border ${
                activeRegion === i
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-black/60 border-gray-200 hover:border-gray-400'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions[activeRegion].locations.map((loc) => (
            <div key={loc.city} className="bg-gray-50 p-6 md:p-8 relative">
              <div className="absolute top-6 left-6 md:top-8 md:left-8">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-red-600">
                  <path d="M8 0C5.239 0 3 2.239 3 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.761-2.239-5-5-5z" fill="currentColor" />
                  <circle cx="8" cy="5" r="2" fill="white" />
                </svg>
              </div>
              <div className="pl-8">
                <h3 className="text-black font-semibold text-lg md:text-xl leading-tight">
                  {loc.city}
                </h3>
                <p className="text-black/60 mt-2 text-sm leading-relaxed whitespace-pre-line">
                  {loc.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
