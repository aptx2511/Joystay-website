import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Cài Đặt Website",
  type: "document",
  fields: [
    // ── Liên hệ ──────────────────────────────────────────────
    defineField({ name: "phone", title: "Số điện thoại", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Địa chỉ", type: "text", rows: 2 }),
    defineField({ name: "zaloLink", title: "Zalo Link", type: "url" }),
    defineField({ name: "messengerLink", title: "Messenger Link", type: "url" }),
    defineField({ name: "googleMapsUrl", title: "Google Maps URL", type: "url" }),

    // ── Mạng xã hội ──────────────────────────────────────────
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "airbnbUrl", title: "Airbnb URL", type: "url" }),

    // ── Thanh toán ───────────────────────────────────────────
    defineField({ name: "bankName", title: "Tên ngân hàng", type: "string" }),
    defineField({ name: "bankAccountName", title: "Tên tài khoản", type: "string" }),
    defineField({ name: "bankAccountNumber", title: "Số tài khoản", type: "string" }),
    defineField({ name: "bankQRImage", title: "QR Code thanh toán", type: "image" }),

    // ── SEO mặc định ─────────────────────────────────────────
    defineField({ name: "defaultSeoTitle", title: "SEO Title mặc định", type: "string" }),
    defineField({ name: "defaultSeoDescription", title: "SEO Description mặc định", type: "text", rows: 3 }),
    defineField({ name: "ogImage", title: "OG Image mặc định", type: "image" }),
  ],
});
