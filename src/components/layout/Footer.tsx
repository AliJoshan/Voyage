import Link from "next/link";

const footerGroups = [
  {
    title: "Discover",
    links: [
      { label: "All destinations", href: "/explore" },
      { label: "Kyoto", href: "/explore?destination=Kyoto" },
      { label: "Bali", href: "/explore?destination=Bali" },
    ],
  },
  {
    title: "Travel",
    links: [
      { label: "Search flights", href: "/flights" },
      { label: "My trips", href: "/trips" },
    ],
  },
];

export default async function Footer() {
  "use cache";

  return (
    <footer className="overflow-hidden rounded-t-[28px] bg-[#101317] text-white">
      {/* Main footer */}
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 px-6 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:px-12 lg:py-24">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="inline-block font-serif text-[38px] tracking-[0.18em] text-white transition-opacity duration-300 hover:opacity-75 sm:text-[42px]"
          >
            VOYAGE
          </Link>

          <p className="mt-5 text-[16px] leading-relaxed text-[#a5a6a8] sm:text-[18px]">
            Discover places. Find flights. Make memories.
          </p>
        </div>

        {/* Navigation groups */}
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#929497]">
              {group.title}
            </h3>

            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[16px] text-[#c2c2c3] transition-colors duration-200 hover:text-white sm:text-[18px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Support */}
        <div>
          <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#929497]">
            Support
          </h3>

          <ul className="space-y-3">
            <li>
              <a
                href="mailto:help@voyage.travel"
                className="text-[16px] text-[#c2c2c3] transition-colors duration-200 hover:text-white sm:text-[18px]"
              >
                help@voyage.travel
              </a>
            </li>

            <li>
              <span className="text-[16px] text-[#c2c2c3] sm:text-[18px]">
                24/7 traveller care
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-6 py-7 text-[13px] text-[#929497] sm:px-8 sm:text-sm md:flex-row md:items-center md:justify-between lg:px-12">
          <p>
            © {new Date().getFullYear()} Voyage Travel Ltd. A prototype — no
            real bookings are made.
          </p>

          <p>Prices shown in USD</p>
        </div>
      </div>
    </footer>
  );
}
