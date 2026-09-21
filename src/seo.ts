import { weddings, type Wedding } from './data/photos'

/**
 * Absolute, because crawlers and WhatsApp both resolve these from elsewhere.
 * Every canonical, hreflang, share card, sitemap entry and JSON-LD id is built
 * from this one string — change it here and nowhere else. The project is also
 * still served at forms-creative.vercel.app; those pages now point here, which
 * is what tells Google which address is the real one.
 */
export const SITE = 'https://www.formscreativestudio.com'

const NAME = 'Forms Creative Studio'
const PHONE = '+60 11-5627 9155'
const IG = 'https://www.instagram.com/forms_creative/'
const IG_COLIN = 'https://www.instagram.com/colin_wee0904/'

export type Page = {
  path: string
  title: string
  description: string
  /** Goes on <html>. Only the Chinese page is not English. */
  lang?: string
  /**
   * Only the home page has a translation, so only it and /zh carry these.
   * Pointing gallery pages at /zh would claim an equivalence that isn't there.
   */
  alternates?: { hreflang: string; path: string }[]
  /** Rendered into the page as one <script type="application/ld+json"> each. */
  schemas: object[]
}

const pair = (en: string, zh: string) => [
  { hreflang: 'en', path: en },
  { hreflang: 'zh-Hans', path: zh },
  { hreflang: 'x-default', path: en },
]

const TRANSLATIONS = pair('/', '/zh')

/** "ROM · Sibu" reads as a label on the page but as noise in a title. */
const plain = (place: string) => place.replace(' · ', ', ')

const galleryUrl = (w: Wedding) => `${SITE}/weddings/${w.gallerySlug}`

function describe(w: Wedding) {
  const what = `${w.couple} — ${plain(w.place)}, ${w.year}. ${w.photos.length} photographs`
  // Say who shot what. On the collab sets the stills are not Colin's, and the
  // description is exactly the kind of text an AI answer quotes back.
  return w.credit
    ? `${what}. Wedding film by ${NAME} in Sibu, Sarawak; photography by ${w.credit.photo}.`
    : `${what} by ${NAME}, wedding films and photography in Sibu, Sarawak.`
}

const business = {
  '@type': 'ProfessionalService',
  '@id': `${SITE}/#business`,
  name: NAME,
  alternateName: 'Forms Creative',
  description:
    'Wedding films and photography in Sibu, Sarawak. Actual day, ROM and proposal coverage across Sarawak, open for destination bookings.',
  url: `${SITE}/`,
  image: `${SITE}/og.jpg`,
  logo: `${SITE}/logo-dark.png`,
  telephone: PHONE,
  // Locality only: Colin works on location and we have no street address to
  // state. Inventing one would be worse than leaving it out.
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sibu',
    addressRegion: 'Sarawak',
    addressCountry: 'MY',
  },
  // Named towns match what the About page says the studio travels to. They
  // are a willingness to travel, not a claim to have shot in each one.
  areaServed: [
    { '@type': 'City', name: 'Sibu' },
    { '@type': 'City', name: 'Sibu Jaya' },
    { '@type': 'City', name: 'Sarikei' },
    { '@type': 'City', name: 'Kuching' },
    { '@type': 'AdministrativeArea', name: 'Sarawak' },
    { '@type': 'Country', name: 'Malaysia' },
  ],
  knowsAbout: ['Wedding videography', 'Wedding photography', 'Proposal photography'],
  founder: { '@type': 'Person', name: 'Colin Wee', sameAs: IG_COLIN },
  sameAs: [IG, IG_COLIN],
}

const home: Page = {
  path: '/',
  title: `${NAME} — Wedding Films & Photography, Sibu Sarawak`,
  description:
    'Wedding films and photography in Sibu, Sarawak. Actual day, ROM and proposal coverage, directed by Colin Wee. Open for destination bookings.',
  alternates: TRANSLATIONS,
  schemas: [
    { '@context': 'https://schema.org', ...business },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `${SITE}/`,
      name: NAME,
      publisher: { '@id': `${SITE}/#business` },
    },
  ],
}

// Malaysian Chinese search Google in simplified characters, so this page is
// written in them. It is kept off the English pages' titles and share cards on
// purpose: hreflang is what routes a Chinese query here, and mixing the two
// would show Chinese in every WhatsApp forward, which is not what was wanted.
const chinese: Page = {
  path: '/zh',
  lang: 'zh-Hans',
  title: '诗巫婚礼摄影与录影 — Forms Creative Studio',
  description:
    '砂拉越诗巫的婚礼影像工作室，由 Colin Wee 主理。正日、注册（ROM）与求婚的摄影与录影，服务诗巫及砂拉越各地，也接外地婚礼。',
  alternates: TRANSLATIONS,
  schemas: [
    { '@context': 'https://schema.org', ...business, inLanguage: 'zh-Hans' },
  ],
}

const gallery = (w: Wedding): Page => ({
  path: `/weddings/${w.gallerySlug}`,
  title: `${w.couple} — ${plain(w.place)}, ${w.year} | ${NAME}`,
  description: describe(w),
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      '@id': `${galleryUrl(w)}#gallery`,
      name: `${w.couple} — ${plain(w.place)}, ${w.year}`,
      description: describe(w),
      url: galleryUrl(w),
      numberOfItems: w.photos.length,
      thumbnailUrl: `${SITE}${w.photos[0]}`,
      provider: { '@id': `${SITE}/#business` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Weddings', item: `${SITE}/#work` },
        { '@type': 'ListItem', position: 2, name: w.couple, item: galleryUrl(w) },
      ],
    },
  ],
})

// Said once, in two languages. The page itself holds the wording; these are
// what a search result and an AI answer quote, so they say the same things.
const ABOUT_EN =
  'Forms Creative Studio is a wedding videography and photography studio in Sibu, Sarawak, directed by Colin Wee. Actual day weddings, ROM registrations and proposals, across Sarawak and open for destination weddings.'
const ABOUT_ZH =
  'Forms Creative Studio 是位于马来西亚砂拉越诗巫的婚礼录影与摄影工作室，由 Colin Wee 主理、掌镜。拍正日（actual day）婚礼、注册（ROM）与求婚，服务诗巫、泗里街、古晋等砂拉越各地，也接外地婚礼。'

const aboutPage = (lang: 'en' | 'zh'): Page => ({
  path: lang === 'en' ? '/about' : '/zh/about',
  lang: lang === 'en' ? undefined : 'zh-Hans',
  title:
    lang === 'en'
      ? `About — ${NAME}, Wedding Films in Sibu Sarawak`
      : `关于 — 诗巫婚礼摄影与录影 ${NAME}`,
  description: lang === 'en' ? ABOUT_EN : ABOUT_ZH,
  alternates: pair('/about', '/zh/about'),
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      url: `${SITE}${lang === 'en' ? '/about' : '/zh/about'}`,
      name: lang === 'en' ? `About ${NAME}` : `关于 ${NAME}`,
      description: lang === 'en' ? ABOUT_EN : ABOUT_ZH,
      inLanguage: lang === 'en' ? 'en-MY' : 'zh-Hans',
      mainEntity: { '@id': `${SITE}/#business` },
    },
  ],
})

/** Every URL the site has. The sitemap, the prerender and llms.txt all read this. */
export const pages: Page[] = [
  home,
  ...weddings.filter((w) => w.gallerySlug).map(gallery),
  chinese,
  aboutPage('en'),
  aboutPage('zh'),
]
