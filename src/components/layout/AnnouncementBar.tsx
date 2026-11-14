"use client";

import { MessageCircle, Phone } from "lucide-react";

import { StickyBanner } from "@/components/ui/sticky-banner";
import { SITE_CONTACT, waLink } from "@/config/site";

/** Top announcement bar (same message and numbers as the bar on ritzautocare.ae). */
export default function AnnouncementBar() {
  const whatsappDisplay = `+${SITE_CONTACT.whatsapp.slice(0, 3)} ${SITE_CONTACT.whatsapp.slice(3)}`;

  return (
    <StickyBanner hideOnScroll className="bg-linear-to-r from-[#0B477D] via-[#1766AE] to-[#0B477D] text-white">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-center text-[13px] sm:text-sm">
        <p className="drop-shadow-sm">
          <span className="hidden md:inline">Get a Free Pick up &amp; Drop off, Car Wash &amp; 360 Degree Inspection</span>
          <span className="md:hidden">Free Pick up, Car Wash &amp; Inspection</span>
          <span className="mx-3 hidden text-white/50 lg:inline">|</span>
          <span className="hidden lg:inline">WhatsApp Us:</span>
        </p>
        <div className="flex items-center gap-2">
          <a
            href={waLink(SITE_CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#25D366] px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe5a] sm:h-8 sm:px-4 sm:text-[13px]"
          >
            <MessageCircle size={14} />
            {whatsappDisplay}
          </a>
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#E53935] px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#c62828] sm:h-8 sm:px-4 sm:text-[13px]"
          >
            <Phone size={14} />
            <span className="hidden min-[400px]:inline">Toll-Free:</span> {SITE_CONTACT.phone}
          </a>
        </div>
      </div>
    </StickyBanner>
  );
}
