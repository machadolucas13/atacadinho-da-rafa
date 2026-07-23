import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
        warm: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c" },
        rose: {
          50: "#fff5f7",
          100: "#ffe6eb",
          200: "#ffd0d9",
          300: "#ffadc0",
          400: "#f4a7b9",
          500: "#e8829a",
          600: "#c76b8a",
          700: "#a3546e",
          800: "#7d4355",
          900: "#5c3440",
        },
        coral: {
          50: "#fff5f4",
          100: "#ffe8e6",
          200: "#ffd5d1",
          300: "#ffb5ae",
          400: "#f67c6f",
          500: "#e85d4d",
          600: "#d14638",
          700: "#ab382d",
          800: "#8a3129",
          900: "#6d2a23",
        },
        amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#f4a261", 500: "#e08f4a", 600: "#c27835", 700: "#a1662b", 800: "#815523", 900: "#6b471e" },
      },
      fontFamily: {
        display: ["var(--font-plus-jakarta-sans)", "var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "shimmer": "shimmer 1.5s linear infinite",
        "parallax": "parallax 20s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { transform: "translateY(10px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        scaleIn: { "0%": { transform: "scale(0.95)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-12px)" } },
        pulseSoft: { "0%, 100%": { opacity: "0.6" }, "50%": { opacity: "1" } },
        shimmer: { "0%": { backgroundPosition: "-1000px 0" }, "100%": { backgroundPosition: "1000px 0" } },
        parallax: { "0%": { transform: "translateY(0%)" }, "100%": { transform: "translateY(-12%)" } },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "soft": "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        "card": "0 1px 1px rgba(0,0,0,0.02), 0 4px 16px rgba(0,0,0,0.06), 0 12px 48px rgba(0,0,0,0.04)",
        "card-hover": "0 2px 4px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.08), 0 24px 80px rgba(0,0,0,0.06)",
        "glass": "0 8px 32px rgba(0,0,0,0.12)",
        "glow-rose": "0 0 24px rgba(244, 167, 185, 0.35)",
        "glow-coral": "0 0 24px rgba(246, 124, 111, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
