import { weddings, type Wedding } from './data/photos'

/** Absolute, because crawlers and WhatsApp both resolve these from elsewhere. */
export const SITE = 'https://forms-creative.vercel.app'

const NAME = 'Forms Creative Studio'
const PHONE = '+60 11-5627 9155'
const IG = 'https://www.instagram.com/forms_creative/'
const IG_COLIN = 'https://www.instagram.com/colin_wee0904/'

export type Page = {
  path: string
  title: string
  description: string
  /** Rendered into the page as one <script type="application/ld+json"> each. */
  schemas: object[]
}

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
  areaServed: [
    { '@type': 'City', name: 'Sibu' },
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

/** Every URL the site has. The sitemap, the prerender and llms.txt all read this. */
export const pages: Page[] = [
  home,
  ...weddings.filter((w) => w.gallerySlug).map(gallery),
]
