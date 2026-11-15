/** Dữ liệu có cấu trúc (schema.org JSON-LD) cho Google và các trợ lý AI.
 *  Chỉ ghi thông tin đúng thực tế — đồng bộ với guide-content.ts và room-facts.ts.
 *  Không đưa điểm đánh giá Google vào đây: Google không cho phép tự gắn sao từ nguồn bên thứ ba. */
import type { Room } from "./mock-data";
import { SITE_URL } from "./site";
import { GUIDE_CONFIG } from "./guide-content";
import { GOOGLE_PLACE_ID } from "./google-reviews";

export const BUSINESS = {
  name: "Joystay Vietnam",
  alternateName: "Joystay - The Art of Stay",
  phone: "+84898888457",
  street: "382/23 Nguyễn Thị Minh Khai, Phường Bàn Cờ",
  district: "Quận 3",
  city: "Hồ Chí Minh",
  country: "VN",
  // Toạ độ theo ghim của Joystay trên Google Maps
  lat: 10.7725177,
  lng: 106.6870371,
  mapsUrl: `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`,
};

const ld = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

function roomNode(r: Room) {
  return {
    "@type": "HotelRoom",
    "@id": `${SITE_URL}/rooms/${r.slug}#room`,
    name: r.name,
    url: `${SITE_URL}/rooms/${r.slug}`,
    description: r.shortDescription,
    ...(r.featuredImage ? { image: r.featuredImage } : {}),
    ...(r.size ? { floorSize: { "@type": "QuantitativeValue", value: r.size, unitCode: "MTK" } } : {}),
    ...(r.maxGuests ? { occupancy: { "@type": "QuantitativeValue", maxValue: r.maxGuests } } : {}),
    ...(r.bedType ? { bed: r.bedType } : {}),
    ...(r.amenities?.length
      ? { amenityFeature: r.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })) }
      : {}),
  };
}

/** Trang chủ: cả cơ sở lưu trú + danh sách phòng */
export function lodgingJsonLd(rooms: Room[], sameAs: string[] = []) {
  const prices = rooms.filter((r) => r.pricePerNight > 0).map((r) => r.pricePerNight);
  const fmt = (n: number) => n.toLocaleString("vi-VN") + "₫";
  const images = rooms.map((r) => r.featuredImage).filter(Boolean).slice(0, 6);
  return ld({
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#lodging`,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    description:
      "Boutique self check-in homestay with 6 individually designed rooms in District 3, Ho Chi Minh City. Book direct on joystay.vn.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    ...(images.length ? { image: images } : {}),
    telephone: BUSINESS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.district,
      addressRegion: BUSINESS.city,
      addressCountry: BUSINESS.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: BUSINESS.lat, longitude: BUSINESS.lng },
    hasMap: BUSINESS.mapsUrl,
    ...(GUIDE_CONFIG.checkInTime ? { checkinTime: GUIDE_CONFIG.checkInTime } : {}),
    ...(GUIDE_CONFIG.checkOutTime ? { checkoutTime: GUIDE_CONFIG.checkOutTime } : {}),
    numberOfRooms: rooms.length || 6,
    ...(prices.length ? { priceRange: `${fmt(Math.min(...prices))} – ${fmt(Math.max(...prices))}` } : {}),
    currenciesAccepted: "VND",
    paymentAccepted: "Bank transfer (VietQR)",
    availableLanguage: ["vi", "en"],
    amenityFeature: ["Self check-in 24/7", "Free WiFi", "Air conditioning", "Luggage lockers"].map((name) => ({
      "@type": "LocationFeatureSpecification", name, value: true,
    })),
    ...(sameAs.length ? { sameAs } : {}),
    containsPlace: rooms.map(roomNode),
  });
}

/** Trang từng phòng */
export function roomJsonLd(r: Room) {
  return ld({
    "@context": "https://schema.org",
    ...roomNode(r),
    containedInPlace: { "@type": "LodgingBusiness", "@id": `${SITE_URL}/#lodging`, name: BUSINESS.name, url: SITE_URL },
    ...(r.pricePerNight > 0
      ? {
          potentialAction: {
            "@type": "ReserveAction",
            target: `${SITE_URL}/rooms/${r.slug}`,
            priceSpecification: { "@type": "UnitPriceSpecification", price: r.pricePerNight, priceCurrency: "VND", unitText: "night" },
          },
        }
      : {}),
  });
}
