"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Posts to Netlify Forms. The form Netlify actually knows about is the static
 * copy at public/__forms.html — it is parsed at deploy time, since this
 * component is rendered by React and never appears in the built HTML.
 *
 * Two things here are load-bearing and easy to break:
 *   - the POST goes to /__forms.html, a real static file. Posting to a route
 *     Next.js handles (like "/") is swallowed by the SSR catch-all.
 *   - form-name must be in the body. Without it the submission is discarded
 *     with no error.
 */
const FORM_NAME = "contact";
const FORM_ENDPOINT = "/__forms.html";
const CONTACT_EMAIL = "vishnu.gopaln@outlook.com";

const fieldClass =
  "mt-2 w-full border-0 bg-subtle px-4 py-3.5 font-sans text-sm text-foreground placeholder:text-muted/70 outline-none transition-shadow focus:ring-1 focus:ring-foreground/20";

const labelClass =
  "font-sans text-[11px] tracking-[0.2em] text-muted uppercase";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          new FormData(form) as unknown as Record<string, string>,
        ).toString(),
      });

      if (!response.ok) throw new Error(`Netlify returned ${response.status}`);

      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border border-line p-8"
      >
        <p className="font-heading text-lg font-medium tracking-tight">
          Thanks — your message is on its way.
        </p>
        <p className="mt-2 font-sans text-sm text-muted">
          I&rsquo;ll get back to you at the address you gave.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-sans text-[13px] underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      name={FORM_NAME}
      method="POST"
      action={FORM_ENDPOINT}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="space-y-6"
    >
      {/* Written in the JSX rather than injected at build time, so hydration
          cannot drop it and leave Netlify discarding every submission. */}
      <input type="hidden" name="form-name" value={FORM_NAME} />

      {/* Honeypot: invisible to people, irresistible to bots. */}
      <p className="hidden">
        <label>
          Leave this field empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Smith"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell me about the project"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="font-sans text-[13px] leading-relaxed text-muted"
        >
          That didn&rsquo;t send — something went wrong at our end. Please email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          instead.
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-foreground px-6 py-3.5 font-sans text-[13px] tracking-wide text-background transition-opacity hover:opacity-80 disabled:opacity-50 sm:w-auto"
      >
        {sending ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
