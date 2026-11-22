import type { Metadata, Viewport } from "next";
import { Cairo, Inter, Lilita_One, Montserrat, Oswald } from "next/font/google";

import BookingJourneyProvider from "@/components/booking-journey/BookingJourneyProvider";
import CallAdvisor from "@/components/layout/CallAdvisor";
import GoogleTranslate from "@/components/layout/GoogleTranslate";
import ScrollManager from "@/components/layout/ScrollManager";
import ScrollProgress from "@/components/layout/ScrollProgress";
import MotionProvider from "@/components/providers/MotionProvider";

import "./globals.css";

/** Body text, buttons, forms — Inter is built for screens and stays crisp at small sizes. */
const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-inter",
});

/** Headings + hero title — Oswald's tall, condensed letters give the automotive / performance feel. */
const oswald = Oswald({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-oswald",
});

/** Brand wordmark ("RITZ AUTO CARE LLC") — Lilita One: heavy, rounded-corner sign lettering like the logo artwork. */
const brandFont = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-brand",
});

/** Homepage hero title only ("Ritz Auto / Care LLC") — kept in its original Montserrat Black Italic. */
const heroFont = Montserrat({
  subsets: ["latin"],
  weight: "900",
  style: "italic",
  display: "swap",
  variable: "--font-hero",
});

/** Arabic text — Inter and Oswald have no Arabic letters, so the browser takes them from Cairo. */
const arabicFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Ritz Auto Care LLC | Car Service, Repair & Maintenance in Dubai",
  description:
    "Car service, repair and maintenance in Dubai — expert technicians, genuine parts, free pick-up & drop-off and 24/7 roadside support from our workshop in Dubai Investment Park.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // lang/dir switch to ar/rtl in the browser when a visitor picks Arabic (Google Translate)
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${oswald.variable} ${heroFont.variable} ${brandFont.variable} ${arabicFont.variable}`}
    >
      <head>
        {/* videos (hero, booking journey) come from Cloudinary — open the connection early */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>
        <MotionProvider>
          <BookingJourneyProvider>
            {children}
            <ScrollProgress />
            <CallAdvisor />
            <ScrollManager />
          </BookingJourneyProvider>
        </MotionProvider>
        <GoogleTranslate />
      </body>
    </html>
  );
}
