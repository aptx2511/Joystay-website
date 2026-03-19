"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  startOfMonth, endOfMonth, eachDayOfInterval, getDay,
  format, addMonths, subMonths, isBefore, isToday,
  parseISO, isWithinInterval, startOfDay,
} from "date-fns";

type BlockedRange = { start: string; end: string };

const PMS_URL = process.env.NEXT_PUBLIC_PMS_URL ?? "https://joystay-pms.vercel.app";

function isBlocked(date: Date, ranges: BlockedRange[]): boolean {
  const d = startOfDay(date);
  return ranges.some((r) => {
    const start = startOfDay(parseISO(r.start));
    const end   = startOfDay(parseISO(r.end));
    // check-out day is available (guest leaves that morning)
    return isWithinInterval(d, { start, end: new Date(end.getTime() - 1) });
  });
}

export default function AvailabilityCalendar({ pmsRoomId }: { pmsRoomId: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blocked, setBlocked]           = useState<BlockedRange[]>([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${PMS_URL}/api/rooms/${pmsRoomId}/calendar`)
      .then((r) => r.json())
      .then((data: BlockedRange[]) => setBlocked(data))
      .catch(() => setBlocked([]))
      .finally(() => setLoading(false));
  }, [pmsRoomId]);

  const days        = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
  const startOffset = getDay(startOfMonth(currentMonth)); // 0=Sun
  const today       = startOfDay(new Date());

  return (
    <div className="bg-white border border-joy-border rounded-2xl p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-serif text-lg text-joy-ink font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       text-joy-muted hover:bg-joy-warm hover:text-joy-ink transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       text-joy-muted hover:bg-joy-warm hover:text-joy-ink transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center font-sans text-[10px] font-semibold
                                   tracking-widest uppercase text-joy-muted py-1">
            {d}
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-joy-muted gap-2">
          <Loader2 size={16} className="animate-spin" />
          <span className="font-sans text-sm">Loading availability…</span>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-0.5">
          {/* Empty offset cells */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {days.map((day) => {
            const isPast    = isBefore(startOfDay(day), today);
            const isBooked  = isBlocked(day, blocked);
            const isTodayDay = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={`
                  aspect-square flex items-center justify-center rounded-lg
                  font-sans text-xs font-medium select-none
                  ${isPast
                    ? "text-joy-muted/30 cursor-not-allowed"
                    : isBooked
                      ? "bg-red-100 text-red-400 cursor-not-allowed line-through"
                      : "bg-joy-green/10 text-joy-green cursor-default hover:bg-joy-green/20 transition-colors"
                  }
                  ${isTodayDay ? "ring-2 ring-joy-green ring-offset-1" : ""}
                `}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-5 mt-5 pt-4 border-t border-joy-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-joy-green/10 border border-joy-green/30" />
          <span className="font-sans text-xs text-joy-muted">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-red-100" />
          <span className="font-sans text-xs text-joy-muted">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-white border border-joy-border" />
          <span className="font-sans text-xs text-joy-muted">Past</span>
        </div>
      </div>
    </div>
  );
}
