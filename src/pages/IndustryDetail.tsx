import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import type { ComponentType, SVGProps } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { GridBackdrop, Grain, Aurora } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import Counter from '../components/kit/Counter'
import Marquee from '../components/kit/Marquee'
import CTASection from '../components/kit/CTASection'
import BrandMark from '../components/BrandMark'
import { brand } from '../data/brands'
import {
  IconBuilding, IconAntenna, IconLandmark, IconZap, IconConstruction, IconHeartPulse,
  IconArrowRight, IconArrowUpRight, IconBrain, IconShield, IconCheckCircle, IconPlus,
} from '../components/Icons'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

interface Outcome { to: number; prefix?: string; suffix?: string; decimals?: number; label: string }
interface HelpItem { title: string; desc: string; angle: string }
interface SolutionRef { name: string; slug: string; type: 'solution' | 'service'; tag: string }
interface ComplianceItem { code: string; detail: string }

interface IndustryData {
  name: string
  icon: Icon
  image: string
  tagline: string
  subtitle: string
  intro: string
  challengeIntro: string
  challenges: { title: string; desc: string }[]
  helpIntro: string
  help: HelpItem[]
  solutions: SolutionRef[]
  complianceIntro: string
  compliance: ComplianceItem[]
  outcomes: Outcome[]
  clients: string[]
  marquee: string[]
}

const industriesData: Record<string, IndustryData> = {
  banking: {
    name: 'Banking & Financial Services',
    icon: IconBuilding,
    image: '/industry-banking.jpg',
    tagline: 'Digital-First Banking for the Modern Economy',
    subtitle: 'Agentic onboarding, intelligent lending and compliant content for the banks, NBFCs and insurers reshaping global markets.',
    intro: 'Banking worldwide is in the middle of its deepest structural shift in a generation. Open-banking mandates, instant-payment rails, digital-native challengers and customers who expect to open an account in minutes have made the legacy core a liability rather than an asset. Aptiva has spent years inside this sector — modernizing content, automating credit and onboarding, and putting GenAI into production for fifteen-plus institutions worldwide. We pair that domain fluency with audited, regulator-ready delivery so transformation lands without compromising trust.',
    challengeIntro: 'The barriers are rarely the technology itself — they are the regulatory weight, legacy entanglement and data fragmentation that surround it.',
    challenges: [
      { title: 'Legacy core constraints', desc: 'Monolithic core banking systems throttle product velocity and make every new channel a custom integration project.' },
      { title: 'Compliance complexity', desc: 'CBUAE, SAMA, CBO and CBK mandates plus Basel III/IV, AML and CFT obligations multiply the cost of every change.' },
      { title: 'Onboarding friction', desc: 'Manual KYC and document-heavy onboarding drive abandonment precisely where acquisition is most expensive.' },
      { title: 'Fragmented customer data', desc: 'Siloed systems block the 360-degree view needed for risk, personalization and next-best-action.' },
      { title: 'Escalating threat surface', desc: 'Financial institutions remain the prime target for fraud, ransomware and nation-state activity.' },
      { title: 'Fintech & neobank pressure', desc: 'Digital-native competitors set a customer-experience bar that incumbents must now meet or beat.' },
    ],
    helpIntro: 'We attack the document-heavy, decision-heavy work at the core of banking with Agentic AI and automation — then wrap it in the governance regulators expect.',
    help: [
      { title: 'Agentic onboarding & KYC', desc: 'Conversational onboarding with intelligent capture, automated identity verification and AML screening that turns a five-day journey into minutes.', angle: 'Agentic AI' },
      { title: 'Intelligent lending', desc: 'AI-assisted credit decisioning and document analysis across retail and corporate lending, with explainable, auditable outcomes.', angle: 'GenAI' },
      { title: 'Compliant content & correspondence', desc: 'Enterprise content management for millions of banking documents with retention, e-signing and regulator-ready correspondence.', angle: 'Automation' },
      { title: 'Risk & regulatory reporting', desc: 'Governed data platforms and RPA that automate reconciliations, regulatory submissions and Basel reporting.', angle: 'Digital Transformation' },
    ],
    solutions: [
      { name: 'Kredence', slug: 'kredence', type: 'solution', tag: 'Corporate lending' },
      { name: 'Lendora', slug: 'lendora', type: 'solution', tag: 'Retail lending' },
      { name: 'Corroflow', slug: 'corroflow', type: 'solution', tag: 'Correspondence' },
      { name: 'Signova', slug: 'signova', type: 'solution', tag: 'Digital signing' },
      { name: 'GenAI & Automation', slug: 'ai-automation', type: 'service', tag: 'Agentic AI' },
      { name: 'Cloud & Security', slug: 'cloud-security', type: 'service', tag: 'Zero-trust' },
    ],
    complianceIntro: 'Banking compliance in the region is non-negotiable and constantly moving. We build it into the architecture rather than bolting it on.',
    compliance: [
      { code: 'CBUAE / SAMA / CBO / CBK', detail: 'Central-bank frameworks across the UAE, Saudi Arabia, Oman and Kenya — encoded as policy, not paperwork.' },
      { code: 'Basel III / IV', detail: 'Capital, liquidity and risk-reporting automation with full data lineage and audit trails.' },
      { code: 'AML / CFT & KYC', detail: 'Continuous screening, sanctions checks and suspicious-activity workflows with explainable decisions.' },
      { code: 'PDPL & data residency', detail: 'In-country hosting and personal-data-protection controls aligned to regional sovereignty rules.' },
      { code: 'Islamic banking', detail: 'Shariah-compliant workflows, profit-calculation engines and specialized product reporting.' },
    ],
    outcomes: [
      { to: 60, suffix: '%', label: 'Faster digital onboarding' },
      { to: 90, suffix: '%', label: 'Cost reduction on loan processing' },
      { to: 5, prefix: '', suffix: 'M+', label: 'Banking documents under governance' },
      { to: 15, suffix: '+', label: 'Financial institutions served' },
    ],
    clients: ['fab', 'mashreq', 'rakbank', 'nbf', 'oab', 'im-bank', 'dtb', 'dahabshiil', 'fcb', 'nmb'],
    marquee: ['DIGITAL ONBOARDING', 'AGENTIC KYC', 'CREDIT DECISIONING', 'AML / CFT', 'BASEL III/IV', 'CORE INTEGRATION', 'REGULATORY REPORTING'],
  },
  telecom: {
    name: 'Telecommunications',
    icon: IconAntenna,
    image: '/industry-telecom.jpg',
    tagline: 'Next-Generation Networks, Intelligent Operations',
    subtitle: 'OSS/BSS modernization, omni-channel CX and AI-driven network intelligence for the operators connecting the world.',
    intro: 'Telecom operators worldwide run some of the world’s most demanding networks — spanning 5G, IoT and decades of legacy infrastructure, serving tens of millions of subscribers each. As connectivity commoditizes, the battle has moved to experience, operational efficiency and new digital revenue. Aptiva partners with leading operators such as Etisalat (e&) on end-to-end transformation: from enterprise content platforms serving ten-thousand-plus employees to AI-powered assurance processing billions of network events a day.',
    challengeIntro: 'Operators must modernize the experience layer and the operational core simultaneously — without disrupting a network the region depends on.',
    challenges: [
      { title: 'Multi-generation complexity', desc: 'Running 5G, IoT and legacy estates in parallel multiplies operational and integration overhead.' },
      { title: 'Subscriber churn', desc: 'Poor digital experience and slow service delivery drive defection in fiercely competitive markets.' },
      { title: 'Manual service delivery', desc: 'Paper-and-swivel-chair processes slow activation, provisioning and care.' },
      { title: 'Network & customer silos', desc: 'Disconnected OSS/BSS and data stores block unified, real-time insight.' },
      { title: 'Data-retention obligations', desc: 'Lawful-intercept and retention mandates demand secure, governed content at scale.' },
      { title: 'Reactive operations', desc: 'Without predictive assurance, faults become outages before anyone notices.' },
    ],
    helpIntro: 'We modernize both the experience and the operational core — with automation and AIOps that turn network and customer data into action.',
    help: [
      { title: 'Network intelligence & AIOps', desc: 'AI-powered monitoring, anomaly detection and predictive maintenance that pre-empt faults across the estate.', angle: 'Agentic AI' },
      { title: 'Digital onboarding & CX', desc: 'Omni-channel journeys and agentic care that cut subscriber activation from days to minutes.', angle: 'Digital Transformation' },
      { title: 'Process automation at scale', desc: 'Fleets of bots automating billing, provisioning, care and network operations across business units.', angle: 'Automation' },
      { title: 'Enterprise content & knowledge', desc: 'Unified document, knowledge and correspondence platforms serving the whole workforce.', angle: 'GenAI' },
    ],
    solutions: [
      { name: 'Corroflow', slug: 'corroflow', type: 'solution', tag: 'Correspondence' },
      { name: 'Classifyr', slug: 'classifyr', type: 'solution', tag: 'Document AI' },
      { name: 'Adscopia', slug: 'adscopia', type: 'solution', tag: 'DOOH & media' },
      { name: 'Gazelens', slug: 'gazelens', type: 'solution', tag: 'Audience analytics' },
      { name: 'Data & Analytics', slug: 'data-analytics', type: 'service', tag: 'AIOps' },
      { name: 'Customer Experience', slug: 'customer-experience', type: 'service', tag: 'CCaaS' },
    ],
    complianceIntro: 'Operators sit under telecom-regulator, data-protection and security obligations across every market they serve.',
    compliance: [
      { code: 'TDRA / national regulators', detail: 'Licensing, quality-of-service and lawful-intercept obligations across the region.' },
      { code: 'ISO 27001', detail: 'Information-security management underpinning SOC operations and content platforms.' },
      { code: 'Data retention & sovereignty', detail: 'Secure, governed retention of subscriber and network data with in-country residency.' },
      { code: 'NESA / SIA controls', detail: 'National cybersecurity standards for critical communications infrastructure.' },
      { code: 'PDPL', detail: 'Personal-data-protection controls across subscriber lifecycle and care.' },
    ],
    outcomes: [
      { to: 99.99, decimals: 2, suffix: '%', label: 'Network platform uptime' },
      { to: 10000, prefix: '', suffix: '+', label: 'Employees on the content platform' },
      { to: 50, suffix: '+', label: 'Automation bots in production' },
      { to: 15000, suffix: '+', label: 'Endpoints under SOC protection' },
    ],
    clients: ['etisalat', 'liquid', 'moro'],
    marquee: ['OSS / BSS', 'NETWORK AIOPS', 'PREDICTIVE ASSURANCE', '5G & IOT', 'OMNI-CHANNEL CX', 'INTELLIGENT CAPTURE', 'SOC-AS-A-SERVICE'],
  },
  government: {
    name: 'Government & Public Sector',
    icon: IconLandmark,
    image: '/industry-government.jpg',
    tagline: 'Digital Government Excellence, Citizen-First Services',
    subtitle: 'Secure content, intelligent correspondence and digital identity for sovereign, citizen-first public services.',
    intro: 'Governments across the region are pursuing ambitious agendas — UAE Centennial 2071, Saudi Vision 2030, Kenya’s Digital Master Plan — that demand private-sector experience at public-sector scale, security and sovereignty. Aptiva has delivered for the UAE Ministry of Finance, Dubai Economy & Tourism, Environment Agency Abu Dhabi and Ajman DED, modernizing content, correspondence and identity so entities can serve citizens digitally while meeting the highest bar for data sovereignty and transparency.',
    challengeIntro: 'Public-sector transformation must reconcile citizen expectations with sovereignty, budget discipline and cross-entity complexity.',
    challenges: [
      { title: 'Paper-bound processes', desc: 'Manual, document-heavy workflows delay service delivery and frustrate citizens.' },
      { title: 'Cross-entity silos', desc: 'Disconnected systems prevent the joined-up services citizens expect.' },
      { title: 'Sovereignty & security', desc: 'Strict data-residency and classification requirements govern every deployment.' },
      { title: 'Budget accountability', desc: 'Public funds demand high, demonstrable ROI on every programme.' },
      { title: 'Arabic-first delivery', desc: 'Full bilingual support is mandatory, not optional, across all services.' },
      { title: 'Rising citizen expectations', desc: 'Citizens compare government services to the best digital experiences they use daily.' },
    ],
    helpIntro: 'We digitize the citizen journey end-to-end — capture, route, decide, sign and archive — with sovereignty and Arabic-first design built in.',
    help: [
      { title: 'Intelligent correspondence', desc: 'Agentic routing, classification and response for citizen and business communications at scale.', angle: 'Agentic AI' },
      { title: 'Intelligent document processing', desc: 'AI capture and classification of tens of thousands of citizen communications annually.', angle: 'GenAI' },
      { title: 'Digital identity & e-signing', desc: 'UAE Pass integration and digital signing for secure, paperless government services.', angle: 'Digital Transformation' },
      { title: 'Records & ITSM', desc: 'Compliant records management and service management across departments.', angle: 'Automation' },
    ],
    solutions: [
      { name: 'Corroflow', slug: 'corroflow', type: 'solution', tag: 'Correspondence' },
      { name: 'Classifyr', slug: 'classifyr', type: 'solution', tag: 'Document AI' },
      { name: 'Vaultera', slug: 'vaultera', type: 'solution', tag: 'Records & archival' },
      { name: 'Signova', slug: 'signova', type: 'solution', tag: 'Digital signing' },
      { name: 'Procuria', slug: 'procuria', type: 'solution', tag: 'E-procurement' },
      { name: 'Content Intelligence', slug: 'content-intelligence', type: 'service', tag: 'ECM' },
    ],
    complianceIntro: 'Government deployments operate under the strictest sovereignty, classification and accessibility regimes.',
    compliance: [
      { code: 'Data sovereignty', detail: 'In-country and air-gapped hosting options for classified and sensitive workloads.' },
      { code: 'UAE Pass', detail: 'National digital-identity integration for authenticated, paperless services.' },
      { code: 'NESA / SIA / national CSF', detail: 'Compliance with national cybersecurity frameworks for public infrastructure.' },
      { code: 'PDPL & FOI', detail: 'Personal-data-protection and transparency obligations across citizen data.' },
      { code: 'Arabic & accessibility', detail: 'Bilingual, accessible interfaces meeting government digital standards.' },
    ],
    outcomes: [
      { to: 50000, suffix: '+', label: 'Citizen communications automated yearly' },
      { to: 5, suffix: 'M+', label: 'Citizens served via digital services' },
      { to: 100, suffix: '%', label: 'Compliance on audited programmes' },
      { to: 4, suffix: '+', label: 'Federal & emirate entities served' },
    ],
    clients: ['mof', 'det', 'ead', 'ajman-ded'],
    marquee: ['CITIZEN SERVICES', 'INTELLIGENT CORRESPONDENCE', 'UAE PASS', 'DIGITAL SIGNING', 'DATA SOVEREIGNTY', 'RECORDS MANAGEMENT', 'ARABIC-FIRST'],
  },
  energy: {
    name: 'Energy, Oil & Gas',
    icon: IconZap,
    image: '/industry-energy.jpg',
    tagline: 'Digital Operations for Critical Infrastructure',
    subtitle: 'Zero-trust security, AIOps and asset intelligence for mission-critical, 24×7 industrial operations.',
    intro: 'The energy sector carries a unique burden: infrastructure that must run flawlessly around the clock, safety and environmental regimes with zero tolerance for error, persistent threats from sophisticated adversaries, and an accelerating transition to renewables. Aptiva delivers in the most demanding operational environments in the region — from cybersecurity frameworks protecting critical and nuclear facilities to managed services sustaining 99.99% uptime. Our work with Emirates Nuclear Energy Corporation and Etihad Rail demonstrates capability where the margin for failure is zero.',
    challengeIntro: 'In energy, availability and safety are not KPIs — they are licence-to-operate conditions.',
    challenges: [
      { title: 'Always-on availability', desc: 'Critical infrastructure demands 99.99%+ uptime with no tolerance for unplanned downtime.' },
      { title: 'Advanced persistent threats', desc: 'Nation-state and APT activity targets energy systems and operational technology.' },
      { title: 'Heavy regulation', desc: 'IAEA, national nuclear and energy regulators impose stringent, auditable controls.' },
      { title: 'OT/IT convergence', desc: 'Legacy operational technology must integrate safely with modern IT estates.' },
      { title: 'Harsh, remote sites', desc: 'Operations span remote, harsh and connectivity-constrained environments.' },
      { title: 'Digitizing OT', desc: 'Modernizing operational technology without compromising safety or availability.' },
    ],
    helpIntro: 'We harden, observe and automate critical operations — keeping availability and safety inviolable while unlocking operational intelligence.',
    help: [
      { title: 'Zero-trust cybersecurity', desc: 'Zero-trust architecture and endpoint protection across thousands of endpoints and critical systems.', angle: 'Digital Transformation' },
      { title: '24/7 SOC & threat response', desc: 'Security operations with sub-15-minute detection and response for OT and IT.', angle: 'Automation' },
      { title: 'Observability & AIOps', desc: 'Full-stack monitoring and predictive maintenance that reduce infrastructure failures materially.', angle: 'Agentic AI' },
      { title: 'Secure engineering content', desc: 'Compliant document and records management for engineering, safety and operational records.', angle: 'GenAI' },
    ],
    solutions: [
      { name: 'Vaultera', slug: 'vaultera', type: 'solution', tag: 'Records & archival' },
      { name: 'Procuria', slug: 'procuria', type: 'solution', tag: 'Source-to-pay' },
      { name: 'Vendrix', slug: 'vendrix', type: 'solution', tag: 'Supplier mgmt' },
      { name: 'Cloud & Security', slug: 'cloud-security', type: 'service', tag: 'Zero-trust' },
      { name: 'Managed Services', slug: 'managed-services', type: 'service', tag: 'SRE & AIOps' },
      { name: 'Quality Engineering', slug: 'quality-engineering', type: 'service', tag: 'Testing' },
    ],
    complianceIntro: 'Energy compliance spans nuclear, safety, environmental and critical-infrastructure cybersecurity regimes.',
    compliance: [
      { code: 'IAEA & nuclear regulators', detail: 'Documented, auditable controls for nuclear safety and regulatory compliance.' },
      { code: 'NESA / SIA / OT security', detail: 'National cybersecurity standards for critical and operational-technology systems.' },
      { code: 'ISO 27001 / 22301', detail: 'Information-security and business-continuity management for always-on operations.' },
      { code: 'HSE & environmental', detail: 'Health, safety and environmental record-keeping with full traceability.' },
      { code: 'Data residency', detail: 'In-country hosting for sensitive operational and engineering data.' },
    ],
    outcomes: [
      { to: 99.99, decimals: 2, suffix: '%', label: 'Uptime on mission-critical systems' },
      { to: 15, prefix: '<', suffix: ' min', label: 'Threat detection & response time' },
      { to: 5000, suffix: '+', label: 'Endpoints under zero-trust protection' },
      { to: 40, suffix: '%', label: 'Fewer infrastructure failures via AIOps' },
    ],
    clients: ['enec', 'etihad-rail'],
    marquee: ['ZERO-TRUST', '24/7 SOC', 'OT SECURITY', 'AIOPS', 'PREDICTIVE MAINTENANCE', 'IAEA COMPLIANCE', 'CRITICAL INFRASTRUCTURE'],
  },
  'real-estate': {
    name: 'Real Estate & Construction',
    icon: IconConstruction,
    image: '/industry-real-estate.jpg',
    tagline: 'PropTech Innovation for Property Development',
    subtitle: 'Unified project content, contract intelligence and luxury-grade buyer journeys for the region’s top developers.',
    intro: 'Real estate in the GCC is among the most dynamic markets on earth — mega-projects, smart cities and luxury developments drawing global capital. Yet developers wrestle with document chaos across hundreds of active projects, fragmented buyer data, and contract and payment workflows that strain under scale. Aptiva partners with leading developers such as Aldar, DAMAC and SAMANA to deliver enterprise content, CRM-grade customer experience and intelligent correspondence that streamline operations and elevate the buyer journey to match the brand.',
    challengeIntro: 'The constraint is rarely ambition — it is the operational drag of documents, data silos and contract complexity across a vast project portfolio.',
    challenges: [
      { title: 'Document sprawl', desc: 'Managing millions of documents across hundreds of concurrent projects.' },
      { title: 'Customer data silos', desc: 'Buyer and tenant data fragmented across sales, marketing and property management.' },
      { title: 'Contract & payment complexity', desc: 'Intricate sales, vendor and payment workflows that don’t scale manually.' },
      { title: 'RERA & regulatory compliance', desc: 'Evolving real-estate-authority rules across multiple emirates and markets.' },
      { title: 'Luxury-grade experience', desc: 'Digital journeys must match the expectations of premium buyers.' },
      { title: 'Fragmented project visibility', desc: 'Disconnected systems obscure unified, real-time project status.' },
    ],
    helpIntro: 'We unify the project lifecycle — content, contracts, customers and correspondence — and apply AI where the manual load is heaviest.',
    help: [
      { title: 'Contract intelligence (CLM)', desc: 'GenAI-powered contract lifecycle management for sales agreements, vendor contracts and obligation tracking.', angle: 'GenAI' },
      { title: 'Unified project content', desc: 'Enterprise content management for millions of documents across the full project portfolio.', angle: 'Digital Transformation' },
      { title: 'Buyer experience & CRM', desc: 'Unified customer profiles and luxury-grade digital journeys for buyers and tenants.', angle: 'Automation' },
      { title: 'Intelligent correspondence', desc: 'Automated tenant, vendor and authority communication with agentic routing.', angle: 'Agentic AI' },
    ],
    solutions: [
      { name: 'Vaultera', slug: 'vaultera', type: 'solution', tag: 'Records & archival' },
      { name: 'Vendrix', slug: 'vendrix', type: 'solution', tag: 'Supplier mgmt' },
      { name: 'Signova', slug: 'signova', type: 'solution', tag: 'Digital signing' },
      { name: 'Corroflow', slug: 'corroflow', type: 'solution', tag: 'Correspondence' },
      { name: 'Contract Lifecycle Mgmt', slug: 'clm', type: 'service', tag: 'CLM' },
      { name: 'Customer Experience', slug: 'customer-experience', type: 'service', tag: 'CX' },
    ],
    complianceIntro: 'Developers operate under real-estate-authority, escrow and data-protection regimes across multiple jurisdictions.',
    compliance: [
      { code: 'RERA & land departments', detail: 'Compliance with real-estate-authority registration and reporting obligations.' },
      { code: 'Escrow & payment rules', detail: 'Auditable handling of off-plan payments and escrow reconciliation.' },
      { code: 'PDPL', detail: 'Personal-data-protection controls across buyer and tenant lifecycles.' },
      { code: 'Contract governance', detail: 'Obligation, milestone and renewal management with full audit trails.' },
      { code: 'Records retention', detail: 'Compliant retention and archival of project and as-built documentation.' },
    ],
    outcomes: [
      { to: 2, suffix: 'M+', label: 'Property documents under management' },
      { to: 50, suffix: '+', label: 'Active projects on the platform' },
      { to: 100000, suffix: '+', label: 'Buyer & tenant profiles unified' },
      { to: 99.95, decimals: 2, suffix: '%', label: 'Managed-services uptime' },
    ],
    clients: ['aldar', 'damac', 'samana', 'ellington'],
    marquee: ['CONTRACT INTELLIGENCE', 'PROJECT CONTENT', 'BUYER CX', 'RERA COMPLIANCE', 'PAYMENT AUTOMATION', 'VENDOR MANAGEMENT', 'DIGITAL SIGNING'],
  },
  insurance: {
    name: 'Insurance & Healthcare',
    icon: IconHeartPulse,
    image: '/industry-healthcare.jpg',
    tagline: 'Digital Transformation for Complex, Regulated Operations',
    subtitle: 'Touchless claims, fraud analytics and compliant member data platforms for payers and healthcare providers.',
    intro: 'Insurance and healthcare share a defining tension: complex, heavily regulated operations on one side and rising expectations for instant, personalized service on the other. Payers process millions of claims; providers manage sensitive records and member journeys end-to-end. Aptiva delivers tailored solutions — intelligent claims adjudication, omni-channel member experience and compliant content platforms — that cut cost and cycle time while improving accuracy and the experience for members and patients alike. Our work with Daman Health shows what touchless, compliant operations look like in practice.',
    challengeIntro: 'The opportunity is enormous, but it sits behind manual claims, fragmented data and uncompromising compliance.',
    challenges: [
      { title: 'Manual claims processing', desc: 'Document-heavy adjudication causes delays, errors and cost.' },
      { title: 'Fragmented member data', desc: 'Patient and member records scattered across disconnected systems.' },
      { title: 'Healthcare compliance', desc: 'DHA, DoH and insurance-authority regimes plus health-data-protection rules.' },
      { title: 'Fraud & leakage', desc: 'Sophisticated fraud erodes margins without analytics-driven detection.' },
      { title: 'Digital-first expectations', desc: 'Members and patients expect the same experience as consumer apps.' },
      { title: 'Document-intensive work', desc: 'Core processes are buried under documents ripe for intelligent automation.' },
    ],
    helpIntro: 'We automate the document- and decision-heavy core — claims, onboarding, communications — and layer in analytics for fraud and risk.',
    help: [
      { title: 'Touchless claims', desc: 'Intelligent document processing and AI adjudication that cut claims processing time dramatically.', angle: 'Agentic AI' },
      { title: 'Fraud & risk analytics', desc: 'Predictive analytics for fraud detection, risk assessment and population-health insight.', angle: 'GenAI' },
      { title: 'Member & patient experience', desc: 'Omni-channel CX with speech analytics and quality monitoring for engagement and retention.', angle: 'Digital Transformation' },
      { title: 'Compliant content & RPA', desc: 'Secure records management and automation for onboarding, reporting and adjudication.', angle: 'Automation' },
    ],
    solutions: [
      { name: 'Corroflow', slug: 'corroflow', type: 'solution', tag: 'Correspondence' },
      { name: 'Classifyr', slug: 'classifyr', type: 'solution', tag: 'Claims AI' },
      { name: 'Linguara', slug: 'linguara', type: 'solution', tag: 'Multilingual' },
      { name: 'Signova', slug: 'signova', type: 'solution', tag: 'Consent & signing' },
      { name: 'Customer Experience', slug: 'customer-experience', type: 'service', tag: 'CCaaS' },
      { name: 'Data & Analytics', slug: 'data-analytics', type: 'service', tag: 'Fraud ML' },
    ],
    complianceIntro: 'Health and insurance data carries the highest sensitivity and the strictest regulatory regimes in the region.',
    compliance: [
      { code: 'DHA / DoH / health authorities', detail: 'Compliance with emirate and national health-regulator requirements.' },
      { code: 'Insurance authority (IA)', detail: 'Regulatory reporting and conduct obligations for payers and TPAs.' },
      { code: 'Health-data protection', detail: 'Encryption, access control and audit logging aligned to health-data regimes.' },
      { code: 'PDPL & residency', detail: 'In-country hosting and personal-data-protection controls for member data.' },
      { code: 'Claims auditability', detail: 'Explainable, fully auditable adjudication decisions end-to-end.' },
    ],
    outcomes: [
      { to: 80, suffix: '%', label: 'Reduction in claims processing time' },
      { to: 500000, suffix: '+', label: 'Claims processed' },
      { to: 98, suffix: '%', label: 'Adjudication accuracy' },
      { to: 4, suffix: '+', label: 'Healthcare & insurance clients' },
    ],
    clients: ['daman', 'samana'],
    marquee: ['TOUCHLESS CLAIMS', 'FRAUD ANALYTICS', 'MEMBER EXPERIENCE', 'IDP & ADJUDICATION', 'HEALTH-DATA PROTECTION', 'OMNI-CHANNEL CX', 'POPULATION HEALTH'],
  },
}

const slugOrder = ['banking', 'telecom', 'government', 'energy', 'real-estate', 'insurance']

const angleColor: Record<string, string> = {
  'Agentic AI': 'text-brand-red',
  GenAI: 'text-brand-red',
  Automation: 'text-brand-blue',
  'Digital Transformation': 'text-brand-blue',
}

export default function IndustryDetail() {
  const { slug } = useParams()
  const key = slug || ''
  const industry = industriesData[key]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!industry) {
    return (
      <div className="surface-ink-flat flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <span className="eyebrow-red">404</span>
          <h1 className="display-2 mt-5 text-white">Industry not found</h1>
          <a href="#/industries" className="btn-primary group mt-8"><span>View all industries</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
        </div>
      </div>
    )
  }

  const next = slugOrder[(slugOrder.indexOf(key) + 1) % slugOrder.length]
  const nextData = industriesData[next]

  return (
    <div>
      <PageHeader
        label="INDUSTRY"
        title={industry.name}
        subtitle={industry.subtitle}
        bgImage={industry.image}
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Industries', href: '#/industries' }, { label: industry.tagline }]}
        stats={industry.outcomes.map((o) => ({
          value: `${o.prefix ?? ''}${o.to.toLocaleString()}${o.suffix ?? ''}`,
          label: o.label,
        }))}
      />

      <Overview industry={industry} />
      <Challenges industry={industry} />
      <HowWeHelp industry={industry} />
      <Solutions industry={industry} />
      <Compliance industry={industry} />
      <Outcomes industry={industry} />
      <Clients industry={industry} />
      <NextIndustry slug={next} name={nextData.name} image={nextData.image} />

      <CTASection
        eyebrow={`${industry.name} · Let’s talk`}
        title={<>Ready to transform <span className="text-gradient-brand">{industry.name.toLowerCase()}?</span></>}
        body="Bring us your hardest sector problem — onboarding, claims, correspondence, compliance or uptime — and we’ll map a programme that proves value fast and scales under scrutiny."
        primary={{ label: 'Talk to a sector lead', href: '#/contact' }}
        secondary={{ label: 'Browse all solutions', href: '#/solutions' }}
      />
    </div>
  )
}

/* ────────────── OVERVIEW (dark flat, marquee) ────────────── */

function Overview({ industry }: { industry: IndustryData }) {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="border-b border-white/10 py-4">
        <Marquee
          speed={40}
          items={industry.marquee.map((w) => (
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/30">{w}</span>
          ))}
        />
      </div>
      <div className="container-xl section-y">
        <Reveal stagger=".ov-item">
          <span className="ov-item eyebrow-red">Sector overview</span>
          <p className="ov-item mt-7 max-w-5xl font-display text-[clamp(22px,3vw,40px)] font-medium leading-[1.22] tracking-[-0.02em] text-white text-balance">
            {industry.intro}
          </p>
          <div className="ov-item mt-10 flex flex-wrap gap-4">
            <a href="#/case-studies" className="btn-dark group !border !border-white/15 !bg-white/[0.04] !text-white hover:!bg-white/10">See the proof<IconArrowRight className="h-4 w-4" /></a>
            <a href="#/contact" className="inline-flex items-center gap-2 px-2 py-4 text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white">Talk to our team<IconArrowUpRight className="h-4 w-4 text-brand-red" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── CHALLENGES (light) ────────────── */

function Challenges({ industry }: { industry: IndustryData }) {
  return (
    <section className="surface-paper relative overflow-hidden">
      <GridBackdrop light />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          theme="light"
          eyebrow="Sector challenges"
          counter="01 / 05"
          title={<>What stands in <span className="text-gradient-brand">the way.</span></>}
          intro={industry.challengeIntro}
        />
        <Reveal stagger=".ch-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industry.challenges.map((c) => (
            <div key={c.title} className="ch-card card-paper group flex flex-col p-7">
              <span className="icon-tile-light mb-5 h-11 w-11"><IconPlus className="h-5 w-5 text-brand-red transition-colors group-hover:text-white" /></span>
              <h3 className="font-display text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-red">{c.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-900/55">{c.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── HOW WE HELP (dark, kinetic) ────────────── */

function HowWeHelp({ industry }: { industry: IndustryData }) {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <KineticBackdrop variant="flow" color="red" opacity={0.4} />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="How Aptiva helps"
          counter="02 / 05"
          title={<>From friction to <span className="text-gradient-brand">flow.</span></>}
          intro={industry.helpIntro}
        />
        <Reveal stagger=".help-card" className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {industry.help.map((h, i) => (
            <TiltCard key={h.title} glow="red" max={6} className="help-card card-ink flex flex-col p-8">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-semibold text-white/15">{String(i + 1).padStart(2, '0')}</span>
                <span className={`flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] ${angleColor[h.angle] ?? 'text-white/50'}`}>
                  <IconBrain className="h-3.5 w-3.5" />{h.angle}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{h.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{h.desc}</p>
              <div className="mt-6 h-px w-8 bg-grad-red transition-all duration-500 group-hover:w-16" />
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── SOLUTIONS (dark flat, cross-links) ────────────── */

function Solutions({ industry }: { industry: IndustryData }) {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y">
        <SectionHeading
          eyebrow="Solutions & services"
          counter="03 / 05"
          title={<>The platforms behind <span className="text-gradient-brand">the outcomes.</span></>}
          intro="Proprietary solution IP and full-stack services, pre-mapped to this sector’s workflows and compliance needs."
        />
        <Reveal stagger=".sol-card" className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industry.solutions.map((s) => (
            <a
              key={s.slug}
              href={`#/${s.type === 'service' ? 'services' : 'solutions'}/${s.slug}`}
              className="sol-card card-ink group flex items-center justify-between p-7"
            >
              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">{s.type === 'service' ? 'Service' : 'Solution'} · {s.tag}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white transition-colors group-hover:text-brand-red">{s.name}</h3>
              </div>
              <IconArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-red" />
            </a>
          ))}
        </Reveal>
        <Reveal className="mt-12 flex flex-wrap gap-4">
          <a href="#/solutions" className="btn-ghost group">All solutions<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          <a href="#/services" className="btn-ghost group">All services<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── COMPLIANCE (light) ────────────── */

function Compliance({ industry }: { industry: IndustryData }) {
  return (
    <section className="surface-paper-warm relative overflow-hidden">
      <div className="container-xl section-y">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              theme="light"
              eyebrow="Regulatory & compliance"
              counter="04 / 05"
              title={<>Compliance <span className="text-gradient-brand">by design.</span></>}
              intro={industry.complianceIntro}
            />
            <Reveal className="mt-8">
              <div className="flex items-start gap-3 border border-ink-900/10 bg-white p-5">
                <span className="icon-tile-light h-10 w-10 shrink-0"><IconShield className="h-5 w-5 text-brand-red" /></span>
                <p className="text-[14px] leading-relaxed text-ink-900/65">Region-native delivery across the GCC and East Africa — Arabic-first interfaces, in-country hosting and audited evidence packs as standard.</p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal stagger=".comp-row" className="border-t border-ink-900/10">
              {industry.compliance.map((c) => (
                <div key={c.code} className="comp-row group flex flex-col gap-1 border-b border-ink-900/10 py-5 sm:flex-row sm:items-start sm:gap-6">
                  <div className="flex items-center gap-2 sm:w-64 sm:shrink-0">
                    <IconCheckCircle className="h-4 w-4 text-brand-red" />
                    <span className="font-display text-[15px] font-semibold text-ink-900">{c.code}</span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink-900/60">{c.detail}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────── OUTCOMES (dark, counters) ────────────── */

function Outcomes({ industry }: { industry: IndustryData }) {
  return (
    <section className="surface-ink-raised relative overflow-hidden">
      <Aurora className="opacity-60" />
      <KineticBackdrop variant="rings" color="blue" opacity={0.3} className="left-1/2 w-[120%] -translate-x-1/2" />
      <Grain />
      <div className="container-xl section-y relative z-10">
        <SectionHeading
          eyebrow="Outcomes"
          counter="05 / 05"
          title={<>Results we’ve <span className="text-gradient-brand">engineered.</span></>}
          intro="Representative outcomes from Aptiva engagements in this sector across the region."
        />
        <Reveal stagger=".out-item" className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/[0.04] lg:grid-cols-4">
          {industry.outcomes.map((o, i) => (
            <div key={i} className="out-item group bg-ink-900/70 p-7 transition-colors duration-500 hover:bg-white/[0.03]">
              <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                <Counter to={o.to} prefix={o.prefix} suffix={o.suffix} decimals={o.decimals} />
              </div>
              <div className="mt-3 text-[13px] leading-snug text-white/55">{o.label}</div>
              <div className="mt-4 h-px w-9 bg-grad-red transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── CLIENTS (light, brand marks) ────────────── */

function Clients({ industry }: { industry: IndustryData }) {
  return (
    <section className="surface-paper relative overflow-hidden">
      <div className="container-xl section-y">
        <SectionHeading
          theme="light"
          eyebrow="Representative clients"
          title={<>Trusted across <span className="text-gradient-brand">the sector.</span></>}
          intro="A selection of the institutions Aptiva serves in this industry across global markets."
        />
        <Reveal stagger=".cl-cell" className="mt-14 flex flex-wrap gap-3">
          {industry.clients.map((slug) => (
            <div key={slug} className="cl-cell">
              <BrandMark brand={brand(slug)} theme="light" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ────────────── NEXT INDUSTRY (dark image) ────────────── */

function NextIndustry({ slug, name, image }: { slug: string; name: string; image: string }) {
  return (
    <section className="surface-ink-flat relative overflow-hidden">
      <div className="container-xl section-y">
        <Reveal>
          <a href={`#/industries/${slug}`} className="group relative flex min-h-[260px] items-end overflow-hidden border border-white/10 p-8 md:p-12">
            <div className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/40" />
            <div className="relative z-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">Next industry</span>
              <h3 className="mt-3 display-3 text-white">{name}</h3>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70 transition-all group-hover:gap-3.5">Explore sector<IconArrowRight className="h-4 w-4 text-brand-red" /></span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
