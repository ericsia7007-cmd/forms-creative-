import Hero from './components/Hero'
import Weddings from './components/Weddings'
import Contact from './components/Contact'
import { useReveal } from './useReveal'

export default function App() {
  useReveal()
  return (
    <>
      <Hero />
      <Weddings />
      <Contact />
    </>
  )
}
