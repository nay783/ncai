"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  links: { href: string; label: string }[];
  ctaLabel: string;
  openLabel: string;
  closeLabel: string;
  languageLabel: string;
};

export function MobileMenu({ links, ctaLabel, openLabel, closeLabel, languageLabel }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 -mr-2 inline-flex size-11 items-center justify-center text-paper"
      >
        {open ? (
          <X aria-hidden size={24} strokeWidth={1.5} />
        ) : (
          <Menu aria-hidden size={24} strokeWidth={1.5} />
        )}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="on-dark fixed inset-0 overflow-y-auto px-[var(--gutter)] pb-8 pt-[calc(var(--header-h)+2rem)]"
      >
        <nav className="flex min-h-full flex-col">
          <ul>
            {links.map((link) => (
              <li key={link.href} className="border-b border-[var(--rule)]">
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block py-5 font-display text-4xl tracking-tight"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between gap-6 pt-10">
            <LanguageSwitcher label={languageLabel} onNavigate={close} />
            <Link
              href="/contact"
              onClick={close}
              className="inline-flex min-h-12 items-center bg-paper px-5 font-display font-medium text-ink"
            >
              {ctaLabel}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
