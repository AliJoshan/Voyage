"use client";

import { useEffect, useState } from "react";
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

const inputClasses =
  "h-[54px] w-full min-w-0 rounded-full border border-[#e3ddd4] bg-white px-5 text-[15px] text-[#242424] outline-none transition focus:border-[#1b365f] focus:ring-2 focus:ring-[#1b365f]/10";

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
    const getTodayString = () => new Date().toISOString().split("T")[0];
    setToday(getTodayString());
  }, []);

  function swapAirports() {
    setFrom(to);
    setTo(from);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (from === to) {
      alert("Please select two different airports.");
      return;
    }

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
      className="w-full rounded-[28px] bg-[#faf9f6] p-5 text-[#242424] shadow-2xl shadow-black/15 backdrop-blur-xl sm:p-7 lg:rounded-[34px] lg:p-9"
    >
      {/* Top controls */}
      <div className="mb-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
        <div className="flex rounded-full bg-[#f0ede7] p-1">
          <button
            type="button"
            onClick={() => setTripType("round-trip")}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition sm:text-base ${
              tripType === "round-trip"
                ? "bg-[#19345e] text-white shadow-sm"
                : "text-[#666b73] hover:text-[#242424]"
            }`}
          >
            Round trip
          </button>

          <button
            type="button"
            onClick={() => setTripType("one-way")}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition sm:text-base ${
              tripType === "one-way"
                ? "bg-[#19345e] text-white shadow-sm"
                : "text-[#666b73] hover:text-[#242424]"
            }`}
          >
            One way
          </button>
        </div>

        <select
          aria-label="Number of passengers"
          value={passengers}
          onChange={(event) => setPassengers(event.target.value)}
          className="h-[48px] rounded-full border-0 bg-[#f0ede7] px-4 text-sm text-[#242424] outline-none sm:px-5 sm:text-base"
        >
          {Array.from({ length: 9 }, (_, index) => index + 1).map((number) => (
            <option key={number} value={number}>
              {number} {number === 1 ? "passenger" : "passengers"}
            </option>
          ))}
        </select>

        <select
          aria-label="Cabin class"
          value={cabin}
          onChange={(event) => setCabin(event.target.value)}
          className="h-[48px] rounded-full border-0 bg-[#f0ede7] px-4 text-sm text-[#242424] outline-none sm:px-5 sm:text-base"
        >
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First</option>
        </select>
      </div>

      {/* Main search fields */}
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 xl:grid-cols-[1.15fr_52px_1.15fr_0.95fr_0.95fr_auto] xl:gap-3">
        {/* Departure airport */}
        <div className="min-w-0">
          <label
            htmlFor="flight-from"
            className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.07em] text-[#626973]"
          >
            From
          </label>

          <select
            id="flight-from"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className={inputClasses}
          >
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Swap airports */}
        <button
          type="button"
          onClick={swapAirports}
          aria-label="Swap departure and destination"
          className="hidden h-[52px] w-[52px] items-center justify-center self-end rounded-full border border-[#e3ddd4] bg-white text-xl text-[#242424] transition hover:border-[#19345e] hover:bg-[#19345e] hover:text-white xl:flex"
        >
          ⇄
        </button>

        {/* Destination airport */}
        <div className="min-w-0">
          <label
            htmlFor="flight-to"
            className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.07em] text-[#626973]"
          >
            To
          </label>

          <select
            id="flight-to"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className={inputClasses}
          >
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Mobile swap button */}
        <button
          type="button"
          onClick={swapAirports}
          aria-label="Swap departure and destination"
          className="flex h-10 w-10 items-center justify-center justify-self-center rounded-full border border-[#e3ddd4] bg-white text-xl transition hover:bg-[#19345e] hover:text-white xl:hidden"
        >
          ⇅
        </button>

        {/* Departure date */}
        <div className="min-w-0">
          <label
            htmlFor="flight-departure"
            className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.07em] text-[#626973]"
          >
            Depart
          </label>

          <input
            id="flight-departure"
            type="date"
            required
            value={departure}
            min={today}
            onChange={(event) => {
              setDeparture(event.target.value);

              if (returnDate && event.target.value > returnDate) {
                setReturnDate("");
              }
            }}
            className={inputClasses}
          />
        </div>

        {/* Return date */}
        {tripType === "round-trip" && (
          <div className="min-w-0">
            <label
              htmlFor="flight-return"
              className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.07em] text-[#626973]"
            >
              Return
            </label>

            <input
              id="flight-return"
              type="date"
              required
              value={returnDate}
              min={departure || today}
              onChange={(event) => setReturnDate(event.target.value)}
              className={inputClasses}
            />
          </div>
        )}

        {/* Search button */}
        <button
          type="submit"
          className="inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-full bg-[#19345e] px-7 text-[15px] font-semibold text-white shadow-lg shadow-[#19345e]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#254777] hover:shadow-xl md:col-span-2 xl:col-span-1 xl:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
    </form>
  );
}
