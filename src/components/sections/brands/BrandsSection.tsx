"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, BadgeCheck } from "lucide-react";

import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { brands } from "@/data/brands";

interface BrandsSectionProps {
  onBook: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const tile: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

export default function BrandsSection({ onBook }: BrandsSectionProps) {
  return (
      <section id="brands" className="w-full scroll-mt-32 bg-white py-20 sm:py-24 lg:py-28">
        <div className="site-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <SectionHeading
              eyebrow="Our automotive brands"
              icon={BadgeCheck}
              title="Experts in Every"
              highlight="Automotive Brand."
              description="From luxury European vehicles to Japanese and American automobiles, our experts deliver professional care for all leading automotive brands."
            />
            <span className="mx-auto mt-8 block h-1 w-14 rounded-full bg-linear-to-r from-[#0872BB] to-[#3FA9F5]" />
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.02 } } }}
            className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-4"
            aria-label="Car brands we service"
          >
            {brands.map((b) => (
              <motion.li
                key={b.name}
                variants={tile}
                title={b.name}
                className="group relative flex aspect-square w-[calc((100%-2*0.75rem)/3)] items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(8,47,89,0.04)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_16px_32px_-12px_rgba(8,47,89,0.2)] sm:w-[calc((100%-4*1rem)/5)] lg:w-[calc((100%-9*1rem)/10)]"
              >
                <div className="relative h-full w-full">
                  <SafeImage
                    src={b.logo}
                    alt={b.name}
                    fill
                    sizes="120px"
                    className="object-contain transition-[filter,scale] duration-300 group-hover:scale-105"
                    fallback={
                      <span className="flex h-full w-full items-center justify-center text-center text-[11px] font-bold uppercase leading-tight tracking-wide text-[#082F59]/70 transition-colors group-hover:text-[#0872BB]">
                        {b.name}
                      </span>
                    }
                  />
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-14 flex flex-col items-center gap-4 text-center"
          >
            <p className="text-[15px] text-slate-600">
              Your vehicle deserves professional attention.{" "}
              <span className="font-semibold text-[#082F59]">Don&apos;t see your brand? Just ask us.</span>
            </p>
            <button
              type="button"
              onClick={() => onBook()}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#0872BB] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(8,114,187,0.6)] transition-colors hover:bg-[#082F59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
            >
              Book a service for your car
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>
  );
}
