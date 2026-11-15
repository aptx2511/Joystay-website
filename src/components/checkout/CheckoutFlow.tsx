"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Tag, Check, X, MessageCircle,
  Phone, Copy, CheckCircle2, Users, Maximize2, Lock,
  Loader2, AlertCircle, CalendarCheck, Upload, ImageIcon,
} from "lucide-react";
import type { Room } from "@/lib/mock-data";
import { nightsBetween, calcSubtotal } from "@/lib/pricing";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SiteSettings {
  bankName?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankQRImageUrl?: string;
  zaloLink?: string;
  phone?: string;
}

interface AppliedPromo {
  code: string;
  discountType: "PERCENTAGE" | "FIXED_VND";
  discountValue: number;
}

interface Props {
  room: Room;
  settings: SiteSettings | null;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtVND(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n) + "đ";
}

// nightsBetween / calcSubtotal: dùng chung với máy chủ → src/lib/pricing.ts

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function tomorrowStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

const PMS_URL = process.env.NEXT_PUBLIC_PMS_URL || "https://joystay-pms.vercel.app";

// ─── Component ────────────────────────────────────────────────────────────────

export default function CheckoutFlow({ room, settings, initialCheckIn, initialCheckOut, initialGuests }: Props) {
  const { lang } = useLang();

  // Booking state
  const [checkIn, setCheckIn]   = useState(initialCheckIn  || "");
  const [checkOut, setCheckOut] = useState(initialCheckOut || "");
  const [guests, setGuests]     = useState(initialGuests || 1);

  // Availability
  const [availStatus, setAvailStatus] = useState<"idle" | "checking" | "ok" | "taken">("idle");

  // Promo state
  const [promoInput, setPromoInput]       = useState("");
  const [appliedPromo, setAppliedPromo]   = useState<AppliedPromo | null>(null);
  const [promoLoading, setPromoLoading]   = useState(false);
  const [promoError, setPromoError]       = useState("");

  // Guest form
  const [guestName,  setGuestName]  = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestNotes, setGuestNotes] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // CCCD upload
  const [cccdFront, setCccdFront]               = useState<File | null>(null);
  const [cccdBack,  setCccdBack]                = useState<File | null>(null);
  const [cccdFrontPreview, setCccdFrontPreview] = useState("");
  const [cccdBackPreview,  setCccdBackPreview]  = useState("");

  // Flow state
  const [step, setStep]           = useState<"form" | "payment">("form");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError]     = useState("");
  const [confirmedRef, setConfirmedRef]     = useState("");
  const [copied, setCopied]                 = useState<string | null>(null);

  // ── Pricing ──────────────────────────────────────────────────────────────

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const { weekdayNights, weekendNights, subtotal } = useMemo(
    () => calcSubtotal(checkIn, checkOut, room.pricePerNight, room.weekendPrice),
    [checkIn, checkOut, room.pricePerNight, room.weekendPrice]
  );

  const discount = useMemo(() => {
    if (!appliedPromo || subtotal === 0) return 0;
    return appliedPromo.discountType === "PERCENTAGE"
      ? Math.round(subtotal * appliedPromo.discountValue / 100)
      : Math.min(appliedPromo.discountValue, subtotal);
  }, [appliedPromo, subtotal]);

  const total = subtotal - discount;

  // ── Availability check ────────────────────────────────────────────────────

  useEffect(() => {
    if (!checkIn || !checkOut || nights <= 0 || !room.pmsRoomId) {
      setAvailStatus("idle");
      return;
    }
    setAvailStatus("checking");
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${PMS_URL}/api/availability?checkIn=${checkIn}&checkOut=${checkOut}`
        );
        const data = await res.json();
        // data.available = array of available room objects
        const isAvailable = Array.isArray(data.available)
          ? data.available.some((r: { id: string }) => r.id === room.pmsRoomId)
          : false;
        setAvailStatus(isAvailable ? "ok" : "taken");
      } catch {
        setAvailStatus("idle"); // fail silently — allow proceed
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [checkIn, checkOut, nights, room.pmsRoomId]);

  // ── Promo ─────────────────────────────────────────────────────────────────

  const handleApplyPromo = useCallback(async () => {
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    setPromoError("");
    try {
      const res  = await fetch("/api/validate-promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoInput.trim(), roomSlug: room.slug, nights }),
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedPromo(data);
      } else {
        setPromoError(data.message || tx(T.checkout.promoInvalid, lang));
        setAppliedPromo(null);
      }
    } catch {
      setPromoError(tx(T.checkout.promoInvalid, lang));
    } finally {
      setPromoLoading(false);
    }
  }, [promoInput, room.slug, nights, lang]);

  // ── CCCD file picker ─────────────────────────────────────────────────────

  const handleCccdFile = (side: "front" | "back", file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (side === "front") { setCccdFront(file); setCccdFrontPreview(url); }
    else                  { setCccdBack(file);  setCccdBackPreview(url); }
  };

  // ── Form validation ───────────────────────────────────────────────────────

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!checkIn)       e.checkIn  = lang === "vi" ? "Chọn ngày đến" : "Select check-in";
    if (!checkOut)      e.checkOut = lang === "vi" ? "Chọn ngày đi"  : "Select check-out";
    if (nights <= 0 && checkIn && checkOut) e.checkOut = lang === "vi" ? "Ngày đi phải sau ngày đến" : "Must be after check-in";
    if (!guestName.trim())  e.guestName  = lang === "vi" ? "Bắt buộc" : "Required";
    if (!guestPhone.trim()) e.guestPhone = lang === "vi" ? "Bắt buộc" : "Required";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Confirm → create booking on PMS ──────────────────────────────────────

  const handleConfirm = async () => {
    if (!validateForm()) return;
    if (availStatus === "taken") return;

    setBookingLoading(true);
    setBookingError("");
    trackBeginCheckout(room.name, total, nights);

    try {
      // Upload CCCD images first if provided
      let cccdFrontUrl: string | undefined;
      let cccdBackUrl:  string | undefined;
      if (cccdFront && cccdBack) {
        const fd = new FormData();
        fd.append("front", cccdFront);
        fd.append("back",  cccdBack);
        fd.append("bookingRef", "pending");
        const uploadRes = await fetch("/api/upload-cccd", { method: "POST", body: fd });
        if (uploadRes.ok) {
          const urls = await uploadRes.json();
          cccdFrontUrl = urls.cccdFrontUrl;
          cccdBackUrl  = urls.cccdBackUrl;
        }
      }

      const res = await fetch(`/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId:      room.pmsRoomId,
          guestName,
          guestEmail:  guestEmail || undefined,
          guestPhone,
          checkIn,
          checkOut,
          totalPrice:  total,
          promoCode:   appliedPromo?.code,   // máy chủ tự kiểm tra lại mã và tự tính tổng tiền
          source:      "DIRECT",
          notes:       guestNotes || undefined,
          status:      "PENDING",
          cccdFrontUrl,
          cccdBackUrl,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || (lang === "vi" ? "Đặt phòng thất bại. Vui lòng thử lại." : "Booking failed. Please try again."));
      }

      const booking = await res.json();
      const ref = booking.confirmationCode || booking.id || "";
      setConfirmedRef(ref);
      setStep("payment");
      trackPurchase(ref, room.name, total, nights);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : (lang === "vi" ? "Có lỗi xảy ra." : "Something went wrong."));
    } finally {
      setBookingLoading(false);
    }
  };

  // ── Copy helper ───────────────────────────────────────────────────────────

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const displayRef    = confirmedRef || "—";
  const transferNote  = confirmedRef ? `${confirmedRef} ${room.name}` : room.name;
  const zaloUrl       = settings?.zaloLink || "https://zalo.me/0898888457";
  const phone         = settings?.phone    || "(+84) 0898 888 457";

  // ── Field class helpers ───────────────────────────────────────────────────

  const fieldCls = (err?: string) =>
    `w-full border ${err ? "border-red-400 bg-red-50" : "border-joy-border bg-joy-cream"} ` +
    `rounded-xl px-4 py-3 font-sans text-sm text-joy-ink focus:outline-none focus:border-joy-green transition-colors`;

  const canConfirm = nights > 0 && availStatus !== "taken" && !bookingLoading;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-joy-cream pt-28 sm:pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* ── Page header ── */}
        <div className="mb-8 sm:mb-10">
          <Link
            href={`/rooms/${room.slug}`}
            className="inline-flex items-center gap-1.5 text-joy-muted hover:text-joy-ink
                       font-sans text-sm transition-colors mb-5"
          >
            <ArrowLeft size={14} />
            {tx(T.checkout.backToRoom, lang)} {room.name}
          </Link>

          <h1 className="font-serif text-display-lg text-joy-ink font-light mb-4">
            {tx(T.checkout.title, lang)}
          </h1>

          {/* Step indicator */}
          <div className="flex items-center gap-3 font-sans text-sm">
            <span className={`flex items-center gap-1.5 font-semibold ${step === "form" ? "text-joy-green" : "text-joy-muted"}`}>
              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center
                                ${step === "form" ? "bg-joy-green text-white" : "bg-joy-muted/20 text-joy-muted"}`}>
                {step === "payment" ? <Check size={11} /> : "1"}
              </span>
              {tx(T.checkout.stepBooking, lang)}
            </span>

            <span className="text-joy-border">──</span>

            <span className={`flex items-center gap-1.5 font-semibold ${step === "payment" ? "text-joy-green" : "text-joy-muted"}`}>
              <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center
                                ${step === "payment" ? "bg-joy-green text-white" : "bg-joy-border text-joy-muted"}`}>
                2
              </span>
              {lang === "vi" ? "Thanh Toán" : "Payment"}
            </span>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* ────────────────────────────────────────────────────────────────
              LEFT: Booking summary (sticky on desktop)
          ──────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="lg:sticky lg:top-[96px] space-y-4">

              {/* Room card */}
              <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${room.gradient} h-32`}>
                {room.featuredImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${room.featuredImage}?w=480&auto=format&q=75`}
                    alt={room.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/45" />
                <div className="relative z-10 p-5 h-full flex flex-col justify-end">
                  <span className={`inline-block ${room.accentColor} text-white text-[10px]
                                    font-sans font-semibold tracking-[0.15em] uppercase
                                    px-2.5 py-0.5 rounded-full mb-2 w-fit`}>
                    {room.concept}
                  </span>
                  <h2 className="font-serif text-lg text-white font-light leading-tight">{room.name}</h2>
                  <div className="flex items-center gap-3 mt-1 text-white/60 font-sans text-xs">
                    <span className="flex items-center gap-1"><Maximize2 size={11} /> {room.size}m²</span>
                    <span className="flex items-center gap-1"><Users size={11} /> max {room.maxGuests}</span>
                  </div>
                </div>
              </div>

              {/* Date pickers + guests */}
              <div className="bg-white border border-joy-border rounded-2xl p-5 space-y-4">
                <p className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-joy-muted">
                  {tx(T.checkout.stepBooking, lang)}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-xs text-joy-muted mb-1.5">
                      {tx(T.booking.checkIn, lang)}
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={todayStr()}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (checkOut && e.target.value >= checkOut) setCheckOut("");
                        setFormErrors((prev) => ({ ...prev, checkIn: "" }));
                        setAvailStatus("idle");
                      }}
                      className={`w-full border ${formErrors.checkIn ? "border-red-400" : "border-joy-border"}
                                  rounded-xl px-3 py-2.5 font-sans text-sm text-joy-ink bg-joy-cream
                                  focus:outline-none focus:border-joy-green transition-colors`}
                    />
                    {formErrors.checkIn && <p className="mt-1 font-sans text-[11px] text-red-500">{formErrors.checkIn}</p>}
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-joy-muted mb-1.5">
                      {tx(T.booking.checkOut, lang)}
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || tomorrowStr()}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        setFormErrors((prev) => ({ ...prev, checkOut: "" }));
                        setAvailStatus("idle");
                      }}
                      className={`w-full border ${formErrors.checkOut ? "border-red-400" : "border-joy-border"}
                                  rounded-xl px-3 py-2.5 font-sans text-sm text-joy-ink bg-joy-cream
                                  focus:outline-none focus:border-joy-green transition-colors`}
                    />
                    {formErrors.checkOut && <p className="mt-1 font-sans text-[11px] text-red-500">{formErrors.checkOut}</p>}
                  </div>
                </div>

                {/* Availability indicator */}
                <AnimatePresence>
                  {nights > 0 && availStatus !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {availStatus === "checking" && (
                        <p className="flex items-center gap-2 font-sans text-xs text-joy-muted">
                          <Loader2 size={12} className="animate-spin" />
                          {lang === "vi" ? "Đang kiểm tra phòng trống..." : "Checking availability..."}
                        </p>
                      )}
                      {availStatus === "ok" && (
                        <p className="flex items-center gap-2 font-sans text-xs text-joy-green">
                          <CalendarCheck size={12} />
                          {lang === "vi" ? "Phòng trống trong khoảng thời gian này" : "Room available for these dates"}
                        </p>
                      )}
                      {availStatus === "taken" && (
                        <p className="flex items-center gap-2 font-sans text-xs text-red-500">
                          <AlertCircle size={12} />
                          {lang === "vi" ? "Phòng đã có người đặt. Vui lòng chọn ngày khác." : "Room not available. Please choose different dates."}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="block font-sans text-xs text-joy-muted mb-1.5">
                    {tx(T.booking.guests, lang)}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full border border-joy-border rounded-xl px-3 py-2.5 font-sans
                               text-sm text-joy-ink bg-joy-cream focus:outline-none focus:border-joy-green"
                  >
                    <option value={1}>{tx(T.booking.guest1, lang)}</option>
                    {room.maxGuests >= 2 && <option value={2}>{tx(T.booking.guest2, lang)}</option>}
                  </select>
                </div>
              </div>

              {/* Price breakdown — only when dates selected */}
              <AnimatePresence>
                {nights > 0 && (
                  <motion.div
                    key="price"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="bg-white border border-joy-border rounded-2xl p-5 space-y-3"
                  >
                    <p className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-joy-muted">
                      {tx(T.checkout.summaryTitle, lang)}
                    </p>

                    {/* Weekday nights */}
                    {weekdayNights > 0 && (
                      <div className="flex justify-between font-sans text-sm">
                        <span className="text-joy-muted">
                          {fmtVND(room.pricePerNight)} × {weekdayNights}{" "}
                          {lang === "vi" ? "đêm thường" : weekdayNights === 1 ? "weekday" : "weekdays"}
                        </span>
                        <span className="text-joy-ink">{fmtVND(weekdayNights * room.pricePerNight)}</span>
                      </div>
                    )}
                    {/* Weekend nights */}
                    {weekendNights > 0 && room.weekendPrice && (
                      <div className="flex justify-between font-sans text-sm">
                        <span className="text-joy-muted">
                          {fmtVND(room.weekendPrice)} × {weekendNights}{" "}
                          {lang === "vi" ? "đêm cuối tuần" : weekendNights === 1 ? "weekend night" : "weekend nights"}
                        </span>
                        <span className="text-joy-ink">{fmtVND(weekendNights * room.weekendPrice)}</span>
                      </div>
                    )}
                    {/* Fallback: no weekend price */}
                    {!room.weekendPrice && (
                      <div className="flex justify-between font-sans text-sm">
                        <span className="text-joy-muted">
                          {fmtVND(room.pricePerNight)} × {nights}{" "}
                          {nights === 1 ? tx(T.checkout.night, lang) : tx(T.checkout.nights, lang)}
                        </span>
                        <span className="text-joy-ink">{fmtVND(subtotal)}</span>
                      </div>
                    )}

                    <AnimatePresence>
                      {appliedPromo && discount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex justify-between font-sans text-sm overflow-hidden"
                        >
                          <span className="text-joy-green flex items-center gap-1.5">
                            <Tag size={12} />
                            {appliedPromo.code}
                            {appliedPromo.discountType === "PERCENTAGE" && ` (${appliedPromo.discountValue}%)`}
                          </span>
                          <span className="text-joy-green font-medium">−{fmtVND(discount)}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="border-t border-joy-border pt-3 flex justify-between items-baseline">
                      <span className="font-sans text-sm font-semibold text-joy-ink">
                        {tx(T.checkout.total, lang)}
                      </span>
                      <span className="font-serif text-2xl text-joy-ink">{fmtVND(total)}</span>
                    </div>

                    {room.securityDeposit && (
                      <p className="font-sans text-[11px] text-joy-muted flex items-start gap-1.5 pt-1">
                        <Lock size={11} className="mt-0.5 flex-shrink-0 text-joy-green" />
                        {tx(T.rooms.deposit, lang)}: {fmtVND(room.securityDeposit)} ({tx(T.rooms.refundable, lang)})
                        {lang === "vi" ? " — thu khi check-in" : " — collected at check-in"}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Promo code — only in form step */}
              {step === "form" && nights > 0 && (
                <div className="bg-white border border-joy-border rounded-2xl p-5">
                  <p className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-joy-muted mb-3">
                    {tx(T.checkout.promoLabel, lang)}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={appliedPromo ? appliedPromo.code : promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value.toUpperCase());
                        setPromoError("");
                        if (appliedPromo) setAppliedPromo(null);
                      }}
                      placeholder={tx(T.checkout.promoPlaceholder, lang)}
                      disabled={!!appliedPromo}
                      className="flex-1 border border-joy-border rounded-xl px-3 py-2.5 font-sans text-sm
                                 text-joy-ink bg-joy-cream focus:outline-none focus:border-joy-green
                                 disabled:opacity-60 uppercase placeholder:normal-case"
                    />
                    {appliedPromo ? (
                      <button
                        onClick={() => { setAppliedPromo(null); setPromoInput(""); }}
                        className="px-3 py-2.5 rounded-xl border border-red-200 text-red-400
                                   hover:bg-red-50 transition-colors"
                        aria-label="Remove promo"
                      >
                        <X size={15} />
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoLoading || !promoInput.trim()}
                        className="px-4 py-2.5 rounded-xl bg-joy-green text-white font-sans text-sm
                                   font-semibold hover:bg-joy-charcoal disabled:opacity-50 transition-colors"
                      >
                        {promoLoading ? "…" : tx(T.checkout.promoApply, lang)}
                      </button>
                    )}
                  </div>
                  {appliedPromo && (
                    <p className="mt-2 font-sans text-xs text-joy-green flex items-center gap-1.5">
                      <Check size={12} /> {tx(T.checkout.promoSuccess, lang)}
                    </p>
                  )}
                  {promoError && (
                    <p className="mt-2 font-sans text-xs text-red-500">{promoError}</p>
                  )}
                </div>
              )}

              {/* Trust badges */}
              <div className="space-y-1.5 px-1">
                {[T.cta.trust1, T.cta.trust2, T.cta.trust3].map((t, i) => (
                  <p key={i} className="font-sans text-xs text-joy-muted">{tx(t, lang)}</p>
                ))}
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────────
              RIGHT: Guest form → Payment
          ──────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Guest form ── */}
              {step === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-joy-border rounded-2xl p-6 sm:p-8"
                >
                  <h2 className="font-serif text-2xl text-joy-ink font-light mb-6">
                    {tx(T.checkout.guestTitle, lang)}
                  </h2>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block font-sans text-sm font-medium text-joy-ink mb-2">
                        {tx(T.checkout.guestName, lang)}
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => { setGuestName(e.target.value); setFormErrors((p) => ({ ...p, guestName: "" })); }}
                        placeholder={tx(T.checkout.guestNamePh, lang)}
                        className={fieldCls(formErrors.guestName)}
                      />
                      {formErrors.guestName && <p className="mt-1 font-sans text-xs text-red-500">{formErrors.guestName}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-sans text-sm font-medium text-joy-ink mb-2">
                        {tx(T.checkout.guestPhone, lang)}
                      </label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => { setGuestPhone(e.target.value); setFormErrors((p) => ({ ...p, guestPhone: "" })); }}
                        placeholder={tx(T.checkout.guestPhonePh, lang)}
                        className={fieldCls(formErrors.guestPhone)}
                      />
                      {formErrors.guestPhone && <p className="mt-1 font-sans text-xs text-red-500">{formErrors.guestPhone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-sans text-sm font-medium text-joy-ink mb-2">
                        {tx(T.checkout.guestEmail, lang)}
                      </label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder={tx(T.checkout.guestEmailPh, lang)}
                        className={fieldCls()}
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block font-sans text-sm font-medium text-joy-ink mb-2">
                        {tx(T.checkout.guestNotes, lang)}
                      </label>
                      <textarea
                        value={guestNotes}
                        onChange={(e) => setGuestNotes(e.target.value)}
                        placeholder={tx(T.checkout.guestNotesPh, lang)}
                        rows={3}
                        className={`${fieldCls()} resize-none`}
                      />
                    </div>

                    {/* CCCD Upload */}
                    <div className="pt-2">
                      <div className="flex items-start justify-between mb-2">
                        <label className="font-sans text-sm font-medium text-joy-ink">
                          {lang === "vi" ? "CCCD / Hộ chiếu" : "ID Card / Passport"}
                        </label>
                        <span className="font-sans text-[10px] text-joy-muted bg-joy-warm border border-joy-border px-2 py-0.5 rounded-full">
                          {lang === "vi" ? "Tùy chọn · dùng cho đăng ký tạm trú" : "Optional · for residence registration"}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-joy-muted mb-3">
                        {lang === "vi"
                          ? "Tải lên 2 mặt CCCD để hoàn tất thủ tục đăng ký tạm trú tạm vắng. Ảnh được mã hóa và bảo mật."
                          : "Upload both sides of your ID card for temporary residence registration. Images are encrypted and secure."}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {(["front", "back"] as const).map((side) => {
                          const preview = side === "front" ? cccdFrontPreview : cccdBackPreview;
                          const label   = side === "front"
                            ? (lang === "vi" ? "Mặt trước" : "Front side")
                            : (lang === "vi" ? "Mặt sau"   : "Back side");
                          return (
                            <label
                              key={side}
                              className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-joy-border bg-joy-cream hover:border-joy-green hover:bg-joy-warm transition-colors cursor-pointer overflow-hidden"
                              style={{ minHeight: "120px" }}
                            >
                              {preview ? (
                                <>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={preview} alt={label} className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                                    <span className="font-sans text-xs text-white font-medium">
                                      {lang === "vi" ? "Đổi ảnh" : "Change"}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <ImageIcon size={24} className="text-joy-muted" />
                                  <span className="font-sans text-xs text-joy-muted text-center px-2">{label}</span>
                                  <Upload size={12} className="text-joy-green" />
                                </>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => handleCccdFile(side, e.target.files?.[0] ?? null)}
                              />
                            </label>
                          );
                        })}
                      </div>
                      {(cccdFront || cccdBack) && !(cccdFront && cccdBack) && (
                        <p className="mt-2 font-sans text-xs text-amber-600">
                          {lang === "vi" ? "Vui lòng tải đủ cả 2 mặt." : "Please upload both sides."}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* No dates warning */}
                  <AnimatePresence>
                    {nights <= 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                          <p className="font-sans text-sm text-amber-700">
                            {tx(T.checkout.selectDates, lang)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Unavailable warning */}
                  <AnimatePresence>
                    {availStatus === "taken" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                          <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="font-sans text-sm text-red-700">
                            {lang === "vi"
                              ? "Phòng đã được đặt trong khoảng thời gian này. Vui lòng chọn ngày khác."
                              : "Room is not available for these dates. Please choose different dates."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Booking error */}
                  {bookingError && (
                    <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                      <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="font-sans text-sm text-red-700">{bookingError}</p>
                    </div>
                  )}

                  {/* Confirm CTA */}
                  <button
                    onClick={handleConfirm}
                    disabled={!canConfirm}
                    className="mt-6 btn-primary w-full justify-center py-4 text-base
                               disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {bookingLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {lang === "vi" ? "Đang xử lý..." : "Processing..."}
                      </>
                    ) : (
                      <>
                        {tx(T.checkout.confirmBtn, lang)} <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {/* Or contact */}
                  <div className="mt-5 pt-5 border-t border-joy-border flex flex-wrap items-center gap-3">
                    <span className="font-sans text-xs text-joy-muted">{tx(T.checkout.orContact, lang)}</span>
                    <a
                      href={zaloUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs text-joy-green hover:underline flex items-center gap-1"
                    >
                      <MessageCircle size={12} /> Zalo
                    </a>
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="font-sans text-xs text-joy-green hover:underline flex items-center gap-1"
                    >
                      <Phone size={12} /> {phone}
                    </a>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Payment ── */}
              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  {/* Success header */}
                  <div className="bg-joy-green/10 border border-joy-green/30 rounded-2xl p-6 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-joy-green flex items-center justify-center flex-shrink-0 shadow-sm">
                      <CheckCircle2 size={22} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl text-joy-ink font-medium">
                        {tx(T.checkout.paymentTitle, lang)}
                      </h2>
                      <p className="font-sans text-sm text-joy-muted mt-1">
                        {tx(T.checkout.paymentRef, lang)}:{" "}
                        <strong className="text-joy-ink font-semibold tracking-wide">{displayRef}</strong>
                      </p>
                      <p className="font-sans text-xs text-joy-muted mt-0.5">
                        {guestName} · {guestPhone}
                        {guestEmail && ` · ${guestEmail}`}
                      </p>
                    </div>
                  </div>

                  {/* Bank transfer card */}
                  <div className="bg-white border border-joy-border rounded-2xl p-6">
                    <p className="font-sans text-sm text-joy-muted mb-6">
                      {tx(T.checkout.paymentInstr, lang)}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* QR code */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-2">
                        {settings?.bankQRImageUrl ? (
                          <img
                            src={settings.bankQRImageUrl}
                            alt="Bank QR Code"
                            className="w-44 h-44 rounded-xl border border-joy-border object-contain"
                          />
                        ) : (
                          <div className="w-44 h-44 rounded-xl border-2 border-dashed border-joy-border
                                          flex flex-col items-center justify-center gap-2 bg-joy-warm">
                            <Lock size={24} className="text-joy-muted" />
                            <p className="font-sans text-xs text-joy-muted text-center px-4 leading-relaxed">
                              {lang === "vi" ? "Thêm QR code trong Sanity Studio" : "Add QR code in Sanity Studio"}
                            </p>
                          </div>
                        )}
                        <p className="font-sans text-[11px] text-joy-muted">
                          {lang === "vi" ? "Quét để chuyển khoản" : "Scan to transfer"}
                        </p>
                      </div>

                      {/* Bank details list */}
                      <div className="flex-1 divide-y divide-joy-border">
                        {[
                          { key: "bank",    label: tx(T.checkout.paymentBank,    lang), value: settings?.bankName          || "—" },
                          { key: "acct",    label: tx(T.checkout.paymentAccount, lang), value: settings?.bankAccountNumber  || "—", copy: true },
                          { key: "name",    label: tx(T.checkout.paymentName,    lang), value: settings?.bankAccountName    || "—" },
                          { key: "amount",  label: tx(T.checkout.paymentAmount,  lang), value: fmtVND(total), highlight: true },
                          { key: "note",    label: tx(T.checkout.paymentNote,    lang), value: transferNote, copy: true },
                        ].map(({ key, label, value, highlight, copy }) => (
                          <div key={key} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                            <span className="font-sans text-xs text-joy-muted w-1/3 flex-shrink-0">{label}</span>
                            <div className="flex items-center gap-2 flex-1 justify-end">
                              <span className={`font-sans text-sm font-semibold text-right leading-tight
                                              ${highlight ? "text-joy-green text-base" : "text-joy-ink"}`}>
                                {value}
                              </span>
                              {copy && (
                                <button
                                  onClick={() => copyText(value, key)}
                                  className="text-joy-muted hover:text-joy-green transition-colors flex-shrink-0"
                                  aria-label="Copy"
                                >
                                  {copied === key
                                    ? <Check size={14} className="text-joy-green" />
                                    : <Copy size={14} />}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Zalo CTA */}
                  <a
                    href={zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center py-4 text-base"
                  >
                    <MessageCircle size={18} />
                    {tx(T.checkout.paymentSendZalo, lang)}
                  </a>

                  {/* Confirmation time */}
                  <p className="font-sans text-sm text-joy-muted text-center leading-relaxed">
                    {tx(T.checkout.paymentConfirmTime, lang)}
                  </p>

                  {/* Edit booking */}
                  <button
                    onClick={() => setStep("form")}
                    className="w-full font-sans text-sm text-joy-muted hover:text-joy-ink
                               transition-colors flex items-center justify-center gap-2 py-2"
                  >
                    <ArrowLeft size={13} />
                    {tx(T.checkout.paymentEditBooking, lang)}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
