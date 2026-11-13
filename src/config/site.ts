export const SERVICE_TYPES = ["Car Service", "Roadside Support", "Battery Replacement", "Tire Replacement", "Service Contract", "Free Inspection", "Other"] as const;
export const TIME_SLOTS = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"] as const;
export const NAV = [
  { label: "Home", id: "home" }, { label: "Services", id: "services" }, { label: "Brands", id: "brands" },
  { label: "Buy Batteries", id: "batteries" }, { label: "Buy Tires", id: "tires" },
  { label: "Service Contract", id: "contract" }, { label: "Support", id: "support" },
];

/** Business contact details — single source of truth. */
export const CONTACT = {
  phone: "80079772",
  /** WhatsApp number in international format without "+" or spaces, e.g. "971501234567". Leave empty to hide WhatsApp buttons. */
  whatsapp: "",
} as const;

export const whatsappLink = (text = "Hi Ritz Auto Care, I need roadside assistance.") =>
  CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : null;
