import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { Grain } from '../components/motion/Atmosphere'
import { IconArrowRight, IconArrowUpRight, IconBrain, IconZap, IconCloud, IconChart } from '../components/Icons'

gsap.registerPlugin(ScrollTrigger)

const ROTATING = ['future.', 'intelligence.', 'advantage.', 'momentum.']
const CHIPS = [
  { icon: IconBrain, label: 'Agentic AI', x: '60%', y: '20%', d: 0 },
  { icon: IconZap, label: 'Intelligent Automation', x: '74%', y: '40%', d: 0.15 },
  { icon: IconChart, label: 'Data & AI', x: '57%', y: '62%', d: 0.3 },
  { icon: IconCloud, label: 'Cloud & Security', x: '80%', y: '78%', d: 0.45 },
]
const TICKER = [
  'Agentic workflows in production', 'GenAI at enterprise scale', 'Zero-trust by design',
  '16 countries · ME × Africa', '1,200+ engineers', '11 proprietary platforms', 'Automation that compounds',
]

/**
 * Hero — an interactive "agentic network": a 3D constellation of agent nodes
 * wired by proximity links with data-pulses streaming between them, reacting to
 * the cursor. Paired with a kinetic headline whose last word cycles, floating
 * capability chips, and a live status ticker. On-brand for agentic AI + automation.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  /* ───────── WebGL agentic network ───────── */
  useEffect(() => {
    const mount = canvasRef.current
    if (!mount) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(64, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 15)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' })
    mount.appendChild(renderer.domElement)

    const PALETTE = ['#ff5a6e', '#e5322d', '#7c3aed', '#5b86ff', '#2f6bff'].map((c) => new THREE.Color(c))
    const N = 64
    const BOUND = { x: 13, y: 8, z: 6 }
    const nodes: { p: THREE.Vector3; v: THREE.Vector3; c: THREE.Color }[] = []
    for (let i = 0; i < N; i++) {
      nodes.push({
        p: new THREE.Vector3((Math.random() - 0.5) * BOUND.x * 2, (Math.random() - 0.5) * BOUND.y * 2, (Math.random() - 0.5) * BOUND.z * 2),
        v: new THREE.Vector3((Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.008),
        c: PALETTE[i % PALETTE.length],
      })
    }

    // node points
    const nodeGeo = new THREE.BufferGeometry()
    const nodePos = new Float32Array(N * 3)
    const nodeCol = new Float32Array(N * 3)
    nodes.forEach((n, i) => { nodeCol.set([n.c.r, n.c.g, n.c.b], i * 3) })
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3))
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeCol, 3))
    const nodeMat = new THREE.PointsMaterial({ size: 0.17, vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
    const points = new THREE.Points(nodeGeo, nodeMat)
    scene.add(points)

    // links (rebuilt each frame by proximity)
    const MAX_LINKS = 220
    const linkGeo = new THREE.BufferGeometry()
    const linkPos = new Float32Array(MAX_LINKS * 6)
    const linkCol = new Float32Array(MAX_LINKS * 6)
    linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPos, 3))
    linkGeo.setAttribute('color', new THREE.BufferAttribute(linkCol, 3))
    const linkMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false })
    const links = new THREE.LineSegments(linkGeo, linkMat)
    scene.add(links)

    // data pulses traveling node→node
    const PN = 26
    const pulses = Array.from({ length: PN }, () => ({ a: 0, b: 1, t: Math.random(), s: 0.004 + Math.random() * 0.01 }))
    const reseat = (p: typeof pulses[number]) => { p.a = (Math.random() * N) | 0; p.b = (Math.random() * N) | 0; p.t = 0; p.s = 0.004 + Math.random() * 0.012 }
    pulses.forEach(reseat)
    const pulseGeo = new THREE.BufferGeometry()
    const pulsePos = new Float32Array(PN * 3)
    const pulseCol = new Float32Array(PN * 3)
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3))
    pulseGeo.setAttribute('color', new THREE.BufferAttribute(pulseCol, 3))
    const pulseMat = new THREE.PointsMaterial({ size: 0.32, vertexColors: true, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false })
    const pulsePts = new THREE.Points(pulseGeo, pulseMat)
    scene.add(pulsePts)

    const mouse = new THREE.Vector2(0, 0)
    const target = new THREE.Vector3(0, 0, 0)
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    let scrollY = 0
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    const LINK_DIST = 4.2
    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      // cursor as a soft attractor in world space
      target.set(mouse.x * 9, mouse.y * 5, 0)

      for (let i = 0; i < N; i++) {
        const n = nodes[i]
        if (!reduce) {
          n.p.addScaledVector(n.v, 1)
          // gentle pull toward cursor
          n.p.x += (target.x - n.p.x) * 0.0015
          n.p.y += (target.y - n.p.y) * 0.0015
          if (n.p.x > BOUND.x || n.p.x < -BOUND.x) n.v.x *= -1
          if (n.p.y > BOUND.y || n.p.y < -BOUND.y) n.v.y *= -1
          if (n.p.z > BOUND.z || n.p.z < -BOUND.z) n.v.z *= -1
        }
        nodePos.set([n.p.x, n.p.y, n.p.z], i * 3)
      }
      nodeGeo.attributes.position.needsUpdate = true

      // proximity links
      let li = 0
      for (let i = 0; i < N && li < MAX_LINKS; i++) {
        for (let j = i + 1; j < N && li < MAX_LINKS; j++) {
          const a = nodes[i].p, b = nodes[j].p
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 < LINK_DIST * LINK_DIST) {
            linkPos.set([a.x, a.y, a.z, b.x, b.y, b.z], li * 6)
            const ca = nodes[i].c, cb = nodes[j].c
            linkCol.set([ca.r, ca.g, ca.b, cb.r, cb.g, cb.b], li * 6)
            li++
          }
        }
      }
      linkGeo.setDrawRange(0, li * 2)
      linkGeo.attributes.position.needsUpdate = true
      linkGeo.attributes.color.needsUpdate = true

      // pulses
      for (let k = 0; k < PN; k++) {
        const p = pulses[k]
        p.t += reduce ? 0 : p.s
        if (p.t >= 1) reseat(p)
        const a = nodes[p.a].p, b = nodes[p.b].p
        pulsePos.set([a.x + (b.x - a.x) * p.t, a.y + (b.y - a.y) * p.t, a.z + (b.z - a.z) * p.t], k * 3)
        const c = nodes[p.b].c
        pulseCol.set([c.r, c.g, c.b], k * 3)
      }
      pulseGeo.attributes.position.needsUpdate = true
      pulseGeo.attributes.color.needsUpdate = true

      // camera drift + scroll depth
      camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.04
      camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.04
      camera.position.z = 15 + scrollY * 0.004
      camera.lookAt(0, 0, 0)
      points.rotation.z = scrollY * 0.0002
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      nodeGeo.dispose(); nodeMat.dispose(); linkGeo.dispose(); linkMat.dispose(); pulseGeo.dispose(); pulseMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  /* ───────── entrance + kinetic headline word ───────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 })
      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo('.hero-line', { opacity: 0, y: 80, rotateX: -50 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.12 }, '-=0.3')
        .fromTo('.hero-sub', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo('.hero-cta', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, '-=0.55')
        .fromTo('.hero-chip', { opacity: 0, scale: 0.8, y: 14 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.12 }, '-=0.5')
        .fromTo('.hero-metric', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')

      gsap.to(contentRef.current, {
        yPercent: -10, opacity: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

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
      {/* depth + legibility veil */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(120%_90%_at_28%_45%,rgba(6,6,17,0.78)_0%,rgba(6,6,17,0.35)_45%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-64 bg-gradient-to-t from-ink-900 to-transparent" />
      <Grain />

      {/* floating capability chips */}
      <div className="pointer-events-none absolute inset-0 z-[2] hidden lg:block">
        {CHIPS.map((c) => {
          const Icon = c.icon
          return (
            <div key={c.label} className="hero-chip animate-float absolute flex items-center gap-2.5 border border-white/12 bg-white/[0.05] px-4 py-2.5 backdrop-blur-md"
              style={{ left: c.x, top: c.y, animationDelay: `${c.d * 3}s` }}>
              <span className="icon-tile h-7 w-7"><Icon className="h-3.5 w-3.5 text-white/85" /></span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/75">{c.label}</span>
            </div>
          )
        })}
      </div>

      <div ref={contentRef} className="container-xl relative z-10 w-full pt-28 pb-24">
        <div className="max-w-4xl" style={{ perspective: 900 }}>
          <span className="hero-eyebrow eyebrow-red mb-7">Agentic AI · Automation · Digital Transformation</span>

          <h1 className="display-1 text-white text-balance">
            <span className="hero-line block">Engineering the</span>
            <span className="hero-line block">enterprise</span>
            <span className="hero-line block overflow-hidden pb-[0.12em]">
              <span ref={wordRef} className="inline-block text-gradient-red animate-grad-pan">future.</span>
            </span>
          </h1>

          <p className="hero-sub lead mt-8 max-w-xl text-white/65">
            We design, build and run the intelligent systems that move the region forward —
            uniting agentic AI, automation, cloud and cybersecurity into one accountable partnership
            for the Middle East &amp; Africa.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#/solutions" className="hero-cta btn-primary"><span>Explore solutions</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
            <a href="#/case-studies" className="hero-cta btn-ghost group">See the outcomes<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </div>

          <div className="mt-16 grid max-w-2xl grid-cols-2 gap-px border border-white/10 bg-white/[0.04] sm:grid-cols-4">
            {[
              { v: '20+', l: 'Years' },
              { v: '16', l: 'Countries' },
              { v: '1,200+', l: 'Engineers' },
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
