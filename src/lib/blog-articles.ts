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
    slug: "homestay-near-notre-dame-cathedral-saigon",
    title: {
      vi: "Ở đâu gần Nhà thờ Đức Bà? Gợi ý homestay Quận 3 cách trung tâm vài phút xe",
      en: "Where to Stay Near Notre-Dame Cathedral Saigon: A District 3 Homestay Minutes Away",
    },
    excerpt: {
      vi: "Muốn ở gần Nhà thờ Đức Bà, Bưu điện Thành phố và Dinh Độc Lập mà không phải trả giá khách sạn Quận 1? Quận 3 là lựa chọn nằm ngay sát bên.",
      en: "Want to be close to Notre-Dame Cathedral, the Central Post Office and Independence Palace without District 1 hotel prices? District 3 is right next door.",
    },
    category: { vi: "Cẩm Nang Sài Gòn", en: "Saigon Guide" },
    readTime: 4,
    publishedAt: "2026-11-15",
    coverRoom: "302",
    gradient: "from-emerald-800 to-green-600",
    keywords: ["ở đâu gần Nhà thờ Đức Bà", "homestay gần Nhà thờ Đức Bà", "where to stay near Notre Dame Cathedral Saigon", "homestay near Independence Palace"],
    body: [
      { p: {
        vi: "Nhà thờ Đức Bà, Bưu điện Thành phố, Dinh Độc Lập và Đường sách Nguyễn Văn Bình nằm thành một cụm ở Quận 1, đi bộ qua lại được. Ở ngay cụm này thì tiện, nhưng giá phòng cao. Cách thực tế hơn là ở Quận 3, quận giáp ranh, rồi đi một cuốc xe ngắn.",
        en: "Notre-Dame Cathedral, the Central Post Office, Independence Palace and Nguyễn Văn Bình Book Street sit in one walkable cluster in District 1. Staying right there is convenient but pricey. A more practical option is District 3, the neighbouring district, a short ride away.",
      } },
      { h: { vi: "Từ Joystay tới Nhà thờ Đức Bà mất bao lâu?", en: "How far is Joystay from Notre-Dame Cathedral?" } },
      { p: {
        vi: "Joystay ở 382/23 Nguyễn Thị Minh Khai, Quận 3. Đường Nguyễn Thị Minh Khai chạy thẳng về phía trung tâm, nên tới khu Nhà thờ Đức Bà chỉ khoảng 2,5 km, thường mất 10 đến 15 phút đi xe công nghệ tuỳ giờ. Dinh Độc Lập và Bảo tàng Chứng tích Chiến tranh còn gần hơn, nằm ngay trên đường đi.",
        en: "Joystay is at 382/23 Nguyễn Thị Minh Khai, District 3. Nguyễn Thị Minh Khai street runs straight toward the centre, so the cathedral area is only about 2.5 km away, usually 10 to 15 minutes by ride-hailing car or bike depending on traffic. Independence Palace and the War Remnants Museum are closer still, right along the way.",
      } },
      { h: { vi: "Gợi ý một buổi sáng quanh Nhà thờ Đức Bà", en: "A morning around the cathedral" } },
      { ul: [
        { vi: "Nhà thờ Đức Bà: công trình gạch đỏ từ cuối thế kỷ 19. Nhà thờ đang được trùng tu dài hạn nên có thể có giàn giáo, bạn vẫn ngắm và chụp ảnh từ bên ngoài được.", en: "Notre-Dame Cathedral: a red-brick landmark from the late 19th century. It is under long-term restoration, so expect scaffolding, but you can still see and photograph it from outside." },
        { vi: "Bưu điện Thành phố: ngay bên cạnh nhà thờ, vào cửa tự do.", en: "Central Post Office: right beside the cathedral, free to enter." },
        { vi: "Đường sách Nguyễn Văn Bình: con phố đi bộ nhỏ với các quầy sách và quán cà phê.", en: "Nguyễn Văn Bình Book Street: a small pedestrian lane of bookstalls and cafés." },
        { vi: "Dinh Độc Lập: cách nhà thờ vài phút đi bộ qua công viên 30/4.", en: "Independence Palace: a few minutes' walk from the cathedral through 30/4 Park." },
      ] },
      { p: {
        vi: "Giờ mở cửa và giá vé thay đổi theo thời điểm, bạn nên xem Google Maps trước khi đi.",
        en: "Opening hours and ticket prices change, so check Google Maps before you go.",
      } },
      { h: { vi: "Vì sao ở Quận 3 thay vì Quận 1?", en: "Why District 3 instead of District 1?" } },
      { ul: [
        { vi: "Gần: chỉ một cuốc xe ngắn là tới các điểm tham quan chính.", en: "Close: the main sights are one short ride away." },
        { vi: "Yên hơn: Joystay nằm trong hẻm, buổi tối yên tĩnh.", en: "Calmer: Joystay is in an alley and evenings are quiet." },
        { vi: "Nhiều quán của người địa phương: trong hẻm 382 có tiệm bánh, sandwich, pizza và cà phê.", en: "More local spots: alley 382 has a bakery, sandwiches, pizza and coffee." },
        { vi: "Tự do giờ giấc: tự check-in bằng mã khoá, về muộn sau bữa tối ở trung tâm cũng không phiền ai.", en: "Your own schedule: self check-in by keypad code, so a late return after dinner downtown bothers no one." },
      ] },
      { link: { href: "/rooms", label: { vi: "Xem 6 phòng của Joystay", en: "See Joystay's 6 rooms" } } },
      { link: { href: "/blog/where-to-stay-district-3-saigon", label: { vi: "Đọc thêm: quanh hẻm 382 có gì", en: "Read more: what is around alley 382" } } },
    ],
    faq: [
      { q: { vi: "Joystay cách Nhà thờ Đức Bà bao xa?", en: "How far is Joystay from Notre-Dame Cathedral?" },
        a: { vi: "Khoảng 2,5 km, thường mất 10 đến 15 phút đi xe tuỳ giờ.", en: "About 2.5 km, usually 10 to 15 minutes by car or bike depending on traffic." } },
      { q: { vi: "Có đi bộ từ Joystay tới Nhà thờ Đức Bà được không?", en: "Can I walk from Joystay to Notre-Dame Cathedral?" },
        a: { vi: "Được, nhưng mất khoảng nửa tiếng dưới nắng Sài Gòn. Đa số khách gọi xe công nghệ.", en: "You can, but it takes roughly half an hour in the Saigon heat. Most guests take a ride-hailing car or bike." } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "homestay-near-tan-son-nhat-airport-layover",
    title: {
      vi: "Homestay gần sân bay Tân Sơn Nhất cho khách quá cảnh và bay đêm",
      en: "A Homestay Near Tân Sơn Nhất Airport for Layovers and Late Flights",
    },
    excerpt: {
      vi: "Hạ cánh nửa đêm hay quá cảnh một đêm ở Sài Gòn? Homestay tự check-in ở Quận 3 cho bạn nhận phòng bất kể giờ nào mà vẫn ở gần trung tâm.",
      en: "Landing at midnight or spending one night in Saigon between flights? A self check-in homestay in District 3 lets you arrive at any hour and still be near the centre.",
    },
    category: { vi: "Cẩm Nang Sài Gòn", en: "Saigon Guide" },
    readTime: 4,
    publishedAt: "2026-11-15",
    coverRoom: "101",
    gradient: "from-teal-800 to-emerald-600",
    keywords: ["homestay gần sân bay Tân Sơn Nhất", "chỗ ở quá cảnh Sài Gòn", "hotel near Tan Son Nhat airport late check-in", "Saigon layover where to stay"],
    body: [
      { p: {
        vi: "Sân bay Tân Sơn Nhất nằm trong thành phố, nên bạn không bắt buộc phải ở sát sân bay. Quận 3 nằm giữa sân bay và Quận 1: từ Joystay ra sân bay khoảng 7 km, thường mất 20 đến 30 phút đi xe, giờ cao điểm có thể lâu hơn.",
        en: "Tân Sơn Nhất Airport is inside the city, so you do not have to stay right beside it. District 3 sits between the airport and District 1: Joystay is about 7 km from the airport, usually 20 to 30 minutes by car and longer at rush hour.",
      } },
      { h: { vi: "Bay đêm: nhận phòng lúc nào cũng được", en: "Late flights: check in at any hour" } },
      { p: {
        vi: "Điều khó chịu nhất khi hạ cánh khuya là lo lễ tân đã nghỉ. Joystay không có lễ tân: trước giờ nhận phòng bạn nhận mã cổng và mã phòng, tới nơi tự bấm mã là vào. Hạ cánh 1 giờ sáng cũng không cần hẹn trước với ai.",
        en: "The worst part of a late landing is wondering whether reception has closed. Joystay has no reception: you receive your gate and room codes before check-in time and let yourself in on arrival. Landing at 1 am needs no arrangement with anyone.",
      } },
      { link: { href: "/blog/self-check-in-joystay-district-3", label: { vi: "Xem 5 bước tự check-in", en: "See the 5 self check-in steps" } } },
      { h: { vi: "Bay sớm hoặc tới sớm: gửi hành lý", en: "Early arrival or late departure: store your bags" } },
      { p: {
        vi: "Giờ nhận phòng từ 15:00 và trả phòng trước 12:00. Nếu chuyến bay của bạn tới sớm, Joystay có tủ gửi hành lý để bạn cất đồ rồi đi ăn sáng, dạo trung tâm trong lúc chờ. Cần nhận phòng sớm hoặc trả muộn, bạn nhắn Joystay qua Zalo hoặc WhatsApp để được sắp xếp khi lịch phòng cho phép.",
        en: "Check-in is from 15:00 and check-out by 12:00. If your flight lands early, Joystay has luggage lockers so you can drop your bags and go for breakfast or a walk downtown while you wait. For an early check-in or late check-out, message us on Zalo or WhatsApp and we will arrange it when the room schedule allows.",
      } },
      { h: { vi: "Đi từ sân bay về Joystay", en: "Getting from the airport to Joystay" } },
      { ul: [
        { vi: "Xe công nghệ hoặc taxi là cách đơn giản nhất. Nhập điểm đến \"382/23 Nguyễn Thị Minh Khai, Quận 3\".", en: "Ride-hailing or a taxi is the simplest way. Enter \"382/23 Nguyễn Thị Minh Khai, District 3\" as your destination." },
        { vi: "Hẻm 382 xe hơi vào được, nên xe đưa bạn tới tận cửa kể cả khi có vali lớn.", en: "Alley 382 is car-accessible, so you are dropped at the door even with large suitcases." },
        { vi: "Tìm số nhà 382/23: tầng trệt là cửa hàng PORO Trading Card Game, đó chính là lối vào.", en: "Look for number 382/23: the ground floor is the PORO Trading Card Game shop, and that is the entrance." },
      ] },
      { h: { vi: "Chọn phòng nào cho một đêm quá cảnh?", en: "Which room for a one-night layover?" } },
      { p: {
        vi: "Nếu mục tiêu là ngủ bù, hai phòng không cửa sổ 101 và 201 tối hoàn toàn, ngủ ban ngày cũng dễ. Phòng 101 ở lầu thấp nhất nên ít phải xách vali lên cầu thang nhất. Đi nhóm 3 đến 4 người thì chọn phòng 401.",
        en: "If the goal is catching up on sleep, the two windowless rooms, 101 and 201, are fully dark and easy to sleep in even by day. Room 101 is on the lowest guest floor, so it means the fewest stairs with a suitcase. Groups of 3 to 4 should pick room 401.",
      } },
      { link: { href: "/blog/windowless-room-for-deep-sleep", label: { vi: "Vì sao phòng không cửa sổ ngủ ngon hơn", en: "Why a windowless room helps you sleep" } } },
      { link: { href: "/availability", label: { vi: "Xem phòng trống đêm bạn tới", en: "Check which rooms are free on your night" } } },
    ],
    faq: [
      { q: { vi: "Joystay cách sân bay Tân Sơn Nhất bao xa?", en: "How far is Joystay from Tân Sơn Nhất Airport?" },
        a: { vi: "Khoảng 7 km, thường mất 20 đến 30 phút đi xe, giờ cao điểm lâu hơn.", en: "About 7 km, usually 20 to 30 minutes by car and longer at rush hour." } },
      { q: { vi: "Tôi hạ cánh sau nửa đêm, có nhận phòng được không?", en: "I land after midnight. Can I still check in?" },
        a: { vi: "Được. Joystay tự check-in bằng mã khoá 24/7, không cần lễ tân.", en: "Yes. Joystay is self check-in by keypad code, 24/7, with no reception needed." } },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "book-direct-joystay",
    title: {
      vi: "Đặt phòng trực tiếp trên joystay.vn: 4 bước, thanh toán bằng mã QR",
      en: "Booking Direct on joystay.vn: 4 Steps, Pay by QR Code",
    },
    excerpt: {
      vi: "Đặt thẳng với Joystay không qua nền tảng trung gian: chọn phòng, quét QR chuyển khoản, hệ thống tự xác nhận trong khoảng một phút.",
      en: "Book straight with Joystay, no middleman platform: pick a room, scan a QR code to pay by bank transfer, and get automatic confirmation in about a minute.",
    },
    category: { vi: "Hướng Dẫn Khách", en: "Guest Guide" },
    readTime: 3,
    publishedAt: "2026-11-15",
    coverRoom: "401",
    gradient: "from-green-800 to-emerald-500",
    keywords: ["đặt phòng trực tiếp Joystay", "đặt homestay Quận 3 không cần thẻ", "book direct Joystay", "Saigon homestay no credit card"],
    body: [
      { p: {
        vi: "Bạn có thể đặt phòng Joystay ngay trên joystay.vn. Đặt trực tiếp nghĩa là không có phí dịch vụ của nền tảng trung gian, và bạn trao đổi thẳng với Joystay khi cần hỗ trợ.",
        en: "You can book a Joystay room right on joystay.vn. Booking direct means no middleman platform service fee, and you deal with Joystay directly whenever you need help.",
      } },
      { h: { vi: "Bốn bước đặt phòng", en: "Four steps to book" } },
      { ul: [
        { vi: "Bước 1: Chọn ngày nhận, ngày trả và số khách ở trang chủ hoặc trang lịch trống.", en: "Step 1: Choose your check-in date, check-out date and number of guests on the home page or the availability page." },
        { vi: "Bước 2: Chọn phòng còn trống. Giá hiển thị theo từng đêm, đêm thứ Sáu và thứ Bảy có thể có giá cuối tuần.", en: "Step 2: Pick an available room. Prices are shown per night; Friday and Saturday nights may carry a weekend rate." },
        { vi: "Bước 3: Điền tên và số điện thoại. Nếu có mã giảm giá, nhập ở bước này.", en: "Step 3: Enter your name and phone number. If you have a promo code, enter it here." },
        { vi: "Bước 4: Quét mã QR bằng ứng dụng ngân hàng để chuyển khoản. Mã QR đã điền sẵn số tiền và nội dung chuyển khoản của riêng đơn bạn.", en: "Step 4: Scan the QR code with your banking app to pay by transfer. The code is pre-filled with the amount and the payment reference for your booking." },
      ] },
      { h: { vi: "Sau khi chuyển khoản", en: "After you pay" } },
      { p: {
        vi: "Phòng được giữ cho bạn 60 phút kể từ lúc tạo đơn. Khi bạn chuyển đúng số tiền và nội dung, hệ thống tự xác nhận trong khoảng một phút, không cần gửi ảnh chụp màn hình. Trước giờ nhận phòng, Joystay gửi mã cổng, mã phòng và WiFi cho bạn.",
        en: "Your room is held for 60 minutes from the moment the booking is created. Once you transfer the exact amount with the right reference, the booking is confirmed automatically in about a minute, no screenshot needed. Before check-in, Joystay sends your gate code, room code and WiFi details.",
      } },
      { h: { vi: "Ba điều Joystay cam kết", en: "Three things we promise" } },
      { ul: [
        { vi: "Huỷ miễn phí trước 48 giờ so với giờ nhận phòng.", en: "Free cancellation up to 48 hours before check-in." },
        { vi: "Không cần thẻ tín dụng.", en: "No credit card required." },
        { vi: "Xác nhận ngay sau khi thanh toán.", en: "Confirmation as soon as you pay." },
      ] },
      { link: { href: "/availability", label: { vi: "Xem lịch trống và đặt phòng", en: "See availability and book" } } },
      { link: { href: "/blog/which-joystay-room-to-choose", label: { vi: "Chưa biết chọn phòng nào? So sánh 6 phòng", en: "Not sure which room? Compare all 6" } } },
    ],
    faq: [
      { q: { vi: "Đặt phòng Joystay có cần thẻ tín dụng không?", en: "Do I need a credit card to book Joystay?" },
        a: { vi: "Không. Bạn thanh toán bằng chuyển khoản ngân hàng qua mã QR.", en: "No. You pay by bank transfer using a QR code." } },
      { q: { vi: "Tôi có huỷ phòng được không?", en: "Can I cancel my booking?" },
        a: { vi: "Được, huỷ miễn phí trước 48 giờ so với giờ nhận phòng.", en: "Yes, cancellation is free up to 48 hours before check-in." } },
      { q: { vi: "Bao lâu thì đơn được xác nhận?", en: "How long does confirmation take?" },
        a: { vi: "Khoảng một phút sau khi bạn chuyển khoản đúng số tiền và nội dung.", en: "About a minute after you transfer the exact amount with the right reference." } },
    ],
  },

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
