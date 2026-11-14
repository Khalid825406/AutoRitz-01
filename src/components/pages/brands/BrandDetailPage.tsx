"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  ArrowUpRight,
  Camera,
  Car,
  ClipboardCheck,
  Cpu,
  Droplets,
  Gift,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import FaqSection from "@/components/page/FaqSection";
import HowItWorksSection from "@/components/page/HowItWorksSection";
import PageHero from "@/components/page/PageHero";
import ServiceAreasList from "@/components/page/ServiceAreasList";
import TrustedBrandsSection from "@/components/page/TrustedBrandsSection";
import WhyChooseSection from "@/components/page/WhyChooseSection";
import { SITE_CONTACT, waLink } from "@/config/site";
import { BRAND_FEATURES, FREE_BENEFITS, QUALITY_IMAGES, WHY_US } from "@/data/pages/common";
import type { BrandDetail } from "@/data/pages/brands";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const FEATURE_ICONS = [Cpu, ShieldCheck, Wrench, HeartHandshake];
const BENEFIT_ICONS = [Truck, ClipboardCheck, Droplets];

interface BrandDetailPageProps {
  name: string;
  logo: string;
  detail: BrandDetail;
}

/** Template for every /brands/<slug>/ page (structure taken from the original brand pages). */
export default function BrandDetailPage({ name, logo, detail }: BrandDetailPageProps) {
  return (
    <PageShell>
      {/* ================= HERO ================= */}
      <PageHero breadcrumbs={[{ label: "Brands", href: "/brands/" }, { label: name }]} eyebrow="Brand specialists" title={name}>
        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white p-3 pr-5">
          <span className="relative h-12 w-12">
            <Image src={logo} alt={`${detail.fullName} logo`} fill sizes="48px" className="object-contain" />
          </span>
          <span className="text-sm font-semibold text-[#082F59]">{detail.fullName} service & repair</span>
        </div>
      </PageHero>

      {/* ================= INTRO + CAR ================= */}
      <section className="w-full overflow-hidden bg-white py-20 sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl">{detail.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{detail.intro}</p>
            <a
              href="https://www.instagram.com/ritzautocare/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-[#082F59] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0872BB]"
            >
              <Camera size={16} />
              Check Our Instagram Portfolio
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-[3/2]"
          >
            <div className="absolute inset-x-[10%] bottom-[6%] h-[18%] rounded-[50%] bg-[#082F59]/20 blur-2xl" />
            <Image src={detail.heroImage} alt={`${detail.fullName}`} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-contain" />
          </motion.div>
        </div>

        {/* models */}
        <div className="site-container mt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-3xl border border-slate-200/80 bg-[#F7FAFD] p-6 sm:p-8"
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-[#082F59]">
              <Car size={20} className="text-[#0872BB]" />
              {detail.fullName} models we service
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {detail.models.map((m) => (
                <li key={m} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#082F59]">
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES + GALLERY ================= */}
      <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
        <div className="site-container">
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {BRAND_FEATURES.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <motion.li
                  key={f.title}
                  variants={fadeUp}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(8,47,89,0.25)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4FC] text-[#0872BB] transition-colors group-hover:bg-[#0872BB] group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-[16px] font-semibold text-[#082F59]">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{f.text}</p>
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {detail.gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-3xl shadow-[0_20px_40px_-20px_rgba(8,47,89,0.35)]"
              >
                <Image
                  src={src}
                  alt={`${detail.fullName} service at Ritz Auto Care`}
                  fill
                  sizes="(min-width: 640px) 30vw, 90vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXCLUSIVE OFFER ================= */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-[#061E3B] via-[#082F59] to-[#0B477D] p-8 text-white sm:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#1766AE]/40 blur-3xl" />
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]">
                  <Gift size={14} />
                  Exclusive Offer
                </span>
                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
                  Claim Your Free <span className="text-[#4B9DE0]">{detail.fullName} Benefits</span>
                </h2>
                <p className="mt-4 text-[15px] text-[#DCE8F2]/80">Three complimentary perks with every service booking.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={waLink(SITE_CONTACT.whatsappRoadside, `Hi Ritz Auto Care, I'd like to book a service for my ${detail.fullName}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
                >
                  <Phone size={16} />
                  Call Us
                </a>
                <Link
                  href="/contact-us/"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Book Online
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {FREE_BENEFITS.map((b, i) => {
                const Icon = BENEFIT_ICONS[i];
                return (
                  <li key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1766AE]/40 text-[#7cc0f5]">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
                    <p className="mt-1.5 text-[14px] text-[#DCE8F2]/75">{b.text}</p>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </section>

      <HowItWorksSection />
      <WhyChooseSection items={WHY_US} images={QUALITY_IMAGES} />
      <TrustedBrandsSection />
      <FaqSection items={detail.faqs} />
      <AppointmentSection defaultBrand={name} />
      <ServiceAreasList />
    </PageShell>
  );
}
