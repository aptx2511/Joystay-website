import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const front = formData.get("front") as File | null;
    const back  = formData.get("back")  as File | null;

    if (!front || !back) {
      return NextResponse.json({ error: "Both front and back images are required" }, { status: 400 });
    }

    const bookingRef = (formData.get("bookingRef") as string) || "unknown";
    const timestamp  = Date.now();

    const [frontBlob, backBlob] = await Promise.all([
      put(`cccd/${bookingRef}-front-${timestamp}${getExt(front.name)}`, front, {
        access: "public",
        contentType: front.type,
      }),
      put(`cccd/${bookingRef}-back-${timestamp}${getExt(back.name)}`, back, {
        access: "public",
        contentType: back.type,
      }),
    ]);

    return NextResponse.json({
      cccdFrontUrl: frontBlob.url,
      cccdBackUrl:  backBlob.url,
    });
  } catch (err) {
    console.error("[POST /api/upload-cccd]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

function getExt(filename: string) {
  const parts = filename.split(".");
  return parts.length > 1 ? `.${parts.at(-1)!.toLowerCase()}` : ".jpg";
}
