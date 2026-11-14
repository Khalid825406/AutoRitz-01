"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, ChevronDown, X } from "lucide-react";

import { NAV_LINKS, isActiveLink } from "@/config/site";

export default function MobileMenu({ open, onClose, onBook }: { open: boolean; onClose: () => void; onBook: () => void }) {
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
            <span className="text-lg font-extrabold">Ritz Auto Care</span>
            <button onClick={onClose} aria-label="Close menu" className="rounded-full bg-white/10 p-2">
              <X size={22} />
            </button>
          </div>

          <nav className="mt-8 flex flex-1 flex-col" aria-label="Mobile navigation">
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
                        aria-expanded={isOpen}
                        className="rounded-full p-2 hover:bg-white/10"
                      >
                        <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {n.children && isOpen && (
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

          <button
            onClick={() => {
              onClose();
              onBook();
            }}
            className="mb-2 mt-8 flex items-center justify-center gap-2 rounded-full bg-white py-4 font-bold text-navy"
          >
            <CalendarDays size={18} /> Book Service
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
