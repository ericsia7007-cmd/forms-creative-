import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

const links = [
  { label: 'WhatsApp', value: '+60 11-5627 9155', href: 'https://wa.me/601156279155' },
  { label: 'Instagram', value: '@forms_creative', href: 'https://www.instagram.com/forms_creative/' },
  { label: 'Direction', value: '@colin_wee0904', href: 'https://www.instagram.com/colin_wee0904/' },
]

// Three states: collapsed flat on the floor, swelling up as an arc, then
// filling the block. The wordmark is white, so it is invisible on paper and
// gets revealed as the black climbs past it.
const SUNK = 'M 0 100 V 100 Q 50 100 100 100 V 100 z'
const ARCHED = 'M 0 100 V 50 Q 50 0 100 50 V 100 z'
const FLAT = 'M 0 100 V 0 Q 50 0 100 0 V 100 z'

export default function Contact() {
  const frame = useRef<HTMLDivElement>(null)
  const path = useRef<SVGPathElement>(null)

  // Scrubbed to scroll position rather than fired once, so the black rises
  // with the page instead of animating past you.
  useEffect(() => {
    const line = path.current
    const block = frame.current
    if (!line || !block) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      line.setAttribute('d', FLAT)
      return
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: block,
            // This block ends the page, so its bottom can never reach the
            // viewport bottom — anchoring the end there leaves the timeline
            // unfinished and thrashing. Track the top edge instead.
            start: 'top bottom',
            end: 'top 25%',
            scrub: 0.4,
          },
        })
        .to(line, { morphSVG: ARCHED, ease: 'power2.in' })
        .to(line, { morphSVG: FLAT, ease: 'power2.out' })
    }, block)
    return () => ctx.revert()
  }, [])

  return (
    <footer id="contact" className="px-5 pt-24 sm:px-20 sm:pt-32">
      <div className="reveal mx-auto max-w-[27rem] text-center">
        <h2 className="font-display text-[clamp(2.25rem,4.17vw,3.75rem)] leading-[1.02] tracking-[-0.01em]">
          Let’s forms
        </h2>
        <p className="mt-5 text-[1.125rem] font-medium leading-[1.5] tracking-[-0.028em] text-muted">
          Tell us the date, the place, and a little about the two of you.
        </p>
        <p className="mt-3 font-cjk text-[1rem] leading-[1.6] text-muted">
          告诉我们日期、地点，还有你们俩的故事。
        </p>
        <p className="mt-8 text-[0.875rem] font-medium tracking-[-0.014em]">
          Open for destination bookings
        </p>
      </div>

      <ul className="reveal mx-auto mt-14 max-w-[34rem] border-t border-black/10">
        {links.map((l) => (
          <li key={l.label} className="border-b border-black/10">
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-6 py-4 text-[0.875rem] font-medium tracking-[-0.014em] transition-opacity hover:opacity-50"
            >
              <span className="text-muted">{l.label}</span>
              <span>{l.value}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-24 flex max-w-[87.5rem] flex-wrap items-center justify-between gap-3 text-[0.75rem] font-medium text-muted">
        <span>Forms Creative Studio</span>
        <span>Sibu, Sarawak · {new Date().getFullYear()}</span>
      </div>

      {/* The wordmark sits on top; the rising black is what makes it visible. */}
      <div ref={frame} className="relative -mx-5 mt-20 sm:-mx-20 sm:mt-24">
        <svg
          className="absolute inset-0 h-full w-full fill-ink"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path ref={path} d={SUNK} />
        </svg>
        <div className="relative px-5 pt-24 pb-14 sm:px-20 sm:pt-28 sm:pb-16">
          <img
            src="/logo-light.png"
            alt="Forms Creative Studio"
            className="mx-auto w-[min(78vw,54rem)] select-none"
          />
        </div>
      </div>

    </footer>
  )
}
