import { NextRequest, NextResponse } from "next/server";
import { checkPromo } from "@/lib/promo";

export async function POST(req: NextRequest) {
  try {
    const { code, roomSlug, nights } = await req.json();
    return NextResponse.json(await checkPromo(code, roomSlug, Number(nights) || 0));
  } catch {
    return NextResponse.json({ valid: false, message: "Error validating code" }, { status: 500 });
  }
}
