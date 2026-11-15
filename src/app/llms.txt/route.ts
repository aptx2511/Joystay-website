/** /llms.txt — bản tóm tắt dạng văn bản cho các trợ lý AI (ChatGPT, Gemini, Claude, Perplexity…).
 *  Tự sinh từ dữ liệu phòng và bài blog nên luôn khớp với website. */
import { getRooms, getPosts } from "@/lib/sanity-data";
import { SITE_URL } from "@/lib/site";
import { GUIDE_CONFIG } from "@/lib/guide-content";
import { BUSINESS } from "@/lib/structured-data";

export const revalidate = 3600;

export async function GET() {
  const [rooms, posts] = await Promise.all([getRooms().catch(() => []), getPosts().catch(() => [])]);
  const vnd = (n: number) => n.toLocaleString("en-US") + " VND";

  const roomLines = rooms.map((r) => {
    const bits = [
      r.roomNumber ? `room ${r.roomNumber}` : null,
      r.size ? `${r.size} m²` : null,
      r.bedType || null,
      r.maxGuests ? `up to ${r.maxGuests} guests` : null,
      r.hasWindow === false ? "no window (fully dark)" : r.hasWindow ? "has a window" : null,
      r.pricePerNight > 0 ? `from ${vnd(r.pricePerNight)} per night` : null,
    ].filter(Boolean).join(", ");
    return `- [${r.name}](${SITE_URL}/rooms/${r.slug}): ${bits}. ${r.shortDescription ?? ""}`.trim();
  });

  const postLines = posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt ?? ""}`.trim());

  const text = `# Joystay Vietnam

> Joystay is a boutique self check-in homestay with ${rooms.length || 6} individually designed rooms at ${BUSINESS.street}, District 3, Ho Chi Minh City (Saigon), Vietnam. Guests book direct on joystay.vn and let themselves in with a keypad code at any hour.

## Key facts

- Address: 382/23 Nguyễn Thị Minh Khai, Bàn Cờ Ward, District 3, Ho Chi Minh City, Vietnam
- Check-in from ${GUIDE_CONFIG.checkInTime ?? "15:00"}, check-out by ${GUIDE_CONFIG.checkOutTime ?? "12:00"}. Self check-in 24/7 by keypad code; there is no reception and no staff on site.
- The ground floor is the PORO Trading Card Game shop; Joystay shares that entrance. Rooms are on the floors above, reached by stairs.
- Parking: no indoor parking. Motorbikes park at the lot at 382/27 Nguyễn Thị Minh Khai (1-minute walk). The alley is car-accessible for drop-off.
- Luggage lockers are available for early arrivals.
- Booking direct: free cancellation up to 48 hours before check-in, no credit card required, payment by Vietnamese bank transfer (VietQR), confirmation is automatic.
- Rooms are not rented by the hour.
- Contact: phone / WhatsApp / Zalo +84 898 888 457
- Languages: Vietnamese and English

## Rooms

${roomLines.join("\n")}

## Pages

- [All rooms](${SITE_URL}/rooms): photos, sizes and prices for every room
- [Availability](${SITE_URL}/availability): live calendar and nightly prices
- [Guest guide](${SITE_URL}/guide): step-by-step self check-in, FAQ, places nearby
- [Contact](${SITE_URL}/contact)

## Articles

${postLines.join("\n")}
`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
