"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

/**
 * next/image that shows `fallback` instead of a broken image
 * when the file is missing or fails to load.
 */
export default function SafeImage({ fallback, alt, ...props }: ImageProps & { fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <Image alt={alt} {...props} onError={() => setFailed(true)} />;
}
