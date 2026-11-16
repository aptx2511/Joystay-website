import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Bài Viết (Blog)",
  type: "document",
  fields: [
    // ── Tiêu đề & Slug ────────────────────────────────────────
    defineField({
      name: "title",
      title: "Tiêu đề (Tiếng Việt)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "titleEn", title: "Tiêu đề (English)", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),

    // ── Tóm tắt ──────────────────────────────────────────────
    defineField({ name: "excerpt", title: "Tóm tắt (Tiếng Việt)", type: "text", rows: 3 }),
    defineField({ name: "excerptEn", title: "Tóm tắt (English)", type: "text", rows: 3 }),

    // ── Nội dung ─────────────────────────────────────────────
    defineField({
      name: "body",
      title: "Nội dung bài viết (Tiếng Việt)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [{ name: "href", type: "url", title: "Link" }],
              },
            ],
          },
        },
        { type: "image", options: { hotspot: true }, fields: [
          { name: "alt", type: "string", title: "Mô tả ảnh (alt)" },
          { name: "caption", type: "string", title: "Chú thích dưới ảnh" },
        ] },
      ],
    }),

    defineField({
      name: "bodyEn",
      title: "Nội dung bài viết (English — để trống thì hiện bản tiếng Việt)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [{ name: "href", type: "url", title: "Link" }],
              },
            ],
          },
        },
        { type: "image", options: { hotspot: true }, fields: [
          { name: "alt", type: "string", title: "Mô tả ảnh (alt)" },
          { name: "caption", type: "string", title: "Chú thích dưới ảnh" },
        ] },
      ],
    }),

    // ── Meta ─────────────────────────────────────────────────
    defineField({
      name: "author",
      title: "Tác giả",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      title: "Danh mục",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "featuredImage",
      title: "Ảnh đại diện",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "imageAlt", title: "Alt text ảnh", type: "string" }),
    defineField({ name: "readTime", title: "Thời gian đọc (phút)", type: "number" }),
    defineField({
      name: "publishedAt",
      title: "Ngày đăng",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "isPublished",
      title: "Đã xuất bản?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Nổi bật trên trang chủ?",
      type: "boolean",
      initialValue: false,
    }),

    // ── CSS Gradient (placeholder) ────────────────────────────
    defineField({ name: "gradient", title: "CSS Gradient (placeholder)", type: "string" }),

    // ── Bài liên quan ─────────────────────────────────────────
    defineField({
      name: "relatedPosts",
      title: "Bài viết liên quan",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 }),
    defineField({ name: "focusKeyword", title: "Focus Keyword", type: "string" }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "featuredImage" },
  },
});
