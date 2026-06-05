import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { Grain } from '../components/motion/Atmosphere'
import { IconArrowRight, IconArrowUpRight } from '../components/Icons'

gsap.registerPlugin(ScrollTrigger)

const ROTATING = ['future.', 'intelligence.', 'advantage.', 'momentum.']
const TICKER = [
  'Agentic workflows in production', 'GenAI at enterprise scale', 'Zero-trust by design',
  '7 global locations worldwide', '50+ enterprise clients', '11 proprietary platforms', 'Automation that compounds',
]

/**
 * Hero — calm "data-mesh" WebGL background (rippling point grid + drifting haze +
 * wireframe core) with a kinetic headline. A right-anchored SVG vector system
 * reacts to scroll (rotates, parallaxes, draws in) — screen-size aware and kept
 * clear of the text column via a left-fade mask + legibility veil.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  /* ───────── WebGL: old-style data-mesh ───────── */
  useEffect(() => {
    const mount = canvasRef.current
    if (!mount) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 1.4, 9)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' })
    mount.appendChild(renderer.domElement)

    const cRed = new THREE.Color('#e5322d'), cViolet = new THREE.Color('#7c3aed'), cBlue = new THREE.Color('#2f6bff')

    // rippling wave grid of points
    const GX = 88, GZ = 88, GAP = 0.47, total = GX * GZ
    const gPos = new Float32Array(total * 3), gCol = new Float32Array(total * 3)
    const base: number[] = []
    let p = 0
    for (let x = 0; x < GX; x++) {
      for (let z = 0; z < GZ; z++) {
        const px = (x - GX / 2) * GAP, pz = (z - GZ / 2) * GAP
        gPos[p * 3] = px; gPos[p * 3 + 1] = 0; gPos[p * 3 + 2] = pz
        base.push(px, 0, pz)
        const t = x / GX
        const col = t < 0.5 ? cRed.clone().lerp(cViolet, t * 2) : cViolet.clone().lerp(cBlue, (t - 0.5) * 2)
        gCol[p * 3] = col.r; gCol[p * 3 + 1] = col.g; gCol[p * 3 + 2] = col.b
        p++
      }
    }
    const gGeo = new THREE.BufferGeometry()
    gGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3))
    gGeo.setAttribute('color', new THREE.BufferAttribute(gCol, 3))
    const gMat = new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })
    const grid = new THREE.Points(gGeo, gMat)
    grid.rotation.x = -Math.PI / 2.5
    grid.position.y = -1.6
    scene.add(grid)

    // drifting haze
    const PN = 360
    const hPos = new Float32Array(PN * 3), hCol = new Float32Array(PN * 3)
    for (let i = 0; i < PN; i++) {
      hPos[i * 3] = (Math.random() - 0.5) * 24; hPos[i * 3 + 1] = (Math.random() - 0.5) * 14; hPos[i * 3 + 2] = (Math.random() - 0.5) * 14
      const col = [cRed, cViolet, cBlue][Math.floor(Math.random() * 3)]
      hCol[i * 3] = col.r; hCol[i * 3 + 1] = col.g; hCol[i * 3 + 2] = col.b
    }
    const hGeo = new THREE.BufferGeometry()
    hGeo.setAttribute('position', new THREE.BufferAttribute(hPos, 3))
    hGeo.setAttribute('color', new THREE.BufferAttribute(hCol, 3))
    const hMat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
    const haze = new THREE.Points(hGeo, hMat)
    scene.add(haze)

    // wireframe core (right side)
    const core = new THREE.Group()
    const ico = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.1, 1)), new THREE.LineBasicMaterial({ color: '#5b86ff', transparent: true, opacity: 0.16 }))
    const ico2 = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.7, 1)), new THREE.LineBasicMaterial({ color: '#ff5a55', transparent: true, opacity: 0.1 }))
    core.add(ico, ico2); core.position.set(2.6, 1.2, -1); scene.add(core)

    const mouse = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => { mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = -(e.clientY / window.innerHeight) * 2 + 1 }
    window.addEventListener('mousemove', onMove)
    let scrollY = 0
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    const clock = new THREE.Clock()
    let raf = 0
    const arr = gGeo.attributes.position.array as Float32Array
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      if (!reduce) {
        for (let i = 0; i < total; i++) {
          const bx = base[i * 3], bz = base[i * 3 + 2]
          arr[i * 3 + 1] = Math.sin(bx * 0.5 + t * 0.9) * 0.42 + Math.cos(bz * 0.5 + t * 0.7) * 0.42
        }
        gGeo.attributes.position.needsUpdate = true
        haze.rotation.y = t * 0.03
        core.rotation.y = t * 0.12; core.rotation.x = t * 0.06; ico2.rotation.z = -t * 0.1
      }
      const targetY = 1.4 + mouse.y * 0.5 - scrollY * 0.0014
      camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04
      camera.position.y += (targetY - camera.position.y) * 0.04
      camera.position.z = 9 + scrollY * 0.0016
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => { camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight) }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize)
      gGeo.dispose(); gMat.dispose(); hGeo.dispose(); hMat.dispose(); ico.geometry.dispose(); ico2.geometry.dispose(); renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  /* ───────── entrance, kinetic word, scroll-reactive vectors ───────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 })
      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo('.hero-line', { opacity: 0, y: 80, rotateX: -50 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.12 }, '-=0.3')
        .fromTo('.hero-sub', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo('.hero-cta', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, '-=0.55')
        .fromTo('.hero-metric', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
        .fromTo('.hero-vec', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, '-=0.9')

      // content lifts/fades as you scroll past
      gsap.to(contentRef.current, {
        yPercent: -10, opacity: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      // SCROLL-REACTIVE VECTORS: rotate, parallax up, and draw the dashed rings in
      const scrub = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
      gsap.to('.vec-rotate', { rotate: 120, transformOrigin: '50% 50%', ease: 'none', scrollTrigger: scrub })
      gsap.to('.vec-rotate-rev', { rotate: -90, transformOrigin: '50% 50%', ease: 'none', scrollTrigger: scrub })
      gsap.to('.hero-vec', { yPercent: -16, ease: 'none', scrollTrigger: scrub })
      gsap.fromTo('.vec-draw', { strokeDashoffset: 0 }, { strokeDashoffset: 520, ease: 'none', scrollTrigger: scrub })

      // cycle the last headline word
      const el = wordRef.current
      if (el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let i = 0
        const swap = () => {
          i = (i + 1) % ROTATING.length
          gsap.to(el, { yPercent: -110, opacity: 0, duration: 0.42, ease: 'power2.in', onComplete: () => {
            el.textContent = ROTATING[i]
            gsap.fromTo(el, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
          } })
        }
        const id = window.setInterval(swap, 2600)
        return () => window.clearInterval(id)
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="surface-ink-flat grain relative flex min-h-screen items-center overflow-hidden">
      <div ref={canvasRef} className="absolute inset-0 z-0" />

      {/* scroll-reactive vector system — right-anchored, masked away from the text, lg+ only */}
      <div
        className="hero-vec pointer-events-none absolute right-[-6vw] top-1/2 z-[2] hidden h-[150vh] w-[58vw] max-w-[1000px] -translate-y-1/2 lg:block"
        style={{ maskImage: 'linear-gradient(90deg, transparent 0%, #000 32%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 32%)' }}
        aria-hidden
      >
        <svg viewBox="0 0 600 600" fill="none" className="h-full w-full">
          <defs>
            <linearGradient id="hv-red" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff7d9d" /><stop offset="100%" stopColor="#9e1420" /></linearGradient>
            <linearGradient id="hv-blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6fb0ff" /><stop offset="100%" stopColor="#7c3aed" /></linearGradient>
            <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" /><stop offset="100%" stopColor="#7c3aed" stopOpacity="0" /></radialGradient>
          </defs>
          <g transform="translate(300 300)">
            <circle r="280" fill="url(#hv-glow)" />
            {/* outer dashed ring — draws in on scroll */}
            <g className="vec-rotate">
              <circle r="250" stroke="url(#hv-blue)" strokeWidth="1.2" strokeOpacity="0.55" className="vec-draw" strokeDasharray="10 14" />
              <circle cx="250" cy="0" r="4.5" fill="#6fb0ff" />
            </g>
            {/* counter-rotating mid ring */}
            <g className="vec-rotate-rev">
              <circle r="180" stroke="url(#hv-red)" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 12" />
              <circle cx="-180" cy="0" r="4" fill="#ff7d9d" />
            </g>
            {/* radial tick lines */}
            <g className="vec-rotate" strokeOpacity="0.18" stroke="#9fb4ff" strokeWidth="1">
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i / 24) * Math.PI * 2
                return <line key={i} x1={Math.cos(a) * 112} y1={Math.sin(a) * 112} x2={Math.cos(a) * 132} y2={Math.sin(a) * 132} />
              })}
            </g>
            {/* inner ring + core */}
            <circle r="104" stroke="#5b86ff" strokeWidth="1" strokeOpacity="0.4" className="vec-draw" strokeDasharray="2 8" />
            <circle r="54" stroke="url(#hv-red)" strokeWidth="1.4" strokeOpacity="0.6" />
            <circle r="3.5" fill="#ff5a6e" />
          </g>
        </svg>
      </div>

      {/* depth + legibility veil (keeps the text column dark/clear) */}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(120%_90%_at_26%_45%,rgba(6,6,17,0.82)_0%,rgba(6,6,17,0.4)_42%,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-64 bg-gradient-to-t from-ink-900 to-transparent" />
      <Grain />

      <div ref={contentRef} className="container-xl relative z-10 w-full pt-28 pb-24">
        <div className="max-w-3xl" style={{ perspective: 900 }}>
          <span className="hero-eyebrow eyebrow-red mb-7">Agentic AI · Automation · Digital Transformation</span>

          <h1 className="display-1 text-white text-balance">
            <span className="hero-line block">Engineering the</span>
            <span className="hero-line block">enterprise</span>
            <span className="hero-line block overflow-hidden pb-[0.12em]">
              <span ref={wordRef} className="inline-block text-gradient-red animate-grad-pan">future.</span>
            </span>
          </h1>

          <p className="hero-sub lead mt-8 max-w-xl text-white/65">
            We design, build and run the intelligent systems that move the world forward —
            uniting agentic AI, automation, cloud and cybersecurity into one accountable partnership
            for the global enterprise.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#/solutions" className="hero-cta btn-primary"><span>Explore solutions</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
            <a href="#/case-studies" className="hero-cta btn-ghost group">See the outcomes<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </div>

          <div className="mt-16 grid max-w-2xl grid-cols-2 gap-px border border-white/10 bg-white/[0.04] sm:grid-cols-4">
            {[
              { v: '2017', l: 'Founded' },
              { v: '7', l: 'Locations' },
              { v: '50+', l: 'Clients' },
              { v: '11', l: 'Platforms' },
            ].map((m) => (
              <div key={m.l} className="hero-metric bg-ink-900/55 px-5 py-5 backdrop-blur-sm">
                <div className="font-display text-2xl font-semibold text-white md:text-3xl">{m.v}</div>
                <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* live status ticker */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-ink-900/60 py-3 backdrop-blur-md">
        <div className="flex w-max animate-marquee items-center gap-8">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-grad-red" style={{ boxShadow: '0 0 8px rgba(255,90,110,0.8)' }} />
                {t}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
