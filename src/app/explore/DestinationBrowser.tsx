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
    name: "Kyoto",
    country: "Japan",
    image: "/images/kyoto3.jpg",
    price: 890,
    description:
      "Wooden machiya, moss gardens and maple-lit pagodas in Japan's old capital.",
    categories: ["Culture", "Cities"],
  },
  {
    name: "Santorini",
    country: "Greece",
    image: "/images/santorini.jpg",
    price: 610,
    description:
      "Blue domes, volcanic beaches and the Aegean's most famous sunsets.",
    categories: ["Beaches", "Culture"],
  },
  {
    name: "Zermatt",
    country: "Switzerland",
    image: "/images/zermatt.jpg",
    price: 690,
    description: "A car-free alpine village beneath Europe's most iconic peak.",
    categories: ["Mountains", "Adventure"],
  },
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
    <section className="mt-28 border-t border-[#e3ddd3] pt-6">
      {/* Search and category filters */}
      <div className="flex flex-col gap-5 border-b border-[#e3ddd3] pb-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
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
            aria-label="Search destinations or countries"
            className="h-[68px] w-full rounded-full border border-[#e3ddd3] bg-white/70 pl-16 pr-6 text-base text-[#191b20] outline-none transition-colors placeholder:text-[#929292] focus:border-[#1c3763]"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 lg:justify-end lg:overflow-visible">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`shrink-0 rounded-full border px-6 py-3.5 text-base transition-all duration-200 ${
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

      {/* Destination grid */}
      <div className="grid grid-cols-1 gap-x-9 gap-y-14 pt-16 md:grid-cols-2 lg:grid-cols-3">
        {filteredDestinations.map((destination) => (
          <article key={destination.name} className="group min-w-0">
            {/* Destination image */}
            <Link
              href={`/explore?destination=${encodeURIComponent(
                destination.name,
              )}`}
              aria-label={`Explore ${destination.name}`}
              className="relative block aspect-[1.62/1] overflow-hidden rounded-[28px] bg-[#e8e2d9]"
            >
              <Image
                src={destination.image}
                alt={`${destination.name}, ${destination.country}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </Link>

            {/* Destination name and price */}
            <div className="mt-6 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#526174] sm:text-sm">
                  {destination.country}
                </p>

                <h3 className="font-serif text-[32px] leading-tight tracking-[-0.03em] text-[#191b20]">
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

            {/* Description */}
            <p className="mt-4 min-h-[48px] text-[15px] leading-relaxed text-[#526174]">
              {destination.description}
            </p>

            {/* Category tags and details button */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {destination.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-[#f0ede7] px-3.5 py-2 text-sm text-[#242424]"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <Link
                href={`/explore?destination=${encodeURIComponent(
                  destination.name,
                )}`}
                className="shrink-0 rounded-full border border-[#e3ddd3] bg-transparent px-5 py-2.5 text-sm text-[#191b20] shadow-sm transition-all duration-200 hover:border-[#1c3763] hover:bg-[#1c3763] hover:text-white"
              >
                View details
              </Link>
            </div>
          </article>
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
