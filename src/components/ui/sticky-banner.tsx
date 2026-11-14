"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { X } from "lucide-react";

interface StickyBannerProps {
  children: ReactNode;
  className?: string;
  /** Collapse the banner once the visitor scrolls down; it comes back at the top. */
  hideOnScroll?: boolean;
}

/** Announcement bar (inspired by Aceternity UI's StickyBanner) — closable, animated with Framer Motion. */
export function StickyBanner({ children, className = "", hideOnScroll = false }: StickyBannerProps) {
  const [closed, setClosed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (hideOnScroll) setScrolled(y > 40);
  });

  return (
    <AnimatePresence initial={false}>
      {!closed && !scrolled && (
        <motion.div
          key="banner"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden ${className}`}
          role="region"
          aria-label="Announcement"
        >
          <div className="flex min-h-11 items-center justify-center px-12 py-2">{children}</div>
          <button
            type="button"
            onClick={() => setClosed(true)}
            aria-label="Close announcement"
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
