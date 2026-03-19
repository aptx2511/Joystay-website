"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RoomCard from "./RoomCard";
import type { Room } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

export default function RoomShowcase({ rooms }: { rooms: Room[] }) {
  const { lang } = useLang();

  return (
    <section id="rooms" className="bg-joy-charcoal py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-tag text-joy-green-light mb-4 block">
              {tx(T.showcase.tag, lang)}
            </span>
            <h2 className="font-serif text-display-lg font-light text-white leading-tight">
              {tx(T.showcase.title, lang)}{" "}
              <span className="text-joy-green-light italic">{tx(T.showcase.italic, lang)}</span>
            </h2>
          </div>
          <Link href="/rooms" className="btn-ghost-light shrink-0 self-start sm:self-auto">
            {tx(T.showcase.viewAll, lang)} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-joy-charcoal to-transparent pointer-events-none z-10" />
          <div className="flex gap-5 overflow-x-auto pb-6 -mx-5 px-5 sm:-mx-8 sm:px-8 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {rooms.map((room, idx) => (
              <div key={room.id} className="snap-start">
                <RoomCard room={room} index={idx} />
              </div>
            ))}
            <div className="snap-start flex-shrink-0 w-56 sm:w-64 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 p-8 hover:border-joy-green/30 transition-colors duration-300 group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-joy-green group-hover:text-joy-green text-white/40 transition-all duration-300">
                <ArrowRight size={18} />
              </div>
              <p className="font-sans text-xs text-white/40 group-hover:text-white/60 text-center tracking-wide transition-colors whitespace-pre-line">
                {tx(T.showcase.exploreAll, lang)}
              </p>
            </div>
          </div>
        </div>

        <p className="sm:hidden text-center text-white/20 text-xs mt-2 tracking-wider">
          {tx(T.showcase.swipe, lang)}
        </p>
      </div>
    </section>
  );
}
