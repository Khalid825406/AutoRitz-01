/**
 * Content of https://ritzautocare.ae/buy-car-tires/ (original site). No prices are listed there.
 * Note: on the original, the Seam and Dunlop cards had each other's photo — fixed here.
 */
import type { ShopBrand, ShopProduct } from "@/components/page/ProductShopPage";

const IMG = "/images/pages/buy-car-tires";

export const TIRE_PRODUCTS: ShopProduct[] = [
  {
    brand: "Bridgestone",
    name: "BRIDGESTONE 175/65R14 82T ECOPIA EP150 - 2023 - Car Tire",
    specs: ["175/65R14", "82T", "Ecopia EP150", "2023"],
    image: `${IMG}/products/bridgestone.webp`,
  },
  {
    brand: "Nexen",
    name: "NEXEN 185R14C 102/100T 8PR ROADIAN CT8 - 2023 - Car Tire",
    specs: ["185R14C", "102/100T", "8PR", "Roadian CT8", "2023"],
    image: `${IMG}/products/nexen.webp`,
  },
  {
    brand: "Seam",
    name: "SEAM 215/60R16 95V GT MAX - 2023 - Car Tire",
    specs: ["215/60R16", "95V", "GT Max", "2023"],
    image: `${IMG}/products/seam.webp`,
  },
  {
    brand: "Dunlop",
    name: "DUNLOP 215/55R17 94Y SPORT MAX060+ TL - 2023 - Car Tire",
    specs: ["215/55R17", "94Y", "Sport Maxx 060+", "TL", "2023"],
    image: `${IMG}/products/dunlop.webp`,
  },
];

/** Tyre brand logos shown on the original page (same order). */
export const TIRE_BRANDS: ShopBrand[] = [
  ["Zeta", "zeeta"],
  ["Yokohama", "yokohama"],
  ["Windforce", "windforce"],
  ["Vitour", "vitour"],
  ["Toyo", "toyo"],
  ["Sumitomo", "sumitomo"],
  ["Sportrak", "sportrak"],
  ["Seam", "seam"],
  ["Roadstone", "roadstone"],
  ["Pirelli", "pirelli"],
  ["Nexen", "nexen"],
  ["Michelin", "michelin"],
  ["Maxxis", "maxxis"],
  ["Mastercraft", "mastercraft"],
  ["Marshal", "marshal"],
  ["Kumho", "kumho"],
  ["Laufenn", "laufenn"],
  ["Hankook", "hankook"],
  ["Continental", "continental"],
  ["Cooper", "cooper"],
  ["Dunlop", "dunlop"],
  ["Falken", "falken"],
  ["Fortune", "fortune"],
  ["Gripmax", "gripmax"],
  ["Bridgestone", "bridgestone"],
  ["Goodyear", "goodyear"],
  ["BFGoodrich", "bfgoodrich"],
  ["Atlas", "atlas"],
  ["Arroyo", "arroyo"],
  ["Armstrong", "armstrong"],
].map(([name, file]) => ({ name, logo: `${IMG}/brands/${file}.webp` }));
