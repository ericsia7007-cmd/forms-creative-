import { useEffect, useRef } from 'react'
import type { Wedding } from '../data/photos'

type Props = {
  set: Wedding
  flush?: boolean
  portrait?: boolean
  /** Which set currently has sound — at most one on the page. */
  soundOn: string | null
  onSound: (couple: string | null) => void
}

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className="size-[1.05rem]" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      {on ? (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      ) : (
        <>
          <path d="m16 9 5 6" />
          <path d="m21 9-5 6" />
        </>
      )}
    </svg>
  )
}

export default function ReelPlayer({ set, flush = false, portrait = false, soundOn, onSound }: Props) {
  const video = useRef<HTMLVideoElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const on = soundOn === set.couple

  // React leaves `muted` on the DOM property, and doesn't reliably update it
  // after the first render — so drive it by hand.
  useEffect(() => {
    if (video.current) video.current.muted = !on
  }, [on])

  // Sound follows the viewport: scroll the reel away and it goes quiet again.
  useEffect(() => {
    const el = frame.current
    if (!on || !el) return
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && onSound(null), {
      threshold: 0.3,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [on, onSound])

  return (
    <div
      ref={frame}
      className={`relative w-full overflow-hidden rounded-3xl ${portrait ? 'aspect-[4/5]' : 'aspect-[16/9]'} ${flush ? '' : 'mt-5'}`}
    >
      {/* The frame crops the video to its chosen aspect ratio. When the picture
          is baked sideways, the video swaps the frame axes before rotation:
          each side is the percentage of the frame's *other* side, so the turned
          picture covers it exactly. max-w-none is load-bearing — preflight caps
          video at max-width:100%, which silently clamps any side over 100% and
          leaves the frame short. Looping returns to reelStart, not the intro. */}
      <video
        ref={video}
        className={
          set.reelRotate
            ? `absolute left-1/2 top-1/2 max-w-none object-cover ${portrait ? 'h-[80%] w-[125%]' : 'h-[177.78%] w-[56.25%]'}`
            : 'h-full w-full object-cover'
        }
        style={
          set.reelRotate
            ? { transform: `translate(-50%, -50%) rotate(${set.reelRotate}deg)` }
            : undefined
        }
        autoPlay
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => {
          e.currentTarget.currentTime = set.reelStart ?? 0
        }}
        onEnded={(e) => {
          e.currentTarget.currentTime = set.reelStart ?? 0
          void e.currentTarget.play()
        }}
      >
        <source src={set.reel} type="video/mp4" />
      </video>

      {set.reelUrl && (
        // The page carries a 15s cut; the full reel lives on the account it
        // came from, which is also where enquiries actually reach Colin.
        <a
          href={set.reelUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-4 py-3 text-[0.8125rem] font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:py-2.5"
        >
          Watch full film
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
          <span className="sr-only">on Instagram, opens in a new tab</span>
        </a>
      )}

      <button
        type="button"
        onClick={() => onSound(on ? null : set.couple)}
        aria-label={on ? `Mute ${set.couple}` : `Unmute ${set.couple}`}
        aria-pressed={on}
        className={`absolute right-4 grid size-11 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:size-9 ${portrait ? 'top-4' : 'bottom-4'}`}
      >
        <SpeakerIcon on={on} />
      </button>
    </div>
  )
}
