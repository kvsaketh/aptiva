import "dotenv/config";
import { getDb } from "../api/queries/connection";
import { clientLogos, partnerLogos, siteImages } from "./schema";

const db = getDb();

// ─── CLIENT LOGOS ─── Trusted Clients (from Home.tsx)
const clientData = [
  { name: 'Etisalat (e&)', imageUrl: '/client-logos/etisalat.svg', displayOrder: 1 },
  { name: 'First Abu Dhabi Bank', imageUrl: '/client-logos/fab.svg', displayOrder: 2 },
  { name: 'Dubai Economy & Tourism', imageUrl: '/client-logos/dubai-economy.svg', displayOrder: 3 },
  { name: 'Aldar Properties', imageUrl: '/client-logos/aldar.svg', displayOrder: 4 },
  { name: 'Emirates Nuclear Energy Corp', imageUrl: '/client-logos/enec.svg', displayOrder: 5 },
  { name: 'Etihad Rail', imageUrl: '/client-logos/etihad-rail.svg', displayOrder: 6 },
  { name: 'Daman Health IC', imageUrl: '/client-logos/daman.svg', displayOrder: 7 },
  { name: 'Mashreq Bank', imageUrl: '/client-logos/mashreq.svg', displayOrder: 8 },
  { name: 'RAK Bank', imageUrl: '/client-logos/rakbank.svg', displayOrder: 9 },
  { name: 'National Bank of Fujairah', imageUrl: '/client-logos/nbf.svg', displayOrder: 10 },
  { name: 'Oman Arab Bank', imageUrl: '/client-logos/oab.svg', displayOrder: 11 },
  { name: 'I&M Bank', imageUrl: '/client-logos/im-bank.svg', displayOrder: 12 },
  { name: 'Diamond Trust Bank', imageUrl: '/client-logos/dtb.svg', displayOrder: 13 },
  { name: 'Dahabshiil Bank', imageUrl: '/client-logos/dahabshiil.svg', displayOrder: 14 },
  { name: 'First Capital Bank', imageUrl: '/client-logos/fcb.svg', displayOrder: 15 },
  { name: 'NMB', imageUrl: '/client-logos/nmb.svg', displayOrder: 16 },
  { name: 'SAMANA Developers', imageUrl: '/client-logos/samana.svg', displayOrder: 17 },
  { name: 'DAMAC', imageUrl: '/client-logos/damac.svg', displayOrder: 18 },
  { name: 'Ellington Properties', imageUrl: '/client-logos/ellington.svg', displayOrder: 19 },
  { name: 'UAE Ministry of Finance', imageUrl: '/client-logos/uae-mof.svg', displayOrder: 20 },
  { name: 'Ajman DED', imageUrl: '/client-logos/ajman-ded.svg', displayOrder: 21 },
  { name: 'Environment Agency Abu Dhabi', imageUrl: '/client-logos/ead.svg', displayOrder: 22 },
  { name: 'Dell Technologies', imageUrl: '/client-logos/dell.svg', displayOrder: 23 },
  { name: 'MORO HUB', imageUrl: '/client-logos/moro-hub.svg', displayOrder: 24 },
  { name: 'Liquid Telecom', imageUrl: '/client-logos/liquid-telecom.svg', displayOrder: 25 },
];

// ─── PARTNER LOGOS ─── 45 Strategic Partners (from screenshots)
const partnerData = [
  // Featured 5
  { name: 'OpenText', imageUrl: '/partner-logos/opentext.svg', category: 'Enterprise Software', description: 'Enterprise Content Management leader', tier: 'Gold', displayOrder: 1, isFeatured: true },
  { name: 'UiPath', imageUrl: '/partner-logos/uipath.svg', category: 'Automation', description: 'RPA and intelligent automation platform', tier: 'Diamond', displayOrder: 2, isFeatured: true },
  { name: 'Oracle', imageUrl: '/partner-logos/oracle.svg', category: 'Hyper Scalers', description: 'Database, cloud infrastructure, ERP', tier: 'Diamond', displayOrder: 3, isFeatured: true },
  { name: 'UnifyApps', imageUrl: '/partner-logos/unifyapps.svg', category: 'Regional & Emerging', description: 'Enterprise integration platform', tier: 'Premier', displayOrder: 4, isFeatured: true },
  { name: 'Microsoft', imageUrl: '/partner-logos/microsoft.svg', category: 'Hyper Scalers', description: 'Azure, M365, Power Platform, Dynamics', tier: 'Gold', displayOrder: 5, isFeatured: true },
  // Hyper Scalers
  { name: 'AWS', imageUrl: '/partner-logos/aws.svg', category: 'Hyper Scalers', description: 'Cloud computing platform', tier: 'Advanced', displayOrder: 6, isFeatured: false },
  { name: 'IBM', imageUrl: '/partner-logos/ibm.svg', category: 'Hyper Scalers', description: 'Hybrid cloud and AI solutions', tier: 'Gold', displayOrder: 7, isFeatured: false },
  { name: 'DELL Technologies', imageUrl: '/partner-logos/dell.svg', category: 'Hyper Scalers', description: 'Infrastructure and cloud solutions', tier: 'Premier', displayOrder: 8, isFeatured: false },
  { name: 'Google Cloud', imageUrl: '/partner-logos/google-cloud.svg', category: 'Hyper Scalers', description: 'AI-first cloud platform', tier: 'Premier', displayOrder: 9, isFeatured: false },
  // Enterprise Software
  { name: 'Varicent', imageUrl: '/partner-logos/varicent.svg', category: 'Enterprise Software', description: 'Sales performance management', tier: 'Partner', displayOrder: 10, isFeatured: false },
  { name: 'MicroFocus', imageUrl: '/partner-logos/microfocus.svg', category: 'Enterprise Software', description: 'Application modernization and security', tier: 'Gold', displayOrder: 11, isFeatured: false },
  { name: 'NUiX', imageUrl: '/partner-logos/nuix.svg', category: 'Enterprise Software', description: 'eDiscovery and regulatory compliance', tier: 'Partner', displayOrder: 12, isFeatured: false },
  { name: 'Jedox', imageUrl: '/partner-logos/jedox.svg', category: 'Enterprise Software', description: 'Enterprise performance management', tier: 'Partner', displayOrder: 13, isFeatured: false },
  { name: 'Eccentex', imageUrl: '/partner-logos/eccentex.svg', category: 'Enterprise Software', description: 'Low-code case management', tier: 'Partner', displayOrder: 14, isFeatured: false },
  { name: 'Exalogic', imageUrl: '/partner-logos/exalogic.svg', category: 'Enterprise Software', description: 'Enterprise integration middleware', tier: 'Partner', displayOrder: 15, isFeatured: false },
  { name: 'FinexCore', imageUrl: '/partner-logos/finexcore.svg', category: 'Enterprise Software', description: 'Core banking fintech platform', tier: 'Partner', displayOrder: 16, isFeatured: false },
  { name: 'Orbus', imageUrl: '/partner-logos/orbus.svg', category: 'Enterprise Software', description: 'Enterprise architecture platform', tier: 'Partner', displayOrder: 17, isFeatured: false },
  { name: 'Quest', imageUrl: '/partner-logos/quest.svg', category: 'Enterprise Software', description: 'Database management and data protection', tier: 'Partner', displayOrder: 18, isFeatured: false },
  { name: 'Alvaria', imageUrl: '/partner-logos/alvaria.svg', category: 'Enterprise Software', description: 'Workforce engagement management', tier: 'Partner', displayOrder: 19, isFeatured: false },
  { name: 'App Dynamics', imageUrl: '/partner-logos/appdynamics.svg', category: 'Enterprise Software', description: 'Application performance monitoring', tier: 'Partner', displayOrder: 20, isFeatured: false },
  { name: 'Ascertia', imageUrl: '/partner-logos/ascertia.svg', category: 'Enterprise Software', description: 'Digital signature and PKI solutions', tier: 'Partner', displayOrder: 21, isFeatured: false },
  { name: '7 Layers', imageUrl: '/partner-logos/7layers.svg', category: 'Enterprise Software', description: 'Security testing and compliance', tier: 'Partner', displayOrder: 22, isFeatured: false },
  // Cyber Security
  { name: 'CrowdStrike', imageUrl: '/partner-logos/crowdstrike.svg', category: 'Cyber Security', description: 'Cloud-native endpoint security', tier: 'Elite', displayOrder: 23, isFeatured: false },
  { name: 'Forescout', imageUrl: '/partner-logos/forescout.svg', category: 'Cyber Security', description: 'Asset discovery and risk response', tier: 'Partner', displayOrder: 24, isFeatured: false },
  { name: 'Tenable', imageUrl: '/partner-logos/tenable.svg', category: 'Cyber Security', description: 'Vulnerability management', tier: 'Premier', displayOrder: 25, isFeatured: false },
  { name: 'Trend Micro', imageUrl: '/partner-logos/trendmicro.svg', category: 'Cyber Security', description: 'Cloud security and endpoint protection', tier: 'Partner', displayOrder: 26, isFeatured: false },
  { name: 'SecureWorks', imageUrl: '/partner-logos/secureworks.svg', category: 'Cyber Security', description: 'Managed security services', tier: 'Partner', displayOrder: 27, isFeatured: false },
  { name: 'SEnzy', imageUrl: '/partner-logos/senzy.svg', category: 'Cyber Security', description: 'AI-powered security analytics', tier: 'Partner', displayOrder: 28, isFeatured: false },
  // Automation
  { name: 'Nintex', imageUrl: '/partner-logos/nintex.svg', category: 'Automation', description: 'Process management automation', tier: 'Partner', displayOrder: 29, isFeatured: false },
  { name: 'Tungsten', imageUrl: '/partner-logos/tungsten.svg', category: 'Automation', description: 'Intelligent document processing', tier: 'Partner', displayOrder: 30, isFeatured: false },
  { name: 'Automation Anywhere', imageUrl: '/partner-logos/automation-anywhere.svg', category: 'Automation', description: 'Cloud-native RPA platform', tier: 'Gold', displayOrder: 31, isFeatured: false },
  { name: 'My Gate Pass', imageUrl: '/partner-logos/mygatepass.svg', category: 'Automation', description: 'Digital visitor management', tier: 'Partner', displayOrder: 32, isFeatured: false },
  { name: 'Tricentis', imageUrl: '/partner-logos/tricentis.svg', category: 'Automation', description: 'Continuous testing platform', tier: 'Partner', displayOrder: 33, isFeatured: false },
  // Infrastructure & Networking
  { name: 'CISCO', imageUrl: '/partner-logos/cisco.svg', category: 'Infrastructure & Networking', description: 'Enterprise networking and security', tier: 'Partner', displayOrder: 34, isFeatured: false },
  { name: 'Mirantis', imageUrl: '/partner-logos/mirantis.svg', category: 'Infrastructure & Networking', description: 'Kubernetes and cloud-native platform', tier: 'Partner', displayOrder: 35, isFeatured: false },
  { name: 'FME', imageUrl: '/partner-logos/fme.svg', category: 'Infrastructure & Networking', description: 'Data integration and transformation', tier: 'Partner', displayOrder: 36, isFeatured: false },
  { name: 'Grafana', imageUrl: '/partner-logos/grafana.svg', category: 'Infrastructure & Networking', description: 'Open-source analytics and monitoring', tier: 'Partner', displayOrder: 37, isFeatured: false },
  { name: 'Bureau Veritas', imageUrl: '/partner-logos/bureau-veritas.svg', category: 'Infrastructure & Networking', description: 'Testing, inspection, certification', tier: 'Partner', displayOrder: 38, isFeatured: false },
  // Regional & Emerging
  { name: 'G42', imageUrl: '/partner-logos/g42.svg', category: 'Regional & Emerging', description: 'UAE AI and cloud computing', tier: 'Partner', displayOrder: 39, isFeatured: false },
  { name: 'MORO', imageUrl: '/partner-logos/moro.svg', category: 'Regional & Emerging', description: 'Data center and cloud services', tier: 'Partner', displayOrder: 40, isFeatured: false },
  { name: 'Infosys', imageUrl: '/partner-logos/infosys.svg', category: 'Regional & Emerging', description: 'Global IT consulting', tier: 'Partner', displayOrder: 41, isFeatured: false },
  { name: 'Accenture', imageUrl: '/partner-logos/accenture.svg', category: 'Regional & Emerging', description: 'Global professional services', tier: 'Partner', displayOrder: 42, isFeatured: false },
  { name: 'Ingrammicro', imageUrl: '/partner-logos/ingrammicro.svg', category: 'Regional & Emerging', description: 'Technology distributor', tier: 'Partner', displayOrder: 43, isFeatured: false },
  { name: 'Innovations', imageUrl: '/partner-logos/innovations.svg', category: 'Regional & Emerging', description: 'Regional IT solutions provider', tier: 'Partner', displayOrder: 44, isFeatured: false },
  { name: 'Spitch', imageUrl: '/partner-logos/spitch.svg', category: 'Regional & Emerging', description: 'Conversational AI and voice biometrics', tier: 'Partner', displayOrder: 45, isFeatured: false },
];

// ─── SITE IMAGES ───
const siteImageData = [
  { key: 'hero-bg', name: 'Hero Background', imageUrl: '/hero-bg.jpg', section: 'home', description: 'Homepage hero section background' },
  { key: 'about-hero', name: 'About Hero', imageUrl: '/about-hero.jpg', section: 'about', description: 'About page hero background' },
  { key: 'about-ai', name: 'About AI', imageUrl: '/about-ai.jpg', section: 'about', description: 'Agentic AI section image' },
  { key: 'about-partners', name: 'About Partners', imageUrl: '/about-partners.jpg', section: 'about', description: 'Partners section image' },
  { key: 'services-hero', name: 'Services Hero', imageUrl: '/services-hero.jpg', section: 'services', description: 'Services page hero background' },
  { key: 'solutions-hero', name: 'Solutions Hero', imageUrl: '/solutions-hero.jpg', section: 'solutions', description: 'Solutions page hero background' },
  { key: 'industries-hero', name: 'Industries Hero', imageUrl: '/industries-hero.jpg', section: 'industries', description: 'Industries page hero background' },
  { key: 'industry-banking', name: 'Banking Industry', imageUrl: '/industry-banking.jpg', section: 'industries', description: 'Banking sector image' },
  { key: 'industry-telecom', name: 'Telecom Industry', imageUrl: '/industry-telecom.jpg', section: 'industries', description: 'Telecom sector image' },
  { key: 'industry-government', name: 'Government Industry', imageUrl: '/industry-government.jpg', section: 'industries', description: 'Government sector image' },
  { key: 'industry-energy', name: 'Energy Industry', imageUrl: '/industry-energy.jpg', section: 'industries', description: 'Energy sector image' },
  { key: 'industry-realestate', name: 'Real Estate Industry', imageUrl: '/industry-realestate.jpg', section: 'industries', description: 'Real estate sector image' },
  { key: 'industry-insurance', name: 'Insurance Industry', imageUrl: '/industry-insurance.jpg', section: 'industries', description: 'Insurance sector image' },
  { key: 'content-intelligence', name: 'Content Intelligence', imageUrl: '/content-intelligence.jpg', section: 'services', description: 'Content & document intelligence' },
  { key: 'ai-automation', name: 'AI & Automation', imageUrl: '/ai-automation.jpg', section: 'services', description: 'GenAI and automation services' },
  { key: 'cloud-security', name: 'Cloud & Security', imageUrl: '/cloud-security.jpg', section: 'services', description: 'Cloud and cybersecurity services' },
  { key: 'data-analytics', name: 'Data & Analytics', imageUrl: '/data-analytics.jpg', section: 'services', description: 'Data and analytics services' },
];

async function seed() {
  console.log("Seeding database...");

  // Seed client logos
  console.log("Seeding client logos...");
  for (const client of clientData) {
    await db.insert(clientLogos).values(client);
  }
  console.log(`  -> ${clientData.length} client logos seeded`);

  // Seed partner logos
  console.log("Seeding partner logos...");
  for (const partner of partnerData) {
    await db.insert(partnerLogos).values(partner);
  }
  console.log(`  -> ${partnerData.length} partner logos seeded`);

  // Seed site images
  console.log("Seeding site images...");
  for (const img of siteImageData) {
    await db.insert(siteImages).values(img);
  }
  console.log(`  -> ${siteImageData.length} site images seeded`);

  console.log("Seeding complete!");
}

seed().catch(console.error);
