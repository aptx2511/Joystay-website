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
    <section className="relative overflow-hidden bg-joy-ink py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-joy-green/8 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <span className="section-tag text-joy-green mb-5 justify-center">
          {tx(T.cta.tag, lang)}
        </span>

        <h2 className="font-serif text-display-xl text-white font-light leading-tight text-balance mt-4">
          {tx(T.cta.title, lang)}
          <br />
          <em className="italic text-joy-green">{tx(T.cta.italic, lang)}</em>
        </h2>

        <p className="mt-6 font-sans text-base text-white/50 max-w-lg mx-auto leading-relaxed">
          {tx(T.cta.desc, lang)}
        </p>

        {/* Chỉ hiện khi mã đang active trong Sanity → không quảng cáo mã đã hết hạn */}
        {promoCode && (
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mt-6 mb-10">
            <span className="font-mono text-joy-green font-semibold text-sm tracking-widest">{promoCode}</span>
            <span className="text-white/40 text-xs">{tx(T.cta.promo, lang)}</span>
          </div>
        )}

        <br />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <Link href="/rooms" className="btn-primary text-base px-8 py-4">
            {tx(T.cta.bookBtn, lang)} <ArrowRight size={16} />
          </Link>
          <a href={site.zaloLink} target="_blank" rel="noreferrer" className="btn-ghost-light text-base px-8 py-4">
            <MessageCircle size={16} />
            {tx(T.cta.zaloBtn, lang)}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30 font-sans">
          <span>{tx(T.cta.trust1, lang)}</span>
          <span>{tx(T.cta.trust2, lang)}</span>
          <span>{tx(T.cta.trust3, lang)}</span>
        </div>
      </div>
    </section>
  );
}
