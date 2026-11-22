import { NAV_LINKS } from "@/config/site";
import { BRAND_MENU } from "@/data/pages/brand-menu";
import { SERVICE_MENU } from "@/data/pages/service-menu";
import { APPOINTMENT_SERVICES, APPOINTMENT_SERVICES_AR } from "@/data/pages/appointment";
import { services as HOME_SERVICES } from "@/data/services";

/** One thing the header search can find. */
export interface SearchItem {
  kind: "service" | "brand" | "page";
  title: string;
  /** Arabic name — never shown (Google Translate translates the page); it lets Arabic visitors search in Arabic. */
  titleAr: string;
  /** Small grey line under the title. */
  sub: string;
  href: string;
  /** Brand logo (brands only). */
  logo?: string;
  /** Extra words people type (synonyms, models, Arabic spellings). Not shown. */
  keywords: string;
}

/* ------------------------------------------------------------------ */
/* Extra search words                                                  */
/* ------------------------------------------------------------------ */

/** Words customers use for each service (English + Arabic). */
const SERVICE_KEYWORDS: Record<string, string> = {
  "car-battery-replacement": "battery batteries dead battery change replace بطارية بطاريات",
  "jump-start": "jumpstart boost dead battery car not starting won't start تشغيل بطارية فارغة",
  "flat-tyre-change": "flat tire tyre puncture punctured wheel spare بنشر إطار مثقوب كفر",
  "fuel-delivery-service": "fuel petrol diesel gas empty tank وقود بنزين ديزل",
  "car-oil-change": "oil engine oil lube filter service زيت تغيير زيت فلتر",
  "car-ac-repair-service": "ac a/c air conditioning aircon cooling not cold مكيف تكييف",
  "car-ac-gas-refilling": "ac gas freon refrigerant recharge regas cooling غاز مكيف فريون",
  "engine-rebuild": "engine overhaul motor rebuild mechanic محرك مكينة",
  "brake-pad-change": "brakes brake pads discs rotors noise squeal فرامل بريك",
  "gear-oil-change": "gearbox transmission atf gear oil قير ناقل الحركة",
  "car-polishing-detailing": "polish detailing wash ceramic coating clean shine تلميع تنظيف غسيل",
  "car-electric-repair": "electrical electric wiring lights starter alternator كهرباء",
  "new-tyres-change": "tyres tires new tyre tire wheels إطارات كفرات",
  "suspension-repair": "suspension shocks shock absorbers struts noise تعليق مساعدات",
  "steering-box-repair": "steering rack power steering wheel توجيه دركسون",
  "fuel-system-repair": "fuel pump injectors fuel system وقود بخاخات طرمبة",
  "wheel-alignment-wheel-balancing": "alignment balancing wheels vibration ترصيص ميزان أذرعة",
  "car-electronic-equipment-programing": "programming coding ecu key diagnostics computer برمجة كمبيوتر",
  "transporting-towing-vehicles": "towing tow truck recovery breakdown flatbed سطحة سحب ونش",
  "car-denting-painting": "dent denting paint painting scratch body shop accident سمكرة صبغ دهان",
  "car-upholstery": "upholstery seats leather interior تنجيد مقاعد جلد",
  "auto-glass": "glass windshield windscreen window زجاج",
};

/** Arabic brand names + popular models, so "مرسيدس" or "patrol" finds the right brand. */
const BRAND_EXTRA: Record<string, { ar: string; words?: string }> = {
  Mercedes: { ar: "مرسيدس", words: "mercedes-benz benz amg g-class g63 s-class e-class c-class gle بنز" },
  BMW: { ar: "بي إم دبليو", words: "bmw x5 x6 x7 m3 m5 7 series بي ام" },
  Audi: { ar: "أودي", words: "a4 a6 a8 q5 q7 q8 rs" },
  Porsche: { ar: "بورشه", words: "cayenne 911 macan panamera taycan" },
  Volkswagen: { ar: "فولكس فاجن", words: "vw golf passat touareg tiguan" },
  Maybach: { ar: "مايباخ" },
  Cadillac: { ar: "كاديلاك", words: "escalade" },
  Chevrolet: { ar: "شيفروليه", words: "chevy tahoe silverado camaro suburban" },
  Ford: { ar: "فورد", words: "f-150 f150 mustang explorer expedition raptor" },
  GMC: { ar: "جي إم سي", words: "yukon sierra denali" },
  Jeep: { ar: "جيب", words: "wrangler grand cherokee" },
  Dodge: { ar: "دودج", words: "charger challenger durango ram" },
  Chrysler: { ar: "كرايسلر", words: "300c" },
  Lincoln: { ar: "لينكون", words: "navigator" },
  Hummer: { ar: "همر", words: "h2 h3" },
  Mercury: { ar: "ميركوري" },
  "Rolls-Royce": { ar: "رولز رويس", words: "rolls royce cullinan ghost phantom" },
  Bentley: { ar: "بنتلي", words: "bentayga continental" },
  "Land Rover": { ar: "لاند روفر", words: "range rover defender discovery رنج روفر" },
  Jaguar: { ar: "جاكوار" },
  "Aston Martin": { ar: "أستون مارتن" },
  McLaren: { ar: "ماكلارين" },
  Lotus: { ar: "لوتس" },
  Mini: { ar: "ميني", words: "cooper" },
  Ferrari: { ar: "فيراري" },
  Lamborghini: { ar: "لامبورغيني", words: "urus huracan" },
  Maserati: { ar: "مازيراتي" },
  Fiat: { ar: "فيات" },
  Peugeot: { ar: "بيجو" },
  Renault: { ar: "رينو" },
  Volvo: { ar: "فولفو" },
  Toyota: { ar: "تويوتا", words: "land cruiser prado camry corolla hilux fortuner لاندكروزر برادو كامري" },
  Lexus: { ar: "لكزس", words: "lx570 lx600 es ls rx" },
  Nissan: { ar: "نيسان", words: "patrol altima sunny x-trail باترول" },
  Infiniti: { ar: "إنفينيتي", words: "qx80 qx60" },
  Honda: { ar: "هوندا", words: "accord civic crv" },
  Mazda: { ar: "مازدا", words: "cx-5 cx-9" },
  Mitsubishi: { ar: "ميتسوبيشي", words: "pajero lancer" },
  Subaru: { ar: "سوبارو" },
  Suzuki: { ar: "سوزوكي" },
  Hyundai: { ar: "هيونداي", words: "elantra sonata tucson santa fe" },
  Kia: { ar: "كيا", words: "sportage sorento cerato" },
  Genesis: { ar: "جينيسيس" },
  MG: { ar: "إم جي", words: "morris garages zs hs mg5" },
  Changan: { ar: "شانجان" },
};

/** Arabic names of the menu pages (search keywords only). */
const PAGE_NAMES_AR: Record<string, string> = {
  "/roadside-support/": "المساعدة على الطريق",
  "/service/": "الخدمات",
  "/service/auto-spare-parts-trading/": "قطع غيار السيارات",
  "/brands/": "العلامات التجارية",
  "/buy-car-batteries/": "بطاريات السيارات",
  "/buy-car-tires/": "إطارات السيارات",
  "/service-contract/": "عقد الصيانة",
  "/complimentary-vehicle-inspection/": "فحص مجاني للسيارة",
  "/about-us/": "من نحن",
  "/our-work-gallery/": "معرض أعمالنا",
  "/customer-reviews/": "آراء العملاء",
  "/service-areas/": "مناطق الخدمة",
  "/blog/": "المدونة",
  "/careers/": "الوظائف",
  "/contact-us/": "اتصل بنا",
};

/** Page each homepage service card (src/data/services.ts, by id) leads to. */
const HOME_SERVICE_HREF: Record<string, string> = {
  "01": "/service/", // Expert Car Repairs
  "02": "/roadside-support/",
  "03": "/buy-car-batteries/",
  "04": "/buy-car-tires/",
  "05": "/service/#service-car-oil-change", // Periodic Maintenance
  "06": "/service-contract/",
  "07": "/service/#service-car-ac-repair-service",
  "08": "/complimentary-vehicle-inspection/",
  "09": "/service/#service-car-polishing-detailing",
};

/* ------------------------------------------------------------------ */
/* Index                                                               */
/* ------------------------------------------------------------------ */

function buildIndex(): SearchItem[] {
  const services: SearchItem[] = SERVICE_MENU.map((s) => ({
    kind: "service",
    title: s.title,
    titleAr: s.titleAr,
    sub: "Car service",
    href: s.href,
    keywords: SERVICE_KEYWORDS[s.slug] ?? "",
  }));

  /** Adds words to an existing service when another list names the same service (no duplicate rows). */
  const sameService = (name: string) => {
    const n = normalize(name);
    return services.find((s) => normalize(s.title).includes(n));
  };

  // Homepage service cards ("Battery Services", "Car AC Services"…) — each opens its closest page.
  for (const card of HOME_SERVICES) {
    const href = HOME_SERVICE_HREF[card.id] ?? "/service/";
    const words = [card.title, card.category, ...card.features].join(" ");
    const existing = services.find((s) => s.href === href);
    if (existing) existing.keywords += ` ${words}`;
    else
      services.push({
        kind: "service",
        title: card.title,
        titleAr: card.title,
        sub: card.description,
        href,
        keywords: words,
      });
  }

  // Every option of the appointment form — opens the booking form with that service already picked.
  for (const name of APPOINTMENT_SERVICES) {
    if (name === "Other Service") continue;
    const existing = sameService(name);
    if (existing) {
      existing.keywords += ` ${name} ${APPOINTMENT_SERVICES_AR[name]}`;
      continue;
    }
    services.push({
      kind: "service",
      title: name,
      titleAr: APPOINTMENT_SERVICES_AR[name],
      sub: "Book this service",
      href: `/contact-us/?service=${encodeURIComponent(name)}#appointment`,
      keywords: "book booking appointment حجز موعد",
    });
  }

  const brands: SearchItem[] = BRAND_MENU.flatMap((g) =>
    g.brands.map((b) => ({
      kind: "brand" as const,
      title: b.name,
      titleAr: BRAND_EXTRA[b.name]?.ar ?? b.name,
      sub: `${g.nationality} brand · repair & service`,
      href: b.href,
      logo: b.logo,
      keywords: `${BRAND_EXTRA[b.name]?.words ?? ""} ${BRAND_EXTRA[b.name]?.ar ?? ""} ${g.nationality} car cars`,
    })),
  );

  // Every page from the main menu (top level + dropdown children), once each.
  const seen = new Set<string>([...services, ...brands].map((i) => i.href));
  const pages: SearchItem[] = [];
  for (const link of NAV_LINKS) {
    for (const l of [link, ...(link.children ?? [])]) {
      if (seen.has(l.href) || l.href === "/") continue;
      seen.add(l.href);
      pages.push({
        kind: "page",
        title: l.label,
        titleAr: PAGE_NAMES_AR[l.href] ?? l.label,
        sub: l.description ?? "Page",
        href: l.href,
        keywords: "",
      });
    }
  }
  return [...services, ...brands, ...pages];
}

export const SEARCH_INDEX: SearchItem[] = buildIndex();

/* ------------------------------------------------------------------ */
/* Matching                                                            */
/* ------------------------------------------------------------------ */

/** Lower-case, no accents/Arabic diacritics, common spelling variants folded together. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ًͯ-ٰٟـ]/g, "") // Latin accents, Arabic harakat, tatweel
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/tyre/g, "tire")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

interface Prepared {
  item: SearchItem;
  title: string;
  titleAr: string;
  /** Every word of the title, Arabic title, sub line and keywords. */
  tokens: string[];
}
const PREPARED: Prepared[] = SEARCH_INDEX.map((item) => ({
  item,
  title: normalize(item.title),
  titleAr: normalize(item.titleAr),
  tokens: normalize(`${item.title} ${item.titleAr} ${item.sub} ${item.keywords}`).split(" "),
}));

/**
 * A typed word matches the start of a word ("brak" → brake), also after the Arabic article ال.
 * Very short words ("ac", "vw") must match a whole word, so "ac" doesn't find "accord" or "accident".
 */
const wordMatches = (tokens: string[], w: string) =>
  tokens.some((tok) => {
    const bare = tok.startsWith("ال") ? tok.slice(2) : tok;
    return w.length <= 2 ? tok === w || bare === w : tok.startsWith(w) || bare.startsWith(w);
  });

const KIND_BONUS: Record<SearchItem["kind"], number> = { brand: 3, service: 2, page: 0 };

/** Best matches for `query` (every word must match somewhere), best first. */
export function searchSite(query: string, limit = 8): SearchItem[] {
  const q = normalize(query);
  if (!q) return [];
  const words = q.split(" ");
  const scored: { item: SearchItem; score: number }[] = [];

  for (const p of PREPARED) {
    if (!words.every((w) => wordMatches(p.tokens, w))) continue;
    let score = KIND_BONUS[p.item.kind];
    for (const name of [p.title, p.titleAr]) {
      if (name === q) score = Math.max(score, 100);
      else if (name.startsWith(q)) score = Math.max(score, 60);
      else if (words.every((w) => wordMatches(name.split(" "), w))) score = Math.max(score, 40);
    }
    // otherwise it matched through a keyword or model name (e.g. "patrol" → Nissan)
    scored.push({ item: p.item, score: score + 10 });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((s) => s.item);
}

/** Shown before the visitor types anything. */
export const POPULAR_SEARCHES: SearchItem[] = [
  "/service/car-battery-replacement/",
  "/service/#service-car-ac-repair-service",
  "/service/#service-car-oil-change",
  "/roadside-support/",
]
  .map((href) => SEARCH_INDEX.find((i) => i.href === href))
  .filter((i): i is SearchItem => !!i);

export const POPULAR_BRANDS: SearchItem[] = ["Mercedes", "BMW", "Toyota", "Nissan", "Land Rover", "Porsche"]
  .map((name) => SEARCH_INDEX.find((i) => i.kind === "brand" && i.title === name))
  .filter((i): i is SearchItem => !!i);
