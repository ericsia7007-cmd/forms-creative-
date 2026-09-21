// Renders every route to static HTML after `vite build`.
//
// The site is a client-rendered SPA, so without this step the server hands
// every URL the same empty <div id="root"> and the same <title>. Google runs
// JS and recovers; the crawlers behind AI answers mostly do not, and a
// canonical pointing at "/" was telling Google the gallery pages were
// duplicates of the home page. Each page now ships its own head and body.
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, '.ssr-build')

// A second, Node-targeted build of the same components.
execFileSync(
  'npx',
  ['vite', 'build', '--ssr', 'src/entry-server.tsx', '--outDir', '.ssr-build', '--logLevel', 'warn'],
  { cwd: root, stdio: 'inherit' },
)

const { render, pages, SITE } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')))

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const urlOf = (path) => SITE + path

function head(page) {
  const url = urlOf(page.path)
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="Forms Creative Studio" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:image" content="${SITE}/og.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Forms Creative Studio" />`,
    `<meta property="og:locale" content="en_MY" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${SITE}/og.jpg" />`,
    // Tells Google these are the same page in two languages, which is what
    // routes a Chinese query to /zh without putting Chinese on the English one.
    ...(page.alternates ?? []).map(
      (a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${urlOf(a.path)}" />`,
    ),
    ...page.schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`),
  ]
    .map((tag) => '    ' + tag)
    .join('\n')
}

const SEO = /<!--seo-->[\s\S]*?<!--\/seo-->/
const ROOT = '<div id="root"></div>'

for (const page of pages) {
  if (!SEO.test(template) || !template.includes(ROOT)) {
    throw new Error('index.html no longer has the <!--seo--> markers or an empty #root')
  }
  const html = template
    .replace('<html lang="en">', `<html lang="${page.lang ?? 'en'}">`)
    .replace(SEO, `<!--seo-->\n${head(page)}\n    <!--/seo-->`)
    .replace(ROOT, `<div id="root">${render(page.path)}</div>`)

  const file = page.path === '/' ? join(dist, 'index.html') : join(dist, page.path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${urlOf(p.path)}</loc><lastmod>${today}</lastmod>` +
      `<priority>${p.path === '/' ? '1.0' : '0.8'}</priority></url>`,
  )
  .join('\n')}
</urlset>
`,
)

// An AI crawler that will not run JS still reads this. It is the same facts as
// the pages, in the plainest form they can be quoted from.
writeFileSync(
  join(dist, 'llms.txt'),
  `# Forms Creative Studio

> Wedding films and photography in Sibu, Sarawak, Malaysia. Directed by Colin
> Wee (@colin_wee0904). Actual day, ROM and proposal coverage across Sarawak,
> open for destination bookings.

Forms Creative Studio is a wedding videography and photography studio based in
Sibu, Sarawak. Colin Wee directs and films; on collaborations the stills are
credited to the photographer who shot them.

## Weddings

${pages
  .filter((p) => p.path.startsWith('/weddings/'))
  // The description opens with the couple, which is already the link text.
  .map((p) => `- [${p.title.split(' — ')[0]}](${urlOf(p.path)}) — ${p.description.replace(/^.*? — /, '')}`)
  .join('\n')}

## 中文

诗巫婚礼摄影与录影。Forms Creative Studio 是一间位于砂拉越诗巫的婚礼影像工作室，
由 Colin Wee 主理，拍正日（actual day）、注册（ROM）与求婚，摄影与录影都做。
服务诗巫及砂拉越各地，也接外地婚礼。中文页：${SITE}/zh

## Contact

- WhatsApp: +60 11-5627 9155
- Instagram: https://www.instagram.com/forms_creative/
- Director: Colin Wee, https://www.instagram.com/colin_wee0904/
- Based in Sibu, Sarawak, Malaysia
`,
)

rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${pages.length} pages, sitemap.xml and llms.txt`)
