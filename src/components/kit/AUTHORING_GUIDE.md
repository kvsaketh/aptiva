# Aptiva Page Authoring Guide (READ FIRST)

You are rebuilding an internal page of the **Aptiva Technologies** marketing site to a
**premium, content-rich, enterprise** standard with **wow-factor animation**. The gold
standard reference is `src/pages/Home.tsx` + `src/sections/*`. Match that quality.

## Company context (be accurate & context-aware)
Aptiva Technologies — full-stack IT & digital-transformation partner for the global
enterprise. Founded 2017, 7 global locations, 50+ enterprise clients, 45 strategic partnerships, 11 proprietary
solutions. **Lead themes to emphasize everywhere: Agentic AI, GenAI, intelligent automation,
and digital transformation** — woven into an enterprise, regulated-industry narrative (banking,
government, telecom, energy). Voice: confident, precise, outcome-oriented, senior. No fluff,
no buzzword soup — concrete capabilities, measurable outcomes, real industry language.
**Do NOT delete the real data** already in the page (service/solution/industry/client lists,
slugs, contact details). Keep slugs/links/hrefs intact. EXPAND content massively around it.

## Design system (use these — do not invent new colors/spacing)
Surfaces: `surface-ink-flat`, `surface-ink-raised`, `surface-paper`, `surface-paper-warm`.
Alternate dark/light sections down the page for rhythm.
Spacing: wrap sections in `<section class="surface-* relative overflow-hidden">` then an inner
`<div class="container-xl section-y">` (generous vertical rhythm). Never cramped.
Type: `display-1/2/3`, `lead`. Headings auto-use Clash Display. Body is Satoshi. Labels use
`font-mono`. Use `text-balance` on headings.
Gradients (SEPARATE families — never the muddy mix): red = `text-gradient-red`/`bg-grad-red`,
blue = `text-gradient-blue`/`bg-grad-blue`. Use red as the primary brand accent; use blue for
data / platform / secondary contexts. Pick ONE accent family per section.
Eyebrows: `eyebrow-red` / `eyebrow-blue` on dark; `eyebrow-on-light` / `eyebrow-blue-on-light`
on light. Buttons: `btn-primary` (red), `btn-primary-blue`, `btn-ghost`, `btn-dark`.
Cards: `card-ink` (dark), `card-paper` (light). Icon tiles: `icon-tile`, `icon-tile-blue`,
`icon-tile-light`, `icon-tile-blue-light` (put a `group` on the parent for hover effects).
Text color rules (IMPORTANT): on dark use `text-white`, `text-white/70`, `text-white/55`.
On light use `text-ink-900`, `text-ink-900/70`, `text-ink-900/55`. NEVER `text-black/60` on dark.

## Components (import and reuse)
- `import PageHeader from '@/components/layout/PageHeader'` — props: label, title, subtitle,
  bgImage?, crumbs?:{label,href?}[], stats?:{value,label}[]. Use it as the page hero.
- `import Reveal from '@/components/motion/Reveal'` — scroll reveal. Wrap groups; use
  `stagger=".x"` to stagger children with that class.
- `import SectionHeading from '@/components/motion/SectionHeading'` — props: eyebrow, title,
  intro?, align?, theme?:'dark'|'light', counter?.
- `import { Aurora, GridBackdrop, Grain, BrandRule } from '@/components/motion/Atmosphere'`
- `import KineticBackdrop from '@/components/kit/KineticBackdrop'` — variant:'orbit'|'mesh'|
  'flow'|'rings', color:'red'|'blue'. The signature WOW backdrop. Put in a relative section.
- `import TiltCard from '@/components/kit/TiltCard'` — 3D tilt + cursor spotlight. glow:'red'|'blue'.
- `import Counter from '@/components/kit/Counter'` — scroll count-up number.
- `import StatBand from '@/components/kit/StatBand'` — animated stat row (stats:{to,suffix,label}[]).
- `import Marquee from '@/components/kit/Marquee'` — infinite strip of nodes.
- `import CTASection from '@/components/kit/CTASection'` — closing CTA band. End EVERY page with it.
- `import MagneticButton from '@/components/motion/MagneticButton'`
- Icons: `import { IconArrowRight, IconArrowUpRight, IconBrain, IconCloud, ... } from '@/components/Icons'`
  (25+ icons: Document, Brain, Cloud, Chart, Headset, Monitor, FileCheck, Lightbulb, Settings,
  Smartphone, Users, CheckCircle, Shield, Rocket, Award, Zap, Globe, Building, Antenna, Landmark,
  Construction, HeartPulse, Server, Layers, TrendingUp, ArrowRight, ArrowUpRight, Plus, Sparkle).
- Brand logos: `import { clients, partnerGroups } from '@/data/brands'` +
  `import BrandMark from '@/components/BrandMark'` (renders real logo + name, grayscale→color).
- Public images available: /industry-*.jpg (banking, telecom, government, energy, real-estate,
  healthcare), /solution-<slug>.jpg, /case-<slug>.jpg, /about-*.jpg (hero, ai, global, office,
  partners), /tech-abstract-1.jpg, /tech-abstract-2.jpg, /portrait-*.jpg, /hero-abstract.jpg.

## WOW factor — every page must have several of:
- A `KineticBackdrop` behind at least one section (orbit/mesh/flow).
- A `PageHeader` with `stats` for the intro.
- At least one `TiltCard` grid (services/features/solutions) with spotlight glow.
- An animated `StatBand` (count-ups) OR `Counter`s inline.
- A `Marquee` strip (capabilities / tech / outcomes).
- Hover micro-interactions on every card/link (translate, gradient reveal, icon-tile flip).
- Scroll reveals via `Reveal` on every major block.
- Use real images with `bg-cover` + gradient overlays + `group-hover:scale-105` (or `animate-ken`).

## Required page structure (rich — aim for 6–10 substantial sections)
1. `PageHeader` (label, bold title with a gradient last word, subtitle, crumbs, stats).
2. Intro / positioning block (a strong narrative paragraph + supporting points).
3. Core content grids (capabilities / features / offerings) — TiltCard grids, detailed copy.
4. "How it works" / process / methodology (numbered steps or timeline).
5. Proof: stats band, outcomes, or relevant client logos (`BrandMark`).
6. Industry/use-case relevance OR FAQ OR deliverables — context-specific deep content.
7. Related links (cross-link to services/solutions/industries/case-studies).
8. `CTASection` to close.
Write REAL, specific, professional copy — paragraphs and bullet lists with genuine substance
(architecture, outcomes, methods, compliance, KPIs). The client said pages feel empty — fill
them with credible enterprise content. Every section needs a heading + intro + body.

## Rules
- Default export a React component (no props) named after the page.
- Keep it self-contained; reuse the kit. TypeScript strict (no unused vars/imports).
- No new npm deps. Mobile-responsive (grid-cols stacks on mobile).
- Keep existing routes/hrefs working (`#/...` hash links).
- Verify your file has balanced JSX and compiles conceptually before finishing.
