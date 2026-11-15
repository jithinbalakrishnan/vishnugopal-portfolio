"use client";

import { useCallback } from "react";

/**
 * Segmented light/dark control. Which half reads as selected is decided in CSS
 * from the root element, so the server and client render identical markup and
 * there is no hydration mismatch and no flash of the wrong state.
 */
export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const set = useCallback((theme: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Private browsing: the choice just will not persist.
    }
  }, []);

  return (
    <div
      className={`inline-flex overflow-hidden rounded-full border border-line ${className}`}
    >
      <button
        type="button"
        onClick={() => set("light")}
        aria-label="Use light theme"
        className="seg-light flex h-6 w-8 items-center justify-center transition-colors"
      >
        <SunIcon />
      </button>
      <button
        type="button"
        onClick={() => set("dark")}
        aria-label="Use dark theme"
        className="seg-dark flex h-6 w-8 items-center justify-center transition-colors"
      >
        <MoonIcon />
      </button>
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}
