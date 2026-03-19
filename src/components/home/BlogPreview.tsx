import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "./BlogCard";
import { BLOG_POSTS } from "@/lib/mock-data";

export default function BlogPreview() {
  return (
    <section className="bg-joy-warm py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            tag="Saigon Experiences"
            title="Stories &"
            titleItalic="Local Guides"
            subtitle="Tips, guides, and neighbourhood secrets from our team and guests."
          />
          <Link href="/blog" className="btn-ghost shrink-0 self-start sm:self-auto">
            All Articles <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
