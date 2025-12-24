export const applyTheme = (theme) => {
  const root = document.documentElement;

  // ALWAYS CLEAR
  root.classList.remove("dark");

  if (theme === "dark") {
    root.classList.add("dark");
    return;
  }

  if (theme === "light") {
    return;
  }

  // system ONLY when explicitly selected
  if (theme === "system") {
    const isDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (isDark) {
      root.classList.add("dark");
    }
  }
};

export const initTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
};
