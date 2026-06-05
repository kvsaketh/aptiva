import manifest from '../../public/logos/manifest.json'

export type Brand = { slug: string; name: string; file: string | null; domain: string }

const M = manifest as Record<string, { name: string; file: string | null; domain: string }>

export function brand(slug: string): Brand {
  const m = M[slug]
  return { slug, name: m?.name ?? slug, file: m?.file ?? null, domain: m?.domain ?? '' }
}
function many(slugs: string[]): Brand[] { return slugs.map(brand) }

/* ---- Clients ---- */
export const clients = many([
  'etisalat', 'fab', 'det', 'aldar', 'enec', 'etihad-rail', 'daman', 'mashreq',
  'rakbank', 'nbf', 'oab', 'im-bank', 'dtb', 'dahabshiil', 'fcb', 'nmb',
  'samana', 'damac', 'ellington', 'mof', 'ajman-ded', 'ead', 'moro', 'liquid',
])

/* ---- Partner groups ---- */
export const partnerGroups: { title: string; brands: Brand[] }[] = [
  { title: 'Hyperscalers & Cloud', brands: many(['microsoft', 'aws', 'google-cloud', 'oracle', 'ibm', 'mirantis']) },
  { title: 'Content, Data & EIM', brands: many(['opentext', 'microfocus', 'nuix', 'jedox', 'varicent', 'eccentex', 'orbus', 'quest']) },
  { title: 'AI & Automation', brands: many(['uipath', 'automationanywhere', 'nintex', 'tungsten', 'tricentis', 'unifyapps', 'spitch', 'g42']) },
  { title: 'Cybersecurity & Trust', brands: many(['crowdstrike', 'tenable', 'trendmicro', 'forescout', 'secureworks', 'ascertia', 'bureauveritas']) },
  { title: 'Infrastructure & Observability', brands: many(['cisco', 'dell', 'grafana', 'appdynamics', 'ingrammicro']) },
  { title: 'Global SIs & Regional', brands: many(['accenture', 'infosys', 'moro']) },
]

export const allPartners: Brand[] = partnerGroups.flatMap((g) => g.brands)
