"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { BadgeCheck } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import { BRAND_PAGES } from "@/data/pages/brands";

const EASE = [0.22, 1, 0.36, 1] as const;

/** "Trusted By Luxury Car Owners" — the 45 brand logos of the original site; built brand pages are linked. */
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
  return (
    <section className="w-full bg-white py-20 sm:py-24">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
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

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.015 } } }}
          className="mt-12 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-9"
          aria-label="Car brands we service"
        >
          {BRAND_PAGES.map((b) => {
            const tile = (
              <span className="relative block h-full w-full">
                <Image src={b.logo} alt={b.name} fill sizes="96px" className="object-contain" />
              </span>
            );
            return (
              <motion.li
                key={b.slug}
                variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 0.35 } } }}
                title={b.name}
                className="aspect-square rounded-2xl border border-slate-200/80 bg-white transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-12px_rgba(8,47,89,0.3)]"
              >
                {b.detail ? (
                  <Link href={`/brands/${b.slug}/`} className="block h-full w-full rounded-2xl p-3 focus-visible:outline-2 focus-visible:outline-[#0872BB]">
                    {tile}
                  </Link>
                ) : (
                  <span className="block h-full w-full p-3">{tile}</span>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
