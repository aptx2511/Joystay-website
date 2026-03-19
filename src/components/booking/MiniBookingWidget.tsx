"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Search } from "lucide-react";
import { format, addDays } from "date-fns";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

export default function MiniBookingWidget() {
  const router   = useRouter();
  const { lang } = useLang();
  const today    = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const [checkIn,  setCheckIn]  = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests,   setGuests]   = useState(2);

  function handleSearch() {
    router.push(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row">

        {/* Check-in */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-4 sm:border-r border-white/15 border-b sm:border-b-0">
          <label className="block font-sans font-semibold text-[10px] tracking-[0.18em] uppercase text-white/45 mb-1 text-center">
            {tx(T.booking.checkIn, lang)}
          </label>
          <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)}
            className="bg-transparent text-white text-sm font-sans font-medium focus:outline-none cursor-pointer [color-scheme:dark] text-center" />
        </div>

        {/* Check-out */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-4 sm:border-r border-white/15 border-b sm:border-b-0">
          <label className="block font-sans font-semibold text-[10px] tracking-[0.18em] uppercase text-white/45 mb-1 text-center">
            {tx(T.booking.checkOut, lang)}
          </label>
          <input type="date" value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)}
            className="bg-transparent text-white text-sm font-sans font-medium focus:outline-none cursor-pointer [color-scheme:dark] text-center" />
        </div>

        {/* Guests */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/15">
          <label className="block font-sans font-semibold text-[10px] tracking-[0.18em] uppercase text-white/45 mb-1 text-center">
            {tx(T.booking.guests, lang)}
          </label>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}
            className="bg-transparent text-white text-sm font-sans font-medium focus:outline-none cursor-pointer [color-scheme:dark] text-center">
            <option value={1}>{tx(T.booking.guest1, lang)}</option>
            <option value={2}>{tx(T.booking.guest2, lang)}</option>
          </select>
        </div>

        {/* Button */}
        <button onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-joy-green hover:bg-white hover:text-joy-ink text-white font-sans font-semibold text-sm tracking-wide px-6 py-5 sm:py-0 sm:min-w-[160px] transition-all duration-300 ease-joy whitespace-nowrap">
          <Search size={15} />
          {tx(T.booking.cta, lang)}
        </button>
      </div>

      <p className="text-center mt-3 text-white/40 text-xs font-sans tracking-wide">
        {tx(T.booking.guarantee, lang)}
      </p>
    </div>
  );
}
