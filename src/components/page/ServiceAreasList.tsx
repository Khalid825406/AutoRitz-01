"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICE_AREAS } from "@/data/service-areas";

const EASE = [0.22, 1, 0.36, 1] as const;

/** "Service Areas in Dubai" — compact list of every area we cover (used on brand pages). */
export default function ServiceAreasList() {
  return (
    <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading
            eyebrow="Service areas"
            icon={MapPin}
            title="Service Areas"
            highlight="in Dubai."
            description="Professional car repair, maintenance and roadside assistance across Dubai."
          />
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-2"
          aria-label="Areas we cover"
        >
          {SERVICE_AREAS.map((a) => (
            <li
              key={a.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#082F59]"
            >
              <MapPin size={13} className="text-[#0872BB]" />
              {a.name}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
