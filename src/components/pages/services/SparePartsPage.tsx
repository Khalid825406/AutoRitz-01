"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import {
  BadgeCheck,
  CarFront,
  Cog,
  Disc3,
  Droplets,
  MessageCircle,
  Phone,
  Settings2,
  Snowflake,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import PageHero from "@/components/page/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_CONTACT, waLink } from "@/config/site";
import { SPARE_PARTS } from "@/data/pages/auto-spare-parts";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const ICONS: Record<(typeof SPARE_PARTS.items)[number]["key"], LucideIcon> = {
  oem: BadgeCheck,
  engine: Settings2,
  brake: Disc3,
  suspension: Wrench,
  electrical: Zap,
  ac: Snowflake,
  transmission: Cog,
  body: CarFront,
  filters: Droplets,
};

const ENQUIRY = "Hi Ritz Auto Care, I'm looking for a spare part for my car.";

export default function SparePartsPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Services", href: "/service/" }, { label: SPARE_PARTS.title }]}
        eyebrow="Parts trading"
        title={SPARE_PARTS.title}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <Phone size={16} />
            Free Call : {SITE_CONTACT.phone}
          </a>
          <a
            href={waLink(SITE_CONTACT.whatsapp, ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle size={16} />
            Ask for a part on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* ================= INTRO ================= */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl">
              OEM & Aftermarket Parts <span className="block text-[#0872BB]">for Every Make & Model.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{SPARE_PARTS.intro}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-[0_30px_60px_-28px_rgba(8,47,89,0.45)]"
          >
            <Image src={SPARE_PARTS.heroImage} alt={SPARE_PARTS.title} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ================= PARTS WE SUPPLY ================= */}
      <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
        <div className="site-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <SectionHeading eyebrow="What we supply" icon={Cog} title="Our Auto Spare Parts &" highlight="Trading Services Include." />
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SPARE_PARTS.items.map((it) => {
              const Icon = ICONS[it.key];
              return (
                <motion.li
                  key={it.key}
                  variants={fadeUp}
                  className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_20px_40px_-18px_rgba(8,47,89,0.25)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FC] text-[#0872BB] transition-colors duration-300 group-hover:bg-[#0872BB] group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold text-[#082F59]">{it.title}</span>
                    <span className="mt-1.5 block text-[14px] leading-relaxed text-slate-600">{it.text}</span>
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* CTA band with second original photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-14 grid overflow-hidden rounded-3xl bg-linear-to-br from-[#061E3B] via-[#082F59] to-[#0B477D] text-white md:grid-cols-2"
          >
            <div className="relative min-h-[240px]">
              <Image src={SPARE_PARTS.sideImage} alt="Mechanic sorting auto spare parts" fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7cc0f5]">Need a part?</p>
              <p className="mt-3 text-2xl font-bold leading-snug">Send us your car&apos;s make, model and year — we&apos;ll find the right part.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${SITE_CONTACT.phone}`}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
                >
                  <Phone size={16} />
                  Free Call : {SITE_CONTACT.phone}
                </a>
                <a
                  href={waLink(SITE_CONTACT.whatsapp, ENQUIRY)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AppointmentSection defaultService="Other Service" />
    </PageShell>
  );
}
