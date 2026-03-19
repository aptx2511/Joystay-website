import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { getPostBySlug, getPostSlugs } from "@/lib/sanity-data";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.titleEn || post.title,
    description: post.excerptEn || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main>
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  );
}
