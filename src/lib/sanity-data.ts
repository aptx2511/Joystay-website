import { client, isSanityConfigured } from "@/sanity/lib/client";
import {
  ALL_ROOMS_QUERY,
  ROOM_BY_SLUG_QUERY,
  ALL_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
  ACTIVE_PROMO_CODES_QUERY,
  REVIEWS_QUERY,
} from "@/sanity/lib/queries";
import { ROOMS, BLOG_POSTS } from "./mock-data";
import type { Room, BlogPost } from "./mock-data";

const USE_SANITY = isSanityConfigured;

// ── Rooms ────────────────────────────────────────────────────────────────────

export async function getRooms(): Promise<Room[]> {
  if (!USE_SANITY) return ROOMS;
  try {
    const data = await client.fetch(ALL_ROOMS_QUERY, {}, { cache: "no-store" });
    console.log("[getRooms] first room featuredImage:", data?.[0]?.featuredImage ?? "NULL");
    return data?.length ? data : ROOMS;
  } catch (err) {
    console.error("[getRooms] Sanity fetch failed, using mock data:", err);
    return ROOMS;
  }
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  if (!USE_SANITY) return ROOMS.find((r) => r.slug === slug) ?? null;
  try {
    const data = await client.fetch(ROOM_BY_SLUG_QUERY, { slug }, { cache: "no-store" });
    return data ?? ROOMS.find((r) => r.slug === slug) ?? null;
  } catch {
    return ROOMS.find((r) => r.slug === slug) ?? null;
  }
}

export async function getRoomSlugs(): Promise<string[]> {
  const rooms = await getRooms();
  return rooms.map((r) => r.slug);
}

// ── Blog Posts ───────────────────────────────────────────────────────────────

export async function getPosts(): Promise<BlogPost[]> {
  if (!USE_SANITY) return BLOG_POSTS;
  try {
    const data = await client.fetch(ALL_POSTS_QUERY, {}, { next: { tags: ["post"], revalidate: 3600 } });
    return data?.length ? data : BLOG_POSTS;
  } catch {
    return BLOG_POSTS;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!USE_SANITY) return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  try {
    const data = await client.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { tags: ["post"], revalidate: 3600 } });
    return data ?? BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  } catch {
    return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((p) => p.slug);
}

// ── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings() {
  if (!USE_SANITY) return null;
  try {
    return await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { tags: ["siteSettings"], revalidate: 3600 } });
  } catch {
    return null;
  }
}

// ── Reviews ──────────────────────────────────────────────────────────────────

export async function getReviews() {
  if (!USE_SANITY) return [];
  try {
    return await client.fetch(REVIEWS_QUERY, {}, { next: { tags: ["review"], revalidate: 3600 } });
  } catch {
    return [];
  }
}

// ── Promo Codes ──────────────────────────────────────────────────────────────

export async function getActivePromoCodes() {
  if (!USE_SANITY) return [];
  try {
    return await client.fetch(ACTIVE_PROMO_CODES_QUERY, {}, { next: { tags: ["promoCode"] } });
  } catch {
    return [];
  }
}
