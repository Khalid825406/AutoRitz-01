import { BRAND_ORIGINS } from "./brand-origins";
import { BRAND_PAGES } from "./brands";

/** Group heading for each home country (e.g. China → "Chinese"). */
const NATIONALITY: Record<string, string> = {
  Germany: "German",
  "United Kingdom": "British",
  Italy: "Italian",
  France: "French",
  Sweden: "Swedish",
  "United States": "American",
  Japan: "Japanese",
  "South Korea": "Korean",
  China: "Chinese",
};

/** Arabic group names (Arabic site). */
const NATIONALITY_AR: Record<string, string> = {
  Germany: "الألمانية",
  "United Kingdom": "البريطانية",
  Italy: "الإيطالية",
  France: "الفرنسية",
  Sweden: "السويدية",
  "United States": "الأمريكية",
  Japan: "اليابانية",
  "South Korea": "الكورية",
  China: "الصينية",
};

export interface BrandMenuItem {
  name: string;
  slug: string;
  logo: string;
  /** Brand's own page, or the /brands/ grid at its logo when it has no page yet. */
  href: string;
  hasPage: boolean;
}

export interface BrandMenuGroup {
  /** e.g. "Chinese brands" */
  label: string;
  /** e.g. "العلامات الصينية" */
  labelAr: string;
  /** e.g. "الصينية" (tab label on the Arabic site) */
  nationalityAr: string;
  /** e.g. "Chinese" */
  nationality: string;
  country: string;
  brands: BrandMenuItem[];
}

/**
 * Header "Brands" menu: every brand we service, grouped by its home country.
 * Brands with their own page link to it; the others open the /brands/ grid at that brand's logo.
 */
export const BRAND_MENU: BrandMenuGroup[] = BRAND_ORIGINS.map((origin) => {
  const nationality = NATIONALITY[origin.country] ?? origin.country;
  return {
    label: `${nationality} brands`,
    labelAr: `العلامات ${NATIONALITY_AR[origin.country] ?? origin.country}`,
    nationalityAr: NATIONALITY_AR[origin.country] ?? origin.country,
    nationality,
    country: origin.country,
    brands: origin.brands.flatMap((name) => {
      const page = BRAND_PAGES.find((b) => b.name === name);
      if (!page) return [];
      const hasPage = !!page.detail;
      return [{ name, slug: page.slug, logo: page.logo, hasPage, href: hasPage ? `/brands/${page.slug}/` : `/brands/#brand-${page.slug}` }];
    }),
  };
});

export const BRAND_COUNT = BRAND_MENU.reduce((n, g) => n + g.brands.length, 0);
