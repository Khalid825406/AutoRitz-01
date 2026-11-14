"use client";

import { useEffect, useState, type ReactNode } from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SITE_CONTACT, waLink } from "@/config/site";

/** Header height on desktop before it shrinks — used until the real height is measured. */
const DEFAULT_HEADER_OFFSET = 132;

/** Header + footer wrapper for every inner page (the homepage keeps its own layout). */
export default function PageShell({ children }: { children: ReactNode }) {
  // The header is position:fixed, so push the content down by its (unshrunk) height.
  const [offset, setOffset] = useState(DEFAULT_HEADER_OFFSET);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => {
      // measure only at the top of the page, where the header is at full size
      if (window.scrollY < 10) setOffset(header.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const openQuote = () =>
    window.open(waLink(SITE_CONTACT.whatsapp, "Hi Ritz Auto Care, I'd like a free quote."), "_blank", "noopener");

  return (
    <>
      <Header onBook={openQuote} />
      <main style={{ paddingTop: offset }}>{children}</main>
      <Footer />
    </>
  );
}
