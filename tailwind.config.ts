import type { Config } from "tailwindcss";

// Дизайн-токены из PROJECT_BRIEF: графит #1E293B, бирюза #0E7490,
// шампань-золото, изумруд. «Стекло само даёт цвет» — фон нейтральный.
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Нейтральная основа
        graphite: {
          DEFAULT: "#1E293B",
          50: "#f1f5f9",
          700: "#334155",
          800: "#1E293B",
          900: "#0f172a",
          950: "#0a0f1a",
        },
        // Акцент — бирюза (самый популярный эрклёз)
        turquoise: {
          DEFAULT: "#0E7490",
          light: "#22a3bd",
          400: "#38bdf8",
          600: "#0E7490",
          700: "#0b5e75",
        },
        // Детали
        champagne: "#E7D3A1",
        emerald: "#0f766e",
        // Дизайн-макет: тёплая бумага + аква-акцент
        paper: "#F6F4EF",
        aqua: { DEFAULT: "#67E8F9", bright: "#22D3EE" },
        // Семантика (shadcn-совместимо через CSS-переменные)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(14, 116, 144, 0.12)",
        elevated: "0 24px 60px -20px rgba(15, 23, 42, 0.35)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        sweep: {
          "0%": { transform: "translateX(-60%) rotate(8deg)", opacity: "0" },
          "40%": { opacity: "0.5" },
          "100%": { transform: "translateX(160%) rotate(8deg)", opacity: "0" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.85)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        sweep: "sweep 7s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
