"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "motion/react";

import ErrorBoundary from "@/components/ui/ErrorBoundary";
import type { GlobeConfig } from "@/components/ui/globe";
import { globeArcs } from "@/data/globe-arcs";
import { DUBAI_CENTER, SERVICE_AREAS } from "@/data/service-areas";

// Aceternity globe (three-globe + React Three Fiber) — browser only.
const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), { ssr: false });

const [DUBAI_LAT, DUBAI_LNG] = DUBAI_CENTER;

// Same look & animation as the Aceternity globe demo; opens on Dubai.
const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: DUBAI_LAT, lng: DUBAI_LNG },
  autoRotate: true,
  autoRotateSpeed: 0.5,
  focusLabel: `Dubai, UAE · ${SERVICE_AREAS.length} areas`,
};


/** Calls `onMount` once — used as the error fallback so the parent can hide the globe column. */
function ReportUnavailable({ onMount }: { onMount?: () => void }) {
  useEffect(() => {
    onMount?.();
  }, [onMount]);
  return null;
}

/**
 * Interactive 3D globe (Aceternity UI) that opens on Dubai and slowly rotates.
 * Uses WebGL — if it can't start, `onUnavailable` is called and nothing is rendered.
 */
export default function DubaiGlobe({ onUnavailable }: { onUnavailable?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // Only render frames while the globe is on screen — saves GPU for the hero car.
  const inView = useInView(ref, { margin: "200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative aspect-square w-full max-w-[520px] cursor-grab active:cursor-grabbing"
      role="img"
      aria-label={`Globe centred on Dubai showing our ${SERVICE_AREAS.length} service areas`}
    >
      <ErrorBoundary name="DubaiGlobe" fallback={<ReportUnavailable onMount={onUnavailable} />}>
        <World data={globeArcs} globeConfig={globeConfig} frameloop={inView ? "always" : "never"} />
      </ErrorBoundary>
    </motion.div>
  );
}
