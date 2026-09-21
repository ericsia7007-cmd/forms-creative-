import Hero from './components/Hero'
import Weddings from './components/Weddings'
import WeddingGallery from './components/WeddingGallery'
import Contact from './components/Contact'
import Chinese from './components/Chinese'
import About from './components/About'
import { weddings } from './data/photos'
import { useReveal } from './useReveal'

// The prerender passes the path in; in the browser nothing does, and the
// default reads it off the location. Keeping window out of the render body is
// what lets this same component run under react-dom/server at build time.
export default function App({ path = window.location.pathname }: { path?: string }) {
  useReveal()
  const clean = path.replace(/\/$/, '')
  const galleryWedding = weddings.find((wedding) => wedding.gallerySlug && clean === `/weddings/${wedding.gallerySlug}`)
  if (galleryWedding) {
    return <WeddingGallery wedding={galleryWedding} />
  }
  if (clean === '/zh') {
    return <Chinese />
  }
  if (clean === '/about') {
    return <About lang="en" />
  }
  if (clean === '/zh/about') {
    return <About lang="zh" />
  }

  return (
    <>
      <Hero />
      <Weddings />
      <Contact />
    </>
  )
}
