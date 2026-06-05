import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/motion/SectionHeading'
import { Aurora, Grain, GridBackdrop, BrandRule } from '../components/motion/Atmosphere'
import KineticBackdrop from '../components/kit/KineticBackdrop'
import TiltCard from '../components/kit/TiltCard'
import Counter from '../components/kit/Counter'
import CTASection from '../components/kit/CTASection'
import {
  IconDocument, IconBrain, IconCloud, IconChart, IconHeadset, IconMonitor,
  IconFileCheck, IconLightbulb, IconSettings, IconSmartphone, IconUsers, IconCheckCircle,
  IconArrowRight, IconArrowUpRight, IconCheckCircle as IconCheck, IconSparkle,
} from '../components/Icons'

/* ─────────────────────────── TYPES ─────────────────────────── */

type Accent = 'red' | 'blue'

type Kpi = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }
type Deliverable = { title: string; desc: string }
type Step = { no: string; title: string; desc: string }
type Faq = { q: string; a: string }
type Related = { title: string; slug: string }

type Service = {
  label: string
  title: string
  subtitle: string
  accent: Accent
  icon: React.FC<{ className?: string }>
  overview: string
  overviewPoints: string[]
  deliverables: Deliverable[]
  kpis: Kpi[]
  process: Step[]
  industries: string[]
  partners: string[]
  faqs: Faq[]
  caseStudy: { client: string; result: string }
  related: Related[]
}

/* ─────────────────────────── DATA (slug keys PRESERVED) ─────────────────────────── */

const servicesData: Record<string, Service> = {
  'content-intelligence': {
    label: 'CORE PILLAR',
    title: 'Content & Document Intelligence',
    subtitle: 'Enterprise content platforms, intelligent document processing, digital archival, governance and records lifecycle management.',
    accent: 'red',
    icon: IconDocument,
    overview:
      'Most enterprises sit on millions of documents they cannot search, govern or act on. Our Content & Document Intelligence practice turns that liability into an asset — capturing, classifying, routing, governing and ultimately retiring content across its entire lifecycle, with AI doing the heavy lifting at every stage. We modernize content estates on platforms like OpenText and Documentum, layer in AI-driven intelligent document processing, and wrap the whole estate in compliance-ready governance so nothing falls outside policy.',
    overviewPoints: [
      'Process millions of documents monthly at up to 99.5% classification accuracy.',
      'Reduce manual data entry by as much as 90% with AI-driven capture.',
      'Compress multi-day business processes into minutes through straight-through processing.',
      'Enforce retention, legal hold and audit trails automatically across every repository.',
    ],
    deliverables: [
      { title: 'Enterprise Content Platforms', desc: 'Centralized, metadata-rich repositories on OpenText Content Suite, Documentum and SharePoint with versioning, workflow and access governance.' },
      { title: 'Intelligent Document Processing', desc: 'AI-powered OCR, classification, extraction and validation across structured, semi-structured and unstructured documents in 80+ languages.' },
      { title: 'Digital Archival & Preservation', desc: 'WORM storage, long-term preservation and compliance-ready retention with defensible disposition for regulated industries.' },
      { title: 'Records Lifecycle Management', desc: 'Automated retention schedules, legal hold orchestration and disposition from creation through to defensible destruction.' },
      { title: 'Workflow Automation', desc: 'Business-process automation and integration that route documents straight through approval, review and exception handling.' },
      { title: 'eDiscovery & Compliance', desc: 'Search, legal hold and audit capabilities aligned to GDPR, UAE PDPL, KSA PDPL and industry-specific mandates.' },
    ],
    kpis: [
      { value: 99.5, decimals: 1, suffix: '%', label: 'Classification accuracy' },
      { value: 90, suffix: '%', label: 'Less manual data entry' },
      { value: 3.2, decimals: 1, suffix: 'M', label: 'Documents processed / month' },
      { value: 60, suffix: '%', label: 'Lower content op cost' },
    ],
    process: [
      { no: '01', title: 'Content Audit', desc: 'Map every repository, document type and retention obligation across the estate to expose risk and opportunity.' },
      { no: '02', title: 'Architecture & Taxonomy', desc: 'Design the platform, metadata model, taxonomy and governance framework aligned to regulation.' },
      { no: '03', title: 'Capture & Migrate', desc: 'Stand up AI capture, migrate legacy content and validate classification accuracy against gold sets.' },
      { no: '04', title: 'Govern & Optimize', desc: 'Operate retention, monitor accuracy, retrain models and continuously tune throughput.' },
    ],
    industries: ['Banking & Financial Services', 'Government & Public Sector', 'Telecommunications', 'Insurance & Healthcare'],
    partners: ['OpenText', 'Oracle', 'Tungsten Automation', 'Ascertia', 'Microsoft SharePoint'],
    faqs: [
      { q: 'What document types can your IDP handle?', a: 'Structured, semi-structured and unstructured documents — invoices, contracts, forms, emails and handwritten documents — across 80+ languages including Arabic.' },
      { q: 'How do you ensure regional compliance?', a: 'We design governance frameworks aligned with GDPR, UAE Data Protection Law, KSA PDPL and industry-specific regulations, with automated policy enforcement and full audit trails.' },
      { q: 'What is a typical implementation timeline?', a: 'Standard ECM rollouts run 3–6 months; intelligent document processing typically delivers first measurable results within 8–12 weeks under our agile methodology.' },
      { q: 'Do you support hybrid and sovereign deployments?', a: 'Yes — on-premises, private cloud, public cloud and hybrid, with unified governance and data-residency controls for sovereign requirements.' },
    ],
    caseStudy: { client: 'Etisalat (e&)', result: 'Enterprise content platform processing 2M+ documents monthly at 99.5% classification accuracy.' },
    related: [
      { title: 'GenAI, Agentic AI & Automation', slug: 'ai-automation' },
      { title: 'Contract Lifecycle Management', slug: 'clm' },
      { title: 'Data & Analytics', slug: 'data-analytics' },
    ],
  },

  'ai-automation': {
    label: 'CORE PILLAR',
    title: 'GenAI, Agentic AI & Automation',
    subtitle: 'Autonomous AI agents, custom & fine-tuned LLMs, RAG infrastructure, conversational AI and enterprise-scale hyperautomation.',
    accent: 'red',
    icon: IconBrain,
    overview:
      'This is the practice at the center of everything we build. We deploy production-grade Agentic AI — autonomous systems that plan, execute and adapt multi-step workflows without human intervention — alongside custom large language models grounded in your own data through Retrieval-Augmented Generation. From agents that resolve customer issues end-to-end, to copilots that draft and reason over documents, to RPA that hyperautomates the long tail of back-office work, we turn generative AI from a demo into durable enterprise capability — with responsible-AI governance, observability and human-in-the-loop controls designed in from the start.',
    overviewPoints: [
      'Autonomous agents that plan, call tools, and self-correct across multi-step processes.',
      'Custom and fine-tuned LLMs for Arabic and English, grounded in enterprise knowledge.',
      'RAG architecture with vector stores and embeddings for accurate, source-cited answers.',
      'Responsible-AI governance: bias detection, explainability, guardrails and audit logging.',
    ],
    deliverables: [
      { title: 'Agentic AI Workflows', desc: 'Self-directed AI agents that orchestrate tools, APIs and systems to complete complex processes — from claims triage to procurement — with human oversight where it matters.' },
      { title: 'Custom & Fine-Tuned LLMs', desc: 'Domain-specific language models trained and fine-tuned on your data for accuracy in Arabic and English, deployed in your environment or sovereign cloud.' },
      { title: 'RAG & AI Infrastructure', desc: 'Retrieval-Augmented Generation with vector databases, embedding pipelines and scalable, observable AI infrastructure that keeps answers grounded and current.' },
      { title: 'Conversational AI', desc: 'Enterprise chatbots, voice assistants and agent-assist trained on domain data for context-aware, multilingual interactions.' },
      { title: 'RPA & Hyperautomation', desc: 'End-to-end automation combining UiPath and Automation Anywhere with AI for intelligent decisioning across the back office.' },
      { title: 'AI Center of Excellence', desc: 'Operating model, MLOps pipelines, governance frameworks and AI-literacy programs that make AI repeatable and safe at scale.' },
      { title: 'MLOps & Model Lifecycle', desc: 'Training, deployment, monitoring and automated retraining with drift detection and A/B evaluation.' },
      { title: 'AI Security & Guardrails', desc: 'Prompt-injection detection, output validation, access control and red-team exercises to keep deployments safe.' },
    ],
    kpis: [
      { value: 5, suffix: 'x', label: 'Productivity gain from agents' },
      { value: 90, suffix: '%', label: 'Lower processing cost' },
      { value: 95, suffix: '%', label: 'Conversational resolution rate' },
      { value: 24, suffix: '/7', label: 'Autonomous operation' },
    ],
    process: [
      { no: '01', title: 'Use-Case Discovery', desc: 'Identify high-value, agent-ready processes and define success metrics, data access and guardrails.' },
      { no: '02', title: 'Pilot & Ground', desc: 'Build a focused agent or RAG pilot grounded in your data, with evaluation harnesses and human-in-the-loop review.' },
      { no: '03', title: 'Productionize', desc: 'Harden infrastructure, integrate systems, add observability and governance, and deploy to production.' },
      { no: '04', title: 'Scale the CoE', desc: 'Stand up an AI Center of Excellence, reusable components and MLOps so new use cases ship faster and safer.' },
    ],
    industries: ['Banking & Financial Services', 'Telecommunications', 'Government & Public Sector', 'Insurance & Healthcare'],
    partners: ['UiPath', 'Automation Anywhere', 'Azure OpenAI', 'AWS Bedrock', 'Databricks', 'LangChain'],
    faqs: [
      { q: 'What makes "agentic" AI different from a chatbot?', a: 'Agents reason and act. They plan multi-step tasks, call tools and APIs, evaluate results and self-correct — completing work rather than just answering questions, with human-in-the-loop checkpoints where risk requires them.' },
      { q: 'How do you ensure AI model security and safety?', a: 'We layer prompt-injection detection, output validation, strict access controls, guardrails and regular red-team exercises, plus comprehensive audit logging of every agent action.' },
      { q: 'Can you integrate with our existing systems?', a: 'Yes — agents and automations integrate with SAP, Oracle, Salesforce and custom systems via APIs, RPA connectors and middleware.' },
      { q: 'What is your approach to AI governance?', a: 'A responsible-AI framework: bias detection, explainability, human-in-the-loop validation, model monitoring and full audit logging — designed for regulated environments.' },
    ],
    caseStudy: { client: 'First Abu Dhabi Bank', result: 'Conversational AI handling 500K+ customer interactions monthly at a 95% resolution rate.' },
    related: [
      { title: 'Content & Document Intelligence', slug: 'content-intelligence' },
      { title: 'Data & Analytics', slug: 'data-analytics' },
      { title: 'Customer Experience (CX)', slug: 'customer-experience' },
    ],
  },

  'cloud-security': {
    label: 'CORE PILLAR',
    title: 'Cloud, Infra & Cybersecurity',
    subtitle: 'Multi-cloud migration, DevSecOps & SRE, zero-trust security architecture, sovereign cloud and continuous VAPT.',
    accent: 'blue',
    icon: IconCloud,
    overview:
      'Regulated enterprises need infrastructure that is resilient, scalable, sovereign and secure by design. Our Cloud, Infrastructure & Cybersecurity practice delivers end-to-end infrastructure transformation — multi-cloud architecture and migration on AWS, Azure and Oracle Cloud, DevSecOps and Site Reliability Engineering for elite delivery, and zero-trust security with continuous vulnerability management. Every environment is architected to meet the stringent compliance and data-sovereignty requirements of banking, government and energy across the Middle East and Africa.',
    overviewPoints: [
      'Multi-cloud and sovereign architectures that honor data-residency requirements.',
      'DevSecOps pipelines that shift security left and ship safely at speed.',
      'Zero-trust identity, micro-segmentation and continuous verification.',
      'SRE practices and resilient design that sustain enterprise-grade availability.',
    ],
    deliverables: [
      { title: 'Multi-Cloud Migration', desc: 'Workload assessment, replatforming and migration across AWS, Azure and OCI with unified governance and zero-downtime cutover.' },
      { title: 'DevOps / DevSecOps / SRE', desc: 'CI/CD pipelines, infrastructure-as-code, automated security testing and reliability engineering with SLOs and error budgets.' },
      { title: 'Zero-Trust Security', desc: 'Identity-centric architecture with conditional access, device trust, micro-segmentation and least-privilege enforcement.' },
      { title: 'Continuous VAPT', desc: 'OWASP-aligned vulnerability assessment, penetration testing and red-team exercises with prioritized remediation roadmaps.' },
      { title: 'Cloud-Native Engineering', desc: 'Containerization, Kubernetes and microservices for portable, scalable, observable workloads.' },
      { title: 'Sovereign Cloud & DR', desc: 'Data-resident sovereign solutions, disaster recovery and business-continuity planning for government and finance.' },
    ],
    kpis: [
      { value: 40, suffix: '%', label: 'Infrastructure cost optimization' },
      { value: 99.99, decimals: 2, suffix: '%', label: 'Target availability' },
      { value: 15, suffix: ' min', label: 'Critical incident response' },
      { value: 200, suffix: '+', label: 'Workloads migrated' },
    ],
    process: [
      { no: '01', title: 'Assess & Plan', desc: 'Discovery of workloads, dependencies, compliance posture and a migration and security roadmap.' },
      { no: '02', title: 'Land Zone & Pilot', desc: 'Build secure landing zones, reference architecture and a pilot migration with guardrails.' },
      { no: '03', title: 'Migrate & Harden', desc: 'Migrate workloads, embed DevSecOps, implement zero-trust and validate with VAPT.' },
      { no: '04', title: 'Operate & Optimize', desc: 'SRE operations, FinOps cost optimization, continuous monitoring and threat response.' },
    ],
    industries: ['Government & Public Sector', 'Banking & Financial Services', 'Energy, Oil & Gas', 'Telecommunications'],
    partners: ['AWS', 'Microsoft Azure', 'Oracle Cloud', 'CrowdStrike', 'Kubernetes', 'Terraform'],
    faqs: [
      { q: 'Which cloud platforms do you support?', a: 'We are certified across AWS, Microsoft Azure and Oracle Cloud Infrastructure, with deep expertise in hybrid, multi-cloud and sovereign architectures.' },
      { q: 'How do you handle cloud cost optimization?', a: 'We embed FinOps practice: automated right-sizing, reserved and spot capacity management, and continuous cost monitoring tied to budgets.' },
      { q: 'What is your incident response capability?', a: 'Our SOC provides 24/7 monitoring with a 15-minute response SLA for critical incidents, backed by threat intelligence and automated containment.' },
      { q: 'Do you support compliance certifications?', a: 'Yes — we help organizations achieve ISO 27001, SOC 2, PCI DSS and regional regulatory compliance with full audit support.' },
    ],
    caseStudy: { client: 'Etisalat (e&)', result: 'Migrated 200+ workloads to multi-cloud with zero downtime and a 35% infrastructure cost reduction.' },
    related: [
      { title: 'GenAI, Agentic AI & Automation', slug: 'ai-automation' },
      { title: 'Managed Services & SRE', slug: 'managed-services' },
      { title: 'Data & Analytics', slug: 'data-analytics' },
    ],
  },

  'data-analytics': {
    label: 'CORE PILLAR',
    title: 'Data & Analytics',
    subtitle: 'Lakehouse engineering, governed BI, machine learning, text analytics and real-time decision intelligence.',
    accent: 'blue',
    icon: IconChart,
    overview:
      'Data is the strategic asset that decides who wins. Our Data & Analytics practice builds the modern data foundation that turns raw signal into decisions — cloud-native lakehouses on Databricks and Snowflake, governed self-service BI on Power BI and Tableau, and machine-learning pipelines that move insight from days to seconds. We pair engineering depth with rigorous governance and quality, so the intelligence your business acts on is trustworthy, current and explainable.',
    overviewPoints: [
      'Lakehouse architecture that unifies engineering, BI and ML on one governed platform.',
      'Self-service analytics with governed access and natural-language querying.',
      'Predictive and real-time models that enable proactive, sub-second decisions.',
      'Data governance, lineage and quality monitoring with automated enforcement.',
    ],
    deliverables: [
      { title: 'Lakehouse & Data Engineering', desc: 'Modern ETL/ELT pipelines, data lakes and lakehouse architectures on Databricks, Snowflake and cloud-native platforms.' },
      { title: 'BI & Visualization', desc: 'Executive dashboards, self-service analytics and mobile-first reporting on Power BI, Tableau and custom platforms.' },
      { title: 'Machine Learning & Predictive', desc: 'Predictive models, recommendation engines and forecasting with automated training and deployment.' },
      { title: 'Text Analytics & NLP', desc: 'Sentiment analysis, entity extraction and classification that unlock insight from unstructured content.' },
      { title: 'Real-Time Decision Intelligence', desc: 'Stream processing with Kafka, Flink and Spark for fraud detection, IoT analytics and operational intelligence.' },
      { title: 'Data Governance & Quality', desc: 'Data catalogs, lineage, quality monitoring, stewardship workflows and master data management.' },
    ],
    kpis: [
      { value: 10, suffix: 'x', label: 'Faster time to insight' },
      { value: 95, suffix: '%', label: 'Data quality confidence' },
      { value: 5, suffix: 'M+', label: 'Data points / day processed' },
      { value: 200, suffix: '+', label: 'Source systems integrated' },
    ],
    process: [
      { no: '01', title: 'Data Strategy', desc: 'Assess sources, use cases and governance needs; define the target lakehouse and analytics roadmap.' },
      { no: '02', title: 'Foundation', desc: 'Build ingestion pipelines, the lakehouse, the semantic layer and the governance framework.' },
      { no: '03', title: 'Insight & Models', desc: 'Deliver dashboards, ML models and real-time analytics tied to decision points.' },
      { no: '04', title: 'Scale & Govern', desc: 'Roll out self-service, monitor quality and drift, and expand use cases across the enterprise.' },
    ],
    industries: ['Banking & Financial Services', 'Government & Public Sector', 'Telecommunications', 'Energy, Oil & Gas'],
    partners: ['Databricks', 'Snowflake', 'Microsoft Power BI', 'Tableau', 'Apache Kafka', 'Spark'],
    faqs: [
      { q: 'How do you handle data privacy?', a: 'Privacy-by-design: anonymization, pseudonymization, fine-grained access controls and compliance with GDPR, PDPL and regional regulations.' },
      { q: 'Can you work with our existing sources?', a: 'Yes — we integrate 200+ sources including SAP, Oracle, Salesforce, SQL/NoSQL databases, APIs and streaming platforms.' },
      { q: 'What is your approach to data governance?', a: 'Comprehensive governance with data catalogs, lineage tracking, quality monitoring and stewardship workflows backed by automated enforcement.' },
      { q: 'Do you support self-service analytics?', a: 'Yes — governed self-service with natural-language querying and automated insight generation for business users.' },
    ],
    caseStudy: { client: 'Dubai Economy & Tourism', result: 'Real-time analytics platform processing 5M+ data points daily for strategic decision-making.' },
    related: [
      { title: 'GenAI, Agentic AI & Automation', slug: 'ai-automation' },
      { title: 'Cloud, Infra & Cybersecurity', slug: 'cloud-security' },
      { title: 'Content & Document Intelligence', slug: 'content-intelligence' },
    ],
  },

  'customer-experience': {
    label: 'CORE PILLAR',
    title: 'Customer Experience (CX)',
    subtitle: 'CCaaS & omnichannel CX, speech analytics, AI agent-assist, digital onboarding and journey personalization.',
    accent: 'red',
    icon: IconHeadset,
    overview:
      'In an experience-driven economy, the journey is the product. Our Customer Experience practice designs and delivers omnichannel engagement that feels effortless — cloud contact centers on Genesys Cloud, real-time speech analytics and AI agent-assist, and digital onboarding that turns acquisition from days into minutes. We weave conversational AI and journey analytics through every touchpoint so service is faster, more personal and measurably better, while operating costs fall.',
    overviewPoints: [
      'Unified voice, chat, email, social and messaging in a single agent desktop.',
      'Real-time speech analytics and AI agent-assist that lift quality and first-call resolution.',
      'Frictionless eKYC and biometric onboarding journeys.',
      'Journey analytics and personalization tied to satisfaction and retention.',
    ],
    deliverables: [
      { title: 'CCaaS & Omnichannel', desc: 'Cloud contact center migration with omnichannel routing, workforce management and quality management on Genesys Cloud, AWS Connect and Twilio.' },
      { title: 'Speech Analytics & Agent-Assist', desc: 'Real-time and post-call analytics with sentiment, keyword spotting, compliance monitoring and AI-driven agent guidance.' },
      { title: 'Digital Onboarding', desc: 'eKYC, document verification, biometric authentication and progressive profiling for seamless acquisition.' },
      { title: 'Conversational IVR & Chatbots', desc: 'Natural-language IVR, chatbots and voice assistants that deflect and resolve without friction.' },
      { title: 'Journey Analytics & Personalization', desc: 'Cross-channel journey mapping and personalization tied to satisfaction and retention KPIs.' },
      { title: 'Workforce Optimization', desc: 'Forecasting, scheduling and performance management that balance experience and efficiency.' },
    ],
    kpis: [
      { value: 40, suffix: '%', label: 'CSAT improvement' },
      { value: 60, suffix: '%', label: 'Faster onboarding' },
      { value: 92, suffix: '%', label: 'First-call resolution' },
      { value: 1, suffix: 'M+', label: 'Interactions / year handled' },
    ],
    process: [
      { no: '01', title: 'Experience Audit', desc: 'Map current journeys, channels and pain points against satisfaction and cost data.' },
      { no: '02', title: 'Design & Pilot', desc: 'Design the target CX, stand up CCaaS and pilot agent-assist and onboarding flows.' },
      { no: '03', title: 'Roll Out', desc: 'Migrate channels, integrate CRM, deploy analytics and train teams.' },
      { no: '04', title: 'Optimize', desc: 'Tune routing, models and journeys continuously against CSAT, FCR and handle time.' },
    ],
    industries: ['Banking & Financial Services', 'Telecommunications', 'Insurance & Healthcare', 'Government & Public Sector'],
    partners: ['Genesys', 'AWS Connect', 'Twilio', 'Salesforce', 'NICE', 'Verint'],
    faqs: [
      { q: 'Which contact center platforms do you support?', a: 'Genesys Cloud, AWS Connect, Twilio Flex, Avaya Experience Platform and NICE CXone, with custom integrations.' },
      { q: 'How do you ensure regulatory compliance?', a: 'Automated compliance monitoring for PCI DSS, call-recording consent, data retention and regional telecom regulations.' },
      { q: 'Can you integrate with our CRM?', a: 'Yes — deep integration with Salesforce, Microsoft Dynamics, SAP C4C and custom CRM for a unified customer view.' },
      { q: 'What languages do you support?', a: '80+ languages including Arabic, English, French and regional dialects, with native-speaking agent support.' },
    ],
    caseStudy: { client: 'Daman Health', result: 'CCaaS platform handling 1M+ interactions annually at 92% first-call resolution.' },
    related: [
      { title: 'GenAI, Agentic AI & Automation', slug: 'ai-automation' },
      { title: 'Digital Experience Platforms', slug: 'digital-experience' },
      { title: 'Data & Analytics', slug: 'data-analytics' },
    ],
  },

  'digital-workplace': {
    label: 'CORE PILLAR',
    title: 'Digital Workplace',
    subtitle: 'Modern intranet & collaboration, employee experience platforms, AI knowledge management and engagement.',
    accent: 'blue',
    icon: IconMonitor,
    overview:
      'The modern workplace demands intelligent platforms that connect employees, knowledge and processes in one digital environment — especially for the distributed workforces common across the Middle East and Africa. Our Digital Workplace practice implements modern intranets, employee experience platforms and AI-powered knowledge management that lift productivity, deepen engagement and make institutional knowledge findable and reusable.',
    overviewPoints: [
      'Personalized, AI-powered intranets integrated with Microsoft 365 and Google Workspace.',
      'Unified employee experience: service delivery, communication and engagement in one place.',
      'AI knowledge discovery, expert identification and automated knowledge capture.',
      'Gamified engagement programs that move adoption and participation metrics.',
    ],
    deliverables: [
      { title: 'Modern Intranet & Collaboration', desc: 'AI-personalized intranets with social collaboration and deep Microsoft 365 and SharePoint integration.' },
      { title: 'Employee Experience Platforms', desc: 'Unified EX on ServiceNow and custom platforms spanning service delivery, onboarding, learning and wellbeing.' },
      { title: 'AI Knowledge Management', desc: 'Automated capture, semantic search, expert identification and knowledge-graph construction.' },
      { title: 'Enterprise Search', desc: 'Unified search and information architecture that make the right content findable across systems.' },
      { title: 'Gamification & Engagement', desc: 'Behavior-driven programs with points, badges, leaderboards and reward integration.' },
      { title: 'Workforce Analytics', desc: 'Adoption, engagement and productivity insights with ROI measurement dashboards.' },
    ],
    kpis: [
      { value: 45, suffix: '%', label: 'Productivity gain' },
      { value: 70, suffix: '%', label: 'Knowledge reuse increase' },
      { value: 30, suffix: '%', label: 'Engagement boost' },
      { value: 10, suffix: 'K+', label: 'Employees connected' },
    ],
    process: [
      { no: '01', title: 'Discovery', desc: 'Assess tools, content, workflows and employee pain points across the digital workplace.' },
      { no: '02', title: 'Design', desc: 'Design information architecture, experience, integrations and the change-management plan.' },
      { no: '03', title: 'Build & Migrate', desc: 'Implement the platform, migrate content and integrate knowledge and HR systems.' },
      { no: '04', title: 'Adopt & Improve', desc: 'Drive adoption with champions and analytics, then iterate on engagement.' },
    ],
    industries: ['Telecommunications', 'Banking & Financial Services', 'Government & Public Sector', 'Energy, Oil & Gas'],
    partners: ['Microsoft 365', 'SharePoint', 'ServiceNow', 'Confluence', 'Slack', 'Teams'],
    faqs: [
      { q: 'Which platforms do you implement?', a: 'Microsoft 365, SharePoint, ServiceNow, Confluence and custom digital-workplace platforms with full integration.' },
      { q: 'How do you handle change management?', a: 'Digital champions, role-based training, adoption analytics and continuous-improvement workshops.' },
      { q: 'Can you integrate with our HR systems?', a: 'Yes — Workday, SAP SuccessFactors, Oracle HCM and custom HR systems for unified employee profiles and workflows.' },
      { q: 'What analytics do you provide?', a: 'Usage patterns, engagement scores, content effectiveness and ROI measurement dashboards.' },
    ],
    caseStudy: { client: 'Etisalat (e&)', result: 'Knowledge platform connecting 10K+ employees with 95% knowledge-discovery accuracy.' },
    related: [
      { title: 'GenAI, Agentic AI & Automation', slug: 'ai-automation' },
      { title: 'Content & Document Intelligence', slug: 'content-intelligence' },
      { title: 'Strategic Resource Partnership', slug: 'resource-partnership' },
    ],
  },

  'clm': {
    label: 'SPECIALIZED PRACTICE',
    title: 'Contract Lifecycle Management',
    subtitle: 'GenAI-powered authoring, intelligent negotiation, automated compliance and obligation monitoring.',
    accent: 'red',
    icon: IconFileCheck,
    overview:
      'Contracts are where enterprise risk and value concentrate. Our GenAI-powered Contract Lifecycle Management practice automates the entire journey — from AI-assisted authoring and intelligent redlining to automated compliance monitoring and obligation extraction. Using advanced NLP, we help legal and procurement teams cut contract cycle times by up to 70%, surface risk before signature, and ensure obligations are tracked and met across thousands of active agreements.',
    overviewPoints: [
      'GenAI authoring and clause recommendation that accelerate drafting and standardize language.',
      'Automated risk scoring and redlining that flag exposure before signature.',
      'Obligation extraction and monitoring so commitments are never missed.',
      'Integration with ERP and procurement for source-to-contract continuity.',
    ],
    deliverables: [
      { title: 'GenAI-Powered Authoring', desc: 'AI-assisted drafting with dynamic clause libraries, templates and language standardization.' },
      { title: 'Intelligent Negotiation & Redlining', desc: 'Automated clause comparison, risk scoring and collaborative redlining that speed agreement.' },
      { title: 'Automated Compliance Monitoring', desc: 'Continuous checks against regulatory requirements and internal policy with alerting.' },
      { title: 'Obligation Extraction & Tracking', desc: 'NLP extraction of obligations, dates and milestones with proactive monitoring.' },
      { title: 'Risk Scoring & Analytics', desc: 'Portfolio-level risk visibility across active contracts and counterparties.' },
      { title: 'ERP & Procurement Integration', desc: 'Seamless integration with enterprise ERP and procurement for end-to-end source-to-pay.' },
    ],
    kpis: [
      { value: 70, suffix: '%', label: 'Faster contract cycles' },
      { value: 100, suffix: '%', label: 'Obligation compliance' },
      { value: 5000, suffix: '+', label: 'Contracts processed / year' },
      { value: 65, suffix: '%', label: 'Cycle-time reduction' },
    ],
    process: [
      { no: '01', title: 'Assess', desc: 'Map contract types, clause libraries, risk policies and current cycle times.' },
      { no: '02', title: 'Configure', desc: 'Stand up the CLM platform, templates, clause AI and approval workflows.' },
      { no: '03', title: 'Migrate & Train', desc: 'Migrate legacy contracts, train extraction models and onboard legal and procurement.' },
      { no: '04', title: 'Monitor', desc: 'Operate compliance and obligation monitoring with continuous analytics.' },
    ],
    industries: ['Banking & Financial Services', 'Real Estate & Construction', 'Government & Public Sector', 'Energy, Oil & Gas'],
    partners: ['Icertis', 'Agiloft', 'DocuSign CLM', 'Ironclad', 'Coupa'],
    faqs: [
      { q: 'Which CLM platforms do you support?', a: 'Icertis, Agiloft, DocuSign CLM, Ironclad and Coupa, with custom integrations to enterprise ERP systems.' },
      { q: 'How does GenAI help with contracts?', a: 'It accelerates authoring, recommends and standardizes clauses, scores risk, and extracts obligations — turning weeks of manual review into hours.' },
      { q: 'Can it monitor obligations after signature?', a: 'Yes — NLP extracts obligations, dates and milestones and proactively alerts owners so nothing is missed.' },
    ],
    caseStudy: { client: 'Aldar Properties', result: 'CLM platform processing 5,000+ contracts annually with a 65% cycle-time reduction.' },
    related: [
      { title: 'Content & Document Intelligence', slug: 'content-intelligence' },
      { title: 'GenAI, Agentic AI & Automation', slug: 'ai-automation' },
      { title: 'Business Value Consulting', slug: 'consulting' },
    ],
  },

  'consulting': {
    label: 'SPECIALIZED PRACTICE',
    title: 'Business Value Consulting',
    subtitle: 'Digital maturity assessments, enterprise architecture, transformation roadmaps and Centers of Excellence.',
    accent: 'red',
    icon: IconLightbulb,
    overview:
      'Technology investment must deliver measurable business outcomes. Our Business Value Consulting practice bridges strategy and execution — conducting digital-maturity assessments, designing enterprise architecture, building transformation roadmaps and establishing Centers of Excellence that ensure sustainable value. Our consultants bring deep industry context in banking, government, telecom and real estate, so recommendations are grounded in regulatory reality, not generic frameworks.',
    overviewPoints: [
      'Digital-maturity assessments with capability-gap analysis and prioritization.',
      'Enterprise architecture blueprints aligned to business capabilities and standards.',
      'Transformation roadmaps with sequenced initiatives and ROI projections.',
      'Centers of Excellence and operating models that sustain value over time.',
    ],
    deliverables: [
      { title: 'Digital Maturity Assessment', desc: 'Structured evaluation of capabilities, processes and technology against industry benchmarks.' },
      { title: 'Enterprise Architecture', desc: 'TOGAF/ArchiMate-aligned blueprints connecting business capabilities to technology standards.' },
      { title: 'Transformation Roadmaps', desc: 'Prioritized, sequenced initiatives with investment planning and ROI modeling.' },
      { title: 'Business Case & ROI Modeling', desc: 'Quantified value cases that secure funding and set measurable success criteria.' },
      { title: 'Program Management', desc: 'Transformation governance, delivery oversight and stakeholder alignment.' },
      { title: 'Center of Excellence Setup', desc: 'Operating models, standards and capabilities that make transformation repeatable.' },
    ],
    kpis: [
      { value: 3, suffix: 'x', label: 'ROI certainty improvement' },
      { value: 40, suffix: '%', label: 'Operating-cost reduction' },
      { value: 12, suffix: ' wk', label: 'To a costed roadmap' },
      { value: 100, suffix: '%', label: 'Outcomes tied to KPIs' },
    ],
    process: [
      { no: '01', title: 'Assess', desc: 'Evaluate maturity, capabilities and pain points through interviews and data.' },
      { no: '02', title: 'Design', desc: 'Define target architecture, initiatives and the value case.' },
      { no: '03', title: 'Validate', desc: 'Pressure-test the roadmap with stakeholders and refine sequencing and ROI.' },
      { no: '04', title: 'Execute', desc: 'Govern delivery and stand up the CoE to sustain momentum.' },
    ],
    industries: ['Banking & Financial Services', 'Government & Public Sector', 'Telecommunications', 'Real Estate & Construction'],
    partners: ['TOGAF', 'ArchiMate', 'Bizagi', 'Signavio'],
    faqs: [
      { q: 'What is your consulting methodology?', a: 'A proven Assess → Design → Validate → Execute framework with continuous stakeholder engagement and measurable outcomes.' },
      { q: 'How do you ensure recommendations are realistic?', a: 'Our consultants bring deep regulated-industry experience, so roadmaps reflect real regulatory, organizational and technical constraints.' },
      { q: 'Do you support delivery after the roadmap?', a: 'Yes — our pillars and practices can execute the roadmap, giving you continuity from strategy through production.' },
    ],
    caseStudy: { client: 'RAK Bank', result: 'Digital transformation roadmap enabling a 40% cost reduction in core banking operations.' },
    related: [
      { title: 'Cloud, Infra & Cybersecurity', slug: 'cloud-security' },
      { title: 'GenAI, Agentic AI & Automation', slug: 'ai-automation' },
      { title: 'Managed Services & SRE', slug: 'managed-services' },
    ],
  },

  'managed-services': {
    label: 'SPECIALIZED PRACTICE',
    title: 'Managed Services & SRE',
    subtitle: '24×7 L1–L3 operations, full-stack observability, AIOps and continuous performance optimization.',
    accent: 'blue',
    icon: IconSettings,
    overview:
      'Enterprise IT needs round-the-clock expertise that few organizations can sustain in-house. Our Managed Services and Site Reliability Engineering practice provides comprehensive 24×7 operations — from L1 helpdesk to L3 engineering — with guaranteed SLAs and proactive maintenance. We implement full-stack observability with Datadog, Grafana and ServiceNow, and apply AIOps to predict and prevent incidents before they touch business operations.',
    overviewPoints: [
      'Follow-the-sun L1–L3 support across regional and offshore centers.',
      'Full-stack observability with intelligent alerting and automated remediation.',
      'AIOps that predict and prevent incidents proactively.',
      'Continuous performance tuning, capacity planning and quarterly business reviews.',
    ],
    deliverables: [
      { title: '24×7 L1–L3 Operations', desc: 'Follow-the-sun support with certified engineers, incident and problem management across apps and infrastructure.' },
      { title: 'Observability & AIOps', desc: 'Unified observability with intelligent alerting, automated remediation and predictive analytics.' },
      { title: 'Performance Optimization', desc: 'Continuous tuning, autoscaling and capacity planning to keep systems fast and efficient.' },
      { title: 'Patch & Security Management', desc: 'Proactive patching, vulnerability remediation and security updates.' },
      { title: 'SLA Management', desc: 'Tiered SLAs with defined response and MTTR targets and transparent reporting.' },
      { title: 'Quarterly Business Reviews', desc: 'Continuous-improvement reviews tied to availability, performance and cost KPIs.' },
    ],
    kpis: [
      { value: 99.99, decimals: 2, suffix: '%', label: 'Availability achieved' },
      { value: 15, suffix: ' min', label: 'MTTR for critical' },
      { value: 50, suffix: '+', label: 'Applications managed' },
      { value: 24, suffix: '/7', label: 'Follow-the-sun coverage' },
    ],
    process: [
      { no: '01', title: 'Transition', desc: 'Knowledge transfer, runbook capture and tooling onboarding for a clean handover.' },
      { no: '02', title: 'Stabilize', desc: 'Establish observability, SLAs and incident processes; reduce noise and toil.' },
      { no: '03', title: 'Optimize', desc: 'Apply AIOps and tuning to prevent incidents and improve performance.' },
      { no: '04', title: 'Innovate', desc: 'Drive continuous improvement and automation through quarterly reviews.' },
    ],
    industries: ['Banking & Financial Services', 'Telecommunications', 'Government & Public Sector', 'Energy, Oil & Gas'],
    partners: ['Datadog', 'Grafana', 'ServiceNow', 'New Relic', 'Splunk', 'PagerDuty'],
    faqs: [
      { q: 'What is your SLA commitment?', a: 'Tiered SLAs from 99.9% to 99.99% availability, a 15-minute critical-incident response and defined MTTR targets.' },
      { q: 'How does AIOps reduce incidents?', a: 'By correlating signals across the stack, predicting anomalies and automating remediation before issues reach users.' },
      { q: 'Can you manage hybrid estates?', a: 'Yes — we operate across on-premises, private, public and multi-cloud estates under unified observability.' },
    ],
    caseStudy: { client: 'Oman Arab Bank', result: 'Managed services across 50+ applications with 99.95% uptime and a 15-minute MTTR.' },
    related: [
      { title: 'Cloud, Infra & Cybersecurity', slug: 'cloud-security' },
      { title: 'Quality Engineering & Testing', slug: 'quality-engineering' },
      { title: 'Data & Analytics', slug: 'data-analytics' },
    ],
  },

  'digital-experience': {
    label: 'SPECIALIZED PRACTICE',
    title: 'Digital Experience Platforms',
    subtitle: 'Digital banking & mobility, Salesforce ecosystems, customer portals and application modernization.',
    accent: 'blue',
    icon: IconSmartphone,
    overview:
      'Digital-first engagement is now the primary channel for customers and employees alike. Our Digital Experience Platforms practice builds responsive web apps, native mobile apps and self-service portals that deliver exceptional experiences across every device. We specialize in the Salesforce ecosystem, digital banking platforms and API-first modernization — work that has achieved 4.8-star app ratings and triple-digit increases in digital adoption for banking and real-estate clients.',
    overviewPoints: [
      'Native and cross-platform mobile experiences with strong security and performance.',
      'Salesforce Sales, Service and Experience Cloud implementation and integration.',
      'Customer and employee self-service portals with unified profiles.',
      'API-first, microservices modernization of legacy applications.',
    ],
    deliverables: [
      { title: 'Digital Banking & Mobility', desc: 'Native mobile banking apps, digital wallets, internet banking and embedded finance with open-banking APIs.' },
      { title: 'Salesforce Ecosystem', desc: 'Sales, Service and Experience Cloud implementation, customization and enterprise integration.' },
      { title: 'Self-Service Portals', desc: 'Customer and employee portals with unified profiles and seamless self-service.' },
      { title: 'Application Modernization', desc: 'Legacy transformation with microservices, containers and cloud-native architecture.' },
      { title: 'API-First Architecture', desc: 'API and microservices design for composable, scalable, integrable products.' },
      { title: 'Cross-Platform Delivery', desc: 'Flutter, React Native and native development chosen by performance and UX needs.' },
    ],
    kpis: [
      { value: 4.8, decimals: 1, suffix: '★', label: 'Average app rating' },
      { value: 300, suffix: '%', label: 'Digital adoption increase' },
      { value: 50, suffix: '%', label: 'Faster time to market' },
      { value: 100, suffix: 'K+', label: 'Customers served' },
    ],
    process: [
      { no: '01', title: 'Discover', desc: 'Define users, journeys, platform strategy and success metrics.' },
      { no: '02', title: 'Design', desc: 'UX/UI design, architecture and integration blueprint with security by design.' },
      { no: '03', title: 'Build', desc: 'Agile delivery of apps, portals and integrations with continuous testing.' },
      { no: '04', title: 'Scale', desc: 'Launch, measure adoption and iterate on features and performance.' },
    ],
    industries: ['Banking & Financial Services', 'Real Estate & Construction', 'Insurance & Healthcare', 'Telecommunications'],
    partners: ['Salesforce', 'Flutter', 'React Native', 'Kubernetes', 'AWS'],
    faqs: [
      { q: 'Which mobile frameworks do you use?', a: 'Flutter, React Native and native development, chosen by performance, security and UX requirements.' },
      { q: 'Do you support open banking?', a: 'Yes — we build open-banking APIs and embedded-finance integrations aligned to regional standards.' },
      { q: 'Can you modernize legacy applications?', a: 'Yes — we replatform to microservices, containers and cloud-native architecture with minimal disruption.' },
    ],
    caseStudy: { client: 'Dahabshiil Bank', result: 'Digital banking platform serving 100K+ customers with a 4.8-star app rating.' },
    related: [
      { title: 'Customer Experience (CX)', slug: 'customer-experience' },
      { title: 'Cloud, Infra & Cybersecurity', slug: 'cloud-security' },
      { title: 'Quality Engineering & Testing', slug: 'quality-engineering' },
    ],
  },

  'resource-partnership': {
    label: 'SPECIALIZED PRACTICE',
    title: 'Strategic Resource Partnership',
    subtitle: 'AI-powered talent matching, certified multilingual specialists and flexible onshore/offshore/hybrid models.',
    accent: 'red',
    icon: IconUsers,
    overview:
      'Finding the right technology talent is one of the biggest challenges enterprises face across the Middle East and Africa. Our Strategic Resource Partnership practice provides access to a certified, multilingual pool of consultants, engineers and architects through flexible engagement models — staff augmentation, dedicated teams and outcome-based delivery. With expertise across OpenText, UiPath, Oracle, Salesforce and 40+ other platforms, we help clients scale teams rapidly while maintaining quality and time-to-productivity.',
    overviewPoints: [
      'AI-powered matching that aligns candidates to roles by skills, fit and performance data.',
      'Certified specialists fluent in Arabic, English, French and regional languages.',
      'Flexible onshore, offshore and hybrid models with transparent governance.',
      'Skills development and certification programs that sustain quality.',
    ],
    deliverables: [
      { title: 'AI-Powered Talent Matching', desc: 'ML-driven matching by skills, culture fit and predictive performance for high-quality placements.' },
      { title: 'Multilingual Talent Pool', desc: 'Certified professionals fluent in Arabic, English, French and regional languages.' },
      { title: 'Flexible Engagement Models', desc: 'Staff augmentation, managed teams, project-based and build-operate-transfer (BOT) models.' },
      { title: 'Skills & Certification Programs', desc: 'Continuous upskilling and OEM certification to keep capabilities current.' },
      { title: 'Account & Performance Management', desc: 'Dedicated account management with transparent performance tracking and governance.' },
      { title: 'Rapid Onboarding', desc: 'Accelerated onboarding to minimize time-to-productivity for scaled teams.' },
    ],
    kpis: [
      { value: 90, suffix: '%', label: 'Match accuracy' },
      { value: 200, suffix: '+', label: 'Specialists deployed' },
      { value: 15, suffix: '+', label: 'Technology domains' },
      { value: 40, suffix: '+', label: 'Platforms covered' },
    ],
    process: [
      { no: '01', title: 'Define', desc: 'Clarify roles, skills, seniority and engagement model with the client.' },
      { no: '02', title: 'Match', desc: 'AI-driven sourcing and assessment shortlist the best-fit candidates fast.' },
      { no: '03', title: 'Onboard', desc: 'Rapid onboarding, knowledge transfer and integration into delivery teams.' },
      { no: '04', title: 'Manage', desc: 'Ongoing account management, performance tracking and scaling.' },
    ],
    industries: ['Telecommunications', 'Banking & Financial Services', 'Government & Public Sector', 'Energy, Oil & Gas'],
    partners: ['OpenText', 'UiPath', 'Oracle', 'Salesforce', 'Workday', 'SAP Fieldglass'],
    faqs: [
      { q: 'What engagement models do you offer?', a: 'Staff augmentation, managed teams, project-based delivery and build-operate-transfer models, all with transparent governance.' },
      { q: 'How do you ensure candidate quality?', a: 'AI-driven matching plus skills assessment and certification verification ensure strong candidate-role alignment.' },
      { q: 'Can you scale teams quickly?', a: 'Yes — our certified talent pool and rapid onboarding minimize time-to-productivity for fast scaling.' },
    ],
    caseStudy: { client: 'Etisalat (e&)', result: 'Strategic staffing partnership providing 200+ certified specialists across 15 technology domains.' },
    related: [
      { title: 'Business Value Consulting', slug: 'consulting' },
      { title: 'Quality Engineering & Testing', slug: 'quality-engineering' },
      { title: 'Digital Workplace', slug: 'digital-workplace' },
    ],
  },

  'quality-engineering': {
    label: 'SPECIALIZED PRACTICE',
    title: 'Quality Engineering & Testing',
    subtitle: 'Automated regression suites, performance & load testing, security testing and CI/CD quality gates.',
    accent: 'blue',
    icon: IconCheckCircle,
    overview:
      'In regulated industries, software quality is a compliance requirement, not a preference. Our Quality Engineering practice delivers comprehensive testing that ensures enterprise applications perform reliably under production workloads. We build automated regression suites, run performance and load tests that simulate millions of concurrent users, and establish CI/CD quality gates that stop defects before they reach production — integrating quality into every stage of delivery, not just the final checkpoint.',
    overviewPoints: [
      'Automated regression across web and mobile with Selenium, Cypress and Playwright.',
      'Performance, load and stress testing that simulates enterprise-scale demand.',
      'Security testing and vulnerability assessment integrated into delivery.',
      'CI/CD quality gates with coverage, scanning and compliance checks.',
    ],
    deliverables: [
      { title: 'Automated Regression', desc: 'Comprehensive test automation with Selenium, Cypress and Playwright for web and mobile, including visual regression.' },
      { title: 'Performance & Load Testing', desc: 'Load, stress and endurance testing with JMeter, K6 and Gatling for enterprise-scale validation.' },
      { title: 'CI/CD Quality Gates', desc: 'Automated gates with code coverage, security scanning and compliance checks in the pipeline.' },
      { title: 'Security Testing', desc: 'Vulnerability assessment and security testing integrated into the delivery lifecycle.' },
      { title: 'Test Automation Frameworks', desc: 'BDD frameworks and reusable harnesses tailored to your technology stack.' },
      { title: 'Cross-Browser & Device', desc: 'Cross-browser and cross-device validation for consistent experiences everywhere.' },
    ],
    kpis: [
      { value: 80, suffix: '%', label: 'Faster test cycles' },
      { value: 90, suffix: '%', label: 'Automation coverage' },
      { value: 2, suffix: ' days', label: 'Regression cycle' },
      { value: 99, suffix: '%', label: 'Defect-escape prevention' },
    ],
    process: [
      { no: '01', title: 'Assess', desc: 'Review the application, risk areas and current testing maturity.' },
      { no: '02', title: 'Frame', desc: 'Build the automation framework, test data and CI/CD quality gates.' },
      { no: '03', title: 'Automate', desc: 'Implement regression, performance and security suites at scale.' },
      { no: '04', title: 'Embed', desc: 'Integrate quality into every sprint with continuous reporting.' },
    ],
    industries: ['Banking & Financial Services', 'Government & Public Sector', 'Telecommunications', 'Insurance & Healthcare'],
    partners: ['Selenium', 'Cypress', 'Playwright', 'JMeter', 'SonarQube', 'Jenkins'],
    faqs: [
      { q: 'What testing tools do you use?', a: 'Selenium, Cypress, Playwright, Appium, JMeter, K6 and custom frameworks chosen by stack and requirements.' },
      { q: 'How do you integrate testing into CI/CD?', a: 'We embed automated quality gates — coverage, security scanning and compliance checks — directly into the delivery pipeline.' },
      { q: 'Can you test at enterprise scale?', a: 'Yes — performance and load suites simulate millions of concurrent users to validate production readiness.' },
    ],
    caseStudy: { client: 'Mashreq Bank', result: 'Automated testing framework reducing the regression cycle from 2 weeks to 2 days.' },
    related: [
      { title: 'Managed Services & SRE', slug: 'managed-services' },
      { title: 'Cloud, Infra & Cybersecurity', slug: 'cloud-security' },
      { title: 'Digital Experience Platforms', slug: 'digital-experience' },
    ],
  },
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = servicesData[slug || '']

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!service) {
    return (
      <div className="surface-ink-flat flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <span className="eyebrow-red">404</span>
          <h1 className="mt-5 font-display text-4xl font-semibold text-white">Service not found</h1>
          <p className="mt-3 text-white/55">The service you're looking for doesn't exist or has moved.</p>
          <a href="#/services" className="btn-primary mt-8">
            <span>View all services</span><IconArrowRight className="relative z-10 h-4 w-4" />
          </a>
        </div>
      </div>
    )
  }

  const isBlue = service.accent === 'blue'
  const Icon = service.icon
  const eyebrowLight = isBlue ? 'eyebrow-blue-on-light' : 'eyebrow-on-light'
  const gradText = isBlue ? 'text-gradient-blue' : 'text-gradient-brand'
  const dot = isBlue ? 'bg-brand-blue' : 'bg-brand-red'
  const accentText = isBlue ? 'text-brand-blue' : 'text-brand-red'

  return (
    <div>
      <PageHeader
        label={service.label}
        title={service.title}
        subtitle={service.subtitle}
        bgImage="/tech-abstract-1.jpg"
        crumbs={[{ label: 'Home', href: '#/' }, { label: 'Services', href: '#/services' }, { label: service.title }]}
      />

      {/* ── Overview ── */}
      <section className="surface-ink-flat relative overflow-hidden">
        <KineticBackdrop variant="flow" color={service.accent} opacity={0.28} className="left-1/4 w-[130%]" />
        <div className="container-xl section-y relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
            <Reveal stagger=".ov-item">
              <span className={`ov-item ${isBlue ? 'eyebrow-blue' : 'eyebrow-red'}`}>Overview</span>
              <h2 className="ov-item mt-5 font-display text-[clamp(24px,3vw,40px)] font-semibold leading-[1.2] tracking-[-0.02em] text-white text-balance">
                Why it matters, and <span className={gradText}>what we change.</span>
              </h2>
              <p className="ov-item mt-6 text-[15.5px] leading-relaxed text-white/65">{service.overview}</p>
            </Reveal>

            <Reveal>
              <div className="card-ink flex h-full flex-col p-8">
                <span className={`${isBlue ? 'icon-tile-blue' : 'icon-tile'} mb-6 h-14 w-14`}><Icon className="h-6 w-6 text-white/90" /></span>
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">What changes</p>
                <ul className="space-y-4">
                  {service.overviewPoints.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[14px] leading-snug text-white/70">
                      <IconCheck className={`mt-0.5 h-4 w-4 shrink-0 ${accentText}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What we deliver ── */}
      <section className="surface-paper relative overflow-hidden">
        <GridBackdrop light />
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            theme="light"
            eyebrow="What we deliver"
            title={<>The capabilities, <span className={gradText}>end to end.</span></>}
            intro="A complete, production-grade capability set — delivered by certified specialists and backed by strategic OEM partnerships."
          />
          <Reveal stagger=".del-card" className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((d, i) => (
              <TiltCard key={d.title} glow={service.accent} className="del-card card-paper flex flex-col p-7">
                <span className={`mb-5 font-display text-3xl font-semibold ${isBlue ? 'text-brand-blue/30' : 'text-brand-red/30'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink-900">{d.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-900/55">{d.desc}</p>
              </TiltCard>
            ))}
          </Reveal>

          {/* Partners */}
          <Reveal className="mt-14">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-900/45">Strategic partners & platforms</p>
            <div className="flex flex-wrap gap-2.5">
              {service.partners.map((p) => (
                <span key={p} className="border border-ink-900/12 bg-white px-4 py-2 text-[13px] font-medium text-ink-900/70 transition-colors hover:border-ink-900/30">{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Outcomes / KPIs ── */}
      <section className="surface-ink-raised relative overflow-hidden">
        <Aurora className="opacity-50" />
        <Grain />
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            eyebrow="Outcomes that matter"
            title={<>Measured in <span className={gradText}>business results.</span></>}
            intro="Representative outcomes from enterprise engagements. We anchor every program to KPIs like these and review against them."
          />
          <Reveal stagger=".kpi-item" className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/[0.04] lg:grid-cols-4">
            {service.kpis.map((k) => (
              <div key={k.label} className="kpi-item group bg-ink-900/70 p-7 transition-colors duration-500 hover:bg-white/[0.03]">
                <div className="font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                  <Counter to={k.value} prefix={k.prefix} suffix={k.suffix} decimals={k.decimals} />
                </div>
                <div className="mt-3 text-[13px] leading-snug text-white/55">{k.label}</div>
                <div className={`mt-4 h-px w-9 transition-all duration-500 group-hover:w-16 ${isBlue ? 'bg-grad-blue' : 'bg-grad-red'}`} />
              </div>
            ))}
          </Reveal>

          {/* Case study */}
          <Reveal className="mt-12">
            <div className="card-ink flex flex-col gap-5 p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <IconSparkle className={`mt-1 h-5 w-5 shrink-0 ${accentText}`} />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Proof point — {service.caseStudy.client}</p>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/75">{service.caseStudy.result}</p>
                </div>
              </div>
              <a href="#/case-studies" className="btn-ghost group shrink-0">
                See case studies<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Approach / process timeline ── */}
      <section className="surface-ink-flat relative overflow-hidden">
        <KineticBackdrop variant="rings" color={service.accent} opacity={0.25} className="left-1/2 w-[120%] -translate-x-1/2" />
        <div className="container-xl section-y relative z-10">
          <SectionHeading
            eyebrow="How we deliver"
            title={<>A clear path from <span className={gradText}>idea to operation.</span></>}
            intro="A proven, low-risk delivery approach that proves value early and scales with confidence."
          />
          <Reveal stagger=".step" className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/[0.04] md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((s) => (
              <div key={s.no} className="step group relative bg-ink-900/70 p-8 transition-colors duration-500 hover:bg-white/[0.03]">
                <span className="font-display text-5xl font-semibold text-white/15 transition-colors duration-500 group-hover:text-white/40">{s.no}</span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/55">{s.desc}</p>
                <div className={`mt-6 h-px w-8 transition-all duration-500 group-hover:w-16 ${isBlue ? 'bg-grad-blue' : 'bg-grad-red'}`} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Industries + FAQ ── */}
      <section className="surface-paper-warm relative overflow-hidden">
        <div className="container-xl section-y relative z-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Industries */}
            <Reveal stagger=".ind-item">
              <span className={`ind-item ${eyebrowLight}`}>Where we apply it</span>
              <h2 className="ind-item mt-5 font-display text-[clamp(22px,2.6vw,34px)] font-semibold leading-tight tracking-[-0.02em] text-ink-900 text-balance">
                Built for regulated, high-stakes industries.
              </h2>
              <div className="ind-item mt-8 space-y-3">
                {service.industries.map((ind) => (
                  <div key={ind} className="flex items-center gap-3 border-b border-ink-900/10 pb-3">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                    <span className="text-[15px] font-medium text-ink-900/75">{ind}</span>
                  </div>
                ))}
              </div>
              <a href="#/industries" className={`mt-8 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.08em] ${accentText} transition-all hover:gap-3`}>
                Explore industries<IconArrowRight className="h-4 w-4" />
              </a>
            </Reveal>

            {/* FAQ */}
            <Reveal stagger=".faq-item">
              <span className={`faq-item ${eyebrowLight}`}>Frequently asked</span>
              <h2 className="faq-item mt-5 font-display text-[clamp(22px,2.6vw,34px)] font-semibold leading-tight tracking-[-0.02em] text-ink-900 text-balance">
                The questions enterprises ask us.
              </h2>
              <div className="faq-item mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10">
                {service.faqs.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-[15px] font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-900/15 ${accentText} transition-transform duration-300 group-open:rotate-45`}>
                        <span className="text-lg leading-none">+</span>
                      </span>
                    </summary>
                    <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-900/60">{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Related services ── */}
      <section className="surface-ink-flat relative overflow-hidden">
        <div className="container-xl section-y">
          <SectionHeading
            eyebrow="Goes well with"
            title={<>Related <span className={gradText}>services.</span></>}
            intro="The pillars and practices most often delivered alongside this one — full-stack, under one accountable partner."
          />
          <BrandRule className="my-10" />
          <Reveal stagger=".rel-row" className="border-t border-white/10">
            {service.related.map((r) => (
              <a key={r.slug} href={`#/services/${r.slug}`} className="rel-row group flex items-center justify-between gap-4 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.025]">
                <span className={`font-display text-2xl font-semibold text-white transition-colors md:text-[28px] ${isBlue ? 'group-hover:text-brand-blue' : 'group-hover:text-brand-red'}`}>{r.title}</span>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white/45 transition-all group-hover:gap-3.5 group-hover:text-white">
                  View<IconArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </Reveal>
          <Reveal className="mt-10">
            <a href="#/services" className="btn-ghost group">All services<IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Let's build it"
        color={service.accent}
        title={<>Ready to put <span className={gradText}>{service.title}</span> to work?</>}
        body="Tell us the outcome you're chasing. We'll scope a focused engagement, prove value fast, and scale from there."
        primary={{ label: 'Talk to our team', href: '#/contact' }}
        secondary={{ label: 'View all services', href: '#/services' }}
      />
    </div>
  )
}
