/** Content of https://ritzautocare.ae/buy-car-batteries/ (original site). No prices are listed there. */

const IMG = "/images/pages/buy-car-batteries";

export interface BatteryProduct {
  brand: string;
  name: string;
  /** Specs as they appear in the original product name */
  specs: string[];
  image: string;
}

export const BATTERY_PRODUCTS: BatteryProduct[] = [
  {
    brand: "Bosch",
    name: "Bosch - 115D31L Left Terminal 12V JIS 95AH Car Battery",
    specs: ["115D31L", "Left Terminal", "12V", "JIS", "95AH"],
    image: `${IMG}/products/bosch.webp`,
  },
  {
    brand: "Energizer",
    name: "Energizer - 105D31L 12V JIS 75AH Car Battery",
    specs: ["105D31L", "12V", "JIS", "75AH"],
    image: `${IMG}/products/energizer.webp`,
  },
  {
    brand: "Fiamm",
    name: "Fiamm 12V AGM 12AH Car Battery",
    specs: ["12V", "AGM", "12AH"],
    image: `${IMG}/products/fiamm.webp`,
  },
  {
    brand: "Powertech",
    name: "Powertech - 105D31L 12V Left Terminal 95 AH JIS Car Battery",
    specs: ["105D31L", "12V", "Left Terminal", "95 AH", "JIS"],
    image: `${IMG}/products/powertech.webp`,
  },
];

/** Battery brand logos shown on the original page. */
export const BATTERY_BRANDS = [
  "Amaron",
  "Bosch",
  "Eveready",
  "Varta",
  "Zeetex",
  "Volta",
  "Eastman",
  "ACDelco",
  "Energizer",
  "Powertech",
].map((name) => ({ name, logo: `${IMG}/brands/${name.toLowerCase()}.webp` }));
