import { cn } from "@/lib/utils";

/**
 * Progressive-enhancement search: a plain GET form that works without
 * JavaScript and is trivially crawlable.
 */
export function SearchForm({
  defaultValue = "",
  className,
  label = "Search the catalogue",
  action = "/search",
}: {
  defaultValue?: string;
  className?: string;
  label?: string;
  action?: string;
}) {
  const id = "q";
  return (
    <form action={action} role="search" className={cn("w-full", className)}>
      <label htmlFor={id} className="eyebrow mb-2 block">
        {label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder="Try “task lamp” or “stoneware”"
          autoComplete="off"
          className="w-full border border-[var(--color-line-strong)] bg-[var(--color-surface-strong)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]"
        />
        <button type="submit" className="btn shrink-0">
          Search
        </button>
      </div>
    </form>
  );
}
