import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogListing from "@/components/blog/BlogListing";

export const metadata = {
  title: "Blog & Saigon Guides",
  description: "Travel tips, neighbourhood guides, and stories from Joystay Vietnam.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogListing />
      </main>
      <Footer />
    </>
  );
}
