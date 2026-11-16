"use client";

import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useLang } from "@/lib/lang-context";
import type { BlogPost } from "@/lib/mock-data";

const sizedImg = (url: string, w: number) => (url.includes("cdn.sanity.io") ? `${url}?w=${w}&auto=format&q=75` : url);

/** Cách hiển thị nội dung soạn trong Sanity (chữ, tiêu đề, trích dẫn, danh sách, link, ảnh) — cùng kiểu với bài viết sẵn trong code */
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5 text-joy-ink/85">{children}</p>,
    h2: ({ children }) => <h2 className="font-serif text-3xl sm:text-[2.1rem] font-medium leading-tight text-joy-ink mt-10 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-2xl font-medium leading-tight text-joy-ink mt-8 mb-2">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="my-7 pl-5 border-l-2 border-joy-green font-serif text-2xl leading-snug text-joy-ink">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 border-t border-joy-border">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 pl-6 list-decimal space-y-2 text-joy-ink/85">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-7 py-3 border-b border-joy-border text-joy-ink/85">
        <span className="absolute left-1 top-[1.35rem] w-2 h-2 rounded-full bg-joy-green" />{children}
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-joy-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const internal = href.startsWith("/") || href.includes("joystay.vn");
      return internal
        ? <Link href={href.replace(/^https?:\/\/(www\.)?joystay\.vn/, "") || "/"} className="text-joy-green-dark underline underline-offset-4">{children}</Link>
        : <a href={href} target="_blank" rel="noopener noreferrer" className="text-joy-green-dark underline underline-offset-4">{children}</a>;
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.url) return null;
      const d = value.dims as { width?: number; height?: number } | undefined;
      // Ảnh dọc/vuông: thu hẹp lại để không chiếm hết màn hình
      const narrow = !!d?.width && !!d?.height && d.width / d.height < 1.15;
      return (
        <figure className={`my-8 ${narrow ? "max-w-md mx-auto" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sizedImg(value.url, 1400)} alt={value.alt ?? ""} loading="lazy"
               width={d?.width} height={d?.height}
               className="w-full h-auto rounded-[1.5rem] bg-joy-warm" />
          {value.caption && <figcaption className="mt-2 text-center text-sm text-joy-muted">{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

function BookCard({ lang }: { lang: "en" | "vi" }) {
  return (
    <div className="mt-12 rounded-[2rem] bg-joy-warm border border-joy-border p-7 sm:p-9">
      <p className="font-serif text-2xl sm:text-3xl text-joy-ink leading-tight">
        {lang === "en" ? "Stay at Joystay, District 3." : "Ở lại Joystay, Quận 3."}
      </p>
      <p className="mt-2 text-joy-muted text-base">
        {lang === "en" ? "6 art rooms, self check-in 24/7. Book direct with no platform fees." : "6 phòng nghệ thuật, tự check-in 24/7. Đặt trực tiếp, không mất phí nền tảng."}
      </p>
      <Link href="/availability" className="btn-primary mt-5">{lang === "en" ? "Check availability" : "Xem lịch trống"}</Link>
    </div>
  );
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { lang } = useLang();

  const title = lang === "en" ? (post.titleEn || post.title) : post.title;
  const excerpt = lang === "en" ? (post.excerptEn || post.excerpt) : post.excerpt;
  const category = lang === "en" ? (post.categoryEn || post.category) : post.category;
  const art = post.article;
  const sized = sizedImg;
  // Bài soạn trong Sanity: có bản English thì dùng khi xem tiếng Anh, không thì hiện bản tiếng Việt
  const cmsBody = (lang === "en" && post.bodyEn?.length ? post.bodyEn : post.body) as Parameters<typeof PortableText>[0]["value"] | null | undefined;
  const hasCmsBody = Array.isArray(cmsBody) && cmsBody.length > 0;

  return (
    <>
      {/* Hero */}
      <section className={`relative bg-joy-charcoal bg-gradient-to-br ${post.gradient ?? "from-joy-charcoal to-joy-ink"} pt-28 sm:pt-32 pb-32 sm:pb-36 px-5 sm:px-8 overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem]`}>
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
          {post.featuredImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={sized(post.featuredImage, 1400)} alt={post.imageAlt || title} className="w-full aspect-[16/9] object-cover rounded-[2rem] bg-joy-warm -mt-24 sm:-mt-28 relative shadow-xl mb-10" />
          )}

          {art ? (
            <article className="font-sans text-joy-ink text-[17px] leading-[1.75]">
              {art.body.map((b, i) => {
                if ("h" in b) return <h2 key={i} className="font-serif text-3xl sm:text-[2.1rem] font-medium leading-tight text-joy-ink mt-10 mb-3">{b.h[lang]}</h2>;
                if ("p" in b) return <p key={i} className="mb-5 text-joy-ink/85">{b.p[lang]}</p>;
                if ("ul" in b) return (
                  <ul key={i} className="mb-6 border-t border-joy-border">
                    {b.ul.map((li, j) => (
                      <li key={j} className="relative pl-7 py-3 border-b border-joy-border text-joy-ink/85">
                        <span className="absolute left-1 top-[1.35rem] w-2 h-2 rounded-full bg-joy-green" />{li[lang]}
                      </li>
                    ))}
                  </ul>
                );
                return <p key={i} className="my-6"><Link href={b.link.href} className="link-line text-base">{b.link.label[lang]} →</Link></p>;
              })}

              {art.faq && art.faq.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-serif text-3xl font-medium text-joy-ink mb-4">{lang === "en" ? "Frequently asked questions" : "Câu hỏi thường gặp"}</h2>
                  <div className="border-t border-joy-border">
                    {art.faq.map((f, i) => (
                      <details key={i} className="group border-b border-joy-border" open={i === 0}>
                        <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-semibold [&::-webkit-details-marker]:hidden">
                          {f.q[lang]}
                          <span className="font-serif text-2xl leading-none text-joy-green-dark transition-transform duration-200 group-open:rotate-45">+</span>
                        </summary>
                        <p className="pb-5 text-joy-muted">{f.a[lang]}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              <BookCard lang={lang} />
            </article>
          ) : hasCmsBody ? (
            <article className="font-sans text-joy-ink text-[17px] leading-[1.75]">
              <PortableText value={cmsBody!} components={ptComponents} />
              <BookCard lang={lang} />
            </article>
          ) : (
            <p className="font-sans text-lg text-joy-ink/85 leading-relaxed">{excerpt}</p>
          )}

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
