"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

export default function TestimonialsSection() {
  const { lang } = useLang();

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
          <div className="flex items-center justify-center gap-1 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="text-joy-green fill-joy-green" />
            ))}
            <span className="ml-2 font-sans text-sm text-joy-muted">
              {tx(T.testimonials.reviews, lang)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <article key={t.id}
              className="bg-white border border-joy-border rounded-2xl p-7 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-400 ease-joy">
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-joy-green fill-joy-green" />
                ))}
              </div>
              <span className="font-serif text-5xl text-joy-green/20 leading-none -mt-2 mb-2 select-none">&ldquo;</span>
              <p className="font-sans text-sm text-joy-ink/80 leading-relaxed flex-1">{t.text}</p>
              <div className="mt-6 pt-5 border-t border-joy-border flex items-center justify-between">
                <div>
                  <p className="font-sans font-semibold text-sm text-joy-ink">{t.flag} {t.name}</p>
                  <p className="font-sans text-xs text-joy-muted mt-0.5">{t.country}</p>
                </div>
                <span className="font-sans text-[10px] text-joy-muted tracking-wide bg-joy-warm px-3 py-1 rounded-full">
                  {t.stayType}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-2 font-sans text-xs text-joy-muted bg-white border border-joy-border px-5 py-2.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            {tx(T.testimonials.verified, lang)}
          </span>
        </div>
      </div>
    </section>
  );
}
