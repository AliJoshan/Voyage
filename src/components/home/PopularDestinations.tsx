import Link from "next/link";

const destinations = [
  {
    country: "France",
    city: "Paris",
    price: "$540",
    image: "/images/paris.jpg",
    position: "center",
  },
  {
    country: "Indonesia",
    city: "Bali",
    price: "$780",
    image: "/images/bali.jpg",
    position: "center",
  },
  {
    country: "United Arab Emirates",
    city: "Dubai",
    price: "$620",
    image: "/images/dubai.jpg",
    position: "center",
  },
  {
    country: "Japan",
    city: "Kyoto",
    price: "$890",
    image: "/images/kyoto.jpg",
    position: "center",
  },
];

export default function PopularDestinations() {
  return (
    <section className="bg-[#faf9f6] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-12">
        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#53647a] sm:text-xs">
              Popular right now
            </p>

            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] tracking-[-0.045em] text-[#191c20]">
              Destinations travellers love
            </h2>
          </div>

          <Link
            href="/explore"
            className="group inline-flex w-fit items-center gap-3 pb-1 text-[15px] font-medium text-[#19345e] transition-colors duration-200 hover:text-[#536f98] sm:text-base"
          >
            View all destinations
            <svg
              className="transition-transform duration-300 group-hover:translate-x-1"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Destination cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-6 xl:gap-7">
          {destinations.map((destination, index) => (
            <Link
              key={destination.city}
              href={`/explore?destination=${encodeURIComponent(destination.city)}`}
              aria-label={`Explore ${destination.city}, ${destination.country}. Flights from ${destination.price}`}
              className={`
                group relative block aspect-[0.8] overflow-hidden
                rounded-[26px] bg-[#dedbd5]
                shadow-sm transition-shadow duration-500
                hover:shadow-xl hover:shadow-black/15
                sm:rounded-[28px]
                ${index % 2 === 1 ? "lg:translate-y-[72px]" : ""}
              `}
            >
              {/* Destination image */}
              <div
                className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                style={{
                  backgroundImage: `url("${destination.image}")`,
                  backgroundPosition: destination.position,
                }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Card content */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 sm:p-7">
                <div className="min-w-0 text-white">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-xs">
                    {destination.country}
                  </p>

                  <h3 className="font-serif text-[clamp(2rem,2.6vw,2.7rem)] leading-none tracking-[-0.035em]">
                    {destination.city}
                  </h3>

                  <p className="mt-7 whitespace-nowrap text-[14px] font-medium text-white/85 sm:text-base">
                    Flights from {destination.price}
                  </p>
                </div>

                {/* Arrow */}
                <span className="mb-0.5 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-[#19345e]">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
