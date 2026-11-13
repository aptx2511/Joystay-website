"use client";

import MiniBookingWidget from "@/components/booking/MiniBookingWidget";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

interface HeroBg {
  type?: "image" | "video";
  imageUrl?: string;
  imageHotspot?: { x: number; y: number };
  videoUrl?: string;
  overlayOpacity?: number;
}

/** Hero kiểu Gallery (11/2026): ảnh/video tràn màn hình, chữ lớn canh trái ở đáy, thanh chọn ngày gọn.
 *  Ảnh/video vẫn lấy từ Sanity (Cài đặt website → Hero background). */
export default function HeroSection({ heroBackground }: { heroBackground?: HeroBg | null }) {
  const { lang } = useLang();
  const isVideo = heroBackground?.type === "video" && !!heroBackground.videoUrl;
  const isImage = !isVideo && !!heroBackground?.imageUrl;
  // Lớp phủ đều: lấy theo Sanity nhưng giới hạn nhẹ để ảnh vẫn sáng; phần chữ đã có dải tối riêng ở đáy
  const veil = Math.min((heroBackground?.overlayOpacity ?? 60) / 100, 1) * 0.3;

  return (
    <section className="relative min-h-[86svh] max-h-[900px] flex items-end overflow-hidden bg-joy-charcoal text-white">
      {isVideo && (
        <video key={heroBackground!.videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={heroBackground!.videoUrl} type="video/mp4" />
          <source src={heroBackground!.videoUrl} type="video/webm" />
        </video>
      )}
      {isImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`${heroBackground!.imageUrl}?w=1920&auto=format&q=85`} alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={heroBackground!.imageHotspot ? {
            objectPosition: `${heroBackground!.imageHotspot.x * 100}% ${heroBackground!.imageHotspot.y * 100}%`,
          } : undefined} />
      )}
      {(isVideo || isImage) && <div className="absolute inset-0 bg-black" style={{ opacity: veil }} />}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,.36) 0, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 44%, rgba(8,20,10,.72) 100%)" }} />

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-8 sm:pb-10">
        <p className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/80 mb-4">
          {tx(T.hero.eyebrow, lang)}
        </p>
        <h1 className={`font-serif font-normal leading-[0.92] tracking-[-0.02em] text-balance
                        ${lang === "vi" ? "text-[clamp(2.75rem,8vw,7rem)]" : "text-[clamp(3.4rem,10.5vw,9.25rem)]"}`}>
          {tx(T.hero.heading1, lang)}{" "}
          <em className="italic text-joy-green-light">{tx(T.hero.heading2, lang)}</em>
        </h1>
        <p className="mt-5 mb-7 font-sans text-sm sm:text-[15px] tracking-wide text-white/90">
          {lang === "vi"
            ? "6 phòng nghệ thuật · tự check-in 24/7 · Quận 3, Sài Gòn"
            : "6 art rooms · self check-in 24/7 · District 3, Saigon"}
        </p>
        <MiniBookingWidget />
      </div>
    </section>
  );
}
