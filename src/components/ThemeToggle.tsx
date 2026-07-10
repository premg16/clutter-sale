"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

// Fallback path (no View Transitions, or reduced motion): flip the class inside
// a short "transition window" so colours cross-fade instead of hard-cutting.
let transitionTimer: ReturnType<typeof setTimeout> | undefined;
function setDarkClass(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
}
function crossfadeApply(next: Theme, reduce: boolean) {
  const root = document.documentElement;
  if (!reduce) {
    root.classList.add("theme-transition");
    clearTimeout(transitionTimer);
    transitionTimer = setTimeout(() => root.classList.remove("theme-transition"), 550);
  }
  setDarkClass(next);
}

// Preferred path: a soft-edged circle wipes the new theme in, expanding from a
// point (the toggle button). Uses the View Transitions API; the browser
// snapshots old→new and we animate a clip-path circle on the incoming layer
// (see ::view-transition-new(root) in globals.css). Origin + radius are passed
// as CSS variables so the CSS keyframe knows where to grow from.
function circleReveal(next: Theme, origin: { x: number; y: number }) {
  const root = document.documentElement;
  // Farthest viewport corner from the origin = final radius to cover the screen.
  const end = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );
  root.style.setProperty("--theme-x", `${origin.x}px`);
  root.style.setProperty("--theme-y", `${origin.y}px`);
  root.style.setProperty("--theme-r", `${end}px`);
  root.classList.add("theme-reveal");

  const vt = document.startViewTransition(() => setDarkClass(next));
  vt.finished.finally(() => root.classList.remove("theme-reveal"));
}

/**
 * Reads the theme the pre-paint inline script already applied (see layout.tsx)
 * so the button starts in sync with no hydration flash, then lets the user flip
 * it. Choice persists to localStorage; if the user never chooses, we keep
 * following the OS while the tab is open.
 *
 * `className` replaces the default skin entirely. The default is the `/` brand's
 * neo-brutalist chip (navy border, cream fill, hard offset shadow); routes with
 * their own palette — /v3 — pass their own so the button matches its band.
 * Behaviour and a11y are identical either way.
 */
export function ThemeToggle({ className }: { className?: string } = {}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    // Follow OS changes only while the user hasn't made an explicit choice.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      const next: Theme = e.matches ? "dark" : "light";
      // System-driven change has no click origin — use the plain cross-fade.
      crossfadeApply(next, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsVT = typeof document !== "undefined" && "startViewTransition" in document;

    if (supportsVT && !reduce && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      circleReveal(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    } else {
      crossfadeApply(next, reduce);
    }

    localStorage.setItem("theme", next);
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      aria-pressed={mounted ? isDark : undefined}
      className={
        className ??
        "relative grid size-11 place-items-center rounded-2xl border-2 border-brand-navy bg-brand-cream text-brand-navy shadow-[3px_3px_0_0_var(--color-hairline)] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terracotta"
      }
    >
      {/* Render both, cross-fade — avoids a layout jump and needs no icon lib swap. */}
      <motion.span
        initial={false}
        animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? -90 : 0, scale: isDark ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute"
        aria-hidden="true"
      >
        <Sun className="size-5" strokeWidth={2.25} />
      </motion.span>
      <motion.span
        initial={false}
        animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
        className="absolute"
        aria-hidden="true"
      >
        <Moon className="size-5" strokeWidth={2.25} />
      </motion.span>
    </button>
  );
}
