/**
 * Blog from https://ritzautocare.ae/blog/ (all 6 posts, same order, titles, dates and categories as the original).
 * A post gets its own page only once it has `content`; the others are listed but not linked yet.
 * Article text was only readable as a summary from the source, so it is written here in our own words
 * while keeping every point and number of the original.
 */

export type BlogBlock = { type: "p"; text: string } | { type: "h2"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  /** Opening sentence of the original excerpt */
  excerpt: string;
  /** Publish date as shown on the original (ISO for <time>) */
  date: string;
  category: string;
  image: string;
  content?: BlogBlock[];
  metaDescription?: string;
  /** Internal pages to recommend at the end of the post */
  related?: { label: string; href: string }[];
}

const IMG = "/images/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    // Original slug contains a broken character ("overheaɵng"); keep it when this post is built so old links still work.
    slug: "coolant-leak-engine-overheating-repair-dubai-ritz-auto-care-llc-dip-1",
    title: "Coolant Leak & Engine Overhauling Repair Dubai | Ritz Auto Care LLC (DIP 1)",
    excerpt:
      "A healthy cooling system is essential for keeping your vehicle running safely and efficiently, especially in Dubai's extreme temperatures.",
    date: "2026-07-08",
    category: "Coolant",
    image: `${IMG}/coolant-leak-engine-overheating.webp`,
  },
  {
    slug: "engine-rebuild-vs-engine-replacement-which-option-is-right-for-your-vehicle",
    title: "Engine Rebuild vs Engine Replacement: Which Option Is Right for Your Vehicle?",
    excerpt: "Engine problems can be one of the most expensive and stressful issues a vehicle owner faces.",
    date: "2026-06-19",
    category: "Engine Services",
    image: `${IMG}/engine-rebuild-vs-replacement.webp`,
  },
  {
    slug: "5-warning-signs-your-car-ac-needs-repair-or-gas-refilling",
    title: "5 Warning Signs Your Car AC Needs Repair or Gas Refilling",
    excerpt:
      "A properly functioning car air conditioning system is essential for a comfortable driving experience, especially during hot weather.",
    date: "2026-06-19",
    category: "AC Repair",
    image: `${IMG}/car-ac-warning-signs.webp`,
  },
  {
    slug: "why-regular-car-oil-changes-are-essential-for-engine-health",
    title: "Why Regular Car Oil Changes Are Essential for Engine Health",
    excerpt:
      "Your vehicle's engine is made up of numerous moving parts that work together under extreme temperatures and pressure.",
    date: "2026-06-19",
    category: "Car Oil Change",
    image: `${IMG}/regular-oil-changes.webp`,
  },
  {
    slug: "what-to-do-when-your-car-gets-a-flat-tyre-on-the-road",
    title: "What to Do When Your Car Gets a Flat Tyre on the Road?",
    excerpt: "A flat tyre can happen unexpectedly and turn a normal journey into a stressful situation.",
    date: "2026-06-19",
    category: "Flat Tyre",
    image: `${IMG}/flat-tyre-on-the-road.webp`,
  },
  {
    slug: "10-signs-your-car-battery-needs-immediate-replacement",
    title: "10 Signs Your Car Battery Needs Immediate Replacement",
    excerpt: "Your car battery is one of the most important components of your vehicle.",
    date: "2026-06-19",
    category: "Car Battery",
    image: `${IMG}/car-battery-signs.webp`,
    metaDescription:
      "Slow cranking, dim headlights, a battery warning light, corrosion or a battery older than 3 years? 10 signs your car battery needs immediate replacement.",
    content: [
      {
        type: "p",
        text: "Your car battery is one of the most important components of your vehicle. It provides the power needed to start the engine and run the electrical systems — but every battery has a limited lifespan and will eventually need replacing. Spotting the warning signs early helps you avoid an unexpected breakdown and costly repairs.",
      },
      { type: "h2", text: "1. Slow Engine Crank" },
      {
        type: "p",
        text: "If your engine takes longer than usual to start, the battery may be losing its ability to hold a charge. A slow crank is often one of the earliest signs of battery failure.",
      },
      { type: "h2", text: "2. Dim Headlights" },
      {
        type: "p",
        text: "A weak battery may not supply enough power to the lighting system. If your headlights look dim — especially with the engine off — it's time for a battery inspection.",
      },
      { type: "h2", text: "3. Dashboard Battery Warning Light" },
      {
        type: "p",
        text: "Modern vehicles have warning indicators for the charging system. If the battery light comes on, it could mean a charging or battery-related problem that needs immediate attention.",
      },
      { type: "h2", text: "4. Frequent Need for Jump Starts" },
      {
        type: "p",
        text: "Needing a jump start more than once is a clear sign the battery is no longer holding a proper charge and may need to be replaced.",
      },
      { type: "h2", text: "5. Electrical Accessories Malfunctioning" },
      {
        type: "p",
        text: "Power windows, the radio, interior lights and other electrical components may perform poorly when the battery is weak.",
      },
      { type: "h2", text: "6. Corrosion Around Battery Terminals" },
      {
        type: "p",
        text: "White, blue or green corrosion around the terminals can interfere with the electrical connection and reduce battery performance.",
      },
      { type: "h2", text: "7. Swollen or Damaged Battery Case" },
      {
        type: "p",
        text: "Extreme temperatures can make the battery case swell or crack. A damaged battery should be replaced immediately for safety reasons.",
      },
      { type: "h2", text: "8. Unusual Clicking Sound When Starting" },
      {
        type: "p",
        text: "A clicking noise when you turn the key or press the start button may mean the battery doesn't have enough power to start the engine.",
      },
      { type: "h2", text: "9. Battery Age Exceeds Three Years" },
      {
        type: "p",
        text: "Most car batteries last three to five years. If yours is older than three years, regular testing is recommended to avoid a sudden failure.",
      },
      { type: "h2", text: "10. Vehicle Struggles in Extreme Weather" },
      {
        type: "p",
        text: "Very hot or cold weather puts extra strain on an aging battery. If your car struggles to start in extreme temperatures, the battery may be near the end of its life.",
      },
    ],
    related: [
      { label: "Car Battery Change service", href: "/service/car-battery-replacement/" },
      { label: "Buy Car Batteries", href: "/buy-car-batteries/" },
      { label: "Roadside Support", href: "/roadside-support/" },
    ],
  },
];

export const getBlogPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
