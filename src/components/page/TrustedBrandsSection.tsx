"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/i18n/Link";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import BrandCategoryTabs, { ALL_BRANDS, BrandGroupHeading } from "@/components/page/BrandCategoryTabs";
import { BRAND_MENU, type BrandMenuGroup } from "@/data/pages/brand-menu";

import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
const EASE = [0.22, 1, 0.36, 1] as const;

/** "Trusted By Luxury Car Owners" — every brand we service, grouped by home country (German, Japanese…). */
interface TrustedBrandsSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
}


export default function TrustedBrandsSection({
  eyebrow = "What our customers say",
  title = "Trusted By Luxury",
  highlight = "Car Owners.",
  description = "We proudly service premium and luxury vehicles.",
}: TrustedBrandsSectionProps) {
  const [tab, setTab] = useState<string>(ALL_BRANDS);
  const groups = tab === ALL_BRANDS ? BRAND_MENU : BRAND_MENU.filter((g) => g.nationality === tab);

  return (
    <section className="w-full bg-white py-12 sm:py-24">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading
            eyebrow={eyebrow}
            icon={BadgeCheck}
            title={title}
            highlight={highlight}
            description={description}
          />
        </motion.div>

        {/* category tabs — scroll sideways on phones */}
        <BrandCategoryTabs value={tab} onChange={setTab} layoutId="trusted-brands-tab" className="mt-8 sm:mt-10" />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-8 space-y-8 sm:mt-10 sm:space-y-10"
          >
            {groups.map((g) => (
              <BrandGroup key={g.label} group={g} showHeading={tab === ALL_BRANDS} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function BrandGroup({ group, showHeading }: { group: BrandMenuGroup; showHeading: boolean }) {
  return (
    <div>
      {showHeading && <BrandGroupHeading label={group.label} count={group.brands.length} />}
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={REVEAL_VIEWPORT}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
        className="grid grid-cols-4 gap-2.5 sm:grid-cols-6 sm:gap-3 lg:grid-cols-9"
        aria-label={group.label}
      >
        {group.brands.map((b) => (
          <motion.li
            key={b.slug}
            variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 0.35 } } }}
            className="aspect-square rounded-2xl border border-slate-200/80 bg-white transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0563B4]/30 hover:shadow-[0_12px_24px_-12px_rgba(14, 17, 22,0.3)]"
          >
            <Link
              href={b.href}
              title={b.name}
              className="block h-full w-full rounded-2xl p-2.5 focus-visible:outline-2 focus-visible:outline-[#0563B4] sm:p-3"
            >
              <span className="relative block h-full w-full">
                <Image src={b.logo} alt={b.name} fill sizes="96px" className="object-contain" />
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
