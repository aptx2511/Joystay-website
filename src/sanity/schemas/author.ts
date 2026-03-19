import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Tác giả",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Tên", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Ảnh đại diện", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Giới thiệu", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "name", media: "image" } },
});
