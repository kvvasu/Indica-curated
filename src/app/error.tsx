"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Route-level error boundary. Logs the error to the console for the operator
 * and gives the reader a way out that does not depend on the failed subtree.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="wrap py-20 md:py-28">
      <p className="eyebrow mb-4">Something went wrong</p>
      <h1 className="max-w-2xl text-4xl md:text-5xl">This page could not be rendered</h1>
      <p className="mt-4 max-w-xl text-[var(--color-ink-soft)]">
        The error has been logged. You can retry the page, or continue browsing from the catalogue.
        If this keeps happening, please{" "}
        <Link href="/contact" className="link-underline">
          let us know
        </Link>
        .
      </p>
      {error.digest && (
        <p className="mt-3 text-xs text-[var(--color-muted)]">Reference: {error.digest}</p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn">
          Try again
        </button>
        <Link href="/" className="btn btn-ghost">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
