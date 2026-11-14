export const SERVICE_TYPES = ["Car Service", "Roadside Support", "Battery Replacement", "Tire Replacement", "Service Contract", "Free Inspection", "Other"] as const;
export const TIME_SLOTS = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"] as const;
export interface NavLink {
  label: string;
  href: string;
  description?: string;
  children?: NavLink[];
}

/**
 * Main menu (same items and order as ritzautocare.ae). Every link points to a page that exists.
 * Used by the header, the mobile menu and the footer.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Roadside support", href: "/roadside-support/" },
  {
    label: "Services",
    href: "/service/",
    children: [
      { label: "All services", href: "/service/", description: "Complete auto care under one roof" },
      { label: "Car Battery Change", href: "/service/car-battery-replacement/", description: "Testing, replacement and installation" },
      { label: "Auto Spare Parts", href: "/service/auto-spare-parts-trading/", description: "OEM & aftermarket parts trading" },
      { label: "Roadside Support", href: "/roadside-support/", description: "Towing, jump start, fuel delivery" },
    ],
  },
  {
    label: "Brands",
    href: "/brands/",
    children: [
      { label: "All brands", href: "/brands/", description: "We serve & repair all brands & models" },
      { label: "Mercedes-Benz", href: "/brands/mercedes/", description: "Premium Mercedes-Benz specialists" },
    ],
  },
  { label: "Car batteries", href: "/buy-car-batteries/" },
  { label: "Car tires", href: "/buy-car-tires/" },
  { label: "Service contract", href: "/service-contract/" },
  { label: "Free vehicle inspection", href: "/complimentary-vehicle-inspection/" },
  {
    label: "About us",
    href: "/about-us/",
    children: [
      { label: "About Ritz Auto Care", href: "/about-us/", description: "Who we are and our CEO's message" },
      { label: "Our Work Gallery", href: "/our-work-gallery/", description: "Photos from our workshop" },
      { label: "Customer Reviews", href: "/customer-reviews/", description: "What our customers say" },
      { label: "Service Areas", href: "/service-areas/", description: "Areas we cover across Dubai" },
      { label: "Blog", href: "/blog/", description: "Car care tips and advice" },
      { label: "Careers", href: "/careers/", description: "Join our team" },
    ],
  },
  { label: "Contact us", href: "/contact-us/" },
];

/** True when `pathname` is this link's page (or one of its child pages). */
export const isActiveLink = (link: NavLink, pathname: string) => {
  const clean = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  const path = clean(pathname);
  if (link.href === "/") return path === "/";
  return path.startsWith(clean(link.href)) || !!link.children?.some((c) => c.href !== "/" && path.startsWith(clean(c.href)));
};

/** Business contact details — single source of truth. */
export const CONTACT = {
  phone: "80079772",
  /** WhatsApp number in international format without "+" or spaces, e.g. "971501234567". Leave empty to hide WhatsApp buttons. */
  whatsapp: "",
} as const;

export const whatsappLink = (text = "Hi Ritz Auto Care, I need roadside assistance.") =>
  CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : null;

/**
 * Contact details taken from the original site (ritzautocare.ae), used by the inner pages.
 * Kept separate from CONTACT.whatsapp so the homepage stays unchanged.
 */
export const SITE_CONTACT = {
  phone: CONTACT.phone,
  email: "info@ritzautocare.ae",
  /** Main WhatsApp (bookings / enquiries). */
  whatsapp: "971567807979",
  /** WhatsApp used by the roadside "Book Now" buttons on the original site. */
  whatsappRoadside: "971507860493",
  /** Workshop address as shown on the original contact page. */
  address: "(DIP) 1 - Warehouse 35, Street 59 - near AIKO MALL - Dubai Investment Park First - Dubai",
  /** Google Maps link from the original contact page. */
  mapUrl: "https://maps.app.goo.gl/8u8r6j6437fDvt1L9",
  /** Query used for the embedded map (no API key needed). */
  mapQuery: "Ritz Auto Care LLC, Warehouse 35, Street 59, Dubai Investment Park First, Dubai",
} as const;

/** Social profiles from the original site footer. */
export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/RitzAutoCareLLC" },
  { name: "Instagram", href: "https://www.instagram.com/ritzautocare/" },
  { name: "TikTok", href: "https://www.tiktok.com/@ritzautocaredubai" },
  { name: "YouTube", href: "https://www.youtube.com/@ritzautocarellc" },
] as const;

export const waLink = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
