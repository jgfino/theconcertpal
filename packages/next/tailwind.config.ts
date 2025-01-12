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
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /grid-cols-./,
    },
  ],
} satisfies Config;
