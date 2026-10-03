"use client";

import { useSearchParams } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { Send } from "lucide-react";
import { site } from "@/content/site";

export const contactTopics = [
  { id: "general", label: "General Enquiries" },
  { id: "partnerships", label: "Partnerships" },
  { id: "events", label: "Events" },
  { id: "media", label: "Media" },
  { id: "support", label: "Supporting QIC" },
  { id: "volunteering", label: "Volunteering" },
];

const fieldClass =
  "mt-2 block w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 transition-colors hover:border-ink/30 focus:border-brand-600 focus:outline-2 focus:outline-offset-0 focus:outline-brand-600/25";

/**
 * Contact form. Deliberately simple: it composes an email in the visitor's
 * mail app, addressed to site.email, rather than posting to a backend.
 */
export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = contactTopics.some((t) => t.id === params.get("topic"))
    ? (params.get("topic") as string)
    : "general";
  const [sent, setSent] = useState(false);

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const topic = contactTopics.find((t) => t.id === data.get("topic"))?.label ?? "General Enquiries";
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `[${topic}] Message from ${name}`;
    const body = [
      message,
      "",
      "—",
      `Name: ${name}`,
      `Email: ${email}`,
      organisation && `Organisation: ${organisation}`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-ink">
            Full name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink">
            Email address
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="topic" className="text-sm font-semibold text-ink">
            What is this about?
          </label>
          <select id="topic" name="topic" defaultValue={initialTopic} className={fieldClass}>
            {contactTopics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="organisation" className="text-sm font-semibold text-ink">
            Organisation <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input id="organisation" name="organisation" autoComplete="organization" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={fieldClass} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-700 px-7 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 active:bg-brand-900"
        >
          Send message
          <Send aria-hidden className="size-4" />
        </button>
        <p role="status" className="text-sm text-ink-muted">
          {sent ? (
            <>
              Your email app should now open with your message. If it doesn&apos;t, email us at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 underline underline-offset-2">
                {site.email}
              </a>
              .
            </>
          ) : (
            "This opens your email app with your message ready to send."
          )}
        </p>
      </div>
    </form>
  );
}
