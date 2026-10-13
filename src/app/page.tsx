export const dynamic = "force-dynamic";

import Navbar            from "@/components/layout/Navbar";
import Footer            from "@/components/layout/Footer";
import HeroSection       from "@/components/home/HeroSection";
import AboutSection      from "@/components/home/AboutSection";
import RoomShowcase      from "@/components/home/RoomShowcase";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview       from "@/components/home/BlogPreview";
import CTABanner         from "@/components/home/CTABanner";
import { getRooms, getPosts, getSiteSettings, getReviews } from "@/lib/sanity-data";

export default async function HomePage() {
  const [rooms, posts, settings, reviews] = await Promise.all([
    getRooms(), getPosts(), getSiteSettings(), getReviews(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection heroBackground={settings?.heroBackground ?? null} />
        <AboutSection />
        <RoomShowcase rooms={rooms} />
        <TestimonialsSection reviews={reviews} />
        <BlogPreview posts={posts} />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
