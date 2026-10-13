import { NextRequest, NextResponse } from "next/server";
import { getActivePromoCodes } from "@/lib/sanity-data";

export async function POST(req: NextRequest) {
  try {
    const { code, roomSlug, nights } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, message: "No code provided" });
    }

    const upperCode = String(code).toUpperCase().trim();
    const nightsNum = Number(nights) || 0;

    // Chỉ chấp nhận mã đang active & còn hạn trong Sanity (không có mã dự phòng trong code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promoCodes: any[] = (await getActivePromoCodes()) ?? [];

    const promo = promoCodes.find(
      (p) => String(p.code ?? "").toUpperCase() === upperCode
    );

    if (!promo) {
      return NextResponse.json({ valid: false, message: "Invalid or expired code" });
    }

    // Check usage limit
    if (promo.maxUses && (promo.usedCount ?? 0) >= promo.maxUses) {
      return NextResponse.json({ valid: false, message: "This code has reached its usage limit" });
    }

    // Check room restriction
    if (promo.applicableRooms?.length > 0 && !promo.applicableRooms.includes(roomSlug)) {
      return NextResponse.json({ valid: false, message: "Code not valid for this room" });
    }

    // Check min nights
    if (nightsNum < (promo.minNights ?? 1)) {
      return NextResponse.json({
        valid: false,
        message: `Requires minimum ${promo.minNights} night${promo.minNights === 1 ? "" : "s"}`,
      });
    }

    return NextResponse.json({
      valid: true,
      code: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
    });
  } catch {
    return NextResponse.json({ valid: false, message: "Error validating code" }, { status: 500 });
  }
}
