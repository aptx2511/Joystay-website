import Navbar            from "@/components/layout/Navbar";
import Footer            from "@/components/layout/Footer";
import HeroSection       from "@/components/home/HeroSection";
import AboutSection      from "@/components/home/AboutSection";
import RoomShowcase      from "@/components/home/RoomShowcase";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview       from "@/components/home/BlogPreview";
import CTABanner         from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <RoomShowcase />
        <TestimonialsSection />
        <BlogPreview />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
