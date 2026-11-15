import { getActivePromoCodes } from "@/lib/sanity-data";

export type PromoCheck =
  | { valid: true; code: string; discountType: string; discountValue: number }
  | { valid: false; message: string };

/** Kiểm tra mã giảm giá phía máy chủ. Chỉ chấp nhận mã đang active & còn hạn trong Sanity (không có mã dự phòng trong code).
 *  Dùng chung cho /api/validate-promo (hiển thị) và /api/book (tính tiền chính thức). */
export async function checkPromo(code: unknown, roomSlug: string | undefined, nights: number): Promise<PromoCheck> {
  if (!code) return { valid: false, message: "No code provided" };
  const upperCode = String(code).toUpperCase().trim();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promoCodes: any[] = (await getActivePromoCodes()) ?? [];
  const promo = promoCodes.find((p) => String(p.code ?? "").toUpperCase() === upperCode);

  if (!promo) return { valid: false, message: "Invalid or expired code" };
  if (promo.maxUses && (promo.usedCount ?? 0) >= promo.maxUses) return { valid: false, message: "This code has reached its usage limit" };
  if (promo.applicableRooms?.length > 0 && (!roomSlug || !promo.applicableRooms.includes(roomSlug))) return { valid: false, message: "Code not valid for this room" };
  if (nights < (promo.minNights ?? 1)) {
    return { valid: false, message: `Requires minimum ${promo.minNights} night${promo.minNights === 1 ? "" : "s"}` };
  }
  return { valid: true, code: promo.code, discountType: promo.discountType, discountValue: Number(promo.discountValue) || 0 };
}
