/**
 * Scheduled Insights articles. They live on the server only: the API returns an
 * article once its `publishAt` has passed, so unpublished text never reaches the browser.
 *
 * House rule for this content: no client names, no project figures, no specific use cases.
 * Speak about Aptiva's approach in general terms.
 */

export type Block =
  | { h: string }
  | { p: string }
  | { ul: string[] }
  | { quote: string }

export type ScheduledArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  readTime: string
  author: string
  cover: string
  publishAt: string
  /** id from src/data/events.ts, to cross-link the article and the event */
  eventId?: string
  body: Block[]
}

import { backlogA } from './backlog-a'
import { backlogB } from './backlog-b'
import { backlogC } from './backlog-c'

const AUTHOR = 'Aptiva AI & Automation Practice'

/** Event-season articles: one every other day from FUSION day (2 Nov). */
const upcoming: ScheduledArticle[] = [
  {
    slug: 'from-ai-investment-to-enterprise-impact',
    title: 'From AI Investment to Enterprise Impact: Why Pilots Stall, and How to Get Them to Production',
    excerpt:
      'Most enterprises have proven that AI works. Far fewer have proven that it pays. The gap is rarely the model. It is the path from a promising prototype to a governed, production service that the business relies on.',
    category: 'Agentic AI',
    tags: ['Agentic AI', 'Strategy', 'Automation'],
    readTime: '7 min read',
    author: AUTHOR,
    cover: '/about-ai.jpg',
    publishAt: '2026-11-02T08:00:00+04:00',
    eventId: 'uipath-fusion-dubai-2026',
    body: [
      { p: 'Across the region, the conversation about AI has changed. Two years ago the question was whether generative and agentic AI could do useful work. Today most leadership teams have seen it happen in a demo, a hackathon or a pilot. The harder question now is a financial one: why has so little of that early promise turned into measurable impact on cost, revenue, risk or service?' },
      { p: 'In our experience the answer is rarely the technology. Models are capable and improving every quarter. What stalls programmes is everything around the model: unclear ownership, data that is not ready, controls that were never designed, and no agreed definition of success. A pilot that impresses in week four can quietly die in month six because nobody planned the road from prototype to production.' },
      { h: 'Five reasons pilots stall' },
      { ul: [
        'The use case was chosen for novelty, not value. It looked impressive but sat on a process nobody was measured on.',
        'Success was never defined. Without acceptance criteria agreed up front, every result is debatable.',
        'Data and access were assumed. The prototype ran on a curated sample; production needs live systems, permissions and data quality.',
        'Governance arrived late. Security, compliance and audit were treated as a final review rather than design inputs, and the review said no.',
        'There was no operating model. Nobody owned the service once the project team moved on.',
      ] },
      { h: 'Treat every step as an investment decision' },
      { p: 'We run AI and automation programmes through five stage gates: Discover, Prove, Industrialise, Scale and Operate. Each gate is a decision point, not a ceremony. Before the next round of investment, the team confirms value, quality, security, ownership and readiness. It sounds formal, but it is what lets an organisation move quickly with confidence: weak ideas stop early and cheaply, and strong ones earn the right to grow.' },
      { p: 'Discover prioritises use cases by business value, data readiness and risk. Prove builds a focused prototype against measurable acceptance criteria. Industrialise integrates, secures and tests the solution so it can run on real systems. Scale reuses proven patterns across functions, channels and geographies. Operate monitors models, agents, cost, security and outcomes for as long as the service runs.' },
      { h: 'Start with an eight-week value sprint' },
      { p: 'The fastest way out of pilot purgatory is a short, structured sprint that ends in a decision rather than a demo. Ours runs six to eight weeks:' },
      { ul: [
        'Weeks 1–2, Align: executive goals, an opportunity backlog and an honest review of data and platforms.',
        'Weeks 3–4, Design: target architecture, governance, one prioritised use case and agreed success measures.',
        'Weeks 5–7, Prove: a working prototype, validated with real users, with a technical and risk assessment.',
        'Week 8, Decide: a business case, production roadmap, delivery plan and operating model.',
      ] },
      { p: 'The output is not a slide that says "AI has potential". It is a decision-ready route from one priority use case to production, with the cost, risk and ownership laid out.' },
      { h: 'Measure what the business already measures' },
      { p: 'The programmes that reach production tie AI to numbers the business already tracks: cycle time, cost per transaction, error and rework rates, compliance coverage, customer wait time. When the measures are familiar, the value is easy to see and easy to defend at budget time. Across our practice, well-designed automation routinely removes the majority of manual effort from the processes it touches. That result comes from choosing the right processes and designing the controls, not from the model alone.' },
      { quote: 'AI delivers value when it is connected to real work: real systems, real decisions and real accountability.' },
      { h: 'Where to start' },
      { p: 'Pick one process that matters, is measured today and has data you can reach. Agree what success looks like before anyone writes a prompt. Design the controls with your risk and compliance teams in the room. Then build, prove and decide. Done this way, the first use case becomes the template for the next ten.' },
      { p: 'Aptiva is at UiPath FUSION Dubai on 2 November at the Museum of the Future. If you are working out how to move from AI investment to enterprise impact, come and find us at our partner pod, or book time with our specialists.' },
    ],
  },
  {
    slug: 'agents-robots-and-people',
    title: 'Agents, Robots and People: Designing Orchestration That Humans Can Trust',
    excerpt:
      'Agentic automation is not about replacing robots or people. It is about giving each the work it does best, and designing the hand-offs so that accountability never gets lost along the way.',
    category: 'Automation',
    tags: ['Agentic AI', 'RPA', 'Human-in-the-loop'],
    readTime: '7 min read',
    author: AUTHOR,
    cover: '/tech-abstract-1.jpg',
    publishAt: '2026-11-04T08:00:00+04:00',
    eventId: 'uipath-fusion-dubai-2026',
    body: [
      { p: 'For a decade, enterprise automation meant software robots following rules: log in, read a field, update a system, repeat. Robots are fast, cheap and exact, and they are still the right tool for a huge amount of work. But they struggle the moment a process needs judgement: reading an unstructured document, interpreting a customer conversation, or deciding which of five paths a case should take.' },
      { p: 'AI agents fill that gap. An agent can read, reason, plan and choose a tool. The real opportunity is not agents instead of robots, or agents instead of people. It is orchestration: a single process in which agents handle the judgement, robots handle the execution and people handle the decisions that carry real accountability.' },
      { h: 'A simple model: observe, reason, act, govern, learn' },
      { ul: [
        'Observe: take in documents, conversations, events and system context.',
        'Reason: plan towards a goal, retrieve the right knowledge and check it against policy.',
        'Act: call APIs and robots, move cases through workflows, request human approval and notify the right people.',
        'Govern: enforce identity and access, apply guardrails and keep an audit trail of every step.',
        'Learn: evaluate outcomes, feed results back, tune prompts and models, and redesign the process where needed.',
      ] },
      { p: 'Every agentic solution we build follows this loop. It keeps the design honest: if you cannot say how a step is governed or how it learns, it is not ready for production.' },
      { h: 'Specialist agents, one orchestrator' },
      { p: 'The pattern that works best in practice is a coordinating "super agent" that plans the work and hands each step to a specialist: one agent to take in and parse documents, another to compare against templates or rules, another to classify, another to write the report. Each specialist is small, testable and easy to improve on its own. The orchestrator tracks state, manages hand-offs between agents and decides when a person needs to step in.' },
      { p: 'Robots stay at the edges where precision matters: pulling data from core systems, updating records, triggering downstream processes. Platforms such as UiPath bring these pieces together, with agents, robots, document understanding, queues and human tasks orchestrated in one governed environment.' },
      { h: 'Design the human moments first' },
      { p: 'The most important design decision in an agentic process is where people come in. We use confidence thresholds: when the agent is highly confident and the stakes are routine, the work flows straight through; in a middle band it goes to a reviewer with the evidence laid out; below that, it is handled manually. Thresholds are set with the business, tested against real cases and tuned over time.' },
      { quote: 'AI reasons. Robots verify. Humans decide, at the points that matter.' },
      { p: 'Done well, this changes what people spend their day on. Instead of reading every case line by line, reviewers spend their time on the exceptions that genuinely need judgement, with the agent\'s reasoning and evidence in front of them. Coverage goes up, consistency goes up, and the team\'s expertise goes where it adds the most value.' },
      { h: 'Five questions before you deploy an agent' },
      { ul: [
        'Which decisions can the agent make alone, and which always need a person?',
        'What evidence will a reviewer see when the agent escalates?',
        'How is every action logged, and who can audit it?',
        'What happens when a source system is down or the model is unsure?',
        'How will you know, month by month, that the agent is still performing?',
      ] },
      { p: 'If the answers are clear, you have an agent that people can trust. If they are not, you have a demo. Visit the Aptiva pod at UiPath FUSION Dubai to see how we orchestrate agents, robots and people in practice.' },
    ],
  },
  {
    slug: 'trust-by-design-ai-for-regulated-industries',
    title: 'Trust by Design: Building AI That Regulated Industries Can Deploy',
    excerpt:
      'In banking, government, telecom and energy, an AI system that cannot explain itself, protect its data and prove what it did will never leave the lab. Trust has to be engineered in from the first design session.',
    category: 'Governance',
    tags: ['Responsible AI', 'Security', 'Compliance'],
    readTime: '6 min read',
    author: AUTHOR,
    cover: '/industry-government.jpg',
    publishAt: '2026-11-06T08:00:00+04:00',
    body: [
      { p: 'Regulated organisations do not lack ambition for AI. What they lack is room for error. A wrong answer from a customer-facing assistant, an unexplained decision in a compliance process or a data boundary crossed by accident can cost far more than the efficiency the system was meant to deliver. That is why, in these industries, trust is not a feature. It is the condition for going live.' },
      { p: 'The mistake we see most often is treating governance as a final gate. The solution is built, then handed to security, risk and compliance for review, and the review sends it back. The fix is simple to describe and takes discipline to practise: design for trust from the first workshop.' },
      { h: 'Six pillars we engineer into every solution' },
      { ul: [
        'Security by design: identity, least-privilege access, encryption, isolation and secure access for every tool an agent can call.',
        'Responsible AI: fairness, transparency, explainability and clear human accountability for outcomes.',
        'Evaluation: testing for accuracy, groundedness, safety, latency and cost, as well as the business outcome itself.',
        'Governance: a model and agent inventory, approvals, audit trails, change control and policy enforcement.',
        'Data sovereignty: on-premise, private cloud or sovereign hosting that matches regulatory and customer requirements.',
        'Operational resilience: monitoring, fallback paths, incident response and controlled upgrades.',
      ] },
      { h: 'Make every decision traceable' },
      { p: 'Auditors and regulators ask a simple question: why did the system do that? A trustworthy AI service can answer it for any individual case. That means logging the inputs it saw, the knowledge it retrieved, the rules it applied, its confidence, the action it took and the person who approved it. When this trail is designed in, compliance teams stop being a blocker and become advocates, because for the first time they can see every decision rather than a sample.' },
      { h: 'Choose where the model runs' },
      { p: 'For many organisations in the region, where data lives is not negotiable. Architecture should keep the choice of model, deployment and data boundary open: public models where appropriate, private or sovereign deployments where required, and the ability to switch as regulation and technology evolve. A modular stack, with experience, intelligence, orchestration, knowledge and a trusted foundation as separate layers, protects that choice and avoids lock-in. Information governance belongs in that foundation too: the retention, classification and access rules already managed in content platforms such as OpenText should govern what AI can see and use.' },
      { h: 'Evaluation never stops' },
      { p: 'Models drift, data changes and processes evolve. A system that was accurate at launch can quietly degrade. Production AI needs continuous evaluation against a maintained test set, monitoring of quality and cost, and clear thresholds that trigger review. Treat it like any other critical service: measured, alerted on and owned.' },
      { quote: 'Humans remain accountable at the points that matter. The architecture should make that easy, not optional.' },
      { p: 'Trust is what lets AI move from a contained pilot to the core of how an institution works. Talk to our team about embedding governance into your AI programme from day one.' },
    ],
  },
  {
    slug: 'running-automation-at-scale',
    title: 'Keeping the Robots Running: What It Takes to Operate Automation at Enterprise Scale',
    excerpt:
      'Building the first hundred automations is a project. Running them, along with the next several hundred, is an operation. The organisations that get lasting value from automation treat it as a managed service, not a collection of scripts.',
    category: 'Managed Services',
    tags: ['RPA', 'Operations', 'Automation CoE'],
    readTime: '6 min read',
    author: AUTHOR,
    cover: '/tech-abstract-2.jpg',
    publishAt: '2026-11-08T08:00:00+04:00',
    body: [
      { p: 'Automation programmes tend to be judged on what they launch. But the value of an automation is earned every day it runs correctly, and lost every day it fails silently. As an estate grows from dozens of robots to hundreds, the operational load grows with it: schedules, queues, credentials, application changes, licences, platform upgrades and, increasingly, AI agents with their own monitoring needs.' },
      { p: 'Organisations that scale automation successfully make a deliberate shift from project to service. They put the same discipline around their digital workforce that they put around any other critical system.' },
      { h: 'The six disciplines of automation operations' },
      { ul: [
        'Monitoring: bot and queue health, schedules and alerts, so problems are seen before the business feels them.',
        'Incident management: triage, fix and root-cause analysis, so the same failure does not happen twice.',
        'Change requests: controlled enhancements to live automations as processes and applications evolve.',
        'Platform upkeep: upgrades, patching and migrations to newer platform versions without disrupting operations.',
        'Licences and capacity: utilisation tracking and robot and machine planning, so spend follows value.',
        'Reporting: regular status, tickets and value delivered, in language the business understands.',
      ] },
      { h: 'Automate the operation itself' },
      { p: 'A small team can run a large estate if operations are automated too. Integrating the automation platform with ticketing and alarm systems means failures raise incidents on their own and many resolve automatically. Clear failure notifications reach the right person in minutes, not days. Routine recovery steps, such as restarting a job, clearing a queue item or refreshing a session, can be handled by the platform rather than a person.' },
      { h: 'Make value visible' },
      { p: 'Leadership supports what it can see. A single view of automation performance, covering utilisation, success rates, exceptions and business value delivered, turns the programme from a cost line into an investment with visible returns. Dashboards built on the platform\'s own analytics, or an orchestration layer such as UnifyApps that spans several automation and AI platforms, make it easy to spot under-used robots, failing processes and the next best candidates for automation.' },
      { h: 'Plan for platform change' },
      { p: 'Automation platforms evolve quickly, and agentic capabilities are now arriving in the same environments that run your robots, whether that is UiPath or another platform. Upgrades and migrations should be planned, tested and run as part of normal operations, with compatibility checks for every live process. Done well, a migration is invisible to the business. Done badly, it becomes the reason a programme loses momentum.' },
      { quote: 'One accountable partner for development, operations and platform: that is what keeps an automation estate healthy as it grows.' },
      { p: 'Whether you are running your first fifty automations or several hundred, our managed automation services keep your digital workforce running, improving and reporting its value.' },
    ],
  },
  {
    slug: 'grounded-genai-enterprise-knowledge',
    title: 'Grounded GenAI: Putting Enterprise Knowledge and Content to Work',
    excerpt:
      'A generative AI assistant is only as good as what it knows. The real advantage comes from connecting models to an organisation\'s own content, with the right controls, in Arabic and English.',
    category: 'GenAI',
    tags: ['GenAI', 'Content Intelligence', 'RAG'],
    readTime: '6 min read',
    author: AUTHOR,
    cover: '/industry-banking.jpg',
    publishAt: '2026-11-10T08:00:00+04:00',
    eventId: 'opentext-summit-me-2026',
    body: [
      { p: 'Every large organisation sits on a vast store of knowledge: policies, contracts, procedures, case files, correspondence and decades of records. Most of it is hard to find and harder to use. Generative AI promises to change that, but a general-purpose model on its own knows nothing about your policies, your products or your customers. Asked about them, it will either decline or, worse, invent an answer.' },
      { p: 'Grounding fixes this. A grounded assistant retrieves the relevant, trusted content first, then uses the model to read, summarise, compare and draft, citing where each answer came from. The quality of the answer depends far more on the quality of the knowledge behind it than on the model in front.' },
      { h: 'Knowledge is the foundation' },
      { p: 'Grounded GenAI starts with well-governed content. Enterprise content platforms such as OpenText, along with records management and archival, already hold an organisation\'s most trusted information, along with the permissions that say who may see what. Building on that foundation, rather than copying documents into a separate store, keeps answers current and keeps access rules intact.' },
      { ul: [
        'Content and document intelligence to capture, classify and extract meaning from documents at scale.',
        'Enterprise search and retrieval-augmented generation (RAG) to find the right passages for each question.',
        'Knowledge graph foundations to connect people, products, cases and policies.',
        'Permission-aware retrieval, so the assistant only uses content the user is entitled to see.',
      ] },
      { h: 'What grounded assistants do well' },
      { ul: [
        'Search, summarise and compare trusted internal content in seconds rather than hours.',
        'Draft responses, reports, proposals and decision notes for a person to review and approve.',
        'Assist employees inside the tools they already use, rather than in yet another application.',
        'Serve Arabic and English users with the same quality and the same controls.',
      ] },
      { h: 'Controls that make it safe' },
      { p: 'Content platforms increasingly bring AI to the content where it lives, as OpenText does with its Aviator capabilities, while integration and orchestration layers such as UnifyApps connect that knowledge to the workflows and applications where decisions are made.' },
      { p: 'Every response passes through policy and validation before it reaches the user or triggers an action. Sensitive data is handled according to classification. Answers carry their sources, so users can check them. The organisation keeps the choice of model, deployment and data boundary, including private and sovereign options where regulation requires them.' },
      { h: 'Start where knowledge work hurts' },
      { p: 'The best first use cases are where skilled people spend hours finding and reading documents before they can make a decision: compliance checks, contract review, policy questions, case preparation and customer correspondence. Ground the assistant in the content those teams already trust, measure the time saved and the quality of the output, and expand from there.' },
      { quote: 'The model is the engine. Your enterprise knowledge is the fuel, and governance is the steering.' },
      { p: 'Aptiva will be at the OpenText Summit Middle East on 24 November at Atlantis The Palm. Meet us to talk about turning your enterprise content into grounded, trustworthy AI.' },
    ],
  },
]

// Back-dated library (May–Oct 2026, 3 a month) plus the scheduled run.
export const scheduledArticles: ScheduledArticle[] = [...backlogA, ...backlogB, ...backlogC, ...upcoming]

/** Articles whose publish time has passed, newest first. */
export function publishedArticles(now = Date.now()) {
  return scheduledArticles
    .filter((a) => new Date(a.publishAt).getTime() <= now)
    .sort((a, b) => new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime())
}
