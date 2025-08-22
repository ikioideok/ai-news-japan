import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#1e3a8a", soft: "#3b82f6" } },
      fontFamily: { sans: ["Inter", "Noto Sans JP", "ui-sans-serif", "system-ui"] },
    },
  },
  plugins: [],
};
export default config;
