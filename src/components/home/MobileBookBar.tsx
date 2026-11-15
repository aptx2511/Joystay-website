"use client";
/** Nút "Đặt phòng" nổi ở đáy màn hình điện thoại (trang chủ). Hiện sau khi cuộn qua hero,
 *  ẩn khi đang ở khối cuộn 6 phòng (đáy đã có hàng số phòng) và khi tới cuối trang.
 *  Nằm bên trái để chừa góc phải cho nút chat JoyBot. */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

export default function MobileBookBar({ fromPrice }: { fromPrice?: number }) {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const y = window.scrollY, vh = window.innerHeight;
      const story = document.getElementById("rooms")?.getBoundingClientRect();
      const inStory = !!story && story.top < vh * 0.5 && story.bottom > vh * 0.6;
      const nearEnd = y + vh > document.documentElement.scrollHeight - 520;
      setShow(y > vh * 0.6 && !inStory && !nearEnd);
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    measure();
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <Link href="/availability" aria-hidden={!show} tabIndex={show ? 0 : -1}
      className={`md:hidden fixed z-40 left-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] flex items-center gap-3 rounded-full
                  bg-joy-green-dark text-white pl-5 pr-4 py-3 shadow-xl shadow-black/20 active:scale-[0.97]
                  transition-all duration-300 ease-joy ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}>
      <span className="font-sans font-semibold text-sm">{lang === "vi" ? "Đặt phòng" : "Book a room"}</span>
      {!!fromPrice && (
        <span className="font-sans text-xs text-white/85 border-l border-white/30 pl-3 tabular-nums">
          {lang === "vi" ? "từ" : "from"} {fromPrice.toLocaleString("vi-VN")}đ
        </span>
      )}
    </Link>
  );
}
