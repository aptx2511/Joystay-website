"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

const NAV_LINKS: { en: string; vi: string; href: string }[] = [
  { en: "Home",    vi: "Trang Chủ", href: "/"        },
  { en: "Rooms",   vi: "Phòng",     href: "/rooms"   },
  { en: "Blog",    vi: "Blog",      href: "/blog"    },
  { en: "Contact", vi: "Liên Hệ",   href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-joy-cream overflow-visible
                    border-b border-joy-border transition-shadow duration-300
                    ${scrolled ? "shadow-md" : "shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-[72px] sm:h-[80px]
                        flex items-center overflow-visible">

          {/* ── Logo (trái) ───────────────────────────────────────── */}
          <Link href="/" className="shrink-0 relative z-10 flex items-center">
            <Image
              src="/logo.png"
              alt="Joystay Vietnam"
              width={260}
              height={113}
              className="h-[90px] sm:h-[110px] w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Nav links (giữa, căn center tuyệt đối) ────────────── */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2
                          items-center gap-7">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-[13px] font-semibold tracking-wide
                              transition-colors duration-200 pb-0.5 whitespace-nowrap
                              ${active
                                ? "text-joy-ink border-b-2 border-joy-ink"
                                : "text-joy-ink/70 hover:text-joy-ink border-b-2 border-transparent"
                              }`}
                >
                  {link[lang]}
                </Link>
              );
            })}
          </nav>

          {/* ── Phải: SĐT + Lang toggle + Button ─────────────────── */}
          <div className="ml-auto hidden md:flex items-center gap-4 shrink-0">
            <a
              href="tel:+84898888457"
              className="flex items-center gap-1.5 font-sans text-[13px]
                         font-semibold text-joy-ink hover:text-joy-green
                         transition-colors duration-200"
            >
              <Phone size={13} strokeWidth={2} className="text-joy-green" />
              (+84) 0898 888 457
            </a>

            {/* Language toggle */}
            <div className="flex items-center border border-joy-border rounded-full overflow-hidden text-[12px] font-sans font-semibold">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 transition-colors duration-200
                  ${lang === "en" ? "bg-joy-green text-white" : "text-joy-muted hover:text-joy-ink"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("vi")}
                className={`px-3 py-1.5 transition-colors duration-200
                  ${lang === "vi" ? "bg-joy-green text-white" : "text-joy-muted hover:text-joy-ink"}`}
              >
                VI
              </button>
            </div>

            <Link
              href="/rooms"
              className="bg-joy-green text-white font-sans text-[13px] font-semibold
                         tracking-wide px-5 py-2.5 rounded-full
                         hover:bg-joy-charcoal transition-colors duration-300 whitespace-nowrap"
            >
              {tx(T.nav.bookNow, lang)}
            </Link>
          </div>

          {/* ── Mobile toggle ─────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden ml-auto p-2 text-joy-ink hover:text-joy-green transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ───────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-joy-charcoal flex flex-col justify-center px-8
                    transition-all duration-500 ease-joy
                    ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-2"
        >
          <X size={24} />
        </button>

        <Image
          src="/logo.png"
          alt="Joystay Vietnam"
          width={140}
          height={61}
          className="h-12 w-auto object-contain brightness-0 invert mb-10 opacity-80"
        />

        <div className="space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block font-serif text-4xl font-light text-white
                         hover:text-joy-green transition-colors duration-200 py-2"
            >
              {link[lang]}
            </Link>
          ))}
        </div>

        <div className="mt-10 space-y-3">
          <a
            href="tel:+84898888457"
            className="flex items-center gap-2 text-white/60 font-sans text-sm"
          >
            <Phone size={14} /> (+84) 0898 888 457
          </a>
          <Link
            href="/rooms"
            onClick={() => setMenuOpen(false)}
            className="btn-ghost-light w-full justify-center"
          >
            {tx(T.nav.bookBtn, lang)}
          </Link>
        </div>

        <p className="mt-8 font-sans text-xs text-white/30 tracking-widest uppercase">
          245 Nguyễn Trãi, District 1, HCMC
        </p>
      </div>
    </>
  );
}
