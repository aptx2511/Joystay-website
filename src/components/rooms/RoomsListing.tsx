"use client";

import Link from "next/link";
import { ArrowRight, Users, Maximize2, Utensils, Wifi, AirVent, Tv } from "lucide-react";
import type { Room } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Full Kitchen": <Utensils size={12} />,
  "WiFi":         <Wifi size={12} />,
  "AC":           <AirVent size={12} />,
  "Smart TV":     <Tv size={12} />,
};

export default function RoomsListing({ rooms }: { rooms: Room[] }) {
  const { lang } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="bg-joy-charcoal pt-28 sm:pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag text-joy-green-light mb-4 block">{tx(T.rooms.tag, lang)}</span>
          <h1 className="font-serif text-display-xl text-white font-light">
            {tx(T.rooms.title, lang)}{" "}
            <em className="italic text-joy-green-light">{tx(T.rooms.italic, lang)}</em>
          </h1>
          <p className="mt-4 text-white/50 font-sans text-base max-w-xl leading-relaxed">
            {tx(T.rooms.subtitle, lang)}
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-joy-charcoal border-b border-white/10 sticky top-[72px] sm:top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["All", "SHORT_STAY", "LONG_STAY"].map((f) => (
            <button key={f}
              className="shrink-0 px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide border border-white/20 text-white/60 hover:border-joy-green hover:text-joy-green transition-all duration-200 first:border-joy-green first:text-joy-green">
              {f === "All"
                ? tx(T.rooms.filterAll, lang)
                : f === "SHORT_STAY"
                  ? tx(T.rooms.filterShort, lang)
                  : tx(T.rooms.filterLong, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Room Cards */}
      <section className="bg-joy-cream py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {rooms.map((room, idx) => (
            <article key={room.id}
              className={`group relative bg-white border border-joy-border rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500 ease-joy ${!room.isAvailable ? "opacity-70" : ""}`}>

              {/* Visual */}
              <div className={`relative md:w-80 lg:w-96 h-56 md:h-auto shrink-0 bg-gradient-to-br ${room.gradient} overflow-hidden`}>
                <div className="absolute top-4 left-4">
                  <span className={`${room.accentColor} text-white font-sans text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full`}>
                    {room.concept}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black/40 backdrop-blur-sm text-white/80 font-sans text-[10px] tracking-wide uppercase px-3 py-1 rounded-full">
                    {room.stayType === "BOTH"
                      ? tx(T.rooms.shortLong, lang)
                      : room.stayType === "SHORT_STAY"
                        ? tx(T.rooms.short, lang)
                        : tx(T.rooms.long, lang)}
                  </span>
                </div>
                {!room.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white/20 backdrop-blur-md text-white font-sans text-sm font-semibold px-5 py-2 rounded-full border border-white/30">
                      {tx(T.rooms.unavailable, lang)}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 right-5 font-serif text-5xl text-white/15 leading-none select-none">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="font-serif text-2xl sm:text-3xl text-joy-ink font-light">{room.name}</h2>
                    <div className="text-right shrink-0">
                      <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-joy-muted">{tx(T.rooms.from, lang)}</p>
                      <p className="font-serif text-2xl text-joy-ink">
                        {(room.pricePerNight / 1000).toFixed(0)}k
                        <span className="font-sans text-xs text-joy-muted"> {tx(T.rooms.perNight, lang)}</span>
                      </p>
                      {room.pricePerMonth && (
                        <p className="font-sans text-xs text-joy-green mt-0.5">
                          {(room.pricePerMonth / 1000000).toFixed(1)}M {tx(T.rooms.perMonth, lang)}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="font-sans text-sm text-joy-muted leading-relaxed mb-5">
                    {lang === "en" ? room.shortDescription : room.shortDescriptionVi}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs font-sans text-joy-muted mb-5">
                    <span className="flex items-center gap-1.5"><Maximize2 size={13} className="text-joy-green" /> {room.size} m²</span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-joy-green" />
                      {tx(T.rooms.maxGuests, lang)} {room.maxGuests} {lang === "en" ? "guests" : "khách"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 5).map((a) => (
                      <span key={a} className="inline-flex items-center gap-1.5 bg-joy-warm border border-joy-border text-joy-ink text-xs font-sans px-3 py-1 rounded-full">
                        {AMENITY_ICONS[a] ?? null}{a}
                      </span>
                    ))}
                    {room.amenities.length > 5 && (
                      <span className="text-xs text-joy-muted font-sans self-center">
                        +{room.amenities.length - 5} {tx(T.rooms.more, lang)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-joy-border">
                  <Link href={`/rooms/${room.slug}`} className="btn-primary py-2.5 px-6 text-sm">
                    {tx(T.rooms.viewRoom, lang)} <ArrowRight size={14} />
                  </Link>
                  {room.securityDeposit && (
                    <span className="font-sans text-xs text-joy-muted ml-auto">
                      🔒 {tx(T.rooms.deposit, lang)}: {(room.securityDeposit / 1000000).toFixed(0)}M VND ({tx(T.rooms.refundable, lang)})
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
