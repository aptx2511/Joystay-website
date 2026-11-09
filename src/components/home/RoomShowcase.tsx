"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import RoomCard from "./RoomCard";
import type { Room } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

export default function RoomShowcase({ rooms }: { rooms: Room[] }) {
  const { lang } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_W = 336; // w-80 (320) + gap (20) ≈ 340, rounding to card step

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? CARD_W : -CARD_W, behavior: "smooth" });
  };

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

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Prev / Next buttons */}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous rooms"
              className="hidden sm:flex w-10 h-10 rounded-full border border-white/15 items-center justify-center text-white/40 hover:border-joy-green hover:text-joy-green transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-white/15 disabled:hover:text-white/40"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next rooms"
              className="hidden sm:flex w-10 h-10 rounded-full border border-white/15 items-center justify-center text-white/40 hover:border-joy-green hover:text-joy-green transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-white/15 disabled:hover:text-white/40"
            >
              <ChevronRight size={16} />
            </button>

            <Link href="/rooms" className="btn-ghost-light shrink-0">
              {tx(T.showcase.viewAll, lang)} <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="relative">
          {/* Right fade hint */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-joy-charcoal to-transparent pointer-events-none z-10" />
          {/* Left fade hint (shows when scrolled) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-joy-charcoal to-transparent pointer-events-none z-10 transition-opacity duration-300"
            style={{ opacity: canScrollLeft ? 1 : 0 }}
          />

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-5 overflow-x-auto pb-6 -mx-5 px-5 sm:-mx-8 sm:px-8 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
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
