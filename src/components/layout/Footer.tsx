
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { Facebook, Instagram, TikTok, Youtube } from "@/components/icons/social";
import { SITE_CONTACT, SOCIAL_LINKS, waLink } from "@/config/site";

/** Quick links — every entry is a page that exists (same set as the original footer). */
const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us/" },
  { name: "Our Services", href: "/service/" },
  { name: "Brands", href: "/brands/" },
  { name: "Service Areas", href: "/service-areas/" },
  { name: "Our Work", href: "/our-work-gallery/" },
  { name: "Customer Reviews", href: "/customer-reviews/" },
  { name: "Blog", href: "/blog/" },
  { name: "Careers", href: "/careers/" },
  { name: "Contact Us", href: "/contact-us/" },
];

const services = [
  { name: "Roadside Support", href: "/roadside-support/" },
  { name: "Car Battery Change", href: "/service/car-battery-replacement/" },
  { name: "Buy Car Batteries", href: "/buy-car-batteries/" },
  { name: "Buy Car Tires", href: "/buy-car-tires/" },
  { name: "Service Contract", href: "/service-contract/" },
  { name: "Free Vehicle Inspection", href: "/complimentary-vehicle-inspection/" },
  { name: "Auto Spare Parts", href: "/service/auto-spare-parts-trading/" },
];

const SOCIAL_ICONS = { Facebook, Instagram, TikTok, YouTube: Youtube } as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071525] text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#1766AE]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#1766AE]/10 blur-[120px]" />

      {/* Top CTA */}
      <motion.div className="site-container relative pt-16 lg:pt-20" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
        <div className="relative overflow-hidden rounded-2xl border border-[#367DBB]/30 bg-linear-to-r from-[#102D4B] via-[#123B63] to-[#0D2742] p-7 sm:p-10 lg:p-12">

          <div className="pointer-events-none absolute -right-10 -top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-20 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#70B7F4]">
                <span className="h-2 w-2 rounded-full bg-[#70B7F4]" />
                Your Car Deserves The Best
              </span>

              <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Ready to Give Your Car
                <span className="block text-[#70B7F4]">
                  The Care It Deserves?
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-[#B7C9DA]">
                Experience professional automotive care with
                quality service, expert attention and reliable results.
              </p>
            </div>

            <Link
              href="/contact-us/"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#1766AE] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#2786D2] hover:shadow-[0_10px_35px_rgba(23,102,174,0.35)]"
            >
              Book An Appointment
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <motion.div className="site-container relative pb-12 pt-16 lg:pt-20" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>

        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">

          {/* BRAND */}
          <div className="lg:col-span-4">

            <Link href="/" className="inline-flex items-center">
              <Image
                src="/Rits-Auto-Care-Logo-2-1536x448.webp"
                alt="Ritz Auto Care LLC"
                width={220}
                height={75}
                className="h-auto w-[190px] object-contain"
              />
            </Link>

            <p className="mt-6 max-w-sm text-[13px] leading-7 text-[#9BAEC1]">
              Ritz Auto Care LLC is committed to delivering
              dependable automotive solutions with professional
              service and attention to every detail.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#9EB5CA] transition-all duration-300 hover:border-[#1766AE] hover:bg-[#1766AE] hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2">
            <h3 className="mb-7 text-xs font-bold uppercase tracking-[0.16em] text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[13px] text-[#9BAEC1] transition-colors hover:text-[#70B7F4]"
                  >
                    <ChevronRight
                      size={13}
                      className="text-[#1766AE] transition-transform group-hover:translate-x-1"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div className="lg:col-span-3">
            <h3 className="mb-7 text-xs font-bold uppercase tracking-[0.16em] text-white">
              Our Services
            </h3>

            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group flex items-center gap-2 text-[13px] text-[#9BAEC1] transition-colors hover:text-[#70B7F4]"
                  >
                    <ChevronRight
                      size={13}
                      className="text-[#1766AE] transition-transform group-hover:translate-x-1"
                    />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="lg:col-span-3">
            <h3 className="mb-7 text-xs font-bold uppercase tracking-[0.16em] text-white">
              Get In Touch
            </h3>

            <div className="space-y-6">

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1766AE]/15 text-[#70B7F4]">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4]">
                    Our Location
                  </p>
                  <a
                    href={SITE_CONTACT.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] leading-6 text-[#9BAEC1] transition-colors hover:text-white"
                  >
                    {SITE_CONTACT.address}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1766AE]/15 text-[#70B7F4]">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4]">
                    Phone Number
                  </p>
                  <a
                    href={`tel:${SITE_CONTACT.phone}`}
                    className="text-[13px] text-[#9BAEC1] transition-colors hover:text-white"
                  >
                    Toll Free {SITE_CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1766AE]/15 text-[#70B7F4]">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4]">
                    Email Address
                  </p>
                  <a
                    href={`mailto:${SITE_CONTACT.email}`}
                    className="text-[13px] text-[#9BAEC1] transition-colors hover:text-white"
                  >
                    {SITE_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1766AE]/15 text-[#70B7F4]">
                  <MessageCircle size={18} />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4]">
                    WhatsApp
                  </p>
                  <a
                    href={waLink(SITE_CONTACT.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[#9BAEC1] transition-colors hover:text-white"
                  >
                    +{SITE_CONTACT.whatsapp}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="flex flex-col items-center justify-between gap-5 border-b border-white/10 py-7 sm:flex-row">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-[#70B7F4]" />
            <div>
              <p className="text-xs font-bold text-white">
                Professional Automotive Care
              </p>
              <p className="mt-1 text-[10px] text-[#8197AC]">
                Quality, Reliability & Customer Satisfaction
              </p>
            </div>
          </div>

          <Link
            href="/service/"
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4] transition-colors hover:text-white"
          >
            Explore Our Services
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-[#8295A8]">
            © {new Date().getFullYear()} Ritz Auto Care LLC.
            All Rights Reserved.
          </p>

          <div className="flex items-center gap-5 text-[11px] text-[#8295A8]">
            <Link href="/contact-us/" className="transition-colors hover:text-white">
              Contact Us
            </Link>
            <Link href="/careers/" className="transition-colors hover:text-white">
              Careers
            </Link>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
