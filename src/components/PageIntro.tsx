import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Crumb } from "@/lib/seo";

export function PageIntro({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="wrap py-10 md:py-14">
        {crumbs && <Breadcrumbs items={crumbs} className="mb-6" />}
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl leading-[1.08] md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-[var(--color-ink-soft)] md:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
