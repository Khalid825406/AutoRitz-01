import { SITE_CONTACT } from "@/config/site";
import { CUSTOMER_REVIEWS } from "./pages/customer-reviews";

/** Google rating summary — keep in sync with your Google Business profile. */
export const REVIEW_SUMMARY = {
  rating: 4.5,
  count: 121,
  /**
   * Where the review cards and the rating pill link to: the workshop's Google Maps / Business page
   * (its Reviews tab). Swap in the direct "Read reviews" link from Google Business Profile if you have it.
   */
  url: SITE_CONTACT.mapUrl,
} as const;

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  /** Customer's profile photo, when the original review had one. */
  photo?: string;
}

/**
 * Real customer reviews: the eight from ritzautocare.ae/customer-reviews/ (customers' own words, with
 * their photos where available) plus the two shown on the original homepage.
 */
export const testimonials: Testimonial[] = [
  ...CUSTOMER_REVIEWS.map((r) => ({ name: r.name, rating: r.rating, text: r.text.join(" "), photo: r.photo })),
  { name: "Abu Aboud", rating: 5, text: "Excellent handling, and the technicians work cleanly and professionally." },
  { name: "Nebu George", rating: 5, text: "The service there was pretty good and satisfactory!!" },
];
