"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";


/** Contact-page URL that opens the appointment form, pre-filled with `service` when given. */
export const bookingHref = (service?: string) =>
  `/contact-us/${service ? `?service=${encodeURIComponent(service)}` : ""}#appointment`;

/**
 * Handler for every "Book" / "Get a free quote" button: goes to the appointment form
 * on the Contact page, with the chosen service already filled in.
 */
export function useBookService() {
  const router = useRouter();
  return useCallback(
    (service?: string) => {
      // Already on the Contact page: update the pre-filled service and glide to the form.
      if (window.location.pathname === "/contact-us/") {
        router.replace(bookingHref(service), { scroll: false });
        document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // scroll: false — the form scrolls itself into view once the Contact page has rendered.
      router.push(bookingHref(service), { scroll: false });
    },
    [router],
  );
}
