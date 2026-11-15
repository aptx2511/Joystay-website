"use client";

import { Clock } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import type { BlogPost } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

export default function BlogListing({ posts }: { posts: BlogPost[] }) {
  const { lang } = useLang();

  const categories = [
    tx(T.blog.filterAll, lang),
    ...Array.from(new Set(posts.map((p) => lang === "en" ? p.categoryEn : p.category))),
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-joy-charcoal pt-28 sm:pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag text-joy-green-light mb-4 block">{tx(T.blog.journalTag, lang)}</span>
          <h1 className="font-serif text-display-xl text-white font-light">
            {tx(T.blog.pageTitle, lang)}{" "}
            <em className="italic text-joy-green-light">{tx(T.blog.pageItalic, lang)}</em>
          </h1>
          <p className="mt-4 text-white/50 font-sans text-base max-w-xl leading-relaxed">
            {tx(T.blog.pageSubtitle, lang)}
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <div className="bg-joy-charcoal border-b border-white/10 sticky top-[72px] sm:top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat, i) => (
            <button key={cat}
              className={`shrink-0 px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide border transition-all duration-200
                ${i === 0 ? "border-joy-green text-joy-green" : "border-white/20 text-white/60 hover:border-joy-green hover:text-joy-green"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="bg-joy-cream py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((post) => (
            <article key={post.id}
              className="group bg-white border border-joy-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-joy flex flex-col">
              <div className={`relative h-48 bg-joy-charcoal bg-gradient-to-br ${post.gradient ?? ""} overflow-hidden`}>
                {post.featuredImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.featuredImage.includes("cdn.sanity.io") ? `${post.featuredImage}?w=800&auto=format&q=70` : post.featuredImage}
                    alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-joy" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-sans text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full">
                    {lang === "en" ? post.categoryEn : post.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-3 text-joy-muted text-xs font-sans mb-3">
                  <Clock size={12} />
                  <span>{post.readTime} {tx(T.blog.readMin, lang)}</span>
                  <span className="text-joy-border">·</span>
                  <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                </div>

                <h2 className="font-serif text-xl text-joy-ink font-medium leading-snug mb-3 group-hover:text-joy-green transition-colors duration-300 line-clamp-2">
                  {lang === "en" ? post.titleEn : post.title}
                </h2>

                <p className="font-sans text-sm text-joy-muted leading-relaxed flex-1 line-clamp-3 mb-5">
                  {lang === "en" ? post.excerptEn : post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-joy-green group-hover:gap-3 transition-all duration-300">
                  {tx(T.blog.readArticle, lang)}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center mt-12 font-sans text-sm text-joy-muted">
          {tx(T.blog.comingSoon, lang)}{" "}
          <a href="https://instagram.com" className="text-joy-green hover:underline">Instagram</a>{" "}
          {tx(T.blog.forUpdates, lang)}
        </p>
      </section>
    </>
  );
}
