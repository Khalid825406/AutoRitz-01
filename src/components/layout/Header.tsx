"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { animate, stagger } from "motion/react";

import {
  Phone,
  Mail,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Globe,
} from "lucide-react";
import { CONTACT, NAV_LINKS, isActiveLink } from "@/config/site";


import AnnouncementBar from "./AnnouncementBar";
import MobileMenu from "./MobileMenu";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */

const PHONE = CONTACT.phone;
const EMAIL = "info@ritzautocare.ae";

/* ---------------------------------------------------------
   COMPONENT
--------------------------------------------------------- */

export default function Header({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null);

  const [menu, setMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [lang, setLang] = useState<"ar" | "en">("en");
  const [search, setSearch] = useState("");

  /* Sticky state (the active item comes from the current page URL) */
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 120);
      setActiveDropdown(null);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Escape closes dropdown + mobile menu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Entrance animation (Framer Motion sequence).
     Elements are fully visible without JS; the sequence only animates them in. */
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel));
    const ease = [0.215, 0.61, 0.355, 1] as const; // ≈ power3.out

    const logo = q(".header-logo"), top = q(".header-top-item"), nav = q(".header-nav-item");
    if (!logo.length || !top.length || !nav.length) return;

    const controls = animate([
      [logo, { x: [-24, 0], opacity: [0, 1] }, { duration: 0.6, ease }],
      [top, { y: [8, 0], opacity: [0, 1] }, { duration: 0.4, ease, delay: stagger(0.05), at: "-0.35" }],
      [nav, { y: [8, 0], opacity: [0, 1] }, { duration: 0.3, ease, delay: stagger(0.03), at: "-0.25" }],
    ]);

    return () => controls.stop();
  }, []);

  /* Handlers */
  const closeMenus = () => {
    setActiveDropdown(null);
    setMenu(false);
  };

  const handleBook = () => {
    closeMenus();
    onBook();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    closeMenus();
    router.push("/service/");
  };

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]";

  return (
    <>
      <header
        ref={root}
        className={`fixed inset-x-0 top-0 z-[9999] w-full bg-white transition-shadow duration-300 ${
          isSticky ? "shadow-[0_4px_20px_rgba(8,47,89,0.12)]" : "shadow-xs"
        }`}
      >
        <AnnouncementBar />

        {/* ================= TOP BAR ================= */}
        <div
          className={`border-b border-slate-100 bg-white transition-[padding] duration-300 ${
            isSticky ? "py-1.5" : "py-3"
          }`}
        >
          <div className="site-container flex items-center justify-between gap-3 lg:gap-6">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenus}
              aria-label="Ritz Auto Care home"
              className={`header-logo flex shrink-0 items-center rounded-sm ${focusRing}`}
            >
              <img
                src="/Rits-Auto-Care-Logo-2-1536x448.webp"
                alt="Ritz Auto Care LLC"
                className={`h-auto object-contain transition-all duration-300 ${
                  isSticky
                    ? "w-[130px] sm:w-[145px] lg:w-[155px]"
                    : "w-[150px] sm:w-[175px] lg:w-[195px]"
                }`}
              />
            </Link>

            {/* Contact + search + language (desktop) */}
            <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 lg:flex xl:gap-7">
              {/* Phone */}
              <a
                href={`tel:${PHONE}`}
                className={`header-top-item group flex shrink-0 items-center gap-3 rounded-sm ${focusRing}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4FC] text-[#0872BB] transition-colors group-hover:bg-[#0872BB] group-hover:text-white">
                  <Phone size={17} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[11px] text-slate-500">
                    Call us
                  </span>
                  <span className="block text-[14px] font-semibold text-[#082F59]">
                    {PHONE}
                  </span>
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className={`header-top-item group hidden shrink-0 items-center gap-3 rounded-sm xl:flex ${focusRing}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4FC] text-[#0872BB] transition-colors group-hover:bg-[#0872BB] group-hover:text-white">
                  <Mail size={17} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[11px] text-slate-500">
                    Email us
                  </span>
                  <span className="block text-[14px] font-semibold text-[#082F59]">
                    {EMAIL}
                  </span>
                </span>
              </a>

              {/* Search */}
              <form
                onSubmit={handleSearch}
                role="search"
                className="header-top-item flex h-10 w-full min-w-[150px] max-w-[240px] shrink items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 transition-colors focus-within:border-[#0872BB] focus-within:bg-white"
              >
                <Search size={17} className="shrink-0 text-[#0872BB]" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search services"
                  aria-label="Search website"
                  className="w-full min-w-0 bg-transparent text-[13px] text-[#082F59] outline-hidden placeholder:text-slate-400"
                />
              </form>

              {/* Language */}
              <div
                className="header-top-item flex shrink-0 items-center gap-2 text-[#082F59]"
                role="group"
                aria-label="Language"
              >
                <Globe size={17} className="text-[#0872BB]" />
                <div className="flex rounded-full bg-slate-100 p-0.5">
                  {(["en", "ar"] as const).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLang(code)}
                      aria-pressed={lang === code}
                      className={`rounded-full px-3 py-1 text-[12px] font-semibold transition-colors ${focusRing} ${
                        lang === code
                          ? "bg-[#082F59] text-white"
                          : "text-[#082F59] hover:text-[#0872BB]"
                      }`}
                    >
                      {code === "en" ? "EN" : "AR"}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleBook}
                className={`header-top-item flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-[#0872BB] px-6 text-[13px] font-bold text-white shadow-xs transition-colors duration-300 hover:bg-[#082F59] ${focusRing}`}
              >
                Get a free quote
              </button>
            </div>

            {/* Mobile / tablet actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={handleBook}
                className={`flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-[#0872BB] px-3.5 text-[12px] font-bold text-white transition-colors hover:bg-[#082F59] ${focusRing}`}
              >
                Free quote
              </button>
            </div>

            {/* Hamburger (visible whenever the nav bar is hidden) */}
            <button
              type="button"
              onClick={() => setMenu(!menu)}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#082F59] text-white xl:hidden ${focusRing}`}
            >
              {menu ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* ================= NAV BAR (xl and up) ================= */}
        <div className="relative hidden w-full bg-[#082F59] xl:block">
          <nav
            aria-label="Main navigation"
            className="site-container flex items-stretch justify-between"
          >
            {NAV_LINKS.map((item) => {
              const dropdown = item.children ?? null;
              const isOpen = !!dropdown && activeDropdown === item.label;
              const isActive = isActiveLink(item, pathname);
              const itemClass = `header-nav-item relative flex items-center gap-1 whitespace-nowrap px-3 py-3.5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-white/10 2xl:px-4 2xl:text-[14px] ${focusRing} focus-visible:-outline-offset-2 focus-visible:outline-white ${
                isActive ? "bg-white/10" : ""
              }`;
              const underline = (
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-[#3FA9F5] transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              );

              return (
                <div
                  key={item.label}
                  className="relative flex shrink-0 items-stretch"
                  onMouseEnter={() => dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => dropdown && setActiveDropdown(null)}
                >
                  {dropdown ? (
                    <button
                      type="button"
                      onClick={() => setActiveDropdown((cur) => (cur === item.label ? null : item.label))}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-current={isActive ? "true" : undefined}
                      className={itemClass}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        strokeWidth={2.5}
                        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                      {underline}
                    </button>
                  ) : (
                    <Link href={item.href} onClick={closeMenus} aria-current={isActive ? "page" : undefined} className={itemClass}>
                      {item.label}
                      {underline}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {dropdown && (
                    <div
                      className={`absolute left-0 top-full z-[10001] w-[300px] transition-all duration-200 ease-out ${
                        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-b-lg border border-t-0 border-slate-100 bg-white shadow-[0_16px_40px_rgba(8,47,89,0.18)]">
                        <div className="p-2">
                          {dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={closeMenus}
                              className={`group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors hover:bg-[#EFF7FF] ${focusRing}`}
                            >
                              <span>
                                <span className="block text-[14px] font-semibold text-[#082F59] group-hover:text-[#0872BB]">
                                  {sub.label}
                                </span>
                                {sub.description && (
                                  <span className="mt-0.5 block text-[12px] text-slate-500">{sub.description}</span>
                                )}
                              </span>
                              <ArrowRight
                                size={15}
                                className="shrink-0 text-[#0872BB] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      <MobileMenu open={menu} onClose={() => setMenu(false)} onBook={handleBook} />
    </>
  );
}