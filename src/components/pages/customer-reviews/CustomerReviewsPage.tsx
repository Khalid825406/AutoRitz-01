"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Award, Heart, MessageCircle, MessagesSquare, Phone, Quote, Star } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT, waLink } from "@/config/site";
import { CUSTOMER_REVIEWS } from "@/data/pages/customer-reviews";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const TAGS = [
  { icon: Star, label: "Customer Satisfaction" },
  { icon: MessagesSquare, label: "Customer Feedback" },
  { icon: Award, label: "Quality Service" },
];

/** "+971567807979" → "+971 5678 07979" (as shown on the original page) */
const displayWhatsapp = `+${SITE_CONTACT.whatsapp.slice(0, 3)} ${SITE_CONTACT.whatsapp.slice(3, 7)} ${SITE_CONTACT.whatsapp.slice(7)}`;

export default function CustomerReviewsPage() {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Customer Reviews" }]}
        eyebrow="Customer reviews"
        title="What Our Customers Say"
        description="Experiences shared by customers of Ritz Auto Care"
      >
        <ul className="mt-6 flex flex-wrap gap-2">
          {TAGS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white"
            >
              <Icon size={15} className="text-[#7cc0f5]" />
              {label}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:+${SITE_CONTACT.whatsapp}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <Phone size={16} />
            {displayWhatsapp}
          </a>
          <a
            href={waLink(SITE_CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
        </div>
      </PageHero>

      <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
        <div className="site-container">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-[#082F59] sm:text-3xl">
              Customer reviews <Heart size={24} className="fill-[#0872BB] text-[#0872BB]" />
            </h2>
            <p className="flex items-center gap-1.5 text-[14px] font-medium text-slate-600">
              <span className="flex text-amber-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={15} className="fill-current" />
                ))}
              </span>
              {CUSTOMER_REVIEWS.length} five-star reviews
            </p>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-10 columns-1 gap-6 md:columns-2 xl:columns-3"
          >
            {CUSTOMER_REVIEWS.map((r) => (
              <motion.li key={r.name} variants={fadeUp} className="mb-6 break-inside-avoid">
                <figure className="relative rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_1px_2px_rgba(8,47,89,0.04)] transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(8,47,89,0.3)]">
                  <Quote size={40} className="absolute right-6 top-6 text-[#EAF4FC]" fill="currentColor" strokeWidth={0} />
                  <span className="flex text-amber-400" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={17} className={i < r.rating ? "fill-current" : "text-slate-200"} />
                    ))}
                  </span>
                  <blockquote className="relative mt-5 space-y-3 text-[15px] leading-relaxed text-slate-700">
                    {r.text.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    {r.photo ? (
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#EAF4FC]">
                        <Image src={r.photo} alt={r.name} fill sizes="48px" className="object-cover" />
                      </span>
                    ) : (
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1766AE] to-[#082F59] text-lg font-bold text-white">
                        {r.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span>
                      <span className="block text-[15px] font-semibold text-[#082F59]">{r.name}</span>
                      <span className="block text-xs text-slate-500">Customer</span>
                    </span>
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-8 flex flex-col items-center gap-4 text-center"
          >
            <p className="text-[15px] text-slate-600">Had a great experience with us? We&apos;d love to hear from you.</p>
            <a
              href={waLink(SITE_CONTACT.whatsapp, "Hi Ritz Auto Care, I'd like to share my feedback.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#082F59] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0872BB]"
            >
              <MessageCircle size={16} />
              Share your feedback
            </a>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
