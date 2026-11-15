/** Tính tiền phòng — DÙNG CHUNG cho trình duyệt (hiển thị) và máy chủ (/api/book, số tiền chính thức).
 *  Đêm cuối tuần = đêm thứ Sáu và thứ Bảy. Ngày dạng "YYYY-MM-DD", tính theo UTC để hai phía ra cùng kết quả. */

const DAY = 86_400_000;
const parse = (s: string) => (/^\d{4}-\d{2}-\d{2}$/.test(s) ? Date.parse(`${s}T00:00:00Z`) : NaN);

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parse(checkIn), b = parse(checkOut);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(0, Math.round((b - a) / DAY));
}

export function calcSubtotal(checkIn: string, checkOut: string, pricePerNight: number, weekendPrice?: number) {
  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0) return { weekdayNights: 0, weekendNights: 0, subtotal: 0 };
  if (!weekendPrice) return { weekdayNights: nights, weekendNights: 0, subtotal: nights * pricePerNight };

  let weekdayNights = 0, weekendNights = 0;
  const start = parse(checkIn);
  for (let i = 0; i < nights; i++) {
    const dow = new Date(start + i * DAY).getUTCDay(); // 0=CN, 5=T6, 6=T7
    if (dow === 5 || dow === 6) weekendNights++; else weekdayNights++;
  }
  return { weekdayNights, weekendNights, subtotal: weekdayNights * pricePerNight + weekendNights * weekendPrice };
}

export function calcDiscount(subtotal: number, promo?: { discountType: string; discountValue: number } | null): number {
  if (!promo || subtotal <= 0) return 0;
  return promo.discountType === "PERCENTAGE"
    ? Math.round((subtotal * promo.discountValue) / 100)
    : Math.min(promo.discountValue, subtotal);
}
