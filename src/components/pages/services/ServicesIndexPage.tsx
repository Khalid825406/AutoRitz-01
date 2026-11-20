"use client";

import { Suspense } from "react";
import Link from "@/i18n/Link";
import { useSearchParams } from "next/navigation";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Mail, MessageCircle, Phone, SearchX, Wrench, X } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT, waLink } from "@/config/site";
import { SERVICES, type ServiceItem } from "@/data/pages/services";
import { DEFAULT_SERVICE_ICON, SERVICE_ICONS } from "./serviceIcons";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Services whose title contains every word typed in the header search (e.g. "battery", "ac repair"). */
function matchServices(query: string): ServiceItem[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return SERVICES;
  return SERVICES.filter((s) => {
    const hay = `${s.title} ${s.slug.replace(/-/g, " ")}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

export default function ServicesIndexPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Services" }]}
        eyebrow="Auto Care Solutions"
        title="Services"
        description="Complete Auto Care Solutions Under One Roof"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(SITE_CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#0E1116] transition-colors hover:bg-[#D9DEE5]"
          >
            <MessageCircle size={16} />+{SITE_CONTACT.whatsapp}
          </a>
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone size={16} />
            {SITE_CONTACT.phone}
          </a>
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Mail size={16} />
            {SITE_CONTACT.email}
          </a>
        </div>
      </PageHero>

      <section id="all-services" className="w-full scroll-mt-32 bg-white py-12 sm:py-24">
        <div className="site-container">
          {/* The static HTML shows every service; the header search (?q=…) filters it in the browser. */}
          <Suspense fallback={<ServiceGrid items={SERVICES} />}>
            <SearchableServiceGrid />
          </Suspense>

          <p className="mt-8 sm:mt-10 flex items-center justify-center gap-2 text-center text-[14px] text-slate-500">
            <Wrench size={15} className="text-[#0563B4]" />
            Don&apos;t see what you need? Call {SITE_CONTACT.phone} — we likely do it.
          </p>
        </div>
      </section>

      <AppointmentSection />
    </PageShell>
  );
}

function SearchableServiceGrid() {
  const query = (useSearchParams().get("q") ?? "").trim();
  return <ServiceGrid items={matchServices(query)} query={query} />;
}

function ServiceGrid({ items, query = "" }: { items: ServiceItem[]; query?: string }) {
  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <TextReveal key={query} className="text-2xl font-bold tracking-tight text-[#0E1116] sm:text-3xl">
          {query ? "Results" : "All services"} <span className="text-[#0563B4]">({items.length})</span>
        </TextReveal>
        {query ? (
          <p className="flex flex-wrap items-center gap-2 text-[14px] text-slate-500">
            Showing services matching
            <span className="font-semibold text-[#0E1116]">“{query}”</span>
            <Link
              href="/service/"
              scroll={false}
              className="inline-flex items-center gap-1 rounded-full bg-[#EAF4FC] px-3 py-1.5 text-xs font-semibold text-[#0563B4] transition-colors hover:bg-[#0563B4] hover:text-white"
            >
              <X size={13} />
              Show all
            </Link>
          </p>
        ) : (
          <p className="text-[14px] text-slate-500">Pick a service to see how we do it.</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-8 sm:mt-10 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center">
          <SearchX size={36} className="text-[#0563B4]" />
          <p className="mt-4 text-[15px] font-semibold text-[#0E1116]">No service matches “{query}”</p>
          <p className="mt-1 max-w-md text-[14px] text-slate-600">
            We may still be able to help — call {SITE_CONTACT.phone} or browse all our services.
          </p>
          <Link
            href="/service/"
            scroll={false}
            className="mt-6 inline-flex h-11 items-center rounded-full bg-[#0563B4] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0E1116]"
          >
            View all services
          </Link>
        </div>
      ) : (
        <motion.ul
          key={query}
          initial="hidden"
          whileInView="show"
          viewport={REVEAL_VIEWPORT}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {items.map((s) => {
            const Icon = SERVICE_ICONS[s.slug] ?? DEFAULT_SERVICE_ICON;
            const ready = !!s.detail;
            const number = SERVICES.indexOf(s) + 1;
            const body = (
              <>
                <span className="pointer-events-none absolute right-5 top-4 text-4xl font-bold leading-none text-slate-100 tabular-nums transition-colors group-hover:text-[#EAF4FC]">
                  {String(number).padStart(2, "0")}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4FC] text-[#0563B4] transition-colors duration-300 group-hover:bg-[#0563B4] group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="relative mt-5 text-[17px] font-semibold leading-snug text-[#0E1116]">{s.title}</h3>
                <span
                  className={`relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold ${
                    ready ? "text-[#0563B4]" : "text-slate-400"
                  }`}
                >
                  {ready ? "View Details" : "Page coming soon"}
                  {ready && (
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  )}
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-[#0563B4] to-[#3FA9F5] transition-transform duration-500 group-hover:scale-x-100" />
              </>
            );
            const cls =
              "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0563B4]/30 hover:shadow-[0_20px_40px_-18px_rgba(14, 17, 22,0.25)]";
            return (
              <motion.li
                key={s.slug}
                variants={fadeUp}
                // header menu links land here: /service/#service-<slug> scrolls to the card and highlights it
                id={`service-${s.slug}`}
                className="scroll-mt-40 rounded-2xl target:ring-4 target:ring-[#0563B4]/40"
              >
                {ready ? (
                  <Link href={`/service/${s.slug}/`} className={`${cls} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]`}>
                    {body}
                  </Link>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </>
  );
}
