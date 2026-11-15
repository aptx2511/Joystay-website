import type { MetadataRoute } from "next";
import { getRooms, getPosts } from "@/lib/sanity-data";
import { SITE_URL } from "@/lib/site";

/** /sitemap.xml — trang tĩnh + từng phòng + từng bài blog */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [rooms, posts] = await Promise.all([getRooms().catch(() => []), getPosts().catch(() => [])]);
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly") =>
    ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("", 1, "weekly"),
    page("/rooms", 0.9, "weekly"),
    page("/availability", 0.8, "daily"),
    page("/guide", 0.7, "monthly"),
    page("/blog", 0.7, "weekly"),
    page("/contact", 0.5, "monthly"),
    ...rooms.map((r) => page(`/rooms/${r.slug}`, 0.8, "weekly")),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.publishedAt ? new Date(p.publishedAt) : now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
