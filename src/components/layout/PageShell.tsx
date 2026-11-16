"use client";

import { useEffect, useState, type ReactNode } from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useBookService } from "@/lib/hooks/useBookService";

/** Header height on desktop before it shrinks — used until the real height is measured. */
const DEFAULT_HEADER_OFFSET = 132;

/** Header + footer wrapper for every inner page (the homepage keeps its own layout). */
export default function PageShell({ children }: { children: ReactNode }) {
  // The header is position:fixed, so push the content down by its (unshrunk) height.
  const [offset, setOffset] = useState(DEFAULT_HEADER_OFFSET);
  const book = useBookService();

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => {
      // measure only at the top of the page, where the header is at full size
      if (window.scrollY < 10) setOffset(header.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    // re-measure when the header changes height (e.g. the announcement bar is closed)
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      <Header onBook={() => book()} />
      <main style={{ paddingTop: offset }}>{children}</main>
      <Footer />
    </>
  );
}
