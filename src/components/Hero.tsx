import { heroStill } from '../data/photos'

export default function Hero() {
  return (
    <section className="relative h-svh min-h-[34rem] w-full overflow-hidden bg-black text-white">
      {/* Still frame shows until public/hero.mp4 exists. */}
      <img src={heroStill} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroStill}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      {/* 55%, not more: the reel has bright frames (sky) and dark ones (indoors),
          and a fixed scrim has to suit the whole range. Heavier than this and
          the dark frames flatten to a grey slab, which defeats using video. */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />

      {/* z-20: the centred content block below is h-full and also z-10, and being
          later in the DOM it would swallow every click meant for this nav. */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-end px-5 py-5 text-[0.75rem] font-medium">
        <nav className="flex gap-5 sm:gap-7">
          <a href="#work" className="hidden underline-offset-[6px] decoration-1 transition-opacity hover:underline sm:inline">
            Weddings
          </a>
          <a href="#contact" className="underline-offset-[6px] decoration-1 transition-opacity hover:underline">
            Contact
          </a>
        </nav>
      </header>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-[10vh] text-center">
        <h1 className="w-[min(72vw,34rem)]">
          <img
            src="/logo-light.png"
            alt="Forms Creative Studio"
            className="w-full"
          />
        </h1>
        <a
          href="#work"
          className="mt-10 rounded-full bg-white px-7 py-[0.95rem] text-[0.875rem] font-medium text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
        >
          See the work
        </a>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-5 text-[0.75rem] font-medium text-white/75">
        <span>Dominic &amp; Cassandra</span>
        <span>Sibu, Sarawak</span>
      </div>
    </section>
  )
}
