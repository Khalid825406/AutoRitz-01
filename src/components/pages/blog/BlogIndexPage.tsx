"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, CalendarDays, Tag } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/page/PageHero";
import { BLOG_POSTS, formatDate } from "@/data/pages/blog";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function BlogIndexPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Blog" }]}
        eyebrow="Blog"
        title="Our Latest News & Blog"
        description="Car care tips and advice from the Ritz Auto Care team in Dubai."
      />

      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {BLOG_POSTS.map((p) => {
              const ready = !!p.content;
              const card = (
                <>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#082F59] shadow-xs">
                      <Tag size={11} />
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <CalendarDays size={13} className="text-[#0872BB]" />
                      <time dateTime={p.date}>{formatDate(p.date)}</time>
                    </p>
                    <h2 className="mt-3 text-lg font-semibold leading-snug text-[#082F59]">{p.title}</h2>
                    <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-slate-600">{p.excerpt}</p>
                    <span
                      className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold ${
                        ready ? "text-[#0872BB]" : "text-slate-400"
                      }`}
                    >
                      {ready ? "Read More" : "Post coming soon"}
                      {ready && (
                        <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </span>
                  </div>
                </>
              );
              const cls =
                "group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_24px_48px_-20px_rgba(8,47,89,0.3)]";
              return (
                <motion.li key={p.slug} variants={fadeUp}>
                  {ready ? (
                    <Link
                      href={`/blog/${p.slug}/`}
                      className={`${cls} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]`}
                    >
                      {card}
                    </Link>
                  ) : (
                    <article className={cls}>{card}</article>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>
    </PageShell>
  );
}
