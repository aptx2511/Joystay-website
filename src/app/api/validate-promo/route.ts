import { NextRequest, NextResponse } from "next/server";
import { getActivePromoCodes } from "@/lib/sanity-data";

// Fallback mock promos (used when Sanity is not configured)
const MOCK_PROMOS = [
  { code: "JOYSTAY10", discountType: "PERCENTAGE", discountValue: 10, minNights: 1, applicableRooms: [] },
  { code: "JOYBLOG",   discountType: "PERCENTAGE", discountValue: 10, minNights: 1, applicableRooms: [] },
];

export async function POST(req: NextRequest) {
  try {
    const { code, roomSlug, nights } = await req.json();

    if (!code) {
      return NextResponse.json({ valid: false, message: "No code provided" });
    }

    const upperCode = String(code).toUpperCase().trim();
    const nightsNum = Number(nights) || 0;

    // Try Sanity first, fall back to mock
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let promoCodes: any[] = await getActivePromoCodes();
    if (!promoCodes?.length) promoCodes = MOCK_PROMOS;

    const promo = promoCodes.find(
      (p) => p.code.toUpperCase() === upperCode
    );

    if (!promo) {
      return NextResponse.json({ valid: false, message: "Invalid or expired code" });
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
