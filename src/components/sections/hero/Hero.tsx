"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";

import HeroBackgroundVideos from "./HeroBackgroundVideos";
import HeroMobile from "./HeroMobile";
import HeroTypography from "./HeroTypography";
import LoadingScreen from "@/components/three/LoadingScreen";

const Car3DViewer = dynamic(() => import("@/components/three/Car3DViewer"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

interface HeroProps {
  /** Reserved for a hero CTA. */
  onBook?: (service?: string) => void;
}

const EASE = [0.215, 0.61, 0.355, 1] as const;

/** Desktop/tablet layout from 768px (Tailwind `md`). */
const DESKTOP_QUERY = "(min-width: 768px)";
const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
/** false on the server and on phones — the heavy desktop media is only mounted on wider screens. */
const useIsDesktop = () => useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP_QUERY).matches, () => false);

export default function Hero(_props: HeroProps) {
  const isDesktop = useIsDesktop();

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="hero-bg-layer hero-bg relative isolate overflow-hidden md:min-h-[100svh]"
    >
      {/* ===== Phones: brand title + skyline + Audi (no videos, no WebGL) ===== */}
      <HeroMobile />

      {/* ===== Desktop / tablet: background videos + big text + 3D car ===== */}
      <div className="max-md:hidden">
        {/* Background videos — left & right, behind everything (z-0) */}
        {isDesktop && <HeroBackgroundVideos />}

        {/* Big brand text — centered, sits BEHIND the car (z-10) */}
        <HeroTypography />

        {/* 3D car — lower part of the hero, IN FRONT of the text (z-20) */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.65 }}
            className="car-wrap absolute inset-x-0 bottom-0 top-[32%] z-20 sm:top-[36%]"
          >
            <Car3DViewer />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
