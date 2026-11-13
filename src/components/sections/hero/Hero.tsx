"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

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

export default function Hero(_props: HeroProps) {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="hero-bg-layer hero-bg relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* Big brand text — centered, sits BEHIND the car (z-10) */}
      <HeroTypography />

      {/* 3D car — lower part of the hero, IN FRONT of the text (z-20) */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.65 }}
        className="car-wrap absolute inset-x-0 bottom-0 top-[32%] z-20 sm:top-[36%]"
      >
        <Car3DViewer />
      </motion.div>
    </motion.section>
  );
}
