import { defineType, defineField } from "sanity";

export const promoCode = defineType({
  name: "promoCode",
  title: "Mã Giảm Giá",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Mã code (ví dụ: JOYSTAY10)",
      type: "string",
      validation: (r) => r.required().uppercase(),
    }),
    defineField({
      name: "discountType",
      title: "Loại giảm giá",
      type: "string",
      options: {
        list: [
          { title: "Phần trăm (%)", value: "PERCENTAGE" },
          { title: "Số tiền cố định (VND)", value: "FIXED_VND" },
        ],
        layout: "radio",
      },
      initialValue: "PERCENTAGE",
    }),
    defineField({
      name: "discountValue",
      title: "Giá trị giảm (10 = 10% hoặc 200000 = 200k VND)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({ name: "minNights", title: "Số đêm tối thiểu", type: "number", initialValue: 1 }),
    defineField({ name: "validFrom", title: "Hiệu lực từ", type: "datetime" }),
    defineField({
      name: "validUntil",
      title: "Hết hạn",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({ name: "maxUses", title: "Số lần dùng tối đa", type: "number" }),
    defineField({ name: "usedCount", title: "Đã dùng", type: "number", initialValue: 0 }),
    defineField({
      name: "isActive",
      title: "Đang hoạt động?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "applicableRooms",
      title: "Áp dụng cho phòng (để trống = tất cả)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "room" }] }],
    }),
  ],
  preview: {
    select: { title: "code", subtitle: "discountValue" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Giảm ${subtitle}` };
    },
  },
});
