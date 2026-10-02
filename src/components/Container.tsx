import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  as: Tag = "div",
  className,
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("wrap", className)}>
      {children}
    </Tag>
  );
}

export function Section({
  children,
  className,
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  labelledBy?: string;
}) {
  return (
    <Tag aria-labelledby={labelledBy} className={cn("py-14 md:py-20", className)}>
      {children}
    </Tag>
  );
}
