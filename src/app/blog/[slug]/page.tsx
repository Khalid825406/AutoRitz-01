import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostPage from "@/components/pages/blog/BlogPostPage";
import { BLOG_POSTS, getBlogPost } from "@/data/pages/blog";

type Params = { slug: string };

/** Only posts with content get a page; the rest are added one by one. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return BLOG_POSTS.filter((p) => p.content).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p?.content) return {};
  return {
    title: `${p.title} - Ritz Auto Care Car Garage Dubai, UAE`,
    description: p.metaDescription ?? p.excerpt,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: { type: "article", publishedTime: p.date, images: [p.image] },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p?.content) notFound();
  return <BlogPostPage post={p} />;
}
