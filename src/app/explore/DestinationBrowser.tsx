"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const categories = [
  "All",
  "Beaches",
  "Mountains",
  "Cities",
  "Nature",
  "Adventure",
  "Culture",
];

const destinations = [
  {
    name: "Paris",
    country: "France",
    image: "/images/paris.jpg",
    price: 540,
    description:
      "Grand boulevards, quiet courtyards and the world's most celebrated art.",
    categories: ["Cities", "Culture"],
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "/images/bali.jpg",
    price: 780,
    description:
      "Rice terraces, surf breaks and a spiritual rhythm that slows you down.",
    categories: ["Beaches", "Nature", "Adventure"],
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    image: "/images/dubai.jpg",
    price: 620,
    description:
      "Record-breaking architecture rising from the dunes of the Arabian desert.",
    categories: ["Cities", "Adventure", "Culture"],
  },
  {
    name: "Santorini",
    country: "Greece",
    image: "/images/santorini.jpg",
    price: 690,
    description:
      "Whitewashed villages, blue domes and unforgettable Mediterranean sunsets.",
    categories: ["Beaches", "Culture"],
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    image: "/images/swiss-alps.jpg",
    price: 850,
    description:
      "Alpine villages, dramatic peaks and some of Europe's finest mountain scenery.",
    categories: ["Mountains", "Nature", "Adventure"],
  },
  {
    name: "Kyoto",
    country: "Japan",
    image: "/images/kyoto.jpg",
    price: 920,
    description:
      "Ancient temples, peaceful gardens and streets filled with Japanese tradition.",
    categories: ["Cities", "Culture", "Nature"],
  },
  {
    name: "Patagonia",
    country: "Argentina",
    image: "/images/patagonia.jpg",
    price: 1150,
    description:
      "Wild landscapes, towering glaciers and endless opportunities for adventure.",
    categories: ["Mountains", "Nature", "Adventure"],
  },
];

export default function DestinationBrowser() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(search.toLowerCase()) ||
        destination.country.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" ||
        destination.categories.includes(activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <section className="mt-28 border-t border-[#e3ddd3] pt-8">
      {/* Search and category filters */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Search input */}
        <div className="relative w-full lg:max-w-[580px]">
          <Search
            size={21}
            strokeWidth={1.8}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[#626873]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search destinations or countries"
            className="h-[68px] w-full rounded-full border border-[#e3ddd3] bg-white/70 pl-16 pr-6 text-base text-[#191b20] outline-none transition-colors placeholder:text-[#929292] focus:border-[#1c3763]"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2.5 lg:justify-end">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-6 py-3.5 text-base transition-all duration-200 ${
                activeCategory === category
                  ? "border-[#1c3763] bg-[#1c3763] text-white"
                  : "border-[#e3ddd3] bg-white/70 text-[#242424] hover:border-[#1c3763]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Destination count */}
      <div className="mt-6 border-t border-[#e3ddd3] pt-1">
        <p className="text-[20px] text-[#526174]">
          {filteredDestinations.length}{" "}
          {filteredDestinations.length === 1 ? "destination" : "destinations"}
        </p>
      </div>

      {/* Destination grid */}
      <div className="mt-9 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {filteredDestinations.map((destination) => (
          <Link
            key={destination.name}
            href={`/explore?destination=${encodeURIComponent(
              destination.name,
            )}`}
            className="group block"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#e8e2d9]">
              <Image
                src={destination.image}
                alt={`${destination.name}, ${destination.country}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>

            {/* Destination information */}
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#526174] sm:text-sm">
                  {destination.country}
                </p>

                <h3 className="font-serif text-[32px] leading-tight tracking-[-0.03em] text-[#191b20] transition-colors group-hover:text-[#526174]">
                  {destination.name}
                </h3>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-base text-[#526174]">from</p>
                <p className="text-xl font-medium text-[#191b20]">
                  ${destination.price}
                </p>
              </div>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-[#526174]">
              {destination.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Empty search result */}
      {filteredDestinations.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl text-[#191b20]">
            No destinations found
          </p>
          <p className="mt-2 text-sm text-[#526174]">
            Try another search or choose a different category.
          </p>
        </div>
      )}
    </section>
  );
}
