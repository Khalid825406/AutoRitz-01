"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

export type Lang = "en" | "ar";
/** A piece of text in both languages. */
export type Bi = { en: string; ar: string };

/** Adds the /ar prefix to internal page links when the site is in Arabic. */
export function localizePath(href: string, lang: Lang): string {
  if (lang !== "ar" || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/ar" || href.startsWith("/ar/")) return href;
  if (/^\/(_next|api|images|videos|models|data)\//.test(href) || /\.[a-z0-9]+(\?|#|$)/i.test(href.split("?")[0])) return href;
  return href === "/" ? "/ar/" : `/ar${href}`;
}

/** Removes the /ar prefix (for comparing paths, switching language). */
export function stripLang(pathname: string): string {
  if (pathname === "/ar" || pathname === "/ar/") return "/";
  return pathname.startsWith("/ar/") ? pathname.slice(3) : pathname;
}

interface LangApi {
  lang: Lang;
  dir: "ltr" | "rtl";
  /** Pick the text for the current language: t({ en, ar }) or t("English", "Arabic"). */
  t: (en: string | Bi, ar?: string) => string;
  /** Internal link in the current language. */
  href: (path: string) => string;
}

const LangContext = createContext<LangApi>({
  lang: "en",
  dir: "ltr",
  t: (en, ar) => (typeof en === "string" ? en : en.en) ?? ar ?? "",
  href: (p) => p,
});

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = useCallback(
    (en: string | Bi, ar?: string) => {
      if (typeof en !== "string") return lang === "ar" ? en.ar : en.en;
      return lang === "ar" && ar ? ar : en;
    },
    [lang],
  );
  const href = useCallback((p: string) => localizePath(p, lang), [lang]);
  const api = useMemo<LangApi>(() => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", t, href }), [lang, t, href]);
  return <LangContext.Provider value={api}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
