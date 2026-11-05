"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/** One observer for the whole page keeps per-section client JavaScript at zero. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
