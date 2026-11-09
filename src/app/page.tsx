export const dynamic = "force-dynamic";

import Navbar            from "@/components/layout/Navbar";
import Footer            from "@/components/layout/Footer";
import HeroSection       from "@/components/home/HeroSection";
import AboutSection      from "@/components/home/AboutSection";
import RoomScrollStory   from "@/components/home/RoomScrollStory";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview       from "@/components/home/BlogPreview";
import CTABanner         from "@/components/home/CTABanner";
import { getRooms, getPosts, getSiteSettings, getReviews, getActivePromoCodes } from "@/lib/sanity-data";
import { getGoogleReviews, writeReviewUrl, GOOGLE_PLACE_ID } from "@/lib/google-reviews";
import type { Review } from "@/components/home/TestimonialsSection";

// Mã giảm giá quảng cáo trên banner CTA — chỉ hiện khi mã này đang active trong Sanity
const CTA_PROMO_CODE = "JOYSTAY10";

export default async function HomePage() {
  const [rooms, posts, settings, reviews, promos, google] = await Promise.all([
    getRooms(), getPosts(), getSiteSettings(), getReviews(), getActivePromoCodes(), getGoogleReviews(),
  ]);

  // Đánh giá Google (tự động, cần GOOGLE_PLACES_API_KEY) + đánh giá nhập tay trong Sanity (Airbnb/Booking/Direct)
  const googleReviews: Review[] = (google?.reviews ?? []).map((r, i) => ({
    _id: `google-${i}`,
    guestName: r.author,
    rating: r.rating,
    text: r.text.length > 420 ? r.text.slice(0, 420).trimEnd() + "…" : r.text,
    source: "Google",
    stayDate: r.relativeTime,
  }));
  const allReviews = [...googleReviews, ...(reviews as Review[])];
  const googleSummary = {
    rating: google?.rating ?? 0,
    total: google?.total ?? 0,
    mapsUrl: google?.mapsUrl ?? `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`,
    writeUrl: writeReviewUrl(),
  };
  const ctaPromo = (promos as { code: string }[]).find(
    (p) => p.code?.toUpperCase() === CTA_PROMO_CODE
  )?.code ?? null;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection heroBackground={settings?.heroBackground ?? null} />
        <AboutSection />
        <RoomScrollStory rooms={rooms} />
        <TestimonialsSection reviews={allReviews} google={googleSummary} />
        <BlogPreview posts={posts} />
        <CTABanner promoCode={ctaPromo} />
      </main>
      <Footer />
    </>
  );
}
