/**
 * Nội dung trang /guide — Cẩm nang lưu trú.
 * ⚠️ Chỉ ghi điều ĐÚNG với cơ sở 382/23 Nguyễn Thị Minh Khai.
 * Giờ nhận/trả phòng: điền vào GUIDE_CONFIG (để null = không hiển thị).
 */
type L = { en: string; vi: string };

export const GUIDE_CONFIG = {
  checkInTime: "15:00" as string | null,
  checkOutTime: "12:00" as string | null,
  whatsapp: "https://wa.me/84854777730", // hotline/WhatsApp 0854 777 730 (chủ xác nhận 02/11/2026)
  // Toạ độ gốc để vẽ chỉ đường (Joystay)
  origin: "382/23 Nguyễn Thị Minh Khai, Bàn Cờ, Hồ Chí Minh",
};

export const G = {
  meta: {
    title: "Guest Guide — Check-in, FAQ & Neighbourhood",
    description:
      "How to self check-in and check-out at Joystay, District 3: step-by-step guide, FAQs, places to eat and explore nearby, and guest reviews.",
  },
  hero: {
    tag: { en: "Guest Guide", vi: "Cẩm Nang Lưu Trú" } as L,
    title: { en: "Everything you need,", vi: "Mọi thứ bạn cần," } as L,
    italic: { en: "in one page.", vi: "trong một trang." } as L,
    subtitle: {
      en: "Self check-in in minutes, answers to common questions, and the best of the alley right outside your door.",
      vi: "Tự check-in trong vài phút, giải đáp thắc mắc thường gặp và những điểm hay ngay trước cửa.",
    } as L,
  },
  nav: {
    checkin: { en: "Check-in", vi: "Nhận phòng" } as L,
    checkout: { en: "Check-out", vi: "Trả phòng" } as L,
    faq: { en: "FAQ", vi: "Hỏi đáp" } as L,
    around: { en: "Around Joystay", vi: "Xung quanh" } as L,
    reviews: { en: "Reviews", vi: "Đánh giá" } as L,
  },
  checkin: {
    tag: { en: "Self check-in · 24/7", vi: "Tự check-in · 24/7" } as L,
    title: { en: "Arrive any time.", vi: "Đến bất cứ lúc nào." } as L,
    italic: { en: "No reception needed.", vi: "Không cần lễ tân." } as L,
    from: { en: "Check-in from", vi: "Nhận phòng từ" } as L,
    steps: [
      {
        icon: "MessageSquare",
        title: { en: "Get your codes", vi: "Nhận mã cửa" },
        body: {
          en: "Before your arrival we send your gate code, room code and WiFi details through the channel you booked with. Keep the message handy.",
          vi: "Trước giờ nhận phòng, Joystay gửi mã cổng, mã phòng và thông tin WiFi qua kênh bạn đã đặt phòng. Hãy giữ sẵn tin nhắn này.",
        },
      },
      {
        icon: "Bike",
        title: { en: "Coming by motorbike? Park at 382/27", vi: "Đi xe máy? Gửi xe tại 382/27" },
        body: {
          en: "Park at the parking lot at 382/27 Nguyễn Thị Minh Khai, Bàn Cờ Ward, District 3 — there is no indoor parking at Joystay. Arriving by car or taxi? The alley is car-accessible, so you can be dropped right at the door.",
          vi: "Gửi xe tại bãi số 382/27 Nguyễn Thị Minh Khai, Phường Bàn Cờ, Quận 3 — Joystay không có chỗ để xe trong nhà. Đi taxi hoặc ô tô? Hẻm xe hơi vào được, bạn được đưa tới tận cửa.",
        },
        image: "/guide/parking-382-27.webp",
        imageAlt: { en: "Motorbike parking at 382/27 Nguyễn Thị Minh Khai", vi: "Bãi gửi xe máy 382/27 Nguyễn Thị Minh Khai" },
      },
      {
        icon: "MapPin",
        title: { en: "Walk 1 minute to 382/23", vi: "Đi bộ 1 phút tới 382/23" },
        body: {
          en: "Walk to Joystay at 382/23 Nguyễn Thị Minh Khai. Look for the house number 382/23 — the ground floor is the PORO Trading Card Game shop. Joystay shares this entrance, so just walk in through the shop to the main gate.",
          vi: "Đi bộ tới Joystay tại số 382/23 Nguyễn Thị Minh Khai. Tìm biển số nhà 382/23 — tầng trệt là cửa hàng PORO Trading Card Game. Joystay dùng chung lối vào này, bạn cứ đi qua cửa hàng để tới cổng chính.",
        },
        image: "/guide/entrance-382-23.webp",
        imageAlt: { en: "Joystay entrance at 382/23 Nguyễn Thị Minh Khai", vi: "Lối vào Joystay tại 382/23 Nguyễn Thị Minh Khai" },
      },
      {
        icon: "KeyRound",
        title: { en: "Open the main gate", vi: "Mở cổng chính" },
        body: {
          en: "Tap the lock screen to wake it up → enter your gate passcode → press #.",
          vi: "Chạm vào màn hình khóa cho sáng lên → nhập mật mã cổng → nhấn #.",
        },
        image: "/guide/lock-main-gate.webp",
        imageAlt: { en: "Keypad lock on the main gate", vi: "Khóa mã số ở cổng chính" },
      },
      {
        icon: "DoorOpen",
        title: { en: "Open your room", vi: "Mở cửa phòng" },
        body: {
          en: "Tap the lock screen → enter your room passcode → press #. Welcome home.",
          vi: "Chạm vào màn hình khóa → nhập mật mã phòng → nhấn #. Chào mừng bạn về nhà.",
        },
        image: "/guide/lock-room-door.webp",
        imageAlt: { en: "Keypad lock on the room door", vi: "Khóa mã số ở cửa phòng" },
      },
    ] as { icon: string; title: L; body: L; image?: string; imageAlt?: L }[],
    early: {
      title: { en: "Arriving early?", vi: "Đến sớm?" } as L,
      body: {
        en: "Luggage lockers are available so you can drop your bags and explore before your room is ready.",
        vi: "Joystay có tủ gửi hành lý — bạn có thể gửi đồ và đi dạo trong lúc chờ nhận phòng.",
      } as L,
      image: "/guide/luggage-lockers.webp",
    },
  },
  checkout: {
    tag: { en: "Check-out", vi: "Trả phòng" } as L,
    title: { en: "Leaving is", vi: "Trả phòng" } as L,
    italic: { en: "just as easy.", vi: "cũng nhẹ nhàng." } as L,
    by: { en: "Check-out by", vi: "Trả phòng trước" } as L,
    steps: [
      { en: "Check drawers, the fridge and the bathroom for your belongings.", vi: "Kiểm tra ngăn kéo, tủ lạnh và phòng tắm để không bỏ quên đồ." },
      { en: "Turn off the air-conditioner, lights and TV.", vi: "Tắt điều hòa, đèn và TV." },
      { en: "Close your room door and the main gate behind you.", vi: "Đóng cửa phòng và cổng chính khi ra về." },
      { en: "Need a late check-out or to leave luggage? Message us on Zalo/WhatsApp.", vi: "Cần trả phòng muộn hoặc gửi hành lý? Nhắn Joystay qua Zalo/WhatsApp." },
    ] as L[],
  },
  faq: {
    tag: { en: "FAQ", vi: "Hỏi Đáp" } as L,
    title: { en: "Good", vi: "Câu hỏi" } as L,
    italic: { en: "questions.", vi: "thường gặp." } as L,
    items: [
      {
        q: { en: "When will I receive my door codes?", vi: "Khi nào tôi nhận được mã cửa?" },
        a: {
          en: "Before your check-in time, via the platform or chat you booked with. If you haven't received them, message us on Zalo or call the hotline.",
          vi: "Trước giờ nhận phòng, qua nền tảng hoặc kênh chat bạn đã đặt. Nếu chưa nhận được, hãy nhắn Zalo hoặc gọi hotline.",
        },
      },
      {
        q: { en: "The code doesn't work — what do I do?", vi: "Nhập mã không mở được cửa thì làm sao?" },
        a: {
          en: "Tap the screen to wake the lock, enter the code slowly and finish with #. Still stuck? Call or WhatsApp our hotline — we'll help right away.",
          vi: "Chạm màn hình cho khóa sáng lên, nhập mã chậm rãi và kết thúc bằng phím #. Vẫn không được? Gọi hoặc nhắn WhatsApp hotline — Joystay hỗ trợ ngay.",
        },
      },
      {
        q: { en: "What are the check-in and check-out times?", vi: "Giờ nhận phòng và trả phòng là mấy giờ?" },
        a: {
          en: "Check-in from 15:00, check-out by 12:00. Need to arrive earlier or leave later? Message us on Zalo or WhatsApp.",
          vi: "Nhận phòng từ 15:00, trả phòng trước 12:00. Cần nhận phòng sớm hoặc trả phòng muộn hơn? Nhắn Joystay qua Zalo hoặc WhatsApp.",
        },
      },
      {
        q: { en: "Can I check in early or check out late?", vi: "Tôi có thể nhận phòng sớm hoặc trả phòng muộn không?" },
        a: {
          en: "Message us on Zalo or WhatsApp and we'll arrange it when the room schedule allows. Arriving early anyway? Drop your bags in our luggage lockers.",
          vi: "Nhắn Joystay qua Zalo hoặc WhatsApp, chúng tôi sẽ sắp xếp nếu lịch phòng cho phép. Nếu đến sớm, bạn có thể gửi đồ ở tủ gửi hành lý.",
        },
      },
      {
        q: { en: "Why is there a shop at the entrance?", vi: "Sao lối vào lại là một cửa hàng?" },
        a: {
          en: "The ground floor of 382/23 is the PORO Trading Card Game shop, and Joystay shares its entrance. Walk in through the shop to reach the main gate and enter your gate code there.",
          vi: "Tầng trệt số 382/23 là cửa hàng PORO Trading Card Game, Joystay dùng chung lối vào. Bạn cứ đi qua cửa hàng tới cổng chính và nhập mã cổng tại đó.",
        },
      },
      {
        q: { en: "Is there WiFi?", vi: "Có WiFi không?" },
        a: {
          en: "Yes. The network name and password are sent together with your door codes.",
          vi: "Có. Tên mạng và mật khẩu WiFi được gửi kèm mã cửa trước khi bạn đến.",
        },
      },
      {
        q: { en: "Where do I park?", vi: "Gửi xe ở đâu?" },
        a: {
          en: "Cars can enter the alley for drop-off. Motorbikes park at the lot at 382/27 Nguyễn Thị Minh Khai, a one-minute walk.",
          vi: "Xe hơi vào được hẻm để đón trả khách. Xe máy gửi tại bãi 382/27 Nguyễn Thị Minh Khai, đi bộ 1 phút.",
        },
      },
      {
        q: { en: "Do rooms have a kitchen?", vi: "Phòng có bếp không?" },
        a: {
          en: "Our larger studios have a kitchen or kitchenette. The 15m² rooms have no kitchen but include a fridge and smart TV.",
          vi: "Các studio lớn có bếp hoặc bếp nhỏ. Phòng 15m² không có bếp nhưng có tủ lạnh và smart TV.",
        },
      },
      {
        q: { en: "Is housekeeping daily?", vi: "Có dọn phòng hằng ngày không?" },
        a: {
          en: "Rooms are cleaned periodically during longer stays, not daily. Need fresh towels or a clean-up? Just message us.",
          vi: "Phòng được dọn định kỳ trong thời gian lưu trú dài, không phải hằng ngày. Cần thay khăn hay dọn thêm, bạn cứ nhắn Joystay.",
        },
      },
      {
        q: { en: "Is it safe?", vi: "Ở đây có an toàn không?" },
        a: {
          en: "Every room has smoke and CO detectors. Security cameras cover outdoor areas only — never inside rooms.",
          vi: "Mọi phòng có đầu báo khói và CO. Camera an ninh chỉ lắp ở khu vực bên ngoài — không bao giờ trong phòng.",
        },
      },
      {
        q: { en: "Is it quiet?", vi: "Khu vực có yên tĩnh không?" },
        a: {
          en: "The alley faces a school, so mornings on weekdays can be lively. Evenings are calm.",
          vi: "Hẻm đối diện một trường học nên buổi sáng ngày thường có thể hơi nhộn nhịp. Buổi tối yên tĩnh.",
        },
      },
    ] as { q: L; a: L }[],
    more: { en: "Still have a question?", vi: "Vẫn còn thắc mắc?" } as L,
    chat: { en: "Chat on Zalo", vi: "Nhắn Zalo" } as L,
    whatsapp: { en: "WhatsApp", vi: "WhatsApp" } as L,
    call: { en: "Call us", vi: "Gọi ngay" } as L,
  },
  around: {
    tag: { en: "Around Joystay", vi: "Xung Quanh Joystay" } as L,
    title: { en: "Step outside,", vi: "Bước ra ngoài," } as L,
    italic: { en: "Saigon begins.", vi: "Sài Gòn bắt đầu." } as L,
    subtitle: {
      en: "Tap a place to see it on the map, or get directions from Joystay.",
      vi: "Chọn một địa điểm để xem trên bản đồ, hoặc mở chỉ đường từ Joystay.",
    } as L,
    directions: { en: "Directions", vi: "Chỉ đường" } as L,
    note: {
      en: "Opening hours change — check Google Maps before you go.",
      vi: "Giờ mở cửa có thể thay đổi — kiểm tra Google Maps trước khi đi.",
    } as L,
    categories: [
      {
        key: "alley",
        label: { en: "In our alley", vi: "Trong hẻm 382" },
        places: [
          { name: "Dulce de Saigon", query: "Dulce de Saigon, 382/15 Nguyễn Thị Minh Khai", desc: { en: "Bakery & café — cookies and European-style cakes.", vi: "Tiệm bánh & cà phê — cookie, bánh kiểu Âu." } },
          { name: "Sandwich by Dulce", query: "Sandwich by Dulce, 382/15 Nguyễn Thị Minh Khai", desc: { en: "Western-style sandwiches for a quick lunch.", vi: "Sandwich kiểu phương Tây cho bữa trưa nhanh." } },
          { name: "Cozy by Xeooo", query: "Cozy by Xeooo - Pizza, Drink & More, 382/22 Nguyễn Thị Minh Khai", desc: { en: "Pizza, drinks and more — good for evenings.", vi: "Pizza, đồ uống và hơn thế — hợp buổi tối." } },
          { name: "Darkside Coffee", query: "Darkside Coffee, 382/6 Nguyễn Thị Minh Khai", desc: { en: "Coffee, cocktails and shisha until late.", vi: "Cà phê, cocktail và shisha đến khuya." } },
        ],
      },
      {
        key: "sights",
        label: { en: "Sights", vi: "Tham quan" },
        places: [
          { name: "Tao Đàn Park", query: "Công viên Tao Đàn, Hồ Chí Minh", desc: { en: "Shady city park, popular for morning walks.", vi: "Công viên rợp bóng cây, nơi dạo bộ buổi sáng." } },
          { name: "Independence Palace", query: "Dinh Độc Lập, Hồ Chí Minh", desc: { en: "Landmark of modern Vietnamese history.", vi: "Di tích lịch sử biểu tượng của Sài Gòn." } },
          { name: "Bến Thành Market", query: "Chợ Bến Thành, Hồ Chí Minh", desc: { en: "Saigon's most famous market.", vi: "Khu chợ nổi tiếng nhất Sài Gòn." } },
          { name: "War Remnants Museum", query: "Bảo tàng Chứng tích Chiến tranh, Hồ Chí Minh", desc: { en: "Essential museum on the Vietnam War.", vi: "Bảo tàng về lịch sử chiến tranh Việt Nam." } },
          { name: "Tân Định Church", query: "Nhà thờ Tân Định, Hồ Chí Minh", desc: { en: "The famous pink church.", vi: "Nhà thờ màu hồng nổi tiếng." } },
        ],
      },
      {
        key: "daily",
        label: { en: "Everyday needs", vi: "Tiện ích" },
        places: [
          { name: { en: "Convenience stores", vi: "Cửa hàng tiện lợi" }, query: "convenience store near 382 Nguyễn Thị Minh Khai Quận 3", desc: { en: "24/7 stores nearby.", vi: "Cửa hàng mở 24/7 gần đây." } },
          { name: { en: "Pharmacies", vi: "Nhà thuốc" }, query: "pharmacy near 382 Nguyễn Thị Minh Khai Quận 3", desc: { en: "Nearest pharmacies.", vi: "Nhà thuốc gần nhất." } },
          { name: { en: "ATMs", vi: "ATM" }, query: "ATM near 382 Nguyễn Thị Minh Khai Quận 3", desc: { en: "Cash machines nearby.", vi: "Cây ATM gần đây." } },
          { name: { en: "Laundry", vi: "Giặt ủi" }, query: "laundry near 382 Nguyễn Thị Minh Khai Quận 3", desc: { en: "Laundry services nearby.", vi: "Dịch vụ giặt ủi gần đây." } },
        ],
      },
    ],
  },
  reviews: {
    tag: { en: "Google Reviews", vi: "Đánh Giá Google" } as L,
    title: { en: "What guests", vi: "Khách nói gì" } as L,
    italic: { en: "say.", vi: "về Joystay." } as L,
    based: { en: "reviews on Google", vi: "đánh giá trên Google" } as L,
    seeAll: { en: "See all on Google", vi: "Xem tất cả trên Google" } as L,
    write: { en: "Write a review", vi: "Viết đánh giá" } as L,
    empty: {
      en: "Stayed with us? A quick Google review helps other travellers find Joystay.",
      vi: "Bạn đã ở Joystay? Một đánh giá ngắn trên Google giúp những vị khách khác tìm thấy chúng tôi.",
    } as L,
    readMore: { en: "Read more", vi: "Xem thêm" } as L,
  },
};
