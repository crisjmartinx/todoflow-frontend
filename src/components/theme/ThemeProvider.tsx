"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "glass";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark" || saved === "glass") {
        return saved;
      }

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }

    return "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("theme-light", "theme-dark", "theme-glass");
    html.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {/* <ThemeSwitcher theme={theme} setTheme={setTheme} /> */}
      {children}
    </>
  );
}

function ThemeSwitcher({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  const themes: Theme[] = ["light", "dark", "glass"];

  return (
    <div className="absolute right-4 z-[9999] flex space-x-2 bg-white p-2 rounded shadow dark:bg-gray-800">
      {themes.map((t) => (
        <button
          key={t}
          className={`capitalize px-3 py-1 rounded transition-colors duration-200 ${
            theme === t
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTheme(t)}
          aria-pressed={theme === t}
          aria-label={`Switch to ${t} theme`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
