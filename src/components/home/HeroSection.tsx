"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MiniBookingWidget from "@/components/booking/MiniBookingWidget";
import { ChevronDown } from "lucide-react";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

interface HeroBg {
  type?: "image" | "video";
  imageUrl?: string;
  imageHotspot?: { x: number; y: number };
  videoUrl?: string;
  overlayOpacity?: number;
}

interface Props {
  heroBackground?: HeroBg | null;
}

export default function HeroSection({ heroBackground }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLang();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const hasMedia = heroBackground?.type === "video"
    ? !!heroBackground.videoUrl
    : !!heroBackground?.imageUrl;

  const overlayOpacity = (heroBackground?.overlayOpacity ?? 60) / 100;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background base */}
      <div className="absolute inset-0 bg-[#0d0f0d]">

        {/* ── Sanity media (video or image) ── */}
        {hasMedia && heroBackground?.type === "video" && heroBackground.videoUrl && (
          <video
            key={heroBackground.videoUrl}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroBackground.videoUrl} type="video/mp4" />
            <source src={heroBackground.videoUrl} type="video/webm" />
          </video>
        )}

        {hasMedia && heroBackground?.type === "image" && heroBackground.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${heroBackground.imageUrl}?w=1920&auto=format&q=85`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={heroBackground.imageHotspot ? {
              objectPosition: `${heroBackground.imageHotspot.x * 100}% ${heroBackground.imageHotspot.y * 100}%`,
            } : undefined}
          />
        )}

        {/* ── Dark overlay (configurable opacity) ── */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* ── Fallback gradient blobs (visible when no media, subtle when media present) ── */}
        {!hasMedia && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-[#111310] to-zinc-950" />
            <motion.div style={{ y: blob1Y }} className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-joy-green/[0.07] blur-[160px] pointer-events-none" />
            <motion.div style={{ y: blob2Y }} className="absolute -bottom-64 -left-32 w-[600px] h-[600px] rounded-full bg-teal-800/[0.12] blur-[130px] pointer-events-none" />
          </>
        )}

        {/* ── Grain texture ── */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />

        {/* ── Bottom fade ── */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0f0d]/80 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pt-28 sm:pt-32 pb-24 text-center">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-4 mb-10">
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="block origin-right h-px w-10 bg-gradient-to-l from-joy-green/60 to-transparent" />
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.38em] uppercase text-white/35">
            {tx(T.hero.eyebrow, lang)}
          </span>
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="block origin-left h-px w-10 bg-gradient-to-r from-joy-green/60 to-transparent" />
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1 initial={{ opacity: 0, y: 72 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light text-white leading-[1.0] tracking-[-0.02em] text-[clamp(4rem,12vw,9.5rem)]">
            {tx(T.hero.heading1, lang)}
          </motion.h1>
        </div>
        <div className="overflow-hidden -mt-2 sm:-mt-3">
          <motion.h1 initial={{ opacity: 0, y: 72 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light italic text-joy-green leading-[1.05] tracking-[-0.01em] text-[clamp(4rem,12vw,9.5rem)]">
            {tx(T.hero.heading2, lang)}
          </motion.h1>
        </div>

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 font-sans text-[10px] sm:text-[11px] text-white/35 tracking-[0.32em] uppercase">
          {tx(T.hero.tagline, lang)}
        </motion.p>

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-3 my-9">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-joy-green/45" />
          <span className="w-1 h-1 rounded-full bg-joy-green/55" />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-joy-green/45" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.82, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl">
          <MiniBookingWidget />
        </motion.div>
      </motion.div>

      {/* Stats */}
      <div className="relative border-t border-white/[0.06]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}
          className="max-w-4xl mx-auto px-5 py-6 grid grid-cols-3 text-center">
          {([
            { value: "5",      label: tx(T.hero.stat1lbl, lang) },
            { value: "24/7",   label: tx(T.hero.stat2lbl, lang) },
            { value: "5 min",  label: tx(T.hero.stat3lbl, lang) },
          ] as const).map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <p className="font-serif text-[1.75rem] sm:text-[2rem] text-white font-light">{stat.value}</p>
              <p className="font-sans text-[9px] sm:text-[10px] text-white/30 tracking-[0.22em] uppercase mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a href="#about" aria-label="Scroll down" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-[7rem] sm:bottom-[5.5rem] left-1/2 -translate-x-1/2 text-white/20 hover:text-joy-green transition-colors duration-300">
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.a>
    </section>
  );
}
