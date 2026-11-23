import { Compass, Sparkles, ShieldCheck, Leaf } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Curated guides",
    description:
      "Editorial destination guides with real budgets and the best time to go.",
  },
  {
    icon: Sparkles,
    title: "Clear flight search",
    description:
      "Compare airlines, stops and fares side by side — no hidden fees.",
  },
  {
    icon: ShieldCheck,
    title: "Booking you can trust",
    description:
      "Every itinerary in one dashboard with instant booking references.",
  },
  {
    icon: Leaf,
    title: "Travel thoughtfully",
    description: "Direct routes highlighted to help you fly less and see more.",
  },
];

export default function WhyVoyage() {
  return (
    <section className="bg-[#fbf9f5] px-6 py-24 sm:px-8 lg:px-12 lg:py-[110px]">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.78fr_1fr] lg:gap-[4.5vw]">
        {/* Section heading */}
        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-[#526174]">
            Why Voyage
          </p>

          <h2 className="max-w-[590px] font-serif text-[clamp(2.5rem,4vw,3.8rem)] leading-[1.05] tracking-[-0.04em] text-[#191b20]">
            Inspiration and booking, finally in one place.
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 overflow-hidden rounded-[30px] border border-[#e3ddd3] bg-white/55 sm:grid-cols-2 [&>article]:border-b [&>article]:border-[#e3ddd3] [&>article:last-child]:border-b-0 sm:[&>article:nth-child(odd)]:border-r sm:[&>article:nth-child(even)]:border-r-0 sm:[&>article:nth-last-child(-n+2)]:border-b-0">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="flex min-h-[220px] flex-col items-start px-7 py-8 sm:px-8 sm:py-9 lg:min-h-[225px] lg:px-10 lg:py-9"
              >
                <Icon
                  size={30}
                  strokeWidth={1.8}
                  className="mb-7 shrink-0 text-[#193963]"
                />

                <h3 className="mb-3 font-serif text-[23px] leading-tight tracking-[-0.025em] text-[#191b20] lg:text-[25px]">
                  {feature.title}
                </h3>

                <p className="max-w-[360px] text-[15px] leading-[1.55] text-[#697587] lg:text-[16px]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
