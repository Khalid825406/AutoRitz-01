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
  {
    slug: "porsche",
    name: "Porsche",
    logo: logo("porsche"),
    detail: {
      fullName: "Porsche",
      heading: "Expert Porsche Service & Repair in Dubai",
      intro:
        "From the 911 and 718 Boxster to the Panamera, Cayenne and Macan, Porsche owners across Dubai trust Ritz Auto Care with their cars. Our technicians handle Porsche servicing, PIWIS-level diagnostics, engine and PDK transmission work, brakes, suspension, AC, electrical faults and detailing — with genuine and OEM parts.",
      heroImage: `${IMG}/porsche/hero-cayenne.webp`,
      models: [
        "Porsche 911",
        "Porsche 718 Boxster",
        "Porsche 718 Cayman",
        "Porsche Panamera",
        "Porsche Panamera GTS",
        "Porsche Cayenne",
        "Porsche Cayenne Coupé",
        "Porsche Macan",
        "Porsche Taycan",
      ],
      gallery: [`${IMG}/porsche/gallery-1.webp`, `${IMG}/porsche/gallery-2.webp`, `${IMG}/porsche/gallery-3.webp`],
      faqs: [
        {
          q: "Why Choose Ritz Auto Care for Your Porsche?",
          a: "We service Porsches regularly — from the 911 to the Panamera and Cayenne — with advanced diagnostics, genuine and OEM parts and clear, fair pricing.",
        },
        {
          q: "Do You Provide a Warranty on Porsche Repairs?",
          a: "Yes. We provide a warranty on eligible repairs and genuine parts.",
        },
        {
          q: "Can You Service Porsche PDK Gearboxes?",
          a: "Yes. We carry out PDK and Tiptronic fluid services, diagnostics and repairs.",
        },
        {
          q: "Can I Service My Porsche Without an Appointment?",
          a: "Walk-ins are welcome, subject to workshop availability, but we recommend booking in advance.",
        },
        {
          q: "What Porsche Services Does Ritz Auto Care Offer?",
          a: "Routine maintenance, computer diagnostics, engine, brake, suspension and transmission repairs, AC service, battery replacement, wheel alignment, bodywork, painting and detailing.",
        },
      ],
      metaDescription:
        "Expert Porsche service and repair in Dubai — maintenance, diagnostics, PDK, brakes, suspension, AC and detailing for 911, 718 Boxster, Panamera, Cayenne, Macan and more.",
    },
  },
  { slug: "mg", name: "MG", logo: logo("mg") },
  {
    slug: "audi",
    name: "Audi",
    logo: logo("audi"),
    detail: {
      fullName: "Audi",
      heading: "Expert Audi Service & Repair in Dubai",
      intro:
        "From the A4 and Q5 to the RS4, RS Q3 and Q7, Audi owners across Dubai trust Ritz Auto Care with their cars. Our technicians work on Audi TFSI engines, S tronic and quattro systems every day — routine servicing, computer diagnostics, brakes, suspension, AC, electrical faults, bodywork and detailing, using genuine and OEM parts.",
      heroImage: `${IMG}/audi/hero.webp`,
      models: [
        "Audi A3",
        "Audi A4",
        "Audi A5",
        "Audi A6",
        "Audi A8",
        "Audi Q3",
        "Audi Q5",
        "Audi Q7",
        "Audi Q8",
        "Audi RS4 / RS Q3",
      ],
      gallery: [`${IMG}/audi/gallery-1.webp`, `${IMG}/audi/gallery-2.webp`, `${IMG}/audi/gallery-3.webp`],
      faqs: [
        {
          q: "Why Choose Ritz Auto Care for Your Audi?",
          a: "We service Audis every day — from city SUVs to RS models — with advanced diagnostics, genuine and OEM parts and clear, fair pricing.",
        },
        {
          q: "Do You Provide a Warranty on Audi Repairs?",
          a: "Yes. We provide a warranty on eligible repairs and genuine parts.",
        },
        {
          q: "Can You Service Audi RS and quattro Models?",
          a: "Yes. Our technicians regularly work on RS models, TFSI engines and quattro all-wheel-drive systems.",
        },
        {
          q: "Can I Service My Audi Without an Appointment?",
          a: "Walk-ins are welcome, subject to workshop availability, but we recommend booking in advance.",
        },
        {
          q: "What Audi Services Does Ritz Auto Care Offer?",
          a: "Routine maintenance, computer diagnostics, engine, brake, suspension and transmission repairs, AC service, battery replacement, electrical repairs, bodywork, painting and detailing.",
        },
      ],
      metaDescription:
        "Expert Audi service and repair in Dubai — maintenance, diagnostics, brakes, suspension, AC, bodywork and detailing for A4, A5, Q3, Q5, Q7, RS4, RS Q3 and more.",
    },
  },
  {
    slug: "bmw",
    name: "BMW",
    logo: logo("bmw"),
    detail: {
      fullName: "BMW",
      heading: "Expert BMW Service & Repair in Dubai",
      intro:
        "From the 1 Series and 3 Series to the 7 Series, X5, X7 and M models, BMW owners across Dubai bring their cars to Ritz Auto Care. Our technicians use advanced BMW diagnostics for servicing, engine and transmission repairs, brakes, suspension, AC, electrical faults, coding, bodywork and detailing — with genuine and OEM parts.",
      heroImage: `${IMG}/bmw/hero-x7.webp`,
      models: [
        "BMW 1 Series",
        "BMW 3 Series",
        "BMW 5 Series",
        "BMW 7 Series",
        "BMW X1 / X2",
        "BMW X3",
        "BMW X5",
        "BMW X6",
        "BMW X7",
        "BMW M3 / M4 / M340i",
      ],
      gallery: [`${IMG}/bmw/gallery-1.webp`, `${IMG}/bmw/gallery-2.webp`, `${IMG}/bmw/gallery-3.webp`],
      faqs: [
        {
          q: "Why Choose Ritz Auto Care for Your BMW?",
          a: "We work on BMWs every day — from city cars to M models — with advanced BMW diagnostics, genuine and OEM parts and clear, fair pricing.",
        },
        {
          q: "Do You Provide a Warranty on BMW Repairs?",
          a: "Yes. We provide a warranty on eligible repairs and genuine parts.",
        },
        {
          q: "Can You Read and Reset BMW Service Messages?",
          a: "Yes. We read fault codes, reset service intervals and carry out coding with professional diagnostic equipment.",
        },
        {
          q: "Can I Service My BMW Without an Appointment?",
          a: "Walk-ins are welcome, subject to workshop availability, but we recommend booking in advance.",
        },
        {
          q: "What BMW Services Does Ritz Auto Care Offer?",
          a: "Routine maintenance, computer diagnostics and coding, engine, brake, suspension and transmission repairs, AC service, battery replacement, wheel alignment, bodywork, painting and detailing.",
        },
      ],
      metaDescription:
        "Expert BMW service and repair in Dubai — maintenance, diagnostics, coding, brakes, suspension, AC, bodywork and detailing for 3, 5, 7 Series, X3, X5, X7, M models and more.",
    },
  },
  {
    slug: "mercedes",
    name: "Mercedes",
    logo: logo("mercedes-benz"),
    detail: {
      fullName: "Mercedes-Benz",
      heading: "Premium Mercedes-Benz Service Specialists in Dubai",
      intro:
        "Mercedes-Benz stands for the balance of luxury, innovation and performance. At Ritz Auto Care we offer maintenance and repair tailored to Mercedes-Benz engineering, using advanced diagnostic technology and experienced technicians — from scheduled maintenance and engine diagnostics to brake servicing, suspension repairs and advanced mechanical work.",
      heroImage: `${IMG}/mercedes/hero-g63.webp`,
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
      gallery: [`${IMG}/mercedes/gallery-a35.webp`, `${IMG}/mercedes/gallery-gle.webp`, `${IMG}/mercedes/gallery-interior.webp`],
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
