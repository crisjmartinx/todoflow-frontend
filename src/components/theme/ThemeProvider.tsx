"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("dark");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const saved = localStorage.getItem("theme");

  //     if (saved === "light" || saved === "dark") {
  //       setTheme(saved);
  //     } else {
  //       const prefersDark = window.matchMedia(
  //         "(prefers-color-scheme: dark)"
  //       ).matches;
  //       setTheme(prefersDark ? "dark" : "light");
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("theme-light", "theme-dark");
    html.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", "dark");
  }, [theme]);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  //   const handleChange = (e: MediaQueryListEvent) => {
  //     const newTheme = e.matches ? "dark" : "light";

  //     document.documentElement.classList.remove("theme-light", "theme-dark");

  //     setTheme(newTheme);
  //   };

  //   localStorage.removeItem("theme");

  //   mediaQuery.addEventListener("change", handleChange);
  //   return () => {
  //     mediaQuery.removeEventListener("change", handleChange);
  //   };
  // }, []);

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
  const themes: Theme[] = ["light", "dark"];

  const currentTheme = localStorage.getItem("theme") as Theme;

  useEffect(() => {
    if (currentTheme) {
      setTheme(currentTheme);
    } else {
      setTheme("light");
    }
  }, [currentTheme, setTheme]);

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
