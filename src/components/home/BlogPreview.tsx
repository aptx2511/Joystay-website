"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "./BlogCard";
import type { BlogPost } from "@/lib/mock-data";
import { useLang, tx } from "@/lib/lang-context";
import { T } from "@/lib/translations";

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const { lang } = useLang();

  return (
    <section className="bg-joy-warm py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            tag={tx(T.blog.tag, lang)}
            title={tx(T.blog.title, lang)}
            titleItalic={tx(T.blog.italic, lang)}
            subtitle={tx(T.blog.subtitle, lang)}
          />
          <Link href="/blog" className="btn-ghost shrink-0 self-start sm:self-auto">
            {tx(T.blog.allArticles, lang)} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
