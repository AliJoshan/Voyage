"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Flights", href: "/flights" },
  { name: "My Trips", href: "/trips" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const navbarClasses = `
    fixed top-0 left-0 z-50 w-full
    transition-all duration-300 ease-in-out
    ${
      isScrolled
        ? "bg-white/95 text-[#202020] shadow-sm border-b border-black/5 backdrop-blur-md"
        : "bg-transparent text-white"
    }
  `;

  return (
    <header className={navbarClasses}>
      <nav className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-6 md:px-10 lg:px-14">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-[0.18em] md:text-3xl"
        >
          VOYAGE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative py-2 text-base font-medium transition-opacity duration-200 hover:opacity-70"
            >
              {link.name}

              <span
                className={`absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  isScrolled ? "bg-[#202020]" : "bg-white"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Profile Icon */}
        <button
          aria-label="User profile"
          className="hidden h-12 w-12 items-center justify-center rounded-full border border-current transition-all duration-200 hover:bg-current/10 md:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M5 21a7 7 0 0 1 14 0" />
          </svg>
        </button>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
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
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-72 border-t border-black/10" : "max-h-0"
        }`}
      >
        <div
          className={`flex flex-col gap-5 px-6 py-6 ${
            isScrolled
              ? "bg-white text-[#202020]"
              : "bg-black/50 text-white backdrop-blur-lg"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
