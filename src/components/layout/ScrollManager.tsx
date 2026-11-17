"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Page-to-page scroll behaviour for the whole site.
 *
 * Next.js only scrolls to the top on navigation when the new page's first element is off screen.
 * Our first element is the fixed header — always "on screen" — so pages kept the previous page's
 * scroll position (clicking a footer link opened the next page at the bottom). This fixes that:
 *
 *  - link click / router.push → new page opens at the top (or at its #section when the URL has one)
 *  - browser Back / Forward    → returns to where the visitor was on that page
 *  - first load / reload        → left to the browser
 */
export default function ScrollManager() {
  const pathname = usePathname();
  const positions = useRef(new Map<string, number>());
  const current = useRef<string | null>(null);
  const fromHistory = useRef(false);

  // Remember the scroll position of the page being viewed, and whether the next change is Back/Forward.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (current.current) positions.current.set(current.current, window.scrollY);
      });
    };
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const isFirstLoad = current.current === null;
    current.current = pathname;
    if (isFirstLoad) return;

    const timers: number[] = [];
    const scrollTo = (top: number) => window.scrollTo({ top, left: 0, behavior: "instant" });

    if (fromHistory.current) {
      fromHistory.current = false;
      const saved = positions.current.get(pathname) ?? 0;
      // Content (images, reveals) may still be growing the page — apply again shortly after.
      scrollTo(saved);
      timers.push(window.setTimeout(() => scrollTo(saved), 120), window.setTimeout(() => scrollTo(saved), 400));
    } else {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
      else scrollTo(0);
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [pathname]);

  return null;
}
