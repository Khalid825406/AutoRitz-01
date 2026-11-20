import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Cairo, Fraunces, Montserrat } from "next/font/google";

import BookingJourneyProvider from "@/components/booking-journey/BookingJourneyProvider";
import CallAdvisor from "@/components/layout/CallAdvisor";
import ScrollManager from "@/components/layout/ScrollManager";
import ScrollProgress from "@/components/layout/ScrollProgress";
import MotionProvider from "@/components/providers/MotionProvider";
import { LangProvider, type Lang } from "@/i18n/LangProvider";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});

/** Brand wordmark ("RITZ AUTO CARE LLC") — Fraunces with the SOFT axis turned up reads like the logo's Cooper-style lettering. */
const brandFont = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK"],
  display: "swap",
  variable: "--font-brand",
});

/** Arabic text — Montserrat has no Arabic letters, so the browser takes them from Cairo. */
const arabicFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-arabic",
});

/** "ar" on /ar/... (set by src/proxy.ts), otherwise "en". */
async function getLang(): Promise<Lang> {
  return (await headers()).get("x-lang") === "ar" ? "ar" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return lang === "ar"
    ? {
        title: "ريتز أوتو كير ذ.م.م | صيانة وإصلاح السيارات في دبي",
        description:
          "صيانة وإصلاح وخدمة السيارات في دبي — فنيون خبراء، قطع غيار أصلية، استلام وتوصيل مجاني ومساعدة على الطريق على مدار الساعة من ورشتنا في مجمع دبي للاستثمار.",
        alternates: { languages: { en: "/", ar: "/ar/" } },
      }
    : {
        title: "Ritz Auto Care LLC | Car Service, Repair & Maintenance in Dubai",
        description:
          "Car service, repair and maintenance in Dubai — expert technicians, genuine parts, free pick-up & drop-off and 24/7 roadside support from our workshop in Dubai Investment Park.",
        alternates: { languages: { en: "/", ar: "/ar/" } },
      };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLang();
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${montserrat.variable} ${brandFont.variable} ${arabicFont.variable}`}
    >
      <head>
        {/* videos (hero, booking journey) come from Cloudinary — open the connection early */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>
        <LangProvider lang={lang}>
        <MotionProvider>
          <BookingJourneyProvider>
            {children}
            <ScrollProgress />
            <CallAdvisor />
            <ScrollManager />
          </BookingJourneyProvider>
        </MotionProvider>
        </LangProvider>
      </body>
    </html>
  );
}
