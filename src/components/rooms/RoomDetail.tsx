import Link from "next/link";
import { ArrowLeft, Maximize2, Users, Wifi, AirVent, Tv, Utensils,
         ShowerHead, WashingMachine, Coffee, ArrowRight } from "lucide-react";
import type { Room } from "@/lib/mock-data";
import AvailabilityCalendar from "./AvailabilityCalendar";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Full Kitchen":  <Utensils size={15} />,
  "WiFi":          <Wifi size={15} />,
  "AC":            <AirVent size={15} />,
  "Smart TV":      <Tv size={15} />,
  "Washer":        <WashingMachine size={15} />,
  "Rain Shower":   <ShowerHead size={15} />,
  "Shower":        <ShowerHead size={15} />,
  "Mini Fridge":   <Coffee size={15} />,
  "Bathtub":       <ShowerHead size={15} />,
};

export default function RoomDetail({ room }: { room: Room }) {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className={`relative bg-gradient-to-br ${room.gradient} min-h-[50vh] sm:min-h-[60vh]
                           flex items-end overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40" />

        {/* Back button */}
        <Link
          href="/rooms"
          className="absolute top-28 sm:top-32 left-5 sm:left-8 flex items-center gap-2
                     text-white/70 hover:text-white font-sans text-sm transition-colors z-10"
        >
          <ArrowLeft size={16} /> All Rooms
        </Link>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-12 pt-28 sm:pt-32">
          <span className={`inline-block ${room.accentColor} text-white font-sans
                            text-[10px] font-semibold tracking-[0.15em] uppercase
                            px-3 py-1 rounded-full mb-4`}>
            {room.concept}
          </span>
          <h1 className="font-serif text-display-xl text-white font-light">
            {room.name}
          </h1>
          <div className="flex items-center gap-6 mt-4 text-white/60 font-sans text-sm">
            <span className="flex items-center gap-2">
              <Maximize2 size={14} /> {room.size} m²
            </span>
            <span className="flex items-center gap-2">
              <Users size={14} /> Tối đa {room.maxGuests} khách
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold
                              ${room.isAvailable
                                ? "bg-joy-green/20 text-green-300"
                                : "bg-red-500/20 text-red-300"}`}>
              {room.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────── */}
      <section className="bg-joy-cream py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left — Description + Amenities */}
          <div className="lg:col-span-2 space-y-10">

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl text-joy-ink font-light mb-4">
                About this room
              </h2>
              <p className="font-sans text-base text-joy-muted leading-relaxed">
                {room.shortDescription}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-serif text-2xl text-joy-ink font-light mb-5">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((a) => (
                  <div key={a}
                       className="flex items-center gap-3 bg-white border border-joy-border
                                  rounded-xl px-4 py-3">
                    <span className="text-joy-green">
                      {AMENITY_ICONS[a] ?? <Coffee size={15} />}
                    </span>
                    <span className="font-sans text-sm text-joy-ink">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Calendar */}
            <div>
              <h2 className="font-serif text-2xl text-joy-ink font-light mb-5">
                Availability
              </h2>
              <AvailabilityCalendar pmsRoomId={room.pmsRoomId} />
            </div>
          </div>

          {/* Right — Booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-joy-border
                            rounded-2xl p-6 shadow-sm space-y-5">
              {/* Price */}
              <div>
                <p className="font-sans text-xs tracking-[0.12em] uppercase text-joy-muted mb-1">
                  Starting from
                </p>
                <p className="font-serif text-3xl text-joy-ink">
                  {(room.pricePerNight / 1000).toFixed(0)}k
                  <span className="font-sans text-sm text-joy-muted"> VND/đêm</span>
                </p>
                {room.pricePerMonth && (
                  <p className="font-sans text-sm text-joy-green mt-1">
                    {(room.pricePerMonth / 1000000).toFixed(1)}M VND/tháng
                  </p>
                )}
              </div>

              {/* Security deposit note */}
              {room.securityDeposit && (
                <div className="bg-joy-warm border border-joy-border rounded-xl p-3">
                  <p className="font-sans text-xs text-joy-muted leading-relaxed">
                    🔒 Tiền cọc:{" "}
                    <strong className="text-joy-ink">
                      {(room.securityDeposit / 1000000).toFixed(0)}M VND
                    </strong>{" "}
                    — hoàn trả đầy đủ sau khi checkout
                  </p>
                </div>
              )}

              {/* Book CTA */}
              <Link
                href={`/checkout?room=${room.slug}`}
                className={`btn-primary w-full justify-center py-3.5
                            ${!room.isAvailable ? "opacity-50 pointer-events-none" : ""}`}
              >
                Book This Room <ArrowRight size={15} />
              </Link>

              {/* Stay types */}
              <div className="pt-3 border-t border-joy-border">
                <p className="font-sans text-xs font-semibold tracking-[0.12em] uppercase
                               text-joy-muted mb-3">
                  Stay Options
                </p>
                <div className="space-y-2 text-sm font-sans text-joy-muted">
                  {(room.stayType === "SHORT_STAY" || room.stayType === "BOTH") && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-joy-green" />
                      Short Stay (nightly)
                    </div>
                  )}
                  {(room.stayType === "LONG_STAY" || room.stayType === "BOTH") && (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-joy-green" />
                      Long Stay (monthly)
                    </div>
                  )}
                </div>
              </div>

              {/* Contact for long stay */}
              {(room.stayType === "LONG_STAY" || room.stayType === "BOTH") && (
                <Link
                  href="/contact"
                  className="btn-ghost w-full justify-center py-3 text-sm"
                >
                  Hỏi thuê dài hạn
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
