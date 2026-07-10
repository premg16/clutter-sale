"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

/**
 * /v2's own toggle. Same mechanics as the root one (pre-paint class, View
 * Transitions circle reveal) but skinned to the v2 token set and with no
 * framer-motion dependency — icons cross-fade with plain CSS.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    // Follow the OS only while the user has not made an explicit choice.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      const next: Theme = e.matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = () => document.documentElement.classList.toggle("dark", next === "dark");

    const root = document.documentElement;
    if (!reduce && btnRef.current && "startViewTransition" in document) {
      const r = btnRef.current.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      // Farthest viewport corner = radius needed to cover the screen.
      const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.style.setProperty("--theme-x", `${x}px`);
      root.style.setProperty("--theme-y", `${y}px`);
      root.style.setProperty("--theme-r", `${end}px`);
      root.classList.add("theme-reveal");
      document
        .startViewTransition(apply)
        .finished.finally(() => root.classList.remove("theme-reveal"));
    } else {
      apply();
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
      className="v2-press relative grid size-11 shrink-0 place-items-center rounded-full transition-colors"
      style={{
        border: "1px solid color-mix(in srgb, var(--v2-hairline) 14%, transparent)",
        color: "var(--v2-ink)",
      }}
    >
      {/* Both icons render; opacity/rotate cross-fade avoids a layout jump. */}
      <Sun
        className="absolute size-[18px] transition-all duration-300"
        style={{ opacity: isDark ? 0 : 1, transform: `rotate(${isDark ? -90 : 0}deg) scale(${isDark ? 0.5 : 1})` }}
        aria-hidden="true"
      />
      <Moon
        className="absolute size-[18px] transition-all duration-300"
        style={{ opacity: isDark ? 1 : 0, transform: `rotate(${isDark ? 0 : 90}deg) scale(${isDark ? 1 : 0.5})` }}
        aria-hidden="true"
      />
    </button>
  );
}
