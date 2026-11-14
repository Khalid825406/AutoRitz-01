"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Check, Crown, FileText, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/page/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_CONTACT, waLink } from "@/config/site";
import {
  CONTRACT_COMPARISON,
  CONTRACT_PLANS,
  CYLINDERS,
  type ContractPlan,
  type Cylinder,
} from "@/data/pages/service-contract";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const bookLink = (plan: ContractPlan, cyl: Cylinder) =>
  waLink(SITE_CONTACT.whatsapp, `Hi Ritz Auto Care, I'd like to book the ${plan.name} for my ${cyl} vehicle.`);

export default function ServiceContractPage() {
  const [cyl, setCyl] = useState<Cylinder>("4-Cylinder");

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Service Contract" }]}
        eyebrow="Maintenance plans"
        title="Service Contract"
        description="Plan your car's maintenance with a Basic or Signature contract — for 4, 6 and 8-cylinder vehicles, with no annual commitment."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(SITE_CONTACT.whatsapp, "Hi Ritz Auto Care, I'd like to know more about your service contracts.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <MessageCircle size={16} />
            Ask on WhatsApp
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

      {/* ================= PLANS ================= */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <SectionHeading
              eyebrow="Standard & Premium"
              icon={FileText}
              title="Choose Your"
              highlight="Service Contract."
              description="Pick your engine size, then the plan that suits you."
            />
          </motion.div>

          {/* cylinder switch */}
          <div className="mt-10 flex justify-center">
            <div role="tablist" aria-label="Engine size" className="inline-flex rounded-full border border-slate-200 bg-[#F7FAFD] p-1.5">
              {CYLINDERS.map((c) => {
                const active = c === cyl;
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCyl(c)}
                    className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB] sm:px-7 ${
                      active ? "text-white" : "text-slate-600 hover:text-[#082F59]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="cylinder-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-[#082F59]"
                      />
                    )}
                    <span className="relative">{c} Vehicles</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* plan cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2"
          >
            {CONTRACT_PLANS.map((p) => {
              const premium = p.id === "signature";
              return (
                <motion.article
                  key={p.id}
                  variants={fadeUp}
                  className={`relative flex flex-col overflow-hidden rounded-3xl border p-8 sm:p-10 ${
                    premium
                      ? "border-transparent bg-linear-to-br from-[#061E3B] via-[#082F59] to-[#0B477D] text-white shadow-[0_30px_60px_-24px_rgba(8,47,89,0.6)]"
                      : "border-slate-200/80 bg-white text-[#082F59] shadow-[0_20px_40px_-24px_rgba(8,47,89,0.25)]"
                  }`}
                >
                  {premium && (
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1766AE]/40 blur-3xl" />
                  )}
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                          premium ? "bg-[#4B9DE0]/20 text-[#7cc0f5]" : "bg-[#EAF4FC] text-[#0872BB]"
                        }`}
                      >
                        {premium ? <Crown size={12} /> : <ShieldCheck size={12} />}
                        {p.tier}
                      </span>
                      <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{p.name}</h3>
                      <motion.p
                        key={cyl}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-1 text-sm font-medium ${premium ? "text-[#DCE8F2]/80" : "text-slate-500"}`}
                      >
                        {cyl} Vehicles
                      </motion.p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs uppercase tracking-[0.14em] ${premium ? "text-[#DCE8F2]/60" : "text-slate-400"}`}>Coverage</p>
                      <p className="mt-1 whitespace-nowrap text-lg font-bold">{p.coverage}</p>
                    </div>
                  </div>

                  <ul className="relative mt-8 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px]">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            premium ? "bg-[#4B9DE0] text-white" : "bg-[#0872BB] text-white"
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className={premium ? "text-[#DCE8F2]" : "text-slate-700"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={bookLink(p, cyl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      premium
                        ? "bg-white text-[#082F59] hover:bg-[#DCE8F2] focus-visible:outline-white"
                        : "bg-[#082F59] text-white hover:bg-[#0872BB] focus-visible:outline-[#0872BB]"
                    }`}
                  >
                    Book Now
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= COMPARISON ================= */}
      <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
        <div className="site-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <SectionHeading eyebrow="Compare" icon={FileText} title="Basic vs" highlight="Signature." />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mx-auto mt-12 max-w-5xl overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_40px_-24px_rgba(8,47,89,0.25)]"
          >
            <table className="w-full min-w-[560px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th scope="col" className="px-6 py-5 font-semibold text-slate-500">What&apos;s included</th>
                  <th scope="col" className="px-6 py-5 font-bold text-[#082F59]">Basic</th>
                  <th scope="col" className="bg-[#EAF4FC] px-6 py-5 font-bold text-[#0872BB]">Signature</th>
                </tr>
              </thead>
              <tbody>
                {CONTRACT_COMPARISON.map((r) => (
                  <tr key={r.label} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="px-6 py-4 font-medium text-[#082F59]">{r.label}</th>
                    <td className="px-6 py-4 text-slate-600">{r.basic}</td>
                    <td className="bg-[#F5FAFE] px-6 py-4 font-medium text-[#082F59]">{r.signature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p className="mt-8 text-center text-[14px] text-slate-500">
            Prices depend on your vehicle — message us for a quote for your {cyl.toLowerCase()} car.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
