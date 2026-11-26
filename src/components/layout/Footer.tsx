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
    <footer className="overflow-hidden rounded-t-[24px] bg-[#101317] text-white">
      {/* Main footer */}
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-10 px-6 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8 lg:px-12 lg:py-16">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="inline-block font-serif text-[30px] tracking-[0.16em] text-white transition-opacity duration-300 hover:opacity-75"
          >
            VOYAGE
          </Link>

          <p className="mt-3 max-w-[260px] text-[13px] leading-relaxed text-[#a5a6a8]">
            Discover places. Find flights. Make memories.
          </p>
        </div>

        {/* Navigation groups */}
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#929497]">
              {group.title}
            </h3>

            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#c2c2c3] transition-colors duration-200 hover:text-white"
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
          <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#929497]">
            Support
          </h3>

          <ul className="space-y-3">
            <li>
              <a
                href="mailto:help@voyage.travel"
                className="text-[13px] text-[#c2c2c3] transition-colors duration-200 hover:text-white"
              >
                help@voyage.travel
              </a>
            </li>

            <li>
              <span className="text-[13px] text-[#c2c2c3]">
                24/7 traveller care
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-2.5 px-6 py-5 text-[11px] text-[#929497] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
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
