"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import SiteSearch from "./SiteSearch";

/** Full-screen search for phones and tablets (opened from the search icon in the header). */
export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {

  // lock page scroll + Esc to close
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10003] flex flex-col bg-white"
        >
          <div className="site-container flex items-center justify-between gap-3 pt-[max(1rem,env(safe-area-inset-top))]">
            <p className="text-[17px] font-bold text-[#0E1116]">Search</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#0E1116] transition-colors hover:bg-slate-200"
            >
              <X size={20} />
            </button>
          </div>
          <div className="site-container min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3">
            <SiteSearch variant="overlay" autoFocus onDone={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
