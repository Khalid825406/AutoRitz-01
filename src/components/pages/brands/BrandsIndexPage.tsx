"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import FaqSection from "@/components/page/FaqSection";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT, waLink } from "@/config/site";
import { GENERAL_FAQS } from "@/data/pages/common";
import { BRAND_PAGES } from "@/data/pages/brands";

export default function BrandsIndexPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Brands" }]}
        eyebrow="All brands & models"
        title="Brands"
        description="We Serve & Repair All Brands & Models"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(SITE_CONTACT.whatsapp, "Hi Ritz Auto Care, I'd like to book a service for my car.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <MessageCircle size={16} />
            Book on WhatsApp
          </a>
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone size={16} />
            Toll-Free {SITE_CONTACT.phone}
          </a>
        </div>
      </PageHero>

      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-[#082F59] sm:text-3xl">
              Brands we service <span className="text-[#0872BB]">({BRAND_PAGES.length})</span>
            </h2>
            <p className="text-[14px] text-slate-500">Pick your car brand.</p>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.02 } } }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {BRAND_PAGES.map((b) => {
              const ready = !!b.detail;
              const body = (
                <>
                  <span className="relative mx-auto block h-20 w-20 sm:h-24 sm:w-24">
                    <Image src={b.logo} alt="" fill sizes="96px" className="object-contain transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="mt-4 block text-center text-[15px] font-semibold text-[#082F59]">{b.name}</span>
                  <span
                    className={`mt-1 flex items-center justify-center gap-1 text-xs font-semibold ${
                      ready ? "text-[#0872BB]" : "text-slate-400"
                    }`}
                  >
                    {ready ? (
                      <>
                        View details
                        <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </>
                    ) : (
                      "Page coming soon"
                    )}
                  </span>
                </>
              );
              const cls =
                "group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_20px_40px_-18px_rgba(8,47,89,0.25)]";
              return (
                <motion.li
                  key={b.slug}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                >
                  {ready ? (
                    <Link
                      href={`/brands/${b.slug}/`}
                      className={`${cls} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]`}
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      <FaqSection items={GENERAL_FAQS} />
      <AppointmentSection />
    </PageShell>
  );
}
