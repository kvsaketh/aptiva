import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import Counter from '../components/kit/Counter'
import CTASection from '../components/kit/CTASection'
import {
  IconBrain, IconArrowRight, IconArrowUpRight, IconShield, IconServer, IconZap,
  IconCheckCircle, IconLayers, IconChart, IconDocument, IconSparkle, IconCloud,
  IconSettings, IconGlobe,
} from '../components/Icons'

type Accent = 'red' | 'blue'

type Stat = { to: number; prefix?: string; suffix?: string; decimals?: number; label: string }

type Solution = {
  title: string
  subtitle: string
  tagline: string
  accent: Accent
  image: string
  overview: string
  problem: { headline: string; body: string; pains: string[] }
  features: { title: string; desc: string }[]
  steps: { no: string; title: string; desc: string }[]
  outcomes: Stat[]
  outcomeNote: string
  industries: string[]
  integration: { title: string; items: string[] }[]
  deployment: string
  related: string[]
}

/* ────────────── slug → display name (for related links + routing) ────────────── */
const NAMES: Record<string, string> = {
  corroflow: 'Corroflow', classifyr: 'Classifyr', vaultera: 'Vaultera', signova: 'Signova',
  kredence: 'Kredence', lendora: 'Lendora', linguara: 'Linguara',
  procuria: 'Procuria', vendrix: 'Vendrix', adscopia: 'Adscopia', gazelens: 'Gazelens',
}
const TAGS: Record<string, string> = {
  corroflow: 'Intelligent Correspondence', classifyr: 'Document Intelligence', vaultera: 'Records & Archival',
  signova: 'Digital Signing & Trust', kredence: 'Corporate Lending', lendora: 'Retail Lending',
  linguara: 'Multilingual Localization', procuria: 'Source-to-Pay', vendrix: 'Supplier Management',
  adscopia: 'DOOH & Media', gazelens: 'Audience Analytics',
}

/* ────────────── DATA (slug keys + routing PRESERVED) ────────────── */

const solutionsData: Record<string, Solution> = {
  corroflow: {
    title: 'Corroflow',
    subtitle: 'Intelligent Correspondence Management',
    tagline: 'Agentic Capture · Smart Routing · Omni-Channel Dispatch',
    accent: 'blue',
    image: '/solution-corroflow.jpg',
    overview:
      'Corroflow is an enterprise-grade intelligent correspondence platform that automates the capture, classification, routing and response of inbound communications across email, physical mail, fax and digital channels. Using GenAI and natural language understanding, Corroflow reads intent, extracts key entities, routes to the right department and drafts compliant replies — cutting correspondence handling time by up to 80% for institutions processing 50,000+ communications a month.',
    problem: {
      headline: 'Correspondence is where regulated enterprises quietly lose time and trust.',
      body: 'Banks, ministries and operators receive enormous volumes of unstructured correspondence across disconnected channels. Manual triage is slow, inconsistent and impossible to audit at scale — SLAs slip, complaints escalate, and regulators ask questions no spreadsheet can answer. Corroflow replaces the inbox-and-forward chaos with an intelligent, governed pipeline.',
      pains: [
        'Days-long backlogs from manual reading, sorting and routing',
        'No single view of an inbound thread across email, mail, fax and portal',
        'Inconsistent, non-compliant replies drafted from scratch each time',
        'Zero audit trail for who saw what, when — a regulatory liability',
      ],
    },
    features: [
      { title: 'GenAI intent classification', desc: 'Transformer models read each message, detect intent and sentiment, and tag entities — across formal Arabic and English — with confidence scoring.' },
      { title: 'Multi-channel capture', desc: 'Unified ingestion from email, scanned physical mail, fax, web forms and APIs into a single normalized correspondence record.' },
      { title: 'Agentic routing & escalation', desc: 'Policy-aware agents route to the correct team, escalate on risk or SLA breach, and reassign automatically when queues stall.' },
      { title: 'AI response drafting', desc: 'NLG composes brand- and policy-consistent replies pre-populated with case data, ready for one-click human review and dispatch.' },
      { title: 'Template & approval governance', desc: 'Centralized template library with version control, maker-checker approvals and locked compliance language.' },
      { title: 'SLA & compliance monitoring', desc: 'Real-time dashboards track turnaround, breaches and exceptions with automated alerting and regulator-ready reporting.' },
      { title: 'Omni-channel dispatch', desc: 'Deliver responses by email, SMS, push, WhatsApp, portal or print with unified delivery tracking.' },
      { title: 'Enterprise integration', desc: 'Pre-built connectors to ECM, CRM, core banking and ERP via REST APIs and message queues.' },
    ],
    steps: [
      { no: '01', title: 'Capture', desc: 'Inbound from every channel is ingested, de-duplicated and normalized into a single correspondence record.' },
      { no: '02', title: 'Understand', desc: 'GenAI classifies intent, extracts entities and assesses urgency, sentiment and compliance risk.' },
      { no: '03', title: 'Orchestrate', desc: 'Agentic workflows route, escalate and draft replies with human-in-the-loop checkpoints and SLA enforcement.' },
      { no: '04', title: 'Govern', desc: 'Every action is logged to a tamper-evident audit trail with full reporting for internal and regulatory review.' },
    ],
    outcomes: [
      { to: 80, suffix: '%', label: 'Faster handling time' },
      { to: 50, suffix: 'K+', label: 'Communications / month' },
      { to: 60, suffix: '%', label: 'Fewer SLA breaches' },
      { to: 99.5, suffix: '%', decimals: 1, label: 'Routing accuracy' },
    ],
    outcomeNote: 'Measured across government and banking deployments handling high-volume regulated correspondence.',
    industries: ['Banking', 'Government', 'Telecom', 'Insurance'],
    integration: [
      { title: 'Channels', items: ['Email & Exchange', 'Scanned mail & fax', 'Web forms & portals', 'WhatsApp & SMS'] },
      { title: 'Systems of record', items: ['OpenText & Documentum', 'Salesforce & Dynamics CRM', 'Core banking', 'SAP & Oracle ERP'] },
      { title: 'Compliance', items: ['GDPR & UAE PDPL', 'KSA PDPL', 'ISO 27001', 'Maker-checker controls'] },
    ],
    deployment: 'Available as a managed cloud service or deployed in-country for data-residency mandates, with single sign-on, role-based access and full Arabic / RTL support.',
    related: ['classifyr', 'vaultera', 'signova'],
  },
  classifyr: {
    title: 'Classifyr',
    subtitle: 'Document Intelligence Platform',
    tagline: 'Neural Classification · Metadata Extraction · Self-Learning Taxonomy',
    accent: 'blue',
    image: '/solution-classifyr.jpg',
    overview:
      'Classifyr is Aptiva\'s intelligent document processing platform that uses deep learning and advanced OCR/ICR to automatically classify, extract and validate information from any document — structured or unstructured. With pre-trained models for invoices, contracts, KYC packs, medical forms and legal filings, Classifyr reaches 99.5% classification accuracy across 500+ document types and 40+ languages including Arabic, eliminating up to 90% of manual document work.',
    problem: {
      headline: 'Unstructured documents are the single biggest brake on automation.',
      body: 'Every back-office process — onboarding, claims, lending, compliance — stalls the moment a human has to read, key and verify a document. Volume scales linearly with headcount, accuracy varies by operator, and bottlenecks form exactly where speed matters most. Classifyr turns documents into structured, validated data the instant they arrive.',
      pains: [
        'Armies of operators manually keying invoices, forms and IDs',
        'Error rates and rework that erode trust in downstream systems',
        'Generic OCR that fails on Arabic, handwriting and poor scans',
        'New document types requiring expensive re-templating projects',
      ],
    },
    features: [
      { title: 'Neural classification', desc: 'Deep models classify 500+ document types with 99%+ accuracy and per-document confidence scoring.' },
      { title: 'Advanced OCR / ICR', desc: 'Machine-print and handwriting recognition tuned for Arabic, English and regional scripts on noisy scans.' },
      { title: 'Intelligent extraction', desc: 'NLP extracts fields, tables and clauses from unstructured documents and maps them to your schema.' },
      { title: 'Automated validation', desc: 'Business-rule and cross-document checks flag anomalies before data reaches systems of record.' },
      { title: 'Self-learning taxonomy', desc: 'Continuous learning from human corrections lifts accuracy and absorbs new document types without re-templating.' },
      { title: '40+ language support', desc: 'Native handling of Arabic dialects, RTL layouts and mixed-language documents common across MEA.' },
      { title: 'Pre-trained model library', desc: 'Ready-to-run models for invoices, contracts, KYC, medical and legal documents accelerate go-live.' },
      { title: 'API-first architecture', desc: 'Stateless REST and event APIs drop Classifyr into any capture, RPA or workflow pipeline.' },
    ],
    steps: [
      { no: '01', title: 'Ingest', desc: 'Documents arrive from scanners, email, portals or RPA bots in any common format.' },
      { no: '02', title: 'Classify', desc: 'Neural models identify document type and split multi-document batches automatically.' },
      { no: '03', title: 'Extract & validate', desc: 'OCR/ICR and NLP pull structured data, then business rules verify and score it.' },
      { no: '04', title: 'Learn', desc: 'Human corrections feed back into models, continuously improving accuracy on your data.' },
    ],
    outcomes: [
      { to: 99.5, suffix: '%', decimals: 1, label: 'Classification accuracy' },
      { to: 90, suffix: '%', label: 'Less manual processing' },
      { to: 500, suffix: '+', label: 'Document types' },
      { to: 40, suffix: '+', label: 'Languages supported' },
    ],
    outcomeNote: 'Benchmarked across banking, government and healthcare document-intensive workflows.',
    industries: ['Banking', 'Government', 'Legal', 'Healthcare'],
    integration: [
      { title: 'Capture', items: ['Scanners & MFPs', 'Email & portals', 'RPA bots', 'Mobile capture'] },
      { title: 'Downstream', items: ['ECM & content stores', 'Core banking', 'ERP & claims systems', 'Data warehouses'] },
      { title: 'Compliance', items: ['ISO 27001', 'SOC 2', 'GDPR & PDPL', 'Audit logging'] },
    ],
    deployment: 'Deploy in the cloud, on-premises or air-gapped. GPU-accelerated inference scales elastically; models can be fine-tuned on client data within secure environments.',
    related: ['corroflow', 'vaultera', 'signova'],
  },
  vaultera: {
    title: 'Vaultera',
    subtitle: 'Records & Archival Management',
    tagline: 'Unified Physical + Digital Vault · Automated Retention · Compliance-Ready',
    accent: 'blue',
    image: '/solution-vaultera.jpg',
    overview:
      'Vaultera provides enterprise records management and long-term archival with compliance-ready governance across both physical and digital records. It automates the full records lifecycle — creation, classification, retention, disposition and legal hold — with tamper-evident audit trails, eDiscovery and deep ECM integration, cutting storage costs by up to 60% while guaranteeing regulatory defensibility.',
    problem: {
      headline: 'Records are a liability until they are governed.',
      body: 'Regulated organizations must keep the right records for exactly the right time — and prove it. In reality, physical boxes go missing, digital copies multiply, retention is manual, and legal holds are best-effort. The cost is twofold: bloated storage and indefensible audits. Vaultera makes the entire estate governed, searchable and provable.',
      pains: [
        'Physical and digital records managed in separate, disconnected silos',
        'Manual retention schedules that are inconsistently enforced',
        'Slow, painful eDiscovery when legal or regulators come knocking',
        'No tamper-proof evidence of chain-of-custody or disposition',
      ],
    },
    features: [
      { title: 'Unified vault', desc: 'One platform governs physical boxes and digital documents with unified search, classification and policy.' },
      { title: 'Automated retention', desc: 'Policy-driven schedules apply retention and trigger defensible disposition automatically.' },
      { title: 'Legal hold & eDiscovery', desc: 'Instantly freeze records under hold and run fast, scoped discovery across the estate.' },
      { title: 'Tamper-evident audit trails', desc: 'Cryptographically anchored chain-of-custody records prove every access and action.' },
      { title: 'Compression & deduplication', desc: 'Storage optimization removes redundancy and tiers cold data to cut cost up to 60%.' },
      { title: 'Mobile physical tracking', desc: 'Barcode / RFID scanning, location tracking and check-in/out from iOS and Android apps.' },
      { title: 'ECM integration', desc: 'Native connectors for OpenText, Documentum and SharePoint preserve existing investments.' },
      { title: 'Compliance reporting', desc: 'Out-of-the-box reporting for GDPR, SOC 2, ISO 27001 and local retention mandates.' },
    ],
    steps: [
      { no: '01', title: 'Classify', desc: 'Records are categorized and assigned a retention policy on creation or ingest.' },
      { no: '02', title: 'Govern', desc: 'Retention runs automatically; legal holds override disposition when invoked.' },
      { no: '03', title: 'Track', desc: 'Physical and digital movements are logged with tamper-evident chain-of-custody.' },
      { no: '04', title: 'Dispose & prove', desc: 'Defensible disposition executes on schedule, with full audit evidence retained.' },
    ],
    outcomes: [
      { to: 60, suffix: '%', label: 'Lower storage cost' },
      { to: 100, suffix: '%', label: 'Retention enforcement' },
      { to: 10, suffix: 'K+', label: 'Records under management' },
      { to: 24, suffix: '×7', label: 'Audit readiness' },
    ],
    outcomeNote: 'Outcomes drawn from records-management deployments in banking, government and real estate.',
    industries: ['Banking', 'Government', 'Healthcare', 'Energy'],
    integration: [
      { title: 'Content', items: ['OpenText & Documentum', 'SharePoint', 'File shares', 'Email archives'] },
      { title: 'Physical', items: ['Barcode & RFID', 'Mobile scanning apps', 'Warehouse mapping', 'Box & file tracking'] },
      { title: 'Compliance', items: ['GDPR & PDPL', 'ISO 27001', 'SOC 2', 'Retention schedules'] },
    ],
    deployment: 'Hybrid by design — govern cloud, on-premises and physical records from a single control plane, with data-residency and air-gapped options for sensitive estates.',
    related: ['classifyr', 'corroflow', 'signova'],
  },
  signova: {
    title: 'Signova',
    subtitle: 'Digital Signing & Trust Platform',
    tagline: 'Qualified Signatures · Biometric Verification · Regulatory Audit Trail',
    accent: 'blue',
    image: '/solution-signova.jpg',
    overview:
      'Signova delivers enterprise digital signing and trust — legally binding electronic signatures, certificate lifecycle management and document authentication. Built on PKI infrastructure and aligned to UAE digital-identity standards, Signova supports qualified (QES), advanced (AdES) and simple electronic signatures, giving every transaction exactly the trust it requires. The platform has processed 2M+ signatures for banking and government clients.',
    problem: {
      headline: 'Wet-ink signing is the last analog step in otherwise digital journeys.',
      body: 'Onboarding, lending and procurement journeys can be fully digital right up to the signature — then collapse into printing, couriering and re-scanning. It is slow, expensive and a compliance gap. Signova closes the loop with signatures that are instant, verifiable and defensible in court.',
      pains: [
        'Print-sign-scan steps that add days and cost to every agreement',
        'Uncertainty over which signature type satisfies which regulation',
        'Weak identity proofing that exposes the institution to fraud',
        'Audit trails that cannot prove non-repudiation under challenge',
      ],
    },
    features: [
      { title: 'QES, AdES & simple signing', desc: 'Right-sized signature assurance for every use case, from clickwrap to qualified court-defensible signing.' },
      { title: 'Biometric verification', desc: 'Facial recognition, fingerprint and liveness detection bind the signature to a verified identity.' },
      { title: 'UAE digital identity', desc: 'Native integration with national digital-identity standards for trusted, government-grade signing.' },
      { title: 'Certificate lifecycle', desc: 'Issue, renew, revoke and manage PKI certificates with full key governance.' },
      { title: 'Bulk & batch signing', desc: 'High-throughput signing for statements, contracts and onboarding packs.' },
      { title: 'Tamper detection', desc: 'Cryptographic sealing detects any post-signature alteration to a document.' },
      { title: 'Embedded workflows', desc: 'Drop signing into existing apps and journeys via SDKs and APIs — no context switch.' },
      { title: 'Non-repudiation audit trail', desc: 'Court-ready evidence of who signed what, when and how, anchored for integrity.' },
    ],
    steps: [
      { no: '01', title: 'Verify', desc: 'Signer identity is proofed via biometrics and national digital identity.' },
      { no: '02', title: 'Sign', desc: 'The appropriate QES, AdES or simple signature is applied with PKI sealing.' },
      { no: '03', title: 'Seal', desc: 'Documents are cryptographically sealed and timestamped against tampering.' },
      { no: '04', title: 'Evidence', desc: 'A non-repudiation audit trail is retained for regulatory and legal defense.' },
    ],
    outcomes: [
      { to: 2, suffix: 'M+', label: 'Signatures processed' },
      { to: 100, suffix: 'K+', label: 'Signatures / month at peak' },
      { to: 90, suffix: '%', label: 'Faster turnaround' },
      { to: 0, label: 'Hardware tokens required' },
    ],
    outcomeNote: 'Throughput and assurance proven across banking onboarding and government services.',
    industries: ['Banking', 'Government', 'Real Estate', 'Legal'],
    integration: [
      { title: 'Identity', items: ['National digital ID', 'Biometric providers', 'PKI / CA infrastructure', 'OTP & MFA'] },
      { title: 'Embed', items: ['Web & mobile SDKs', 'REST APIs', 'CRM & loan origination', 'ECM & DMS'] },
      { title: 'Standards', items: ['eIDAS-aligned', 'UAE Federal Law', 'KSA e-Transactions', 'Long-term validation'] },
    ],
    deployment: 'Delivered as a trust service in the cloud or in-country, with HSM-backed key protection and high-availability signing clusters for mission-critical throughput.',
    related: ['corroflow', 'classifyr', 'vaultera'],
  },
  kredence: {
    title: 'Kredence',
    subtitle: 'Corporate Lending Platform',
    tagline: 'AI Credit Decisioning · Risk & Compliance · Portfolio Intelligence',
    accent: 'red',
    image: '/solution-kredence.jpg',
    overview:
      'Kredence digitizes the entire corporate lending lifecycle — origination, AI credit decisioning, risk assessment, approval, disbursement and servicing. Built for banks and financial institutions across MEA, Kredence integrates with core banking, automates regulatory compliance and gives lending officers real-time portfolio intelligence — compressing corporate loan decisions from days to as little as 15 minutes.',
    problem: {
      headline: 'Corporate credit is too slow, too manual and too opaque.',
      body: 'Corporate lending decisions crawl through spreadsheets, email approvals and disconnected risk checks. Relationship managers lose deals to faster competitors, risk teams lack a real-time portfolio view, and regulators demand evidence the bank cannot easily produce. Kredence turns lending into a fast, governed, data-driven flow.',
      pains: [
        'Multi-day decision cycles that lose deals to nimbler lenders',
        'Manual spreading and inconsistent, subjective risk assessment',
        'No real-time view of portfolio concentration and exposure',
        'Compliance evidence (Basel, IFRS) assembled by hand under pressure',
      ],
    },
    features: [
      { title: 'AI credit decisioning', desc: 'ML models analyze financials, behavior and market data to generate explainable credit recommendations in minutes.' },
      { title: 'Digital origination', desc: 'Structured application capture with document intelligence and automated financial spreading.' },
      { title: 'Multi-dimensional risk scoring', desc: 'Financial, operational and market factors combine into transparent, auditable risk grades.' },
      { title: 'Workflow approvals', desc: 'Configurable approval matrices, delegated authority and automatic escalation.' },
      { title: 'Compliance automation', desc: 'Built-in checks for Basel, IFRS 9 and local prudential standards with evidence capture.' },
      { title: 'Core banking integration', desc: 'Straight-through disbursement and servicing via native core-banking connectors.' },
      { title: 'Portfolio analytics', desc: 'Real-time exposure, concentration and predictive default modeling across the book.' },
      { title: 'Covenant monitoring', desc: 'Automated tracking of covenants and early-warning signals on deteriorating credits.' },
    ],
    steps: [
      { no: '01', title: 'Originate', desc: 'Applications and financials are captured digitally and spread automatically.' },
      { no: '02', title: 'Decide', desc: 'AI models score risk and recommend terms with full explainability.' },
      { no: '03', title: 'Approve', desc: 'Workflow routes to the right authority with compliance checks embedded.' },
      { no: '04', title: 'Monitor', desc: 'Disbursement flows to core banking; covenants and exposure are watched in real time.' },
    ],
    outcomes: [
      { to: 15, label: 'Minute credit decisions' },
      { to: 70, suffix: '%', label: 'Faster origination' },
      { to: 100, suffix: '%', label: 'Compliance coverage' },
      { to: 30, suffix: '%', label: 'Lower cost-to-decision' },
    ],
    outcomeNote: 'Decision speed proven at leading UAE banks moving from multi-day cycles to minutes.',
    industries: ['Banking', 'Non-Banking Finance', 'Investment'],
    integration: [
      { title: 'Banking', items: ['Core banking systems', 'Credit bureaus', 'Collateral registries', 'Treasury & GL'] },
      { title: 'Data', items: ['Financial statements', 'Market & macro feeds', 'Document intelligence', 'Risk models'] },
      { title: 'Compliance', items: ['Basel III', 'IFRS 9', 'Local prudential rules', 'Audit evidence'] },
    ],
    deployment: 'Cloud or on-premises with bank-grade security, role-based access and full model governance — including explainability and bias monitoring for regulatory review.',
    related: ['lendora', 'linguara'],
  },
  lendora: {
    title: 'Lendora',
    subtitle: 'Retail Lending Platform',
    tagline: 'Instant Onboarding · AI Origination · Embedded BNPL',
    accent: 'red',
    image: '/solution-lendora.jpg',
    overview:
      'Lendora is Aptiva\'s retail lending and Buy-Now-Pay-Later platform, enabling banks and fintechs to offer consumer credit through fully digital channels. With instant credit decisioning, embedded-finance APIs and seamless KYC/AML, Lendora supports personal loans, auto loans, microfinance and BNPL — using AI credit models that balance risk and customer experience, and achieving up to 80% faster onboarding.',
    problem: {
      headline: 'Consumers expect credit at the speed of a tap — most lenders can\'t deliver.',
      body: 'Retail borrowers abandon journeys that take more than minutes, while lenders struggle to decision safely at that speed. Branch-bound onboarding, manual KYC and rigid product engines lock institutions out of the fastest-growing digital and embedded-lending segments. Lendora makes instant, compliant retail credit the default.',
      pains: [
        'High application drop-off from slow, branch-bound onboarding',
        'Manual KYC/AML that throttles digital scale',
        'Inability to embed credit into merchant and e-commerce journeys',
        'One-size-fits-all credit models that misprice risk',
      ],
    },
    features: [
      { title: 'Instant digital onboarding', desc: 'Selfie and document verification with real-time KYC completes onboarding in minutes.' },
      { title: 'AI credit decisioning', desc: 'Alternative-data and behavioral models price risk instantly across thin-file segments.' },
      { title: 'Embedded finance APIs', desc: 'Drop lending and BNPL into merchant checkout, apps and e-commerce flows.' },
      { title: 'BNPL engine', desc: 'Configurable installment products with merchant settlement and consumer servicing.' },
      { title: 'Smart KYC / AML', desc: 'Automated identity proofing, sanctions and PEP screening with continuous monitoring.' },
      { title: 'Multi-channel distribution', desc: 'Originate via app, web and agent channels from one product and pricing engine.' },
      { title: 'Real-time disbursement', desc: 'Instant fund transfer on approval through integrated banking and payment rails.' },
      { title: 'Collections & recovery', desc: 'Risk-based collections workflows and digital nudges improve recovery rates.' },
    ],
    steps: [
      { no: '01', title: 'Onboard', desc: 'Customers verify identity digitally with selfie, document and instant KYC.' },
      { no: '02', title: 'Decide', desc: 'AI models price and approve credit in real time using alternative data.' },
      { no: '03', title: 'Disburse', desc: 'Funds move instantly via integrated banking and payment APIs.' },
      { no: '04', title: 'Service', desc: 'Repayment, BNPL installments and risk-based collections run automatically.' },
    ],
    outcomes: [
      { to: 80, suffix: '%', label: 'Faster onboarding' },
      { to: 95, suffix: '%', label: 'Process automation' },
      { to: 3, label: 'Minute applications' },
      { to: 24, suffix: '×7', label: 'Always-on lending' },
    ],
    outcomeNote: 'Onboarding and automation gains realized across retail-banking digital lending programs.',
    industries: ['Banking', 'Fintech', 'Retail', 'E-Commerce'],
    integration: [
      { title: 'Identity', items: ['eKYC providers', 'Biometric verification', 'Sanctions & PEP screening', 'Credit bureaus'] },
      { title: 'Money movement', items: ['Core banking', 'Payment gateways', 'BNPL settlement', 'Disbursement rails'] },
      { title: 'Channels', items: ['Mobile & web apps', 'Merchant checkout', 'Agent networks', 'Embedded APIs'] },
    ],
    deployment: 'Cloud-native and API-first for rapid embedding, with multi-tenant support for fintech programs and bank-grade controls for regulated lenders.',
    related: ['kredence', 'linguara'],
  },
  linguara: {
    title: 'Linguara',
    subtitle: 'Multilingual Localization Platform',
    tagline: '80+ Languages · GenAI Translation · Zero-Code Integration',
    accent: 'red',
    image: '/solution-linguara.jpg',
    overview:
      'Linguara is Aptiva\'s GenAI-powered localization platform that helps enterprises communicate accurately across diverse linguistic and cultural markets. Combining machine translation, human-in-the-loop review and genuine cultural adaptation, Linguara localizes marketing, legal, customer and product content across Arabic dialects, English, French, Swahili and 80+ languages — cutting localization cost by up to 70% with zero-code deployment.',
    problem: {
      headline: 'In MEA, getting language wrong is a brand and compliance risk.',
      body: 'Operating across many languages and cultures, enterprises face a painful trade-off: cheap machine translation that is tone-deaf and non-compliant, or human translation that is slow and expensive. Inconsistent terminology and cultural missteps damage brand and, in regulated content, create real liability. Linguara delivers human-quality localization at machine speed.',
      pains: [
        'Slow, costly human translation that bottlenecks every launch',
        'Raw machine translation that misses Arabic dialect and cultural nuance',
        'Inconsistent terminology and brand voice across markets',
        'Engineering effort required to localize each new channel',
      ],
    },
    features: [
      { title: 'GenAI translation', desc: 'Domain-tuned large language models translate with context, tone and terminology awareness.' },
      { title: 'Human-in-the-loop review', desc: 'Expert reviewers validate and refine critical content within a collaborative workflow.' },
      { title: 'Cultural adaptation', desc: 'Beyond translation — local conventions, sensitivities and regional compliance are applied.' },
      { title: 'Arabic dialect support', desc: 'Modern Standard Arabic plus regional dialects with full RTL handling.' },
      { title: 'Terminology management', desc: 'Glossaries and brand voice enforce consistency across every language and asset.' },
      { title: 'Zero-code integration', desc: 'A JS snippet or API localizes web, mobile and documents without touching the app.' },
      { title: 'CMS & DAM connectors', desc: 'Native integration with content, marketing and digital-asset platforms.' },
      { title: 'Real-time collaboration', desc: 'Reviewers, editors and stakeholders work together with versioning and approvals.' },
    ],
    steps: [
      { no: '01', title: 'Connect', desc: 'A snippet or API links Linguara to your content with no engineering changes.' },
      { no: '02', title: 'Translate', desc: 'GenAI translates with domain terminology and cultural context applied.' },
      { no: '03', title: 'Review', desc: 'Human experts validate critical content within a collaborative workflow.' },
      { no: '04', title: 'Publish', desc: 'Localized content deploys across web, mobile and documents in real time.' },
    ],
    outcomes: [
      { to: 70, suffix: '%', label: 'Lower localization cost' },
      { to: 80, suffix: '+', label: 'Languages supported' },
      { to: 95, suffix: '%', label: 'Translation accuracy' },
      { to: 10, suffix: '×', label: 'Faster time-to-market' },
    ],
    outcomeNote: 'Cost and speed gains demonstrated across telecom and government multilingual programs.',
    industries: ['Government', 'Banking', 'Telecom', 'Retail', 'Media'],
    integration: [
      { title: 'Content', items: ['Web & mobile apps', 'CMS platforms', 'DAM systems', 'Document formats'] },
      { title: 'Marketing', items: ['Campaign platforms', 'Email & CRM', 'Knowledge bases', 'Product catalogs'] },
      { title: 'Quality', items: ['Glossaries & TM', 'Reviewer workflows', 'Brand voice rules', 'Versioning'] },
    ],
    deployment: 'Fully managed SaaS with zero-code embedding, or private deployment for sensitive content — both with secure reviewer access and audit history.',
    related: ['kredence', 'lendora'],
  },
  procuria: {
    title: 'Procuria',
    subtitle: 'Source-to-Pay Procurement Platform',
    tagline: 'Spend Automation · eRFX & eAuctions · AI Spend Analytics',
    accent: 'blue',
    image: '/solution-procuria.jpg',
    overview:
      'Procuria is Aptiva\'s end-to-end source-to-pay platform that digitizes procurement from requisition through payment. With intelligent spend analysis, automated three-way matching and compliance-driven approval workflows, Procuria cuts procurement costs 15–25%, eliminates maverick spending and enforces 100% policy compliance — integrating natively with SAP, Oracle and Microsoft ERP for enterprise-wide visibility.',
    problem: {
      headline: 'Procurement leaks value at every manual, ungoverned step.',
      body: 'Fragmented sourcing, off-contract buying and manual invoice matching drain margin and obscure spend. Finance cannot see commitments in real time, and complex GCC mandates — local content, multi-currency, multi-entity — add friction. Procuria brings the whole source-to-pay cycle into one governed, analytics-driven platform.',
      pains: [
        'Maverick, off-contract spending that erodes negotiated savings',
        'Manual three-way matching and slow invoice exception handling',
        'No real-time visibility into commitments and category spend',
        'Difficulty enforcing GCC local-content and compliance mandates',
      ],
    },
    features: [
      { title: 'Requisition-to-pay automation', desc: 'Guided buying, approval gates and automated PO and invoice processing end to end.' },
      { title: 'eRFX & eAuctions', desc: 'Electronic RFP, RFQ and reverse auctions drive competitive, transparent sourcing.' },
      { title: 'Catalog & punchout', desc: 'Supplier catalogs and punchout keep buying on-contract and on-policy.' },
      { title: 'Three-way matching', desc: 'Automated PO, receipt and invoice matching with intelligent exception handling.' },
      { title: 'AI spend analytics', desc: 'ML surfaces savings opportunities, leakage and supplier performance patterns.' },
      { title: 'Contract compliance', desc: 'Buying is checked against contract terms, budgets and category policy in real time.' },
      { title: 'Budget enforcement', desc: 'Real-time budget tracking with alerts and escalation prevents overspend.' },
      { title: 'ERP integration', desc: 'Native connectors to SAP, Oracle and Microsoft for unified financial control.' },
    ],
    steps: [
      { no: '01', title: 'Source', desc: 'eRFX and eAuctions select suppliers competitively and on-policy.' },
      { no: '02', title: 'Buy', desc: 'Guided buying from catalogs keeps spend on-contract with approval gates.' },
      { no: '03', title: 'Match & pay', desc: 'Automated three-way matching clears invoices and triggers payment.' },
      { no: '04', title: 'Analyze', desc: 'AI analytics turn spend data into savings and category strategy.' },
    ],
    outcomes: [
      { to: 25, suffix: '%', label: 'Procurement cost savings' },
      { to: 100, suffix: '%', label: 'Policy compliance' },
      { to: 60, suffix: '%', label: 'Faster cycle time' },
      { to: 10, suffix: 'K+', label: 'Tenders / year processed' },
    ],
    outcomeNote: 'Savings and cycle-time gains realized across government and energy procurement programs.',
    industries: ['Government', 'Energy', 'Banking', 'Manufacturing'],
    integration: [
      { title: 'ERP & finance', items: ['SAP', 'Oracle', 'Microsoft Dynamics', 'GL & treasury'] },
      { title: 'Sourcing', items: ['Supplier catalogs', 'Punchout', 'eAuction engine', 'Contract repository'] },
      { title: 'Compliance', items: ['GCC local content', 'WTO rules', 'Approval matrices', 'Audit trails'] },
    ],
    deployment: 'Cloud or on-premises, multi-entity and multi-currency, configured for GCC procurement regulation including local-content tracking and tender governance.',
    related: ['vendrix'],
  },
  vendrix: {
    title: 'Vendrix',
    subtitle: 'Supplier Management Platform',
    tagline: 'Supplier Scoring · Performance Tracking · AI Risk & ESG',
    accent: 'blue',
    image: '/solution-vendrix.jpg',
    overview:
      'Vendrix provides comprehensive supplier lifecycle management — from onboarding and qualification to performance monitoring and risk assessment. With AI risk scoring across financial health, compliance, ESG and geopolitical factors, plus 360° performance scorecards and a supplier self-service portal, Vendrix helps procurement teams find and mitigate supplier risk before it disrupts operations — managing 500+ vendors with automated scoring.',
    problem: {
      headline: 'Supply chains break at the supplier you weren\'t watching.',
      body: 'Most organizations onboard suppliers once and review them rarely. Financial distress, compliance lapses, ESG violations and geopolitical shocks go undetected until they cause disruption. Manual scorecards are stale the day they\'re built. Vendrix gives procurement a live, data-driven view of every supplier\'s risk and performance.',
      pains: [
        'Point-in-time onboarding with little ongoing risk monitoring',
        'Stale, manual scorecards that miss emerging supplier distress',
        'No early warning on compliance, ESG or geopolitical exposure',
        'High admin load chasing supplier documents and certifications',
      ],
    },
    features: [
      { title: 'Onboarding & qualification', desc: 'Structured supplier onboarding with document collection and automated qualification.' },
      { title: '360° scorecards', desc: 'Quality, delivery, cost and compliance metrics combine into live performance scores.' },
      { title: 'AI risk scoring', desc: 'ML models continuously score financial, compliance, ESG and geopolitical risk.' },
      { title: 'Early-warning alerts', desc: 'Real-time alerts on deteriorating performance or emerging risk signals.' },
      { title: 'Compliance & certification', desc: 'Track certifications and compliance status with automatic expiry reminders.' },
      { title: 'ESG & geopolitical signals', desc: 'External signals enrich risk profiles with sustainability and regional exposure.' },
      { title: 'Self-service portal', desc: 'Suppliers maintain profiles, submit documents and view scorecards themselves.' },
      { title: 'Performance analytics', desc: 'Dashboards and benchmarking drive supplier development and consolidation decisions.' },
    ],
    steps: [
      { no: '01', title: 'Onboard', desc: 'Suppliers self-register and qualify with automated document checks.' },
      { no: '02', title: 'Score', desc: 'AI continuously scores financial, compliance, ESG and geopolitical risk.' },
      { no: '03', title: 'Monitor', desc: 'Live scorecards and alerts surface deterioration before it disrupts supply.' },
      { no: '04', title: 'Act', desc: 'Analytics drive development, mitigation and consolidation decisions.' },
    ],
    outcomes: [
      { to: 500, suffix: '+', label: 'Vendors managed' },
      { to: 360, suffix: '°', label: 'Risk visibility' },
      { to: 50, suffix: '%', label: 'Less admin load' },
      { to: 24, suffix: '×7', label: 'Risk monitoring' },
    ],
    outcomeNote: 'Coverage and risk visibility proven in energy and infrastructure supplier networks.',
    industries: ['Energy', 'Manufacturing', 'Banking', 'Government'],
    integration: [
      { title: 'Procurement', items: ['Source-to-pay (Procuria)', 'ERP suppliers', 'Contract systems', 'Spend data'] },
      { title: 'Risk data', items: ['Financial health feeds', 'Sanctions & compliance', 'ESG signals', 'Geopolitical alerts'] },
      { title: 'Engagement', items: ['Supplier portal', 'Document workflows', 'Scorecards', 'Certification tracking'] },
    ],
    deployment: 'Cloud-based with a secure supplier portal, configurable risk models and connectors into procurement and ERP for a single supplier system of record.',
    related: ['procuria'],
  },
  adscopia: {
    title: 'Adscopia',
    subtitle: 'DOOH & Media Platform',
    tagline: 'AI Media Planning · Programmatic DOOH · Hyperlocal Targeting',
    accent: 'red',
    image: '/solution-adscopia.jpg',
    overview:
      'Adscopia is Aptiva\'s digital out-of-home and media management platform, providing end-to-end control of advertising inventory across screens, billboards and interactive displays. With real-time scheduling, dynamic creative optimization and programmatic selling, Adscopia maximizes revenue per screen while giving advertisers precise targeting and measurable performance — managing 5,000+ screens across UAE, KSA and Egypt.',
    problem: {
      headline: 'DOOH inventory is valuable — and chronically under-monetized.',
      body: 'Media owners run premium screen networks on manual scheduling and direct sales, leaving inventory unsold and yield on the table. Advertisers, meanwhile, lack the targeting and proof of performance they get online. Adscopia brings programmatic precision, automation and analytics to physical media.',
      pains: [
        'Manual playlist scheduling and unsold inventory across the network',
        'No programmatic or real-time selling to capture demand',
        'Weak targeting and no measurable proof of campaign performance',
        'Fragmented management across malls, transit and outdoor venues',
      ],
    },
    features: [
      { title: 'AI media planning', desc: 'Optimizes plans against audience data, location intelligence and campaign goals.' },
      { title: 'Programmatic DOOH', desc: 'Real-time bidding and dynamic creative optimization fill inventory at best yield.' },
      { title: 'Real-time scheduling', desc: 'Automated playlist and content management across the entire screen estate.' },
      { title: 'Hyperlocal targeting', desc: 'Geo-fenced, demographic and behavioral targeting for maximum relevance.' },
      { title: 'Yield optimization', desc: 'Revenue analytics and pricing intelligence maximize revenue per screen.' },
      { title: 'Multi-venue management', desc: 'Unified control across malls, transit, outdoor and elevator networks.' },
      { title: 'Dynamic content', desc: 'Time, weather and context-triggered creative keeps messaging relevant.' },
      { title: 'Campaign attribution', desc: 'Impression tracking, engagement metrics and ROI reporting per campaign.' },
    ],
    steps: [
      { no: '01', title: 'Plan', desc: 'AI builds optimal media plans from audience and location intelligence.' },
      { no: '02', title: 'Sell', desc: 'Programmatic and direct demand fills inventory in real time.' },
      { no: '03', title: 'Serve', desc: 'Dynamic creative is scheduled and played across the screen estate.' },
      { no: '04', title: 'Measure', desc: 'Attribution and yield analytics prove and optimize performance.' },
    ],
    outcomes: [
      { to: 5000, suffix: '+', label: 'Screens managed' },
      { to: 3, label: 'Markets (UAE, KSA, Egypt)' },
      { to: 40, suffix: '%', label: 'Higher yield per screen' },
      { to: 24, suffix: '×7', label: 'Automated operation' },
    ],
    outcomeNote: 'Scale and yield gains achieved across mall, transit and outdoor DOOH networks.',
    industries: ['Media', 'Retail', 'Transportation', 'Real Estate'],
    integration: [
      { title: 'Demand', items: ['Programmatic / RTB', 'Direct sales', 'DSPs & SSPs', 'Agency platforms'] },
      { title: 'Inventory', items: ['LED billboards', 'Transit screens', 'Mall & kiosk displays', 'CMS players'] },
      { title: 'Intelligence', items: ['Audience data (Gazelens)', 'Location signals', 'Yield analytics', 'Attribution'] },
    ],
    deployment: 'Cloud-based media platform with edge players for resilient playback, integrating audience analytics and programmatic demand into a single revenue engine.',
    related: ['gazelens'],
  },
  gazelens: {
    title: 'Gazelens',
    subtitle: 'Audience Analytics Platform',
    tagline: 'Demographics · Attention Analytics · Privacy-First Vision',
    accent: 'red',
    image: '/solution-gazelens.jpg',
    overview:
      'Gazelens is Aptiva\'s AI-powered audience analytics platform delivering real-time demographic insight, engagement metrics and attention analytics for physical spaces. Using computer vision and edge computing, Gazelens anonymously analyzes foot traffic, dwell time, gaze and sentiment — giving venue operators and advertisers actionable intelligence to optimize layout, content and experience across 200+ live locations, by design without storing personal data.',
    problem: {
      headline: 'Physical spaces are full of audience signal nobody is capturing.',
      body: 'Online, every impression is measured; in the physical world, operators and advertisers fly blind. They don\'t know who passes, what draws attention, or whether content works — and privacy concerns make naive camera analytics a non-starter. Gazelens captures rich audience intelligence while guaranteeing privacy through edge processing and anonymization.',
      pains: [
        'No reliable measurement of footfall, dwell or attention in venues',
        'Layout and content decisions made on intuition, not data',
        'Inability to prove DOOH and retail campaign effectiveness',
        'Privacy and compliance risk from facial-recognition approaches',
      ],
    },
    features: [
      { title: 'Demographic detection', desc: 'Anonymous estimation of age, gender and mood with 90%+ accuracy via computer vision.' },
      { title: 'Foot-traffic heatmaps', desc: 'Footfall and dwell-time heatmaps reveal how people move through a space.' },
      { title: 'Attention analytics', desc: 'Gaze tracking and engagement scoring quantify what content actually captures attention.' },
      { title: 'Emotion & sentiment', desc: 'Real-time sentiment signals measure reaction to content and environment.' },
      { title: 'Audience segmentation', desc: 'Cohort analysis segments audiences for targeting and content strategy.' },
      { title: 'DOOH integration', desc: 'Feeds audience data directly into Adscopia and digital-signage networks.' },
      { title: 'Edge processing', desc: 'On-device inference means raw imagery never leaves the sensor.' },
      { title: 'Privacy-first design', desc: 'No facial recognition and no personal-data storage — only anonymized, aggregated analytics.' },
    ],
    steps: [
      { no: '01', title: 'Sense', desc: 'Edge sensors capture anonymized vision signals at the point of presence.' },
      { no: '02', title: 'Analyze', desc: 'On-device models estimate demographics, dwell, gaze and sentiment.' },
      { no: '03', title: 'Aggregate', desc: 'Only anonymized, aggregated metrics leave the edge — never raw imagery.' },
      { no: '04', title: 'Activate', desc: 'Insight drives layout, content and DOOH targeting in near real time.' },
    ],
    outcomes: [
      { to: 200, suffix: '+', label: 'Live locations' },
      { to: 1, suffix: 'M+', label: 'Monthly footfalls measured' },
      { to: 90, suffix: '%', label: 'Demographic accuracy' },
      { to: 0, label: 'Personal records stored' },
    ],
    outcomeNote: 'Deployed across shopping malls and transit hubs with privacy-by-design at every site.',
    industries: ['Retail', 'Media', 'Transportation', 'Hospitality'],
    integration: [
      { title: 'Sensing', items: ['Edge vision sensors', 'Existing cameras', 'IoT gateways', 'On-device inference'] },
      { title: 'Activation', items: ['DOOH (Adscopia)', 'Digital signage', 'BI dashboards', 'Marketing analytics'] },
      { title: 'Privacy', items: ['No facial recognition', 'No PII storage', 'Edge anonymization', 'GDPR / PDPL aligned'] },
    ],
    deployment: 'Edge-first deployment with lightweight sensors and on-device inference, sending only aggregated metrics to the cloud — privacy and compliance built into the architecture.',
    related: ['adscopia'],
  },
}

const featureIcons = [IconBrain, IconLayers, IconZap, IconSparkle, IconShield, IconGlobe, IconServer, IconChart]
const integIcons = [IconServer, IconCloud, IconShield]

/* ────────────── PAGE ────────────── */

export default function SolutionDetail() {
  const { slug } = useParams()
  const key = slug || ''
  const solution = solutionsData[key]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!solution) {
    return (
      <section className="surface-ink-raised relative flex min-h-[70vh] items-center overflow-hidden">
        <Aurora />
        <Grain />
        <div className="container-xl relative z-10 text-center">
          <span className="eyebrow-red">404</span>
          <h1 className="display-2 mt-6 text-white">Solution not found.</h1>
          <p className="lead mx-auto mt-5 max-w-md text-white/60">The platform you're looking for doesn't exist. Explore the full portfolio instead.</p>
          <a href="#/solutions" className="btn-primary group mt-10"><span>View all solutions</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
        </div>
      </section>
    )
  }

  const accent = solution.accent
  const isBlue = accent === 'blue'

  return (
    <div>
      <PageHeader
        label={`SOLUTION · ${TAGS[key].toUpperCase()}`}
        title={`${solution.title}.`}
        subtitle={solution.subtitle}
        bgImage={solution.image}
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Solutions', href: '#/solutions' }, { label: solution.title }]}
        stats={solution.outcomes.slice(0, 3).map((s) => ({
          value: `${s.prefix ?? ''}${s.to.toLocaleString()}${s.suffix ?? ''}`,
          label: s.label,
        }))}
      />

      {/* Overview */}
      <section className="surface-ink-flat relative overflow-hidden">
        <div className="container-xl section-y relative z-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal stagger=".ov-item">
              <span className={`ov-item ${isBlue ? 'eyebrow-blue' : 'eyebrow-red'}`}>Overview</span>
              <h2 className="ov-item display-3 mt-6 text-white text-balance">{solution.tagline}</h2>
              <p className="ov-item lead mt-7 text-white/65">{solution.overview}</p>
              <div className="ov-item mt-9 flex flex-wrap gap-4">
                <a href="#/contact" className={`${isBlue ? 'btn-primary-blue' : 'btn-primary'} group`}><span>Request a demo</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
                <a href="#/solutions" className="btn-ghost group">All solutions<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
              </div>
            </Reveal>

            <Reveal from="scale">
              <TiltCard glow={accent} className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${solution.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
                <div className={`absolute inset-0 opacity-25 mix-blend-overlay ${isBlue ? 'bg-grad-blue' : 'bg-grad-red'}`} />
                <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">{TAGS[key]}</span>
                  <span className={`font-display text-lg font-semibold ${isBlue ? 'text-gradient-blue' : 'text-gradient-red'}`}>{solution.title}</span>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="surface-paper relative overflow-hidden">
        <GridBackdrop light />
        <div className="container-xl section-y relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionHeading
              theme="light"
              eyebrow="The problem"
              title={solution.problem.headline}
              intro={solution.problem.body}
            />
            <Reveal stagger=".pain-item" className="flex flex-col justify-center gap-3">
              {solution.problem.pains.map((p) => (
                <div key={p} className="pain-item group flex items-start gap-4 border border-ink-900/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift-light">
                  <span className={`${isBlue ? 'icon-tile-blue-light' : 'icon-tile-light'} h-9 w-9 shrink-0`}>
                    <IconZap className={`h-4 w-4 ${isBlue ? 'text-brand-blue' : 'text-brand-red'}`} />
                  </span>
                  <p className="text-[14.5px] leading-relaxed text-ink-900/70">{p}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="surface-ink-raised relative overflow-hidden">
        <KineticBackdrop variant="mesh" color={accent} opacity={0.35} />
        <Grain />
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            eyebrow="Key features"
            counter={`${solution.features.length} capabilities`}
            title={<>Built to <span className={isBlue ? 'text-gradient-blue' : 'text-gradient-red'}>do the work.</span></>}
            intro={`Everything ${solution.title} needs to deliver outcomes in production — engineered, integrated and governed.`}
          />
          <Reveal stagger=".feat-card" className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {solution.features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length]
              return (
                <TiltCard key={f.title} glow={accent} className="feat-card card-ink flex flex-col p-7">
                  <span className={`${isBlue ? 'icon-tile-blue' : 'icon-tile'} mb-6 h-12 w-12`}><Icon className="h-5 w-5 text-white/85" /></span>
                  <h3 className="font-display text-base font-semibold text-white">{f.title}</h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-white/55">{f.desc}</p>
                </TiltCard>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="surface-paper relative overflow-hidden">
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            theme="light"
            eyebrow="How it works"
            title={<>An <span className={isBlue ? 'text-gradient-blue' : 'text-gradient-red'}>agentic-AI</span> pipeline, end to end.</>}
            intro={`${solution.title} combines GenAI, machine learning and policy-aware automation into a four-stage flow — intelligent, auditable and built to scale.`}
          />
          <Reveal stagger=".how-step" className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-ink-900/10 bg-ink-900/5 md:grid-cols-2 lg:grid-cols-4">
            {solution.steps.map((s) => (
              <div key={s.no} className={`how-step group relative bg-white p-8 transition-colors duration-500 ${isBlue ? 'hover:bg-brand-blue/[0.03]' : 'hover:bg-brand-red/[0.03]'}`}>
                <span className={`font-display text-5xl font-semibold text-ink-900/12 transition-colors duration-500 ${isBlue ? 'group-hover:text-brand-blue/40' : 'group-hover:text-brand-red/40'}`}>{s.no}</span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-900/55">{s.desc}</p>
                <div className={`mt-6 h-px w-8 transition-all duration-500 group-hover:w-16 ${isBlue ? 'bg-grad-blue' : 'bg-grad-red'}`} />
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-900/45">
              <IconSparkle className={`h-4 w-4 ${isBlue ? 'text-brand-blue' : 'text-brand-red'}`} /> Agentic AI · GenAI · Intelligent automation
            </span>
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <section className="surface-ink-flat relative overflow-hidden">
        <Aurora className="opacity-50" />
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            eyebrow="Measurable outcomes"
            title={<>The numbers <span className={isBlue ? 'text-gradient-blue' : 'text-gradient-red'}>that matter.</span></>}
            intro={solution.outcomeNote}
          />
          <Reveal stagger=".out-item" className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/[0.04] lg:grid-cols-4">
            {solution.outcomes.map((s, i) => (
              <div key={i} className="out-item group bg-ink-900/70 p-8 transition-colors duration-500 hover:bg-white/[0.03]">
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="mt-3 text-[13px] leading-snug text-white/55">{s.label}</div>
                <div className={`mt-4 h-px w-9 transition-all duration-500 group-hover:w-16 ${isBlue ? 'bg-grad-blue' : 'bg-grad-red'}`} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Industries + Integration + Deployment */}
      <section className="surface-paper relative overflow-hidden">
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            theme="light"
            eyebrow="Industries & integration"
            title={<>Engineered for the <span className={isBlue ? 'text-gradient-blue' : 'text-gradient-red'}>regulated enterprise.</span></>}
            intro={`Where ${solution.title} delivers value, and how it plugs into the systems and standards you already run.`}
          />

          <Reveal className="mt-12">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-900/45">Target industries</p>
            <div className="flex flex-wrap gap-2.5">
              {solution.industries.map((ind) => (
                <span key={ind} className="group inline-flex items-center gap-2 border border-ink-900/10 bg-white px-4 py-2 text-[13px] font-semibold text-ink-900/75 transition-all hover:border-ink-900/25">
                  <IconCheckCircle className={`h-4 w-4 ${isBlue ? 'text-brand-blue' : 'text-brand-red'}`} />{ind}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal stagger=".integ-card" className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {solution.integration.map((col, i) => {
              const Icon = integIcons[i % integIcons.length]
              return (
                <div key={col.title} className="integ-card card-paper group flex flex-col p-7">
                  <span className={`${isBlue ? 'icon-tile-blue-light' : 'icon-tile-light'} mb-5 h-11 w-11`}><Icon className={`h-5 w-5 ${isBlue ? 'text-brand-blue' : 'text-brand-red'}`} /></span>
                  <h3 className="font-display text-base font-semibold text-ink-900">{col.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {col.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-ink-900/60">
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isBlue ? 'bg-brand-blue' : 'bg-brand-red'}`} />{it}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </Reveal>

          <Reveal className="mt-8 flex items-start gap-4 border border-ink-900/10 bg-ink-900/[0.03] p-7">
            <span className={`${isBlue ? 'icon-tile-blue-light' : 'icon-tile-light'} h-11 w-11 shrink-0`}><IconSettings className={`h-5 w-5 ${isBlue ? 'text-brand-blue' : 'text-brand-red'}`} /></span>
            <div>
              <h3 className="font-display text-base font-semibold text-ink-900">Deployment & operations</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-900/60">{solution.deployment}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {solution.related.length > 0 && (
        <section className="surface-ink-raised relative overflow-hidden">
          <GridBackdrop />
          <div className="container-xl section-y relative z-10">
            <SectionHeading
              eyebrow="Related solutions"
              title={<>Stronger <span className={isBlue ? 'text-gradient-blue' : 'text-gradient-red'}>together.</span></>}
              intro={`Platforms that complement ${solution.title} to compound value across the enterprise.`}
            />
            <Reveal stagger=".rel-card" className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {solution.related.map((rs) => (
                <TiltCard
                  key={rs}
                  href={`#/solutions/${rs}`}
                  glow={accent}
                  className="rel-card group relative flex min-h-[280px] flex-col justify-end overflow-hidden border border-white/10 bg-ink-900"
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(/solution-${rs}.jpg)` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/20" />
                  <div className={`absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-35 ${isBlue ? 'bg-grad-blue' : 'bg-grad-red'}`} />
                  <div className="relative z-10 p-7">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">{TAGS[rs]}</span>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">{NAMES[rs]}</h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all group-hover:gap-3">
                      View platform<IconArrowRight className={`h-3.5 w-3.5 ${isBlue ? 'text-brand-blue' : 'text-brand-red'}`} />
                    </span>
                  </div>
                </TiltCard>
              ))}
              <a href="#/solutions" className="rel-card group relative flex min-h-[280px] flex-col items-start justify-end overflow-hidden border border-dashed border-white/15 bg-white/[0.02] p-7 transition-all hover:border-white/35 hover:bg-white/[0.04]">
                <span className={`${isBlue ? 'icon-tile-blue' : 'icon-tile'} mb-auto h-12 w-12`}><IconDocument className="h-5 w-5 text-white/85" /></span>
                <h3 className="font-display text-2xl font-semibold text-white">Full portfolio</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/70 transition-all group-hover:gap-3 group-hover:text-white">
                  All 11 solutions<IconArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      )}

      <CTASection
        color={accent}
        eyebrow="See it on your data"
        title={<>Put {solution.title} to <span className={isBlue ? 'text-gradient-blue' : 'text-gradient-red'}>work.</span></>}
        body={`Book a working session with our solution architects. We'll scope a focused proof-of-value and show ${solution.title} running against a real workflow from your business.`}
        primary={{ label: 'Request a demo', href: '#/contact' }}
        secondary={{ label: 'Explore all solutions', href: '#/solutions' }}
      />
    </div>
  )
}
