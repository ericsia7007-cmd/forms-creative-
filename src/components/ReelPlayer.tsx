import { useEffect, useRef } from 'react'
import type { Wedding } from '../data/photos'

type Props = {
  set: Wedding
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

export default function ReelPlayer({ set, soundOn, onSound }: Props) {
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
      className="reveal relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-3xl"
    >
      {/* Portrait reels are cropped to 16:9 by the frame. When the picture is
          baked sideways, the video takes the frame's swapped axes and turns
          back. Looping is manual so it returns to reelStart, not the intro. */}
      <video
        ref={video}
        className={
          set.reelRotate
            ? 'absolute left-1/2 top-1/2 h-[177.78%] w-[56.25%] object-cover'
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

      <button
        type="button"
        onClick={() => onSound(on ? null : set.couple)}
        aria-label={on ? `Mute ${set.couple}` : `Unmute ${set.couple}`}
        aria-pressed={on}
        className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:size-9"
      >
        <SpeakerIcon on={on} />
      </button>
    </div>
  )
}
