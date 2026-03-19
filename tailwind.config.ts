import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "Consolas", "monospace"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#060a10",
        surface: "#0d1117",
        border: "#1e2d3d",
        muted: "#4a5568",
        accent: "#00e5a0",
        "accent-dim": "#00b07a",
        text: "#cdd9e5",
        "text-dim": "#768390",
      },
    },
  },
  plugins: [],
};

export default config;
