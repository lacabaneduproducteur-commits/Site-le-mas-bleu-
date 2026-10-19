import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'
import { headTags, routes } from './content/seo'

export const paths = Object.keys(routes)
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={base + url} basename={base}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, head: headTags(url) }
}
