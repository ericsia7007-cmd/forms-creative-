export type Lang = 'en' | 'zh'

// Every claim here is something the site itself already evidences — the set
// credits, the watermarks, the places and years. Nothing about how long Colin
// has shot, how many weddings, or why he shoots the way he does: that has to
// come from him, and inventing a voice for a real person would be worse than
// sounding plain.
//
// The wording carries the terms people actually search — wedding videography,
// wedding photography, Sibu, Sarawak, actual day, ROM, proposal, destination —
// inside sentences that would be written that way regardless. Keywords bolted
// onto copy read as bolted on, and an AI answer quotes whole sentences.
const COPY = {
  en: {
    other: { href: '/zh/about', label: '中文' },
    home: '/',
    kicker: 'About',
    body: [
      'Forms Creative Studio is a wedding videography and photography studio in Sibu, Sarawak, Malaysia. Colin Wee directs and shoots.',
      'The studio covers actual day weddings, ROM registrations and proposals — wedding films, wedding photographs, or both together. Quiet coverage, close to the day as it happens, rather than a day arranged around the camera.',
      'Based in Sibu and available across Sarawak, from Sibu Jaya and Sarikei through to Kuching. Destination weddings beyond Sarawak are welcome.',
    ],
    facts: [
      ['Based', 'Sibu, Sarawak, Malaysia', ''],
      ['Covers', 'Actual day · ROM · Proposals', ''],
      ['Travels', 'Across Sarawak · Destination', ''],
      ['Director', 'Colin Wee', 'colin_wee0904'],
    ],
    cta: { href: '/#work', label: 'See the work' },
    enquiries: 'Enquiries',
  },
  zh: {
    other: { href: '/about', label: 'English' },
    home: '/zh',
    kicker: '关于',
    body: [
      'Forms Creative Studio 是一间位于马来西亚砂拉越诗巫的婚礼录影与摄影工作室，由 Colin Wee 主理、掌镜。',
      '拍摄正日（actual day）婚礼、注册（ROM）与求婚——婚礼录影、婚礼摄影，或两者兼顾。安静地贴着当天发生的事走，而不是让这一天围着镜头转。',
      '以诗巫为基地，砂拉越各地皆可前往，从诗巫再也、泗里街到古晋；砂拉越以外的外地（destination）婚礼同样欢迎询问。',
    ],
    facts: [
      ['所在', '马来西亚砂拉越诗巫', ''],
      ['拍摄', '正日 · 注册 ROM · 求婚', ''],
      ['服务范围', '砂拉越各地 · 外地婚礼', ''],
      ['主理', 'Colin Wee', 'colin_wee0904'],
    ],
    cta: { href: '/#work', label: '看作品' },
    enquiries: '询问',
  },
} as const

const link =
  'text-ink underline decoration-black/20 underline-offset-4 transition-opacity hover:opacity-60'

export default function About({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  // The reading text switches face with the language; the studio name never does.
  const prose = lang === 'zh' ? 'font-cjk leading-[1.9]' : 'leading-[1.7]'

  return (
    <main className="px-5 pb-24 sm:px-20 sm:pb-32">
      <div className="mx-auto max-w-[44rem]">
        <nav className="flex items-center justify-between gap-6 border-b border-black/10 py-6 text-[0.8125rem] font-medium sm:py-8">
          <a href={t.home} aria-label="Forms Creative Studio" className="shrink-0">
            <img src="/logo-dark.png" alt="Forms Creative Studio" className="w-24 sm:w-32" />
          </a>
          <a
            href={t.other.href}
            className={`${lang === 'en' ? 'font-cjk' : ''} underline-offset-4 transition-opacity hover:opacity-60 hover:underline`}
          >
            {t.other.label} ↗
          </a>
        </nav>

        <header className="pt-20 sm:pt-28">
          <p className={`${lang === 'zh' ? 'font-cjk' : ''} text-[0.875rem] font-medium tracking-[-0.014em] text-muted`}>
            {t.kicker}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1] tracking-[-0.02em]">
            Forms Creative Studio
          </h1>
        </header>

        <div className={`mt-10 space-y-5 text-[1rem] text-muted ${prose}`}>
          {t.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <dl className="mt-14 border-t border-black/10">
          {t.facts.map(([term, value, handle]) => (
            <div key={term} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-black/10 py-4 text-[0.875rem] font-medium tracking-[-0.014em]">
              <dt className={`${lang === 'zh' ? 'font-cjk' : ''} text-muted`}>{term}</dt>
              <dd className={lang === 'zh' ? 'font-cjk' : ''}>
                {value}
                {handle && (
                  <>
                    {' · '}
                    <a
                      href={`https://www.instagram.com/${handle}/`}
                      target="_blank"
                      rel="noreferrer"
                      className={link}
                    >
                      @{handle}
                    </a>
                  </>
                )}
              </dd>
            </div>
          ))}
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-black/10 py-4 text-[0.875rem] font-medium tracking-[-0.014em]">
            <dt className={`${lang === 'zh' ? 'font-cjk' : ''} text-muted`}>{t.enquiries}</dt>
            <dd>
              <a href="https://wa.me/601156279155" className={link}>
                +60 11-5627 9155
              </a>
              {' · '}
              <a href="https://www.instagram.com/forms_creative/" target="_blank" rel="noreferrer" className={link}>
                @forms_creative
              </a>
            </dd>
          </div>
        </dl>

        <a
          href={t.cta.href}
          className={`${lang === 'zh' ? 'font-cjk' : ''} group mt-14 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-[0.95rem] text-[0.875rem] font-medium text-white ring-1 ring-ink transition-colors duration-300 hover:bg-transparent hover:text-ink`}
        >
          {t.cta.label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </main>
  )
}
