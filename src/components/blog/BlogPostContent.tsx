"use client";

import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import type { BlogPost } from "@/lib/mock-data";

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { lang } = useLang();

  const title = lang === "en" ? (post.titleEn || post.title) : post.title;
  const excerpt = lang === "en" ? (post.excerptEn || post.excerpt) : post.excerpt;
  const category = lang === "en" ? (post.categoryEn || post.category) : post.category;

  return (
    <>
      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${post.gradient ?? "from-joy-charcoal to-joy-ink"} pt-28 sm:pt-32 pb-16 px-5 sm:px-8 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-sans text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> {lang === "en" ? "Back to Blog" : "Quay lại Blog"}
          </Link>
          <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white font-sans text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4">
            {category}
          </span>
          <h1 className="font-serif text-display-lg text-white font-light leading-tight mb-4">
            {title}
          </h1>
          <p className="font-sans text-white/70 text-base leading-relaxed max-w-2xl mb-6">
            {excerpt}
          </p>
          <div className="flex items-center gap-4 text-white/50 font-sans text-xs">
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime} {lang === "en" ? "min read" : "phút đọc"}
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-joy-cream py-14 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Nội dung từ Sanity PortableText sẽ được render ở đây khi có data */}
          <div className="prose prose-lg max-w-none font-sans text-joy-ink leading-relaxed">
            <p className="text-joy-muted italic text-center py-10 border border-dashed border-joy-border rounded-2xl">
              {lang === "en"
                ? "Full article content will appear here once published in Sanity CMS."
                : "Nội dung đầy đủ sẽ hiển thị ở đây sau khi đăng trên Sanity CMS."}
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-joy-border">
            <Link href="/blog" className="btn-primary">
              <ArrowLeft size={14} />
              {lang === "en" ? "All Articles" : "Tất cả bài viết"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
