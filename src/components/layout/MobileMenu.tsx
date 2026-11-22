"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, ChevronDown, Mail, MessageCircle, Phone, Search, X } from "lucide-react";

import { NAV_LINKS, SITE_CONTACT, isActiveLink, waLink } from "@/config/site";
import BrandLogo from "./BrandLogo";
import { BRAND_MENU } from "@/data/pages/brand-menu";
import { SERVICE_MENU, SERVICE_MENU_EXTRAS } from "@/data/pages/service-menu";

export default function MobileMenu({
  open,
  onClose,
  onBook,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onBook: () => void;
  /** Opens the full-screen search (closes this menu). */
  onSearch: () => void;
}) {
  const pathname = usePathname() ?? "/";
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10002] flex flex-col overflow-y-auto bg-navy px-6 py-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <BrandLogo size="sm" tone="dark" />
            <button onClick={onClose} aria-label="Close menu" className="rounded-full bg-white/10 p-2">
              <X size={22} />
            </button>
          </div>

          {/* services search (desktop shows this in the header) */}
          {/* opens the same full-screen search as the header icon (live results for cars + services) */}
          <button
            type="button"
            onClick={onSearch}
            className="mt-6 flex h-12 w-full items-center gap-2 rounded-full bg-white/10 px-4 text-start text-[15px] text-white/55 ring-1 ring-white/15 transition-colors hover:bg-white/15"
          >
            <Search size={18} className="shrink-0 text-[#7cc0f5]" />
            Search cars & services
          </button>

          <nav className="mt-4 flex flex-1 flex-col" aria-label="Mobile navigation">
            {NAV_LINKS.map((n, i) => {
              const active = isActiveLink(n, pathname);
              const isOpen = expanded === n.label;
              return (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="border-b border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={n.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`flex-1 py-3.5 text-xl font-bold ${active ? "text-[#7cc0f5]" : "text-white"}`}
                    >
                      {n.label}
                    </Link>
                    {n.children && (
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : n.label)}
                        aria-label={`${isOpen ? "Hide" : "Show"} ${n.label} pages`}
                        title={n.label}
                        aria-expanded={isOpen}
                        className="rounded-full p-2 hover:bg-white/10"
                      >
                        <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {n.megaBrands && isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-4 pl-3"
                      >
                        <Link href="/brands/" onClick={onClose} className="block py-2 text-[15px] font-semibold text-[#7cc0f5]">
                          View all brands
                        </Link>
                        {BRAND_MENU.map((g) => (
                          <div key={g.label} className="mt-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7cc0f5]">{g.label}</p>
                            <ul className="mt-1 grid grid-cols-2 gap-x-4">
                              {g.brands.map((b) => (
                                <li key={b.name}>
                                  <Link href={b.href} onClick={onClose} className="block py-1.5 text-[15px] text-white/80 hover:text-white">
                                    {b.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    {n.megaServices && isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-4 pl-3"
                      >
                        {SERVICE_MENU_EXTRAS.map((x) => (
                          <Link key={x.href} href={x.href} onClick={onClose} className="block py-1.5 text-[15px] font-semibold text-[#7cc0f5]">
                            {x.label}
                          </Link>
                        ))}
                        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7cc0f5]">All services</p>
                        <ul className="mt-1 grid grid-cols-2 gap-x-4">
                          {SERVICE_MENU.map((s) => (
                            <li key={s.slug}>
                              <Link href={s.href} onClick={onClose} className="block py-1.5 text-[14px] leading-snug text-white/80 hover:text-white">
                                {s.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                    {n.children && !n.megaBrands && !n.megaServices && isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-3 pl-3"
                      >
                        {n.children.map((c) => (
                          <li key={c.href + c.label}>
                            <Link href={c.href} onClick={onClose} className="block py-2 text-[15px] text-white/75 hover:text-white">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </nav>

          {/* contact details (desktop shows phone + email in the header) */}
          <ul className="mt-8 grid gap-2 text-[15px]">
            {[
              { icon: Phone, label: `Toll free ${SITE_CONTACT.phone}`, href: `tel:${SITE_CONTACT.phone}` },
              { icon: MessageCircle, label: `WhatsApp +${SITE_CONTACT.whatsapp}`, href: waLink(SITE_CONTACT.whatsapp) },
              { icon: Mail, label: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}` },
            ].map(({ icon: Icon, label, href }) => (
              <li key={href}>
                <a href={href} onClick={onClose} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-white/90 ring-1 ring-white/10 hover:bg-white/10">
                  <Icon size={18} className="shrink-0 text-[#7cc0f5]" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              onClose();
              onBook();
            }}
            className="mb-2 mt-4 flex items-center justify-center gap-2 rounded-full bg-white py-4 font-bold text-navy"
          >
            <CalendarDays size={18} /> Book Service
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
