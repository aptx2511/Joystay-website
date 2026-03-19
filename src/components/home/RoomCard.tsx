"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Maximize2 } from "lucide-react";
import type { Room } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

interface RoomCardProps { room: Room; index: number; }

export default function RoomCard({ room, index }: RoomCardProps) {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 w-72 sm:w-80"
    >
      <motion.article
        whileHover={{ y: -8 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="group relative rounded-2xl overflow-hidden bg-[#161816] cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-shadow duration-500"
      >
        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${room.gradient} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-400 z-[2]" />

          <div className="absolute top-4 left-4 z-[3]">
            <span className={`inline-flex items-center ${room.accentColor} text-white font-sans text-[9px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full shadow-lg`}>
              {room.concept}
            </span>
          </div>

          {!room.isAvailable && (
            <div className="absolute top-4 right-4 z-[3]">
              <span className="bg-black/50 text-white/55 font-sans text-[9px] tracking-wide uppercase px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                {lang === "en" ? "Unavailable" : "Hết phòng"}
              </span>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center z-[3] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans text-sm font-medium tracking-wide px-6 py-2.5 rounded-full flex items-center gap-2">
              {tx(T.roomCard.explore, lang)} <ArrowRight size={14} />
            </span>
          </div>

          <div className="absolute bottom-4 right-4 z-[3]">
            <span className="font-serif text-4xl text-white/15 leading-none font-light select-none">
              {room.size}<span className="text-xl">m²</span>
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 pb-6">
          <h3 className="font-serif text-[1.25rem] text-white font-light leading-snug tracking-[-0.01em] mb-2">
            {room.name}
          </h3>
          <p className="font-sans text-[11px] text-white/40 leading-relaxed line-clamp-2 mb-5">
            {lang === "en" ? room.shortDescription : room.shortDescriptionVi}
          </p>

          <div className="flex items-center gap-3 text-white/30 text-[10px] font-sans mb-5">
            <span className="flex items-center gap-1.5"><Maximize2 size={10} strokeWidth={1.5} />{room.size} m²</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1.5"><Users size={10} strokeWidth={1.5} />Max {room.maxGuests}</span>
            {room.stayType === "BOTH" && (
              <><span className="w-px h-3 bg-white/15" /><span className="text-joy-green/60 tracking-wide">{tx(T.roomCard.longStay, lang)}</span></>
            )}
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-white/[0.07]">
            <div>
              <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-white/22 mb-1.5">
                {tx(T.roomCard.from, lang)}
              </p>
              <p className="font-serif text-[1.3rem] text-white font-light leading-none">
                {room.pricePerNight.toLocaleString("vi-VN")}
                <span className="font-sans text-[10px] text-white/30 ml-1">{tx(T.roomCard.perNight, lang)}</span>
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}>
              <Link href={`/rooms/${room.slug}`}
                className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-white/45 hover:border-joy-green hover:text-joy-green hover:bg-joy-green/[0.08] transition-colors duration-300"
                aria-label={`View ${room.name}`}>
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>

        <Link href={`/rooms/${room.slug}`} className="absolute inset-0" aria-hidden="true" tabIndex={-1} />
      </motion.article>
    </motion.div>
  );
}
