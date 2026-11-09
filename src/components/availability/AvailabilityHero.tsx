"use client";
import { useLang } from "@/lib/lang-context";

export default function AvailabilityHero() {
  const { lang } = useLang();
  return (
    <section className="bg-joy-cream pt-28 sm:pt-32 pb-8 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <span className="section-tag mb-4 block">{lang === "vi" ? "Lịch phòng trống" : "Availability"}</span>
        <h1 className="font-serif text-display-lg text-joy-ink font-light">
          {lang === "vi" ? "Chọn ngày," : "Pick your dates,"}{" "}
          <em className="italic text-joy-green">{lang === "vi" ? "chọn phòng." : "pick your room."}</em>
        </h1>
        <p className="mt-3 text-joy-muted font-sans text-sm max-w-xl">
          {lang === "vi"
            ? "Toàn bộ phòng Joystay trên một lịch. Giá hiển thị là giá đặt trực tiếp mỗi đêm."
            : "Every Joystay room on one calendar. Prices shown are direct-booking rates per night."}
        </p>
      </div>
    </section>
  );
}
