# Forms Creative Studio

One-page portfolio for Forms Creative Studio (@forms_creative), Sibu.
React + Vite + TypeScript + Tailwind v4. Layout, type scale, radii and spacing
are matched to park.photos (the reference site).

```bash
npm install
npm run dev
```

## Where the media came from

Everything in `public/` was pulled from the public Instagram embed endpoint for
@forms_creative — no login, no third-party stock. It is Colin's own work.

**Two limits worth knowing:**

1. **1440px ceiling.** Instagram re-encodes and caps uploads, so these are
   compressed derivatives, not the originals. Replace them with Colin's exports
   when you can — same filenames, nothing else changes.
2. **Only 9 of 48 posts.** Instagram's login wall stops the profile grid after
   the first batch, so the other 39 posts are out of reach without being signed
   in. What we got skews heavily toward one street-portrait shoot in Sibu.

### What shipped

`public/photos/` — 42 frames wired into `src/data/photos.ts`:

| Files | Set | Owner |
|---|---|---|
| `pr1–pr8` | **Lehwei & Celina** — proposal | **@forms_creative** — Colin's own, watermarked FORMS CREATIVE |
| `cw1–cw14` | **Dominic & Cassandra** — same wedding as the hero reel | @momentsby_paul (collab) |
| `hk1–hk10` | **Benny & Sherry** — Sarawak × Hong Kong | @momentsby_paul (collab) |
| `st1 · st5 · st7 · st8 · st10 · st11` | Street portraits, Sibu, Dec 2025 | @forms_creative |
| `st2 · st3 · st9` | Street collages | @forms_creative |
| `wed1.jpg` | Poster behind the hero reel | @forms_creative |

`public/hero.mp4` — the wedding reel for **Dominic & Cassandra**, 1276×718,
101s, 11 MB. Plays in the hero and again in that couple's block.

### ⚠️ Credit line — do not remove

`cw*` and `hk*` come from **collab posts co-credited with
[@momentsby_paul](https://www.instagram.com/momentsby_paul/)**, whose account is
the owner of both posts. Several frames carry a visible `moments` watermark.

The credit is **per set**, not section-wide — it renders under a set's header
only when that set's data carries a `credit` field. Lehwei & Celina deliberately
has none: that post is Colin's own. Keep the credits on the two collab sets for
as long as those photos are on the page, and confirm with Colin that Paul is
fine with the site using them.

The Dominic & Cassandra set is the same wedding as the reel Colin posted from
his own account, so he clearly shot it — but the still photography is credited
to Paul, and the site should keep saying so.

### What was held back

`assets-raw/` (outside `public/`, so it is not bundled):

- `collab/` — the 24 wedding originals at full size, including the
  3277×4096 Dominic & Cassandra set. The copies in `public/` are downscaled to
  1440px wide; re-export from here if you ever need bigger.
- `highlights/` — 23 story-canvas frames from the two Instagram highlights.
- studio logo, three pricing/terms posters, two more street collages.

## Brand mark

The wordmark is Colin's own, lifted from the @forms_creative profile picture
(4096×4096, white on black JPEG) and keyed to transparency — alpha taken from
luminance, low end clamped so the JPEG's not-quite-black background leaves no
grey halo.

| File | Where it is used |
|---|---|
| `public/logo-light.png` | Hero header (white, over the reel) |
| `public/logo-dark.png` | Footer closing mark (black, on paper) |
| `public/favicon-32.png` · `favicon-180.png` | Browser tab / home screen — white mark on a black tile, matching how the account uses it as an avatar |

Regenerate them from `assets-raw/logo.jpg` if the source ever changes.

**It is a raster trace, not the real artwork.** If Colin has the original vector
(AI/SVG/EPS), drop it in and swap these out — the logo scales to 542px wide in
the footer, where vector would be visibly cleaner.

The footer previously closed on an oversized Instrument Serif "Forms", cropped
at the baseline the way park.photos does. That is now the real wordmark, shown
whole rather than cropped.

## Known rough edges

- **The reel has burnt-in captions.** It is a finished cut — couple names and
  subtitles are baked into the video, so they sit under the headline. The scrim
  is at `bg-black/45` and the copy is lifted `pb-[10vh]` to keep them apart. A
  clean no-caption cut from Colin would fix this properly.
- **101s / 11 MB is heavy for a hero loop.** Ask for a 10–15s cut, or run it
  through ffmpeg once that is available.
- **Set years come from different sources.** Lihong & YiiXiu is the date
  stamped on the frames (11/11/2024). Dominic & Cassandra and Benny & Sherry
  are inferred from post dates — correct them if Colin knows the real ones.
- **Two highlight reels were a dead end.** "Aaron & Eunice" (5) and "Kuching"
  (20) are story-canvas screenshots — photo shrunk into a 9:16 frame, blurred
  fill around it, text stickers on top, and the Kuching set mixes in travel
  shots. They are parked in `assets-raw/highlights/` if you want to look.

## Adding more photos

**The profile grid only ever exposes 12 posts**, signed in or not. That made the
account look exhausted when it was not — Lehwei & Celina was found only because
its post URL was handed over directly.

So the way to add work is to **paste the post URL**. Any
`instagram.com/p/<code>/` link can be read without logging in:
`/p/<code>/embed/captioned/` returns a `contextJSON` blob holding
`gql_data.shortcode_media`, which carries `display_url` (largest still),
`video_url` for reels, and every frame of a carousel under
`edge_sidecar_to_children`.

Check `owner.username` on each post before using it — that is what separates
Colin's own work from the collab sets, and it decides whether the set needs a
`credit` field.

## Design values taken from park.photos

| | |
|---|---|
| Background | `#fbf9f0` |
| Text / muted | `#000000` / `#808080` |
| Display face | Instrument Serif, `-0.025em`, `line-height: 1` |
| Body | Inter 500, 18px, `-0.028em`, grey |
| Image radius | 24px (`rounded-3xl`) |
| Grid | 3 × 4:5, 20px gap, 80px page margin |
| Button | white, `rounded-full`, 14px/500, 15px × 28px |

Change them in the `@theme` block in `src/index.css`.

## Where things live

| Section | File |
|---|---|
| Hero + reel | `src/components/Hero.tsx` |
| Weddings (`#work`) | `src/components/Weddings.tsx` |
| Street portraits (`#street`) | `src/components/Street.tsx` |
| Studio / about | `src/components/Studio.tsx` |
| Contact + oversized wordmark | `src/components/Contact.tsx` |

Section headlines are Colin's own captions — "Love is found in the smallest
moments" and "The street is the best studio" both come off his posts.

Contact details (WhatsApp, Instagram) are hardcoded in `Contact.tsx`.
