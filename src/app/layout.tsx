import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

import MotionProvider from "@/components/providers/MotionProvider";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Ritz Auto Care LLC | Complete Car Care & Service in UAE",
  description:
    "Professional auto care, maintenance and repair with quality parts, expert technicians and reliable roadside support across UAE.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
