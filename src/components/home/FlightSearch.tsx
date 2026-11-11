"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

const airports = [
  { code: "JFK", city: "New York", name: "John F. Kennedy" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle" },
  { code: "LHR", city: "London", name: "Heathrow" },
  { code: "DXB", city: "Dubai", name: "Dubai International" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport" },
  { code: "KBL", city: "Kabul", name: "Kabul International" },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt Airport" },
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International" },
];

const inputClasses = `
  h-[56px] w-full min-w-0 appearance-none
  rounded-full border border-[#e5dfd5]
  bg-white px-5 text-[15px] font-medium text-[#252b35]
  outline-none transition-all duration-200
  hover:border-[#c9c1b5]
  focus:border-[#1d385f] focus:ring-2 focus:ring-[#1d385f]/10
`;

const labelClasses = `
  mb-2 block text-[12px] font-medium
  uppercase tracking-[0.07em] text-[#747983]
`;

function getLocalDate() {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function FlightSearch() {
  const router = useRouter();

  const [tripType, setTripType] = useState<"round-trip" | "one-way">(
    "round-trip",
  );
  const [passengers, setPassengers] = useState("1");
  const [cabin, setCabin] = useState("Economy");
  const [from, setFrom] = useState("JFK");
  const [to, setTo] = useState("CDG");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(getLocalDate());
  }, []);

  function swapAirports() {
    setFrom(to);
    setTo(from);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (from === to) return;

    const params = new URLSearchParams({
      from,
      to,
      departure,
      passengers,
      cabin,
      tripType,
    });

    if (tripType === "round-trip" && returnDate) {
      params.set("return", returnDate);
    }

    router.push(`/flights?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full rounded-[28px] border border-white/70
        bg-[#faf9f6] p-5 text-[#242424]
        shadow-[0_20px_60px_rgba(0,0,0,0.16)]
        backdrop-blur-xl
        sm:p-7 lg:rounded-[32px] lg:p-9
      "
    >
      {/* Top controls */}
      <div className="mb-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
        {/* Trip type */}
        <div className="flex rounded-full bg-[#efede8] p-1">
          <button
            type="button"
            onClick={() => setTripType("round-trip")}
            aria-pressed={tripType === "round-trip"}
            className={`
              rounded-full px-5 py-2.5 text-sm font-medium
              transition-all duration-200 sm:text-base
              ${
                tripType === "round-trip"
                  ? "bg-[#1b365f] text-white shadow-sm"
                  : "text-[#737781] hover:text-[#252b35]"
              }
            `}
          >
            Round trip
          </button>

          <button
            type="button"
            onClick={() => {
              setTripType("one-way");
              setReturnDate("");
            }}
            aria-pressed={tripType === "one-way"}
            className={`
              rounded-full px-5 py-2.5 text-sm font-medium
              transition-all duration-200 sm:text-base
              ${
                tripType === "one-way"
                  ? "bg-[#1b365f] text-white shadow-sm"
                  : "text-[#737781] hover:text-[#252b35]"
              }
            `}
          >
            One way
          </button>
        </div>

        {/* Passengers */}
        <select
          aria-label="Number of passengers"
          value={passengers}
          onChange={(event) => setPassengers(event.target.value)}
          className="
            h-[48px] cursor-pointer rounded-full
            border border-transparent bg-[#efede8]
            px-4 text-sm font-medium text-[#343a44]
            outline-none transition hover:border-[#ddd7cc]
            focus:border-[#1b365f] sm:px-5 sm:text-base
          "
        >
          {Array.from({ length: 9 }, (_, index) => index + 1).map((number) => (
            <option key={number} value={number}>
              {number} {number === 1 ? "passenger" : "passengers"}
            </option>
          ))}
        </select>

        {/* Cabin class */}
        <select
          aria-label="Cabin class"
          value={cabin}
          onChange={(event) => setCabin(event.target.value)}
          className="
            h-[48px] cursor-pointer rounded-full
            border border-transparent bg-[#efede8]
            px-4 text-sm font-medium text-[#343a44]
            outline-none transition hover:border-[#ddd7cc]
            focus:border-[#1b365f] sm:px-5 sm:text-base
          "
        >
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First</option>
        </select>
      </div>

      {/* Main search fields */}
      <div
        className="
          grid grid-cols-1 items-end gap-4
          md:grid-cols-2
          xl:grid-cols-[minmax(0,1.15fr)_48px_minmax(0,1.15fr)_minmax(0,0.95fr)_minmax(0,0.95fr)_auto]
          xl:gap-3
        "
      >
        {/* From */}
        <div className="min-w-0">
          <label htmlFor="flight-from" className={labelClasses}>
            From
          </label>

          <div className="relative">
            <select
              id="flight-from"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className={`${inputClasses} pr-10`}
            >
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Desktop swap */}
        <button
          type="button"
          onClick={swapAirports}
          aria-label="Swap departure and destination"
          className="
            hidden h-[48px] w-[48px] items-center justify-center
            self-end rounded-full border border-[#e5dfd5]
            bg-white text-[#293d5a]
            transition-all duration-200
            hover:border-[#1b365f] hover:bg-[#1b365f]
            hover:text-white xl:flex
          "
        >
          <SwapIcon />
        </button>

        {/* To */}
        <div className="min-w-0">
          <label htmlFor="flight-to" className={labelClasses}>
            To
          </label>

          <div className="relative">
            <select
              id="flight-to"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className={`${inputClasses} pr-10`}
            >
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.city} ({airport.code})
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Mobile swap */}
        <button
          type="button"
          onClick={swapAirports}
          aria-label="Swap departure and destination"
          className="
            flex h-10 w-10 items-center justify-center
            justify-self-center rounded-full
            border border-[#e5dfd5] bg-white
            text-[#293d5a] transition
            hover:bg-[#1b365f] hover:text-white xl:hidden
          "
        >
          <SwapIcon />
        </button>

        {/* Departure */}
        <div className="min-w-0">
          <label htmlFor="flight-departure" className={labelClasses}>
            Depart
          </label>

          <input
            id="flight-departure"
            type="date"
            required
            value={departure}
            min={today || undefined}
            onChange={(event) => {
              setDeparture(event.target.value);

              if (returnDate && event.target.value > returnDate) {
                setReturnDate("");
              }
            }}
            className={inputClasses}
          />
        </div>

        {/* Return */}
        {tripType === "round-trip" && (
          <div className="min-w-0">
            <label htmlFor="flight-return" className={labelClasses}>
              Return
            </label>

            <input
              id="flight-return"
              type="date"
              required
              value={returnDate}
              min={departure || today || undefined}
              onChange={(event) => setReturnDate(event.target.value)}
              className={inputClasses}
            />
          </div>
        )}

        {/* Search */}
        <button
          type="submit"
          className="
            group inline-flex h-[56px] w-full items-center
            justify-center gap-3 rounded-full
            bg-[#1b365f] px-7 text-[15px] font-medium text-white
            shadow-[0_5px_16px_rgba(27,54,95,0.16)]
            transition-all duration-300
            hover:-translate-y-0.5 hover:bg-[#294777]
            hover:shadow-[0_8px_22px_rgba(27,54,95,0.24)]
            active:translate-y-0
            md:col-span-2 xl:col-span-1 xl:w-auto
          "
        >
          <SearchIcon />
          <span>Search flights</span>
        </button>
      </div>
    </form>
  );
}

function ChevronDown() {
  return (
    <svg
      className="
        pointer-events-none absolute right-5 top-1/2
        -translate-y-1/2 text-[#777d86]
      "
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 3 4 4-4 4" />
      <path d="M20 7H4" />
      <path d="m8 21-4-4 4-4" />
      <path d="M4 17h16" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}
