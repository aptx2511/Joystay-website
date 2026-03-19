import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const type = body._type as string;

    if (type) {
      revalidateTag(type);
    }

    return NextResponse.json({ revalidated: true, type, ts: Date.now() });
  } catch {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }
}
