import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "solid" | "outline";

const base =
  "group/btn inline-flex min-h-12 items-center justify-between gap-6 px-6 py-3 font-display text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  solid: "bg-[var(--fg)] text-[var(--bg)] hover:opacity-85",
  outline: "border border-[var(--rule)] text-[var(--fg)] hover:border-[var(--fg)]",
};

type InternalProps = {
  href: ComponentProps<typeof Link>["href"];
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({ href, variant = "outline", children, className = "" }: InternalProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRight
        aria-hidden
        size={18}
        strokeWidth={1.5}
        className="transition-transform duration-500 ease-editorial group-hover/btn:translate-x-1"
      />
    </Link>
  );
}

type ExternalProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Screen-reader note for links that open a new tab. */
  newTabLabel?: string;
};

export function ExternalButton({
  href,
  variant = "outline",
  children,
  className = "",
  newTabLabel,
}: ExternalProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span>
        {children}
        {newTabLabel ? <span className="sr-only"> {newTabLabel}</span> : null}
      </span>
      <ArrowUpRight
        aria-hidden
        size={18}
        strokeWidth={1.5}
        className="transition-transform duration-500 ease-editorial group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
      />
    </a>
  );
}
