"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Flight = {
  id: number;
  airline: string;
  code: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: number;
  stops: number;
  stopCode?: string;
  price: number;
  logo: string;
  logoColor: string;
  nextDay?: boolean;
};

const flights: Flight[] = [
  {
    id: 1,
    airline: "Voyage Air",
    code: "VY",
    flightNumber: "VY 621",
    departure: "18:30",
    arrival: "06:25",
    duration: 715,
    stops: 1,
    stopCode: "SIN",
    price: 325,
    logo: "VY",
    logoColor: "#193963",
    nextDay: true,
  },
  {
    id: 2,
    airline: "Qatar Airways",
    code: "QR",
    flightNumber: "QR 438",
    departure: "12:10",
    arrival: "01:38",
    duration: 808,
    stops: 1,
    stopCode: "SIN",
    price: 325,
    logo: "QR",
    logoColor: "#8f3042",
    nextDay: true,
  },
  {
    id: 3,
    airline: "Icelandair",
    code: "FI",
    flightNumber: "FI 321",
    departure: "18:15",
    arrival: "05:40",
    duration: 685,
    stops: 1,
    stopCode: "ZRH",
    price: 340,
    logo: "FI",
    logoColor: "#20776d",
    nextDay: true,
  },
  {
    id: 4,
    airline: "Emirates",
    code: "EK",
    flightNumber: "EK 909",
    departure: "22:40",
    arrival: "17:15",
    duration: 872,
    stops: 1,
    stopCode: "DXB",
    price: 395,
    logo: "EK",
    logoColor: "#8f3042",
    nextDay: true,
  },
  {
    id: 5,
    airline: "Turkish Airlines",
    code: "TK",
    flightNumber: "TK 182",
    departure: "16:20",
    arrival: "08:10",
    duration: 710,
    stops: 1,
    stopCode: "IST",
    price: 420,
    logo: "TK",
    logoColor: "#b33b45",
    nextDay: true,
  },
  {
    id: 6,
    airline: "Lufthansa",
    code: "LH",
    flightNumber: "LH 401",
    departure: "17:45",
    arrival: "09:30",
    duration: 705,
    stops: 1,
    stopCode: "FRA",
    price: 460,
    logo: "LH",
    logoColor: "#193963",
    nextDay: true,
  },
  {
    id: 7,
    airline: "Qatar Airways",
    code: "QR",
    flightNumber: "QR 702",
    departure: "09:15",
    arrival: "22:50",
    duration: 815,
    stops: 1,
    stopCode: "DOH",
    price: 495,
    logo: "QR",
    logoColor: "#8f3042",
  },
  {
    id: 8,
    airline: "Emirates",
    code: "EK",
    flightNumber: "EK 203",
    departure: "14:00",
    arrival: "05:50",
    duration: 710,
    stops: 1,
    stopCode: "DXB",
    price: 540,
    logo: "EK",
    logoColor: "#8f3042",
    nextDay: true,
  },
  {
    id: 9,
    airline: "Turkish Airlines",
    code: "TK",
    flightNumber: "TK 111",
    departure: "06:30",
    arrival: "20:10",
    duration: 820,
    stops: 1,
    stopCode: "IST",
    price: 600,
    logo: "TK",
    logoColor: "#b33b45",
  },
];

const airports = [
  { code: "JFK", name: "New York (JFK)" },
  { code: "CDG", name: "Paris (CDG)" },
  { code: "LHR", name: "London (LHR)" },
  { code: "DXB", name: "Dubai (DXB)" },
  { code: "KBL", name: "Kabul (KBL)" },
  { code: "NRT", name: "Tokyo (NRT)" },
];

const airlines = [
  "Emirates",
  "Icelandair",
  "Lufthansa",
  "Qatar Airways",
  "Turkish Airlines",
  "Voyage Air",
];

function getAirportName(value: string) {
  const airport = airports.find(
    (item) =>
      item.code.toLowerCase() === value.toLowerCase() ||
      item.name.toLowerCase() === value.toLowerCase(),
  );

  return airport?.name ?? value;
}

function getAirportCode(value: string) {
  const airport = airports.find(
    (item) =>
      item.code.toLowerCase() === value.toLowerCase() ||
      item.name.toLowerCase() === value.toLowerCase(),
  );

  return airport?.code ?? value;
}

function formatDate(dateString: string) {
  if (!dateString) return "Select date";

  const date = new Date(`${dateString}T12:00:00`);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins.toString().padStart(2, "0")}m`;
}

function getTimeValue(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export default function FlightsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFrom =
    searchParams.get("from") || searchParams.get("origin") || "JFK";

  const initialTo =
    searchParams.get("to") || searchParams.get("destination") || "CDG";

  const initialDeparture =
    searchParams.get("departureDate") ||
    searchParams.get("departure") ||
    "2026-12-17";

  const initialReturn =
    searchParams.get("returnDate") ||
    searchParams.get("return") ||
    "2026-12-24";

  const [tripType, setTripType] = useState(
    searchParams.get("tripType") || "round-trip",
  );

  const [from, setFrom] = useState(getAirportCode(initialFrom));
  const [to, setTo] = useState(getAirportCode(initialTo));
  const [departureDate, setDepartureDate] = useState(initialDeparture);
  const [returnDate, setReturnDate] = useState(initialReturn);

  const [passengers, setPassengers] = useState(
    Number(searchParams.get("passengers") || 1),
  );

  const [cabin, setCabin] = useState(searchParams.get("cabin") || "Economy");

  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(600);
  const [sortBy, setSortBy] = useState("cheapest");
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);

  const filteredFlights = useMemo(() => {
    let result = flights.filter((flight) => flight.price <= maxPrice);

    if (selectedStops.length > 0) {
      result = result.filter((flight) => selectedStops.includes(flight.stops));
    }

    if (selectedAirlines.length > 0) {
      result = result.filter((flight) =>
        selectedAirlines.includes(flight.airline),
      );
    }

    if (sortBy === "cheapest") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "fastest") {
      result.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "earliest") {
      result.sort(
        (a, b) => getTimeValue(a.departure) - getTimeValue(b.departure),
      );
    }

    return result;
  }, [maxPrice, selectedStops, selectedAirlines, sortBy]);

  const cheapestPrice = Math.min(...flights.map((flight) => flight.price));
  const fastestPrice = flights.reduce((fastest, flight) =>
    flight.duration < fastest.duration ? flight : fastest,
  ).price;
  const earliestPrice = flights.reduce((earliest, flight) =>
    getTimeValue(flight.departure) < getTimeValue(earliest.departure)
      ? flight
      : earliest,
  ).price;

  function toggleStop(stop: number) {
    setSelectedStops((current) =>
      current.includes(stop)
        ? current.filter((item) => item !== stop)
        : [...current, stop],
    );
  }

  function toggleAirline(airline: string) {
    setSelectedAirlines((current) =>
      current.includes(airline)
        ? current.filter((item) => item !== airline)
        : [...current, airline],
    );
  }

  function swapAirports() {
    setFrom(to);
    setTo(from);
  }

  function clearFilters() {
    setSelectedStops([]);
    setSelectedAirlines([]);
    setMaxPrice(600);
    setSortBy("cheapest");
  }

  function searchFlights() {
    const params = new URLSearchParams();

    params.set("from", from);
    params.set("to", to);
    params.set("departureDate", departureDate);

    if (tripType === "round-trip") {
      params.set("returnDate", returnDate);
    }

    params.set("tripType", tripType);
    params.set("passengers", String(passengers));
    params.set("cabin", cabin.toLowerCase());

    router.push(`/flights?${params.toString()}`);
  }

  const fromName = getAirportName(from);
  const toName = getAirportName(to);

  return (
    <main className="min-h-screen bg-[#fbf9f5] px-5 pb-24 pt-10 text-[#191b20] sm:px-8 lg:px-12 lg:pt-12">
      <div className="mx-auto max-w-[1800px]">
        {/* Page heading */}
        <header className="mb-10">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-[72px]">
            {fromName.split(" (")[0]} <span className="text-[#69717c]">to</span>{" "}
            {toName.split(" (")[0]}
          </h1>

          <p className="mt-4 text-sm text-[#697587] sm:text-base lg:text-[20px]">
            {formatDate(departureDate)}
            {tripType === "round-trip" && returnDate
              ? ` – ${formatDate(returnDate)}`
              : ""}
            {" · "}
            {passengers} {passengers === 1 ? "passenger" : "passengers"}
            {" · "}
            {cabin}
          </p>
        </header>

        {/* Search panel */}
        <section className="mb-14 rounded-[30px] border border-[#e4ddd3] bg-white/70 p-5 shadow-[0_12px_35px_rgba(35,30,20,0.06)] sm:p-7 lg:rounded-[40px] lg:p-9">
          {/* Search options */}
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <div className="flex rounded-full bg-[#f2eee7] p-1">
              <button
                type="button"
                onClick={() => setTripType("round-trip")}
                className={`rounded-full px-5 py-2.5 text-sm transition sm:text-base ${
                  tripType === "round-trip"
                    ? "bg-[#19345e] text-white"
                    : "text-[#69717c] hover:text-[#191b20]"
                }`}
              >
                Round trip
              </button>

              <button
                type="button"
                onClick={() => setTripType("one-way")}
                className={`rounded-full px-5 py-2.5 text-sm transition sm:text-base ${
                  tripType === "one-way"
                    ? "bg-[#19345e] text-white"
                    : "text-[#69717c] hover:text-[#191b20]"
                }`}
              >
                One way
              </button>
            </div>

            <select
              value={passengers}
              onChange={(event) => setPassengers(Number(event.target.value))}
              className="rounded-full bg-[#f2eee7] px-5 py-3 text-sm outline-none sm:text-base"
              aria-label="Passengers"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "passenger" : "passengers"}
                </option>
              ))}
            </select>

            <select
              value={cabin}
              onChange={(event) => setCabin(event.target.value)}
              className="rounded-full bg-[#f2eee7] px-5 py-3 text-sm outline-none sm:text-base"
              aria-label="Cabin class"
            >
              <option>Economy</option>
              <option>Premium economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
          </div>

          {/* Search fields */}
          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 xl:grid-cols-[1fr_52px_1fr_0.85fr_0.85fr_auto]">
            <label className="flex min-w-0 flex-col gap-2">
              <span className="text-xs font-medium uppercase text-[#69717c] sm:text-sm">
                From
              </span>

              <select
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                className="h-[60px] w-full rounded-[22px] border border-[#e1d9cf] bg-transparent px-4 text-sm outline-none transition focus:border-[#19345e] sm:text-base"
              >
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={swapAirports}
              aria-label="Swap airports"
              className="hidden h-[52px] w-[52px] items-center justify-center rounded-full border border-[#e1d9cf] text-[#191b20] transition hover:bg-[#f2eee7] xl:flex"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3l4 4-4 4" />
                <path d="M3 7h18" />
                <path d="M7 21l-4-4 4-4" />
                <path d="M21 17H3" />
              </svg>
            </button>

            <label className="flex min-w-0 flex-col gap-2">
              <span className="text-xs font-medium uppercase text-[#69717c] sm:text-sm">
                To
              </span>

              <select
                value={to}
                onChange={(event) => setTo(event.target.value)}
                className="h-[60px] w-full rounded-[22px] border border-[#e1d9cf] bg-transparent px-4 text-sm outline-none transition focus:border-[#19345e] sm:text-base"
              >
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-w-0 flex-col gap-2">
              <span className="text-xs font-medium uppercase text-[#69717c] sm:text-sm">
                Depart
              </span>

              <input
                type="date"
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
                className="h-[60px] w-full min-w-0 rounded-[22px] border border-[#e1d9cf] bg-transparent px-4 text-sm outline-none focus:border-[#19345e] sm:text-base"
              />
            </label>

            {tripType === "round-trip" && (
              <label className="flex min-w-0 flex-col gap-2">
                <span className="text-xs font-medium uppercase text-[#69717c] sm:text-sm">
                  Return
                </span>

                <input
                  type="date"
                  value={returnDate}
                  min={departureDate}
                  onChange={(event) => setReturnDate(event.target.value)}
                  className="h-[60px] w-full min-w-0 rounded-[22px] border border-[#e1d9cf] bg-transparent px-4 text-sm outline-none focus:border-[#19345e] sm:text-base"
                />
              </label>
            )}

            <button
              type="button"
              onClick={searchFlights}
              className="flex h-[60px] items-center justify-center gap-3 rounded-full bg-[#19345e] px-7 text-sm font-medium text-white transition hover:bg-[#244878] sm:text-base"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
              Search flights
            </button>
          </div>
        </section>

        {/* Results layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[330px_1fr] xl:grid-cols-[360px_1fr] xl:gap-12">
          {/* Filters */}
          <aside className="space-y-9">
            {/* Stops */}
            <div>
              <h2 className="mb-4 text-sm font-medium uppercase text-[#69717c]">
                Stops
              </h2>

              <div className="space-y-3">
                {[
                  { label: "Nonstop", value: 0 },
                  { label: "1 stop", value: 1 },
                  { label: "2+ stops", value: 2 },
                ].map((stop) => (
                  <label
                    key={stop.value}
                    className="flex cursor-pointer items-center gap-4 text-base sm:text-lg"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStops.includes(stop.value)}
                      onChange={() => toggleStop(stop.value)}
                      className="h-5 w-5 accent-[#19345e]"
                    />
                    {stop.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Airlines */}
            <div>
              <h2 className="mb-4 text-sm font-medium uppercase text-[#69717c]">
                Airlines
              </h2>

              <div className="space-y-3">
                {airlines.map((airline) => (
                  <label
                    key={airline}
                    className="flex cursor-pointer items-center gap-4 text-base sm:text-lg"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAirlines.includes(airline)}
                      onChange={() => toggleAirline(airline)}
                      className="h-5 w-5 accent-[#19345e]"
                    />
                    {airline}
                  </label>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium uppercase text-[#69717c]">
                  Max price
                </h2>

                <span className="text-sm text-[#69717c]">${maxPrice}</span>
              </div>

              <input
                type="range"
                min={100}
                max={600}
                step={5}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="w-full cursor-pointer accent-[#19345e]"
                aria-label="Maximum price"
              />
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full px-5 py-3 text-sm font-medium transition hover:bg-[#f0ece5]"
            >
              Clear filters
            </button>
          </aside>

          {/* Results */}
          <section className="min-w-0">
            {/* Sorting */}
            <div className="mb-7 grid grid-cols-1 overflow-hidden rounded-[28px] border border-[#e4ddd3] bg-white/70 sm:grid-cols-3">
              {[
                {
                  id: "cheapest",
                  label: "Cheapest",
                  price: cheapestPrice,
                },
                {
                  id: "fastest",
                  label: "Fastest",
                  price: fastestPrice,
                },
                {
                  id: "earliest",
                  label: "Earliest",
                  price: earliestPrice,
                },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSortBy(option.id)}
                  className={`relative flex min-h-[88px] flex-col items-start justify-center border-b border-[#e4ddd3] px-6 py-4 text-left transition last:border-b-0 sm:min-h-[104px] sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 ${
                    sortBy === option.id ? "bg-[#f6f3ee]" : "hover:bg-[#faf8f4]"
                  }`}
                >
                  <span className="text-base font-medium sm:text-lg">
                    {option.label}
                  </span>

                  <span className="text-sm text-[#697587]">
                    ${option.price}
                  </span>

                  {sortBy === option.id && (
                    <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#19345e]" />
                  )}
                </button>
              ))}
            </div>

            <p className="mb-6 text-base text-[#697587] sm:text-lg">
              {filteredFlights.length} of {flights.length} flights
            </p>

            {/* Flight cards */}
            <div className="space-y-5">
              {filteredFlights.map((flight) => (
                <article
                  key={flight.id}
                  className={`grid grid-cols-1 overflow-hidden rounded-[28px] border bg-white/70 transition sm:rounded-[32px] xl:grid-cols-[1fr_250px] ${
                    selectedFlight === flight.id
                      ? "border-[#19345e] shadow-[0_12px_35px_rgba(25,52,94,0.08)]"
                      : "border-[#e4ddd3] hover:border-[#d4cfc7] hover:shadow-[0_12px_35px_rgba(35,30,20,0.05)]"
                  }`}
                >
                  {/* Flight details */}
                  <div className="min-w-0 p-5 sm:p-7">
                    <p className="mb-5 text-sm text-[#697587] sm:text-base">
                      {flight.airline} · {flight.flightNumber} · {cabin}
                    </p>

                    <div className="grid grid-cols-[48px_1fr] items-center gap-4 sm:grid-cols-[60px_1fr] sm:gap-6">
                      {/* Airline logo */}
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white sm:h-[60px] sm:w-[60px] sm:text-base"
                        style={{ backgroundColor: flight.logoColor }}
                      >
                        {flight.logo}
                      </div>

                      {/* Route timeline */}
                      <div className="grid min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5">
                        <div>
                          <p className="text-xl font-medium tracking-tight sm:text-2xl lg:text-[30px]">
                            {flight.departure}
                          </p>

                          <p className="mt-1 text-sm text-[#697587]">
                            {getAirportCode(from)}
                          </p>
                        </div>

                        <div className="min-w-0 px-1">
                          <p className="mb-2 text-center text-xs text-[#697587] sm:text-sm">
                            {formatDuration(flight.duration)}
                          </p>

                          <div className="relative h-[2px] w-full bg-[#e2dbd1]">
                            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e2dbd1] bg-[#fbf9f5]" />
                          </div>

                          <p className="mt-2 text-center text-xs text-[#697587] sm:text-sm">
                            {flight.stops === 0
                              ? "Nonstop"
                              : `${flight.stops} stop · ${flight.stopCode}`}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-medium tracking-tight sm:text-2xl lg:text-[30px]">
                            {flight.arrival}
                            {flight.nextDay && (
                              <sup className="ml-1 text-xs">+1</sup>
                            )}
                          </p>

                          <p className="mt-1 text-sm text-[#697587]">
                            {getAirportCode(to)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price and action */}
                  <div className="flex flex-row items-center justify-between border-t border-[#e4ddd3] px-5 py-5 sm:px-7 xl:flex-col xl:items-end xl:justify-center xl:border-l xl:border-t-0 xl:px-8">
                    <div className="text-left xl:text-right">
                      <p className="text-3xl font-medium tracking-tight sm:text-4xl">
                        ${flight.price}
                      </p>

                      <p className="mt-1 text-sm text-[#697587] sm:text-base">
                        per traveller
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedFlight(flight.id)}
                      className={`rounded-full px-6 py-3 text-sm font-medium text-white transition sm:text-base xl:mt-5 ${
                        selectedFlight === flight.id
                          ? "bg-[#31577e]"
                          : "bg-[#19345e] hover:bg-[#244878]"
                      }`}
                    >
                      {selectedFlight === flight.id
                        ? "Selected"
                        : "Select flight"}
                    </button>
                  </div>
                </article>
              ))}

              {filteredFlights.length === 0 && (
                <div className="rounded-[28px] border border-[#e4ddd3] bg-white/70 px-6 py-16 text-center">
                  <h3 className="font-serif text-2xl">No flights found</h3>

                  <p className="mt-3 text-[#697587]">
                    Try adjusting your filters or increasing your maximum price.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-full bg-[#19345e] px-6 py-3 text-sm font-medium text-white hover:bg-[#244878]"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
