import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BrandDetailPage from "@/components/pages/brands/BrandDetailPage";
import { BRAND_PAGES, getBrandPage } from "@/data/pages/brands";

type Params = { slug: string };

/** Only brands with content get a page; the rest are added one by one. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return BRAND_PAGES.filter((b) => b.detail).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBrandPage(slug);
  if (!b?.detail) return {};
  return {
    title: `${b.name} - Ritz Auto Care Car Garage Dubai, UAE`,
    description: b.detail.metaDescription,
    alternates: { canonical: `/brands/${b.slug}/` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const b = getBrandPage(slug);
  if (!b?.detail) notFound();
  return <BrandDetailPage name={b.name} logo={b.logo} detail={b.detail} />;
}
