import { Suspense } from "react";
import FlightsPageClient from "./FlightsPageClient";

export default function FlightsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fbf9f5] px-6 py-20">
          <div className="mx-auto max-w-[1800px] animate-pulse">
            <div className="h-16 w-96 rounded bg-[#e9e3da]" />
            <div className="mt-8 h-64 rounded-[36px] bg-[#e9e3da]" />
          </div>
        </main>
      }
    >
      <FlightsPageClient />
    </Suspense>
  );
}
