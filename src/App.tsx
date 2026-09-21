import Hero from './components/Hero'
import Weddings from './components/Weddings'
import WeddingGallery from './components/WeddingGallery'
import Contact from './components/Contact'
import { weddings } from './data/photos'
import { useReveal } from './useReveal'

export default function App() {
  useReveal()
  const path = window.location.pathname.replace(/\/$/, '')
  const galleryWedding = weddings.find((wedding) => wedding.gallerySlug && path === `/weddings/${wedding.gallerySlug}`)
  if (galleryWedding) {
    return <WeddingGallery wedding={galleryWedding} />
  }

  return (
    <>
      <Hero />
      <Weddings />
      <Contact />
    </>
  )
}
