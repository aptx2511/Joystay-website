/**
 * THÔNG TIN PHÒNG ĐỒNG BỘ VỚI AIRBNB — nguồn sự thật cho tên, số phòng, tầng, diện tích, giường, tiện ích.
 * Lấy từ Airbnb host dashboard (xem Joystay-Ai/JOYSTAY_DAILY_OPS.md mục 2), khớp theo pmsRoomId.
 * Sanity vẫn giữ ảnh, mô tả, giá; các trường dưới đây GHI ĐÈ dữ liệu Sanity khi hiển thị.
 * Khi sửa listing trên Airbnb → sửa ở đây cho đồng bộ.
 */
import type { Room } from "./mock-data";

export type RoomFacts = {
  name: string;          // đúng tên listing Airbnb (bỏ tiền tố "[Joystay Q3]")
  roomNumber: string;
  floor: number;         // lầu (tầng trệt là cửa hàng PORO)
  size: number;
  bedType: string;
  maxGuests: number;
  window: boolean;
  amenities: string[];   // tên tiện ích theo Airbnb (EN); bản dịch VI ở AMENITY_VI
  airbnbId?: string;
};

/**
 * Tiện ích: copy đúng danh sách trong Airbnb → Trình chỉnh sửa bài đăng → Tiện nghi (kiểm tra 05/11/2026).
 * Khoá = tên tiếng Anh chuẩn của Airbnb; nhãn tiếng Việt = đúng chữ Airbnb hiển thị (AMENITY_VI).
 */
const A = {
  wifi: "Wifi", ac: "Air conditioning", tv: "TV", kitchen: "Kitchen", kitchenette: "Kitchenette",
  cooking: "Cooking basics", kettle: "Hot water kettle", fridge: "Refrigerator", minifridge: "Mini fridge",
  workspace: "Dedicated workspace", washer: "Washer", dryer: "Dryer", hairdryer: "Hair dryer", iron: "Iron",
  hangers: "Hangers", hotwater: "Hot water", shampoo: "Shampoo", conditioner: "Conditioner", bodysoap: "Body soap",
  essentials: "Essentials", cleaning: "Cleaning products", linens: "Bed linens", luggage: "Luggage dropoff allowed",
  longterm: "Long term stays allowed", cleaningService: "Cleaning available during stay",
  streetParking: "Free street parking", paidParking: "Paid parking off premises", laundromat: "Laundromat nearby",
  smoke: "Smoke alarm", co: "Carbon monoxide alarm", extinguisher: "Fire extinguisher", firstaid: "First aid kit",
} as const;
type AKey = keyof typeof A;
// Thứ tự hiển thị (tiện ích nổi bật trước — trang Rooms chỉ hiện 5 cái đầu)
const ORDER: AKey[] = [
  "kitchen", "wifi", "ac", "tv", "workspace", "washer", "dryer", "kitchenette", "fridge", "minifridge", "cooking", "kettle",
  "hotwater", "hairdryer", "iron", "hangers", "shampoo", "conditioner", "bodysoap", "essentials", "linens", "cleaning",
  "luggage", "longterm", "cleaningService", "laundromat", "streetParking", "paidParking", "smoke", "co", "extinguisher", "firstaid",
];
const list = (...keys: AKey[]) => ORDER.filter((k) => keys.includes(k)).map((k) => A[k]);

export const ROOM_FACTS: Record<string, RoomFacts> = {
  // 401 — Airbnb 1810972334753350554
  cmw0v9j3w0000dzhkqie99lh2: {
    name: "Matcha Bath Loft w/ Indoor Tub", roomNumber: "401", floor: 4, size: 50, bedType: "King bed + sofa bed", maxGuests: 4, window: true,
    amenities: list("iron", "extinguisher", "kitchenette", "luggage", "longterm", "streetParking", "paidParking", "shampoo", "cleaningService",
      "workspace", "smoke", "washer", "co", "dryer", "hairdryer", "hangers", "kitchen", "hotwater", "cleaning", "bodysoap", "essentials",
      "tv", "fridge", "wifi", "ac", "cooking", "kettle"),
    airbnbId: "1810972334753350554",
  },
  // 202 — Airbnb 1559130380463292207
  cmmuucxqc0000shoxx69vkmqg: {
    name: "Pop Art Studio w/ Kitchen", roomNumber: "202", floor: 2, size: 25, bedType: "King bed + couch", maxGuests: 2, window: true,
    amenities: list("iron", "extinguisher", "kitchenette", "firstaid", "luggage", "longterm", "streetParking", "paidParking", "shampoo",
      "cleaningService", "workspace", "smoke", "washer", "co", "dryer", "hairdryer", "kitchen", "hotwater", "cleaning", "bodysoap",
      "essentials", "tv", "minifridge", "wifi", "ac", "cooking", "kettle"),
    airbnbId: "1559130380463292207",
  },
  // 302 — Airbnb 1806587025194224911 (cùng phòng với listing "Black & White Room w/ Kitchen" 1638422674685971390)
  cmmuucxsp0001shoxo578c9h3: {
    name: "Parisian Chic Room w/ Kitchen", roomNumber: "302", floor: 3, size: 25, bedType: "King bed", maxGuests: 2, window: true,
    amenities: list("iron", "extinguisher", "kitchenette", "luggage", "longterm", "streetParking", "paidParking", "shampoo",
      "cleaningService", "workspace", "smoke", "washer", "co", "dryer", "hairdryer", "hangers", "kitchen", "hotwater", "cleaning",
      "bodysoap", "essentials", "tv", "fridge", "wifi", "ac", "cooking", "kettle"),
    airbnbId: "1806587025194224911",
  },
  // 101 — Airbnb 1638413514151551091
  cmmuucxts0002shoxwvoivyh7: {
    name: "Cozy Indochine Sleep Cave", roomNumber: "101", floor: 1, size: 15, bedType: "Queen bed", maxGuests: 2, window: false,
    amenities: list("iron", "extinguisher", "linens", "luggage", "longterm", "streetParking", "paidParking", "shampoo", "cleaningService",
      "workspace", "smoke", "washer", "co", "dryer", "hairdryer", "bodysoap", "essentials", "tv", "minifridge", "wifi", "ac"),
    airbnbId: "1638413514151551091",
  },
  // 201 — Airbnb 1638421587233726816
  cmmuucxvx0004shoxebjdm3y1: {
    name: "The Indochine Midnight Hideout", roomNumber: "201", floor: 2, size: 15, bedType: "Queen bed", maxGuests: 2, window: false,
    amenities: list("luggage", "streetParking", "paidParking", "shampoo", "conditioner", "laundromat", "smoke", "washer", "co", "dryer",
      "hairdryer", "hotwater", "cleaning", "bodysoap", "essentials", "tv", "minifridge", "wifi", "ac"),
    airbnbId: "1638421587233726816",
  },
  // 301 — Airbnb 1638422663428247432
  cmmuucxuu0003shoxub87vpgi: {
    name: "The Tropical Oasis Room", roomNumber: "301", floor: 3, size: 15, bedType: "Queen bed", maxGuests: 2, window: true,
    amenities: list("iron", "extinguisher", "luggage", "longterm", "streetParking", "paidParking", "shampoo", "conditioner",
      "cleaningService", "laundromat", "smoke", "washer", "co", "dryer", "hairdryer", "hotwater", "cleaning", "bodysoap", "essentials",
      "tv", "minifridge", "wifi", "ac"),
    airbnbId: "1638422663428247432",
  },
};

export const AMENITY_VI: Record<string, string> = {
  "Wifi": "Wi-fi", "Air conditioning": "Điều hòa nhiệt độ", "TV": "TV", "Kitchen": "Nhà bếp", "Kitchenette": "Bếp nhỏ",
  "Cooking basics": "Đồ nấu ăn cơ bản", "Hot water kettle": "Ấm đun nước nóng", "Refrigerator": "Tủ lạnh", "Mini fridge": "Tủ lạnh mini",
  "Dedicated workspace": "Không gian riêng để làm việc", "Washer": "Máy giặt", "Dryer": "Máy sấy quần áo", "Hair dryer": "Máy sấy tóc",
  "Iron": "Bàn là", "Hangers": "Móc treo quần áo", "Hot water": "Nước nóng", "Shampoo": "Dầu gội đầu", "Conditioner": "Dầu xả",
  "Body soap": "Sữa tắm", "Essentials": "Tiện nghi thiết yếu", "Cleaning products": "Sản phẩm vệ sinh", "Bed linens": "Bộ chăn ga gối",
  "Luggage dropoff allowed": "Cho phép gửi hành lý", "Long term stays allowed": "Cho phép ở dài hạn",
  "Cleaning available during stay": "Dịch vụ dọn vệ sinh trong thời gian ở", "Free street parking": "Chỗ đỗ xe miễn phí trên đường/phố",
  "Paid parking off premises": "Chỗ đỗ xe ngoài khuôn viên có thu phí", "Laundromat nearby": "Hiệu giặt là tự động gần đây",
  "Smoke alarm": "Máy báo khói", "Carbon monoxide alarm": "Máy phát hiện khí CO", "Fire extinguisher": "Bình chữa cháy",
  "First aid kit": "Bộ sơ cứu",
};

export const amenityLabel = (a: string, lang: "en" | "vi") => (lang === "vi" ? AMENITY_VI[a] ?? a : a);
const BED_VI: Record<string, string> = {
  "King bed": "1 giường king", "Queen bed": "1 giường queen", "King bed + couch": "1 giường king + đi-văng",
  "King bed + sofa bed": "1 giường king + 1 sofa giường",
};
export const bedLabel = (b: string, lang: "en" | "vi") => (lang === "vi" ? BED_VI[b] ?? b : b);
export const floorLabel = (floor: number, lang: "en" | "vi") => (lang === "vi" ? `Lầu ${floor}` : `Floor ${floor}`);

export type RoomWithFacts = Room & { roomNumber?: string; floor?: number; hasWindow?: boolean };

/** Ghi đè dữ liệu Sanity bằng thông tin chuẩn Airbnb */
export function applyFacts(room: Room): RoomWithFacts {
  const f = ROOM_FACTS[room.pmsRoomId];
  if (!f) return room;
  return {
    ...room,
    name: f.name, size: f.size, bedType: f.bedType, maxGuests: f.maxGuests, amenities: f.amenities,
    roomNumber: f.roomNumber, floor: f.floor, hasWindow: f.window,
  };
}

/** Phòng to trước (diện tích giảm dần), cùng diện tích thì theo số phòng */
export function sortRooms<T extends Room & { roomNumber?: string }>(rooms: T[]): T[] {
  return [...rooms].sort((a, b) => (b.size ?? 0) - (a.size ?? 0) || (a.roomNumber ?? "").localeCompare(b.roomNumber ?? ""));
}
