"use client";

import { useState } from "react";
import {
  MessageSquare, MapPin, Bike, KeyRound, DoorOpen, Luggage, Clock, CheckCircle2,
  ChevronDown, Navigation, Star, Phone, MessageCircle, ExternalLink, PenLine,
} from "lucide-react";
import { useLang, tx } from "@/lib/lang-context";
import { useSettings } from "@/lib/settings-context";
import { G, GUIDE_CONFIG } from "@/lib/guide-content";
import type { GoogleReviewsData } from "@/lib/google-reviews";

type L = { en: string; vi: string };
const ICONS: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare size={18} />, MapPin: <MapPin size={18} />, Bike: <Bike size={18} />,
  KeyRound: <KeyRound size={18} />, DoorOpen: <DoorOpen size={18} />,
};
const txt = (v: string | L, lang: "en" | "vi") => (typeof v === "string" ? v : tx(v, lang));
const embed = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`;
const dirUrl = (dest: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(GUIDE_CONFIG.origin)}&destination=${encodeURIComponent(dest)}&travelmode=walking`;

function Heading({ tag, title, italic, light = false }: { tag: string; title: string; italic: string; light?: boolean }) {
  return (
    <div>
      <span className={`section-tag mb-4 block ${light ? "text-joy-green-light" : ""}`}>{tag}</span>
      <h2 className={`font-serif text-display-lg font-light leading-tight ${light ? "text-white" : "text-joy-ink"}`}>
        {title} <em className={`italic ${light ? "text-joy-green-light" : "text-joy-green"}`}>{italic}</em>
      </h2>
    </div>
  );
}

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < Math.round(value) ? "text-amber-400 fill-amber-400" : "text-joy-border"} />
      ))}
    </span>
  );
}

export default function GuidePage({ reviews, writeUrl, placeId }: { reviews: GoogleReviewsData | null; writeUrl: string; placeId: string }) {
  const { lang } = useLang();
  const site = useSettings();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cat, setCat] = useState(G.around.categories[0].key);
  const [mapQuery, setMapQuery] = useState(GUIDE_CONFIG.origin);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const category = G.around.categories.find((c) => c.key === cat)!;
  const zalo = site.zaloLink;

  const anchors = [
    ["checkin", G.nav.checkin], ["checkout", G.nav.checkout], ["faq", G.nav.faq],
    ["around", G.nav.around], ["reviews", G.nav.reviews],
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="bg-joy-charcoal pt-28 sm:pt-32 pb-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag text-joy-green-light mb-4 block">{tx(G.hero.tag, lang)}</span>
          <h1 className="font-serif text-display-xl text-white font-light">
            {tx(G.hero.title, lang)} <em className="italic text-joy-green-light">{tx(G.hero.italic, lang)}</em>
          </h1>
          <p className="mt-4 text-white/50 font-sans text-base max-w-xl leading-relaxed">{tx(G.hero.subtitle, lang)}</p>
          {(GUIDE_CONFIG.checkInTime || GUIDE_CONFIG.checkOutTime) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {GUIDE_CONFIG.checkInTime && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 font-sans">
                  <Clock size={14} className="text-joy-green-light" /> {tx(G.checkin.from, lang)} {GUIDE_CONFIG.checkInTime}
                </span>
              )}
              {GUIDE_CONFIG.checkOutTime && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 font-sans">
                  <Clock size={14} className="text-joy-green-light" /> {tx(G.checkout.by, lang)} {GUIDE_CONFIG.checkOutTime}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Anchor nav */}
      <nav className="sticky top-[72px] sm:top-[80px] z-30 bg-joy-cream/90 backdrop-blur border-b border-joy-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {anchors.map(([id, label]) => (
            <a key={id} href={`#${id}`}
              className="shrink-0 px-4 py-3.5 font-sans text-sm text-joy-muted hover:text-joy-green transition-colors">
              {tx(label, lang)}
            </a>
          ))}
        </div>
      </nav>

      {/* Check-in */}
      <section id="checkin" className="scroll-mt-36 bg-joy-cream py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <Heading tag={tx(G.checkin.tag, lang)} title={tx(G.checkin.title, lang)} italic={tx(G.checkin.italic, lang)} />
            <div className="mt-8 rounded-2xl bg-white border border-joy-border p-6 flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-joy-warm flex items-center justify-center text-joy-green"><Luggage size={18} /></div>
              <div>
                <p className="font-sans font-semibold text-joy-ink">{tx(G.checkin.early.title, lang)}</p>
                <p className="font-sans text-sm text-joy-muted mt-1 leading-relaxed">{tx(G.checkin.early.body, lang)}</p>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={G.checkin.early.image} alt={tx(G.checkin.early.title, lang)} loading="lazy"
              className="mt-4 w-full max-w-xs aspect-[3/4] object-cover rounded-2xl border border-joy-border shadow-sm" />
          </div>
          <ol className="relative">
            {G.checkin.steps.map((s, i) => (
              <li key={i} className="relative pl-16 pb-8 last:pb-0">
                {i < G.checkin.steps.length - 1 && <span className="absolute left-5 top-11 bottom-0 w-px bg-joy-border" />}
                <span className="absolute left-0 top-0 w-10 h-10 rounded-full bg-joy-green text-white flex items-center justify-center shadow-sm">
                  {ICONS[s.icon]}
                </span>
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-joy-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-serif text-2xl text-joy-ink mt-0.5">{tx(s.title, lang)}</h3>
                <p className="font-sans text-sm text-joy-muted mt-1.5 leading-relaxed max-w-lg">{tx(s.body, lang)}</p>
                {s.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.image} alt={s.imageAlt ? tx(s.imageAlt, lang) : ""} loading="lazy"
                    className="mt-4 w-full max-w-sm aspect-[4/3] object-cover rounded-2xl border border-joy-border shadow-sm" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Check-out */}
      <section id="checkout" className="scroll-mt-36 bg-joy-warm py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Heading tag={tx(G.checkout.tag, lang)} title={tx(G.checkout.title, lang)} italic={tx(G.checkout.italic, lang)} />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {G.checkout.steps.map((s, i) => (
              <div key={i} className="rounded-2xl bg-white border border-joy-border p-6">
                <CheckCircle2 size={20} className="text-joy-green" />
                <p className="font-sans text-sm text-joy-ink mt-4 leading-relaxed">{tx(s, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-36 bg-joy-cream py-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Heading tag={tx(G.faq.tag, lang)} title={tx(G.faq.title, lang)} italic={tx(G.faq.italic, lang)} />
          <div className="mt-10 divide-y divide-joy-border border-y border-joy-border">
            {G.faq.items.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i}>
                  <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left">
                    <span className="font-sans font-semibold text-joy-ink">{tx(f.q, lang)}</span>
                    <ChevronDown size={18} className={`shrink-0 text-joy-green transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden font-sans text-sm text-joy-muted leading-relaxed pb-0 [&:not(:empty)]:pb-5">{tx(f.a, lang)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 rounded-2xl bg-joy-charcoal p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-serif text-2xl text-white font-light">{tx(G.faq.more, lang)}</p>
            <div className="flex flex-wrap gap-3">
              {zalo && (
                <a href={zalo} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
                  <MessageCircle size={15} /> {tx(G.faq.chat, lang)}
                </a>
              )}
              <a href={GUIDE_CONFIG.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost-light inline-flex items-center gap-2">
                <MessageSquare size={15} /> {tx(G.faq.whatsapp, lang)}
              </a>
              <a href={site.phoneHref} className="btn-ghost-light inline-flex items-center gap-2">
                <Phone size={15} /> {tx(G.faq.call, lang)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Around */}
      <section id="around" className="scroll-mt-36 bg-joy-charcoal py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Heading light tag={tx(G.around.tag, lang)} title={tx(G.around.title, lang)} italic={tx(G.around.italic, lang)} />
          <p className="mt-4 text-white/50 font-sans text-sm max-w-xl">{tx(G.around.subtitle, lang)}</p>

          <div className="mt-8 flex gap-2 flex-wrap">
            {G.around.categories.map((c) => (
              <button key={c.key} onClick={() => setCat(c.key)}
                className={`px-4 py-2 rounded-full font-sans text-sm border transition-colors ${
                  cat === c.key ? "bg-joy-green border-joy-green text-white" : "border-white/15 text-white/60 hover:text-white"}`}>
                {tx(c.label, lang)}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6">
            <ul className="space-y-3 order-2 lg:order-1">
              {category.places.map((p) => {
                const name = txt(p.name, lang);
                const active = mapQuery === p.query;
                return (
                  <li key={p.query}
                    className={`rounded-2xl border p-5 transition-colors cursor-pointer ${
                      active ? "border-joy-green bg-white/[0.06]" : "border-white/10 hover:border-white/25"}`}
                    onClick={() => setMapQuery(p.query)}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans font-semibold text-white">{name}</p>
                        <p className="font-sans text-sm text-white/50 mt-1">{tx(p.desc, lang)}</p>
                      </div>
                      <a href={dirUrl(p.query)} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                        className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-joy-green-light hover:underline">
                        <Navigation size={13} /> {tx(G.around.directions, lang)}
                      </a>
                    </div>
                  </li>
                );
              })}
              <p className="font-sans text-xs text-white/35 pt-2">{tx(G.around.note, lang)}</p>
            </ul>
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden border border-white/10 h-80 lg:h-auto lg:min-h-[460px] bg-white/5">
              <iframe key={mapQuery} src={embed(mapQuery)} width="100%" height="100%" style={{ border: 0, minHeight: 320 }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen title="Map" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="scroll-mt-36 bg-joy-cream py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <Heading tag={tx(G.reviews.tag, lang)} title={tx(G.reviews.title, lang)} italic={tx(G.reviews.italic, lang)} />
            {reviews && reviews.total > 0 && (
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl text-joy-ink">{reviews.rating.toFixed(1)}</span>
                <div>
                  <Stars value={reviews.rating} size={16} />
                  <p className="font-sans text-xs text-joy-muted mt-1">{reviews.total} {tx(G.reviews.based, lang)}</p>
                </div>
              </div>
            )}
          </div>

          {reviews && reviews.reviews.length > 0 ? (
            <div className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible [scrollbar-width:none]">
              {reviews.reviews.map((r, i) => {
                const long = r.text.length > 220;
                const show = expanded[i] || !long ? r.text : r.text.slice(0, 220).trimEnd() + "…";
                return (
                  <article key={i} className="snap-start shrink-0 w-[85%] sm:w-auto bg-white border border-joy-border rounded-2xl p-6 flex flex-col">
                    <div className="flex items-center gap-3">
                      {r.photo
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={r.photo} alt="" className="w-9 h-9 rounded-full object-cover" referrerPolicy="no-referrer" />
                        : <span className="w-9 h-9 rounded-full bg-joy-warm flex items-center justify-center font-sans text-sm text-joy-green">{r.author[0]}</span>}
                      <div className="min-w-0">
                        <a href={r.authorUrl} target="_blank" rel="noreferrer" className="font-sans font-semibold text-sm text-joy-ink truncate block hover:underline">{r.author}</a>
                        <p className="font-sans text-xs text-joy-muted">{r.relativeTime}</p>
                      </div>
                    </div>
                    <div className="mt-3"><Stars value={r.rating} /></div>
                    <p className="font-sans text-sm text-joy-ink/80 mt-3 leading-relaxed whitespace-pre-line">{show}</p>
                    {long && !expanded[i] && (
                      <button onClick={() => setExpanded((e) => ({ ...e, [i]: true }))} className="mt-2 self-start text-xs font-semibold text-joy-green hover:underline">
                        {tx(G.reviews.readMore, lang)}
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="mt-8 font-sans text-joy-muted max-w-xl">{tx(G.reviews.empty, lang)}</p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {writeUrl && (
              <a href={writeUrl} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
                <PenLine size={15} /> {tx(G.reviews.write, lang)}
              </a>
            )}
            {!reviews && (
              <a href={`https://www.google.com/maps/place/?q=place_id:${placeId}`} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-2">
                <ExternalLink size={15} /> {tx(G.reviews.seeAll, lang)}
              </a>
            )}
            {reviews?.mapsUrl && (
              <a href={reviews.mapsUrl} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-2">
                <ExternalLink size={15} /> {tx(G.reviews.seeAll, lang)}
              </a>
            )}
            {reviews && <span className="font-sans text-xs text-joy-muted ml-auto">Google</span>}
          </div>
        </div>
      </section>
    </>
  );
}
