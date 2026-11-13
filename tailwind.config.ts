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
        joy: {
          cream:        "#FBFAF6",   // ivory gallery white (Gallery redesign 11/2026)
          warm:         "#E8F2E8",   // soft sage background
          green:        "#6B9467",   // main sage green accent
          "green-light":"#A8C8A4",   // lighter sage
          charcoal:     "#1E3223",   // deep green band (was near-black)
          "green-dark": "#4E7849",   // buttons / small text on light
          deep:         "#16261A",   // footer-dark green
          ink:          "#1A1E1A",   // slightly green-tinted near-black
          muted:        "#6A7A68",   // green-tinted muted text
          border:       "#C8DCC6",   // sage green border
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem,8vw,7rem)",    { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(2.25rem,5vw,5rem)", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg":  ["clamp(1.75rem,4vw,3.5rem)",{ lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      transitionTimingFunction: {
        "joy": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up":    "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":    "fadeIn 0.5s ease forwards",
        "scroll-down":"scrollDown 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scrollDown: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%":      { transform: "translateY(6px)", opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
