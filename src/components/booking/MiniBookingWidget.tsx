"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { format, addDays } from "date-fns";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

/** Thanh chọn ngày ở hero (kiểu Gallery: nền sáng, bo góc). Hành vi giữ nguyên: sang /rooms kèm ngày + số khách. */
export default function MiniBookingWidget() {
  const router   = useRouter();
  const { lang } = useLang();
  const today    = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const [checkIn,  setCheckIn]  = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests,   setGuests]   = useState(2);
  const [pending, startTransition] = useTransition();

  function handleSearch() {
    startTransition(() => router.push(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`));
  }

  const label = "block font-sans font-bold text-[10px] tracking-[0.14em] uppercase text-joy-muted mb-0.5";
  const field = "w-full bg-transparent text-joy-ink text-[15px] font-sans font-medium focus:outline-none cursor-pointer";
  const guestWord = (n: number) => (lang === "vi" ? `${n} khách` : `${n} guest${n > 1 ? "s" : ""}`);

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-joy-cream text-joy-ink rounded-2xl shadow-2xl overflow-hidden grid grid-cols-2 sm:grid-cols-[1fr_1fr_0.8fr_auto]">
        <div className="px-4 py-3 border-r border-joy-border">
          <label htmlFor="mb-in" className={label}>{tx(T.booking.checkIn, lang)}</label>
          <input id="mb-in" type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} className={field} />
        </div>
        <div className="px-4 py-3 sm:border-r border-joy-border">
          <label htmlFor="mb-out" className={label}>{tx(T.booking.checkOut, lang)}</label>
          <input id="mb-out" type="date" value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} className={field} />
        </div>
        <div className="px-4 py-3 border-t sm:border-t-0 border-r sm:border-r-0 border-joy-border">
          <label htmlFor="mb-g" className={label}>{tx(T.booking.guests, lang)}</label>
          <select id="mb-g" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={field}>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{guestWord(n)}</option>)}
          </select>
        </div>
        <button onClick={handleSearch} disabled={pending} aria-busy={pending}
          className="flex items-center justify-center gap-2 bg-joy-green-dark hover:bg-[#3F6A3B] active:scale-[0.98] text-white font-sans font-semibold text-sm
                     px-6 py-4 sm:py-0 transition-all duration-200 whitespace-nowrap disabled:opacity-80">
          {pending
            ? <span className="inline-block w-24 h-3 rounded-full bg-white/50 animate-pulse" />
            : <><Search size={15} />{tx(T.booking.cta, lang)}</>}
        </button>
      </div>
      <p className="mt-3 text-white/80 text-xs font-sans tracking-wide">{tx(T.booking.guarantee, lang)}</p>
    </div>
  );
}
