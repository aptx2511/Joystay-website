"use client";

import { MapPin, KeyRound, Palette } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { USPS } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

const ICON_MAP = { MapPin, KeyRound, Palette } as const;

export default function AboutSection() {
  const { lang } = useLang();

  return (
    <section id="about" className="bg-joy-warm py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20 sm:mb-28">
          <SectionHeading
            tag={tx(T.about.tag, lang)}
            title={tx(T.about.title, lang)}
            titleItalic={tx(T.about.italic, lang)}
            subtitle={tx(T.about.subtitle, lang)}
          />
          <div className="relative pl-6 border-l-2 border-joy-green/40">
            <p className="font-serif text-xl sm:text-2xl text-joy-ink font-light italic leading-relaxed">
              &ldquo;{tx(T.about.quote, lang)}&rdquo;
            </p>
            <p className="mt-4 font-sans text-xs text-joy-muted tracking-widest uppercase">
              {tx(T.about.quoteAuthor, lang)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {USPS.map((usp, idx) => {
            const Icon = ICON_MAP[usp.icon as keyof typeof ICON_MAP];
            return (
              <div key={usp.title}
                className="group relative bg-white border border-joy-border rounded-2xl p-8 hover:border-joy-green/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-joy overflow-hidden">
                <span className="absolute top-4 right-5 font-serif text-6xl font-light text-joy-ink/5 select-none pointer-events-none group-hover:text-joy-green/10 transition-colors duration-500">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="w-11 h-11 rounded-xl bg-joy-warm flex items-center justify-center mb-6 group-hover:bg-joy-green/10 transition-colors duration-300">
                  <Icon size={20} className="text-joy-green" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-medium text-joy-ink mb-1">
                  {lang === "en" ? usp.title : usp.titleVi}
                </h3>
                <p className="font-sans text-sm text-joy-muted leading-relaxed">
                  {lang === "en" ? usp.description : usp.descriptionVi}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
