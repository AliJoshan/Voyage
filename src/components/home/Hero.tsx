import Link from "next/link";
import FlightSearch from "../home/FlightSearch";

export default function Hero() {
  return (
    <section className="hero relative flex min-h-screen w-full items-center overflow-hidden text-white">
      {/* Background Image */}
      <div className="hero-background absolute inset-0" />

      {/* Background Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-6 pt-32 pb-28 md:px-10 lg:px-14">
        {/* Heading and CTA */}
        <div className="max-w-237.5">
          <p className="hero-eyebrow mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs md:mb-7 md:text-sm">
            Discover places · Find flights · Make memories
          </p>

          <h1 className="hero-heading font-serif text-[clamp(2.4rem,6.2vw,6rem)] leading-[1.02] tracking-[-0.045em]">
            <span className="block">The world is waiting.</span>
            <span className="hero-heading-italic block font-normal italic">
              Where will you go?
            </span>
          </h1>

          <p className="hero-description mt-6 max-w-152.5 text-sm leading-relaxed text-white/85 sm:text-base md:mt-7 md:text-lg">
            Voyage brings together inspiring destination guides and honest,
            transparent flight search — so you can go from dreaming to departure
            in minutes.
          </p>

          <div className="hero-buttons mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-9">
            <Link
              href="/explore"
              className="group inline-flex min-h-13.5 items-center justify-center gap-4 rounded-full bg-[#f3e4cd] px-7 text-sm font-medium text-[#202020] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl sm:min-h-14 sm:px-8 sm:text-base"
            >
              Explore destinations
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/flights"
              className="inline-flex min-h-13.5 items-center justify-center rounded-full border border-white/50 bg-white/5 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#202020] sm:min-h-14 sm:text-base"
            >
              Find flights
            </Link>
          </div>
        </div>

        {/* Flight Search Panel */}
        <div className="mt-12 w-full md:mt-14">
          <FlightSearch />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/80 md:flex">
        <span className="text-[10px] uppercase tracking-[0.25em]">
          Scroll to discover
        </span>

        <div className="h-8 w-px overflow-hidden bg-white/30">
          <div className="scroll-line h-full w-full bg-white" />
        </div>
      </div>
    </section>
  );
}
