export const dynamic = "force-dynamic";

import Navbar            from "@/components/layout/Navbar";
import Footer            from "@/components/layout/Footer";
import HeroSection       from "@/components/home/HeroSection";
import AboutSection      from "@/components/home/AboutSection";
import RoomShowcase      from "@/components/home/RoomShowcase";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview       from "@/components/home/BlogPreview";
import CTABanner         from "@/components/home/CTABanner";
import { getRooms, getPosts, getSiteSettings, getReviews, getActivePromoCodes } from "@/lib/sanity-data";

// Mã giảm giá quảng cáo trên banner CTA — chỉ hiện khi mã này đang active trong Sanity
const CTA_PROMO_CODE = "JOYSTAY10";

export default async function HomePage() {
  const [rooms, posts, settings, reviews, promos] = await Promise.all([
    getRooms(), getPosts(), getSiteSettings(), getReviews(), getActivePromoCodes(),
  ]);
  const ctaPromo = (promos as { code: string }[]).find(
    (p) => p.code?.toUpperCase() === CTA_PROMO_CODE
  )?.code ?? null;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection heroBackground={settings?.heroBackground ?? null} />
        <AboutSection />
        <RoomShowcase rooms={rooms} />
        <TestimonialsSection reviews={reviews} />
        <BlogPreview posts={posts} />
        <CTABanner promoCode={ctaPromo} />
      </main>
      <Footer />
    </>
  );
}
