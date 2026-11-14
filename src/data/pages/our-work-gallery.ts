/**
 * Photos from https://ritzautocare.ae/our-work-gallery/ (original site, 20 gallery photos + hero; gal-7 does not exist there).
 * The original has no alt text or captions — the descriptions below were written from what each photo shows.
 */

const IMG = "/images/pages/our-work-gallery";

export const GALLERY_HERO = `${IMG}/hero.webp`;

const ALTS = [
  "Mercedes-AMG engine bay opened for service",
  "Engine mounted on a stand during an engine rebuild",
  "Engine timing chain and gears during a rebuild",
  "SUV raised on a two-post lift",
  "Engine block stripped down for a rebuild",
  "Disassembled cylinder head and engine parts",
  "Technician working under an SUV on a lift",
  "White Audi raised on a lift",
  "Yellow Chevrolet Camaro with the bonnet open",
  "Car AC service machine connected to a Chevrolet Camaro",
  "Range Rover on a lift in the workshop",
  "Close-up of an engine timing chain",
  "Red sports car on a scissor lift",
  "Engine bay of a red sports car",
  "Minivan being serviced in the workshop",
  "Range Rover with its engine removed for repair",
  "Workshop bays with cars under service",
  "BMW raised on a lift",
  "Audi raised on a lift in the workshop",
  "Lexus in the Ritz Auto Care workshop",
];

export const GALLERY = ALTS.map((alt, i) => ({
  src: `${IMG}/work-${String(i + 1).padStart(2, "0")}.webp`,
  alt,
}));
