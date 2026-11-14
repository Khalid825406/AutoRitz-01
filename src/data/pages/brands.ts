/**
 * Brands from https://ritzautocare.ae/brands/ (all 45, same order and slugs as the original).
 * A brand gets its own page only once it has a `detail`; the others are listed but not linked yet.
 * Long passages from the original were summarised where the full text was not readable.
 */
import type { Faq } from "@/components/page/FaqSection";

export interface BrandDetail {
  /** Full brand name used in copy, e.g. "Mercedes-Benz" */
  fullName: string;
  heading: string;
  intro: string;
  heroImage: string;
  models: string[];
  gallery: string[];
  faqs: Faq[];
  metaDescription: string;
}

export interface BrandPageItem {
  slug: string;
  name: string;
  /** Logo in /public/images/brands/ */
  logo: string;
  detail?: BrandDetail;
}

const logo = (file: string) => `/images/brands/${file}.png`;
const IMG = "/images/pages/brands";

export const BRAND_PAGES: BrandPageItem[] = [
  { slug: "mclaren", name: "McLaren", logo: logo("mclaren") },
  { slug: "aston-martin", name: "Aston Martin", logo: logo("aston-martin") },
  { slug: "cadillac", name: "Cadillac", logo: logo("cadillac") },
  { slug: "hummer", name: "Hummer", logo: logo("hummer") },
  { slug: "dodge", name: "Dodge", logo: logo("dodge") },
  { slug: "nissan", name: "Nissan", logo: logo("nissan") },
  { slug: "hyundai", name: "Hyundai", logo: logo("hyundai") },
  { slug: "chevrolet", name: "Chevrolet", logo: logo("chevrolet") },
  { slug: "kia", name: "Kia", logo: logo("kia") },
  { slug: "toyota", name: "Toyota", logo: logo("toyota") },
  { slug: "jeep", name: "Jeep", logo: logo("jeep") },
  { slug: "suzuki", name: "Suzuki", logo: logo("suzuki") },
  { slug: "mazda", name: "Mazda", logo: logo("mazda") },
  { slug: "lexus", name: "Lexus", logo: logo("lexus") },
  { slug: "volkswagen", name: "Volkswagen", logo: logo("volkswagen") },
  { slug: "porsche", name: "Porsche", logo: logo("porsche") },
  { slug: "mg", name: "MG", logo: logo("mg") },
  { slug: "audi", name: "Audi", logo: logo("audi") },
  { slug: "bmw", name: "BMW", logo: logo("bmw") },
  {
    slug: "mercedes",
    name: "Mercedes",
    logo: logo("mercedes-benz"),
    detail: {
      fullName: "Mercedes-Benz",
      heading: "Premium Mercedes-Benz Service Specialists in Dubai",
      intro:
        "Mercedes-Benz stands for the balance of luxury, innovation and performance. At Ritz Auto Care we offer maintenance and repair tailored to Mercedes-Benz engineering, using advanced diagnostic technology and experienced technicians — from scheduled maintenance and engine diagnostics to brake servicing, suspension repairs and advanced mechanical work.",
      heroImage: `${IMG}/mercedes/hero.webp`,
      models: [
        "Mercedes-Benz C-Class",
        "Mercedes-Benz E-Class",
        "Mercedes-Benz S-Class",
        "Mercedes-Benz GLC",
        "Mercedes-Benz GLE",
        "Mercedes-Benz GLS",
        "Mercedes-Benz A-Class",
        "Mercedes-Benz CLA",
        "Mercedes-Benz G-Class",
        "Mercedes-Benz Vito",
      ],
      gallery: [`${IMG}/mercedes/gallery-1.webp`, `${IMG}/mercedes/gallery-2.webp`, `${IMG}/mercedes/gallery-3.webp`],
      faqs: [
        {
          q: "Why Choose Ritz Auto Care for Your Mercedes-Benz?",
          a: "We combine Mercedes-Benz expertise, advanced diagnostics, genuine parts and attentive customer service to deliver dealership-quality maintenance and repairs.",
        },
        {
          q: "Do You Provide a Warranty on Mercedes-Benz Repairs?",
          a: "Yes. We provide a warranty on eligible repairs and genuine parts.",
        },
        {
          q: "How Long Does a Routine Mercedes-Benz Service Take?",
          a: "A routine service typically takes a few hours, depending on the model and the work required.",
        },
        {
          q: "Can I Service My Mercedes-Benz Without an Appointment?",
          a: "Walk-ins are welcome, subject to workshop availability, but we recommend booking in advance.",
        },
        {
          q: "What Mercedes-Benz Services Does Ritz Auto Care Offer?",
          a: "Routine maintenance, engine diagnostics, brake, suspension and transmission repairs, AC service, electrical diagnostics, wheel alignment, detailing and mechanical repairs.",
        },
      ],
      metaDescription:
        "Premium Mercedes-Benz service specialists in Dubai — maintenance, engine diagnostics, brakes, suspension and advanced repairs for C, E, S-Class, GLC, GLE, G-Class and more.",
    },
  },
  { slug: "maserati", name: "Maserati", logo: logo("maserati") },
  { slug: "lamborghini", name: "Lamborghini", logo: logo("lamborghini") },
  { slug: "jaguar", name: "Jaguar", logo: logo("jaguar") },
  { slug: "ferrari", name: "Ferrari", logo: logo("ferrari") },
  { slug: "bentley", name: "Bentley", logo: logo("bentley") },
  { slug: "chrysler", name: "Chrysler", logo: logo("chrysler") },
  { slug: "changan", name: "Changan", logo: logo("changan") },
  { slug: "fiat", name: "Fiat", logo: logo("fiat") },
  { slug: "ford", name: "Ford", logo: logo("ford") },
  { slug: "genesis", name: "Genesis", logo: logo("genesis") },
  { slug: "gmc", name: "GMC", logo: logo("gmc") },
  { slug: "honda", name: "Honda", logo: logo("honda") },
  { slug: "infiniti", name: "Infiniti", logo: logo("infiniti") },
  { slug: "land-rover", name: "Land Rover", logo: logo("land-rover") },
  { slug: "lincoln", name: "Lincoln", logo: logo("lincoln") },
  { slug: "lotus", name: "Lotus", logo: logo("lotus") },
  { slug: "maybach", name: "Maybach", logo: logo("maybach") },
  { slug: "mercury", name: "Mercury", logo: logo("mercury") },
  { slug: "mini", name: "Mini", logo: logo("mini") },
  { slug: "mitsubishi", name: "Mitsubishi", logo: logo("mitsubishi") },
  { slug: "peugeot", name: "Peugeot", logo: logo("peugeot") },
  { slug: "renault", name: "Renault", logo: logo("renault") },
  { slug: "rolls-royce", name: "Rolls-Royce", logo: logo("rolls-royce") },
  { slug: "subaru", name: "Subaru", logo: logo("subaru") },
  { slug: "volvo", name: "Volvo", logo: logo("volvo") },
];

export const getBrandPage = (slug: string) => BRAND_PAGES.find((b) => b.slug === slug);
