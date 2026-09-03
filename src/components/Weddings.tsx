import { useState } from 'react'
import { weddings } from '../data/photos'
import ReelPlayer from './ReelPlayer'

export default function Weddings() {
  // Only one reel is audible at a time.
  const [soundOn, setSoundOn] = useState<string | null>(null)

  return (
    <section id="work" className="px-5 pt-24 pb-24 sm:px-20 sm:pt-32 sm:pb-32">
      <div className="reveal mx-auto max-w-[30rem] text-center">
        <p className="text-[0.875rem] font-medium tracking-[-0.014em] text-muted">Weddings</p>
        <h2 className="mt-4 font-display text-[clamp(2.25rem,4.17vw,3.75rem)] leading-[1.02] tracking-[-0.01em]">
          Stories told quietly, through real moments.
        </h2>
        <p className="mt-5 font-cjk text-[1rem] leading-[1.6] text-muted">
          安静地讲述，来自真实的瞬间
        </p>
      </div>

      {weddings.map((w) => (
        <article key={w.couple} className="mx-auto mt-20 max-w-[87.5rem] sm:mt-24">
          <header className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-black/10 pb-4">
            <h3 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.1] tracking-[-0.02em]">
              {w.couple}
            </h3>
            <span className="text-[0.875rem] font-medium tracking-[-0.014em] text-muted">
              {w.year ? `${w.place} · ${w.year}` : w.place}
            </span>
          </header>

          {w.reel && <ReelPlayer set={w} soundOn={soundOn} onSound={setSoundOn} />}

          {w.photos.length > 0 && (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {w.photos.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={w.couple}
                  loading="lazy"
                  className="reveal aspect-4/5 w-full rounded-3xl object-cover"
                />
              ))}
            </div>
          )}

          {w.credit && (
            <p className="reveal mt-4 text-[0.8125rem] font-medium tracking-[-0.014em] text-muted">
              Video{' '}
              <a
                href={w.credit.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-black/20 underline-offset-4 transition-opacity hover:opacity-60"
              >
                {w.credit.video}
              </a>
              {' · '}Photo{' '}
              <a
                href={w.credit.photoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-black/20 underline-offset-4 transition-opacity hover:opacity-60"
              >
                {w.credit.photo}
              </a>
            </p>
          )}
        </article>
      ))}
    </section>
  )
}
