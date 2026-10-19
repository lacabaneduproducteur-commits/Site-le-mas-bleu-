// Génère une page HTML statique par route (SEO) à partir du rendu serveur.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const { render, paths } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const SITE = 'https://ylec-clim.fr'

const write = (url, file) => {
  const { html, head } = render(url)
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
  const out = resolve(dist, file)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, page)
  console.log('  ✓', url, '→', file)
}

for (const p of paths) write(p, p === '/' ? 'index.html' : `${p.slice(1)}/index.html`)
write('/404', '404.html')

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('  ✓ sitemap.xml')
