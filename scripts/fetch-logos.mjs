// Fetch real brand marks for Aptiva clients & partners into /public/logos.
// Strategy: prefer crisp Simple Icons SVG (global brands), fall back to the
// brand's real favicon (sz=256) for regional brands. Writes a manifest the
// app reads at build time. Run: node scripts/fetch-logos.mjs
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const OUT = new URL('../public/logos/', import.meta.url)
await mkdir(OUT, { recursive: true })

// slug | display name | domain | simpleicons slug (optional)
const BRANDS = [
  // ---- Clients ----
  ['etisalat', 'Etisalat (e&)', 'eand.com'],
  ['fab', 'First Abu Dhabi Bank', 'bankfab.com'],
  ['det', 'Dubai Economy & Tourism', 'visitdubai.com'],
  ['aldar', 'Aldar Properties', 'aldar.com'],
  ['enec', 'Emirates Nuclear Energy', 'enec.gov.ae'],
  ['etihad-rail', 'Etihad Rail', 'etihadrail.ae'],
  ['daman', 'Daman Health', 'damanhealth.ae'],
  ['mashreq', 'Mashreq Bank', 'mashreq.com'],
  ['rakbank', 'RAKBANK', 'rakbank.ae'],
  ['nbf', 'National Bank of Fujairah', 'nbf.ae'],
  ['oab', 'Oman Arab Bank', 'oman-arabbank.com'],
  ['im-bank', 'I&M Bank', 'imbankgroup.com'],
  ['dtb', 'Diamond Trust Bank', 'dtbafrica.com'],
  ['dahabshiil', 'Dahabshiil Bank', 'dahabshiilbank.com'],
  ['fcb', 'First Capital Bank', 'firstcapitalbank.co.mw'],
  ['nmb', 'NMB Bank', 'nmbtz.com'],
  ['samana', 'SAMANA Developers', 'samanadevelopers.com'],
  ['damac', 'DAMAC', 'damacproperties.com'],
  ['ellington', 'Ellington Properties', 'ellingtonproperties.ae'],
  ['mof', 'UAE Ministry of Finance', 'mof.gov.ae'],
  ['ajman-ded', 'Ajman DED', 'ajmanded.gov.ae'],
  ['ead', 'Environment Agency Abu Dhabi', 'ead.gov.ae'],
  ['dell', 'Dell Technologies', 'dell.com', 'dell'],
  ['moro', 'MORO HUB', 'morohub.com'],
  ['liquid', 'Liquid Intelligent Tech', 'liquid.tech'],

  // ---- Partners (global tech) ----
  ['microsoft', 'Microsoft', 'microsoft.com'],
  ['aws', 'AWS', 'aws.amazon.com', 'amazonwebservices'],
  ['google-cloud', 'Google Cloud', 'cloud.google.com', 'googlecloud'],
  ['oracle', 'Oracle', 'oracle.com', 'oracle'],
  ['ibm', 'IBM', 'ibm.com', 'ibm'],
  ['opentext', 'OpenText', 'opentext.com'],
  ['uipath', 'UiPath', 'uipath.com', 'uipath'],
  ['cisco', 'Cisco', 'cisco.com', 'cisco'],
  ['crowdstrike', 'CrowdStrike', 'crowdstrike.com', 'crowdstrike'],
  ['tenable', 'Tenable', 'tenable.com', 'tenable'],
  ['trendmicro', 'Trend Micro', 'trendmicro.com', 'trendmicro'],
  ['grafana', 'Grafana', 'grafana.com', 'grafana'],
  ['tricentis', 'Tricentis', 'tricentis.com'],
  ['nintex', 'Nintex', 'nintex.com'],
  ['automationanywhere', 'Automation Anywhere', 'automationanywhere.com'],
  ['accenture', 'Accenture', 'accenture.com', 'accenture'],
  ['infosys', 'Infosys', 'infosys.com', 'infosys'],
  ['quest', 'Quest', 'quest.com'],
  ['forescout', 'Forescout', 'forescout.com'],
  ['secureworks', 'Secureworks', 'secureworks.com'],
  ['mirantis', 'Mirantis', 'mirantis.com'],
  ['ingrammicro', 'Ingram Micro', 'ingrammicro.com'],
  ['g42', 'G42', 'g42.ai'],
  ['varicent', 'Varicent', 'varicent.com'],
  ['microfocus', 'OpenText (Micro Focus)', 'microfocus.com'],
  ['nuix', 'Nuix', 'nuix.com'],
  ['jedox', 'Jedox', 'jedox.com'],
  ['appdynamics', 'AppDynamics', 'appdynamics.com'],
  ['ascertia', 'Ascertia', 'ascertia.com'],
  ['spitch', 'Spitch', 'spitch.ai'],
  ['unifyapps', 'UnifyApps', 'unifyapps.com'],
  ['orbus', 'Orbus Software', 'orbussoftware.com'],
  ['eccentex', 'Eccentex', 'eccentex.com'],
  ['tungsten', 'Tungsten Automation', 'tungstenautomation.com'],
  ['bureauveritas', 'Bureau Veritas', 'bureauveritas.com'],
]

async function get(url) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 15000)
  try {
    const r = await fetch(url, { signal: ctrl.signal, redirect: 'follow' })
    if (!r.ok) return null
    return Buffer.from(await r.arrayBuffer())
  } catch { return null } finally { clearTimeout(t) }
}

const manifest = {}
let ok = 0, fail = 0
for (const [slug, name, domain, si] of BRANDS) {
  let file = null, buf = null
  if (si) {
    buf = await get(`https://cdn.simpleicons.org/${si}`)
    if (buf && buf.length > 200) file = `${slug}.svg`
  }
  if (!buf) {
    buf = await get(`https://www.google.com/s2/favicons?domain=${domain}&sz=256`)
    if (buf && buf.length > 120) file = `${slug}.png`
  }
  if (buf && file) {
    await writeFile(new URL(file, OUT), buf)
    manifest[slug] = { name, file: `/logos/${file}`, domain }
    ok++
    process.stdout.write(`✓ ${slug.padEnd(20)} ${file}\n`)
  } else {
    manifest[slug] = { name, file: null, domain }
    fail++
    process.stdout.write(`· ${slug.padEnd(20)} (monogram fallback)\n`)
  }
}
await writeFile(new URL('manifest.json', OUT), JSON.stringify(manifest, null, 2))
console.log(`\nDone. ${ok} fetched, ${fail} fallback. Manifest: public/logos/manifest.json`)
