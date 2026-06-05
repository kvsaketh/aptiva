import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'CAPABILITIES', href: '#capabilities' },
  { label: 'SOLUTIONS', href: '#solutions' },
  { label: 'WHY APTIVA', href: '#why-aptiva' },
  { label: 'CLIENTS', href: '#clients' },
  { label: 'LEADERSHIP', href: '#leadership' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
    )
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-xl' : 'bg-transparent'
        }`}
        style={{ padding: '0 clamp(24px, 5vw, 80px)' }}
      >
        <a href="#" className="flex items-center gap-1 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-white font-extrabold text-sm tracking-[0.1em]">APTIVA</span>
          <span className="w-1.5 h-1.5 bg-red-600 inline-block" />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-white hover:text-white text-xs font-medium uppercase tracking-[0.05em] transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            onClick={() => scrollTo('#contact')}
            className="bg-red-600 hover:bg-red-800 text-white text-xs font-semibold uppercase tracking-[0.05em] px-6 py-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            GET IN TOUCH
          </button>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-white text-2xl font-semibold uppercase tracking-[0.05em] hover:text-red-600 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="bg-red-600 text-white text-sm font-semibold uppercase tracking-[0.05em] px-8 py-4 mt-4"
          >
            GET IN TOUCH
          </button>
        </div>
      )}
    </>
  )
}
