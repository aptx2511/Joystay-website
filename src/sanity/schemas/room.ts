import { defineType, defineField } from "sanity";

const galleryImageItem = {
  type: "image" as const,
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", type: "string", title: "Alt text" }),
  ],
};

export const room = defineType({
  name: "room",
  title: "Phòng (Rooms)",
  type: "document",

  groups: [
    { name: "basic",    title: "📋 Thông Tin",    default: true },
    { name: "media",    title: "📷 Ảnh & Gallery"               },
    { name: "pricing",  title: "💰 Giá Cả"                      },
    { name: "settings", title: "⚙️ Cài Đặt"                     },
  ],

  fields: [
    // ── basic ─────────────────────────────────────────────────
    defineField({ name: "name",              title: "Tên phòng",               type: "string",  group: "basic", validation: (r) => r.required() }),
    defineField({ name: "slug",              title: "Slug (URL)",               type: "slug",    group: "basic", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "concept",           title: "Concept",                  type: "string",  group: "basic" }),
    defineField({ name: "tagline",           title: "Tagline ngắn",             type: "string",  group: "basic" }),
    defineField({ name: "pmsRoomId",         title: "PMS Room ID",              type: "string",  group: "basic", validation: (r) => r.required() }),
    defineField({ name: "shortDescription",  title: "Mô tả ngắn (EN)",         type: "string",  group: "basic" }),
    defineField({ name: "shortDescriptionVi",title: "Mô tả ngắn (VI)",         type: "string",  group: "basic" }),
    defineField({ name: "description",       title: "Mô tả đầy đủ (EN)",       type: "array",   group: "basic", of: [{ type: "block" }] }),
    defineField({ name: "descriptionVi",     title: "Mô tả đầy đủ (VI)",       type: "array",   group: "basic", of: [{ type: "block" }] }),
    defineField({ name: "size",              title: "Diện tích (m²)",           type: "number",  group: "basic" }),
    defineField({ name: "maxGuests",         title: "Số khách tối đa",          type: "number",  group: "basic" }),
    defineField({ name: "bedType",           title: "Loại giường",              type: "string",  group: "basic" }),

    // ── media ─────────────────────────────────────────────────
    defineField({ name: "featuredImage",   title: "Ảnh đại diện",        type: "image",  group: "media",  options: { hotspot: true } }),
    defineField({ name: "galleryBedroom",  title: "🛏 Phòng ngủ",         type: "array",  group: "media",  of: [galleryImageItem], options: { layout: "grid" } }),
    defineField({ name: "galleryLiving",   title: "🛋 Phòng khách",        type: "array",  group: "media",  of: [galleryImageItem], options: { layout: "grid" } }),
    defineField({ name: "galleryKitchen",  title: "🍳 Phòng Bếp",          type: "array",  group: "media",  of: [galleryImageItem], options: { layout: "grid" } }),
    defineField({ name: "galleryBathroom", title: "🚿 Phòng vệ sinh",       type: "array",  group: "media",  of: [galleryImageItem], options: { layout: "grid" } }),
    defineField({ name: "galleryOther",    title: "✨ Không gian khác",     type: "array",  group: "media",  of: [galleryImageItem], options: { layout: "grid" } }),

    // ── pricing ───────────────────────────────────────────────
    defineField({ name: "pricePerNight",       title: "Giá mỗi đêm (VND)",    type: "number", group: "pricing", validation: (r) => r.required() }),
    defineField({ name: "weekendPrice",        title: "Giá cuối tuần (VND)",   type: "number", group: "pricing" }),
    defineField({ name: "pricePerMonth",       title: "Giá thuê tháng (VND)",  type: "number", group: "pricing" }),
    defineField({ name: "securityDeposit",     title: "Tiền cọc (VND)",        type: "number", group: "pricing" }),
    defineField({ name: "securityDepositNote", title: "Ghi chú tiền cọc",      type: "string", group: "pricing" }),
    defineField({ name: "cleaningFee",         title: "Phí dọn phòng (VND)",   type: "number", group: "pricing" }),

    // ── settings ──────────────────────────────────────────────
    defineField({
      name: "stayType", title: "Loại hình lưu trú", type: "string", group: "settings",
      options: {
        list: [
          { title: "Short Stay", value: "SHORT_STAY" },
          { title: "Long Stay",  value: "LONG_STAY"  },
          { title: "Cả hai",     value: "BOTH"       },
        ],
        layout: "radio",
      },
      initialValue: "SHORT_STAY",
    }),
    defineField({ name: "isAvailable", title: "Đang cho thuê?", type: "boolean", group: "settings", initialValue: true }),
    defineField({
      name: "amenities", title: "Tiện nghi", type: "array", group: "settings",
      of: [{ type: "string" }],
      options: {
        list: [
          "Full Kitchen", "Smart TV", "AC", "WiFi",
          "Washer", "Bathtub", "Rain Shower", "Shower",
          "Mini Fridge", "Hot Tub", "Workspace",
        ],
      },
    }),
    defineField({ name: "gradient",        title: "CSS Gradient class",   type: "string", group: "settings" }),
    defineField({ name: "accentColor",     title: "Accent Color class",   type: "string", group: "settings" }),
    defineField({ name: "seoTitle",        title: "SEO Title",            type: "string", group: "settings" }),
    defineField({ name: "seoDescription",  title: "SEO Description",      type: "text",   group: "settings", rows: 3 }),
  ],

  preview: {
    select: { title: "name", subtitle: "concept", media: "featuredImage" },
  },
});
