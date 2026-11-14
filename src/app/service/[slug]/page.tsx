import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceDetailPage from "@/components/pages/services/ServiceDetailPage";
import { SERVICES, getService } from "@/data/pages/services";

type Params = { slug: string };

/** Only services with content get a page; the rest are added one by one. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return SERVICES.filter((s) => s.detail).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s?.detail) return {};
  return {
    title: `${s.title} - Ritz Auto Care Car Garage Dubai, UAE`,
    description: s.detail.metaDescription,
    alternates: { canonical: `/service/${s.slug}/` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s?.detail) notFound();
  return <ServiceDetailPage slug={s.slug} title={s.title} detail={s.detail} />;
}
