import { useEffect } from 'react'
import type { Wedding } from '../data/photos'
import Contact from './Contact'
import WeddingCredits from './WeddingCredits'

export default function WeddingGallery({ wedding }: { wedding: Wedding }) {
  useEffect(() => {
    document.title = `${wedding.couple} — Forms Creative Studio`
  }, [wedding.couple])

  return (
    <>
      <main className="px-5 pb-24 sm:px-20 sm:pb-32">
        <div className="mx-auto max-w-[87.5rem]">
          <nav className="flex items-center justify-between gap-6 border-b border-black/10 py-6 text-[0.8125rem] font-medium sm:py-8">
            <a href="/#work" className="underline-offset-4 transition-opacity hover:opacity-60 hover:underline">
              ← Back to weddings
            </a>
            <a href="/" aria-label="Forms Creative Studio home" className="shrink-0">
              <img src="/logo-dark.png" alt="Forms Creative Studio" className="w-24 sm:w-32" />
            </a>
          </nav>

          <header className="reveal pb-8 pt-20 sm:pb-12 sm:pt-28">
            <p className="text-[0.875rem] font-medium text-muted">Wedding gallery</p>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <h1 className="font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.9] tracking-[-0.025em]">
                {wedding.couple}
              </h1>
              <p className="pb-1 text-[0.875rem] font-medium text-muted">
                {wedding.place} · {wedding.year} · {wedding.photos.length} photos
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wedding.photos.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`${wedding.couple}, photo ${index + 1} of ${wedding.photos.length}`}
                loading={index < 3 ? 'eager' : 'lazy'}
                className="reveal aspect-4/5 w-full rounded-3xl object-cover"
              />
            ))}
          </div>
          <WeddingCredits wedding={wedding} />
          <a
            href="/#work"
            className="mt-16 inline-flex rounded-full border border-black/20 px-7 py-3.5 text-[0.875rem] font-medium transition-colors hover:bg-ink hover:text-white"
          >
            ← Back to weddings
          </a>
        </div>
      </main>
      <Contact />
    </>
  )
}
