import { useState } from 'react'
import { weddings } from '../data/photos'
import ReelPlayer from './ReelPlayer'
import WeddingCredits from './WeddingCredits'

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

      {weddings.map((w) => {
        const preview = w.previewPhotos ?? w.photos.slice(0, 4)
        const tall = w.gallerySlug === 'benny-sherry'

        // The two sides are sized to end level with each other, so the column
        // ratio follows from their shapes. A 4:5 lead frame and a 2x2 of 4:5
        // frames are the same shape, so those two just split the row evenly.
        const columns = !w.reel
          ? 'md:grid-cols-2 md:items-start'
          : tall
            ? 'min-[560px]:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] min-[560px]:items-start'
            : 'md:grid-cols-[minmax(0,10fr)_minmax(0,9fr)]'

        return (
          <article key={w.couple} className="mx-auto mt-20 max-w-[87.5rem] sm:mt-24">
            <header className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-black/10 pb-4">
              <h3 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.1] tracking-[-0.02em]">
                {w.couple}
              </h3>
              <span className="text-[0.875rem] font-medium tracking-[-0.014em] text-muted">
                {w.year ? `${w.place} · ${w.year}` : w.place}
              </span>
            </header>

            {w.gallerySlug ? (
              <>
                <div
                  className={`mx-auto mt-5 grid max-w-[68rem] grid-cols-1 gap-2.5 ${columns}`}
                >
                  {w.reel ? (
                    <ReelPlayer
                      set={w}
                      flush
                      portrait={tall}
                      soundOn={soundOn}
                      onSound={setSoundOn}
                    />
                  ) : (
                    <img
                      src={w.previewFeature}
                      alt={`${w.couple}, from the gallery`}
                      loading="lazy"
                      className="aspect-4/5 w-full rounded-3xl object-cover"
                    />
                  )}
                  {/* Stacked, the block sets its own shape. Beside the reel it drops
                    the ratio and stretches to the reel's height instead, which is
                    why the frames are absolute — a tile that measured its own
                    image would push the row taller than the video. */}
                  <div
                    className={`grid auto-rows-fr grid-cols-2 gap-[3px] ${preview.length > 2 ? 'aspect-4/5' : 'aspect-[8/5]'} ${tall ? 'min-[560px]:aspect-square' : w.reel ? 'md:aspect-auto' : ''}`}
                    aria-label={`${w.couple} photo preview`}
                  >
                    {preview.map((src, photoIndex) => (
                      <div key={src} className="relative min-h-0 overflow-hidden rounded-[6px]">
                        <img
                          src={src}
                          alt={`${w.couple}, preview photo ${photoIndex + 1}`}
                          loading="lazy"
                          className={`absolute inset-0 h-full w-full object-cover ${w.previewCropTop?.includes(photoIndex) ? 'origin-top scale-[2.1] object-top md:scale-[1.65]' : w.previewZoom?.includes(photoIndex) ? 'scale-[1.15]' : ''}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <a
                    href={`/weddings/${w.gallerySlug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#aaa38f] px-7 py-3.5 text-[0.875rem] font-medium text-white transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                  >
                    View gallery <span aria-hidden="true">↗</span>
                  </a>
                  <span className="text-[0.8125rem] font-medium text-muted">
                    · {w.photos.length} photos
                  </span>
                </div>
              </>
            ) : (
              <>
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
                {/* The credit belongs with the frames it covers. A card shows
                    a handful as a teaser and carries it on the gallery page
                    instead; a set laid out in full here carries it here. */}
                <WeddingCredits wedding={w} />
              </>
            )}
          </article>
        )
      })}
    </section>
  )
}
