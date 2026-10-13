"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

const ROOM_LINKS = [
  { label: "Pop Art Studio",    href: "/rooms/pop-art-studio"  },
  { label: "Monochrome Studio",  href: "/rooms/bw-studio-large" },
  { label: "Indochine 1",       href: "/rooms/indochine-room"  },
  { label: "Tropical Oasis Room", href: "/rooms/midcentury-room" },
  { label: "Indochine 2",       href: "/rooms/bw-room-small"   },
];

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-joy-charcoal text-white/70 font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="block mb-4">
            <Image src="/logo.png" alt="Joystay Vietnam" width={110} height={48}
              className="h-11 w-auto object-contain brightness-0 invert opacity-90" />
          </Link>
          <p className="text-sm leading-relaxed text-white/50 max-w-xs">
            {tx(T.footer.about, lang)}
          </p>
          <div className="flex gap-3 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-joy-green hover:text-joy-green transition-colors duration-300">
              <Instagram size={15} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-joy-green hover:text-joy-green transition-colors duration-300">
              <Facebook size={15} />
            </a>
          </div>
        </div>

        {/* Rooms */}
        <div>
          <h4 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
            {tx(T.footer.roomsTitle, lang)}
          </h4>
          <ul className="space-y-3">
            {ROOM_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-joy-green transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
            {tx(T.footer.linksTitle, lang)}
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { en: tx(T.footer.blog, lang),       href: "/blog"    },
              { en: tx(T.footer.contactUs, lang),  href: "/contact" },
              { en: tx(T.footer.bookDirect, lang), href: "/rooms"   },
              { en: tx(T.footer.longStay, lang),   href: "/contact" },
            ].map((l) => (
              <li key={l.en}>
                <Link href={l.href} className="hover:text-joy-green transition-colors duration-200">{l.en}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
            {tx(T.footer.contactTitle, lang)}
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={15} className="text-joy-green shrink-0 mt-0.5" />
              <span className="text-white/60 leading-snug">
                245 Nguyễn Trãi, Phường Nguyễn Cư Trinh<br />
                {lang === "en" ? "District 1, Ho Chi Minh City" : "Quận 1, TP. Hồ Chí Minh"}
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={15} className="text-joy-green shrink-0" />
              <a href="tel:+84898888457" className="hover:text-joy-green transition-colors">(+84) 0898 888 457</a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={15} className="text-joy-green shrink-0" />
              <a href="mailto:hello@joystay.vn" className="hover:text-joy-green transition-colors">hello@joystay.vn</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} Joystay Vietnam. {tx(T.footer.copyright, lang)}</span>
          <span className="font-serif italic text-white/20">{tx(T.footer.tagline, lang)}</span>
        </div>
      </div>
    </footer>
  );
}
