import { Clock } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/mock-data";

const ALL_CATEGORIES = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

export default function BlogListing() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-joy-charcoal pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag text-joy-green-light mb-4 block">Journal</span>
          <h1 className="font-serif text-display-xl text-white font-light">
            Stories &{" "}
            <em className="italic text-joy-green-light">Saigon Guides</em>
          </h1>
          <p className="mt-4 text-white/50 font-sans text-base max-w-xl leading-relaxed">
            Local tips, hidden gems, and travel guides from our team — so you can
            experience District 1 like a local.
          </p>
        </div>
      </section>

      {/* ── Category tabs ───────────────────────────────────────────── */}
      <div className="bg-joy-charcoal border-b border-white/10 sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex gap-3 overflow-x-auto
                        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ALL_CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`shrink-0 px-4 py-1.5 rounded-full font-sans text-xs font-semibold
                          tracking-wide border transition-all duration-200
                          ${i === 0
                            ? "border-joy-green text-joy-green"
                            : "border-white/20 text-white/60 hover:border-joy-green hover:text-joy-green"
                          }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────────── */}
      <section className="bg-joy-cream py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-joy-border rounded-2xl overflow-hidden
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-joy
                         flex flex-col"
            >
              {/* Thumbnail */}
              <div className={`relative h-48 bg-gradient-to-br ${post.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm border border-white/30
                                   text-white font-sans text-[10px] font-semibold tracking-[0.15em]
                                   uppercase px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-3 text-joy-muted text-xs font-sans mb-3">
                  <Clock size={12} />
                  <span>{post.readTime} min read</span>
                  <span className="text-joy-border">·</span>
                  <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                </div>

                <h2 className="font-serif text-xl text-joy-ink font-medium leading-snug mb-3
                               group-hover:text-joy-green transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>

                <p className="font-sans text-sm text-joy-muted leading-relaxed flex-1 line-clamp-3 mb-5">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold
                             text-joy-green group-hover:gap-3 transition-all duration-300"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state for when more posts exist */}
        <p className="text-center mt-12 font-sans text-sm text-joy-muted">
          More articles coming soon — follow us on{" "}
          <a href="https://instagram.com" className="text-joy-green hover:underline">Instagram</a>{" "}
          for updates.
        </p>
      </section>
    </>
  );
}
