"use client";

import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
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

const SOURCE_BADGE: Record<string, { label: string; bg: string; dot: string }> = {
  Airbnb:  { label: "Airbnb",  bg: "bg-rose-50 border-rose-100 text-rose-500",   dot: "bg-rose-500"   },
  Google:  { label: "Google",  bg: "bg-blue-50 border-blue-100 text-blue-500",   dot: "bg-blue-500"   },
  Direct:  { label: "Direct",  bg: "bg-joy-warm border-joy-border text-joy-muted", dot: "bg-joy-green" },
};

export interface GoogleSummary { rating: number; total: number; mapsUrl: string; writeUrl: string }

export default function TestimonialsSection({ reviews, google }: { reviews: Review[]; google?: GoogleSummary | null }) {
  const { lang } = useLang();

  const totalReviews = reviews.length;
  // Ưu tiên điểm tổng của Google (tính trên toàn bộ đánh giá), nếu không có thì tính trung bình các đánh giá đang hiển thị
  const avgRating = google && google.total > 0
    ? google.rating.toFixed(1)
    : totalReviews ? (reviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1) : "5.0";
  const countLabel = google && google.total > 0
    ? `${google.total} ${tx(T.testimonials.reviews, lang)} ${tx(T.testimonials.google, lang)}`
    : `${totalReviews} ${tx(T.testimonials.reviews, lang)}`;

  return (
    <section className="bg-joy-cream py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="text-center mb-14">
          <SectionHeading
            tag={tx(T.testimonials.tag, lang)}
            title={tx(T.testimonials.title, lang)}
            titleItalic={tx(T.testimonials.italic, lang)}
            center
          />
          {totalReviews > 0 && <div className="flex items-center justify-center gap-1 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="text-joy-green fill-joy-green" />
            ))}
            <span className="ml-2 font-sans text-sm text-joy-muted">
              {avgRating} · {countLabel}
            </span>
          </div>}
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-joy-muted font-sans text-sm">
            {lang === "vi" ? "Bạn đã ở Joystay? Chia sẻ cảm nhận của bạn trên Google nhé." : "Stayed with us? Share your experience on Google."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => {
              const badge = SOURCE_BADGE[r.source ?? "Airbnb"] ?? SOURCE_BADGE.Airbnb;
              const displayText = lang === "vi" && r.textVi ? r.textVi : r.text;
              return (
                <article key={r._id}
                  className="bg-white border border-joy-border rounded-2xl p-7 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-400 ease-joy">

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={13} className="text-joy-green fill-joy-green" />
                    ))}
                  </div>

                  {/* Quote mark */}
                  <span className="font-serif text-5xl text-joy-green/20 leading-none -mt-2 mb-2 select-none">&ldquo;</span>

                  {/* Review text */}
                  <p className="font-sans text-sm text-joy-ink/80 leading-relaxed flex-1">
                    {displayText}
                  </p>

                  {/* Footer */}
                  <div className="mt-6 pt-5 border-t border-joy-border">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-sans font-semibold text-sm text-joy-ink">
                          {r.flag} {r.guestName}
                        </p>
                        <p className="font-sans text-xs text-joy-muted mt-0.5">
                          {[r.country, r.stayDate].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      {r.stayType && (
                        <span className="font-sans text-[10px] text-joy-muted tracking-wide bg-joy-warm px-3 py-1 rounded-full border border-joy-border">
                          {r.stayType}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {r.roomName && (
                        <span className="font-sans text-[10px] text-joy-muted italic">
                          {r.roomName}
                        </span>
                      )}
                      <span className={`ml-auto inline-flex items-center gap-1.5 font-sans text-[10px] font-medium px-3 py-1 rounded-full border ${badge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {totalReviews > 0 && (
            google?.mapsUrl ? (
              <a href={google.mapsUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs text-joy-muted bg-white border border-joy-border px-5 py-2.5 rounded-full hover:border-joy-green">
                <span className="w-2 h-2 rounded-full bg-joy-green" />
                {tx(T.testimonials.verified, lang)}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 font-sans text-xs text-joy-muted bg-white border border-joy-border px-5 py-2.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-joy-green" />
                {tx(T.testimonials.verified, lang)}
              </span>
            )
          )}
          {google?.writeUrl && (
            <a href={google.writeUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-joy-green bg-white border border-joy-border px-5 py-2.5 rounded-full hover:border-joy-green">
              ★ {tx(T.testimonials.writeReview, lang)}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
