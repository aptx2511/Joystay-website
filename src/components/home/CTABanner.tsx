"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";
import { useSettings } from "@/lib/settings-context";

export default function CTABanner({ promoCode }: { promoCode?: string | null }) {
  const { lang } = useLang();
  const site = useSettings();

  return (
    <section className="bg-joy-charcoal text-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-10 lg:gap-20 items-end">
        <div>
          <span className="section-tag text-joy-green-light">{tx(T.cta.tag, lang)}</span>
          <h2 className="font-serif text-display-xl font-light leading-[1.05] text-balance mt-4">
            {tx(T.cta.title, lang)}{" "}
            <em className="italic text-joy-green-light">{tx(T.cta.italic, lang)}</em>
          </h2>
        </div>
        <div>
          <p className="font-sans text-base text-white/70 max-w-lg leading-relaxed">{tx(T.cta.desc, lang)}</p>

          {/* Chỉ hiện khi mã đang active trong Sanity → không quảng cáo mã đã hết hạn */}
          {promoCode && (
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-5 py-2 mt-5">
              <span className="font-mono text-joy-green-light font-semibold text-sm tracking-widest">{promoCode}</span>
              <span className="text-white/60 text-xs">{tx(T.cta.promo, lang)}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/availability" className="btn-primary bg-joy-green-light text-joy-charcoal hover:bg-white">
              {tx(T.cta.bookBtn, lang)} <ArrowRight size={16} />
            </Link>
            <a href={site.zaloLink} target="_blank" rel="noreferrer" className="btn-ghost-light">
              <MessageCircle size={16} />
              {tx(T.cta.zaloBtn, lang)}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50 font-sans">
            <span>{tx(T.cta.trust1, lang)}</span>
            <span>{tx(T.cta.trust2, lang)}</span>
            <span>{tx(T.cta.trust3, lang)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
