import Link from "next/link";
import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="card flex flex-col items-start gap-3 px-6 py-12 md:px-10 md:py-16">
      <p className="eyebrow">Nothing here yet</p>
      <h2 className="text-2xl">{title}</h2>
      <p className="max-w-prose text-sm text-[var(--color-ink-soft)]">{description}</p>
      {children}
      {action && (
        <Link href={action.href} className="btn mt-2">
          {action.label}
        </Link>
      )}
    </div>
  );
}
