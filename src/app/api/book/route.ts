import { NextResponse } from "next/server";
import { getRooms } from "@/lib/sanity-data";
import { calcSubtotal, calcDiscount, nightsBetween } from "@/lib/pricing";
import { checkPromo } from "@/lib/promo";

const PMS_URL = process.env.NEXT_PUBLIC_PMS_URL || "https://joystay-pms.vercel.app";

const str = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined);
const bad = (message: string) => NextResponse.json({ error: message, message }, { status: 400 });

/** Tạo đơn đặt phòng trực tiếp.
 *  BẢO MẬT (11/2026): máy chủ TỰ TÍNH tổng tiền từ giá phòng trong CMS + mã giảm giá đã kiểm tra lại,
 *  KHÔNG dùng `totalPrice` do trình duyệt gửi lên. Chỉ chuyển sang PMS các trường cho phép;
 *  `source` và `status` luôn là DIRECT / PENDING. */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const roomId = str(body.roomId, 64);
    const guestName = str(body.guestName, 120);
    const guestPhone = str(body.guestPhone, 30);
    const checkIn = str(body.checkIn, 10) ?? "";
    const checkOut = str(body.checkOut, 10) ?? "";
    if (!roomId || !guestName || !guestPhone) return bad("Missing booking details");

    const nights = nightsBetween(checkIn, checkOut);
    if (nights <= 0 || nights > 180) return bad("Invalid dates");
    // Không nhận ngày đến đã qua (chừa 1 ngày cho lệch múi giờ)
    if (Date.parse(`${checkIn}T00:00:00Z`) < Date.now() - 2 * 86_400_000) return bad("Check-in date is in the past");

    const room = (await getRooms()).find((r) => r.pmsRoomId === roomId);
    if (!room || !room.pricePerNight || room.isAvailable === false) return bad("Room not available");

    const { subtotal } = calcSubtotal(checkIn, checkOut, room.pricePerNight, room.weekendPrice);
    let discount = 0;
    let promoNote = "";
    if (body.promoCode) {
      const promo = await checkPromo(body.promoCode, room.slug, nights);
      if (!promo.valid) return bad(promo.message);
      discount = calcDiscount(subtotal, promo);
      promoNote = `[Promo ${promo.code}: -${discount.toLocaleString("vi-VN")}đ]`;
    }
    const totalPrice = subtotal - discount;
    if (totalPrice <= 0) return bad("Invalid price");

    const notes = [str(body.notes, 1000), promoNote].filter(Boolean).join(" ") || undefined;

    const res = await fetch(`${PMS_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Khoá máy chủ ↔ PMS (Ops 2.0). Biến chỉ ở server, không lộ ra trình duyệt.
        ...(process.env.PMS_API_KEY ? { "x-api-key": process.env.PMS_API_KEY } : {}),
      },
      body: JSON.stringify({
        roomId,
        guestName,
        guestEmail: str(body.guestEmail, 160),
        guestPhone,
        checkIn,
        checkOut,
        totalPrice,
        source: "DIRECT",
        status: "PENDING",
        notes,
        cccdFrontUrl: str(body.cccdFrontUrl, 500),
        cccdBackUrl: str(body.cccdBackUrl, 500),
      }),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    // Trả kèm số tiền chính thức để trang thanh toán hiển thị đúng con số máy chủ đã tính
    return NextResponse.json({ ...data, totalPrice }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/book]", err);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
