"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Rooms",   href: "/rooms"   },
  { label: "Blog",    href: "/blog"    },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-joy
          ${scrolled
            ? "bg-joy-cream/95 backdrop-blur-md shadow-sm border-b border-joy-border"
            : "bg-transparent"
          }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className={`font-serif text-xl sm:text-2xl font-medium tracking-tight transition-colors duration-300
              ${scrolled ? "text-joy-ink" : "text-white"}`}>
              Joystay
            </span>
            <span className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-colors duration-300
              ${scrolled ? "text-joy-green" : "text-white/70"}`}>
              Vietnam
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-sans text-sm font-medium tracking-wide transition-colors duration-300
                    hover:text-joy-green
                    ${scrolled ? "text-joy-ink" : "text-white/90"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/rooms"
              className={`hidden sm:inline-flex items-center px-5 py-2 rounded-full font-sans text-sm font-semibold tracking-wide
                transition-all duration-300 ease-joy
                ${scrolled
                  ? "bg-joy-green text-white hover:bg-joy-charcoal"
                  : "bg-white text-joy-ink hover:bg-joy-green hover:text-white"
                }`}
            >
              Book Now
            </Link>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-joy-ink" : "text-white"}`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-joy-charcoal flex flex-col justify-center px-8 transition-all duration-500 ease-joy
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2"
        >
          <X size={24} />
        </button>

        <div className="space-y-1">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/30 mb-8">
            Navigation
          </p>
          {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block font-serif text-4xl font-light text-white hover:text-joy-green
                         transition-colors duration-200 py-2"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/rooms"
            onClick={() => setMenuOpen(false)}
            className="btn-ghost-light w-full justify-center"
          >
            Book a Room
          </Link>
        </div>

        <p className="mt-8 font-sans text-xs text-white/30 tracking-widest uppercase">
          245 Nguyễn Trãi, District 1, HCMC
        </p>
      </div>
    </>
  );
}
