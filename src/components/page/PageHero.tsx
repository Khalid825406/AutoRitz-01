"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  /** Second line, in brand blue. */
  highlight?: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Optional content under the heading (cards, buttons…). */
  children?: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Navy banner used at the top of every inner page. */
export default function PageHero({ eyebrow, title, highlight, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="w-full bg-white pt-6 sm:pt-8">
      <div className="site-container">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#082F59] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-[#1766AE]/40 blur-3xl" />

          <motion.div variants={stagger} initial="hidden" animate="show">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <motion.nav variants={item} aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
                  <li>
                    <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-white">
                      <Home size={13} />
                      Home
                    </Link>
                  </li>
                  {breadcrumbs.map((c) => (
                    <li key={c.label} className="flex items-center gap-1.5">
                      <ChevronRight size={13} className="text-white/35" />
                      {c.href ? (
                        <Link href={c.href} className="transition-colors hover:text-white">
                          {c.label}
                        </Link>
                      ) : (
                        <span aria-current="page" className="font-medium text-white">
                          {c.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </motion.nav>
            )}

            {eyebrow && (
              <motion.span
                variants={item}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]"
              >
                {eyebrow}
              </motion.span>
            )}

            <motion.h1
              variants={item}
              className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {title}
              {highlight && <span className="block text-[#4B9DE0]">{highlight}</span>}
            </motion.h1>

            {description && (
              <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-[#DCE8F2]/85 sm:text-lg">
                {description}
              </motion.p>
            )}

            {children && <motion.div variants={item}>{children}</motion.div>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
