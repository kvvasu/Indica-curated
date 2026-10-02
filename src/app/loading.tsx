export default function Loading() {
  return (
    <div className="wrap py-16 md:py-24" aria-busy="true" aria-live="polite">
      <p className="sr-only">Loading content…</p>
      <div className="h-4 w-24 bg-[var(--color-line)]" />
      <div className="mt-6 h-12 w-2/3 max-w-xl bg-[var(--color-line)]" />
      <div className="mt-4 h-4 w-1/2 max-w-md bg-[var(--color-line)]" />
      <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="card overflow-hidden">
            <div className="aspect-[4/3] bg-[var(--color-line)]" />
            <div className="grid gap-3 p-4">
              <div className="h-3 w-1/3 bg-[var(--color-line)]" />
              <div className="h-5 w-2/3 bg-[var(--color-line)]" />
              <div className="h-3 w-full bg-[var(--color-line)]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
