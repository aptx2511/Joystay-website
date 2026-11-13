"use client";

import { useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

export interface Review {
  _id: string;
  guestName: string;
  flag?: string;
  country?: string;
  rating: number;
  text: string;
  textVi?: string;
  stayType?: string;
  roomName?: string;
  source?: string;
  stayDate?: string;
}

export interface GoogleSummary { rating: number; total: number; mapsUrl: string; writeUrl: string }

export default function TestimonialsSection({ reviews, google }: { reviews: Review[]; google?: GoogleSummary | null }) {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const total = reviews.length;
  // Ưu tiên điểm tổng của Google (tính trên toàn bộ đánh giá), nếu không có thì tính trung bình các đánh giá đang hiển thị
  const avgRating = google && google.total > 0
    ? google.rating.toFixed(1)
    : total ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : "5.0";
  const countLabel = google && google.total > 0
    ? `${google.total} ${tx(T.testimonials.reviews, lang)} ${tx(T.testimonials.google, lang)}`
    : `${total} ${tx(T.testimonials.reviews, lang)}`;

  const go = (d: number) => {
    if (total < 2) return;
    setFading(true);
    window.setTimeout(() => { setIdx((i) => (i + d + total) % total); setFading(false); }, 260);
  };
  const r = reviews[Math.min(idx, Math.max(0, total - 1))];
  const text = r ? (lang === "vi" && r.textVi ? r.textVi : r.text) : "";

  return (
    <section className="bg-joy-cream py-20 sm:py-28">
      <Reveal className="max-w-4xl mx-auto px-5 sm:px-8">
        <span className="section-tag">{tx(T.testimonials.tag, lang)}</span>
        {total > 0 && (
          <p className="mt-3 flex items-center gap-1.5 font-sans text-sm text-joy-muted">
            <Star size={15} className="text-joy-green fill-joy-green" />
            <b className="text-joy-ink">{avgRating}</b> · {countLabel}
          </p>
        )}

        {!r ? (
          <p className="mt-8 text-joy-muted font-sans">
            {lang === "vi" ? "Bạn đã ở Joystay? Chia sẻ cảm nhận của bạn trên Google nhé." : "Stayed with us? Share your experience on Google."}
          </p>
        ) : (
          <>
            <blockquote aria-live="polite"
              className={`mt-7 mb-7 border-l-[3px] border-joy-green pl-5 sm:pl-8 font-serif text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.22] text-joy-ink text-balance
                          min-h-[4.5em] transition-all duration-300 ${fading ? "opacity-0 translate-y-2" : "opacity-100"}`}>
              &ldquo;{text}&rdquo;
            </blockquote>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-joy-border pt-5">
              <p className="font-sans text-sm text-joy-muted">
                <b className="text-joy-ink">{r.flag} {r.guestName}</b>
                {[r.source ?? "Airbnb", r.roomName, r.stayDate].filter(Boolean).map((x) => ` · ${x}`).join("")}
                {total > 1 && <span className="tabular-nums"> · {idx + 1}/{total}</span>}
              </p>
              {total > 1 && (
                <div className="flex gap-2">
                  {[-1, 1].map((d) => (
                    <button key={d} type="button" onClick={() => go(d)} aria-label={d < 0 ? "Previous review" : "Next review"}
                      className="w-11 h-11 rounded-full border border-joy-green-dark text-joy-green-dark grid place-items-center
                                 hover:bg-joy-green-dark hover:text-white active:scale-95 transition-all duration-200">
                      {d < 0 ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {total > 0 && google?.mapsUrl && (
            <a href={google.mapsUrl} target="_blank" rel="noreferrer" className="link-line">{tx(T.testimonials.verified, lang)}</a>
          )}
          {google?.writeUrl && (
            <a href={google.writeUrl} target="_blank" rel="noreferrer" className="link-line">★ {tx(T.testimonials.writeReview, lang)}</a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
