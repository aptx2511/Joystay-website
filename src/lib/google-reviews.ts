/**
 * Google reviews qua Places API (New) — chạy phía server, cache 6 giờ.
 * Cần env: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID (Place ID của Joystay trên Google Maps).
 * Thiếu env hoặc lỗi → trả null, trang tự ẩn phần danh sách và chỉ hiện nút đánh giá.
 */
export interface GoogleReview {
  author: string;
  authorUrl?: string;
  photo?: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface GoogleReviewsData {
  rating: number;
  total: number;
  mapsUrl: string;
  writeUrl: string;
  reviews: GoogleReview[];
}

// Joystay - The Art of Stay, 382/23 Nguyễn Thị Minh Khai (Place ID công khai, không phải bí mật)
export const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJY_mYYwAvdTER0nV8euop69E";
// Link viết đánh giá chính thức (từ mã QR của Google Business Profile)
export const GOOGLE_REVIEW_URL = "https://g.page/r/CdJ1fHrqKevREAE/review";

export function writeReviewUrl() {
  return GOOGLE_REVIEW_URL;
}

export async function getGoogleReviews(lang: "en" | "vi" = "vi"): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${lang}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 6 * 3600 },
    });
    if (!res.ok) {
      console.error("[google-reviews]", res.status, await res.text());
      return null;
    }
    const d = await res.json();
    return {
      rating: d.rating ?? 0,
      total: d.userRatingCount ?? 0,
      mapsUrl: d.googleMapsUri ?? `https://www.google.com/maps/place/?q=place_id:${placeId}`,
      writeUrl: writeReviewUrl(),
      reviews: (d.reviews ?? [])
        .filter((r: any) => (r.originalText?.text ?? r.text?.text ?? "").trim())
        .map((r: any) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          authorUrl: r.authorAttribution?.uri,
          photo: r.authorAttribution?.photoUri,
          rating: r.rating ?? 0,
          text: r.originalText?.text ?? r.text?.text ?? "", // giữ nguyên văn khách viết
          relativeTime: r.relativePublishTimeDescription ?? "",
        })),
    };
  } catch (e) {
    console.error("[google-reviews]", e);
    return null;
  }
}
