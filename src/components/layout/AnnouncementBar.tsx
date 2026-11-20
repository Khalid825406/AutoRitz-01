"use client";

import { useLang } from "@/i18n/LangProvider";
import { MessageCircle, Phone } from "lucide-react";

import { StickyBanner } from "@/components/ui/sticky-banner";
import { SITE_CONTACT, waLink } from "@/config/site";

/** Top announcement bar (same message and numbers as the bar on ritzautocare.ae). */
export default function AnnouncementBar() {
  const { t } = useLang();
  const whatsappDisplay = `+${SITE_CONTACT.whatsapp.slice(0, 3)} ${SITE_CONTACT.whatsapp.slice(3)}`;

  return (
    <StickyBanner hideOnScroll className="bg-linear-to-r from-[#1B2029] via-[#0B6FC2] to-[#1B2029] text-white">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-center text-[13px] sm:text-sm">
        <p className="drop-shadow-sm">
          <span className="hidden md:inline">{t("Get a Free Pick up & Drop off, Car Wash & 360 Degree Inspection", "استلام وتوصيل مجاني، غسيل السيارة وفحص شامل 360 درجة")}</span>
          <span className="md:hidden">{t("Free Pick-up & Drop-off, Car Wash & 360° Inspection", "استلام وتوصيل مجاني، غسيل وفحص 360°")}</span>
          <span className="mx-3 hidden text-white/50 lg:inline">|</span>
          <span className="hidden lg:inline">{t("WhatsApp Us:", "واتساب:")}</span>
        </p>
        <div className="flex items-center gap-2">
          <a
            href={waLink(SITE_CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#25D366] px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe5a] sm:h-8 sm:px-4 sm:text-[13px]"
          >
            <MessageCircle size={14} />
            <span dir="ltr">{whatsappDisplay}</span>
          </a>
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#E53935] px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#c62828] sm:h-8 sm:px-4 sm:text-[13px]"
          >
            <Phone size={14} />
            <span className="hidden min-[400px]:inline">{t("Toll-Free:", "الرقم المجاني:")}</span> {SITE_CONTACT.phone}
          </a>
        </div>
      </div>
    </StickyBanner>
  );
}
