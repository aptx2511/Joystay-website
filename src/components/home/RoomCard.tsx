import Link from "next/link";
import { ArrowRight, Users, Maximize2 } from "lucide-react";
import type { Room } from "@/lib/mock-data";

interface RoomCardProps {
  room: Room;
  index: number;
}

export default function RoomCard({ room, index }: RoomCardProps) {
  return (
    <article
      className="group relative flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden
                 bg-joy-charcoal cursor-pointer card-hover"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* ── Visual (gradient placeholder — replace with <Image> for real photos) ── */}
      <div className={`relative h-52 sm:h-60 bg-gradient-to-br ${room.gradient} overflow-hidden`}>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Concept badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1.5 ${room.accentColor}
                            text-white font-sans text-[10px] font-semibold tracking-[0.15em]
                            uppercase px-3 py-1 rounded-full`}>
            {room.concept}
          </span>
        </div>

        {/* Availability badge */}
        {!room.isAvailable && (
          <div className="absolute top-4 right-4">
            <span className="bg-black/60 text-white/70 font-sans text-[10px] tracking-wide
                             uppercase px-3 py-1 rounded-full backdrop-blur-sm">
              Unavailable
            </span>
          </div>
        )}

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white/20 backdrop-blur-md border border-white/30
                           text-white font-sans text-sm font-medium tracking-wide
                           px-5 py-2.5 rounded-full flex items-center gap-2">
            Explore Room <ArrowRight size={14} />
          </span>
        </div>

        {/* Size in corner */}
        <div className="absolute bottom-4 right-4">
          <span className="font-serif text-3xl text-white/30 leading-none">
            {room.size}<span className="text-lg">m²</span>
          </span>
        </div>
      </div>

      {/* ── Info ──────────────────────────────────────────────────────────── */}
      <div className="p-5">
        <h3 className="font-serif text-xl text-white font-light mb-1">
          {room.name}
        </h3>

        <p className="font-sans text-xs text-white/50 leading-relaxed line-clamp-2 mb-4">
          {room.shortDescription}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-white/40 text-xs font-sans mb-4">
          <span className="flex items-center gap-1.5">
            <Maximize2 size={11} /> {room.size} m²
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={11} /> Max {room.maxGuests}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-white/30 mb-0.5">
              From
            </p>
            <p className="font-serif text-xl text-white">
              {(room.pricePerNight / 1000).toFixed(0)}k{" "}
              <span className="font-sans text-xs text-white/40">VND/night</span>
            </p>
          </div>

          <Link
            href={`/rooms/${room.slug}`}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                       text-white/60 hover:border-joy-green hover:text-joy-green hover:bg-joy-green/10
                       transition-all duration-300"
            aria-label={`View ${room.name}`}
          >
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Full card link */}
      <Link href={`/rooms/${room.slug}`} className="absolute inset-0" aria-hidden="true" tabIndex={-1} />
    </article>
  );
}
