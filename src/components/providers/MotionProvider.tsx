"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global Framer Motion settings for the whole site.
 * reducedMotion "user": visitors who turned on "reduce motion" in their OS
 * still get fades, but no sliding/scaling. Use "never" to always animate.
 */
export const REDUCED_MOTION: "user" | "always" | "never" = "user";

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion={REDUCED_MOTION} transition={{ ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
