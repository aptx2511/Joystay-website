// sanity.config.ts — dùng cho standalone Sanity Studio (không phải Next.js)
// Deploy studio: cd joystay-studio && sanity deploy
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "joystay",
  title: "Joystay CMS",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Nội Dung")
          .items([
            S.listItem()
              .title("🛏 Phòng")
              .schemaType("room")
              .child(S.documentTypeList("room").title("Danh sách phòng")),
            S.listItem()
              .title("📝 Bài Viết Blog")
              .schemaType("post")
              .child(S.documentTypeList("post").title("Bài viết")),
            S.listItem()
              .title("🎟 Mã Giảm Giá")
              .schemaType("promoCode")
              .child(S.documentTypeList("promoCode").title("Promo Codes")),
            S.divider(),
            S.listItem()
              .title("👤 Tác Giả")
              .schemaType("author")
              .child(S.documentTypeList("author").title("Tác giả")),
            S.listItem()
              .title("🏷 Danh Mục Blog")
              .schemaType("category")
              .child(S.documentTypeList("category").title("Danh mục")),
            S.divider(),
            // Singleton — Site Settings
            S.listItem()
              .title("⚙️ Cài Đặt Website")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Cài Đặt Website")
              ),
          ]),
    }),
  ],

  schema: { types: schemaTypes },
});
