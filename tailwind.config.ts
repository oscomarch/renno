import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFCFA",
          100: "#FBF8F3",
          200: "#F5EFE6",
          300: "#E8E0D4",
          400: "#D4C8B8"
        },
        brown: {
          50: "#F5F0EB",
          100: "#E8DDD2",
          200: "#C9B9A4",
          300: "#A89279",
          400: "#8B7D6B",
          500: "#6B5D4F",
          600: "#4A3C30",
          700: "#2C1810",
          800: "#1A0F0A",
          900: "#0D0705"
        },
        terracotta: {
          50: "#FDF2EC",
          100: "#FADCC8",
          200: "#F5B88E",
          300: "#E8864A",
          400: "#D4671F",
          500: "#C4581A",
          600: "#A34815",
          700: "#7A3610",
          800: "#52240B",
          900: "#291206"
        },
        sage: {
          50: "#F2F5F0",
          100: "#DDE5D8",
          200: "#B8CBB0",
          300: "#8FAF83",
          400: "#6B9360",
          500: "#4F7A42",
          600: "#3D6034",
          700: "#2C4626",
          800: "#1C2D18",
          900: "#0E170C"
        }
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        warm: "0 20px 60px rgba(44, 24, 16, 0.08)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};

export default config;
