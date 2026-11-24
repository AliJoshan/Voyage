import Image from "next/image";
import Link from "next/link";
import DestinationBrowser from "./DestinationBrowser";

const destinations = {
  paris: {
    name: "Paris",
    country: "France",
    image: "/images/paris.jpg",
    description: "The city of timeless romance and art.",
    label: "POPULAR DESTINATION",
  },
  bali: {
    name: "Bali",
    country: "Indonesia",
    image: "/images/bali.jpg",
    description: "Tropical landscapes and peaceful escapes.",
    label: "FEATURED · INDONESIA",
  },
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    image: "/images/dubai.jpg",
    description: "Where modern luxury meets the desert.",
    label: "UNITED ARAB EMIRATES",
  },
};

function DestinationCard({
  name,
  country,
  image,
  description,
  label,
  className = "",
}: {
  name: string;
  country: string;
  image: string;
  description: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={`/explore?destination=${encodeURIComponent(name)}`}
      className={`group relative isolate block overflow-hidden rounded-[28px] bg-[#e8e2d9] ${className}`}
    >
      <Image
        src={image}
        alt={`${name}, ${country}`}
        fill
        priority={name === "Paris"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 65vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5 transition-opacity duration-300 group-hover:from-black/80" />

      {/* Destination details */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-7 text-white sm:p-8 lg:p-10">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-xs">
          {label}
        </p>

        <h2 className="font-serif text-3xl leading-none tracking-[-0.03em] sm:text-4xl">
          {name}
        </h2>

        <p className="mt-3 max-w-[320px] text-sm leading-relaxed text-white/75 sm:text-base">
          {description}
        </p>
      </div>

      {/* Arrow */}
      <div className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xl text-white backdrop-blur-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#191b20]">
        ↗
      </div>
    </Link>
  );
}

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#fbf9f5] px-6 pb-24 pt-24 text-[#191b20] sm:px-8 lg:px-12 lg:pt-28">
      <div className="mx-auto max-w-[1800px]">
        {/* Page heading */}
        <header className="mb-10 sm:mb-12 lg:mb-14">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#526174] sm:text-xs">
            Explore
          </p>

          <h1 className="max-w-[1050px] font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1.04] tracking-[-0.045em] text-[#191b20]">
            Find the place that{" "}
            <span className="italic text-[#526174]">calls to you.</span>
          </h1>
        </header>

        {/* Destination gallery */}
        <section
          aria-label="Featured destinations"
          className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr] lg:gap-6"
        >
          {/* Large Paris card */}
          <DestinationCard
            {...destinations.paris}
            className="min-h-[480px] sm:min-h-[600px] lg:min-h-[520px]"
          />

          {/* Right-side destination cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            <DestinationCard
              {...destinations.bali}
              className="min-h-[320px] sm:min-h-[360px] lg:min-h-[250px]"
            />

            <DestinationCard
              {...destinations.dubai}
              className="min-h-[320px] sm:min-h-[360px] lg:min-h-[250px]"
            />
          </div>
        </section>

        {/* Destination gallery */}
        <section
          aria-label="Featured destinations"
          className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr] lg:gap-6"
        >
          {/* Keep your existing Paris, Bali and Dubai cards here */}
        </section>

        {/* Browse all destinations */}
        <DestinationBrowser />
      </div>
    </main>
  );
}
