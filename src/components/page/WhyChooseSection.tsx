"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Award, BadgeCheck, Eye, Gauge, Sparkles } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";

interface WhyChooseSectionProps {
  items: { title: string; text: string }[];
  /** Two photos shown beside the list (original "Quality Services" images). */
  images?: [string, string];
  title?: string;
  highlight?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const ICONS = [BadgeCheck, Eye, Gauge, Award];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** "WHY RITZ AUTO CARE" — features on the left, workshop photos on the right. */
export default function WhyChooseSection({
  items,
  images,
  title = "Why Ritz Auto Care",
  highlight = "Quality Services.",
}: WhyChooseSectionProps) {
  return (
    <section className="w-full bg-white py-20 sm:py-24">
      <div className={`site-container grid gap-14 ${images ? "lg:grid-cols-2 lg:items-center lg:gap-16" : ""}`}>
        <div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <SectionHeading
              align="left"
              eyebrow="Why choose us"
              icon={Sparkles}
              title={title}
              highlight={highlight}
            />
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {items.map((it, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.li
                  key={it.title}
                  variants={fadeUp}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_20px_40px_-18px_rgba(8,47,89,0.25)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#1766AE] to-[#082F59] text-white">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold text-[#082F59]">{it.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{it.text}</p>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {images && (
          <div className="relative grid grid-cols-2 gap-4">
            {images.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: i === 0 ? 30 : 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.15 }}
                className={`relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_24px_50px_-20px_rgba(8,47,89,0.4)] ${
                  i === 1 ? "mt-12" : ""
                }`}
              >
                <Image
                  src={src}
                  alt={i === 0 ? "Ritz Auto Care technician diagnosing an engine" : "Ritz Auto Care LLC workshop"}
                  fill
                  sizes="(min-width: 1024px) 25vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
