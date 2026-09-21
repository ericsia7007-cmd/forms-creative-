import { renderToString } from 'react-dom/server'
import App from './App'

export { pages, SITE } from './seo'

/** Called once per route by scripts/prerender.mjs. */
export function render(path: string) {
  return renderToString(<App path={path} />)
}
