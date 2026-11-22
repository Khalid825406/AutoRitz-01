"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";

import BrandOriginsMap from "./BrandOriginsMap";
import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import BrandCategoryTabs, { ALL_BRANDS, BrandGroupHeading } from "@/components/page/BrandCategoryTabs";
import FaqSection from "@/components/page/FaqSection";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT, waLink } from "@/config/site";
import { GENERAL_FAQS } from "@/data/pages/common";
import { BRAND_COUNT, BRAND_MENU, type BrandMenuItem } from "@/data/pages/brand-menu";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
export default function BrandsIndexPage() {
  const [tab, setTab] = useState<string>(ALL_BRANDS);
  const groups = tab === ALL_BRANDS ? BRAND_MENU : BRAND_MENU.filter((g) => g.nationality === tab);

  // Links like /brands/#brand-toyota (header Brands menu) must always find their logo: if a category tab
  // is open, switch back to "All brands" before the link scrolls to it.
  useEffect(() => {
    let timer = 0;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href*="#brand-"]');
      if (!link) return;
      setTab(ALL_BRANDS);
      // the full list appears after the tab's fade — wait for the brand's tile, then bring it into view
      const id = (link.getAttribute("href") ?? "").split("#")[1];
      window.clearTimeout(timer);
      let tries = 0;
      const reveal = () => {
        const el = document.getElementById(id);
        if (el) {
          // instant (a smooth scroll gets cut off by the router's own hash scroll), then once more after the
          // tiles' reveal animations have settled the layout
          el.scrollIntoView({ behavior: "instant", block: "center" });
          timer = window.setTimeout(() => el.scrollIntoView({ behavior: "instant", block: "center" }), 400);
        } else if (++tries < 20) timer = window.setTimeout(reveal, 80);
      };
      timer = window.setTimeout(reveal, 300);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(timer);
    };
  }, []);

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
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#0E1116] transition-colors hover:bg-[#D9DEE5]"
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

      <section className="w-full bg-white section-y">
        <div className="site-container">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <TextReveal className="text-2xl font-bold tracking-tight text-[#0E1116] sm:text-3xl">
              Brands we service <span className="text-[#0563B4]">({BRAND_COUNT})</span>
            </TextReveal>
            <p className="text-[14px] text-slate-500">Pick your car brand.</p>
          </div>

          {/* same categories as the header menu and the "Trusted by" section */}
          <BrandCategoryTabs value={tab} onChange={setTab} layoutId="brands-page-tab" className="mt-8 sm:mt-10 sm:justify-start" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-8 space-y-10 sm:mt-10 sm:space-y-12"
            >
              {groups.map((g) => (
                <div key={g.label}>
                  {tab === ALL_BRANDS && <BrandGroupHeading label={g.label} count={g.brands.length} />}
                  <motion.ul
                    initial="hidden"
                    whileInView="show"
                    viewport={REVEAL_VIEWPORT}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                    aria-label={g.label}
                  >
                    {g.brands.map((b) => (
                      <BrandTile key={b.slug} b={b} />
                    ))}
                  </motion.ul>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <BrandOriginsMap />

      <FaqSection items={GENERAL_FAQS} />
      <AppointmentSection />
    </PageShell>
  );
}

/** Logo card. Brands with their own page link to it; the others show "Page coming soon". */
function BrandTile({ b }: { b: BrandMenuItem }) {
  const body = (
    <>
      <span className="relative mx-auto block h-16 w-16 sm:h-24 sm:w-24">
        <Image src={b.logo} alt="" fill sizes="96px" className="object-contain transition-transform duration-500 group-hover:scale-110" />
      </span>
      <span className="mt-3 block text-center text-[14px] font-semibold text-[#0E1116] sm:mt-4 sm:text-[15px]">{b.name}</span>
      <span className={`mt-1 flex items-center justify-center gap-1 text-xs font-semibold ${b.hasPage ? "text-[#0563B4]" : "text-slate-400"}`}>
        {b.hasPage ? (
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
    "group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-4 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0563B4]/30 hover:shadow-[0_20px_40px_-18px_rgba(14, 17, 22,0.25)] sm:p-5";
  return (
    <motion.li
      // header menu links land here: /brands/#brand-<slug> scrolls to the logo and highlights it
      id={`brand-${b.slug}`}
      className="scroll-mt-40 rounded-2xl target:ring-4 target:ring-[#0563B4]/40"
      variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
    >
      {b.hasPage ? (
        <Link href={b.href} className={`${cls} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]`}>
          {body}
        </Link>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </motion.li>
  );
}
