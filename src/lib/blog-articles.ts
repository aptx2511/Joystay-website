/** Bài blog viết sẵn trong code (song ngữ, chuẩn SEO) — bổ sung 11/2026.
 *  Hiển thị cùng với bài đăng từ Sanity; nếu trùng slug thì bài trong Sanity được ưu tiên.
 *  Thêm bài: thêm 1 phần tử vào ARTICLES. Chỉ viết những thông tin đã đúng với thực tế Joystay
 *  (đồng bộ với src/lib/guide-content.ts và src/lib/room-facts.ts). */

export type L = { en: string; vi: string };
export type Block =
  | { h: L }
  | { p: L }
  | { ul: L[] }
  | { link: { href: string; label: L } };

export interface Article {
  slug: string;
  title: L;
  excerpt: L;
  category: L;
  readTime: number;
  publishedAt: string;
  /** Ảnh bìa: lấy ảnh đại diện của phòng có số này (từ CMS) … */
  coverRoom?: string;
  /** … hoặc một ảnh trong /public */
  coverImage?: string;
  gradient: string;
  keywords: string[];
  body: Block[];
  faq?: { q: L; a: L }[];
}

export const ARTICLES: Article[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "self-check-in-joystay-district-3",
    title: {
      vi: "Hướng dẫn tự check-in tại Joystay Quận 3: 5 bước, không cần lễ tân",
      en: "Self Check-In at Joystay District 3: 5 Steps, No Reception Needed",
    },
    excerpt: {
      vi: "Đến lúc nào cũng được. Đây là toàn bộ đường đi nước bước từ lúc nhận mã cửa tới lúc mở cửa phòng, kèm chỗ gửi xe và gửi hành lý.",
      en: "Arrive whenever you like. Here is every step from getting your door codes to opening your room, plus where to park and store luggage.",
    },
    category: { vi: "Hướng Dẫn Khách", en: "Guest Guide" },
    readTime: 4,
    publishedAt: "2026-11-15",
    coverImage: "/guide/entrance-382-23.webp",
    gradient: "from-teal-700 to-emerald-500",
    keywords: ["self check-in homestay Saigon", "homestay tự check-in Quận 3", "Joystay check-in"],
    body: [
      { p: {
        vi: "Joystay là homestay tự check-in tại 382/23 Nguyễn Thị Minh Khai, Quận 3, TP.HCM. Không có lễ tân và không có nhân viên trực tại chỗ: bạn tự vào bằng mã khoá số, nên giờ đến hoàn toàn do bạn quyết định. Giờ nhận phòng từ 15:00, giờ trả phòng trước 12:00.",
        en: "Joystay is a self check-in homestay at 382/23 Nguyễn Thị Minh Khai, District 3, Ho Chi Minh City. There is no reception and no staff on site: you let yourself in with a keypad code, so your arrival time is entirely up to you. Check-in is from 15:00 and check-out is by 12:00.",
      } },
      { h: { vi: "Bước 1: Nhận mã cửa", en: "Step 1: Get your codes" } },
      { p: {
        vi: "Trước giờ nhận phòng, Joystay gửi cho bạn mã cổng, mã phòng và thông tin WiFi qua đúng kênh bạn đã đặt phòng. Hãy giữ sẵn tin nhắn này trên điện thoại.",
        en: "Before your arrival we send your gate code, room code and WiFi details through the same channel you booked with. Keep that message handy on your phone.",
      } },
      { h: { vi: "Bước 2: Gửi xe (nếu đi xe máy)", en: "Step 2: Park (if you ride a motorbike)" } },
      { p: {
        vi: "Joystay không có chỗ để xe trong nhà. Xe máy gửi tại bãi số 382/27 Nguyễn Thị Minh Khai, cách Joystay khoảng 1 phút đi bộ. Nếu đi taxi hoặc ô tô, hẻm xe hơi vào được nên bạn được đưa tới tận cửa.",
        en: "There is no indoor parking at Joystay. Motorbikes go to the parking lot at 382/27 Nguyễn Thị Minh Khai, about a one-minute walk away. If you come by taxi or car, the alley is car-accessible, so you can be dropped right at the door.",
      } },
      { h: { vi: "Bước 3: Tìm số nhà 382/23", en: "Step 3: Find number 382/23" } },
      { p: {
        vi: "Tầng trệt của số 382/23 là cửa hàng PORO Trading Card Game. Joystay dùng chung lối vào này, nên bạn cứ đi qua cửa hàng để tới cổng chính. Nhiều khách lần đầu hơi ngại vì thấy cửa hàng, nhưng đó đúng là lối vào.",
        en: "The ground floor of 382/23 is the PORO Trading Card Game shop. Joystay shares this entrance, so simply walk through the shop to reach the main gate. First-time guests sometimes hesitate when they see a shop, but that really is the way in.",
      } },
      { h: { vi: "Bước 4 và 5: Mở cổng, mở phòng", en: "Steps 4 and 5: Open the gate, then your room" } },
      { ul: [
        { vi: "Cổng chính: chạm vào màn hình khoá cho sáng lên, nhập mã cổng, nhấn #.", en: "Main gate: touch the keypad to wake it, enter the gate code, press #." },
        { vi: "Cửa phòng: chạm vào màn hình khoá, nhập mã phòng, nhấn #.", en: "Room door: touch the keypad, enter the room code, press #." },
        { vi: "Nếu chưa mở được, hãy nhập chậm lại và nhớ kết thúc bằng phím #.", en: "If it does not open, enter the code more slowly and remember to finish with #." },
      ] },
      { h: { vi: "Đến sớm hoặc về muộn", en: "Arriving early or leaving late" } },
      { p: {
        vi: "Joystay có tủ gửi hành lý, nên nếu đến trước 15:00 bạn có thể gửi đồ rồi đi dạo. Muốn nhận phòng sớm hoặc trả phòng muộn, hãy nhắn Joystay qua Zalo hoặc WhatsApp; chúng tôi sắp xếp khi lịch phòng cho phép.",
        en: "Joystay has luggage lockers, so if you arrive before 15:00 you can drop your bags and explore. For early check-in or late check-out, message us on Zalo or WhatsApp and we will arrange it when the room calendar allows.",
      } },
      { link: { href: "/guide", label: { vi: "Xem cẩm nang lưu trú có ảnh từng bước", en: "See the guest guide with photos of each step" } } },
    ],
    faq: [
      { q: { vi: "Tôi có thể check-in lúc nửa đêm không?", en: "Can I check in at midnight?" },
        a: { vi: "Được. Từ 15:00 trở đi bạn tự vào bằng mã cửa bất cứ lúc nào, kể cả nửa đêm.", en: "Yes. From 15:00 onwards you can let yourself in with your codes at any time, including midnight." } },
      { q: { vi: "Nhập mã không mở được cửa thì làm sao?", en: "What if the code does not open the door?" },
        a: { vi: "Chạm màn hình cho khoá sáng lên, nhập mã chậm rãi và kết thúc bằng phím #. Vẫn không được thì gọi hoặc nhắn hotline của Joystay.", en: "Wake the keypad, enter the code slowly and finish with #. If it still fails, call or message the Joystay hotline." } },
      { q: { vi: "Joystay có chỗ để xe không?", en: "Is there parking at Joystay?" },
        a: { vi: "Không có chỗ để xe trong nhà. Xe máy gửi tại bãi 382/27 Nguyễn Thị Minh Khai; ô tô vào được hẻm để đón trả khách.", en: "There is no indoor parking. Motorbikes park at the lot at 382/27 Nguyễn Thị Minh Khai; cars can enter the alley for drop-off and pick-up." } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "which-joystay-room-to-choose",
    title: {
      vi: "Chọn phòng nào ở Joystay? So sánh 6 phòng theo nhu cầu",
      en: "Which Joystay Room Should You Book? All 6 Rooms Compared",
    },
    excerpt: {
      vi: "Sáu phòng, sáu concept, ba cỡ diện tích. Bài này giúp bạn chọn nhanh theo số người, có cần bếp, cần cửa sổ hay cần ngủ thật tối.",
      en: "Six rooms, six concepts, three sizes. This guide helps you pick quickly by group size and whether you want a kitchen, a window or a truly dark room.",
    },
    category: { vi: "Hướng Dẫn Khách", en: "Guest Guide" },
    readTime: 5,
    publishedAt: "2026-11-14",
    coverRoom: "202",
    gradient: "from-orange-700 to-amber-500",
    keywords: ["homestay Quận 3", "boutique homestay District 3", "phòng có bếp Quận 3", "Joystay rooms"],
    body: [
      { p: {
        vi: "Joystay có 6 phòng trong cùng một căn nhà ở hẻm 382 Nguyễn Thị Minh Khai, Quận 3. Mỗi phòng một phong cách riêng, nhưng nếu nhìn theo công năng thì chỉ có ba nhóm: loft 50 m², studio 25 m² có bếp và phòng 15 m² gọn gàng.",
        en: "Joystay has 6 rooms in one house in alley 382 Nguyễn Thị Minh Khai, District 3. Each has its own style, but functionally they fall into three groups: a 50 m² loft, 25 m² studios with a kitchen, and compact 15 m² rooms.",
      } },
      { h: { vi: "Đi 3–4 người, hoặc muốn không gian rộng: phòng 401", en: "For 3–4 guests, or if you want space: room 401" } },
      { p: {
        vi: "Matcha Bath Loft rộng 50 m², có giường King và sofa giường, ở được tối đa 4 khách. Điểm riêng của phòng là bồn tắm trong nhà ốp gạch xanh matcha, kèm bếp và máy giặt. Đây là phòng duy nhất nhận hơn 2 khách.",
        en: "Matcha Bath Loft is 50 m² with a King bed and a sofa bed, sleeping up to 4 guests. Its signature is the indoor tub tiled in matcha green, plus a kitchen and washer. It is the only room that takes more than 2 guests.",
      } },
      { link: { href: "/rooms/matcha-bath-loft", label: { vi: "Xem Matcha Bath Loft", en: "See Matcha Bath Loft" } } },
      { h: { vi: "Cặp đôi ở vài ngày, muốn tự nấu: phòng 202 hoặc 302", en: "Couples staying a few days who want to cook: room 202 or 302" } },
      { ul: [
        { vi: "202 Pop Art Studio: 25 m², giường King và sofa, có bếp, tông cam rực với tranh pop art.", en: "202 Pop Art Studio: 25 m², King bed and couch, kitchen, bold orange tones with pop art prints." },
        { vi: "302 Parisian Chic Room: 25 m², giường King, có bếp, phào tường kiểu Pháp và sàn gạch đen trắng.", en: "302 Parisian Chic Room: 25 m², King bed, kitchen, French-style wall mouldings and black-and-white floor tiles." },
        { vi: "Cả hai đều có cửa sổ, bàn làm việc và máy giặt.", en: "Both have a window, a workspace and a washer." },
      ] },
      { h: { vi: "Đi một mình hoặc hai người, ưu tiên giá: phòng 15 m²", en: "Solo or two guests on a budget: the 15 m² rooms" } },
      { ul: [
        { vi: "301 The Tropical Oasis Room: có cửa sổ, đón nắng sáng, hợp người thích phòng sáng.", en: "301 The Tropical Oasis Room: has a window and morning light, good if you like a bright room." },
        { vi: "201 The Indochine Midnight Hideout: không có cửa sổ, tối hoàn toàn, phong cách Đông Dương trầm.", en: "201 The Indochine Midnight Hideout: no window, fully dark, moody Indochine style." },
        { vi: "101 Cozy Indochine Sleep Cave: không có cửa sổ, ở lầu thấp nhất nên ít phải leo cầu thang nhất.", en: "101 Cozy Indochine Sleep Cave: no window, on the lowest guest floor so it has the fewest stairs." },
      ] },
      { p: {
        vi: "Phòng 15 m² không có bếp nhưng có tủ lạnh và smart TV. Tất cả phòng đều dùng giường Queen và ở tối đa 2 khách.",
        en: "The 15 m² rooms have no kitchen but come with a fridge and smart TV. They all have a Queen bed and sleep up to 2 guests.",
      } },
      { h: { vi: "Vài điều nên biết trước khi đặt", en: "A few things to know before booking" } },
      { ul: [
        { vi: "Tầng trệt là cửa hàng, các phòng nằm ở các lầu phía trên; phòng số càng lớn thì ở lầu càng cao.", en: "The ground floor is a shop and the rooms are on the floors above; the higher the room number, the higher the floor." },
        { vi: "Joystay không cho thuê theo giờ.", en: "Joystay does not rent rooms by the hour." },
        { vi: "Nhận phòng từ 15:00, trả phòng trước 12:00, tự check-in bằng mã khoá.", en: "Check-in from 15:00, check-out by 12:00, self check-in by keypad code." },
      ] },
      { link: { href: "/availability", label: { vi: "Xem lịch trống và giá từng đêm của cả 6 phòng", en: "See availability and nightly prices for all 6 rooms" } } },
    ],
    faq: [
      { q: { vi: "Phòng nào ở Joystay có bếp?", en: "Which Joystay rooms have a kitchen?" },
        a: { vi: "Phòng 401, 202 và 302 có bếp. Ba phòng 15 m² (301, 201, 101) không có bếp nhưng có tủ lạnh.", en: "Rooms 401, 202 and 302 have a kitchen. The three 15 m² rooms (301, 201, 101) have no kitchen but do have a fridge." } },
      { q: { vi: "Phòng nào ở được 4 người?", en: "Which room sleeps 4 guests?" },
        a: { vi: "Chỉ phòng 401 Matcha Bath Loft ở được tối đa 4 khách. Các phòng còn lại tối đa 2 khách.", en: "Only room 401, Matcha Bath Loft, sleeps up to 4 guests. All other rooms sleep up to 2." } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "homestay-with-bathtub-district-3-saigon",
    title: {
      vi: "Homestay có bồn tắm ở Quận 3, Sài Gòn: bên trong Matcha Bath Loft",
      en: "A Homestay With a Bathtub in District 3, Saigon: Inside Matcha Bath Loft",
    },
    excerpt: {
      vi: "50 m², bồn tắm ốp gạch xanh matcha ngay trong phòng, ở được 4 người. Phòng lớn nhất của Joystay hợp với ai và cần lưu ý gì.",
      en: "50 m², a matcha-green tiled tub inside the room, space for 4 guests. Who Joystay's largest room suits, and what to know before you book.",
    },
    category: { vi: "Phòng Joystay", en: "Our Rooms" },
    readTime: 4,
    publishedAt: "2026-11-13",
    coverRoom: "401",
    gradient: "from-emerald-800 to-lime-600",
    keywords: ["homestay có bồn tắm Sài Gòn", "homestay with bathtub Ho Chi Minh City", "homestay Quận 3 cho nhóm 4 người"],
    body: [
      { p: {
        vi: "Phòng có bồn tắm ở trung tâm Sài Gòn thường nằm trong khách sạn. Matcha Bath Loft là lựa chọn kiểu homestay: một căn 50 m² ở Quận 3, tự check-in, có bếp, và bồn tắm đặt ngay trong không gian phòng.",
        en: "Rooms with a bathtub in central Saigon are usually found in hotels. Matcha Bath Loft is the homestay alternative: a 50 m² space in District 3 with self check-in, a kitchen, and a tub set right inside the room.",
      } },
      { h: { vi: "Phòng có gì", en: "What is in the room" } },
      { ul: [
        { vi: "Bồn tắm trong nhà ốp gạch xanh matcha.", en: "An indoor tub tiled in matcha green." },
        { vi: "Giường King và sofa giường, ở tối đa 4 khách.", en: "A King bed and a sofa bed, sleeping up to 4 guests." },
        { vi: "Bếp, máy giặt, bàn làm việc, điều hoà, WiFi và TV.", en: "Kitchen, washer, workspace, air conditioning, WiFi and TV." },
        { vi: "Trang trí theo tinh thần Bauhaus với cây xanh và nội thất gỗ.", en: "Bauhaus-inspired decor with plants and wooden furniture." },
      ] },
      { h: { vi: "Phòng hợp với ai", en: "Who it suits" } },
      { p: {
        vi: "Cặp đôi muốn một kỳ nghỉ ngắn trong thành phố, nhóm bạn 3–4 người, hoặc gia đình nhỏ cần bếp và máy giặt để ở vài ngày. Vì có bếp và bàn làm việc, phòng cũng tiện cho người ở dài ngày kết hợp làm việc.",
        en: "Couples after a short city break, groups of 3–4 friends, or a small family that needs a kitchen and washer for a few days. With a kitchen and a workspace, it also works for longer stays that mix in remote work.",
      } },
      { h: { vi: "Lưu ý trước khi đặt", en: "Before you book" } },
      { ul: [
        { vi: "Phòng nằm ở lầu trên cùng của nhà.", en: "The room is on the top floor of the house." },
        { vi: "Tự check-in bằng mã khoá, không có nhân viên trực tại chỗ.", en: "Check-in is by keypad code and there is no staff on site." },
        { vi: "Hẻm đối diện một trường học, buổi sáng ngày thường có thể hơi nhộn nhịp; buổi tối yên tĩnh.", en: "The alley faces a school, so weekday mornings can be lively; evenings are quiet." },
      ] },
      { link: { href: "/rooms/matcha-bath-loft", label: { vi: "Xem ảnh, giá và lịch trống của Matcha Bath Loft", en: "See photos, price and availability for Matcha Bath Loft" } } },
    ],
    faq: [
      { q: { vi: "Matcha Bath Loft ở được mấy người?", en: "How many guests does Matcha Bath Loft sleep?" },
        a: { vi: "Tối đa 4 khách, với một giường King và một sofa giường.", en: "Up to 4 guests, with one King bed and one sofa bed." } },
      { q: { vi: "Phòng có bếp và máy giặt không?", en: "Does the room have a kitchen and a washer?" },
        a: { vi: "Có cả bếp và máy giặt.", en: "Yes, it has both a kitchen and a washer." } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "windowless-room-for-deep-sleep",
    title: {
      vi: "Phòng không cửa sổ: lựa chọn cho người cần ngủ thật sâu",
      en: "Windowless Rooms: A Choice for People Who Need Deep Sleep",
    },
    excerpt: {
      vi: "Hai phòng Đông Dương của Joystay không có cửa sổ, và chúng tôi nói rõ điều đó. Đây là lý do nhiều khách lại chủ động chọn chúng.",
      en: "Joystay's two Indochine rooms have no window, and we say so upfront. Here is why many guests choose them on purpose.",
    },
    category: { vi: "Phòng Joystay", en: "Our Rooms" },
    readTime: 4,
    publishedAt: "2026-11-12",
    coverRoom: "201",
    gradient: "from-stone-800 to-amber-700",
    keywords: ["phòng không cửa sổ", "windowless room Saigon", "homestay ngủ ngon Quận 3", "jet lag Ho Chi Minh City"],
    body: [
      { p: {
        vi: "Khi đặt phòng, nhiều người mặc định phải có cửa sổ. Nhưng nếu việc quan trọng nhất của chuyến đi là ngủ cho đủ, một căn phòng tối hoàn toàn lại có lợi thế. Joystay có hai phòng như vậy: 201 The Indochine Midnight Hideout và 101 Cozy Indochine Sleep Cave.",
        en: "Most people assume a room must have a window. But if the most important thing on your trip is proper sleep, a fully dark room has real advantages. Joystay has two: 201 The Indochine Midnight Hideout and 101 Cozy Indochine Sleep Cave.",
      } },
      { h: { vi: "Vì sao phòng tối giúp ngủ ngon", en: "Why a dark room helps you sleep" } },
      { ul: [
        { vi: "Không có nắng sớm đánh thức, bạn ngủ tới giờ mình muốn.", en: "No early sun to wake you, so you sleep until you choose to get up." },
        { vi: "Thường ít tiếng ồn bên ngoài lọt vào hơn so với phòng có cửa sổ.", en: "Usually less outside noise gets in than in a room with a window." },
        { vi: "Dễ ngủ bù vào ban ngày, hợp với người lệch múi giờ, đi chuyến bay đêm hoặc làm ca.", en: "Daytime naps are easy, which suits jet-lagged travellers, red-eye arrivals and shift workers." },
      ] },
      { h: { vi: "Hai phòng khác nhau thế nào", en: "How the two rooms differ" } },
      { ul: [
        { vi: "201 Midnight Hideout: 15 m², giường Queen, ở lầu 2, tường tối và đèn vàng ấm.", en: "201 Midnight Hideout: 15 m², Queen bed, on floor 2, dark walls and warm lamps." },
        { vi: "101 Sleep Cave: 15 m², giường Queen, ở lầu 1, là lầu thấp nhất có phòng.", en: "101 Sleep Cave: 15 m², Queen bed, on floor 1, the lowest floor with guest rooms." },
      ] },
      { h: { vi: "Ai nên chọn phòng có cửa sổ", en: "Who should pick a room with a window instead" } },
      { p: {
        vi: "Nếu bạn làm việc trong phòng cả ngày, thích ánh sáng tự nhiên hoặc không thoải mái trong không gian kín, hãy chọn 301 The Tropical Oasis Room (15 m², có cửa sổ) hoặc các studio 25 m². Mọi phòng đều có điều hoà, đầu báo khói và đầu báo CO.",
        en: "If you work from the room all day, love natural light or feel uneasy in enclosed spaces, choose 301 The Tropical Oasis Room (15 m², with a window) or one of the 25 m² studios. Every room has air conditioning, a smoke detector and a CO detector.",
      } },
      { link: { href: "/rooms", label: { vi: "So sánh tất cả các phòng", en: "Compare all rooms" } } },
    ],
    faq: [
      { q: { vi: "Phòng không cửa sổ có bí không?", en: "Is a windowless room stuffy?" },
        a: { vi: "Phòng có điều hoà. Nếu bạn nhạy cảm với không gian kín, nên chọn phòng 301 hoặc các studio có cửa sổ.", en: "The rooms are air-conditioned. If you are sensitive to enclosed spaces, choose room 301 or one of the studios with a window." } },
      { q: { vi: "Phòng không cửa sổ có an toàn không?", en: "Are the windowless rooms safe?" },
        a: { vi: "Mọi phòng của Joystay đều có đầu báo khói và đầu báo CO.", en: "Every Joystay room has a smoke detector and a CO detector." } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "where-to-stay-district-3-saigon",
    title: {
      vi: "Ở Quận 3 có gì hay? Gợi ý quanh hẻm 382 Nguyễn Thị Minh Khai",
      en: "Staying in District 3, Saigon: What Is Around Alley 382 Nguyễn Thị Minh Khai",
    },
    excerpt: {
      vi: "Quận 3 sát trung tâm nhưng nhịp sống chậm hơn Quận 1. Đây là những chỗ ăn uống ngay trong hẻm và các điểm tham quan gần Joystay.",
      en: "District 3 sits next to the centre but moves at a calmer pace than District 1. Here are the places to eat in our alley and the sights near Joystay.",
    },
    category: { vi: "Cẩm Nang Sài Gòn", en: "Saigon Guide" },
    readTime: 5,
    publishedAt: "2026-11-11",
    coverRoom: "301",
    gradient: "from-green-800 to-teal-600",
    keywords: ["ở đâu Quận 3", "where to stay in Saigon District 3", "Nguyễn Thị Minh Khai homestay", "things to do District 3"],
    body: [
      { p: {
        vi: "Du khách tới TP.HCM thường phân vân giữa Quận 1 và Quận 3. Quận 1 là nơi tập trung điểm tham quan, còn Quận 3 nằm ngay cạnh, nhiều cây xanh và quán xá của người địa phương hơn. Joystay nằm trong một con hẻm rộng, xe hơi vào được, tại 382/23 Nguyễn Thị Minh Khai.",
        en: "Visitors to Ho Chi Minh City often weigh District 1 against District 3. District 1 holds most of the sights, while District 3 sits right beside it with more trees and more local cafés and eateries. Joystay is in a wide, car-accessible alley at 382/23 Nguyễn Thị Minh Khai.",
      } },
      { h: { vi: "Ăn uống ngay trong hẻm 382", en: "Eating and drinking in alley 382" } },
      { ul: [
        { vi: "Dulce de Saigon: tiệm bánh và cà phê, có cookie và bánh kiểu Âu.", en: "Dulce de Saigon: bakery and café with cookies and European-style cakes." },
        { vi: "Sandwich by Dulce: sandwich kiểu phương Tây cho bữa trưa nhanh.", en: "Sandwich by Dulce: Western-style sandwiches for a quick lunch." },
        { vi: "Cozy by Xeooo: pizza và đồ uống, hợp buổi tối.", en: "Cozy by Xeooo: pizza and drinks, good for evenings." },
        { vi: "Darkside Coffee: cà phê, cocktail và shisha đến khuya.", en: "Darkside Coffee: coffee, cocktails and shisha until late." },
      ] },
      { h: { vi: "Điểm tham quan gần đây", en: "Sights nearby" } },
      { ul: [
        { vi: "Công viên Tao Đàn: công viên rợp bóng cây, hợp đi bộ buổi sáng.", en: "Tao Đàn Park: a shady park for a morning walk." },
        { vi: "Dinh Độc Lập: di tích lịch sử biểu tượng của Sài Gòn.", en: "Independence Palace: Saigon's landmark historic site." },
        { vi: "Chợ Bến Thành: khu chợ nổi tiếng nhất thành phố.", en: "Bến Thành Market: the city's best-known market." },
        { vi: "Bảo tàng Chứng tích Chiến tranh: bảo tàng về lịch sử chiến tranh Việt Nam.", en: "War Remnants Museum: a museum on the history of the Vietnam War." },
        { vi: "Nhà thờ Tân Định: nhà thờ màu hồng nổi tiếng.", en: "Tân Định Church: the famous pink church." },
      ] },
      { p: {
        vi: "Giờ mở cửa của các điểm trên có thể thay đổi, bạn nên xem Google Maps trước khi đi. Trang cẩm nang của Joystay có sẵn bản đồ và nút chỉ đường tới từng nơi.",
        en: "Opening hours change, so check Google Maps before you go. The Joystay guest guide has a map and a directions button for each place.",
      } },
      { h: { vi: "Tiện ích hằng ngày", en: "Everyday essentials" } },
      { p: {
        vi: "Quanh khu vực có cửa hàng tiện lợi mở 24/7, nhà thuốc, ATM và dịch vụ giặt ủi. Một số phòng của Joystay cũng có sẵn máy giặt.",
        en: "The area has 24/7 convenience stores, pharmacies, ATMs and laundry services. Some Joystay rooms also have their own washer.",
      } },
      { link: { href: "/guide#around", label: { vi: "Mở bản đồ quanh Joystay trong cẩm nang", en: "Open the map around Joystay in the guide" } } },
    ],
    faq: [
      { q: { vi: "Joystay ở địa chỉ nào?", en: "Where is Joystay?" },
        a: { vi: "382/23 Nguyễn Thị Minh Khai, Phường Bàn Cờ, Quận 3, TP.HCM.", en: "382/23 Nguyễn Thị Minh Khai, Bàn Cờ Ward, District 3, Ho Chi Minh City." } },
      { q: { vi: "Khu vực quanh Joystay có yên tĩnh không?", en: "Is the area around Joystay quiet?" },
        a: { vi: "Hẻm đối diện một trường học nên buổi sáng ngày thường có thể hơi nhộn nhịp. Buổi tối yên tĩnh.", en: "The alley faces a school, so weekday mornings can be lively. Evenings are quiet." } },
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug) ?? null;
