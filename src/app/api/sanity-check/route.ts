import { NextResponse } from "next/server";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { ROOM_BY_SLUG_QUERY, ALL_ROOMS_QUERY } from "@/sanity/lib/queries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "pop-art-studio";

  let roomDetail = null;
  let allRooms = null;
  let errorDetail = null;
  let errorAll = null;

  try {
    roomDetail = await client.fetch(ROOM_BY_SLUG_QUERY, { slug }, { cache: "no-store" });
  } catch (e) {
    errorDetail = String(e);
  }

  try {
    allRooms = await client.fetch(ALL_ROOMS_QUERY, {}, { cache: "no-store" });
  } catch (e) {
    errorAll = String(e);
  }

  return NextResponse.json({
    configured: isSanityConfigured,
    // ALL_ROOMS_QUERY result (used on homepage & listing)
    allRoomsQuery: {
      error: errorAll,
      count: allRooms?.length ?? 0,
      rooms: allRooms?.map((r: { name: string; featuredImage?: string; gallery?: { bedroom?: unknown[] } }) => ({
        name: r.name,
        featuredImage: r.featuredImage ?? null,
        hasGalleryBedroom: (r.gallery as { bedroom?: unknown[] } | undefined)?.bedroom?.length ?? 0,
      })) ?? [],
    },
    // ROOM_BY_SLUG_QUERY result (used on detail page)
    roomDetailQuery: {
      error: errorDetail,
      name: roomDetail?.name ?? null,
      featuredImage: roomDetail?.featuredImage ?? null,
      galleryBedroomCount: roomDetail?.gallery?.bedroom?.length ?? 0,
    },
  });
}
