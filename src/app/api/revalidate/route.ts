import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const CONTENT_TAGS = ["room", "post", "promoCode", "siteSettings", "review"];

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    // Sanity transaction webhook sends {ids: {created,updated,deleted}}
    // Sanity document webhook sends {_type: "room", ...}
    // Both cases: revalidate all content tags
    const body = await req.json().catch(() => ({}));
    const type = body._type as string | undefined;

    if (type && CONTENT_TAGS.includes(type)) {
      revalidateTag(type);
    } else {
      CONTENT_TAGS.forEach(revalidateTag);
    }

    return NextResponse.json({ revalidated: true, tags: type ? [type] : CONTENT_TAGS, ts: Date.now() });
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
