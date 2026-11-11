import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero relative flex min-h-screen w-full items-center overflow-hidden text-white">
      {/* Background Image */}
      <div className="hero-background absolute inset-0" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/25 to-transparent" />

      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-6 pb-16 pt-32 md:px-10 md:pb-20 lg:px-14">
        <div className="max-w-262.5">
          {/* Eyebrow */}
          <p className="hero-eyebrow mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-sm md:mb-8">
            Discover places · Find flights · Make memories
          </p>

          {/* Main Heading */}
          <h1 className="hero-heading font-serif text-[clamp(3.5rem,8.5vw,8rem)] leading-[0.94] tracking-[-0.055em]">
            <span className="block">The world is waiting.</span>

            <span className="hero-heading-italic block font-normal italic">
              Where will you go?
            </span>
          </h1>

          {/* Description */}
          <p className="hero-description mt-8 max-w-170 text-base leading-relaxed text-white/85 sm:text-lg md:mt-10 md:text-xl">
            Voyage brings together inspiring destination guides and honest,
            transparent flight search — so you can go from dreaming to departure
            in minutes.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-11">
            <Link
              href="/explore"
              className="group inline-flex min-h-15 items-center justify-center gap-4 rounded-full bg-[#f3e4cd] px-8 text-base font-medium text-[#202020] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              Explore destinations
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/flights"
              className="inline-flex min-h-15 items-center justify-center rounded-full border border-white/50 bg-white/5 px-9 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#202020]"
            >
              Find flights
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/80 md:flex">
        <span className="text-[10px] uppercase tracking-[0.25em]">
          Scroll to discover
        </span>

        <div className="h-10 w-px overflow-hidden bg-white/30">
          <div className="scroll-line h-full w-full bg-white" />
        </div>
      </div>
    </section>
  );
}
