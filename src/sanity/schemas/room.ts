import { defineType, defineField } from "sanity";

export const room = defineType({
  name: "room",
  title: "Phòng (Rooms)",
  type: "document",
  fields: [
    // ── Thông tin cơ bản ──────────────────────────────────────
    defineField({
      name: "name",
      title: "Tên phòng",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "concept",
      title: "Concept (Pop Art, Monochrome, ...)",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline ngắn",
      type: "string",
    }),
    defineField({
      name: "pmsRoomId",
      title: "PMS Room ID (bắt buộc)",
      type: "string",
      validation: (r) => r.required(),
    }),

    // ── Mô tả song ngữ ────────────────────────────────────────
    defineField({
      name: "shortDescription",
      title: "Mô tả ngắn (English)",
      type: "string",
    }),
    defineField({
      name: "shortDescriptionVi",
      title: "Mô tả ngắn (Tiếng Việt)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Mô tả đầy đủ (English)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "descriptionVi",
      title: "Mô tả đầy đủ (Tiếng Việt)",
      type: "array",
      of: [{ type: "block" }],
    }),

    // ── Thông số phòng ────────────────────────────────────────
    defineField({ name: "size", title: "Diện tích (m²)", type: "number" }),
    defineField({ name: "maxGuests", title: "Số khách tối đa", type: "number" }),
    defineField({ name: "bedType", title: "Loại giường (Queen, King, ...)", type: "string" }),

    // ── Giá cả ───────────────────────────────────────────────
    defineField({
      name: "pricePerNight",
      title: "Giá mỗi đêm (VND)",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({ name: "weekendPrice", title: "Giá cuối tuần (VND)", type: "number" }),
    defineField({ name: "pricePerMonth", title: "Giá thuê tháng (VND)", type: "number" }),
    defineField({ name: "securityDeposit", title: "Tiền cọc (VND)", type: "number" }),
    defineField({ name: "securityDepositNote", title: "Ghi chú tiền cọc", type: "string" }),
    defineField({ name: "cleaningFee", title: "Phí dọn phòng (VND)", type: "number" }),

    // ── Media ────────────────────────────────────────────────
    defineField({
      name: "featuredImage",
      title: "Ảnh đại diện",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Thư viện ảnh",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),

    // ── Loại hình & trạng thái ────────────────────────────────
    defineField({
      name: "stayType",
      title: "Loại hình lưu trú",
      type: "string",
      options: {
        list: [
          { title: "Short Stay (ngắn hạn)", value: "SHORT_STAY" },
          { title: "Long Stay (dài hạn)", value: "LONG_STAY" },
          { title: "Cả hai", value: "BOTH" },
        ],
        layout: "radio",
      },
      initialValue: "SHORT_STAY",
    }),
    defineField({
      name: "isAvailable",
      title: "Đang cho thuê?",
      type: "boolean",
      initialValue: true,
    }),

    // ── Tiện nghi ────────────────────────────────────────────
    defineField({
      name: "amenities",
      title: "Tiện nghi (danh sách)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Full Kitchen", "Smart TV", "AC", "WiFi",
          "Washer", "Bathtub", "Rain Shower", "Shower",
          "Mini Fridge", "Hot Tub", "Workspace",
        ],
      },
    }),

    // ── CSS Gradient (dùng tạm khi chưa có ảnh thật) ─────────
    defineField({
      name: "gradient",
      title: "CSS Gradient (placeholder)",
      type: "string",
      description: "Ví dụ: from-rose-400 via-pink-400 to-yellow-300",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color class",
      type: "string",
      description: "Ví dụ: bg-rose-500",
    }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "concept", media: "featuredImage" },
  },
});
