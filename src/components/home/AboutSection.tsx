"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { USPS } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

const sized = (url: string, w: number) => (url.includes("cdn.sanity.io") ? `${url}?w=${w}&auto=format&q=75` : url);

/** "Về Joystay" kiểu Gallery: một ảnh lớn + chữ, các điểm mạnh xếp thành hàng kẻ mảnh (thay 3 thẻ 01/02/03). */
export default function AboutSection({ image }: { image?: string | null }) {
  const { lang } = useLang();

  return (
    <section id="about" className="bg-joy-cream py-20 sm:py-28">
      <div className={`max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 gap-10 lg:gap-20 items-center ${image ? "lg:grid-cols-[5fr_6fr]" : ""}`}>
        {image && (
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sized(image, 1100)} alt="Joystay" loading="lazy"
              className="w-full aspect-[3/2] lg:aspect-[4/5] object-cover rounded-[2rem] bg-joy-warm" />
          </Reveal>
        )}
        <Reveal>
          <SectionHeading
            tag={tx(T.about.tag, lang)}
            title={tx(T.about.title, lang)}
            titleItalic={tx(T.about.italic, lang)}
            subtitle={tx(T.about.subtitle, lang)}
          />
          <ul className="mt-8 border-t border-joy-border">
            {USPS.map((usp) => (
              <li key={usp.title} className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-1 sm:gap-5 py-4 border-b border-joy-border">
                <b className="font-serif text-xl font-medium text-joy-ink leading-tight">{lang === "en" ? usp.title : usp.titleVi}</b>
                <span className="font-sans text-[15px] text-joy-muted leading-relaxed">{lang === "en" ? usp.description : usp.descriptionVi}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7"><Link href="/guide" className="link-line">{lang === "vi" ? "Cách tự check-in →" : "How self check-in works →"}</Link></p>
        </Reveal>
      </div>
    </section>
  );
}
