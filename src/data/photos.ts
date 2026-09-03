// Pulled from @forms_creative on Instagram (public embed endpoint), largest
// versions Instagram serves. Swap for Colin's own exports when you get them;
// only the filenames need to stay.
export type Wedding = {
  couple: string
  place: string
  year?: string
  reel?: string
  /** Seconds to start (and loop back) at — skips a slow intro. */
  reelStart?: number
  /**
   * Degrees to turn the reel. Instagram's progressive export for some reels
   * bakes a 90° turn into the pixels (tkhd matrix is identity, so no player
   * corrects it) — the frame arrives lying on its side.
   */
  reelRotate?: number
  photos: string[]
  /** Who did what — set only on collaborations. Video is listed first. */
  credit?: { video: string; videoUrl?: string; photo: string; photoUrl?: string }
}

const seq = (prefix: string, n: number, skip: number[] = []) =>
  Array.from({ length: n }, (_, i) => i + 1)
    .filter((i) => !skip.includes(i))
    .map((i) => `/photos/${prefix}${i}.jpg`)

// Dominic & Cassandra and Benny & Sherry are collab posts owned by
// @momentsby_paul — they carry a per-set credit that must stay while those
// photos are on the page. Lehwei & Celina and Lihong & YiiXiu are Colin's own,
// posted by @forms_creative and watermarked FORMS CREATIVE, so they carry none.
export const weddings: Wedding[] = [
  {
    couple: 'Dominic & Cassandra',
    place: 'Sarawak',
    year: '2026',
    reel: '/hero.mp4',
    photos: seq('cw', 14, [13, 14]),
    credit: {
      video: '@colin_wee0904',
      videoUrl: 'https://www.instagram.com/colin_wee0904/',
      photo: '@momentsby_paul',
      photoUrl: 'https://www.instagram.com/momentsby_paul/',
    },
  },
  {
    couple: 'Benny & Sherry',
    place: 'Sarawak × Hong Kong',
    year: '2026',
    reel: '/benny.mp4',
    reelStart: 5,
    reelRotate: -90,
    photos: seq('hk', 10, [9]),
    credit: {
      video: '@colin_wee0904',
      videoUrl: 'https://www.instagram.com/colin_wee0904/',
      photo: '@momentsby_paul',
      photoUrl: 'https://www.instagram.com/momentsby_paul/',
    },
  },
  {
    couple: 'Lehwei & Celina',
    place: 'Proposal',
    year: '2025',
    // Proposal-day frames in post order, then the lakeside set. pr6–pr8 were
    // pulled; px1, px3 and px5 are multi-frame layouts, kept by request.
    photos: [
      '/photos/px1.jpg',
      '/photos/px2.jpg',
      '/photos/px3.jpg',
      '/photos/px4.jpg',
      '/photos/px5.jpg',
      '/photos/px6.jpg',
      '/photos/px10.jpg',
      ...seq('pr', 5),
    ],
  },
  {
    couple: 'Lihong & YiiXiu',
    place: 'ROM · Sibu',
    year: '2024',
    // Two posts from the same ROM, merged. Ordered so stills, people and wide
    // shots alternate. Year is the date stamped on the frames (11/11/2024),
    // not the February 2025 post date. Left out: rb4 (white-background
    // three-up) and rb5 (two-up, repeats ro2's raised-hands shot).
    photos: [
      '/photos/ro1.jpg',
      '/photos/ro4.jpg',
      '/photos/rb1.jpg',
      '/photos/rb2.jpg',
      '/photos/ro2.jpg',
      '/photos/rb3.jpg',
      '/photos/ro5.jpg',
      '/photos/ro3.jpg',
      '/photos/ro6.jpg',
    ],
  },
]

// Still behind the hero reel while it loads.
export const heroStill = '/photos/wed1.jpg'
