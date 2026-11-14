"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  ArrowUpRight,
  BadgeDollarSign,
  BrainCircuit,
  Cpu,
  Fuel,
  Gauge,
  Lightbulb,
  MessageCircle,
  PanelTop,
  Phone,
  ScanSearch,
  Sun,
  Wrench,
} from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import PageHero from "@/components/page/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_CONTACT, waLink } from "@/config/site";
import { AI_INSPECTION, BENEFITS, INSPECTION } from "@/data/pages/complimentary-vehicle-inspection";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const CHECK_ICONS = [Lightbulb, PanelTop, Sun, Cpu];
const BENEFIT_ICONS = [Fuel, Gauge, Wrench, BadgeDollarSign];
const BOOK_TEXT = "Hi Ritz Auto Care, I'd like to book a free vehicle inspection.";

export default function VehicleInspectionPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Free Vehicle Inspection" }]}
        eyebrow="Free · Every brand, every model"
        title="Complimentary Vehicle Inspection"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(SITE_CONTACT.whatsapp, BOOK_TEXT)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <MessageCircle size={16} />
            Book Free Inspection
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

      {/* ================= FREE CAR INSPECTION ================= */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0872BB] shadow-xs">
                <ScanSearch size={14} />
                What we check
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-[#082F59] sm:text-4xl">{INSPECTION.heading}</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">{INSPECTION.intro}</p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {INSPECTION.checks.map((c, i) => {
                const Icon = CHECK_ICONS[i];
                return (
                  <motion.li
                    key={c.title}
                    variants={fadeUp}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_rgba(8,47,89,0.25)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FC] text-[#0872BB] transition-colors group-hover:bg-[#0872BB] group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-[#082F59]">{c.title}</span>
                      {c.text && <span className="block text-[13px] text-slate-500">{c.text}</span>}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-28px_rgba(8,47,89,0.45)]"
          >
            <Image src={INSPECTION.image} alt="Technician running a computer inspection on a car" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#082F59] shadow-lg">
              <ScanSearch size={14} className="text-[#0872BB]" />
              Full View Inspection
            </span>
          </motion.div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
        <div className="site-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <SectionHeading
              eyebrow="Benefits"
              icon={Gauge}
              title="Benefits Of"
              highlight="Vehicle Inspection."
              description={BENEFITS.intro}
            />
          </motion.div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {BENEFITS.items.map((b, i) => {
                const Icon = BENEFIT_ICONS[i];
                return (
                  <motion.li
                    key={b.title}
                    variants={fadeUp}
                    className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(8,47,89,0.25)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#1766AE] to-[#082F59] text-white">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-5 text-[16px] font-semibold text-[#082F59]">{b.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{b.text}</p>
                  </motion.li>
                );
              })}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-[0_30px_60px_-28px_rgba(8,47,89,0.45)]"
            >
              <Image src={BENEFITS.image} alt="Computer diagnostics screen showing a car health report" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= AI-POWERED INSPECTION ================= */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-[#061E3B] via-[#082F59] to-[#0B477D] p-8 text-white sm:p-12 lg:p-14"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#1766AE]/40 blur-3xl" />
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]">
                  <BrainCircuit size={14} />
                  {AI_INSPECTION.subheading}
                </span>
                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">{AI_INSPECTION.heading}</h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#DCE8F2]/85">{AI_INSPECTION.text}</p>
              </div>
              <div className="flex lg:justify-end">
                <Link
                  href="/contact-us/"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
                >
                  {AI_INSPECTION.cta}
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AppointmentSection defaultService="Car Inspection" />
    </PageShell>
  );
}
