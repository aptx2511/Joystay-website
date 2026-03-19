import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Danh mục Blog",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tên (Tiếng Việt)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Tên (English)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
  ],
  preview: { select: { title: "title", subtitle: "titleEn" } },
});
