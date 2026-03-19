"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

export default function BlogCard({ post }: { post: BlogPost }) {
  const { lang } = useLang();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-joy-border bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-joy">
      <div className={`relative h-44 sm:h-48 bg-gradient-to-br ${post.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
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

        <h3 className="font-serif text-lg text-joy-ink font-medium leading-snug mb-3 group-hover:text-joy-green transition-colors duration-300 line-clamp-2">
          {lang === "en" ? post.titleEn : post.title}
        </h3>

        <p className="font-sans text-sm text-joy-muted leading-relaxed flex-1 line-clamp-3 mb-5">
          {lang === "en" ? post.excerptEn : post.excerpt}
        </p>

        <Link href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-joy-green group-hover:gap-3 transition-all duration-300">
          {tx(T.blog.readArticle, lang)} <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
