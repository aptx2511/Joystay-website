"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/lib/lang-context";
import { G } from "@/lib/guide-content";

/** "Quanh đây" — vài địa chỉ ngay trong hẻm, lấy chung dữ liệu với trang Cẩm nang (guide-content.ts). */
const txt = (v: string | { en: string; vi: string }, lang: "en" | "vi") => (typeof v === "string" ? v : v[lang]);

export default function NearbySection() {
  const { lang } = useLang();
  const alley = G.around.categories.find((c) => c.key === "alley") ?? G.around.categories[0];
  return (
    <section id="around" className="bg-joy-cream pb-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[4fr_7fr] gap-8 lg:gap-20">
        <Reveal>
          <span className="section-tag mb-4 block">{lang === "vi" ? "Quanh đây" : "Nearby"}</span>
          <h2 className="font-serif text-display-lg font-light text-joy-ink leading-tight text-balance">
            {lang === "vi" ? "Xuống nhà là" : "Step out,"}{" "}
            <em className="italic text-joy-green">{lang === "vi" ? "có chỗ ngồi." : "find a seat."}</em>
          </h2>
          <p className="mt-4 font-sans text-joy-muted">{lang === "vi" ? "Bốn địa chỉ ngay trong hẻm." : "Four spots right in our alley."}</p>
          <p className="mt-6"><Link href="/guide#around" className="link-line">{lang === "vi" ? "Xem thêm trong cẩm nang →" : "More in the guide →"}</Link></p>
        </Reveal>
        <Reveal>
          <ul className="border-t border-joy-border">
            {alley.places.map((p, i) => (
              <li key={i} className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-1 sm:gap-5 py-4 border-b border-joy-border">
                <b className="font-serif text-xl font-medium text-joy-ink leading-tight">{txt(p.name, lang)}</b>
                <span className="font-sans text-[15px] text-joy-muted">{txt(p.desc, lang)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
