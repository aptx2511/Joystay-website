import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Client is only created when projectId is available
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false, // false = luôn fetch trực tiếp từ Sanity API, tránh CDN stale cache
});

export const isSanityConfigured = !!(projectId?.trim() && projectId.trim() !== "placeholder");
