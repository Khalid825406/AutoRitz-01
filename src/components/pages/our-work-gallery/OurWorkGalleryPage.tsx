"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Images, Maximize2, MessageCircle, Phone, X } from "lucide-react";

import { Instagram } from "@/components/icons/social";

import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT, waLink } from "@/config/site";
import { GALLERY, GALLERY_HERO } from "@/data/pages/our-work-gallery";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-screen photo viewer with arrows, keyboard (← → Esc) and swipe-friendly buttons. */
function Lightbox({ index, onClose, onMove }: { index: number; onClose: () => void; onMove: (d: 1 | -1) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onMove]);

  const item = GALLERY[index];
  const btn =
    "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#030B17]/95 p-4 sm:p-10"
      onClick={onClose}
    >
      <button type="button" onClick={onClose} aria-label="Close" className={`${btn} absolute right-4 top-4 sm:right-8 sm:top-8`}>
        <X size={22} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onMove(-1);
        }}
        aria-label="Previous photo"
        className={`${btn} absolute left-3 top-1/2 -translate-y-1/2 sm:left-8`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onMove(1);
        }}
        aria-label="Next photo"
        className={`${btn} absolute right-3 top-1/2 -translate-y-1/2 sm:right-8`}
      >
        <ChevronRight size={24} />
      </button>

      <AnimatePresence mode="wait">
        <motion.figure
          key={item.src}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="relative flex max-h-full w-full max-w-3xl flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative aspect-square w-full max-w-[min(80vh,48rem)]">
            <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 48rem, 92vw" className="rounded-2xl object-contain" priority />
          </div>
          <figcaption className="mt-4 text-center text-sm text-white/75">
            {item.alt} <span className="text-white/40">· {index + 1} / {GALLERY.length}</span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  );
}

export default function OurWorkGalleryPage() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (d: 1 | -1) => setOpen((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length)),
    [],
  );

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "About Us", href: "/about-us/" }, { label: "Our Work Gallery" }]}
        eyebrow="Our work"
        title="Our Work Gallery"
        description="Real jobs from the Ritz Auto Care workshop in Dubai — engine rebuilds, diagnostics, AC service and more."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(SITE_CONTACT.whatsapp, "Hi Ritz Auto Care, I'd like a quote for my car.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <MessageCircle size={16} />
            Get a Free Quote
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

      {/* branded car banner (original hero image) */}
      <section className="w-full bg-white pt-8">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-[1915/821] overflow-hidden rounded-3xl bg-[#EEF2F6]"
          >
            <Image src={GALLERY_HERO} alt="Ritz Auto Care" fill sizes="(min-width: 1280px) 1150px, 92vw" className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="site-container">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-[#082F59] sm:text-3xl">
              <Images size={26} className="text-[#0872BB]" />
              Inside our workshop <span className="text-[#0872BB]">({GALLERY.length})</span>
            </h2>
            <p className="text-[14px] text-slate-500">Tap a photo to view it full size.</p>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
          >
            {GALLERY.map((g, i) => (
              <motion.li
                key={g.src}
                variants={{ hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } } }}
                className={i % 7 === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo: ${g.alt}`}
                  className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#082F59]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white text-[#082F59] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Maximize2 size={15} />
                  </span>
                </button>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-12 flex justify-center">
            <a
              href="https://www.instagram.com/ritzautocare/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#082F59] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0872BB]"
            >
              <Instagram size={16} />
              See more on Instagram
            </a>
          </div>
        </div>
      </section>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onMove={move} />}</AnimatePresence>
    </PageShell>
  );
}
