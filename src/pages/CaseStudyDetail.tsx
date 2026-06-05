import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  IconArrowRight, IconArrowUpRight, IconCheckCircle, IconBrain, IconShield,
  IconLayers, IconSparkle, IconRocket,
} from '../components/Icons'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, GridBackdrop, Grain } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import Counter from '../components/kit/Counter'
import CTASection from '../components/kit/CTASection'

/* ────────────── TYPES ────────────── */

interface ImpactStat { metric: string; label: string; to?: number; prefix?: string; suffix?: string; decimals?: number }
interface ArchLayer { title: string; desc: string }
interface CaseStudy {
  name: string
  tagline: string
  location: string
  category: string
  duration: string
  image: string
  headline: string            // hero metric headline
  headlineLabel: string
  challenge: string
  challengeBullets: string[]
  approach: string
  architecture: ArchLayer[]   // approach/solution layers
  engagement: string          // engagement model narrative
  solution: string[]
  results: string[]
  quote: { text: string; author: string; role: string }
  technologies: string[]
  impact: ImpactStat[]
  related: string[]           // slugs
  accent: 'red' | 'blue'
}

/* ────────────── ALL CASE STUDY DATA (slug keys PRESERVED) ────────────── */

const allCaseStudies: Record<string, CaseStudy> = {
  etisalat: {
    name: 'Etisalat (e&)',
    tagline: "UAE's Leading Telecom",
    location: 'UAE',
    category: 'Telecommunications',
    duration: '9-Year Strategic Partnership',
    image: '/case-etisalat.jpg',
    headline: '15',
    headlineLabel: 'engagements over nine years',
    challenge:
      "Etisalat (e&), the UAE's largest telecommunications group with 15M+ subscribers, was carrying the weight of decades of organic growth: dozens of siloed content repositories, manual correspondence routing, and a customer-onboarding journey that stretched to five days. Every business unit had its own systems, its own data definitions, and its own backlog — and the cost of that fragmentation compounded with every new product, regulation and channel. Leadership needed a single partner accountable across content, AI, automation, cloud and security, not another point vendor adding to the integration debt.",
    challengeBullets: [
      'Fragmented, unsearchable content across business units slowing every regulated process',
      'Five-day subscriber onboarding eroding acquisition and CX in a hyper-competitive market',
      'Manual, error-prone back-office work consuming tens of thousands of staff hours',
      'No unified observability across the nation’s largest telecom infrastructure',
    ],
    approach:
      'Aptiva was engaged as a strategic full-stack partner under a deliberate land-and-expand model. We anchored on a unified Enterprise Content Management platform, proved its value, then layered intelligent document processing, GenAI-assisted knowledge, RPA, analytics, AIOps and zero-trust security on top — fifteen engagements sequenced so each one funded and de-risked the next.',
    architecture: [
      { title: 'Content & knowledge core', desc: 'OpenText Documentum as the single source of truth for 10,000+ users, with a modern knowledge platform surfacing 50,000+ articles via self-service.' },
      { title: 'Intelligent document processing', desc: 'AI-powered capture and classification at 99.5% accuracy processing 100,000+ documents monthly — the data fabric that feeds every downstream automation.' },
      { title: 'Agentic automation layer', desc: '50+ UiPath bots plus GenAI-assisted agents orchestrating billing, service and network tasks, with human-in-the-loop controls for regulated steps.' },
      { title: 'Observability & AIOps', desc: 'Full-stack telemetry with automated root-cause analysis and self-healing runbooks, cutting mean-time-to-resolution by 70%.' },
      { title: 'Zero-trust security', desc: 'CrowdStrike-protected cloud-native architecture securing 15,000+ endpoints across a multi-cloud AWS + Azure estate.' },
    ],
    engagement:
      'A dedicated team of 120+ Aptiva consultants embedded alongside e&’s own engineers, operating in agile squads with shared KPIs. Governance ran through a joint steering committee that reviewed value realization quarterly — which is precisely why a single ECM project compounded into fifteen engagements over nine years.',
    solution: [
      'Enterprise Content Platform — OpenText Documentum serving 10,000+ users with unified document management, workflow automation and compliance governance.',
      'Knowledge & Collaboration Platform — modern intranet and knowledge management surfacing 50,000+ articles for employees and customers.',
      'Intelligent Document Processing — AI capture and classification processing 100,000+ documents monthly at 99.5% accuracy, cutting manual entry by 90%.',
      'Digital Customer Onboarding — automated KYC, e-signature and instant SIM provisioning reducing activation from 5 days to under 30 minutes.',
      'Robotic Process Automation — 50+ UiPath bots across billing, service and network operations, saving 50,000+ man-hours annually.',
      'Business Intelligence & Analytics — Power BI dashboards giving real-time visibility into subscriber, revenue and operational KPIs.',
      'Observability & AIOps — automated incident detection, RCA and self-healing reducing MTTR by 70%.',
      'Multi-Cloud Transformation — 200+ workloads migrated across AWS and Azure with zero downtime and 40% cost optimization.',
      'Cybersecurity Operations — 24/7 SOC-as-a-Service with ISO 27001 certification and zero-trust endpoint protection.',
    ],
    results: [
      'Document processing time reduced by 80% through intelligent capture and automated workflows',
      '50+ business processes automated with RPA, saving 50,000+ man-hours annually',
      'Unified content platform serving 10,000+ users at 99.99% uptime',
      'Customer onboarding reduced from 5 days to under 30 minutes',
      'Multi-cloud transformation achieving 40% infrastructure cost savings',
      'Zero-trust security protecting 15,000+ endpoints with zero breaches',
    ],
    quote: {
      text: 'Aptiva became an extension of our own engineering organisation. They earned the right to every new mandate by delivering measurable outcomes on the last one — that is rare.',
      author: 'Group Technology Leadership',
      role: 'Etisalat (e&)',
    },
    technologies: ['OpenText Documentum', 'UiPath', 'Power BI', 'ServiceNow', 'AWS', 'Azure', 'CrowdStrike', 'Genesys', 'Salesforce', 'Databricks'],
    impact: [
      { metric: '15', label: 'Engagements', to: 15 },
      { metric: '9yr', label: 'Partnership' },
      { metric: '80%', label: 'Faster Processing', to: 80, suffix: '%' },
      { metric: '50K+', label: 'Hours Saved / Year', to: 50, suffix: 'K+' },
    ],
    related: ['fab', 'liquid-telecom', 'dubai-economy'],
    accent: 'blue',
  },
  fab: {
    name: 'First Abu Dhabi Bank',
    tagline: "UAE's Largest Bank",
    location: 'Global — All Locations',
    category: 'Banking & Financial Services',
    duration: '8-Year Strategic Partnership',
    image: '/case-fab.jpg',
    headline: '7',
    headlineLabel: 'global engagements from one project',
    challenge:
      'First Abu Dhabi Bank (FAB), with assets exceeding $300B, ran a content, compliance and IT-operations estate fragmented across five countries. Documents lived in disconnected systems, regulatory reporting was assembled by hand, and no one had a unified, real-time view of infrastructure health. In a bank where a missed filing or an unmonitored outage carries existential cost, that fragmentation was a board-level risk.',
    challengeBullets: [
      'Disconnected document systems across UAE, KSA, Egypt, India and UK operations',
      'Manual, error-prone compliance reporting against CBUAE, SCA and international regimes',
      'No single pane of glass for infrastructure health across global data centres',
      'Workflow changes taking months due to IT dependency and change-control friction',
    ],
    approach:
      'Aptiva began with a single, well-scoped Enterprise Content Management project and earned its way to seven engagements. Each phase compounded institutional knowledge — content, then low-code workflow, then compliance automation, ITSM, integration and finally global observability — so risk fell as scope grew.',
    architecture: [
      { title: 'Global content backbone', desc: 'OpenText Documentum unifying document management for 20,000+ employees across five countries with one governance model.' },
      { title: 'Citizen-developer workflow', desc: 'OpenText AppWorks low-code platform letting business users ship approval workflows in days instead of months — without IT bottlenecks.' },
      { title: 'Automated compliance & archival', desc: 'Rules-driven reporting and long-term archival meeting CBUAE, SCA and international standards with end-to-end audit trails.' },
      { title: 'Integrated operations', desc: 'ServiceNow ITSM for 500+ IT staff plus UnifyApps API-led integration tying ECM, CRM and core banking together.' },
      { title: 'Global observability', desc: 'Datadog telemetry across 1,000+ servers, databases and applications with sub-5-minute alert response.' },
    ],
    engagement:
      'A 45-strong specialist team operated as a long-term partner, not a project vendor — building deep expertise in FAB’s regulatory and operational context. The land-and-expand cadence, governed by joint value reviews, is what turned one ECM deployment into an eight-year, seven-engagement relationship.',
    solution: [
      'Enterprise Content Platform — OpenText Documentum across all global locations for 20,000+ employees.',
      'Low-Code Workflow Automation — OpenText AppWorks reducing workflow deployment from months to days.',
      'Regulatory Compliance & Archival — automated reporting and archival meeting CBUAE, SCA and international requirements.',
      'IT Service Management — ServiceNow incident, problem, change and configuration management for 500+ IT staff.',
      'Business Process Integration — UnifyApps API-led connectivity between ECM, CRM and core banking.',
      'Strategic Resource Partnership — 45+ specialist consultants in OpenText, ServiceNow and cloud.',
      'Infrastructure Observability — Datadog monitoring of 1,000+ servers, databases and applications.',
    ],
    results: [
      'Unified ECM deployed across 5 countries serving 20,000+ employees',
      '60% reduction in compliance reporting time through automation',
      '5M+ documents archived with automated retention management',
      'Workflow deployment time reduced from months to days',
      '24/7 infrastructure monitoring with sub-5-minute alert response',
      '100% regulatory compliance across CBUAE, SCA and international standards',
    ],
    quote: {
      text: 'What started as a content project became a strategic partnership. Aptiva understands regulated banking, and they deliver outcomes we can take to the regulator and the board.',
      author: 'Head of Enterprise Technology',
      role: 'First Abu Dhabi Bank',
    },
    technologies: ['OpenText Documentum', 'OpenText AppWorks', 'ServiceNow', 'Datadog', 'UnifyApps', 'InfoArchive'],
    impact: [
      { metric: '7', label: 'Engagements', to: 7 },
      { metric: '8yr', label: 'Partnership' },
      { metric: '20K+', label: 'Users Served', to: 20, suffix: 'K+' },
      { metric: '60%', label: 'Faster Compliance', to: 60, suffix: '%' },
    ],
    related: ['mashreq-bank', 'rak-bank', 'etisalat'],
    accent: 'red',
  },
  'dubai-economy': {
    name: 'Dubai Economy & Tourism',
    tagline: 'UAE Government',
    location: 'UAE Government',
    category: 'Government & Public Sector',
    duration: '3-Year Partnership',
    image: '/case-dubai-economy.jpg',
    headline: '100',
    headlineLabel: 'percent paperless correspondence',
    challenge:
      'Dubai Economy & Tourism (DET) is the engine of business licensing and economic development for one of the world’s most dynamic cities. Yet its correspondence ran on paper, document routing was manual, and there was no integrated digital-identity verification for licensing — turning what should be a same-day experience for entrepreneurs into a multi-day wait, and exposing the entity to compliance and continuity risk.',
    challengeBullets: [
      'Paper-based correspondence and manual routing across departments',
      'No integrated digital identity for business licensing and approvals',
      'Slow, fragmented payment processing and reconciliation',
      'Limited auditability across citizen and business communications',
    ],
    approach:
      'Aptiva designed a digital-by-default architecture that replaced paper with intelligent content, UAE Pass identity and automated, agentic correspondence — built to interoperate with existing government systems while delivering a modern, citizen-centric experience.',
    architecture: [
      { title: 'Government content platform', desc: 'OpenText Content Suite managing all correspondence, licenses and regulatory documents with role-based access and workflow automation.' },
      { title: 'Digital identity & trust', desc: 'UAE Pass and Ascertia integration for secure, legally-binding e-signatures on every government document.' },
      { title: 'Agentic correspondence', desc: 'Aptiva Corroflow capturing, classifying and routing 50,000+ communications a year, with AI drafting and 99.5% classification accuracy.' },
      { title: 'Automated reconciliation', desc: 'Payment processing integrated with the federal gateway, collapsing reconciliation from days to minutes at 99.9% accuracy.' },
    ],
    engagement:
      'Delivered across three phases with a dedicated public-sector squad, the programme prioritised change management and accessibility as heavily as technology — ensuring civil servants and entrepreneurs alike adopted the new digital channels from day one.',
    solution: [
      'Enterprise Content Platform — OpenText Content Suite for all correspondence, licenses and regulatory documents.',
      'Digital Identity & e-Signing — UAE Pass and Ascertia for secure, legally-binding electronic signatures.',
      'Agentic Correspondence Management — Aptiva Corroflow automating capture, routing and response for 50,000+ communications annually.',
      'Payment Automation & Reconciliation — integrated with the government payment gateway, reducing processing from days to minutes.',
    ],
    results: [
      '100% paperless government correspondence management',
      'Digital identity verification for 50,000+ business licenses',
      'Automated payment reconciliation with 99.9% accuracy',
      'AI document classification accuracy of 99.5%',
      'Average business license processing time reduced by 70%',
      'Citizen satisfaction scores increased by 45%',
    ],
    quote: {
      text: 'Aptiva helped us move from paper to a digital-by-default operation without disrupting the businesses that depend on us. The experience is faster, auditable and genuinely citizen-centric.',
      author: 'Digital Transformation Office',
      role: 'Dubai Economy & Tourism',
    },
    technologies: ['OpenText CSP', 'Ascertia', 'Corroflow', 'UAE Pass', 'Intelligent Capture'],
    impact: [
      { metric: '50K+', label: 'Businesses Served', to: 50, suffix: 'K+' },
      { metric: '70%', label: 'Faster Processing', to: 70, suffix: '%' },
      { metric: '99.5%', label: 'Classification Accuracy', to: 99.5, suffix: '%', decimals: 1 },
      { metric: '45%', label: 'Higher Satisfaction', to: 45, suffix: '%' },
    ],
    related: ['uae-mof', 'aldar', 'etisalat'],
    accent: 'red',
  },
  aldar: {
    name: 'Aldar Properties',
    tagline: 'UAE Real Estate Leader',
    location: 'UAE',
    category: 'Real Estate & Construction',
    duration: '2-Year Partnership',
    image: '/case-aldar.jpg',
    headline: '2',
    headlineLabel: 'million documents under management',
    challenge:
      'Aldar Properties, Abu Dhabi’s largest developer with $12B+ in assets, managed documents across 50+ developments on paper-based processes. Contract management was manual, payment processing for 10,000+ tenants was slow, and correspondence tracking was fragmented — creating operational drag and real compliance exposure in a heavily regulated sector.',
    challengeBullets: [
      'Paper-based contract and document management across 50+ projects',
      'Manual payment processing for 10,000+ tenants',
      'Fragmented correspondence with no unified audit trail',
      'Compliance risk against UAE real-estate retention requirements',
    ],
    approach:
      'Aptiva implemented an enterprise content platform with integrated, intelligent correspondence and payment automation — creating one authoritative source for every property document and financial transaction.',
    architecture: [
      { title: 'Document source of truth', desc: 'OpenText Documentum managing 2M+ documents across 50+ developments with version control and retention management.' },
      { title: 'Intelligent correspondence', desc: 'Aptiva Corroflow automating routing, approvals and response tracking for tenant, vendor and government communications.' },
      { title: 'Payment automation', desc: 'Automated processing for 10,000+ tenants integrated with the banking gateway and SAP for real-time reconciliation.' },
    ],
    engagement:
      'A focused two-year programme delivered by a real-estate-specialist team, sequenced to digitise the highest-volume document flows first and demonstrate return before extending across the full portfolio.',
    solution: [
      'Enterprise Content Platform — OpenText Documentum managing 2M+ documents across 50+ developments.',
      'Intelligent Correspondence Management — Aptiva Corroflow with automated routing, approvals and tracking.',
      'Payment Automation & Reconciliation — automated processing for 10,000+ tenants with SAP and gateway integration.',
    ],
    results: [
      'Unified document management for 2M+ documents across 50+ projects',
      'Automated payment workflows for 10,000+ tenants with real-time reconciliation',
      'Correspondence tracking with 100% audit-trail coverage',
      'Compliance-ready retention meeting UAE real-estate regulations',
      'Tenant payment processing reduced from 3 days to real-time',
    ],
    quote: {
      text: 'We now have a single, auditable source of truth across every development. The operational lift — and the compliance confidence — has been transformational.',
      author: 'Chief Operating Office',
      role: 'Aldar Properties',
    },
    technologies: ['OpenText Documentum', 'Corroflow', 'SAP Integration', 'Ascertia'],
    impact: [
      { metric: '2M+', label: 'Documents Managed', to: 2, suffix: 'M+' },
      { metric: '50+', label: 'Projects', to: 50, suffix: '+' },
      { metric: '10K+', label: 'Tenants', to: 10, suffix: 'K+' },
      { metric: 'Real-Time', label: 'Payment Processing' },
    ],
    related: ['damac', 'dubai-economy', 'samana'],
    accent: 'blue',
  },
  'daman-health': {
    name: 'Daman Health IC',
    tagline: 'Leading Health Insurer',
    location: 'UAE',
    category: 'Insurance / Healthcare',
    duration: '2-Year Partnership',
    image: '/case-daman.jpg',
    headline: '40',
    headlineLabel: 'percent CSAT improvement',
    challenge:
      'Daman Health, the UAE’s leading health insurer with 3M+ members, ran customer service across disconnected channels. Claims took weeks, service quality varied by touchpoint, and satisfaction scores were sliding in a market where member experience is the differentiator.',
    challengeBullets: [
      'Fragmented service across voice, chat, email and social channels',
      'Claims cycle times stretching into weeks',
      'Inconsistent quality and limited visibility into call compliance',
      'Slow, manual member onboarding',
    ],
    approach:
      'Aptiva delivered an end-to-end Customer Experience transformation — omnichannel CCaaS, AI-powered speech analytics, real-time agent assist and digital onboarding journeys.',
    architecture: [
      { title: 'Omnichannel CCaaS', desc: 'Genesys Cloud unifying voice, chat, email and social into a single routed experience.' },
      { title: 'AI agent-assist', desc: 'Real-time knowledge suggestions and next-best-action surfaced to agents inside every interaction.' },
      { title: 'Speech analytics', desc: '100% call monitoring for quality and compliance, replacing manual sampling.' },
      { title: 'Digital onboarding', desc: 'Self-service journeys reducing application time from days to minutes.' },
    ],
    engagement:
      'Delivered over two years with a CX-specialist team working alongside Daman’s operations leaders, with a relentless focus on the metrics members actually feel — speed, accuracy and consistency.',
    solution: [
      'Genesys Cloud CCaaS with omnichannel routing for voice, chat, email and social.',
      'Speech analytics for 100% call quality monitoring and compliance.',
      'AI-powered agent assist with real-time knowledge suggestions.',
      'Digital onboarding reducing application time from days to minutes.',
    ],
    results: [
      '40% improvement in customer satisfaction (CSAT) scores',
      '60% reduction in average handle time',
      '90% of claims processed within 24 hours',
      '100% call monitoring for compliance via speech analytics',
    ],
    quote: {
      text: 'Aptiva rebuilt our member experience around speed and consistency. The CSAT lift was immediate — and it has held.',
      author: 'Head of Customer Operations',
      role: 'Daman Health',
    },
    technologies: ['Genesys Cloud', 'AI / ML', 'Speech Analytics', 'CRM'],
    impact: [
      { metric: '3M+', label: 'Members', to: 3, suffix: 'M+' },
      { metric: '40%', label: 'CSAT Improvement', to: 40, suffix: '%' },
      { metric: '24h', label: 'Claims Processing' },
      { metric: '60%', label: 'Faster Handling', to: 60, suffix: '%' },
    ],
    related: ['nbf', 'damac', 'mashreq-bank'],
    accent: 'blue',
  },
  'mashreq-bank': {
    name: 'Mashreq Bank',
    tagline: 'Innovative UAE Bank',
    location: 'UAE',
    category: 'Banking & Financial Services',
    duration: '18-Month Partnership',
    image: '/case-mashreq.jpg',
    headline: '10',
    headlineLabel: 'terabytes processed daily',
    challenge:
      'Mashreq Bank needed real-time analytics, faster regulatory reporting and personalised customer experiences — but its legacy data warehouses were slow, costly and unable to handle modern banking volumes.',
    challengeBullets: [
      'Legacy warehouses too slow for real-time decisioning',
      'Manual regulatory reporting taking weeks',
      'No production ML for churn or credit-risk',
      'High infrastructure cost with poor scalability',
    ],
    approach:
      'Aptiva designed a modern Data & Analytics platform on a Databricks Lakehouse, with Power BI for decisioning and production ML models for churn and credit risk.',
    architecture: [
      { title: 'Lakehouse foundation', desc: 'Databricks unifying batch and streaming data into one governed processing layer handling 10TB+ daily.' },
      { title: 'Decision intelligence', desc: 'Power BI dashboards giving executives real-time operational and revenue visibility.' },
      { title: 'Production ML', desc: 'Churn prediction at 85% accuracy and credit-risk scoring operationalised into business workflows.' },
      { title: 'Automated reporting', desc: 'Regulatory pipelines collapsing reporting cycles from weeks to hours.' },
    ],
    engagement:
      'An 18-month programme delivered by a data-engineering squad, with model governance and explainability built in from the start to satisfy both the business and the regulator.',
    solution: [
      'Databricks Lakehouse architecture for unified data processing.',
      'Power BI dashboards for real-time executive decision-making.',
      'ML models for customer churn prediction and credit risk.',
      'Automated regulatory reporting pipeline.',
    ],
    results: [
      'Unified data lake processing 10TB+ daily',
      'Real-time executive dashboards for decision intelligence',
      'ML churn prediction operationalised at 85% accuracy',
      'Regulatory reporting reduced from weeks to hours',
    ],
    quote: {
      text: 'Aptiva turned our data from a cost centre into a decision engine. Reporting that took weeks now takes hours, and our models run in production.',
      author: 'Chief Data Office',
      role: 'Mashreq Bank',
    },
    technologies: ['Databricks', 'Power BI', 'ML / MLOps', 'Azure'],
    impact: [
      { metric: '10TB+', label: 'Daily Processing' },
      { metric: '85%', label: 'ML Accuracy', to: 85, suffix: '%' },
      { metric: 'Hours', label: 'Reg. Reporting' },
      { metric: 'Real-Time', label: 'Dashboards' },
    ],
    related: ['fab', 'rak-bank', 'oab'],
    accent: 'blue',
  },
  'rak-bank': {
    name: 'RAK Bank',
    tagline: 'Fastest Growing UAE Bank',
    location: 'UAE',
    category: 'Banking & Financial Services',
    duration: '2-Year Partnership',
    image: '/case-rakbank.jpg',
    headline: '90',
    headlineLabel: 'percent cost reduction',
    challenge:
      'RAK Bank faced mounting operational cost from manual processing across loan origination, KYC and compliance reporting — slow, error-prone work that hurt both margins and the customer experience.',
    challengeBullets: [
      'High-cost manual processing across origination, KYC and compliance',
      'Five-day loan turnaround eroding competitiveness',
      'Error-prone manual KYC document handling',
      'No data-driven view of further automation opportunity',
    ],
    approach:
      'Aptiva deployed intelligent automation at scale — UiPath RPA, AI document capture and process mining — to industrialise the bank’s highest-volume processes and continuously surface the next opportunity.',
    architecture: [
      { title: 'RPA at scale', desc: '25+ UiPath bots automating origination, KYC and compliance tasks with human-in-the-loop controls.' },
      { title: 'Intelligent capture', desc: 'AI-driven KYC document extraction and validation at 99%+ accuracy.' },
      { title: 'Process mining', desc: 'Continuous discovery of automation candidates, turning optimisation into an ongoing programme.' },
      { title: 'Low-code orchestration', desc: 'A low-code layer for rapid deployment of new automated workflows by the business.' },
    ],
    engagement:
      'A two-year automation partnership run as a centre of excellence, transferring capability to RAK Bank’s own teams so the programme scaled beyond the initial engagement.',
    solution: [
      'UiPath RPA automating 25+ business processes.',
      'Intelligent Capture for KYC document automation.',
      'Process mining for continuous optimization.',
      'Low-code workflow platform for rapid deployment.',
    ],
    results: [
      '90% cost reduction in targeted manual processes',
      'Loan processing reduced from 5 days to 4 hours',
      'KYC document processing at 99%+ accuracy',
      '50,000+ man-hours saved annually',
    ],
    quote: {
      text: 'Aptiva industrialised automation for us. What was a back-office cost is now a competitive advantage in speed and accuracy.',
      author: 'Head of Operations',
      role: 'RAK Bank',
    },
    technologies: ['UiPath', 'Intelligent Capture', 'Process Mining', 'Low-Code'],
    impact: [
      { metric: '90%', label: 'Cost Reduction', to: 90, suffix: '%' },
      { metric: '25+', label: 'Bots Deployed', to: 25, suffix: '+' },
      { metric: '50K+', label: 'Hours Saved', to: 50, suffix: 'K+' },
      { metric: '99%+', label: 'KYC Accuracy', to: 99, suffix: '%+' },
    ],
    related: ['fab', 'mashreq-bank', 'im-bank'],
    accent: 'red',
  },
  enec: {
    name: 'Emirates Nuclear Energy Corp',
    tagline: 'Critical National Infrastructure',
    location: 'UAE',
    category: 'Energy / Nuclear',
    duration: '3-Year Partnership',
    image: '/case-enec.jpg',
    headline: '5,000',
    headlineLabel: 'endpoints under zero-trust',
    challenge:
      'ENEC operates the UAE’s first nuclear power plant — an environment where cybersecurity and regulatory compliance carry national stakes. Critical-infrastructure protection demanded zero-trust architecture, continuous monitoring and rapid, provable threat response to IAEA standards.',
    challengeBullets: [
      'Critical national infrastructure requiring the highest assurance levels',
      'Strict IAEA and national regulatory compliance obligations',
      'Need for continuous monitoring across 5,000+ endpoints',
      'Demand for sub-15-minute, auditable threat response',
    ],
    approach:
      'Aptiva designed and operated a comprehensive cybersecurity framework — zero-trust architecture, endpoint protection, continuous VAPT and a 24/7 Security Operations Centre with AI-powered threat intelligence.',
    architecture: [
      { title: 'Zero-trust architecture', desc: 'Identity- and policy-driven segmentation eliminating implicit trust across the network.' },
      { title: 'Endpoint protection', desc: 'CrowdStrike Falcon securing 5,000+ endpoints with behavioural detection and response.' },
      { title: 'Continuous assurance', desc: 'Quarterly VAPT assessments validating posture against evolving threat models.' },
      { title: '24/7 SOC', desc: 'AI-assisted monitoring and incident response delivering sub-15-minute detection.' },
    ],
    engagement:
      'A three-year programme run under the strictest governance, with cleared specialists and rigorous documentation — every control mapped to IAEA cybersecurity requirements and independently auditable.',
    solution: [
      'CrowdStrike Falcon protecting 5,000+ endpoints.',
      'Zero-trust network architecture implementation.',
      'Quarterly VAPT assessments.',
      '24/7 Security Operations Centre with AI threat intelligence.',
    ],
    results: [
      'Zero-trust architecture protecting 5,000+ endpoints',
      'Sub-15-minute threat detection and response',
      'Full compliance with IAEA cybersecurity standards',
      'Zero security incidents since deployment',
    ],
    quote: {
      text: 'In our environment there is no acceptable margin for error. Aptiva delivered a security posture we can defend to the regulator and to the nation.',
      author: 'Chief Information Security Office',
      role: 'Emirates Nuclear Energy Corp',
    },
    technologies: ['CrowdStrike Falcon', 'Zero Trust', '24/7 SOC', 'VAPT'],
    impact: [
      { metric: '5K+', label: 'Endpoints Protected', to: 5, suffix: 'K+' },
      { metric: '<15min', label: 'Threat Response' },
      { metric: 'Zero', label: 'Security Incidents' },
      { metric: 'IAEA', label: 'Compliant' },
    ],
    related: ['etihad-rail', 'samana', 'fab'],
    accent: 'red',
  },
  'etihad-rail': {
    name: 'Etihad Rail',
    tagline: 'National Railway Network',
    location: 'UAE',
    category: 'Transport / Infrastructure',
    duration: '2-Year Partnership',
    image: '/case-etihad-rail.jpg',
    headline: '99.99',
    headlineLabel: 'percent uptime SLA',
    challenge:
      'Etihad Rail needed a digital infrastructure foundation that could scale with the UAE’s national railway network — from Abu Dhabi to the Saudi border. Legacy systems could not support the operational complexity, availability or recovery objectives of a modern 1,200km rail network.',
    challengeBullets: [
      'Legacy systems unable to scale with a 1,200km national network',
      'Mission-critical availability requirements across all stations',
      'Need for real-time operations monitoring and rapid recovery',
      'Disaster recovery objectives measured in minutes, not hours',
    ],
    approach:
      'Aptiva delivered a hybrid-cloud architecture combining AWS for scalable compute, Oracle Cloud for enterprise applications, and 24/7 managed services with monitoring, disaster recovery and automated backup.',
    architecture: [
      { title: 'Hybrid-cloud foundation', desc: 'AWS for elastic compute and Oracle Cloud for enterprise applications under one operating model.' },
      { title: 'Network operations centre', desc: '24/7 managed services with real-time monitoring across every station and asset.' },
      { title: 'Resilience engineering', desc: 'Disaster recovery with sub-1-hour RTO and automated, validated backups.' },
      { title: 'Observability', desc: 'End-to-end telemetry feeding proactive incident detection and SLA assurance.' },
    ],
    engagement:
      'A two-year build-and-operate partnership, transitioning from architecture and migration into a steady-state managed service governed by mission-critical SLAs.',
    solution: [
      'Hybrid cloud combining AWS and Oracle Cloud.',
      '24/7 managed services with a network operations centre.',
      'Real-time operations monitoring across all stations.',
      'Disaster recovery with sub-1-hour RTO.',
    ],
    results: [
      'Architecture supporting a 1,200km rail network',
      '99.99% uptime SLA for mission-critical systems',
      'Real-time monitoring across all stations',
      'Disaster recovery with sub-1-hour RTO',
    ],
    quote: {
      text: 'Aptiva built infrastructure that scales with the nation’s railway and stays up when it matters most. Their managed service is genuinely mission-critical grade.',
      author: 'Head of Technology Operations',
      role: 'Etihad Rail',
    },
    technologies: ['AWS', 'Oracle Cloud', 'ServiceNow', 'Managed Services'],
    impact: [
      { metric: '1,200km', label: 'Network' },
      { metric: '99.99%', label: 'Uptime', to: 99.99, suffix: '%', decimals: 2 },
      { metric: '<1hr', label: 'Disaster Recovery' },
      { metric: '24/7', label: 'Monitoring' },
    ],
    related: ['samana', 'enec', 'liquid-telecom'],
    accent: 'blue',
  },
  nbf: {
    name: 'National Bank of Fujairah',
    tagline: 'Progressive UAE Bank',
    location: 'UAE',
    category: 'Banking & Financial Services',
    duration: '2-Year Partnership',
    image: '/case-nbf.jpg',
    headline: '300',
    headlineLabel: 'percent mobile adoption growth',
    challenge:
      'NBF needed to modernise its digital banking to compete with larger UAE banks. Its mobile and web platforms were dated, lacked personalisation, and saw poor adoption among younger customers.',
    challengeBullets: [
      'Outdated mobile and web banking experiences',
      'No personalisation or product recommendation engine',
      'Low adoption among younger demographics',
      'Slow, manual account opening',
    ],
    approach:
      'Aptiva built a modern Digital Banking Platform — responsive web and native mobile, Salesforce CRM for personalised journeys, and AI-powered product recommendations with digital onboarding and instant payments.',
    architecture: [
      { title: 'Digital experience layer', desc: 'Responsive web and native mobile apps with a unified design system.' },
      { title: 'Personalisation engine', desc: 'Salesforce CRM driving tailored journeys and AI-powered product recommendations.' },
      { title: 'Frictionless onboarding', desc: 'Digital account opening reducing time-to-account from days to minutes.' },
      { title: 'Instant payments', desc: 'Real-time payment and wealth-management capabilities built into the app.' },
    ],
    engagement:
      'A two-year programme pairing Aptiva’s digital and AI specialists with NBF’s product team, shipping iteratively and measuring adoption and cross-sell at every release.',
    solution: [
      'Digital Banking Platform with mobile and web apps.',
      'Salesforce CRM integration for personalised journeys.',
      'AI-powered product recommendations.',
      'Digital onboarding and instant payments.',
    ],
    results: [
      '300% increase in mobile banking adoption',
      'Account opening reduced from days to minutes',
      '45% increase in cross-sell through AI recommendations',
      '4.8-star app store rating post-launch',
    ],
    quote: {
      text: 'Aptiva delivered a digital experience that finally competes with the biggest banks in the market — and our adoption numbers prove it.',
      author: 'Head of Digital Banking',
      role: 'National Bank of Fujairah',
    },
    technologies: ['Salesforce', 'Digital Experience', 'AI / ML', 'Mobile'],
    impact: [
      { metric: '300%', label: 'Adoption Growth', to: 300, suffix: '%' },
      { metric: '4.8★', label: 'App Rating' },
      { metric: '45%', label: 'Cross-Sell Lift', to: 45, suffix: '%' },
      { metric: 'Minutes', label: 'Onboarding' },
    ],
    related: ['daman-health', 'oab', 'damac'],
    accent: 'red',
  },
  'uae-mof': {
    name: 'UAE Ministry of Finance',
    tagline: 'Federal Finance Ministry',
    location: 'UAE',
    category: 'Government & Public Sector',
    duration: '2-Year Partnership',
    image: '/case-uae-mof.jpg',
    headline: '5',
    headlineLabel: 'million documents digitised',
    challenge:
      'The UAE Ministry of Finance managed millions of financial documents — budgets, procurement, audit and compliance filings — across departments on paper-based processes that created delays, errors and compliance risk at the federal level.',
    challengeBullets: [
      'Millions of paper-based financial documents across departments',
      'Slow retrieval delaying budget, audit and procurement work',
      'Compliance risk against federal records-retention policy',
      'No automated classification or audit trail',
    ],
    approach:
      'Aptiva implemented OpenText Documentum as the enterprise content platform, with intelligent capture for automated classification and a full records-management system with retention policies and audit trails.',
    architecture: [
      { title: 'Content platform', desc: 'OpenText Documentum as the federal source of truth for financial documents.' },
      { title: 'Intelligent capture', desc: 'AI classification of incoming documents, eliminating manual sorting.' },
      { title: 'Records management', desc: 'Policy-driven retention and disposition meeting federal requirements.' },
      { title: 'Audit & compliance', desc: 'Full audit trails and compliance reporting across every document.' },
    ],
    engagement:
      'A two-year federal programme delivered with strict governance and change management, sequenced department by department to minimise disruption to finance operations.',
    solution: [
      'OpenText Documentum ECM platform.',
      'Intelligent capture for automated classification.',
      'Records management with retention policies.',
      'Full audit trail and compliance reporting.',
    ],
    results: [
      '5M+ documents digitised and classified automatically',
      'Document retrieval reduced from days to seconds',
      '100% compliance with federal records-retention policies',
      'Zero lost documents since system deployment',
    ],
    quote: {
      text: 'Aptiva took us fully paperless without compromising compliance. Retrieval that took days now takes seconds, and our audit posture has never been stronger.',
      author: 'Director of Information Management',
      role: 'UAE Ministry of Finance',
    },
    technologies: ['OpenText Documentum', 'Intelligent Capture', 'InfoArchive', 'Records Management'],
    impact: [
      { metric: '5M+', label: 'Documents', to: 5, suffix: 'M+' },
      { metric: 'Seconds', label: 'Retrieval' },
      { metric: '100%', label: 'Compliance', to: 100, suffix: '%' },
      { metric: 'Zero', label: 'Lost Docs' },
    ],
    related: ['dubai-economy', 'fab', 'im-bank'],
    accent: 'red',
  },
  damac: {
    name: 'DAMAC Properties',
    tagline: 'Luxury Property Developer',
    location: 'UAE',
    category: 'Real Estate & Construction',
    duration: '2-Year Partnership',
    image: '/case-damac.jpg',
    headline: '100',
    headlineLabel: 'thousand unified customer profiles',
    challenge:
      'DAMAC, one of the Middle East’s largest luxury developers, needed to unify customer data across sales, marketing and property management. Siloed systems prevented a holistic view of the customer journey and held back personalised, high-value engagement.',
    challengeBullets: [
      'Customer data siloed across sales, marketing and operations',
      'No single, 360-degree view of buyers and tenants',
      'Manual, untargeted marketing with weak ROI',
      'High volume of routine customer inquiries handled manually',
    ],
    approach:
      'Aptiva implemented Salesforce CRM with custom Lightning components for property sales, Marketing Cloud for automated campaigns, and an Experience Cloud self-service portal — unifying the customer across the full lifecycle.',
    architecture: [
      { title: 'Unified CRM', desc: 'Salesforce with custom Lightning components for property sales and lifecycle management.' },
      { title: 'Marketing automation', desc: 'Marketing Cloud for segmented, automated campaigns with measurable ROI.' },
      { title: 'Self-service portal', desc: 'Experience Cloud handling payments, service requests and inquiries.' },
      { title: 'Lead intelligence', desc: 'Lead scoring and opportunity management compressing the sales cycle.' },
    ],
    engagement:
      'A two-year CRM and CX programme delivered by Aptiva’s Salesforce practice, rolled out across business units with adoption and ROI tracked at each phase.',
    solution: [
      'Salesforce CRM with custom Lightning components.',
      'Marketing Cloud for automated, segmented campaigns.',
      'Experience Cloud customer self-service portal.',
      'Lead scoring and opportunity management.',
    ],
    results: [
      '100,000+ unified customer profiles across buyers and tenants',
      '60% improvement in campaign ROI through segmentation',
      '70% of inquiries resolved via self-service',
      '30% shorter sales cycle through lead-scoring automation',
    ],
    quote: {
      text: 'For the first time we have one view of every customer. Marketing is sharper, sales is faster, and service largely runs itself.',
      author: 'Chief Marketing & Sales Office',
      role: 'DAMAC Properties',
    },
    technologies: ['Salesforce', 'Marketing Cloud', 'Experience Cloud', 'AI / ML'],
    impact: [
      { metric: '100K+', label: 'Profiles', to: 100, suffix: 'K+' },
      { metric: '60%', label: 'ROI Improvement', to: 60, suffix: '%' },
      { metric: '70%', label: 'Self-Service', to: 70, suffix: '%' },
      { metric: '30%', label: 'Faster Sales', to: 30, suffix: '%' },
    ],
    related: ['aldar', 'nbf', 'samana'],
    accent: 'blue',
  },
  samana: {
    name: 'SAMANA Developers',
    tagline: 'Innovative Developer',
    location: 'UAE',
    category: 'Real Estate & Construction',
    duration: 'Ongoing Managed Services',
    image: '/case-samana.jpg',
    headline: '99.95',
    headlineLabel: 'percent platform uptime',
    challenge:
      'SAMANA Developers needed enterprise-grade IT infrastructure and support but lacked the internal team to run complex systems. They needed a partner to deliver infrastructure, applications and ongoing support as a fully managed service.',
    challengeBullets: [
      'No internal team to run enterprise-grade infrastructure',
      'Need for proactive, not reactive, IT operations',
      'Cost pressure versus building an in-house function',
      'Requirement for full-stack observability and fast incident response',
    ],
    approach:
      'Aptiva delivered end-to-end managed services — AWS cloud with auto-scaling, Datadog full-stack observability, a 24/7 L1–L3 support desk, and proactive maintenance with quarterly optimisation reviews.',
    architecture: [
      { title: 'Cloud foundation', desc: 'AWS infrastructure with auto-scaling sized to actual demand.' },
      { title: 'Full-stack observability', desc: 'Datadog telemetry across infrastructure, applications and services.' },
      { title: '24/7 service desk', desc: 'L1–L3 support with sub-5-minute incident response.' },
      { title: 'Continuous optimisation', desc: 'Quarterly health checks driving cost and performance improvement.' },
    ],
    engagement:
      'An ongoing managed-services relationship operating as SAMANA’s outsourced IT function — accountable for uptime, cost and continuous improvement under clear SLAs.',
    solution: [
      'AWS cloud with auto-scaling.',
      'Datadog full-stack observability.',
      '24/7 L1–L3 support desk.',
      'Quarterly optimization reviews.',
    ],
    results: [
      '99.95% uptime through proactive monitoring',
      '60% lower IT cost versus an in-house team',
      'Sub-5-minute incident response',
      'Continuous improvement via quarterly reviews',
    ],
    quote: {
      text: 'Aptiva is, in effect, our IT department — proactive, accountable and far more cost-effective than building it ourselves.',
      author: 'Managing Director',
      role: 'SAMANA Developers',
    },
    technologies: ['AWS', 'Datadog', 'Managed Services', 'SRE'],
    impact: [
      { metric: '99.95%', label: 'Uptime', to: 99.95, suffix: '%', decimals: 2 },
      { metric: '60%', label: 'Cost Savings', to: 60, suffix: '%' },
      { metric: '<5min', label: 'Response' },
      { metric: '24/7', label: 'Support' },
    ],
    related: ['etihad-rail', 'aldar', 'liquid-telecom'],
    accent: 'blue',
  },
  oab: {
    name: 'Oman Arab Bank',
    tagline: 'Leading Private Bank',
    location: 'Oman',
    category: 'Banking & Financial Services',
    duration: '2-Year Partnership',
    image: '/case-oab.jpg',
    headline: '400',
    headlineLabel: 'percent mobile transaction growth',
    challenge:
      'Oman Arab Bank’s legacy core banking limited innovation — new products took months to launch, fintech integration was impossible, and the mobile experience was dated.',
    challengeBullets: [
      'Legacy core banking blocking product innovation',
      'No ability to integrate with fintech partners',
      'Outdated mobile and digital experience',
      'Months-long product launch cycles',
    ],
    approach:
      'Aptiva implemented FinexCore as a modern core banking platform, built a new digital banking layer, and created an Open Banking API marketplace for fintech partnerships.',
    architecture: [
      { title: 'Modern core', desc: 'FinexCore enabling real-time transactions and rapid product configuration.' },
      { title: 'Digital banking layer', desc: 'New web and mobile apps on top of the modern core.' },
      { title: 'Open Banking APIs', desc: 'A standards-based API marketplace enabling fintech partnerships.' },
      { title: 'Real-time processing', desc: 'Straight-through processing for transactions and onboarding.' },
    ],
    engagement:
      'A two-year core-modernisation programme delivered with rigorous migration governance, replacing the heart of the bank without disrupting service.',
    solution: [
      'FinexCore modern core banking platform.',
      'Digital banking web and mobile apps.',
      'Open Banking API marketplace.',
      'Real-time transaction processing.',
    ],
    results: [
      'Real-time core banking transactions',
      'Product launch time reduced from 6 months to 2 weeks',
      '15+ fintech API partnerships enabled',
      '400% increase in mobile transaction volume',
    ],
    quote: {
      text: 'Aptiva modernised the core of our bank and opened us up to the fintech ecosystem. We now launch in weeks what used to take half a year.',
      author: 'Chief Operating Office',
      role: 'Oman Arab Bank',
    },
    technologies: ['FinexCore', 'Digital Banking', 'Open Banking APIs', 'Cloud'],
    impact: [
      { metric: 'Real-Time', label: 'Transactions' },
      { metric: '2 Weeks', label: 'Product Launch' },
      { metric: '15+', label: 'Fintech Partners', to: 15, suffix: '+' },
      { metric: '400%', label: 'Mobile Growth', to: 400, suffix: '%' },
    ],
    related: ['nbf', 'mashreq-bank', 'im-bank'],
    accent: 'red',
  },
  'im-bank': {
    name: 'I&M Bank',
    tagline: 'East African Banking Group',
    location: 'Kenya / East Africa',
    category: 'Banking & Financial Services',
    duration: '2-Year Partnership',
    image: '/case-im-bank.jpg',
    headline: '4',
    headlineLabel: 'countries unified on one platform',
    challenge:
      'I&M Bank, operating across Kenya, Tanzania, Rwanda and Uganda, needed to standardise document management and automate compliance across multiple regulatory environments — without forcing a single rigid model onto four different jurisdictions.',
    challengeBullets: [
      'Inconsistent document management across four countries',
      'Four distinct regulatory regimes to satisfy',
      'Slow, manual regulatory reporting and audit preparation',
      'No secure cross-border document sharing',
    ],
    approach:
      'Aptiva deployed OpenText Documentum as a unified ECM across all subsidiaries, with UiPath RPA for regulatory reporting and compliance workflows tailored to each country’s requirements.',
    architecture: [
      { title: 'Unified ECM', desc: 'OpenText Documentum across four subsidiaries with localised configuration.' },
      { title: 'Compliance automation', desc: 'UiPath RPA automating regulatory reporting per jurisdiction.' },
      { title: 'Localised workflows', desc: 'Country-specific compliance workflows on a shared platform.' },
      { title: 'Cross-border sharing', desc: 'Secure document sharing with full audit trails between subsidiaries.' },
    ],
    engagement:
      'A two-year multi-country programme coordinated across four regulators, balancing a shared regional platform with the local control each market demanded.',
    solution: [
      'OpenText Documentum across 4 subsidiaries.',
      'UiPath RPA for regulatory reporting.',
      'Country-specific compliance workflows.',
      'Secure cross-border document sharing.',
    ],
    results: [
      'Unified ECM across 4 countries with localised compliance',
      '75% reduction in regulatory reporting time',
      'Audit preparation reduced from weeks to days',
      'Cross-border document sharing with full audit trails',
    ],
    quote: {
      text: 'Aptiva gave us one platform across four very different regulatory environments. Reporting is faster, audits are easier, and our subsidiaries finally speak the same language.',
      author: 'Group Head of Operations',
      role: 'I&M Bank',
    },
    technologies: ['OpenText Documentum', 'UiPath', 'Compliance Automation', 'RPA'],
    impact: [
      { metric: '4', label: 'Countries', to: 4 },
      { metric: '75%', label: 'Faster Reporting', to: 75, suffix: '%' },
      { metric: 'Days', label: 'Audit Prep' },
      { metric: 'Unified', label: 'ECM' },
    ],
    related: ['fab', 'rak-bank', 'liquid-telecom'],
    accent: 'red',
  },
  'liquid-telecom': {
    name: 'Liquid Telecom',
    tagline: 'Pan-African Network Provider',
    location: 'Africa',
    category: 'Telecommunications',
    duration: '2-Year Partnership',
    image: '/case-liquid.jpg',
    headline: '50',
    headlineLabel: 'thousand network assets managed',
    challenge:
      'Liquid Telecom operates the largest independent fibre network in Africa — 100,000km+ across 20+ countries. Managing operations at that scale demanded a unified platform with predictive, not just reactive, capabilities.',
    challengeBullets: [
      'Operations spread across 20+ countries and 50,000+ assets',
      'Reactive maintenance driving avoidable outages',
      'No unified ITSM or single operational view',
      'High mean-time-to-repair across a vast network',
    ],
    approach:
      'Aptiva implemented ServiceNow for IT service management, Datadog for infrastructure monitoring, and built AIOps capabilities for predictive maintenance — surfacing network issues before they reached customers.',
    architecture: [
      { title: 'Unified ITSM', desc: 'ServiceNow managing 50,000+ network assets across the continent.' },
      { title: 'Infrastructure monitoring', desc: 'Datadog telemetry across the pan-African estate.' },
      { title: 'Predictive AIOps', desc: 'Machine-learning models flagging failures before they cause outages.' },
      { title: 'Operational visibility', desc: 'Real-time, single-pane visibility across 20+ countries.' },
    ],
    engagement:
      'A two-year programme delivered across a complex multi-country footprint, standardising operations while respecting the realities of each market’s infrastructure.',
    solution: [
      'ServiceNow ITSM for 50,000+ assets.',
      'Datadog infrastructure monitoring.',
      'AIOps predictive maintenance.',
      'Pan-African operations visibility.',
    ],
    results: [
      '50,000+ network assets under unified management',
      '40% reduction in network outages via predictive maintenance',
      '60% lower mean-time-to-repair (MTTR)',
      'Real-time visibility across 20+ African countries',
    ],
    quote: {
      text: 'Aptiva moved us from firefighting to foresight. Predictive AIOps means we fix issues before customers ever feel them.',
      author: 'Head of Network Operations',
      role: 'Liquid Telecom',
    },
    technologies: ['ServiceNow', 'Datadog', 'AIOps', 'ML'],
    impact: [
      { metric: '50K+', label: 'Assets', to: 50, suffix: 'K+' },
      { metric: '40%', label: 'Fewer Outages', to: 40, suffix: '%' },
      { metric: '60%', label: 'Lower MTTR', to: 60, suffix: '%' },
      { metric: '20+', label: 'Countries', to: 20, suffix: '+' },
    ],
    related: ['etisalat', 'samana', 'im-bank'],
    accent: 'blue',
  },
}

/* ────────────── PAGE ────────────── */

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const cs = slug ? allCaseStudies[slug] : null

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [slug])

  if (!cs) {
    return (
      <section className="surface-ink-raised relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <Aurora />
        <Grain />
        <div className="relative z-10 text-center">
          <span className="eyebrow-red">404</span>
          <h2 className="display-3 mt-5 text-white">Case study not found</h2>
          <p className="lead mt-5 text-white/60">The engagement you’re looking for isn’t here.</p>
          <a href="#/case-studies" className="btn-primary mt-9 inline-flex"><span>All case studies</span><IconArrowRight className="relative z-10 h-4 w-4" /></a>
        </div>
      </section>
    )
  }

  const accent = cs.accent
  const isBlue = accent === 'blue'
  const gradText = isBlue ? 'text-gradient-blue' : 'text-gradient-brand'
  const gradBg = isBlue ? 'bg-grad-blue' : 'bg-grad-brand'

  return (
    <div>
      <PageHeader
        label={cs.category}
        title={cs.name}
        subtitle={`${cs.tagline} · ${cs.location} · ${cs.duration}`}
        bgImage={cs.image}
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Case Studies', href: '#/case-studies' }, { label: cs.name }]}
        stats={cs.impact.map((i) => ({ value: i.metric, label: i.label }))}
      />

      {/* HEADLINE METRIC + CHALLENGE (dark) */}
      <section className="surface-ink-flat relative overflow-hidden">
        <div className="container-xl section-y">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="card-ink relative overflow-hidden p-9">
                <KineticBackdrop variant="rings" color={accent} opacity={0.35} />
                <div className="relative z-10">
                  <span className={`font-display text-[clamp(56px,8vw,96px)] font-semibold leading-none ${gradText}`}>
                    {cs.headline}
                  </span>
                  <p className="mt-4 text-[14px] uppercase tracking-[0.12em] text-white/55">{cs.headlineLabel}</p>
                  <div className={`mt-7 h-px w-16 ${gradBg}`} />
                  <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">{cs.duration}</p>
                </div>
              </div>
            </Reveal>

            <Reveal stagger=".ch-item" className="lg:col-span-8">
              <span className={`ch-item ${isBlue ? 'eyebrow-blue' : 'eyebrow-red'}`}>The challenge</span>
              <h2 className="ch-item display-3 mt-5 max-w-3xl text-white text-balance">Where the partnership began.</h2>
              <p className="ch-item lead mt-7 max-w-3xl text-white/65">{cs.challenge}</p>
              <ul className="ch-item mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cs.challengeBullets.map((b) => (
                  <li key={b} className="flex gap-3 border border-white/10 bg-white/[0.03] p-4 text-[13.5px] leading-relaxed text-white/70">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isBlue ? 'bg-brand-blue' : 'bg-brand-red'}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* APPROACH / ARCHITECTURE (light) */}
      <section className="surface-paper relative overflow-hidden">
        <GridBackdrop light />
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            theme="light"
            eyebrow="The approach"
            title={<>An architecture built to <span className={gradText}>de-risk and scale.</span></>}
            intro={cs.approach}
          />
          <Reveal stagger=".arch-row" className="mt-14 border-t border-ink-900/10">
            {cs.architecture.map((layer, i) => (
              <div key={layer.title} className="arch-row group grid grid-cols-1 gap-4 border-b border-ink-900/10 py-7 md:grid-cols-12 md:items-baseline">
                <div className="flex items-center gap-4 md:col-span-4">
                  <span className="font-display text-3xl font-semibold text-ink-900/20 transition-colors group-hover:text-brand-red">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-lg font-semibold text-ink-900">{layer.title}</h3>
                </div>
                <p className="text-[14.5px] leading-relaxed text-ink-900/60 md:col-span-8">{layer.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ENGAGEMENT MODEL (dark) */}
      <section className="surface-ink-raised relative overflow-hidden">
        <Aurora className="opacity-60" />
        <Grain />
        <div className="container-xl section-y relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <span className={isBlue ? 'eyebrow-blue' : 'eyebrow-red'}>The engagement</span>
              <h2 className="display-3 mt-5 text-white text-balance">How we worked together.</h2>
            </Reveal>
            <Reveal stagger=".eng-item" className="lg:col-span-7">
              <p className="eng-item lead text-white/65">{cs.engagement}</p>
              <div className="eng-item mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: IconRocket, label: 'Land & expand', sub: 'Prove value, then scale' },
                  { icon: IconBrain, label: 'Agentic AI first', sub: 'Production, not slideware' },
                  { icon: IconShield, label: 'Audited rigor', sub: 'Compliance by design' },
                ].map((e) => {
                  const Icon = e.icon
                  return (
                    <div key={e.label} className="card-ink group flex flex-col p-6">
                      <span className={`icon-tile mb-4 h-11 w-11 ${isBlue ? 'icon-tile-blue' : ''}`}><Icon className="h-5 w-5 text-white/85" /></span>
                      <h3 className="font-display text-[15px] font-semibold text-white">{e.label}</h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/55">{e.sub}</p>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SOLUTION DELIVERED (light) */}
      <section className="surface-paper-warm relative overflow-hidden">
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            theme="light"
            eyebrow="Solution delivered"
            title={<>Everything we <span className={gradText}>shipped to production.</span></>}
            intro="The full scope of the engagement — each component delivered, integrated and operated, not just specified."
          />
          <Reveal stagger=".sol-item" className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
            {cs.solution.map((item, i) => (
              <div key={i} className="sol-item group flex gap-4 border border-ink-900/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift-light">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center font-mono text-[12px] font-bold text-white ${gradBg}`}>{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[14px] leading-relaxed text-ink-900/70">{item}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* QUANTIFIED RESULTS (dark) */}
      <section className="surface-ink-flat relative overflow-hidden">
        <KineticBackdrop variant="mesh" color={accent} opacity={0.3} />
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            eyebrow="Quantified results"
            title={<>The outcomes that <span className={gradText}>earned the next mandate.</span></>}
            intro="Measured, not estimated — the impact this engagement delivered to the business."
          />

          <Reveal stagger=".impact-item" className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/[0.04] lg:grid-cols-4">
            {cs.impact.map((s) => (
              <div key={s.label} className="impact-item group bg-ink-900/70 p-7 transition-colors duration-500 hover:bg-white/[0.03]">
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                  {s.to != null ? <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} /> : s.metric}
                </div>
                <div className="mt-3 text-[13px] leading-snug text-white/55">{s.label}</div>
                <div className={`mt-4 h-px w-9 transition-all duration-500 group-hover:w-16 ${gradBg}`} />
              </div>
            ))}
          </Reveal>

          <Reveal stagger=".res-item" className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2">
            {cs.results.map((r, i) => (
              <div key={i} className="res-item flex items-start gap-3 border border-white/10 bg-white/[0.03] p-4">
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center ${isBlue ? 'bg-brand-blue/15 text-brand-blue' : 'bg-brand-red/15 text-brand-red'}`}>
                  <IconCheckCircle className="h-3.5 w-3.5" />
                </span>
                <p className="text-[14px] leading-relaxed text-white/75">{r}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE (light) */}
      <section className="surface-paper relative overflow-hidden">
        <div className="container-xl section-y relative z-10">
          <Reveal stagger=".q-item" className="mx-auto max-w-4xl text-center">
            <span className={`q-item inline-flex h-12 w-12 items-center justify-center ${isBlue ? 'icon-tile-blue-light' : 'icon-tile-light'}`}>
              <IconSparkle className={`h-5 w-5 ${isBlue ? 'text-brand-blue' : 'text-brand-red'}`} />
            </span>
            <blockquote className="q-item mt-8 font-display text-[clamp(22px,3vw,38px)] font-medium leading-[1.25] tracking-[-0.01em] text-ink-900 text-balance">
              “{cs.quote.text}”
            </blockquote>
            <div className="q-item mt-8">
              <p className="font-display text-[15px] font-semibold text-ink-900">{cs.quote.author}</p>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-900/50">{cs.quote.role}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TECHNOLOGIES (dark) */}
      <section className="surface-ink-raised relative overflow-hidden">
        <GridBackdrop />
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            eyebrow="Technologies used"
            title={<>The platforms <span className={gradText}>behind the outcomes.</span></>}
            intro="A best-of-breed stack, integrated and operated by specialists who deploy it every day."
          />
          <Reveal stagger=".tech-item" className="mt-12 flex flex-wrap gap-3">
            {cs.technologies.map((tech) => (
              <span key={tech} className="tech-item group inline-flex items-center gap-2.5 border border-white/12 bg-white/[0.03] px-4 py-2.5 text-[13px] text-white/70 transition-all hover:border-white/30 hover:bg-white/[0.06] hover:text-white">
                <IconLayers className="h-3.5 w-3.5 text-white/40 transition-colors group-hover:text-brand-red" />
                {tech}
              </span>
            ))}
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <a href="#/services" className="btn-dark group !bg-white/[0.04] !text-white border border-white/15 hover:!bg-white/10">Explore our capabilities<IconArrowRight className="h-4 w-4" /></a>
            <a href="#/solutions" className="inline-flex items-center gap-2 px-2 py-4 text-[12.5px] font-bold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white">View proprietary platforms<IconArrowUpRight className="h-4 w-4 text-brand-red" /></a>
          </Reveal>
        </div>
      </section>

      {/* RELATED CASE STUDIES (light) */}
      <RelatedCases related={cs.related} accent={accent} />

      <CTASection
        eyebrow="Your outcome, next"
        title={<>Want results like <span className="text-gradient-brand">{cs.name}?</span></>}
        body="Start with one focused proof-of-value. We’ll prove the outcome, then scale it across your enterprise — the same way we did here."
        primary={{ label: 'Talk to our team', href: '#/contact' }}
        secondary={{ label: 'All case studies', href: '#/case-studies' }}
      />
    </div>
  )
}

/* ────────────── RELATED ────────────── */

function RelatedCases({ related, accent }: { related: string[]; accent: 'red' | 'blue' }) {
  const items = related
    .map((s) => ({ slug: s, cs: allCaseStudies[s] }))
    .filter((x): x is { slug: string; cs: CaseStudy } => Boolean(x.cs))

  if (items.length === 0) return null

  return (
    <section className="surface-paper-warm relative overflow-hidden">
      <div className="container-xl section-y relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            theme="light"
            eyebrow="Related case studies"
            title={<>More proof, <span className={accent === 'blue' ? 'text-gradient-blue' : 'text-gradient-brand'}>more outcomes.</span></>}
            className="md:max-w-2xl"
          />
          <Reveal>
            <a href="#/case-studies" className="btn-dark group shrink-0">All case studies<IconArrowRight className="h-4 w-4" /></a>
          </Reveal>
        </div>

        <Reveal stagger=".rel-card" className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map(({ slug, cs }) => (
            <TiltCard
              key={slug}
              href={`#/case-studies/${slug}`}
              glow={cs.accent}
              className="rel-card card-paper flex flex-col overflow-hidden"
            >
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${cs.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/10" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">{cs.category}</span>
                  <h3 className="mt-1 font-display text-[17px] font-semibold text-white">{cs.name}</h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-end gap-2">
                  <span className={`font-display text-3xl font-semibold leading-none ${cs.accent === 'blue' ? 'text-gradient-blue' : 'text-gradient-brand'}`}>{cs.headline}</span>
                  <span className="pb-0.5 text-[11px] uppercase tracking-[0.08em] text-ink-900/55">{cs.headlineLabel}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-red transition-all group-hover:gap-3">
                  Read story<IconArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
