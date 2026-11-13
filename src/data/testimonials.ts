/** Google rating summary — keep in sync with your Google Business profile. */
export const REVIEW_SUMMARY = {
  rating: 4.5,
  count: 121,
  /** Link to your Google reviews page. Leave empty to hide the link. */
  url: "",
} as const;

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Max Sales2024",
    rating: 5,
    text: "Extremely satisfied with the overall service experience. The staff was professional, friendly and gave on-time service. My car feels like new.",
  },
  { name: "Abu Aboud", rating: 5, text: "Excellent handling, and the technicians work cleanly and professionally." },
  { name: "Nebu George", rating: 5, text: "The service there was pretty good and satisfactory!!" },
];
