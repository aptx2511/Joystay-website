"use client";
/** Link chuyển trang có hiệu ứng: phần tử [data-vt-frame] gần nhất (khung ảnh phòng) phóng thành ảnh đầu trang chi tiết.
 *  Trình duyệt không hỗ trợ View Transitions (hoặc bật giảm chuyển động) → chuyển trang bình thường. */
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type Doc = Document & { startViewTransition?: (cb: () => Promise<void> | void) => unknown };

export default function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const doc = document as Doc;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    const frame = document.querySelector<HTMLElement>("[data-vt-frame]");
    if (frame) frame.style.viewTransitionName = "room-hero";
    doc.startViewTransition(() => new Promise<void>((resolve) => {
      if (frame) frame.style.viewTransitionName = "";
      router.push(href);
      const t0 = Date.now();
      const tick = () => {
        if (window.location.pathname === href || Date.now() - t0 > 700) requestAnimationFrame(() => resolve());
        else requestAnimationFrame(tick);
      };
      tick();
    }));
  };
  return <Link href={href} onClick={handle} onMouseEnter={() => router.prefetch(href)} {...rest} />;
}
