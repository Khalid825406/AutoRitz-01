"use client";

import { Children, cloneElement, isValidElement, useRef, type ReactElement, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

import { useRevealed } from "./useRevealed";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Motion versions of the tags a heading can use (created once, outside render). */
const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.75, ease: EASE } },
};

/** One word that slides up from behind a mask. */
function Word({ children }: { children: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span variants={word} className="inline-block will-change-transform">
        {children}
      </motion.span>
    </span>
  );
}

/** Split strings into masked words; recurse into elements (e.g. a highlighted <span>) keeping their props. */
function splitWords(node: ReactNode, keyPrefix = "w"): ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    const parts = String(node).split(/(\s+)/);
    return parts.map((p, i) => (/^\s+$/.test(p) ? p : p ? <Word key={`${keyPrefix}-${i}`}>{p}</Word> : null));
  }
  if (Array.isArray(node)) return node.map((n, i) => splitWords(n, `${keyPrefix}-${i}`));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props.children === undefined) return el.key != null ? el : cloneElement(el, { key: keyPrefix });
    // give the copy a key — it ends up in an array next to the split words
    return cloneElement(el, { key: el.key ?? keyPrefix }, splitWords(Children.toArray(el.props.children), keyPrefix));
  }
  return node;
}

interface TextRevealProps {
  children: ReactNode;
  /** Heading tag to render (default h2). */
  as?: keyof typeof TAGS;
  className?: string;
  /** Extra delay before the first word, in seconds. */
  delay?: number;
}

/**
 * Word-by-word mask reveal on scroll (Framer Motion). Plays once when the heading enters the viewport.
 * Works with plain text and nested elements like `<span className="text-blue">highlight</span>`.
 */
export default function TextReveal({ children, as = "h2", className = "", delay = 0 }: TextRevealProps) {
  const MotionTag = TAGS[as];
  const ref = useRef<HTMLHeadingElement>(null);
  const revealed = useRevealed(ref);
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={delay ? { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } } : container}
      initial="hidden"
      animate={revealed ? "show" : "hidden"}
    >
      {splitWords(children)}
    </MotionTag>
  );
}
