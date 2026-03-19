import MiniBookingWidget from "@/components/booking/MiniBookingWidget";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background ────────────────────────────────────────────────────── */}
      {/* Rich dark background with artistic gradient — replace with real video/image */}
      <div className="absolute inset-0 bg-joy-charcoal">
        {/* Abstract atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-stone-900 to-zinc-950" />
        {/* Warm accent glow — top right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
                        bg-joy-green/10 blur-[120px] pointer-events-none" />
        {/* Teal accent — bottom left */}
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full
                        bg-teal-800/20 blur-[100px] pointer-events-none" />
        {/* Subtle grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col items-center justify-center
                      px-5 sm:px-8 pt-28 sm:pt-32 pb-20 text-center">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <span className="h-px w-10 bg-joy-green/60" />
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/50">
            District 1 · Ho Chi Minh City · Vietnam
          </span>
          <span className="h-px w-10 bg-joy-green/60" />
        </div>

        {/* Main heading */}
        <h1 className="font-serif font-light text-white text-balance
                       text-[clamp(3.5rem,10vw,8rem)] leading-[1.02] tracking-[-0.02em]
                       animate-fade-up">
          The Art
          <br />
          <em className="italic text-joy-green">of Stay</em>
        </h1>

        {/* Sub-heading */}
        <p className="mt-6 font-sans text-sm sm:text-base text-white/50 tracking-widest uppercase
                      animate-fade-up animate-delay-200 max-w-sm">
          Boutique Homestay &amp; Serviced Apartments
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-joy-green/40 my-8 animate-fade-in animate-delay-300" />

        {/* Booking Widget */}
        <div className="w-full max-w-2xl animate-fade-up animate-delay-400">
          <MiniBookingWidget />
        </div>
      </div>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-5 py-5 grid grid-cols-3 gap-4 text-center">
          {[
            { value: "5", label: "Art Concepts" },
            { value: "24/7", label: "Self Check-In" },
            { value: "5 min", label: "to Bui Vien" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl sm:text-3xl text-white font-light">{stat.value}</p>
              <p className="font-sans text-[10px] sm:text-xs text-white/40 tracking-[0.15em] uppercase mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-1 text-white/30 hover:text-joy-green
                   transition-colors duration-300 animate-scroll-down"
      >
        <ChevronDown size={18} strokeWidth={1.5} />
      </a>
    </section>
  );
}
