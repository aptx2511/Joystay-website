import { NextResponse } from "next/server";

const PMS_URL = process.env.NEXT_PUBLIC_PMS_URL || "https://joystay-pms.vercel.app";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(`${PMS_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Khoá máy chủ ↔ PMS (Ops 2.0). Biến chỉ ở server, không lộ ra trình duyệt.
        ...(process.env.PMS_API_KEY ? { "x-api-key": process.env.PMS_API_KEY } : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("[POST /api/book]", err);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
