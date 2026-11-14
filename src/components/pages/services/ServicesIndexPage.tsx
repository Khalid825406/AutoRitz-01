"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Mail, MessageCircle, Phone, Wrench } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT, waLink } from "@/config/site";
import { SERVICES } from "@/data/pages/services";
import { DEFAULT_SERVICE_ICON, SERVICE_ICONS } from "./serviceIcons";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

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
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
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

      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-[#082F59] sm:text-3xl">
              All services <span className="text-[#0872BB]">({SERVICES.length})</span>
            </h2>
            <p className="text-[14px] text-slate-500">Pick a service to see how we do it.</p>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[s.slug] ?? DEFAULT_SERVICE_ICON;
              const ready = !!s.detail;
              const body = (
                <>
                  <span className="pointer-events-none absolute right-5 top-4 text-4xl font-bold leading-none text-slate-100 tabular-nums transition-colors group-hover:text-[#EAF4FC]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4FC] text-[#0872BB] transition-colors duration-300 group-hover:bg-[#0872BB] group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <h3 className="relative mt-5 text-[17px] font-semibold leading-snug text-[#082F59]">{s.title}</h3>
                  <span
                    className={`relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold ${
                      ready ? "text-[#0872BB]" : "text-slate-400"
                    }`}
                  >
                    {ready ? "View Details" : "Page coming soon"}
                    {ready && (
                      <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </span>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-[#0872BB] to-[#3FA9F5] transition-transform duration-500 group-hover:scale-x-100" />
                </>
              );
              const cls =
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_20px_40px_-18px_rgba(8,47,89,0.25)]";
              return (
                <motion.li key={s.slug} variants={fadeUp}>
                  {ready ? (
                    <Link href={`/service/${s.slug}/`} className={`${cls} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]`}>
                      {body}
                    </Link>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>

          <p className="mt-10 flex items-center justify-center gap-2 text-center text-[14px] text-slate-500">
            <Wrench size={15} className="text-[#0872BB]" />
            Don&apos;t see what you need? Call {SITE_CONTACT.phone} — we likely do it.
          </p>
        </div>
      </section>

      <AppointmentSection />
    </PageShell>
  );
}
