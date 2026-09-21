import type { Wedding } from '../data/photos'

export default function WeddingCredits({ wedding }: { wedding: Wedding }) {
  if (!wedding.credit) return null

  return (
    <p className="reveal mt-4 text-[0.8125rem] font-medium tracking-[-0.014em] text-muted">
      Video{' '}
      <a
        href={wedding.credit.videoUrl}
        target="_blank"
        rel="noreferrer"
        className="text-ink underline decoration-black/20 underline-offset-4 transition-opacity hover:opacity-60"
      >
        {wedding.credit.video}
      </a>
      {' · '}Photo{' '}
      <a
        href={wedding.credit.photoUrl}
        target="_blank"
        rel="noreferrer"
        className="text-ink underline decoration-black/20 underline-offset-4 transition-opacity hover:opacity-60"
      >
        {wedding.credit.photo}
      </a>
    </p>
  )
}
