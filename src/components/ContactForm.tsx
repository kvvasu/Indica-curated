"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const id = useId();

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const body = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (body.length < 20) next.message = "Please give us at least 20 characters of context.";
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const json = (await res.json()) as { message?: string };
      if (!res.ok) throw new Error(json.message ?? "Something went wrong.");
      setStatus("success");
      setMessage(json.message ?? "Thanks — we will reply within two working days.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  const fieldClass = (invalid?: string) =>
    `w-full border bg-[var(--color-surface-strong)] px-4 py-2.5 text-sm outline-none ${
      invalid ? "border-[var(--color-accent)]" : "border-[var(--color-line-strong)]"
    } focus:border-[var(--color-accent)]`;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div>
        <label htmlFor={`${id}-name`} className="eyebrow mb-2 block">
          Name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name) || undefined}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          className={fieldClass(errors.name)}
        />
        {errors.name && (
          <p id={`${id}-name-error`} className="mt-1 text-xs text-[var(--color-accent)]">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-email`} className="eyebrow mb-2 block">
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email) || undefined}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={fieldClass(errors.email)}
        />
        {errors.email && (
          <p id={`${id}-email-error`} className="mt-1 text-xs text-[var(--color-accent)]">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-topic`} className="eyebrow mb-2 block">
          Topic
        </label>
        <select id={`${id}-topic`} name="topic" className={fieldClass()} defaultValue="general">
          <option value="general">General enquiry</option>
          <option value="correction">Correction or editorial note</option>
          <option value="suggestion">Product suggestion</option>
          <option value="press">Press or partnership</option>
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="eyebrow mb-2 block">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={fieldClass(errors.message)}
        />
        {errors.message && (
          <p id={`${id}-message-error`} className="mt-1 text-xs text-[var(--color-accent)]">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        <p
          role="status"
          aria-live="polite"
          className={
            status === "error"
              ? "text-xs text-[var(--color-accent)]"
              : "text-xs text-[var(--color-muted)]"
          }
        >
          {message}
        </p>
      </div>
    </form>
  );
}
