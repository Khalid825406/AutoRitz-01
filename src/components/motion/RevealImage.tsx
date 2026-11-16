"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { motion, type Variants } from "motion/react";

import { useRevealed } from "./useRevealed";

const curtain: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
};

const settle: Variants = {
  hidden: { scale: 1.18 },
  show: { scale: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Drop-in for `<Image fill …>` photos: the photo is revealed bottom-up like a curtain (clip-path)
 * while it settles from a slight zoom. Plays once on scroll. The parent must be `relative` (as with any `fill` image).
 *
 * The in-view trigger sits on an un-clipped wrapper: browsers treat a fully clipped element as
 * not intersecting, so putting `whileInView` on the clipped layer itself would never fire.
 */
export default function RevealImage(props: ImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref);
  return (
    <motion.div ref={ref} className="absolute inset-0" initial="hidden" animate={revealed ? "show" : "hidden"}>
      <motion.div className="absolute inset-0 overflow-hidden" variants={curtain}>
        <motion.div className="absolute inset-0" variants={settle}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props */}
          <Image {...props} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
