"use client";
/**
 * Khối "6 phòng, 6 câu chuyện" trên trang chủ — BẢN CHỐT 09/11/2026 (demo: Artifact "Joystay Room Scroll" v5).
 * - Cuộn DỌC: khung phòng ghim giữa màn hình, nội dung + màu nền đổi theo từng phòng.
 * - Vuốt NGANG: trong mỗi phòng, vuốt (hoặc bấm ‹ ›) để xem thêm ảnh của phòng đó.
 * - Nền: ảnh phòng làm mờ (B) + số phòng khổng lồ nét viền (A). Ảnh có khung tranh trắng.
 * - Số phòng: viên tròn sát mép phải (máy tính) / hàng ngang ở đáy (điện thoại).
 * - Thứ tự: 401 → 302 → 301 → 202 → 201 → 101 (từ tầng trên xuống).
 * - prefers-reduced-motion: tắt ghim, các phòng xếp dọc bình thường.
 */
import TransitionLink from "@/components/ui/TransitionLink";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Room } from "@/lib/mock-data";
import { useLang } from "@/lib/lang-context";
import { bedLabel } from "@/lib/room-facts";
import s from "./RoomScrollStory.module.css";

type Look = { bg: string; ink: string; acc: string; soft: string; tag: string; short: string; dark?: boolean };
/** Màu + tagline theo số phòng (cùng bảng màu bộ poster Q3) */
const LOOK: Record<string, Look> = {
  "401": { bg: "#E9F0DF", ink: "#1B2A16", acc: "#5E8F3C", soft: "#56694B", tag: "A whole floor, a tub of your own.", short: "Matcha" },
  "302": { bg: "#F3EEE6", ink: "#161414", acc: "#A82028", soft: "#6B625C", tag: "Paris mood, Saigon soul.", short: "Parisian" },
  "301": { bg: "#E3EFE3", ink: "#14281A", acc: "#3E8152", soft: "#4F6B56", tag: "Wake up to the Saigon sun.", short: "Tropical" },
  "202": { bg: "#FBEBDD", ink: "#2A160A", acc: "#D9541F", soft: "#7A5338", tag: "Every wall tells a story.", short: "Pop Art" },
  "201": { bg: "#2A2520", ink: "#F3E9DA", acc: "#C9A063", soft: "#B9AA94", tag: "Midnight dark, any time of day.", short: "Midnight", dark: true },
  "101": { bg: "#F2E6D0", ink: "#2A1E0E", acc: "#A8792E", soft: "#7A6342", tag: "No morning glare. Just deep sleep.", short: "Sleep Cave" },
};
/** Thứ tự hiển thị: từ tầng trên xuống */
const ORDER = ["401", "302", "301", "202", "201", "101"];
const DEFAULT_LOOK: Look = { bg: "#EEF4EE", ink: "#1A1E1A", acc: "#6B9467", soft: "#6A7A68", tag: "The Art of Stay.", short: "" };
const lookOf = (r: Room) => LOOK[r.roomNumber ?? ""] ?? DEFAULT_LOOK;
const vnd = (n: number) => n.toLocaleString("vi-VN") + "đ";
const pad = (n: number) => String(n).padStart(2, "0");

const photosOf = (r: Room) => {
  const list = [r.featuredImage, ...(r.galleryPreview ?? [])].filter((u): u is string => !!u);
  return [...new Set(list)].slice(0, 6);
};
const sized = (url: string, w: number) => (url.includes("cdn.sanity.io") ? `${url}?w=${w}&auto=format&q=75` : url);

function PhotoStrip({ room, active, eager }: { room: Room; active: boolean; eager: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const photos = photosOf(room);
  const onScroll = () => {
    const el = ref.current;
    if (el) setCur(Math.round(el.scrollLeft / el.clientWidth));
  };
  const go = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth, behavior: "smooth" });
  if (!photos.length) return <div className={`${s.strip} ${active ? s.on : ""}`} style={{ background: room.gradient }} />;
  return (
    <>
      <div ref={ref} onScroll={onScroll} className={`${s.strip} ${active ? s.on : ""}`} aria-hidden={!active}
        aria-label={`Ảnh ${room.name}`} tabIndex={active ? 0 : -1}>
        {photos.map((u, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={u} src={sized(u, 1100)} alt={`${room.name} – ảnh ${i + 1}`} loading={eager && i === 0 ? "eager" : "lazy"} />
        ))}
      </div>
      {active && photos.length > 1 && (
        <>
          <button type="button" className={`${s.nav} ${s.prev}`} onClick={() => go(-1)} disabled={cur === 0} aria-label="Ảnh trước">‹</button>
          <button type="button" className={`${s.nav} ${s.next}`} onClick={() => go(1)} disabled={cur >= photos.length - 1} aria-label="Ảnh sau">›</button>
          <div className={s.dots}>{photos.map((u, i) => <i key={u} className={i === cur ? s.cur : ""} />)}</div>
          <span className={s.swipeHint}>vuốt ← →</span>
        </>
      )}
    </>
  );
}

function RoomText({ room, on, lang }: { room: Room; on: boolean; lang: "en" | "vi" }) {
  const lk = lookOf(room);
  const desc = lang === "vi" ? room.shortDescriptionVi || room.shortDescription : room.shortDescription;
  return (
    <article className={`${s.text} ${on ? s.on : ""}`} aria-hidden={!on}>
      <div className={s.meta}>{lang === "vi" ? "Phòng" : "Room"} {room.roomNumber}</div>
      <h3 className={s.name}>{room.name}</h3>
      <p className={s.tag}>{lk.tag}</p>
      {desc && <p className={s.desc}>{desc}</p>}
      <ul className={s.facts}>
        <li><span>{lang === "vi" ? "Diện tích" : "Size"}</span><b>{room.size} m²</b></li>
        <li><span>{lang === "vi" ? "Tối đa" : "Up to"}</span><b>{room.maxGuests} {lang === "vi" ? "khách" : "guests"}</b></li>
        {room.bedType && <li><span>{lang === "vi" ? "Giường" : "Bed"}</span><b>{bedLabel(room.bedType, lang)}</b></li>}
      </ul>
      <div className={s.cta}>
        <TransitionLink href={`/rooms/${room.slug}`} className={s.btn} tabIndex={on ? 0 : -1}>{lang === "vi" ? "Xem phòng" : "View room"}</TransitionLink>
        {room.pricePerNight > 0 && (
          <span className={s.price}>{lang === "vi" ? "Từ" : "From"} <b>{vnd(room.pricePerNight)}</b> / {lang === "vi" ? "đêm" : "night"}</span>
        )}
      </div>
    </article>
  );
}

export default function RoomScrollStory({ rooms }: { rooms: Room[] }) {
  const { lang } = useLang();
  const rank = (r: Room) => { const i = ORDER.indexOf(r.roomNumber ?? ""); return i < 0 ? 99 : i; };
  const list = rooms.filter((r) => r.isAvailable !== false).sort((a, b) => rank(a) - rank(b));
  const storyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const f = () => setReduced(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  const measure = useCallback(() => {
    const el = storyRef.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, span)));
    setProgress(p);
    setActive(Math.min(list.length - 1, Math.floor(p * list.length)));
  }, [list.length]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [measure, reduced]);

  const jump = (i: number) => {
    const el = storyRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * (i + 0.5)) / list.length, behavior: "smooth" });
  };

  if (!list.length) return null;
  const lk = lookOf(list[active] ?? list[0]);
  const vars = { "--rb": lk.bg, "--ri": lk.ink, "--ra": lk.acc, "--rs": lk.soft } as React.CSSProperties;

  const intro = (
    <div className={s.intro}>
      <span className="section-tag mb-4 block">
        {lang === "vi" ? "Phòng của chúng tôi" : "Our Rooms"} · 382/23 Nguyễn Thị Minh Khai, Q3
      </span>
      <h2 className="font-serif text-display-lg font-light text-joy-ink leading-tight">
        {lang === "vi" ? `${list.length} căn phòng,` : `${list.length} rooms,`}{" "}
        <em className="text-joy-green">{lang === "vi" ? `${list.length} câu chuyện.` : `${list.length} stories.`}</em>
      </h2>
      <p className="font-sans text-joy-muted mt-3 max-w-xl">
        {lang === "vi" ? "Không có hai phòng nào giống nhau. Cuộn xuống để đi qua từng căn — vuốt ngang để xem thêm ảnh." :
          "No two rooms are alike. Scroll to walk through each one — swipe sideways for more photos."}
      </p>
    </div>
  );

  // Không ghim khi người dùng bật giảm chuyển động
  if (reduced) {
    return (
      <section id="rooms" className={`${s.section} ${s.static}`}>
        {intro}
        {list.map((r) => {
          const l = lookOf(r);
          const v = { "--rb": l.bg, "--ri": l.ink, "--ra": l.acc, "--rs": l.soft } as React.CSSProperties;
          return (
            <div key={r.id} className={s.block} style={v}>
              <div className={s.grid}>
                <div className={s.texts}><RoomText room={r} on lang={lang} /></div>
                <div className={s.photos}><PhotoStrip room={r} active eager={false} /></div>
              </div>
            </div>
          );
        })}
      </section>
    );
  }

  return (
    <section id="rooms" className={s.section}>
      {intro}
      <div ref={storyRef} className={s.story} style={{ height: `calc(${list.length} * 85vh + 100vh)` }}>
        <div className={`${s.pin} ${lk.dark ? s.dark : ""}`} style={vars}>
          <div className={s.bgB} aria-hidden>
            {list.map((r, i) => {
              const u = photosOf(r)[0];
              // eslint-disable-next-line @next/next/no-img-element
              return u ? <img key={r.id} src={sized(u, 480)} alt="" loading="lazy" className={i === active ? s.on : ""} /> : null;
            })}
          </div>
          <div className={s.bgA} aria-hidden>
            {list.map((r, i) => <span key={r.id} className={i === active ? s.on : ""}>{r.roomNumber}</span>)}
          </div>
          <div className={s.grid}>
            <div className={s.texts}>
              {list.map((r, i) => <RoomText key={r.id} room={r} on={i === active} lang={lang} />)}
            </div>
            <div className={s.photos} data-vt-frame>
              {list.map((r, i) => <PhotoStrip key={r.id} room={r} active={i === active} eager={i < 2} />)}
              <span className={s.count}>{pad(active + 1)} / {pad(list.length)}</span>
            </div>
          </div>
          <div className={s.rail} aria-label={lang === "vi" ? "Chọn phòng" : "Choose a room"}>
            {list.map((r, i) => (
              <button key={r.id} type="button" className={i === active ? s.on : ""} onClick={() => jump(i)}
                aria-label={`${lang === "vi" ? "Phòng" : "Room"} ${r.roomNumber} ${r.name}`}>
                {r.roomNumber ?? i + 1}
                <span>{lookOf(r).short ? `${lookOf(r).short} · ` : ""}{r.name}</span>
              </button>
            ))}
          </div>
          <div className={s.progress} style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
