import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--background)",
        fg: "var(--foreground)",
        "fg-alt": "var(--foreground-alt)",
        primary: "var(--primary)",
        "primary-alt": "var(--primary-alt)",
        "gray-1": "var(--gray-1)",
        error: "var(--error)",
      },
      spacing: {
        content: "100rem",
        form: "25rem",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^bg-/,
    },
    {
      pattern: /^text-/,
    },
    {
      pattern: /^border-/,
    },
  ],
} satisfies Config;
