"use client";
/** Nội dung trồi nhẹ lên MỘT lần khi cuộn tới. Chỉ ẩn những khối nằm dưới màn hình đầu,
 *  nên không có JS (hoặc bật giảm chuyển động) thì nội dung vẫn hiện bình thường. */
import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.classList.add("reveal");
    requestAnimationFrame(() => el.classList.add("reveal-anim"));
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { el.classList.add("is-in"); io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
