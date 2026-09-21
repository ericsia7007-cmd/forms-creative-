import { weddings } from '../data/photos'

// The English page labels, said the way people in Sibu would say them — and
// the way they would type them into Google.
const PLACE: Record<string, string> = {
  'Actual Day': '正日',
  Proposal: '求婚',
  'ROM · Sibu': '注册 · 诗巫',
}

const link =
  'text-ink underline decoration-black/20 underline-offset-4 transition-opacity hover:opacity-60'

export default function Chinese() {
  return (
    <main className="px-5 pb-24 sm:px-20 sm:pb-32">
      <div className="mx-auto max-w-[44rem]">
        <nav className="flex items-center justify-between gap-6 border-b border-black/10 py-6 text-[0.8125rem] font-medium sm:py-8">
          <a href="/" aria-label="Forms Creative Studio home" className="shrink-0">
            <img src="/logo-dark.png" alt="Forms Creative Studio" className="w-24 sm:w-32" />
          </a>
          <a href="/" className="underline-offset-4 transition-opacity hover:opacity-60 hover:underline">
            English ↗
          </a>
        </nav>

        <header className="pt-20 sm:pt-28">
          {/* The name stays in the display face; only the reading text is CJK,
              which is what keeps this page looking like the rest of the site. */}
          <p className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1] tracking-[-0.02em]">
            Forms Creative Studio
          </p>
          <h1 className="mt-4 font-cjk text-[clamp(1.25rem,2.6vw,1.75rem)] font-medium leading-[1.4] tracking-[0.02em]">
            诗巫婚礼摄影与录影
          </h1>
        </header>

        <div className="mt-10 space-y-5 font-cjk text-[1rem] leading-[1.9] text-muted">
          <p>
            Forms Creative Studio 是一间位于砂拉越诗巫的婚礼影像工作室，由 Colin Wee
            主理。我们拍正日（actual day）、注册（ROM），也拍求婚。
          </p>
          <p>
            摄影与录影都做。这个网站上的两场合作婚礼由 Colin
            负责录影，另外两组求婚与注册，则是他自己拍的照片。
          </p>
          <p>
            服务范围以诗巫为主，砂拉越各地皆可前往；外地（destination）婚礼同样欢迎询问。
          </p>
        </div>

        <h2 className="mt-16 font-cjk text-[1.125rem] font-medium tracking-[0.02em]">作品</h2>
        <ul className="mt-5 border-t border-black/10">
          {weddings
            .filter((w) => w.gallerySlug)
            .map((w) => (
              <li key={w.couple} className="border-b border-black/10">
                <a
                  href={`/weddings/${w.gallerySlug}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 transition-opacity hover:opacity-50"
                >
                  <span className="font-display text-[1.375rem] leading-[1.2] tracking-[-0.02em]">
                    {w.couple}
                  </span>
                  <span className="font-cjk text-[0.875rem] text-muted">
                    {PLACE[w.place] ?? w.place} · {w.year} · {w.photos.length} 张
                  </span>
                </a>
              </li>
            ))}
        </ul>

        <h2 className="mt-16 font-cjk text-[1.125rem] font-medium tracking-[0.02em]">联系</h2>
        <p className="mt-5 font-cjk text-[1rem] leading-[1.9] text-muted">
          告诉我们日期、地点，还有你们俩的故事。
          <br />
          WhatsApp{' '}
          <a href="https://wa.me/601156279155" className={link}>
            +60 11-5627 9155
          </a>
          ，或 Instagram{' '}
          <a href="https://www.instagram.com/forms_creative/" target="_blank" rel="noreferrer" className={link}>
            @forms_creative
          </a>
          。
        </p>

        <p className="mt-16 border-t border-black/10 pt-8 text-[0.75rem] font-medium text-muted">
          Forms Creative Studio · Sibu, Sarawak
        </p>
      </div>
    </main>
  )
}
