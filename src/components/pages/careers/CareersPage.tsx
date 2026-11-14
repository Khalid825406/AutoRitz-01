"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion, type Variants } from "motion/react";
import { Briefcase, GraduationCap, Mail, Send, TrendingUp, Wrench } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT } from "@/config/site";
import { CAREER_DEPARTMENTS, CAREERS } from "@/data/pages/careers";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const field =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-[#082F59] outline-hidden transition placeholder:text-slate-400 focus:border-[#0872BB] focus:ring-4 focus:ring-[#0872BB]/10";

const HIGHLIGHTS = [
  { icon: Wrench, label: "Seasoned technicians" },
  { icon: GraduationCap, label: "People just starting out" },
  { icon: TrendingUp, label: "Growth & advancement" },
];

export default function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", department: "", message: "" });
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) return setError("Please enter a valid email address.");
    if (form.phone.replace(/\D/g, "").length < 8) return setError("Please enter a valid phone number.");
    setError("");
    const subject = `Job application${form.department ? ` – ${form.department}` : ""} – ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      ...(form.department ? [`Area of interest: ${form.department}`] : []),
      "",
      form.message.trim(),
      "",
      "(Please attach your CV to this email.)",
    ].join("\n");
    window.location.href = `mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <PageShell>
      <PageHero breadcrumbs={[{ label: "Careers" }]} eyebrow="Join our team" title="Careers" />

      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* left: story + photo */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0872BB] shadow-xs">
              <Briefcase size={14} />
              We&apos;re hiring
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl lg:text-5xl">
              {CAREERS.heading} <span className="block text-[#0872BB]">{CAREERS.highlight}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{CAREERS.text}</p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FC] px-4 py-2 text-sm font-medium text-[#082F59]">
                  <Icon size={15} className="text-[#0872BB]" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-28px_rgba(8,47,89,0.45)]">
              <Image src={CAREERS.image} alt="Ritz Auto Care technicians working together on a car" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover object-top" />
            </div>
          </motion.div>

          {/* right: application form */}
          <motion.form
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="h-fit rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_30px_60px_-30px_rgba(8,47,89,0.3)] sm:p-10 lg:sticky lg:top-36"
          >
            <h3 className="text-2xl font-bold text-[#082F59]">Apply now</h3>
            <p className="mt-2 text-[14px] text-slate-500">Fill in your details — this opens an email to our team so you can attach your CV.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Name</span>
                <input className={field} value={form.name} onChange={set("name")} placeholder="Your full name" autoComplete="name" />
              </label>
              <label>
                <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Email</span>
                <input className={field} type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
              </label>
              <label>
                <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Phone Number</span>
                <input className={field} value={form.phone} onChange={set("phone")} placeholder="+971 5X XXX XXXX" inputMode="tel" autoComplete="tel" />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Select Services</span>
                <select className={field} value={form.department} onChange={set("department")}>
                  <option value="">Select services</option>
                  {CAREER_DEPARTMENTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Message</span>
                <textarea
                  className={`${field} h-32 resize-none py-3`}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us about your experience and the role you're looking for"
                  maxLength={2000}
                />
              </label>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#082F59] to-[#1766AE] text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(23,102,174,0.6)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
            >
              Submit
              <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Mail size={13} className="text-[#0872BB]" />
              Or email your CV to{" "}
              <a href={`mailto:${SITE_CONTACT.email}`} className="font-semibold text-[#0872BB] hover:underline">
                {SITE_CONTACT.email}
              </a>
            </p>
          </motion.form>
        </div>
      </section>
    </PageShell>
  );
}
