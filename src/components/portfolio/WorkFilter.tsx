"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";

export type WorkItem = {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  image: string;
  alt: string;
  summary: string;
};

type Props = {
  items: WorkItem[];
  categories: { id: string; label: string }[];
  allLabel: string;
  filterLabel: string;
  countLabels: Record<string, string>;
  emptyLabel: string;
};

export function WorkFilter({
  items,
  categories,
  allLabel,
  filterLabel,
  countLabels,
  emptyLabel,
}: Props) {
  const [active, setActive] = useState("all");
  const reduced = useReducedMotion();
  const visible = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [active, items],
  );
  const filters = [{ id: "all", label: allLabel }, ...categories];

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-[var(--rule)] pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div
          role="group"
          aria-label={filterLabel}
          className="-mx-[var(--gutter)] flex gap-x-6 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:px-0"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className={`inline-flex min-h-11 shrink-0 items-center whitespace-nowrap font-display text-[0.9375rem] transition-colors ${
                active === f.id
                  ? "text-ink underline underline-offset-8"
                  : "text-graphite hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="label whitespace-nowrap">
          {countLabels[active]}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-graphite">{emptyLabel}</p>
      ) : (
        <ul className="mt-10 grid gap-x-[clamp(1rem,2vw,2rem)] gap-y-14 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.li
                key={item.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/work/${item.slug}`} className="group block">
                  <div className="shot relative aspect-[16/10]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-tight">
                        {item.name}
                      </h2>
                      <p className="label mt-2">{item.categoryLabel}</p>
                      <p className="muted mt-3 max-w-[50ch]">{item.summary}</p>
                    </div>
                    <ArrowUpRight
                      aria-hidden
                      size={24}
                      strokeWidth={1.25}
                      className="shrink-0 transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}
