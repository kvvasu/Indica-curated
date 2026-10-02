"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const id = useId();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) throw new Error(data.message ?? "Something went wrong.");
      setStatus("success");
      setMessage(data.message ?? "You are on the list.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={`${id}-email`} className="eyebrow mb-2 block">
        {compact ? "Weekly dispatch" : "Join the weekly dispatch"}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby={`${id}-status`}
          aria-invalid={status === "error" || undefined}
          className="w-full border border-[var(--color-line-strong)] bg-[var(--color-surface-strong)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
        />
        <button type="submit" className="btn shrink-0" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className={
          status === "error"
            ? "mt-2 text-xs text-[var(--color-accent)]"
            : "mt-2 text-xs text-[var(--color-muted)]"
        }
      >
        {message || "One email a week. No sponsorships, no tracking pixels."}
      </p>
    </form>
  );
}
