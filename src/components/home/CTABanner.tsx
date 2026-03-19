import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-joy-ink py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full
                        bg-joy-green/8 blur-[80px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">

        <span className="section-tag text-joy-green mb-5 justify-center">
          Book Direct · Best Rate Guaranteed
        </span>

        <h2 className="font-serif text-display-xl text-white font-light leading-tight text-balance mt-4">
          Ready to Experience
          <br />
          <em className="italic text-joy-green">The Art of Stay?</em>
        </h2>

        <p className="mt-6 font-sans text-base text-white/50 max-w-lg mx-auto leading-relaxed">
          Book directly with us and save up to 15% vs. Airbnb. Flexible cancellation,
          instant confirmation, and a personal welcome message from our team.
        </p>

        {/* Promo code hint */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10
                        rounded-full px-5 py-2 mt-6 mb-10">
          <span className="font-mono text-joy-green font-semibold text-sm tracking-widest">
            JOYSTAY10
          </span>
          <span className="text-white/40 text-xs">— 10% off your first direct booking</span>
        </div>

        <br />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <Link href="/rooms" className="btn-primary text-base px-8 py-4">
            Check Availability <ArrowRight size={16} />
          </Link>

          <a
            href="https://zalo.me/0909000000"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost-light text-base px-8 py-4"
          >
            <MessageCircle size={16} />
            Chat on Zalo
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30 font-sans">
          <span>✓ Free cancellation 48h before check-in</span>
          <span>✓ No credit card required</span>
          <span>✓ Instant confirmation</span>
        </div>
      </div>
    </section>
  );
}
