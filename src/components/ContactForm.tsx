"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fieldClass =
  "mt-2 w-full border-0 bg-subtle px-4 py-3.5 font-sans text-sm text-foreground placeholder:text-muted/70 outline-none transition-shadow focus:ring-1 focus:ring-foreground/20";

const labelClass =
  "font-sans text-[11px] tracking-[0.2em] text-muted uppercase";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // Placeholder submit: no backend is wired up yet.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border border-line p-8"
      >
        <p className="font-heading text-lg font-medium tracking-tight">
          Thanks — message noted.
        </p>
        <p className="mt-2 font-sans text-sm text-muted">
          This form is a placeholder; nothing has been sent yet. Hook it up to a
          form endpoint or an API route before going live.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 font-sans text-[13px] underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          Write another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
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

      <button
        type="submit"
        className="w-full bg-foreground px-6 py-3.5 font-sans text-[13px] tracking-wide text-white transition-opacity hover:opacity-80 sm:w-auto"
      >
        Submit
      </button>
    </form>
  );
}
