"use client";

import { motion, type Variants } from "motion/react";
import {
  ArrowUpRight,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  ThumbsUp,
  Truck,
  Wrench,
} from "lucide-react";

import SafeImage from "@/components/ui/SafeImage";
import { CONTACT, whatsappLink } from "@/config/site";
import { roadsideServices } from "@/data/roadside";

interface RoadsideSectionProps {
  onBook: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const HIGHLIGHTS = [
  { icon: ShieldCheck, label: "Professional Support" },
  { icon: Wrench, label: "Expert Assistance" },
  { icon: ThumbsUp, label: "Reliable Solutions" },
  { icon: MapPin, label: "Dubai & Abu Dhabi" },
];

export default function RoadsideSection({ onBook }: RoadsideSectionProps) {
  const wa = whatsappLink();

  return (
      <section id="support" className="w-full scroll-mt-32 bg-[#F7FAFD] py-20 sm:py-24">
        <div className="site-container">
          {/* ================= BANNER ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative isolate overflow-hidden rounded-3xl bg-[#061E3B] shadow-[0_30px_60px_-20px_rgba(8,47,89,0.5)]"
          >
            {/* background photo (optional) + overlays */}
            <SafeImage
              src="/images/roadside/hero.webp"
              alt=""
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="-z-20 object-cover opacity-40"
              fallback={null}
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#061E3B] via-[#082F59]/95 to-[#082F59]/60" />
            <div className="pointer-events-none absolute -left-20 -top-24 -z-10 h-80 w-80 rounded-full bg-[#1766AE]/40 blur-3xl" />

            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:p-14">
              {/* left */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]">
                  <Truck size={14} />
                  Roadside assistance
                </span>
                <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Reliable Help,
                  <span className="block text-[#4B9DE0]">Wherever You Are.</span>
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#DCE8F2]/85">
                  Unexpected vehicle trouble can happen anytime. Get professional roadside assistance for battery
                  failures, flat tyres, fuel emergencies and more, so you can get back on the road with confidence.
                </p>

                <ul className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                  {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm font-semibold text-white backdrop-blur-sm"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1766AE]/30 text-[#7cc0f5]">
                        <Icon size={17} />
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* right — help card */}
              <div className="self-center rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B9DE0]">
                  Always ready to assist
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Need help <span className="block text-[#4B9DE0]">right now?</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#DCE8F2]/80">
                  Your journey matters to us. Reach our team directly and get roadside support when unexpected
                  situations arise.
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-[#1766AE] to-[#2f8fe0] text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(47,143,224,0.7)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Phone size={16} />
                    Get Roadside Help
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  {wa ? (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/25 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <MessageCircle size={16} />
                      WhatsApp Us
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onBook("Roadside Support")}
                      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/25 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <MessageCircle size={16} />
                      Request a Callback
                    </button>
                  )}
                </div>

                <p className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-[#DCE8F2]/70">
                  <ShieldCheck size={14} className="text-[#4B9DE0]" />
                  Dedicated support for your roadside needs
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= SERVICES ================= */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <motion.div variants={fadeUp}>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0872BB]">
                <span className="h-px w-8 bg-[#0872BB]" />
                What we offer
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl">
                Roadside Assistance
                <span className="block text-[#0872BB]">For Every Situation.</span>
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                From minor roadside issues to unexpected emergencies, our assistance services help you move forward
                with confidence.
              </p>
            </motion.div>
            <motion.span
              variants={fadeUp}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#082F59] shadow-xs"
            >
              <span className="h-2 w-2 rounded-full bg-[#0872BB]" />
              {String(roadsideServices.length).padStart(2, "0")} Assistance Categories
            </motion.span>
          </motion.div>

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            {roadsideServices.map((s) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.id}
                  variants={fadeUp}
                  className="group relative grid overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(8,47,89,0.04)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_24px_48px_-12px_rgba(8,47,89,0.18)] sm:grid-cols-[42%_1fr]"
                >
                  {/* image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#082F59] sm:aspect-auto sm:min-h-[220px]">
                    <SafeImage
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 260px, (min-width: 640px) 42vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      fallback={
                        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#0B477D] to-[#061E3B]">
                          <Icon size={56} strokeWidth={1.2} className="text-white/25" />
                        </div>
                      }
                    />
                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#082F59]/80 text-[11px] font-bold text-white backdrop-blur-sm">
                      {s.id}
                    </span>
                  </div>

                  {/* content */}
                  <div className="flex flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0872BB]/15 bg-[#EAF4FC] text-[#0872BB] transition-colors duration-300 group-hover:bg-[#0872BB] group-hover:text-white">
                        <Icon size={20} strokeWidth={1.8} />
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight text-[#082F59]">{s.title}</h3>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{s.description}</p>
                    <span className="mt-5 h-[2px] w-10 bg-[#0872BB] transition-all duration-500 group-hover:w-20" />
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => onBook("Roadside Support")}
                        className="text-sm font-semibold text-[#0872BB] after:absolute after:inset-0 hover:text-[#082F59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0872BB]"
                      >
                        Request Assistance
                      </button>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF4FC] text-[#0872BB] transition-colors duration-300 group-hover:bg-[#0872BB] group-hover:text-white">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

        </div>
      </section>
  );
}
