import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogListing from "@/components/blog/BlogListing";
import { getPosts } from "@/lib/sanity-data";

export const metadata = {
  title: "Blog & Saigon Guides",
  description: "Travel tips, neighbourhood guides, and stories from Joystay Vietnam.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main>
        <BlogListing posts={posts} />
      </main>
      <Footer />
    </>
  );
}
