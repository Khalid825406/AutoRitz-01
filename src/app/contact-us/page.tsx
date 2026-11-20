import type { Metadata } from "next";

import ContactUsPage from "@/components/pages/contact-us/ContactUsPage";
import { getLang, langAlternates } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const ar = (await getLang()) === "ar";
  return ar
    ? {
        title: "اتصل بنا - ريتز أوتو كير لصيانة السيارات في دبي",
        description:
          "تواصل مع ريتز أوتو كير ذ.م.م — الرقم المجاني 80079772، واتساب ‎+971 567807979، info@ritzautocare.ae. مستودع 35، شارع 59، بالقرب من آيكو مول، مجمع دبي للاستثمار الأول، دبي.",
        alternates: { ...langAlternates("/contact-us/"), canonical: "/ar/contact-us/" },
      }
    : {
        title: "Contact Us - Ritz Auto Care Car Garage Dubai, UAE",
        description:
          "Contact Ritz Auto Care LLC — toll free 80079772, WhatsApp +971 567807979, info@ritzautocare.ae. Warehouse 35, Street 59, near AIKO Mall, Dubai Investment Park First, Dubai.",
        alternates: langAlternates("/contact-us/"),
      };
}

export default function Page() {
  return <ContactUsPage />;
}
