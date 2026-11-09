"use client";

/**
 * Lịch phòng trống công khai (kiểu Multi-Calendar Airbnb) cho joystay.vn/availability.
 * CHỈ hiển thị: ngày đã có người đặt (không tên khách, không số tiền) và giá/đêm của ngày còn trống.
 * Dữ liệu ngày bận lấy từ endpoint công khai của PMS: GET /api/rooms/<pmsRoomId>/calendar → [{start,end}].
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  addDays, addMonths, differenceInCalendarDays, eachDayOfInterval, format, getDay,
  isSameDay, parseISO, startOfDay, startOfMonth, subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Room } from "@/lib/mock-data";
import { useLang } from "@/lib/lang-context";

const PMS_URL = process.env.NEXT_PUBLIC_PMS_URL ?? "https://joystay-pms.vercel.app";

const CELL_W = 72;
const ROW_H = 68;
const HEADER_H = 64;
const MONTHS_RENDERED = 3;

const WD = { vi: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"], en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] };
const MONTH = (m: number, lang: "en" | "vi") =>
  lang === "vi" ? `Tháng ${m + 1}` : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m];
const vnd = (n: number) => "₫" + Math.round(n).toLocaleString("vi-VN");
const short = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}tr` : `${Math.round(n / 1000)}k`);

const T = {
  today: { en: "Today", vi: "Hôm nay" },
  rooms: { en: "rooms", vi: "phòng" },
  booked: { en: "Booked", vi: "Đã đặt" },
  free: { en: "Available · price per night", vi: "Còn trống · giá/đêm" },
  hint: { en: "Tap an available date to book", vi: "Chạm vào ngày còn trống để đặt phòng" },
  loading: { en: "Loading…", vi: "Đang tải…" },
};

type Range = { start: string; end: string };

export default function AvailabilityBoard({ rooms }: { rooms: Room[] }) {
  const { lang } = useLang();
  const tx = (o: { en: string; vi: string }) => o[lang];
  const today = useMemo(() => startOfDay(new Date()), []);
  const [anchor, setAnchor] = useState(() => startOfMonth(today));
  const [visibleMonth, setVisibleMonth] = useState(anchor);
  const [busy, setBusy] = useState<Record<string, Range[]>>({});
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef<"today" | "start" | null>("today");

  const list = useMemo(() => rooms.filter((r) => r.pmsRoomId), [rooms]);

  // Ngày bận của từng phòng (chỉ start/end — PMS không trả tên hay tiền)
  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all(
      list.map((r) =>
        fetch(`${PMS_URL}/api/rooms/${r.pmsRoomId}/calendar`)
          .then((res) => (res.ok ? res.json() : []))
          .then((data: Range[]) => [r.pmsRoomId, Array.isArray(data) ? data : []] as const)
          .catch(() => [r.pmsRoomId, []] as const)
      )
    ).then((pairs) => {
      if (!alive) return;
      setBusy(Object.fromEntries(pairs));
      setLoading(false);
    });
    return () => { alive = false; };
  }, [list]);

  const rangeStart = anchor;
  const days = useMemo(
    () => eachDayOfInterval({ start: rangeStart, end: addDays(addMonths(rangeStart, MONTHS_RENDERED), -1) }),
    [rangeStart]
  );
  const total = days.length;
  const gridW = total * CELL_W;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !pendingScroll.current) return;
    const idx = pendingScroll.current === "today" ? differenceInCalendarDays(today, rangeStart) : 0;
    el.scrollTo({ left: Math.max(0, (idx - 1) * CELL_W) });
    pendingScroll.current = null;
  }, [rangeStart, today]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.min(total - 1, Math.max(0, Math.floor((el.scrollLeft + CELL_W) / CELL_W)));
    const m = startOfMonth(days[idx]);
    setVisibleMonth((cur) => (cur.getTime() === m.getTime() ? cur : m));
  }, [days, total]);

  const goTo = (m: Date, target: "today" | "start" = "start") => {
    // không cho lùi về trước tháng hiện tại
    const mm = startOfMonth(m) < startOfMonth(today) ? startOfMonth(today) : startOfMonth(m);
    pendingScroll.current = target;
    setAnchor(mm);
    setVisibleMonth(mm);
  };

  // Gộp các đêm bận thành từng đoạn liên tục để vẽ thanh "Đã đặt" (không phân biệt từng booking)
  const segments = useMemo(() => {
    const out: Record<string, { s: number; e: number }[]> = {};
    for (const r of list) {
      const nights = new Set<number>();
      for (const b of busy[r.pmsRoomId!] ?? []) {
        const s = differenceInCalendarDays(parseISO(b.start), rangeStart);
        const e = differenceInCalendarDays(parseISO(b.end), rangeStart);
        for (let i = Math.max(0, s); i < Math.min(total, e); i++) nights.add(i);
      }
      const sorted = [...nights].sort((a, b) => a - b);
      const segs: { s: number; e: number }[] = [];
      for (const n of sorted) {
        const last = segs[segs.length - 1];
        if (last && last.e === n) last.e = n + 1;
        else segs.push({ s: n, e: n + 1 });
      }
      out[r.pmsRoomId!] = segs;
    }
    return out;
  }, [list, busy, rangeStart, total]);

  const years = [today.getFullYear(), today.getFullYear() + 1];

  return (
    <div className="bg-white rounded-2xl border border-joy-border overflow-hidden flex flex-col" style={{ maxHeight: "min(80vh, 760px)" }}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-joy-border">
        <select value={visibleMonth.getMonth()} aria-label="Month"
          onChange={(e) => goTo(new Date(visibleMonth.getFullYear(), Number(e.target.value), 1))}
          className="h-9 rounded-full border border-joy-border px-3 text-sm font-semibold font-sans text-joy-ink bg-white">
          {Array.from({ length: 12 }).map((_, m) => <option key={m} value={m}>{MONTH(m, lang)}</option>)}
        </select>
        <select value={visibleMonth.getFullYear()} aria-label="Year"
          onChange={(e) => goTo(new Date(Number(e.target.value), visibleMonth.getMonth(), 1))}
          className="h-9 rounded-full border border-joy-border px-3 text-sm font-semibold font-sans text-joy-ink bg-white">
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <button onClick={() => goTo(subMonths(visibleMonth, 1))} aria-label="Previous month"
          className="w-9 h-9 rounded-full flex items-center justify-center text-joy-ink hover:bg-joy-warm"><ChevronLeft size={18} /></button>
        <button onClick={() => goTo(addMonths(visibleMonth, 1))} aria-label="Next month"
          className="w-9 h-9 rounded-full flex items-center justify-center text-joy-ink hover:bg-joy-warm"><ChevronRight size={18} /></button>
        <button onClick={() => goTo(today, "today")}
          className="h-9 px-4 rounded-full border border-joy-border text-sm font-semibold font-sans text-joy-ink hover:border-joy-green">
          {tx(T.today)}
        </button>
        <div className="ml-auto hidden md:flex items-center gap-4 text-xs font-sans text-joy-muted">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#E3E8E3]" />{tx(T.booked)}</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-joy-green" />{tx(T.free)}</span>
          {loading && <span>{tx(T.loading)}</span>}
        </div>
      </div>

      {/* Lưới: 1 vùng cuộn, header sticky top, cột phòng sticky left */}
      <div ref={scrollRef} onScroll={onScroll} className="relative flex-1 min-h-0 overflow-auto overscroll-contain">
        <div className="relative [--sb:124px] sm:[--sb:240px]" style={{ width: `calc(var(--sb) + ${gridW}px)` }}>
          <div className="sticky top-0 z-30 flex bg-white border-b border-joy-border" style={{ height: HEADER_H }}>
            <div className="sticky left-0 z-40 bg-white border-r border-joy-border flex items-end px-3 sm:px-4 pb-2 text-xs font-sans font-semibold text-joy-muted"
              style={{ width: "var(--sb)", minWidth: "var(--sb)" }}>
              {list.length} {tx(T.rooms)}
            </div>
            {days.map((d) => {
              const isT = isSameDay(d, today);
              const first = d.getDate() === 1;
              return (
                <div key={d.toISOString()} className={`relative flex flex-col items-center justify-end pb-2 ${first ? "border-l border-joy-border" : ""}`}
                  style={{ width: CELL_W, minWidth: CELL_W }}>
                  {first && (
                    <span className="absolute top-1.5 left-2 text-[11px] font-sans font-semibold text-joy-ink whitespace-nowrap">
                      {MONTH(d.getMonth(), lang)} {d.getFullYear()}
                    </span>
                  )}
                  <span className={`text-[11px] font-sans ${isT ? "text-joy-green font-semibold" : "text-joy-muted"}`}>{WD[lang][getDay(d)]}</span>
                  <span className={`mt-0.5 w-8 h-8 flex items-center justify-center rounded-full text-sm font-sans font-semibold
                    ${isT ? "bg-joy-charcoal text-white" : "text-joy-ink"}`}>{d.getDate()}</span>
                </div>
              );
            })}
          </div>

          {list.map((room) => {
            const segs = segments[room.pmsRoomId!] ?? [];
            const bookedIdx = new Set<number>();
            segs.forEach((sg) => { for (let i = sg.s; i < sg.e; i++) bookedIdx.add(i); });
            return (
              <div key={room.id} className="relative flex border-b border-joy-border/70" style={{ height: ROW_H }}>
                <Link href={`/rooms/${room.slug}`}
                  className="sticky left-0 z-20 bg-white border-r border-joy-border flex items-center gap-2 sm:gap-3 px-2 sm:px-4 hover:bg-joy-cream"
                  style={{ width: "var(--sb)", minWidth: "var(--sb)" }} title={room.name}>
                  {room.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`${room.featuredImage}?w=96&h=96&fit=crop&auto=format`} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  ) : (
                    <span className="w-10 h-10 rounded-lg shrink-0 bg-joy-warm" />
                  )}
                  <span className="text-xs sm:text-sm font-sans text-joy-ink truncate">{room.name}</span>
                </Link>

                <div className="relative flex" style={{ width: gridW }}>
                  {days.map((d, i) => {
                    const key = format(d, "yyyy-MM-dd");
                    const past = d < today;
                    const booked = bookedIdx.has(i);
                    const weekend = getDay(d) === 5 || getDay(d) === 6;
                    const price = weekend ? room.weekendPrice ?? room.pricePerNight : room.pricePerNight;
                    const free = !past && !booked && !loading;
                    const cls = `relative block h-full border-r border-joy-border/50 ${d.getDate() === 1 ? "border-l border-l-joy-border" : ""} ${past ? "bg-joy-cream/60" : ""}`;
                    const style = { width: CELL_W, minWidth: CELL_W };
                    if (!free) return <div key={key} className={cls} style={style} />;
                    return (
                      <Link key={key} href={`/checkout?room=${room.slug}&checkIn=${key}&checkOut=${format(addDays(d, 1), "yyyy-MM-dd")}`}
                        className={`${cls} hover:bg-joy-warm transition-colors`} style={style}
                        aria-label={`${room.name} ${key} ${price ? vnd(price) : ""}`}>
                        <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-joy-green" />
                        {price ? (
                          <span className="absolute bottom-2 left-2 text-[11px] font-sans text-joy-ink/70 tabular-nums">
                            <span className="sm:hidden">{short(price)}</span>
                            <span className="hidden sm:inline">{vnd(price)}</span>
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}

                  {/* Thanh "Đã đặt" — không hiển thị tên khách hay số tiền */}
                  {segs.map((sg) => {
                    const s = Math.max(0, sg.s + 0.5), e = Math.min(total, sg.e + 0.5);
                    if (e <= s) return null;
                    return (
                      <div key={sg.s} aria-hidden
                        className="absolute top-2 h-9 z-10 flex items-center px-3 rounded-full bg-[#E3E8E3] text-joy-muted text-[11px] font-sans font-semibold pointer-events-none"
                        style={{ left: s * CELL_W + 2, width: (e - s) * CELL_W - 4 }}>
                        {(e - s) >= 1.5 && <span className="sticky truncate" style={{ left: "calc(var(--sb) + 12px)" }}>{tx(T.booked)}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="px-4 py-2.5 border-t border-joy-border text-xs font-sans text-joy-muted">{tx(T.hint)}</p>
    </div>
  );
}
