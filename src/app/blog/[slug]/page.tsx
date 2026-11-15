import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { getPostBySlug, getPostSlugs } from "@/lib/sanity-data";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.titleEn || post.title;
  const description = post.excerptEn || post.excerpt;
  return {
    title,
    description,
    keywords: post.article?.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Dữ liệu có cấu trúc cho Google: bài viết + câu hỏi thường gặp (nếu có)
  const art = post.article;
  const jsonLd: object[] = [{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titleEn || post.title,
    alternativeHeadline: post.title,
    description: post.excerptEn || post.excerpt,
    datePublished: post.publishedAt,
    inLanguage: ["en", "vi"],
    image: post.featuredImage ? (post.featuredImage.startsWith("/") ? `${SITE_URL}${post.featuredImage}` : post.featuredImage) : undefined,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: "Joystay Vietnam" },
    publisher: { "@type": "Organization", name: "Joystay Vietnam", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
  }];
  if (art?.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: art.faq.map((f) => ({ "@type": "Question", name: f.q.en, acceptedAnswer: { "@type": "Answer", text: f.a.en } })),
    });
  }

  return (
    <>
      <Navbar />
      <main>
        {jsonLd.map((j, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j).replace(/</g, "\\u003c") }} />
        ))}
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  );
}
