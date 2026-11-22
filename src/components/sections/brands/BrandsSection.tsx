"use client";

import { motion, type Variants } from "motion/react";
import { BadgeCheck } from "lucide-react";

import Marquee from "@/components/ui/Marquee";
import SafeImage from "@/components/ui/SafeImage";
import { brands, type Brand } from "@/data/brands";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
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
    <span className="px-1.5 text-center text-[11px] font-extrabold uppercase leading-tight tracking-wide text-[#0E1116] sm:text-xs">
      {name}
    </span>
  );
}

/** Logo tile from /public/images/brands — the brand name shows as text only if the file is missing. */
function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <span className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_24px_-12px_rgba(14, 17, 22,0.25)] sm:h-24 sm:w-24">
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

export default function BrandsSection() {
  return (
    <section
      id="brands"
      className="relative w-full scroll-mt-32 overflow-hidden bg-white section-y"
    >
      <div className="site-container relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={REVEAL_VIEWPORT}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0563B4] shadow-xs">
            <BadgeCheck size={14} />
            Our automotive brands
          </span>
          <TextReveal className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#0E1116] sm:text-4xl lg:text-5xl">
            Experts in Every
            <span className="block text-[#0563B4]">Automotive Brand.</span>
          </TextReveal>
          <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
            From luxury European vehicles to Japanese and American automobiles, our Dubai experts deliver professional care for all leading automotive brands.
          </p>
        </motion.div>
      </div>

      {/* three marquee rows: left, right, left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: 0.8 }}
        className="relative mt-10 sm:mt-14 flex flex-col gap-6 sm:gap-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-label="Car brands we service"
        dir="ltr"
      >
        {ROWS.map((row, i) => (
          <Marquee key={i} direction={row.direction} duration={row.duration} gap={40}>
            {row.items.map((b) => (
              <BrandPill key={b.name} brand={b} />
            ))}
          </Marquee>
        ))}
      </motion.div>
    </section>
  );
}
