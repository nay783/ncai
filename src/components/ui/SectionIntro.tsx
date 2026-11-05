import type { ReactNode } from "react";

/** Label in the left margin, headline offset to the right: the site's editorial signature. */
export function SectionIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="grid-12 gap-y-6">
      <p className="label col-span-12 md:col-span-3">{label}</p>
      <div className="col-span-12 md:col-span-9">
        <h2 className="type-display reveal max-w-[18ch]">{title}</h2>
        {children ? <div className="muted type-lead reveal mt-8 max-w-[44ch]">{children}</div> : null}
      </div>
    </header>
  );
}
