export type Room = {
  id: string;
  slug: string;
  name: string;
  concept: string;
  size: number;
  maxGuests: number;
  pricePerNight: number;
  pricePerMonth?: number;
  securityDeposit?: number;
  stayType: "SHORT_STAY" | "LONG_STAY" | "BOTH";
  shortDescription: string;
  gradient: string;
  accentColor: string;
  amenities: string[];
  isAvailable: boolean;
  pmsRoomId: string;        // ID trong joystay-pms database
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
  excerpt: string;
  category: string;
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
    shortDescription:
      "Bold colours, iconic prints, and a fully-equipped kitchen — creativity lives here.",
    gradient: "from-rose-400 via-pink-400 to-yellow-300",
    accentColor: "bg-rose-500",
    amenities: ["Full Kitchen", "Smart TV", "AC", "WiFi", "Washer", "Bathtub"],
    isAvailable: true,
    pmsRoomId: "cmmuucxqc0000shoxx69vkmqg",
  },
  {
    id: "bw-studio-large",
    slug: "bw-studio-large",
    name: "B&W Studio Large",
    concept: "Monochrome",
    size: 25,
    maxGuests: 2,
    pricePerNight: 650000,
    pricePerMonth: 9000000,
    securityDeposit: 2000000,
    stayType: "BOTH",
    shortDescription:
      "Timeless black-and-white aesthetic with a spacious kitchen for long-stay comfort.",
    gradient: "from-zinc-900 via-zinc-700 to-slate-600",
    accentColor: "bg-zinc-800",
    amenities: ["Full Kitchen", "Smart TV", "AC", "WiFi", "Washer", "Rain Shower"],
    isAvailable: true,
    pmsRoomId: "cmmuucxsp0001shoxo578c9h3",
  },
  {
    id: "indochine-room",
    slug: "indochine-room",
    name: "Indochine Room",
    concept: "Indochine",
    size: 15,
    maxGuests: 2,
    pricePerNight: 520000,
    stayType: "SHORT_STAY",
    shortDescription:
      "Rattan, raw linen, and vintage colonial accents — a quiet ode to old Saigon.",
    gradient: "from-teal-800 via-emerald-700 to-amber-800",
    accentColor: "bg-teal-700",
    amenities: ["Smart TV", "AC", "WiFi", "Mini Fridge", "Rain Shower"],
    isAvailable: true,
    pmsRoomId: "cmmuucxts0002shoxwvoivyh7",
  },
  {
    id: "midcentury-room",
    slug: "midcentury-room",
    name: "Midcentury Room",
    concept: "Mid-Century",
    size: 15,
    maxGuests: 2,
    pricePerNight: 520000,
    stayType: "SHORT_STAY",
    shortDescription:
      "Warm walnut tones, clean lines, and retro geometry — design-forward and cosy.",
    gradient: "from-orange-700 via-amber-600 to-yellow-500",
    accentColor: "bg-orange-600",
    amenities: ["Smart TV", "AC", "WiFi", "Mini Fridge", "Hot Tub"],
    isAvailable: true,
    pmsRoomId: "cmmuucxuu0003shoxub87vpgi",
  },
  {
    id: "bw-room-small",
    slug: "bw-room-small",
    name: "B&W Room Small",
    concept: "Monochrome",
    size: 15,
    maxGuests: 2,
    pricePerNight: 480000,
    stayType: "SHORT_STAY",
    shortDescription:
      "Minimal, quiet, and perfectly composed. Sometimes less is the most.",
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
    text: "Perfectly located — Bui Vien is 5 minutes away but the alley is completely silent. The Indochine Room is stunning. Will definitely return.",
    stayType: "5 nights · Indochine Room",
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
    excerpt:
      "Từ cà phê cổ điển kiểu Sài Gòn đến không gian specialty roastery hiện đại — bạn không cần đi xa.",
    category: "Saigon Guide",
    readTime: 5,
    publishedAt: "2026-03-10",
    gradient: "from-amber-700 to-orange-500",
  },
  {
    id: "2",
    slug: "self-checkin-guide",
    title: "How Our 24/7 Self Check-In Works — Step by Step",
    excerpt:
      "No waiting, no reception desk. Arrive at 2 AM or 2 PM — your key is always ready. Here's exactly how it works.",
    category: "Guest Guide",
    readTime: 3,
    publishedAt: "2026-03-05",
    gradient: "from-teal-700 to-emerald-500",
  },
  {
    id: "3",
    slug: "district-1-hidden-gems",
    title: "District 1 Hidden Gems Only Locals Know About",
    excerpt:
      "Skip the tourist traps. Here are the markets, restaurants, and rooftops that locals actually visit.",
    category: "Saigon Guide",
    readTime: 7,
    publishedAt: "2026-02-28",
    gradient: "from-rose-700 to-pink-500",
  },
];

// ─── USP Data ─────────────────────────────────────────────────────────────────
export const USPS = [
  {
    icon: "MapPin",
    title: "Prime District 1 Location",
    titleVi: "Trung Tâm Quận 1",
    description:
      "Nestled in a quiet alley, yet 5 minutes walk to Bui Vien, Ben Thanh Market, and Nguyen Hue Boulevard.",
  },
  {
    icon: "KeyRound",
    title: "Self Check-In 24/7",
    titleVi: "Tự Check-In Mọi Lúc",
    description:
      "Smart lock system lets you arrive on your own schedule — no waiting, no front desk, total freedom.",
  },
  {
    icon: "Palette",
    title: "Curated Art Concepts",
    titleVi: "5 Concept Nghệ Thuật",
    description:
      "Every room is a distinct visual world — from Indochine colonial to Pop Art boldness. Stay differently each time.",
  },
];
