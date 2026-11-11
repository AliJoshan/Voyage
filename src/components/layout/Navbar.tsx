"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Flights", href: "/flights" },
  { name: "My Trips", href: "/trips" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isSolid = isScrolled || isMenuOpen;

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;

    return `
      group relative py-2 text-[14px] font-medium
      tracking-[0.01em]
      transition-colors duration-300
      ${isActive ? "opacity-100" : "opacity-75 hover:opacity-100"}
    `;
  };

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-300 ease-in-out
        ${
          isSolid
            ? "bg-white/95 text-[#242424] shadow-sm backdrop-blur-md border-b border-black/5"
            : "bg-transparent text-white"
        }
      `}
    >
      <nav
        className={`
          relative mx-auto grid max-w-[1800px]
          grid-cols-[1fr_auto] items-center
          px-6 md:grid-cols-[1fr_auto_1fr] md:px-10 lg:px-14
          transition-all duration-300
          ${isScrolled ? "h-18" : "h-20"}
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Voyage homepage"
          className="
            justify-self-start
            font-serif text-[25px] font-bold
            tracking-[0.20em]
            transition-opacity duration-300
            hover:opacity-75
            md:text-[27px]
          "
        >
          VOYAGE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={getLinkClasses(link.href)}
              >
                {link.name}

                <span
                  className={`
                    absolute bottom-0 left-0 h-[1.5px] w-full
                    origin-left
                    transition-transform duration-300 ease-out
                    ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                    ${isSolid ? "bg-[#242424]" : "bg-white"}
                  `}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Profile Button */}
        <button
          type="button"
          aria-label="User profile"
          className={`
            hidden h-10 w-10
            items-center justify-center
            justify-self-end rounded-full
            transition-all duration-300
            hover:scale-105
            md:flex
            ${
              isSolid
                ? "bg-[#F3F0EB] text-[#242424] hover:bg-[#E9E4DC]"
                : "bg-[#263A3B] text-white shadow-lg shadow-black/20 hover:bg-[#344C4D]"
            }
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M5 21a7 7 0 0 1 14 0" />
          </svg>
        </button>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`
            flex h-10 w-10
            items-center justify-center
            justify-self-end rounded-full
            transition-all duration-300
            hover:scale-105
            md:hidden
            ${
              isSolid
                ? "bg-[#F3F0EB] text-[#242424] hover:bg-[#E9E4DC]"
                : "bg-[#263A3B] text-white shadow-lg shadow-black/20 hover:bg-[#344C4D]"
            }
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`
          grid transition-all duration-300 ease-in-out
          md:hidden
          ${
            isMenuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 border-t border-black/5 bg-white px-6 py-5 text-[#242424]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    rounded-lg px-4 py-3
                    text-sm font-medium
                    transition-colors duration-200
                    ${
                      isActive
                        ? "bg-black/5 text-[#202020]"
                        : "text-[#666666] hover:bg-black/5 hover:text-[#202020]"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
