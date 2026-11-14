"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Check, Phone, Quote, Users } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import PageHero from "@/components/page/PageHero";
import TrustedBrandsSection from "@/components/page/TrustedBrandsSection";
import WhyChooseSection from "@/components/page/WhyChooseSection";
import { SITE_CONTACT } from "@/config/site";
import { QUALITY_IMAGES, WHY_US } from "@/data/pages/common";
import { ABOUT, CEO, EXPERT_CARE } from "@/data/pages/about-us";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** "+971567807979" → "+971 567 807979" (as shown on the original page) */
const displayPhone = `+${SITE_CONTACT.whatsapp.slice(0, 3)} ${SITE_CONTACT.whatsapp.slice(3, 6)} ${SITE_CONTACT.whatsapp.slice(6)}`;

export default function AboutUsPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "About Us" }]}
        eyebrow="Ritz Auto Care LLC"
        title="About Us"
        description="Premium Car — Premium Care. Professional car repair & maintenance in Dubai."
      />

      {/* ================= WHO WE ARE ================= */}
      <section className="w-full overflow-hidden bg-white py-20 sm:py-24">
        <div className="site-container grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* photo collage */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative aspect-square w-[78%] overflow-hidden rounded-3xl shadow-[0_30px_60px_-28px_rgba(8,47,89,0.45)]"
            >
              <Image src={ABOUT.images[0]} alt="Inside the Ritz Auto Care workshop" fill sizes="(min-width: 1024px) 35vw, 75vw" className="object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="absolute bottom-[-8%] right-0 aspect-[3/4] w-[46%] overflow-hidden rounded-3xl border-[6px] border-white shadow-[0_30px_60px_-24px_rgba(8,47,89,0.5)]"
            >
              <Image src={ABOUT.images[1]} alt="Ritz Auto Care LLC building in Dubai" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
            </motion.div>
          </div>

          {/* text */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="pt-6 lg:pt-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0872BB] shadow-xs">
              <Users size={14} />
              {ABOUT.eyebrow}
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl lg:text-5xl">
              {ABOUT.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{ABOUT.text}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {ABOUT.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-[#082F59]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0872BB] text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <a
              href={`tel:+${SITE_CONTACT.whatsapp}`}
              className="group mt-10 inline-flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-[#F7FAFD] p-4 pr-6 transition-colors hover:border-[#0872BB]/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#1766AE] to-[#082F59] text-white">
                <Phone size={20} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{ABOUT.callLabel}</span>
                <span className="block text-lg font-bold text-[#082F59]">{displayPhone}</span>
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= CEO MESSAGE ================= */}
      <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
        <div className="site-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_30px_60px_-30px_rgba(8,47,89,0.3)] md:grid-cols-[0.75fr_1.25fr]"
          >
            <div className="relative aspect-[4/5] bg-white md:aspect-auto md:min-h-[440px]">
              <Image src={CEO.image} alt={`${CEO.name}, ${CEO.role}`} fill sizes="(min-width: 768px) 35vw, 90vw" className="object-cover object-top" />
            </div>
            <div className="relative flex flex-col justify-center p-8 sm:p-12">
              <Quote size={56} className="text-[#EAF4FC]" fill="currentColor" strokeWidth={0} />
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0872BB]">Message from the CEO</p>
              <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-slate-700">
                {CEO.message.map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </div>
              <div className="mt-8 border-t border-slate-100 pt-6">
                <p className="text-xl font-bold text-[#082F59]">{CEO.name}</p>
                <p className="text-sm text-slate-500">{CEO.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <WhyChooseSection items={WHY_US} images={QUALITY_IMAGES} />

      <TrustedBrandsSection
        eyebrow="Quality services"
        title={EXPERT_CARE.heading}
        highlight={EXPERT_CARE.highlight}
        description={EXPERT_CARE.text}
      />

      <AppointmentSection />
    </PageShell>
  );
}
