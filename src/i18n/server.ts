import { headers } from "next/headers";
import type { Lang } from "./LangProvider";

/** Language of the current request (/ar/* pages are rewritten by src/proxy.ts with x-lang: ar). */
export async function getLang(): Promise<Lang> {
  return (await headers()).get("x-lang") === "ar" ? "ar" : "en";
}

/** hreflang links for a page path such as "/contact-us/". */
export function langAlternates(path: string) {
  return { canonical: path, languages: { en: path, ar: path === "/" ? "/ar/" : `/ar${path}` } };
}
