"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, BadgeCheck } from "lucide-react";

import Marquee from "@/components/ui/Marquee";
import SafeImage from "@/components/ui/SafeImage";
import { brands, type Brand } from "@/data/brands";

interface BrandsSectionProps {
  onBook: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Split the brand list into three roughly equal rows. */
const third = Math.ceil(brands.length / 3);
const ROWS: { items: Brand[]; direction: "left" | "right"; duration: number }[] = [
  { items: brands.slice(0, third), direction: "left", duration: 45 },
  { items: brands.slice(third, third * 2), direction: "right", duration: 50 },
  { items: brands.slice(third * 2), direction: "left", duration: 42 },
];

/** Text logo — last resort when no logo image loads. */
function Wordmark({ name }: { name: string }) {
  return (
    <span className="px-1.5 text-center text-[11px] font-extrabold uppercase leading-tight tracking-wide text-[#082F59] sm:text-xs">
      {name}
    </span>
  );
}

/** Logo tile from /public/images/brands — the brand name shows as text only if the file is missing. */
function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <span className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_24px_-12px_rgba(8,47,89,0.25)] sm:h-24 sm:w-24">
      <span className="relative flex h-14 w-14 items-center justify-center sm:h-[72px] sm:w-[72px]">
        <SafeImage
          src={brand.logo}
          alt=""
          fill
          sizes="72px"
          // eager: lazy loading leaves blank tiles in a moving marquee
          loading="eager"
          className="object-contain"
          fallback={
            <span className="absolute -inset-2 flex items-center justify-center">
              <Wordmark name={brand.name} />
            </span>
          }
        />
      </span>
    </span>
  );
}

function BrandPill({ brand }: { brand: Brand }) {
  return (
    // Logo only — the brand name stays available as a tooltip and for screen readers.
    <motion.div
      role="img"
      aria-label={brand.name}
      title={brand.name}
      whileHover={{ scale: 1.1, rotate: -3, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="shrink-0 py-2"
    >
      <BrandLogo brand={brand} />
    </motion.div>
  );
}

export default function BrandsSection({ onBook }: BrandsSectionProps) {
  return (
    <section
      id="brands"
      className="relative w-full scroll-mt-32 overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* soft brand glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#EAF4FC] blur-3xl" />

      <div className="site-container relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0872BB] shadow-xs">
            <BadgeCheck size={14} />
            Our automotive brands
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl lg:text-5xl">
            Experts in Every
            <span className="block text-[#0872BB]">Automotive Brand.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
            From luxury European vehicles to Japanese and American automobiles, our experts deliver professional care
            for all leading automotive brands.
          </p>
        </motion.div>
      </div>

      {/* three marquee rows: left, right, left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative mt-14 flex flex-col gap-6 sm:gap-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-label="Car brands we service"
      >
        {ROWS.map((row, i) => (
          <Marquee key={i} direction={row.direction} duration={row.duration} gap={40}>
            {row.items.map((b) => (
              <BrandPill key={b.name} brand={b} />
            ))}
          </Marquee>
        ))}
      </motion.div>

      <div className="site-container relative">
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
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#0872BB] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(8,114,187,0.7)] transition-colors hover:bg-[#082F59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
          >
            Book a service for your car
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
