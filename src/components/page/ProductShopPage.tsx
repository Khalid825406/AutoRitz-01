"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Mail, MessageCircle, Phone, Wrench, type LucideIcon } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import PageHero from "@/components/page/PageHero";
import Marquee from "@/components/ui/Marquee";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_CONTACT, waLink } from "@/config/site";

export interface ShopProduct {
  brand: string;
  name: string;
  /** Specs as they appear in the original product name */
  specs: string[];
  image: string;
}

export interface ShopBrand {
  name: string;
  logo: string;
}

interface ProductShopPageProps {
  /** Page H1 and breadcrumb, e.g. "Buy Car Batteries" */
  title: string;
  eyebrow: string;
  /** Original sub-heading, e.g. "Trusted Supplier of All Types of Batteries in Dubai" */
  subtitle: string;
  /** Message pre-filled in the hero WhatsApp button */
  enquiry: string;
  section: { eyebrow: string; icon: LucideIcon; title: string; highlight: string; description: string };
  products: ShopProduct[];
  brandsLabel: string;
  brands: ShopBrand[];
  fitting: { title: string; text: string; href: string; label: string };
  defaultService: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Shared layout of the "Buy Car Batteries" / "Buy Car Tires" pages: products + brand logos + appointment. */
export default function ProductShopPage(props: ProductShopPageProps) {
  const { title, eyebrow, subtitle, enquiry, section, products, brandsLabel, brands, fitting, defaultService } = props;
  const FittingLink = fitting.href.startsWith("#") ? "a" : Link;

  return (
    <PageShell>
      <PageHero breadcrumbs={[{ label: title }]} eyebrow={eyebrow} title={title} description={subtitle}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(SITE_CONTACT.whatsapp, enquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <MessageCircle size={16} />
            Buy On WhatsApp
          </a>
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone size={16} />
            {SITE_CONTACT.phone}
          </a>
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Mail size={16} />
            {SITE_CONTACT.email}
          </a>
        </div>
      </PageHero>

      {/* ================= PRODUCTS ================= */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <SectionHeading
              eyebrow={section.eyebrow}
              icon={section.icon}
              title={section.title}
              highlight={section.highlight}
              description={section.description}
            />
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((p) => (
              <motion.li
                key={p.name}
                variants={fadeUp}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_24px_48px_-18px_rgba(8,47,89,0.3)]"
              >
                <div className="relative aspect-square bg-white p-6">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-[#082F59] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                    {p.brand}
                  </span>
                  <div className="relative h-full w-full">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between border-t border-slate-100 p-5">
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug text-[#082F59]">{p.name}</h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {p.specs.map((s) => (
                        <li key={s} className="rounded-md bg-[#EAF4FC] px-2 py-1 text-[11px] font-semibold text-[#0872BB]">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={waLink(SITE_CONTACT.whatsapp, `Hi Ritz Auto Care, I'd like to buy: ${p.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                  >
                    <MessageCircle size={16} />
                    Buy On WhatsApp
                  </a>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section className="w-full bg-[#F7FAFD] py-16 sm:py-20">
        <div className="site-container">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0872BB]">{brandsLabel}</p>
        </div>
        <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <Marquee duration={Math.max(35, brands.length * 3.5)} gap={24}>
            {brands.map((b) => (
              <span
                key={b.name}
                title={b.name}
                className="flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_8px_20px_-14px_rgba(8,47,89,0.3)]"
              >
                <span className="relative h-full w-full">
                  <Image src={b.logo} alt={b.name} fill sizes="160px" className="object-contain" />
                </span>
              </span>
            ))}
          </Marquee>
        </div>

        <div className="site-container mt-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200/80 bg-white p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#1766AE] to-[#082F59] text-white">
                <Wrench size={20} />
              </span>
              <div>
                <p className="text-lg font-semibold text-[#082F59]">{fitting.title}</p>
                <p className="text-[14px] text-slate-600">{fitting.text}</p>
              </div>
            </div>
            <FittingLink
              href={fitting.href}
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-[#082F59] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0872BB]"
            >
              {fitting.label}
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </FittingLink>
          </motion.div>
        </div>
      </section>

      <AppointmentSection defaultService={defaultService} />
    </PageShell>
  );
}
