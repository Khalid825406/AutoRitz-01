"use client";

import Link from "@/i18n/Link";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowUpRight, CalendarDays, MessageCircle, Phone, Tag } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT, waLink } from "@/config/site";
import { BLOG_POSTS, formatDate, type BlogPost } from "@/data/pages/blog";

import RevealImage from "@/components/motion/RevealImage";
const EASE = [0.22, 1, 0.36, 1] as const;

/** Template for every /blog/<slug>/ post. */
export default function BlogPostPage({ post }: { post: BlogPost }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.content).slice(0, 3);

  return (
    <PageShell>
      {/* reading progress */}
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[10001] h-1 origin-left bg-[#3FA9F5]" />

      <PageHero breadcrumbs={[{ label: "Blog", href: "/blog/" }, { label: post.category }]} eyebrow={post.category} title={post.title}>
        <p className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#D9DEE5]/80">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={15} className="text-[#4B9DE0]" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Tag size={15} className="text-[#4B9DE0]" />
            {post.category}
          </span>
        </p>
      </PageHero>

      <section className="w-full bg-white py-12 sm:py-20">
        <div className="site-container grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="min-w-0"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(14, 17, 22,0.45)]">
              <RevealImage src={post.image} alt={post.title} fill priority sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover" />
            </div>

            <div className="mx-auto mt-8 sm:mt-10 max-w-3xl">
              {post.content?.map((b, i) =>
                b.type === "h2" ? (
                  <h2 key={i} className="mt-8 sm:mt-10 scroll-mt-32 text-2xl font-bold tracking-tight text-[#0E1116]">
                    {b.text}
                  </h2>
                ) : (
                  <p key={i} className={`text-base leading-[1.8] text-slate-700 ${i === 0 ? "text-[17px] font-medium text-slate-800" : "mt-4"}`}>
                    {b.text}
                  </p>
                ),
              )}

              <Link
                href="/blog/"
                className="mt-8 sm:mt-12 inline-flex items-center gap-2 text-sm font-semibold text-[#0563B4] hover:text-[#0E1116]"
              >
                <ArrowLeft size={16} />
                Back to all posts
              </Link>
            </div>
          </motion.article>

          {/* sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start">
            <div className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-[#07090C] via-[#0E1116] to-[#1B2029] p-7 text-white">
              <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-radial from-[#0B6FC2]/40 to-transparent to-70%" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7cc0f5]">Need help?</p>
              <p className="mt-3 text-xl font-bold leading-snug">Talk to our technicians today.</p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={waLink(SITE_CONTACT.whatsapp, `Hi Ritz Auto Care, I read "${post.title}" and need help.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-[#0E1116] hover:bg-[#D9DEE5]"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${SITE_CONTACT.phone}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/25 text-sm font-semibold hover:bg-white/10"
                >
                  <Phone size={16} />
                  {SITE_CONTACT.phone}
                </a>
              </div>
            </div>

            {post.related && post.related.length > 0 && (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0563B4]">Related services</p>
                <ul className="mt-4 space-y-1">
                  {post.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-medium text-[#0E1116] hover:bg-[#F2F8FD] hover:text-[#0563B4]"
                      >
                        {r.label}
                        <ArrowUpRight size={15} className="text-slate-300 transition-colors group-hover:text-[#0563B4]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {more.length > 0 && (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0563B4]">More posts</p>
                <ul className="mt-4 space-y-4">
                  {more.map((m) => (
                    <li key={m.slug}>
                      <Link href={`/blog/${m.slug}/`} className="text-[15px] font-medium leading-snug text-[#0E1116] hover:text-[#0563B4]">
                        {m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
