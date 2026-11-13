"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { trackViewRoom } from "@/lib/analytics";
import { ArrowLeft, Maximize2, Users, Wifi, AirVent, Tv, Utensils,
         ShowerHead, WashingMachine, Coffee, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Room, GalleryImage } from "@/lib/mock-data";
import AvailabilityCalendar from "./AvailabilityCalendar";
import { useLang } from "@/lib/lang-context";
import { amenityLabel, floorLabel, bedLabel } from "@/lib/room-facts";

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
  // Tên tiện ích theo Airbnb (room-facts.ts)
  "Wifi":             <Wifi size={15} />,
  "Air conditioning": <AirVent size={15} />,
  "TV":               <Tv size={15} />,
  "Kitchen":          <Utensils size={15} />,
  "Cooking basics":   <Utensils size={15} />,
  "Dryer":            <WashingMachine size={15} />,
  "Kitchenette":      <Utensils size={15} />,
  "Hot water":        <ShowerHead size={15} />,
};

const GALLERY_TABS = [
  { key: "bedroom",  label: "🛏 Phòng ngủ" },
  { key: "living",   label: "🛋 Phòng khách" },
  { key: "kitchen",  label: "🍳 Bếp" },
  { key: "bathroom", label: "🚿 Phòng tắm" },
  { key: "other",    label: "✨ Không gian khác" },
] as const;

type GalleryKey = typeof GALLERY_TABS[number]["key"];

export default function RoomDetail({ room }: { room: Room }) {
  const { lang } = useLang();
  const gallery = room.gallery ?? {};
  const availableTabs = GALLERY_TABS.filter((t) => {
    const imgs = gallery[t.key];
    return imgs && imgs.length > 0;
  });

  const [activeTab, setActiveTab] = useState<GalleryKey>(availableTabs[0]?.key ?? "bedroom");
  const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

  useEffect(() => {
    if (room.pricePerNight) trackViewRoom(room.name, room.pricePerNight);
  }, [room.name, room.pricePerNight]);

  const activeImages: GalleryImage[] = gallery[activeTab] ?? [];

  // All images flat for lightbox navigation
  const allImages = availableTabs.flatMap((t) => gallery[t.key] ?? []);

  const openLightbox = (images: GalleryImage[], index: number) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((l) => l ? { ...l, index: (l.index - 1 + l.images.length) % l.images.length } : null);
  const nextImage = () => setLightbox((l) => l ? { ...l, index: (l.index + 1) % l.images.length } : null);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className={`relative min-h-[55vh] sm:min-h-[65vh] flex items-end overflow-hidden
                           ${!room.featuredImage ? `bg-gradient-to-br ${room.gradient}` : ""}`}
               style={{ viewTransitionName: "room-hero" }}>
        {room.featuredImage ? (
          <Image
            src={room.featuredImage}
            alt={room.name}
            fill
            className="object-cover"
            style={room.featuredImageHotspot ? {
              objectPosition: `${(room.featuredImageHotspot.x ?? 0.5) * 100}% ${(room.featuredImageHotspot.y ?? 0.5) * 100}%`
            } : undefined}
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <Link
          href="/rooms"
          className="absolute top-28 sm:top-32 left-5 sm:left-8 flex items-center gap-2
                     text-white/80 hover:text-white font-sans text-sm transition-colors z-10"
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
          {room.tagline && (
            <p className="font-sans text-white/70 text-base mt-2 italic">{room.tagline}</p>
          )}
          <div className="flex flex-wrap items-center gap-6 mt-4 text-white/60 font-sans text-sm">
            {room.roomNumber && (
              <span>{lang === "vi" ? "Phòng" : "Room"} {room.roomNumber} · {floorLabel(room.floor ?? 0, lang)}</span>
            )}
            <span className="flex items-center gap-2"><Maximize2 size={14} /> {room.size} m²</span>
            <span className="flex items-center gap-2"><Users size={14} /> {lang === "vi" ? `Tối đa ${room.maxGuests} khách` : `Up to ${room.maxGuests} guests`}</span>
            {room.bedType && <span>🛏 {bedLabel(room.bedType, lang)}</span>}
            {room.hasWindow === false && <span>{lang === "vi" ? "Không có cửa sổ" : "No window"}</span>}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold
                              ${room.isAvailable ? "bg-joy-green/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
              {room.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────── */}
      {availableTabs.length > 0 && (
        <section className="bg-joy-charcoal py-10 px-5 sm:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {availableTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full font-sans text-sm font-medium transition-colors
                    ${activeTab === tab.key
                      ? "bg-joy-green text-white"
                      : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"}`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({(gallery[tab.key] ?? []).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            {activeImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                {activeImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => openLightbox(activeImages, i)}
                    className={`relative overflow-hidden rounded-xl bg-white/5 group
                      ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt ?? `${room.name} — ${activeTab} ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={img.hotspot ? {
                        objectPosition: `${(img.hotspot.x ?? 0.5) * 100}% ${(img.hotspot.y ?? 0.5) * 100}%`
                      } : undefined}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-white/30 font-sans text-sm py-8 text-center">Chưa có ảnh</p>
            )}
          </div>
        </section>
      )}

      {/* ── Main Content ──────────────────────────────────────────── */}
      <section className="bg-joy-cream py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-serif text-2xl text-joy-ink font-light mb-4">About this room</h2>
              <p className="font-sans text-base text-joy-muted leading-relaxed">{room.shortDescription}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-joy-ink font-light mb-5">{lang === "vi" ? "Tiện ích" : "Amenities"}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 bg-white border border-joy-border rounded-xl px-4 py-3">
                    <span className="text-joy-green">{AMENITY_ICONS[a] ?? <Coffee size={15} />}</span>
                    <span className="font-sans text-sm text-joy-ink">{amenityLabel(a, lang)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-joy-ink font-light mb-5">Availability</h2>
              <AvailabilityCalendar pmsRoomId={room.pmsRoomId} />
            </div>
          </div>

          {/* Right — Booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-joy-border rounded-2xl p-6 shadow-sm space-y-5">
              <div>
                <p className="font-sans text-xs tracking-[0.12em] uppercase text-joy-muted mb-1">Starting from</p>
                <p className="font-serif text-3xl text-joy-ink">
                  {(room.pricePerNight / 1000).toFixed(0)}k
                  <span className="font-sans text-sm text-joy-muted"> VND/đêm</span>
                </p>
                {room.weekendPrice && (
                  <p className="font-sans text-sm text-joy-muted mt-0.5">
                    T6–T7:{" "}
                    <span className="text-joy-ink font-medium">
                      {(room.weekendPrice / 1000).toFixed(0)}k VND/đêm
                    </span>
                  </p>
                )}
                {room.pricePerMonth && (
                  <p className="font-sans text-sm text-joy-green mt-1">
                    {(room.pricePerMonth / 1000000).toFixed(1)}M VND/tháng
                  </p>
                )}
              </div>

              {room.securityDeposit && (
                <div className="bg-joy-warm border border-joy-border rounded-xl p-3">
                  <p className="font-sans text-xs text-joy-muted leading-relaxed">
                    🔒 Tiền cọc:{" "}
                    <strong className="text-joy-ink">{(room.securityDeposit / 1000000).toFixed(0)}M VND</strong>
                    {room.securityDepositNote ? ` — ${room.securityDepositNote}` : " — hoàn trả đầy đủ sau checkout"}
                  </p>
                </div>
              )}

              <Link
                href={`/checkout?room=${room.slug}`}
                className={`btn-primary w-full justify-center py-3.5 ${!room.isAvailable ? "opacity-50 pointer-events-none" : ""}`}
              >
                Book This Room <ArrowRight size={15} />
              </Link>

              <div className="pt-3 border-t border-joy-border">
                <p className="font-sans text-xs font-semibold tracking-[0.12em] uppercase text-joy-muted mb-3">Stay Options</p>
                <div className="space-y-2 text-sm font-sans text-joy-muted">
                  {(room.stayType === "SHORT_STAY" || room.stayType === "BOTH") && (
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-joy-green" /> Short Stay (nightly)</div>
                  )}
                  {(room.stayType === "LONG_STAY" || room.stayType === "BOTH") && (
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-joy-green" /> Long Stay (monthly)</div>
                  )}
                </div>
              </div>

              {(room.stayType === "LONG_STAY" || room.stayType === "BOTH") && (
                <Link href="/contact" className="btn-ghost w-full justify-center py-3 text-sm">
                  Hỏi thuê dài hạn
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-5 right-5 text-white/60 hover:text-white z-10 p-2">
            <X size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white/60 hover:text-white z-10 p-3">
            <ChevronLeft size={36} />
          </button>
          <div className="relative w-full max-w-4xl max-h-[85vh] mx-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.images[lightbox.index].url}
              alt={lightbox.images[lightbox.index].alt ?? ""}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[85vh]"
            />
            <p className="text-center text-white/40 font-sans text-sm mt-3">
              {lightbox.index + 1} / {lightbox.images.length}
            </p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white/60 hover:text-white z-10 p-3">
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  );
}
