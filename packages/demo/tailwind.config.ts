import { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: ["./src/**/*.{css,js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      padding: "1.5rem",
      center: true,
    },
    fontFamily: {
      primary: `Helvetica, Arial, sans-serif`,
      body: `"Helvetica", Monaco, monospace`,
      code: `Monaco, monospace`,
    },
    fontSize: {
      "2xs": "0.65rem",
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      colors: {
        web: {
          primary: "var(--color-primary)",
          readable: "var(--color-readable)",
          "readable-dim": "var(--color-readable-dim)",
          link: "var(--color-link)",
          "link-hover": "var(--color-link-hover)",
          "input-focus": "var(--color-input-focus)",
          content: "var(--color-content)",
          background: "var(--color-background)",
          border: "var(--color-border)",
          "border-dim": "var(--color-border-dim)",
          "ghost-button-hover": "var(--color-ghost-button-hover)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
