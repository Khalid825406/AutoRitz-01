"use client";

import { motion } from "motion/react";

/**
 * Soft fade between pages. Opacity only — a transform here would break the fixed header and floating
 * buttons — and quick, so the next page still appears straight away.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
