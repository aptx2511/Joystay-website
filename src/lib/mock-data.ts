export type GalleryImage = {
  url: string;
  alt?: string;
  hotspot?: { x: number; y: number };
};

export type RoomGallery = {
  bedroom?:  GalleryImage[];
  living?:   GalleryImage[];
  kitchen?:  GalleryImage[];
  bathroom?: GalleryImage[];
  other?:    GalleryImage[];
};

export type Room = {
  id: string;
  slug: string;
  name: string;
  concept: string;
  tagline?: string;
  size: number;
  maxGuests: number;
  bedType?: string;
  pricePerNight: number;
  weekendPrice?: number;
  pricePerMonth?: number;
  securityDeposit?: number;
  securityDepositNote?: string;
  cleaningFee?: number;
  stayType: "SHORT_STAY" | "LONG_STAY" | "BOTH";
  shortDescription: string;
  shortDescriptionVi: string;
  gradient: string;
  accentColor: string;
  amenities: string[];
  isAvailable: boolean;
  pmsRoomId: string;
  featuredImage?: string;
  featuredImageHotspot?: { x: number; y: number };
  gallery?: RoomGallery;
  galleryPreview?: string[]; // ảnh cho khối phòng trang chủ (ALL_ROOMS_QUERY)
  // Bổ sung từ room-facts.ts (đồng bộ Airbnb)
  roomNumber?: string;
  floor?: number;
  hasWindow?: boolean;
};

export type Testimonial = {
  id: number;
  name: string;
  country: string;
  flag: string;
  rating: number;
  text: string;
  stayType: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  categoryEn: string;
  readTime: number;
  publishedAt: string;
  gradient: string;
};

// ─── Rooms ────────────────────────────────────────────────────────────────────
export const ROOMS: Room[] = [
  {
    id: "pop-art-studio",
    slug: "pop-art-studio",
    name: "Pop Art Studio",
    concept: "Pop Art",
    size: 25,
    maxGuests: 2,
    pricePerNight: 680000,
    pricePerMonth: 9500000,
    securityDeposit: 2000000,
    stayType: "BOTH",
    shortDescription: "Bold colours, iconic prints, and a fully-equipped kitchen — creativity lives here.",
    shortDescriptionVi: "Màu sắc rực rỡ, họa tiết nổi bật và bếp đầy đủ tiện nghi — sáng tạo sinh sống ở đây.",
    gradient: "from-rose-400 via-pink-400 to-yellow-300",
    accentColor: "bg-rose-500",
    amenities: ["Full Kitchen", "Smart TV", "AC", "WiFi", "Washer", "Bathtub"],
    isAvailable: true,
    pmsRoomId: "cmmuucxqc0000shoxx69vkmqg",
  },
  {
    id: "bw-studio-large",
    slug: "bw-studio-large",
    name: "Monochrome Studio",
    concept: "Monochrome",
    size: 25,
    maxGuests: 2,
    pricePerNight: 650000,
    pricePerMonth: 9000000,
    securityDeposit: 2000000,
    stayType: "BOTH",
    shortDescription: "Timeless black-and-white aesthetic with a spacious kitchen for long-stay comfort.",
    shortDescriptionVi: "Thẩm mỹ đen trắng vượt thời gian với bếp rộng rãi, lý tưởng để ở dài hạn.",
    gradient: "from-zinc-900 via-zinc-700 to-slate-600",
    accentColor: "bg-zinc-800",
    amenities: ["Full Kitchen", "Smart TV", "AC", "WiFi", "Washer", "Rain Shower"],
    isAvailable: true,
    pmsRoomId: "cmmuucxsp0001shoxo578c9h3",
  },
  {
    id: "indochine-room",
    slug: "indochine-room",
    name: "Indochine 1",
    concept: "Indochine",
    size: 15,
    maxGuests: 2,
    pricePerNight: 520000,
    stayType: "SHORT_STAY",
    shortDescription: "Rattan, raw linen, and vintage colonial accents — a quiet ode to old Saigon.",
    shortDescriptionVi: "Mây tre, vải lanh thô và điểm nhấn thuộc địa vintage — ode nhẹ nhàng về Sài Gòn xưa.",
    gradient: "from-teal-800 via-emerald-700 to-amber-800",
    accentColor: "bg-teal-700",
    amenities: ["Smart TV", "AC", "WiFi", "Mini Fridge", "Rain Shower"],
    isAvailable: true,
    pmsRoomId: "cmmuucxts0002shoxwvoivyh7",
  },
  {
    id: "midcentury-room",
    slug: "midcentury-room",
    name: "Tropical Oasis Room",
    concept: "Mid-Century",
    size: 15,
    maxGuests: 2,
    pricePerNight: 520000,
    stayType: "SHORT_STAY",
    shortDescription: "Warm walnut tones, clean lines, and retro geometry — design-forward and cosy.",
    shortDescriptionVi: "Tông gỗ walnut ấm áp, đường nét sạch sẽ và hình học retro — tinh tế và ấm cúng.",
    gradient: "from-orange-700 via-amber-600 to-yellow-500",
    accentColor: "bg-orange-600",
    amenities: ["Smart TV", "AC", "WiFi", "Mini Fridge", "Hot Tub"],
    isAvailable: true,
    pmsRoomId: "cmmuucxuu0003shoxub87vpgi",
  },
  {
    id: "bw-room-small",
    slug: "bw-room-small",
    name: "Indochine 2",
    concept: "Monochrome",
    size: 15,
    maxGuests: 2,
    pricePerNight: 480000,
    stayType: "SHORT_STAY",
    shortDescription: "Minimal, quiet, and perfectly composed. Sometimes less is the most.",
    shortDescriptionVi: "Tối giản, yên tĩnh và hoàn hảo trong từng chi tiết. Đôi khi ít lại là nhiều nhất.",
    gradient: "from-slate-900 via-gray-800 to-zinc-700",
    accentColor: "bg-slate-700",
    amenities: ["Smart TV", "AC", "WiFi", "Mini Fridge", "Shower"],
    isAvailable: false,
    pmsRoomId: "cmmuucxvx0004shoxebjdm3y1",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Emma L.",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    text: "Hands down the most beautiful place I've stayed in Southeast Asia. The Pop Art Studio felt like living inside a gallery. Self check-in was seamless at midnight.",
    stayType: "3 nights · Pop Art Studio",
  },
  {
    id: 2,
    name: "Takeshi M.",
    country: "Japan",
    flag: "🇯🇵",
    rating: 5,
    text: "Perfectly located — Bui Vien is 5 minutes away but the alley is completely silent. The Indochine 1 is stunning. Will definitely return.",
    stayType: "5 nights · Indochine 1",
  },
  {
    id: 3,
    name: "Sophie R.",
    country: "France",
    flag: "🇫🇷",
    rating: 5,
    text: "Je suis restée un mois dans le B&W Studio. La cuisine équipée, la literie, tout était parfait. Le rapport qualité-prix est imbattable à Q1.",
    stayType: "1 month · B&W Studio Large",
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "top-cafes-near-joystay",
    title: "7 Quán Cà Phê Cực Chất Trong Vòng 10 Phút Từ Joystay",
    titleEn: "7 Amazing Cafés Within 10 Minutes of Joystay",
    excerpt: "Từ cà phê cổ điển kiểu Sài Gòn đến không gian specialty roastery hiện đại — bạn không cần đi xa.",
    excerptEn: "From classic Saigon-style coffee to modern specialty roasteries — you don't need to go far.",
    category: "Cẩm Nang Sài Gòn",
    categoryEn: "Saigon Guide",
    readTime: 5,
    publishedAt: "2026-03-10",
    gradient: "from-amber-700 to-orange-500",
  },
  {
    id: "2",
    slug: "self-checkin-guide",
    title: "Hướng Dẫn Tự Check-In 24/7 — Từng Bước Một",
    titleEn: "How Our 24/7 Self Check-In Works — Step by Step",
    excerpt: "Không chờ đợi, không lễ tân. Đến lúc 2 giờ sáng hay 2 giờ chiều — chìa khóa luôn sẵn sàng cho bạn.",
    excerptEn: "No waiting, no reception desk. Arrive at 2 AM or 2 PM — your key is always ready. Here's exactly how it works.",
    category: "Hướng Dẫn Khách",
    categoryEn: "Guest Guide",
    readTime: 3,
    publishedAt: "2026-03-05",
    gradient: "from-teal-700 to-emerald-500",
  },
  {
    id: "3",
    slug: "district-1-hidden-gems",
    title: "Bí Mật Quận 1 Mà Chỉ Người Địa Phương Mới Biết",
    titleEn: "District 1 Hidden Gems Only Locals Know About",
    excerpt: "Bỏ qua những điểm du lịch đông đúc. Đây là những khu chợ, nhà hàng và sân thượng mà người bản địa thực sự lui tới.",
    excerptEn: "Skip the tourist traps. Here are the markets, restaurants, and rooftops that locals actually visit.",
    category: "Cẩm Nang Sài Gòn",
    categoryEn: "Saigon Guide",
    readTime: 7,
    publishedAt: "2026-02-28",
    gradient: "from-rose-700 to-pink-500",
  },
];

// ─── USP Data ─────────────────────────────────────────────────────────────────
export const USPS = [
  {
    icon: "MapPin",
    title: "Prime District 3 Location",
    titleVi: "Trung Tâm Quận 3",
    description: "Wide, car-accessible laneway off Nguyễn Thị Minh Khai in District 3 — a short ride to Tao Đàn Park, Ben Thanh Market, and central Saigon.",
    descriptionVi: "Hẻm rộng rãi, xe hơi vào được trên đường Nguyễn Thị Minh Khai tại Quận 3 — chỉ một đoạn ngắn tới Công viên Tao Đàn, Chợ Bến Thành và trung tâm Sài Gòn.",
  },
  {
    icon: "KeyRound",
    title: "Self Check-In 24/7",
    titleVi: "Tự Check-In Mọi Lúc",
    description: "Smart lock system lets you arrive on your own schedule — no waiting, no front desk, total freedom.",
    descriptionVi: "Hệ thống khóa thông minh cho phép bạn đến bất cứ lúc nào — không chờ đợi, không lễ tân, hoàn toàn tự do.",
  },
  {
    icon: "Palette",
    title: "Curated Art Concepts",
    titleVi: "5 Concept Nghệ Thuật",
    description: "Every room is a distinct visual world — from Indochine colonial to Pop Art boldness. Stay differently each time.",
    descriptionVi: "Mỗi phòng là một thế giới hình ảnh độc đáo — từ phong cách Đông Dương đến Pop Art táo bạo. Mỗi lần nghỉ là một trải nghiệm khác.",
  },
];
