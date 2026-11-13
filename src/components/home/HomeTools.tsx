"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/lib/lang-context";

const C = {
  avail: {
    tag: { en: "Availability", vi: "Lịch trống" },
    title: { en: "All 6 rooms on one board.", vi: "Cả 6 phòng trong một bảng." },
    body: { en: "See which nights are free and the price per night, then tap a date to book.", vi: "Xem ngày nào còn trống, giá từng đêm, chạm vào ô để đặt." },
    cta: { en: "Open availability →", vi: "Mở lịch trống →" },
  },
  guide: {
    tag: { en: "Guest guide", vi: "Cẩm nang lưu trú" },
    title: { en: "Self check-in in minutes.", vi: "Tự check-in trong vài phút." },
    body: { en: "How to get in, how the locks work, check-in and check-out times, and common questions.", vi: "Đường vào, cách mở khoá, giờ nhận trả phòng và các câu hỏi thường gặp." },
    cta: { en: "Open the guide →", vi: "Mở cẩm nang →" },
  },
};

/** Dải xanh nhạt dẫn tới 2 trang công cụ: Lịch trống + Cẩm nang. */
export default function HomeTools() {
  const { lang } = useLang();
  const items = [{ href: "/availability", c: C.avail }, { href: "/guide", c: C.guide }];
  return (
    <section className="bg-joy-warm py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {items.map(({ href, c }) => (
          <Reveal key={href}>
            <Link href={href}
              className="group block h-full rounded-2xl border border-joy-border bg-joy-cream/60 p-7 sm:p-10 hover:bg-white hover:border-joy-green transition-colors duration-300">
              <span className="section-tag">{c.tag[lang]}</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-joy-ink leading-[1.05] mt-3 mb-2">{c.title[lang]}</h3>
              <p className="font-sans text-[15px] text-joy-muted max-w-md mb-5">{c.body[lang]}</p>
              <span className="link-line group-hover:text-joy-green-dark">{c.cta[lang]}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
