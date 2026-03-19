import Link from "next/link";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

const ROOM_LINKS = [
  { label: "Pop Art Studio",    href: "/rooms/pop-art-studio"  },
  { label: "B&W Studio Large",  href: "/rooms/bw-studio-large" },
  { label: "Indochine Room",    href: "/rooms/indochine-room"  },
  { label: "Midcentury Room",   href: "/rooms/midcentury-room" },
  { label: "B&W Room Small",    href: "/rooms/bw-room-small"   },
];

export default function Footer() {
  return (
    <footer className="bg-joy-charcoal text-white/70 font-sans">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="block mb-4">
            <span className="font-serif text-2xl text-white">Joystay</span>
            <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-joy-green mt-0.5">
              The Art of Stay
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-white/50 max-w-xs">
            A boutique homestay experience in the heart of District 1, Saigon.
            Where art, quiet, and convenience meet.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                         hover:border-joy-green hover:text-joy-green transition-colors duration-300"
            >
              <Instagram size={15} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                         hover:border-joy-green hover:text-joy-green transition-colors duration-300"
            >
              <Facebook size={15} />
            </a>
          </div>
        </div>

        {/* Rooms */}
        <div>
          <h4 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
            Our Rooms
          </h4>
          <ul className="space-y-3">
            {ROOM_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-joy-green transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Blog & Saigon Guide", href: "/blog"    },
              { label: "Contact Us",          href: "/contact" },
              { label: "Book Direct",         href: "/rooms"   },
              { label: "Long-stay Inquiry",   href: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-joy-green transition-colors duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
            Contact
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={15} className="text-joy-green shrink-0 mt-0.5" />
              <span className="text-white/60 leading-snug">
                245 Nguyễn Trãi, Phường Nguyễn Cư Trinh<br />
                Quận 1, TP. Hồ Chí Minh
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={15} className="text-joy-green shrink-0" />
              <a href="tel:+84909000000" className="hover:text-joy-green transition-colors">
                +84 909 000 000
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={15} className="text-joy-green shrink-0" />
              <a href="mailto:hello@joystay.vn" className="hover:text-joy-green transition-colors">
                hello@joystay.vn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} Joystay Vietnam. All rights reserved.</span>
          <span className="font-serif italic text-white/20">The Art of Stay</span>
        </div>
      </div>
    </footer>
  );
}
